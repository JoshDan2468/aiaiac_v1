import connectPgSimple from "connect-pg-simple";
import type { RequestHandler } from "express";
import session, { type CookieOptions } from "express-session";
import type { Pool } from "pg";

export const authCookieName = "aiaiac.admin.sid";

interface SessionMiddlewareOptions {
  readonly pool: Pool;
  readonly secret: string;
  readonly maxAgeMs: number;
  readonly production: boolean;
}

export function getAuthCookieOptions(maxAgeMs: number, production: boolean): CookieOptions {
  return {
    httpOnly: true,
    secure: production,
    sameSite: "lax",
    maxAge: maxAgeMs,
    path: "/",
  };
}

export function createSessionMiddleware(options: SessionMiddlewareOptions): RequestHandler {
  const PostgreSqlStore = connectPgSimple(session);

  return session({
    name: authCookieName,
    secret: options.secret,
    store: new PostgreSqlStore({
      pool: options.pool,
      tableName: "session",
      createTableIfMissing: false,
      pruneSessionInterval: 15 * 60,
    }),
    resave: false,
    saveUninitialized: false,
    rolling: false,
    cookie: getAuthCookieOptions(options.maxAgeMs, options.production),
  });
}
