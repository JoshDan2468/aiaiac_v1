import assert from "node:assert/strict";
import test from "node:test";
import { adminPaymentNotificationTemplate } from "../src/email/templates/adminPaymentNotification.template";
import { delegateRegistrationTemplate } from "../src/email/templates/delegateRegistration.template";
import { paymentConfirmationTemplate } from "../src/email/templates/paymentConfirmation.template";
import {
  studentRecoveryTemplate,
  studentVerificationTemplate,
} from "../src/email/templates/studentVerification.template";
import type { DelegateRegistrationAcknowledgementRepository } from "../src/repositories/delegateRegistrationAcknowledgement.repository";
import { DelegateRegistrationAcknowledgementService } from "../src/services/delegateRegistrationAcknowledgement.service";

test("Professional acknowledgement identifies the delegate and requests payment without claiming success", () => {
  const message = delegateRegistrationTemplate({
    fullName: "Ada <Example>",
    registrationReference: "AIAIAC-DEL-ABCD2345",
  });
  assert.equal(message.subject, "Registration Received — AIAIAC Africa 2027");
  assert.match(message.text, /Ada <Example>/);
  assert.match(message.text, /AIAIAC-DEL-ABCD2345/);
  assert.match(message.text, /Professional Delegate/);
  assert.match(message.text, /complete payment/i);
  assert.doesNotMatch(message.text, /^PAYMENT CONFIRMED$/m);
  assert.doesNotMatch(message.html, /cid:|<img|AIAIAC-PASS-/);
  assert.match(message.html, /Ada &lt;Example&gt;/);
  assert.match(message.html, /22–23 June 2027/);
});

test("payment confirmation shows authoritative currency and QR CID without exposing raw credential", () => {
  const base = {
    email: "ada@example.com",
    fullName: "Ada <Example>",
    registrationReference: "AIAIAC-DEL-ABCD2345",
    paymentReference: "AIAIAC-PAY-1234567890ABCDEFGHIJKLMN",
    packageName: "Professional Delegate",
    eventPassQrBase64: "synthetic-image",
  };
  for (const [currency, amountMinor, formatted] of [
    ["NGN", 210000000, "₦2,100,000.00"],
    ["USD", 150000, "$1,500.00"],
  ] as const) {
    const message = paymentConfirmationTemplate({
      ...base,
      currency,
      amountMinor,
    });
    assert.match(message.subject, /Payment Confirmed/);
    assert.match(message.text, /Ada <Example>/);
    assert.match(message.text, /AIAIAC-DEL-ABCD2345/);
    assert.match(message.text, /AIAIAC-PAY-1234567890ABCDEFGHIJKLMN/);
    assert.ok(message.text.includes(formatted));
    assert.match(message.text, /22–23 June 2027, Lagos, Nigeria/);
    assert.match(message.html, /cid:aiaiac-event-pass-qr/);
    assert.match(
      message.html,
      /alt="AIAIAC Africa 2027 Event Pass QR code for check-in"/,
    );
    assert.doesNotMatch(message.html, /<script|<link|linear-gradient/i);
    assert.doesNotMatch(message.html + message.text, /AIAIAC-PASS-/);
    assert.match(message.html, /Ada &lt;Example&gt;/);
  }
});

test("Admin payment message is operational and contains no QR or credential", () => {
  const message = adminPaymentNotificationTemplate({
    email: "admin@example.com",
    fullName: "Test Admin",
    delegateName: "Ada Example",
    delegateEmail: "ada@example.com",
    registrationReference: "AIAIAC-DEL-ABCD2345",
    paymentReference: "AIAIAC-PAY-1234567890ABCDEFGHIJKLMN",
    packageName: "Professional Delegate",
    currency: "NGN",
    amountMinor: 210000000,
    confirmedAt: new Date("2026-09-25T12:00:00.000Z"),
  });
  assert.match(message.subject, /AIAIAC-DEL-ABCD2345/);
  for (const value of [
    "Ada Example",
    "ada@example.com",
    "Professional Delegate",
    "₦2,100,000.00",
    "AIAIAC-PAY-1234567890ABCDEFGHIJKLMN",
    "2026-09-25T12:00:00.000Z",
  ])
    assert.ok(message.text.includes(value));
  assert.match(message.text, /protected Admin workspace/);
  assert.doesNotMatch(
    message.html + message.text,
    /cid:|AIAIAC-PASS-|sk_(test|live)_/,
  );
});

test("Student presentation uses shared layout without changing decision or recovery content", () => {
  const decision = studentVerificationTemplate(
    {
      email: "student@example.com",
      fullName: "Student <Example>",
      registrationReference: "AIAIAC-DEL-ABCD2345",
      notificationType: "MORE_INFORMATION_REQUIRED",
      reason: "Upload a clearer ID",
    },
    "https://example.test/registration/student-verification",
  );
  assert.match(decision.text, /Upload a clearer ID/);
  assert.match(decision.html, /Student &lt;Example&gt;/);
  assert.match(decision.html, /AIAIAC Africa 2027/);
  assert.match(decision.html, /Open the secure Student verification portal/);

  const recovery = studentRecoveryTemplate({
    fullName: "Student Example",
    registrationReference: "AIAIAC-DEL-ABCD2345",
    recoveryUrl: "https://example.test/recover?token=sample",
    expiresAt: new Date("2026-09-25T13:00:00.000Z"),
  });
  assert.match(recovery.text, /single-use/i);
  assert.match(recovery.html, /Restore secure access/);
  assert.match(recovery.html, /22–23 June 2027/);
});

test("registration acknowledgement is post-persistence, deduplicated, and email failure cannot undo registration", async () => {
  let status: "NOT_QUEUED" | "PENDING" | "SENT" | "FAILED" = "NOT_QUEUED";
  let attempts = 0;
  const repository: DelegateRegistrationAcknowledgementRepository = {
    async claim() {
      if (status === "SENT" || attempts >= 3) return null;
      status = "PENDING";
      attempts += 1;
      return {
        email: "ada@example.com",
        fullName: "Ada Example",
        registrationReference: "AIAIAC-DEL-ABCD2345",
      };
    },
    async recordResult(_id, sent) {
      status = sent ? "SENT" : "FAILED";
    },
  };
  const messages: string[] = [];
  const service = new DelegateRegistrationAcknowledgementService(repository, {
    async sendDelegateRegistrationAcknowledgement(input) {
      messages.push(input.registrationReference);
    },
  });
  await service.send("registration-id");
  await service.send("registration-id");
  assert.equal(status, "SENT");
  assert.equal(attempts, 1);
  assert.deepEqual(messages, ["AIAIAC-DEL-ABCD2345"]);

  status = "NOT_QUEUED";
  attempts = 0;
  const failing = new DelegateRegistrationAcknowledgementService(repository, {
    async sendDelegateRegistrationAcknowledgement() {
      throw new Error("provider unavailable");
    },
  });
  await failing.send("registration-id");
  assert.equal(status, "FAILED");
  assert.equal(attempts, 1);
  await service.send("registration-id");
  await service.send("registration-id");
  assert.equal(status, "SENT");
  assert.equal(attempts, 2);
  assert.equal(messages.length, 2);
});
