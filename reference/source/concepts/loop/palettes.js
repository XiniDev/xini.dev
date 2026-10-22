// The loop: one signal colour (the track neon); the city keeps its own warm and cool windows.
const css = (bg, text, neon, muted, line, panel) => ({ bg, text, neon, muted, line, panel });
const base = {
  ink: '#07060d', shade: '#1d1a48', glint: '#ffffff', gradeShadow: '#0d0b22', gradeHigh: '#fff4ea', paperFlash: '#f1ece2',
  steel: '#8a93ad', steelDark: '#3a3f55', deck: '#3a3f56', pylon: '#1f2230', dish: '#9aa3b8', lamp: '#ffd9a0', hazard: '#f2b31d',
  board: '#0b0d16', boardInk: '#f1ece2', pod: '#e6e8ef', podWin: '#a8fff0', moon: '#f3ecd8', roof: '#1b1a2c', wallLit: '#3b3760',
  wallA: '#1b1a2e', wallB: '#24223a', wallC: '#15182a', winA: '#ffc46b', winB: '#6fe6ff', winC: '#ff4f86',
};
export const PALETTES = {
  signal: {
    label: 'Signal green', css: css('#08091a', '#eef0f6', '#3dff8f', 'rgba(238,240,246,.7)', 'rgba(61,255,143,.4)', 'rgba(7,9,22,.74)'),
    gl: { ...base, zenith: '#090a2a', skyHorizon: '#4b2a6c', skyGlow: '#d8607e', skyStreak: '#6c3c80', fog: '#43265f', rim: '#a8ffd8', uplight: '#d8507e', neon: '#3dff8f', hot: '#eafff4', rail: '#1f6b4a', streak: '#d9fff0', scan: '#ff3b4e', beacon: '#ff3b4e', markBack: '#dff7ea', cloudTop: '#7a74ae', cloudUnder: '#e0588a', cloudDeep: '#2c2858', carA: '#fff2d6', carB: '#ff3b55', ad: ['#ff4f86', '#6fe6ff', '#ffc46b'] },
  },
  arasaka: {
    label: 'Corporate red', css: css('#0b0909', '#f2ece6', '#ff3b30', 'rgba(242,236,230,.7)', 'rgba(255,59,48,.42)', 'rgba(12,8,8,.76)'),
    gl: { ...base, zenith: '#0a0708', skyHorizon: '#3a1a1c', skyGlow: '#c8502e', skyStreak: '#4a2224', fog: '#3a1c1c', rim: '#ff9a8a', uplight: '#ff8a3d', neon: '#ff3b30', hot: '#ffe6e0', rail: '#6a1810', streak: '#ffe6e0', scan: '#ffd23b', beacon: '#ffd23b', markBack: '#f2ece6', cloudTop: '#6a5458', cloudUnder: '#ff8a3d', cloudDeep: '#241416', winC: '#ff3b30', carA: '#fff2d6', carB: '#ff3b30', ad: ['#ff3b30', '#ffd23b', '#f2ece6'] },
  },
  lattice: {
    label: 'Lattice (current)', css: css('#020806', '#e0ffed', '#3dff8f', 'rgba(183,214,196,.8)', 'rgba(61,255,143,.4)', 'rgba(2,8,6,.78)'),
    gl: { ...base, zenith: '#020806', skyHorizon: '#0a2418', skyGlow: '#1f8a52', skyStreak: '#0f3b26', fog: '#0c2a1c', rim: '#3dff8f', uplight: '#1fbf6a', neon: '#3dff8f', hot: '#e0ffed', rail: '#0f3b26', streak: '#e0ffed', scan: '#3dff8f', beacon: '#3dff8f', markBack: '#b7d6c4', cloudTop: '#2a5a42', cloudUnder: '#1fbf6a', cloudDeep: '#06160e', winA: '#3dff8f', winB: '#b7d6c4', winC: '#7fa892', wallA: '#06120c', wallB: '#0a1a12', wallC: '#041009', roof: '#06100b', wallLit: '#123a26', carA: '#e0ffed', carB: '#3dff8f', ad: ['#3dff8f', '#b7d6c4', '#e0ffed'] },
  },
  hextech: {
    label: 'Gilt and blue', css: css('#081020', '#f2e9d8', '#5ac8e6', 'rgba(242,233,216,.7)', 'rgba(201,164,92,.5)', 'rgba(8,14,30,.76)'),
    gl: { ...base, zenith: '#070d1e', skyHorizon: '#2a3a62', skyGlow: '#e3b04b', skyStreak: '#3a4a72', fog: '#2a3658', rim: '#8fe9ff', uplight: '#e3b04b', neon: '#5ac8e6', hot: '#e6faff', rail: '#6e5428', streak: '#fff3dc', scan: '#e3b04b', beacon: '#e3b04b', markBack: '#f2e9d8', cloudTop: '#5a6a98', cloudUnder: '#e3b04b', cloudDeep: '#1a2442', carA: '#fff3dc', carB: '#e3b04b', ad: ['#5ac8e6', '#e3b04b', '#f2e9d8'] },
  },
};
