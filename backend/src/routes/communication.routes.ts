import { Router, type RequestHandler } from "express";
import rateLimit from "express-rate-limit";
import { ZodError } from "zod";
import { createPublicError } from "../middleware/error.middleware";
import { requirePermission } from "../middleware/requirePermission.middleware";
import { communicationPresets } from "../email/templates/communication.template";
import type { CommunicationService } from "../services/communication.service";
import type { SafeAdmin } from "../types/admin";
import { audienceRequestSchema, communicationContentSchema, confirmSchema, deliveryListSchema, listSchema, testSendSchema } from "../validators/communication.validator";

const wrap = (work: (request: Parameters<RequestHandler>[0], response: Parameters<RequestHandler>[1]) => Promise<unknown> | unknown): RequestHandler =>
  (request, response, next) => {
    Promise.resolve().then(() => work(request, response)).then((result) => {
      if (!response.headersSent) response.json({ success: true, data: result });
    }).catch((error) => next(error instanceof ZodError ? createPublicError(400, error.issues[0]?.message ?? "Invalid request") : error));
  };

const reference = (value: string | string[] | undefined): string => {
  if (typeof value !== "string" || !/^AIAIAC-COM-[A-F0-9]{8}$/.test(value)) throw createPublicError(404, "Campaign not found");
  return value;
};
const adminId = (response: Parameters<RequestHandler>[1]): string => (response.locals.admin as SafeAdmin).id;

export function createCommunicationRouter(options: {
  requireAuth: RequestHandler;
  mutationSecurity: RequestHandler;
  service: CommunicationService;
}): Router {
  const router = Router();
  const testThrottle = rateLimit({ windowMs: 60_000, limit: 10, standardHeaders: "draft-8", legacyHeaders: false });
  const deliveryThrottle = rateLimit({ windowMs: 60_000, limit: 60, standardHeaders: "draft-8", legacyHeaders: false });
  router.use(options.requireAuth, requirePermission("communications.read"));
  router.get("/templates", wrap(() => communicationPresets));
  router.post("/audience/count", options.mutationSecurity, wrap((request) => options.service.audience(audienceRequestSchema.parse(request.body))));
  router.post("/preview", options.mutationSecurity, wrap((request) => options.service.preview(communicationContentSchema.parse(request.body))));
  router.get("/campaigns", wrap((request) => {
    const query = listSchema.parse(request.query);
    return options.service.list(query.page, query.status);
  }));
  router.get("/deliveries", wrap((request) => {
    const query = deliveryListSchema.parse(request.query);
    return options.service.deliveries(query.page, query.status, query.campaign);
  }));
  router.get("/campaigns/:reference", wrap((request) => options.service.get(reference(request.params.reference))));
  router.post("/campaigns", options.mutationSecurity, requirePermission("communications.create"), wrap((request, response) =>
    options.service.create(communicationContentSchema.parse(request.body), adminId(response))));
  router.put("/campaigns/:reference", options.mutationSecurity, requirePermission("communications.manage"), wrap((request, response) =>
    options.service.update(reference(request.params.reference), communicationContentSchema.parse(request.body), adminId(response))));
  router.post("/campaigns/:reference/test", options.mutationSecurity, requirePermission("communications.send"), testThrottle, wrap((request, response) =>
    options.service.testSend(reference(request.params.reference), testSendSchema.parse(request.body).email, adminId(response))));
  router.post("/campaigns/:reference/confirm", options.mutationSecurity, requirePermission("communications.send"), wrap((request, response) =>
    options.service.confirm(reference(request.params.reference), confirmSchema.parse(request.body).fingerprint, adminId(response))));
  router.post("/campaigns/:reference/deliver", options.mutationSecurity, requirePermission("communications.send"), deliveryThrottle, wrap((request, response) =>
    options.service.deliver(reference(request.params.reference), false, adminId(response))));
  router.post("/campaigns/:reference/retry", options.mutationSecurity, requirePermission("communications.manage"), deliveryThrottle, wrap((request, response) =>
    options.service.deliver(reference(request.params.reference), true, adminId(response))));
  return router;
}
