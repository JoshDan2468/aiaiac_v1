import { apiRequest } from "@/services/api/client";

export type DelegateType = "PROFESSIONAL" | "STUDENT";
export type RegistrationStatus =
  "SUBMITTED" | "UNDER_REVIEW" | "APPROVED" | "REJECTED" | "CANCELLED";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED" | "CANCELLED";
export type DelegatePackageCurrency = "USD" | "NGN";

export interface DelegatePackagePrice {
  currency: DelegatePackageCurrency;
  amountMinor: number;
}

export interface DelegatePackage {
  id: string;
  slug: string;
  name: string;
  delegateType: DelegateType;
  description: string;
  benefits: string[];
  currency: DelegatePackageCurrency | null;
  priceMinor: number | null;
  prices: DelegatePackagePrice[];
  paymentAvailable: boolean;
  verificationRequired: boolean;
  pricingStatus: "AVAILABLE" | "TO_BE_CONFIRMED";
}

export interface DelegateRegistrationPayload {
  packageId: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  telephone?: string | undefined;
  jobTitle: string;
  companyName: string;
  country: string;
  primaryActivity: string;
  mainObjective: string;
  heardAboutSource: string;
  privacyConsent: true;
  dataSharingConsent: boolean;
}

export interface DelegateRegistrationConfirmation {
  reference: string;
  registrationStatus: "SUBMITTED";
  paymentStatus: "PENDING";
  verificationStatus?: "NOT_SUBMITTED" | undefined;
  paymentAvailable?: boolean | undefined;
  continuationToken?: string | undefined;
  continuationTokenExpiresAt?: string | undefined;
}

export interface DelegateListItem {
  id: string;
  reference: string;
  firstName: string;
  lastName: string;
  companyName: string;
  packageName: string;
  country: string;
  registrationStatus: RegistrationStatus;
  paymentStatus: PaymentStatus;
  submittedAt: string;
}

export interface DelegateRegistrationDetail extends DelegateListItem {
  email: string;
  mobile: string;
  telephone: string | null;
  jobTitle: string;
  primaryActivity: string;
  mainObjective: string;
  heardAboutSource: string;
  privacyConsent: boolean;
  dataSharingConsent: boolean;
  packageId: string;
  packageType: DelegateType;
  packageDescription: string;
  packageBenefits: string[];
  currency: string | null;
  priceMinor: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface DelegateListFilters {
  page?: number | undefined;
  limit?: number | undefined;
  search?: string | undefined;
  packageId?: string | undefined;
  registrationStatus?: RegistrationStatus | undefined;
  paymentStatus?: PaymentStatus | undefined;
  country?: string | undefined;
  submittedFrom?: string | undefined;
  submittedTo?: string | undefined;
  sort?: "submitted_desc" | "submitted_asc" | "name_asc" | "name_desc" | undefined;
}

interface ApiEnvelope<T> {
  success: true;
  data: T;
}

function toQuery(filters: DelegateListFilters): string {
  const query = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "") query.set(key, String(value));
  });
  const serialized = query.toString();
  return serialized ? `?${serialized}` : "";
}

export async function getDelegatePackages() {
  const result =
    await apiRequest<ApiEnvelope<{ packages: DelegatePackage[] }>>("/delegate-packages");
  return result.ok && result.data
    ? { ok: true as const, packages: result.data.data.packages }
    : { ok: false as const, status: result.status, error: result.error };
}

export async function submitDelegateRegistration(payload: DelegateRegistrationPayload) {
  const result = await apiRequest<ApiEnvelope<DelegateRegistrationConfirmation>>(
    "/delegate-registrations",
    { method: "POST", body: payload },
  );
  return result.ok && result.data
    ? { ok: true as const, registration: result.data.data }
    : { ok: false as const, status: result.status, error: result.error };
}

export async function getAdminDelegates(filters: DelegateListFilters) {
  const result = await apiRequest<
    ApiEnvelope<{
      registrations: { items: DelegateListItem[]; total: number; page: number; limit: number };
    }>
  >(`/admin/delegates${toQuery(filters)}`);
  return result.ok && result.data
    ? { ok: true as const, registrations: result.data.data.registrations }
    : { ok: false as const, status: result.status, error: result.error };
}

export async function getAdminDelegate(id: string) {
  const result = await apiRequest<ApiEnvelope<{ registration: DelegateRegistrationDetail }>>(
    `/admin/delegates/${id}`,
  );
  return result.ok && result.data
    ? { ok: true as const, registration: result.data.data.registration }
    : { ok: false as const, status: result.status, error: result.error };
}
