# Decisions

Status of every entry: **proposed, waiting for Xini** (2 October 2026). No site code has been written yet. Evidence for each entry is in [`AUDIT.md`](AUDIT.md).

## 1. The five decisions from §4

| Decision | Recommendation | Reason |
|---|---|---|
| Framework | **Migrate to Astro 7:** static output, one client-side island for the stage, no UI framework. | Next.js passes all five §4 checks, but it can't meet F3. Its runtime alone is 145 KB gzipped, and the first-paint JS budget is 30 KB. |
| Deploy target | **Keep Cloudflare Pages project `xini-dev`:** Git integration, apex `xini.dev`, production branch `master`. Build into `out/`. | §4 says keep the host. Building into `out/` leaves the Pages build settings unchanged, and they apply to every branch, so `master` keeps deploying until the merge. |
| Refresh mechanism | **Rebuild daily at 03:00 UTC: a Cloudflare Worker cron trigger calls a Pages deploy hook.** | Static output has no ISR. GitHub disables scheduled workflows in a public repo after 60 days with no repo activity, and this repo has had two longer gaps in the past year (88 and 74 days). |
| Icon | **Retire the old mark. Use the X from the particle wordmark for every icon size.** | In one colour the old mark reads as a figure-of-eight, not an X. The spec's fallback "XINI" is unreadable at 16px. The wordmark X stays legible at every size (`docs/audit/icon-options.png`). |
| Old routes | **Keep `/`. Redirect `/icon.svg` (301) to `/favicon.svg`. Let old build files return 404. Give the old fragments element ids.** | `/` is the only content route that has ever existed, in both the repo history and the Wayback index. |

### 1.1 Framework

**Does the current framework pass the §4 test? Yes.** Next.js 16.2.6 with `output: "export"` supports every capability §4 names:

| §4 capability | Next.js 16.2.6 | Astro 7.3.5 |
|---|---|---|
| Build-time data fetching | Yes (server components run at build) | Yes (component frontmatter runs at build) |
| Code-splitting with dynamic `import()` | Yes | Yes (Vite) |
| A Web Worker | Yes (`new Worker(new URL(…, import.meta.url))`). Not tested under Turbopack here; it doesn't change the outcome. | Yes (Vite bundles module workers) |
| Static output or ISR | Static export: yes. ISR: no, export mode and Pages don't support it. | Static: yes, the default |
| Self-hosted fonts | Yes (`next/font`) | Yes (fontsource or local files) |

The test is necessary but not sufficient. On the current build, `/` sends **145 KB of gzipped JS** to modern browsers. 2.8 KB of that is the site's own code; the rest is the React and Next runtime, which every App Router page loads to hydrate. F3 caps first-paint JS at **30 KB**, and §0 says a criterion can't be quietly weakened. Keeping Next.js would therefore mean failing F3 by design, so the recommendation is Astro, as §4's own fallback describes.

Consequences:

- React, Next, Tailwind and the Next ESLint preset are removed. Runtime dependencies become `three` and `gsap` only (§15).
- Versions available today: astro 7.3.5, three 0.186.1, gsap 3.15.0.
- Astro 7 requires Node 22.12 or later. Pin `.node-version` to `22.18.0`, the local version, instead of `22`.

### 1.2 Deploy target

- **Output folder `out/`.** Set Astro's `outDir` to `./out`. Pages applies one build command and one output folder to every branch, so switching to `dist` would break `master` deploys before the merge. Keeping `out/` needs no dashboard change. Branch previews such as `rework-lattice.xini-dev.pages.dev` would then build with the same settings.
- **www.** `www.xini.dev` doesn't resolve today, so anyone who types it gets a browser error. Recommendation: add a proxied `www` record and one redirect rule, `www.xini.dev/*` → `https://xini.dev/${1}` (301). *Needs Xini (dashboard).* If you'd rather keep no www, K1 is checked against that instead.
- **Environment variables.** Set `GITHUB_USERNAME=XiniDev` and `GITHUB_TOKEN` (a fine-grained token with read-only access to public repositories) for both the production and preview environments. Treat the token as required in practice. Pages builds share outbound IPs, so the 60-requests-an-hour anonymous limit is likely already spent by other builds. A failed fetch falls back to the snapshot, and then the daily refresh changes nothing. *Needs Xini (dashboard).*
- `xini-dev.pages.dev` keeps serving a copy of the site. The canonical tag takes care of SEO, so no action is needed.

### 1.3 Refresh mechanism

The flow: a Worker cron trigger (`0 3 * * *`) sends a POST to the Pages deploy hook. Pages rebuilds `master`. The build fetches from GitHub, falling back to the committed snapshot if that fails.

- The Worker lives in this repo, for example in `workers/daily-rebuild/`. It stores the hook URL as a Worker secret (`DEPLOY_HOOK_URL`). Its runs appear in the Cloudflare dashboard, which is the evidence E4 asks for.
- This differs from §10.5, which names a GitHub Actions schedule. The hook is the same; only the trigger changes. A GitHub schedule fails in exactly the case this feature exists for: the list reorders when *other* repos get pushes, which is when this repo sits quiet. Once GitHub disables a schedule, it never re-enables itself.
- *Needs Xini:* create the deploy hook, and deploy the Worker once with `wrangler`. Both need your Cloudflare login.

### 1.4 Icon

- **Old mark.** A clean vector: six straight-edged polygons. Recolouring is clean technically, but the result doesn't read well. In one colour it becomes a figure-of-eight. In three tones of signal the X only shows from about 180px up. It fails §4's "reads well recoloured" test.
- **Spec fallback ("XINI" in Archivo, width 125, weight 800).** Legible at 180 and 512px, but a smear at 16px, which is the size tabs and bookmarks use.
- **Recommendation.** Use the X polygon from the wordmark (letter one of the prototype's `wordmark()`), signal on void, for `favicon.svg`, `apple-touch-icon.png` (180px) and a 512px maskable PNG with the content inside the safe zone. Also ship a 32px `favicon.ico`, because browsers request `/favicon.ico` whether or not the page links it. The particles draw this same X first, so the tab icon matches the hero.
- This replaces the spec's fallback, so it needs your yes. The literal alternative is "XINI" at 180 and 512px with the X at 16 and 32px, but two marks are weaker than one.

### 1.5 Old routes

| Old URL | Decision |
|---|---|
| `/` | Keep |
| `/icon.svg` | 301 to `/favicon.svg`. It's publicly archived and costs one line in `_redirects`. |
| `/favicon.ico` | Keep the path, serving the new icon |
| `/404.html`, `/_not-found.html`, `/index.txt`, `/__next.*.txt`, `/_not-found/*` | 404. Build files that nothing links to. |
| `/_next/static/*`, `/projects/*.webp` | 404. Hashed or internal asset paths. HTML is served with `max-age=0`, so no cached page can still reference them, and none appears in the Wayback index. |
| `/assets/index-*` | Already 404. No action. |
| `/robots.txt`, `/sitemap.xml` | Replaced by the new files (§14) |
| `#home` | An id at the top of the stage |
| `#about` | `id="about"` on beat 01. §5 also needs this: in the no-WebGL layout, About "jumps to the first beat", but §5 gives that beat no anchor. |
| `#projects` | `id="projects"` on the featured list inside `#work` |
| `#contact` | Unchanged: the footer is `#contact` |

In the WebGL layout, the browser's own fragment scrolling can't reach a beat inside the sticky pin. The boot script therefore maps the initial hash and `hashchange` events to the jump targets (§2.4).

## 2. Spec conflicts and gaps the audit found

Each of these needs your call. The default is what I'll build if you don't answer. The affected criteria are in brackets.

### 2.1 As written, the shader makes the landing fail D1 [D1, D2, D3]

At `lock = 1` the vertex shader keeps an idle noise term of `0.01 × (1 − calm)`, about ±1.6px at 1440×900. A Monte Carlo puts the drawn edge points within 2px at 80.6–91.5% at 1440×900 and 89.5–94.1% at 390×844. D1 requires at least 95% (AUDIT, appendix A.2).

§16.2 test 8 projects the `aE` attribute on the CPU, which scores 98.4–100%. The test as written would therefore pass while the drawn landing fails.

**Default:**

- Scale the idle noise by `(1 − lock)` through a new `uLock` uniform. §8.6 step 1 already intends this: "everything that could offset the final form settles to identity".
- Make the test hook apply the same vertex displacement in TypeScript, sharing its constants with the shader, so the test measures what is drawn.
- Use exact π in the turbulence term. The `3.14159` literal leaves a residue of about 1e-5. It's negligible, but fixing it costs nothing.

You'd see one change: the landed card outlines stop shimmering.

### 2.2 The finale doesn't fit at 844×390 or 320×568 [H5, D1, B3]

With the prototype's CSS, the finale runs past the bottom of the pinned screen:

- 844×390: by 154px, or 148px with §7.3's short-screen type rule.
- 320×568: by 197px.

It fits at every other §11 size. The tightest are 360×740 (36px spare) and 1280×720 (92px spare). The pin uses `overflow: hidden`, so the cards get clipped and the particles would land on boxes that are partly off screen. H5 can't pass as specified. Adding repo links to the Gloam and DBridger cards (§19 question 3) makes each stacked phone card one line taller.

**Default:** a compact finale for short viewports, with the rules chosen by measurement in M1. Ship a rule set only if it measures as fitting at every §11 size. Candidate rules:

- At heights of 560px or less: three columns of the horizontal phone card, and no finale intro line.
- On narrow, short phones: drop the tags line, and drop the thumbnail if that is still not enough.

Remove whole lines rather than clamping text. `Range.getClientRects()` still returns rectangles for lines hidden by `line-clamp`, so particles would land on text nobody can see. This changes the composition, so it's part of your B3 sign-off.

### 2.3 The intro copy fade conflicts with first paint [F2, §8.1, §8.7]

§8.1 requires the intro copy to be visible at first paint. That copy is also the Largest Contentful Paint element. §8.7 keeps the prototype's scripted fade-in, which starts 1.0s after the script runs.

With lazy loading, the stage arrives an unknown time after first paint. A `gsap.from` fade at that point would hide copy that is already on screen and fade it back in: a visible blink that also pushes LCP later.

**Default:** run the copy fade in CSS from first paint, with the same motion: 0.9s, 0.09s stagger, rising from 22px. Drop the 1.0s delay, and turn the fade off under reduced motion. The particle fly-in still starts when the stage is ready, as §8.7 says. LCP then lands about one frame after first paint.

### 2.4 Nothing defines the page between first paint and stage start [H1, C4, G2]

The inline `<head>` script adds the `js` class, so the pinned layout applies from first paint. But the copy choreography and the jump function live in the lazy chunk, which arrives after an idle callback (up to 1.2s) plus a download of about 200 KB. Until then:

- Beats 01–04 and the cards sit stacked on top of each other, unless CSS hides them.
- If CSS hides them, anyone who scrolls early scrolls through five screens of empty stage.
- Work, About, the skip link and incoming `/#work` links all land at the top of the stage.

On a slow connection this lasts seconds. If the chunk never arrives, it lasts until something triggers the fallback.

**Default:** the boot script, which counts towards the first-paint budget, takes on four jobs:

- the maths between scroll position and timeline time
- the jump function
- handling the initial hash and `hashchange`
- a minimal controller that shows the beat for the current scroll position, using opacity only

When the stage starts, it takes over the same elements. The page is readable at every moment, so no arbitrary timeout is needed. The no-WebGL fallback triggers only on real failure: the import fails, WebGL2 context creation fails, or the context is lost. Estimated size: about 1.5 KB gzipped.

### 2.5 The project summaries need rewriting [A4, A5, E6]

§10.2 wants a one-sentence summary for each project, A4 bans copy from the old site, and A5 requires UK English. The 12 old blurbs run to 1–3 sentences each and use US spellings.

**Default:**

- Write one UK English sentence per project, condensed from its old blurb, with no new claims.
- Take the tags from the stack each blurb names.
- Write the alt text from each image. The old alt text is just "*Name* screenshot", and §9 asks for alt text that describes the screenshot.

You review the diff in M2.

### 2.6 Cloudflare rewrites the email link [§6.6, H1, A7, K3]

Email Address Obfuscation (AUDIT §2) causes three problems:

- With JavaScript off, the address doesn't appear at all, which breaks §6.6 and H1.
- It adds a script the build doesn't control, and §2 says to add nothing.
- A link check against production finds `/cdn-cgi/l/email-protection#…` instead of a `mailto:` link.

**Default:** turn Email Address Obfuscation off for the `xini.dev` zone. The address is already public on the live site, so this exposes nothing new. *Needs Xini (dashboard).*

### 2.7 Projects the §10.2 merge rules don't cover [E1, E6]

- **Overthrow Synthetica** lives in `BlueTentProductions/overthrow-synthetica`, outside `type=owner`, so it never joins. **Default:** fetch every curated `repo` whose owner isn't `GITHUB_USERNAME` with `GET /repos/{owner}/{name}`, and merge it exactly like an owned repo: same token, same snapshot, same rules.
- **ECS Platformer Demo** links to `XiniDev/Golden-Gun`, which has been renamed to `ecs-platformer-demo`. **Default:** store the current name, and have the build warn whenever a curated `repo` matches nothing, so future renames show up.
- **WSMath** has neither a repo nor a date, so rule 3 drops it. **Default:** leave it out until you give it an `updated` month.
- **Repos without descriptions** (AdventOfCode23 and 24, EnGarde, graphics-shooter-game) and the **`xini.dev` repo** itself. **Default:** list them all, showing an empty description line rather than placeholder text, and start `hiddenRepos` empty. Tell me any you want hidden.

### 2.8 Featured images [§9, E6]

- The source images stop at 800px wide, so the 1200px `srcset` entry would mean upscaling. **Default:** offer 480 and 800px only until larger sources exist. A card about 480px wide on a 2× screen wants about 1000px.
- DBridger (800×559) and VOETutor (800×590) aren't 16:10. **Default:** crop DBridger around its centre. Crop VOETutor's top 90 rows, which removes the signed-in header with its personal greeting and leaves exactly 800×500.
- All three are 49 KB or less at 800px as WebP, inside the 80 KB budget, and AVIF will be smaller.
- New logged-out screenshots at least 1200px wide would be better for all three.

### 2.9 Copy claims I couldn't trace to the repo data [A4]

The copy rule says every claim must trace to a real project or real experience.

- **Traced:**
  - complete systems built solo (Gloam)
  - real-time 3D and multiplayer (Gloam: React Three Fiber, Colyseus)
  - agents acting on real systems (DBridger)
  - an MCP server (Gloam)
  - PII redaction (DBridger)
  - self-hosting (Gloam)
  - Zero Trust (the WSMath CMS login)
  - OWASP (Notes API)
- **Not traced:**
  - "local models" in beat 02 (DBridger uses Google Gemini; its "local execution" means running queries, not models)
  - "MCP servers" in the plural (I found one)
  - "progress tracking" and "secure video" on the VOETutor card

**Default:** keep the copy as written, since it may rest on work outside your public repos. Only you can confirm it.

### 2.10 Security headers (not in the spec) [optional]

Beat 03 says "Secure by default", but today's responses carry only `referrer-policy`, and a technical reader can check that in seconds.

**Default if you say yes:** in M7, add these through `_headers`:

- `Strict-Transport-Security`
- a `Content-Security-Policy`: `script-src 'self'` plus a hash for the inline head script, `worker-src 'self'` and `frame-ancestors 'none'`
- `X-Content-Type-Options: nosniff`
- `Permissions-Policy`

The obfuscation script from §2.6 would break that CSP, which is one more reason to turn it off. This is small, but it's outside the spec, so it needs your yes.

## 3. Implementation notes

None of these needs a decision. They're recorded so that nothing changes silently.

- **M3: deterministic forms across the worker split.** The prototype draws all five forms, the ordering keys and the per-point random values from one random stream, in sequence. Once forms 0–3 are built in a worker and the landing is built later, that sequence can't be reproduced. Instead, each form gets its own mulberry32 stream, seeded from `20261002` plus a fixed offset. Every visitor still sees the same forms. The landing also becomes identical across rebuilds, which the prototype's isn't: each rebuild there uses up more of the shared stream. The point sets won't match the prototype's bit for bit; the shapes will.
- **M3–M4: landing sampling in the worker.** Only the rectangle reads need the main thread. Sampling and sorting 18,000 points on the main thread risks F5's 50 ms limit under Lighthouse's 4× CPU throttle. The main thread sends the rectangles to the worker and gets the `Float32Array` back. That departs from §8.1's wording ("built on the main thread") but not its intent.
- **M3: the worker imports nothing from Three.js.** Otherwise the 200 KB stage budget pays for Three.js twice. Three.js, GSAP and ScrollTrigger already come to about 180 KB before any of our code.
- **M3: under reduced motion the render loop runs only on demand:** on timeline updates, resizes and landing rebuilds. §16.2 test 5 requires no frames once scrolling stops, and a continuous loop fails that even with time frozen. GSAP's own ticker must go idle too. Verify this in M5 and M6, for test 5 and F7.
- **M3: the start-up long-task risks are Three.js module evaluation and the first shader compile.** Compile with `compileAsync` before the first visible frame, and yield between start-up steps. Measure in M6 (F5).
- **M3: ScrollTrigger must ignore mobile toolbar resizes**, so the trigger doesn't refresh partway through a scroll.
- **M1: WebGL2 detection is split.** A cheap check, `'WebGL2RenderingContext' in window`, runs in the inline head script and adds `no-gl` before first paint. Actually creating the context happens in the stage, and if that fails the page switches to the fallback.
- **M1: one fallback font face per width.** A metric-matched fallback face can only match one width. Headings use `wdth` 125, body 100 and nav 88, so each width in use gets its own fallback face to keep the swap shift-free (CLS ≤ 0.02).
- **M1: one source for the clear colour.** The stage reads `--void` from CSS at runtime instead of repeating `#020806` in its config, so B1 has a single source.
- **M1: where the prototype differs, the spec wins:**
  - Contact goes to `#contact` (the prototype sends it to `#work`).
  - Inactive beats are hidden with opacity and `pointer-events` (the prototype uses `autoAlpha`).
  - The vignette is hidden in the no-WebGL layout.
  - Nothing loads from a CDN.
  - The HUD appears only with `?hud`.
  - Touch pointers are ignored.
- **M2: the GitHub user repos endpoint returns public repos only, even with a token.** That's what we want here. Gloam and DBridger are public. VOETutor has no public repo, and featured cards don't need dates.
- **M7: Cloudflare's managed robots.txt adds its content-signals block to ours.** Confirm that Lighthouse's robots.txt audit still passes (SEO 100).

## 4. Open questions (§19): findings and defaults

| # | Question | What the audit found | Default |
|---|---|---|---|
| 1 | GitHub username | The old site links `github.com/XiniDev`, which has 25 public repos (AUDIT §3). | `XiniDev` |
| 2 | VOETutor: own product or client work, Saltancy credit, summary | No public repo. voetutor.com doesn't mention Saltancy. Its own description: "a curated marketplace of vetted IB educators… HD video lessons… on demand". That supports most of §6.4, but not "progress tracking" or "secure video". The old site filed it under Web, marked Live, as "built on Next.js and Supabase". | §6.4 copy, no credit line. Please confirm or drop the two untraced phrases. |
| 3 | Links for Gloam and DBridger | Both repos are public: `XiniDev/Gloam` (last push 1 Oct 2026) and `XiniDev/dbridger` (8 Mar 2026). Neither has a demo URL. | **Link each card to its repo**, with the link text "Source on GitHub". The audit found real URLs, and "no links" was only the default for when it didn't. |
| 4 | Footer contact | Email `xini@saltancy.com`, GitHub `XiniDev`, LinkedIn `in/xinidev`, plus X `@XiniDev`. Cloudflare currently obfuscates the email (§2.6). | Email, GitHub and LinkedIn, as §6.6 lists. X stays in the data but isn't shown, and it's left out of `sameAs`, unless you want it. |
| 5 | Keep the old icon? | A clean vector, but in one colour it reads as a figure-of-eight (§1.4). | No. Use the wordmark X for all sizes. |
| 6 | Featured images | `gloam.webp` 800×500 (already 16:10), `dbridger.webp` 800×559, `voe.webp` 800×590 (signed-in header). Nothing is wider than 800px. | These three, cropped to 16:10 as in §2.8, at 480 and 800px. Better screenshots welcome. |
| 7 | Scroll length | Nothing in the audit bears on it. | 560vh. It's one constant, so judge it on a real device in M8. |
| 8 | Analytics | None on the page. Cloudflare's zone analytics are server-side and need no script. | Add nothing. |
| 9 | Debug readout | — | `?hud` only |
