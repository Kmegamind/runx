# Feature PRD — Progress persistence (guest and account)

**Feature ID:** FR-07 · **Stories:** US-5, US-7 · **Screens:** Home (Continue), Login import prompt · **Status:** v2, rewritten 2026-10-30 (D1 applied; replaces `FR-07_local_persistence.md`)

## 1. Problem and desired outcome
Remember where each runner is in the story: on the device for guests, in the database for logged-in users.

## 2. Interview evidence (observed, not validated demand)
Brianna, Aisha, Jordan and Kyle rely on podcast and audiobook apps to remember their place. They treat it as a baseline expectation, not a novelty. Whether cross-device continuation matters is unknown.

## 3. Assumptions to test
| # | Assumption | Proof it is wrong |
|---|---|---|
| R1 | Progress that survives a reload is expected | Testers do not notice either way |
| R2 | Cross-device continuation is valuable | Testers always use one phone |

## 4. MoSCoW
| Priority | Scope |
|---|---|
| **Must** | Save `episodeId, manifestVersion, checkpointId or sceneId, offsetSec, status, lastPlayedAt` · guest: localStorage; logged-in: database row per user with row-level security · restore after reload · corrupted or incompatible data fails safely with a clear Restart option · tests for version mismatch |
| **Should** | Offer to import guest progress on first login · Clear progress · last-used duration saved |
| **Could** | Last-write-wins sync when two devices differ |
| **Won't** | Offline audio caching or PWA (separate later work) · tracking location or health data |

## 5. Acceptance criteria
- [ ] Given a saved checkpoint, when I reload, then Home shows Continue with the right scene.
- [ ] Given corrupted or older-version saved data, then the app shows a Restart option and does not crash.
- [ ] Given a logged-in user, then progress is read and written only for that user (another user's row is not accessible).
- [ ] Given a guest who logs in, then I am offered to import local progress once.
- [ ] No progress is marked complete after an audio or save failure.

## 6. Screens and states (for the mockup)
Home Continue card · "Import your progress?" prompt after login · "Saved progress could not be read" with Restart.

## 7. Validation
Check whether testers understand progress is tied to a device (guest) or account.

## 8. Dependencies
FR-03 (version), FR-06, FR-10 (accounts), database schema issue.

## 9. Change log
- 2026-10-30 v2: no longer "no backend"; now guest local plus per-user database (P2 requirement).
