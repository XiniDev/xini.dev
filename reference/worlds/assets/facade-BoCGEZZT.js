import{A as e,N as t,V as n,X as r,Y as i,_ as a,h as o,ot as s,st as c,v as l,w as u,y as d}from"./marks-CcyUbe6h.js";var f={uWinA:{value:new u(`#ffcf86`)},uWinB:{value:new u(`#7fe3ff`)},uWinC:{value:new u(`#ff4f86`)},uWall:{value:new u(`#1c1a2c`)},uWallLit:{value:new u(`#3a3654`)},uRoof:{value:new u(`#25223a`)},uLit:{value:.32},uCell:{value:new s(2.6,3.4)}},p=`
in vec3 position; in vec3 normal; in mat4 instanceMatrix;
#ifdef USE_INSTANCE_COLOR
in vec3 instanceColor; out vec3 vIColor;
#endif
uniform mat4 modelMatrix, viewMatrix, projectionMatrix;
out vec3 vLocal; out vec3 vLN; out vec3 vN; out vec3 vViewPos; out float vInst; out vec3 vScale;
void main(){
  vec3 sc = vec3(length(instanceMatrix[0].xyz), length(instanceMatrix[1].xyz), length(instanceMatrix[2].xyz));
  vScale = sc;
  vLocal = position * sc;
  vLN = normal;
  vInst = float(gl_InstanceID);
#ifdef USE_INSTANCE_COLOR
  vIColor = instanceColor;
#endif
  vec4 wp = modelMatrix * instanceMatrix * vec4(position, 1.0);
  vec4 mv = viewMatrix * wp; vViewPos = mv.xyz;
  vN = normalize(mat3(viewMatrix) * mat3(modelMatrix) * mat3(instanceMatrix) * normal);
  gl_Position = projectionMatrix * mv;
}`,m=`
precision highp float;
${l}
${a}
uniform vec3 uKeyDir, uShadeTint, uDotInk, uRimCol;
uniform vec3 uWinA, uWinB, uWinC, uWall, uWallLit, uRoof;
uniform float uLit, uStep, uPx; uniform vec2 uCell;
in vec3 vLocal; in vec3 vLN; in vec3 vN; in vec3 vViewPos; in float vInst; in vec3 vScale;
#ifdef USE_INSTANCE_COLOR
in vec3 vIColor;
#endif
layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
void main(){
  vec3 N = normalize(vN), V = normalize(-vViewPos);
  float seed = hash11(vInst * 0.137 + 3.1);
  vec3 wall = uWall;
#ifdef USE_INSTANCE_COLOR
  wall = vIColor;
#endif
  float ndl = dot(N, normalize(uKeyDir));
  float band = smoothstep(-0.05, 0.05, ndl + (vnoise2(vLocal.xy * 0.4) - 0.5) * 0.2);
  vec3 col = mix(mix(wall, uShadeTint, 0.45), mix(wall, uWallLit, 0.6), band);
  float id = 1.0 + mod(vInst * 7.0 + 11.0, 198.0);
  if (abs(vLN.y) > 0.5) {
    col = mix(uRoof, uShadeTint, 0.3);
  } else {
    // facade coordinates in metres: across the face, and up
    float u = abs(vLN.x) > 0.5 ? vLocal.z : vLocal.x;
    float v = vLocal.y;
    vec2 g = vec2(u, v) / uCell;
    vec2 cell = floor(g), f = fract(g);
    float win = step(0.16, f.x) * step(f.x, 0.84) * step(0.24, f.y) * step(f.y, 0.78);
    float rowSeed = hash12(vec2(cell.y, vInst));
    float litChance = uLit * (0.4 + seed * 1.2) * (rowSeed > 0.86 ? 0.0 : 1.0) * (rowSeed < 0.07 ? 2.5 : 1.0);
    float h = hash12(cell + vInst * 13.7 + floor(uStep * 0.5) * step(0.995, hash12(cell + 7.0)));
    float lit = step(h, litChance);
    float pick = hash12(cell * 1.7 + vInst);
    vec3 wc = pick < 0.72 ? uWinA : (pick < 0.9 ? uWinB : uWinC);
    // far away, a window becomes a pixel: average it instead of shimmering
    float px = length(fwidth(g));
    float far = smoothstep(0.18, 0.45, px);
    vec3 dark = mix(col, uDotInk, 0.55);
    vec3 winCol = mix(dark, wc * (0.75 + 0.35 * hash12(cell + 2.0)), lit);
    vec3 near = mix(col, winCol, win);
    vec3 avg = mix(col, mix(dark, wc, litChance * 0.9), 0.5);
    col = mix(near, avg, far);
    if (win * lit * (1.0 - far) > 0.5) id = 250.0 + mod(vInst, 5.0);
    // vertical sign strips on some towers
    float sign = step(0.9, seed) * step(abs(u - (seed - 0.9) * 40.0 + 2.0), 0.9) * step(v, vScale.y * 0.8) * step(vScale.y * 0.35, v);
    if (sign > 0.5) { col = mix(uWinC, uWinB, step(0.95, seed)); id = 253.0; }
  }
  // rim from the city glow below
  float fr = pow(1.0 - max(dot(N, V), 0.0), 3.0);
  col = mix(col, uRimCol, smoothstep(0.55, 0.7, fr) * 0.35 * step(abs(vLN.y), 0.5));
  gColor = vec4(col, 1.0);
  gNormal = vec4(N * 0.5 + 0.5, id / 255.0);
}`;function h({instanceColor:t=!1}={}){return new r({glslVersion:e,vertexShader:p,fragmentShader:m,uniforms:{...f,uKeyDir:o.uKeyDir,uShadeTint:o.uShadeTint,uDotInk:o.uDotInk,uRimCol:o.uRimCol,uStep:o.uStep,uPx:o.uPx},defines:t?{USE_INSTANCE_COLOR:``}:{}})}function g(){let e=new d(1,1,1);return e.translate(0,.5,0),e}function _({count:e=600,rMin:r=40,rMax:a=400,hMin:o=10,hMax:s=90,wMin:l=6,wMax:d=18,y:f=0,seed:p=1,avoid:m=[],palette:_=[`#1c1a2c`]}={}){let v=p>>>0||1,y=()=>(v=v*1664525+1013904223>>>0)/4294967296,b=new t(g(),h({instanceColor:!0}),e),x=new n,S=new i,C=new c,w=new c,T=new u,E=0,D=0;for(;E<e&&D++<e*20;){let e=y()*Math.PI*2,t=Math.sqrt(r*r+y()*(a*a-r*r)),n=Math.cos(e)*t,i=Math.sin(e)*t;if(m.some(([e,t,r])=>(n-e)**2+(i-t)**2<r*r))continue;let u=y()**2.2,p=o+(s-o)*u*(.6+.8*(1-t/a)),h=l+(d-l)*y();C.set(n,f,i),S.setFromAxisAngle(new c(0,1,0),Math.round(y()*4)*(Math.PI/2)+(y()<.2?y()*.5:0)),w.set(h,p,h*(.7+y()*.6)),x.compose(C,S,w),b.setMatrixAt(E,x),b.setColorAt(E,T.set(_[Math.floor(y()*_.length)])),E++}return b.count=E,b.instanceMatrix.needsUpdate=!0,b.instanceColor&&(b.instanceColor.needsUpdate=!0),b.frustumCulled=!1,b}export{g as i,f as n,_ as r,h as t};