# Checklist

The success criteria from spec §17, copied word for word and grouped as in the spec. Tick an ID only when it passes, and add the evidence on an indented line beneath it: how it was verified, when, and a link to any file in `docs/qa/`.

**[Needs Xini]** marks a criterion that needs your sign-off, your devices, or access to your accounts.

## A. Content and positioning

- [ ] **A1** At 1440×900 and 390×844, the first screen shows the XINI wordmark, the statement and the credentials line without scrolling. *Verify by:* Screenshot at time 0
- [ ] **A2** Beats 01–03 never mention a project: their text contains none of "Gloam", "DBridger" or "VOETutor". *Verify by:* E2E text assertion
- [ ] **A3** The finale shows exactly Gloam, DBridger and VOETutor, in that order, with the copy from §6.4. *Verify by:* E2E text assertion
- [ ] **A4** All copy matches §6 word for word; no copy from the old site remains, and no banned phrase appears anywhere. *Verify by:* Diff against `site.ts`; grep the build output
- [ ] **A5** UK English spelling throughout. *Verify by:* Review
- [ ] **A6** Saltancy is linked from the nav and the footer, opening in a new tab with `rel="noopener"`. *Verify by:* E2E
- [ ] **A7** No link in production points to `#`, a placeholder or a dead URL. *Verify by:* Link checker over the build output

## B. Visual fidelity

- [ ] **B1** All colours come from the tokens in §7.1 (plus the particle colours in the stage config); no other colour literals exist. *Verify by:* Grep CSS and components
- [ ] **B2** Archivo is self-hosted and both axes work: beat headings render at width 125 and weight 760. *Verify by:* Computed styles and a visual check
- [ ] **B3** **[Needs Xini]** Each beat at 1440×900 and 390×844 matches the prototype's composition: copy placement, form placement and scale, rail position. *Verify by:* Xini signs off the `docs/qa/` screenshots
- [ ] **B4** No racing or circuit asset, component or style remains in the repository. *Verify by:* Grep against the audit inventory
- [ ] **B5** The favicon set (SVG, 180px, 512px maskable) uses the decided icon in signal on void. *Verify by:* Inspect the build output

## C. Motion and interaction

- [ ] **C1** Beat changes, morphs and the crossfade happen at the timeline times in §8.3 (within ±0.05 units). *Verify by:* E2E at sampled scroll positions
- [ ] **C2** Scrolling backwards reverses every morph and copy change exactly. *Verify by:* Manual and E2E
- [ ] **C3** The rail marks the current beat, shows its label, and jumps to the correct target when clicked. *Verify by:* E2E
- [ ] **C4** Work, About and the skip link jump to their targets; Work leaves the cards fully visible. *Verify by:* E2E
- [ ] **C5** **[Needs Xini]** Pointer repulsion and tilt work on desktop and are off during lock, under reduced motion and on touch. *Verify by:* Manual
- [ ] **C6** **[Needs Xini]** Network pulses appear only while the network is on screen. *Verify by:* Manual
- [ ] **C7** The fly-in plays once on a fresh load at the top, and is skipped when the stage loads mid-page or under reduced motion. *Verify by:* Manual and E2E

## D. The landing

- [ ] **D1** At time 6.65, at least 95% of each card's edge particles lie within 2px of its card or thumbnail borders, at 1440×900 and 390×844. *Verify by:* E2E test 8
- [ ] **D2** Every title and text line's particles sit inside that line's rectangle expanded by 3px. *Verify by:* E2E test 8
- [ ] **D3** **[Needs Xini]** After the crossfade, the cards are at full opacity, the particles at 28% of base, and there is no visible jump or misalignment. *Verify by:* Screenshot at 6.65 and manual review
- [ ] **D4** The landing realigns within 200 ms of a resize, an orientation change and the font load. *Verify by:* E2E test 8 (resize case) and manual rotation
- [ ] **D5** Changing a card's summary in `projects.ts` realigns the landing with no other code change. *Verify by:* Edit, rebuild and rerun test 8

## E. Projects and GitHub ordering

- [ ] **E1** The build lists repositories for `GITHUB_USERNAME`, ordered by `pushed_at` (newest first), with archived and stale items under "Older projects". *Verify by:* Unit tests and build output
- [ ] **E2** Featured projects, forks and hidden repos never appear in the list. *Verify by:* Unit tests
- [ ] **E3** The build succeeds with GitHub unreachable, uses the snapshot and logs a warning. *Verify by:* Run the build with the network blocked
- [ ] **E4** **[Needs Xini]** The daily refresh is configured and documented, and has run successfully at least once. *Verify by:* CI or host logs
- [ ] **E5** Each row shows name, description, language and "Updated Mon YYYY". *Verify by:* E2E
- [ ] **E6** Every project from the old site is migrated into `projects.ts` with its image where one exists; missing images show the placeholder. *Verify by:* Compare with the audit table

## F. Performance

- [ ] **F1** Lighthouse mobile medians: Performance ≥ 90, Accessibility 100, Best Practices ≥ 95, SEO 100. *Verify by:* Lighthouse CI
- [ ] **F2** LCP ≤ 2.5 s, CLS ≤ 0.02, TBT ≤ 200 ms (Lighthouse mobile). *Verify by:* Lighthouse CI
- [ ] **F3** First-paint JS ≤ 30 KB gz, CSS ≤ 20 KB gz, stage chunk ≤ 200 KB gz, font ≤ 95 KB. *Verify by:* Build size report
- [ ] **F4** The stage chunk requests start after First Contentful Paint. *Verify by:* Network waterfall
- [ ] **F5** No main-thread task over 50 ms after first paint, including stage start-up. *Verify by:* Performance trace
- [ ] **F6** **[Needs Xini]** Median ≥ 55 fps on the desktop reference and ≥ 50 fps on the phone reference, scrolling the whole stage. *Verify by:* Performance traces recorded in the checklist
- [ ] **F7** No animation frames run while the stage is off screen or the tab is hidden. *Verify by:* Performance trace
- [ ] **F8** Point counts and pixel-ratio caps match §8.4 on desktop and low-power devices. *Verify by:* `?hud` readout

## G. Accessibility

- [ ] **G1** axe-core finds no serious or critical issues in the default, reduced-motion and no-WebGL modes. *Verify by:* Automated
- [ ] **G2** Every interactive element is reachable by keyboard with a visible focus ring; the skip link works; focus into the finale jumps to it. *Verify by:* E2E test 7
- [ ] **G3** **[Needs Xini]** A screen reader reads all beat copy in order, including inactive beats. *Verify by:* VoiceOver or NVDA pass
- [ ] **G4** Reduced motion behaves exactly as §8.10 describes. *Verify by:* E2E test 5 and manual
- [ ] **G5** All text meets 4.5:1 contrast. *Verify by:* Automated plus the table in §7.1
- [ ] **G6** Touch targets on phones are at least 44×44px. *Verify by:* Manual measurement

## H. Resilience

- [ ] **H1** With JavaScript off, or with the stage chunk blocked, all content is readable in normal flow with no blank areas. *Verify by:* E2E test 6 and a no-JS check
- [ ] **H2** WebGL context loss switches to the fallback layout without errors. *Verify by:* Force `WEBGL_lose_context` in a test
- [ ] **H3** No console errors or warnings in Chrome, Safari and Firefox. *Verify by:* E2E test 1 and the manual pass
- [ ] **H4** No horizontal scrolling at any width from 320 to 2560px. *Verify by:* E2E test 2
- [ ] **H5** At 844×390 (landscape phone) no copy is clipped. *Verify by:* Screenshot

## I. SEO and sharing

- [ ] **I1** Title, description, canonical, Open Graph, Twitter and JSON-LD tags are present and validate. *Verify by:* Validators
- [ ] **I2** `og.png` is 1200×630 and shows the particle wordmark. *Verify by:* Inspect
- [ ] **I3** `sitemap.xml` and `robots.txt` exist; every retired old URL returns 301 to its decided target. *Verify by:* `curl -I` each old URL
- [ ] **I4** The 404 page uses the site's tokens and type and links home. *Verify by:* Visit an unknown URL

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
