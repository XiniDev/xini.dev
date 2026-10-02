export const SPEC_SIZES = [
  [320, 568],
  [360, 740],
  [390, 844],
  [430, 932],
  [768, 1024],
  [1024, 768],
  [1280, 720],
  [1440, 900],
  [1920, 1080],
  [2560, 1440],
  [844, 390],
] as const;

export const LANDSCAPE_PHONES = [
  [740, 360],
  [667, 375],
  [568, 320],
] as const;

export const LAYOUT_SIZES = [...SPEC_SIZES, ...LANDSCAPE_PHONES] as const;
