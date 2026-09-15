import type { RequestHandler } from "express";
import { createPublicError } from "../middleware/error.middleware";
import type { DelegatePaymentService } from "../services/delegatePayment.service";
import {
  parsePaymentListFilters,
  paymentParamsSchema,
} from "../validators/payment.validator";

export function createAdminPaymentController(service: DelegatePaymentService) {
  const listPayments: RequestHandler = async (request, response, next) => {
    try {
      const filters = parsePaymentListFilters(request.query);
      if (!filters) {
        next(createPublicError(400, "Invalid payment list filters"));
        return;
      }
      const payments = await service.listPayments(filters);
      response.status(200).json({ success: true, data: { payments } });
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
      response.status(200).json({ success: true, data: { payment } });
    } catch (error) {
      next(error);
    }
  };
  return { listPayments, getPayment };
}
