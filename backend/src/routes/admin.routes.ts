import { Router, type RequestHandler } from "express";
import { requireRole } from "../middleware/requireRole.middleware";

type DelegateController = ReturnType<
  typeof import("../controllers/delegate.controller").createDelegateController
>;

export function createAdminRouter(
  requireAuth: RequestHandler,
  delegateController?: DelegateController,
): Router {
  const router = Router();

  router.get("/test", requireAuth, (_request, response) => {
    response.status(200).json({
      success: true,
      message: "Protected admin endpoint accessible",
    });
  });

  router.get(
    "/super-admin-test",
    requireAuth,
    requireRole("SUPER_ADMIN"),
    (_request, response) => {
      response.status(200).json({
        success: true,
        message: "Super Admin endpoint accessible",
      });
    },
  );

  if (delegateController) {
    router.get(
      "/delegates",
      requireAuth,
      requireRole("ADMIN", "SUPER_ADMIN"),
      delegateController.listAdminRegistrations,
    );
    router.get(
      "/delegates/:id",
      requireAuth,
      requireRole("ADMIN", "SUPER_ADMIN"),
      delegateController.getAdminRegistration,
    );
  }

  return router;
}
