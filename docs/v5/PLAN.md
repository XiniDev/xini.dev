# xini.dev v5 — change list

v4 is the starting point. v5 adds music, fixes sound, reworks copy and makes a set of behaviour and
visual fixes. Everything decided is here; nothing else changes.

Read with:
- `docs/v5/COPY.md` — every string that changes, word for word.
- `docs/v5/AUDIO.md` — the music engine, the sound-on sting, levels and how to wire them.
- `docs/DIRECTION.md` — the art direction. Still in force unless a change below says otherwise.

Provided and already working: `src/shared/core/music.js` (the music engine),
`src/shared/core/master.js` (the master chain) and `tools/audio/` (behaviour test, level check,
preview renderer, loudness meter).

## How to run this

1. Before touching code: `git tag v4` on the current state and work on a branch `v5`.
2. Work in the order below, audio first. One commit per change: `v5 #N: <title>`.
3. After each change, run its **Check**. If it fails, fix and re-check, at most twice. If it still
   fails, write down what you tried in the report and move on. Don't loop.
4. Change only what's listed. No refactors, no restyling, no copy beyond COPY.md.
5. Don't change the music itself (notes, sounds, mix inside music.js). Integrate it, wire the
   events and set levels. Music changes come from Xini after he listens.
6. Save v5 captures to `reference/captures-v5/`. Never overwrite `reference/captures/` (the
   approved v4 look); if `npm run shots` writes there, give it an output option first.
7. Stop and ask only if a check can't pass without changing the art direction.
8. Finish with `docs/v5/REPORT.md` (format at the end).

Behaviour checks need a way to drive the scene. If there isn't one, add a dev-only hook (for
example `window.__xini` with the camera, the current stop, `goTo(i)` and the music engine), kept
out of production builds.

---

## A · Audio

### 1. Make the sound button clickable
- **What:** add `pointer-events: auto` to `.bar__sound`.
- **Why:** its `all: unset` reset also resets `pointer-events`, so it inherits `none` from the top
  bar and clicks fall through to the 3D canvas.
- **Check:** in a browser at 1440×900 and 390×844, clicking the button toggles its on state and
  the AudioContext reports `running`; the canvas receives no click.

### 2. Remove the ambient bed
- **What:** delete the board hum (two detuned 55 Hz tones) and the continuous fan noise, including
  its rise with flights and with the fan's spin. Keep every other cue, including the whoosh when
  the fan is clicked.
- **Why:** Xini finds a constant hum and wind annoying. Music replaces the bed.
- **Check:** no hum or fan-bed code remains. With sound on and no interaction, an AnalyserNode on
  the output reads below −70 dBFS for 5 s. (Once the music is in, run this with the music bus
  muted.)

### 3. Master chain and buses
- **What:** in `sfx.js`, route everything through `createMaster()` from
  `src/shared/core/master.js` (limiter, then soft clipper). Give effects and music their own buses
  into it (`sfxBus`, `musicBus`, both at unity).
- **Why:** levels are far too quiet (peaks around −26 dBFS) and nothing protects the ceiling.
- **Check:** a code search finds a single connection to `ctx.destination` (the final output gain
  after the master chain), and every cue and the music reach it through `master.input`; the toggle
  still works; `npm run audio:measure` passes (scripts in AUDIO.md → Tools).

### 4. Integrate the music
- **What:** create the engine on `musicBus` and wire every event in AUDIO.md → *Wiring*: start and
  stop with the toggle, `setStop` on flight departure (jumps included), `duck`/`unduck` around
  flights, `cubeSolved`, `activity`, tab visibility.
- **Why:** sound needs something worth switching on; the music changes with each stop.
- **Check:**
  - `npm run audio:test` passes.
  - A scripted visit through all six stops with sound on: no console errors, and after each
    arrival `music.getState().stop` equals the current stop. At the Enclave, `section` reads
    `main` no later than one beat (0.67 s) after the cube solves.
  - Frame pacing with sound on matches sound off: requestAnimationFrame intervals over 10 s at
    the core, p95 within 10%.

### 5. The sound-on sting (the boot sound)
- **What:** the first time sound is switched on in a page load, play the boot cues (relays, whine,
  slam) and start the music so its first chord lands on the slam. Later re-enables fade the music
  in without the sting. Details and the edge case for switching on during the visual boot are in
  AUDIO.md → *The sting*.
- **Why:** the visual boot always plays muted (browsers block audio until a click), so the sonic
  logo belongs to the moment someone switches sound on. That's also when they expect something.
- **Check:** on the first enable, read the scheduled times: relay clicks between 0.05 and 0.33 s
  after the click, and the slam's start time within 15 ms of the `when` passed to `music.start`
  (2.2 s after the click). A second enable schedules no boot cues and passes `fadeIn`.

### 6. Effects level pass
- **What:** set each existing cue to its tier in AUDIO.md → *Levels*.
- **Why:** cues currently peak around −26 dBFS and need to sit with the music.
- **Check:** each cue, rendered alone through the master chain, peaks inside its tier's range.
  Record the table in the report.

---

## B · Copy

All strings are in COPY.md. Match its wording exactly.

### 7. Power on card
- **What:** new label, new headline, the spec line "Developer · Designer · Creator" in place of the
  two degree lines.
- **Why:** "Systems engineer" didn't describe Xini; the degrees read as dated; the old headline
  was long in caps.
- **Check:** the card's text at stop 01 matches COPY.md. No retired string (COPY.md list) appears
  anywhere outside `docs/` and `reference/`.

### 8. The core card and the gantry chips
- **What:** new headline, body and tags; the gantry's API chip becomes AI (same slot).
- **Why:** this card now carries "what I build", including AI; the chips match the body.
- **Check:** text matches COPY.md; the core capture shows chips UI, 3D, AI, NET, DB, OPS.

### 9. Neural core and Enclave cards
- **What:** new headlines; the neural core body is shortened. Tags unchanged.
- **Check:** text matches COPY.md.

### 10. I/O card
- **What:** remove the Saltancy sentence. Buttons become Saltancy · GitHub · LinkedIn, each with
  an icon. The Saltancy icon is taken from saltancy.com and redrawn as a single-colour ink line
  icon in the site's style (no Saltancy orange). GitHub and LinkedIn use their standard
  single-colour marks. All three icons share one size and colour. Saltancy links to
  https://saltancy.com and opens like the other external links.
- **Why:** the sentence explained what the email address and a button already say.
- **Check:** text and links match COPY.md; desktop and phone captures show three aligned icon
  buttons inside the card (wrapping to two rows on phones is fine).

---

## C · Behaviour

### 11. Arrival impact frames without stop names
- **What:** remove the large stop-name text that flashes on arrival. Keep the impact frame, the
  camera shake and the route strip.
- **Why:** announcing each section reads like an AI narrating; the route strip already says where
  you are.
- **Check:** a capture taken on the impact frame of two different arrivals shows no stop-name text.

### 12. Jumps take the shortest turn
- **What:** jumping between non-adjacent stops (route strip, nav links, keys) can spin the camera
  most of the way round (e.g. Memory → The core, Neural core → I/O). Find the cause first (an
  unwrapped angle, or a path that runs through the intermediate stops), then fix it so every jump
  flies a direct path with the shortest rotation and stays clear of the tower and memory row.
  The finale (I/O → Power on via Back to start) stays as it is.
- **Why:** the long way round reads as a glitch.
- **Check:** a script runs all 29 ordered pairs of stops (30 minus the finale) and logs the
  camera's orientation every frame. For each flight: total rotation ≤ the shortest rotation
  between start and end orientation + 30°, and peak angular speed within the existing 120°/s
  guideline (a jump with a large turn may take a little longer to stay inside it).

### 13. Layout recomputes on resize and rotation
- **What:** switching to a phone size in devtools shifts the scene left until a refresh. Recompute
  renderer size, camera aspect and framing, card layout and the leader trace on resize and on
  orientation change (ResizeObserver plus `visualViewport`).
- **Why:** real phones rotate; the layout must hold without a reload.
- **Check:** at each stop, load at 1440×900, resize to 390×844, wait 500 ms, and compare with a
  fresh load at 390×844: card rectangle and leader-trace end point within 4 px. Repeat for
  390×844 → 1440×900 and 390×844 → 844×390.

### 14. Scrolling steps through the featured projects
- **What:** at Memory, each scroll step, arrow key or swipe moves to the next of the three featured
  projects. After the third, the next step flies to I/O. Stepping back from I/O lands on the
  third project; stepping back from the first goes to the Enclave. Use the same gesture handling
  as stop-to-stop scrolling, so one gesture is one step. The pager arrows keep working. The route
  strip shows three small ticks under 05, the current one filled. While the "All 20 projects"
  index is open, scrolling scrolls the index. Each step plays the existing pager and module cues,
  and calls `music.activity()`.
- **Why:** visitors arrive by scrolling and shouldn't have to switch to clicking.
- **Check:** scripted, at 1440×900 and 390×844:
  - Wheel: 05 project 1 → 2 → 3 → 06, and back 06 → project 3.
  - Arrow keys and touch swipes do the same.
  - A trackpad-style burst (30 wheel events over 600 ms) advances exactly one project.
  - Ticks match the current project; pager arrows still work.

---

## D · Visuals

### 15. The Enclave plinth reads as a block
- **What:** the plinth under the cipher cube reads flat. Ink every edge, including the vertical
  corners; make the side faces clearly darker than the top; add a stepped lip so it reads as a
  pedestal. Brass stays a thin top keyline.
- **Why:** with no edge lines and sides matching the ground, it looks 2D.
- **Check:** in desktop and phone Enclave captures, vertical edges are inked, top, sides and board
  are three distinct values, and the lip is visible.

### 16. Memory screens show the real projects
- **What:**
  - Replace the heavy screen filter with a light lit-monitor treatment: real colours; a fine,
    anti-aliased pixel grid that fades out before it could moiré; a glass sheen drawn as a
    hard-edged or halftone band (light is drawn, never airbrushed); darkest values lifted
    slightly toward petrol (10% at most). The comic treatment stays on the frame.
  - Capture new screenshots of saltancy.com and voetutor.com with a browser: the screen's aspect
    ratio, device pixel ratio 2, cookie banners declined, fonts and animations settled. Keep the
    current Gloam image.
- **Why:** the filter made screenshots read oddly; Gloam looked like a horror game.
- **Check:** Memory captures for all three projects, desktop and phone, next to their source
  screenshots: the same colours, text legible at desktop size, no moiré, Gloam reads bright. As a
  rough guide, the screen's average brightness is within about 15% of the source's.

### 17. Board text audit
- **What:** list every piece of text on the board and in the scene. Keep "組裝 ASSEMBLY" exactly
  as it is. Replace explanatory sub-lines with part-code markings (COPY.md). Remove the Enclave
  and Memory CJK legends. Any legend that stays must be readable at its own stop; if it's only
  visible mid-flight, remove it.
- **Why:** markings that explain themselves read as AI-written, and those two Chinese legends only
  work as translations of an English metaphor.
- **Check:** a table in the report (where, before, after). The core capture still shows 組裝
  ASSEMBLY as in v4; no CJK remains at the Enclave or Memory.

### 18. Flight occlusion (check only)
- **What:** capture the Enclave → Memory and Memory → I/O flights at 25%, 50% and 75%. Fix only
  if the destination hero is fully hidden in two or more of those frames.
- **Why:** it was flagged in review, but Xini can't see it live.
- **Check:** the captures, and a one-line verdict in the report.

### 19. Final capture pass
- **What:** `npm run shots`, desktop and phone, all stops.
- **Check:** against `reference/captures/`, the only differences are the ones this list makes.

---

## E · Wrap-up

### 20. Record v5 in the docs
- **What:** update `docs/DIRECTION.md` and `docs/ARCHITECTURE.md`: music and the sting, no
  ambient bed, the level targets, the board-text and CJK rule, the Memory screen treatment,
  project stepping, and the new copy.
- **Why:** so later sessions don't undo v5.
- **Check:** both docs mention each of those points.

---

## Not doing (and why)

- **Finale dive speed** (about 220°/s): Xini finds it fine.
- **組裝 ASSEMBLY strength:** Xini likes it faint; it stays.
- **Gantry sliver at the phone's right edge at The core:** Xini can't see it.
- **Phone details** (Memory screen close to the card's top; brass fill on the I/O mark's sides):
  fine for now. The 加密 overlap goes away with #17.
- **Sound toggle redesign** (level meter, label): not discussed; the toggle stays as it is.
- **Spatial audio, and quieter sound under `prefers-reduced-motion`:** not needed; sound is opt-in
  and music-led.
- **Composed or sampled tracks:** decided after Xini hears the generated draft.
- **CJK replacements:** removed in v5; options for Xini to pick later are in COPY.md. Don't
  implement them.

---

## The report (`docs/v5/REPORT.md`)

1. A table: # · change · done / partial / skipped · how it was checked · notes.
2. The effects level table from #6 and the output of `npm run audio:measure`.
3. The board text table from #17.
4. Anything that failed its check twice: what was tried, and what's left.
5. What needs Xini's eyes or ears, with capture paths.
