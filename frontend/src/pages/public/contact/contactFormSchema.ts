import { z } from "zod";
import { enquiryTypeValues } from "@/data/contact";

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Enter your full name")
    .max(100, "Keep your name below 100 characters"),
  workEmail: z.string().trim().min(1, "Enter your work email").email("Enter a valid email address"),
  phoneNumber: z
    .string()
    .trim()
    .max(30, "Keep the phone number below 30 characters")
    .refine(
      (value) => value === "" || /^[+()0-9\s.-]{6,30}$/.test(value),
      "Enter a valid phone number or leave this field empty",
    ),
  organisation: z.string().trim().max(120, "Keep the organisation below 120 characters"),
  enquiryType: z.enum(enquiryTypeValues, { message: "Choose an enquiry type" }),
  subject: z
    .string()
    .trim()
    .min(3, "Enter a subject of at least 3 characters")
    .max(120, "Keep the subject below 120 characters"),
  message: z
    .string()
    .trim()
    .min(20, "Tell us a little more in at least 20 characters")
    .max(1500, "Keep the message below 1500 characters"),
});

export type ContactFormInput = z.input<typeof contactFormSchema>;
export type ContactFormValues = z.output<typeof contactFormSchema>;
