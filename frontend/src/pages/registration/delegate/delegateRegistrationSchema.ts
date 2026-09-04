import { z } from "zod";

const requiredText = (label: string, min = 2, max = 200) =>
  z.string().trim().min(min, `${label} is required.`).max(max, `${label} is too long.`);

export const delegateRegistrationSchema = z.object({
  packageId: z.string().uuid("Choose an available delegate package."),
  firstName: requiredText("First name", 1, 100),
  lastName: requiredText("Last name", 1, 100),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  mobile: requiredText("Mobile number", 5, 40),
  telephone: z.string().trim().max(40, "Telephone is too long."),
  jobTitle: requiredText("Job title", 2, 150),
  companyName: requiredText("Company name", 2, 150),
  country: requiredText("Country", 2, 100),
  primaryActivity: requiredText("Primary activity", 2, 200),
  mainObjective: requiredText("Main objective", 10, 1000),
  heardAboutSource: requiredText("How you heard about AIAIAC", 2, 200),
  privacyConsent: z.boolean().refine((value) => value, "Privacy consent is required."),
  dataSharingConsent: z.boolean(),
});

export type DelegateRegistrationFormValues = z.infer<typeof delegateRegistrationSchema>;
