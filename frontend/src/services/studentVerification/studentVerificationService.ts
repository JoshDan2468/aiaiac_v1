import { API_BASE_URL, apiRequest } from "@/services/api/client";
import type { DelegateRegistrationConfirmation } from "@/services/delegate/delegateService";

export type StudentVerificationStatus =
  "NOT_SUBMITTED" | "PENDING" | "MORE_INFORMATION_REQUIRED" | "APPROVED" | "REJECTED";

export type StudentEvidenceType =
  | "CURRENT_STUDENT_ID"
  | "COURSE_REGISTRATION"
  | "ENROLMENT_LETTER"
  | "TUITION_OR_SCHOOL_FEE_RECEIPT"
  | "TRANSCRIPT_OR_ENROLMENT_STATEMENT"
  | "OTHER_INSTITUTIONAL_ENROLMENT_EVIDENCE";

export interface StudentEvidenceMetadata {
  evidenceId: string;
  evidenceType: StudentEvidenceType;
  category: "STUDENT_ID" | "ENROLMENT";
  displayFilename: string;
  detectedMimeType: "application/pdf" | "image/jpeg" | "image/png";
  sizeBytes: number;
  checksumSha256: string;
  scanStatus: "PENDING" | "CLEAN" | "INFECTED" | "UNAVAILABLE" | "ERROR";
  documentStatus: "PENDING_SCAN" | "AVAILABLE" | "REJECTED";
  uploadedAt: string;
}

export interface StudentEvidenceReadiness {
  hasAvailableStudentId: boolean;
  hasAvailableEnrolmentEvidence: boolean;
  minimumEvidenceReady: boolean;
}

export interface StudentEvidenceList {
  items: StudentEvidenceMetadata[];
  readiness: StudentEvidenceReadiness;
}

export interface StudentApplicationPayload {
  packageId: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  telephone?: string | undefined;
  country: string;
  mainObjective: string;
  heardAboutSource: string;
  privacyConsent: true;
  dataSharingConsent: boolean;
  institutionName: string;
  institutionCountry: string;
  programmeOfStudy: string;
  studentIdentificationNumber: string;
  expectedGraduationYear: number;
  institutionalEmail?: string | undefined;
}

export interface StudentVerificationListItem {
  registrationReference: string;
  delegateName: string;
  institutionName: string;
  institutionCountry: string;
  programmeOfStudy: string;
  verificationStatus: StudentVerificationStatus;
  submittedAt: string | null;
  reviewedAt: string | null;
  createdAt: string;
  evidence: StudentEvidenceMetadata[];
  evidenceReadiness: StudentEvidenceReadiness;
}

export interface StudentVerificationListFilters {
  page?: number | undefined;
  limit?: number | undefined;
  search?: string | undefined;
  status?: StudentVerificationStatus | undefined;
}

interface ApiEnvelope<T> {
  success: true;
  data: T;
}

function uploadError(status: number) {
  if (status === 400) return "This file is not accepted. Use a genuine PDF, JPEG, or PNG file.";
  if (status === 401) return "Your secure upload session has expired or is invalid.";
  if (status === 409) return "This evidence cannot be changed in its current state.";
  if (status === 413) return "The file exceeds the 5 MB limit.";
  if (status === 429) return "Too many upload attempts. Please wait and try again.";
  return "The evidence service is temporarily unavailable. Please try again.";
}

async function evidenceRequest<T>(
  path: string,
  continuationToken: string,
  options: RequestInit = {},
) {
  try {
    const headers = new Headers(options.headers);
    headers.set("Accept", "application/json");
    headers.set("X-AIAIAC-Continuation-Token", continuationToken);
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      credentials: "include",
      headers,
    });
    const body = (await response.json().catch(() => null)) as T | null;
    if (!response.ok) {
      return { ok: false as const, status: response.status, error: uploadError(response.status) };
    }
    return { ok: true as const, status: response.status, data: body as T };
  } catch {
    return {
      ok: false as const,
      status: 0,
      error: "We could not reach the evidence service. Check your connection and try again.",
    };
  }
}

function toQuery(filters: StudentVerificationListFilters): string {
  const query = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "") query.set(key, String(value));
  });
  const serialized = query.toString();
  return serialized ? `?${serialized}` : "";
}

export async function submitStudentApplication(payload: StudentApplicationPayload) {
  const result = await apiRequest<ApiEnvelope<DelegateRegistrationConfirmation>>(
    "/student-delegate-applications",
    { method: "POST", body: payload },
  );
  return result.ok && result.data
    ? { ok: true as const, registration: result.data.data }
    : { ok: false as const, status: result.status, error: result.error };
}

export async function getAdminStudentVerifications(filters: StudentVerificationListFilters) {
  const result = await apiRequest<
    ApiEnvelope<{
      verifications: {
        items: StudentVerificationListItem[];
        total: number;
        page: number;
        limit: number;
      };
    }>
  >(`/admin/student-verifications${toQuery(filters)}`);
  return result.ok && result.data
    ? { ok: true as const, verifications: result.data.data.verifications }
    : { ok: false as const, status: result.status, error: result.error };
}

export async function getStudentEvidence(reference: string, continuationToken: string) {
  const result = await evidenceRequest<ApiEnvelope<{ evidence: StudentEvidenceList }>>(
    `/student-delegate-applications/${encodeURIComponent(reference)}/evidence`,
    continuationToken,
  );
  return result.ok && result.data
    ? { ok: true as const, evidence: result.data.data.evidence }
    : { ok: false as const, status: result.status, error: result.error };
}

export async function uploadStudentEvidence(options: {
  reference: string;
  continuationToken: string;
  evidenceType: StudentEvidenceType;
  file: File;
  replacementEvidenceId?: string | undefined;
}) {
  const form = new FormData();
  form.append("file", options.file);
  const suffix = options.replacementEvidenceId
    ? `/${encodeURIComponent(options.replacementEvidenceId)}/replace`
    : "";
  const result = await evidenceRequest<
    ApiEnvelope<{ evidence: StudentEvidenceMetadata; readiness: StudentEvidenceReadiness }>
  >(
    `/student-delegate-applications/${encodeURIComponent(options.reference)}/evidence${suffix}`,
    options.continuationToken,
    {
      method: "POST",
      headers: { "X-AIAIAC-Evidence-Type": options.evidenceType },
      body: form,
    },
  );
  return result.ok && result.data
    ? { ok: true as const, result: result.data.data }
    : { ok: false as const, status: result.status, error: result.error };
}

export async function downloadAdminStudentEvidence(
  reference: string,
  evidenceId: string,
  displayFilename: string,
) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/admin/student-verifications/${encodeURIComponent(reference)}/evidence/${encodeURIComponent(evidenceId)}/download`,
      { credentials: "include", headers: { Accept: "application/octet-stream" } },
    );
    if (!response.ok) return { ok: false as const, error: uploadError(response.status) };
    const url = URL.createObjectURL(await response.blob());
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = displayFilename;
    anchor.click();
    URL.revokeObjectURL(url);
    return { ok: true as const };
  } catch {
    return { ok: false as const, error: "The evidence document could not be downloaded." };
  }
}
