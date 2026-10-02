# xini.dev rework: Lattice build spec

| | |
|---|---|
| Version | 1.0, 2 October 2026 |
| Owner | Xini |
| Builder | Claude Code, working in the existing xini.dev repository |
| Direction | Lattice (chosen from six hero concepts) |
| Reference prototype | `lattice-prototype.html`, sent with this spec. Put it in the repo at `docs/reference/lattice-prototype.html` |
| Target effort | About one working day (see §18) |

---

## 0. How to use this spec

This document is the source of truth for the rebuild. The prototype shows the intended look and motion and holds the exact particle maths. Where the prototype and this spec disagree, the spec wins.

Work in this order:

1. Read the whole spec before writing code.
2. Run the repository audit in §4 and write `docs/AUDIT.md`. Record every decision it forces in `docs/DECISIONS.md`.
3. Copy the success criteria in §17 into `docs/CHECKLIST.md` and tick each ID as it passes, noting how it was verified.
4. Build milestone by milestone (§18). After each milestone, run the relevant checks in §16.
5. If a criterion cannot be met, stop and record why in `docs/DECISIONS.md`. Do not quietly weaken a criterion.

Ground rules:

- **This is a fresh build.** Take nothing from the old site's layout, structure, copy, theme or components. Migrate data only: project entries, project images, real links, contact details, and possibly the icon.
- **No racing or circuit geometry anywhere.** Delete the old theme assets and components once the new site works.
- **All readable content lives in HTML.** The WebGL canvas is decoration and is never the only place information appears.

Decisions already made (do not reopen them):

- The direction is Lattice: green on black, a scroll-driven Three.js particle stage choreographed with GSAP.
- The three scroll beats describe Xini, not projects. The d20 and the neural network stay.
- The featured projects are Gloam, DBridger and VOETutor, in that order. Everything else comes from GitHub, newest push first.
- The particles land exactly on the real featured cards and fade into them.
- Projects are ordered from the GitHub API at build time. Images stay manual.
- One dark theme. No light mode.

---

## 1. Goal and positioning

**Who:** Xini, a systems engineer. BSc Computer Science (University of Warwick), MSc Artificial Intelligence (University of St Andrews).

**One-line positioning:** a systems-minded engineer who builds complete, self-hosted products with modern AI woven in, across games, tools and client work.

**Three pillars**, which become the three scroll beats:

1. Builds ambitious, complete systems solo, end to end.
2. An AI-systems builder, not just an AI graduate: wires modern AI into real products (agents, MCP servers, local models).
3. Security- and infrastructure-minded: self-hosting, OWASP, Zero Trust, PII redaction.

**What the site is:** a personal showcase and personal mark. It is not a sales page. Client work converts through Xini's consultancy, Saltancy (<https://saltancy.com>), so xini.dev only needs to make clients confident and point them there.

**Audiences**, served equally:

- Clients glancing to check he is credible.
- Recruiters and hiring managers sizing him up.
- Xini himself, as a personal mark.

**The page's job:** the first screen says who he is and what he builds. One scroll journey (or one click on Work) shows the proof: three featured projects, then everything else from GitHub, newest first.

---

## 2. Scope

### In scope

- A single home page at `/` containing the Lattice stage (intro, three beats, featured work), the "More on GitHub" list and a footer with contact details.
- Build-time GitHub data with automatic ordering and a daily refresh.
- Migration of the existing project data and images from the old site.
- A no-WebGL and no-JavaScript layout that still reads well.
- Reduced-motion behaviour.
- SEO, social cards, structured data, a sitemap, a 404 page, and redirects for old URLs.
- Tests (unit, end-to-end, Lighthouse budgets) and repository docs.

### Out of scope for this build

- Blog, CMS, case-study pages. If the old site has project pages, keep them only if the audit shows they carry real traffic or content; otherwise redirect them (see §4).
- A light theme. The site is single-theme and dark by design.
- Sound, internationalisation, comments, newsletter.
- New analytics. Keep whatever the old site uses if it is privacy-friendly; add nothing.

---

## 3. Inputs

1. **The existing repository.** It contains the old xini.dev and already holds all projects (data, images, links). Treat it as a data source, not a design source.
2. **`lattice-prototype.html`.** A single-file prototype using Three.js r186 and GSAP 3.15 from a CDN. It contains the form generators, both shaders, the scroll timeline, the rail, and the card landing. Open it in a browser to see the intended behaviour. Port it into typed modules (Appendix B maps each part); do not ship the file.
3. **This spec**, including the final copy in §6 and the parameter tables in Appendix A.

The human-facing concept review page ("Xini Hero Concepts") exists on claude.ai, but Claude Code cannot open it. Everything needed is in this spec and the prototype.

---

## 4. Phase 0: repository audit (do this first)

Write `docs/AUDIT.md` with these sections. Keep it factual and short.

1. **Stack:** framework and version, language, package manager, build command, output type (static, SSR, ISR), Node version.
2. **Deploy:** hosting provider and project, domains (apex and www), environment variables in use, existing redirects or headers config.
3. **Project data:** where projects are defined (file paths), the schema, how many entries, which have images, live URLs and GitHub repos. List every project in a table: name, current description, image path, links, repo.
4. **Assets:** icon, favicon and logo files; whether the icon can be recoloured cleanly (vector or not); fonts in use; image formats and sizes.
5. **Live URLs:** every route the old site serves (from the router, sitemap or build output). This drives the redirect plan.
6. **Contact and social:** email address, GitHub username, LinkedIn and any other profiles linked on the old site.
7. **Scripts and analytics:** anything third-party loaded on the page.
8. **Old theme inventory:** every file, component and asset belonging to the racing/circuit theme, so it can be deleted.

### Decisions the audit must settle (record in `docs/DECISIONS.md`)

- **Framework.** Keep the existing framework if it supports all of the following: build-time data fetching, code-splitting with dynamic `import()`, a Web Worker, static output or ISR, and self-hosted fonts. If it fails any of these, migrate to **Astro** (static output, one client-side island for the stage, no UI framework needed). Record which and why.
- **Deploy target.** Keep the existing host and domain setup.
- **Refresh mechanism** for GitHub ordering (§10.5), which depends on the framework and host.
- **Icon.** Keep the old icon if it is a clean vector that reads well recoloured to signal green on void (§7). Otherwise use a text mark ("XINI" in Archivo, width 125, weight 800) for the favicon.
- **Old routes.** For each old URL: keep, redirect (301) to `/`, or redirect to an anchor (`/#work`, `/#contact`).

---

## 5. Information architecture

One page, top to bottom:

| Order | Region | Anchor | Notes |
|---|---|---|---|
| 1 | Top bar (fixed) | none | Mark "XINI" links to the top. Nav: Work, About, Saltancy, Contact. |
| 2 | Lattice stage (pinned) | `#top` | Intro, beats 01 to 03, then the finale. |
| 2a | Finale, inside the stage | `#work` | "Featured work" heading and the three featured project cards. |
| 3 | More on GitHub | `#more` | Everything else, newest push first; older projects collapsed. |
| 4 | Footer | `#contact` | Contact details, Saltancy, GitHub, LinkedIn, copyright. |

Navigation behaviour:

| Nav item | With the WebGL stage running | In the no-WebGL layout |
|---|---|---|
| Work | Scrolls to timeline time 6.4 so the featured cards are fully visible (§8.3) | Jumps to `#work` |
| About | Scrolls to timeline time 1.5 (beat 01) | Jumps to the first beat |
| Saltancy | Opens <https://saltancy.com> in a new tab (`rel="noopener"`) | Same |
| Contact | Jumps to `#contact` | Same |

A "Skip to work" link is the first focusable element on the page, visually hidden until focused. It behaves like the Work nav item.

The 404 page uses the same tokens and type, with a short message and a link home. It has no WebGL.

---

## 6. Content (final copy)

All strings below are final unless marked **[confirm]** or **[from audit]**. Keep them in one module (`src/data/site.ts` or equivalent) so copy edits never touch layout code.

Copy rules:

- UK English throughout ("optimise", "colour").
- Sentence case for headings and UI.
- No hype. Banned phrases: "turning imagination into reality", "passionate", "cutting-edge", "innovative solutions", "pixel-perfect", "rockstar", "ninja".
- Every claim must trace to a real project or real experience.
- The three beats describe Xini. They never name a project. Projects appear only in the finale and the GitHub list.
- Write every visible string for a visitor (a client, a recruiter or another engineer), never for me or for whoever maintains the site. No copy about how the site works (APIs, build steps, sorting, refreshes, snapshots, placeholders), no commentary about the page itself, and no insider terms a visitor wouldn't know unless they're explained. Skills I'm claiming, such as MCP, OWASP, Zero Trust and PII redaction, are fine. Visible text includes alt text, aria-labels, visually hidden text, page titles, meta and Open Graph text, structured data, the 404 page, empty and error states, and noscript text.

### 6.1 Metadata

| Field | Value |
|---|---|
| `<title>` | Xini, systems engineer |
| Meta description | Xini builds complete, self-hosted products with modern AI woven in, across games, tools and client work. |
| `lang` | `en-GB` |
| Canonical | `https://xini.dev/` |

### 6.2 Top bar

- Mark: `XINI`
- Nav: `Work`, `About`, `Consultancy` (links to Saltancy), `Contact`
- Skip link: `Skip to work`

### 6.3 Stage

The visually hidden `<h1>` reads: **Xini, systems engineer**

| Beat | Rail label | Step | Heading | Body | Supporting line |
|---|---|---|---|---|---|
| 00 Intro | Xini | none | none | **Statement (large):** I build complete, self-hosted products with modern AI woven in. | MSc Artificial Intelligence, St Andrews. BSc Computer Science, Warwick. Plus the cue: `Scroll` |
| 01 | Systems | 01 | Whole systems, built solo. | I take ambitious ideas all the way to production on my own: real-time 3D, multiplayer backends, data, infrastructure and the interface people actually use. | Full stack, real-time 3D, multiplayer |
| 02 | AI | 02 | AI that does real work. | I build AI into products where it earns its place: agents that act on real systems, MCP servers that give models real tools, and local models when the data should stay put. | Agents, MCP servers, local models |
| 03 | Security | 03 | Secure by default. | I self-host what I build and design for Zero Trust, with OWASP practice and PII redaction there from the first commit. | Self-hosting, OWASP, Zero Trust |
| 04 Finale | Work | 04 | Featured work. | none | none |

### 6.4 Featured projects (finale)

Fixed order. Links only where a real URL exists **[from audit]**; never use placeholder `#` links.

| Order | Title | Summary | Tags (main technologies, from the repo) | Links and credit |
|---|---|---|---|---|
| 1 | Gloam | Self-hosted 3D virtual tabletop for D&D 5e, with shadow-casting light, per-creature line of sight and all 339 spells from D&D's open rules, automated. | TypeScript, React Three Fiber, Colyseus, SQLite, MCP | `Source on GitHub` → <https://github.com/XiniDev/Gloam> |
| 2 | DBridger | Autonomous agent that queries legacy databases in plain English, with PII redaction built in. | Python, PyQt6, Gemini, SQLite, MCP | `Source on GitHub` → <https://github.com/XiniDev/dbridger> |
| 3 | VOETutor | Curated marketplace of vetted IB tutors, with on-demand video lessons and progress tracking. | Next.js, Supabase | `voetutor.com` → <https://voetutor.com>; credit line `Built through Saltancy` |

### 6.5 More on GitHub

- Heading: `More on GitHub`
- Older group summary: `Older projects (N)`, where N is the count.
- Row date format: `Updated Sep 2026` (absolute month and year, never relative, so it cannot go stale between builds).
- Empty state (only when no project data is available): `See all my projects on GitHub.`, linked to the GitHub profile.

### 6.6 Footer

- Heading: `Get in touch`
- Email: **[from audit]**, shown as selectable text with a `mailto:` link.
- Line: `I take on client projects through my consultancy, Saltancy.` with Saltancy linked.
- Links: GitHub, LinkedIn **[from audit]**.
- Copyright: `© 2026 Xini`

### 6.7 404

- Heading: `Page not found`
- Body: `That page doesn't exist any more.` with a link: `Back to xini.dev`

---

## 7. Visual design system

### 7.1 Colour tokens

Define these as CSS custom properties on `:root`. No colour literal may appear anywhere else in CSS or components except the particle colours, which live in the stage config (§8.4).

| Token | Value | Use |
|---|---|---|
| `--void` | `#020806` | Page background, renderer clear colour |
| `--signal` | `#3DFF8F` | Step numbers, active rail line, links, focus ring |
| `--ink` | `#EAFFF2` | Headings, statement, primary text |
| `--body` | `#B7D6C4` | Body copy |
| `--mute` | `#7FA892` | Supporting lines, nav, metadata |
| `--hair` | `rgba(61,255,143,.24)` | Borders and rules |
| `--card` | `rgba(2,8,6,.6)` | Featured card background |
| `--thumb` | `#03100A` | Thumbnail placeholder background |
| `--thumb-dot` | `rgba(61,255,143,.16)` | Placeholder dot pattern (1px dots on a 14px grid) |
| `--scrim` | `rgba(2,8,6,.85)` | Top bar scrim, fading to transparent |
| `--vignette-edge` | `rgba(2,8,6,.82)` | Desktop vignette, radial, at the edges |
| `--vignette-low` | `rgba(2,8,6,.9)` | Phone vignette, behind the bottom-anchored copy |
| `--chip` | `rgba(2,8,6,.72)` | Any small floating label over the canvas |

The old site's base was `#05100d`. The new void is deliberately deeper so the particles carry more contrast.

Measured contrast on `--void`: ink 19.3:1, body 12.9:1, mute 7.6:1, signal 15.3:1. Void text on a signal background is 15.3:1.

`color-scheme: dark` on `:root`. There is no light theme.

### 7.2 Typography

One family: **Archivo** (variable, axes `wdth` 62–125 and `wght` 100–900).

- Self-host the Latin subset as WOFF2 (about 90 KB including both axes, for example from `@fontsource-variable/archivo`). Preload it.
- Use `font-display: swap` and a metric-matched fallback (`size-adjust`, `ascent-override`, `descent-override`, generated with a tool such as Fontaine or Capsize) so the swap causes no layout shift.

| Role | Size | Width | Weight | Other |
|---|---|---|---|---|
| Mark | 15px | 125% | 800 | letter-spacing .04em |
| Nav | 14px | 88% | 450 | colour `--mute`, `--ink` on hover |
| Statement (intro) | clamp(20px, 2vw, 30px) | 100% | 380 | line-height 1.28, max 30ch, `--ink` |
| Credentials line | 14px | 92% | 400 | `--mute` |
| Step number | 13px | 125% | 600 | `--signal`, tabular numbers |
| Beat heading | clamp(34px, 4.5vw, 70px) | 125% | 760 | line-height .98, letter-spacing −.012em, balanced wrapping |
| Beat body | clamp(15px, 1.15vw, 17.5px) | 100% | 400 | line-height 1.58, max 31rem, `--body` |
| Supporting line | 13.5px | 90% | 400 | `--mute` |
| Finale heading | clamp(30px, 3.4vw, 52px) | 125% | 760 | as beat heading |
| Card title | clamp(19px, 1.6vw, 23px) | 125% | 760 | `--ink` |
| Card summary | 14.5px | 100% | 400 | line-height 1.5, `--body` |
| Card tags | 13px | 92% | 400 | `--mute` |
| Card link | 13.5px | 100% | 400 | `--signal`, underlined |
| Section heading (More) | clamp(26px, 2.8vw, 40px) | 125% | 760 | |

Phone overrides (≤ 760px): beat heading clamp(28px, 8.6vw, 40px); beat body 15px; card title 18px; card summary 13.5px; card tags 12.5px; card link 13px.

### 7.3 Layout tokens

- Side gutter: `clamp(16px, 3.2vw, 48px)` (16px on phones).
- Breakpoint: phone layout at `max-width: 760px`. There is one breakpoint; everything else is fluid.
- Short screens: at `max-height: 560px` (landscape phones), hide the supporting lines and use the phone type scale.
- Safe areas: the fixed top bar adds `env(safe-area-inset-top)`; anything anchored to the bottom adds `env(safe-area-inset-bottom)`.

### 7.4 Components

- **Top bar:** fixed, transparent with a scrim from `rgba(2,8,6,.85)` to transparent so text stays readable over particles. Nav links are text only.
- **Rail:** right edge, vertically centred on desktop; top right and compact on phones. A list of five buttons. Each shows its two-digit step and a short dash; the active one shows its label and a longer signal-coloured dash. Labels appear on hover and focus.
- **Beat block:** step number, heading, body, supporting line. No cards or boxes around beats.
- **Featured card:** 1px `--hair` border, `--card` background, 12px padding, no radius. Thumbnail at 16:10 (manual image, or the dotted placeholder), then title, summary, tags and links. On phones the card turns horizontal: an 84px-wide thumbnail on the left, text on the right.
- **GitHub row:** name, description (one line, truncated with an ellipsis), primary language, updated date, separated by `--hair` rules. Rows stack on phones.
- **Focus ring:** 2px `--signal`, 3px offset, on every interactive element.

### 7.5 Icon

If kept (decision in §4): recolour to `--signal` on `--void` and export `favicon.svg`, `apple-touch-icon.png` (180×180) and a 512×512 maskable PNG. If not kept: use the "XINI" text mark.

---

## 8. The Lattice stage

The stage is the hero: a pinned section in which about 18,000 points morph through five forms as the visitor scrolls, then land precisely on the real featured project cards.

### 8.1 Architecture

- **HTML first.** The intro copy is server-rendered and visible at first paint. Every beat, the finale and the cards are real DOM elements. The canvas sits behind them and is `aria-hidden="true"`.
- **Lazy 3D** (new in production; the prototype imports immediately). The stage code (Three.js, GSAP, ScrollTrigger and the stage modules) loads with a dynamic `import()` after first paint: on `requestIdleCallback`, with a fallback timeout of 1,200 ms. Nothing in it blocks first paint.
- **Feature detection.** Before importing, check for WebGL2 (Three.js r163 and later require it). If it is missing, use the no-WebGL layout (§8.11).
- **Forms off the main thread.** Forms 0 to 3 (wordmark, d20, network, padlock) are generated in a Web Worker and transferred as `Float32Array`s. Only the landing form (§8.6) is built on the main thread, because it reads the DOM.
- **Pure modules.** Form generators, the landing maths and the GitHub ordering are pure, typed functions with unit tests.

### 8.2 Layout and pinning

- `.stage` is `STAGE_VH` viewport heights tall. Default: **560vh**, matching the prototype. It is a single config constant (see open question 7 in §19).
- `.pin` is `position: sticky; top: 0; height: 100svh; overflow: hidden`.
- The canvas fills `.pin`. Size the renderer from the canvas's client size, not `window.innerHeight`, so the camera aspect always matches the element on mobile browsers whose toolbars change height.
- **Desktop beat placement:** left gutter, vertically centred, width `min(36rem, 40vw)`. The intro block is anchored to the bottom left (`bottom: max(84px, 9vh)`).
- **Finale placement:** `top: max(92px, 11vh)`, left and right gutters; heading block, then the card row with a gap of `clamp(18px, 3.4vh, 34px)`. Cards are a three-column grid with a 20px gap.
- **Phone placement (≤ 760px):** beats anchored to the bottom (`bottom: calc(76px + safe-area-inset-bottom)`) with 16px side gutters. The finale starts at `top: calc(72px + safe-area-inset-top)`; cards stack in one column with a 10px gap.
- **Vignette:** desktop, a radial gradient darkening the edges; phone, a vertical gradient darkening the lower half behind the copy. The vignette fades to 20% opacity as the landing locks (§8.6) so it does not dim the landing.

### 8.3 Scroll timeline

One GSAP timeline, scrubbed by ScrollTrigger: trigger `.stage`, start `top top`, end `bottom bottom`, `scrub: 1` (`scrub: true` under reduced motion). Time is in timeline units; the total is **6.65**.

| Time | What happens |
|---|---|
| 0.00–0.50 | Hold on the wordmark (intro). |
| 0.50–1.50 | Morph 0→1, wordmark to d20. Shift the form right (desktop only). Camera distance 9.2→7.6; tilt (group rotation x) 0→0.36. |
| 0.50–0.80 | Intro copy out: fade, y 0→−36px, `power1.in`. |
| 1.12–1.47 | Beat 01 in: fade, y 36→0, `power2.out`. |
| 2.00–3.00 | Morph 1→2, d20 to network. Distance →8.1; tilt →0.24. |
| 2.00–2.30 | Beat 01 out. |
| 2.62–2.97 | Beat 02 in. |
| 3.50–4.50 | Morph 2→3, network to padlock. Distance →7.8; tilt →0.10. |
| 3.50–3.80 | Beat 02 out. |
| 4.12–4.47 | Beat 03 in. |
| 5.00–6.00 | Morph 3→4, padlock to the card landing. Shift →0; distance →9.0 (`FINAL_DIST`); tilt →0; **lock** 0→1. |
| 5.00–5.30 | Beat 03 out. |
| 5.62–5.97 | Finale heading in. |
| 6.00–6.35 | **Crossfade:** particle alpha falls to 28% of its base; the featured cards fade from 0 to 1. |
| 6.35–6.65 | Hold, then the pin releases and the page scrolls on to More on GitHub. |

- Morph tweens use `power2.inOut` (`steps(1)` under reduced motion).
- **Jump targets** for the rail and nav: `[0, 1.5, 3.0, 4.5, 6.4]`. Scroll position = `start + (end − start) × target / 6.65`, plus 2px.
- **Hiding inactive beats:** use opacity and `pointer-events: none` only. Do not use `visibility: hidden` or `display: none`, so every beat stays in the accessibility tree (§13). This deliberately differs from the prototype, which uses GSAP's `autoAlpha`.

### 8.4 Particle system

| Parameter | Desktop | Low power |
|---|---|---|
| Points (`N`) | 18,000 | 9,000 |
| Device pixel ratio cap | 1.5 | 1.25 |
| Point size (`uSize`) | 34 | 33 |
| Alpha multiplier (`uAlpha`) | 0.9 | 1.25 |
| Dust points | 1,200 | 500 |

**Low power** means a viewport width ≤ 760px or `navigator.hardwareConcurrency ≤ 4`.

Geometry attributes, one `BufferGeometry` drawn as `Points`:

- `position`: form 0 (wordmark); `aB`, `aC`, `aD`: forms 1 to 3; `aE`: form 4 (the landing, rebuilt at runtime).
- `aStart`: each point's start position for the intro, a random direction at radius 7 to 13.
- `aRand`: four uniform random values per point.

Material: `ShaderMaterial`, additive blending, `transparent: true`, `depthWrite: false`, `frustumCulled = false` on the points object. The renderer uses `antialias: false`, `powerPreference: 'high-performance'` and clear colour `#020806`.

Particle colours (stage config, not CSS): base `#33FF85` (0.20, 1.00, 0.52), hot core `#E0FFED` (0.88, 1.00, 0.93), dust `#40F299` (0.25, 0.95, 0.60).

The vertex and fragment shader maths is in Appendix A.

**Randomness is deterministic.** Use the prototype's mulberry32 generator, seeded with `20261002`, plus a Box–Muller Gaussian, so every visitor sees the same forms.

**Coherent ordering.** Before upload, reorder every form by the key `x + 0.45·y + g`, ascending, where `g` is Gaussian noise with standard deviation 0.35 (`gauss() × 0.35` in the prototype). Because each form is ordered the same way, a point travels a short distance between forms instead of crossing the scene.

### 8.5 The five forms

Exact coordinates and sampling functions are in the prototype (`wordmark`, `d20`, `network`, `padlock`, `cardsFromDOM`). Port them unchanged; the table summarises them.

| # | Form | Meaning | Construction | Point split |
|---|---|---|---|---|
| 0 | XINI wordmark | The name | Four letters drawn from straight-edged polygons only (X, I, N, I) on a 5-unit cap height, scaled by 0.54 and centred | 56% along edges (jitter 0.0055, z 0.06), 44% filling the letters (z jitter 0.09) |
| 1 | d20 (icosahedron) | Whole systems, built solo | 12 vertices from the golden ratio, circumradius 1.5; 30 edges, 20 faces | 66% edges (jitter 0.007), 8% vertex clusters (σ 0.035), 26% faces (jitter 0.012) |
| 2 | Neural network | AI that does real work | Four layers at x = −1.95, −0.65, 0.65, 1.95 with 5, 8, 8, 4 nodes on rings of radius 0.95, 1.4, 1.4, 0.72; every node joined to every node in the next layer | 70% edges (jitter 0.004), 30% node clusters (σ 0.05) |
| 3 | Padlock | Secure by default | Box body 2.2 × 1.55 × 0.7 centred at y −0.5; shackle legs rise 0.42 above the body to a semicircular arc of radius 0.62 (apex 1.04 above the body), drawn as a tube of radius 0.1; keyhole on the front face | 36% body edges, 12% front face, 40% shackle tube, 12% keyhole |
| 4 | Featured cards | Featured work | Read from the real DOM cards (§8.6) | 40% card and thumbnail edges, 22% thumbnail fill, 38% text lines |

Per-form framing ("fit" scale and vertical "lift"), where `visW` is the visible width at the current camera distance:

| Form | Desktop fit | Desktop lift | Phone fit | Phone lift |
|---|---|---|---|---|
| 0 | visW × 0.70 / 6.4 | 0.50 | visW × 0.86 / 6.4 | 0.80 |
| 1 | visW × 0.36 / 3.6 | 0.05 | visW × 0.74 / 3.6 | 0.95 |
| 2 | visW × 0.34 / 4.4 | 0.05 | visW × 0.74 / 4.4 | 0.95 |
| 3 | visW × 0.34 / 3.4 | 0.05 | visW × 0.70 / 3.4 | 0.95 |
| 4 | 1 (exact) | 0 | 1 (exact) | 0 |

Scale and lift interpolate between neighbouring forms with smoothstep on the fractional morph. The scale is capped at 1.15. On desktop, the group shifts right by `shift × min(halfVisW × 0.3, 2.0)` during beats 01 to 03 so the form sits opposite the copy.

### 8.6 The landing (signature moment)

At the end of the scroll, the particles form three cards that sit exactly on top of the real featured cards, and then fade into them. Treat this as the most important moment on the page.

**How it works:**

1. While `lock` rises from 0 to 1 (timeline 5.0–6.0), everything that could offset the final form settles to identity: camera orbit, camera height (0.15 → 0), pointer tilt and pointer repulsion all scale by `(1 − lock)`. The tilt keyframe ends at 0. Group rotation y reaches 4 × π/2 = 2π. Fit is 1 and lift is 0.
2. At `lock = 1`, the camera sits at (0, 0, `FINAL_DIST` = 9.0) looking at the origin, with a 35° vertical field of view. The group transform is identity.
3. The landing form is built from the DOM by mapping screen rectangles onto the z = 0 plane:

   ```text
   hh = FINAL_DIST × tan(35° / 2)      // half visible height at z = 0
   hw = hh × (pinWidth / pinHeight)    // half visible width
   worldX = ((screenX − pinLeft) / pinWidth  × 2 − 1) × hw
   worldY = −((screenY − pinTop) / pinHeight × 2 − 1) × hh
   ```

   Measure every rectangle relative to `.pin`'s bounding box, at the same moment.
4. **What gets sampled, per card:**
   - The four edges of the card's border box (40% of points across all edges, jitter 0.0035, z jitter 0.008).
   - The four edges of the thumbnail, plus a uniform fill inside it (22% of points).
   - Every text line of the title, summary, tags and link. Use `Range.getClientRects()` on each element's contents to get one rectangle per rendered line, skipping rectangles narrower than 3px. Sample points along each line, with a vertical spread of ±34% of the line height for titles and ±22% for other text. Weight titles 2.2× so they read as bold (38% of points across all lines).
5. Apply the coherent ordering (§8.4), write the result into `aE` and set `needsUpdate`.
6. **Rebuild the landing** when fonts finish loading (`document.fonts.ready`), on resize (debounced 120 ms), on orientation change, and whenever the featured content changes. Card copy can change freely; the landing follows the DOM, so no code changes are needed.
7. **Crossfade (6.0–6.35):** particle alpha falls to 28% of base and the cards fade in. The faint particle outlines stay as a glow on the card borders.
8. **Rail and vignette:** the rail's opacity is `1 − lock`; it stops taking pointer events once lock > 0.5 and becomes `visibility: hidden` once lock > 0.98. The vignette's opacity is `1 − 0.8 × lock`.

### 8.7 Intro sequence

- On load, points fly from `aStart` into the wordmark over 2.5 s (`power3.out`, 150 ms delay). Each point waits by a stagger of `aRand.x × 0.45` (normalised over 0.55).
- The intro copy (statement, credentials line, cue) fades in from y 22px over 0.9 s, staggered 0.09 s, starting at 1.0 s.
- New in production (the prototype always plays the fly-in): if the stage code arrives after the visitor has already scrolled past time 0.5, skip the fly-in (set intro to 1) and render the current beat directly.
- The `Scroll` cue animates a short signal-coloured line along a hairline, looping every 2.4 s. It stops under reduced motion.

### 8.8 Pointer interaction (desktop)

- Raycast the pointer onto the z = 0 plane and convert it into group space.
- **Repulsion:** within a radius of 1.0, push points outward by 0.38 in x and y and 0.25 in z, scaled by `smoothstep(1, 0, distance)`.
- **Tilt:** group rotation y += 0.1 × pointer x; rotation x −= 0.06 × pointer y.
- Pointer influence stays active for 1.4 s after the last move and eases in and out at 6% per frame.
- Disabled under reduced motion, during lock, and on touch: only react to `pointermove` events whose `pointerType` is `mouse` or `pen`, so touch scrolling never fights the particles. The prototype has no such check; add it.

### 8.9 Rail and navigation

- Markup: an `<ol aria-label="Sections">` of five `<button>` elements. Each button's accessible name includes its label, for example "Systems, section 01".
- `aria-current="step"` marks the active beat, computed as the nearest whole morph value (0 to 4).
- Clicking scrolls to the beat's jump target with smooth scrolling (instant under reduced motion).
- The Work and About nav links and the skip link use the same jump function.
- **Focus into the finale:** if keyboard focus lands on any element inside the finale before the timeline reaches 6.0 (for example, tabbing to the VOETutor link), jump straight to 6.4 so the focused element is visible.

### 8.10 Reduced motion

When `prefers-reduced-motion: reduce` matches:

- No fly-in; the wordmark is in place immediately.
- Morphs switch instantly (`steps(1)`) instead of travelling, and so do the camera distance, tilt and sideways shift that accompany them. Nothing zooms or pans continuously.
- No time-based noise, no turbulence during morphs, no camera orbit, no pointer effects, no cue animation, and no network pulses.
- Beat copy still changes at the same scroll positions. It fades without sliding.
- The landing still happens. The crossfade stays tied to scroll position, with no scrub smoothing.
- Rail and nav jumps are instant.

This is stricter than the prototype, which only switches the morphs and the final lock to `steps(1)`, still slides the copy by 36px, keeps easing the camera between beats, and freezes the network pulses rather than removing them. Build the stricter version.

### 8.11 Fallbacks

Use the no-WebGL layout when WebGL2 is unavailable, when the stage module fails to load, when JavaScript is off, or when the WebGL context is lost and cannot be restored.

No-WebGL layout:

- The stage loses its pinned height; beats flow as normal sections, one after another, with generous spacing.
- The finale heading and the featured cards display as a normal grid, fully visible.
- The canvas, rail and vignette are hidden. (The prototype leaves the vignette visible in this layout, which darkens it; hide it.)
- The CSS default (before the `js` class is added by an inline script in `<head>`) is this layout, so no-JavaScript visitors get it automatically.

On `webglcontextlost`: stop the loop, call `preventDefault()`, and switch to the no-WebGL layout while keeping the visitor's reading position. On `webglcontextrestored`: rebuild the stage if possible; otherwise stay in the fallback.

### 8.12 Render loop and lifecycle

- `requestAnimationFrame` runs only while the stage intersects the viewport (`IntersectionObserver`) **and** the document is visible (`visibilitychange`). Otherwise the loop stops entirely; no idle frames.
- On resize: update the renderer size from the canvas's client size, the camera aspect, and the landing (debounced).
- If the framework is a single-page app, dispose of the geometry, materials, renderer, ScrollTrigger instances and observers when the stage unmounts.
- **Debug readout:** the prototype shows points, fps and pixel ratio in the corner. In production this appears only with `?hud` in the URL.

---

## 9. Featured projects

- Exactly three, in this order: **Gloam, DBridger, VOETutor**. The order is set by a `featured` field (1 to 3) in the project data, not by GitHub activity.
- Card anatomy and copy are in §6.4 and §7.4.
- **Images:** manual, from the existing repo where they exist. Crop to 16:10. Serve AVIF or WebP at 480, 800 and 1200px widths with `srcset` and `sizes`, explicit width and height, and alt text that describes the screenshot. Budget: 80 KB or less per image at 800px.
- **Loading:** the cards sit at the end of the stage, so lazy-load the images, but start loading them when the timeline passes beat 03 (time 4.5) so they are ready before the crossfade.
- **Missing image:** show the dotted placeholder (§7.1). It must never look broken.
- Links come only from the audit. VOETutor links to <https://voetutor.com>.

---

## 10. More on GitHub and automatic ordering

### 10.1 Data source

At build time, call `GET https://api.github.com/users/{GITHUB_USERNAME}/repos?type=owner&sort=pushed&per_page=100`, following pagination.

- Send `Authorization: Bearer ${GITHUB_TOKEN}` when the variable is set (raises the rate limit from 60 to 5,000 requests an hour). The token needs read access to public repository metadata only.
- Fields used: `name`, `full_name`, `description`, `html_url`, `homepage`, `language`, `topics`, `pushed_at`, `archived`, `fork`.
- Order by **`pushed_at`**, not `updated_at`; `updated_at` changes when someone stars a repo.

### 10.2 Merging with curated project data

Migrate the old site's projects into one typed module, for example:

```ts
export type Project = {
  slug: string;            // 'gloam'
  name: string;            // 'Gloam'
  summary: string;         // one sentence
  tags: string[];
  repo?: string;           // 'owner/name', joins to GitHub data
  url?: string;            // live site
  image?: { src: string; alt: string };
  featured?: 1 | 2 | 3;    // finale order
  hidden?: boolean;        // never listed
  updated?: string;        // 'YYYY-MM', for projects with no repo
};
```

Merge rules:

1. A repo that matches a project's `repo` field uses the project's curated name, summary, link and image, with GitHub's `pushed_at` and `language`.
2. A repo with no matching project uses GitHub's name, description and homepage.
3. A project with no repo appears in the list only if it has `updated`, which is used as its date.
4. Featured projects never appear again in the list.
5. Forks, `hidden` projects and any repo named in `config.hiddenRepos` are excluded.

### 10.3 Ordering

Write this as a pure function with unit tests:

```ts
orderProjects(items, { now, legacyMonths = 24 }): { recent: Item[]; older: Item[] }
```

- `recent`: items that are not archived and were pushed within `legacyMonths`, newest first.
- `older`: archived items and anything older than `legacyMonths`, newest first, shown below `recent` inside a closed `<details>` element labelled `Older projects (N)`.
- Ties break alphabetically by name.

### 10.4 Display

- Show up to 12 items in `recent`; if there are more, the rest go at the top of `older`.
- Row: name (linked to the homepage if present, otherwise the repo), one-line description, primary language, `Updated Mon YYYY`.
- The grey skeleton rows from the prototype are a design placeholder only. Production shows real rows, or the empty state from §6.5.

### 10.5 Resilience and refresh

- The build **never fails** because of GitHub. If the API errors or rate-limits, use the committed snapshot `src/data/github-snapshot.json` and log a warning with the reason.
- `npm run snapshot:github` refreshes the snapshot locally. Commit it whenever the list changes meaningfully.
- **Daily refresh**, decided in the audit:
  - If the framework supports incremental regeneration (for example Next.js), revalidate the home page every 86,400 seconds.
  - Otherwise, trigger a rebuild once a day with a scheduled GitHub Actions workflow (03:00 UTC) that calls the host's deploy hook, stored as a repository secret.
- Log the number of repos fetched, included, recent and older on every build.

---

## 11. Responsive behaviour

Test at these sizes: 320×568, 360×740, 390×844, 430×932, 768×1024, 1024×768, 1280×720, 1440×900, 1920×1080, 2560×1440, and landscape phone 844×390.

- **Phones (≤ 760px):** the copy sits at the bottom of the screen and the form sits above it. The rail is compact at the top right with labels hidden. The cards are horizontal and stacked. The nav shows Work and Saltancy only (About and Contact stay reachable from the rail and the footer).
- **Tablet and laptop:** the desktop layout. At 1024px wide the beat column (40vw) must still leave the form clear of the copy.
- **Large screens (≥ 1920px):** beat copy keeps its maximum widths; the form scales with the viewport; the card row is capped at 1,600px and centred.
- **Short screens (≤ 560px tall):** supporting lines are hidden and the phone type scale applies, so no copy is clipped.
- The page never scrolls sideways at any width.

---

## 12. Performance budgets

Measured from the prototype: Three.js tree-shaken to the classes the stage uses is about 134 KB gzipped; GSAP is 28 KB and ScrollTrigger 18 KB gzipped; Archivo (Latin, both axes) is about 90 KB as WOFF2.

| Budget | Limit |
|---|---|
| HTML + CSS + JS needed for first paint (excluding fonts, images and the lazy stage chunk) | ≤ 60 KB gzipped in total; JS ≤ 30 KB, CSS ≤ 20 KB |
| Lazy stage chunk (Three.js, GSAP, ScrollTrigger, stage code, worker) | ≤ 200 KB gzipped |
| Font | ≤ 95 KB, one file, preloaded |
| Featured images | ≤ 80 KB each at 800px wide |
| Lighthouse, mobile (median of 3 runs) | Performance ≥ 90, Accessibility 100, Best Practices ≥ 95, SEO 100 |
| Largest Contentful Paint (Lighthouse mobile) | ≤ 2.5 s |
| Cumulative Layout Shift | ≤ 0.02 |
| Total Blocking Time (Lighthouse mobile) | ≤ 200 ms |
| Main-thread long tasks after first paint | None over 50 ms, including stage start-up |
| Frame rate through the whole stage scroll | Median ≥ 55 fps on a desktop with integrated graphics (for example an Apple M1 or Intel Iris Xe); median ≥ 50 fps on a mid-range phone (for example a Pixel 7a or iPhone 12) |
| Idle cost | Zero animation frames while the stage is off screen or the tab is hidden |

Import Three.js classes by name so the bundler can tree-shake it. Do not load any library from a CDN in production; bundle everything.

---

## 13. Accessibility

Target: WCAG 2.2 AA.

- **Structure:** `header`, `nav`, `main`, `footer` landmarks; exactly one `h1` (the visually hidden "Xini, systems engineer"); beat headings are `h2`; card titles are `h3`.
- **Everything readable is in the DOM.** Inactive beats are hidden with opacity only (§8.3), so screen reader users can read every beat in order.
- **Keyboard:** the skip link comes first; all interactive elements are reachable in a logical order; the focus ring is visible everywhere; focus moving into the finale jumps the timeline (§8.9).
- **Touch targets:** at least 44×44px on phones, including the compact rail buttons (extend their hit area with padding).
- **Motion:** reduced motion behaves as described in §8.10.
- **Contrast:** every text token passes 4.5:1 on `--void` (lowest is `--mute` at 7.6:1).
- **Canvas:** `aria-hidden="true"`, with no information that exists only in the canvas.
- **Links:** external links open in a new tab and say so to assistive technology (for example visually hidden text "(opens in a new tab)").

---

## 14. SEO, metadata and sharing

- Title, description, canonical and `lang` as in §6.1.
- Open Graph and Twitter card tags: title, description, URL and image.
- **Social image:** `og.png` at 1200×630 showing the XINI wordmark in particles on `--void`. Produce it with a Playwright script (`scripts/og.ts`) that renders the intro frame at 1200×630 once the fly-in completes, and commit the result.
- **Structured data:** JSON-LD `Person` with `name` "Xini", `url` `https://xini.dev`, `jobTitle` "Systems engineer", `alumniOf` (University of Warwick, University of St Andrews), `worksFor` (Organization "Saltancy", <https://saltancy.com>) and `sameAs` (GitHub, LinkedIn, from the audit).
- `sitemap.xml` and `robots.txt`.
- 301 redirects for every retired old URL (§4).
- The page reads completely with JavaScript off.

---

## 15. Tech stack and code structure

- **Language:** TypeScript in strict mode.
- **Runtime dependencies:** `three` (^0.186) and `gsap` (^3.15, which includes ScrollTrigger). Nothing else at runtime.
- **Framework:** as decided in §4 (keep the existing one if it qualifies; otherwise Astro).
- **Testing:** Vitest for units, Playwright for end-to-end and screenshots, Lighthouse CI for budgets, axe-core for accessibility.

Suggested layout (adapt names to the framework):

```text
src/
  lattice/
    index.ts          // boot: WebGL2 check, lazy import, fallback switch
    config.ts         // every constant in Appendix A
    stage.ts          // renderer, camera, group, loop, visibility, resize, dispose
    timeline.ts       // GSAP timeline, beats, rail, nav jumps, focus handling
    landing.ts        // DOM → world mapping and the card form
    worker.ts         // builds forms 0–3 off the main thread
    forms/
      rng.ts          // mulberry32 and gaussian
      sample.ts       // fillSegments, fillPolys, fillTriangles, fillClusters, coherent
      wordmark.ts
      d20.ts
      network.ts
      padlock.ts
    shaders/
      points.vert.glsl
      points.frag.glsl
      dust.vert.glsl
      dust.frag.glsl
  data/
    site.ts           // all copy from §6
    projects.ts       // migrated, curated project data
    github-snapshot.json
  lib/
    github.ts         // fetch, merge, orderProjects (pure functions tested)
  components/         // TopBar, Stage, Finale, FeaturedCard, MoreOnGitHub, Footer
scripts/
  snapshot-github.ts
  og.ts
docs/
  reference/lattice-prototype.html
  AUDIT.md
  DECISIONS.md
  CHECKLIST.md
  qa/                 // screenshots from §16
tests/
  unit/
  e2e/
```

Environment variables (document them in the README):

| Variable | Required | Purpose |
|---|---|---|
| `GITHUB_USERNAME` | Yes | Whose repositories to list |
| `GITHUB_TOKEN` | No | Higher API rate limit at build time |
| `DEPLOY_HOOK_URL` | Only for scheduled rebuilds | Stored as a CI secret, never in the repo |

---

## 16. Testing and QA

### 16.1 Unit tests (Vitest)

- `rng`: the same seed gives the same sequence.
- Each form generator: returns exactly `N × 3` finite values within the expected bounding box.
- `coherent`: returns a permutation of the input (same multiset of points).
- `landing` mapping: a rectangle mapped to world space and projected back with the final camera lands within 0.5px of where it started.
- `orderProjects` and the merge: newest first; archived and old items in `older`; ties alphabetical; featured not repeated; hidden and forks excluded; projects without a repo included only with `updated`; pagination merged; snapshot used when the fetch throws.

### 16.2 End-to-end tests (Playwright)

Run at 390×844, 768×1024 and 1440×900, in Chromium and WebKit:

1. No console errors or warnings on load or through a full scroll.
2. No horizontal overflow (`scrollWidth ≤ innerWidth`) at every size in §11.
3. At each jump target, the expected beat is the most visible copy block and the rail marks it as current.
4. The Work nav link brings the featured cards fully into view with opacity 1.
5. Reduced-motion mode: no fly-in, copy changes at the same positions, no animation frames after scrolling stops.
6. No-WebGL mode (block the stage chunk): every beat and all three cards are visible in normal flow.
7. Keyboard: the skip link works; tabbing reaches every link and button with a visible focus ring; tabbing to the VOETutor link jumps to the finale.
8. **Landing alignment:** in test builds only, expose `window.__lattice.projectLanding()`, which projects the landing points to screen space using the live camera and the points object's world matrix after jumping to time 6.65. For each card, at least 95% of edge points must lie within 2px of the card's or thumbnail's border lines, and every text line's points must sit inside that line's rectangle expanded by 3px. Run at 1440×900 and 390×844, and again after resizing from 1440×900 to 1280×720.
9. **Screenshots:** capture times 0, 1.75, 3.25, 4.75, 6.05 and 6.65 at the three sizes into `docs/qa/` for review against the prototype.

### 16.3 Budgets and accessibility

- Lighthouse CI with the budgets in §12, run against the production build.
- axe-core with no serious or critical violations, in the default, reduced-motion and no-WebGL modes.

### 16.4 Manual device pass

Before launch, scroll the whole page on: an iPhone in Safari, a mid-range Android phone in Chrome, macOS in Safari and Chrome, and Windows in Chrome or Edge, plus Firefox on any desktop. Record the median fps from a performance trace on the phone and the desktop in `docs/CHECKLIST.md`.

---

## 17. Success criteria

Copy this table into `docs/CHECKLIST.md`. Each criterion has a single, observable pass condition.

### A. Content and positioning

| ID | Criterion | Verify by |
|---|---|---|
| A1 | At 1440×900 and 390×844, the first screen shows the XINI wordmark, the statement and the credentials line without scrolling. | Screenshot at time 0 |
| A2 | Beats 01–03 never mention a project: their text contains none of "Gloam", "DBridger" or "VOETutor". | E2E text assertion |
| A3 | The finale shows exactly Gloam, DBridger and VOETutor, in that order, with the copy from §6.4. | E2E text assertion |
| A4 | All copy matches §6 word for word; no copy from the old site remains, and no banned phrase appears anywhere. | Diff against `site.ts`; grep the build output |
| A5 | UK English spelling throughout. | Review |
| A6 | Saltancy is linked from the nav and the footer, opening in a new tab with `rel="noopener"`. | E2E |
| A7 | No link in production points to `#`, a placeholder or a dead URL. | Link checker over the build output |

### B. Visual fidelity

| ID | Criterion | Verify by |
|---|---|---|
| B1 | All colours come from the tokens in §7.1 (plus the particle colours in the stage config); no other colour literals exist. | Grep CSS and components |
| B2 | Archivo is self-hosted and both axes work: beat headings render at width 125 and weight 760. | Computed styles and a visual check |
| B3 | Each beat at 1440×900 and 390×844 matches the prototype's composition: copy placement, form placement and scale, rail position. | Xini signs off the `docs/qa/` screenshots |
| B4 | No racing or circuit asset, component or style remains in the repository. | Grep against the audit inventory |
| B5 | The favicon set (SVG, 180px, 512px maskable) uses the decided icon in signal on void. | Inspect the build output |

### C. Motion and interaction

| ID | Criterion | Verify by |
|---|---|---|
| C1 | Beat changes, morphs and the crossfade happen at the timeline times in §8.3 (within ±0.05 units). | E2E at sampled scroll positions |
| C2 | Scrolling backwards reverses every morph and copy change exactly. | Manual and E2E |
| C3 | The rail marks the current beat, shows its label, and jumps to the correct target when clicked. | E2E |
| C4 | Work, About and the skip link jump to their targets; Work leaves the cards fully visible. | E2E |
| C5 | Pointer repulsion and tilt work on desktop and are off during lock, under reduced motion and on touch. | Manual |
| C6 | Network pulses appear only while the network is on screen. | Manual |
| C7 | The fly-in plays once on a fresh load at the top, and is skipped when the stage loads mid-page or under reduced motion. | Manual and E2E |

### D. The landing

| ID | Criterion | Verify by |
|---|---|---|
| D1 | At time 6.65, at least 95% of each card's edge particles lie within 2px of its card or thumbnail borders, at 1440×900 and 390×844. | E2E test 8 |
| D2 | Every title and text line's particles sit inside that line's rectangle expanded by 3px. | E2E test 8 |
| D3 | After the crossfade, the cards are at full opacity, the particles at 28% of base, and there is no visible jump or misalignment. | Screenshot at 6.65 and manual review |
| D4 | The landing realigns within 200 ms of a resize, an orientation change and the font load. | E2E test 8 (resize case) and manual rotation |
| D5 | Changing a card's summary in `projects.ts` realigns the landing with no other code change. | Edit, rebuild and rerun test 8 |

### E. Projects and GitHub ordering

| ID | Criterion | Verify by |
|---|---|---|
| E1 | The build lists repositories for `GITHUB_USERNAME`, ordered by `pushed_at` (newest first), with archived and stale items under "Older projects". | Unit tests and build output |
| E2 | Featured projects, forks and hidden repos never appear in the list. | Unit tests |
| E3 | The build succeeds with GitHub unreachable, uses the snapshot and logs a warning. | Run the build with the network blocked |
| E4 | The daily refresh is configured and documented, and has run successfully at least once. | CI or host logs |
| E5 | Each row shows name, description, language and "Updated Mon YYYY". | E2E |
| E6 | Every project from the old site is migrated into `projects.ts` with its image where one exists; missing images show the placeholder. | Compare with the audit table |

### F. Performance

| ID | Criterion | Verify by |
|---|---|---|
| F1 | Lighthouse mobile medians: Performance ≥ 90, Accessibility 100, Best Practices ≥ 95, SEO 100. | Lighthouse CI |
| F2 | LCP ≤ 2.5 s, CLS ≤ 0.02, TBT ≤ 200 ms (Lighthouse mobile). | Lighthouse CI |
| F3 | First-paint JS ≤ 30 KB gz, CSS ≤ 20 KB gz, stage chunk ≤ 200 KB gz, font ≤ 95 KB. | Build size report |
| F4 | The stage chunk requests start after First Contentful Paint. | Network waterfall |
| F5 | No main-thread task over 50 ms after first paint, including stage start-up. | Performance trace |
| F6 | Median ≥ 55 fps on the desktop reference and ≥ 50 fps on the phone reference, scrolling the whole stage. | Performance traces recorded in the checklist |
| F7 | No animation frames run while the stage is off screen or the tab is hidden. | Performance trace |
| F8 | Point counts and pixel-ratio caps match §8.4 on desktop and low-power devices. | `?hud` readout |

### G. Accessibility

| ID | Criterion | Verify by |
|---|---|---|
| G1 | axe-core finds no serious or critical issues in the default, reduced-motion and no-WebGL modes. | Automated |
| G2 | Every interactive element is reachable by keyboard with a visible focus ring; the skip link works; focus into the finale jumps to it. | E2E test 7 |
| G3 | A screen reader reads all beat copy in order, including inactive beats. | VoiceOver or NVDA pass |
| G4 | Reduced motion behaves exactly as §8.10 describes. | E2E test 5 and manual |
| G5 | All text meets 4.5:1 contrast. | Automated plus the table in §7.1 |
| G6 | Touch targets on phones are at least 44×44px. | Manual measurement |

### H. Resilience

| ID | Criterion | Verify by |
|---|---|---|
| H1 | With JavaScript off, or with the stage chunk blocked, all content is readable in normal flow with no blank areas. | E2E test 6 and a no-JS check |
| H2 | WebGL context loss switches to the fallback layout without errors. | Force `WEBGL_lose_context` in a test |
| H3 | No console errors or warnings in Chrome, Safari and Firefox. | E2E test 1 and the manual pass |
| H4 | No horizontal scrolling at any width from 320 to 2560px. | E2E test 2 |
| H5 | At 844×390 (landscape phone) no copy is clipped. | Screenshot |

### I. SEO and sharing

| ID | Criterion | Verify by |
|---|---|---|
| I1 | Title, description, canonical, Open Graph, Twitter and JSON-LD tags are present and validate. | Validators |
| I2 | `og.png` is 1200×630 and shows the particle wordmark. | Inspect |
| I3 | `sitemap.xml` and `robots.txt` exist; every retired old URL returns 301 to its decided target. | `curl -I` each old URL |
| I4 | The 404 page uses the site's tokens and type and links home. | Visit an unknown URL |

### J. Code quality and documentation

| ID | Criterion | Verify by |
|---|---|---|
| J1 | TypeScript strict mode, with no `any` in `src/lattice` or `src/lib`. | `tsc --noEmit` and grep |
| J2 | Every tunable number from Appendix A lives in `lattice/config.ts`. | Review |
| J3 | Unit and E2E suites pass in CI. | CI |
| J4 | The README covers local development, build, environment variables, how to edit copy and projects, and how ordering and refresh work. | Review |
| J5 | `docs/AUDIT.md`, `docs/DECISIONS.md` and `docs/CHECKLIST.md` exist and are complete. | Review |

### K. Deployment

| ID | Criterion | Verify by |
|---|---|---|
| K1 | Production serves <https://xini.dev> with the existing domain setup (www behaviour as decided in the audit). | Visit both hosts |
| K2 | Production environment variables are set, and the first production build fetched GitHub successfully. | Build log |
| K3 | The E2E smoke tests (1, 2, 4 and 6) pass against the production URL. | CI against production |

**Definition of done:** every ID in A to K is ticked in `docs/CHECKLIST.md` with its evidence, and Xini has signed off B3 and D3.

---

## 18. Build order (about one day)

| Milestone | Work | Time | Criteria it closes |
|---|---|---|---|
| M0 | Audit, decisions, checklist created | 45 min | J5 (partly) |
| M1 | Scaffold or clean up; tokens; fonts; top bar; static stage markup with all copy; the no-WebGL layout; footer; 404 | 1.5 h | A1, A4–A6, B1, B2, H1, I4 |
| M2 | Project migration, GitHub fetch, merge, ordering, snapshot, More on GitHub section, unit tests | 1.5 h | A7, E1–E3, E5, E6 |
| M3 | Port the stage: forms in a worker, shaders, renderer, timeline, rail and nav jumps, intro, pointer, render-loop lifecycle | 2.5 h | C1–C7, F7, F8 |
| M4 | Landing: DOM mapping, lock, crossfade, rebuild triggers, alignment test | 1 h | D1–D5 |
| M5 | Accessibility, reduced motion, context loss, focus handling | 1 h | G1–G6, H2 |
| M6 | Performance pass, size report, Lighthouse CI | 45 min | F1–F6 |
| M7 | SEO, social image, structured data, sitemap, redirects | 45 min | I1–I3 |
| M8 | QA matrix, screenshots, device pass, deploy, refresh job | 1 h | B3–B5, H3–H5, E4, K1–K3, J1–J4 |

Total: about 10.5 hours.

---

## 19. Open questions for Xini

Answer these before M2 if possible. Until then, the builder uses the default shown.

1. **GitHub username** for the More on GitHub list. *Default: the one linked on the old site.*
2. **VOETutor:** your own product or client work through Saltancy? Should the card credit Saltancy? Is the summary right? *Default: the §6.4 copy, no credit line.*
3. **Links for Gloam and DBridger:** public repos, demos or write-ups? *Default: no links, which is allowed.*
4. **Footer contact:** which email address and profiles? *Default: those on the old site.*
5. **Icon:** keep the old one? *Default: keep it if it recolours cleanly.*
6. **Featured images:** which screenshots? *Default: existing project images, else the placeholder.*
7. **Scroll length:** keep 560vh from the prototype, or shorten so the featured work arrives sooner (420vh would cut about 1.4 screens of scrolling)? *Default: 560vh.*
8. **Analytics:** keep what the old site has? *Default: keep it only if it is cookieless.*
9. **Debug readout:** show the points and fps counter publicly as a technical touch, or only with `?hud`? *Default: `?hud` only.*

---

## Appendix A. Motion and shader parameters (from the prototype)

All of these belong in `lattice/config.ts`.

### A.1 Camera, group and scene

| Parameter | Value |
|---|---|
| Camera | Perspective, vertical FOV 35°, near 0.1, far 100 |
| Camera position | (sin(o) × D, 0.15 × free, cos(o) × D), looking at the origin |
| Orbit `o` | sin(0.07 × t) × 0.12 × free |
| `free` | 1 − lock |
| Distance `D` keyframes | 9.2 → 7.6 → 8.1 → 7.8 → 9.0 (`FINAL_DIST`) |
| Group rotation y | morph × π/2 + 0.5 × sin(0.3 × t) × presence + 0.1 × pointerX × pointerActive × free |
| Group rotation x | tilt − 0.06 × pointerY × pointerActive × free |
| Tilt keyframes | 0 → 0.36 → 0.24 → 0.10 → 0 |
| `presence` | clamp(morph, 0, 1) × clamp(4 − morph, 0, 1) |
| Dust | Box x ±15, y ±9, z −2 to −16; drift sin(0.12t + 40r) × 0.25 in y and cos(0.08t + 30r) × 0.2 in x; size (1 + 1.6r) × DPR × 9 / −z; alpha 0.12 + 0.22r; rotation y = −0.05 × group rotation y |

### A.2 Point vertex shader

For each point with randoms `r = aRand.x`, `aRand.y`, `aRand.z`, `aRand.w`:

```text
stagger(x, r) = smoothstep(0, 1, clamp((x − 0.4r) / 0.6, 0, 1))
e1..e4        = stagger(morph − 0, r) … stagger(morph − 3, r)
p             = mix(mix(mix(mix(form0, form1, e1), form2, e2), form3, e3), form4, e4)

turb  = (sin(π·e1) + sin(π·e2) + sin(π·e3) + sin(π·e4)) × (1 − calm)
angle = turb × (0.7 + 1.3·aRand.y)
p.xz  = rotate(p.xz, angle)
p    *= 1 + 0.16·turb
noise = (sin(2.3·p.y + 0.9t + 2π·aRand.y), sin(2.1·p.z + 0.8t + 2π·aRand.z), sin(1.9·p.x − 0.7t + 2π·aRand.w))
p    += noise × (0.28·turb + 0.01·(1 − calm))

intro = smoothstep(0, 1, clamp((uIntro − 0.45r) / 0.55, 0, 1))
p     = mix(aStart, p, intro)

d     = length(p.xy − pointer.xy)
push  = smoothstep(1, 0, d) × pointerStrength
p.xy += normalize(p.xy − pointer.xy) × push × 0.38
p.z  += push × 0.25

net   = e2 × (1 − e3)
pulse = net × smoothstep(0.82, 1, sin(2.4·p.x − 3.4t + 0.6·p.y)) × (1 − 0.5·calm)

big          = aRand.w > 0.968 ? 1 : 0
gl_PointSize = uSize × (0.55 + 0.75·aRand.y + 1.5·big) × DPR / −viewZ
alpha        = 0.5 + 0.5·aRand.z
```

`calm` is 1 under reduced motion and 0 otherwise.

### A.3 Point fragment shader

```text
d    = length(gl_PointCoord − 0.5);  discard if d > 0.5
soft = smoothstep(0.5, 0, d)
core = smoothstep(0.17, 0, d)
rgb  = mix(base, hot, clamp(core × (0.3 + 0.6·big) + 0.7·pulse, 0, 1))
a    = (0.36·soft + 0.7·core) × alpha × uAlpha × (0.85 + 1.2·pulse)
```

During and after the crossfade, `uAlpha = baseAlpha × (1 − 0.72 × fade)`.

### A.4 Timing and easing

| Item | Value |
|---|---|
| Timeline length | 6.65 units, scrubbed across the stage height minus one viewport (about 460vh of scrolling with the default 560vh stage) |
| Scrub smoothing | 1 s (instant under reduced motion) |
| Morph tween | 1.0 unit, `power2.inOut` |
| Copy out | 0.3 units, `power1.in`, y 0 → −36px |
| Copy in | 0.35 units, `power2.out`, y 36px → 0, starting 0.62 after the morph begins |
| Crossfade | 0.35 units from 6.0 |
| Intro fly-in | 2.5 s, `power3.out`, 0.15 s delay |
| Intro copy | 0.9 s, `power3.out`, 0.09 s stagger, 1.0 s delay, y 22px → 0 |
| Pointer activity window | 1.4 s after the last move, eased at 6% per frame |
| Landing rebuild debounce | 120 ms |

---

## Appendix B. Prototype to production map

| Prototype (`lattice-prototype.html`) | Production module | Change from the prototype |
|---|---|---|
| Inline `<style>` | Component styles plus `tokens.css` | Colours through tokens only; self-hosted font |
| `R`, `gauss` | `forms/rng.ts` | None |
| `fillSegments`, `fillClusters`, `fillTriangles`, `fillPolys`, `coherent` | `forms/sample.ts` | Typed |
| `wordmark`, `d20`, `network`, `padlock` | `forms/*.ts`, run in `worker.ts` | Moved off the main thread |
| `cardsFromDOM`, `toWorld` | `landing.ts` | Also exposes the test hook (test builds only) |
| Shader strings | `shaders/*.glsl` | None |
| GSAP timeline and `seg()` | `timeline.ts` | Opacity-only beat hiding (§8.3); focus handling (§8.9) |
| Rail and `jump()` | `timeline.ts` | Accessible names; 44px touch targets |
| `frame()` loop, observers | `stage.ts` | Context-loss handling; disposal |
| HUD | `stage.ts` | Only with `?hud` |
| CDN `<script>` tags and `loadThree()` | Bundled `import()` | No CDN in production |
| Skeleton rows | `MoreOnGitHub` component | Real data; skeleton removed |

---

## Appendix C. Running the prototype

Open `docs/reference/lattice-prototype.html` in a current desktop browser while online (it loads Three.js and GSAP from jsDelivr and Archivo from Google Fonts). Scroll slowly through the whole stage to see each beat, the landing and the crossfade. The readout in the bottom-right corner shows the point count, fps and pixel ratio; in production that readout appears only with `?hud`.

The prototype's "More on GitHub" section uses grey skeleton rows as a stand-in. Production replaces them with real data (§10).
