import assert from "node:assert/strict";
import test from "node:test";
import { EmailService } from "../src/email/email.service";
import type {
  EmailProvider,
  TransactionalEmail,
} from "../src/email/email.types";
import {
  createEventPassCredential,
  hashEventPassCredential,
  renderEventPassQrBase64,
} from "../src/eventPass/eventPassCredential";
import type { PaymentCompletionRepository } from "../src/repositories/paymentCompletion.repository";
import { PaymentCompletionService } from "../src/services/paymentCompletion.service";
import type { PaymentRecord } from "../src/types/payment";

const payment = (overrides: Partial<PaymentRecord> = {}): PaymentRecord => ({
  id: "5f1369a7-7d55-41bd-9641-450ac9d62857",
  registrationId: "3b7a5ce4-b0d4-4196-a3ba-116c4b62f141",
  registrationReference: "AIAIAC-DEL-ABCDEFGH",
  delegateName: "Amina Okafor",
  delegateEmail: "amina@example.com",
  provider: "PAYSTACK",
  paymentReference: "AIAIAC-PAY-1234567890ABCDEFGHIJKLMN",
  providerTransactionId: "4099260516",
  packageCode: "PROFESSIONAL",
  packageName: "Professional Delegate",
  currency: "NGN",
  amountMinor: 210000000,
  status: "PAID",
  authorizationUrl: null,
  accessCode: null,
  channel: "card",
  gatewayResponse: "Successful",
  confirmationEmailStatus: "PENDING",
  createdAt: new Date("2026-09-20T09:00:00.000Z"),
  paidAt: new Date("2026-09-20T10:00:00.000Z"),
  verifiedAt: new Date("2026-09-20T10:00:01.000Z"),
  ...overrides,
});

class FakeCompletionRepository implements PaymentCompletionRepository {
  passCount = 0;
  delegateAttempts = 0;
  delegateResults: boolean[] = [];
  credentialHashes: string[] = [];
  adminResults: boolean[] = [];
  delegateSent = false;
  adminSent = false;

  async claimDelegateConfirmation(_reference: string, credentialHash: string) {
    if (this.passCount === 0) this.passCount = 1;
    if (this.delegateSent || this.delegateAttempts >= 3) {
      return {
        shouldSend: false,
        eventPass: {
          id: "pass-1",
          registrationId: payment().registrationId,
          status: "ACTIVE" as const,
          issuedAt: new Date(),
          checkedInAt: null,
        },
      };
    }
    this.delegateAttempts += 1;
    this.credentialHashes.push(credentialHash);
    return {
      shouldSend: true,
      eventPass: {
        id: "pass-1",
        registrationId: payment().registrationId,
        status: "ACTIVE" as const,
        issuedAt: new Date(),
        checkedInAt: null,
      },
    };
  }

  async recordDelegateConfirmationResult(_reference: string, sent: boolean) {
    this.delegateResults.push(sent);
    this.delegateSent = sent;
  }

  async claimAdminNotifications() {
    if (this.adminSent) return [];
    return [
      {
        id: "notification-1",
        email: "oversight@example.com",
        fullName: "Oversight Admin",
      },
    ];
  }

  async recordAdminNotificationResult(_id: string, sent: boolean) {
    this.adminResults.push(sent);
    this.adminSent = sent;
  }
}

class FakeEmailProvider implements EmailProvider {
  messages: TransactionalEmail[] = [];
  failFor = new Set<string>();

  async send(message: TransactionalEmail) {
    if (this.failFor.has(message.toEmail)) throw new Error("mail failure");
    this.messages.push(message);
  }
}

function buildCompletion() {
  const repository = new FakeCompletionRepository();
  const provider = new FakeEmailProvider();
  const service = new PaymentCompletionService(
    repository,
    new EmailService(provider, "http://localhost:5173"),
    ["SUPER_ADMIN"],
    () => new Date("2026-09-20T10:00:02.000Z"),
  );
  return { repository, provider, service };
}

test("first trusted PAID completion issues one pass and both notifications", async () => {
  const context = buildCompletion();
  await context.service.process(payment());
  assert.equal(context.repository.passCount, 1);
  assert.equal(context.provider.messages.length, 2);
  assert.deepEqual(context.repository.delegateResults, [true]);
  assert.deepEqual(context.repository.adminResults, [true]);
});

test("repeated completion does not issue another pass or delegate email", async () => {
  const context = buildCompletion();
  await context.service.process(payment());
  await context.service.process(payment());
  assert.equal(context.repository.passCount, 1);
  assert.equal(
    context.provider.messages.filter(
      (message) => message.toEmail === "amina@example.com",
    ).length,
    1,
  );
});

test("confirmation uses actual NGN transaction amount and embeds the QR", async () => {
  const context = buildCompletion();
  await context.service.process(payment());
  const message = context.provider.messages.find(
    (candidate) => candidate.toEmail === "amina@example.com",
  );
  assert.ok(message);
  assert.match(message.text, /₦2,100,000\.00 \(NGN\)/);
  assert.match(message.text, /22–23 June 2027, Lagos, Nigeria/);
  assert.equal(message.inlineAttachments?.[0]?.contentType, "image/png");
  assert.ok((message.inlineAttachments?.[0]?.base64Content.length ?? 0) > 100);
});

test("confirmation uses actual USD transaction amount when USD was paid", async () => {
  const context = buildCompletion();
  await context.service.process(
    payment({ currency: "USD", amountMinor: 150000 }),
  );
  const message = context.provider.messages.find(
    (candidate) => candidate.toEmail === "amina@example.com",
  );
  assert.match(message?.text ?? "", /\$1,500\.00 \(USD\)/);
  assert.doesNotMatch(message?.text ?? "", /₦2,100,000/);
});

test("event-pass credential is a 256-bit opaque value with a SHA-256 hash", () => {
  const first = createEventPassCredential();
  const second = createEventPassCredential();
  assert.match(first.raw, /^AIAIAC-PASS-[A-Za-z0-9_-]{43}$/);
  assert.match(first.hash, /^[a-f0-9]{64}$/);
  assert.equal(first.hash, hashEventPassCredential(first.raw));
  assert.notEqual(first.raw, second.raw);
  assert.notEqual(first.hash, second.hash);
});

test("event-pass QR payload excludes PII, payment data, and database UUIDs", async () => {
  const credential = createEventPassCredential();
  const forbidden = [
    "amina@example.com",
    "+2348012345678",
    "210000000",
    payment().registrationId,
    payment().paymentReference,
    "sk_test_secret",
    "session=",
  ];
  for (const value of forbidden)
    assert.equal(credential.raw.includes(value), false);
  const qr = await renderEventPassQrBase64(credential.raw);
  assert.ok(
    Buffer.from(qr, "base64")
      .subarray(0, 8)
      .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])),
  );
});

test("delegate Mailjet failure is recorded and does not mutate PAID status", async () => {
  const context = buildCompletion();
  context.provider.failFor.add("amina@example.com");
  const paid = payment();
  await context.service.process(paid);
  assert.equal(paid.status, "PAID");
  assert.deepEqual(context.repository.delegateResults, [false]);
  assert.deepEqual(context.repository.adminResults, [true]);
});

test("failed delegate delivery retries are bounded to three attempts", async () => {
  const context = buildCompletion();
  context.provider.failFor.add("amina@example.com");
  for (let attempt = 0; attempt < 5; attempt += 1) {
    await context.service.process(payment());
  }
  assert.equal(context.repository.delegateAttempts, 3);
  assert.deepEqual(context.repository.delegateResults, [false, false, false]);
});

test("Admin notification failure is tracked independently of delegate delivery", async () => {
  const context = buildCompletion();
  context.provider.failFor.add("oversight@example.com");
  await context.service.process(payment());
  assert.deepEqual(context.repository.delegateResults, [true]);
  assert.deepEqual(context.repository.adminResults, [false]);
});

test("non-PAID transactions cannot enter the completion workflow", async () => {
  const context = buildCompletion();
  await context.service.process(payment({ status: "PENDING" }));
  assert.equal(context.repository.passCount, 0);
  assert.equal(context.provider.messages.length, 0);
});
