# xini.dev v5.1 — the Power on panel and its hologram entrance

v5 is the starting point. v5.1 replaces the Power on card with the panel Xini picked on the
design canvas (design 6a, "3b + card trim") and gives it a hologram entrance. Nothing else changes.

Read with:
- `reference/hero-6a/`: the working reference. Serve the folder (any static server, for example
  `npx serve reference/hero-6a`) and open `index.html`; ES modules don't load from `file://`.
- `docs/DIRECTION.md` and `docs/ARCHITECTURE.md`, still in force apart from what #3 records.

## How to run this

1. Tag the current state `v5.0` (a branch called `v5` already exists) and work on a branch `v5.1`.
2. Work in the order below, one commit per change: `v5.1 #N: <title>`.
3. After each change, run its **Check**. If it fails, fix and re-check, at most twice. If it still
   fails, write down what you tried in the report and move on. Don't loop.
4. Change only what's listed. The 3D scene, top bar, route strip, scroll cue, the other stops'
   cards, audio and copy stay as they are.
5. Save captures to `reference/captures-v5.1/`. Never overwrite `reference/captures/` or
   `reference/captures-v5/`.
6. Stop and ask only if a check can't pass without changing the design.
7. Finish with `docs/v5.1/REPORT.md` (format at the end).

Use the dev hook from v5 (`window.__xini`, dev builds only) to drive the scene. Add the panel to it
as `__xini.hero`, and a way to pause the camera's idle sway for captures if there isn't one.

## The reference

| File | What it is |
|---|---|
| `hero6a.js`, `hero6a.css` | The panel and its entrance, vanilla, no dependencies. The source of truth. |
| `index.html` | Playground: the panel over Xini's screenshot. R replays the entrance, L leaves, plus a reduced-motion toggle. URL options: `?static=1` (final state), `?t=610` (freeze the entrance at 610 ms), `?reduced=1`, `?compact=1` (phone layout), `?fit=cover` (other screen sizes), `?gutter=81.5` (override the gutter, in screenshot px), `?shot=1` (hide the buttons). |
| `target-6a.png` | The approved look on Xini's screen: 2551 × 1265 CSS px, device pixel ratio 1. |
| `target-6a-1440.png` | 1440 × 900 with `?fit=cover`. The scene is the screenshot cropped, so only the panel and the trace are meaningful. |
| `target-6a-390.png` | The phone layout at 390 × 844, captured at 2×. The crown is a stand-in, so judge the panel and the shape of the trace's route, not where the crown is. |
| `entrance.mp4` | The entrance at real speed, then at half speed. |
| `entrance-frames.jpg` | Timed frames of the entrance. |
| `bg.jpg` | Xini's screenshot with the old card removed. Playground only; don't ship it. |

Port the reference into the site's card code. Don't redesign it: keep the geometry table `G`, the
px floors in `metrics()`, `LOCKUP`, `TIMELINE`, the trace router, the halftone generator and the
CSS values as they are, and adapt only how the panel is created, mounted and wired.

---

## 1. The Power on panel

- **What:** replace the Power on card with the panel from `reference/hero-6a/`.
  - **What it shows:**
    - the name XINI in the halftone monument style;
    - the lockup AMBITIOUS | IDEAS / SOFTWARE in the printed style;
    - the strip "● POWER ON ——— SOFTWARE ENGINEER · AI INTEGRATION";
    - the spec line;
    - in place of the card's box, the card's trim: chamfered corner marks, the PWR code and pad,
      a mirrored pad at the bottom left, and gold fingers along the bottom edge with a key notch
      under the lockup's bar.
  - **Mounting:** mount it in the layer where the Power on card mounts now. The panel and its
    leader share that layer's CSS px.
  - **`layout()` inputs:**
    - `vw` / `vh`: the viewport size the layer covers. Use `innerWidth` / `innerHeight` or
      `visualViewport`, not the layer's measured size (the layer can be hidden).
    - `crown`: the crown point (the ring's centre, where the current Power on leader ends),
      projected with the Power on rest camera (its stop pose, no sway or shake), even while
      another stop is showing. This keeps the panel's size stable.
    - `gutter`: the page gutter, the x where the nav logo and the route strip start. The frame's
      outer corner line sits on it.
    - `bandTop` / `bandBottom`: the bottom of the top bar and the top of the route strip.
    - `compact`: leave unset. The module picks the phone layout itself (portrait-ish, or narrower
      than 600 px). Pass `true` or `false` only if the site has its own phone breakpoint that
      should win.
    - `anchorBottom` (phones): where the panel's bottom edge goes; use where the current card's
      bottom sits on phones.
  - **When to call `layout()`:**
    - once at startup, with whatever fonts are loaded;
    - again when `document.fonts.ready` resolves;
    - on resize, rotation, `visualViewport` and device-pixel-ratio changes (the halftone is drawn
      at k × devicePixelRatio);
    - right before every `enter()` and `show()`.

    If the layer is `display: none` when you call it, `layout()` returns `null` and runs again by
    itself on the next `enter()` or `show()`.
  - **Camera movement:** if the crown moves on screen while the panel is up (idle sway, the
    arrival shake), call `setCrown()` with the live projection each frame. It only redraws the
    trace; the panel stays put.
  - **The leader:**
    - The module draws the trace and the ring at the crown. On desktop the trace runs from the PWR
      pad straight right, then 45° into the ring.
    - On phones it runs right out of the pad, up a column just right of the frame, then 45° into
      the ring.
    - Retire the old Power on leader and its start terminal on the card edge. Exactly one ring at
      the crown.
  - **Accessibility:**
    - XINI is the page's only `h1`. If the site already has an `h1`, make XINI the `h1` and change
      the other one to fit.
    - The lockup is decorative (`aria-hidden`); the sentence "Ambitious ideas, ambitious software."
      is there for screen readers.
    - The panel takes no pointer events, so the scene under it stays clickable.
  - **Global styles:** if the site styles `section`, `h1` or `p` globally (margins, padding,
    min-height, line-height, letter-spacing), make sure none of it leaks into `.h6`.
  - **Clean-up:** remove the old Power on card's markup, styles and leader start if nothing else
    uses them.
- **Why:** Xini chose 6a: the name as the picture, one printed finish, and the card's details as
  trim around the block with the box taken away. Lining the frame up with the gutter puts the
  logo, the panel's corner marks and the route strip on one edge.
- **Check:**
  - At 2551 × 1265 (Xini's screen), with the sway paused:
    - The playground feeds `layout()` gutter 64, bandTop 72, bandBottom 1172 and crown
      (1577.5, 297.5), measured from Xini's screenshot. It returns
      `frame: { x: 62.5, y: 205.1, w: 1250, h: 818 }` with k = 1.
    - Log the values the site passes. If they differ from these by more than 1 px, say by how
      much in the report.
    - A capture of Power on matches `target-6a.png` over the panel and the trace: positions within
      2 px, once any input difference is allowed for. The 3D scene behind may differ slightly.
  - The panel's text matches v5 COPY.md once whitespace is normalised (the role line uses
    non-breaking spaces). POWER ON and PWR come from the v5 card.
  - At 1440 × 900, 1920 × 1080, 1280 × 720 and 1024 × 768:
    - The panel sits between the top bar and the route strip without touching either.
    - It stays clear of the tower.
    - The trace runs right of the frame before it turns to the crown.
    - Where the strip wraps onto two lines, the rule ends before PWR.
  - At 390 × 844 and 844 × 390:
    - Nothing overflows the screen and no text is smaller than 10 px.
    - The trace doesn't pass through the panel's text or through the ring.
    - At 390 × 844 the panel's arrangement matches `target-6a-390.png`.
  - The v5 #13 resize checks pass for the panel: panel rectangle and trace end within 4 px of a
    fresh load.

## 2. The hologram entrance

- **What:**
  - **Arrival:** call `enter()` at the moment the old card used to appear: after the boot's impact
    frame on first load, and after the arrival impact frame otherwise.
  - **Departure:** call `leave()` where the old card used to hide.
  - **Reduced motion:** pass the site's existing reduced-motion signal to both,
    `enter({ reduced })` and `leave({ reduced })`. With it on, they're plain fades (200 ms in,
    150 ms out) with no flicker or movement.
  - **Interruptions:** a new `enter()` or `leave()` cancels a running one. Nothing stacks, and
    every temporary copy is removed.
  - **Captures:** `seek(ms)` freezes the running entrance, so call `enter()` and `seek(ms)` in the
    same tick.
  - **Settled state:** the settled panel is exactly the static design. Nothing glitches after the
    entrance.

  | ms | What happens (every time is in `TIMELINE`) |
  |---|---|
  | 0–320 | A ring pings out from the crown; the trace runs from the crown to the PWR pad (0–240) |
  | 200–360 | The PWR pad pops and PWR flickers on; the corner marks flicker on, top right, top left, bottom right, bottom left |
  | 280–680 | A sea-green beam sweeps down the panel; the content appears behind it under scanlines |
  | 280–800 | Sea-green and vermilion fringes sit off XINI as it appears, then close in from 560 |
  | 600–780 | Three bands of XINI slip sideways for a frame or two; the lockup jolts once |
  | 700–840 | The scanlines flicker out |
  | 720–920 | The gold fingers light left to right |
  | 900–1040 | The bottom-left pad pops; the panel is settled |

  - **Leaving:** a 160 ms stepped flicker-out while the trace pulls back into the crown (200 ms).
  - **Style:**
    - Everything is drawn light: hard-edged lines and halftone dots, no blur or glow.
    - Sea-green appears only during the entrance, as the crown sign's projection light.
    - Vermilion appears only as the fringe.
- **Why:** the panel has no box, so it looks different from the other stops' cards. The entrance
  shows it as light projected from the crown that settles into print.
- **Check:**
  - At 2551 × 1265, with the sway paused: frames at 0, 320, 610, 705 and 1040 ms (via
    `__xini.hero.seek`) look like the matching frames in `entrance-frames.jpg`.
  - Scripted, at 1440 × 900: arrive at Power on from each of the other five stops.
    - The entrance plays once per arrival.
    - About 1.1 s after each arrival, no animations target anything inside `hero.root` or
      `hero.leader`. Filter `document.getAnimations()` by `effect.target`; the rest of the page
      doesn't count.
    - No temporary copies remain in the panel.
  - Leave in the middle of the entrance, then come straight back: no leftovers, and the final
    state matches the static panel.
  - After leaving Power on, neither the panel nor the trace or ring is visible at any other stop.
  - With reduced motion: only the fades.
  - First load: the entrance plays after the boot, not under it, and nothing of the panel or the
    trace shows during the boot.
  - Frame pacing at 1440 × 900: the p95 interval between requestAnimationFrame calls during the
    entrance is within 10% of the same measurement at Power on with the panel settled.

## 3. Record v5.1 in the docs

- **What:** update `docs/DIRECTION.md` and `docs/ARCHITECTURE.md`:
  - Power on has no card box: the panel and its trim, and why;
  - the hologram entrance, with sea-green and vermilion only during it;
  - the trace routes;
  - `reference/hero-6a/` as the source for the panel.
- **Why:** so later sessions don't put the box back or undo the entrance.
- **Check:** both docs mention each of those points.

## 4. Final capture pass

- **What:** `npm run shots`, desktop and phone, all stops, into `reference/captures-v5.1/`.
- **Check:** against `reference/captures-v5/`, the only differences are at Power on.

---

## Not doing (and why)

- **A sound for the entrance:** the arrival slam already marks the moment.
- **Changes to the other stops' cards:** they stay boxed; Power on is the one that's different.
- **Idle glitching after the entrance:** the panel stays still once it has settled.

---

## The report (`docs/v5.1/REPORT.md`)

1. A table: # · change · done / partial / skipped · how it was checked · notes.
2. The values the site passes to `layout()` at 2551 × 1265, next to the playground's.
3. The capture paths.
4. Anything that failed its check twice: what was tried, and what's left.
5. What needs Xini's eyes, with capture paths.
