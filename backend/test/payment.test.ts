import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test from "node:test";
import { Router, type RequestHandler } from "express";
import request from "supertest";
import { createApplication } from "../src/app";
import { createAdminPaymentController } from "../src/controllers/adminPayment.controller";
import { createPaymentController } from "../src/controllers/payment.controller";
import { EmailService } from "../src/email/email.service";
import type {
  EmailProvider,
  TransactionalEmail,
} from "../src/email/email.types";
import { createPaystackWebhookSignatureMiddleware } from "../src/middleware/paystackWebhookSignature.middleware";
import { PaymentService } from "../src/payments/payment.service";
import type {
  InitializeProviderPaymentInput,
  InitializedProviderPayment,
  PaymentProvider,
  VerifiedProviderPayment,
} from "../src/payments/payment.types";
import { PaystackProvider } from "../src/payments/providers/paystack.provider";
import type {
  PaymentFinalization,
  PaymentPreparation,
  PaymentRepository,
  SuccessfulPaymentInput,
} from "../src/repositories/payment.repository";
import { createAdminRouter } from "../src/routes/admin.routes";
import { createPaymentRouter } from "../src/routes/payment.routes";
import {
  DelegatePaymentService,
  PaymentAlreadyPaidError,
  PaymentInitializationFailedError,
  PaymentInitializationInProgressError,
  PaymentNotFoundError,
  PaymentPriceUnavailableError,
  PaymentVerificationMismatchError,
} from "../src/services/delegatePayment.service";
import type { AdminRole } from "../src/types/admin";
import type {
  PaymentDetail,
  PaymentListFilters,
  PaymentListResult,
  PaymentRecord,
} from "../src/types/payment";

const registrationReference = "AIAIAC-DEL-ABCDEFGH";
const paymentReference = "AIAIAC-PAY-1234567890ABCDEFGHIJKLMN";
const secret = "sk_test_payment_test_secret";

function makePayment(overrides: Partial<PaymentRecord> = {}): PaymentRecord {
  return {
    id: "5f1369a7-7d55-41bd-9641-450ac9d62857",
    registrationId: "3b7a5ce4-b0d4-4196-a3ba-116c4b62f141",
    registrationReference,
    delegateName: "Amina Okafor",
    delegateEmail: "amina@example.com",
    provider: "PAYSTACK",
    paymentReference,
    providerTransactionId: null,
    packageCode: "PROFESSIONAL",
    packageName: "Professional Delegate",
    currency: "USD",
    amountMinor: 100000,
    status: "INITIALIZED",
    authorizationUrl: null,
    accessCode: null,
    channel: null,
    gatewayResponse: null,
    confirmationEmailStatus: "NOT_QUEUED",
    createdAt: new Date("2026-09-15T00:00:00.000Z"),
    paidAt: null,
    verifiedAt: null,
    ...overrides,
  };
}

class FakePaymentRepository implements PaymentRepository {
  payment: PaymentRecord | null = null;
  preparationKind: "normal" | "not_found" | "already_paid" | "initializing" = "normal";
  verificationFailures = 0;
  confirmationResults: boolean[] = [];
  finalizationCalls = 0;

  async prepareInitialization(
    reference: string,
    currency: "USD" | "NGN",
    nextPaymentReference: string,
  ): Promise<PaymentPreparation> {
    if (
      this.preparationKind === "not_found" ||
      reference !== registrationReference
    )
      return { kind: "not_found" };
    if (this.preparationKind === "already_paid")
      return { kind: "already_paid" };
    if (this.preparationKind === "initializing")
      return { kind: "initializing", paymentReference };
    if (currency === "NGN") return { kind: "price_unavailable" };
    if (this.payment?.status === "PENDING")
      return { kind: "existing", payment: this.payment };
    this.payment = makePayment({ paymentReference: nextPaymentReference });
    return {
      kind: "created",
      payment: this.payment,
      email: this.payment.delegateEmail,
      registrationReference,
      packageCode: "PROFESSIONAL",
    };
  }

  async completeInitialization(
    reference: string,
    authorizationUrl: string,
    accessCode: string,
  ) {
    if (!this.payment || this.payment.paymentReference !== reference)
      return null;
    this.payment = {
      ...this.payment,
      authorizationUrl,
      accessCode,
      status: "PENDING",
    };
    return this.payment;
  }

  async failInitialization() {
    if (this.payment) this.payment = { ...this.payment, status: "FAILED" };
  }

  async findByReference(reference: string) {
    return this.payment?.paymentReference === reference ? this.payment : null;
  }

  async recordVerificationFailure() {
    this.verificationFailures += 1;
    if (this.payment?.status !== "PAID")
      this.payment = { ...this.payment!, status: "FAILED" };
  }

  async finalizeSuccessfulPayment(
    input: SuccessfulPaymentInput,
  ): Promise<PaymentFinalization> {
    this.finalizationCalls += 1;
    if (!this.payment) return { kind: "not_found" };
    const reason =
      input.providerReference !== this.payment.paymentReference
        ? "reference"
        : input.amountMinor !== this.payment.amountMinor
          ? "amount"
          : input.currency !== this.payment.currency
            ? "currency"
            : input.customerEmail !== this.payment.delegateEmail
              ? "customer"
              : null;
    if (reason) {
      this.payment = { ...this.payment, status: "FAILED" };
      return { kind: "mismatch", reason };
    }
    if (this.payment.status === "PAID")
      return { kind: "paid", payment: this.payment, becamePaid: false };
    this.payment = {
      ...this.payment,
      status: "PAID",
      providerTransactionId: input.providerTransactionId,
      channel: input.channel,
      gatewayResponse: input.gatewayResponse,
      paidAt: input.paidAt ?? new Date(),
      verifiedAt: new Date(),
      confirmationEmailStatus: "PENDING",
    };
    return { kind: "paid", payment: this.payment, becamePaid: true };
  }

  async recordConfirmationEmailResult(_reference: string, sent: boolean) {
    this.confirmationResults.push(sent);
    if (this.payment)
      this.payment = {
        ...this.payment,
        confirmationEmailStatus: sent ? "SENT" : "FAILED",
      };
  }

  async listPayments(filters: PaymentListFilters): Promise<PaymentListResult> {
    return {
      items: this.payment ? [this.payment] : [],
      total: this.payment ? 1 : 0,
      page: filters.page,
      limit: filters.limit,
    };
  }

  async findPaymentDetail(reference: string): Promise<PaymentDetail | null> {
    const payment = await this.findByReference(reference);
    return payment ? { ...payment, events: [] } : null;
  }
}

class FakeProvider implements PaymentProvider {
  initializationCalls = 0;
  verificationCalls = 0;
  initializationInput: InitializeProviderPaymentInput | null = null;
  failInitialization = false;
  verification: VerifiedProviderPayment = {
    reference: paymentReference,
    status: "success",
    amountMinor: 100000,
    currency: "USD",
    providerTransactionId: "4099260516",
    channel: "card",
    gatewayResponse: "Successful",
    paidAt: new Date("2026-09-15T01:00:00.000Z"),
    customerEmail: "amina@example.com",
  };

  async initialize(
    input: InitializeProviderPaymentInput,
  ): Promise<InitializedProviderPayment> {
    this.initializationCalls += 1;
    this.initializationInput = input;
    if (this.failInitialization)
      throw new Error("provider detail that must not escape");
    return {
      reference: input.reference,
      authorizationUrl: "https://checkout.paystack.com/safe-code",
      accessCode: "safe-code",
    };
  }

  async verify(): Promise<VerifiedProviderPayment> {
    this.verificationCalls += 1;
    return this.verification;
  }
}

class FakeEmailProvider implements EmailProvider {
  messages: TransactionalEmail[] = [];
  fail = false;
  async send(message: TransactionalEmail) {
    if (this.fail) throw new Error("mail provider detail");
    this.messages.push(message);
  }
}

function buildService() {
  const repository = new FakePaymentRepository();
  const provider = new FakeProvider();
  const email = new FakeEmailProvider();
  const service = new DelegatePaymentService(
    repository,
    new PaymentService(provider),
    new EmailService(email, "http://localhost:5173"),
    "http://localhost:5173/registration/payment/callback",
    () => paymentReference,
  );
  return { repository, provider, email, service };
}

test("Professional USD initialization uses exactly 100000 trusted cents and safe output", async () => {
  const { service, provider } = buildService();
  const result = await service.initialize(registrationReference, "USD");
  assert.equal(provider.initializationInput?.amountMinor, 100000);
  assert.equal(provider.initializationInput?.currency, "USD");
  assert.equal(provider.initializationInput?.reference, paymentReference);
  assert.equal(result.displayAmount, "$1,000.00");
  assert.equal("secretKey" in result, false);
});

test("Paystack adapter sends the backend secret only as authorization and drops sensitive payloads", async () => {
  const calls: Array<{ input: string; init?: RequestInit }> = [];
  const fakeFetch = (async (input: string | URL | Request, init?: RequestInit) => {
    calls.push({ input: String(input), ...(init ? { init } : {}) });
    if (String(input).includes("/verify/")) {
      return new Response(
        JSON.stringify({
          status: true,
          data: {
            id: 4099260516,
            status: "success",
            reference: paymentReference,
            amount: 100000,
            currency: "USD",
            channel: "card",
            gateway_response: "Successful",
            paid_at: "2026-09-15T01:00:00.000Z",
            customer: { email: "amina@example.com" },
            authorization: { authorization_code: "AUTH_must_not_escape" },
          },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    }
    return new Response(
      JSON.stringify({
        status: true,
        data: {
          authorization_url: "https://checkout.paystack.com/safe-code",
          access_code: "safe-code",
          reference: paymentReference,
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  }) as typeof fetch;
  const provider = new PaystackProvider(secret, fakeFetch);
  const initialized = await provider.initialize({
    email: "amina@example.com",
    amountMinor: 100000,
    currency: "USD",
    reference: paymentReference,
    callbackUrl: "http://localhost:5173/registration/payment/callback",
    metadata: { registrationReference, paymentReference, packageCode: "PROFESSIONAL" },
  });
  const verified = await provider.verify(paymentReference);
  expectSecretOnlyInAuthorization(calls[0]!, secret);
  assert.equal(JSON.stringify(initialized).includes(secret), false);
  assert.equal(JSON.stringify(verified).includes("AUTH_must_not_escape"), false);
});

function expectSecretOnlyInAuthorization(call: { input: string; init?: RequestInit }, value: string) {
  assert.equal(new Headers(call.init?.headers).get("Authorization"), `Bearer ${value}`);
  assert.equal(String(call.init?.body).includes(value), false);
  assert.equal(call.input.includes(value), false);
}

test("NGN is representable but inactive and unknown/body-supplied amounts are rejected", async () => {
  const { service } = buildService();
  await assert.rejects(
    service.initialize(registrationReference, "NGN"),
    PaymentPriceUnavailableError,
  );

  const controller = createPaymentController(service);
  const router = Router();
  router.use(
    createPaymentRouter({
      controller,
      rateLimiter: (_request, _response, next) => next(),
      webhookSignature: (_request, _response, next) => next(),
    }),
  );
  const app = createApplication({ apiRouter: router });
  await request(app)
    .post(
      `/api/delegate-registrations/${registrationReference}/payment/initialize`,
    )
    .send({ currency: "EUR" })
    .expect(400);
  await request(app)
    .post(
      `/api/delegate-registrations/${registrationReference}/payment/initialize`,
    )
    .send({ currency: "USD", amount: 1 })
    .expect(400);
});

test("unknown and already-paid registrations are rejected safely", async () => {
  const first = buildService();
  first.repository.preparationKind = "not_found";
  await assert.rejects(
    first.service.initialize(registrationReference, "USD"),
    PaymentNotFoundError,
  );
  const second = buildService();
  second.repository.preparationKind = "already_paid";
  await assert.rejects(
    second.service.initialize(registrationReference, "USD"),
    PaymentAlreadyPaidError,
  );
});

test("provider failure leaves a failed attempt and a later active attempt is reused", async () => {
  const failed = buildService();
  failed.provider.failInitialization = true;
  await assert.rejects(
    failed.service.initialize(registrationReference, "USD"),
    PaymentInitializationFailedError,
  );
  assert.equal(failed.repository.payment?.status, "FAILED");

  const duplicate = buildService();
  const first = await duplicate.service.initialize(
    registrationReference,
    "USD",
  );
  const second = await duplicate.service.initialize(
    registrationReference,
    "USD",
  );
  assert.equal(first.paymentReference, second.paymentReference);
  assert.equal(duplicate.provider.initializationCalls, 1);
});

test("an in-flight concurrent initialization is rejected without another provider call", async () => {
  const context = buildService();
  context.repository.preparationKind = "initializing";
  await assert.rejects(
    context.service.initialize(registrationReference, "USD"),
    PaymentInitializationInProgressError,
  );
  assert.equal(context.provider.initializationCalls, 0);
});

test("correct verification pays once and sends one confirmation", async () => {
  const context = buildService();
  await context.service.initialize(registrationReference, "USD");
  const first = await context.service.verify(paymentReference);
  const second = await context.service.verify(paymentReference);
  assert.equal(first.status, "PAID");
  assert.equal(second.status, "PAID");
  assert.equal(context.repository.finalizationCalls, 1);
  assert.equal(context.email.messages.length, 1);
  assert.equal(context.repository.confirmationResults.length, 1);
});

test("amount, currency, reference, and customer mismatches never become paid", async (t) => {
  const cases: Array<[string, Partial<VerifiedProviderPayment>]> = [
    ["amount", { amountMinor: 99999 }],
    ["currency", { currency: "NGN" }],
    ["reference", { reference: "AIAIAC-PAY-ZZZZZZZZZZZZZZZZZZZZZZZZ" }],
    ["customer", { customerEmail: "other@example.com" }],
  ];
  for (const [name, override] of cases) {
    await t.test(name, async () => {
      const context = buildService();
      await context.service.initialize(registrationReference, "USD");
      context.provider.verification = {
        ...context.provider.verification,
        ...override,
      };
      await assert.rejects(
        context.service.verify(paymentReference),
        PaymentVerificationMismatchError,
      );
      assert.equal(context.repository.payment?.status, "FAILED");
      assert.equal(context.email.messages.length, 0);
    });
  }
});

test("failed provider status stays unpaid", async () => {
  const context = buildService();
  await context.service.initialize(registrationReference, "USD");
  context.provider.verification = {
    ...context.provider.verification,
    status: "failed",
  };
  const result = await context.service.verify(paymentReference);
  assert.equal(result.status, "FAILED");
  assert.equal(context.email.messages.length, 0);
});

test("email failure is recorded without reversing a paid transaction", async () => {
  const context = buildService();
  context.email.fail = true;
  await context.service.initialize(registrationReference, "USD");
  const result = await context.service.verify(paymentReference);
  assert.equal(result.status, "PAID");
  assert.equal(context.repository.payment?.status, "PAID");
  assert.deepEqual(context.repository.confirmationResults, [false]);
});

function webhookApp(context = buildService()) {
  context.repository.payment = makePayment({
    status: "PENDING",
    authorizationUrl: "https://checkout.paystack.com/safe-code",
    accessCode: "safe-code",
  });
  const apiRouter = Router();
  apiRouter.use(
    createPaymentRouter({
      controller: createPaymentController(context.service),
      rateLimiter: (_request, _response, next) => next(),
      webhookSignature: createPaystackWebhookSignatureMiddleware(secret),
    }),
  );
  return { app: createApplication({ apiRouter }), context };
}

function chargeSuccess(overrides: Record<string, unknown> = {}) {
  return {
    event: "charge.success",
    data: {
      id: 4099260516,
      status: "success",
      reference: paymentReference,
      amount: 100000,
      currency: "USD",
      channel: "card",
      gateway_response: "Successful",
      paid_at: "2026-09-15T01:00:00.000Z",
      customer: { email: "amina@example.com" },
      ...overrides,
    },
  };
}

test("webhook requires a valid raw-body signature and repeated delivery is idempotent", async () => {
  const { app, context } = webhookApp();
  const body = JSON.stringify(chargeSuccess());
  const signature = createHmac("sha512", secret).update(body).digest("hex");
  await request(app)
    .post("/api/payments/paystack/webhook")
    .set("Content-Type", "application/json")
    .send(body)
    .expect(401);
  await request(app)
    .post("/api/payments/paystack/webhook")
    .set("Content-Type", "application/json")
    .set("x-paystack-signature", "0".repeat(128))
    .send(body)
    .expect(401);
  await request(app)
    .post("/api/payments/paystack/webhook")
    .set("Content-Type", "application/json")
    .set("x-paystack-signature", signature)
    .send(body)
    .expect(200);
  await request(app)
    .post("/api/payments/paystack/webhook")
    .set("Content-Type", "application/json")
    .set("x-paystack-signature", signature)
    .send(body)
    .expect(200);
  assert.equal(context.repository.payment?.status, "PAID");
  assert.equal(context.email.messages.length, 1);
});

test("signed webhook mismatches and unknown references are acknowledged without payment", async () => {
  for (const bodyObject of [
    chargeSuccess({ amount: 1 }),
    chargeSuccess({ currency: "NGN" }),
    chargeSuccess({ reference: "AIAIAC-PAY-AAAAAAAAAAAAAAAAAAAAAAAA" }),
  ]) {
    const { app, context } = webhookApp();
    const body = JSON.stringify(bodyObject);
    const signature = createHmac("sha512", secret).update(body).digest("hex");
    const response = await request(app)
      .post("/api/payments/paystack/webhook")
      .set("Content-Type", "application/json")
      .set("x-paystack-signature", signature)
      .send(body)
      .expect(200);
    assert.equal(response.body.data.processed, false);
    assert.notEqual(context.repository.payment?.status, "PAID");
  }
});

test("Admin payment API permits Finance and Super Admin, but denies other roles and anonymous users", async () => {
  const context = buildService();
  context.repository.payment = makePayment({ status: "PAID" });
  const requireAuth: RequestHandler = (req, res, next) => {
    const role = req.header("x-test-role") as AdminRole | undefined;
    if (!role) {
      res.status(401).json({ success: false });
      return;
    }
    res.locals.admin = {
      id: "admin",
      fullName: "Test",
      email: "test@example.com",
      role,
    };
    next();
  };
  const apiRouter = Router();
  apiRouter.use(
    "/admin",
    createAdminRouter({
      requireAuth,
      adminPaymentController: createAdminPaymentController(context.service),
    }),
  );
  const app = createApplication({ apiRouter });
  await request(app).get("/api/admin/payments").expect(401);
  await request(app)
    .get("/api/admin/payments")
    .set("x-test-role", "COMMUNICATIONS")
    .expect(403);
  await request(app)
    .get("/api/admin/payments")
    .set("x-test-role", "FINANCE")
    .expect(200);
  await request(app)
    .get("/api/admin/payments")
    .set("x-test-role", "SUPER_ADMIN")
    .expect(200);
  await request(app)
    .get("/api/admin/payments/' OR 1=1 --")
    .set("x-test-role", "FINANCE")
    .expect(400);
});
