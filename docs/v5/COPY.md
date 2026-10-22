# xini.dev v5 — copy

Every string that changes in v5, word for word. Keep the source's existing conventions for case
(headlines and labels render in caps through CSS) and for the middle dot `·`.

## Rules for anything you touch

- Clear, concise, professional. No fluff, nothing cocky or edgy.
- No explanatory text in the product.
- No "X, not Y" constructions.
- Nothing that reads as AI-written: no lines that explain themselves or announce the obvious.
- Chinese or Japanese must work in that language on its own: punchy written copy, never a
  translation of an English line or metaphor. If a line doesn't work in Chinese, cut it.

## 01 · Power on

| Part | v4 | v5 |
|---|---|---|
| Label (after the name XINI) | Systems engineer | Software Engineer · AI Integration |
| Headline | I build complete, self-hosted products with modern AI woven in. | Ambitious ideas, ambitious software. |
| Line under the headline | MSc Artificial Intelligence, St Andrews / BSc Computer Science, Warwick | Developer · Designer · Creator |

The two degree lines go everywhere on the site, including meta tags and structured data if
they appear there. The spec line takes their place and style (mono, small).
On phones the label may wrap after the `·`; it must not overflow the card.

## 02 · The core

| Part | v4 | v5 |
|---|---|---|
| Headline | Whole systems, built solo. | From design to deployment. |
| Body | I take ambitious ideas all the way to production on my own: real-time 3D, multiplayer backends, data, infrastructure and the interface people actually use. | I take big ideas all the way to production on my own: AI integration, real-time 3D, multiplayer backends, data, infrastructure and polished interfaces. |
| Tags | Full Stack · Real-time 3D · Multiplayer | AI Integration · Real-time 3D · Multiplayer |
| Gantry chips (3D) | UI · 3D · API · NET · DB · OPS | UI · 3D · AI · NET · DB · OPS (the API chip becomes AI, same slot) |

## 03 · Neural core

| Part | v4 | v5 |
|---|---|---|
| Headline | AI that does real work. | Intelligence built in. |
| Body | I build AI into products where it earns its place: agents that act on real systems, MCP servers that give models real tools, and local models when the data should stay put. | I build AI into products: agents that act on real systems, MCP servers that give models tools, and local models for private data. |
| Tags | Agents · MCP Servers · Local Models | unchanged |

## 04 · Enclave

| Part | v4 | v5 |
|---|---|---|
| Headline | Secure by default. | Safe & secure. |
| Body | I self-host what I build and design for Zero Trust, with OWASP practice and PII redaction there from the first commit. | unchanged |
| Tags | Self-hosting · OWASP · Zero Trust | unchanged |

## 05 · Memory

Project copy unchanged.

## 06 · I/O

| Part | v4 | v5 |
|---|---|---|
| Headline | Get in touch | unchanged |
| Email | xini@saltancy.com | unchanged |
| Line under the email | I take on client projects through my consultancy, Saltancy. | removed |
| Buttons | GitHub · LinkedIn | Saltancy · GitHub · LinkedIn, each with its icon |
| Saltancy link | (in the sentence) | https://saltancy.com |
| Back to start, © 2026 Xini | | unchanged |

## Arrival impact frames

Remove the stop-name text that flashes on arrival. The route strip text stays.

## Board silkscreen

- **組裝 ASSEMBLY** at the core: keep exactly as it is.
- **The line under it** (pick, place, six parts, one operator) becomes `ASSY-01 · REV 5 · XINI 2026`.
- **Any other line that explains itself** becomes a terse marking in the style real boards use:
  reference codes, revisions, the name and year. Style examples: `SEC-04`, `DIMM_A1–A3`, `IO_06`,
  `REV 5`, `XINI 2026`. No sentences.
- **Enclave and Memory CJK legends:** removed in v5.

### CJK options for Xini to choose later (don't implement)

Each works as Chinese on its own terms, independent of the English section name.

| Where | Option | Reads as |
|---|---|---|
| Enclave | 滴水不漏 | watertight: nothing gets out (apt for data) |
| Enclave | 固若金湯 | an impregnable fortress |
| Memory | 代表作 | signature works |
| Memory | 作品 | works (plain) |

## Meta and share text

If the old intro headline or the degrees appear in the page title, meta description or share
tags, replace them using approved lines only, for example:
"Ambitious ideas, ambitious software. I take big ideas all the way to production on my own: AI
integration, real-time 3D, multiplayer backends, data, infrastructure and polished interfaces."

## Retired strings

None of these may appear outside `docs/` and `reference/` after v5:

- Systems engineer
- I build complete, self-hosted products with modern AI woven in
- MSc Artificial Intelligence · BSc Computer Science · St Andrews · Warwick
- Whole systems, built solo
- the interface people actually use
- Full Stack (as a tag on The core's card)
- AI that does real work
- where it earns its place · when the data should stay put
- Secure by default
- I take on client projects through my consultancy
- pick, place, six parts, one operator (in any spelling on the board)
