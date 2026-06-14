import { Mesh, Program, RenderTarget, Triangle, Vec2 } from "ogl";

import {
  NCLICK,
  simVertex,
  clearFragment,
  advectFragment,
  splatFragment,
} from "../shaders/sim";

export interface FluidCaps {
  isGL2: boolean;
  type: number;
  internalFormat: number;
  format: number;
  minMag: number;
}

export function detectFluidCaps(renderer: any): FluidCaps | null {
  const gl = renderer.gl;
  const isGL2: boolean = renderer.isWebgl2;
  let type: number;
  let internalFormat: number;
  const format: number = gl.RGBA;

  if (isGL2) {
    if (!renderer.extensions["EXT_color_buffer_float"]) return null;
    type = gl.HALF_FLOAT;
    internalFormat = gl.RGBA16F;
  } else {
    const hf = renderer.extensions["OES_texture_half_float"];
    if (!hf) return null;
    type = hf.HALF_FLOAT_OES;
    internalFormat = gl.RGBA;
  }

  const linear = isGL2
    ? true
    : !!renderer.extensions["OES_texture_half_float_linear"];

  const fb = gl.createFramebuffer();
  const tex = gl.createTexture();
  const prevFb = gl.getParameter(gl.FRAMEBUFFER_BINDING);
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,
    gl.COLOR_ATTACHMENT0,
    gl.TEXTURE_2D,
    tex,
    0
  );
  let ok =
    gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
  if (ok) {
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    ok = gl.getError() === gl.NO_ERROR;
  }
  gl.bindFramebuffer(gl.FRAMEBUFFER, prevFb);
  renderer.state.framebuffer = prevFb;
  gl.deleteTexture(tex);
  gl.deleteFramebuffer(fb);
  if (!ok) return null;

  return {
    isGL2,
    type,
    internalFormat,
    format,
    minMag: linear ? gl.LINEAR : gl.NEAREST,
  };
}

export function pickSimRes(isGL2: boolean, fine: boolean, dpr: number): number {
  if (!fine) return 192;
  if (isGL2 && dpr <= 1.5) return 384;
  return 256;
}

interface Click {
  x: number;
  y: number;
  ix: number;
  iy: number;
  gain: number;
}

export class FluidSim {
  private gl: any;
  private read: RenderTarget;
  private write: RenderTarget;
  private advect: Mesh;
  private splat: Mesh;
  private clicks: (Click | null)[] = new Array(NCLICK).fill(null);
  private cursor = 0;

  constructor(gl: any, renderer: any, caps: FluidCaps, size: number) {
    this.gl = gl;
    const opts = {
      width: size,
      height: size,
      type: caps.type,
      format: caps.format,
      internalFormat: caps.internalFormat,
      minFilter: caps.minMag,
      magFilter: caps.minMag,
      wrapS: gl.CLAMP_TO_EDGE,
      wrapT: gl.CLAMP_TO_EDGE,
      depth: false,
      stencil: false,
    };
    this.read = new RenderTarget(gl, opts);
    this.write = new RenderTarget(gl, opts);

    const geometry = new Triangle(gl);
    this.advect = new Mesh(gl, {
      geometry,
      program: new Program(gl, {
        vertex: simVertex,
        fragment: advectFragment,
        depthTest: false,
        uniforms: {
          tFluid: { value: null },
          uDt: { value: 0 },
          uDissipation: { value: 1 },
          uTime: { value: 0 },
          uCurl: { value: 0.05 },
          uReducedMotion: { value: 0 },
        },
      }),
    });
    this.splat = new Mesh(gl, {
      geometry,
      program: new Program(gl, {
        vertex: simVertex,
        fragment: splatFragment,
        depthTest: false,
        uniforms: {
          tFluid: { value: null },
          uDt: { value: 0 },
          uAspect: { value: 1 },
          uMouse: { value: new Vec2(0.5, 0.5) },
          uVelocity: { value: new Vec2(0, 0) },
          uRadius: { value: 0.12 },
          uStrength: { value: 1.0 },
          uClickPos: { value: Array.from({ length: NCLICK }, () => new Vec2()) },
          uClickImpulse: {
            value: Array.from({ length: NCLICK }, () => new Vec2()),
          },
          uClickGain: { value: new Array(NCLICK).fill(0) },
        },
      }),
    });

    const clearMesh = new Mesh(gl, {
      geometry,
      program: new Program(gl, {
        vertex: simVertex,
        fragment: clearFragment,
        depthTest: false,
        uniforms: {},
      }),
    });
    renderer.render({ scene: clearMesh, target: this.read, clear: true });
    renderer.render({ scene: clearMesh, target: this.write, clear: true });
    clearMesh.program.remove();
  }

  get texture() {
    return this.read.texture;
  }

  addClick(x: number, y: number, ix: number, iy: number, gain: number) {
    this.clicks[this.cursor] = { x, y, ix, iy, gain };
    this.cursor = (this.cursor + 1) % NCLICK;
  }

  private swap() {
    const t = this.read;
    this.read = this.write;
    this.write = t;
  }

  step(
    renderer: any,
    dt: number,
    time: number,
    mx: number,
    my: number,
    vx: number,
    vy: number,
    aspect: number
  ) {
    const a: any = this.advect.program.uniforms;
    a.tFluid.value = this.read.texture;
    a.uDt.value = dt;
    a.uDissipation.value = Math.pow(0.985, dt * 60);
    a.uTime.value = time;
    renderer.render({ scene: this.advect, target: this.write, clear: false });
    this.swap();

    const s: any = this.splat.program.uniforms;
    s.tFluid.value = this.read.texture;
    s.uDt.value = dt;
    s.uAspect.value = aspect;
    s.uMouse.value.set(mx, my);
    s.uVelocity.value.set(vx, vy);
    for (let i = 0; i < NCLICK; i++) {
      const c = this.clicks[i];
      if (c && c.gain > 0) {
        s.uClickPos.value[i].set(c.x, c.y);
        s.uClickImpulse.value[i].set(c.ix, c.iy);
        s.uClickGain.value[i] = c.gain;
        c.gain -= dt * 4;
        if (c.gain <= 0) this.clicks[i] = null;
      } else {
        s.uClickGain.value[i] = 0;
      }
    }
    renderer.render({ scene: this.splat, target: this.write, clear: false });
    this.swap();
  }

  dispose() {
    const gl = this.gl;
    for (const rt of [this.read, this.write]) {
      gl.deleteFramebuffer((rt as any).buffer);
      (rt as any).textures.forEach((t: any) => gl.deleteTexture(t.texture));
    }
    this.advect.program.remove();
    this.splat.program.remove();
  }
}
