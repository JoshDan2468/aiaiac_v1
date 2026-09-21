# Student Delegate verification and evidence

Milestone 3B.1 added Student Delegate applications without review actions, pricing, or payment.
A Student application reuses `delegate_registrations` for the common person
and package record and has exactly one `student_verifications` record for academic and review
state. `student_verification_events` is the future-ready event history; this milestone emits only
`STUDENT_APPLICATION_CREATED`.

## State model

- `NOT_SUBMITTED`: academic details are saved, but evidence has not been submitted for review.
- `PENDING`: evidence has been submitted and awaits review.
- `MORE_INFORMATION_REQUIRED`: a reviewer has requested corrected or additional evidence.
- `APPROVED`: current Student status has been verified.
- `REJECTED`: Student eligibility has been rejected.

The allowed transitions are:

```text
NOT_SUBMITTED -> PENDING
PENDING -> APPROVED | REJECTED | MORE_INFORMATION_REQUIRED
MORE_INFORMATION_REQUIRED -> PENDING
APPROVED -> no public transition
REJECTED -> no public transition
```

Milestone 3B.2 still exposes no transition endpoint. The application-level transition map and database
state consistency constraints establish the boundary for the evidence/review milestone.

## Evidence requirements and lifecycle

Minimum evidence readiness requires one `CURRENT_STUDENT_ID` and one of
`COURSE_REGISTRATION`, `ENROLMENT_LETTER`, `TUITION_OR_SCHOOL_FEE_RECEIPT`,
`TRANSCRIPT_OR_ENROLMENT_STATEMENT`, or `OTHER_INSTITUTIONAL_ENROLMENT_EVIDENCE`. Only safely
available current documents count. Readiness is reported separately and never changes a verification
to `PENDING` or `APPROVED`.

The server accepts PDF, JPEG, and PNG files up to 5 MB each. It validates application eligibility,
the evidence-type allowlist, file presence and size, a safe single extension, declared MIME type,
detected magic bytes, and consistency between the extension and detected content. It generates the
SHA-256 checksum and a 256-bit random physical key. Original filenames are retained only as bounded,
sanitized display metadata. Binary contents are not stored in PostgreSQL.

Uploads enter private storage with `PENDING_SCAN`, then a provider-neutral `MalwareScanner` returns
`CLEAN`, `INFECTED`, `UNAVAILABLE`, or `ERROR`. Only `CLEAN` becomes `AVAILABLE`; infected files are
`REJECTED`, and unavailable/error results remain quarantined and unavailable to Admin retrieval. The
development adapter deliberately reports `UNAVAILABLE` rather than pretending that no scanner means
clean. Production must supply an approved private scanner before evidence can become reviewable.

## Ownership, storage, and replacement

Creating a Student application returns a cryptographically random, application-scoped continuation
token with a 24-hour default expiry. Only its SHA-256 hash is stored. Evidence endpoints require the
matching public registration reference and token; internal verification UUIDs, storage keys, and raw
tokens are never exposed. Uploads have a separate rate limit.

`StudentEvidenceStorage` separates business logic from storage. The development implementation writes
to `STUDENT_EVIDENCE_STORAGE_DIR` (default `.private/student-evidence`), rejects arbitrary keys, creates
the directory with restrictive permissions where supported, uses exclusive file creation, has no
static Express route, and is ignored by Git. It must never point at `frontend/public` or another public
directory. Production needs durable private object storage or a private persistent volume; no cloud
credentials or vendor SDK are invented here.

Replacement creates a new key and document row, marks the former row superseded, and keeps it for
audit/history. The database permits only one current document per evidence category, and the service
caps each category at three versions. Final deletion and retention duration require an organizer/legal
policy; the storage abstraction includes deletion so a controlled retention job can be added later.

## Admin retrieval and audit

Evidence is never publicly addressable. The protected attachment endpoint requires
`student_verifications.read`, so the default policy permits `SUPER_ADMIN` and
`REGISTRATION_MANAGER` while denying `ADMIN`, `FINANCE`, and `COMMUNICATIONS`. It returns only current
`CLEAN`/`AVAILABLE` records using detected MIME type, `Content-Disposition: attachment`,
`X-Content-Type-Options: nosniff`, and private no-store cache headers. It does not reveal the storage
key or filesystem path.

The event stream records actual uploads, replacements, completed scan outcomes, infected rejections,
and authorized accesses. Event metadata contains public evidence identifiers and types only—not raw
tokens, keys, paths, file contents, or unnecessary personal data. Documents are not emailed, parsed,
OCRed, or sent to public scanning services.

## Payment boundary

Student payment initialization is backend-authoritative. It requires both an `APPROVED`
verification and an active `delegate_package_prices` row for the requested currency. The Student
package is active for applications but deliberately has no default or active price, so every
Student payment attempt is denied in this milestone. Professional Delegate payment behavior is
unchanged.

## Access and data minimization

The public endpoint is rate-limited and strictly validates academic fields. It does not accept
payment values, status, reviewer data, documents, BVN, NIN, passport data, national identity data,
or date of birth. The read-only Admin queue requires `student_verifications.read`; only
`SUPER_ADMIN` and `REGISTRATION_MANAGER` receive Student verification permissions by default.

Milestone 3B.3 remains responsible for formal submission and Admin review decisions, including
approve, reject, and request-more-information actions. Student pricing and payment remain disabled.
