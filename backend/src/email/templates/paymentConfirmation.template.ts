import type { PaymentConfirmationEmailInput } from "../email.types";

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ]!,
  );
}

export function paymentConfirmationTemplate(
  input: PaymentConfirmationEmailInput,
) {
  const amount = new Intl.NumberFormat(
    input.currency === "NGN" ? "en-NG" : "en-US",
    {
      style: "currency",
      currency: input.currency,
    },
  ).format(input.amountMinor / 100);
  const lines = [
    `Hello ${input.fullName},`,
    "",
    "Your payment for the AIAIAC 2027 Conference & Innovation Showcase has been confirmed.",
    "Event: 22–23 June 2027, Lagos, Nigeria",
    `Registration reference: ${input.registrationReference}`,
    `Payment reference: ${input.paymentReference}`,
    `Delegate category: ${input.packageName}`,
    `Amount: ${amount} (${input.currency})`,
    `Event-pass credential: ${input.eventPassCredential}`,
    "Retain this email and present the QR event pass for accreditation/check-in.",
  ];
  return {
    subject: "AIAIAC 2027 payment confirmed and event pass",
    text: lines.join("\n"),
    html: `<p>Hello ${escapeHtml(input.fullName)},</p>
      <p>Your payment for the <strong>AIAIAC 2027 Conference &amp; Innovation Showcase</strong> has been confirmed.</p>
      <p><strong>22–23 June 2027 · Lagos, Nigeria</strong></p>
      <ul>
        <li>Registration reference: ${escapeHtml(input.registrationReference)}</li>
        <li>Payment reference: ${escapeHtml(input.paymentReference)}</li>
        <li>Delegate category: ${escapeHtml(input.packageName)}</li>
        <li>Amount: ${escapeHtml(amount)} (${escapeHtml(input.currency)})</li>
      </ul>
      <h2>Your event pass</h2>
      <p><img src="cid:aiaiac-event-pass-qr" width="280" height="280" alt="AIAIAC 2027 event-pass QR code" /></p>
      <p>Credential: <code>${escapeHtml(input.eventPassCredential)}</code></p>
      <p>Retain this email and present the QR event pass for accreditation/check-in.</p>`,
  };
}
