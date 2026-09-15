import type { RequestHandler } from "express";
import { createPublicError } from "../middleware/error.middleware";
import { PaymentProviderUnavailableError } from "../payments/payment.service";
import { PaystackRequestError } from "../payments/providers/paystack.provider";
import {
  DelegatePaymentService,
  PaymentAlreadyPaidError,
  PaymentInitializationFailedError,
  PaymentInitializationInProgressError,
  PaymentNotFoundError,
  PaymentPriceUnavailableError,
  PaymentRegistrationIneligibleError,
  PaymentVerificationMismatchError,
} from "../services/delegatePayment.service";
import {
  initializePaymentSchema,
  paymentParamsSchema,
  paystackWebhookSchema,
  registrationPaymentParamsSchema,
} from "../validators/payment.validator";

function mapPaymentError(error: unknown) {
  if (error instanceof PaymentNotFoundError)
    return createPublicError(404, "Payment not found");
  if (error instanceof PaymentAlreadyPaidError)
    return createPublicError(409, "This registration is already paid");
  if (error instanceof PaymentRegistrationIneligibleError)
    return createPublicError(
      409,
      "This registration is not eligible for payment",
    );
  if (error instanceof PaymentPriceUnavailableError)
    return createPublicError(
      409,
      "The requested payment currency is not available",
    );
  if (error instanceof PaymentInitializationInProgressError)
    return createPublicError(
      409,
      "Payment initialization is already in progress",
    );
  if (error instanceof PaymentVerificationMismatchError)
    return createPublicError(
      409,
      "Payment verification did not match the expected transaction",
    );
  if (error instanceof PaymentProviderUnavailableError)
    return createPublicError(503, "Payment provider is unavailable");
  if (
    error instanceof PaystackRequestError ||
    error instanceof PaymentInitializationFailedError
  )
    return createPublicError(502, "Payment provider request failed");
  return error;
}

export function createPaymentController(service: DelegatePaymentService) {
  const initialize: RequestHandler = async (request, response, next) => {
    try {
      const params = registrationPaymentParamsSchema.safeParse(request.params);
      const body = initializePaymentSchema.safeParse(request.body);
      if (!params.success || !body.success) {
        next(createPublicError(400, "Invalid payment initialization request"));
        return;
      }
      const payment = await service.initialize(
        params.data.reference,
        body.data.currency,
      );
      response.status(200).json({ success: true, data: { payment } });
    } catch (error) {
      next(mapPaymentError(error));
    }
  };

  const verify: RequestHandler = async (request, response, next) => {
    try {
      const params = paymentParamsSchema.safeParse(request.params);
      if (!params.success) {
        next(createPublicError(400, "Invalid payment reference"));
        return;
      }
      const payment = await service.verify(params.data.reference);
      response.status(200).json({ success: true, data: { payment } });
    } catch (error) {
      next(mapPaymentError(error));
    }
  };

  const webhook: RequestHandler = async (request, response, next) => {
    try {
      const parsed = paystackWebhookSchema.safeParse(request.body);
      if (!parsed.success) {
        next(createPublicError(400, "Invalid payment webhook event"));
        return;
      }
      const outcome = await service.processPaystackWebhook(parsed.data);
      response.status(200).json({ success: true, data: outcome });
    } catch (error) {
      next(mapPaymentError(error));
    }
  };

  return { initialize, verify, webhook };
}
