# Feature PRD — Public API and documentation

**Feature ID:** FR-13 · **Stories:** US-9 · **Screens:** API docs page · **Status:** v1 draft 2026-10-30 (new; P2 requires a public, documented API)

## 1. Problem and desired outcome
Developers (and our own frontend) read episodes and manage progress through one documented REST API.

## 2. Evidence
No interview evidence; P2 requirement. The same endpoints serve the app, so there is no separate "API only" work.

## 3. MoSCoW
| Priority | Scope |
|---|---|
| **Must** | `GET /api/episodes` and `GET /api/episodes/{id}/scenes` (public, published only) · `GET` and `PUT /api/progress` (authenticated, own data only) · consistent JSON, status codes and error shape · input validation · OpenAPI file at `docs/api/openapi.yaml`, served at `/api/docs` · integration tests for success, validation errors and auth failures |
| **Should** | Editor endpoints for scenes (FR-12) documented separately · pagination · basic rate limiting |
| **Could** | API keys for third parties |
| **Won't** | Endpoints that expose other users' progress |

## 4. Acceptance criteria
- [ ] Given a request without a token, progress endpoints return 401; another user's data returns 403 or 404.
- [ ] Given invalid input, the API returns 400 with a field-level error; nothing is written.
- [ ] The OpenAPI spec matches the implemented routes (checked in CI).
- [ ] Unpublished scenes never appear in public responses.

## 5. Screens and states
API docs page (rendered OpenAPI). No mockup needed beyond a link in the footer.

## 6. Dependencies
FR-03, FR-07, FR-10, FR-12, FR-08.

## 7. Change log
- 2026-10-30 v1: created.
