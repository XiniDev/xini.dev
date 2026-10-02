export const colour = {
  void: '#020806',
  signal: '#3DFF8F',
  ink: '#EAFFF2',
  body: '#B7D6C4',
  mute: '#7FA892',
  hair: 'rgba(61,255,143,.24)',
  card: 'rgba(2,8,6,.6)',
  thumb: '#03100A',
  thumbDot: 'rgba(61,255,143,.16)',
  scrim: 'rgba(2,8,6,.85)',
  vignetteEdge: 'rgba(2,8,6,.82)',
  vignetteLow: 'rgba(2,8,6,.9)',
  chip: 'rgba(2,8,6,.72)',
} as const;

export type Token = keyof typeof colour;

export const cssVar = (token: Token) => `--${token.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`;

export const tokensCss = `:root{${(Object.keys(colour) as Token[])
  .map((t) => `${cssVar(t)}:${colour[t]}`)
  .join(';')};color-scheme:dark}`;
