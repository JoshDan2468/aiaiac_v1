import type { RequestHandler } from "express";
import { createPublicError } from "../middleware/error.middleware";
import type { DelegatePaymentService } from "../services/delegatePayment.service";
import type { PaymentDetail, PaymentRecord } from "../types/payment";
import {
  parsePaymentListFilters,
  paymentParamsSchema,
} from "../validators/payment.validator";

function toAdminPayment(payment: PaymentRecord) {
  return {
    id: payment.id,
    registrationReference: payment.registrationReference,
    delegateName: payment.delegateName,
    delegateEmail: payment.delegateEmail,
    provider: payment.provider,
    paymentReference: payment.paymentReference,
    providerTransactionId: payment.providerTransactionId,
    packageCode: payment.packageCode,
    packageName: payment.packageName,
    currency: payment.currency,
    amountMinor: payment.amountMinor,
    status: payment.status,
    channel: payment.channel,
    gatewayResponse: payment.gatewayResponse,
    confirmationEmailStatus: payment.confirmationEmailStatus,
    createdAt: payment.createdAt,
    paidAt: payment.paidAt,
    verifiedAt: payment.verifiedAt,
  };
}

function toAdminPaymentDetail(payment: PaymentDetail) {
  return { ...toAdminPayment(payment), events: payment.events };
}

export function createAdminPaymentController(service: DelegatePaymentService) {
  const listPayments: RequestHandler = async (request, response, next) => {
    try {
      const filters = parsePaymentListFilters(request.query);
      if (!filters) {
        next(createPublicError(400, "Invalid payment list filters"));
        return;
      }
      const payments = await service.listPayments(filters);
      response.status(200).json({
        success: true,
        data: {
          payments: {
            ...payments,
            items: payments.items.map(toAdminPayment),
          },
        },
      });
    } catch (error) {
      next(error);
    }
  };

  const getPayment: RequestHandler = async (request, response, next) => {
    try {
      const params = paymentParamsSchema.safeParse(request.params);
      if (!params.success) {
        next(createPublicError(400, "Invalid payment reference"));
        return;
      }
      const payment = await service.findPaymentDetail(params.data.reference);
      if (!payment) {
        next(createPublicError(404, "Payment not found"));
        return;
      }
      response.status(200).json({
        success: true,
        data: { payment: toAdminPaymentDetail(payment) },
      });
    } catch (error) {
      next(error);
    }
  };
  return { listPayments, getPayment };
}
