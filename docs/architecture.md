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

Admin APIs enforce authentication and authorization server-side. Roles are `SUPER_ADMIN`, `ADMIN`,
`FINANCE`, `REGISTRATION_MANAGER`, and `COMMUNICATIONS`.
`backend/src/config/permissions.ts` is the single role-to-permission policy, and protected routes
enforce permissions server-side. Client-side route hiding is presentation, not authorization.
Authenticated Admin mutations require a non-simple security header and validate supplied browser
origins/referrers in addition to exact-origin CORS and `SameSite=Lax` cookies.

Staff accounts are invitation-only. A raw cryptographically random token is sent through the
provider-neutral email boundary while PostgreSQL stores only its SHA-256 hash. Invitation
acceptance locks the invitation and transactionally creates the Admin, consumes the invitation,
and writes its audit event. See [`admin-access.md`](admin-access.md) for the complete lifecycle.

Professional Delegate payment uses the same route/controller/service/repository boundaries. An
authoritative `delegate_package_prices` row supplies currency and minor-unit amount; the browser
cannot supply an amount. Payment attempts snapshot package, currency, and amount before the
provider call. Callback verification and signature-authenticated Paystack webhooks share one
row-locked, idempotent finalizer. Full design and test-mode operations are in
[`delegate-payments.md`](delegate-payments.md).

Trusted PAID payments then enter a separate completion workflow. It creates one hashed opaque
event-pass credential per registration, delivers the QR pass through the existing Mailjet
boundary, and notifies configured oversight roles without coupling email success to payment state.
The protected Admin overview obtains aggregate registration and currency-separated revenue values
directly from PostgreSQL. See [`payment-completion.md`](payment-completion.md).

Student Delegate applications reuse the common registration record and attach one academic
verification aggregate. Private evidence uses an application-scoped hashed continuation token,
storage/scanner abstractions, quarantine lifecycle, and permission-protected attachment retrieval.
The package remains intentionally unpriced; backend payment initialization requires both approval
and an active database price. Admin verification remains read-only in Milestone 3B.2. See
[`student-delegate-verification.md`](student-delegate-verification.md).

## Deployment boundary

Frontend hosting must use `frontend/` as the Vite project root and serve `frontend/dist`. The API
is a separate deployable package in `backend/`. CORS origins must be explicitly configured for the
deployed frontend; CORS does not replace authentication.
