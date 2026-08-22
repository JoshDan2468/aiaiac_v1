import type { ErrorRequestHandler } from "express";
import { env } from "../config/env";

interface PublicError extends Error {
  status?: number;
  publicMessage?: string;
}

export function createPublicError(status: number, publicMessage: string): PublicError {
  return Object.assign(new Error(publicMessage), { status, publicMessage });
}

export const errorHandler: ErrorRequestHandler = (error, request, response, _next) => {
  const candidate = error as PublicError;
  const status =
    Number.isInteger(candidate.status) && candidate.status! >= 400 && candidate.status! < 600
      ? candidate.status!
      : 500;
  const malformedJson = error instanceof SyntaxError && status === 400;
  const message = malformedJson
    ? "Invalid JSON request body"
    : candidate.publicMessage || (status >= 500 ? "Internal server error" : "Request failed");

  if (status >= 500 && env.nodeEnv !== "test") {
    console.error("Unhandled API error", {
      errorType: error instanceof Error ? error.name : "UnknownError",
      method: request.method,
      path: request.path,
    });
  }

  response.status(status).json({ success: false, message });
};
