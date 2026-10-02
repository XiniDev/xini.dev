import type { Page } from '@playwright/test';

const SOFTWARE_GL_READBACK = /^\[\.WebGL-[0-9a-fx]+\]GL Driver Message \(OpenGL, Performance, GL_CLOSE_PATH_NV, High\): GPU stall due to ReadPixels/;
const BROWSER_WEBGL_UNAVAILABLE = /^\[JavaScript Warning: "Failed to create WebGL context: WebGL creation failed/;

const message = (p: string) => p.replace(/^(warning|error): /, '');

export function consoleProblems(page: Page) {
  const problems: string[] = [];
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning') problems.push(`${m.type()}: ${m.text()}`);
  });
  page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`));
  return async () => {
    const readback = problems.some((p) => SOFTWARE_GL_READBACK.test(message(p)));
    const unavailable = problems.some((p) => BROWSER_WEBGL_UNAVAILABLE.test(message(p)));
    if (!readback && !unavailable) return [...problems];
    const environment = await page.evaluate((checkRenderer) => {
      const gl = document.createElement('canvas').getContext('webgl2');
      const info = checkRenderer ? gl?.getExtension('WEBGL_debug_renderer_info') : null;
      return {
        webgl2: !!gl,
        renderer: info && gl ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : '',
        fellBack: document.documentElement.classList.contains('no-gl'),
      };
    }, readback);
    const software = /SwiftShader/i.test(environment.renderer);
    const noWebgl = !environment.webgl2 && environment.fellBack;
    return problems.filter((p) => {
      const m = message(p);
      if (software && SOFTWARE_GL_READBACK.test(m)) return false;
      if (noWebgl && BROWSER_WEBGL_UNAVAILABLE.test(m)) return false;
      return true;
    });
  };
}
