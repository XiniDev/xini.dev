# xini.dev v5.1 — report

Branch `v5.1`, built on the tag `v5.0`, one commit per change (`v5.1 #N: …`; #1 has a follow-up). Every check is a
script in `tools/v5.1/` and can be re-run against the dev server (`npm run dev`, or set `XINI_URL`). The checks
serve the reference playground from the same server. Check captures and logs go to `.shots/v5.1-checks/`
(git-ignored, on this machine). The ones to look at are committed in `reference/captures-v5.1/checks/`, and the final
captures in `reference/captures-v5.1/`. `npm run check`, `npm test` and `npm run build` pass, and so do
`tools/v5/check-copy.mjs` and `tools/v5/check-13-resize.mjs` for stops 02–06.

## 1. Changes

| # | Change | Status | How it was checked | Notes |
|---|---|---|---|---|
| 1 | The Power on panel | done | `check-01-panel.mjs`, 22/22. **2551×1265, sway paused:** every part of the panel within 0.0 px of the playground once the frame offset is allowed for; ring and trace end 0.0 px off after the crown offset; the capture aligns with `target-6a.png` at the input offset (panel (0, 4), trace run (0, 4), ring (−6, 3)). **Copy:** text matches v5 COPY.md (POWER ON and PWR from the v5 card); one `h1`, the name; lockup `aria-hidden`; no pointer events; old card and leader gone, one ring. **Desktop sizes** (1440×900, 1920×1080, 1280×720, 1024×768, plus 1000×960 and 820×800): in the band without touching (50–227 px clear), clear of the tower (raycast grid, 0 hits, nearest tower 61–107 px right), trace runs 93–199 px right of the frame before turning, rule ends before PWR where the strip wraps. **390×844 and 844×390:** nothing off screen, smallest text 10 px, trace crosses no text and never passes the ring; at 390×844 every part within 0.0 px of the playground's phone layout, and the capture aligns with `target-6a-390.png`. **Resize** (the v5 #13 cases): panel and trace end 0.0 px from a fresh load | Ported as `src/hero.js` and `src/hero.css`, with `G`, the floors, `LOCKUP`, `TIMELINE`, the router, the halftone and the CSS values unchanged. What the port changed is in 5 (a–d). The follow-up commit ties the phone layout to the portrait framing (5c) |
| 2 | The hologram entrance | done | `check-02-entrance.mjs`, 17/17. **Frames:** at 0, 320, 610, 705 and 1040 ms (`__xini.hero.seek`), each against the playground frozen at the same time: mean luminance difference 4.1–4.6 (the 3D scene behind accounts for it; the settled panel scores 3.2 against the target), aligned at the frame offset. **Arrivals:** from each of the other five stops the entrance plays once; 1.1 s after arrival, 0 animations in the panel or leader and 0 temporary copies; at every other stop the panel and leader are hidden. **Interruption:** leaving 150, 400, 650 and 900 ms into the entrance and coming straight back leaves nothing behind, and the settled panel matches the static one exactly (difference 0.00). **Reduced motion:** opacity only on the panel and leader, 200 ms in, 150 ms out. **Boot:** nothing of the panel or trace in 139 boot frames; the entrance starts 217 ms after the impact frame. **Pacing:** p95 16.8 ms during the entrance vs 16.8 ms settled | The check found a leak: the site's reduced-motion rule (`transition-duration: 0.01ms !important` on everything) turned every layout inside the panel into CSS transitions. `hero.css` now takes the panel out of it (elements, then pseudo-elements on the second attempt) |
| 3 | Record v5.1 in the docs | done | Both docs mention: no card box and why; the hologram entrance, with sea-green and vermilion only during it; the trace routes; `reference/hero-6a/` as the source | DIRECTION.md: a section under UI, the palette rules, boot step 6, a decision. ARCHITECTURE.md: a section on how the panel is created, laid out and wired, the files table, `__xini`, tools |
| 4 | Final capture pass | done | `npm run shots` at 1600×900, 1200×750 and 390×844, every stop, compared with `reference/captures-v5/`. **Power on:** mean difference 12.1–16.5. **Other stops:** 1.8–5.0, all from the scene's own animation (the lattice turning, the gantry head, line boil on twos), not the chrome (heat map: no difference on the cards, bar or route) | Saved to `reference/captures-v5.1/` |

## 2. The values passed to `layout()` at 2551 × 1265

| Input | Site | Playground | Difference |
|---|---|---|---|
| `gutter` | 64 | 64 | 0 |
| `bandTop` | 82 | 72 | **+10** |
| `bandBottom` | 1170 | 1172 | −2 |
| `crown` | (1571.3, 300.0) | (1577.5, 297.5) | **(−6.2, +2.5)** |
| result `frame` | x 62.5, y 209.4, w 1250, h 818, k 1 | x 62.5, y 205.1, w 1250, h 818, k 1 | y +4.3 |

- **`bandTop`** is the bar's own box: 20 px padding, the 42 px sound button, 20 px padding. Your screenshot's bar looks about 5 px tighter than the site renders here: its sound button ends near y 56, not 62.
- **`bandBottom`** is the top of the route strip's label tab.
- **`crown`** is the old leader's end point (just inside the crown plate's left edge), projected with the Power on rest camera, with no sway. The playground's value was measured off a live screenshot, where the pointer's sway moves the camera by up to 5 units.

## 3. Captures

- **Final, every stop:** `reference/captures-v5.1/{desktop-1600x900, laptop-1200x750, phone-390x844}/`
- **To look at:** `reference/captures-v5.1/checks/`
  - `01-target-2551x1265.webp`
  - `01-phone-390x844.webp`
  - `01-phone-844x390.webp`
  - `01-desktop-1280x720.webp`
  - `01-desktop-1000x960.webp`
  - `02-entrance-frames-sheet.webp` (playground over site, at 0, 320, 610, 705 and 1040 ms)
  - `02-entrance-610ms-2551x1265.webp`
- **Every check capture and both logs:** `.shots/v5.1-checks/01/` and `.shots/v5.1-checks/02/`

## 4. Failed twice

Nothing failed twice, and the product needed two fixes in total:

- **Reduced-motion transition leak:** passed on the second attempt (the first covered the elements, the second their pseudo-elements).
- **Phone layout on near-square screens:** found by a size HERO.md doesn't list (5c), fixed in one go.

The other first-run failures were bugs in the check scripts, each fixed once:

- Aligning a straight trace without its pad.
- A ring test that counted the trace's own end touching the ring.
- A pad hidden on phones.
- Reading `.hidden` on an SVG element, which has no such property.
- Aligning the 0 ms frame, which has no panel in it.

## 5. What needs your eyes

a. **844×390 (a phone on its side):** the panel doesn't fit between the bar and the route strip, even at its smallest scale.
   - At k 0.2 the px floors make it 235 px tall in a 213 px band.
   - It overlaps the route strip's label tab ("01/06 POWER ON") by about 11 px, and the bar's empty bottom padding by about 10 px.
   - HERO.md's checks at this size pass: nothing is off screen, no text is under 10 px, and the trace is clean. Its band rule only covers the four desktop sizes, so I left the panel as it is.
   - Options:
     - Accept it.
     - Hide the route strip's label tab at Power on on screens under about 420 px tall.
     - Let k go below the 0.2 floor on short screens; the type stays at 10 px, and the name and lockup shrink.

   Capture: `checks/01-phone-844x390.webp`.

b. **Phones, the scroll cue and the count.** The old Power on card carried both the phone's scroll cue and its "01/06".
   - **The cue:** HERO.md keeps the scroll cue, so on phones the site's own cue (the one desktop has) now shows, centred under the panel.
   - **Where the panel sits:** its band ends 12 px above the cue, which puts the panel's bottom 43 px higher than the card's bottom, HERO.md's `anchorBottom`. That's still lower than `target-6a-390.png`, where the bottom sits 96 px up.
   - **The count:** on phones, Power on no longer shows 01/06. The panel's strip names the stop.

   Capture: `checks/01-phone-390x844.webp`.

c. **Near-square screens.** Left to itself, the module picks its phone layout below 1.1:1. The site, though, frames Power on wide until the screen is portrait (taller than 1.05:1).
   - In between (1000×960, for example), a full-width panel covered the crown and the tower, with the PWR pad under the crown.
   - HERO.md allows passing `compact` when the site's own breakpoint should win. It now follows the portrait framing, since that decides where the crown is.

   Capture after the fix: `checks/01-desktop-1000x960.webp`.

d. **The 2551×1265 inputs** differ from the playground's (table in 2): the panel is 4.3 px lower and the ring 6 px left. Compare `checks/01-target-2551x1265.webp` with `reference/hero-6a/target-6a.png`.

e. **The entrance on the live scene:** `checks/02-entrance-frames-sheet.webp` against `reference/hero-6a/entrance-frames.jpg`. Watch it at http://localhost:5173 by moving away and back to 01, or reload with `?boot` for the first-load version.

f. **Smaller things the port decided:**
   - **The panel's root:** it's a `div` inside the Power on `section`, not a nested `section`. That avoids two landmarks with the same name.
   - **The name:** the text is "Xini" from `content.js`, set in capitals by CSS (`text-transform`, the one CSS property added). A screen reader reads it as a name rather than spelling it out, and the look is identical.
   - **Fonts:** JetBrains Mono and Chakra Petch come from the site's own `--f-mono` / `--f-display`. The site loads the variable JetBrains Mono, whose family name differs.
   - **The heading text:** the `h1`'s text content holds the name twice, because the brass plate copy is `aria-hidden` but still in the DOM. Screen readers get "Xini"; a crawler reading raw text may see "Xini Xini". This comes from the reference's design.
   - **`window.__xini` is in production builds too:** `npm run shots` needs it, though HERO.md assumed it was dev-only. So `hero.seek` and `sway()` are reachable from the console on the live site. They're harmless; they could move behind `?capture` if you prefer.
   - **Obsolete v5 checks:**
     - `tools/v5/check-07-power-on.mjs` checked the old card and no longer applies.
     - `check-11-impact.mjs` would now count the panel's name as large text outside the cards at Power on.
