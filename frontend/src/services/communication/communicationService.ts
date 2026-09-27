import { apiRequest } from "@/services/api/client";

export type AudienceCode =
  | "ALL_DELEGATES"
  | "PROFESSIONAL_DELEGATES"
  | "STUDENT_DELEGATES"
  | "SPONSORS"
  | "CONFIRMED_SPONSORS"
  | "EXHIBITORS"
  | "CONFIRMED_EXHIBITORS"
  | "ABSTRACT_AUTHORS";
export interface Audience {
  code: AudienceCode;
  registrationStatus?: string;
  paymentStatus?: string;
  verificationStatus?: string;
  country?: string;
  currency?: "NGN" | "USD";
  abstractStatus?: string;
}
export interface CampaignContent {
  title: string;
  subject: string;
  preheader: string;
  heading: string;
  body: string;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  audience: Audience;
}
export interface Campaign extends CampaignContent {
  id: string;
  reference: string;
  status: "DRAFT" | "SENDING" | "SENT" | "PARTIALLY_FAILED" | "FAILED";
  recipientCount: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  sentAt: string | null;
  sent: number;
  failed: number;
  pending: number;
  claimed: number;
}
export interface Delivery {
  id: string;
  campaignReference: string;
  email: string;
  name: string;
  sourceCategory: string;
  status: string;
  attempts: number;
  providerMessageId: string | null;
  errorSummary: string | null;
  sentAt: string | null;
}
export interface Preset {
  id: string;
  label: string;
  heading: string;
  body: string;
}
interface Envelope<T> {
  success: true;
  data: T;
}
async function request<T>(path: string, method = "GET", body?: unknown): Promise<T> {
  const response = await apiRequest<Envelope<T>>(`/admin/communications${path}`, { method, body });
  if (!response.ok || !response.data)
    throw new Error(response.error ?? "Communication request failed");
  return response.data.data;
}
export const communicationService = {
  presets: () => request<Preset[]>("/templates"),
  count: (audience: Audience) =>
    request<{ count: number; fingerprint: string; overLimit: boolean; limit: number }>(
      "/audience/count",
      "POST",
      audience,
    ),
  preview: (content: CampaignContent) =>
    request<{ subject: string; text: string; html: string }>("/preview", "POST", content),
  create: (content: CampaignContent) => request<Campaign>("/campaigns", "POST", content),
  update: (reference: string, content: CampaignContent) =>
    request<Campaign>(`/campaigns/${reference}`, "PUT", content),
  get: (reference: string) => request<Campaign>(`/campaigns/${reference}`),
  list: (page = 1, status = "") =>
    request<{ items: Campaign[]; total: number }>(
      `/campaigns?page=${page}${status ? `&status=${status}` : ""}`,
    ),
  deliveries: (page = 1, status = "", campaign = "") =>
    request<{ items: Delivery[]; total: number }>(
      `/deliveries?page=${page}${status ? `&status=${status}` : ""}${campaign ? `&campaign=${campaign}` : ""}`,
    ),
  test: (reference: string, email: string) =>
    request<{ accepted: boolean; providerMessageId: string | null }>(
      `/campaigns/${reference}/test`,
      "POST",
      { email },
    ),
  confirm: (reference: string, fingerprint: string) =>
    request<Campaign>(`/campaigns/${reference}/confirm`, "POST", { fingerprint }),
  deliver: (reference: string) =>
    request<{ processed: number; campaign: Campaign }>(`/campaigns/${reference}/deliver`, "POST"),
  retry: (reference: string) =>
    request<{ processed: number; campaign: Campaign }>(`/campaigns/${reference}/retry`, "POST"),
};
