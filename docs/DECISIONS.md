# Decisions

Xini decided these on 2 October 2026, except entries marked **Proposed** or **Open**. Those keep their default until Xini answers. The build follows these from M1 on. Evidence for each entry is in [`AUDIT.md`](AUDIT.md).

## 1. The five decisions from §4 (decided)

| Decision | Decided | Reason |
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

The test is necessary but not sufficient. On the current build, `/` sends **145 KB of gzipped JS** to modern browsers. 2.8 KB of that is the site's own code; the rest is the React and Next runtime, which every App Router page loads to hydrate. F3 caps first-paint JS at **30 KB**, and §0 says a criterion can't be quietly weakened. Keeping Next.js would therefore mean failing F3 by design.

**Decided (Xini, 2 Oct 2026): Astro**, as §4's own fallback describes.

Consequences:

- React, Next, Tailwind and the Next ESLint preset are removed. Runtime dependencies become `three` and `gsap` only (§15).
- Versions available today: astro 7.3.5, three 0.186.1, gsap 3.15.0.
- Astro 7 requires Node 22.12 or later. Pin `.node-version` to `22.18.0`, the local version, instead of `22`.

### 1.2 Deploy target

- **Output folder `out/`.** Set Astro's `outDir` to `./out`. Pages applies one build command and one output folder to every branch, so switching to `dist` would break `master` deploys before the merge. Keeping `out/` needs no dashboard change. Branch previews such as `rework-lattice.xini-dev.pages.dev` would then build with the same settings.
- **www.** `www.xini.dev` doesn't resolve today, so anyone who types it gets a browser error. **Decided:** add a proxied `www` record and one redirect rule, `www.xini.dev/*` → `https://xini.dev/${1}` (301). *Xini sets this up in the dashboard.* K1 is checked against it.
- **Environment variables.** `GITHUB_USERNAME=XiniDev` and `GITHUB_TOKEN` (a fine-grained token with read-only access to public repositories), set for both the production and preview environments. *Xini sets these in the dashboard.* Treat the token as required in practice. Pages builds share outbound IPs, so the 60-requests-an-hour anonymous limit is likely already spent by other builds. A failed fetch falls back to the snapshot, and then the daily refresh changes nothing.
- **Until the token exists, builds use the snapshot. Decided.**
  - Without `GITHUB_TOKEN`, a build reads `src/data/github-snapshot.json` and logs a warning saying so. It makes no anonymous fetch.
  - With the token, it fetches live and falls back to the snapshot on failure, as §10.5 says.
  - `npm run snapshot:github` still works anonymously on a local machine, which is how the first snapshot gets made in M2.
  - This makes the token a requirement for live data, a departure from §15, which lists it as optional. It's consistent with the point above.
- `xini-dev.pages.dev` keeps serving a copy of the site. The canonical tag takes care of SEO, so no action is needed.

### 1.3 Refresh mechanism

The flow: a Worker cron trigger (`0 3 * * *`) sends a POST to the Pages deploy hook. Pages rebuilds `master`. The build fetches from GitHub, falling back to the committed snapshot if that fails.

- The Worker lives in this repo, for example in `workers/daily-rebuild/`. It stores the hook URL as a Worker secret (`DEPLOY_HOOK_URL`). Its runs appear in the Cloudflare dashboard, which is the evidence E4 asks for.
- This differs from §10.5, which names a GitHub Actions schedule. The hook is the same; only the trigger changes. A GitHub schedule fails in exactly the case this feature exists for: the list reorders when *other* repos get pushes, which is when this repo sits quiet. Once GitHub disables a schedule, it never re-enables itself.
- **Decided.** *Xini creates the deploy hook.* Deploying the Worker (`wrangler deploy`, then `wrangler secret put DEPLOY_HOOK_URL`) also needs Xini's Cloudflare login.

### 1.4 Icon

- **Old mark.** A clean vector: six straight-edged polygons. Recolouring is clean technically, but the result doesn't read well. In one colour it becomes a figure-of-eight. In three tones of signal the X only shows from about 180px up. It fails §4's "reads well recoloured" test.
- **Spec fallback ("XINI" in Archivo, width 125, weight 800).** Legible at 180 and 512px, but a smear at 16px, which is the size tabs and bookmarks use.
- **Recommendation.** Use the X polygon from the wordmark (letter one of the prototype's `wordmark()`), signal on void, for `favicon.svg`, `apple-touch-icon.png` (180px) and a 512px maskable PNG with the content inside the safe zone. Also ship a 32px `favicon.ico`, because browsers request `/favicon.ico` whether or not the page links it. The particles draw this same X first, so the tab icon matches the hero.
- **Decided:** the wordmark X at every size, replacing the spec's fallback. The old mark is retired.

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

**Decided:** as in the table.

## 2. Spec conflicts and gaps the audit found

Each entry has a status. **Accepted** means Xini decided it on 2 October 2026; Xini's "spec gaps 1–5" are §2.1, 2.2, 2.3, 2.4 and 2.6. **Proposed** means the default stays until Xini answers. The affected criteria are in brackets.

### 2.1 As written, the shader makes the landing fail D1 [D1, D2, D3] — Accepted

At `lock = 1` the vertex shader keeps an idle noise term of `0.01 × (1 − calm)`, about ±1.6px at 1440×900. A Monte Carlo puts the drawn edge points within 2px at 80.6–91.5% at 1440×900 and 89.5–94.1% at 390×844. D1 requires at least 95% (AUDIT, appendix A.2).

§16.2 test 8 projects the `aE` attribute on the CPU, which scores 98.4–100%. The test as written would therefore pass while the drawn landing fails.

**Decided:** fade the idle noise out as the cards lock, and make test 8 check the positions the shader actually draws.

- Scale the idle noise by `(1 − lock)` through a new `uLock` uniform. §8.6 step 1 already intends this: "everything that could offset the final form settles to identity".
- Make the test hook apply the same vertex displacement in TypeScript, sharing its constants with the shader, so the test measures what is drawn.
- Use exact π in the turbulence term. The `3.14159` literal leaves a residue of about 1e-5. It's negligible, but fixing it costs nothing.

You'd see one change: the landed card outlines stop shimmering.

### 2.2 The finale doesn't fit at 844×390 or 320×568 [H5, D1, B3] — Accepted

With the prototype's CSS, the finale runs past the bottom of the pinned screen:

- 844×390: by 154px, or 148px with §7.3's short-screen type rule.
- 320×568: by 197px.

It fits at every other §11 size. The tightest are 360×740 (36px spare) and 1280×720 (92px spare). The pin uses `overflow: hidden`, so the cards get clipped and the particles would land on boxes that are partly off screen. H5 can't pass as specified. Adding repo links to the Gloam and DBridger cards (§19 question 3) makes each stacked phone card one line taller.

**Decided:** a compact finale for viewports where the finale doesn't fit, with the rules chosen by measurement in M1. Two constraints:

- **Drop the card thumbnails before cutting any copy.**
- **Keep only rules that measure as fitting.** A rule ships only if the finale measures as fitting at every §11 size, checked by an automated test.

Without a thumbnail, the landing samples card edges and text only. The prototype's sampler already handles a card with no thumbnail. Candidate rules, from the proposal, now applied after the thumbnails go:

- At heights of 560px or less: three columns of the horizontal phone card, and no finale intro line.
- On narrow, short phones: drop the tags line, and drop the thumbnail if that is still not enough.

Remove whole lines rather than clamping text. `Range.getClientRects()` still returns rectangles for lines hidden by `line-clamp`, so particles would land on text nobody can see. This changes the composition, so it's part of your B3 sign-off.

**As built (M1).** No fixed set of media queries fits every size. 360×740 needs the thumbnails dropped even though it's a normal phone, and 320×568 still overflows after dropping the thumbnails, the intro line and the tags. So the boot script measures and applies cumulative levels only until the finale fits:

1. Drop the thumbnails.
2. Lay the stacked cards out as a three-column row. This step only applies when the cards are stacked and the finale is at least 560px wide.
3. Cut the finale intro line.
4. Cut the tags.
5. Cut the step number.

It re-measures on resize and after the fonts load. Copy cut in steps 3–5 is hidden visually, not with `display: none`, so screen readers still read it (G3), and the landing ignores those 1px boxes.

The card link's 44px tap area now uses negative margins, so it adds no height.

Measured overflow in px (positive means clipped). Each column adds one more level:

| Viewport | Base | Thumbnails | Intro line | Tags | Step number |
|---|---|---|---|---|---|
| 320×568 | +239 | +110 | +63 | +9 | **−23** |
| 360×740 | **−11** | | | | |
| 375×667 (not in §11) | +35 | **−25** | | | |
| 844×390 | +164 | +10 | **−14** | | |
| 667×375 (not in §11) | +230 | +190, then the row layout fits | | | |

`tests/e2e/layout.spec.ts` asserts that the finale and every beat sit inside the pinned screen at every §11 size, in Chromium and WebKit.

**Re-measured on 2 Oct 2026, after the copy review (§2.12).** The finale intro line is gone, so its level is gone too. The levels are now: thumbnails, row, tags, step number. The review asked for the thumbnails back wherever they now fit. They don't fit anywhere new. The deleted line freed one line of height, but the cards gained more: the VOETutor credit line, and technology tags that wrap to two lines in the three-column row. Chromium and WebKit measure the same to the pixel:

| Viewport | Base | Thumbnails | Row | Tags | Step number | Applied now | Applied before |
|---|---|---|---|---|---|---|---|
| 320×568 | +208 | +113 | n/a | +29 | **−3** | thumbnails, tags, step | thumbnails, intro, tags, step |
| 360×740 | **−36** | | | | | none | none |
| 844×390 | +174 | +20 | n/a | **−16** | | thumbnails, tags | thumbnails, intro |
| 375×667 (not in §11) | +38 | **−57** | | | | thumbnails | thumbnails |
| 667×375 (not in §11) | +223 | +182 | +23 | **−9** | | thumbnails, row, tags | thumbnails, row |

Every other §11 size fits with everything shown, as before. One regression to note: at 844×390 the tags line, and the VOETutor credit line with it (both belong to the tags level), are now hidden visually, where the tags showed before. Screen readers still read both. I tested one remedy, the phone spacing on short screens (finale top 72px instead of 92px), which keeps the tags at 844×390. It fits with exactly 0px to spare in both engines, too thin to rely on, so it isn't applied. That trade is Xini's call (§4 questions).

**Decided (2 Oct 2026, after the comparison screenshots).** Xini chose all three recommendations:

- The step number now goes before the tags, so decoration goes before content.
- The row layout's minimum width drops from 560px to 500px, about 160px per text column. At 568×320 the finale is 536px wide.
- A last level, `tight`, removes the gap under the heading, sets the heading to 26px and trims the card padding. It cuts no copy, and because it's last it only applies where every other level has failed.

The order is now: thumbnails, row, step number, tags, tight. Measured in Chromium and WebKit, which agree:

| Viewport | Applied | Spare |
|---|---|---|
| 844×390 | thumbnails, step | 12px (tags and credit shown) |
| 740×360 | thumbnails, row, step | 22px (tags and credit shown) |
| 667×375 | thumbnails, row, step | 15px (tags and credit shown) |
| 568×320 | thumbnails, row, step, tags, tight | 10px (clipped by 176px before) |
| 320×568 | thumbnails, step, tags | 3px (same levels as before, in the new order) |

Every other §11 size fits with nothing hidden, as before. `tests/e2e/layout.spec.ts` checks that the finale and every beat sit inside the pinned screen and below the top bar, at the §11 sizes plus 740×360, 667×375 and 568×320. It also checks the level order on landscape phones.

### 2.3 The intro copy fade conflicts with first paint [F2, §8.1, §8.7] — Accepted

§8.1 requires the intro copy to be visible at first paint. That copy is also the Largest Contentful Paint element. §8.7 keeps the prototype's scripted fade-in, which starts 1.0s after the script runs.

With lazy loading, the stage arrives an unknown time after first paint. A `gsap.from` fade at that point would hide copy that is already on screen and fade it back in: a visible blink that also pushes LCP later.

**Decided:** run the copy fade in CSS from first paint, with the same motion: 0.9s, 0.09s stagger, rising from 22px. Drop the 1.0s delay, and turn the fade off under reduced motion. The particle fly-in still starts when the stage is ready, as §8.7 says. LCP then lands about one frame after first paint.

### 2.4 Nothing defines the page between first paint and stage start [H1, C4, G2] — Accepted

The inline `<head>` script adds the `js` class, so the pinned layout applies from first paint. But the copy choreography and the jump function live in the lazy chunk, which arrives after an idle callback (up to 1.2s) plus a download of about 200 KB. Until then:

- Beats 01–04 and the cards sit stacked on top of each other, unless CSS hides them.
- If CSS hides them, anyone who scrolls early scrolls through five screens of empty stage.
- Work, About, the skip link and incoming `/#work` links all land at the top of the stage.

On a slow connection this lasts seconds. If the chunk never arrives, it lasts until something triggers the fallback.

**Decided:** the boot script, which counts towards the first-paint budget, takes on four jobs:

- the maths between scroll position and timeline time
- the jump function
- handling the initial hash and `hashchange`
- a minimal controller that shows the beat for the current scroll position, using opacity only

When the stage starts, it takes over the same elements. The page is readable at every moment, so no arbitrary timeout is needed. The no-WebGL fallback triggers only on real failure: the import fails, WebGL2 context creation fails, or the context is lost. Estimated size: about 1.5 KB gzipped.

### 2.5 The project summaries need rewriting [A4, A5, E6] — Proposed (default applies)

§10.2 wants a one-sentence summary for each project, A4 bans copy from the old site, and A5 requires UK English. The 12 old blurbs run to 1–3 sentences each and use US spellings.

**Default:**

- Write one UK English sentence per project, condensed from its old blurb, with no new claims.
- Take the tags from the stack each blurb names.
- Write the alt text from each image. The old alt text is just "*Name* screenshot", and §9 asks for alt text that describes the screenshot.

You review the diff in M2.

### 2.6 Cloudflare rewrites the email link [§6.6, H1, A7, K3] — Accepted

Email Address Obfuscation (AUDIT §2) causes three problems:

- With JavaScript off, the address doesn't appear at all, which breaks §6.6 and H1.
- It adds a script the build doesn't control, and §2 says to add nothing.
- A link check against production finds `/cdn-cgi/l/email-protection#…` instead of a `mailto:` link.

**Decided:** turn Email Address Obfuscation off for the `xini.dev` zone. The address is already public on the live site, so this exposes nothing new. *Xini turns it off in the dashboard.* Until then, production keeps rewriting the link; the build output itself is clean.

### 2.7 Projects the §10.2 merge rules don't cover [E1, E6] — Proposed (defaults apply)

- **Overthrow Synthetica** lives in `BlueTentProductions/overthrow-synthetica`, outside `type=owner`, so it never joins. **Default:** fetch every curated `repo` whose owner isn't `GITHUB_USERNAME` with `GET /repos/{owner}/{name}`, and merge it exactly like an owned repo: same token, same snapshot, same rules.
- **ECS Platformer Demo** links to `XiniDev/Golden-Gun`, which has been renamed to `ecs-platformer-demo`. **Default:** store the current name, and have the build warn whenever a curated `repo` matches nothing, so future renames show up.
- **WSMath** has neither a repo nor a date, so rule 3 drops it. **Default:** leave it out until you give it an `updated` month.
- **Repos without descriptions** (AdventOfCode23 and 24, EnGarde, graphics-shooter-game) and the **`xini.dev` repo** itself. **Default:** list them all, showing an empty description line rather than placeholder text, and start `hiddenRepos` empty. Tell me any you want hidden.

### 2.8 Featured images [§9, E6] — Decided (§19 question 6)

- The source images stop at 800px wide, so the 1200px `srcset` entry would mean upscaling. **Default:** offer 480 and 800px only until larger sources exist. A card about 480px wide on a 2× screen wants about 1000px.
- DBridger (800×559) and VOETutor (800×590) aren't 16:10. **Default:** crop DBridger around its centre. Crop VOETutor's top 90 rows, which removes the signed-in header with its personal greeting and leaves exactly 800×500.
- All three are 49 KB or less at 800px as WebP, inside the 80 KB budget, and AVIF will be smaller.
- New logged-out screenshots at least 1200px wide would be better for all three.

**Decided:** use the three current images, cropped to 16:10, with VOETutor's signed-in header removed. Xini will supply fresh 1600×1000 screenshots later, so **swapping an image must be a one-file change.** How that works:

- Each project image is one source file, `src/assets/projects/<slug>.<ext>`. The extension can be png, jpg, webp or avif, and the build finds the file by slug.
- The current DBridger and VOETutor files are committed already cropped to 800×500, VOETutor with its top 90 rows removed. That means there are no per-image crop settings anywhere.
- The build always centre-crops to 16:10 and generates the 480, 800 and 1200px widths in AVIF and WebP. It skips any width larger than the source, so a 1600×1000 file gains the 1200px width automatically.
- The size report checks the 80 KB budget at 800px.
- The alt text lives in `src/data/projects.ts`. It needs editing only if a new screenshot shows something different.

**2 Oct 2026: VOETutor swapped.** Xini's new screenshot was flattened and cropped to 1920×1200 (16:10, no signed-in header), saved as `src/assets/projects/voetutor.webp` (quality 92), and the PNG deleted. The build now also generates the 1200px width for it, and its 800px files stay inside the 80 KB budget. The alt text was rewritten for the new page. The screenshot shows tutor cards with real names and photos, including Xini's own legal name. Xini should decide whether that's fine on a site where they go by Xini.

### 2.9 Copy claims I couldn't trace to the repo data [A4] — Open (default applies)

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
  - "progress tracking" and "secure video" on the VOETutor card. Since resolved: Xini confirmed "progress tracking" (the product is still being built), and "secure video" went with the old tags.

**Default:** keep the copy as written, since it may rest on work outside your public repos. Only you can confirm it.

### 2.10 Security headers (not in the spec) [optional] — Proposed (not built without a yes)

Beat 03 says "Secure by default", but today's responses carry only `referrer-policy`, and a technical reader can check that in seconds.

**Default if you say yes:** in M7, add these through `_headers`:

- `Strict-Transport-Security`
- a `Content-Security-Policy`: `script-src 'self'` plus a hash for the inline head script, `worker-src 'self'` and `frame-ancestors 'none'`
- `X-Content-Type-Options: nosniff`
- `Permissions-Policy`

The obfuscation script from §2.6 would break that CSP, which is one more reason to turn it off. This is small, but it's outside the spec, so it needs your yes.

### 2.11 ScrollTrigger can't meet F7, so the timeline is scrubbed by a small driver instead [F7, §12, §8.3] — Forced (found in M3)

§8.3 says to scrub the timeline with ScrollTrigger, but F7 and §12 require zero animation frames while the stage is off screen. ScrollTrigger 3.15 can't meet that. While it's enabled, it keeps a `requestAnimationFrame` loop running permanently: `_rafBugFix`, about 60 frames a second. Measured in M3, the loop kept running with the stage scrolled off screen, so F7 fails by construction.

**As built:** the same paused GSAP timeline, scrubbed by `scrubTimeline` in `src/lattice/timeline.ts`. It reproduces ScrollTrigger's behaviour:

- **Range:** start is `top top`; end is `bottom bottom`, which is the sticky pin's release point, `stage top + stage height − pin height`.
- **Scrub:** each scroll tweens the timeline's progress over 1s with `ease: 'expo'`, the ease ScrollTrigger's own scrub tween uses.
- **Reduced motion:** progress is set directly, with no smoothing.

GSAP's ticker then sleeps after 30 idle frames (`gsap.config({ autoSleep: 30 })`). In the F7 test, frames drop to zero within 2.5s of the stage leaving the screen. Removing ScrollTrigger also takes about 18 KB out of the stage chunk. The §8.3 timeline itself (times, eases, totals) and the jump maths are unchanged.

### 2.12 Copy is written for visitors [A4] — Decided (2 Oct 2026 review)

Xini added a rule to §6: every visible string is written for a visitor (a client, a recruiter or another engineer), never for the maintainer. That covers alt text, aria-labels, visually hidden text, titles, meta and Open Graph text, structured data, the 404 page, empty and error states, and noscript text. I reviewed every string in the built `/` and `/404` against it.

| Where | Before | After | Why |
|---|---|---|---|
| Finale, under "Featured work." | Three projects in full. Everything else follows below, newest push first. | *(removed)* | Commentary on the page and its sorting. |
| More on GitHub, intro | Everything else, newest push first, pulled from the GitHub API at build time. | *(removed)* | Describes how the site is built. |
| More on GitHub, empty state | The project list is being refreshed. See everything on GitHub. | [See all my projects on GitHub.](https://github.com/XiniDev) (the whole line is the link) | "Being refreshed" is a maintainer's status. |
| Footer | Client work runs through Saltancy. | I take on client projects through my consultancy, Saltancy. | Says what Saltancy is to a visitor. |
| Gloam summary | …per-creature line of sight and all 339 SRD spells automated. | …per-creature line of sight and all 339 spells from D&D’s open rules, automated. | "SRD" is an insider term. |
| Gloam tags | React Three Fiber, Colyseus, MCP server | TypeScript, React Three Fiber, Colyseus, SQLite, MCP | Tags are now each project's main technologies, from its repo. |
| DBridger tags | AI agents, legacy databases, PII redaction | Python, PyQt6, Gemini, SQLite, MCP | As above (the repo's requirements and source). |
| VOETutor tags | Marketplace, secure video | Next.js, Supabase | As above. There's no public repo, so these come from the old site's blurb. **Xini to confirm.** |
| VOETutor credit | *(none)* | Built through Saltancy | Xini: "just credit saltancy" (closes §4 question 2's credit choice). |
| VOETutor image alt | The VOETutor home page: the headline “Premium private tutoring, tailored for you”, a tutor search box, subject filters and a Vault of Excellence banner. | The VOETutor home page: the headline “Find your IB educator. Open the vault.”, a search box and cards for vetted IB tutors with their subjects and hourly rates. | Describes the new screenshot. |
| Saltancy Website summary | …my consultancy for end-to-end technical consultancy and custom software development. | …my consultancy for end-to-end technical work and custom software development. | Repeated word. |
| Notes API summary | Secure REST API for per-user notes with CRUD operations and advanced filtering, built on MongoDB and Mongoose following OWASP principles. | Secure REST API where each user creates, reads, updates and deletes their own notes, with filtering, built on Node.js, Express and MongoDB following OWASP guidance. | "CRUD" spelt out; stack from the repo. |
| LeadingOnes DAC summary | Model-based Dyna-DDQN reinforcement learning agent that improves learning quality and sample efficiency on the LeadingOnes (1+1) RLS benchmark for Dynamic Algorithm Configuration. | MSc dissertation: a model-based deep reinforcement learning agent that learns to tune an optimisation algorithm while it runs, improving learning quality and sample efficiency on a standard benchmark. | Three insider terms explained. |
| AI Search Algorithms summary | Uninformed, informed and bidirectional search algorithms for flight-route problems on an N×N polar grid. | Classic AI search algorithms, from breadth-first and depth-first to A* and SMA*, planning flight routes on a polar grid, each with an optional bidirectional mode. | Says which algorithms. |
| Nav label for Saltancy (follow-up) | Saltancy | Consultancy | A visitor can't tell what "Saltancy" is until the footer. Xini agreed. The link and A6 are unchanged: it still opens saltancy.com in a new tab. §5's layout table and §11 still say "Saltancy"; they fall outside §6, which is the only part I may edit, and §6.2 is the copy source. |
| Overthrow Synthetica summary (follow-up) | Two-week game jam demo built with Codethulu for the Warwick Game Dev Society, using Three.js and WebGL. | Two-week, two-person game jam demo for the Warwick Game Dev Society, made with my teammate Codethulu using Three.js and WebGL. | "Codethulu" read like a tool. Xini: it's the person who made it with them, in a two-person jam. |

The intro, the beats and the headings were approved, and all of them pass the rule, so none of them changed. The card summaries are unchanged. Xini confirmed "progress tracking" (VOETutor is still being built) and the Next.js and Supabase stack.

**GitHub's own repo descriptions (fixed 3 Oct 2026, §2.15).** The More on GitHub list shows each repo's GitHub description unless `projects.ts` has a curated summary. Several are written for the author, not a visitor (proposed replacements in §2.15): "My personal website :D", "Mini project to make an LOB to understand the market", "source code for wincrazyyy.github.io", "One of those fake mobile ad games type thingy", "cs261 coursework", and the jokey En-Garde, JumpAndShoot and AngryBallGame lines. Five repos have none at all. Setting the approved ones on GitHub fixes them here at the next daily rebuild, and fixes the GitHub profile too.

**Checks (A4, extended):**

- `tests/e2e/copy.spec.ts` fetches the raw HTML of `/` and `/404` and fails on `TODO`, `lorem`, `[confirm]`, `[from audit]` or `§`.
- `tests/unit/copy-rules.test.ts` fails if the site's own UI copy contains *API, build time, push, snapshot, placeholder, pulled from* or *prototype*. That means every string in `site.ts`, plus the text and the `alt`, `aria-label`, `title`, `content` and `placeholder` attributes of every template in `src/components`, `src/layouts` and `src/pages`. Project summaries and GitHub descriptions are outside this word check, as the review specified ("Notes API" is a project name), and are reviewed by hand against the rule.

### 2.13 The forms ran into the copy and the rail [B3, H5] — Fixed (2 Oct 2026 review)

At 844×390 the intro statement and credentials sat on top of the XINI wordmark. At 390×844 and 768×1024 the rail overlapped the forms. The §8 framing (`FIT` shares, `LIFT`, the right-hand shift) is a fraction of the screen, and nothing in it knows where the copy or the rail actually are.

**Rule:** at every §11 size and at jump targets 0, 1.5, 3.0 and 4.5, the middle 96% of the form's projected points stays at least 8px clear of the visible copy block and of the rail. The middle 96% is the box from the 2nd to the 98th percentile on each axis.

**As built:**

- **Spec target first.** For each beat the stage keeps the §8 target (scale, shift and lift) whenever the form clears the copy and the rail there.
- **Otherwise, fit.** It finds the free rectangles of the screen below the top bar, around the copy block and the rail, each grown by `FRAMING.clearancePx` (10px). It picks the largest scale at which the form fits in one of them, no larger than the target, and the position closest to the target. Recomputed on resize, on layout changes and after the fonts load.
- **The copy block is the text people see.** It is measured from the text-line rectangles, not the element's box, and from layout offsets, so the GSAP slide-in and the intro's rise animation don't move it.
- **The form's box is exact, not estimated.** For each beat, `npm run framing` precomputes from the same seeded forms the worker builds and writes `src/lattice/framing-tables.json` (8.4 KB gzipped, inside the stage budget). The table holds the 2nd and 98th percentiles of the point cloud along every screen-ray direction a box edge can take. Each value is the worst case over the sway, the pointer tilt and the camera orbit, padded by the idle noise's full reach. At runtime one small equation per edge gives the screen box for any scale and position.
- **Why not a simpler bound.** A bounding box with perspective came out 10–24% too large, which would shrink the forms for nothing. Projecting each edge at its points' average depth was up to 45px too small on large, close forms. Measured against all 18,000 points:

  | Bound | Error |
  |---|---|
  | Box corners | 10–24% too large |
  | Average edge depth | Up to 45px too small |
  | Table | Never too small; at most 2% larger than the sampled worst case |

- **The rail keeps one box at rest.** It used to change width with the active beat, because the active 36px line pushes the widest button out by 18px. The stage measured it at boot, so the obstacle was 18px short at later beats. Inactive buttons now reserve the difference as left padding, which transitions together with the line, so the rail looks the same.
- **Why 10px.** That's the 8px rule plus 2px for sub-pixel text metrics.
- **Not covered:** the pointer *push*, which moves particles away from the cursor. It's local and lasts only while the pointer moves.

**Measured:** the smallest clearance over the four jump targets, from one run each in Chromium and WebKit. Each run lands at a different point in the sway, so the figures vary a little between runs. The model guarantees at least 10px at every phase.

| Viewport | To the copy | To the rail | Frames changed from the target (beats 00–03) |
|---|---|---|---|
| 320×568 | 10.9px | 11.1px | wordmark 90% scale, left 0.44; D20 98% scale; network left 0.30, up 0.20 |
| 360×740 | 86.4px | 12.7px | wordmark down 0.83; D20 left 0.03; network left 0.19 |
| 390×844 | 174.3px | 12.7px | wordmark down 0.51; network left 0.14 |
| 430×932 | 228.7px | 12.9px | wordmark down 0.31; network left 0.09 |
| 768×1024 | 33.2px | 14.3px | wordmark left 0.28; D20 left 0.02; network left 0.11 |
| 1024×768 | 75.0px | 23.8px | wordmark left 0.21 |
| 1280×720 | 15.6px | 35.9px | wordmark left 0.07 |
| 1440×900 | 86.0px | 47.1px | none |
| 1920×1080 | 105.3px | 119.3px | none |
| 2560×1440 | 189.3px | 218.9px | none |
| 844×390 | 10.5px | 17.7px | wordmark 47% scale, up 0.56, above the copy; D20 left 0.10; network left 0.32 |

Movements are in world units, where the wordmark is about 5 units wide. The padlock (beat 03) keeps its target everywhere except a 0.02 nudge at 844×390. At 1440×900 every beat keeps its exact spec frame. At 390×844 the wordmark sits lower and the network slightly further left; both changes keep them clear of the rail. Both are part of the B3 sign-off.

`tests/e2e/clearance.spec.ts` checks the rule at all 11 sizes and all four targets in Chromium and WebKit. It projects every point with the test hook's `projectPoints()` and also checks that the rail's box doesn't change between beats. `tests/unit/framing.test.ts` checks the projection against a Three.js camera, that the table matches a fresh generator run, and that the table bounds the real percentile box at random sway, tilt and orbit angles while staying within 2% of the sampled worst case.

**Found, outside §11:** landscape phones narrower than 760px, such as 667×375 (iPhone SE and 8), get the phone layout: copy across the bottom and the rail top right. That leaves the forms a strip about 90px tall, so beats 01–03 fit at only 27–34% of their target scale. Before this fix they simply covered the copy. Giving short, wide screens the desktop arrangement (copy left, form right) would fix it. That's a layout change to the §11 phone rule, so it's Xini's call (§4).

**Decided (2 Oct 2026, after the comparison screenshots):**

- **Layout.** Screens at most 760px wide *and* at most 560px tall put the beat copy on the left, in a column 50% of the width, vertically centred below the top bar. The form sits on the right. The intro sits bottom left at 52% of the width, and beat headings scale to `clamp(28px, 9vh, 40px)`. Taller phones keep the §11 arrangement.
- **Targets.** The stage picks its framing targets by the same condition, `PHONE_MAX_WIDTH` and `SHORT_MAX_HEIGHT` in `config.ts`. So these screens use the desktop shares and the right-hand shift, while still counting as phones for the point budget.
- **Result.** Beats 01–03 now keep their full target scale at 740×360, 667×375 and 568×320, up from 27–63%. The wordmark is at 53–66%, framed above the intro.
- **Deviation.** This differs from §11's phone rule, which I may not edit; the spec's rule still holds for portrait phones.
- **Tests.** The clearance and nav-gap tests now also run at those three sizes, and a test checks the full target scale there. A unit test ties every CSS layout breakpoint to the two config constants.

### 2.14 Uneven gaps between the nav labels [B3] — Fixed (2 Oct 2026 review)

Each nav link had `min-width: 44px` with its label centred, so a label narrower than 44px ("Work") got extra space on both sides, and the visible gaps differed from link to link.

**Fixed:** every link has the same 8px padding on each side, so the visible gap between labels is the same everywhere: `clamp(16px, 2.4vw, 32px)`. That's the prototype's `clamp(14px, 2.4vw, 32px)` with the floor raised by 2px, so that on narrow phones the 44px targets meet instead of overlapping. The links keep `min-height: 44px`. `min-width: 44px` stays as a guard: today every label is already at least 44px wide with its padding, so it changes nothing, and if a shorter label is ever added it keeps the target size and lets the gap test fail rather than silently shrinking the target. A −8px right margin keeps the last label's text on the gutter, aligned with the rail. `tests/e2e/clearance.spec.ts` checks that the visible gaps, measured from the text itself, are equal within 2px at every §11 size, and G6 still checks the 44×44 targets.

### 2.15 GitHub repo descriptions [A4, §10.2] — Approved (2 Oct 2026), applied on GitHub (3 Oct 2026)

Xini approved every proposal except two. **overthrow-synthetica** keeps its empty description, because editing it needs admin rights on the organisation. **AdventOfCode23 and 24** are being deleted. The site reads descriptions from GitHub and never writes to it. On 3 Oct 2026 the 23 approved descriptions and the xini.dev homepage were set with the GitHub CLI under Xini's login. Read back, each matches this table word for word, and no other repo changed. The committed snapshot was then refreshed, because production builds use it until `GITHUB_TOKEN` is set. Drafted from each repo's README and source. A description that renders on this site is marked **site**: it's the row text in More on GitHub, because the repo has no curated summary in `projects.ts`. The rest show only on GitHub. "Edited" marks where I changed the research draft to meet the §6 visitor rule.

| Repo | Now | Proposed | Where |
|---|---|---|---|
| xini.dev | My personal website :D | Personal site of Xini, systems engineer: featured projects, background and contact details. (Also set the repo's homepage to https://xini.dev.) | site |
| Gloam | A tabletop DND simulator | Self-hosted 3D virtual tabletop for fifth-edition RPGs in the browser, with automated spells from the open rules, line of sight and physics dice. *Edited: "SRD 5.2.1" removed.* | GitHub (featured card) |
| dbridger | DBridger is a secure, native desktop AI gateway that lets you query local databases in plain English using Gemini, featuring automated PII masking and local SQL execution. | PyQt6 desktop app that queries a local SQLite database in plain English through Gemini, masking emails and card numbers before the model sees them. | GitHub (featured card) |
| saltancy-web | *(none)* | Website for Saltancy, a technical consultancy for web, backend and mobile systems, built with Next.js, Tailwind CSS and Motion. | GitHub (curated) |
| getajobman | *(none)* | Job tracker in Next.js and Supabase that reads a posting from its URL and drafts a tailored CV and cover letter with a language model. *Edited: "LLM" spelt out.* | site |
| limit-order-book | Mini project to make an LOB to understand the market | Limit order book matching engine in C++ and Python with price-time priority, limit and market orders, and O(1) cancellation. | site |
| AI-Search-Algorithms | AI Search Algorithms Implementation | Coursework: breadth-first, depth-first, uniform-cost, best-first, A* and SMA* search in Java, with bidirectional modes, routing flights on a polar grid. *Edited: acronyms spelt out.* | GitHub (curated) |
| LeadingOnesDAC | Masters Dissertation Project | MSc dissertation: dynamic algorithm configuration on the LeadingOnes benchmark with DDQN and model-based Dyna-DDQN agents. | GitHub (curated) |
| wincrazyyy.github.io | source code for wincrazyyy.github.io | Earlier React version of the WS Math tutoring website, with IBDP, A-Level and IGCSE course pages, pricing, reviews and an enquiry form. | site |
| Jungle-Board-Game-Java | Jungle Board Game in Java | The Jungle board game in Java with a Swing GUI for two local players, legal-move highlighting and hand-drawn piece art. | GitHub (curated) |
| NullVector-Processing | Processing Platformer - NullVector | 2D platformer in Processing (Java) with its own physics and contact resolution, pathfinding enemies and a two-phase boss fight. | GitHub (curated) |
| notes-api | This simple Notes API demonstrates RESTful service design with secure user authentication, Dockerized deployment, and MongoDB integration. Built to reinforce modern backend development practices for scalable systems. | REST API for per-user notes on Express and MongoDB, with JWT authentication, hashed passwords, an admin role and tag search, run with Docker Compose. | GitHub (curated) |
| AdventOfCode24 | *(none)* | *Not applied: Xini is deleting the repo (it was empty).* | site |
| aws-streaming-demo | Video Streaming Service Demo that uses AWS S3 and CloudFront CDN with other tools | React and Vite demo that streams video through Amazon CloudFront. *Edited: dropped the note that the video is switched off.* | site |
| firebase-auth-demo | Demo for Firebase Authentication | React demo of Firebase Authentication: email and Google sign-in, a protected dashboard route, and deploys to Firebase Hosting from GitHub Actions. | site |
| AutoScroller | One of those fake mobile ad games type thingy | Godot 4 prototype of a 3D auto-runner: the player moves forward on its own, steers left and right, and jumps to avoid falling off. | site |
| ecs-platformer-demo | Understanding ECS System in Game Dev | 2D platformer demo in C++ and SDL2 built on an entity component system (after Austin Morlan's design), with physics, collision and weapons. | GitHub (curated) |
| AdventOfCode23 | *(none)* | *Not applied: Xini is deleting the repo.* | site |
| EnGarde | *(none)* | Turn-based fencing game in Python and pygame, played against scripted bots or reinforcement-learning agents (DQN and self-play DRQN) trained with PyTorch. *Edited: explains DQN.* | site |
| graphics-shooter-game | *(none)* | Totem Hunter: a first-person shooter in three.js where you light totems to stop enemies spawning, with two guns, aim-down-sights and loot crates. | site |
| bitventory (fork) | A simple, flexible inventory engine for pygame projects | Inventory system for pygame with item stacking, stack splitting, sorting and drag-and-drop between windows (fork of codethulu/bitventory). | GitHub (forks aren't listed) |
| deutsche-bank-mentorship | cs261 coursework | University group project: a mentoring platform with mentor suggestions, milestones, sessions, ratings and chat, built in React and Django. *Edited: "CS261" removed.* | site |
| En-Garde--old- | Fencing is supposed to be reaction speed based, but this game is a turn based fencing game? An interesting concept indeed... | Earlier terminal version of EnGarde in C: a turn-based fencing game where you plan up to six actions a turn against a bot or a friend. | site |
| JumpAndShoot | Very Simple FPS Game. My second Unity game! | Simple first-person shooter made in Unity 2019.3, shared as a Windows build. | site |
| AngryBallGame | Warning! This game will make you break your keyboard! | Early Unity 2018.4 game, shared as a Windows build. *Low confidence: the repo holds only a build.* | site |
| overthrow-synthetica (BlueTentProductions) | *(none)* | *Not applied: left as it is, since it needs admin rights on the organisation.* | GitHub (curated) |

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
- **M3 (as built): forms, the start shell, dust and the landing sampling all run in the worker.** The main thread only reads the rectangles. Each form uses its own seeded stream (`seedFor()` in `config.ts`).
- **M3 (as built): `compileAsync` only runs when `KHR_parallel_shader_compile` exists.** Otherwise three.js logs a console warning, which H3 forbids, and falls back to the same synchronous compile anyway.
- **Tests: Chromium e2e runs on this machine's real GPU** (`--use-angle=d3d11`). Headless SwiftShader makes Chromium's GPU stack log "GPU stall due to ReadPixels" while it composites the canvas. That's environment noise, and the page never calls `readPixels`. On a Linux CI runner without a GPU those driver messages come back, and test 1 will report them.
- **Tests: WebKit's Tab key skips links**, like Safari's default. Its keyboard tests focus links directly, and the Tab-order checks run in Chromium and Firefox.
- **M6 (as built): stage start-up is split into tasks.** three.js is imported through `src/lattice/three.ts`, which re-exports only the classes the stage uses, so the separate import still tree-shakes.
  - The boot waits for the real `first-contentful-paint` entry, not a double `requestAnimationFrame`, before scheduling the idle import (F4).
  - three.js, GSAP and the stage code are imported one after another with a yield between, so each module graph evaluates in its own task.
  - `start()` yields between its steps: renderer, worker and DOM read, geometry, timeline, compile.
  - The first frame uploads only the attributes the intro draws (position, start shell, randoms). The other forms follow one per frame, or all at once if the stage starts mid-page.
- **M6: long tasks, measured.**
  - **Unthrottled** (Chromium on the RTX 2080 desktop, 1440×900 and 390×844, three runs each): no task over 50 ms after FCP, which is what F5 checks.
  - **Lighthouse's 4× CPU throttle at the phone profile (9,000 points):** no stage task over 50 ms. The only exception is the font-swap relayout (82–90 ms) in runs where FCP happens before Archivo arrives. That relayout comes from `font-display: swap`, which §7.2 requires, and the metric-matched fallbacks keep it shift-free.
  - **4× throttle at the 18,000-point desktop profile:** the first stage frame sometimes takes 51 ms. A desktop never runs at 4× throttle; F6 on real devices is Xini's measurement.
  - **Lighthouse mobile medians:** TBT 30 ms in the first M6 run and 166 ms in the final one (individual runs 57–167 ms), against the 200 ms budget. Lighthouse simulates 4× by scaling the tasks in its own trace, and tracing overhead inflates them. Its biggest item is the frame in which GSAP's tick and the first stage render share a task. Under the same mobile emulation without tracing, no frame after FCP takes over 30 ms.
- **M8: on GPU-less runners, test 1 ignores exactly one message.** That's Chromium's driver note `GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels`. It's ignored only when the WebGL renderer reports SwiftShader, because it comes from software compositing reading back the canvas, not from the page. Every other warning and error still fails the test, including that message on a real GPU.
- **M8: the stage creates its own WebGL2 context and passes it to three.js.** Found by the Linux CI run, where Firefox has no WebGL: if context creation fails, three.js logs a `console.error` before throwing. A failed `getContext('webgl2')` now goes straight to the silent no-WebGL fallback. Test 1 still fails on any page-originated message. The one exception is Firefox's own "Failed to create WebGL context" warning, which any feature detection triggers on such a browser, and it is ignored only when that browser cannot create a WebGL2 context at all and the page has fallen back to `no-gl`.
- **M8: F5 only runs on a real GPU.** In the Linux CI container, Chromium renders WebGL with SwiftShader, a CPU emulation of a GPU, and the stage start-up there takes one 63–67 ms task. That measures the emulator: work a GPU does elsewhere runs on the CPU. So the F5 test skips itself, with that reason, when the renderer is SwiftShader. The 50 ms threshold is unchanged and still enforced on GPU machines; this machine's RTX 2080 passes every run. Real-device numbers come from F6.
- **M8: J3 was checked by a CI-equivalent run, and Lighthouse in CI is informational.** Pushing is outside the build's remit, so GitHub Actions has not run yet. The workflow's steps ran instead on a clean clone of the M8 commit, inside `mcr.microsoft.com/playwright:v1.63.0-noble` (Ubuntu, no GPU, Node 24.20):
  - `npm ci`
  - `npm run check`: 0 errors
  - `npm test`: 270 passed
  - `npm run build`: every budget passes
  - `npm run test:e2e`: 177 passed

  In that container, Lighthouse measured TBT at 341 and 150 ms on its first two runs, then hung on the third. That's the SwiftShader effect again: without a GPU, the WebGL work runs on the CPU and Lighthouse multiplies it by 4. So in `ci.yml` the Lighthouse step is `continue-on-error` with a 10-minute limit. The §12 budgets themselves are enforced by `npm run lhci` on a GPU machine (F1 and F2 evidence). The first push will produce the hosted run.
- **M8: Lighthouse CI gets the Chromium path through its settings, not `collect.chromePath`.** With `collect.chromePath`, `lhci` passes the path to Lighthouse through the `CHROME_PATH` environment variable. On this machine that made the renderer crash during Lighthouse's back/forward-cache check (`Inspector.targetCrashed` after the `chrome://terms` hop), and the run then hung.

  I isolated it with otherwise identical invocations. With `--chrome-path`, every run finished in 14–15 s with no crash. With `CHROME_PATH`, every run crashed, regardless of flag order and with or without the stage's WebGL changes. `lighthouserc.cjs` now sets `settings.chromePath`. `lhci` already adds `--headless=new` itself, so the config no longer repeats it. The page is back/forward-cache eligible (the `bf-cache` audit scores 1).
- **M8: the QA screenshots are reproducible but not rewritten by every run.** `npm run qa` writes the committed set to `docs/qa/`. Test 9 inside `npm run test:e2e` writes to `test-results/qa/`, so routine test runs leave the working tree clean.
- **M8: the production smoke tests (K3) don't use the test hook.** `tests/e2e/smoke.spec.ts` covers tests 1, 2, 4 and 6, and runs locally in the normal suite. Against production it runs with `npm run test:e2e:prod` (`playwright.prod.config.ts`, `E2E_BASE_URL`).
- **M8: the daily-rebuild Worker is in `workers/daily-rebuild/`** with a cron at `0 3 * * *`, `triggerRebuild()` unit tests, and a type check in `npm run check`. Locally, `wrangler dev --test-scheduled` fired the cron and POSTed a mock hook.
- **3 Oct 2026: other owners' repos fail on their own.** The first production build with `GITHUB_TOKEN` fell back to the snapshot entirely. GitHub answered 403 for `BlueTentProductions/overthrow-synthetica`, because organisations can refuse fine-grained tokens even for public repos, and that one refusal discarded all the live data.
  - The owner's repo list is still all-or-nothing: if it fails, GitHub is down or rate-limiting.
  - Each curated repo with another owner now degrades on its own. A refusal (401 or 403, not a rate limit) is retried without the token, since the repo is public. Failing that, the repo keeps its snapshot entry, or is left out with a warning if it has none.
  - The warning appears in the build log, the snapshot script uses the same rule, and `tests/unit/github.test.ts` covers each path.
  - The first version used a TypeScript parameter property. The build and vitest compile those, but Node's type-stripping, which runs `scripts/*.ts`, rejects them, so the snapshot script crashed. `tsconfig.json` now sets `erasableSyntaxOnly`, so `npm run check` rejects any syntax the scripts can't run.
- **2 Oct 2026: pointer easing is time-based.** The pointer's influence used to ease by 6% per frame, which made it twice as fast on 120Hz screens. It now eases with a 187ms half-life (`POINTER.halfLifeMs`). At 60Hz that equals the old 6% per frame, so it behaves the same there. Found because C5's fixed 2.2s wait sat right on the 0.05 threshold at exactly 60fps; the test now waits for the decay itself, bounded by the config.
- **M7: Cloudflare's managed robots.txt adds its content-signals block to ours.** Confirm that Lighthouse's robots.txt audit still passes (SEO 100).

## 4. Open questions (§19): findings and decisions

| # | Question | What the audit found | Decision (2 Oct 2026) |
|---|---|---|---|
| 1 | GitHub username | The old site links `github.com/XiniDev`, which has 25 public repos (AUDIT §3). | **Decided:** `XiniDev` |
| 2 | VOETutor: own product or client work, Saltancy credit, summary | No public repo of Xini's (the code lives in `wincrazyyy/voetutor`, which Xini doesn't own). voetutor.com doesn't mention Saltancy. Its own description: "a curated marketplace of vetted IB educators… HD video lessons… on demand". That supports most of §6.4, but not "progress tracking" or "secure video". The old site filed it under Web, marked Live, as "built on Next.js and Supabase". | **Decided** (2 Oct 2026). Credit line "Built through Saltancy". Keep "progress tracking", because the product is still being built. The stack is Next.js and Supabase. "Secure video" went with the old tags. |
| 3 | Links for Gloam and DBridger | Both repos are public: `XiniDev/Gloam` (last push 1 Oct 2026) and `XiniDev/dbridger` (8 Mar 2026). Neither has a demo URL. | **Decided:** link each card to its repo, with the link text "Source on GitHub". |
| 4 | Footer contact | Email `xini@saltancy.com`, GitHub `XiniDev`, LinkedIn `in/xinidev`, plus X `@XiniDev`. Cloudflare currently obfuscates the email (§2.6). | **Decided:** the footer shows `xini@saltancy.com`, GitHub and LinkedIn. X stays in the data but isn't shown, and it's left out of `sameAs`. |
| 5 | Keep the old icon? | A clean vector, but in one colour it reads as a figure-of-eight (§1.4). | **Decided:** retire the old icon and use the wordmark X at all sizes. |
| 6 | Featured images | `gloam.webp` 800×500 (already 16:10), `dbridger.webp` 800×559, `voe.webp` 800×590 (signed-in header). Nothing is wider than 800px. | **Decided:** these three, cropped to 16:10 with VOETutor's signed-in header removed. Fresh 1600×1000 screenshots will follow, and each swap is a one-file change (§2.8). |
| 7 | Scroll length | Nothing in the audit bears on it. | **Decided:** 560vh. Judge it on a real device in M8. |
| 8 | Analytics | None on the page. Cloudflare's zone analytics are server-side and need no script. | **Decided:** no analytics. |
| 9 | Debug readout | — | **Decided:** show the HUD only with `?hud`. |

### Open questions from the 2 Oct 2026 review

Answered on 2 Oct 2026:

1. **VOETutor summary:** keep "progress tracking"; the product is still being built.
2. **VOETutor stack:** Next.js and Supabase, confirmed. The repo is `wincrazyyy/voetutor`, which Xini doesn't own, so the card keeps its voetutor.com link.
3. **Nav label:** "Saltancy" becomes "Consultancy" (§2.12).
4. **Overthrow Synthetica:** Codethulu is the teammate in a two-person jam. The summary now says so (§2.12).
5. **Claims the repos don't back up** (Notes API's OWASP, DBridger's "legacy databases", the LeadingOnes DAC results): keep as written. Notes API mostly follows OWASP, and the LeadingOnes results are in the dissertation report. None of these three will be featured; DBridger stays featured for now and will be replaced later.
6. **GitHub descriptions:** approved, except overthrow-synthetica and the two Advent of Code repos (§2.15).

Decided after the comparison screenshots (2 Oct 2026). Xini chose all three recommendations:

7. **Landscape finale:** the step number goes before the tags. See §2.2.
8. **Narrow landscape phones:** copy beside the form on short, narrow screens. See §2.13.
9. **568×320 finale:** fixed with a lower row threshold and the `tight` level. See §2.2.
