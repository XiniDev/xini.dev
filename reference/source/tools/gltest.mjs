import { launch } from './browser.mjs';
const b = await launch();
const p = await b.newPage({ viewport: { width: 800, height: 500 } });
const info = await p.evaluate(() => {
  const c = document.createElement('canvas'); const gl = c.getContext('webgl2');
  if (!gl) return 'no webgl2';
  const d = gl.getExtension('WEBGL_debug_renderer_info');
  return [gl.getParameter(gl.VERSION), d ? gl.getParameter(d.UNMASKED_RENDERER_WEBGL) : '?', gl.getParameter(gl.MAX_TEXTURE_SIZE), !!gl.getExtension('EXT_color_buffer_float')].join(' | ');
});
console.log(info);
await b.close();
