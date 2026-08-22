import type { RequestHandler } from "express";
import { authCookieName } from "../config/session";
import { createPublicError } from "../middleware/error.middleware";
import type { AuthService } from "../services/auth.service";
import { loginSchema } from "../validators/auth.validator";

interface AuthControllerOptions {
  readonly authService: AuthService;
  readonly sessionMaxAgeMs: number;
  readonly production: boolean;
}

function regenerateSession(request: Parameters<RequestHandler>[0]): Promise<void> {
  return new Promise((resolve, reject) => {
    request.session.regenerate((error) => (error ? reject(error) : resolve()));
  });
}

function saveSession(request: Parameters<RequestHandler>[0]): Promise<void> {
  return new Promise((resolve, reject) => {
    request.session.save((error) => (error ? reject(error) : resolve()));
  });
}

function destroySession(request: Parameters<RequestHandler>[0]): Promise<void> {
  return new Promise((resolve, reject) => {
    request.session.destroy((error) => (error ? reject(error) : resolve()));
  });
}

export function createAuthController(options: AuthControllerOptions) {
  const login: RequestHandler = async (request, response, next) => {
    try {
      const parsed = loginSchema.safeParse(request.body);
      if (!parsed.success) {
        next(createPublicError(400, "Invalid login request"));
        return;
      }

      const admin = await options.authService.authenticate(parsed.data.email, parsed.data.password);
      if (!admin) {
        next(createPublicError(401, "Invalid email or password"));
        return;
      }

      await regenerateSession(request);
      request.session.adminId = admin.id;
      await saveSession(request);

      response.status(200).json({
        success: true,
        message: "Login successful",
        data: { admin },
      });
    } catch (error) {
      next(error);
    }
  };

  const me: RequestHandler = (_request, response) => {
    response.status(200).json({
      success: true,
      message: "Current admin retrieved",
      data: { admin: response.locals.admin },
    });
  };

  const logout: RequestHandler = async (request, response, next) => {
    try {
      await destroySession(request);
      response.clearCookie(authCookieName, {
        httpOnly: true,
        secure: options.production,
        sameSite: "lax",
        path: "/",
      });
      response.status(200).json({
        success: true,
        message: "Logout successful",
      });
    } catch (error) {
      next(error);
    }
  };

  return { login, me, logout };
}
