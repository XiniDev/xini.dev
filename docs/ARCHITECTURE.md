# Architecture

One page, one real-time 3D scene (three.js), comic-ink rendering. The art direction and the reasoning behind it
are in `DIRECTION.md`.

## Files

| File | What it holds |
|---|---|
| `index.html` | The page shell: head tags, the loading cover, the canvas |
| `src/main.js` | The director: stops, flights, the boot, the finale, which hero is awake (standby), the focus, sound cues |
| `src/board.js` | The board surface, silkscreen canvas, traces, the parts scatter (with keep-out zones) |
| `src/tower.js` | The cooler tower: fins, heat pipes, fan, the crown with the mark |
| `src/districts.js` | Power stages, the memory row (project modules and their screens), the neural core, I/O, the rest of the board |
| `src/core.js` | The pick-and-place gantry and the system board it builds |
| `src/enclave.js` | The enclave and its lock, the cipher cube |
| `src/city.js` | The city beyond the board: towers with dim windows, a few signs; it holds still |
| `src/plane.js` | The mark-shaped power plane shown by the boot and the finale |
| `src/cards.js` | The PCB card's silkscreen and the leader trace |
| `src/grade.js`, `src/palettes.js`, `src/colour.js` | The grade (3D LUT), the palette (display colours), and the switch that keeps three from converting them |
| `src/machine.css` | Page, cards, leader, route strip, phone layout |
| `src/shared/world/` | The engine: world and render loop, camera rig and flights, page UI (bar, route, cards), reflections |
| `src/shared/gfx/` | The ink post pass (lines, halftone, grade, bloom, impact frame), ink materials, sky, facades, batching, LUT |
| `src/shared/core/` | Navigation (scroll, keys, swipe, snapping), impact frames, sound |
| `src/shared/data/` | **All copy and project data** (`content.js`), the GitHub snapshot, project images |
| `src/shared/fonts/` | The CJK font subset (regenerate with `npm run jp-subset` after changing CJK text) |
| `src/shared/ui/marks.js` | The mark's artwork |

## Content

- Copy, featured projects (order, count, art) and the curated project summaries: `src/shared/data/content.js`.
- The project list ("All N projects") merges the GitHub snapshot with the curated entries; recent work (pushed in
  the last 24 months) comes first, older and archived work after.
- Featured project screens are printed from the images in `src/shared/data/img/`, cropped per project by
  `SCREEN_CROP` / `SCREEN_KEEP` in `src/districts.js`.

## URL options

`?boot` (play the boot again: it plays once per visit), `?skipintro`, `?nolut`, `?norefl`, `?nobatch`,
`?nofocus` (no printed depth), `?debug` (build timings in the console), `?dpr=1`. The page exposes `post`,
`boardU`, `skyU`, `shared`, `goto`, `advance` and `stats` on `window.__xini` for the capture and QA tools.

## Tools

Run once: `npx playwright install chromium`.

- `npm run shots -- [parts] [tag]` builds a frozen copy into `.shots/build`, serves it and captures into
  `.shots/<tag>/`. Parts: `desktop` (1600×900), `laptop` (1200×750), `phone` (390×844), `legs` (frames inside every
  flight), `boot` (the boot and the finale, frame by frame), `flightqa` (every flight at 60 fps: clearance from parts,
  rotation speed; guideline ≤ 120°/s, the finale's dive is a known exception at ~220°/s).
- `tools/caps.mjs`, `legs.mjs`, `boot.mjs`, `flightqa.mjs` run against any URL (`node tools/caps.mjs <url> <outDir> ...`).
- `npm run snapshot:github` refreshes the committed GitHub snapshot.
- `npm run jp-subset` regenerates the CJK font subset.

Reference captures of the approved design are in `reference/captures/`.
