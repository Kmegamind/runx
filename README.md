# RunX

**Run with Don Quixote and Sancho.** A mobile web app that turns every run into an episode of a comedy audio adventure. While you run, Don Quixote and his squire Sancho Panza talk to you in short, funny scenes adapted from the public-domain novel. You choose a 20, 30 or 45-minute run, and a scheduler builds a story timeline that fits: a light opening, rising action, and the climax in your last minutes. If you stop early you choose how the story ends, and your progress is saved for the next run.

> Status: course project (CS7180 AI-assisted coding), in planning and setup. There is no application code yet; the Next.js scaffold is [issue #1](https://github.com/Kmegamind/runx/issues/1).

## What it does (MVP)
- Pick a run length (20 / 30 / 45 min); the story fits it and the climax lands in the last 3 minutes.
- Two characters, captions for every line, pause and stop controls made for use while moving.
- Stop early: **Finish the story now** or **Save for next time**; the story never cuts off mid-sentence.
- Resume from a saved checkpoint; sign in to keep progress across devices; try a demo as a guest.
- Editor tools for scenes and a public API with OpenAPI docs (Sprint 2).

## Project map
| Where | What |
|---|---|
| [`docs/PRD.md`](docs/PRD.md) | Product requirements: user stories US-1..US-9 with acceptance criteria |
| [`docs/features/`](docs/features/README.md) | One PRD per feature (FR-01..FR-13) and parked ideas |
| [`docs/architecture.md`](docs/architecture.md) | Modules, data model and key flows |
| [`docs/decisions/`](docs/decisions/README.md) | One short record per big technical choice |
| [`docs/sprints/`](docs/sprints/sprint-1/planning.md) | Sprint planning, standups and retrospectives |
| [`docs/api/openapi.yaml`](docs/api/openapi.yaml) | Draft public API contract |
| [`DESIGN.md`](DESIGN.md) | Design system: colors, type, components, accessibility |
| [`docs/design/`](docs/design/README.md) | Interactive prototype (`mockup.html`), tokens and art assets |
| [`docs/content/`](docs/content/script-style-guide.md) | Script style guide and Episode 1 scenes |
| [`docs/ISSUES.md`](docs/ISSUES.md) | The backlog as written, mirrored on GitHub |
| [`AGENTS.md`](AGENTS.md) | Rules for AI coding tools: architecture, naming, workflow, do and don't |

## Planned stack
Next.js (App Router) + TypeScript + Tailwind CSS, Supabase (PostgreSQL and Auth), Vitest and Playwright, GitHub Actions, deployed on Vercel. Exact versions are pinned once the scaffold lands.

## How we work
- **Board:** [RunX project](https://github.com/users/Kmegamind/projects/2) with columns Backlog, Sprint Todo, In Progress, In Review, Done.
- **Sprints:** Sprint 1 (foundation and core loop) and Sprint 2 (stop, resume, accounts, API), tracked as milestones on the [issues page](https://github.com/Kmegamind/runx/issues).
- **Flow:** every change starts from an issue; branches `feature/<issue>-desc` (also `fix/`, `chore/`, `docs/`); Conventional Commits with an issue reference; tests first; one issue per pull request, reviewed by a teammate and squash-merged. Details in [`AGENTS.md`](AGENTS.md).

## Content and credits
The story is adapted from *Don Quixote* (public domain); sources are credited in `docs/SOURCES.md` once the first episode lands.

## Getting started
Setup and run instructions will be added with the scaffold in issue #1.
