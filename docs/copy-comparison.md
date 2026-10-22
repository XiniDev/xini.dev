# Copy comparison: Lattice → Inside the machine v4

Old strings are from [old-site-copy.md](old-site-copy.md) (tag `lattice-final`). New strings are from
`src/shared/data/content.js`, the head of `index.html`, `src/shared/world/ui.js`, `src/main.js`, `public/404.html`
and `public/site.webmanifest` of the v4 site. Nothing here changes either site; it is a record for the copy review.

Status: **Same**, **Changed**, **Old only** (no counterpart in v4), **New only** (no counterpart in Lattice).

## Head and share text

| Item | Old | New | Status |
| --- | --- | --- | --- |
| `<html lang>` | `en-GB` | `en-GB` | Same |
| `<title>` | `Xini, systems engineer` | `Xini, systems engineer` | Same |
| Description | `Xini builds complete, self-hosted products with modern AI woven in, across games, tools and client work.` | same | Same |
| Canonical | `https://xini.dev/` | `https://xini.dev/` | Same |
| `theme-color` | `#020806` | `#040807` | Changed |
| `og:type` | `website` | `website` | Same |
| `og:site_name` | `xini.dev` | `Xini` | Changed |
| `og:locale` | `en_GB` | `en_GB` | Same |
| `og:title` | `Xini, systems engineer` | `Xini, systems engineer` | Same |
| `og:description` | as description | as description | Same |
| `og:url` | `https://xini.dev/` | `https://xini.dev/` | Same |
| `og:image` | `https://xini.dev/og.png` | `https://xini.dev/og.jpg` | Changed |
| `og:image:type` | `image/png` | `image/jpeg` | Changed |
| `og:image:width` / `height` | `1200` / `630` | `1200` / `630` | Same |
| `og:image:alt` | `The XINI wordmark drawn in green particles on a near-black background.` | `A cooler tower lit with the Xini mark over a circuit-board city at night, beside the line: I build complete, self-hosted products with modern AI woven in.` | Changed |
| `twitter:card` | `summary_large_image` | `summary_large_image` | Same |
| `twitter:title` | `Xini, systems engineer` | — | Old only |
| `twitter:description` | as description | — | Old only |
| `twitter:image` | `https://xini.dev/og.png` | — | Old only |
| `twitter:image:alt` | as `og:image:alt` | — | Old only |
| JSON-LD `Person` (`Xini`, `Systems engineer`, Warwick, St Andrews, Saltancy, GitHub, LinkedIn) | present | — | Old only |

## Top bar

| Item | Old | New | Status |
| --- | --- | --- | --- |
| Mark | text `XINI` | fold-mark logo (SVG, `aria-label="Xini"`) + `Xini` (aria-hidden) | Changed |
| Nav → Work | `Work` (`#work`) | `Work` (`#work`) | Same |
| Nav → About | `About` (`#about`, the Systems beat) | `About` (`#systems`, the Systems stop) | Same (target id changed) |
| Nav → Consultancy | `Consultancy` | `Consultancy` + `↗` (aria-hidden) | Same (arrow added) |
| Nav → Contact | `Contact` (`#contact`, the footer) | `Contact` (`#contact`, the contact stop) | Same |
| Sound toggle | — | button, `aria-label="Sound"`, `aria-pressed` | New only |

## Story: rail and route

The Lattice rail named five beats with numbers; v4 names six places on a route, each with a plain-words section.

| Position | Old rail (label · number) | New route (number · place · section) | Status |
| --- | --- | --- | --- |
| 1 | `Xini` · `00` | `01 · Power on` | Changed |
| 2 | `Systems` · `01` | `02 · The core · Systems` | Changed |
| 3 | `AI` · `02` | `03 · Neural core · AI` | Changed |
| 4 | `Security` · `03` | `04 · Enclave · Security` | Changed |
| 5 | `Work` · `04` | `05 · Memory · Projects` | Changed |
| 6 | (footer, not on the rail) | `06 · I/O · Contact` | New only |
| Route label (visible, aria-hidden) | — | `0N/06` + place + ` · ` section; `↺ ` before `01/06` when returning from 06 | New only |
| Card counter (aria-hidden) | — | `01/06` … `06/06` | New only |
| Card reference (aria-hidden) | — | `PWR`, `U1`, `U7`, `U9`, `J4`, `J1` | New only |
| Place title sweep mid-flight (aria-hidden) | — | the place name (`Power on` … `I/O`) | New only |

Sources: `src/main.js` → `PLACES`, `SECTIONS`, `REFS`, `routeLabel`; `src/shared/world/ui.js` → route nav.

## Story: intro / first stop

| Item | Old | New | Status |
| --- | --- | --- | --- |
| Kicker | — | `Xini` · `Systems engineer` | New only |
| Statement | `I build complete, self-hosted products with modern AI woven in.` (paragraph) | same text, now the page `<h1>` | Same (now the h1) |
| Credentials | `MSc Artificial Intelligence, St Andrews. BSc Computer Science, Warwick.` (one line) | `MSc Artificial Intelligence, St Andrews` / `BSc Computer Science, Warwick` (two items, no full stops) | Changed |
| Scroll cue (aria-hidden) | `Scroll` | `Scroll` (page cue and card cue) | Same |

## Story: beats 1–3 / stops 2–4

| Item | Old | New | Status |
| --- | --- | --- | --- |
| Step numbers | `01`, `02`, `03` | replaced by the card counter `02/06`, `03/06`, `04/06` | Changed |
| Systems heading | `Whole systems, built solo.` | `Whole systems, built solo.` | Same |
| Systems body | `I take ambitious ideas all the way to production on my own: real-time 3D, multiplayer backends, data, infrastructure and the interface people actually use.` | same | Same |
| Systems support | `Full stack, real-time 3D, multiplayer` | `Full stack` / `Real-time 3D` / `Multiplayer` (tags) | Changed (split; capitalised) |
| AI heading | `AI that does real work.` | `AI that does real work.` | Same |
| AI body | `I build AI into products where it earns its place: agents that act on real systems, MCP servers that give models real tools, and local models when the data should stay put.` | same | Same |
| AI support | `Agents, MCP servers, local models` | `Agents` / `MCP servers` / `Local models` (tags) | Changed (split; capitalised) |
| Security heading | `Secure by default.` | `Secure by default.` | Same |
| Security body | `I self-host what I build and design for Zero Trust, with OWASP practice and PII redaction there from the first commit.` | same | Same |
| Security support | `Self-hosting, OWASP, Zero Trust` | `Self-hosting` / `OWASP` / `Zero Trust` (tags) | Changed (split) |
| Japanese labels (`beats[].jp`) | — | `システム`, `人工知能`, `防御` (data only; not rendered by `ui.js` or `main.js`) | New only |

## Featured work

| Item | Old | New | Status |
| --- | --- | --- | --- |
| Heading | `Featured work.` (visible) with step `04` | `Work` (screen-reader only) | Changed |
| Order | Gloam, DBridger, VOETutor | VOETutor, Gloam, Saltancy | Changed |
| Presentation | three cards side by side | one project at a time, with a pager | Changed |
| Pager buttons | — | `aria-label="Previous project"`, `aria-label="Next project"` | New only |
| Pager count (`aria-live="polite"`) | — | `01 / 03` | New only |
| All-projects button | — | `All ${count} projects` (count of list rows; `ui.js` writes `All projects <count>`, `main.js` rewrites it) | New only |
| Link arrow | — | `↗` (aria-hidden) after each link label | New only |
| Year (`featured[].year`) | — | `2026` (data only; not rendered) | New only |

### VOETutor

| Field | Old | New | Status |
| --- | --- | --- | --- |
| Kicker | — | `Client work` | New only |
| Summary | `Curated marketplace of vetted IB tutors, with on-demand video lessons and progress tracking.` | same | Same |
| Tags | `Next.js, Supabase` | `Next.js` / `Supabase` | Same |
| Credit | `Built through Saltancy` | `Built through Saltancy` | Same |
| Link | `voetutor.com` | `voetutor.com` | Same |
| Image alt | `The VOETutor home page: the headline “Find your IB educator. Open the vault.”, a search box and cards for vetted IB tutors with their subjects and hourly rates.` | `The VOETutor home page: a search box and cards for vetted IB tutors with their subjects and hourly rates.` | Changed |

### Gloam

| Field | Old | New | Status |
| --- | --- | --- | --- |
| Kicker | — | `Own product` | New only |
| Summary | `Self-hosted 3D virtual tabletop for D&D 5e, with shadow-casting light, per-creature line of sight and all 339 spells from D&D’s open rules, automated.` | same | Same |
| Tags | `TypeScript, React Three Fiber, Colyseus, SQLite, MCP` | same five | Same |
| Link | `Source on GitHub` | `Source on GitHub` | Same |
| Image alt | `Gloam’s 3D tabletop: a stone dungeon map seen at an angle, with goblin and Crypt Warden tokens, health bars and a tool sidebar.` | `Gloam’s 3D tabletop: a stone dungeon map seen at an angle, with goblin and Crypt Warden tokens and health bars.` | Changed |

### Saltancy (new featured) / Saltancy Website (old list row)

| Field | Old | New | Status |
| --- | --- | --- | --- |
| Name | `Saltancy Website` (GitHub list) | `Saltancy` (featured) | Changed |
| Kicker | — | `Consultancy` | New only |
| Summary | `Landing page for Saltancy, my consultancy for end-to-end technical work and custom software development.` | `My consultancy for end-to-end technical work and custom software. Client projects run through it.` | Changed |
| Tags | none | `Next.js` / `Tailwind CSS` / `Motion` | New only |
| Link | repo row in the list | `saltancy.com` → `https://saltancy.com` | Changed |
| Image alt (old not rendered) | `Saltancy’s landing page: the headline “We engineer the structure your product is built to hold.” beside a wireframe cube on a dark background.` | `Saltancy’s landing page: a serif headline beside a wireframe cube on a dark background.` | Changed |

### DBridger (old featured, now a list row)

| Field | Old | New | Status |
| --- | --- | --- | --- |
| Placement | featured card 2 | row in All projects | Changed |
| Summary | `Autonomous agent that queries legacy databases in plain English, with PII redaction built in.` | same | Same |
| Tags | `Python, PyQt6, Gemini, SQLite, MCP` | — (list rows show language only) | Old only |
| Link | `Source on GitHub` | the row itself links to the repo | Changed |
| Image alt | `DBridger’s desktop window: a schema explorer …` | — (image kept in data, no alt, not rendered) | Old only |

## GitHub list / All projects

| Item | Old | New | Status |
| --- | --- | --- | --- |
| Placement | section below the stage, always visible | drawer opened from the Work stop | Changed |
| Heading | `More on GitHub` | `All projects` (drawer `aria-label` and `<h2>`) | Changed |
| Close button | — | `aria-label="Close"` | New only |
| Row | name · description · language · `Updated Mon YYYY` (separate elements) | name · description · `Language · Updated Mon YYYY` | Changed (layout) |
| Older toggle | `Older projects (N)` | `Older projects (N)` | Same |
| Older toggle marker | `+` / `−` (CSS) | browser default | Old only |
| Empty state | `See all my projects on GitHub.` | — | Old only |
| Hidden repos | none | `xini.dev`, `Gloam`, `saltancy-web` | Changed |

### Curated row summaries

| Project | Old | New | Status |
| --- | --- | --- | --- |
| Notes API | `Secure REST API where each user creates, reads, updates and deletes their own notes, with filtering, built on Node.js, Express and MongoDB following OWASP guidance.` | same | Same |
| LeadingOnes DAC | `MSc dissertation: a model-based deep reinforcement learning agent that learns to tune an optimisation algorithm while it runs, improving learning quality and sample efficiency on a standard benchmark.` | `MSc dissertation: a model-based deep reinforcement learning agent that learns to tune an optimisation algorithm while it runs.` | Changed (shortened) |
| AI Search Algorithms | `Classic AI search algorithms, from breadth-first and depth-first to A* and SMA*, planning flight routes on a polar grid, each with an optional bidirectional mode.` | `Classic AI search algorithms, from breadth-first and depth-first to A* and SMA*, planning flight routes on a polar grid.` | Changed (shortened) |
| NullVector | `Processing (Java) platformer where you fight enemies and a boss named Zorp with gravity-affected projectiles, with boss phases, bounce damage and a full GUI.` | `Processing (Java) platformer with gravity-affected projectiles, boss phases, bounce damage and a full GUI.` | Changed (shortened) |
| Jungle Game & JunGUI | `Java implementation of the Jungle board game with a Swing GUI, multiplayer support and legal-move highlighting.` | same | Same |
| ECS Platformer Demo | `Platformer demo that tests an Entity-Component-System architecture, written in C++ with SDL2.` | same | Same |
| Overthrow Synthetica | `Two-week, two-person game jam demo for the Warwick Game Dev Society, made with my teammate Codethulu using Three.js and WebGL.` (language empty) | `Two-week, two-person game jam demo for the Warwick Game Dev Society, made with Three.js and WebGL.` (language `JavaScript`) | Changed (teammate credit dropped) |
| getajobman | — (GitHub description) | `Job tracker in Next.js and Supabase that reads a posting from its URL and drafts a tailored CV and cover letter with a language model.` | New only |
| WSMath | `Portfolio for an international mathematics exam strategist, …` (data only, never listed) | — | Old only |

## Footer / contact stop

| Item | Old | New | Status |
| --- | --- | --- | --- |
| Placement | page footer | sixth stop (`I/O`) | Changed |
| Heading | `Get in touch` | `Get in touch` | Same |
| Email | `xini@saltancy.com` | `xini@saltancy.com` | Same |
| Client line | `I take on client projects through my consultancy, Saltancy.` (link on `Saltancy`) | same | Same |
| GitHub link | `GitHub` | `GitHub` | Same |
| LinkedIn link | `LinkedIn` | `LinkedIn` | Same |
| Restart link | — | `↺` (aria-hidden) `Back to start` → `#top` | New only |
| Copyright | `© 2026 Xini` | `© 2026 Xini` | Same |
| `site.contactLine` | — | `I take on client projects through my consultancy, Saltancy.` (data only; `ui.js` writes the line itself) | New only |

## 404 page

| Item | Old | New | Status |
| --- | --- | --- | --- |
| `<title>` | `Page not found, Xini` | `Page not found · Xini` | Changed |
| Robots | `noindex` | `noindex` | Same |
| Logo | — | fold mark, `aria-label="Xini"` | New only |
| Heading | `Page not found` | `Page not found` | Same |
| Body | `That page doesn't exist any more.` | — | Old only |
| Link → `/` | `Back to xini.dev` | `Back to start` | Changed |

## Accessibility-only text

| Item | Old | New | Status |
| --- | --- | --- | --- |
| Skip link | `Skip to work` | `Skip to work` | Same |
| Mark link label | `Xini, back to top` | `Xini, back to the start` | Changed |
| Nav label | `Primary` | `Primary` | Same |
| New-tab text | ` (opens in a new tab)` | ` (opens in a new tab)` | Same |
| Page `<h1>` | `Xini, systems engineer` (screen-reader only) | the statement (visible) | Changed |
| Stage label | `Introduction` | — (each stop is a section named by its heading) | Old only |
| Rail / route label | `Sections` | `Places` | Changed |
| Rail separator | `, section ` | — | Old only |
| Current item | `aria-current="step"` | `aria-current="true"` (route), `aria-current="location"` (nav) | Changed |
| Beat support list | — | `aria-label="Focus"` | New only |
| Work heading | `Featured work.` (visible) | `Work` (screen-reader only) | Changed |
| Sound, pager, close buttons | — | `Sound`, `Previous project`, `Next project`, `Close` | New only |

## Manifest

| Field | Old | New | Status |
| --- | --- | --- | --- |
| `name` / `short_name` | `Xini` / `Xini` | `Xini` / `Xini` | Same |
| `start_url`, `display` | `/`, `browser` | `/`, `browser` | Same |
| `background_color` / `theme_color` | `#020806` | `#040807` | Changed |
| Icons | apple-touch-icon 180, maskable 512 | same paths and sizes | Same |

## In-scene text (v4 only)

Rendered into the WebGL scene (silkscreen, chip stickers, signs); decorative and not in the DOM. All **New only**.

| Source | Strings |
| --- | --- |
| `src/districts.js` (power) | `VRM  ·  22 PHASE`, `EPS_12V`, `電源`, `POWER` |
| `src/districts.js` (memory) | `DIMM_A1` … `DIMM_B2`, `記憶體`, `MEMORY`, `M.2_1  STORAGE` |
| `src/districts.js` (neural) | `U7`, `神經`, `NEURAL CORE`, `NPU-01  ·  LOCAL INFERENCE` |
| `src/districts.js`, `src/enclave.js` (enclave) | `U9`, `認證`, `加密`, `SECURE ENCLAVE`, `NO UNSIGNED CODE PAST THIS LINE`, `TPM`, `SE-0`, `A0` |
| `src/districts.js` (I/O) | `USB 10G`, `LAN 2.5G`, `HDMI · DP`, `USB-C 20G`, `AUDIO`, `U21 LAN`, `U24 CODEC`, `U22 USB`, `接口`, `I/O`, `REAR PANEL  ·  OUT TO THE WORLD` |
| `src/districts.js` (board) | `PCIE_1  ×16`, `PCIE_2  ×4`, `ATX_24P`, `BAT1  +`, `XINI`, `MB-01  REV 2.6  ·  2026`, `DESIGNED AND BUILT BY XINI` |
| `src/core.js` (gantry) | `UI`, `3D`, `API`, `NET`, `DB`, `OPS`, `UI · 3D`, `API · NET`, `DB · OPS`, `XN · REEL`, `XN-01` … `XN-06`, `U1` … `U6`, `XN-SYS-01`, `ONE BOARD · SIX PARTS · REV A`, `組裝`, `ASSEMBLY`, `PICK + PLACE  ·  6 PARTS  ·  ONE OPERATOR`, `01` … `06` |
| `src/city.js` (skyline signs) | `電源` `POWER`, `冷卻` `COOLING`, `記憶體` `MEMORY`, `神經網絡` `NEURAL`, `接口` `I/O`, `自研` `BUILT SOLO` |

The Lattice site's scene drew the `XINI` wordmark and its forms as particles, with no text strings.
