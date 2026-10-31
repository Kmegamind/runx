# AGENTS.md changelog

## v1 to v1.1 (2026-10-30, before the experiment)
Audit against the HW3 rules-file requirements found four gaps. Added: a stack table with the latest stable versions, a testing strategy section (layers, 90% scheduler and 80% `src/lib` coverage goals, patterns), a table of key UI components with expected behavior, and preferred and avoided libraries. Trimmed duplicates; 125 lines.

## v1.1 to v2 (2026-10-31, after the before/after test)
Every change below answers a finding in the before/after comparison (section 5 of that document, submitted separately on Canvas). The file is 134 lines (limit 150).

| # | Finding in the with-rules run | Change in AGENTS.md | Where |
|---|---|---|---|
| 1 | World-toggle button built despite the scope note | Rule moved into Don't, stated as a behavior: "Don't add controls that do nothing ... Build only what the issue's acceptance criteria list." | Do and Don't |
| 2 | Custom-duration validation written twice inside the component | New Do: put rules such as the 15-60 minute range in `src/lib/` as pure functions with their own tests | Do and Don't |
| 3 | `home-screen.tsx` instead of `HomeScreen.tsx` | The naming line now states the exception explicitly with an example (`HomeScreen.tsx` exports `HomeScreen`) | Naming and style |
| 4 | Tests appended to `smoke.test.tsx`; Start not clicked; E2E spec stale | New "Test files" rule: one file per module, never extend the smoke test, click every primary action, update the E2E spec with the change; removed the older `.test.ts` wording it replaces | Testing strategy |
| 5 | No TDD order, nothing committed | TDD rule extended: commit each step on the issue branch, never leave finished work uncommitted; AI tools never push to `main` or merge | Scrum and workflow |
| 6 | 4 hex and 5 `rgba()` literals | New Don't: no hex or `rgba()` colors, font names or touch-target sizes in components or CSS; use the tokens | Do and Don't |
| 7 | Radios without arrow-key navigation | Duration selector row now requires arrow-key support (native radio inputs) | Key components |
| 8 | The agent opened the 270 KB prototype as text | "Read before coding" now says to open `mockup.html` in a browser, never read it as text | Project context |
| 9 | Installed stack differed from the table (TypeScript 5, ESLint 9, React 19.3.0) | Table and comment updated to the installed versions; Supabase and Zod stay marked "not installed yet" | Stack |
| 10 | The world-toggle button came from DESIGN.md, which described it as a core component; a prose warning in AGENTS.md did not stop it | Decision by the Product Owner: no world toggle and no second world in P2. Removed from DESIGN.md, `tokens.css` and the design README, and added a "Scope for P2" section to DESIGN.md that lists what is not built (postcard, tab bar, music and stereo audio, cadence display). The scope paragraph in AGENTS.md now just points to it | DESIGN.md, AGENTS.md section 3 |
| 11 | The prototype still showed the toggle while DESIGN.md did not | New precedence rule: if `mockup.html` and `DESIGN.md` differ, DESIGN.md wins | AGENTS.md section 3 |
| 12 | Both runs installed Tailwind but wrote 320 to 340 lines of hand-made CSS | Style with Tailwind utility classes and map tokens in `@theme`; no long component CSS | AGENTS.md section 3 |
| 13 | Both runs lost three or four iterations to the same traps | New "Gotchas" list: no `Date.now()` while rendering (pure `finishTime(now, durationMin)` in `src/lib/`), no synchronous `setState` in `useEffect`, use `next/link`. The missing Testing Library cleanup was fixed in `vitest.setup.ts` instead of in prose | AGENTS.md section 1, `vitest.setup.ts` |
| 14 | The with-rules run never ran the E2E suite, which was stale | New "Done means" rule: run lint, test, build and E2E, report only what was actually run, and list criteria met and not met | AGENTS.md section 4 |

Trimmed: the duplicated "AI tools never merge" sentence and the separate "no business logic in components" bullet were merged into one place each.

Kept on purpose: the 🏃 marker line stays until v2 is re-tested, because the contaminated attempt showed it is the only reliable proof that a tool loaded the file. Delete it after that re-test.

## What did not change, and why
The scope rule that DESIGN.md contains ideas outside the PRD is kept. In the with-rules run the agent had read it and still drew a non-functional world-toggle button, so v2 states it as a behavior rule (no controls that do nothing) instead of adding more words.
