# Frontend source map

This folder is the website that runs in a visitor's browser.

```text
main.tsx -> App.tsx route -> page -> section/form -> shared component or data/service
```

| Folder        | Plain-language purpose                                                  |
| ------------- | ----------------------------------------------------------------------- |
| `pages/`      | Complete screens attached to browser URLs.                              |
| `components/` | Reusable visual building blocks.                                        |
| `data/`       | Editable conference content and typed records.                          |
| `forms/`      | Form interfaces and validation; several are older, unrouted prototypes. |
| `services/`   | The only browser modules that should communicate with the API.          |
| `context/`    | Authentication state shared across the React tree.                      |
| `hooks/`      | Reusable React/browser behavior.                                        |
| `layouts/`    | Shared Admin screen structure.                                          |
| `lib/`        | Small general helpers.                                                  |
| `types/`      | TypeScript descriptions shared by features.                             |
| `test/`       | Shared test setup and cross-feature frontend tests.                     |
| `sections/`   | Older one-page sections not used by the current route tree.             |

The Delegate Registration route is the first active registration workflow: it loads packages and
submits applications through `services/delegate/delegateService.ts`. Other registration journeys
and the contact form remain local-only preparation experiences. Admin authentication and the
Delegate directory use the real API.

For the complete route, file, and data-flow explanation, read
[`../../docs/layman-codebase-guide.md`](../../docs/layman-codebase-guide.md).
