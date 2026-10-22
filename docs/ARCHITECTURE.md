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
| `src/cards.js` | The PCB card's silkscreen and the leader trace (stops 02–06) |
| `src/hero.js`, `src/hero.css` | The Power on panel (design 6a) and its hologram entrance, ported from `reference/hero-6a/` |
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

## The Power on panel (v5.1)

- Power on has no card box: the panel is the name as the picture with the card's details as trim round it, the one
  stop that looks different (DIRECTION.md says why; don't put the box back). It enters as a hologram from the crown;
  the entrance's sea-green (the projection light) and vermilion (a fringe on the name) exist only while it runs, and
  the settled panel is the static design. Its trace replaces the card leader at Power on (one ring, at the crown): on
  a wide screen from the PWR pad straight right, then 45° into the ring; on phones out of the pad, up a column just
  right of the frame, then 45° into the ring.
- The source of truth is `reference/hero-6a/` (`hero6a.js`, `hero6a.css`; serve the folder and open `index.html`,
  R replays the entrance, `?t=610` freezes it, `?static=1`, `?compact=1`, `?reduced=1`). `src/hero.js` and
  `src/hero.css` keep its geometry table `G`, the px floors in `metrics()`, `LOCKUP`, `TIMELINE`, the trace router,
  the halftone generator and its CSS values as they are; only how the panel is created, mounted and wired is the
  site's. Change the reference first, then port.
- Created: `heroMarkup()` renders the panel with the page, in the Power on stop's section in place of a card
  (`renderWorld`'s `hero`), with the copy from `content.js`; the name is the page's only `h1` (`#h-top`), the
  lockup is decorative and the sentence is there for screen readers; the panel takes no pointer events.
  `createHero()` adopts it in the director's `ready()` and puts the leader (trace and ring) in the same layer.
- Laid out (`placeHero()`): at start, when the fonts are in, on every world resize (which covers rotation and the
  visual viewport), on a device-pixel-ratio change (the name's halftone is drawn at k × devicePixelRatio), and right
  before every entrance. Its inputs: the viewport (`innerWidth` / `innerHeight`); the crown point (`crownPt()`, where
  the old leader's via sat, just inside the crown plate's left edge) projected with the Power on rest camera
  (`restCrown()`: the stop's pose with the world's portrait step-back and lift, no sway or shake, whichever stop is
  showing, so the panel's size holds); the gutter (the logo's left); the band from the bar's bottom to the top of
  the route strip and its label tab. On phones, where the strip is hidden, the band ends 12 px over the scroll cue,
  which the old card carried and which now shows under the panel. `compact` is left to the module (portrait-ish,
  or narrower than 600 px).
- Every frame while the panel is up, `preRender` hands the live crown to `setCrown()` (the pointer's sway, an
  impact's shake): only the trace and ring follow; the panel stays put.
- `enter({ reduced })` runs where the old card printed in (after the boot's impact frame, after an arrival's),
  `leave({ reduced })` where it hid (any departure from Power on); the site's reduced-motion signal makes both plain
  fades. A new call cancels a running one, and nothing it made is left behind.
- The site's reduced-motion rule gives every element a 0.01 ms transition; `hero.css` takes the panel out of it, so
  a layout never starts transitions inside it.

## URL options

`?boot` (play the boot again: it plays once per visit), `?skipintro`, `?nolut`, `?norefl`, `?nobatch`,
`?nofocus` (no printed depth), `?debug` (build timings in the console), `?dpr=1`. The page exposes `post`,
`boardU`, `skyU`, `shared`, `goto`, `advance`, `stats`, `sfx` (with the music engine on `sfx.music`), `THREE`,
`hero` (the Power on panel: `layout`, `enter`, `leave`, `show`, `seek(ms)` to freeze an entrance for captures),
`heroIn()` (the panel's last layout inputs) and `sway(on)` (the pointer's sway, off for captures) on
`window.__xini` for the capture and QA tools (in production builds too: `npm run shots` captures one).

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
  (`check-07-power-on.mjs` checked the old Power on card and no longer applies.)
- `tools/v5.1/`: the checks for the Power on panel (`check-01-panel.mjs`: against the playground and the approved
  captures, sizes, phones, resizes) and its entrance (`check-02-entrance.mjs`: frames, arrivals, interruptions,
  reduced motion, the boot, frame pacing); they serve the playground from the dev server.

Reference captures of the approved v4 design are in `reference/captures/`; v5's are in `reference/captures-v5/`;
v5.1's in `reference/captures-v5.1/`.
