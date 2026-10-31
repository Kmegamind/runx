# Engineering requirement — Deployment and documentation

**ID:** FR-09 · **Type:** engineering requirement · **Status:** v2, rewritten 2026-10-30
Course deliverable; no interview evidence is claimed.

## 1. Purpose
A reviewer can open the live app, and a developer can clone, test and deploy from the docs.

## 2. MoSCoW
| Priority | Scope |
|---|---|
| **Must** | Production deploy from `main` (Vercel) · env vars per environment, `.env.example` with names only · health-check URL that checks app and database · README with live URL, local run, test commands, deploy steps · architecture diagram · database schema diagram · OpenAPI docs (FR-13) · `AGENTS.md` maintained · sprint planning and retro docs · partner contribution log · 10-minute demo video |
| **Should** | PR preview deploys (also FR-08) · known browser limitations documented (lock-screen audio) · production migration steps written down |
| **Could** | Architecture decision records in `docs/decisions/` |
| **Won't** | Real API keys or `.env` in the repository |

## 3. Acceptance criteria
- [ ] A reviewer can open the deployed app, run the guest demo, stop and save, and resume.
- [ ] A new developer can clone, install, test and build following only the README.
- [ ] No secrets in git history; `.env.example` lists names only.
- [ ] Deploy the empty starter on day one so deployment is not a last-minute risk.

## 4. Dependencies
FR-08, FR-10, FR-11, FR-13.

## 5. Change log
- 2026-10-30 v2: removed "no backend, static hosting"; added database, OpenAPI, diagrams and contribution log required by P2.
