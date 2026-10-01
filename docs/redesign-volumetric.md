# xini.dev — VOLUMETRIC redesign plan

> **Status:** In progress — **Phase 1 (foundation) built & verified.** Proceeding bit‑by‑bit (approve each phase before the next).
> **Deploy:** **Vercel** (deploy‑on‑commit) — NOT GitHub Pages. Next.js runs natively; no static export. Xini does all commits.
> **Direction:** _VOLUMETRIC — The Living Render_ — a real‑time WebGL shader world navigated as **one continuous, iPhone‑product‑page‑style scroll progression** (a camera flight through four pinned "chambers"), ignited by an interactive, cursor‑stirred XINI wordmark.
> **Last updated:** 2026‑06‑13.

The **content never changes** (XINI, the tagline, the bio, the 11 projects, the 4 contacts) — only the visual language, the motion, and the navigation model. This is a ground‑up redo, not a reskin.

> **Palette revised 2026‑06‑13 → "Emerald ↔ Teal Spectral" (green).** The original iconic emerald **`#10b981`** is restored and locked as the hero; the fluid flows emerald → teal `#2dd4bf` → green‑cyan `#22d3ee` over teal‑tinted near‑black `#05100d`. Tokens renamed: `--plasma-cyan` → **`--bio-emerald`** (#10b981), `--magenta-coral` → **`--bio-teal`** (#2dd4bf), plus `--bio-cyangreen` (#22d3ee). The earlier cyan/magenta values (`#38e8ff`/`#ff5da2`) are retired — any `plasma-cyan`/`magenta-coral`/cyan/magenta references in the Phase‑3 code samples below map to `bio-emerald`/`bio-teal` and get updated when that phase is built.

## Contents
1. [The brief & the direction](#1-the-brief--the-direction)
2. [Locked decisions](#2-locked-decisions)
3. [The scroll‑progression navigation model](#3-the-scroll-progression-navigation-model)
4. [The scene storyboard (the journey)](#4-the-scene-storyboard-the-journey)
5. [The interactive hero funnel](#5-the-interactive-hero-funnel)
6. [Design tokens](#6-design-tokens)
7. [The build plan (phases)](#7-the-build-plan-phases)
8. [File‑change map](#8-file-change-map)
9. [Shared infrastructure](#9-shared-infrastructure)
10. [Phase 3 — Hero (detailed sub‑plan)](#10-phase-3--hero-detailed-sub-plan)
11. [Risks](#11-risks)
12. [Open decisions still pending](#12-open-decisions-still-pending)

---

## 1. The brief & the direction

Re‑skin xini.dev with Framer Motion at the core — reimagine the whole look, motion, **and navigation**, keep all content. After comparing 7 generated directions, **VOLUMETRIC** was chosen; a later steer promoted a **scroll progression** to the structural backbone.

**VOLUMETRIC — "Step inside the render."** One fixed full‑viewport `ogl` WebGL canvas (a domain‑warp fluid + an instanced `GL_POINTS` particle constellation) lives behind the entire page and owns **all** chroma. Every DOM element is desaturated obsidian‑glass floating above it. The name **"XINI" is a mask the live fluid flows through**. **Scrolling is a guided cinematic progression** — a single dolly shot flying a virtual camera through four pinned depth chambers — not a normal document scroll. The hero is genuinely **interactive**: you stir the fluid and the wordmark reacts, and your first scroll/hold *ignites* the flight.

**Stack:** Next.js 16 (app router, Turbopack) · React 19 · Tailwind v4 · framer‑motion v12 (installed) · shadcn/ui · **`ogl` ~25kb** (not three.js's ~150kb) · Clash Display. Deployed on **Vercel** (deploy‑on‑commit); custom domain `xini.dev` configured in the Vercel dashboard.

**Why it fits Xini:** CS + AI + games + world‑building; admires true "3D animated websites." The medium *is* the message — a portfolio that is itself a small graphics engine, with a guided flight that demonstrates the WebGL/game‑dev skills already in the work (Overthrow Synthetica, NullVector, the ECS demo).

---

## 2. Locked decisions

| Decision | Choice |
|---|---|
| Direction | VOLUMETRIC — The Living Render |
| **Navigation** | **iPhone‑product‑page scroll progression** — native `position:sticky` + tall‑spacer scenes, **ONE** `useScroll` → one camera spring, **continuous scrub, NO snap, NO scroll‑jacking** (Apple's actual technique) |
| **Scenes** | 4 pinned chambers as one continuous camera flight: **00 Hero · 01 About · 02 Projects · 03 Contact** |
| **Projects scene** | **Horizontal depth reel** — fly through the 11 tiles one focal project at a time, with an 11‑tick counter (vertical grid kept only as the reduced‑motion fallback) |
| **Hero ignite** | **Hold‑to‑charge + scroll** — `uMorph = max(uIgnite_fromHold, heroScroll)`; the hold gesture is a parallel accelerant that **never** hijacks the scrollbar |
| **Hero interactivity** | Stir the fluid (pointer‑velocity wake) + magnetic/rippling XINI wordmark + charge‑to‑ignite. Ship **A+B+D**; defer flingable embers (C) + draggable light (E) |
| **HUD** | **Full flight instrument** — clickable progress spine (4 chamber anchors) + numeral 00→03 + 11‑tick Projects sub‑counter + faux DEPTH/VELOCITY readout |
| Palette | **Original iconic emerald `#10b981` restored** (locked hero) · flows emerald → teal `#2dd4bf` → green‑cyan `#22d3ee` · teal‑tinted near‑black ink `#05100d` · near‑white text |
| Contact email | **`xini@saltancy.com`** (replaces the current `mailto:anxinizlol@gmail.com`) |
| Hero "XINI" wordmark | **True shader mask** (live fluid through the glyphs) + CSS‑gradient fallback for reduced‑motion / no‑WebGL / LCP; **per‑letter** reveal |
| Hero CTAs | **Subtle magnetism** (strength 0.25, radius 90px, max 10px; auto‑off on touch / reduced‑motion) |
| Tagline voice | **Mono / HUD** (Geist Mono) |
| WebGL lib | `ogl` (~25kb). Rejected: three.js/R3F (~150kb), lenis, CSS scroll‑snap, JS fixed‑swap pinning |

**Sensible defaults (change on request):** keep the existing project array order (Saltancy→…→ECS — a web→AI→games crescendo into the two game pieces); include the "Return to ignition" replay at the end of Contact; single‑text‑node wordmark; `100svh/100dvh` (not `vh`); CSS‑unit scene heights (not JS‑measured px).

---

## 3. The scroll‑progression navigation model

**This is Apple's real technique, not scroll‑jacking.** Each scene is a tall outer `<section>` (a "scroll budget" in vh) whose inner stage is `position:sticky; top:0; height:100svh`. The browser pins it natively while you scroll past the wrapper's extra height, then releases to the next scene. The scrollbar, spacebar, Page Down, trackpad, and touch fling **all keep working** — we never `preventDefault` on wheel/touch.

- **One clock.** Exactly **one** `useScroll(scrollYProgress)` (0→1 over the whole document) lives in `useVolumetric` and feeds `camera = useSpring(scrollYProgress, {60,20,1})`. That smoothed **camera value is the film timeline** — every continuous effect (hue, fog, dolly, particle reconfig) reads `camera` via `useTransform` keyframes at the chamber boundaries `[0, 0.16, 0.34, 0.78, 1.0]`. **Nothing inter‑scene reads raw `scrollYProgress`** except the linear HUD fill % and the nav hairline.
- **Local beats are slices, not new listeners.** Per‑scene choreography (text reveals, the wordmark dissolve, the reel's horizontal travel) is a `useTransform` of the *same* camera over that scene's `[start,end]` range — **not** a second whole‑page listener, **not** N IntersectionObservers writing a keyed store (that double‑source‑of‑truth desyncs). Local DOM scrubs are **not** spring‑smoothed (locked to the finger); only the shared camera is sprung.
- **Nav jumps fly the camera for free.** Nav links + logo stay anchor `href`s (`#hero/#about/#projects/#contact`) on each scene's wrapper, with `scroll-margin-top` = nav height. A click `scrollIntoView`s to a registered "readable scrollY" target; because scroll position is the single source of truth, smooth‑scrolling drags `scrollYProgress` through every value and the camera spring **flies** there — the fly‑through is emergent, no bespoke "animate to target" code.
- **Deep links.** Hash on load re‑jumps in a `useLayoutEffect` *after* scenes register heights (tall wrappers break native hash restore); `history.replaceState` (not `pushState`) on scene‑midpoint crossing; a programmatic‑scroll guard stops the hash observer fighting nav clicks.
- **Mobile:** sticky + native scroll works on touch with zero extra code; `100svh/100dvh` survives the iOS toolbar; shorter per‑scene vh budgets on small screens; HUD collapses to a slim bottom dot‑bar.
- **Reduced‑motion / no‑WebGL / no‑JS:** a single `data-progression="off"` switch on `<html>` (SSR default **off**, so first paint and any JS failure yield the safe readable document) collapses **every** scene — wrappers → `min-h-screen`, stages → `position:static`, scrub gain `g→0`, `whileInView` fades replace scrubs, the engine freezes to the poster. Centralized in the `<Scene>` primitive so no scene can strand a pin.

Rejected: **CSS `scroll-snap-mandatory`** (traps keyboard users, fights nav scroll‑to + the Projects sub‑scroll) and **JS `position:fixed` swap pinning** (reinvents sticky, risks jank/jacking). Optional gentle proximity‑snap is a deferred per‑scene opt‑in only, never mandatory, always off under reduced‑motion.

---

## 4. The scene storyboard (the journey)

| Scene | Camera / budget | Beat | Interaction | Transition out |
|---|---|---|---|---|
| **00 — Hero / Ignition Chamber** | 0.00→0.16 · ~150vh | Poster is LCP; fluid crossfades in. Real `<h1>XINI</h1>` is the live shader mask, resolving **X‑I‑N‑I**. Tagline + CTAs materialize after. Fluid idle‑breathes (autonomous curl‑noise) — a living poster, not a static aurora. | **Stir the fluid** (pointer velocity → swirling plasma wake); the 4 letters lean magnetically + glow inside (`uHoverGlyph`); click = decaying refraction ring. Coarse pointer → tap‑ripple + idle drift. | Camera dollies toward the mask; `uMaskReveal` pushes past 1.0 so the trapped fluid floods **outward** and the letterforms dilate — you fly through the gaps in your own name. Hue starts cyan→cooler‑violet. |
| **01 — About / The Clearing** | 0.16→0.34 · ~250vh | The one calm reading beat. **Fog arrives high and parts** as you scroll. Asymmetric 12‑col layout, watermark `01`. Logo = depth‑extruded 3D specimen with cyan rim‑light. Bio verbatim. | Read. Logo idles on slow `rotateY` + pointer‑tilt. Bio materializes **line‑by‑line** out of the fog; key phrases re‑color plasma‑cyan as they resolve. | "let's team up" resolves last; camera **accelerates** (anticipation), fog re‑thickens into the seam veil, hue warms toward magenta‑coral, specimen recedes — a speed‑up into the corridor. |
| **02 — Projects / The Depth Reel** | 0.34→0.78 · ~400–520vh · **centerpiece (~44% of the film)** | Camera enters a corridor at the **hottest** hue. HUD spawns an 11‑segment sub‑counter ("PROJECT 04 / 11"). The 11 projects are a **horizontal depth reel**: native vertical scroll maps (spring‑damped) to horizontal x‑travel of an 11‑tile strip in a depth corridor. Order = existing array (web→AI→games crescendo). Beat 12 = the GitHub pill. | Scroll to fly: tiles arrive from z‑far, sharpen at a focal plane (title/desc/link materialize), then blur and slide off. The focused tile writes its center to `hoverTarget` so the constellation **gathers** to it. Overthrow Synthetica hue‑flares on focus (a WebGL wink). | After the 11th (ECS), the corridor opens; the GitHub pill is the final focal object; camera **decelerates hard**, the constellation disperses, hue cools magenta→calm cyan, seam veil hands off. |
| **03 — Contact / Touchdown** | 0.78→1.00 · ~200vh | The engine **powers down** — the only true rest state. `04 / CONTACT`. Iteration count + flow speed ramp down; `uCoreGlow` ramps; hue resolves to deep calm with a single cyan ember. Four glass orbs drift in (Email→`xini@saltancy.com`, GitHub, X, LinkedIn) + plasma GitHub pill. | Orbs reuse the hero's cursor‑as‑instrument language: cyan emit at rest, magnetic pull (`useMagnetic` 200/15) + depth‑lift + magenta bloom on hover. | Footer fades to `#0B0A1A`, fluid stills to a breathing idle, "— END OF TRANSMISSION —" resolves last, HUD locks on 04. **"Return to ignition"** scrolls to hero, scrubbing the whole flight in reverse. |

---

## 5. The interactive hero funnel

A four‑stage funnel where each interaction teaches the next, culminating in the scroll journey:

1. **Ambient** — fluid breathes through the XINI mask; glyphs idle. A premium living poster, not a toy demanding attention.
2. **Notice** (stir + magnetic wordmark) — moving the cursor **stirs** the fluid: a bridge‑derived `uPointerVelocity` injects momentum into a single‑pass domain‑warp fluid so a fast drag shoves a swirling, dissipating plasma wake (velocity coupling is what reads as *alive* vs a hover effect). Simultaneously the 4 letters lean magnetically (DOM Framer springs on the real `<h1>` spans) and the fluid **inside** each glyph glows + ripples (`uHoverGlyph`); click fires a refraction ring (`uClickPulse/uClickPos`).
3. **Commit** (charge) — press‑and‑**hold** anywhere (or focus + Space/Enter for a11y, or just **start scrolling**) ramps `uCharge` 0→1 over ~700ms: fluid contracts toward the wordmark, dye saturates, glyphs pull together and brighten.
4. **Ignite** — release at full charge (or cross the scroll threshold) animates `uIgnite` 0→1: a shockwave blows the dye outward and the camera scrubs into Chamber 1. **The hero IS Scene 0.**

**No scroll‑jacking:** the hold gesture *never* `preventDefault`s wheel/touch. It animates a separate `uIgnite` uniform in parallel; the visual morph blends via `uMorph = max(uIgnite_fromHold, heroScrollProgress)` — whichever leads wins and they converge, so hold and scroll never fight. Hold is the discoverable/fun path; scroll is the guaranteed path; both play the identical cinematic. A movement‑slop threshold cancels a charge into a scroll/stir so "hold then immediately scroll" works.

**Performance:** NOT a true ping‑pong fluid sim — a single‑pass domain‑warped FBM whose warp vector is pushed by an accumulating velocity buffer, **half‑res, DPR clamped ~1.5**. All coupling is via uniforms on the existing `uniformsRef` (`uPointerVelocity, uStir, uClickPulse, uClickPos, uHoverGlyph(vec4), uCharge, uIgnite, uMorph`); zero per‑frame React commits. Cache glyph `getBoundingClientRect` (recompute on resize/scroll, not per frame).

**Reduced‑motion:** hard‑gated — the sim, magnetic lean, ripple, and charge collapse to the static masked poster + a tiny 2‑frame dye drift; ignite becomes a plain anchor smooth‑scroll; glyphs use CSS `:hover` brightness only. **LCP/SEO** preserved: poster `<img>` is the LCP, `ogl` inits after first paint, the real `<h1>XINI</h1>` always carries the accessible name despite per‑glyph `aria-hidden` spans.

---

## 6. Design tokens

| Token | Value | Use |
|---|---|---|
| `--ink-1000` | `#05100d` (teal‑tinted near‑black) | base background |
| `--ink-900..700` | graded toward `#0B0A1A` | scroll wells / surfaces |
| `--bio-emerald` | `#10b981` (the original iconic green, **LOCKED**) | hero accent, shader core, glow, live focus |
| `--bio-teal` | `#2dd4bf` (+ `--bio-cyangreen` `#22d3ee`) | secondary counter‑tone the fluid flows toward |
| `--text-100` | `#F2F1FA` | body text |
| `--text-300` | `#A6A2C2` | muted/secondary |
| glass fill | `rgba(14,12,30,0.55)` + `backdrop-blur` + inset `white/8%` stroke | `.glass` / `.glass-strong` |

`--bio-emerald-rgb` (`16 185 129`) / `--bio-teal-rgb` (`45 212 191`) exist for box‑shadow/radial RGB literals. Fonts: **Clash Display** variable (`next/font/local`, `--font-display`) wordmark/numerals · **Inter** (`--font-sans`) body · **Geist Mono** (`--font-mono`) HUD + tagline. Tailwind v4 `@theme` generates `bg-ink-*`, `text-bio-emerald`, `font-display`. shadcn alias bridge maps `--primary → --bio-emerald`. **The original iconic emerald `#10b981` is the locked hero.**

---

## 7. The build plan (phases)

Each phase is a safe, independently‑shippable "bit." The riskiest unknowns (sticky pinning, shader fps, fallback) are proven **before** any real content is reskinned.

### Phase 1 — Config + asset pipeline + tokens & fonts _(safe foundation)_ ✅ DONE
- `next.config.ts`: minimal — **Vercel runs Next natively** (no `output:'export'`, no `images.unoptimized`, no `trailingSlash`; Vercel optimizes `next/image`). The GitHub‑Pages `.nojekyll` + Actions workflow were removed.
- `scripts/optimize-images.mjs` (sharp): 11 screenshots → 800px webp. **Fixed the 16.7MB `wsmath.jpg` → 26KB; `projects/` total ~21MB → 276KB.** Originals deleted, `projects.tsx` paths → `.webp` (next/image is lazy by default).
- Installed `ogl` + `sharp`. **Clash Display pending:** needs `ClashDisplay-Variable.woff2` (SIL OFL) self‑hosted in `src/app/fonts/` then wired via `next/font/local`; until then `--font-display` falls back to Geist (only visible from Phase 3).
- Rewrite `globals.css`: delete aurora keyframes + light `:root` + `.dark` block; add VOLUMETRIC tokens + shadcn alias bridge + `@theme` + `.glass*`/`.hud*`/`.t-*` utilities; **gate `scroll-behavior:smooth` (currently unconditional at `globals.css:100`) behind `@media (prefers-reduced-motion: no-preference)`**; add `scroll-padding-top` for nav clearance; reduced‑motion / `.no-webgl` poster fallback rules.
- **Acceptance (met):** `next build` passes; `button.tsx` compiles against the alias‑only `:root`; `<h1>XINI</h1>` is real text in the HTML; body de‑zinc'd; largest image 75KB.

### Phase 2 — Shared engine: canvas + poster + WebGL gate/fallback + scene‑timeline context + bridge + HUD
- GLSL as TS template strings; `Canvas.tsx` (one Renderer, one gated rAF = sole uniform writer, 2 draw calls, leak‑safe teardown + context‑loss recovery); `useGLGate.ts` (capability probe + 3 quality tiers + FPS auto‑downgrade + IO/visibility pause); `Poster.tsx` (CSS gradient, LCP + permanent fallback); `CanvasMount.tsx` (`dynamic({ssr:false})` + crossfade after compile).
- `volumetric/context.tsx` is the **scene‑timeline provider**: ONE `useScroll`, camera spring, smoothed pointer, velocity/flow spring, `reducedMotion`, `hoverTarget`, and `registerChamber` evolving into a registry of `{id, ref, spacerVh, cameraKeyframe, readableScrollY}`.
- `bridge/useUniformBridge.ts` (mutate `uniformsRef` only, never setState/gl).
- **New uniforms added here** so later phases don't reopen the engine: `uPointerVelocity, uStir, uClickPulse, uClickPos, uHoverGlyph(vec4), uCharge, uIgnite, uMorph` (hero); `uFlowReconfig, uDolly, uChamber` (flight); reuse `uVelocity` for scroll‑speed.
- Motion primitives (`variants.ts`, `useMaterialize.ts`, `useMagnetic.ts`).
- **Acceptance:** 60fps desktop / 30–60fps mobile; reduced‑motion or thrown `getContext` shows only the poster with no rAF; <16 GL contexts after navigation/hot‑reload; zero re‑renders on pointer/scroll.

### Phase 2.5 — Scroll‑Progression Scaffold _(NEW — the single biggest plan change; build before any section reskin)_
- The reusable **`<Scene>` primitive**: tall outer wrapper + `position:sticky` inner stage; owns the per‑scene local `useScroll` (offset `['start start','end end']`), exposes `sceneProgress` to children; carries `id` + `scroll-margin-top`; centralizes the `data-progression` reduced‑motion collapse (`height:auto` + `position:static` + gain `g→0`) so no scene can strand a pin. A second optional `useScroll` (`['start end','start start']`) gives pre‑pin lead‑in fades.
- Build the **4‑scene rail with placeholder content**; the `data-progression` on/off switch (reduced‑motion / no‑WebGL / SSR default off); the scene registry; the **camera‑flight `useTransform` timeline promoted here** (hue/fog/dolly keyframes — it's the structural spine, not Phase‑6 polish); nav `scrollIntoView` to registered targets + hash deep‑link `useLayoutEffect` re‑jump + `scroll-padding`; the full **HUD flight instrument** (clickable spine, numeral, 11‑tick sub‑counter, faux DEPTH/VELOCITY).
- A **dev‑only `assertSticky` walker** that warns on any `transform`/`overflow`/`filter`/`contain` ancestor between a sticky stage and `<body>`.
- `page.tsx` stops being a plain `<div>` stack → becomes the scene rail wrapped in `VolumetricProvider`, with the fixed Canvas + HUD as siblings **outside** the sticky chain.
- **Acceptance:** scroll / keyboard / deep‑link through 4 pinned placeholders that un‑pin flawlessly under reduced‑motion, before any shader or real content.

### Phase 3 — Hero (two‑act interactive scene)
See the [detailed sub‑plan](#10-phase-3--hero-detailed-sub-plan). Act 1 = the playable fluid+wordmark toy (stir/magnetic/ripple/charge); Act 2 = its sticky‑exit scrub (mask floods open, camera dollies into Chamber 1). Outer wrapper is a `<Scene>`.

### Phase 4 — Projects (pinned horizontal depth reel)
- Projects becomes a pinned `<Scene>` with the **horizontal depth reel**: native vertical scroll → spring‑damped horizontal x‑travel of an 11‑tile strip; tiles arrive from z‑far, focus at a central plane, blur off. 11 per‑tile `useTransform` hooks created in `.map()` (safe **only** because the count is a constant 11 and the hooks are unconditional). `onFocus` scrolls the rail + sets `hoverTarget`. "LIVE" hue‑flare on Overthrow Synthetica. Keep the 11‑item array + order; plasma GitHub pill as beat 12.
- `project-card.tsx` → client motion tile, drop `featured`; `.glass-tile`; cheap RGB‑shift hover first.
- **Reduced‑motion fallback:** a plain vertical stacked grid. (Replaces the current `whileInView` bento grid — note `projects.tsx:108`'s `overflow-hidden` must move off the sticky ancestor.)

### Phase 5 — About + Contact
- `public/icon-mono.svg` (recolor emerald fills → white/desaturated).
- **About** (Scene 01): asymmetric `md:grid-cols-12`, watermark `01`, fog‑parts entrance, logo 3D specimen (stacked offset copies) + rim‑light + pointer‑tilt, bio materializes line‑by‑line, emerald key‑phrases → `text-plasma-cyan`. Copy verbatim.
- **Contact** (Scene 03): `04 / CONTACT`, glass orbs (cyan emit → magnetic pull + magenta bloom), email → `xini@saltancy.com`, plasma GitHub pill, "— END OF TRANSMISSION —", `uCoreGlow` ramp, footer fade to `#0B0A1A`, "Return to ignition" replay.

### Phase 6 — Navigation + mobile overlay + dissolve veils _(shrunk — camera‑flight moved to 2.5)_
- `.glass-strong` HUD nav; `icon-mono.svg` + cyan rim‑light; shared `layoutId="nav-underline"` light‑bar; nav‑bottom `scaleX` scroll hairline (raw `scrollYProgress`, linear); active link from the **chamber registry** (not a hot scroll listener). `AnimatePresence` full‑height mobile overlay, depth‑staggered links, body‑scroll lock. Dissolve veil per chamber seam (scroll‑scrubbed fog band, frame‑locked to camera; rendered as fluid‑side fog on mobile, not DOM backdrop‑filter).

### Phase 7 — Polish + perf hardening + a11y + ship
FPS auto‑downgrade ratchet (bottoms out to the poster while DOM scrubs still work) + idle "calm mode" (fewer `uIterations`); **cross‑browser sticky validation (Safari strictest)**; a **60s continuous‑scroll mobile thermal/battery run** (Moto‑G class); reduced‑motion linear‑document audit; deep‑link landing audit; **full keyboard focus‑order traverse through all pinned scenes** (nothing focusable while `opacity:0` — `inert`/`aria-hidden` until revealed); contrast over the **brightest** shader frame; GL teardown across StrictMode/hot‑reload.
- **Targets:** LCP <1.8s (poster), CLS 0, a11y 100, perf green on Moto‑G throttling; 60fps desktop / 30–60fps mobile; reduced‑motion + no‑WebGL + context‑loss all converge on poster + linear document.

---

## 8. File‑change map

~45 files. **New:** the `webgl/` engine (`Canvas`, `CanvasMount`, `Poster`, `useGLGate`, `scene/`, `shaders/`, `bridge/useUniformBridge`), `volumetric/` (`context` scene‑timeline provider, **`Scene` primitive**, `HudFrame` flight instrument, `DissolveVeil`, `assertSticky` dev util), `motion/` (`variants`, `useMaterialize`, `useMagnetic`), `hero/use-hero-wordmark-mask`, `cta/` (`hero-cta`, `cta-specular`, `magnetic-wrap`), `public/icon-mono.svg`, `scripts/optimize-images.mjs`, the Clash Display woff2, `public/projects/*.webp`.
**Modified:** `next.config.ts`, `globals.css`, `layout.tsx`, **`page.tsx` (→ scene rail)**, `button.tsx`, all 5 sections (now authored as `<Scene>`s), `package.json`, `projects.tsx` image paths.
**Deleted:** `src/components/ui/aurora-background.tsx`, the original `public/projects/*.png` + `wsmath.jpg`.

---

## 9. Shared infrastructure (build once, reuse everywhere)

- **`<Scene>` primitive** — the keystone: tall wrapper + sticky stage + local `useScroll`, centralizes the reduced‑motion collapse. Every act routes through it.
- **`VolumetricProvider`/`useVolumetric`** scene‑timeline context — ONE `useScroll`, the camera spring, the camera‑flight `useTransform` timeline, smoothed pointer, velocity/flow, `reducedMotion`, `hoverTarget`, the scene registry. Single source of truth.
- **`uniformsRef` + `useUniformBridge`** — the ONE Framer↔`ogl` seam; `.on('change')` mutates a ref only; the rAF is the sole reader. Zero React re‑renders.
- **`ogl` Canvas engine** (one Renderer, one gated rAF, 2 draw calls, leak‑safe teardown, context‑loss recovery) + **`useGLGate`** (probe + tiers + FPS ratchet + IO/visibility pause).
- **CSS `Poster`** — LCP + permanent universal fallback.
- **Motion primitives** — `materialize` variants + `useMaterialize` (depth‑staggered, reduced‑motion crossfade), `useMagnetic`, specular helper, `layoutId` nav‑underline.
- **`HudFrame`** flight instrument, **design tokens/utilities**, **`button.tsx` `plasma`/`frost` variants**, **`icon-mono.svg`**, the **dev `assertSticky` walker**, the image‑optimization / asset pipeline.

---

## 10. Phase 3 — Hero (detailed sub‑plan)

### Architecture
The name exists as **three reconciled representations**, all sharing the same box measured from the live `<h1>`:
1. A **real `<h1>XINI</h1>`** text node — always present (a11y/SEO/clipboard), never hidden.
2. A **CSS cyan→magenta gradient** clipped into that text — the legibility floor and **the LCP element**.
3. A **GPU coverage texture** (`uMask`) telling the fluid shader where to boost — the glyph shape lives only on the GPU.

A single `data-mask-state` attribute flips `fallback` → `shader` as a **pure paint swap** (identical geometry → zero CLS). `shaderActive = mounted && hasWebGL && canvasReady && !contextLost && !reducedMotion`. The DOM is byte‑identical in both states; only canvas opacity, the attribute, and bridge attachment change — so **reduced‑motion / no‑WebGL / pre‑compile / context‑loss all converge** with no flash.

The Hero is now a **two‑act `<Scene>`**: Act 1 is the interactive playable toy (the [funnel](#5-the-interactive-hero-funnel) — stir / magnetic wordmark / charge‑to‑ignite); Act 2 is its sticky‑exit scrub (`uMaskReveal` floods past 1.0, camera dollies into Chamber 1). Two re‑render‑free motion systems: **pointer parallax** (three depth planes via `useTransform` off the context's `pointerX/pointerY` springs, normalized −1..1; a gain `g` collapses to 0 when gated so the hook tree is identical in every state) and **per‑letter entrance** (the real `<h1>` stays one text node for SR; the per‑letter resolve is shader‑side via letter‑center gating of `uMaskReveal`, with an aria‑hidden DOM overlay bridging during canvas fade‑in).

### `hero.tsx` skeleton

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useTransform, useMotionValueEvent, type Variants, type Transition } from "framer-motion";
import { useVolumetric } from "@/components/volumetric/provider";
import { Poster } from "@/components/volumetric/poster";
import { useMaterialize } from "@/components/motion/use-materialize";
import { useHeroWordmarkMask } from "@/components/hero/use-hero-wordmark-mask";
import { HeroCTA } from "@/components/cta/hero-cta";

// Heavy ogl bundle is its OWN async chunk — never on the hero's hydration path.
const VolumetricCanvas = dynamic(() => import("@/components/volumetric/volumetric-canvas"), { ssr: false, loading: () => null });

const PARALLAX = { word: { x: 18, y: 12, rotY: 9, rotX: 6 }, tagline: { x: 10, y: 7 }, cta: { x: 6, y: 4 } } as const;
const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;
const WORDMARK_CLS = "font-display font-semibold leading-none tracking-tight text-[clamp(4rem,18vw,11rem)]";

export default function Hero() {
  const { pointerX, pointerY, scrollYProgress, reducedMotion, hasWebGL, canvasReady,
          contextLost, isFinePointer, registerChamber, uniformsRef } = useVolumetric();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const shaderActive = mounted && hasWebGL && canvasReady && !contextLost && !reducedMotion;
  const mountCanvas  = mounted && hasWebGL && !reducedMotion;          // save battery otherwise

  const [isCoarse, setIsCoarse] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)"); setIsCoarse(mq.matches);
    const on = (e: MediaQueryListEvent) => setIsCoarse(e.matches);
    mq.addEventListener("change", on); return () => mq.removeEventListener("change", on);
  }, []);

  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const { maskState } = useHeroWordmarkMask(wordmarkRef);              // 'fallback' | 'shader'

  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => { if (sectionRef.current) return registerChamber("hero", sectionRef); }, [registerChamber]);

  // POINTER BRIDGE — mutate the ref, NEVER setState
  useMotionValueEvent(pointerX, "change", v => { if (isFinePointer) uniformsRef.current.uPointerX = v; });
  useMotionValueEvent(pointerY, "change", v => { if (isFinePointer) uniformsRef.current.uPointerY = v; });

  // PARALLAX — gain g collapses all motion to 0 when gated (hook tree stays identical)
  const g = (!reducedMotion && !isCoarse) ? 1 : 0;
  const wordX    = useTransform(pointerX, [-1,1], [-PARALLAX.word.x*g,  PARALLAX.word.x*g]);
  const wordY    = useTransform(pointerY, [-1,1], [-PARALLAX.word.y*g,  PARALLAX.word.y*g]);
  const wordRotY = useTransform(pointerX, [-1,1], [-PARALLAX.word.rotY*g, PARALLAX.word.rotY*g]);
  const wordRotX = useTransform(pointerY, [-1,1], [ PARALLAX.word.rotX*g, -PARALLAX.word.rotX*g]);
  const tagX = useTransform(pointerX, [-1,1], [-PARALLAX.tagline.x*g, PARALLAX.tagline.x*g]);
  const tagY = useTransform(pointerY, [-1,1], [-PARALLAX.tagline.y*g, PARALLAX.tagline.y*g]);
  const ctaX = useTransform(pointerX, [-1,1], [-PARALLAX.cta.x*g, PARALLAX.cta.x*g]);
  const ctaY = useTransform(pointerY, [-1,1], [-PARALLAX.cta.y*g, PARALLAX.cta.y*g]);

  const hintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  const materialize = useMaterialize();                                // depth-staggered; reduced → crossfade
  const subtree: Variants = { hidden: {}, show: { transition: {
    delayChildren: reducedMotion ? 0.1 : 0.9, staggerChildren: reducedMotion ? 0.06 : 0.12 } } };
  const revealTransition: Transition = reducedMotion ? { duration: 0 } : { duration: 1.1, ease: REVEAL_EASE };

  return (
    <section id="hero" ref={sectionRef} data-mask-state={maskState}
      className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 text-center select-none">

      <Poster aria-hidden className="absolute inset-0 -z-10" />        {/* LCP / fallback floor */}

      {mountCanvas && (
        <motion.div aria-hidden className="pointer-events-none fixed inset-0 -z-[5]"
          initial={{ opacity: 0 }} animate={{ opacity: shaderActive ? 1 : 0 }}
          transition={{ duration: shaderActive ? 0.6 : 0.2, ease: "easeOut" }}>
          <VolumetricCanvas />
        </motion.div>
      )}

      {/* WORDMARK — deepest parallax. Real <h1> stays one text node (a11y); per-letter resolve is
          shader-side (gate uMaskReveal across each glyph center). aria-hidden overlay bridges fade-in. */}
      <motion.div style={{ x: wordX, y: wordY, rotateX: wordRotX, rotateY: wordRotY, transformPerspective: 1000 }} className="relative">
        <motion.h1 ref={wordmarkRef} className={"hero-wordmark " + WORDMARK_CLS}>XINI</motion.h1>
        {!reducedMotion && maskState === "fallback" && (
          <span aria-hidden className="pointer-events-none absolute inset-0">
            {"XINI".split("").map((c, i) => (
              <motion.span key={i} initial={{ opacity: 1, filter: "blur(14px)" }} animate={{ opacity: 0, filter: "blur(0px)" }}
                transition={{ ...revealTransition, delay: i * 0.12 }}                 // per-letter
                className={"hero-wordmark inline-block [will-change:filter,opacity] " + WORDMARK_CLS}>{c}</motion.span>
            ))}
          </span>
        )}
      </motion.div>

      {/* TAGLINE + CTAs — orchestrated entrance. Tagline voice = Geist Mono (HUD). CTAs are magnetic + nav jumps. */}
      <motion.div variants={subtree} initial="hidden" animate="show" className="flex flex-col items-center">
        <motion.p variants={materialize} custom={0} style={{ x: tagX, y: tagY }}
          className="mt-6 mb-10 font-mono text-base tracking-wide text-text-100 sm:text-xl [text-shadow:0_1px_8px_rgba(7,6,15,0.55)]">
          Designer <Dot /> Developer <Dot /> Creator
        </motion.p>
        <motion.div style={{ x: ctaX, y: ctaY }} className="flex flex-col gap-4 sm:flex-row sm:gap-6 justify-center">
          <motion.div variants={materialize} custom={1}><HeroCTA href="#projects" variant="plasma" magnetic>View Projects</HeroCTA></motion.div>
          <motion.div variants={materialize} custom={2}><HeroCTA href="#contact" variant="frost" magnetic>Contact Me</HeroCTA></motion.div>
        </motion.div>
      </motion.div>

      {/* SCROLL hint — scroll-opacity (no state) + optional bob */}
      <motion.div aria-hidden initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: reducedMotion ? 0.3 : 1.6, duration: 0.6 }}
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div style={{ opacity: hintOpacity }}
          {...(!reducedMotion && { animate: { y: [0,6,0] }, transition: { duration: 1.6, ease: "easeInOut", repeat: Infinity } })}
          className="flex flex-col items-center gap-1 font-mono text-[10px] tracking-[0.3em] text-text-300">
          SCROLL<span aria-hidden>↓</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Dot() {
  return <span aria-hidden className="mx-2 inline-block size-[5px] -translate-y-[2px] rounded-full align-middle bg-plasma-cyan
    [box-shadow:0_0_8px_var(--plasma-cyan),0_0_16px_color-mix(in_oklch,var(--plasma-cyan)_50%,transparent)]" />;
}
```

> The skeleton above shows Act‑1 statics + the per‑letter reveal. Act‑1 **interactivity** (stir / magnetic glyph springs / charge‑to‑ignite) and Act‑2 **exit scrub** layer on via the funnel uniforms (`uPointerVelocity, uStir, uHoverGlyph, uCharge, uIgnite, uMorph`) written through `uniformsRef`, and the `<Scene>` wrapper drives the dolly‑out. The hold‑to‑charge gesture never `preventDefault`s — see §5.

### `button.tsx` — two new cva variants (add after `link:`; everything else verbatim)

```tsx
plasma: cn(                                              // emissive primary — ink-on-cyan ~15:1
  "relative isolate overflow-visible bg-plasma-cyan text-ink-1000 font-semibold",
  "shadow-[0_2px_40px_-8px_rgba(56,232,255,0.65)]",
  "hover:bg-plasma-cyan/95 hover:shadow-[0_2px_56px_-6px_rgba(56,232,255,0.92)]",
  "active:shadow-[0_1px_24px_-10px_rgba(56,232,255,0.7)]",
  "after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-[inherit]",  // magenta bleed
  "after:bg-[radial-gradient(60%_120%_at_50%_50%,rgba(255,93,162,0.9),transparent_70%)]",
  "after:opacity-0 after:scale-90 after:blur-md after:transition-all after:duration-300",
  "group-hover/button:after:opacity-100 group-hover/button:after:scale-110",
  "focus-visible:border-plasma-cyan focus-visible:ring-plasma-cyan/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-1000"),
frost: cn(                                               // glass outline
  "relative isolate overflow-hidden glass text-text-100",
  "border-plasma-cyan/40 hover:border-plasma-cyan hover:bg-ink-900/70 hover:text-text-100",
  "hover:shadow-[inset_0_0_0_1px_rgba(56,232,255,0.25)]",
  "focus-visible:border-plasma-cyan focus-visible:ring-plasma-cyan/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-1000"),
```
`HeroCTA` passes `HERO_SIZE = "h-12 sm:h-14 px-6 sm:px-8 text-lg sm:text-xl rounded-xl"` and wraps the `asChild` `<a>` in `MagneticWrap` (outside, so anchor semantics survive) with `CtaSpecular` (render‑free cursor highlight) inside.

### Phase‑2 / context interface contract (what the Hero consumes)
`useVolumetric()` (memoized; stable identities only): `pointerX/pointerY: MotionValue<number>` (pre‑smoothed springs, **−1..1, 0=center**, updated only on `isFinePointer && !reducedMotion`); `scrollYProgress`, `camera`, `hoverTarget: MotionValue<number>`; booleans `reducedMotion, hasWebGL, canvasReady, compiled, contextLost, isFinePointer` (SSR default false); `registerChamber(id, ref): () => void`; `uniformsRef` (the sole mutable uniform store, incl. mask fields `uMask, uMaskRect [minX,minY,maxX,maxY], uMaskReveal` + the funnel uniforms); `engine: { supported, compiled, canvasVisible, gl, uploadMask(src), startMaskReveal() }`; `useMaterialize(): Variants`; `useMagnetic({strength,radius,maxOffset,enabled})`.

### Acceptance (Phase 3)
- View‑source contains real `<h1>XINI</h1>`; LCP = that `<h1>` (or Poster) <1.8s Slow 4G; shader canvas **never** LCP.
- JS‑off / no‑WebGL / reduced‑motion → identical safe hero, name legible, no console error.
- React DevTools: **zero** hero commits from pointermove/scroll/stir over 5s.
- CLS <0.05 (paint‑swap handoff; only transform/opacity/filter animate).
- Mask boost lands inside the transparent glyphs at DPR 1 & 2 and min/max clamp sizes; texture uploads once + only on debounced resize/font‑load/context‑restore.
- One `<h1>`, name "XINI"; SR reads "XINI, heading level 1" then "Designer Developer Creator"; canvas+Poster `aria-hidden`; CTAs keyboard‑reachable real `<a>` with focus ring ≥3:1.
- Contrast over the **brightest** shader frame: tagline + frost label ≥4.5:1; ring/large ≥3:1; plasma CTA ≥7:1.
- **Hold‑to‑charge never `preventDefault`s** wheel/touch; "hold then immediately scroll" cancels the charge into a scroll (movement‑slop threshold).

---

## 11. Risks

- **`position:sticky` ancestor trap (#1 silent killer):** sticky dies if any ancestor has `overflow:hidden/auto/clip`, `transform/filter/perspective/will-change`, or `contain`. The repo already trips this — `projects.tsx:108` has `overflow-hidden` and the aurora has `will-change-transform`. Keep the canvas `position:fixed` **outside** the sticky chain, put transforms on stage **children** not the sticky element, move per‑section overflow onto inner children, ship the dev `assertSticky` walker, test Safari (strictest).
- **Reduced‑motion done wrong TRAPS content** behind a scrub that never completes (hard a11y failure). Collapse tall spacers + un‑pin via the single `data-progression` switch (SSR default off), centralized in `<Scene>`.
- **Always‑on fixed shader over a ~10×‑tall document** drains mobile battery / thermal‑throttles. DPR cap + coarse‑pointer particle/blur drop + idle calm‑mode + visibility pause + FPS ratchet that bottoms out to the poster while DOM scrubs still work. Validate with a 60s continuous‑scroll run on a Moto‑G‑class device.
- **Stacked `backdrop-blur` glass** (cards + HUD + per‑seam veils) over a live shader is the #1 mobile‑fps unknown — and the flight adds a veil per seam + a persistent HUD. One blur tier; disable card/veil blur on coarse pointers; cap concurrent blurred materializing nodes (<~12); render seam veils as fluid‑side fog (`uFogDensity`) on mobile.
- **Horizontal‑from‑vertical reel** can disorient; 11 tiles is a long corridor (too tall feels stuck, too short whips by). Spring‑damp the map, a clear focal cue + the 11‑tick counter, full collapse to a vertical grid under reduced‑motion.
- **Camera desync** if any consumer reads raw `scrollYProgress` instead of `camera` — worse now with per‑scene local scrubs. Rule: hue/fog/dolly/flow + all in‑scene scrub read `camera`; only the linear HUD fill % + nav hairline read raw progress; per‑scene scrubs are slices of the SAME global value.
- **Deep‑link / hash jump** lands at the top of a tall (250–520vh) wrapper, possibly mid‑scrub or under the nav. `scroll-padding/scroll-margin-top` + a registered "readable scrollY" target + a `useLayoutEffect` re‑jump after scenes register heights; `replaceState` (not `pushState`) on midpoint, with a programmatic‑scroll guard.
- **Keyboard focus inside pinned scenes:** a control scrubbed to `opacity:0` but still in tab order = invisible focus. Make scrubbed‑hidden controls `inert`/`aria-hidden` until revealed; wire `onFocus`→`hoverTarget`+`scrollIntoView`; add a skip‑to‑content link; `scroll-padding` so focus is never occluded by the HUD.
- **Shader‑mask wordmark** must wait for `document.fonts.ready` and have the gradient‑text fallback wired, or the name could vanish on GL failure. **Per‑tile `useTransform` hooks** in `.map()` are safe only because the count is a constant 11 and the hooks are unconditional — never gate them. **GL context leaks** across StrictMode/hot‑reload hit the ~16‑context cap → black screen (needs `cancelAnimationFrame` + listener removal + `WEBGL_lose_context.loseContext()` + a `webglcontextlost` handler). **Hydration mismatch** if any `window`/`matchMedia`/`DPR` read seeds `useState` — read only in `useEffect`. Removing the light `:root` + `.dark` block could break shadcn components assuming both themes — verify against the alias‑only `:root`.

---

## 12. Open decisions still pending

- **Section height units:** `min-h-[100svh]` chosen (avoids mobile URL‑bar jump) — confirm `svh` vs `dvh`/`lvh`.
- **Optional hero flair:** ship flingable embers (Idea C) and/or a draggable light source (Idea E) at all, or keep the surface restrained (A+B+D only — current default)?
- **Faux DEPTH/VELOCITY HUD readout:** keep (sells the "inside an engine" feel) or cut (risk of feeling gimmicky)? Currently kept.
- **Proximity‑snap:** add a gentle opt‑in snap on Hero/Contact only, or pure continuous everywhere (current default)?
- **Reveal overlay lifetime:** keep the aria‑hidden DOM reveal overlay as a bridge during canvas fade‑in, or drop it once the shader per‑letter reveal is seamless?
- **Expose `--plasma-cyan-rgb` / `--magenta-coral-rgb`** in Phase 1 so the hardcoded box‑shadow RGB literals are `var()`‑driven.
