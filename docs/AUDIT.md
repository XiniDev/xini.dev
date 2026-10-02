# Repository audit

Spec §4. Taken on 2 October 2026 on branch `rework/lattice`, from `master` at `cab024f`.

Sources: the repository and its git history; the local build output `out/`, which serves the same chunk hashes as production; read-only HTTP checks against the live site; the public GitHub API; the Wayback Machine CDX index; DNS.

## 1. Stack

| | |
|---|---|
| Framework | Next.js 16.2.6, App Router, one route (`src/app/page.tsx`) |
| UI library | React 19.2.6 |
| Language | TypeScript 6.0.3, `strict: true` |
| Styling | One global stylesheet, `src/app/globals.css` (482 lines). Tailwind CSS 4.3 is installed and wired into PostCSS, but nothing imports it. |
| Package manager | npm (`package-lock.json`) |
| Build command | `npm run build` → `next build --turbopack` |
| Output | Static export (`output: "export"` → `out/`). No SSR, no ISR. |
| Node | `.node-version` is `22`. Local: 22.18.0. |
| Lint and tests | ESLint 9 with `eslint-config-next`. No tests. |
| Payload of `/`, gzip -9 | JS: 145 KB for modern browsers, plus 39 KB of `nomodule` polyfills. Only 2.8 KB of that is the site's own code; the rest is the React and Next runtime. CSS: 5.4 KB. HTML: 10.6 KB. Fonts preloaded: 3 files, 169 KB. |

## 2. Deploy

| | |
|---|---|
| Host | Cloudflare Pages, project `xini-dev` (`xini-dev.pages.dev`), connected through Git. The "Cloudflare Pages" check run from the `cloudflare-workers-and-pages` app passes on `cab024f`. |
| Build settings | From the dashboard, recorded 7 September 2026: command `npm run build`, output `out`, production branch `master`, automatic deploys on. Pages applies these settings to every branch. |
| DNS | The zone is on Cloudflare (`cosmin.ns.cloudflare.com`, `etta.ns.cloudflare.com`). The apex is proxied. |
| Apex | `https://xini.dev/` returns 200. `http://xini.dev/` returns 301 to HTTPS (done by Cloudflare). |
| www | `www.xini.dev` has no DNS record (NXDOMAIN). |
| Environment variables | The code references none. Dashboard values can't be seen from here. |
| Redirects config | None. There is no `_redirects` file. |
| Headers config | `public/_headers` sets `Cache-Control: public, max-age=31536000, immutable` on `/_next/static/*` and nothing else. |
| Live response headers | Only `referrer-policy: strict-origin-when-cross-origin`. There is no HSTS, CSP, `X-Content-Type-Options` or `Permissions-Policy`. |
| Zone features that change the page | **Email Address Obfuscation is on.** At the edge, Cloudflare rewrites the `mailto:` link to `/cdn-cgi/l/email-protection#…`, replaces the address text, and injects `/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js`. **Managed robots.txt is on.** Because the repo has no `robots.txt`, Cloudflare serves its own "content signals" preamble. It contains comments only and no directives. |
| CI | None. A local `.github/` folder exists, but it is empty and untracked. |
| History | The repo deployed to GitHub Pages from May 2024 to June 2025. That site now returns 404. `docs/redesign-volumetric.md` still says Vercel, which is stale. |

## 3. Project data

Projects are defined in `src/components/facet/projects.tsx`, in a `BAYS` constant inside the component. Each entry has the shape `{ title, href, img, alt, blurb, live? }`, grouped into three "bays": Web, AI and Games. There are **12 entries**. All of them have an image and one link (`href`). None has a date, tags or a separate repo field. Every alt text has the form "*Name* screenshot".

The repo column is the join key §10.2 needs. Push dates and languages come from GitHub on 2 October 2026.

| # | Name (old) | Bay | Description (verbatim) | Image | Link → status | Repo, last push, language |
|---|---|---|---|---|---|---|
| 1 | Gloam | Web | A self-hosted 3D virtual tabletop for fifth-edition games, built with React Three Fiber and Colyseus. Shadow-casting light, per-creature line of sight, all 339 SRD spells automated, physics dice, and an MCP server for Claude. | `gloam.webp` 800×500, 49 KB | github.com/XiniDev/Gloam → 200 | `XiniDev/Gloam`, 2026-10-01, TypeScript |
| 2 | Saltancy Website | Web | Saltancy is my consultancy company providing end-to-end technical consultancy and custom software development — full-stack web apps, cross-platform mobile, scalable backends, cloud deployment and API integrations. This is Saltancy's landing page. | `saltancy-web.webp` 800×394, 9 KB | www.saltancy.com → 200 (marked Live) | `XiniDev/saltancy-web`, 2026-06-15, TypeScript. Its GitHub homepage field is saltancy-web.vercel.app, which 308s to www.saltancy.com. |
| 3 | Vault of Excellence | Web | A scalable commerce and tutoring platform built on Next.js and Supabase. Educators bridge the gap between content and sales with customizable webpages — curating materials and marketing them through personalized storefronts. | `voe.webp` 800×590, 25 KB | voetutor.com → 308 → www.voetutor.com (marked Live) | No public repo |
| 4 | WSMath | Web | An online portfolio for an international mathematics exam strategist. Built with Next.js and Tailwind CSS — sleek, responsive, SEO-optimized, with a custom CMS behind a Zero Trust login for easy content management. | `wsmath.webp` 800×1200, 26 KB | www.wsmath.com → 200 | None found |
| 5 | Notes API | Web | A secure RESTful API for managing user-specific notes with CRUD operations, following OWASP principles. MongoDB with Mongoose for efficient data modeling and querying, with advanced filtering features. | `notes-api.webp` 800×533, 12 KB | github.com/XiniDev/notes-api → 200 | `XiniDev/notes-api`, 2025-06-17, JavaScript |
| 6 | DBridger | AI | A secure PyQt6 desktop gateway connecting legacy databases to Google Gemini — an autonomous agent that navigates relational schemas to answer natural language queries, with local execution, dynamic mapping and automated PII redaction. | `dbridger.webp` 800×559, 13 KB | github.com/XiniDev/dbridger → 200 | `XiniDev/dbridger`, 2026-03-08, Python |
| 7 | LeadingOnes DAC | AI | An implementation of a Dyna-DDQN model-based deep-RL agent to improve learning quality and sample efficiency in the LeadingOnes (1+1) RLS benchmark in Dynamic Algorithm Configuration (Biedenkapp 2022). | `lo-dac.webp` 800×500, 14 KB | github.com/XiniDev/LeadingOnesDAC → 200 | `XiniDev/LeadingOnesDAC`, 2025-11-28, Jupyter Notebook |
| 8 | AI Search Algorithms | AI | Uninformed and informed search algorithms for solving flight-route problems on an NxN polar grid, with bidirectional search too. | `ai-search-algorithms.webp` 800×533, 18 KB | github.com/XiniDev/AI-Search-Algorithms → 200 | `XiniDev/AI-Search-Algorithms`, 2025-11-28, Java |
| 9 | NullVector | Games | A Processing (Java) platformer where you battle enemies and a boss named Zorp using gravity-affected projectiles. Smart AI, bounce damage, boss phases, friendly fire, and a full GUI with health bars and debug tools. | `nullvector.webp` 800×449, 10 KB | github.com/XiniDev/NullVector-Processing → 200 | `XiniDev/NullVector-Processing`, 2025-08-28, Processing |
| 10 | Jungle Game & JunGUI | Games | A full implementation of the Jungle board game in Java with a Swing-based GUI. Multiplayer support, legal move highlighting, cultural-inspired UI design, and complete game logic with flexible OOP encapsulation. | `jungle-board-game.webp` 679×887, 75 KB | github.com/XiniDev/Jungle-Board-Game-Java → 200 | `XiniDev/Jungle-Board-Game-Java`, 2025-08-28, Java |
| 11 | Overthrow Synthetica | Games | A game jam demo created with Codethulu over two weeks for the Warwick Game Dev Society, showcasing advanced game development techniques using ThreeJS and WebGL. | `overthrow-synthetica.webp` 800×275, 32 KB | github.com/BlueTentProductions/overthrow-synthetica → 200 | `BlueTentProductions/overthrow-synthetica`. XiniDev doesn't own it, so the `type=owner` list never includes it. |
| 12 | ECS Platformer Demo | Games | A platformer demo testing the Entity-Component-System (ECS) architecture. Developed in C++ and SDL2, demonstrating responsive controls and flexible entity management. | `ecs-demo.webp` 794×498, 7 KB | github.com/XiniDev/Golden-Gun → 301 → XiniDev/ecs-platformer-demo | `XiniDev/ecs-platformer-demo`, 2024-05-21, C. GitHub says C; the blurb says C++. |

Notes:

- The three featured projects are rows 1, 6 and 3. VOETutor's own title is "VOETutor — Vault of Excellence | Premium IB Tutoring". Its meta description reads: "a curated marketplace of vetted IB educators. Browse specialist tutors, watch HD video lessons, and learn on demand." Saltancy is not mentioned on voetutor.com.
- The blurbs run to 1–3 sentences each and use US spellings: optimized, modeling, customizable, personalized.
- Only `gloam.webp` is 16:10. No source image is wider than 800px; the originals aren't in the repo. `voe.webp` shows a signed-in session: the header carries a personal greeting and a sign-out button.

GitHub, from `GET /users/XiniDev/repos?type=owner&sort=pushed&per_page=100` on 2 October 2026: **25 public repos** (one page), **1 fork** (`bitventory`), **0 archived**.

- Nine repos match old entries: Gloam, saltancy-web, notes-api, dbridger, LeadingOnesDAC, AI-Search-Algorithms, NullVector-Processing, Jungle-Board-Game-Java and ecs-platformer-demo.
- Fifteen non-fork repos weren't on the old site: xini.dev, getajobman, limit-order-book, wincrazyyy.github.io, AdventOfCode24, aws-streaming-demo, firebase-auth-demo, AutoScroller, AdventOfCode23, EnGarde, graphics-shooter-game, deutsche-bank-mentorship, En-Garde--old-, JumpAndShoot and AngryBallGame.
- Four have no description: AdventOfCode23, AdventOfCode24, EnGarde and graphics-shooter-game. Three have no language: AdventOfCode24, JumpAndShoot and AngryBallGame.
- With `legacyMonths = 24`, the featured repos removed and the fork excluded, the list would be 11 recent and 11 older repos today. The two repos not counted here are Overthrow Synthetica (no date) and WSMath (no repo).

## 4. Assets

| Asset | Finding |
|---|---|
| Icon | `public/icon.svg`, 6.4 KB, exported from draw.io. The whole draw.io file is embedded in a `content` attribute. The viewBox is 3202×2403 (4:3, not square). The mark is six straight-edged parallelograms: two crossing diagonals plus a chevron on each side, in three greens (`#059669`, `#10b981`, `#34d399`). Inline `light-dark()` styles change those colours when the OS is in dark mode. The same paths are repeated inline in `hud.tsx` and `home.tsx`. Nothing links the file; it is only served at `/icon.svg`. |
| Favicon | `src/app/favicon.ico`, 15 KB, raster at 16, 32 and 48 px. Next links it. |
| Logo | No separate file. The header uses the inline SVG mark next to the text "XINI.DEV". |
| Recolouring | The mark is vector, so recolouring is technically clean. In a single colour, though, the six shapes merge into a horizontal figure-of-eight and the X disappears. Using three tones of signal keeps the X at 180px but not at 16px. See `docs/audit/icon-options.png`, which shows each option at 16, 32 and 180 px, signal on void. |
| Fonts | Archivo (italic, variable `wdth` axis), Inter (400, 500, 600) and Geist Mono (400, 500), all through `next/font/google`, which self-hosts them at build time. |
| Font for the new build | `@fontsource-variable/archivo` 5.3.0, Latin subset, both axes (`wdth` 62–125, `wght` 100–900), normal style: **90,104 bytes**. That is inside the 95 KB budget. |
| Images | 12 WebP files in `public/projects/`, none wider than 800px (sizes in §3). `scripts/optimize-images.mjs` produced them with sharp: 800px wide, WebP quality 80 (72 for wsmath). |

## 5. Live URLs

Every URL the old site serves or has served. Sources: the build output, the Wayback CDX index for `xini.dev` and `www.xini.dev`, and live HTTP checks.

| URL | Status now | What it is |
|---|---|---|
| `/` | 200 | The only page |
| `/404.html`, `/_not-found.html` | 200 | Next export of the 404 page. Unknown paths return 404 with this body. |
| `/index.txt`, `/__next.*.txt`, `/_not-found/*.txt` | 200 | Next's RSC payload files. Nothing links to them. |
| `/_next/static/*` | 200 | Hashed build assets |
| `/favicon.ico` | 200 | Favicon |
| `/icon.svg` | 200 | The mark. Wayback archived it in March 2025. |
| `/projects/*.webp` (12) | 200 | Project images. None are in the Wayback index. |
| `/robots.txt` | 200 | Served by Cloudflare's managed robots.txt |
| `/sitemap.xml` | 404 | Doesn't exist |
| `/assets/index-*.js`, `/assets/index-*.css` | 404 | Build assets from the older Vite site, archived by Wayback in 2024–25 |
| `#home`, `#about`, `#projects`, `#contact` | n/a | In-page anchors. Fragments never reach the server. |
| `xini-dev.pages.dev/*` | 200 | The same site at the Pages default domain |

No content route other than `/` has ever existed, either in this repo's history or in the Wayback index.

## 6. Contact and social

| | |
|---|---|
| Email | `xini@saltancy.com` (`mailto:`) |
| GitHub | `XiniDev`: https://github.com/XiniDev |
| LinkedIn | https://www.linkedin.com/in/xinidev/ (301s to the form without the trailing slash) |
| X (Twitter) | https://x.com/XiniDev |
| Saltancy | The old site links https://www.saltancy.com. https://saltancy.com returns 307 to the www host. |
| Education | BSc Computer Science (Warwick) and MSc Artificial Intelligence (St Andrews), from `about.tsx`. Matches §1 of the spec. |

## 7. Scripts and analytics

- No analytics, no tag manager, and the page sets no cookies.
- The only script not built from the repo is Cloudflare's `email-decode.min.js`. Email Address Obfuscation injects it at the edge (see §2).
- Everything else is first-party Next chunks. Nothing loads from a CDN.

## 8. Old theme inventory

Everything below belongs to the old circuit theme ("facet", with laps, bays and the HUD). Nothing in it carries over except the data marked as kept.

| Kind | Files |
|---|---|
| Components | `src/components/facet/hud.tsx` (Hud, FlowHead), `home.tsx` (Home), `about.tsx` (About), `projects.tsx` (Projects; migrate its data first), `contact.tsx` (Contact, SiteFooter; migrate the contact details first), `engine.tsx` (FacetEngine, the CSS 3D "lap" camera) |
| App shell and styles | `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css` (tokens `--ink-0…3`, `--em-deep`, `--em`, `--em-light`, `--teal`, `--txt*`, `--slant`), `src/app/favicon.ico` |
| Assets | `public/icon.svg` |
| Framework files the migration replaces | `next.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`, `tsconfig.json`, `package.json`, `package-lock.json`, `README.md` (create-next-app boilerplate), `scripts/optimize-images.mjs` (replaced by the build's image pipeline), `public/_headers` (rewritten). Ignored local output: `.next/`, `out/`, `next-env.d.ts`, `tsconfig.tsbuildinfo`. |
| Docs | `docs/redesign-volumetric.md` (the scrapped VOLUMETRIC plan) |
| **Kept as data** | `public/projects/*.webp` (12, moved into the new image pipeline), the 12 project entries, and the email and profile links |

Theme vocabulary for the B4 check. Words: lap, laps, circuit, bay, bays, specimen. Strings: "Welcome to the circuit", "Scroll — the lap begins", "Next Lap", "Lap complete", "Same inks · New geometry". Class names: `wstroke`, `flow-divider`, `flow-head`, `strip-ghost`, `strip-ticks`, `strip-count`, `bay-group`, `bay-head`, `bay-grid`, `lap-row`, `mark3d*`, `mshadow`, `msl`, `hud*`, `pcard`, `salt-card`, `ctile`, `acard`. Variable: `--slant`. Search with:

```sh
rg -i '\b(laps?|circuit|bays?|specimen|wstroke|mark3d\w*|mshadow|strip-(ghost|ticks|count)|lap-row|flow-(divider|head))\b' --glob '!docs/**'
```

## Appendix: measurements taken from the prototype

**A.1 Does the finale fit inside the pinned screen?** This used the prototype's own CSS with Archivo loaded, in headless Chrome over the DevTools protocol, with each viewport emulated exactly at DPR 1. "Overflow" is the finale's bottom edge minus the pin height. A positive value means clipped.

| Viewport | Finale (top–bottom, px) | Overflow | Card heights (px) |
|---|---|---|---|
| 320×568 | 72–765 | **+197** | 192 / 172 / 171 |
| 360×740 | 72–704 | −36 | 172 / 151 / 151 |
| 390×844 | 72–667 | −177 | 153 / 133 / 151 |
| 430×932 | 72–646 | −286 | 133 / 133 / 151 |
| 768×1024 | 113–606 | −418 | 352 ×3 |
| 1024×768 | 92–592 | −176 | 362 ×3 |
| 1280×720 | 92–628 | −92 | 391 ×3 |
| 1440×900 | 99–683 | −217 | 425 ×3 |
| 1920×1080 | 119–810 | −270 | 524 ×3 |
| 2560×1440 | 158–961 | −479 | 636 ×3 |
| 844×390 | 92–544 | **+154** | 327 ×3 |
| 844×390, with §7.3's short-screen type rule | 92–538 | **+148** | 320 ×3 |

At 844×390, beat 01 starts at 57px, under the top bar, which ends at 64px. With the short-screen rule it starts at 78px.

**A.2 Landing edge accuracy.** A Monte Carlo of 200,000 edge points per case, using the prototype's sampling: in-plane jitter 0.0035, z jitter 0.008, final camera at distance 9 with a 35° vertical field of view. Each value is the share of points within 2px of their edge, at increasing distance from the screen centre.

| | 1440×900 (0 / 240 / 480 / 700 px from centre) | 390×844 (0 / 180 / 400 px) |
|---|---|---|
| `aE` projected on the CPU (what §16.2 test 8 literally measures) | 100 / 99.9 / 99.6 / 98.4 % | 100 / 100 / 99.9 % |
| With the shader's leftover idle noise, `0.01 × (1 − calm)` (what is drawn) | 91.5 / 89.6 / 85.4 / 80.6 % | 94.1 / 93.1 / 89.5 % |

D1 requires at least 95%. `DECISIONS.md` §2.1 draws the conclusions.
