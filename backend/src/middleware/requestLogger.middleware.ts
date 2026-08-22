import type { RequestHandler } from "express";
import { env } from "../config/env";

export const requestLogger: RequestHandler = (request, response, next) => {
  if (env.nodeEnv !== "development") {
    next();
    return;
  }

  const startedAt = performance.now();
  response.on("finish", () => {
    const durationMs = Math.round(performance.now() - startedAt);
    console.info(`[api] ${request.method} ${request.path} ${response.statusCode} ${durationMs}ms`);
  });

  next();
};
