# xini.dev

The personal site of Xini, systems engineer: "Inside the machine", one real-time 3D scene (three.js, comic-ink
rendering) that flies through a motherboard city at night across six stops: Power on, The core, Neural core,
Enclave, Memory (projects) and I/O (contact).

- Art direction: [`docs/DIRECTION.md`](docs/DIRECTION.md)
- Architecture, URL options and tools: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- Earlier directions and reference captures: [`reference/`](reference/) (not deployed)

Built with Vite as a static site in `out/`, deployed by Cloudflare Pages (project `xini-dev`, Git integration,
production branch `master`, build command `npm run build`, output directory `out`).

## Local development

Requires Node 22.12 or later (`.node-version` pins 22.18.0).

```sh
npm install
npm run dev        # http://localhost:5173
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build into `out/` (with `GITHUB_TOKEN` set, the project list is fetched live; see below) |
| `npm run preview` | Serves `out/` with `wrangler pages dev`, which applies `_headers`, `_redirects` and the 404 page as Pages does |
| `npm run preview:vite` | Serves `out/` with Vite's preview server |
| `npm run worlds` | Serves the earlier directions and the v4 prototype from `reference/worlds/` at http://localhost:4174 |
| `npm run shots -- [parts] [tag]` | Review captures on a frozen build (see `docs/ARCHITECTURE.md`) |
| `npm run snapshot:github` | Refreshes `src/shared/data/github-snapshot.json` from the GitHub API |
| `npm run jp-subset` | Regenerates the CJK font subset after changing CJK text |

## Editing copy and projects

All copy and project data live in `src/shared/data/content.js`: the statement and credentials, the three section
beats, the featured projects (order, count and art are data) and the curated summaries for the rest of the list.
Project images are in `src/shared/data/img/`.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `GITHUB_USERNAME` | No | Whose repositories to list; defaults to `XiniDev` |
| `GITHUB_TOKEN` | For live data | A fine-grained token with read-only access to public repositories. Without it, the build uses the committed snapshot and logs why |
| `DEPLOY_HOOK_URL` | Worker secret only | The Pages deploy hook the daily-rebuild Worker calls. Never commit it |
| `GITHUB_API_URL` | No | Overrides `https://api.github.com` (testing only) |

Set the first two in Cloudflare Pages for both production and preview. GitHub is never a reason for a build to
fail: on any error the build falls back to the committed snapshot and logs `[github] source=snapshot (reason)`.

## Daily refresh

The Worker in `workers/daily-rebuild/` has a cron trigger at 03:00 UTC that POSTs the Pages deploy hook, so the
project list is re-fetched from GitHub every day. To deploy it once, with your Cloudflare login:

```sh
cd workers/daily-rebuild
npx wrangler login
npx wrangler deploy
npx wrangler secret put DEPLOY_HOOK_URL   # paste the hook from Pages → Settings → Builds → Deploy hooks
```
