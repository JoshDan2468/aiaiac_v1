import { z } from "zod";
import { communicationAudiences } from "../types/communication";

const cleanText = (max: number, min = 1) => z.string().trim().min(min).max(max);
const cleanLine = (max: number, min = 1) => cleanText(max, min).refine((value) => !/[\r\n]/.test(value), "Line breaks are not allowed");
const audienceSchema = z.object({
  code: z.enum(communicationAudiences),
  registrationStatus: z.enum(["SUBMITTED", "UNDER_REVIEW", "APPROVED", "REJECTED", "CANCELLED"]).optional(),
  paymentStatus: z.enum(["PENDING", "PAID", "FAILED", "REFUNDED", "CANCELLED"]).optional(),
  verificationStatus: z.enum(["NOT_SUBMITTED", "PENDING", "MORE_INFORMATION_REQUIRED", "APPROVED", "REJECTED"]).optional(),
  country: cleanLine(100).optional(),
  currency: z.enum(["NGN", "USD"]).optional(),
  abstractStatus: z.enum(["SUBMITTED", "UNDER_REVIEW", "REVISION_REQUIRED", "ACCEPTED", "REJECTED"]).optional(),
}).strict().superRefine((value, context) => {
  const delegates = value.code.includes("DELEGATES");
  if (!delegates && (value.registrationStatus || value.paymentStatus || value.verificationStatus || value.country || value.currency)) {
    context.addIssue({ code: "custom", message: "Delegate filters require a delegate audience" });
  }
  if (value.verificationStatus && !["ALL_DELEGATES", "STUDENT_DELEGATES"].includes(value.code)) {
    context.addIssue({ code: "custom", message: "Verification status requires a Student audience" });
  }
  if (value.abstractStatus && value.code !== "ABSTRACT_AUTHORS") {
    context.addIssue({ code: "custom", message: "Abstract status requires abstract authors" });
  }
});

export const communicationContentSchema = z.object({
  title: cleanLine(120, 3),
  subject: cleanLine(180, 3),
  preheader: cleanLine(180, 3),
  heading: cleanLine(180, 3),
  body: cleanText(5000, 10),
  ctaLabel: cleanLine(80).nullable().optional(),
  ctaUrl: z.url({ protocol: /^https:$/ }).max(500).nullable().optional(),
  audience: audienceSchema,
}).strict().superRefine((value, context) => {
  if (Boolean(value.ctaLabel) !== Boolean(value.ctaUrl)) {
    context.addIssue({ code: "custom", message: "CTA label and HTTPS URL must be provided together" });
  }
});

export const audienceRequestSchema = audienceSchema;
export const testSendSchema = z.object({ email: z.email().max(254) }).strict();
export const confirmSchema = z.object({ fingerprint: z.string().regex(/^[a-f0-9]{64}$/) }).strict();
export const listSchema = z.object({
  page: z.coerce.number().int().min(1).max(10000).default(1),
  status: z.enum(["DRAFT", "SENDING", "SENT", "PARTIALLY_FAILED", "FAILED"]).optional(),
}).strict();
export const deliveryListSchema = z.object({
  page: z.coerce.number().int().min(1).max(10000).default(1),
  status: z.enum(["PENDING", "CLAIMED", "SENT", "FAILED"]).optional(),
  campaign: z.string().regex(/^AIAIAC-COM-[A-F0-9]{8}$/).optional(),
}).strict();
