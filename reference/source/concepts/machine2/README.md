# Inside the machine (v4)

The walkable prototype. Direction and the reasoning behind it: `DIRECTION.md`.

## Files

| File | What it holds |
|---|---|
| `main.js` | The director: stops, flights, the boot, the finale, which hero is awake (standby), the focus, sound cues |
| `board.js` | The board surface, silkscreen canvas, traces, the parts scatter (with keep-out zones) |
| `tower.js` | The cooler tower: fins, heat pipes, fan, the crown with the mark |
| `districts.js` | Power stages, the memory row (seatable project modules), the neural core, I/O, the rest of the board |
| `core.js` | The pick-and-place gantry and the system board it builds |
| `enclave.js` | The enclave and its lock, the cipher cube |
| `city.js` | The city beyond the board: towers with dim windows, a few signs; it holds still |
| `plane.js` | The mark-shaped power plane shown by the boot and the finale |
| `cards.js` | The PCB card's silkscreen and the leader trace |
| `grade.js`, `palettes.js`, `colour.js` | The Verdigris grade (3D LUT), the palette (display colours), and the switch that keeps three from converting them |
| `machine.css` | Page, cards, leader, route strip, phone layout |

## URL options

`?boot` (play the boot again: it plays once per visit), `?skipintro`, `?nolut`, `?norefl`, `?nobatch`, `?nofocus` (no printed depth), `?debug`
(build timings in the console), `?dpr=1`. The page exposes `post`, `boardU`, `skyU` and `shared` on
`window.__xini` for the capture and QA tools.

## Tools (from the repo root)

- `tools/snap.sh <name> '<command using $URL>'` builds this world into a frozen folder and serves it,
  so captures never see half-edited files.
- `tools/caps.mjs` stills per stop (with greyscale copies and draw-call stats), `tools/boot.mjs` the boot
  and the finale frame by frame, `tools/legs.mjs` stills inside each flight.
- `tools/flightqa.mjs` flies every leg with the real rig at 60 fps: clearance from part bounds, rotation
  speed and spikes, and a top-down map (`map.png`).
- `tools/enclave.mjs` the enclave's lock, locked and frame by frame through the unlock.
- `tools/frame.py` projects world points through a camera pose, to frame a stop before a capture.
- `tools/pick.mjs` names the object under a pixel at a stop.
