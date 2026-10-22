# Inside the machine — direction (v5)

## The idea

You are shrunk to the size of a signal inside Xini's own machine, at night. The motherboard is a city:
components are architecture, traces are roads, data is traffic, the cooler is the corporate spire with
the mark on its crown. The journey follows the power through a real computer, and the site's sections
are the machine's own architecture:

| Stop | Section | District | Hero mechanism |
|---|---|---|---|
| 1 Power on | Intro | Cooler tower over the socket | Fans spin up, heat climbs the pipes, the crown lights |
| 2 The core | What I build | Beside the socket | A pick-and-place gantry builds a six-part system board (UI, 3D, AI, NET, DB, OPS); its traces come alive when the last part lands |
| 3 Neural core | AI | NPU | The lattice thinks: activation waves run through it, layer by layer |
| 4 Enclave | Security | Secure enclave (east of the memory row) | The cipher cube: scrambled in red, it solves itself and its face becomes the mark |
| 5 Memory | Projects | DDR5 row | Each project is a module that seats with a clack; scrolling steps through them |
| 6 I/O | Contact | Rear panel | Output to the world, then the finale |
| Finale | (end) | Whole board | Pull back: the board's power plane is the mark; dive back in |

"From design to deployment" stops being a claim: the visitor travels through one.

## What the feedback set

Keep: the machine world, the Verdigris palette, the neural lattice, the boot impact flash, the
camera that goes everywhere. Borrow from Tower dive: the Night City atmosphere and its smooth camera.
Drop: the loop and Hextech entirely (Hextech is kept for Gloam's own site). Fix: murky colour,
an enclave nobody can read, camera jank, UI that does not come from the world.

## Art direction

### Value plan first (grey before colour)

Every frame is checked in greyscale before colour. Three planes:

- **Far** (skyline, haze): mid-dark, low contrast. It sits lighter than the board's shadows so
  silhouettes read against it.
- **Mid** (the district around the stop): the board's dark teal and brass, normal contrast.
- **Hero** (the stop's mechanism): the brightest brights and darkest darks in the frame. Nothing
  else may out-contrast it.
- **Foreground**: whatever stands between the camera and the stop sinks toward ink, a dark frame
  around the hero. Only what lies behind the stop hazes into the air.

### Focus: one hero awake at a time

- **Standby.** Only the stop you are at is lit. Every other district's lights drop to standby and
  its mechanism holds still: the gantry parks, the lattice stops thinking, the cube stops turning,
  the screens and memory bars dim, the cooler's fan idles. The next stop wakes from a fifth of the way
  into the flight, so every flight has somewhere to look; the route label and the nav change at a third.
  Only one mark is lit in any frame.
- **Printed depth, no lens blur** (post pass, around a point on the hero). Within a radius of the hero
  everything keeps full ink. Beyond it:
  - lines thin to a ghost and take the colour of the air (a colour hold, never a blur of black lines),
    and far away the ink thins out with distance as well
  - the colour plate slips off its key line (misregistration), the way print shows defocus
  - behind the hero, colour greys and sinks into the haze; in front of it, it flattens to one dark
    tone, a silhouette frame
  - lights stop blooming
- **Vignette.** The vignette takes the outer fifth of the frame down and leans toward the hero.
- **No motion in the periphery.** The skyline holds still: no traffic, no blinking beacons, no
  flickering signs. Packets run brightest on the traces into the current stop.

### Palette: Verdigris, tightened

Four families and cream. Colours are authored as display values, and three's colour conversion is
off for this page, so a hex in the palette renders as that hex, the same as the cards.

| Role | Colours | Rule |
|---|---|---|
| Ink and petrol neutrals | #040b0b ink, #0c2220 board, #1a3238 haze | The ground and the air; the air a petrol a step bluer than the board, so heroes separate by hue as well as light. Shadows go flat near-black. The haze shifts a step per stop: colder round the enclave, warm at the end as daylight comes in |
| Steel | #232f2e / #55625f | Anything structural that is not brass. Never brighter than mid grey; no white slabs |
| Brass | #6a502e shade, #a37b3e lit, #c29e58 chrome, #d7ae60 rims | Heat pipes, thin lit edges on moving parts, pads, connectors; in the chrome, keylines, pins and the way travelled |
| Sea-green | #1e8f6c deep, #52e3b2 brand, #d6fff0 core | Only where data is live, and full strength only on the current hero. The chrome is steel (#8fa19b labels and counts) and brass; green there only on a hover |
| Vermilion | #ff5a36 | Full strength in tiny areas only: the CPU's ember at the socket and the locked cipher's glyphs |
| Cream | #ece6d4; #f1d9a6 printed warm light | Type, the mark's front fold, emitted light. Nothing renders whiter: a soft cap in the post pass that keeps a saturated light's own hue, so the green stays the brand's green and warm light stays warm |

The key light changes along the scroll, cold to warm: the spire cold, a warm work light on the gantry's
head, the lattice and the gallery in sea-green, the cipher turning from vermilion to green tile by tile,
and warm daylight through the mark at the exit.

The mark is the same everywhere: back fold sea-green, front fold cream, as in the logo; the power
plane prints its fold in cream, and at the I/O, where it is light, the fold is cream and the legs a deep
brass, both flat. The impact frame keeps it legible: the fold stays paper, its cuts knock out of the ink.
The project screens are lit monitors (v5): the work in its own colours, which the grade leaves alone (a
display), its darkest values lifted at most 10 % toward the petrol air, a fine anti-aliased pixel grid
that fades out before it could moire, and a glass sheen drawn as hard-edged bands (light is drawn, never
airbrushed). The comic treatment stays on the frame. The screenshots are the real sites, captured at the
screen's aspect and device pixel ratio 2 in the scheme a first visit gets. (v4 printed them in two inks
with the live colours in green; it made the screenshots read oddly and Gloam look like a horror game.)

The chrome's inks are opaque (brass laid thin over teal turns olive): a dim brass for keylines, a dark
steel for rules, steel for labels, a headline cream a step under the hero's light, so the hero, not the
type, holds the brightest value.

The look is finished with a **3D LUT** (generated in code): a filmic S-curve, teal in the shadows,
brass-cream in the highlights, murky greens calmed, and khaki and olive (teal air over warm metal)
turned back toward brass, with the dark brass tones given some of their colour back.
**Aerial perspective**: haze thickens with distance and toward the board, so the far city falls back.

### Shape language and materials

- Chamfered rectangles (PCB), cylinders (caps), repeated fins, faceted polyhedra (neural).
- **Bevels on every hero edge**, so edges catch the key light. That is what makes a shape read as
  well made. Hero pieces are modelled procedurally in code from bevelled primitives (rounded boxes,
  bevelled extrusions, notched rings), so every part stays parametric and tweakable; static parts are
  merged per material at load (static batching) to keep draw calls low.
- Detail gradient: simple, dark silhouettes in the foreground, density rising toward the hero.
- Ink: comic outlines, halftone in the shading transitions, plate misregistration that slips with speed.
- **Drawn light.** Glows are printed as round dots in three hard steps, never airbrushed, on a
  screen coarse enough to read as print. Light that falls on things (the pick head's lamp, daylight
  through the mark) is printed as opaque dots of its own warm ink, so it keeps its colour over
  whatever it lands on, and it falls away in steps. The city's glow behind the spire is a dot screen.
  The power plane is a plate of green dots with a cream fold and an ink keyline, not glass; its flood
  runs out in straight edges at 0, 45 and 90 degrees, like a copper pour. The lattice's faces are a
  dot-tone skin. The cube hangs in a column of its own light over the dock.
- **Speed lines** are a few thin tapered wedges at the frame's edge, in steel (a mid value that never
  outshines the subject) and in ink where they cross something lit, kept off the bar and the route box,
  redrawn on twos; the accent impact frame keys its lines in ink.

### The city (from Tower dive)

Beyond the board's edge the rest of the case stands as a night skyline of towers that grow taller
to the north, all in the haze:
- Windows in one dim warm colour, sparse, some towers mostly dark.
- A few vertical signs in Chinese with small English (電源 POWER, 冷卻 COOLING, 記憶體 MEMORY), all in
  one dim cream.

### Board text (v5)

- The board prints what real boards print: designators (U1, CPU1), connector and slot codes (PCIE_1 ×16,
  DIMM_A1, EPS_12V), port labels, and terse markings (ASSY-01 · REV 5 · XINI 2026, SEC-04 · REV 5,
  IO_06 · REV 5). No sentences and no lines that explain themselves.
- A legend (a word that names a district) stays only if it can be read at its own stop: on screen, not
  behind a part or under the card, glyphs at least 7 px. One does: 組裝 ASSEMBLY at the core, kept exactly
  as it is. A legend seen only mid-flight is removed (tools/v5/audit-17-text.mjs measures them).
- Chinese must work as Chinese on its own: punchy written copy, never a translation of an English line or
  metaphor. The Enclave and Memory legends were translations and are gone; the alternatives for Xini to
  pick from later are in docs/v5/COPY.md.

The skyline holds still. The foreground stays clean machinery.

Tried and removed for clarity:
- sky traffic, both as specks and as light trails
- the giant case fans (they read as Ferris wheels)
- rooftop beacons
- thin far-off cables

### Motion language

- **Two clocks**: camera moves on the smooth clock; mechanisms, sparks, flicker and signs step on
  twos (12 fps), the Spider-Verse rule.
- **Every flight is a different move**: crane (start to core), orbit (core to neural), skim (neural to
  enclave, low along the board's south edge), climb (over the memory row into the gallery), run (down
  the aisle and a banked arc behind the cooler), reveal (the finale). Never two alike in a row.
- **A jump flies straight** (v5): between stops that are not neighbours the camera rises to cruise height,
  goes round the tower the short way and comes down onto the stop, turning from where it looks to where the
  stop looks by the shortest rotation, within 120°/s. (Through every stop between, a jump could spin most of
  the way round.)
- **The gallery steps.** At Memory each scroll step, arrow key or swipe shows the next project, then moves
  on; coming forward it opens on the first, back from the I/O on the last, and the flight lands on that
  screen.
- **Smooth like the tower**: a minimum-jerk speed profile, the camera looks along its path mid-flight
  and returns to the subject at the end, orientation is critically damped, a small settle on
  arrival. Every route keeps clearance from solid parts, checked frame by frame.
- **Impact frames** land arrivals. The boot's mark flash is the signature: a beat of stillness, an
  accent field with speed lines on the mark, the two-ink silhouette, then colour and a punch-in (no
  full-screen paper frame).

### UI: printed by the board

The **PCB card** (chosen over a datasheet style) is built like a plug-in card:
- a dark solder-mask panel printed with the world's dot screen, inked round its edge
- chamfered corners, a silkscreen outline and labels
- the part designator (U1, J4) and a pin-1 mark
- round alignment marks in two corners and a row of gold contacts along one edge

Cards keep to the page's columns: a card on the left lines up with the logo, one on the right with the
bar's last control; only its height follows the world (at the gallery the card's anchor rides the exhibit
nudge, so it keeps its column on every project). A trace leaves the card from a pad on its edge
and ends in a hollow ring on the edge of the part it describes, keyed in ink, at least 60 px from the
card; a packet runs along it. The route is a strip of board read left to right: six numbered vias on
one trace, the way travelled in brass, the current via cream in a brass ring, a return run under it for
the finale, and the current stop named on a tab of the same box (04/06 ENCLAVE); three small ticks under
05 count the gallery's projects, the one on show filled. Arrivals land their impact frame with no stop name
over it: the route strip already says where you are. On a phone the card carries the count instead. Tags are printed labels with no keyline and designators are bare
silkscreen, so the only boxed things on a card are the ones you can press. The nav follows the order
you travel (About, Work, Contact), and About stays lit for the three stops it covers.

Type: Chakra Petch for headlines (squared, technical), JetBrains Mono for silkscreen labels,
Hanken Grotesk for running text. No explanatory text anywhere in the product.

### Copy (v5)

Clear, concise, professional; nothing cocky or edgy; no "X, not Y" constructions; nothing that explains
itself or announces the obvious. The words are in src/shared/data/content.js and docs/v5/COPY.md: Xini,
Software Engineer · AI Integration, "Ambitious ideas, ambitious software." over Developer · Designer ·
Creator (no degrees anywhere); From design to deployment (AI Integration · Real-time 3D · Multiplayer);
Intelligence built in; Safe & secure; and Get in touch with Saltancy · GitHub · LinkedIn as icon buttons.

### Sound (off by default)

Every page load starts silent (browsers need a click). Sound is music-led (v5), all synthesised in WebAudio,
no files:
- **Music.** An adaptive track generated in code (src/shared/core/music.js): 90 BPM, swung sixteenths, F minor,
  electric piano, pad, bass, synthesised drums. Each stop adds or changes a layer, so moving through the site
  builds the track; the Enclave sits on a locked section that resolves on the beat after the cube solves; a
  long idle thins it to keys and pad. A fixed seed: every visit plays the same notes. It ducks 5 dB under
  flights and fades out with a hidden tab.
- **The sting** is the boot sound: the first switch-on in a page load plays the relays, the rising power whine
  and the slam, and the music's first chord lands on the slam (on the boot's own impact frame if sound comes
  on during the boot). Later switch-ons fade the music in.
- **No ambient bed.** The board hum and the fan noise are gone; every other cue stays: the flight whoosh, the
  arrival slam, the cube's dial clicks and unlock clunk, the module's seating clack, ticks and snaps.
- **Levels**, each measured alone through the master chain (a limiter, then a soft clipper): signature cues
  (sting slam, unlock) peak at −4…−2 dBFS, movement (whooshes, slams, seating, snaps in the scene) −10…−6,
  detail (relays, hover ticks, interface snaps, dial clicks) −18…−12; the music sits at about −20 LUFS per
  stop (−22.5…−18, spread at most 3 LU). Every cue sounds the same each time, so its level holds.

## The entrance: a boot sequence (2.75 s)

1. Black. One power LED lights at the connector and holds the screen for a beat while the relays pull in.
2. Power floods out along the mark-shaped power plane and the buses, over a board held at a third of
   its light until the hand-off; the districts wake in sequence, to standby: only the spire comes fully
   alive.
3. The ember lights at the socket, the fan spins up.
4. The camera climbs the cooler; floor lights come on floor by floor.
5. The mark on the crown flashes: the signature impact.
6. The hero card prints onto the scene (outline traces draw, then the panel fills, then the type),
   and the page chrome (bar, route) prints in with it on the frame after the impact; until then the
   boot owns the whole screen. The dive's view follows its curve exactly, so the crown is in frame
   when it flashes.

## Decisions

- **Enclave: the cipher cube.** It was chosen over a shield cage and a firewall, which were built
  and compared in the world; a cipher dial and a vault door were dropped earlier. The cube is a
  3 x 3 x 3 cube of glyph tiles, scrambled and turning slice by slice in red. On arrival it solves
  itself, click by click, and its front face assembles the mark.
- **Power on: close in, looking up.** The crown takes the upper right third, big enough to win over the
  headline; the cooler's foot, the gantry and the lattice are out of shot.
- **The core: a steel frame.** In brass the bridge outweighed the board it builds; brass stays on thin
  lit edges.
- **Enclave plinth: a block** (v5). Hard edges the ink catches, walls darker than the board, a top lighter
  than it, a stepped lip, brass only as a thin top keyline: flat, it read as 2D.
- **I/O: square on to the shield,** so the mark's verticals stand vertical; the vents are backed dark and
  the beam is out within the first quarter of its run, and thins the more directly you look into it.
- **The boot plays once per visit**, the name printing in its corner as the power floods the mark.
- **AI stop: the lattice alone.** The orbiting code rings were removed: over the lattice they
  matched its value and hue, over the sky they were dim strips of tiny type.
- **Cards: PCB** over datasheet.
- **Route: a numbered strip** over a map of the board: on the map the order of the stops did not
  read (01 sat in the middle, 06 on the pad that looked like the start).

## Methods and tools

| Need | Method |
|---|---|
| Hero modelling | Procedural three.js geometry: rounded boxes, bevelled extrusions, notched rings, instancing; merged per material at load |
| Rendering | three.js WebGL2, MRT colour + normal/id, one ink post pass (lines, halftone, grade, bloom, impact) |
| Colour | Generated 3D LUT, aerial and height fog reconstructed from depth, value-plan checks in greyscale |
| Camera | Spline routes per leg, arc-length timing, minimum-jerk easing, look-ahead, damped orientation, settle |
| Flight QA | tools/flightqa.mjs flies every leg with the real rig at 60 fps: clearance from part bounds, rotation speed and spikes, a top-down map |
| Performance | Instancing and merged geometry, shader precompile behind the cover, adaptive pixel ratio, budgets below |
| Accessibility | Reduced motion swaps flights for cuts and drops impact frames; keyboard and screen-reader order kept |

## Acceptance criteria

- Each stop's hero reads in a 240 px thumbnail, in colour and in greyscale, and is the brightest
  thing in its frame (blur test).
- No more than the palette's families in any frame; nothing whiter than cream.
- No flight passes through geometry; no frame-to-frame camera rotation spike.
- First card on screen by 2.4 s; signature impact at about 2.2 s.
- Card text contrast 4.5:1 or better.
- Under 300 draw calls at any stop; phones get the same journey at lower resolution.
- The journey ends on the mark and loops back to the start.
