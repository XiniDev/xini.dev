# Reference (read-only, not deployed)

Material from the design rounds that produced the site. Nothing here is built or deployed, and nothing here
should be edited: the site's code lives in `src/`.

| Folder | What it is |
|---|---|
| `worlds/` | The prototypes page as published during the design rounds: the chooser plus every direction, built and ready to run. `npm run worlds` serves it at http://localhost:4174. Worlds: Inside the machine v4 (the approved design, now the site), Inside the machine v1, Tower dive, Hextech realm, and The loop (`concepts/loop/index.html`, not linked from the chooser) |
| `source/` | The prototype project's source for every direction (`concepts/<world>/`, shared engine in `shared/`). Read it to lift an idea from an earlier direction into `src/`. Its build and capture scripts are tied to the machine they were written on and are not meant to run here |
| `captures/` | Screenshots of the approved v4 design: every stop at desktop (1600×900), laptop (1200×750) and phone (390×844) sizes, frames inside each flight, the boot and the finale. Compare new captures (`npm run shots`) against these |

The earlier directions in brief:

- **Inside the machine v1**: the first version of the chosen direction, a drone flight through a motherboard built
  like a night city, with the cooler as its tower. v2 rebuilt it; five rounds of judging and fixes made v4.
- **Tower dive**: land on a megatower roof in the rain, then dive down its atrium a floor at a time. Liked for its
  cyberpunk city; the straight-down camera was boring.
- **Hextech realm**: flights through the rings of a painted brass armillary over a city at dusk. Its rune
  dynamics and UI were liked; the Arcane/Hextech theme didn't fit xini.dev.
- **The loop**: a simpler track around the mark; too simplistic, though its ending zoom into the icon worked.
