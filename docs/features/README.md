# RunX — Feature PRD Index (v2, 2026-10-30)

Each feature has its own PRD: falsifiable assumptions, MoSCoW, checklist acceptance criteria, and the screens and states the mockup must show. The master PRD (`../PRD.md`) keeps product-wide decisions. Order of work: feature PRD -> Mom Test check -> mockup -> issues.

**Research caution:** interviews explore existing behavior, not usability tests of RunX. Needs are hypotheses; some interviewer prompts suggested solutions, so polite agreement is weak evidence.

## Decisions applied in this version
| ID | Decision | Effect |
|---|---|---|
| D1 | Scope follows the P2 spec: full stack with auth, database, 3+ features or roles, public API | Added FR-10 to FR-13; FR-07 and FR-09 no longer say "no backend" |
| D2 | The story is fitted to the chosen duration and the climax lands in the last 3 minutes (±15 s) | FR-04 keeps `buildTimeline`; "does not fit" returns a message, never forces the climax |
| D3 | Early stop: **Save for next time = Must**, **Finish the story now = Should** (interviews do not show closure as a pain point) | FR-06 |

## Index and traceability
| Feature | Type | Stories | Screens | Issue (ISSUES.md) | Document |
|---|---|---|---|---|---|
| Home screen and episode card | Should | US-1 | Home | #6 | [FR-01](FR-01_episode_catalog.md) |
| Session duration selection | Must | US-2 | Home | #6 | [FR-02](FR-02_session_setup.md) |
| Episode content manifest | Must | US-1, US-8 | — | #2, #4 | [FR-03](FR-03_episode_manifest.md) |
| Deterministic story scheduling | Must | US-2, US-3, US-5 | Running (progress bar) | #5 | [FR-04](FR-04_story_scheduler.md) |
| Mobile-friendly audio playback | Must | US-1, US-2 | Running | #7, #8 | [FR-05](FR-05_audio_player.md) |
| Early stop, resume and recap | Must (Finish now, recap: Should) | US-4, US-5 | Stop dialog, Resume | #9, #10, #11 | [FR-06](FR-06_early_end_resume.md) |
| Progress persistence | Must | US-5, US-7 | Home Continue | #2, #12 | [FR-07](FR-07_progress_persistence.md) |
| Authentication and roles | Must | US-7 | Login, Sign up | #3 | [FR-10](FR-10_authentication.md) |
| Guest demo mode | Must | US-6 | Home, Running | #13 | [FR-11](FR-11_guest_demo.md) |
| Editor: manage scenes | Should | US-8 | Editor | #14 | [FR-12](FR-12_editor_content_management.md) |
| Public API and docs | Should | US-9 | API docs | #15 | [FR-13](FR-13_public_api.md) |
| Testing and CI | Engineering | all | — | #1 | [FR-08](FR-08_quality_ci.md) |
| Deployment and documentation | Engineering | all | — | #16 | [FR-09](FR-09_deploy_documentation.md) |

Parked (not in the first two sprints): [in-app music ducking](parked/P1_in_app_music_ducking.md); [heart-rate display and adaptive story](parked/P3_heart_rate_adaptive_story.md) (TBD, not P2 scope); [recap after a gap](parked/P2_recap_after_gap.md) was merged into FR-06 as a Should.

## Mockup screen list (union of the feature PRDs)
Home (new, continue, completed, custom duration, demo) · Running (playing, paused, loading, error) · Stop dialog · Sign-off playing · Resume · Login and Sign up · Import progress prompt · Editor list and scene form · API docs page. For HW3, draw the first four groups; the rest can follow in Sprint 2.

## Cross-feature findings
- Audio preference is segmented: some runners like podcasts or books; others prefer music, video or silence. Do not treat all runners as one audience.
- Many participants already trust existing apps to remember their place. Continuation is baseline usability, not differentiation.
- Time constraints differ: fixed schedule, flexible route, chapter-driven running, aspirational goals. Test the presets and a custom length.
- Phone interaction during a run is often inconvenient; preferred controls vary by person and device.
- **Safety rule:** stopping early is often driven by discomfort, injury, schedule or interruption. Never encourage continuing for story completion. A compelling story can lengthen a run (Jordan), which is also a safety and schedule risk; the app makes no claim that it is safe to run while listening.

## Next actions
1. Run the Mom Test round (`../research/mom-test-script.md`) and update each feature's assumptions table.
2. Lock the manifest and checkpoint data model (FR-03) before implementing the scheduler.
3. Draw the mockup from the screen list above.
4. Create the GitHub issues from `../ISSUES.md`.
