# Backend source map

This folder is the API that runs on a server, not in a visitor's browser.

```text
server.ts
  -> app.ts middleware
  -> route
  -> validation/authentication
  -> controller
  -> service
  -> repository
  -> PostgreSQL
```

| Folder          | Plain-language purpose                                          |
| --------------- | --------------------------------------------------------------- |
| `config/`       | Validated settings, PostgreSQL connections, and Admin sessions. |
| `routes/`       | Matches API methods and URLs to handlers.                       |
| `middleware/`   | Security and request/response checkpoints.                      |
| `controllers/`  | Translates HTTP input and output.                               |
| `services/`     | Authentication and password rules.                              |
| `repositories/` | Parameterized SQL and database records.                         |
| `validators/`   | Rules for accepted input.                                       |
| `types/`        | TypeScript descriptions used by backend modules.                |
| `scripts/`      | Deliberately run maintenance/setup commands.                    |

Health, readiness, Admin authentication, and Delegate Registration are implemented. The Delegate
module owns public package discovery/submission and Admin list/detail endpoints. Enquiries,
payments, reporting, Admin registration mutations, and non-delegate workflows are not implemented.

For the complete request flow and file-by-file explanation, read
[`../../docs/layman-codebase-guide.md`](../../docs/layman-codebase-guide.md).
