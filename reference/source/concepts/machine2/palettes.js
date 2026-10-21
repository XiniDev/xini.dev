// Inside the machine: Verdigris, tightened. Every value is a display colour (see colour.js) and the scene keeps to
// the same families as the cards:
//   ink and petrol neutrals the ground, the air, the board (a cooler, bluer teal than the live green, so the
//                           accent separates from the ground by hue as well as by light)
//   steel                   anything structural that is not brass; never brighter than mid grey
//   brass                   structure and warm light (#6a502e shade, #a37b3e lit, #d7ae60 only in thin rims)
//   sea-green               only where data is live (#1e8f6c deep, #52e3b2 the brand, #d6fff0 the one core)
//   vermilion               the CPU's ember and the locked cipher, at full strength in tiny areas
//   cream                   type, the mark's front fold and the brightest light; nothing renders whiter
// Value plan: flat near-black shadows, the far haze mid-dark, and only the current stop's hero lit.
const css = (o) => o;
const verdigris = {
  label: 'Verdigris and brass',
  css: css({
    bg: '#061212', text: '#ece6d4', neon: '#52e3b2', neonRest: '#3fa585', muted: 'rgba(236,230,212,.74)', line: '#6e5a33', panel: 'rgba(8,29,29,.9)',
    gold: '#d7ae60', mask: '#0d2a28', mask2: '#113432', silk: '#ece6d4', signal: '#52e3b2', heat: '#ff5a36', alarm: '#f04a24', ink: '#020807', paper: '#efe9d9',
    // the chrome's own inks, all opaque (brass laid thin over teal turned olive): steel for labels and counts, a dim brass
    // for keylines (line), a dark steel for rules, a headline cream a step under the hero's light; green is for the live thing
    steel: '#8fa19b', brass: '#c29e58', rule: '#3a4644', head: '#d9d3c2',
  }),
  gl: {
    // ink and light
    ink: '#040b0b', ink2: '#060f0f', glint: '#e4dcc4', gradeHigh: '#fff6e6', gradeShadow: '#030e0e', paperFlash: '#ece6d4', cream: '#ece6d4',
    shade: '#050d0d', rim: '#c39a55', uplight: '#164443',
    // board: traces sit under the mask a step lighter than it, the legend is printed in a mid tone
    mask: '#0c2220', mask2: '#0f2826', sheen: '#183b39', silk: '#4a4942', pad: '#8a6a3a', trace: '#143735',
    // live colours
    signal: '#52e3b2', signalDeep: '#1e8f6c', hot: '#d6fff0', markBack: '#ece6d4',
    laser: '#f0462a', heat: '#ff5a36', heatHot: '#ffb27a', heatDeep: '#a83a22', amber: '#a37b3e', blue: '#52e3b2', work: '#e0a650',
    // printed warm light (the pick head's lamp, daylight through the mark): opaque dots of one warm cream ink
    light: '#f1d9a6',
    // parts
    ic: '#222c2b', can: '#2b3736', can2: '#273332', canTop: '#404947', pin: '#727977', mlcc: '#5e4a2c', res: '#1b201f', choke: '#333f3d',
    steel: '#55625f', nickel: '#75807d', copperPipe: '#5e4827', finWarm: '#2a3836', anod: '#192322', anod2: '#242e2d', substrate: '#122826', fin: '#3b4a47',
    fanFrame: '#1a2524', blade: '#24302f', sink: '#45524f', sinkDark: '#232f2e', connector: '#1b2423',
    slot: '#202a29', latch: '#4d5856', dimm: '#2a3534', dimmPcb: '#153230', heroPcb: '#17544a', dimmTop: '#3d4846', bezel: '#0b100f', hbm: '#333f3d',
    shield: '#4d5856', shieldDark: '#303b3a', ioSteel: '#45524f', ioShield: '#2d4240', goldPart: '#9a7640', audioCap: '#6a502e', audioCapTop: '#9a7640',
    ledOff: '#14201f', outside: '#ffe0ad', dust: '#8a8579', sleeve: '#141c1b', brass: '#a37b3e', brassDark: '#6a502e', brassLight: '#d7ae60',
    // air: a petrol a step bluer than the board, so the live green parts from its backdrop by hue as well as light;
    // speed lines are steel, a mid value that never outshines the subject (in ink where they cross something lit)
    fog: '#1a3238', fogHorizon: '#24404a', zenith: '#040b0b', skyHorizon: '#16303a', skyGlow: '#24393f', skyStreak: '#0e201f', streak: '#7d8786', lamp: '#22464e',
    // the city beyond the board: dark walls, one dim warm window colour
    cityWall: '#0c1c1c', cityWallLit: '#142b2a', cityRoof: '#0c1b1a', winA: '#6a5030', winB: '#7e6038', winC: '#9a7442',
  },
};
export const PALETTES = { verdigris };
