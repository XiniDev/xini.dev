# xini.dev v5 — audio

## What changes

- **Music.** An adaptive track generated in code (`src/shared/core/music.js`), no audio files.
  Each stop adds or changes a layer, so moving through the site builds the track.
- **The sting.** When sound is first switched on: relay clicks, the power whine, then the slam,
  with the music's first chord landing on it.
- **No ambient bed.** The board hum and fan noise are gone. Every other effect stays.
- **A master chain and real levels**, with the music ducking under flights.

Sound stays off by default. The toggle and its saved choice behave as in v4: every page load
starts with sound off, because browsers need a click before audio can play.

A rendered preview of the music (a scripted visit with stand-in effects) can be regenerated with
`npm run audio:preview`.

## The music

90 BPM, swung sixteenths, F minor. Electric piano (two-operator FM), detuned-saw pad, synth bass,
synthesised drums, and a few glitch ornaments at phrase ends. No lead melody.

Main progression, two bars per chord: **Fm9 · Dbmaj9 · Bbm9 · C7sus → C7(b9)**. The arpeggio
pattern rotates every 8 bars and the drums fill on the 8th bar, so a long stay doesn't loop
identically.

| Stop | Layers | Level (alone, through master) |
|---|---|---|
| 01 Power on | keys, pad, sub bass, soft kick pulse, eighth hats, shaker | ≈ −21 LUFS |
| 02 The core | the groove comes in: bass line, backbeat snare, sixteenth hats | ≈ −20 LUFS |
| 03 Neural core | adds a sixteenth arpeggio through a ping-pong delay | ≈ −19.5 LUFS |
| 04 Enclave, locked | dark pad over a C pedal, half-time drums, ticking hats, tension arpeggio, noise riser | ≈ −21.5 LUFS |
| 04 Enclave, solved | impact on the next beat, then the groove again from Fm9 | ≈ −20 LUFS |
| 05 Memory | keys switch to syncopated stabs, a sparse bell | ≈ −20 LUFS |
| 06 I/O | brighter chords (Dbmaj9 · Abmaj9/C · Bbm9 · Eb7sus), air, drums drop back | ≈ −21 LUFS |

Timing rules inside the engine:
- A stop change lands on the next bar line after the flight departs (2.7 s at most).
- The Enclave resolve lands on the next beat after the cube solves (0.67 s at most). If the cube
  solves before the locked section starts, the music goes straight to the resolve. If no solve
  arrives, it resolves by itself after 6 bars.
- After about 2 minutes at one stop with no interaction, the mix thins to keys and pad. Any
  navigation or click brings the full mix back on the next bar.
- A fixed seed: every visit plays the same notes.

## What plays when

| When | What plays | Level |
|---|---|---|
| Sound switched on, first time in a page load | the sting (below), then the current stop's music | slam −4 to −2 dBFS peak; music as in the table above |
| Sound switched on again | the music fades in over 0.8 s, no sting | |
| Sound switched off | music fades over 0.6 s, then the context suspends | silence |
| At a stop | that stop's layers | table above |
| Flight departs (including jumps) | whoosh; music ducks 5 dB; the music changes on the next bar line | whoosh: tier B |
| Flight arrives | arrival slam; music returns to full | tier B |
| Cube solves | unlock clunk now; music impact and resolve on the next beat | clunk: tier A |
| Memory project step | existing pager and module cues | tier B / C |
| Hovers and clicks on the interface | existing ticks and snaps | tier C |
| Scene clicks (lattice, fan, board) | existing snap and whoosh | tier B |
| Finale (I/O → Power on) | existing finale whine; music returns to the Power on layers on the next bar | tier B |
| Tab hidden | everything fades out in 0.25 s and the context suspends; it resumes where it left off | |

## The sting

Played once per page load, the first time sound is switched on. It reuses the boot cues that
already exist in `sfx.js`, timed from the click (t = 0):

| t (s) | Event |
|---|---|
| 0.05 – 0.33 | five relay clicks |
| 0.38 → 2.2 | power whine, rising |
| 2.2 | slam + music starts: `music.start(t0 + 2.2, { stop, impact: true })`; the impact (sub boom, crash, accented first chord) lands with the slam |

- **Switched on during the visual boot,** with the boot's impact frame at least 0.6 s away: start
  the relays now, run the whine up to the impact frame, and land the slam and the music's first
  chord on the impact frame (convert its time from the page clock to `ctx.currentTime`).
  Otherwise play the normal sting.
- **Switched off during the sting:** fade out and stop. The sting doesn't replay on the next enable.

## Wiring

`sfx.js` owns the AudioContext. `music.js` numbers the stops 0–5 (Power on = 0, The core = 1,
Neural core = 2, Enclave = 3, Memory = 4, I/O = 5); the route strip shows them as 01–06.

Sketch (adapt names to the existing code):

```js
import { createMusic } from './music.js';
import { createMaster } from './master.js';

// once the AudioContext exists (first time sound is switched on)
const master = createMaster(ctx);
const out = ctx.createGain();                       // sound on/off and tab fades
master.output.connect(out); out.connect(ctx.destination);
const sfxBus = ctx.createGain();   sfxBus.connect(master.input);   // every effect goes here
const musicBus = ctx.createGain(); musicBus.connect(master.input);
const music = createMusic(ctx, musicBus);

function fadeOut(to, seconds) {
  const g = out.gain, now = ctx.currentTime;
  g.cancelScheduledValues(now); g.setValueAtTime(g.value, now); g.linearRampToValueAtTime(to, now + seconds);
}

let stingPlayed = false;
let suspendTimer = null;

async function soundOn() {
  clearTimeout(suspendTimer);
  await ctx.resume();
  fadeOut(1, 0.05);
  const t0 = ctx.currentTime + 0.02;
  const solved = cubeIsSolved();          // whether the cube is solved (or will be) when you arrive
  if (!stingPlayed) {
    stingPlayed = true;
    playBootCues(t0);                     // relays, whine, slam at t0 + 2.2
    music.start(t0 + 2.2, { stop: currentStop(), impact: true, solved });
  } else {
    music.start(t0 + 0.05, { stop: currentStop(), solved, fadeIn: 0.8 });
  }
}

function soundOff() {
  music.stop(0.6);
  fadeOut(0, 0.3);
  suspendTimer = setTimeout(() => ctx.suspend(), 700);
}
```

| Site event | Call |
|---|---|
| Flight or jump departs to stop `to` | `music.setStop(to, { solved: to === 3 && cubeIsSolved() })`, `music.duck()` |
| Flight arrives | `music.unduck()` |
| Cube solves | `music.cubeSolved()` |
| Memory project step, scene click, nav click | `music.activity()` |
| Tab hidden (sound on) | `fadeOut(0, 0.25)`, then `ctx.suspend()` |
| Tab visible again (sound on) | `ctx.resume()`, then `fadeOut(1, 0.4)` |

The music's scheduler runs on the context clock, so suspending and resuming continues the track
where it stopped.

## Levels

All levels are measured through the master chain (`src/shared/core/master.js`: limiter at −3 dB,
20:1, 3 ms attack; soft clip with a −1.4 dBFS ceiling).

**Music** (`npm run audio:measure`, exits non-zero on a fail):
- The core: −21.5 to −18.5 LUFS (target −20).
- Every stop: −22.5 to −18 LUFS; the spread between stops at most 3 LU.
- Sample peak at most −1 dBFS.

**Effects**, each cue rendered alone, peak level:

| Tier | Cues | Peak |
|---|---|---|
| A · signature | sting slam, Enclave unlock clunk | −4 to −2 dBFS |
| B · movement | flight whoosh, arrival slam, seating clacks, board-complete snap, finale whine, fan whoosh, lattice and board snaps | −10 to −6 dBFS |
| C · detail | relay clicks, hover ticks, click and toggle snaps, chip pick ticks, dial clicks, pager and index whoosh | −18 to −12 dBFS |

The boot whine rises from about −24 dBFS to tier B by the slam.

**Ducking:** music −5 dB during flights (60 ms time constant down, 200 ms back up).

**Measuring effects.** Render each cue into an OfflineAudioContext and measure it with
`tools/audio/loudness.mjs` (pure JS; it runs in Node and in the browser). If `sfx.js` can take an
injected context, do it in Node with node-web-audio-api; otherwise do it in the page through
Playwright. Put the script at `tools/audio/sfx-levels.mjs` and print a table.

**A known quirk of node-web-audio-api:** it mis-renders `setTargetAtTime` when time passes between
the previous automation event and the target's start (the value shoots up into the thousands).
Browsers are fine. `music.js` avoids it by setting the value explicitly right before every
`setTargetAtTime`; do the same in `sfx.js` if an offline render of a cue looks wrong. The
workaround is exact in browsers too.

## Behaviour

- **Phones:** the same audio. iOS mutes WebAudio when the ringer switch is on silent; that stays.
- **`prefers-reduced-motion`:** no change to audio.
- **Performance:** the engine creates short-lived nodes per note: about 145 per bar at Power on and
  I/O, up to about 335 at Memory (55 to 125 a second), plus one convolver reverb. PLAN #4 checks
  frame pacing with sound on.

## Tools

Add the dev dependency and scripts (Node 22 or later; the tools import the site's ES modules):

```
npm i -D node-web-audio-api
```

```json
"audio:test": "node tools/audio/music.test.mjs",
"audio:measure": "node tools/audio/measure.mjs",
"audio:preview": "node tools/audio/preview.mjs reference/audio/music-preview.wav"
```

If `package.json` has no `"type": "module"`, Node prints a "Reparsing as ES module" warning when
the tools load `music.js`. It's harmless; leave `"type"` as it is.

- `audio:test` — engine behaviour (stop changes on the bar, lock and resolve, idle, stop), about 1 s.
- `audio:measure` — music levels per stop against the targets above, about 45 s.
- `audio:preview` — renders the scripted visit to a WAV, about 2 min.

## Tuning

Musical choices live at the top of `music.js`: `SCORE` (tempo, swing, idle time), `PROGRESSIONS`
(chords), `STOPS` (layers and their levels per stop) and `MIX` (trims, reverb and delay sends,
overall level). After any change, run `audio:measure` and `audio:test`, and render a preview to
listen.
