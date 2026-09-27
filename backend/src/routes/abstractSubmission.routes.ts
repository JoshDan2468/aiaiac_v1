import { Router, type RequestHandler } from "express";

type AbstractController = ReturnType<
  typeof import("../controllers/abstractSubmission.controller").createAbstractSubmissionController
>;

export function createAbstractSubmissionRouter(options: {
  readonly controller: AbstractController;
  readonly rateLimiter: RequestHandler;
}): Router {
  const router = Router();
  router.post(
    "/abstract-submissions",
    options.rateLimiter,
    options.controller.create,
  );
  router.get(
    "/abstract-submissions/:reference/workspace",
    options.rateLimiter,
    options.controller.authorize,
    options.controller.getWorkspace,
  );
  router.patch(
    "/abstract-submissions/:reference/revision",
    options.rateLimiter,
    options.controller.authorize,
    options.controller.updateRevision,
  );
  router.post(
    "/abstract-submissions/:reference/resubmit",
    options.rateLimiter,
    options.controller.authorize,
    options.controller.resubmit,
  );
  router.post(
    "/abstract-submission-recovery/request",
    options.rateLimiter,
    options.controller.requestRecovery,
  );
  router.post(
    "/abstract-submission-recovery/exchange",
    options.rateLimiter,
    options.controller.exchangeRecovery,
  );
  return router;
}
