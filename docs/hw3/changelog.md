# AGENTS.md changelog

## v1 to v1.1 (2026-10-30, before the experiment)
Audit against the HW3 rules-file requirements found four gaps. Added: a stack table with the latest stable versions, a testing strategy section (layers, 90% scheduler and 80% `src/lib` coverage goals, patterns), a table of key UI components with expected behavior, and preferred and avoided libraries. Trimmed duplicates; 125 lines.

## v1.1 to v2 (2026-10-31, after the before/after test)
Every change below answers a finding in [comparison.md](comparison.md) section 5. The file is 129 lines (limit 150).

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

Kept on purpose: the 🏃 marker line stays until v2 is re-tested, because the contaminated attempt showed it is the only reliable proof that a tool loaded the file. Delete it after that re-test.

## What did not change, and why
The scope rule that DESIGN.md contains ideas outside the PRD is kept. In the with-rules run the agent had read it and still drew a non-functional world-toggle button, so v2 states it as a behavior rule (no controls that do nothing) instead of adding more words.
