import type { LeadPayload, LeadResponse, LeadType } from '../types/lead';

export interface ContactServiceOption {
  type: LeadType;
  title: string;
  desc: string;
  color: string;
  cta: string;
  placeholder: string;
  badge?: string;
  priority?: boolean;
}

export const serviceOptions: ContactServiceOption[] = [
  {
    type: 'train_general',
    title: 'TRAIN AT THE GYM',
    desc: 'Classes, boxing lessons & De Anda Brothers training inquiries',
    color: '#c41e1e',
    cta: 'START TRAINING',
    placeholder: 'Tell us your fitness goals, experience level, and availability...',
  },
  {
    type: 'train_with_manny',
    title: 'TRAIN WITH MANNY DIRECT',
    desc: 'Weekly 1-on-1 sessions with Manny Mannolo De Anda',
    color: '#c41e1e',
    cta: 'REQUEST 1-ON-1',
    placeholder: 'Goal, current level, schedule availability...',
    badge: '$350/mo',
    priority: true,
  },
  {
    type: 'sponsor',
    title: 'SPONSORSHIP',
    desc: 'Brand partnerships, fight sponsorships & endorsements',
    color: '#c9a84c',
    cta: 'SUBMIT PROPOSAL',
    placeholder: 'Tell us about your brand and partnership goals...',
    priority: true,
  },
  {
    type: 'fight_booking',
    title: 'FIGHT INQUIRY',
    desc: 'Matchmaking, bout negotiations & event bookings',
    color: '#c41e1e',
    cta: 'SEND INQUIRY',
    placeholder: 'Opponent, promotion, proposed date, weight, and contact details...',
    priority: true,
  },
  {
    type: 'general',
    title: 'GENERAL CONTACT',
    desc: 'Media, press, community outreach & other inquiries',
    color: '#7a756f',
    cta: 'SEND MESSAGE',
    placeholder: 'Let us know what you need...',
  },
];

export function parseUtmFromUrl(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].forEach((key) => {
    const value = params.get(key);
    if (value) utm[key] = value;
  });
  return utm;
}

export async function submitLead(formData: Omit<LeadPayload, 'source' | 'capturedAt' | 'utm'>): Promise<LeadResponse> {
  const res = await fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...formData,
      source: 'site',
      capturedAt: new Date().toISOString(),
      utm: parseUtmFromUrl(),
    }),
  });

  const data = await res.json() as LeadResponse;
  if (!res.ok || !data.ok) {
    throw new Error(data.error || `lead_${res.status}`);
  }
  return data;
}
