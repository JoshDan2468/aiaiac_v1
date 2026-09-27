export const communicationAudiences = [
  "ALL_DELEGATES", "PROFESSIONAL_DELEGATES", "STUDENT_DELEGATES",
  "SPONSORS", "CONFIRMED_SPONSORS", "EXHIBITORS", "CONFIRMED_EXHIBITORS",
  "ABSTRACT_AUTHORS",
] as const;
export type CommunicationAudienceCode = (typeof communicationAudiences)[number];

export interface CommunicationAudience {
  code: CommunicationAudienceCode;
  registrationStatus?: string | undefined;
  paymentStatus?: string | undefined;
  verificationStatus?: string | undefined;
  country?: string | undefined;
  currency?: "NGN" | "USD" | undefined;
  abstractStatus?: string | undefined;
}

export interface CommunicationContent {
  title: string;
  subject: string;
  preheader: string;
  heading: string;
  body: string;
  ctaLabel?: string | null | undefined;
  ctaUrl?: string | null | undefined;
  audience: CommunicationAudience;
}

export interface CommunicationRecipient {
  email: string;
  name: string;
  sourceCategory: string;
}

export interface CommunicationCampaign extends CommunicationContent {
  id: string;
  reference: string;
  status: "DRAFT" | "SENDING" | "SENT" | "PARTIALLY_FAILED" | "FAILED";
  recipientCount: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  sentAt: Date | null;
  sent: number;
  failed: number;
  pending: number;
  claimed: number;
}

export interface CommunicationDelivery extends CommunicationRecipient {
  id: string;
  campaignId: string;
  status: "PENDING" | "CLAIMED" | "SENT" | "FAILED";
  attempts: number;
  providerMessageId: string | null;
  errorSummary: string | null;
  sentAt: Date | null;
}
