import { apiRequest } from "@/services/api/client";

export type AbstractStatus =
  "SUBMITTED" | "UNDER_REVIEW" | "REVISION_REQUIRED" | "ACCEPTED" | "REJECTED";

export interface AbstractContent {
  title: string;
  abstractBody: string;
  keywords?: string;
  topic?: string;
}

export interface AbstractSubmissionPayload extends AbstractContent {
  idempotencyKey: string;
  authorFirstName: string;
  authorLastName: string;
  authorEmail: string;
  authorPhone: string;
  organizationName: string;
  jobTitle?: string;
  country: string;
  consent: true;
}

export interface AbstractAccess {
  reference: string;
  continuationToken: string;
  continuationTokenExpiresAt: string;
}

export interface AbstractConfirmation extends AbstractAccess {
  title: string;
  wordCount: number;
  status: AbstractStatus;
  submittedAt: string;
  nextStep: string;
}

export interface AbstractWorkspace {
  reference: string;
  title: string;
  abstractBody: string;
  wordCount: number;
  keywords: string | null;
  topic: string | null;
  status: AbstractStatus;
  submittedAt: string;
  resubmittedAt: string | null;
  currentReviewReason: string | null;
  editingAllowed: boolean;
  resubmissionAllowed: boolean;
  paymentAvailable: false;
}

export interface AbstractListItem {
  reference: string;
  authorName: string;
  organizationName: string;
  country: string;
  title: string;
  wordCount: number;
  status: AbstractStatus;
  submittedAt: string;
  resubmittedAt: string | null;
}

export interface AbstractAdminDetail extends AbstractListItem {
  authorEmail: string;
  authorPhone: string;
  jobTitle: string | null;
  abstractBody: string;
  keywords: string | null;
  topic: string | null;
  currentReviewReason: string | null;
  reviewerName: string | null;
  reviewStartedAt: string | null;
  decidedAt: string | null;
  history: {
    id: string;
    action: string;
    fromStatus: AbstractStatus | null;
    toStatus: AbstractStatus;
    reviewerName: string | null;
    authorVisibleReason: string | null;
    internalNote: string | null;
    wordCount: number;
    createdAt: string;
  }[];
}

interface Envelope<T> {
  success: true;
  data: T;
  message?: string;
}

export function countAbstractWords(body: string): number {
  const trimmed = body.trim();
  return trimmed ? trimmed.split(/\s+/u).length : 0;
}

export function createAbstractIdempotencyKey(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function clean<T extends object>(input: T): T {
  return Object.fromEntries(
    Object.entries(input).filter(([, value]) => value !== "" && value !== undefined),
  ) as T;
}

export async function submitAbstract(payload: AbstractSubmissionPayload) {
  const result = await apiRequest<Envelope<AbstractConfirmation>>("/abstract-submissions", {
    method: "POST",
    body: clean(payload),
  });
  return result.ok && result.data?.data
    ? { ok: true as const, confirmation: result.data.data }
    : { ok: false as const, status: result.status, error: result.error };
}

export async function getAbstractWorkspace(access: AbstractAccess) {
  const result = await apiRequest<Envelope<{ workspace: AbstractWorkspace }>>(
    `/abstract-submissions/${encodeURIComponent(access.reference)}/workspace`,
    { headers: { "X-AIAIAC-Continuation-Token": access.continuationToken } },
  );
  return result.ok && result.data?.data.workspace
    ? { ok: true as const, workspace: result.data.data.workspace }
    : { ok: false as const, error: result.error };
}

export async function saveAbstractRevision(access: AbstractAccess, content: AbstractContent) {
  const result = await apiRequest<Envelope<{ workspace: AbstractWorkspace }>>(
    `/abstract-submissions/${encodeURIComponent(access.reference)}/revision`,
    {
      method: "PATCH",
      headers: { "X-AIAIAC-Continuation-Token": access.continuationToken },
      body: clean(content),
    },
  );
  return result.ok && result.data?.data.workspace
    ? { ok: true as const, workspace: result.data.data.workspace }
    : { ok: false as const, error: result.error };
}

export async function resubmitAbstract(access: AbstractAccess) {
  const result = await apiRequest<Envelope<{ workspace: AbstractWorkspace }>>(
    `/abstract-submissions/${encodeURIComponent(access.reference)}/resubmit`,
    {
      method: "POST",
      headers: { "X-AIAIAC-Continuation-Token": access.continuationToken },
      body: {},
    },
  );
  return result.ok && result.data?.data.workspace
    ? { ok: true as const, workspace: result.data.data.workspace }
    : { ok: false as const, error: result.error };
}

export async function requestAbstractRecovery(reference: string, email: string) {
  const result = await apiRequest<Envelope<unknown>>("/abstract-submission-recovery/request", {
    method: "POST",
    body: { reference, email },
  });
  return result.ok
    ? {
        ok: true as const,
        message: result.data?.message ?? "If the details match, a secure link will be sent.",
      }
    : { ok: false as const, error: result.error };
}

export async function exchangeAbstractRecovery(recoveryToken: string) {
  const result = await apiRequest<Envelope<{ access: AbstractAccess }>>(
    "/abstract-submission-recovery/exchange",
    { method: "POST", body: { recoveryToken } },
  );
  return result.ok && result.data?.data.access
    ? { ok: true as const, access: result.data.data.access }
    : { ok: false as const, error: result.error };
}

export async function listAbstracts(query: URLSearchParams) {
  const result = await apiRequest<
    Envelope<{
      submissions: {
        items: AbstractListItem[];
        page: number;
        pageSize: number;
        total: number;
        totalPages: number;
      };
    }>
  >(`/admin/abstract-submissions?${query.toString()}`);
  return result.ok && result.data?.data.submissions
    ? { ok: true as const, submissions: result.data.data.submissions }
    : { ok: false as const, error: result.error };
}

export async function getAdminAbstract(reference: string) {
  const result = await apiRequest<Envelope<{ submission: AbstractAdminDetail }>>(
    `/admin/abstract-submissions/${encodeURIComponent(reference)}`,
  );
  return result.ok && result.data?.data.submission
    ? { ok: true as const, submission: result.data.data.submission }
    : { ok: false as const, error: result.error };
}

export async function reviewAbstract(
  reference: string,
  action: "start-review" | "accept" | "request-revision" | "reject",
  body: { reason?: string; note?: string },
) {
  const result = await apiRequest<Envelope<unknown>>(
    `/admin/abstract-submissions/${encodeURIComponent(reference)}/${action}`,
    { method: "POST", body },
  );
  return result.ok ? { ok: true as const } : { ok: false as const, error: result.error };
}

export async function retryAbstractNotification(reference: string) {
  const result = await apiRequest<Envelope<{ attempted: number }>>(
    `/admin/abstract-submissions/${encodeURIComponent(reference)}/notifications/retry`,
    { method: "POST", body: {} },
  );
  return result.ok && result.data
    ? { ok: true as const, attempted: result.data.data.attempted }
    : { ok: false as const, error: result.error };
}
