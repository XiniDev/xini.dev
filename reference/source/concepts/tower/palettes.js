// Tower dive: concrete, rain and one red. The city keeps warm windows and a few white signs.
const css = (bg, text, neon, muted, line, panel) => ({ bg, text, neon, muted, line, panel });
const base = {
  ink: '#0a0607', glint: '#ffffff', gradeHigh: '#fff6ef', paperFlash: '#f3efe6',
  concrete: '#8a817c', concreteDark: '#4a4442', steel: '#9a9596', glass: '#2a2a33', lamp: '#f6efe4', cyan: '#5ae0ff', screen: '#5ae0ff',
  rack: '#262022', cable: '#c23a2e', vault: '#a9a6a6', vaultDark: '#55504f', hazard: '#f2b31d',
  asphalt: '#1a1718', roadLine: '#d8d0c6', stone: '#2c2728', rain: '#e8dcd8',
  winA: '#ffc98a', winB: '#f3efe6', winC: '#ff2a3a', wallA: '#2a2426', wallB: '#332c2e', wallC: '#221d1f', roof: '#1e1a1b', wallLit: '#4a4042',
};
export const PALETTES = {
  arasaka: {
    label: 'Corporate red', css: css('#0b0708', '#f3efe6', '#ff2a3a', 'rgba(243,239,230,.72)', 'rgba(255,42,58,.45)', '#f3efe6'),
    gl: { ...base, signal: '#ff2a3a', hot: '#ffe6e2', shade: '#2a1216', rim: '#ff8a8a', uplight: '#a3221c', gradeShadow: '#120607',
      fog: '#2e1a1c', zenith: '#070405', skyHorizon: '#3a1c1c', skyGlow: '#a3361f', skyStreak: '#4a2020', streak: '#ffe6e0' },
  },
  signal: {
    label: 'Night shift', css: css('#070b18', '#eaf0f6', '#3dff8f', 'rgba(234,240,246,.72)', 'rgba(61,255,143,.42)', '#eaf0f6'),
    gl: { ...base, signal: '#3dff8f', hot: '#eafff4', cable: '#2a8f5a', concrete: '#7c8494', concreteDark: '#3f4656', steel: '#9aa4b4', rack: '#1c2230', asphalt: '#141a26', stone: '#232a38',
      winA: '#ffc98a', winB: '#bfe3ff', winC: '#3dff8f', wallA: '#1f2636', wallB: '#262e40', wallC: '#1a2030', roof: '#161c28', wallLit: '#3a4660',
      shade: '#141a3c', rim: '#9fffd2', uplight: '#2a3f7a', gradeShadow: '#0a0f22', fog: '#1f2c48', zenith: '#05081a', skyHorizon: '#22345a', skyGlow: '#3a5a8a', skyStreak: '#1a2a4a', streak: '#d9fff0', rain: '#dbe8f6' },
  },
  verdigris: {
    label: 'Verdigris and brass', css: css('#05100d', '#e8e3d3', '#4cd6a6', 'rgba(232,227,211,.7)', 'rgba(201,162,90,.48)', '#e8e3d3'),
    gl: { ...base, signal: '#4cd6a6', hot: '#f2fff8', cable: '#c9a25a', concrete: '#7f8a82', concreteDark: '#3c4842', steel: '#c9a25a', rack: '#1a2420', asphalt: '#121a17', stone: '#1f2a25',
      winA: '#ffd28a', winB: '#e8e3d3', winC: '#4cd6a6', wallA: '#1c2622', wallB: '#24302b', wallC: '#18201d', roof: '#141c19', wallLit: '#34443d',
      shade: '#0b2a24', rim: '#e0c07a', uplight: '#1a5a48', gradeShadow: '#04100c', fog: '#17302a', zenith: '#030a08', skyHorizon: '#173a30', skyGlow: '#3a6a52', skyStreak: '#123a2e', streak: '#f2ead6', rain: '#e8e3d3' },
  },
};
