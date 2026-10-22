# xini.dev v5 — report

Branch `v5`, built on the tag `v4`, one commit per change (`v5 #N: …`; #5 and #14 each have a follow-up). Every check
is a script in `tools/v5/` (or `tools/audio/`) and can be re-run against the dev server (`npm run dev`, or set
`XINI_URL`). Check captures are written under `.shots/v5-checks/` (git-ignored, on this machine); the final captures
are committed in `reference/captures-v5/`. `npm run check`, `npm test` and `npm run build` pass.

## 1. Changes

| # | Change | Status | How it was checked | Notes |
|---|---|---|---|---|
| 1 | Sound button clickable | done | `check-01`: a real click at 1440×900 and 390×844 sets `aria-pressed="true"`, the AudioContext runs, the canvas gets no click | The fix itself shipped in v4 (`c86fa44`); v5 adds the check |
| 2 | Remove the ambient bed | done | `check-02`: no hum or fan-bed code; sound on and idle reads −inf dBFS for 5 s (v4: −22.4 dBFS) | Fan-click whoosh kept |
| 3 | Master chain and buses | done | `check-03`: one connection to `ctx.destination` in code and at runtime; a cue is silent with the effects bus muted and with `master.input` muted; toggle works; `audio:measure` passes | `Sfx.attach(ctx)` builds the graph on any context (the level tool uses it) |
| 4 | Integrate the music | done | `audio:test` 10/10; `check-04`: a visit through all six stops and the finale with sound on, no console errors, the music's stop follows within 0.3–2.6 s of departure (rule ≤ 2.7); Enclave `main` 0.12–0.57 s after the solve (≤ 0.67); rAF p95 at the core 16.7 ms with sound vs 16.7–16.8 without | `activity` on project steps and any pointerdown |
| 5 | The sound-on sting | done | `check-05`: relays at 0.050–0.330 s after the click, whine from 0.380 s, slam at +2.200 s = `music.start` `when` (impact); a second switch-on schedules no boot cues and passes `fadeIn: 0.8`; switched off mid-sting nothing of it plays later; switched on during the boot, the slam and first chord land on the impact frame (−4…−12 ms on the context clock, 3 of 3 runs) | See 4. The boot no longer calls the relay/whine/slam cues itself: sound is off on every load, so they only played when switched on mid-boot, which the sting now owns. Follow-up commit: the first sting is timed from the click, not from after the engine is built (it was 32 ms late) |
| 6 | Effects level pass | done | `tools/audio/sfx-levels.mjs`: every use, rendered alone through the master chain, inside its tier (table in 2) | Cues are now played by use (`LEVELS` in `sfx.js`). Two things had to change for levels to hold, both in 5 of "eyes and ears": the effects' noise is seeded and read from one offset, and envelopes start silent (a v4 bug let the unlock's hiss and the seat's second latch through at full scale) |
| 7 | Power on card | done | `check-07`: card text at 01 matches COPY.md at both sizes; on a phone the label wraps only after its dot and stays in the card; retired-string sweep | Title, description and share tags use approved lines; share-image alt shortened; README drops "systems engineer". Sweep leaves 2 items, see 5 |
| 8 | The core card and gantry chips | done | `check-copy` matches COPY.md; the core capture shows UI, 3D, AI, NET, DB, OPS | The reel sticker reads AI · NET to match |
| 9 | Neural core and Enclave cards | done | `check-copy` | |
| 10 | I/O card | done | `check-copy`: text, links and new-tab targets; three 15×15 px icons in one colour, centred; one row on desktop, two on a phone | Saltancy icon redrawn from its favicon (a wireframe crystal around a solid core) as a line icon; GitHub and LinkedIn from Simple Icons (CC0) |
| 11 | Arrival impact frames without stop names | done | `check-11`: frozen and stepped to the impact frame of two arrivals (Neural core, Enclave) and to 40 % of a flight: no stop name | The name swept in from 16 % of each flight for 1.25 s, so it sat on the impact frame |
| 12 | Jumps take the shortest turn | done | `check-12`: all 20 jumps within +30° of the shortest turn (0–2° excess) and ≤ 120°/s (7–60°/s); `flightqa`: clearance ≥ 32 units, angular acceleration 15–100°/s² | Cause: a jump flew every stop and leg between (each with its own look target), and on the six-stop loop a three-stop jump took the forward way, through I/O and the finale's reveal (Memory → The core turned 755° at up to 1305°/s). 5 of the 29 pairs still exceed +30°: see 4 |
| 13 | Layout recomputes on resize and rotation | done | `check-13`: every stop, 1440×900 → 390×844, 390×844 → 1440×900, 390×844 → 844×390, after 500 ms vs a fresh load: cards ≤ 0.1 px, leader ≤ 0.1 px, and the camera itself ≤ 0.05 units (18/18) | Cause: portrait was read once at load and the stop framings, exhibit pose and card anchors were built from it. The camera metric was added because a docked card and hidden leader on phones passed the plan's two metrics with the wrong framing |
| 14 | Scrolling steps through the projects | done | `check-14` at both sizes: wheel, keys and swipes 05 p1 → p2 → p3 → 06 and back to p3; a 30-event trackpad burst over 600 ms moves one project; ticks follow; pager works; each step plays the pager and module cues and calls `activity`; with the index open the wheel scrolls the index; no slide after landing (0.4 units) | Lands on the chosen screen by sliding the exhibit nudge in over the flight's second half, so every flight in and out of Memory turns exactly as in v4 (a first version broke the 120°/s guideline on three flights). Follow-up commit: the card's anchor rides the nudge (opening on project 1 had pushed the card over the screen) |
| 15 | The Enclave plinth reads as a block | done | `check-15`: greyscale top 50, walls 12–15, board 28 (v4: top 31, board 29); vertical corners inked; lip visible at both sizes | Hard-edged boxes; brass moved from the foot to a thin top keyline |
| 16 | Memory screens show the real projects | done | `check-16`: each screen, inner 70 %, against the same part of its source: desktop VOETutor −14 %, Gloam −11 %, Saltancy −3 %; phone −9 %, −3 %, +4 %; side-by-side sheets for colour, legibility and moiré | New captures of saltancy.com and voetutor.com: 1440×808 (the screen's aspect), DPR 2, no cookie banner on either, light scheme. A display id keeps the grade off the screens; the cream cap still applies (VOETutor's white reads cream). Took two fix attempts, see 4 |
| 17 | Board text audit | done | `audit-17-text.mjs` measures every printed string at every stop (on screen, not behind a part or under the card, glyphs ≥ 7 px); core capture shows 組裝 ASSEMBLY as in v4; no CJK at the Enclave or Memory | Table in 3 |
| 18 | Flight occlusion (check only) | done | `check-18`: 25/50/75 % captures at both sizes, hero points counted as seen / behind a part / out of frame | Verdict: no fix — Memory's hero (the arriving module) is fully hidden in at most 1 of 3 frames, I/O's mark in none |
| 19 | Final capture pass | done | `npm run shots` at 1600×900, 1200×750 and 390×844, every stop, each compared with `reference/captures/` | Only the listed changes differ, plus animation phase. Saved to `reference/captures-v5/` |
| 20 | Record v5 in the docs | done | DIRECTION.md and ARCHITECTURE.md mention the music and sting, no bed, level targets, board-text and CJK rules, the screen treatment, project stepping and the copy | |

## 2. Levels

Effects, each use rendered alone through the master chain, 6 renders each (`node tools/audio/sfx-levels.mjs`):

| Use | Cue | Tier | Range (dBFS) | Gain | Peak |
|---|---|---|---|---|---|
| stingSlam | slam | A | −4 … −2 | 0.57 | −3.0 |
| unlock | unlock | A | −4 … −2 | 0.72 | −3.1 |
| flight | whoosh | B | −10 … −6 | 2.07 | −8.2 |
| arrive | slam | B | −10 … −6 | 0.32 | −8.0 |
| moduleSeat | seat | B | −10 … −6 | 0.71 | −8.0 |
| chipSeat | seat | B | −10 … −6 | 0.71 | −8.0 |
| boardDone | snap | B | −10 … −6 | 1 | −8.0 |
| finale | power | B | −10 … −6 | 0.87 | −8.0 |
| fan | whoosh | B | −10 … −6 | 2.03 | −8.3 |
| lattice | snap | B | −10 … −6 | 1 | −8.0 |
| board | snap | B | −10 … −6 | 1 | −8.0 |
| relay | relay | C | −18 … −12 | 0.43 | −14.8 |
| hover | tick | C | −18 … −12 | 3.13 | −15.0 |
| toggle | snap | C | −18 … −12 | 0.45 | −14.9 |
| pick | tick | C | −18 … −12 | 3.11 | −15.0 |
| dial | dial | C | −18 … −12 | 0.6 | −13.9 |
| dialIdle | dial | C | −18 … −12 | 0.44 | −16.5 |
| pager | whoosh | C | −18 … −12 | 0.91 | −15.1 |
| index | whoosh | C | −18 … −12 | 0.92 | −15.0 |

The sting's whine rises from −24.9 dBFS (its first 0.2 s) to −8.0 dBFS by the slam (tier B).

`npm run audio:measure`:

```
stop                  LUFS   short-term max   peak dBFS   result
Power on              -20.8      -20            -6.8      PASS
The core                -20    -19.1            -4.6      PASS
Neural core           -19.4    -18.8            -4.5      PASS
Enclave (locked)      -21.4    -19.6            -5.2      PASS
Enclave (resolved)    -19.8    -18.9            -4.4      PASS
Memory                -19.8    -19.2            -5.6      PASS
I/O                     -21    -20.4            -5.9      PASS

spread between stops: 2.0 LU (keep ≤ 3)
```

## 3. Board text

A legend (a word naming a district) stays only if it can be read at its own stop at 1600×900 or 390×844: on screen,
not behind a part or under the card, glyphs at least 7 px. Explanatory sub-lines became markings. Part markings are
board texture and are unchanged.

| Where | Before | After |
|---|---|---|
| VRM / power area | 電源 · POWER | removed (not readable at Power on) |
| VRM | VRM · 22 PHASE, EPS_12V | unchanged |
| CPU socket | CPU1 | unchanged |
| CPU socket | SOCKET XN-01 · 4 HEAT PIPES | SOCKET XN-01 |
| CPU socket | 注意 高溫 CAUTION HOT SURFACE | removed (never readable; the Chinese is a translation) |
| The core | 組裝 ASSEMBLY | unchanged |
| The core | PICK + PLACE · 6 PARTS · ONE OPERATOR | ASSY-01 · REV 5 · XINI 2026 |
| Gantry deck | XN-SYS-01 / ONE BOARD · SIX PARTS · REV A | XN-SYS-01 / REV 5 · XINI 2026 |
| Gantry chips | UI 3D API NET DB OPS | UI 3D AI NET DB OPS (#8) |
| Gantry reels | UI · 3D, API · NET, DB · OPS; XN · REEL | AI · NET (#8); the rest unchanged |
| Neural core | 神經 · NEURAL CORE | removed (not readable at Neural core) |
| Neural core | NPU-01 · LOCAL INFERENCE | NPU-01 · REV 5 |
| Enclave | 加密 | removed (CJK, #17) |
| Enclave | SECURE ENCLAVE | removed (under the card on a phone, out of frame on desktop) |
| Enclave | NO UNSIGNED CODE PAST THIS LINE | SEC-04 · REV 5 |
| Enclave | U9, TPM, the cube's glyphs | unchanged |
| Memory aisle | 記憶體 · MEMORY | removed (CJK; MEMORY not readable at Memory) |
| Memory | DIMM_A1, A2, B1, B2 | unchanged |
| Memory row end | M.2_1 STORAGE | M.2_1 |
| I/O | 接口 | removed (under the card on a phone, out of frame on desktop) |
| I/O | I/O | removed (never visible) |
| I/O | REAR PANEL · OUT TO THE WORLD | IO_06 · REV 5 |
| I/O | USB 10G, LAN 2.5G, HDMI · DP, USB-C 20G, AUDIO; U21 LAN, U24 CODEC, U22 USB | unchanged |
| Board corner | XINI | removed (only ever seen mid-flight) |
| Board corner | MB-01 REV 2.6 · 2026 | unchanged |
| Board corner | DESIGNED AND BUILT BY XINI | XINI 2026 |
| Board | PCIE_1 ×16, PCIE_2 ×4, ATX_24P, BAT1 +, L1–L22, U12–U83, CPU · DRAM · VGA · BOOT | unchanged |
| Skyline signs | 電源 POWER, 冷卻 COOLING, 記憶體 MEMORY, 神經網絡 NEURAL, 接口 I/O, 自研 BUILT SOLO | unchanged (signs, not board legends; see 5) |
| `districts.js` `buildEnclave` (unused code, never rendered) | 認證, SECURE ENCLAVE, NO UNSIGNED CODE PAST THIS LINE, SE-0, TPM | unchanged |

## 4. What failed a check, what was tried, what's left

- **#12, five neighbouring flights exceed "shortest turn + 30°"** (plan check over all 29 pairs): The core → Neural
  core +42° (orbit), Neural core ↔ Enclave +98° / +95° (skim), Enclave ↔ Memory +64° / +53° (climb). Their peaks are
  within 120°/s. They are the choreographed hops DIRECTION.md asks for (each flight a different move; the camera
  looks along its path mid-flight and returns to the subject), so passing would change the art direction. Not
  changed — PLAN rule 7: this needs your call. All 20 jumps, which #12 is about, pass.
- **#5, switched on during the boot.** Attempt 1 (output timestamps read straight after `resume()`): −75 ms, the
  timestamps are stale until the device plays. Attempt 2 (wait until the clock and the output run, then map): the
  slam and first chord are scheduled within 4–12 ms of the impact frame on the context clock, which is AUDIO.md's
  criterion. Left: on this machine they are heard 33–60 ms after the frame (the device's output latency, not
  compensated), and why the output-timestamp mapping lands on `currentTime` rather than on the heard time is not
  established. This path only runs from code: the button is hidden while the boot plays, and any key or pointer
  skips the boot first.
- **#16, desktop VOETutor brightness.** First −39 % (the card and leader overlapped the screen in the capture), then
  −36 % (hiding the chrome missed the current card), then −19 %. Attempt 1: the screen on show at full gain and the
  pixel grid eased to 12 % (Gloam −21 % → −12 %). Attempt 2: measure the screen's inner 70 %, because at VOETutor's
  exhibit pose (v4's own) a brass rail in the foreground covers the screen's bottom-left corner: −14 %. Left: the
  cream cap ("nothing whiter than cream") takes about 9 % off a white page.

## 5. What needs Xini's eyes or ears

Ears (http://localhost:5173, the speaker button top right):
- **The music, stop by stop**, and the sting on the first switch-on. Off and on again should fade in without the
  sting.
- **The effects are now identical every time** (seeded noise, one read offset): a flight whoosh, a snap or a module
  clack no longer varies from play to play. That is what lets each sit inside its tier (with random offsets the same
  cue's peak varied 4–6 dB, wider than a tier); if it sounds mechanical, a few fixed variations at matched levels
  would be the next step.
- **The unlock clunk and the module seat** lost a burst of full-scale noise at their start (the v4 envelope bug), so
  they sound cleaner than before.

Eyes:
- **#12, the five neighbouring flights** above: keep their moves, or tighten them to the shortest turn?
- **Memory opens on VOETutor**, and VOETutor's exhibit pose (v4's) has a brass rail across the screen's bottom-left
  corner: `reference/captures-v5/desktop-1600x900/4-memory.webp`.
- **VOETutor in its light scheme.** voetutor.com follows the system theme; the screen uses its default (light), as
  v4's image did, so a near-white page is the brightest thing in the night aisle. A dark-scheme capture is at
  `.shots/v5-checks/16-sources-dark/voetutor.png`.
- **The screens** next to their sources: `.shots/v5-checks/16/*-vs-source.png` (colour, legibility, no moire,
  Gloam bright).
- **The Saltancy icon** (a line icon) beside the filled GitHub and LinkedIn marks reads a touch lighter:
  `.shots/v5-checks/10/1600x900-5.png`, `.shots/v5-checks/10/390x844-5.png`.
- **The plinth**: `.shots/v5-checks/15/1600x900-3.png`, `.shots/v5-checks/15/390x844-3.png` (v4: `15-before/`).
- **The board** with one legend left (組裝 ASSEMBLY) and markings in place of sub-lines: `.shots/v5-checks/17/`.
- **Every stop** at three sizes: `reference/captures-v5/` against `reference/captures/`.

Decisions that are yours:
- **The share image** (`public/og.jpg`) still shows the old headline in its picture; only its alt text changed. It
  waits for the hero changes, then needs a new capture.
- **Saltancy's image alt** now describes the new capture (Xini's call).
- **Retired strings:** "Warwick Game Dev Society" and "MSc dissertation" stay as project text (Xini's call). The
  xini.dev repo's description was changed on GitHub and the snapshot refreshed.
- **The skyline signs** pair Chinese with its English translation, and 自研 BUILT SOLO echoes the retired "built solo".
  Left for now (Xini's call).
- **Unused code:** `buildEnclave` in `districts.js` (an older enclave, never built) still holds 認證 and the old lines.
