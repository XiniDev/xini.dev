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
| `src/shared/core/` | Navigation (scroll, keys, swipe, snapping), impact frames, sound: `sfx.js` (the AudioContext, the cues and their `LEVELS`, the sting), `music.js` (the music engine), `master.js` (the master chain) |
| `src/shared/data/` | **All copy and project data** (`content.js`), the GitHub snapshot, project images |
| `src/shared/fonts/` | The CJK font subset (regenerate with `npm run jp-subset` after changing CJK text) |
| `src/shared/ui/marks.js` | The mark's artwork |

## Content

- Copy, featured projects (order, count, art) and the curated project summaries: `src/shared/data/content.js`. The
  v5 copy is word for word `docs/v5/COPY.md`; its retired strings must not come back (`tools/v5/retired.mjs` sweeps
  for them outside `docs/` and `reference/`).
- The project list ("All N projects") merges the GitHub snapshot with the curated entries; recent work (pushed in
  the last 24 months) comes first, older and archived work after.
- Featured project screens show the images in `src/shared/data/img/` (saltancy.com and voetutor.com captured with
  `tools/v5/capture-sites.mjs`), cropped per project by `SCREEN_CROP` in `src/districts.js`.

## Sound (v5)

- `sfx.js` owns the AudioContext, created on the first switch-on. Every cue goes to an effects bus and the music to a
  music bus, both into `createMaster()` (a limiter at −3 dB, then a soft clipper with a −1.4 dBFS ceiling), then one
  output gain, the only connection to `ctx.destination` (sound on and off, the hidden-tab fade).
- There is no ambient bed (v5 removed the board hum and the fan noise): with sound on and nothing happening, only the
  music plays.
- Cues are played by use, not by sound: `sfx.play('arrive')`. `LEVELS` in `sfx.js` names every use with its cue, its
  tier and its gain, because the same sound sits in different tiers (the slam is the sting's signature and the
  arrival's movement). Tiers, each use alone through the master: A −4…−2 dBFS, B −10…−6, C −18…−12. The effects'
  noise is seeded and read from one offset, so each cue is the same every time and its level holds.
- The music (`createMusic(ctx, musicBus)`) starts with the toggle (at the current stop, resolved if the cube is), and
  the world drives it: every departure (jumps and the finale too) calls `setStop` and `duck`, arrivals `unduck`, the
  cube's solve `cubeSolved`, project steps and any pointerdown `activity`; a hidden tab fades out and suspends.
- The first switch-on in a page load plays the sting (relays 0.05–0.33 s, the whine from 0.38 s, the slam at 2.2 s,
  timed from the click on the context clock) and starts the music with `impact` on the slam; switched on during the
  boot with its impact frame at least 0.6 s away, the slam lands on that frame instead. The boot itself is silent.
- Do not change the music inside `music.js` without Xini; its tuning lives at the top (`SCORE`, `PROGRESSIONS`,
  `STOPS`, `MIX`). After any change: `npm run audio:measure`, `npm run audio:test`, and a preview to listen to.

## Navigation and the camera (v5)

- A jump between stops that are not neighbours flies straight (the rig's `jump` option: up to cruise height, the
  shortest way round the tower's footprint, down onto the stop) and turns by the shortest rotation, no faster than
  110°/s at its peak; neighbouring hops keep their legs, and I/O → Power on keeps the reveal.
- At Memory, `Nav` asks the section first (`onStep`): a scroll step moves to the next project, from the last one on
  to I/O, from the first back to the Enclave. The gallery opens on its first project coming forward and its last
  coming back; the flight lands on that screen by sliding the exhibit's nudge in over its second half
  (`rig.arriveNudged`), and the card's anchor rides the nudge.
- The framing follows the screen's orientation: each stop keeps both framings and `frame()` applies the current
  one on every resize, orientation change and visual-viewport change (a camera at rest takes it at once).

## Rendering notes (v5)

- Id 240 marks a display (`DISPLAY_ID`): the post pass leaves its colours out of the grade and the LUT. The Memory
  screens are displays, with a pixel grid in the material (`pixelGrid`) that fades out before it could moire.
- Board text: designators, codes and terse markings only; a legend stays only if it can be read at its own stop
  (`tools/v5/audit-17-text.mjs`), and Chinese must work as Chinese on its own. The silkscreen keeps a list of what it
  printed (`silk.texts`) for that audit.

## URL options

`?boot` (play the boot again: it plays once per visit), `?skipintro`, `?nolut`, `?norefl`, `?nobatch`,
`?nofocus` (no printed depth), `?debug` (build timings in the console), `?dpr=1`. The page exposes `post`,
`boardU`, `skyU`, `shared`, `goto`, `advance`, `stats`, `sfx` (with the music engine on `sfx.music`) and `THREE` on
`window.__xini` for the capture and QA tools.

## Tools

Run once: `npx playwright install chromium`.

- `npm run shots -- [parts] [tag]` builds a frozen copy into `.shots/build`, serves it and captures into
  `.shots/<tag>/`. Parts: `desktop` (1600×900), `laptop` (1200×750), `phone` (390×844), `legs` (frames inside every
  flight), `boot` (the boot and the finale, frame by frame), `flightqa` (every flight at 60 fps: clearance from parts,
  rotation speed; guideline ≤ 120°/s, the finale's dive is a known exception at ~220°/s).
- `tools/caps.mjs`, `legs.mjs`, `boot.mjs`, `flightqa.mjs` run against any URL (`node tools/caps.mjs <url> <outDir> ...`).
- `npm run snapshot:github` refreshes the committed GitHub snapshot.
- `npm run jp-subset` regenerates the CJK font subset.
- Audio (Node, with the dev dependency `node-web-audio-api`): `npm run audio:test` (the engine's behaviour),
  `npm run audio:measure` (music levels per stop against the targets), `npm run audio:preview` (renders a scripted
  visit to `reference/audio/music-preview.wav`), `node tools/audio/sfx-levels.mjs` (every cue use against its tier).
- `tools/v5/`: the checks v5 was built against (`node tools/v5/check-NN-*.mjs`, against the dev server or
  `XINI_URL`), the board-text audit, and `capture-sites.mjs`, which re-captures the client sites for the screens.

Reference captures of the approved v4 design are in `reference/captures/`; v5's are in `reference/captures-v5/`.
