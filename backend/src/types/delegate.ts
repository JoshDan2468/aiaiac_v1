export type DelegateType = "PROFESSIONAL" | "STUDENT";
export type RegistrationStatus =
  "SUBMITTED" | "UNDER_REVIEW" | "APPROVED" | "REJECTED" | "CANCELLED";
export type PaymentStatus =
  "PENDING" | "PAID" | "FAILED" | "REFUNDED" | "CANCELLED";

export interface DelegatePackagePrice {
  currency: "USD" | "NGN";
  amountMinor: number;
}

export interface DelegatePackage {
  id: string;
  slug: string;
  name: string;
  delegateType: DelegateType;
  description: string;
  benefits: string[];
  currency: string;
  priceMinor: number;
  prices: DelegatePackagePrice[];
}

export interface DelegateRegistrationInput {
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

export interface CreatedDelegateRegistration {
  id: string;
  reference: string;
  registrationStatus: "SUBMITTED";
  paymentStatus: "PENDING";
  submittedAt: Date;
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
  submittedAt: Date;
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
  currency: string;
  priceMinor: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DelegateListFilters {
  page: number;
  limit: number;
  search?: string | undefined;
  packageId?: string | undefined;
  registrationStatus?: RegistrationStatus | undefined;
  paymentStatus?: PaymentStatus | undefined;
  country?: string | undefined;
  submittedFrom?: Date | undefined;
  submittedTo?: Date | undefined;
  sort: "submitted_desc" | "submitted_asc" | "name_asc" | "name_desc";
}

export interface DelegateListResult {
  items: DelegateListItem[];
  total: number;
  page: number;
  limit: number;
}
