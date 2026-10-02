# Checklist

The success criteria from spec §17, copied word for word and grouped as in the spec. Tick an ID only when it passes, and add the evidence on an indented line beneath it: how it was verified, when, and a link to any file in `docs/qa/`.

**[Ready for Xini]** marks the ten criteria that need your eyes, your devices or your accounts. Everything automatable for them is already done and recorded, and each has exact steps. Tick one when its steps pass.

## A. Content and positioning

- [x] **A1** At 1440×900 and 390×844, the first screen shows the XINI wordmark, the statement and the credentials line without scrolling. *Verify by:* Screenshot at time 0
  - Evidence: `tests/e2e/stage.spec.ts` (A1) at 1440×900 and 390×844 in Chromium and WebKit: after the fly-in (intro = 1, morph = 0), the statement and credentials line sit inside the first viewport at opacity 1. More than 1% of the pixels above the statement are particle green, which is the XINI wordmark. The time-0 screenshots are in `docs/qa/`.
- [x] **A2** Beats 01–03 never mention a project: their text contains none of "Gloam", "DBridger" or "VOETutor". *Verify by:* E2E text assertion
  - Evidence: `tests/e2e/content.spec.ts` (A2): the text of beats 01, 02 and 03 contains none of "Gloam", "DBridger" or "VOETutor". Passes in Chromium and WebKit at all three sizes, and has since M1.
- [x] **A3** The finale shows exactly Gloam, DBridger and VOETutor, in that order, with the copy from §6.4. *Verify by:* E2E text assertion
  - Evidence: `tests/e2e/content.spec.ts` (A3): the finale's cards are exactly Gloam, DBridger and VOETutor in that order. Each title, summary and tag line equals the §6.4 copy in `src/data/projects.ts`, and the heading is "Featured work." Passes in Chromium and WebKit at all three sizes.
- [x] **A4** All copy matches §6 word for word; no copy from the old site remains, and no banned phrase appears anywhere. *Verify by:* Diff against `site.ts`; grep the build output
  - Evidence: `tests/e2e/copy.spec.ts`: every string in `src/data/site.ts` appears word for word on `/` or `/404` (only the empty-state line is skipped, because the list isn't empty). None of the 29 old-site phrases from the audit and none of the 7 banned phrases appear in the rendered text, the attributes or the title. `tests/unit/source.test.ts` greps the source for the banned phrases too.
- [x] **A5** UK English spelling throughout. *Verify by:* Review
  - Evidence: `tests/e2e/copy.spec.ts` (UK English) finds no -ize/-yze or US forms (color, center, behavior, modeling, catalog and so on) in the rendered text of `/` and `/404`. I also reviewed the copy, summaries and alt text by hand. The one US spelling in the GitHub data ("Dockerized", notes-api) is replaced by its curated summary and never renders.
- [x] **A6** Saltancy is linked from the nav and the footer, opening in a new tab with `rel="noopener"`. *Verify by:* E2E
  - Evidence: `tests/e2e/content.spec.ts` (A6) checks that the nav and footer links go to https://saltancy.com with `target="_blank"`, `rel="noopener"` and the hidden "(opens in a new tab)" text. Passes in Chromium and WebKit at 390×844, 768×1024 and 1440×900.
- [x] **A7** No link in production points to `#`, a placeholder or a dead URL. *Verify by:* Link checker over the build output
  - Evidence: `npm run links` (`scripts/check-links.ts`) over the build: 70 links on 2 pages and 30 external URLs, with no placeholder, missing internal file, missing fragment target or dead link. LinkedIn answers every automated request with 999, for real and made-up profiles alike, so it can't be checked by machine. The URL is the one from the old site that Xini confirmed (§19 question 4).

## B. Visual fidelity

- [x] **B1** All colours come from the tokens in §7.1 (plus the particle colours in the stage config); no other colour literals exist. *Verify by:* Grep CSS and components
  - Evidence: `tests/unit/source.test.ts` (B1) finds no hex, rgb, hsl or named colour in any CSS, Astro, TS or GLSL file outside `src/styles/tokens.ts` and `src/lattice/config.ts`. The CSS `:root` block, `theme-color` and the manifest are generated from `tokens.ts`.
- [x] **B2** Archivo is self-hosted and both axes work: beat headings render at width 125 and weight 760. *Verify by:* Computed styles and a visual check
  - Evidence: `tests/e2e/content.spec.ts` (B2): the beat h2 computes to `font-stretch: 125%` and `font-weight: 760` in Archivo. Exactly one Archivo face loads, from the site's own origin (`/_astro/archivo-latin-wdth-normal.*.woff2`), and no request leaves the origin.
- [ ] **B3** **[Ready for Xini]** Each beat at 1440×900 and 390×844 matches the prototype's composition: copy placement, form placement and scale, rail position. *Verify by:* Xini signs off the `docs/qa/` screenshots
  - Steps:
    1. Open `docs/qa/1440x900-t*.png` and `docs/qa/390x844-t*.png` (times 0.00, 1.75, 3.25, 4.75, 6.05 and 6.65).
    2. Open `docs/reference/lattice-prototype.html` in Chrome at the same two window sizes and scroll to the same beats.
    3. For each beat, compare the copy placement, the form's placement and scale, and the rail position. Two differences were decided, not drifted: Gloam and DBridger have "Source on GitHub" links, and on short screens the finale drops parts to fit (DECISIONS 2.2).
    4. Tick B3 if they match; otherwise note the beat and the difference here.
- [x] **B4** No racing or circuit asset, component or style remains in the repository. *Verify by:* Grep against the audit inventory
  - Evidence: `tests/unit/repo.test.ts` (B4): none of the audit-inventory files exist (`src/components/facet`, `src/app`, `public/icon.svg`, the Next configs, the image script, the VOLUMETRIC doc). Every text file outside `docs/` (source, tests, scripts, configs, README) contains none of the theme vocabulary: lap, circuit, bay, specimen, facet and the old class names. The only exceptions are the two files that list it as a ban.
- [x] **B5** The favicon set (SVG, 180px, 512px maskable) uses the decided icon in signal on void. *Verify by:* Inspect the build output
  - Evidence: `npm run icons` generates the set from the wordmark X polygon and the colour tokens. `tests/unit/repo.test.ts` (B5) checks `favicon.svg` (X polygon in `#3DFF8F` on `#020806`), `apple-touch-icon.png` at 180×180 and `icon-512-maskable.png` at 512×512 (void corner, signal centre, X inside the 80% safe circle), `favicon.ico` at 16/32/48, and the manifest's maskable entry. All of them are served from the build.

## C. Motion and interaction

- [x] **C1** Beat changes, morphs and the crossfade happen at the timeline times in §8.3 (within ±0.05 units). *Verify by:* E2E at sampled scroll positions
  - Evidence: `tests/e2e/stage.spec.ts` (C1 and C2) samples 17 times either side of each §8.3 boundary, ±0.05. Intro out by 0.85; beat 01 hidden at 1.07 and in by 1.55 with morph 1; the same pattern for beats 02 and 03; lock 0 at 4.95 and 1 at 6.05; cards and fade 0 at 5.95 and 1 at 6.40. Passes in Chromium and WebKit.
- [x] **C2** Scrolling backwards reverses every morph and copy change exactly. *Verify by:* Manual and E2E
  - Evidence: Same test, reverse pass: it revisits each recorded scroll position from 6.65 back to 0.45 and gets identical morph, lock, fade, beat opacities and card opacity at every sample. Passes in Chromium and WebKit.
- [x] **C3** The rail marks the current beat, shows its label, and jumps to the correct target when clicked. *Verify by:* E2E
  - Evidence: `tests/e2e/stage.spec.ts` (C3 and test 3): clicking each rail button lands within ±0.05 of its jump target. The expected beat is then the most visible copy block, its button has `aria-current="step"` and its label is at opacity 1. At 6.4 the rail is hidden. Passes in Chromium and WebKit.
- [x] **C4** Work, About and the skip link jump to their targets; Work leaves the cards fully visible. *Verify by:* E2E
  - Evidence: `tests/e2e/stage.spec.ts` (C4): Work lands at 6.4 with all three cards inside the viewport at opacity 1, and About lands at 1.5. The skip link (Tab, in Chromium) jumps to 6.4 and moves focus to `#work-heading`. WebKit's Tab key skips links like Safari's default, so there the test focuses the skip link directly before pressing Enter.
- [ ] **C5** **[Ready for Xini]** Pointer repulsion and tilt work on desktop and are off during lock, under reduced motion and on touch. *Verify by:* Manual
  - Steps:
    1. Run `npm run build && npm run preview`, then open http://127.0.0.1:8788 on a desktop with a mouse.
    2. At beats 01–03, move the mouse across the form. Points near the cursor should push away and the form should tilt a little, easing out about 1.4 s after you stop.
    3. Click Work to go to the finale and move the mouse again. Nothing should react during the lock.
    4. Turn on reduce motion in the OS (Windows: Settings → Accessibility → Visual effects → Animation effects off) and reload. Nothing should react.
    5. On a phone or tablet, drag and scroll through beats 01–03. Touch should never push the particles.
    6. The automated part already passes (`tests/e2e/stage.spec.ts` C5: strength above 0.5 with a mouse, 0 during the lock, 0 for touch).
- [ ] **C6** **[Ready for Xini]** Network pulses appear only while the network is on screen. *Verify by:* Manual
  - Steps:
    1. In the same preview, scroll slowly from beat 01 to beat 03.
    2. Bright pulses should travel along the links only while the neural network (beat 02) is on screen. There should be none on the d20, the padlock or the landing, and they should fade as the network morphs away.
    3. With reduce motion on, there should be no pulses at all.
- [x] **C7** The fly-in plays once on a fresh load at the top, and is skipped when the stage loads mid-page or under reduced motion. *Verify by:* Manual and E2E
  - Evidence: `tests/e2e/stage.spec.ts` (C7): on a fresh load at the top, `introPlayed` is true and intro rises to 1. A fresh load of `/#about` starts mid-page with `introPlayed` false and intro already 1. The reduced-motion case is covered by test 5 (G4). Passes in Chromium and WebKit.

## D. The landing

- [x] **D1** At time 6.65, at least 95% of each card's edge particles lie within 2px of its card or thumbnail borders, at 1440×900 and 390×844. *Verify by:* E2E test 8
  - Evidence: `tests/e2e/landing.spec.ts` (test 8) at 1440×900 and 390×844, in Chromium and WebKit, at time 6.65. It projects the positions the shader actually draws: `drawnPosition()`, a TypeScript port of the vertex shader, run with the live uniforms and the points' world matrix and camera. For each of the three cards, at least 95% of its edge particles lie within 2px of the card or thumbnail border. The idle noise fades out with `uLock` (DECISIONS 2.1).
- [x] **D2** Every title and text line's particles sit inside that line's rectangle expanded by 3px. *Verify by:* E2E test 8
  - Evidence: Same test: every text particle sits inside its own line rectangle (from `Range.getClientRects()`) expanded by 3px. There are 0 outliers across all lines at both sizes and in both engines, and also after the resize, the rotation, the late font load and the summary change.
- [ ] **D3** **[Ready for Xini]** After the crossfade, the cards are at full opacity, the particles at 28% of base, and there is no visible jump or misalignment. *Verify by:* Screenshot at 6.65 and manual review
  - Steps:
    1. Open `docs/qa/1440x900-t6.65.png` and `docs/qa/390x844-t6.65.png`. The cards should be at full opacity with a faint particle glow on their borders.
    2. In the preview, scroll slowly from Featured work (6.0) to the end of the stage (6.65). The particles should fade into the cards, with no jump, offset or shimmer, at both sizes.
    3. The automated part already passes: particles at 0.28 × base alpha, cards at opacity 1, and test 8 alignment.
- [x] **D4** The landing realigns within 200 ms of a resize, an orientation change and the font load. *Verify by:* E2E test 8 (resize case) and manual rotation
  - Evidence: `tests/e2e/landing.spec.ts` (D4) in Chromium and WebKit. Resizing 1440×900 → 1280×720 and rotating 390×844 → 844×390 both rebuild the landing in under 200 ms after the last resize event (120 ms debounce plus the worker). A font face that finishes loading after the stage starts triggers a rebuild in under 200 ms. All of them re-pass the test 8 alignment.
- [x] **D5** Changing a card's summary in `projects.ts` realigns the landing with no other code change. *Verify by:* Edit, rebuild and rerun test 8
  - Evidence: I appended a sentence to DBridger's summary in `src/data/projects.ts`, rebuilt, and test 8 passed in all four browser and size projects with no other change (2 Oct 2026). I then reverted the edit. `tests/e2e/landing.spec.ts` (D5) also edits a card's text live: the MutationObserver rebuilds the landing, and test 8 still passes.

## E. Projects and GitHub ordering

- [x] **E1** The build lists repositories for `GITHUB_USERNAME`, ordered by `pushed_at` (newest first), with archived and stale items under "Older projects". *Verify by:* Unit tests and build output
  - Evidence: Unit tests (`tests/unit/github.test.ts`: newest first, archived and stale items in older, ties alphabetical, 12-item cap) and the build log `[github] source=snapshot user=XiniDev fetched=26 included=23 recent=11 older=12`. `tests/e2e/github.spec.ts` checks that the rendered rows match the merged, ordered data.
- [x] **E2** Featured projects, forks and hidden repos never appear in the list. *Verify by:* Unit tests
  - Evidence: `tests/unit/github.test.ts` (merge): featured projects, forks, `hidden` projects and `hiddenRepos` entries never appear. `tests/e2e/github.spec.ts` confirms Gloam, DBridger, VOETutor and the `bitventory` fork are absent from the rendered list.
- [x] **E3** The build succeeds with GitHub unreachable, uses the snapshot and logs a warning. *Verify by:* Run the build with the network blocked
  - Evidence: `GITHUB_TOKEN=dummy GITHUB_API_URL=http://127.0.0.1:59999 npx astro build` exits 0 and logs `[github] using the committed snapshot from 2026-10-02T15:19:15.049Z: fetch failed (connect ECONNREFUSED 127.0.0.1:59999)`. Unit tests cover a thrown fetch, a 403 rate limit, no token, and a missing snapshot.
- [ ] **E4** **[Ready for Xini]** The daily refresh is configured and documented, and has run successfully at least once. *Verify by:* CI or host logs
  - Steps:
    1. First complete the setup tasks below: the deploy hook, the Worker deployed, and `DEPLOY_HOOK_URL` set as its secret.
    2. The day after, open Cloudflare dashboard → Workers & Pages → `xini-dev-daily-rebuild` → Logs, and confirm the 03:00 UTC run logged `xini-dev rebuild triggered … (hook 200)`.
    3. In Pages → `xini-dev` → Deployments, confirm a deployment started by the deploy hook just after 03:00 UTC, and that its build log shows `[github] source=live`.
    4. Already verified: the Worker unit tests, and a local `wrangler dev --test-scheduled` run that fired the cron, which POSTed a mock hook and logged the trigger.
- [x] **E5** Each row shows name, description, language and "Updated Mon YYYY". *Verify by:* E2E
  - Evidence: `tests/e2e/github.spec.ts`: each of the 23 rows has the name (linked to the homepage or repo), the description, the language and `Updated Mon YYYY` with a `datetime`. GitHub has no description for 5 repos (getajobman, AdventOfCode23, AdventOfCode24, EnGarde, graphics-shooter-game) and no language for 3, so those cells are empty (DECISIONS 2.7). Adding descriptions on GitHub fills them on the next daily build.
- [x] **E6** Every project from the old site is migrated into `projects.ts` with its image where one exists; missing images show the placeholder. *Verify by:* Compare with the audit table
  - Evidence: `tests/unit/projects.test.ts`: all 12 audit-table projects are in `projects.ts`, each with its image file in `src/assets/projects/`, descriptive alt text, a one-sentence summary and a real link. `tests/e2e/content.spec.ts` (E6) shows that an empty thumbnail keeps the dotted `--thumb` placeholder and that broken-image alt text is transparent.

## F. Performance

- [x] **F1** Lighthouse mobile medians: Performance ≥ 90, Accessibility 100, Best Practices ≥ 95, SEO 100. *Verify by:* Lighthouse CI
  - Evidence: `npm run lhci` in the final verification run: Lighthouse 12.6.1, mobile, simulated throttling, 3 runs against the production build served by `wrangler pages dev`. Median-run scores: Performance 1.00 (1.00, 1.00, 1.00), Accessibility 1, Best Practices 1, SEO 1. Every `lighthouserc.cjs` assertion passes, and the exit code is 0.
- [x] **F2** LCP ≤ 2.5 s, CLS ≤ 0.02, TBT ≤ 200 ms (Lighthouse mobile). *Verify by:* Lighthouse CI
  - Evidence: Same final lhci run, medians: LCP 1,518 ms (runs 1,299–1,559; budget 2,500), CLS 0.0000 (budget 0.02), TBT 61 ms (runs 46–65; budget 200). Earlier runs the same day had TBT medians of 30–166 ms, all inside the budget; DECISIONS §3 (M6) has the analysis.
- [x] **F3** First-paint JS ≤ 30 KB gz, CSS ≤ 20 KB gz, stage chunk ≤ 200 KB gz, font ≤ 95 KB. *Verify by:* Build size report
  - Evidence: The final `npm run build` ends with the size report (`scripts/size-report.ts`, gzip -9). First-paint JS 4.2 KB gz (budget 30), first-paint CSS 3.8 KB gz (budget 20), first-paint total 12.6 KB gz (budget 60), stage graph 162.5 KB gz (three 126.0, gsap 26.5, stage 6.5, worker 3.6; budget 200), font 88.0 KB as one preloaded WOFF2 (budget 95), featured images at 800w ≤ 46.5 KB (budget 80).
- [x] **F4** The stage chunk requests start after First Contentful Paint. *Verify by:* Network waterfall
  - Evidence: `tests/e2e/perf.spec.ts` (F4), Chromium and WebKit at 390×844 and 1440×900. Every lazy chunk (three, gsap, stage, worker) has a resource `startTime` later than `first-contentful-paint`, and the served HTML has no `modulepreload` links. The boot waits for the real FCP entry before scheduling the idle import.
- [x] **F5** No main-thread task over 50 ms after first paint, including stage start-up. *Verify by:* Performance trace
  - Evidence: `tests/e2e/perf.spec.ts` (F5 @perf), Chromium at 390×844 and 1440×900, run alone with one worker. The Long Tasks API records no task over 50 ms after FCP through stage start-up and a full scroll. At Lighthouse's 4× CPU throttle the phone profile has no stage task over 50 ms; the only one is the `font-display: swap` relayout, in runs where FCP beats the font. Details in DECISIONS §3 (M6).
- [ ] **F6** **[Ready for Xini]** Median ≥ 55 fps on the desktop reference and ≥ 50 fps on the phone reference, scrolling the whole stage. *Verify by:* Performance traces recorded in the checklist
  - Steps:
    1. Desktop reference (an Apple M1 or Intel Iris Xe machine): open the preview (or production) with `?hud`.
    2. Record a performance trace while scrolling the whole stage at a steady pace: Chrome DevTools → Performance, or Safari → Timelines.
    3. Read the median fps from the frames track (or note the HUD's fps throughout) and enter it in the device-pass table below. It must be at least 55.
    4. Repeat on the phone reference (a Pixel 7a or iPhone 12). It must be at least 50.
- [x] **F7** No animation frames run while the stage is off screen or the tab is hidden. *Verify by:* Performance trace
  - Evidence: `tests/e2e/stage.spec.ts` (F7) counts every `requestAnimationFrame` callback. It records 0 frames over 1s once the stage is scrolled off screen, and 0 once the document reports hidden, against more than 5 frames over 0.5s while the stage is on screen. This needed ScrollTrigger replaced (DECISIONS 2.11). Passes in Chromium and WebKit.
- [x] **F8** Point counts and pixel-ratio caps match §8.4 on desktop and low-power devices. *Verify by:* `?hud` readout
  - Evidence: `tests/e2e/stage.spec.ts` (F8) reads the `?hud` readout. At 1440×900 with DPR 2 and 8 cores: "18,000 points … pixel ratio 1.5". At 390×844 with DPR 3: "9,000 points … pixel ratio 1.25". At 1440×900 with 4 cores: "9,000 points … pixel ratio 1.25". There is no readout without `?hud`.

## G. Accessibility

- [x] **G1** axe-core finds no serious or critical issues in the default, reduced-motion and no-WebGL modes. *Verify by:* Automated
  - Evidence: `tests/e2e/a11y.spec.ts` (G1) runs `@axe-core/playwright` with the WCAG 2.0/2.1/2.2 A and AA and best-practice tags. It finds 0 serious or critical violations in all four cases: default mode (top and finale), reduced motion, no WebGL (stage chunk blocked) and the 404 page. Chromium and WebKit, at 390×844, 768×1024 and 1440×900.
- [x] **G2** Every interactive element is reachable by keyboard with a visible focus ring; the skip link works; focus into the finale jumps to it. *Verify by:* E2E test 7
  - Evidence: `tests/e2e/a11y.spec.ts` (G2 and test 7), in Chromium at 390×844 and 1440×900. Tab visits every rendered link, button and summary (indexed so none can hide behind a duplicate), and each shows `:focus-visible` with `outline: 2px solid rgb(61, 255, 143)` at a 3px offset. Tabbing to voetutor.com jumps to the finale with the cards at opacity 1. The skip link is first and moves focus to `#work-heading`. Moving the rail ahead of the content in the DOM fixed a skipped rail. WebKit's Tab key skips links, like Safari's default.
- [ ] **G3** **[Ready for Xini]** A screen reader reads all beat copy in order, including inactive beats. *Verify by:* VoiceOver or NVDA pass
  - Steps:
    1. Windows: start NVDA and open the preview in Firefox or Chrome. Mac or iPhone: start VoiceOver and use Safari.
    2. From the top, read the whole page in browse mode (NVDA: Insert+Down Arrow; VoiceOver: VO+A).
    3. Expect this order: the top bar and nav; "Xini, systems engineer" (h1); the statement and credentials; beats 01, 02 and 03 (step, heading, body, supporting line); "Featured work." and its line; the three cards; More on GitHub; the footer. All of them should be read even though only one beat is visible.
    4. Rail buttons should announce as, for example, "Systems, section 01".
- [x] **G4** Reduced motion behaves exactly as §8.10 describes. *Verify by:* E2E test 5 and manual
  - Evidence: `tests/e2e/a11y.spec.ts` (G4 and test 5) with `reducedMotion: 'reduce'`: no fly-in (intro is 1 at start); morphs are whole numbers at every sample; beats change at the same scroll positions as the normal timeline, with opacity only and no transform; `calm` is 1, so there's no time noise, turbulence or pulses; pointer influence stays 0; the cue and intro copy animations are `none`; About jumps instantly; and 0 animation frames run in the second after scrolling stops. Chromium and WebKit.
- [x] **G5** All text meets 4.5:1 contrast. *Verify by:* Automated plus the table in §7.1
  - Evidence: `tests/unit/contrast.test.ts`: ink, body, mute and signal each reach at least 4.5:1 on `--void`, `--thumb`, the card background over void and the top-bar scrim. It also reproduces the §7.1 figures (19.3, 12.9, 7.6, 15.3). axe's colour-contrast rule raises no violation (G1).
- [x] **G6** Touch targets on phones are at least 44×44px. *Verify by:* Manual measurement
  - Evidence: `tests/e2e/a11y.spec.ts` (G6) at 390×844 in Chromium and WebKit. Every visible link, button and summary is at least 44×44: the nav, the mark (now `min-width: 44px`), the rail buttons, the GitHub rows, the Older summary, the footer links, the focused skip link, and the card links at 6.4. Card-link padding uses negative margins so it adds no height.

## H. Resilience

- [x] **H1** With JavaScript off, or with the stage chunk blocked, all content is readable in normal flow with no blank areas. *Verify by:* E2E test 6 and a no-JS check
  - Evidence: `tests/e2e/fallback.spec.ts` covers two cases: JavaScript disabled, and the stage chunk blocked (which falls back to `no-gl`). In both, all 5 beats and 3 cards are at opacity 1, stacked in normal flow, and the canvas, rail and vignette are hidden. Passes in Chromium and WebKit at all three sizes.
- [x] **H2** WebGL context loss switches to the fallback layout without errors. *Verify by:* Force `WEBGL_lose_context` in a test
  - Evidence: `tests/e2e/a11y.spec.ts` (H2): at time 3.0, `WEBGL_lose_context.loseContext()` switches to `no-gl` with no console errors or page errors. Beat 02 (the one being read) stays on screen at opacity 1, and every beat and card is at opacity 1 in flow. `restoreContext()` brings back the pinned stage at morph 2. Chromium and WebKit.
- [x] **H3** No console errors or warnings in Chrome, Safari and Firefox. *Verify by:* E2E test 1 and the manual pass
  - Evidence: Test 1 (`tests/e2e/console.spec.ts`, `@engines`) finds no console errors, warnings or page errors on load and through a full scroll. It runs in Chromium (GPU, 3 sizes), WebKit (3 sizes) and Firefox (desktop), and the smoke copy (`tests/e2e/smoke.spec.ts`) passes as well. Only on GPU-less runners does it ignore one message: Chromium's SwiftShader 'GPU stall due to ReadPixels' driver note. The §16.4 device pass re-checks real Safari and Firefox.
- [x] **H4** No horizontal scrolling at any width from 320 to 2560px. *Verify by:* E2E test 2
  - Evidence: Test 2 (`tests/e2e/layout.spec.ts` and the smoke copy) checks every §11 size (320×568 to 2560×1440, plus 844×390), each at the top, middle and bottom of the page. `scrollWidth ≤ innerWidth` everywhere, in Chromium and WebKit.
- [x] **H5** At 844×390 (landscape phone) no copy is clipped. *Verify by:* Screenshot
  - Evidence: `tests/e2e/layout.spec.ts` (H5 and DECISIONS 2.2): at 844×390 every beat and the finale sit inside the pinned screen. The finale uses compact levels 1–3, and nothing is clipped. Screenshots `docs/qa/844x390-t*.png` at all six times.

## I. SEO and sharing

- [x] **I1** Title, description, canonical, Open Graph, Twitter and JSON-LD tags are present and validate. *Verify by:* Validators
  - Evidence: `tests/e2e/seo.spec.ts` (I1) checks the §6.1 title, description, canonical `https://xini.dev/` and `lang="en-GB"`. It checks the Open Graph tags (type, site name, locale, title, description, url, image with type, size and alt) and the Twitter `summary_large_image` tags. It parses the JSON-LD `Person` (name, url, jobTitle "Systems engineer", the two `CollegeOrUniversity` entries in `alumniOf`, `worksFor` Saltancy, `sameAs` GitHub and LinkedIn) and confirms every URL is absolute HTTPS. Validated locally against the schema.org types; no content was sent to an external validator.
- [x] **I2** `og.png` is 1200×630 and shows the particle wordmark. *Verify by:* Inspect
  - Evidence: `npm run og` (`scripts/og.ts`) renders the intro frame at 1200×630 after the fly-in finishes, with the DOM text hidden, and writes `public/og.png`. `tests/e2e/seo.spec.ts` (I2) confirms `/og.png` is served as `image/png` at exactly 1200×630, with about 1.9% of its pixels in particle green. I viewed it: the XINI wordmark in particles on `--void`.
- [x] **I3** `sitemap.xml` and `robots.txt` exist; every retired old URL returns 301 to its decided target. *Verify by:* `curl -I` each old URL
  - Evidence: `curl -I` against the production build under `wrangler pages dev` (Pages' `_redirects` and 404 handling). `/icon.svg` → `301 Location: /favicon.svg`. `/`, `/favicon.ico`, `/robots.txt` and `/sitemap.xml` → 200. Old build files (`/index.txt`, `/__next._full.txt`, `/_not-found.html`, `/_next/static/chunks/*`, `/projects/*.webp`, `/assets/index-*`) → 404, as DECISIONS §1.5 decided. `tests/e2e/seo.spec.ts` asserts all of this and that `#projects`, `#work`, `#about`, `#home` and `#contact` land on their sections.
- [x] **I4** The 404 page uses the site's tokens and type and links home. *Verify by:* Visit an unknown URL
  - Evidence: `tests/e2e/content.spec.ts` (I4): `/no-such-page` returns 404 with the §6.7 heading, body and a link to `/`. It has no canvas, a `--void` background and Archivo at width 125.

## J. Code quality and documentation

- [x] **J1** TypeScript strict mode, with no `any` in `src/lattice` or `src/lib`. *Verify by:* `tsc --noEmit` and grep
  - Evidence: `npm run check`: `astro check` reports 0 errors and 0 warnings across 57 files, with `extends: astro/tsconfigs/strict`, and the Worker passes `tsc --noEmit`. `tests/unit/repo.test.ts` (J1) finds no `any` in any file in `src/lattice` or `src/lib`.
- [x] **J2** Every tunable number from Appendix A lives in `lattice/config.ts`. *Verify by:* Review
  - Evidence: Reviewed: every Appendix A number lives in `src/lattice/config.ts`. That covers A.1 camera, keys, group, fits and lifts, dust; A.2 and A.3 shader constants, passed to the GLSL as `#define`s by `pointDefines()` and `dustDefines()`; and A.4 timings and eases, plus the landing, form and pointer parameters. `stage.ts`, `timeline.ts`, `landing.ts`, `displace.ts`, `worker.ts` and the shaders contain no tunable literals.
- [x] **J3** Unit and E2E suites pass in CI. *Verify by:* CI
  - Evidence: CI-equivalent run of `.github/workflows/ci.yml`'s steps on a clean clone of the M8 commit in `mcr.microsoft.com/playwright:v1.63.0-noble` (Ubuntu, no GPU). `npm ci`; `npm run check` 0 errors, 0 warnings; `npm test` 270 passed (7 files); `npm run build` with every budget passing; `npm run test:e2e` 177 passed in Chromium, WebKit and Firefox, with F5 skipping itself on SwiftShader. Pushing is outside the build's remit, so the GitHub-hosted run happens on Xini's first push (DECISIONS §3, M8).
- [x] **J4** The README covers local development, build, environment variables, how to edit copy and projects, and how ordering and refresh work. *Verify by:* Review
  - Evidence: `README.md` covers local development, every script, the environment variables, editing copy, projects, images and hidden repos, the GitHub ordering and merge rules, the snapshot fallback, the daily-refresh Worker with deploy steps, and the repo structure.
- [x] **J5** `docs/AUDIT.md`, `docs/DECISIONS.md` and `docs/CHECKLIST.md` exist and are complete. *Verify by:* Review
  - Evidence: `docs/AUDIT.md` (all eight §4 sections plus measurements), `docs/DECISIONS.md` (the five §4 decisions, gaps 2.1–2.11 with status, implementation notes, §19 answers) and this checklist, with evidence for every ID.

## K. Deployment

- [ ] **K1** **[Ready for Xini]** Production serves <https://xini.dev> with the existing domain setup (www behaviour as decided in the audit). *Verify by:* Visit both hosts
  - Steps:
    1. Merge `rework/lattice` into `master` and push. Pages deploys the new site.
    2. Visit https://xini.dev: it should be the Lattice site.
    3. Run `curl -I https://www.xini.dev/`. It should return 301 with `location: https://xini.dev/`, once the www record and redirect rule from the setup tasks exist.
- [ ] **K2** **[Ready for Xini]** Production environment variables are set, and the first production build fetched GitHub successfully. *Verify by:* Build log
  - Steps:
    1. In Pages → `xini-dev` → Settings → Environment variables, confirm `GITHUB_USERNAME` and `GITHUB_TOKEN` exist for Production.
    2. Open the first production build's log and confirm `[github] source=live user=XiniDev fetched=… included=…`. If it says `source=snapshot`, the token is missing or invalid.
- [ ] **K3** **[Ready for Xini]** The E2E smoke tests (1, 2, 4 and 6) pass against the production URL. *Verify by:* CI against production
  - Steps:
    1. After the production deploy, run `npm run test:e2e:prod`. It runs smoke tests 1, 2, 4 and 6 against https://xini.dev in Chromium and WebKit.
    2. Every test should pass. Turn off Email Obfuscation first, so the production page carries no extra script.
    3. The same smoke tests already pass against the local production build (`tests/e2e/smoke.spec.ts`).

**Definition of done:** every ID in A to K is ticked in `docs/CHECKLIST.md` with its evidence, and Xini has signed off B3 and D3.

## Setup done by Xini (Cloudflare dashboard)

Xini does these in the Cloudflare dashboard and ticks each one when it's done. Until `GITHUB_TOKEN` exists, every build uses the committed GitHub snapshot (DECISIONS §1.2).

- [ ] **[Done by Xini]** Turn off Email Address Obfuscation for the `xini.dev` zone (DECISIONS §2.6). Unblocks H1, A7 and K3 in production.
- [ ] **[Done by Xini]** Create the Pages deploy hook for `xini-dev`. Its URL becomes the Worker secret `DEPLOY_HOOK_URL` (DECISIONS §1.3). Unblocks E4.
- [ ] **[Done by Xini]** Set `GITHUB_USERNAME=XiniDev` and a fine-grained, read-only `GITHUB_TOKEN` in Pages, for both production and preview (DECISIONS §1.2). Unblocks K2.
- [ ] **[Done by Xini]** Add `www.xini.dev` as a proxied record with a 301 to the apex (DECISIONS §1.2). Unblocks K1.
- [ ] **[Done by Xini]** Deploy the daily-rebuild Worker once (`wrangler deploy`, then `wrangler secret put DEPLOY_HOOK_URL`). This also needs your Cloudflare login. Unblocks E4.

## Manual device pass (§16.4)

Record the median fps from a performance trace over the whole stage scroll (F6).

| Device | OS and browser | Median fps | Date | Notes |
|---|---|---|---|---|
| iPhone | iOS Safari | | | |
| Mid-range Android | Chrome | | | |
| Mac | Safari | | | |
| Mac | Chrome | | | |
| Windows | Chrome or Edge | | | |
| Any desktop | Firefox | | | |
