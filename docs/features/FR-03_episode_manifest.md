# Feature PRD — Episode content manifest

**Feature ID:** FR-03 · **Stories:** US-1, US-8 (editor reads and writes the same data) · **Screens:** none directly · **Status:** v2, rewritten 2026-10-30 (D1–D3 applied)

## 1. Problem and desired outcome
Represent the story as reusable, testable scenes instead of one hardcoded audio file, so the scheduler, player, resume and editor all share one validated model.

## 2. Interview evidence (observed, not validated demand)
Jordan dislikes a repeated recap right after part one; Kyle uses chapter boundaries and replays chapters after long gaps; Grace discusses audiobook continuity. These motivate scene boundaries and checkpoints. They do not validate this specific format.

## 3. Assumptions to test
| # | Assumption | Proof it is wrong |
|---|---|---|
| M1 | Optional scenes can be dropped without confusing the plot | In listening tests, testers cannot retell the story after the 20-minute version |
| M2 | Every scene is understandable alone | Testers who miss a scene ask "what is happening?" |

## 4. MoSCoW
| Priority | Scope |
|---|---|
| **Must** | Fields per scene: episodeId, manifestVersion, sceneId, type, order, durationSec, audioUrl, transcript, required or optional, prerequisites, checkpoint flag · scene types: opening, core, optional, climax, ending, signoff, recap, compressed_ending · Ep1 content of about 17 scenes · stored in the database and seedable from JSON |
| **Should** | Each checkpoint (CP1 after departure, CP2 windmills on the horizon, CP3 facing the windmills) links to a compressed ending · validator also runs in CI on the seed file |
| **Could** | Second episode to prove reuse |
| **Won't** | Generating scenes at runtime; user-uploaded content |

## 5. Acceptance criteria
- [ ] The validator rejects: duplicate ids, missing audio, negative durations, dependency cycles, unknown prerequisites, scenes without a transcript.
- [ ] Every scheduled scene has a transcript (used as caption).
- [ ] Saved progress stores `manifestVersion`; an old version is detected and handled safely (see FR-07).
- [ ] Deleting all dialogue from a scene leaves events that match the original chapter (content rule).
- [ ] Ep1 passes validation and plays end to end in the 20/30/45 timelines (FR-04).

## 6. Screens and states
None. Editor screens are in FR-12.

## 7. Validation
Moderated listening test: does dropping optional scenes leave the story understandable?

## 8. Dependencies
FR-04 (consumer), FR-06 and FR-07 (checkpoints), FR-12 (editing), issue "Design database schema".

## 9. Open questions
Public-domain translation source and rights check before publishing; record in `docs/SOURCES.md`.

## 10. Change log
- 2026-10-30 v2: term unified to `checkpoint` (was `safe-stop`); scene types aligned with master PRD; database storage and editor link added.
