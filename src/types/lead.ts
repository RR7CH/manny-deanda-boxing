export type LeadType =
  | "train_general"
  | "train_with_manny"
  | "sponsor"
  | "fight_booking"
  | "general"
  | "newsletter";

export interface LeadPayload {
  type: LeadType;
  name?: string;
  email: string;
  phone?: string;
  message?: string;
  source: "site" | "newsletter_inline";
  capturedAt: string;
  utm?: Record<string, string>;
}

export interface LeadResponse {
  ok: boolean;
  id?: string;
  error?: string;
}
