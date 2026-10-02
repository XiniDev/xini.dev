# Checklist

The success criteria from spec §17, copied word for word and grouped as in the spec. Tick an ID only when it passes, and add the evidence on an indented line beneath it: how it was verified, when, and a link to any file in `docs/qa/`.

**[Needs Xini]** marks a criterion that needs your sign-off, your devices, or access to your accounts.

## A. Content and positioning

- [x] **A1** At 1440×900 and 390×844, the first screen shows the XINI wordmark, the statement and the credentials line without scrolling. *Verify by:* Screenshot at time 0
  - Evidence: `tests/e2e/stage.spec.ts` (A1) at 1440×900 and 390×844 in Chromium and WebKit: after the fly-in (intro = 1, morph = 0), the statement and credentials line sit inside the first viewport at opacity 1. More than 1% of the pixels above the statement are particle green, which is the XINI wordmark. The time-0 screenshots are in `docs/qa/`.
- [ ] **A2** Beats 01–03 never mention a project: their text contains none of "Gloam", "DBridger" or "VOETutor". *Verify by:* E2E text assertion
- [ ] **A3** The finale shows exactly Gloam, DBridger and VOETutor, in that order, with the copy from §6.4. *Verify by:* E2E text assertion
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
- [ ] **B3** **[Needs Xini]** Each beat at 1440×900 and 390×844 matches the prototype's composition: copy placement, form placement and scale, rail position. *Verify by:* Xini signs off the `docs/qa/` screenshots
- [ ] **B4** No racing or circuit asset, component or style remains in the repository. *Verify by:* Grep against the audit inventory
- [ ] **B5** The favicon set (SVG, 180px, 512px maskable) uses the decided icon in signal on void. *Verify by:* Inspect the build output

## C. Motion and interaction

- [x] **C1** Beat changes, morphs and the crossfade happen at the timeline times in §8.3 (within ±0.05 units). *Verify by:* E2E at sampled scroll positions
  - Evidence: `tests/e2e/stage.spec.ts` (C1 and C2) samples 17 times either side of each §8.3 boundary, ±0.05. Intro out by 0.85; beat 01 hidden at 1.07 and in by 1.55 with morph 1; the same pattern for beats 02 and 03; lock 0 at 4.95 and 1 at 6.05; cards and fade 0 at 5.95 and 1 at 6.40. Passes in Chromium and WebKit.
- [x] **C2** Scrolling backwards reverses every morph and copy change exactly. *Verify by:* Manual and E2E
  - Evidence: Same test, reverse pass: it revisits each recorded scroll position from 6.65 back to 0.45 and gets identical morph, lock, fade, beat opacities and card opacity at every sample. Passes in Chromium and WebKit.
- [x] **C3** The rail marks the current beat, shows its label, and jumps to the correct target when clicked. *Verify by:* E2E
  - Evidence: `tests/e2e/stage.spec.ts` (C3 and test 3): clicking each rail button lands within ±0.05 of its jump target. The expected beat is then the most visible copy block, its button has `aria-current="step"` and its label is at opacity 1. At 6.4 the rail is hidden. Passes in Chromium and WebKit.
- [x] **C4** Work, About and the skip link jump to their targets; Work leaves the cards fully visible. *Verify by:* E2E
  - Evidence: `tests/e2e/stage.spec.ts` (C4): Work lands at 6.4 with all three cards inside the viewport at opacity 1, and About lands at 1.5. The skip link (Tab, in Chromium) jumps to 6.4 and moves focus to `#work-heading`. WebKit's Tab key skips links like Safari's default, so there the test focuses the skip link directly before pressing Enter.
- [ ] **C5** **[Needs Xini]** Pointer repulsion and tilt work on desktop and are off during lock, under reduced motion and on touch. *Verify by:* Manual
- [ ] **C6** **[Needs Xini]** Network pulses appear only while the network is on screen. *Verify by:* Manual
- [x] **C7** The fly-in plays once on a fresh load at the top, and is skipped when the stage loads mid-page or under reduced motion. *Verify by:* Manual and E2E
  - Evidence: `tests/e2e/stage.spec.ts` (C7): on a fresh load at the top, `introPlayed` is true and intro rises to 1. A fresh load of `/#about` starts mid-page with `introPlayed` false and intro already 1. The reduced-motion case is covered by test 5 (G4). Passes in Chromium and WebKit.

## D. The landing

- [ ] **D1** At time 6.65, at least 95% of each card's edge particles lie within 2px of its card or thumbnail borders, at 1440×900 and 390×844. *Verify by:* E2E test 8
- [ ] **D2** Every title and text line's particles sit inside that line's rectangle expanded by 3px. *Verify by:* E2E test 8
- [ ] **D3** **[Needs Xini]** After the crossfade, the cards are at full opacity, the particles at 28% of base, and there is no visible jump or misalignment. *Verify by:* Screenshot at 6.65 and manual review
- [ ] **D4** The landing realigns within 200 ms of a resize, an orientation change and the font load. *Verify by:* E2E test 8 (resize case) and manual rotation
- [ ] **D5** Changing a card's summary in `projects.ts` realigns the landing with no other code change. *Verify by:* Edit, rebuild and rerun test 8

## E. Projects and GitHub ordering

- [x] **E1** The build lists repositories for `GITHUB_USERNAME`, ordered by `pushed_at` (newest first), with archived and stale items under "Older projects". *Verify by:* Unit tests and build output
  - Evidence: Unit tests (`tests/unit/github.test.ts`: newest first, archived and stale items in older, ties alphabetical, 12-item cap) and the build log `[github] source=snapshot user=XiniDev fetched=26 included=23 recent=11 older=12`. `tests/e2e/github.spec.ts` checks that the rendered rows match the merged, ordered data.
- [x] **E2** Featured projects, forks and hidden repos never appear in the list. *Verify by:* Unit tests
  - Evidence: `tests/unit/github.test.ts` (merge): featured projects, forks, `hidden` projects and `hiddenRepos` entries never appear. `tests/e2e/github.spec.ts` confirms Gloam, DBridger, VOETutor and the `bitventory` fork are absent from the rendered list.
- [x] **E3** The build succeeds with GitHub unreachable, uses the snapshot and logs a warning. *Verify by:* Run the build with the network blocked
  - Evidence: `GITHUB_TOKEN=dummy GITHUB_API_URL=http://127.0.0.1:59999 npx astro build` exits 0 and logs `[github] using the committed snapshot from 2026-10-02T15:19:15.049Z: fetch failed (connect ECONNREFUSED 127.0.0.1:59999)`. Unit tests cover a thrown fetch, a 403 rate limit, no token, and a missing snapshot.
- [ ] **E4** **[Needs Xini]** The daily refresh is configured and documented, and has run successfully at least once. *Verify by:* CI or host logs
- [x] **E5** Each row shows name, description, language and "Updated Mon YYYY". *Verify by:* E2E
  - Evidence: `tests/e2e/github.spec.ts`: each of the 23 rows has the name (linked to the homepage or repo), the description, the language and `Updated Mon YYYY` with a `datetime`. GitHub has no description for 5 repos (getajobman, AdventOfCode23, AdventOfCode24, EnGarde, graphics-shooter-game) and no language for 3, so those cells are empty (DECISIONS 2.7). Adding descriptions on GitHub fills them on the next daily build.
- [x] **E6** Every project from the old site is migrated into `projects.ts` with its image where one exists; missing images show the placeholder. *Verify by:* Compare with the audit table
  - Evidence: `tests/unit/projects.test.ts`: all 12 audit-table projects are in `projects.ts`, each with its image file in `src/assets/projects/`, descriptive alt text, a one-sentence summary and a real link. `tests/e2e/content.spec.ts` (E6) shows that an empty thumbnail keeps the dotted `--thumb` placeholder and that broken-image alt text is transparent.

## F. Performance

- [ ] **F1** Lighthouse mobile medians: Performance ≥ 90, Accessibility 100, Best Practices ≥ 95, SEO 100. *Verify by:* Lighthouse CI
- [ ] **F2** LCP ≤ 2.5 s, CLS ≤ 0.02, TBT ≤ 200 ms (Lighthouse mobile). *Verify by:* Lighthouse CI
- [ ] **F3** First-paint JS ≤ 30 KB gz, CSS ≤ 20 KB gz, stage chunk ≤ 200 KB gz, font ≤ 95 KB. *Verify by:* Build size report
- [ ] **F4** The stage chunk requests start after First Contentful Paint. *Verify by:* Network waterfall
- [ ] **F5** No main-thread task over 50 ms after first paint, including stage start-up. *Verify by:* Performance trace
- [ ] **F6** **[Needs Xini]** Median ≥ 55 fps on the desktop reference and ≥ 50 fps on the phone reference, scrolling the whole stage. *Verify by:* Performance traces recorded in the checklist
- [x] **F7** No animation frames run while the stage is off screen or the tab is hidden. *Verify by:* Performance trace
  - Evidence: `tests/e2e/stage.spec.ts` (F7) counts every `requestAnimationFrame` callback. It records 0 frames over 1s once the stage is scrolled off screen, and 0 once the document reports hidden, against more than 5 frames over 0.5s while the stage is on screen. This needed ScrollTrigger replaced (DECISIONS 2.11). Passes in Chromium and WebKit.
- [x] **F8** Point counts and pixel-ratio caps match §8.4 on desktop and low-power devices. *Verify by:* `?hud` readout
  - Evidence: `tests/e2e/stage.spec.ts` (F8) reads the `?hud` readout. At 1440×900 with DPR 2 and 8 cores: "18,000 points … pixel ratio 1.5". At 390×844 with DPR 3: "9,000 points … pixel ratio 1.25". At 1440×900 with 4 cores: "9,000 points … pixel ratio 1.25". There is no readout without `?hud`.

## G. Accessibility

- [ ] **G1** axe-core finds no serious or critical issues in the default, reduced-motion and no-WebGL modes. *Verify by:* Automated
- [ ] **G2** Every interactive element is reachable by keyboard with a visible focus ring; the skip link works; focus into the finale jumps to it. *Verify by:* E2E test 7
- [ ] **G3** **[Needs Xini]** A screen reader reads all beat copy in order, including inactive beats. *Verify by:* VoiceOver or NVDA pass
- [ ] **G4** Reduced motion behaves exactly as §8.10 describes. *Verify by:* E2E test 5 and manual
- [ ] **G5** All text meets 4.5:1 contrast. *Verify by:* Automated plus the table in §7.1
- [ ] **G6** Touch targets on phones are at least 44×44px. *Verify by:* Manual measurement

## H. Resilience

- [x] **H1** With JavaScript off, or with the stage chunk blocked, all content is readable in normal flow with no blank areas. *Verify by:* E2E test 6 and a no-JS check
  - Evidence: `tests/e2e/fallback.spec.ts` covers two cases: JavaScript disabled, and the stage chunk blocked (which falls back to `no-gl`). In both, all 5 beats and 3 cards are at opacity 1, stacked in normal flow, and the canvas, rail and vignette are hidden. Passes in Chromium and WebKit at all three sizes.
- [ ] **H2** WebGL context loss switches to the fallback layout without errors. *Verify by:* Force `WEBGL_lose_context` in a test
- [ ] **H3** No console errors or warnings in Chrome, Safari and Firefox. *Verify by:* E2E test 1 and the manual pass
- [ ] **H4** No horizontal scrolling at any width from 320 to 2560px. *Verify by:* E2E test 2
- [ ] **H5** At 844×390 (landscape phone) no copy is clipped. *Verify by:* Screenshot

## I. SEO and sharing

- [ ] **I1** Title, description, canonical, Open Graph, Twitter and JSON-LD tags are present and validate. *Verify by:* Validators
- [ ] **I2** `og.png` is 1200×630 and shows the particle wordmark. *Verify by:* Inspect
- [ ] **I3** `sitemap.xml` and `robots.txt` exist; every retired old URL returns 301 to its decided target. *Verify by:* `curl -I` each old URL
- [x] **I4** The 404 page uses the site's tokens and type and links home. *Verify by:* Visit an unknown URL
  - Evidence: `tests/e2e/content.spec.ts` (I4): `/no-such-page` returns 404 with the §6.7 heading, body and a link to `/`. It has no canvas, a `--void` background and Archivo at width 125.

## J. Code quality and documentation

- [ ] **J1** TypeScript strict mode, with no `any` in `src/lattice` or `src/lib`. *Verify by:* `tsc --noEmit` and grep
- [ ] **J2** Every tunable number from Appendix A lives in `lattice/config.ts`. *Verify by:* Review
- [ ] **J3** Unit and E2E suites pass in CI. *Verify by:* CI
- [ ] **J4** The README covers local development, build, environment variables, how to edit copy and projects, and how ordering and refresh work. *Verify by:* Review
- [ ] **J5** `docs/AUDIT.md`, `docs/DECISIONS.md` and `docs/CHECKLIST.md` exist and are complete. *Verify by:* Review

## K. Deployment

- [ ] **K1** **[Needs Xini]** Production serves <https://xini.dev> with the existing domain setup (www behaviour as decided in the audit). *Verify by:* Visit both hosts
- [ ] **K2** **[Needs Xini]** Production environment variables are set, and the first production build fetched GitHub successfully. *Verify by:* Build log
- [ ] **K3** **[Needs Xini]** The E2E smoke tests (1, 2, 4 and 6) pass against the production URL. *Verify by:* CI against production

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
