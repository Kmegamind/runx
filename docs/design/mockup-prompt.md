# RunX mockup — prompts for Claude Web

Source of truth: `docs/features/README.md` (screen list) and FR-01, FR-02, FR-04, FR-05, FR-06. Use English in the chat (course advice). Start a new chat, attach `PRD.md` and the FR-01, FR-02, FR-05, FR-06 files.

## Prompt 1 — all screens in one file

```text
Using the attached PRD and feature PRDs, build ONE self-contained mobile-first HTML mockup of RunX (inline CSS and JS, no external libraries, 375x812 phone frame centered on a neutral page). RunX is a running companion: while the user runs, Don Quixote and Sancho talk in short funny audio scenes. The story is fitted to the chosen run length.

Add a small fixed "state switcher" above the phone (a row of buttons) so I can jump to every state below and screenshot it. Give each state a root element with the id shown in brackets.

HOME
- [home-new] Title "RunX", subtitle "Run with Don Quixote & Sancho". One episode card: "Giants on the Horizon", one-line description, status "Not started". Duration chips 20 / 30 / 45 min (30 preselected). A small hint "Story ends at 7:42 pm" (placeholder time). Large Start button. A secondary text button "Try demo".
- [home-continue] Same, but the episode card shows "In progress - Scene 6 of 12" and a one-line recap ("Don Quixote has just spotted thirty giants on the horizon."). Primary button reads "Continue".
- [home-custom] Home with an extra chip "Custom" opened to a stepper (15-60 min in 5-minute steps). Mark it visually as optional.
- [home-complete] Card status "Completed", buttons "Replay".

RUNNING
- [run-playing] Huge remaining time (e.g. 18:42), scene title "Scene 6: The Giants", speaker label "Don Quixote", caption of the current line (large, readable), a story progress bar in four labeled parts (Warm-up, Rising action, Climax, Epilogue) with the current part highlighted, and two large buttons Pause and Stop.
- [run-paused] Same with a "Paused" label and a Resume button.
- [run-loading] "Loading audio for this run..." with a progress indicator before the run starts.
- [run-error] An error banner "This clip could not load" with Retry and Skip buttons.
- [run-demo] Playing state with a "Demo - 10x speed" banner.

STOP DIALOG (over a dimmed Running screen)
- [stop-dialog] Title "Stopping for today?". Three full-width buttons, each with one line of description: "Save for next time" (primary: "We'll keep your place"), "Finish the story now" (secondary: "About 2 minutes of ending"), "Keep running" (text button). Neutral, kind wording. No guilt, no streaks, never "keep going".
- [stop-signoff] A short sign-off playing: caption "See you at the windmills, friend." and a small "Saved" confirmation.

RESUME
- [resume] Saved progress bar "Scene 6 of 12", recap line "Previously on: ...", skippable with a "Skip recap" link, duration chips (30 selected), primary button "Continue the story", secondary "Restart episode".
- [resume-nofit] Message "The rest of the story needs at least 25 minutes." with two buttons: "Run 30 min" and "Pick another length".

Design rules: warm and playful but readable; high contrast (>= 4.5:1); all tap targets >= 44px; every control has a visible label; every spoken line appears as a caption with the speaker's name; no pace or sprint commands and no comments on the runner's speed. Define colors, font sizes and spacing as CSS variables at the top (:root). Make it interactive: chips toggle, Stop opens the dialog, Keep running closes it, Pause and Resume switch states.
```

## What to check in the result
- [ ] All 15 states reachable from the switcher and every id present
- [ ] 30 min preselected; chips toggle
- [ ] Remaining time is the largest element on the Running screen
- [ ] Caption plus speaker name on every Running state
- [ ] Stop dialog shows Save as primary; "Finish the story now" is present but secondary
- [ ] No guilt wording, no sprint prompts, nothing outside the feature PRDs (no login, no leaderboard)

## Follow-up fixes (paste only the ones you need)
- `Make the timer at least 72px and bold.`
- `Split the progress bar into four labeled segments and highlight only the current one.`
- `Remove anything that is not in the attached PRDs.`
- `Output the complete file again; do not truncate.`

## Prompt 2 — design tokens (after you are happy with the mockup)

```text
Based on this mockup, write a DESIGN.md for the repo root as a product designer, under 120 lines: color palette with hex values and roles, typography scale, spacing scale, component rules (buttons, chips, cards, dialog, story progress bar, caption), states (playing, paused, loading, error), accessibility rules (contrast, 44px targets, captions, reduced motion), and a Do's and Don'ts section. Use the CSS variables from the mockup as the token names.
```

## Saving the results
1. Save the HTML as `docs/design/mockup.html`.
2. Screenshot at 375 px and name: `01-home-new.png`, `02-home-continue.png`, `03-run-playing.png`, `04-run-error.png`, `05-stop-dialog.png`, `06-resume.png`, `07-resume-nofit.png`.
3. Save `DESIGN.md` at the repo root; run `npx @google/design.md lint DESIGN.md`.
4. Add the Claude chat share link to `docs/design/README.md` as the design source.
5. Later screens (login, sign up, import prompt, editor, API docs) are Sprint 2; mock them after the first four groups are done.
