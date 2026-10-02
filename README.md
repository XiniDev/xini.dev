# xini.dev

The personal site of Xini, systems engineer. A single page: a scroll-driven particle stage (Three.js and GSAP) that ends on the three featured projects, followed by everything else from GitHub, newest push first.

- Spec: [`docs/xini-dev-lattice-spec.md`](docs/xini-dev-lattice-spec.md)
- Decisions: [`docs/DECISIONS.md`](docs/DECISIONS.md)
- Audit: [`docs/AUDIT.md`](docs/AUDIT.md)
- Checklist: [`docs/CHECKLIST.md`](docs/CHECKLIST.md)

Built with Astro 7 as a static site in `out/`, deployed by Cloudflare Pages (project `xini-dev`, Git integration, production branch `master`).

## Local development

Requires Node 22.12 or later (`.node-version` pins 22.18.0).

```sh
npm install
npm run dev        # http://localhost:4321
```

| Script | What it does |
|---|---|
| `npm run build` | Production build into `out/`, followed by the size report (it fails if a §12 budget is exceeded) |
| `npm run preview` | Serves `out/` with `wrangler pages dev`, which applies `_headers`, `_redirects` and the 404 page as Pages does |
| `npm run check` | `astro check` (strict TypeScript) plus a type check of the Worker |
| `npm test` | Unit tests (Vitest) |
| `npm run test:e2e` | Test build into `out-test/`, then Playwright in Chromium and WebKit (plus Firefox for the console check); the long-task test runs afterwards on its own |
| `npm run lhci` | Production build, then Lighthouse CI (3 mobile runs) asserting the §12 budgets |
| `npm run test:e2e:prod` | Smoke tests 1, 2, 4 and 6 against `https://xini.dev`, or against `E2E_BASE_URL` if set |
| `npm run links` | Checks every link in `out/` (internal files and fragments, external URLs) |
| `npm run size` | The size report on its own |
| `npm run qa` | Regenerates the QA screenshots in `docs/qa/` |
| `npm run og` | Regenerates `public/og.png` from the live stage (run `npm run build:test` first) |
| `npm run icons` | Regenerates the favicon set and manifest from the wordmark X and the colour tokens |
| `npm run framing` | Regenerates `src/lattice/framing-tables.json`, the percentile tables that keep each form clear of the copy and the rail. Run it after changing a form, `KEYS`, `GROUP`, `POINTER`, `CAMERA` or the point counts; a unit test fails while it's stale |
| `npm run snapshot:github` | Refreshes `src/data/github-snapshot.json` from the GitHub API |

Chromium tests use the machine's GPU on Windows (`--use-angle=d3d11`). Elsewhere they fall back to SwiftShader.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `GITHUB_USERNAME` | Yes in production | Whose repositories to list. If unset, it falls back to `XiniDev` from `src/data/site.ts`. |
| `GITHUB_TOKEN` | For live data | A fine-grained token with read-only access to public repositories. Without it, every build uses the committed snapshot and logs a warning. |
| `DEPLOY_HOOK_URL` | Worker secret only | The Pages deploy hook the daily-rebuild Worker calls. Never commit it. |
| `GITHUB_API_URL` | No | Overrides `https://api.github.com`. Only used to test the outage path (E3). |

Set the first two in Cloudflare Pages for both production and preview. `.env*` and `.dev.vars` are git-ignored.

## Editing copy and projects

- **All copy** lives in `src/data/site.ts`. Layout code never contains strings, and copy edits never touch components.
- **Projects** live in `src/data/projects.ts`. Each project has a slug, name, one-sentence UK-English summary and tags, plus:
  - `repo` (`owner/name`) to join GitHub data
  - `url`
  - `image` (`src` is the file's base name, plus alt text)
  - `featured` (1–3, which sets the finale order)
  - `hidden`
  - `updated` (`YYYY-MM`, for projects without a repo)

  The finale reads the DOM, so changing a card's text needs no other change: the particles re-land on whatever the cards contain.
- **Images:** drop the file into `src/assets/projects/<slug>.<png|jpg|webp|avif>`, replacing the old one. The build crops to 16:10 and makes 480, 800 and 1200px versions in AVIF and WebP, skipping widths larger than the source. Update the alt text in `projects.ts` only if the screenshot shows something different.
- **Hiding repos** from the list: add their names to `hiddenRepos` in `src/data/listing.ts`.
- **Colours** exist only in `src/styles/tokens.ts`; particle colours and every motion number live in `src/lattice/config.ts`.

## How the GitHub list is ordered and refreshed

At build time, `src/lib/listing.ts` calls `GET /users/{GITHUB_USERNAME}/repos?type=owner&sort=pushed&per_page=100` and follows pagination. Curated repos owned by someone else are fetched one by one. The results are then merged with `projects.ts` and ordered by `pushed_at`:

- **Merge rules.**
  - Curated projects keep their name, summary and link.
  - Unmatched repos use GitHub's name, description and homepage.
  - Projects without a repo appear only if they have `updated`.
  - Featured projects, forks, hidden projects and `hiddenRepos` are left out.
- **Ordering** (`orderProjects`):
  - Repos pushed within the last 24 months are listed newest first, up to 12.
  - Archived and older repos go into a closed "Older projects (N)" section.
  - Ties sort alphabetically.

Every build logs `[github] source=… fetched=… included=… recent=… older=…`. If GitHub fails or rate-limits, or there's no token, the build uses `src/data/github-snapshot.json` and logs why. GitHub is never a reason for the build to fail. Run `npm run snapshot:github` and commit the result whenever the list changes meaningfully.

**Daily refresh.** The Worker in `workers/daily-rebuild/` has a cron trigger at 03:00 UTC that POSTs the Pages deploy hook, and the rebuild re-fetches GitHub (DECISIONS §1.3). To deploy it once, with your Cloudflare login:

```sh
cd workers/daily-rebuild
npx wrangler login
npx wrangler deploy
npx wrangler secret put DEPLOY_HOOK_URL   # paste the hook from Pages → Settings → Builds → Deploy hooks
```

To test it locally, put a mock hook URL in `workers/daily-rebuild/.dev.vars`. Then run `npx wrangler dev --test-scheduled` and open `/__scheduled?cron=0+3+*+*+*`.

## Structure

```text
src/
  pages/            index.astro, 404.astro, sitemap.xml.ts
  layouts/          Base.astro (head, fonts, tokens, the js-class script)
  components/       TopBar, Stage, FeaturedCard, MoreOnGitHub, GitHubRow, Footer
  data/             site.ts (copy), projects.ts, listing.ts, github-snapshot.json
  lib/              github.ts (fetch, merge, ordering), listing.ts (build-time wrapper), images.ts
  lattice/          index.ts (boot), config.ts, stage.ts, timeline.ts, framing.ts, landing.ts, displace.ts, worker.ts, three.ts, forms/, shaders/
  styles/           tokens.ts, global.css, fallbacks.ts (metric-matched font fallbacks)
scripts/            size report, link checker, GitHub snapshot, icons, og image, QA screenshots, font fallbacks, framing tables
tests/unit/         Vitest
tests/e2e/          Playwright
workers/            daily-rebuild cron Worker
docs/               spec, prototype, audit, decisions, checklist, QA screenshots
```
