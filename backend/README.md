# AIAIAC API

This package contains the Express, TypeScript, and PostgreSQL API, including the server-managed
Admin authentication foundation. It does not contain registration, payment, or other conference
business workflows.

## Setup

```sh
npm install
copy .env.example .env
npm run dev
```

On macOS or Linux, replace `copy` with `cp`. Replace every placeholder in the untracked `.env`.
Never commit `.env` or use a PostgreSQL superuser as the application user.

## Environment variables

| Variable                     | Required at API startup | Purpose                                                                                |
| ---------------------------- | ----------------------- | -------------------------------------------------------------------------------------- |
| `NODE_ENV`                   | No                      | `development`, `test`, or `production`; defaults to `development`                      |
| `PORT`                       | No                      | HTTP port; defaults to `5000`                                                          |
| `CLIENT_URL`                 | Production              | Comma-separated exact frontend origins                                                 |
| `DATABASE_URL`               | Yes                     | Backend-only PostgreSQL connection URL                                                 |
| `SESSION_SECRET`             | Yes                     | At least 32 random, non-placeholder characters                                         |
| `SESSION_MAX_AGE_MS`         | No                      | Fixed cookie/session lifetime; defaults to 8 hours                                     |
| `LOGIN_RATE_LIMIT_WINDOW_MS` | No                      | Login failure window; defaults to 15 minutes                                           |
| `LOGIN_RATE_LIMIT_MAX`       | No                      | Failed attempts per IP/window; defaults to 100 outside production and 10 in production |

Example development configuration:

```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/aiaiac_dev
SESSION_SECRET=REPLACE_WITH_A_LONG_RANDOM_VALUE
SESSION_MAX_AGE_MS=28800000
LOGIN_RATE_LIMIT_WINDOW_MS=900000
LOGIN_RATE_LIMIT_MAX=100
```

Generate a session secret locally, then paste its output into the untracked `.env`:

```sh
node -e "console.log(require('node:crypto').randomBytes(48).toString('base64url'))"
```

Use separate databases and credentials for development, test, and production. The connection URL
is validated without being logged or returned to clients. The small health-only app factory can be
used in database-free unit tests, but the configured API refuses to start without `DATABASE_URL`
and `SESSION_SECRET`. Production SSL settings depend on the selected PostgreSQL provider and must
be configured according to that provider's certificate requirements before deployment.

## API probes

```http
GET http://localhost:5000/api/health
GET http://localhost:5000/api/ready
GET http://localhost:5000/api/not-real
```

`/api/health` is a process liveness probe and remains `200` when PostgreSQL is unavailable.
`/api/ready` executes `SELECT 1;`, returning `200` with `database: "connected"` or a sanitized `503`
with `database: "disconnected"`. Unknown API routes return predictable JSON `404` responses.

## Admin authentication setup

Apply the reviewed authentication migration deliberately:

```sh
npm run migration:status
npm run migration:up
```

It creates only `admins` and the `connect-pg-simple`-compatible `session` table. Runtime table
creation is disabled. The migration down command removes both tables and all their data, so use it
only for an intentional rollback.

Create the first Super Admin with temporary values in the untracked `.env`:

```env
INITIAL_SUPER_ADMIN_NAME=Conference Owner
INITIAL_SUPER_ADMIN_EMAIL=owner@example.com
INITIAL_SUPER_ADMIN_PASSWORD=USE_A_STRONG_UNIQUE_PASSWORD
```

```sh
npm run admin:create-super
```

The command normalizes the email, creates a UUID, hashes the password with Argon2id, and refuses a
duplicate email. It never prints the password. Remove all three `INITIAL_SUPER_ADMIN_*` values from
`.env` immediately after success. There is no public registration endpoint.

## Authentication API and Postman

Postman must keep its cookie jar enabled. Use the same Postman session for this sequence:

1. `POST http://localhost:5000/api/auth/login` with `Content-Type: application/json` and body
   `{"email":"owner@example.com","password":"your-password"}`. Expect `200` and an HttpOnly
   `aiaiac.admin.sid` cookie.
2. `GET http://localhost:5000/api/auth/me`. Expect `200`; a request without that cookie gets `401`.
3. `GET http://localhost:5000/api/admin/test`. Both roles get `200`; no session gets `401`.
4. `GET http://localhost:5000/api/admin/super-admin-test`. `SUPER_ADMIN` gets `200`, `ADMIN` gets
   `403`, and no session gets `401`.
5. `POST http://localhost:5000/api/auth/logout`. Expect `200` and an expired cookie.
6. Repeat `GET http://localhost:5000/api/auth/me`. Expect `401`.

Wrong passwords and unknown emails both return `401` with `Invalid email or password`. Login is
temporarily rate-limited per IP; health and readiness are not. Future browser calls must use
`credentials: "include"` (or Axios `withCredentials: true`).

Sessions are stored in PostgreSQL with a fixed expiry. Cookies are HttpOnly, `SameSite=Lax`, and
become `Secure` in production. Every protected request reloads the Admin, so deleted or disabled
accounts immediately lose protected access. In production behind a TLS-terminating reverse proxy,
configure and test Express proxy trust before launch so Secure cookies behave correctly.

Exact-origin CORS and `SameSite=Lax` reduce CSRF exposure but are not complete CSRF protection.
Before adding authenticated state-changing admin operations, add and test explicit Origin checking
and/or CSRF tokens. Do not treat CORS as authorization.

## Commands

| Command                            | Purpose                                                  |
| ---------------------------------- | -------------------------------------------------------- |
| `npm run dev`                      | Run the API in watch mode                                |
| `npm run type-check`               | Type-check application and test code                     |
| `npm test`                         | Run unit/API tests without requiring a live database     |
| `npm run build`                    | Compile production JavaScript into `dist/`               |
| `npm start`                        | Run the compiled API                                     |
| `npm run migration:create -- name` | Create a timestamped TypeScript migration                |
| `npm run migration:status`         | Show pending migration SQL without applying it           |
| `npm run migration:up`             | Apply all pending migrations deliberately                |
| `npm run migration:down`           | Roll back one migration deliberately                     |
| `npm run admin:create-super`       | Create the initial Super Admin from temporary env values |

Migration commands read `DATABASE_URL` from `backend/.env`. The migration tool records applied
files in its `pgmigrations` history table. The server never runs migrations automatically. Review
new migrations and their rollback behavior before applying them, especially in production.

The application also uses Helmet security headers, a `100kb` request-body limit, credentialed
exact-origin CORS, development request logging that excludes bodies and query strings, predictable
JSON errors, and graceful HTTP/database-pool shutdown. Participation workflows, Paystack, Admin
management screens, and conference business logic remain unimplemented.
