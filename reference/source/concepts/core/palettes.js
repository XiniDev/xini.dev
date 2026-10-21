// CORE palettes. Brass is structure, the energy colour only where power flows.
const css = (bg, text, energy, brass, muted, line) => ({ bg, text, energy, brass, muted, line });

export const PALETTES = {
  verdigris: {
    label: 'Verdigris and brass',
    css: css('#05100d', '#e8e3d3', '#4cd6a6', '#c9a25a', 'rgba(232,227,211,.68)', 'rgba(201,162,90,.32)'),
    gl: {
      skyTop: '#04100c', skyBottom: '#0e2a22', ink: '#030a08', brass: '#c9a25a', brassDark: '#7a5a2a', patina: '#1a4a3d',
      key: '#ffe2b0', cool: '#123a35', rim: '#4cd6a6', energy: '#4cd6a6', hot: '#dcfff2',
      crystalDeep: '#0b3a30', crystalMid: '#1f8f6c', crystalBright: '#4cd6a6',
      glow: '#2fbf8d', shaft: '#d9b874', gradeShadow: '#03100c', gradeHigh: '#fff3dc', dust: '#e8cf96', glowWarm: '#6a4a1c',
    },
  },
  lattice: {
    label: 'Lattice (current)',
    css: css('#020806', '#e0ffed', '#3dff8f', '#7fa892', 'rgba(183,214,196,.8)', 'rgba(61,255,143,.24)'),
    gl: {
      skyTop: '#020806', skyBottom: '#06140e', ink: '#010403', brass: '#7fa892', brassDark: '#2f4a3a', patina: '#0b3a22',
      key: '#e0ffed', cool: '#06281a', rim: '#3dff8f', energy: '#3dff8f', hot: '#e0ffed',
      crystalDeep: '#06281a', crystalMid: '#139a52', crystalBright: '#3dff8f',
      glow: '#1fbf6a', shaft: '#3dff8f', gradeShadow: '#020806', gradeHigh: '#ffffff', dust: '#b7d6c4', glowWarm: '#0f3b26',
    },
  },
  hextech: {
    label: 'Gilt and hextech blue',
    css: css('#0a1220', '#f2e9d8', '#5ac8e6', '#c9a45c', 'rgba(242,233,216,.68)', 'rgba(201,164,92,.32)'),
    gl: {
      skyTop: '#09111f', skyBottom: '#16243a', ink: '#05080f', brass: '#c9a45c', brassDark: '#6e5428', patina: '#0f5160',
      key: '#fff0cc', cool: '#16304a', rim: '#5ac8e6', energy: '#5ac8e6', hot: '#e6faff',
      crystalDeep: '#0b2e48', crystalMid: '#1c7aa0', crystalBright: '#5ac8e6',
      glow: '#2d9fd0', shaft: '#e3c27a', gradeShadow: '#070d1a', gradeHigh: '#fff3dc', dust: '#f2dca8', glowWarm: '#5a4320',
    },
  },
  vermilion: {
    label: 'Blueprint and vermilion',
    css: css('#0b0f1e', '#eee7d7', '#f0502a', '#9cc9ee', 'rgba(238,231,215,.68)', 'rgba(156,201,238,.3)'),
    gl: {
      skyTop: '#0a0e1c', skyBottom: '#151e45', ink: '#05070f', brass: '#b9c4d6', brassDark: '#4d5a74', patina: '#2a43a0',
      key: '#fff1e2', cool: '#1a2552', rim: '#f0502a', energy: '#f0502a', hot: '#ffe0d2',
      crystalDeep: '#5a1408', crystalMid: '#c23a1c', crystalBright: '#f0502a',
      glow: '#d8401f', shaft: '#9cc9ee', gradeShadow: '#080b18', gradeHigh: '#fff3ea', dust: '#cfe2f5', glowWarm: '#2a3a70',
    },
  },
};
