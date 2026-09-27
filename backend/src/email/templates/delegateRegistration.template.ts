import {
  aiaiacEmailLayout,
  emailInformationRows,
  escapeEmailHtml,
} from "./aiaiacEmailLayout";

export function delegateRegistrationTemplate(input: {
  fullName: string;
  registrationReference: string;
}) {
  const subject = "Registration Received — AIAIAC Africa 2027";
  const text = [
    `Hello ${input.fullName},`,
    "We have received your Professional Delegate registration for AIAIAC Africa 2027.",
    `Registration reference: ${input.registrationReference}`,
    "Category: Professional Delegate",
    "Next step: complete payment using the secure checkout offered after registration.",
    "Payment has not been confirmed. An Event Pass is issued only after successful payment.",
    "AIAIAC Africa 2027 · 22–23 June 2027 · Lagos, Nigeria",
  ].join("\n\n");
  const bodyHtml = `<h1 style="margin:0 0 18px;font-size:25px;line-height:1.3">Registration received</h1><p>Hello ${escapeEmailHtml(input.fullName)},</p><p>We have received your Professional Delegate registration for AIAIAC Africa 2027.</p>${emailInformationRows(
    [
      ["Registration reference", input.registrationReference],
      ["Category", "Professional Delegate"],
    ],
  )}<p><strong>Next step:</strong> Complete payment using the secure checkout offered after registration.</p><p style="color:#405a4c">Payment has not been confirmed. An Event Pass is issued only after successful payment.</p>`;
  return {
    subject,
    text,
    html: aiaiacEmailLayout({
      title: "Registration received",
      preview:
        "Your Professional Delegate registration is received; payment is the next step.",
      bodyHtml,
    }),
  };
}
