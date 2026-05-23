// Cloudflare Pages Function — handles inbound form submissions
// from the Manny De Anda site. Routes to Resend (email), Airtable
// (dashboard), ConvertKit (newsletter), and optionally Twilio SMS.

interface Env {
  RESEND_API_KEY: string;
  RESEND_FROM_EMAIL: string;
  MANNY_NOTIFY_EMAIL: string;
  AIRTABLE_API_KEY: string;
  AIRTABLE_BASE_ID: string;
  AIRTABLE_TABLE_NAME: string;
  CONVERTKIT_API_KEY?: string;
  CONVERTKIT_FORM_ID?: string;
  TWILIO_ACCOUNT_SID?: string;
  TWILIO_AUTH_TOKEN?: string;
  TWILIO_FROM_PHONE?: string;
  TWILIO_TO_PHONE?: string;
}

type Lead = {
  type: string;
  name?: string;
  email: string;
  phone?: string;
  message?: string;
  source: string;
  capturedAt: string;
  utm?: Record<string, string>;
};

const VALID_TYPES = new Set([
  "train_general",
  "train_with_manny",
  "sponsor",
  "fight_booking",
  "general",
  "newsletter",
]);

const HIGH_PRIORITY = new Set([
  "train_with_manny",
  "sponsor",
  "fight_booking",
]);

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  if (!isObject(payload)) {
    return json({ ok: false, error: "invalid_payload" }, 400);
  }

  if (!payload.type || !payload.email) {
    return json({ ok: false, error: "missing_required" }, 400);
  }

  if (typeof payload.type !== "string" || !VALID_TYPES.has(payload.type)) {
    return json({ ok: false, error: "invalid_type" }, 400);
  }

  if (typeof payload.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return json({ ok: false, error: "invalid_email" }, 400);
  }

  if (payload.type !== "newsletter" && !payload.name) {
    return json({ ok: false, error: "missing_name" }, 400);
  }

  if ((payload.type === "train_with_manny" || payload.type === "fight_booking") && !payload.phone) {
    return json({ ok: false, error: "missing_phone" }, 400);
  }

  const missing = requiredEnv(env);
  if (missing.length) {
    return json({ ok: false, error: "missing_env", missing }, 500);
  }

  const lead: Lead = {
    type: payload.type,
    name: stringOrUndefined(payload.name),
    email: payload.email,
    phone: stringOrUndefined(payload.phone),
    message: stringOrUndefined(payload.message),
    source: stringOrUndefined(payload.source) || "site",
    capturedAt: stringOrUndefined(payload.capturedAt) || new Date().toISOString(),
    utm: isObject(payload.utm) ? Object.fromEntries(Object.entries(payload.utm).map(([k, v]) => [k, String(v)])) : {},
  };

  const tasks: Promise<unknown>[] = [
    sendEmail(env, lead),
    saveToAirtable(env, lead),
  ];

  if (lead.type === "newsletter" || lead.type === "train_general") {
    tasks.push(subscribeNewsletter(env, lead));
  }

  if (HIGH_PRIORITY.has(lead.type) && env.TWILIO_ACCOUNT_SID) {
    tasks.push(sendSms(env, lead));
  }

  const results = await Promise.allSettled(tasks);
  const failed = results.filter((r) => r.status === "rejected");
  const airtableResult = results[1];
  const id = airtableResult.status === "fulfilled" && isObject(airtableResult.value)
    ? stringOrUndefined(airtableResult.value.id)
    : undefined;

  if (airtableResult.status === "rejected") {
    return json({
      ok: false,
      error: "storage_failed",
      details: String(airtableResult.reason),
    }, 502);
  }

  return json({ ok: true, id, warnings: failed.map((f) => f.status === "rejected" ? String(f.reason) : "") }, 200);
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function requiredEnv(env: Env) {
  return [
    "RESEND_API_KEY",
    "RESEND_FROM_EMAIL",
    "MANNY_NOTIFY_EMAIL",
    "AIRTABLE_API_KEY",
    "AIRTABLE_BASE_ID",
  ].filter((key) => !env[key as keyof Env]);
}

async function sendEmail(env: Env, lead: Lead) {
  const isPriority = HIGH_PRIORITY.has(lead.type);
  const subject = isPriority
    ? `🔥 ${lead.type.toUpperCase()} — ${lead.name || lead.email}`
    : `New ${lead.type} lead — ${lead.name || lead.email}`;

  const html = `
    <h2>New ${escapeHtml(lead.type)} lead</h2>
    <p><strong>Name:</strong> ${escapeHtml(lead.name || "—")}</p>
    <p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(lead.phone || "—")}</p>
    <p><strong>Message:</strong></p>
    <pre style="white-space:pre-wrap">${escapeHtml(lead.message || "")}</pre>
    <hr/>
    <p>Source: ${escapeHtml(lead.source)} · Captured: ${escapeHtml(lead.capturedAt)}</p>
    <p>UTM: ${escapeHtml(JSON.stringify(lead.utm || {}))}</p>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer re_QeKc4sNg_JgZHDgomgohVbbazXAUnvoeb`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.RESEND_FROM_EMAIL,
      to: env.MANNY_NOTIFY_EMAIL,
      subject,
      html,
    }),
  });
  if (!res.ok) throw new Error(`resend_${res.status}`);
  return res.json();
}

async function saveToAirtable(env: Env, lead: Lead) {
  const table = env.AIRTABLE_TABLE_NAME || "Leads";
  const url = `https://api.airtable.com/v0/${env.AIRTABLE_BASE_ID}/${encodeURIComponent(table)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.AIRTABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      records: [{
        fields: {
          Type: lead.type,
          Name: lead.name || "",
          Email: lead.email,
          Phone: lead.phone || "",
          Message: lead.message || "",
          Source: lead.source,
          CapturedAt: lead.capturedAt,
          UTM: JSON.stringify(lead.utm || {}),
          Status: "New",
        },
      }],
    }),
  });
  if (!res.ok) throw new Error(`airtable_${res.status}_${await res.text()}`);
  const data: unknown = await res.json();
  return { id: isObject(data) && Array.isArray(data.records) ? data.records[0]?.id : undefined };
}

async function subscribeNewsletter(env: Env, lead: Lead) {
  if (!env.CONVERTKIT_API_KEY || !env.CONVERTKIT_FORM_ID) return null;
  const res = await fetch(`https://api.convertkit.com/v3/forms/${env.CONVERTKIT_FORM_ID}/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: env.CONVERTKIT_API_KEY,
      email: lead.email,
      first_name: lead.name,
    }),
  });
  if (!res.ok) throw new Error(`convertkit_${res.status}`);
  return res.json();
}

async function sendSms(env: Env, lead: Lead) {
  if (!env.TWILIO_ACCOUNT_SID || !env.TWILIO_AUTH_TOKEN || !env.TWILIO_FROM_PHONE || !env.TWILIO_TO_PHONE) return null;
  const body = `🔥 New ${lead.type} lead: ${lead.name || lead.email}${lead.phone ? " · " + lead.phone : ""}`;
  const url = `https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`;
  const auth = btoa(`${env.TWILIO_ACCOUNT_SID}:${env.TWILIO_AUTH_TOKEN}`);
  const form = new URLSearchParams({
    From: env.TWILIO_FROM_PHONE,
    To: env.TWILIO_TO_PHONE,
    Body: body,
  });
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form.toString(),
  });
  if (!res.ok) throw new Error(`twilio_${res.status}`);
  return res.json();
}

function escapeHtml(s: string) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function stringOrUndefined(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value : undefined;
}
