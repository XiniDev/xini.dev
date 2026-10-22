Build xini.dev v5 on top of v4, the version running locally.

I've put a folder `xini-v5/` at the repo root. It mirrors the repo's paths and only adds new files:
- `docs/v5/PLAN.md`: the numbered changes, why, how to check each, the run rules and the report
- `docs/v5/COPY.md`: every string that changes, word for word
- `docs/v5/AUDIO.md`: the music, the sound-on sting, wiring and levels
- `src/shared/core/music.js`: the music engine, written and tested. Integrate it; don't rewrite it.
- `src/shared/core/master.js`: the master chain
- `tools/audio/`: behaviour test, level check, preview renderer, loudness meter

Steps:
1. Tag the current state `v4` and create a branch `v5`.
2. Move everything from `xini-v5/` into the same paths in the repo. They're all new files; if any
   path already exists, stop and tell me. Delete `xini-v5/` and commit.
3. Read `docs/v5/PLAN.md`, `COPY.md` and `AUDIO.md`, then `docs/DIRECTION.md` and
   `docs/ARCHITECTURE.md`.
4. Add the dev dependency and npm scripts from AUDIO.md → Tools, and run `npm run audio:test` to
   confirm the engine works here.
5. Work through PLAN.md in order, audio first, one commit per change, following its run rules:
   check after every change, at most two fix attempts per failing check, then log it and move on.
   Change nothing that isn't listed, and leave the music itself as it is. When phase A (audio) is
   in, post a one-line note that it's ready to listen to on localhost, then carry on.
6. Write `docs/v5/REPORT.md` as PLAN.md describes, then tell me what needs my eyes or ears.
