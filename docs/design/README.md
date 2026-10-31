# RunX design files

`DESIGN.md` (repo root) is the source of truth for the visual system. Files in this folder support it.

| Path | What it is |
|---|---|
| `mockup.html` | Interactive prototype. It still shows a second world and a world toggle, which are not in P2: `DESIGN.md` wins wherever they differ. Open it in a browser; self-contained, only a font loads from Google Fonts. |
| `tokens.css` | DESIGN.md tokens as CSS variables. Map these into the Tailwind theme (`@theme`); do not hardcode colors or fonts. |
| `assets/characters/` | Character art named as in DESIGN.md (`{quixote\|sancho}/dream/{expression}.webp`). |
| `assets/icons/` | SF Symbols-style icons (24x24, `currentColor`). |
| `assets/brand/` | Windmill player SVG. Rotate the `#sails` group around (110, 98). |
| `mockup-prompt.md` | The prompt used to generate the mockup, kept for reference. |

## Using the assets in the app
`public/` does not exist until the Next.js scaffold (issue #1) runs. Keep these files here until then. When a screen needs them, copy only what it uses to `public/characters/`, `public/icons/` and `public/brand/` (the paths DESIGN.md expects), and import `tokens.css` from the global stylesheet.

## Known gaps
- Character crops are low resolution (faces 72 px, poses about 120 px, heroes 200-300 px wide). Fine for the prototype at 1x; regenerate at 512 px before shipping.
- The giant in the windmill player is a placeholder drawing.
- Icons are hand-drawn approximations; swap in an open-source set before shipping.
- The original character sheet is not included because it contains reference photos of real people.
