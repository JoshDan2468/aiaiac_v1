import type { RequestHandler } from "express";
import { env } from "../config/env";

export const requestLogger: RequestHandler = (request, response, next) => {
  if (env.nodeEnv === "test") {
    next();
    return;
  }

  const startedAt = performance.now();
  response.on("finish", () => {
    if (env.nodeEnv === "production" && response.statusCode < 400) return;
    const durationMs = Math.round(performance.now() - startedAt);
    console.info("API request", {
      requestId: response.locals.requestId,
      method: request.method,
      route: request.route ? `${request.baseUrl}${request.route.path}` : "unmatched",
      status: response.statusCode,
      durationMs,
    });
  });

  next();
};
