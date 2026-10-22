// Hextech realm: dusk over a brass city. Gold is structure, the energy colour only where power runs.
const css = (bg, text, neon, muted, line, panel) => ({ bg, text, neon, muted, line, panel });
export const PALETTES = {
  hextech: {
    label: 'Gilt and hextech blue', css: css('#0e1426', '#f2e9d8', '#5ac8e6', 'rgba(242,233,216,.74)', 'rgba(201,164,92,.6)', 'rgba(12,16,32,.82)'),
    gl: {
      brass: '#c9a45c', brassDark: '#6e5428', patina: '#0f5160', stone: '#b9a68a', energy: '#5ac8e6', hot: '#e6faff',
      crystalDeep: '#08203a', crystalMid: '#124e7a', crystalMid2: '#2a8fc4', crystalBright: '#7fe0ff',
      key: '#ffd9a0', cool: '#24345e', rim: '#5ac8e6', ink: '#0a0d18', gradeShadow: '#101830', gradeHigh: '#fff3dc', paper: '#f2e9d8',
      fog: '#b88a76', zenith: '#18224a', skyHorizon: '#e89a5c', skyGlow: '#ffd08a', skyStreak: '#d07a72', sun: '#fff1c8',
      wallA: '#3c3448', wallB: '#4a4058', wallC: '#302a3c', roof: '#2a2434', wallLit: '#9a7462', winA: '#ffd08a', winB: '#fff1c8',
      waterDeep: '#1c2a4c', waterShallow: '#3a4668',
    },
  },
  verdigris: {
    label: 'Verdigris and brass', css: css('#05100d', '#e8e3d3', '#4cd6a6', 'rgba(232,227,211,.72)', 'rgba(201,162,90,.55)', 'rgba(5,16,13,.82)'),
    gl: {
      brass: '#c9a25a', brassDark: '#7a5a2a', patina: '#1a4a3d', stone: '#a8a48a', energy: '#4cd6a6', hot: '#dcfff2',
      crystalDeep: '#0b3a30', crystalMid: '#1f8f6c', crystalBright: '#4cd6a6',
      key: '#ffe2b0', cool: '#123a35', rim: '#4cd6a6', ink: '#030a08', gradeShadow: '#03100c', gradeHigh: '#fff3dc', paper: '#e8e3d3',
      fog: '#7e8a6e', zenith: '#0e2a26', skyHorizon: '#d9a86a', skyGlow: '#f2d08a', skyStreak: '#9a8a6a', sun: '#fff1c8',
      wallA: '#2a3a34', wallB: '#34463e', wallC: '#22302a', roof: '#1e2a24', wallLit: '#8a7a5a', winA: '#ffd08a', winB: '#e8e3d3',
      waterDeep: '#0e2a26', waterShallow: '#2a4a40',
    },
  },
  vermilion: {
    label: 'Blueprint and vermilion', css: css('#0b0f1e', '#eee7d7', '#f0502a', 'rgba(238,231,215,.72)', 'rgba(156,201,238,.55)', 'rgba(11,15,30,.82)'),
    gl: {
      brass: '#b9c4d6', brassDark: '#4d5a74', patina: '#2a43a0', stone: '#9aa4ba', energy: '#f0502a', hot: '#ffe0d2',
      crystalDeep: '#5a1408', crystalMid: '#c23a1c', crystalBright: '#f0502a',
      key: '#fff1e2', cool: '#1a2552', rim: '#f0502a', ink: '#05070f', gradeShadow: '#080b18', gradeHigh: '#fff3ea', paper: '#eee7d7',
      fog: '#6a74a0', zenith: '#0b1030', skyHorizon: '#9cb4e0', skyGlow: '#e6ecf8', skyStreak: '#7a8ac0', sun: '#ffffff',
      wallA: '#222a4a', wallB: '#2a3458', wallC: '#1c2240', roof: '#161c34', wallLit: '#5a6a9a', winA: '#ffe0b0', winB: '#eee7d7',
      waterDeep: '#0e1636', waterShallow: '#24305a',
    },
  },
};
