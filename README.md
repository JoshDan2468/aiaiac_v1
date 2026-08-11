# AIAIAC Conference Platform

The official digital platform for the AIAIAC West Africa conference, covering Asset Integrity, Artificial Intelligence, Automation, and Cybersecurity.

The repository currently contains the public React frontend. Backend, database, payment, and admin capabilities are planned but are not implemented.

## Local development

Requirements: Node.js and npm.

```sh
npm install
npm run dev
```

Quality checks:

```sh
npx tsc --noEmit
npm run build
npm run lint
```

`npm run lint` currently reports pre-existing formatting issues in the original source. See [Architecture](docs/architecture.md) for boundaries and planned organization.

## Where to work

- `src/pages/` assembles route-level screens.
- `src/sections/` contains public homepage sections.
- `src/components/` contains common, layout, and generated UI components.
- `src/forms/` contains implemented form UI.
- `src/data/` contains editable conference content.
- `src/services/` contains frontend API boundaries and validation.
- `backend/` is reserved for the future Express API and currently contains documentation only.
- `docs/product-design-brief.md` preserves the original design and content brief.

Do not add secrets to browser code or implement payment verification in the frontend. Read [AGENTS.md](AGENTS.md) before making structural changes.
