// Palettes are tokens: the same frame can be judged in each. 'lattice' is today's green-on-black, the bar to beat.
const css = (bg, paper, ink, signal, seal, muted, line) => ({ bg, paper, ink, signal, seal, muted, line });

export const PALETTES = {
  'night-paper': {
    label: 'Night paper',
    css: css('#0c0e1d', '#eee6d3', '#07060d', '#35e08a', '#e2412f', 'rgba(238,230,211,.68)', 'rgba(238,230,211,.2)'),
    gl: {
      skyTop: '#0d1022', skyBottom: '#2a3266', ink: '#07060d', paper: '#eee6d3', back: '#35e08a', edge: '#19163a',
      shade: '#2c2a62', rim: '#a8ffd8', glint: '#ffffff', gradeShadow: '#110f2a', gradeHigh: '#fff6e8', signal: '#35e08a', pulse: '#35e08a',
      glowA: '#1d5b55', glowWarm: '#6a3f22', glowCool: '#1b4f78', glowSeal: '#5b1a2c', shadow: '#3a4290',
    },
  },
  lattice: {
    label: 'Lattice (current)',
    css: css('#020806', '#e0ffed', '#020806', '#3dff8f', '#3dff8f', 'rgba(183,214,196,.8)', 'rgba(61,255,143,.22)'),
    gl: {
      skyTop: '#020806', skyBottom: '#06140e', ink: '#010403', paper: '#3dff8f', back: '#0b3a22', edge: '#06180f',
      shade: '#06281a', rim: '#e0ffed', glint: '#e0ffed', gradeShadow: '#020806', gradeHigh: '#ffffff', signal: '#3dff8f', pulse: '#e0ffed',
      glowA: '#0f3b26', glowWarm: '#13452c', glowCool: '#0d3b2b', glowSeal: '#15402a', shadow: '#0f4a2c',
    },
  },
  piltover: {
    label: 'Brass and blue',
    css: css('#0d1630', '#f2e6c8', '#0a0d1a', '#e3b04b', '#3fb8c9', 'rgba(242,230,200,.7)', 'rgba(242,230,200,.22)'),
    gl: {
      skyTop: '#0b1430', skyBottom: '#213a6b', ink: '#090b17', paper: '#f2e6c8', back: '#d9a441', edge: '#2a2440',
      shade: '#2a3a78', rim: '#8fe9ff', glint: '#fff7dd', gradeShadow: '#0d1636', gradeHigh: '#fff1d6', signal: '#e3b04b', pulse: '#ffd27a',
      glowA: '#1e4f86', glowWarm: '#7a4f1d', glowCool: '#1c5f8a', glowSeal: '#4a2e5e', shadow: '#3c5aa8',
    },
  },
  persona: {
    label: 'Red, black, paper',
    css: css('#0b0b0e', '#f3efe6', '#0b0b0e', '#e8322b', '#e8322b', 'rgba(243,239,230,.7)', 'rgba(243,239,230,.24)'),
    gl: {
      skyTop: '#0a0a0d', skyBottom: '#2a0d12', ink: '#060608', paper: '#f3efe6', back: '#e8322b', edge: '#1b0b10',
      shade: '#3a1220', rim: '#ff8a7d', glint: '#ffffff', gradeShadow: '#14070b', gradeHigh: '#fff2ec', signal: '#e8322b', pulse: '#ff5a4d',
      glowA: '#5a121c', glowWarm: '#6b1d17', glowCool: '#3a1430', glowSeal: '#7a1418', shadow: '#7a1820',
    },
  },
  sumi: {
    label: 'Sumi and seal',
    css: css('#151413', '#ece6da', '#0c0b0a', '#e2412f', '#e2412f', 'rgba(236,230,218,.66)', 'rgba(236,230,218,.2)'),
    gl: {
      skyTop: '#121110', skyBottom: '#2b2926', ink: '#0a0908', paper: '#ece6da', back: '#2a2826', edge: '#1a1917',
      shade: '#3d3a36', rim: '#fff4e2', glint: '#ffffff', gradeShadow: '#100f0e', gradeHigh: '#fff6ea', signal: '#e2412f', pulse: '#e2412f',
      glowA: '#3a3632', glowWarm: '#4a3a2a', glowCool: '#33363a', glowSeal: '#5a1f18', shadow: '#4a4642',
    },
  },
};
