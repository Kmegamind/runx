# RunX Design System

RunX tells a Don Quixote story while you run. The look is bright La Mancha daylight: a sky background, glass surfaces and 3D characters. The controls are the same on every screen; the fun lives in the story content, not in the controls.

## Scope for P2
Build: the tokens below, the **Home** (pre-run), **Running**, **Stop sheet** and **Resume** screens, and the loading, error and too-short states.
Not in P2, even though sections below describe some of them: a second visual world or any world toggle, the postcard and Share, the tab bar, music, stereo placement, hoofbeats and earcons, and any cadence or pace display. Build one of these only when an issue asks for it.

## Principles

1. **Ear first.** During a run the phone is in a pocket about 90% of the time. Story, rhythm and immersion live in the audio.
2. **Glance in two seconds.** While running, a screen answers only three questions: how long is left, who is talking, and how do I pause.
3. **Play before and after.** The stage and stickers belong to the pre-run and post-run screens.
4. **Native feel.** Use iOS patterns and system fonts so the web app feels like an iPhone app.
5. **Fun lives in content, never in controls.** Pause, Stop and the timer keep the same position, size and wording on every screen.

## Color

Components read only the semantic tokens below (CSS variables in `docs/design/tokens.css`).

### Daylight palette

| Token | Value | Role |
|---|---|---|
| `--c-sky` | `linear-gradient(180deg, #2E6FBF 0%, #5D9BDB 38%, #A9CFEF 68%, #F1D9A8 100%)` | Screen background |
| `--c-fg` | `#FFFFFF` | Text and icons on sky or glass |
| `--c-fg-2` | `rgba(255,255,255,.86)` | Secondary text on glass |
| `--c-glass` | `rgba(18,48,96,.58)` | Glass fill under text |
| `--c-glass-line` | `rgba(255,255,255,.36)` | Glass border |
| `--c-tint-bg` | `#FFFFFF` | Primary button fill |
| `--c-tint-fg` | `#1F4E8C` | Primary button label (8:1) |
| `--c-accent` | `#E3A33B` | Current story part, current windmill sail |

### Characters and system

| Token | Value | Role |
|---|---|---|
| `--c-quixote` | `#E3A33B` | Quixote speaker mark (shape only, never text) |
| `--c-sancho` | `#A7B56A` | Sancho speaker mark |
| `--c-sys-blue` / `--c-sys-green` / `--c-sys-gray` | `#0A84FF` / `#34C759` / `#8E8E93` | Icon tiles in sheet rows |
| `--c-sheet` | `rgba(246,246,250,.94)` | Bottom sheet background |
| `--c-label` / `--c-label-2` | `#1C1C1E` / `#6C6C70` | Text inside sheets |
| `--c-separator` | `rgba(60,60,67,.14)` | Row dividers |

The purple cape and gold trim in the character art are illustration colors. Keep them out of UI surfaces.

## Typography

- `--font-ui`: `-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif` for all interface text.
- `--font-num`: `ui-rounded, "SF Pro Rounded", -apple-system, sans-serif` for the timer, clock and stats, always with `font-variant-numeric: tabular-nums`.

| Token | Size / line height | Weight | Use |
|---|---|---|---|
| `--fs-timer` | 74 / 1 | 800 | Running timer |
| `--fs-clock` | 88 / 1 | 700 | Lock screen clock |
| `--fs-large-title` | 34 / 41 | 700 | Screen titles |
| `--fs-title-2` | 22 / 28 | 700 | Sheet titles |
| `--fs-title-3` | 20 / 25 | 700 | Episode title in cards |
| `--fs-headline` | 17 / 22 | 600 | Buttons, row titles, story line |
| `--fs-subhead` | 15 / 20 | 600 | Segmented control, secondary buttons |
| `--fs-footnote` | 13 / 18 | 400 | Hints, row subtitles, speaker name |
| `--fs-caption` | 11 / 13 | 600 | Tab labels, story part labels |

Use sentence case everywhere and set letter-spacing to -0.01em on text 17px and larger.

## Spacing, shape and size

- Spacing: `--sp-1` 4 · `--sp-2` 8 · `--sp-3` 12 · `--sp-4` 16 · `--sp-5` 20 · `--sp-6` 24 · `--sp-8` 32. The screen gutter is `--sp-4`.
- Radius: `--r-tile` 9 (icon tiles) · `--r-group` 18 (grouped lists) · `--r-card` 26 (glass cards) · `--r-sheet` 34 (sheet top corners) · `--r-pill` 999 (buttons, segmented control, tab bar).
- Size: `--tap` 44 minimum target · `--btn-h` 52 · `--ctrl-h` 60 for run controls · `--row-h` 64 for sheet rows.

## Materials

**Glass** is the default surface for cards, secondary buttons, the tab bar and the Now Playing card:

```css
background: var(--c-glass);
backdrop-filter: blur(22px) saturate(180%);
border: 1px solid var(--c-glass-line);
box-shadow: inset 0 1px 0 rgba(255,255,255,.35), 0 8px 24px rgba(0,0,0,.14);
```

Under `prefers-reduced-transparency: reduce`, drop the blur and use a solid fill: `#1D3C6E`.

**Sheets** use `--c-sheet` with the same blur and always show dark text.

## Characters

**Shape rule:** Don Quixote is always a vertical line: tall, thin, leaning forward, lance ahead. Sancho is always a circle: short, round, leaning back, sceptical. The silhouette alone should identify the speaker at 36px.

**One rendering per character:** the 3D character art.

**You** are the second squire: a faceless runner silhouette that appears on the pre-run stage (and later on the postcard).

**Likeness:** faces stay stylised. Never show reference photos or real people’s names in the app, the repo or demo material.

**Expressions and where they are used:**

| Moment | Don Quixote | Sancho |
|---|---|---|
| Pre-run stage | Determined | Happy |
| Speaking in a caption (default) | Inspired | Skeptical |
| The other character objects | Suspicious | Exasperated |
| Charge | Shouting | Surprised |
| Paused | Confused | Thinking |
| Stop sheet | — | Worried |
| Recap and resume | Dreamy | Exasperated |
| Postcard and share | Inspired | Laughing |

**Assets:** `/public/characters/{quixote|sancho}/dream/{expression}.webp`, square, 512px, exported at 2x. Avatar sizes are 36px in captions, 40px in message bubbles, 52px as lock screen artwork and 60px in the sheet header.

## Copy

| Element | Text |
|---|---|
| Episode title | Giants on the Horizon |
| Start button | Ride out |
| Timer label | until glory |
| Stop sheet title | Retreat for now? |
| Post-run title | You were there |
| Resume title | Welcome back |

Action labels are fixed and never restyled as jokes: Pause, Stop, Save for next time, Finish the story now, Keep running, Continue the story, Done.

## Components

**Large title nav.** A 34px title on the left; no buttons on the right in P2.

**Segmented control.** Offers 20, 30 and 45 min. It has a pill track in `rgba(120,120,128,.26)`, 44px segments, and the selected segment is white with dark text and a soft shadow. It uses `role="radiogroup"`.

**Buttons.**
- Primary: a `--btn-h` pill in tint colors. Use one per screen.
- Secondary: a glass pill.
- Run controls: two `--ctrl-h` pills side by side, Pause as primary and Stop as glass.

**Glass card.** Uses `--r-card` and 14px padding. It holds the episode title, the choice of length and the start button on the pre-run screen.

**Caption card.** A glass card with the speaker avatar, the speaker shape mark (a 9×20 pill for Quixote, a 16px circle for Sancho), the speaker name, and only the current line. It uses `aria-live="polite"`.

**Windmill player.** The hero of the running screen. Its four sails are the four story parts: Warm-up, Rising, Climax, Epilogue.
- Sail states: done is filled, current uses `--c-accent`, upcoming is outlined.
- The sails turn at one constant slow speed (6s per turn) while audio plays and stop when paused. Speed never depends on the runner's pace.
- The tower has a giant’s face.
- It uses `role="img"` with a label such as “Story part 2 of 4, Rising”.

**Bottom sheet.** Has a 38×5 grabber, a speaker avatar, a title, one line of context and an inset grouped list. Each row is a full `--row-h` button with a colored icon tile, a title, a subtitle and a chevron. List rows from safest to boldest.

**Now Playing card.** This is the lock screen view, set through the Media Session API (see Audio). It shows speaker artwork, the current line as the title, the speaker and scene as the subtitle, a scrubber, and three controls: replay line, play or pause, next scene.

**Message bubbles.** Recaps are a short exchange: Quixote on the left in a white bubble, Sancho on the right in a tint bubble, each with a 40px avatar.

**Postcard (not in P2).** Two overlapping cards from the scene where the run ended, rotated -4° and 3.5°: Sancho’s and Quixote’s 3D art. Below them is a grouped stats list (time, scenes, giants slain or windmills hit) with Share and Done.

**Tab bar (not in P2).** A floating glass pill with Run, Stories and You. Hide it while a run is active.

## Screens

- **Pre-run:** Title, both characters as tilted cards with “You” between them, then a glass card with the episode, length and start button. Add the hint “Pocket your phone, we’ll talk you through it.”
- **Lock screen:** The Now Playing card. During a run, this is the main screen.
- **Running:** Scene count, the timer, the timer label, the windmill player with part labels, the caption card, then Pause and Stop.
- **Stop:** The running screen dimmed behind a sheet with Save for next time, Finish the story now and Keep running.
- **Post-run:** A plain summary (time, scenes) and Done. The postcard and Share are not in P2.
- **Resume:** Title, saved time, a two-line recap in bubbles, a Play the recap row with Skip, the length choice, then Continue the story.

## States

- **Playing:** The timer counts down, the sails turn and the caption follows the audio.
- **Paused:** A “Paused” glass pill (`role="status"`) sits above the timer. The timer switches to `--c-fg-2`, the sails stop and Pause becomes Resume. Nothing else moves.
- **Loading:** Before the first run, download the episode’s clips. Show a progress bar (`role="progressbar"`), “9 of 17 clips” and a Cancel button. Do not start the clock until enough audio is buffered.
- **Error:** Show an inline `role="alert"` inside the caption card. It names what failed, confirms the clock is stopped, and offers Retry as primary and Skip this line as secondary. Never auto-skip.
- **Too short:** If the chosen length cannot fit the remaining story, say so and offer the next length up or Finish the story now. Never silently cut scenes.

## Audio

- Music, stereo placement, hoofbeats and earcons are not in P2; the story plays as clean dialogue clips.
- **Media Session:** Set `metadata` on every line. The title is the line (60 characters max), the artist is the speaker, the album is “RunX, Scene N of 12”, and the artwork is the speaker’s expression. Map `play`, `pause`, `previoustrack` to replay line and `nexttrack` to next scene.

## Accessibility

- **Contrast:** At least 4.5:1 for body text and 3:1 for text 24px and larger. White text may sit directly on the sky only in the top 35% of the screen; below that, place text on glass. Check against the lightest point behind it.
- **Targets:** Every interactive element is at least 44×44. Run controls are 60px tall and sheet rows are 64px.
- **Captions:** Always on during audio. The speaker is identified by name and shape, never by color alone.
- **Motion:** Under `prefers-reduced-motion`, the sails stop and nothing loops.
- **Transparency:** Under `prefers-reduced-transparency`, use the solid glass fills listed under Materials.
- **Text size:** Size type in `rem` and let layouts grow to 200% without clipping the timer or controls.
- **Labels:** Icon-only buttons get `aria-label`, and decorative art gets `aria-hidden="true"`. The focus ring is a 3px `#0A84FF` outline with a 3px offset.

## Do’s and Don’ts

**Do**
- Pair every visual joke with an audio version, so the screen works with eyes closed.
- Keep one primary button per screen and keep control wording the same on every screen.
- Use system fonts and iOS patterns before inventing new components.
- Show the finish time whenever a length is chosen.
- Use the expression table so each character reacts consistently.

**Don’t**
- Don’t ask runners to look at the screen to enjoy something.
- Don’t use the cape purple or the trim gold on UI surfaces.
- Don’t put white text on the lower sky without glass.
- Don’t show reference photos or real people’s names anywhere.
- Don’t end a run, skip a line or cut a scene without the runner choosing it.
