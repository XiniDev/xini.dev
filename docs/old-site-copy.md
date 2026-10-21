# Lattice site copy (old xini.dev)

Every user-facing string of the Astro "Lattice" site, verbatim, as it stood at tag `lattice-final` (`9fdf6a4`).
Grouped by where it appears on the page. Each row names the source file and key. Strings are quoted exactly; a
leading or trailing space inside the backticks is part of the string.

## Head and share text

Rendered by `src/layouts/Base.astro`. Values come from `src/data/site.ts` unless noted. The Open Graph and Twitter
tags are only on the home page (`social` prop in `src/pages/index.astro`).

| Where | String | Source |
| --- | --- | --- |
| `<html lang>` | `en-GB` | `site.ts` → `site.lang` |
| `<title>`, home | `Xini, systems engineer` | `site.ts` → `site.title` |
| `<meta name="description">`, home | `Xini builds complete, self-hosted products with modern AI woven in, across games, tools and client work.` | `site.ts` → `site.description` |
| `<link rel="canonical">`, home | `https://xini.dev/` | `site.ts` → `site.url` |
| `<meta name="theme-color">` | `#020806` | `src/styles/tokens.ts` → `colour.void` |
| `og:type` | `website` | `Base.astro` (literal) |
| `og:site_name` | `xini.dev` | `site.ts` → `site.og.siteName` |
| `og:locale` | `en_GB` | `site.ts` → `site.og.locale` |
| `og:title` | `Xini, systems engineer` | `site.ts` → `site.title` |
| `og:description` | `Xini builds complete, self-hosted products with modern AI woven in, across games, tools and client work.` | `site.ts` → `site.description` |
| `og:url` | `https://xini.dev/` | `site.ts` → `site.url` |
| `og:image` | `https://xini.dev/og.png` | `site.ts` → `site.og.image` |
| `og:image:type` | `image/png` | `Base.astro` (literal) |
| `og:image:width` / `og:image:height` | `1200` / `630` | `site.ts` → `site.og.width`, `site.og.height` |
| `og:image:alt` | `The XINI wordmark drawn in green particles on a near-black background.` | `site.ts` → `site.og.alt` |
| `twitter:card` | `summary_large_image` | `Base.astro` (literal) |
| `twitter:title` | `Xini, systems engineer` | `site.ts` → `site.title` |
| `twitter:description` | `Xini builds complete, self-hosted products with modern AI woven in, across games, tools and client work.` | `site.ts` → `site.description` |
| `twitter:image` | `https://xini.dev/og.png` | `site.ts` → `site.og.image` |
| `twitter:image:alt` | `The XINI wordmark drawn in green particles on a near-black background.` | `site.ts` → `site.og.alt` |

### Structured data (JSON-LD `Person`, home page)

Built in `src/pages/index.astro` from `site.ts`.

| Field | String | Source |
| --- | --- | --- |
| `name` | `Xini` | `site.person.name` |
| `url` | `https://xini.dev` | origin of `site.url` |
| `jobTitle` | `Systems engineer` | `site.person.jobTitle` |
| `alumniOf[]` (`CollegeOrUniversity`) | `University of Warwick`, `University of St Andrews` | `site.person.alumniOf` |
| `worksFor` (`Organization`) | `Saltancy`, `https://saltancy.com` | `site.person.worksFor` |
| `sameAs` | `https://github.com/XiniDev`, `https://www.linkedin.com/in/xinidev` | `site.contact.github`, `site.contact.linkedin` |

## Top bar

`src/components/TopBar.astro`, values from `src/data/site.ts`.

| Where | String | Source |
| --- | --- | --- |
| Mark (link to `#top`) | `XINI` | `site.mark` |
| Nav link → `#work` | `Work` | `site.nav.work` |
| Nav link → `#about` (hidden on narrow screens, class `opt`) | `About` | `site.nav.about` |
| Nav link → `https://saltancy.com` (new tab) | `Consultancy` | `site.nav.saltancy` |
| Nav link → `#contact` (hidden on narrow screens, class `opt`) | `Contact` | `site.nav.contact` |

## The scroll story

`src/components/Stage.astro`, values from `src/data/site.ts`. One pinned stage; five beats play in turn.

### Section rail

Buttons on the side rail, one per beat. Each reads label, then the screen-reader text `, section `, then the number.

| Beat | Label | Number | Source |
| --- | --- | --- | --- |
| Intro | `Xini` | `00` | `site.intro.rail`; `00` is a literal in `Stage.astro` |
| 1 | `Systems` | `01` | `site.beats[0].rail`, `.step` |
| 2 | `AI` | `02` | `site.beats[1].rail`, `.step` |
| 3 | `Security` | `03` | `site.beats[2].rail`, `.step` |
| Finale | `Work` | `04` | `site.finale.rail`, `.step` |

### Intro beat

| Where | String | Source |
| --- | --- | --- |
| Statement | `I build complete, self-hosted products with modern AI woven in.` | `site.intro.statement` |
| Credentials | `MSc Artificial Intelligence, St Andrews. BSc Computer Science, Warwick.` | `site.intro.credentials` |
| Scroll cue (aria-hidden) | `Scroll` | `site.intro.cue` |

### Beats 1–3

| Beat | Field | String | Source |
| --- | --- | --- | --- |
| 1 | Step | `01` | `site.beats[0].step` |
| 1 | Heading | `Whole systems, built solo.` | `site.beats[0].heading` |
| 1 | Body | `I take ambitious ideas all the way to production on my own: real-time 3D, multiplayer backends, data, infrastructure and the interface people actually use.` | `site.beats[0].body` |
| 1 | Stack line | `Full stack, real-time 3D, multiplayer` | `site.beats[0].support` |
| 2 | Step | `02` | `site.beats[1].step` |
| 2 | Heading | `AI that does real work.` | `site.beats[1].heading` |
| 2 | Body | `I build AI into products where it earns its place: agents that act on real systems, MCP servers that give models real tools, and local models when the data should stay put.` | `site.beats[1].body` |
| 2 | Stack line | `Agents, MCP servers, local models` | `site.beats[1].support` |
| 3 | Step | `03` | `site.beats[2].step` |
| 3 | Heading | `Secure by default.` | `site.beats[2].heading` |
| 3 | Body | `I self-host what I build and design for Zero Trust, with OWASP practice and PII redaction there from the first commit.` | `site.beats[2].body` |
| 3 | Stack line | `Self-hosting, OWASP, Zero Trust` | `site.beats[2].support` |

### Finale beat

| Where | String | Source |
| --- | --- | --- |
| Step | `04` | `site.finale.step` |
| Heading (`#work-heading`) | `Featured work.` | `site.finale.heading` |

### Particle forms

The lattice draws the `XINI` wordmark and the beat forms (network, d20, padlock) as point clouds. The wordmark is
geometry in `src/lattice/forms/wordmark.ts`; it holds no string literal.

### Debug HUD

Only with `?hud` in the URL; aria-hidden. Template in `src/lattice/stage.ts` → `hudText`:
`` `${count} points, ${fps} fps, pixel ratio ${dpr}` `` (count formatted with `toLocaleString('en-GB')`).

## Featured project cards

`src/components/FeaturedCard.astro`, data from `src/data/projects.ts` (the entries with `featured`, in order 1, 2,
3). Each card shows the image, name, summary, tags (joined with `, `), the credit if any, and one link. The link
label is the URL without `https://`, `www.` and a trailing `/` when the project has `url`; otherwise
`Source on GitHub` (`site.ts` → `site.sourceLink`) for the repo. Links open in a new tab.

### 1. Gloam (`projects.ts` → slug `gloam`)

| Field | String |
| --- | --- |
| Name | `Gloam` |
| Summary | `Self-hosted 3D virtual tabletop for D&D 5e, with shadow-casting light, per-creature line of sight and all 339 spells from D&D’s open rules, automated.` |
| Tags | `TypeScript, React Three Fiber, Colyseus, SQLite, MCP` |
| Link | `Source on GitHub` → `https://github.com/XiniDev/Gloam` |
| Image alt | `Gloam’s 3D tabletop: a stone dungeon map seen at an angle, with goblin and Crypt Warden tokens, health bars and a tool sidebar.` |

### 2. DBridger (`projects.ts` → slug `dbridger`)

| Field | String |
| --- | --- |
| Name | `DBridger` |
| Summary | `Autonomous agent that queries legacy databases in plain English, with PII redaction built in.` |
| Tags | `Python, PyQt6, Gemini, SQLite, MCP` |
| Link | `Source on GitHub` → `https://github.com/XiniDev/dbridger` |
| Image alt | `DBridger’s desktop window: a schema explorer listing tables such as users, orders and shipments, next to an AI agent tab with a plain-English question.` |

### 3. VOETutor (`projects.ts` → slug `voetutor`)

| Field | String |
| --- | --- |
| Name | `VOETutor` |
| Summary | `Curated marketplace of vetted IB tutors, with on-demand video lessons and progress tracking.` |
| Tags | `Next.js, Supabase` |
| Credit | `Built through Saltancy` |
| Link | `voetutor.com` → `https://voetutor.com` |
| Image alt | `The VOETutor home page: the headline “Find your IB educator. Open the vault.”, a search box and cards for vetted IB tutors with their subjects and hourly rates.` |

## The GitHub list ("More on GitHub")

`src/components/MoreOnGitHub.astro` and `src/components/GitHubRow.astro`, labels from `src/data/site.ts`, rows built
by `merge()` in `src/lib/github.ts` from the GitHub API (or `src/data/github-snapshot.json`) and `src/data/projects.ts`.
Settings in `src/data/listing.ts`: `legacyMonths: 24`, `recentMax: 12`, `hiddenRepos: []`.

### Labels and states

| Where | String | Source |
| --- | --- | --- |
| Section heading | `More on GitHub` | `site.more.heading` |
| Row date | `Updated ${Mon} ${YYYY}`, months `Jan` … `Dec` | `src/lib/github.ts` → `updatedLabel`, `MONTHS` (the key `site.more.updated` = `Updated` exists but is not read) |
| Row language | the repo's GitHub language, or empty | GitHub data |
| Older toggle (`<details>` summary) | `Older projects (${count})` | `site.more.older` |
| Older toggle marker, closed / open | `+` / `−` | `src/styles/global.css` → `.older summary::before` |
| Empty state (link to `https://github.com/XiniDev`) | `See all my projects on GitHub.` | `site.more.empty` |

### Curated rows

A repo that matches a `projects.ts` entry by `repo` shows that entry's `name` and `summary` (and its `url` if set);
other repos show their GitHub name and description. Featured or `hidden` entries are skipped. An entry with no
matching repo is listed only if it has both `updated` and `url`. Images and alts of non-featured entries are not
rendered anywhere on the page.

| `projects.ts` slug | Name | Summary | Image alt (not rendered) |
| --- | --- | --- | --- |
| `saltancy-website` | `Saltancy Website` | `Landing page for Saltancy, my consultancy for end-to-end technical work and custom software development.` | `Saltancy’s landing page: the headline “We engineer the structure your product is built to hold.” beside a wireframe cube on a dark background.` |
| `wsmath` | `WSMath` | `Portfolio for an international mathematics exam strategist, built with Next.js and Tailwind CSS, with a custom CMS behind a Zero Trust login.` (no repo and no `updated`, so not listed) | `The WSMath logo over a photo of a man in glasses working at a desk with a laptop and a monitor.` |
| `notes-api` | `Notes API` | `Secure REST API where each user creates, reads, updates and deletes their own notes, with filtering, built on Node.js, Express and MongoDB following OWASP guidance.` | `Illustration for Notes API: a window listing three notes beside the HTTP verbs GET, POST and DELETE.` |
| `leadingones-dac` | `LeadingOnes DAC` | `MSc dissertation: a model-based deep reinforcement learning agent that learns to tune an optimisation algorithm while it runs, improving learning quality and sample efficiency on a standard benchmark.` | `Line chart of the best gap (mean ± standard deviation) against k, for n = 50 and n = 100.` |
| `ai-search-algorithms` | `AI Search Algorithms` | `Classic AI search algorithms, from breadth-first and depth-first to A* and SMA*, planning flight routes on a polar grid, each with an optional bidirectional mode.` | `Diagram comparing the paths that BFS, DFS, UCS and A* search take across a grid of nodes.` |
| `nullvector` | `NullVector` | `Processing (Java) platformer where you fight enemies and a boss named Zorp with gravity-affected projectiles, with boss phases, bounce damage and a full GUI.` | `NullVector gameplay: a pixel-art character on stone platforms facing a spiked boss, with hearts for health and a boss health bar.` |
| `jungle-game` | `Jungle Game & JunGUI` | `Java implementation of the Jungle board game with a Swing GUI, multiplayer support and legal-move highlighting.` | `The JunGUI window: a Jungle board with river squares, traps, dens, and red and blue animal pieces.` |
| `overthrow-synthetica` | `Overthrow Synthetica` | `Two-week, two-person game jam demo for the Warwick Game Dev Society, made with my teammate Codethulu using Three.js and WebGL.` (no repo; listed from `url` and `updated: '2023-10'`, language empty) | `The Overthrow Synthetica title logo in white over pink Japanese characters.` |
| `ecs-platformer-demo` | `ECS Platformer Demo` | `Platformer demo that tests an Entity-Component-System architecture, written in C++ with SDL2.` | `Platformer demo: a dark figure with a rifle firing at a yellow figure on a blue block, with debug hitboxes drawn.` |

The tags of non-featured entries are data only; the list does not render them.

## Footer

`src/components/Footer.astro` (`#contact`), values from `src/data/site.ts`.

| Where | String | Source |
| --- | --- | --- |
| Heading | `Get in touch` | `site.footer.heading` |
| Email link (`mailto:`) | `xini@saltancy.com` | `site.contact.email` |
| Client line | `I take on client projects through my consultancy, ` + link `Saltancy` + `.` | `site.footer.clientLead`, `site.footer.clientLink`, `site.footer.clientTail` |
| Link → `https://github.com/XiniDev` | `GitHub` | `site.footer.github` |
| Link → `https://www.linkedin.com/in/xinidev` | `LinkedIn` | `site.footer.linkedin` |
| Copyright | `© 2026 Xini` | `site.footer.copyright` |

`site.contact.x` (`https://x.com/XiniDev`) is defined but not rendered.

## 404 page

`src/pages/404.astro`, values from `src/data/site.ts`.

| Where | String | Source |
| --- | --- | --- |
| `<title>` | `Page not found, Xini` | `site.notFound.title` |
| `<meta name="robots">` | `noindex` | `404.astro` (literal) |
| Heading | `Page not found` | `site.notFound.heading` |
| Body | `That page doesn't exist any more.` | `site.notFound.body` |
| Link → `/` | `Back to xini.dev` | `site.notFound.link` |

## Accessibility-only text

| Where | String | Source |
| --- | --- | --- |
| Skip link (visible on focus) → `#work` | `Skip to work` | `site.ts` → `site.skip`; `src/pages/index.astro` |
| Mark `aria-label` | `Xini, back to top` | `site.ts` → `site.markLabel`; `TopBar.astro` |
| Nav `aria-label` | `Primary` | `site.ts` → `site.nav.label`; `TopBar.astro` |
| After every new-tab link (screen-reader text) | ` (opens in a new tab)` | `site.ts` → `site.newTab` |
| Stage `aria-label` | `Introduction` | `site.ts` → `site.stageLabel`; `Stage.astro` |
| Page `<h1>` (screen-reader only, `#home`) | `Xini, systems engineer` | `site.ts` → `site.h1`; `Stage.astro` |
| Rail `aria-label` | `Sections` | `site.ts` → `site.railLabel`; `Stage.astro` |
| Between rail label and number (screen-reader text) | `, section ` | `site.ts` → `site.railSection`; `Stage.astro` |
| Current rail button | `aria-current="step"` | `src/lattice/index.ts`, `src/lattice/stage.ts` |
| Featured list name | `aria-labelledby="work-heading"` (reads `Featured work.`) | `Stage.astro` |
| GitHub section name | `aria-labelledby="more-heading"` (reads `More on GitHub`) | `MoreOnGitHub.astro` |
| Canvas, vignette, scroll cue | `aria-hidden="true"` | `Stage.astro` |

## Manifest

`public/site.webmanifest`.

| Field | String |
| --- | --- |
| `name` | `Xini` |
| `short_name` | `Xini` |
| `start_url` | `/` |
| `display` | `browser` |
| `background_color` | `#020806` |
| `theme_color` | `#020806` |
| Icons | `/apple-touch-icon.png` (180×180), `/icon-512-maskable.png` (512×512, maskable) |

## Other public files

| File | Text |
| --- | --- |
| `public/robots.txt` | `User-agent: *` / `Allow: /` / `Sitemap: https://xini.dev/sitemap.xml` |
| `src/pages/sitemap.xml.ts` | One URL, `https://xini.dev/`, with the build date as `lastmod` |
