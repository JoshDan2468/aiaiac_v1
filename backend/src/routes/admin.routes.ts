import { Router, type RequestHandler } from "express";
import { requireRole } from "../middleware/requireRole.middleware";

export function createAdminRouter(requireAuth: RequestHandler): Router {
  const router = Router();

  router.get("/test", requireAuth, (_request, response) => {
    response.status(200).json({
      success: true,
      message: "Protected admin endpoint accessible",
    });
  });

  router.get("/super-admin-test", requireAuth, requireRole("SUPER_ADMIN"), (_request, response) => {
    response.status(200).json({
      success: true,
      message: "Super Admin endpoint accessible",
    });
  });

  return router;
}
