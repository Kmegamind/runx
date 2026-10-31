# Feature PRD — Editor: manage episodes and scenes

**Feature ID:** FR-12 · **Stories:** US-8 · **Screens:** Editor scene list, Scene form · **Status:** v1 draft 2026-10-30 (new; third role required by P2)

## 1. Problem and desired outcome
Add or fix scenes without changing code, and block broken manifests from reaching runners.

## 2. Evidence
No interview evidence; this is the third role for the P2 rubric and removes the content bottleneck (about 17 scenes of review). Scope stays small: one season, one episode.

## 3. Assumptions to test
| # | Assumption | Proof it is wrong |
|---|---|---|
| E1 | A simple form is enough to fix content quickly | Editing a scene takes more than a few minutes or needs developer help |

## 4. MoSCoW
| Priority | Scope |
|---|---|
| **Must** | Editor-only access · list scenes in order · create, edit, reorder scenes (type, duration, audio URL or upload, transcript, prerequisites, checkpoint flag) · publish blocked when the FR-03 validator fails (message shows why) |
| **Should** | Preview a scene's audio and caption · unpublished draft versus published manifest |
| **Could** | Change history |
| **Won't** | Real-time multi-editor collaboration · AI script generation inside the app |

## 5. Acceptance criteria
- [ ] Given a runner account, editor pages and APIs return 403.
- [ ] Given an editor, I can edit a scene and see the change after publishing.
- [ ] Given an invalid manifest (cycle, missing audio, duplicate id), Publish is disabled with an explanation.
- [ ] Publishing bumps `manifestVersion` so old saved progress is handled safely (FR-07).

## 6. Screens and states (for the mockup)
Scene list (ordered, with type chips) · Scene form with validation errors · Publish confirmation.

## 7. Dependencies
FR-03, FR-10 (roles), FR-13 (API), FR-07 (versions).

## 8. Change log
- 2026-10-30 v1: created.
