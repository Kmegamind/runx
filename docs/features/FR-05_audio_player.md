# Feature PRD — Mobile-friendly audio playback

**Feature ID:** FR-05 · **Stories:** US-1, US-2 · **Screens:** Running · **Status:** v2, rewritten 2026-10-30 (D1–D3 applied)

## 1. Problem and desired outcome
Deliver the dialogue with as little screen interaction as possible, and make it followable while exercising.

## 2. Interview evidence (observed, not validated demand)
Jordan and Kyle prefer earbud controls to taking a phone off an armband; Aisha reports sweaty-screen problems; Brianna and Natalie use their phones despite the inconvenience. Natalie and Kayla find it hard to follow spoken content while exercising, which supports captions and short, self-contained scenes.

## 3. Assumptions to test
| # | Assumption | Proof it is wrong |
|---|---|---|
| P1 | Runners can follow 1–2 minute dialogue scenes while moving | Testers lose the plot even with captions |
| P2 | After pressing Start, no touch is needed | Testers must touch the phone more than twice per run |
| P3 | Playback survives a locked screen on common phones | The spike shows it stops (then use one continuous stream or state the limit) |

## 4. MoSCoW
| Priority | Scope |
|---|---|
| **Must** | Play pre-generated clips from the timeline · large Start, Pause, Resume, Stop · remaining time and scene caption with speaker · **captions for every spoken line** · no autoplay before a user tap · load the session's audio before start · visible, recoverable errors (retry or safe skip) · no interaction needed between scenes |
| **Should** | Media Session metadata and play/pause so lock-screen and earbud buttons work where supported · Wake Lock while running · result of the lock-screen spike drives the final design |
| **Could** | Playback speed · haptic cue at scene changes |
| **Won't** | Controlling Spotify or Apple Music · guaranteeing background playback on every browser · voice commands |

## 5. Acceptance criteria
- [ ] Given Start is tapped, then audio begins only after that gesture and the first scene plays within 2 s.
- [ ] Given any scene, then a caption with the speaker's name is visible while it plays.
- [ ] Given Pause, then the clock freezes; given Resume, then playback continues from the same position.
- [ ] Given a clip fails to load, then an error appears with Retry and Skip; skipping never marks progress complete.
- [ ] Given normal playback, then no tap is required between scenes.
- [ ] All controls are at least 44 px with accessible names.

## 6. Screens and states (for the mockup)
Running (playing) · Running (paused) · Loading before start · Error banner with Retry and Skip.

## 7. Validation
Test on a treadmill or while walking, in safe conditions: count phone touches, ask what they could follow.

## 8. Dependencies
FR-04 (timeline), FR-03 (audio and transcripts), FR-06 (Stop), issue "Spike: lock-screen audio".

## 9. Change log
- 2026-10-30 v2: captions promoted to Must (interview evidence and accessibility); lock-screen and earbud controls moved to Should and tied to the spike.
