# Feature PRD — Home screen and episode card

**Feature ID:** FR-01 · **Stories:** US-1 · **Screens:** Home · **Status:** v2, rewritten 2026-10-30 (decisions D1–D3 in README applied)
**Implementation note:** built together with FR-02 (same screen). Kept small on purpose: there is one episode.

## 1. Problem and desired outcome
A returning or new user lands on one screen that shows the story, where they are in it, and how to start.

## 2. Interview evidence (observed, not validated demand)
Brianna plays whatever is next in her feed; Jordan saves new Crime Junkie episodes for runs; Kayla and Megan use video, not audio, when exercising. These are content-choice habits; they do not show that people need an episode catalog. With one episode, a catalog adds nothing.

## 3. Assumptions to test
| # | Assumption | Proof it is wrong |
|---|---|---|
| H1 | A new user understands the premise from title plus one line | In prototype tests, more than half ask "what is this?" before starting |
| H2 | Seeing "Scene 6 of 12" makes continuing feel easy | Testers ignore it or find it confusing |

## 4. MoSCoW
| Priority | Scope |
|---|---|
| **Must** | One episode card: title, one-line description, state (not started / in progress, Scene N of M / complete) · one tap goes to session setup |
| **Should** | "Continue" variant with a one-line recap of the last scene |
| **Could** | Season list when a second episode exists |
| **Won't** | Browsing, search, ratings, recommendations |

## 5. Acceptance criteria
- [ ] Given a new user, Home shows the episode card with state "not started" and one tap leads to setup.
- [ ] Given saved progress, Home shows "Continue: Scene N of M" and the recap line instead of "Start".
- [ ] Given a completed episode, the card shows "Completed" and offers Replay.
- [ ] All controls have accessible names and are keyboard reachable.

## 6. Screens and states (for the mockup)
Home (new) · Home (continue, with recap line) · Home (completed).

## 7. Validation
Watch whether first-time testers can start without explanation. Observe choices, not stated interest.

## 8. Dependencies
FR-02 (setup), FR-06 (checkpoint and state), FR-07 (saved progress), FR-10 (login state).

## 9. Change log
- 2026-10-30 v2: merged catalog idea into Home; added MoSCoW and falsifiable assumptions.
