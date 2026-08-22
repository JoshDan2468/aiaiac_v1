# Architecture

## Repository structure

The repository contains two independent Node packages:

```text
frontend/  React 19, TypeScript, Vite 8, and Tailwind CSS 4
backend/   Express, TypeScript, and the PostgreSQL connection boundary
```

The packages have separate manifests, lockfiles, TypeScript configurations, dependency trees, and
build outputs. Root scripts are convenience wrappers only; the repository does not use npm
workspaces.

## Frontend

Browser code lives in `frontend/src/`. Its flow remains:

```text
App route -> page -> section/form -> typed data or frontend service
```

Public pages live in `frontend/src/pages`, reusable UI in `frontend/src/components`, editable
conference content in `frontend/src/data`, and browser-to-API boundaries in
`frontend/src/services`. UI components must not contain database or server business logic.

Each route-level page has its own lowercase folder beneath its access area (`public`,
`registration`, `admin`, or `system`). The `*Page.tsx` file is the composition boundary: it owns
page metadata and route-level state, then renders sibling `*Section.tsx` files in page order. A
section stays local to its page until it is genuinely reused; shared sections and controls belong
in `frontend/src/components`.

The existing participation UI is transitional. Delegate, sponsor, exhibitor, partner,
media-partner, abstract, and general-enquiry workflows require separate fields, validation,
services, admin handling, and reporting as each workflow is approved. Do not expand the legacy
shared participation form into a production workflow.

## Backend foundation

The implemented request flow is:

```text
Express middleware -> /api router -> controller -> JSON response
```

Backend modules include application/server composition, environment and PostgreSQL configuration,
liveness/readiness, request logging, not-found and centralized error handling, plus the Admin
authentication boundary. PostgreSQL configuration remains optional for the health-only app factory
used by unit tests, while the configured server requires PostgreSQL and a session secret. Readiness
is proved with a lightweight query and reports a sanitized failure when PostgreSQL is unavailable.

Future database-backed requests will follow:

```text
route -> validation/auth middleware -> controller -> service -> database
```

Admin authentication follows that flow using strict validation, controllers, an authentication
service, and a parameterized Admin repository. Repeatable migrations are managed deliberately
through `node-pg-migrate`; the server never creates tables automatically. Only `admins` and
PostgreSQL-backed `session` exist. Registration APIs and payment integration are not part of the
current foundation.

Authentication uses an HttpOnly, fixed-expiry session cookie with the identifier stored only in the
cookie and session data stored in PostgreSQL. Login regenerates the session; logout revokes it.
Protected requests reload the Admin to reject deleted or disabled accounts. Authorization checks
run independently on each role-restricted backend route.

## Security and roles

Secrets, PostgreSQL credentials, and Paystack secret keys are backend-only environment variables.
Payment initialization and verification will happen on the backend; never trust amounts, roles,
or payment success supplied by the browser.

Admin APIs enforce authentication and authorization server-side. Initial role names are
`SUPER_ADMIN` for user, role, and system administration and `ADMIN` for explicitly granted
operational access. Client-side route hiding is presentation, not authorization. Exact-origin CORS
and `SameSite=Lax` reduce cross-site request exposure but do not replace CSRF protection; explicit
Origin and/or token defenses are required before authenticated mutation APIs are expanded.

## Deployment boundary

Frontend hosting must use `frontend/` as the Vite project root and serve `frontend/dist`. The API
is a separate deployable package in `backend/`. CORS origins must be explicitly configured for the
deployed frontend; CORS does not replace authentication.
