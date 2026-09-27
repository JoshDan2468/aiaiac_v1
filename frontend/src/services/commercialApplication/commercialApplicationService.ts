import { apiRequest } from "@/services/api/client";

export type CommercialApplicationKind = "SPONSOR" | "EXHIBITOR";
export type CommercialApplicationStatus =
  "SUBMITTED" | "MORE_INFORMATION_REQUIRED" | "CONFIRMED" | "DECLINED";

export interface CommercialApplicationConfirmation {
  reference: string;
  applicationType: CommercialApplicationKind;
  selectedPackage: { code: string; name: string };
  currency: "USD";
  priceMinor: number;
  status: CommercialApplicationStatus;
  nextStep: string;
}

export interface CommercialApplicationPayload {
  organizationName: string;
  country: string;
  website?: string | undefined;
  industry?: string | undefined;
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  contactPhone: string;
  contactJobTitle?: string | undefined;
  notes?: string | undefined;
  consent: true;
}

export interface CommercialApplicationListItem {
  reference: string;
  organizationName: string;
  contactName: string;
  contactEmail: string;
  packageCode: string;
  packageName: string;
  currency: "USD";
  priceMinor: number;
  status: CommercialApplicationStatus;
  submittedAt: string;
}

export interface CommercialApplicationHistoryItem {
  id: string;
  action: CommercialApplicationStatus;
  fromStatus: CommercialApplicationStatus | null;
  toStatus: CommercialApplicationStatus;
  reviewerName: string | null;
  applicantReason: string | null;
  internalNote: string | null;
  createdAt: string;
}

export interface CommercialApplicationDetail extends CommercialApplicationListItem {
  kind: CommercialApplicationKind;
  country: string;
  website: string | null;
  industry: string | null;
  contactFirstName: string;
  contactLastName: string;
  contactPhone: string;
  contactJobTitle: string | null;
  applicantNotes: string | null;
  currentApplicantReason: string | null;
  reviewedAt: string | null;
  reviewerName: string | null;
  history: CommercialApplicationHistoryItem[];
}

interface Envelope<T> {
  success: true;
  data: T;
}

function cleanPayload<T extends CommercialApplicationPayload>(payload: T): T {
  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== "" && value !== undefined),
  ) as T;
}

async function submit<T extends CommercialApplicationPayload>(path: string, payload: T) {
  const result = await apiRequest<Envelope<CommercialApplicationConfirmation>>(path, {
    method: "POST",
    body: cleanPayload(payload),
  });
  return result.ok && result.data?.data
    ? { ok: true as const, confirmation: result.data.data }
    : { ok: false as const, error: result.error ?? "The application could not be submitted." };
}

export function submitSponsorApplication(
  payload: CommercialApplicationPayload & { sponsorshipTier: string },
) {
  return submit("/sponsor-applications", payload);
}

export function submitExhibitorApplication(
  payload: CommercialApplicationPayload & { exhibitionOption: string },
) {
  return submit("/exhibitor-applications", payload);
}

export async function listCommercialApplications(
  kind: CommercialApplicationKind,
  query: URLSearchParams,
) {
  const segment = kind === "SPONSOR" ? "sponsor" : "exhibitor";
  const result = await apiRequest<
    Envelope<{
      applications: {
        items: CommercialApplicationListItem[];
        page: number;
        pageSize: number;
        total: number;
        totalPages: number;
      };
    }>
  >(`/admin/${segment}-applications?${query.toString()}`);
  return result.ok && result.data?.data.applications
    ? { ok: true as const, applications: result.data.data.applications }
    : { ok: false as const, error: result.error ?? "Applications could not be loaded." };
}

export async function getCommercialApplication(kind: CommercialApplicationKind, reference: string) {
  const segment = kind === "SPONSOR" ? "sponsor" : "exhibitor";
  const result = await apiRequest<Envelope<{ application: CommercialApplicationDetail }>>(
    `/admin/${segment}-applications/${encodeURIComponent(reference)}`,
  );
  return result.ok && result.data?.data.application
    ? { ok: true as const, application: result.data.data.application }
    : { ok: false as const, error: result.error ?? "Application could not be loaded." };
}

export async function decideCommercialApplication(
  kind: CommercialApplicationKind,
  reference: string,
  action: "confirm" | "request-more-information" | "decline",
  body: { note?: string; reason?: string },
) {
  const segment = kind === "SPONSOR" ? "sponsor" : "exhibitor";
  const result = await apiRequest<Envelope<{ application: unknown }>>(
    `/admin/${segment}-applications/${encodeURIComponent(reference)}/${action}`,
    { method: "POST", body },
  );
  return result.ok
    ? { ok: true as const }
    : { ok: false as const, error: result.error ?? "The decision could not be saved." };
}

export async function retryCommercialNotification(
  kind: CommercialApplicationKind,
  reference: string,
) {
  const segment = kind === "SPONSOR" ? "sponsor" : "exhibitor";
  const result = await apiRequest<Envelope<{ attempted: number }>>(
    `/admin/${segment}-applications/${encodeURIComponent(reference)}/notifications/retry`,
    { method: "POST", body: {} },
  );
  return result.ok && result.data
    ? { ok: true as const, attempted: result.data.data.attempted }
    : { ok: false as const, error: result.error ?? "Notification retry failed." };
}
