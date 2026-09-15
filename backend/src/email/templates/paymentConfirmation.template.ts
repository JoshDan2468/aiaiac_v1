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
  const amount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: input.currency,
  }).format(input.amountMinor / 100);
  const lines = [
    `Hello ${input.fullName},`,
    "",
    "Your payment for AIAIAC Africa 2027 has been confirmed.",
    `Registration reference: ${input.registrationReference}`,
    `Payment reference: ${input.paymentReference}`,
    `Package: ${input.packageName}`,
    `Amount: ${amount} (${input.currency})`,
  ];
  return {
    subject: "AIAIAC Africa 2027 payment confirmed",
    text: lines.join("\n"),
    html: `<p>Hello ${escapeHtml(input.fullName)},</p>
      <p>Your payment for <strong>AIAIAC Africa 2027</strong> has been confirmed.</p>
      <ul>
        <li>Registration reference: ${escapeHtml(input.registrationReference)}</li>
        <li>Payment reference: ${escapeHtml(input.paymentReference)}</li>
        <li>Package: ${escapeHtml(input.packageName)}</li>
        <li>Amount: ${escapeHtml(amount)} (${escapeHtml(input.currency)})</li>
      </ul>`,
  };
}
