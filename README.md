# AIAIAC Conference Platform

The official digital platform for AIAIAC West Africa: Asset Integrity, Artificial
Intelligence, Automation, and Cybersecurity.

## Repository layout

```text
frontend/  React, TypeScript, Vite, and Tailwind public website
backend/   Express and TypeScript API foundation
docs/      Architecture and product documentation
```

The packages are intentionally independent. This repository does not use npm workspaces or a
monorepo framework.

## Install

Requirements: Node.js 20 or newer and npm.

```sh
npm install --prefix frontend
npm install --prefix backend
```

## Run locally

Frontend at `http://localhost:5173`:

```sh
npm run dev:frontend
```

Backend at `http://localhost:5000`:

```sh
copy backend\.env.example backend\.env
npm run dev:backend
```

On macOS or Linux, use `cp backend/.env.example backend/.env` instead.

## Quality checks

```sh
npm run type-check
npm run build
npm run test:backend
npm --prefix frontend run lint
```

Frontend lint currently reports pre-existing formatting issues in legacy source files; TypeScript
and production builds are the required regression checks.

## Initial API

The backend currently exposes liveness and PostgreSQL readiness probes:

```http
GET http://localhost:5000/api/health
GET http://localhost:5000/api/ready
```

`/api/health` confirms that Express can respond and does not depend on PostgreSQL. `/api/ready`
performs a real `SELECT 1;`, returning `200` when PostgreSQL is reachable and a sanitized `503`
when it is not.

Repeatable migrations are configured with `node-pg-migrate` and must be run deliberately from the
backend package. The backend includes PostgreSQL-backed Admin sessions, Argon2id password hashing,
initial Super Admin creation, authentication proof endpoints, and initial role enforcement. See
[Architecture](docs/architecture.md) and [backend/README.md](backend/README.md) for environment,
migration, setup, and Postman instructions.

The React Admin interface, Admin account management, registration APIs, and payment integration
are intentionally not implemented yet.

Never place PostgreSQL credentials, Paystack secret keys, or other secrets in `frontend/`.
