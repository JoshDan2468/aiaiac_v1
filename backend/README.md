# Backend boundary

The backend is intentionally not initialized in this phase.

When implementation begins, create an independent Node.js, Express, and TypeScript package here. Use the route → validation/auth middleware → controller → service → database flow documented in `docs/architecture.md`.

Do not add placeholder routes, controllers, database tables, authentication, Paystack integration, or admin APIs until their requirements are approved. All secrets and payment verification will live in this package, never in `src/`.
