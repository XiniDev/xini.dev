// Inside the machine: a dark board, gold pads, one signal colour for live data, warm heat at the core.
const css = (bg, text, neon, muted, line, panel) => ({ bg, text, neon, muted, line, panel });
const base = {
  ink: '#04070a', ink2: '#06080a', glint: '#ffffff', gradeHigh: '#f6fbff', paperFlash: '#e9f1ec',
  silk: '#e4e9e4', pad: '#d0a85c', trace: '#4a3a28',
  ic: '#3a424b', can: '#3a414b', can2: '#2f3a52', canTop: '#aab2bc', pin: '#c0c6ce', mlcc: '#9a7f56', res: '#1d2024', choke: '#4c535c',
  steel: '#8a93a0', nickel: '#c0c7cf', copperPipe: '#c8794a', heat: '#ff7a1f', heatHot: '#ffd59a', anod: '#1d2228', anod2: '#2c323a', substrate: '#183026', fin: '#c4cbd3',
  fanFrame: '#20262c', blade: '#2b333b', sink: '#6b7581', sinkDark: '#3a414a', connector: '#23282e',
  slot: '#262c33', latch: '#98a0ab', dimm: '#3b414a', dimmPcb: '#1b3a2c', dimmTop: '#4e5660', bezel: '#0d1013', hbm: '#38404a',
  shield: '#98a1ad', shieldDark: '#525a65', ioSteel: '#a4acb8', ioShield: '#c8ced6', goldPart: '#d6ab58', audioCap: '#c9962f', audioCapTop: '#e8d29a',
  ledOff: '#1a2228', outside: '#f4fbf6', dust: '#e8f6ee', amber: '#ffb13d', blue: '#4aa8ff',
};
export const PALETTES = {
  signal: {
    label: 'Night shift', css: css('#070b18', '#eaf0f6', '#3dff8f', 'rgba(234,240,246,.72)', 'rgba(61,255,143,.38)', 'rgba(7,11,24,.8)'),
    gl: { ...base, mask: '#15223b', mask2: '#1b2b49', sheen: '#40608f', silk: '#e8ecf0', trace: '#4a4038', signal: '#3dff8f', hot: '#eafff4', markBack: '#167a48', laser: '#ff3d4f',
      ic: '#4a5466', can: '#46505f', can2: '#3a4a6e', choke: '#586273', slot: '#2c3446', dimm: '#4a5568', dimmTop: '#5c6880', fanFrame: '#283044', blade: '#364055',
      anod: '#222a3a', anod2: '#333d52', sink: '#75829a', sinkDark: '#3f4a60', fin: '#c9d2de', steel: '#96a2b8', nickel: '#c6cfdc', connector: '#283040', hbm: '#4a5568',
      shade: '#141a3c', rim: '#9fffd2', uplight: '#2a3f7a', gradeShadow: '#0a0f22', fog: '#1f3355', zenith: '#070b18', skyHorizon: '#22385c', skyGlow: '#34507e', skyStreak: '#1a2a4a', streak: '#d9fff0', ledOff: '#1c2436' },
  },
  lattice: {
    label: 'Lattice (current)', css: css('#020806', '#e0ffed', '#3dff8f', 'rgba(183,214,196,.8)', 'rgba(61,255,143,.4)', 'rgba(2,8,6,.8)'),
    gl: { ...base, mask: '#0b1210', mask2: '#101a16', sheen: '#2c4a3c', signal: '#3dff8f', hot: '#e0ffed', markBack: '#167a48', laser: '#ff3d4f',
      shade: '#0a2018', rim: '#3dff8f', uplight: '#17624c', gradeShadow: '#03100c', fog: '#0f2a20', zenith: '#020806', skyHorizon: '#0f2a20', skyGlow: '#1a4a36', skyStreak: '#0f3b26', streak: '#e0ffed' },
  },
  arasaka: {
    label: 'Corporate red', css: css('#090505', '#f3ece6', '#ff3b30', 'rgba(243,236,230,.7)', 'rgba(255,59,48,.4)', 'rgba(9,5,5,.8)'),
    gl: { ...base, mask: '#1a1212', mask2: '#221616', sheen: '#5a3434', signal: '#ff3b30', hot: '#ffe8e2', markBack: '#7a1610', laser: '#ffcf3b', silk: '#efe6dc', heat: '#ffb13d',
      ic: '#4a4446', can: '#4a4244', choke: '#5a5254', dimm: '#4a4446', fanFrame: '#2c2426', blade: '#3a3032', sink: '#7a7070', sinkDark: '#463c3e',
      shade: '#2a0f12', rim: '#ff9c8c', uplight: '#6a1a1a', gradeShadow: '#120606', fog: '#2e1416', zenith: '#070303', skyHorizon: '#2e1416', skyGlow: '#5a1c16', skyStreak: '#2a0c0a', streak: '#ffe6e0', dust: '#ffe9e2', blue: '#f3ece6' },
  },
  verdigris: {
    label: 'Verdigris and brass', css: css('#05100d', '#e8e3d3', '#4cd6a6', 'rgba(232,227,211,.7)', 'rgba(201,162,90,.42)', 'rgba(5,16,13,.8)'),
    gl: { ...base, mask: '#123228', mask2: '#173c30', sheen: '#346656', signal: '#4cd6a6', hot: '#f2fff8', markBack: '#c9a25a', laser: '#e8743a', silk: '#e8e3d3', trace: '#6a4f2a',
      ic: '#4a5450', can: '#46504c', choke: '#5a6460', dimm: '#4a5450', fanFrame: '#24302c', blade: '#34403c',
      shade: '#0b2a24', rim: '#e0c07a', uplight: '#1a5a48', gradeShadow: '#04100c', fog: '#173a30', zenith: '#03100c', skyHorizon: '#173a30', skyGlow: '#24584a', skyStreak: '#123a2e', streak: '#f2ead6', dust: '#f2ead6' },
  },
  blueprint: {
    label: 'Blueprint and vermilion', css: css('#0b0f1e', '#eee7d7', '#f0502a', 'rgba(238,231,215,.72)', 'rgba(156,201,238,.42)', 'rgba(11,15,30,.8)'),
    gl: { ...base, mask: '#14205a', mask2: '#1a2a70', sheen: '#3a56a8', signal: '#f0502a', hot: '#fff0e6', markBack: '#9cc9ee', laser: '#f0502a', silk: '#eee7d7', trace: '#2e3f80', pad: '#d5a868', heat: '#ffb13d',
      ic: '#46507a', can: '#424c74', choke: '#56608a', dimm: '#46507a', fanFrame: '#222a52', blade: '#323c68', steel: '#9cc9ee',
      shade: '#151e45', rim: '#9cc9ee', uplight: '#2a43a0', gradeShadow: '#070a18', fog: '#18235a', zenith: '#05081a', skyHorizon: '#18235a', skyGlow: '#2a3d8a', skyStreak: '#18265a', streak: '#fff0e6', dust: '#e6eefc' },
  },
};
