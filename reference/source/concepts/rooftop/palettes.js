// ROOFTOP palettes. The page is paper; the night lives inside the panels.
const css = (paper, ink, red, neon, muted, line) => ({ paper, ink, red, neon, muted, line });

export const PALETTES = {
  persona: {
    label: 'Red, black, paper',
    css: css('#f2ede3', '#0b0a0d', '#e8322b', '#4fe3ff', 'rgba(11,10,13,.72)', 'rgba(11,10,13,.22)'),
    gl: {
      paper: '#f2ede3', paper2: '#e6dfd0', ink: '#0b0a0d', red: '#e8322b',
      skyTop: '#090a1f', skyBottom: '#3a1a46', shade: '#241b4f', rim: '#ff4f63', glint: '#fff4e0', gradeShadow: '#120d2a', gradeHigh: '#fff1e8',
      neon: '#ff3550', neon2: '#4fe3ff', bulb: '#ffcf86', led: '#58ffa0', ledR: '#ff3040', screen: '#7fe8ff',
      cityA: '#1a1530', cityB: '#2a2148', cityHaze: '#5a2a5c', win: '#ffcf7a',
      concrete: '#b5afba', concreteDark: '#77717f', building: '#2a2438', metal: '#9aa4b8', metalDark: '#454a58', rust: '#c0603e',
      wood: '#8d603f', rubber: '#141317', plate: '#141218', hazard: '#f2b31d', puddle: '#1c1f2e',
    },
  },
  'night-paper': {
    label: 'Night paper',
    css: css('#eee6d3', '#07060d', '#35b874', '#7cf2c2', 'rgba(7,6,13,.72)', 'rgba(7,6,13,.22)'),
    gl: {
      paper: '#eee6d3', paper2: '#e2d9c3', ink: '#07060d', red: '#2fbf76',
      skyTop: '#070a1a', skyBottom: '#1c2a4c', shade: '#1d2652', rim: '#7cf2c2', glint: '#ffffff', gradeShadow: '#0b0f24', gradeHigh: '#f1fff6',
      neon: '#35e08a', neon2: '#7fd8ff', bulb: '#ffd9a0', led: '#58ffa0', ledR: '#ff5a4a', screen: '#8ff0d0',
      cityA: '#141a30', cityB: '#1e2a46', cityHaze: '#244a52', win: '#ffe1a0',
      concrete: '#8f949c', concreteDark: '#5b606c', building: '#1c2030', metal: '#7d8a98', metalDark: '#30363f', rust: '#9b6040',
      wood: '#87603f', rubber: '#121315', plate: '#121418', hazard: '#e9c43a', puddle: '#1a2030',
    },
  },
  lattice: {
    label: 'Lattice (current)',
    css: css('#e0ffed', '#020806', '#1fbf6a', '#3dff8f', 'rgba(2,8,6,.72)', 'rgba(2,8,6,.22)'),
    gl: {
      paper: '#e0ffed', paper2: '#cdeedc', ink: '#020806', red: '#1fbf6a',
      skyTop: '#020806', skyBottom: '#0a2418', shade: '#062016', rim: '#3dff8f', glint: '#e0ffed', gradeShadow: '#020806', gradeHigh: '#ffffff',
      neon: '#3dff8f', neon2: '#b7ffd9', bulb: '#d6ffe8', led: '#3dff8f', ledR: '#3dff8f', screen: '#3dff8f',
      cityA: '#04120b', cityB: '#082016', cityHaze: '#0c3a24', win: '#3dff8f',
      concrete: '#6f8a7c', concreteDark: '#45574d', building: '#0b1a12', metal: '#6f8a7c', metalDark: '#22302a', rust: '#4c7a5f',
      wood: '#557a63', rubber: '#06100b', plate: '#06100b', hazard: '#3dff8f', puddle: '#0b1a12',
    },
  },
  piltover: {
    label: 'Brass and blue',
    css: css('#f2e6c8', '#0a0d1a', '#c9902f', '#8fe9ff', 'rgba(10,13,26,.72)', 'rgba(10,13,26,.22)'),
    gl: {
      paper: '#f2e6c8', paper2: '#e6d6b0', ink: '#0a0d1a', red: '#c9902f',
      skyTop: '#081430', skyBottom: '#2a4a7a', shade: '#22356e', rim: '#8fe9ff', glint: '#fff7dd', gradeShadow: '#0b1530', gradeHigh: '#fff3dc',
      neon: '#ffc65a', neon2: '#8fe9ff', bulb: '#ffd78f', led: '#8fe9ff', ledR: '#ffb04a', screen: '#8fe9ff',
      cityA: '#12203f', cityB: '#1d3360', cityHaze: '#3a5a8a', win: '#ffd78f',
      concrete: '#a39b8e', concreteDark: '#6b6658', building: '#1b2440', metal: '#9aa6b8', metalDark: '#39404f', rust: '#b8803e',
      wood: '#946a3f', rubber: '#121316', plate: '#121520', hazard: '#e0b24a', puddle: '#1b2438',
    },
  },
};
