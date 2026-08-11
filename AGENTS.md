# Repository Guidelines

## Project Overview and Structure

This repository is the AIAIAC West Africa conference platform. The implemented application is a React 19, TypeScript, Vite 8, and Tailwind CSS 4 frontend in `src/`. Public pages live in `src/pages`, homepage sections in `src/sections`, reusable/layout UI in `src/components`, editable content in `src/data`, and browser API boundaries in `src/services`. `backend/` is reserved for a future Node.js, Express, TypeScript, and PostgreSQL API. Read `docs/architecture.md` before structural work.

## Architecture and Security Rules

Inspect existing code before modifying it and prefer the smallest safe change. Keep frontend and backend responsibilities separate. UI components must not contain API or business logic; repeated content belongs in typed data modules. Do not create empty folders, fake APIs, or speculative feature code.

Never place secrets, PostgreSQL credentials, or Paystack secret keys in frontend code. Payment initialization and verification must happen on the backend. Treat browser-supplied amounts and payment status as untrusted.

Delegate, sponsor, exhibitor, partner, media-partner, abstract, and general-enquiry flows require separate forms, validation, services, admin handling, and reporting once implemented. Do not expand the temporary shared participation form into a generic production workflow.

Admin APIs must enforce authentication and authorization server-side. `super-admin` owns user, role, and system administration; `admin` receives only explicitly granted operational access. Client-side route guards are presentation only.

## Commands and Coding Standards

Use `npm run dev` locally, `npx tsc --noEmit` for strict type checking, `npm run build` for production compilation, and `npm run lint` for ESLint/Prettier checks. Prettier uses double quotes, semicolons, trailing commas, and a 100-character width. Use PascalCase component files, camelCase functions, `useX` hooks, and feature-specific service names.

## Testing and Change Expectations

No automated test framework is configured. For every change, run type checking and the production build; run lint and distinguish pre-existing failures from regressions. When behavior is added, introduce focused tests with that feature instead of creating an empty test hierarchy. Verify affected routes and forms manually. Do not remove working pages, rewrite unrelated UI, or generate speculative backend, payment, database, or admin code.
