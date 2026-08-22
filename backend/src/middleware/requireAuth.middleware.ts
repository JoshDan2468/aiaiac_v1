import type { RequestHandler } from "express";
import { createPublicError } from "./error.middleware";
import type { AuthService } from "../services/auth.service";

export function createRequireAuth(authService: AuthService): RequestHandler {
  return async (request, response, next) => {
    try {
      const adminId = request.session.adminId;
      if (!adminId) {
        next(createPublicError(401, "Authentication required"));
        return;
      }

      const admin = await authService.getActiveAdmin(adminId);
      if (!admin) {
        request.session.destroy(() => undefined);
        next(createPublicError(401, "Authentication required"));
        return;
      }

      response.locals.admin = admin;
      next();
    } catch (error) {
      next(error);
    }
  };
}
