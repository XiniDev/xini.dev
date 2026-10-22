import * as THREE from 'three';
import { NOISE, COLOR } from './glsl.js';
import { makeLut } from './lut.js';

// The ink pipeline: scene -> (colour + normal/id + depth) -> one post pass that draws the ink lines,
// print texture, colour grade, glow and comic impact frames.

const POST_FRAG = /* glsl */ `
precision highp float;
precision highp sampler3D;
${NOISE}
${COLOR}
uniform sampler2D tColor, tNormal, tDepth, tGlow;
uniform vec2 uRes; uniform float uNear, uFar, uOrtho;
uniform float uLine, uBoil, uDepthK, uNormalK, uLineAlpha;
uniform vec3 uInk, uPaperCol;
uniform float uGrain, uFibre, uMisregPx; uniform vec2 uMisregDir;
uniform vec3 uGradeShadow, uGradeHigh; uniform float uGradeAmt, uVignette, uGlowAmt;
uniform float uTime, uStep;
uniform float uImpact, uImpactMode, uImpactSeed; uniform vec2 uImpactCenter;
uniform vec3 uImpInk, uImpPaper, uImpAccent;
uniform float uFade; uniform vec3 uFadeCol;
uniform sampler2D tBloom; uniform float uBloomAmt, uBloomDots;
uniform vec3 uFogCol; uniform float uFogNear, uFogFar, uFogAmt, uFogLine;
uniform float uSpeed; uniform vec2 uSpeedCenter; uniform vec3 uSpeedCol;
uniform sampler3D tLut; uniform float uLutAmt, uLutSize;
uniform mat4 uInvProj, uCamWorld;
uniform float uHFogAmt, uHFogY, uHFogK, uFogDirAmt, uFogGlow; uniform vec3 uFogHorizon;
uniform sampler2D tPlane; uniform float uPlaneAmt, uPlaneR, uPlaneLed; uniform vec2 uPlaneC; uniform vec4 uPlaneRect; uniform vec3 uPlaneCol, uPlaneHot;
uniform vec3 uFocusP; uniform float uFocusAmt, uFocusR0, uFocusR1, uFocusLine, uFocusInk, uFocusDesat, uFocusHaze, uFocusSoft, uFocusMisreg;
uniform vec2 uVigC;
uniform vec3 uCap; uniform float uCapAmt, uBloomHard;
uniform float uCapHue, uFocusNear, uFocusZ, uSpeedPrint, uBloomCell, uBloomCov, uPlanePrint, uImpAccentInk, uLineFarAmt; uniform vec2 uLineFar;
uniform vec2 uVigR; uniform float uBloomOver, uPlaneOct, uPlaneFoldAmt, uSpeedInk, uBloomFlat, uImpTri, uSpeedIn; uniform vec3 uPlaneFold; uniform vec3 uSpeedMask;
in vec2 vUv;
out highp vec4 fragColor;

float linDepth(vec2 uv){
  float d = texture(tDepth, uv).r;
  if (uOrtho > 0.5) return uNear + d * (uFar - uNear);
  float z = d * 2.0 - 1.0;
  return (2.0 * uNear * uFar) / (uFar + uNear - z * (uFar - uNear));
}
// highlights roll off into the paper colour instead of burning to white (per channel, a soft shoulder)
vec3 capTo(vec3 c, vec3 cap){
  vec3 k = cap * 0.8, r = max(cap - k, vec3(1e-3));
  return mix(c, k + r * (1.0 - exp(-(c - k) / r)), step(k, c));
}
// the same shoulder on the brightest channel only, the others scaled with it: a saturated light keeps its hue as it
// rolls off (channel by channel it would wash to milk, green to aqua, amber to lemon); near-neutral highlights
// still settle on the paper colour
vec3 capHue(vec3 c, vec3 cap){
  float m = max(c.r, max(c.g, c.b)), mc = max(cap.r, max(cap.g, cap.b));
  float k = mc * 0.8, r = max(mc - k, 1e-3);
  float mm = m > k ? k + r * (1.0 - exp(-(m - k) / r)) : m;
  float s = (m - min(c.r, min(c.g, c.b))) / max(m, 1e-4);
  return mix(capTo(c, cap), c * (mm / max(m, 1e-4)), smoothstep(0.18, 0.5, s));
}
vec3 viewAt(vec2 uv, float d){ vec4 v = uInvProj * vec4(uv * 2.0 - 1.0, d * 2.0 - 1.0, 1.0); return v.xyz / v.w; }
// stylised focus: 0 on the subject, 1 well away from it (in the world, not on the screen)
float focusAt(vec2 uv){
  float d = texture(tDepth, uv).r;
  if (d > 0.9999) return uFocusAmt;
  vec3 w = (uCamWorld * vec4(viewAt(uv, d), 1.0)).xyz;
  return smoothstep(uFocusR0, uFocusR1, length(w - uFocusP)) * uFocusAmt;
}

// nearUv: where the nearest surface around this pixel is, so a line takes the focus of what casts it
float edgeAt(vec2 uv, float r, out vec2 nearUv){
  vec4 nC = texture(tNormal, uv);
  float dC = linDepth(uv);
  nearUv = uv;
  vec3 nc = nC.rgb * 2.0 - 1.0;
  float idC = floor(nC.a * 255.0 + 0.5);
  if (idC > 254.5) return 0.0;                     // id 255: light printed on a surface, glows but is never inked
  if (abs(idC - 249.0) < 0.5) return 0.0;          // id 249: a hologram's own pixels sit over everything behind them
  float e = 0.0, dMin = dC;
  for (int i = 0; i < 8; i++){
    float a = float(i) * 0.7853982 + 0.39;
    vec2 o = vec2(cos(a), sin(a)) * r / uRes;
    vec4 n = texture(tNormal, uv + o);
    float id = floor(n.a * 255.0 + 0.5);
    if (id > 254.5 || abs(id - 249.0) < 0.5) continue;
    if (idC < 0.5 && id < 0.5) continue;           // background against background: no line
    float d = linDepth(uv + o);
    if (d < dMin) { dMin = d; nearUv = uv + o; }
    float de = abs(d - dC) / max(min(d, dC), 0.001);
    float ne = 1.0 - dot(nc, n.rgb * 2.0 - 1.0);
    float ie = (abs(id - idC) > 0.5) ? 1.0 : 0.0;
    float lineOk = (idC > 0.5 || id > 0.5) ? 1.0 : 0.0;
    e = max(e, max(ie, max(smoothstep(uDepthK, uDepthK * 2.0, de), smoothstep(uNormalK, uNormalK * 1.8, ne)) * lineOk));
  }
  return e;
}

void main(){
  vec2 uv = vUv;
  vec2 frag = uv * uRes;
  // hand-drawn wobble that re-draws on twos
  vec2 wob = (vec2(vnoise2(frag / 90.0 + uStep * 7.3), vnoise2(frag / 90.0 - uStep * 5.1)) - 0.5) * 2.0 * uBoil;
  vec2 luv = uv + wob / uRes;
  float d0 = texture(tDepth, uv).r;
  float lin = linDepth(uv);
  float fog = (d0 < 0.9999) ? smoothstep(uFogNear, uFogFar, lin) * uFogAmt : 0.0;
  float hid = floor(texture(tNormal, uv).a * 255.0 + 0.5);
  // aerial perspective: haze pools low over the ground and lightens toward the horizon
  vec3 fogC = uFogCol;
  if (d0 < 0.9999 && (uHFogAmt > 0.0 || uFogDirAmt > 0.0)) {
    vec3 vp = viewAt(uv, d0);
    vec3 wp = (uCamWorld * vec4(vp, 1.0)).xyz;
    vec3 vd = normalize(mat3(uCamWorld) * vp);
    float hf = uHFogAmt * exp(-max(wp.y - uHFogY, 0.0) * uHFogK) * smoothstep(uFogNear * 0.25, uFogFar * 0.8, lin);
    fog = clamp(fog + hf * (1.0 - fog), 0.0, 1.0);
    fogC = mix(uFogCol, uFogHorizon, uFogDirAmt * exp(-abs(vd.y) * 5.0));
  }
  // lights punch through the haze: emissive surfaces (ids 250-254) take less of it
  if (uFogGlow > 0.0) fog *= mix(1.0, 1.0 - uFogGlow, step(249.5, hid) * step(hid, 254.5));
  // a hologram floats in front: the depth under its pixels is whatever stands behind it, so most of that haze is not its own
  bool holo = abs(hid - 249.0) < 0.5;
  if (holo) fog *= 0.3;
  // focus: the subject keeps its full ink; away from it the world softens, greys and sinks into the haze
  // (deB includes the sky, for the plate; de is the surface's own, for its colour)
  float deB = (uFocusAmt > 0.0 && !holo) ? focusAt(uv) : 0.0;
  float de = d0 < 0.9999 ? deB : 0.0;
  // in front of the subject the world sinks into ink (a dark foreground frame); behind it, into the air
  float nearK = 0.0;
  if (uFocusNear > 0.0 && de > 0.0) nearK = smoothstep(-60.0, 60.0, uFocusZ + viewAt(uv, d0).z);
  float sc = max(1.0, uRes.y / 900.0);
  float r = uLine * (0.7 + 0.6 * vnoise2(frag / 140.0 + uStep * 3.7)) * mix(1.0, 0.5, smoothstep(uFogNear * 0.4, uFogFar, lin) * step(0.001, uFogAmt));
  vec2 nearUv;
  float line = edgeAt(luv, r, nearUv) * uLineAlpha * (1.0 - fog * uFogLine);
  // far away, the ink thins out: a board seen from high above would otherwise print every part's edge as ruled noise
  if (uLineFarAmt > 0.0) line *= 1.0 - smoothstep(uLineFar.x, uLineFar.y, lin) * uLineFarAmt;
  float deL = uFocusAmt > 0.0 ? focusAt(nearUv) : 0.0;
  line *= 1.0 - deL * uFocusLine;

  // colour plate sits slightly off the key line; it slips further when the camera moves fast, and away from the subject
  vec2 mo = uMisregDir * (uMisregPx * (1.0 + uSpeed * 5.0) + deB * uFocusMisreg * sc) / uRes;
  vec3 col;
  if (deB * uFocusSoft > 0.05) {
    vec2 s = vec2(deB * uFocusSoft * sc) / uRes;
    col = (texture(tColor, uv + mo + vec2(s.x, s.y * 0.4)).rgb + texture(tColor, uv + mo - vec2(s.x, s.y * 0.4)).rgb
         + texture(tColor, uv + mo + vec2(-s.x * 0.4, s.y)).rgb + texture(tColor, uv + mo - vec2(-s.x * 0.4, s.y)).rgb) * 0.25;
  } else col = texture(tColor, uv + mo).rgb;
  col = mix(col, fogC, fog);
  col = mix(col, vec3(luma(col)), de * uFocusDesat);
  col = mix(col, fogC, de * uFocusHaze * (1.0 - nearK));
  // in front: one flat dark tone (a silhouette frame), reached a little before the far side reaches its haze
  col = mix(col, mix(uInk, fogC, 0.22), clamp(de * 1.6, 0.0, 1.0) * nearK * uFocusNear);

  // glow (neon) added under the ink, never onto the paper page (id 200/201)
  vec3 glow = texture(tGlow, uv + mo).rgb;
  float pageId = floor(texture(tNormal, uv).a * 255.0 + 0.5);
  col += glow * uGlowAmt * (pageId > 199.5 ? 0.0 : 1.0);

  // grade: tint the shadows, warm or cool the highlights (a display (id 240) keeps the colours of what it shows)
  float shown = abs(hid - 240.0) < 0.5 ? 0.0 : 1.0;
  float l = luma(col);
  col = mix(col, uGradeShadow, (1.0 - smoothstep(0.0, 0.55, l)) * uGradeAmt * shown);
  col = mix(col, col * uGradeHigh, smoothstep(0.45, 1.0, l) * uGradeAmt * shown);

  // ink lines (away from the subject the ink takes the colour of the air: a colour hold)
  col = mix(col, mix(uInk, fogC * 0.55, deL * uFocusInk * (1.0 - nearK)), clamp(line, 0.0, 1.0));

  // neon bloom, printed as dots at its edges
  if (uBloomAmt > 0.0) {
    vec3 bl = texture(tBloom, uv).rgb;
    float bm = luma(bl);
    float dots = halftone(frag, 4.0 * (uRes.x / max(uRes.x, 1.0)) * max(1.0, uRes.y / 900.0), 0.5, clamp(bm * 1.6, 0.0, 1.0));
    vec3 soft = bl * uBloomAmt * mix(1.0, 0.45 + dots * 0.9, uBloomDots);
    if (uBloomHard > 0.0) {
      // drawn glow: no airbrush, only dots, in three hard steps out from the light
      float lev = floor(clamp(bm * 1.9, 0.0, 1.0) * 3.0 + 0.1) / 3.0;
      float hd = halftone(frag, uBloomCell * max(1.0, uRes.y / 900.0), 0.785, lev * uBloomCov);
      vec3 hue = bl / max(max(bl.r, max(bl.g, bl.b)), 1e-3);
      // (uBloomFlat: every dot prints at the light's full ink, only its size steps down; dimmed dots read as blobs)
      soft = mix(soft, hue * hd * mix(lev, 1.0, uBloomFlat) * uBloomAmt * 0.9, uBloomHard);
    }
    // (uBloomOver: no dots over the bright light itself, only round it, so a lit shape keeps a clean face)
    if (uBloomOver > 0.0) soft *= 1.0 - uBloomOver * smoothstep(0.22, 0.45, luma(col));
    col += soft;
  }

  // the grade: a generated 3D lookup table
  // (with CapHue on, an overbright colour enters the table scaled back by its brightest channel, so its hue survives;
  // clipped channel by channel, a green with bloom on it turned cyan)
  if (uLutAmt > 0.0) { float ls = uLutSize; vec3 cin = uCapHue > 0.5 ? col / max(1.0, max(col.r, max(col.g, col.b))) : clamp(col, 0.0, 1.0); vec3 lc = texture(tLut, clamp(cin, 0.0, 1.0) * ((ls - 1.0) / ls) + 0.5 / ls).rgb; col = mix(col, lc, uLutAmt * shown); }

  if (uCapAmt > 0.0) col = mix(col, uCapHue > 0.5 ? capHue(col, uCap) : capTo(col, uCap), uCapAmt);
  // paper: static grain + fibre mottling
  float g = hash12(floor(frag)) - 0.5;
  float fib = fbm2(frag / 260.0) - 0.5;
  col += g * uGrain * (0.35 + 0.65 * (1.0 - l));
  col *= 1.0 + fib * uFibre;

  // painted vignette
  vec2 vp = (uv - uVigC) * vec2(uRes.x / uRes.y, 1.0);
  float vig = smoothstep(uVigR.x, uVigR.y, length(vp) + (fbm2(frag / 300.0) - 0.5) * 0.25);
  col = mix(col, uGradeShadow * 0.6, vig * uVignette);

  // speed streaks while flying (drawn on twos, thin, never wallpaper)
  if (uSpeed > 0.02) {
    vec2 sp = (uv - uSpeedCenter) * vec2(uRes.x / uRes.y, 1.0);
    float sang = atan(sp.y, sp.x), srr = length(sp);
    if (uSpeedPrint > 0.5) {
      // printed speed lines: solid tapered wedges in one flat ink, a handful, redrawn on twos; speed adds lines,
      // it never fades them, and the middle of the frame stays clear
      float sd = floor(uStep * 12.0);
      float sn = vnoise2(vec2(sang * 46.0, sd * 3.1)) * 0.72 + vnoise2(vec2(sang * 121.0, sd * 5.7)) * 0.28;
      float thr = mix(0.99, 0.87, smoothstep(0.5, 1.15, srr)) + (1.0 - clamp(uSpeed * 1.4, 0.0, 1.0)) * 0.2; // a few thin wedges
      // (uSpeedInk: a line crossing something lit prints in ink, so it reads against light and dark alike)
      vec3 slc0 = mix(uSpeedCol, uInk, uSpeedInk * step(0.3, luma(col)));
      // (uSpeedMask, device px: no lines under the bar at the top, nor over the route box at the bottom left)
      float sm = (uSpeedMask.x > 0.0) ? step(frag.y, uRes.y - uSpeedMask.x) * (1.0 - step(frag.x, uSpeedMask.y) * step(frag.y, uSpeedMask.z)) : 1.0;
      col = mix(col, slc0, step(thr, sn) * step(uSpeedIn, srr) * sm);
    } else {
      float sn = vnoise2(vec2(sang * 140.0, floor(uStep * 12.0) * 3.1));
      float st = smoothstep(0.93 - uSpeed * 0.04, 0.95 - uSpeed * 0.04, sn) * smoothstep(0.42, 0.85, srr);
      col = mix(col, uSpeedCol, st * clamp(uSpeed, 0.0, 1.0) * 0.32);
    }
  }

  // comic impact frame
  if (uImpact > 0.001){
    // threshold the scene's tone, not its printed dots and grain, so the two inks part cleanly
    vec2 bo = 2.5 * sc / uRes;
    vec3 cb = (texture(tColor, uv + vec2(bo.x, bo.y * 0.4)).rgb + texture(tColor, uv - vec2(bo.x, bo.y * 0.4)).rgb
             + texture(tColor, uv + vec2(-bo.x * 0.4, bo.y)).rgb + texture(tColor, uv - vec2(-bo.x * 0.4, bo.y)).rgb) * 0.25;
    float L = mix(luma(col), luma(mix(cb, fogC, fog)) * 1.15, 0.8);
    vec3 a;
    if (uImpactMode < 1.5) a = mix(uImpInk, uImpPaper, step(0.3, L));                 // 1: two-ink silhouette
    else if (uImpactMode < 2.5) a = mix(uImpPaper, uImpInk, step(0.3, L));            // 2: inverted
    else {
      a = mix(uImpAccent, uImpInk, step(0.42, L));                                    // 3: accent field
      // (uImpTri: the brightest tone stays paper, so a cream fold over ink uprights still reads as the mark)
      if (uImpTri > 0.5) a = mix(a, uImpPaper, step(0.8, L));
    }
    // (uImpAccentInk: on the accent field the key line and speed lines print in ink, for contrast on the bright field)
    bool accInk = uImpactMode > 2.5 && uImpAccentInk > 0.5;
    vec3 lc = (uImpactMode < 1.5 || accInk) ? uImpInk : uImpPaper;
    // over the ink silhouette a line knocks out in the field colour, so the cuts inside a dark shape stay open
    if (accInk && uImpTri > 0.5 && L >= 0.42 && L < 0.8) lc = uImpAccent;
    a = mix(a, lc, line);
    vec2 p = (uv - uImpactCenter) * vec2(uRes.x / uRes.y, 1.0);
    float ang = atan(p.y, p.x);
    float rr = length(p);
    float n = vnoise2(vec2(ang * 38.0, uImpactSeed * 13.0)) * 0.7 + vnoise2(vec2(ang * 97.0, uImpactSeed * 7.0)) * 0.3;
    // speed lines as hard tapered wedges: only the strongest survive near the centre, none inside it
    float thr = mix(0.9, 0.52, smoothstep(0.12, 0.9, rr));
    float sl = step(thr, n) * step(0.15, rr);
    if (uImpTri > 0.5 && uImpactMode > 2.5) sl *= 1.0 - step(0.42, L); // speed lines run on the field, never across the silhouette
    vec3 slc = (uImpactMode < 1.5) ? uImpPaper : ((uImpactMode < 2.5 || accInk) ? uImpInk : uImpPaper);
    a = mix(a, slc, sl);
    col = mix(col, a, uImpact);
  }
  col = mix(col, uFadeCol, uFade);
  // the board's power plane, seen through everything standing on it (boot and finale)
  if (uPlaneAmt > 0.001 || uPlaneLed > 0.001) {
    vec4 vq = uInvProj * vec4(uv * 2.0 - 1.0, 1.0, 1.0); vq /= vq.w;
    vec3 ro = uCamWorld[3].xyz, rd = normalize(mat3(uCamWorld) * vq.xyz);
    if (rd.y < -0.0005) {
      float tb = -ro.y / rd.y;
      vec3 hp = ro + rd * tb;
      vec3 pm = texture(tPlane, (hp.xz - uPlaneRect.xy) / uPlaneRect.zw).rgb;
      vec4 vs = uInvProj * vec4(uv * 2.0 - 1.0, d0 * 2.0 - 1.0, 1.0); vs /= vs.w;
      float occl = (d0 < 0.9999 && length(vs.xyz) < tb - 6.0) ? 1.0 : 0.0;
      vec2 dq = abs(hp.xz - uPlaneC);
      float distE = length(hp.xz - uPlaneC);
      float dist = uPlaneOct > 0.5 ? max(max(dq.x, dq.y), (dq.x + dq.y) * 0.7071) : distE;
      // the flood has a hard edge, and its front is a band printed in dots (no airbrushed spotlight)
      float on = step(dist, uPlaneR);
      float front = step(abs(dist - uPlaneR), 34.0) * step(4.0, uPlaneR) * step(uPlaneR, 3200.0) * halftone(frag, 4.5 * sc, 0.785, 0.62);
      float fill = pm.r * on, edge = pm.g * on;
      if (uPlanePrint > 0.5) {
        // printed, not glass: the plate is opaque dots of one ink (dense on the front band, open on the back
        // pieces so the fold reads), an ink keyline round it, the flood front a band of hot dots
        float frontP = smoothstep(0.7, 0.85, pm.r) * on, backP = clamp(fill - frontP, 0.0, 1.0);
        float cov = (frontP * 0.8 + backP * 0.34) * mix(1.0, 0.6, occl);
        float pd = halftone(frag, 6.0 * sc, 0.785, cov);
        // (uPlaneFoldAmt: the front fold prints in its own ink, as the mark is drawn everywhere else)
        vec3 pcol = mix(uPlaneCol, uPlaneFold, uPlaneFoldAmt * step(0.5, frontP));
        col = mix(col, pcol, pd * uPlaneAmt);
        col = mix(col, uInk, smoothstep(0.25, 0.6, edge) * uPlaneAmt);
        float frontP2 = step(abs(dist - uPlaneR), 16.0) * step(4.0, uPlaneR) * step(uPlaneR, 3200.0) * halftone(frag, 6.0 * sc, 0.785, 0.42);
        col = mix(col, uPlaneHot, frontP2 * step(0.1, pm.r + pm.g) * uPlaneAmt);
      } else {
        float dots = halftone(frag, 4.6 * max(1.0, uRes.y / 900.0), 0.55, clamp(fill * 0.85, 0.0, 1.0));
        vec3 pc = uPlaneCol * (fill * (0.3 + 0.55 * dots) + edge * 0.85) + uPlaneHot * front * (pm.r + pm.g) * 1.1;
        col += pc * mix(1.0, 0.5, occl) * uPlaneAmt;
      }
      // the power LED: a hard bead of light with its glow printed as dots in three steps
      float lv = floor(clamp(1.0 - distE / 70.0, 0.0, 1.0) * 3.0 + 0.5) / 3.0;
      float halo = halftone(frag, 4.5 * sc, 0.785, lv * 0.55) * lv;
      col += uPlaneHot * ((1.0 - smoothstep(7.0, 9.0, distE)) * 1.2 + halo * 0.7) * uPlaneLed;
    }
    if (uCapAmt > 0.0) col = min(col, mix(vec3(9.0), uCap, uCapAmt)); // nothing above the paper, even the LED
  }
  fragColor = vec4(col, 1.0);
}`;

export const post = {
  uRes: { value: new THREE.Vector2(1, 1) },
  uNear: { value: 0.1 }, uFar: { value: 100 }, uOrtho: { value: 0 },
  uLine: { value: 1.6 }, uBoil: { value: 0.6 }, uDepthK: { value: 0.035 }, uNormalK: { value: 0.35 }, uLineAlpha: { value: 1 },
  uInk: { value: new THREE.Color('#0a0912') }, uPaperCol: { value: new THREE.Color('#efe9dc') },
  uGrain: { value: 0.045 }, uFibre: { value: 0.06 }, uMisregPx: { value: 1.2 }, uMisregDir: { value: new THREE.Vector2(0.8, -0.6) },
  uGradeShadow: { value: new THREE.Color('#14112a') }, uGradeHigh: { value: new THREE.Color('#ffffff') }, uGradeAmt: { value: 0.25 },
  uVignette: { value: 0.35 }, uGlowAmt: { value: 1.0 },
  uTime: { value: 0 }, uStep: { value: 0 },
  uImpact: { value: 0 }, uImpactMode: { value: 1 }, uImpactSeed: { value: 0 }, uImpactCenter: { value: new THREE.Vector2(0.5, 0.5) },
  uImpInk: { value: new THREE.Color('#0a0912') }, uImpPaper: { value: new THREE.Color('#f3eee2') }, uImpAccent: { value: new THREE.Color('#3dff8f') },
  uFade: { value: 0 }, uFadeCol: { value: new THREE.Color('#000000') },
  uBloomAmt: { value: 0 }, uBloomDots: { value: 0.6 },
  uFogCol: { value: new THREE.Color('#10142a') }, uFogNear: { value: 20 }, uFogFar: { value: 200 }, uFogAmt: { value: 0 }, uFogLine: { value: 0.85 },
  uSpeed: { value: 0 }, uSpeedCenter: { value: new THREE.Vector2(0.5, 0.5) }, uSpeedCol: { value: new THREE.Color('#ffffff') },
  uBloomThresh: { value: 1.2 },
  tLut: { value: makeLut((r, g, b) => [r, g, b], 2) }, uLutAmt: { value: 0 }, uLutSize: { value: 2 },
  uInvProj: { value: new THREE.Matrix4() }, uCamWorld: { value: new THREE.Matrix4() },
  uHFogAmt: { value: 0 }, uHFogY: { value: 0 }, uHFogK: { value: 0.01 }, uFogDirAmt: { value: 0 }, uFogGlow: { value: 0 }, uFogHorizon: { value: new THREE.Color('#304040') },
  tPlane: { value: null }, uPlaneAmt: { value: 0 }, uPlaneR: { value: 0 }, uPlaneLed: { value: 0 }, uPlaneC: { value: new THREE.Vector2() },
  uPlaneRect: { value: new THREE.Vector4(-1000, -750, 2000, 1500) }, uPlaneCol: { value: new THREE.Color('#4fe3b2') }, uPlaneHot: { value: new THREE.Color('#eafff6') },
  // stylised focus around a point in the world (off unless uFocusAmt > 0): within R0 of it everything is fully
  // inked; by R1 lines fade (Line), ink takes the air's colour (Ink), colour greys (Desat) and hazes (Haze), the
  // plate softens (Soft, px) and slips off the line (Misreg, px), and lights stop blooming (Bloom)
  uFocusP: { value: new THREE.Vector3() }, uFocusAmt: { value: 0 }, uFocusR0: { value: 200 }, uFocusR1: { value: 600 },
  uFocusLine: { value: 0.7 }, uFocusInk: { value: 0.6 }, uFocusDesat: { value: 0.5 }, uFocusHaze: { value: 0.3 }, uFocusSoft: { value: 1.6 }, uFocusMisreg: { value: 1.2 }, uFocusBloom: { value: 0.7 },
  uVigC: { value: new THREE.Vector2(0.5, 0.5) },
  // nothing prints brighter than the paper (uCap, a colour; off at uCapAmt 0); glows as dots only (uBloomHard 1)
  uCap: { value: new THREE.Color('#ffffff') }, uCapAmt: { value: 0 }, uBloomHard: { value: 0 },
  // all off by default: the cap keeps a saturated light's hue (CapHue 1); in front of the subject the world darkens
  // by FocusNear instead of hazing (FocusZ, the subject's view depth, is set each frame); speed lines as printed
  // wedges (SpeedPrint 1); the glow's dot screen (BloomCell px, BloomCov coverage); the power plane printed as dots
  // (PlanePrint 1); ink key lines on the accent impact frame (ImpAccentInk 1)
  uCapHue: { value: 0 }, uFocusNear: { value: 0 }, uFocusZ: { value: 0 }, uSpeedPrint: { value: 0 },
  uVigR: { value: new THREE.Vector2(0.35, 1.05) }, uBloomOver: { value: 0 }, uBloomFlat: { value: 0 }, uImpTri: { value: 0 }, uSpeedIn: { value: 0.46 }, uSpeedMask: { value: new THREE.Vector3(0, 0, 0) }, uPlaneOct: { value: 0 }, uPlaneFoldAmt: { value: 0 }, uPlaneFold: { value: new THREE.Color('#ece6d4') }, uSpeedInk: { value: 0 },
  uBloomCell: { value: 4.5 }, uBloomCov: { value: 0.62 }, uPlanePrint: { value: 0 }, uImpAccentInk: { value: 0 },
  // ink fades between uLineFar.x and .y (world units) by uLineFarAmt (0 = off)
  uLineFar: { value: new THREE.Vector2(1500, 2600) }, uLineFarAmt: { value: 0 },
};
const _fz = new THREE.Vector3();
/** the subject's depth in front of the camera, for the near/far focus split */
function focusDepth(camera) { post.uFocusZ.value = -_fz.copy(post.uFocusP.value).applyMatrix4(camera.matrixWorldInverse).z; }
/** install a lookup-table grade (see lut.js); amt 0 turns it off */
export function setLut(tex, amt = 1) { post.tLut.value = tex; post.uLutSize.value = tex.userData.size ?? tex.image.width; post.uLutAmt.value = amt; }

const KUWAHARA_FRAG = /* glsl */ `
precision highp float;
uniform sampler2D tSrc; uniform vec2 uRes; uniform float uRadius;
in vec2 vUv; out highp vec4 fragColor;
// Classic four-sector Kuwahara: each pixel takes the mean of its least varied quadrant,
// which flattens tone into paint-like dabs while keeping edges.
void main(){
  vec2 px = 1.0 / uRes;
  vec3 m[4]; vec3 s[4];
  for (int k = 0; k < 4; k++) { m[k] = vec3(0.0); s[k] = vec3(0.0); }
  int R = int(uRadius);
  float n = float((R + 1) * (R + 1));
  for (int j = 0; j <= 4; j++) {
    if (j > R) break;
    for (int i = 0; i <= 4; i++) {
      if (i > R) break;
      vec3 c;
      c = texture(tSrc, vUv + vec2(-i, -j) * px).rgb; m[0] += c; s[0] += c * c;
      c = texture(tSrc, vUv + vec2( i, -j) * px).rgb; m[1] += c; s[1] += c * c;
      c = texture(tSrc, vUv + vec2( i,  j) * px).rgb; m[2] += c; s[2] += c * c;
      c = texture(tSrc, vUv + vec2(-i,  j) * px).rgb; m[3] += c; s[3] += c * c;
    }
  }
  float best = 1e9; vec3 outc = vec3(0.0);
  for (int k = 0; k < 4; k++) {
    vec3 mu = m[k] / n; vec3 v = abs(s[k] / n - mu * mu);
    float sv = v.r + v.g + v.b;
    if (sv < best) { best = sv; outc = mu; }
  }
  fragColor = vec4(outc, 1.0);
}`;

const FS_VERT = /* glsl */ `in vec3 position; in vec2 uv; out vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;
const BRIGHT_FRAG = /* glsl */ `
precision highp float;
uniform sampler2D tColor, tNormal, tDepth; uniform float uThresh;
uniform mat4 uInvProj, uCamWorld; uniform vec3 uFocusP; uniform float uFocusAmt, uFocusR0, uFocusR1, uFocusBloom;
in vec2 vUv; out highp vec4 fragColor;
void main(){
  vec3 c = texture(tColor, vUv).rgb;
  float id = floor(texture(tNormal, vUv).a * 255.0 + 0.5);
  float l = dot(c, vec3(0.299, 0.587, 0.114));
  float m = max(step(249.5, id), smoothstep(uThresh, uThresh + 0.25, l));
  // lights far from the subject print flat: no halo
  if (uFocusAmt > 0.0 && abs(id - 249.0) > 0.5) {
    float d = texture(tDepth, vUv).r;
    float k = uFocusAmt;
    if (d < 0.9999) { vec4 v = uInvProj * vec4(vUv * 2.0 - 1.0, d * 2.0 - 1.0, 1.0); vec3 w = (uCamWorld * vec4(v.xyz / v.w, 1.0)).xyz; k *= smoothstep(uFocusR0, uFocusR1, length(w - uFocusP)); }
    m *= 1.0 - k * uFocusBloom;
  }
  fragColor = vec4(c * m, 1.0);
}`;
const BLUR_FRAG = /* glsl */ `
precision highp float;
uniform sampler2D tSrc; uniform vec2 uDir;
in vec2 vUv; out highp vec4 fragColor;
void main(){
  vec3 s = texture(tSrc, vUv).rgb * 0.2270;
  s += (texture(tSrc, vUv + uDir * 1.3846).rgb + texture(tSrc, vUv - uDir * 1.3846).rgb) * 0.3162;
  s += (texture(tSrc, vUv + uDir * 3.2308).rgb + texture(tSrc, vUv - uDir * 3.2308).rgb) * 0.0703;
  fragColor = vec4(s, 1.0);
}`;
const ADD_FRAG = /* glsl */ `
precision highp float;
uniform sampler2D tA, tB; uniform float uB;
in vec2 vUv; out highp vec4 fragColor;
void main(){ fragColor = vec4(texture(tA, vUv).rgb + texture(tB, vUv).rgb * uB, 1.0); }`;

export class InkPipeline {
  constructor(renderer, { glow = true, kuwahara = 0, bloom = false } = {}) {
    this.renderer = renderer;
    this.useBloom = bloom;
    this.useGlow = glow;
    this.kuwahara = kuwahara;
    this.depth = new THREE.DepthTexture(1, 1);
    this.depth.type = THREE.UnsignedIntType;
    this.rt = new THREE.WebGLRenderTarget(1, 1, {
      count: 2, depthBuffer: true, depthTexture: this.depth,
      minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter, type: THREE.UnsignedByteType,
    });
    this.rt.textures[0].minFilter = THREE.LinearFilter; this.rt.textures[0].magFilter = THREE.LinearFilter;
    this.glowRT = new THREE.WebGLRenderTarget(1, 1, { depthBuffer: true, depthTexture: this.depth, type: THREE.HalfFloatType });
    this.blank = new THREE.DataTexture(new Uint8Array([0, 0, 0, 255]), 1, 1); this.blank.needsUpdate = true;
    this.mat = new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3,
      vertexShader: /* glsl */ `in vec3 position; in vec2 uv; out vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,
      fragmentShader: POST_FRAG,
      uniforms: {
        ...post,
        tColor: { value: this.rt.textures[0] }, tNormal: { value: this.rt.textures[1] },
        tDepth: { value: this.depth }, tGlow: { value: glow ? this.glowRT.texture : this.blank },
        tBloom: { value: this.blank },
      },
      depthTest: false, depthWrite: false,
    });
    if (kuwahara > 0) {
      this.paintRT = new THREE.WebGLRenderTarget(1, 1, { depthBuffer: false, type: THREE.UnsignedByteType });
      this.kMat = new THREE.RawShaderMaterial({
        glslVersion: THREE.GLSL3,
        vertexShader: /* glsl */ `in vec3 position; in vec2 uv; out vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,
        fragmentShader: KUWAHARA_FRAG,
        uniforms: { tSrc: { value: this.rt.textures[0] }, uRes: post.uRes, uRadius: { value: kuwahara } },
        depthTest: false, depthWrite: false,
      });
      this.kQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.kMat); this.kQuad.frustumCulled = false;
      this.kScene = new THREE.Scene(); this.kScene.add(this.kQuad);
      this.mat.uniforms.tColor.value = this.paintRT.texture;
    }
    if (bloom) {
      const rt = () => new THREE.WebGLRenderTarget(1, 1, { depthBuffer: false, type: THREE.HalfFloatType, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter });
      this.bA = rt(); this.bB = rt(); this.bC = rt(); this.bD = rt(); this.bOut = rt();
      const mk = (frag, uniforms) => new THREE.RawShaderMaterial({ glslVersion: THREE.GLSL3, vertexShader: FS_VERT, fragmentShader: frag, uniforms, depthTest: false, depthWrite: false });
      this.brightMat = mk(BRIGHT_FRAG, { tColor: { value: this.rt.textures[0] }, tNormal: { value: this.rt.textures[1] }, tDepth: { value: this.depth }, uThresh: post.uBloomThresh,
        uInvProj: post.uInvProj, uCamWorld: post.uCamWorld, uFocusP: post.uFocusP, uFocusAmt: post.uFocusAmt, uFocusR0: post.uFocusR0, uFocusR1: post.uFocusR1, uFocusBloom: post.uFocusBloom });
      this.blurMat = mk(BLUR_FRAG, { tSrc: { value: null }, uDir: { value: new THREE.Vector2() } });
      this.addMat = mk(ADD_FRAG, { tA: { value: null }, tB: { value: null }, uB: { value: 0.9 } });
      this.fsQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.brightMat); this.fsQuad.frustumCulled = false;
      this.fsScene = new THREE.Scene(); this.fsScene.add(this.fsQuad);
      this.mat.uniforms.tBloom.value = this.bOut.texture;
    }
    this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.mat);
    this.quad.frustumCulled = false;
    this.postScene = new THREE.Scene(); this.postScene.add(this.quad);
    this.postCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  }
  setSize(w, h, dpr) {
    const W = Math.max(1, Math.round(w * dpr)), H = Math.max(1, Math.round(h * dpr));
    this.rt.setSize(W, H);
    this.glowRT.setSize(W, H);
    if (this.paintRT) this.paintRT.setSize(W, H);
    if (this.useBloom) {
      const w4 = Math.max(1, W >> 2), h4 = Math.max(1, H >> 2), w8 = Math.max(1, W >> 3), h8 = Math.max(1, H >> 3);
      this.bA.setSize(w4, h4); this.bB.setSize(w4, h4); this.bC.setSize(w8, h8); this.bD.setSize(w8, h8); this.bOut.setSize(w4, h4);
    }
    post.uRes.value.set(W, H);
  }
  fs(mat, target) { this.fsQuad.material = mat; this.renderer.setRenderTarget(target); this.renderer.render(this.fsScene, this.postCam); }
  bloomPass() {
    if (!this.useBloom || post.uBloomAmt.value <= 0) return;
    const b = this.blurMat.uniforms;
    this.fs(this.brightMat, this.bA);
    b.tSrc.value = this.bA.texture; b.uDir.value.set(1 / this.bA.width, 0); this.fs(this.blurMat, this.bB);
    b.tSrc.value = this.bB.texture; b.uDir.value.set(0, 1 / this.bA.height); this.fs(this.blurMat, this.bA);
    b.tSrc.value = this.bA.texture; b.uDir.value.set(1 / this.bC.width, 0); this.fs(this.blurMat, this.bC);
    b.tSrc.value = this.bC.texture; b.uDir.value.set(0, 1 / this.bC.height); this.fs(this.blurMat, this.bD);
    b.tSrc.value = this.bD.texture; b.uDir.value.set(2 / this.bC.width, 0); this.fs(this.blurMat, this.bC);
    b.tSrc.value = this.bC.texture; b.uDir.value.set(0, 2 / this.bC.height); this.fs(this.blurMat, this.bD);
    const a = this.addMat.uniforms; a.tA.value = this.bA.texture; a.tB.value = this.bD.texture;
    this.fs(this.addMat, this.bOut);
  }
  /** Several cameras into the same targets (comic panels): passes = [{ scene, camera, rect: [x, y, w, h] (css px, top-left) | null, clearDepth }] */
  renderPasses(passes, glowScene = null, cssW = 1, cssH = 1) {
    const r = this.renderer;
    const main = passes[0].camera;
    post.uNear.value = main.near; post.uFar.value = main.far; post.uOrtho.value = 0;
    post.uInvProj.value.copy(main.projectionMatrixInverse); post.uCamWorld.value.copy(main.matrixWorld); focusDepth(main);
    r.setRenderTarget(this.rt);
    r.setClearColor(0x000000, 0);
    r.setScissorTest(false);
    r.clear(true, true, true);
    const W = this.rt.width, H = this.rt.height, sx = W / cssW, sy = H / cssH;
    for (const p of passes) {
      if (p.rect) {
        const [x, y, w, h] = p.rect;
        const X = Math.round(x * sx), Y = Math.round(H - (y + h) * sy), Wd = Math.round(w * sx), Hd = Math.round(h * sy);
        this.rt.viewport.set(X, Y, Wd, Hd); this.rt.scissor.set(X, Y, Wd, Hd); this.rt.scissorTest = true;
        r.setRenderTarget(this.rt);
        if (p.clearDepth) r.clear(false, true, false);
      } else {
        this.rt.viewport.set(0, 0, W, H); this.rt.scissor.set(0, 0, W, H); this.rt.scissorTest = false;
        r.setRenderTarget(this.rt);
        if (p.clearDepth) r.clear(false, true, false);
      }
      r.render(p.scene, p.camera);
    }
    this.rt.viewport.set(0, 0, W, H); this.rt.scissor.set(0, 0, W, H); this.rt.scissorTest = false;
    if (this.useGlow) {
      const G = this.glowRT;
      G.viewport.set(0, 0, W, H); G.scissor.set(0, 0, W, H); G.scissorTest = false;
      r.setRenderTarget(G);
      r.setClearColor(0x000000, 1);
      r.clear(true, false, false);
      if (glowScene) for (const p of passes) {
        if (p.glow === false) continue;
        if (p.rect) {
          const [x, y, w, h] = p.rect;
          const X = Math.round(x * sx), Y = Math.round(H - (y + h) * sy), Wd = Math.round(w * sx), Hd = Math.round(h * sy);
          G.viewport.set(X, Y, Wd, Hd); G.scissor.set(X, Y, Wd, Hd); G.scissorTest = true;
          r.setRenderTarget(G); r.clear(true, false, false);
        } else { G.viewport.set(0, 0, W, H); G.scissorTest = false; r.setRenderTarget(G); }
        r.render(glowScene, p.camera);
      }
      G.viewport.set(0, 0, W, H); G.scissor.set(0, 0, W, H); G.scissorTest = false;
    }
    this.bloomPass();
    r.setRenderTarget(null);
    r.render(this.postScene, this.postCam);
  }
  render(scene, camera, glowScene = null) {
    const r = this.renderer;
    post.uNear.value = camera.near; post.uFar.value = camera.far; post.uOrtho.value = camera.isOrthographicCamera ? 1 : 0;
    post.uInvProj.value.copy(camera.projectionMatrixInverse); post.uCamWorld.value.copy(camera.matrixWorld); focusDepth(camera);
    r.setRenderTarget(this.rt);
    r.setClearColor(0x000000, 0);
    r.clear(true, true, true);
    r.render(scene, camera);
    if (this.useGlow) {
      r.setRenderTarget(this.glowRT);
      r.setClearColor(0x000000, 1);
      r.clear(true, false, false);
      if (glowScene) r.render(glowScene, camera);
    }
    if (this.paintRT) { r.setRenderTarget(this.paintRT); r.render(this.kScene, this.postCam); }
    this.bloomPass();
    r.setRenderTarget(null);
    r.render(this.postScene, this.postCam);
  }
}
