import type { AdminPaymentNotificationEmailInput } from "../email.types";

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ]!,
  );
}

export function adminPaymentNotificationTemplate(
  input: AdminPaymentNotificationEmailInput,
) {
  const amount = new Intl.NumberFormat(
    input.currency === "NGN" ? "en-NG" : "en-US",
    {
      style: "currency",
      currency: input.currency,
    },
  ).format(input.amountMinor / 100);
  const confirmedAt = input.confirmedAt.toISOString();
  const lines = [
    `Hello ${input.fullName},`,
    "",
    "A Professional Delegate payment has been confirmed.",
    `Delegate: ${input.delegateName}`,
    `Registration reference: ${input.registrationReference}`,
    `Package: ${input.packageName}`,
    `Amount: ${amount} (${input.currency})`,
    `Payment reference: ${input.paymentReference}`,
    `Confirmed at: ${confirmedAt}`,
  ];
  return {
    subject: `Payment confirmed — ${input.registrationReference}`,
    text: lines.join("\n"),
    html: `<p>Hello ${escapeHtml(input.fullName)},</p>
      <p>A <strong>Professional Delegate</strong> payment has been confirmed.</p>
      <ul>
        <li>Delegate: ${escapeHtml(input.delegateName)}</li>
        <li>Registration reference: ${escapeHtml(input.registrationReference)}</li>
        <li>Package: ${escapeHtml(input.packageName)}</li>
        <li>Amount: ${escapeHtml(amount)} (${escapeHtml(input.currency)})</li>
        <li>Payment reference: ${escapeHtml(input.paymentReference)}</li>
        <li>Confirmed at: ${escapeHtml(confirmedAt)}</li>
      </ul>`,
  };
}
