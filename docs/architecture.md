# Architecture

## Current system

The repository is currently a single React, TypeScript, Vite, and Tailwind CSS frontend. Keeping the existing package at the root avoids needless package-manager churn while no backend package exists. All browser code lives in `src/`; future server code belongs in `backend/`.

The page flow is:

```text
App route -> page -> section/form -> data or frontend service
```

Static conference content is held in typed modules under `src/data`. Pages assemble layouts and sections; sections render content; `src/services` owns browser-to-API communication. UI components must not call `fetch` directly.

The existing `ParticipationRequestForm` is a Phase-1 placeholder retained to preserve the public site. It must not grow into the final registration system. Once fields and workflows are confirmed, create only the required feature folders under `src/forms/`: `delegate/`, `sponsor/`, `exhibitor/`, `partner/`, `media-partner/`, `abstract/`, and `enquiry/`. Give each flow its own validation and service boundary.

## Future backend

When backend development starts, initialize an independent Node.js, Express, and TypeScript package in `backend/`. Add folders only with their first real implementation:

```text
backend/src/
├── config/
├── routes/
├── controllers/
├── services/
├── middleware/
├── validators/
├── database/
├── types/
└── utils/
```

Backend requests follow:

```text
route -> validation/auth middleware -> controller -> service -> database
```

Controllers handle HTTP concerns. Services hold business and payment rules. Database connection, migrations, seeds, and queries stay centralized under `backend/src/database` rather than a speculative root database package.

## Security and roles

Secrets, database credentials, and Paystack secret keys are server-only environment variables. Payment initialization and verification happen on the backend; the frontend may only request a checkout session and display returned status. Never trust amounts, roles, or payment success supplied by the browser.

Admin pages and APIs require server-side authentication and authorization. The planned roles are `super-admin` for user/role and system-level administration, and `admin` for explicitly granted operational modules. Route hiding in React is not authorization.

## Content and naming

Use PascalCase for React component files, `useX` for hooks, and descriptive feature names for services and backend modules. Keep speakers in `src/data/speakers.ts`, sponsors in `src/data/sponsors.ts`, event details in `src/data/conference.ts`, and programme content in `src/data/programme.ts` until API-backed content management is implemented.

Do not create empty `assets`, `config`, `context`, admin, payment, database, or test directories before they contain real code.
