/**
 * Delegate Payment Service
 *
 * Responsible for resolving trusted registration pricing, initializing
 * payment attempts, and finalizing verified payments idempotently. Browser
 * input never supplies an authoritative amount.
 */

import { randomBytes } from "node:crypto";
import { PaystackRequestError } from "../payments/providers/paystack.provider";
import {
  PaymentProviderUnavailableError,
  PaymentService,
} from "../payments/payment.service";
import type { VerifiedProviderPayment } from "../payments/payment.types";
import type {
  PaymentRepository,
  SuccessfulPaymentInput,
} from "../repositories/payment.repository";
import type {
  PaymentCurrency,
  PaymentDetail,
  PaymentListFilters,
  PaymentListResult,
  PaymentRecord,
} from "../types/payment";
import type { PaymentCompletionService } from "./paymentCompletion.service";

export class PaymentNotFoundError extends Error {}
export class PaymentRegistrationIneligibleError extends Error {}
export class PaymentAlreadyPaidError extends Error {}
export class PaymentPriceUnavailableError extends Error {}
export class PaymentInitializationInProgressError extends Error {}
export class PaymentInitializationFailedError extends Error {}
export class PaymentVerificationMismatchError extends Error {}
export class PaymentCompletionIneligibleError extends Error {}

export function createPaymentReference(): string {
  return `AIAIAC-PAY-${randomBytes(12).toString("hex").toUpperCase()}`;
}

function displayAmount(amountMinor: number, currency: PaymentCurrency): string {
  return new Intl.NumberFormat(currency === "NGN" ? "en-NG" : "en-US", {
    style: "currency",
    currency,
  }).format(amountMinor / 100);
}

function safePayment(payment: PaymentRecord) {
  return {
    paymentReference: payment.paymentReference,
    registrationReference: payment.registrationReference,
    package: payment.packageName,
    currency: payment.currency,
    amountMinor: payment.amountMinor,
    displayAmount: displayAmount(payment.amountMinor, payment.currency),
    status: payment.status,
    authorizationUrl: payment.authorizationUrl,
    accessCode: payment.accessCode,
    paidAt: payment.paidAt,
  };
}

export class DelegatePaymentService {
  constructor(
    private readonly repository: PaymentRepository,
    private readonly payments: PaymentService,
    private readonly completion: Pick<PaymentCompletionService, "process">,
    private readonly callbackUrl: string,
    private readonly nextReference: () => string = createPaymentReference,
  ) {}

  async initialize(registrationReference: string, currency: PaymentCurrency) {
    const preparation = await this.repository.prepareInitialization(
      registrationReference,
      currency,
      this.nextReference(),
    );
    if (preparation.kind === "not_found") throw new PaymentNotFoundError();
    if (preparation.kind === "ineligible")
      throw new PaymentRegistrationIneligibleError();
    if (preparation.kind === "already_paid")
      throw new PaymentAlreadyPaidError();
    if (preparation.kind === "price_unavailable")
      throw new PaymentPriceUnavailableError();
    if (preparation.kind === "initializing")
      throw new PaymentInitializationInProgressError();
    if (preparation.kind === "existing")
      return safePayment(preparation.payment);

    try {
      const initialized = await this.payments.initialize({
        email: preparation.email,
        amountMinor: preparation.payment.amountMinor,
        currency: preparation.payment.currency,
        reference: preparation.payment.paymentReference,
        callbackUrl: this.callbackUrl,
        metadata: {
          registrationReference: preparation.registrationReference,
          paymentReference: preparation.payment.paymentReference,
          packageCode: preparation.packageCode,
        },
      });
      if (initialized.reference !== preparation.payment.paymentReference) {
        await this.repository.failInitialization(
          preparation.payment.paymentReference,
        );
        throw new PaymentInitializationFailedError();
      }
      const payment = await this.repository.completeInitialization(
        preparation.payment.paymentReference,
        initialized.authorizationUrl,
        initialized.accessCode,
      );
      if (!payment) throw new PaymentInitializationFailedError();
      return safePayment(payment);
    } catch (error) {
      await this.repository.failInitialization(
        preparation.payment.paymentReference,
      );
      if (
        error instanceof PaymentProviderUnavailableError ||
        error instanceof PaystackRequestError ||
        error instanceof PaymentInitializationFailedError
      ) {
        throw error;
      }
      throw new PaymentInitializationFailedError();
    }
  }

  async verify(paymentReference: string) {
    const local = await this.repository.findByReference(paymentReference);
    if (!local) throw new PaymentNotFoundError();
    if (local.status === "PAID") {
      await this.runCompletion(local);
      return safePayment(local);
    }

    let provider: VerifiedProviderPayment;
    try {
      provider = await this.payments.verify(paymentReference);
    } catch (error) {
      // A signed webhook may have committed PAID while the provider request was in flight.
      const current = await this.repository.findByReference(paymentReference);
      if (current?.status !== "PAID") throw error;
      await this.runCompletion(current);
      return safePayment(current);
    }
    const current = await this.repository.findByReference(paymentReference);
    if (current?.status === "PAID") {
      await this.runCompletion(current);
      return safePayment(current);
    }
    if (provider.status !== "success") {
      if (["failed", "abandoned", "reversed"].includes(provider.status)) {
        await this.repository.recordVerificationFailure(
          paymentReference,
          `PROVIDER_${provider.status.toUpperCase()}`,
        );
        const failed = await this.repository.findByReference(paymentReference);
        return safePayment(failed ?? local);
      }
      return safePayment(local);
    }
    return this.finalize(local, provider);
  }

  async processPaystackWebhook(event: {
    event: string;
    data: {
      id: string | number;
      status: string;
      reference: string;
      amount: number;
      currency: string;
      channel?: string | null | undefined;
      gateway_response?: string | null | undefined;
      paid_at?: string | null | undefined;
      customer: { email: string };
    };
  }): Promise<{ processed: boolean; status?: string }> {
    if (event.event !== "charge.success" || event.data.status !== "success") {
      return { processed: false };
    }
    const local = await this.repository.findByReference(event.data.reference);
    if (!local) return { processed: false };
    try {
      const result = await this.finalize(local, {
        reference: event.data.reference,
        status: event.data.status,
        amountMinor: event.data.amount,
        currency: event.data.currency,
        providerTransactionId: String(event.data.id),
        channel: event.data.channel ?? null,
        gatewayResponse: event.data.gateway_response ?? null,
        paidAt: event.data.paid_at ? new Date(event.data.paid_at) : null,
        customerEmail: event.data.customer.email.trim().toLowerCase(),
      });
      return { processed: true, status: result.status };
    } catch (error) {
      if (error instanceof PaymentVerificationMismatchError)
        return { processed: false };
      throw error;
    }
  }

  private async finalize(
    local: PaymentRecord,
    provider: VerifiedProviderPayment,
  ) {
    const input: SuccessfulPaymentInput = {
      paymentReference: local.paymentReference,
      providerReference: provider.reference,
      providerTransactionId: provider.providerTransactionId,
      amountMinor: provider.amountMinor,
      currency: provider.currency,
      customerEmail: provider.customerEmail,
      channel: provider.channel,
      gatewayResponse: provider.gatewayResponse,
      paidAt: provider.paidAt,
    };
    const result = await this.repository.finalizeSuccessfulPayment(input);
    if (result.kind === "not_found") throw new PaymentNotFoundError();
    if (result.kind === "mismatch")
      throw new PaymentVerificationMismatchError();
    await this.runCompletion(result.payment);
    return safePayment(result.payment);
  }

  private async runCompletion(payment: PaymentRecord): Promise<void> {
    try {
      await this.completion.process(payment);
    } catch (error) {
      console.error("Payment completion workflow failed", {
        paymentReference: payment.paymentReference,
        errorType:
          error instanceof Error ? error.name : "UnknownCompletionError",
      });
    }
  }

  listPayments(filters: PaymentListFilters): Promise<PaymentListResult> {
    return this.repository.listPayments(filters);
  }

  findPaymentDetail(reference: string): Promise<PaymentDetail | null> {
    return this.repository.findPaymentDetail(reference);
  }

  async retryCompletion(paymentReference: string): Promise<void> {
    const payment = await this.repository.findByReference(paymentReference);
    if (!payment) throw new PaymentNotFoundError();
    if (payment.status !== "PAID") throw new PaymentCompletionIneligibleError();
    await this.completion.process(payment);
  }
}
