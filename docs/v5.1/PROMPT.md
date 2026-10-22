Build xini.dev v5.1 on top of v5, the version running locally: the new Power on panel (design 6a) and its hologram entrance.

I've put a folder `xini-v5.1/` at the repo root. It mirrors the repo's paths and only adds new files:
- `docs/v5.1/HERO.md`: the changes, why, how to check each, the run rules and the report
- `reference/hero-6a/`: a working reference of the panel and its entrance (`hero6a.js`, `hero6a.css` and a playground page), target captures, timed frames and a preview video

Steps:
1. Tag the current state `v5.0` (a `v5` branch already exists) and create a branch `v5.1`.
2. Move everything from `xini-v5.1/` into the same paths in the repo. They're all new files; if any path already exists, stop and tell me. Delete `xini-v5.1/` and commit.
3. Read `docs/v5.1/HERO.md`, then `docs/DIRECTION.md` and `docs/ARCHITECTURE.md`. Serve `reference/hero-6a/` locally and open `index.html` to see the target; R replays the entrance.
4. Work through HERO.md in order, one commit per change, following its run rules. Port the reference into the existing card code; don't redesign it. Change nothing that isn't listed.
5. When change 1 is in, post a one-line note that the panel is up on localhost, then carry on.
6. Write `docs/v5.1/REPORT.md` as HERO.md describes, then tell me what needs my eyes.
