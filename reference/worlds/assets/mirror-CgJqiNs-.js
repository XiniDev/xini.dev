import{A as e,B as t,C as n,D as r,E as i,G as a,H as o,K as s,L as c,N as l,O as u,Q as d,R as f,S as p,V as m,W as h,X as g,Y as _,_ as v,at as y,ct as b,h as x,it as S,j as C,k as w,lt as T,m as E,n as D,nt as O,ot as k,p as A,q as j,st as M,t as N,tt as ee,v as P,w as F,x as I,y as L}from"./marks-CcyUbe6h.js";var R=e=>E({brushScale:.07,dotCell:4.5,...e}),z=(e,t,n)=>new M(e,t,n),B=7,V=()=>(B=B*16807%2147483647)/2147483647,H=e=>{B=e},U={w:2e3,h:1500},W={uMask:{value:new F(`#070a0b`)},uMask2:{value:new F(`#0c1213`)},uSilk:{value:new F(`#dfe6df`)},uPad:{value:new F(`#c9a25a`)},uSheen:{value:new F(`#2a3a3a`)},uSignal:{value:new F(`#3dff8f`)},uHot:{value:new F(`#eafff4`)},uLitC:{value:new k(0,0)},uLitR:{value:1e5},uPing:{value:[0,1,2,3].map(()=>new b(0,0,-100,0))},uSilkTex:{value:null},uRefl:{value:null},uReflMat:{value:new m},uReflAmt:{value:0},uReflDebug:{value:0},uScreen:{value:new k(1,1)}},te=`in vec3 position; in vec2 uv; uniform mat4 modelMatrix, viewMatrix, projectionMatrix, uReflMat;
  out vec2 vUv; out vec3 vW; out vec3 vViewPos; out vec3 vN; out vec4 vRefl;
  void main(){ vUv = uv; vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; vec4 mv = viewMatrix * w; vViewPos = mv.xyz;
    vRefl = uReflMat * w;
    vN = normalize(mat3(viewMatrix) * vec3(0.0, 1.0, 0.0)); gl_Position = projectionMatrix * mv; }`;function ne(){let t=new j(U.w,U.h,1,1);t.rotateX(-Math.PI/2);let n=new g({glslVersion:e,vertexShader:te,fragmentShader:`precision highp float;
      ${P}
      ${v}
      uniform vec3 uMask, uMask2, uSilk, uPad, uSheen, uSignal, uHot, uDot, uKeyDir;
      uniform sampler2D uSilkTex, uRefl; uniform float uPx, uStep, uLitR, uReflAmt, uReflDebug; uniform vec2 uScreen; uniform vec2 uLitC; uniform vec4 uPing[4];
      in vec2 vUv; in vec3 vW; in vec3 vViewPos; in vec3 vN; in vec4 vRefl;
      layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){
        vec3 N = normalize(vN), Vv = normalize(-vViewPos), L = normalize(uKeyDir);
        vec4 sk = texture(uSilkTex, vUv);
        float big = fbm2(vW.xz * 0.0025);
        vec3 c = mix(uMask, uMask2, big);
        // the mask is glossy: the lit city reflects in it, printed as dots where it fades
        if (uReflAmt > 0.0) {
          vec2 ruv = vRefl.xy / vRefl.w;
          vec2 wob = (vec2(vnoise2(vW.xz * 0.045), vnoise2(vW.xz * 0.045 + 9.1)) - 0.5) * 0.007;
          vec3 rc = texture(uRefl, ruv + wob).rgb;
          float fres = mix(0.22, 0.8, pow(1.0 - max(dot(N, Vv), 0.0), 2.5));
          float rl = luma(rc);
          float rd = halftone(gl_FragCoord.xy, 3.6 * uPx, 0.4, clamp(rl * 1.6, 0.0, 1.0));
          c += rc * fres * mix(rd, 1.0, smoothstep(0.35, 0.7, rl)) * uReflAmt * (1.0 - clamp(sk.r + sk.g, 0.0, 1.0) * 0.8);
          if (uReflDebug > 1.5) { gColor = vec4(texture(uRefl, gl_FragCoord.xy / uScreen).rgb * 2.0, 1.0); gNormal = vec4(N * 0.5 + 0.5, 199.0 / 255.0); return; }
          if (uReflDebug > 0.5) { gColor = vec4(rc * 0.8 + vec3(fract(ruv * 4.0), 0.0) * 0.5 + vec3(0.0, 0.0, 0.3), 1.0); gNormal = vec4(N * 0.5 + 0.5, 199.0 / 255.0); return; }
        }
        // satin sheen from the case light, printed with a halftone falloff
        vec3 H = normalize(L + Vv);
        float sh = pow(max(dot(N, H), 0.0), 9.0);
        float band = smoothstep(0.38, 0.8, sh + (big - 0.5) * 0.3);
        c = mix(c, uSheen, band * 0.6);
        float sd = halftone(gl_FragCoord.xy, 4.5 * uPx, 0.785, smoothstep(0.06, 0.42, sh) * (1.0 - band) * 0.75);
        c = mix(c, uSheen, sd * 0.4);
        // vias on a 9-unit grid, faded out before they can shimmer
        vec2 g = vW.xz / 9.0; vec2 cell = floor(g), f = fract(g) - 0.5;
        float fw = length(fwidth(g));
        float hasVia = step(0.86, hash12(cell)) * (1.0 - smoothstep(0.05, 0.14, fw));
        float rr = length(f);
        float ring = (1.0 - smoothstep(0.17, 0.21, rr)) * smoothstep(0.06, 0.1, rr);
        // power-on wave from the processor
        float dist = length(vW.xz - uLitC);
        float on = smoothstep(uLitR, uLitR - 60.0, dist);
        float front = smoothstep(70.0, 0.0, abs(dist - uLitR)) * step(uLitR, 4000.0);
        c = mix(c, uPad * 0.7, ring * hasVia * (1.0 - sk.b) * (0.3 + 0.7 * on));
        // contact shadows under every part (painted into blue), printed as dots
        float ao = sk.b;
        c *= 1.0 - ao * 0.6;
        float ad = halftone(gl_FragCoord.xy, 4.0 * uPx, 0.3, ao);
        c = mix(c, uDot, ad * smoothstep(0.05, 0.5, ao) * 0.7);
        // pads (gold) and legend (white)
        float glint = pow(max(dot(reflect(-L, N), Vv), 0.0), 30.0);
        vec3 pad = uPad * (0.7 + 0.8 * glint + 0.2 * band);
        c = mix(c, pad * (0.3 + 0.7 * on), sk.g);
        vec3 silk = uSilk * (0.9 + 0.1 * hash12(floor(vW.xz * 2.0)));
        c = mix(c, silk * (0.25 + 0.75 * on), clamp(sk.r, 0.0, 1.0) * 0.95);
        c = mix(c, uHot, front * (0.25 + 0.6 * (sk.r + sk.g)));
        // pings where the board is clicked
        for (int i = 0; i < 4; i++) {
          vec4 P = uPing[i];
          float age = uStep - P.z;
          if (age < 0.0 || age > 1.4) continue;
          float r = age * 240.0;
          float dd = length(vW.xz - P.xy);
          float w = 2.5 + age * 5.0;
          c = mix(c, uSignal, smoothstep(w, 0.0, abs(dd - r)) * (1.0 - age / 1.4) * P.w);
          c = mix(c, uSignal, smoothstep(w, 0.0, abs(dd - r * 0.62)) * (1.0 - age / 1.4) * P.w * 0.5);
        }
        gColor = vec4(c, 1.0);
        gNormal = vec4(N * 0.5 + 0.5, 199.0 / 255.0);
      }`,uniforms:{...W,uDot:x.uDotInk,uKeyDir:x.uKeyDir,uPx:x.uPx,uStep:x.uStep}}),r=new o(t,n);r.renderOrder=-10;let i=new o(new L(U.w,16,U.h),R({base:`#1d2a24`,brush:.2,spec:.2,rim:.6,id:198}));i.position.y=-8.05;let a=new C;return a.add(r,i),a}var re=class{constructor(e=4096){this.c=document.createElement(`canvas`),this.c.width=e,this.c.height=Math.round(e*(U.h/U.w)),this.g=this.c.getContext(`2d`),this.g.fillStyle=`#000`,this.g.fillRect(0,0,this.c.width,this.c.height),this.g.globalCompositeOperation=`lighter`,this.k=this.c.width/U.w,this.tex=new p(this.c),this.tex.colorSpace=``,this.tex.anisotropy=8,this.tex.generateMipmaps=!0,this.tex.minFilter=f,this.a=document.createElement(`canvas`),this.a.width=this.c.width>>2,this.a.height=this.c.height>>2,this.ag=this.a.getContext(`2d`),this.ag.globalCompositeOperation=`lighter`,this.ak=this.k/4}finish(){let e=this.g;e.save(),e.filter=`blur(${3*this.k}px)`,e.drawImage(this.a,0,0,this.c.width,this.c.height),e.restore(),this.tex.needsUpdate=!0}P(e,t){return[(e+U.w/2)*this.k,(t+U.h/2)*this.k]}rect(e,t,n,r,i=1.1){let a=this.g,[o,s]=this.P(e-n/2,t-r/2);a.strokeStyle=`rgb(255,0,0)`,a.lineWidth=i*this.k,a.strokeRect(o,s,n*this.k,r*this.k)}footprint(e,t,n,r,i=4){let a=this.g;a.strokeStyle=`rgb(255,0,0)`,a.lineWidth=1.1*this.k;let o=e-n/2-i,s=t-r/2-i,c=e+n/2+i,l=t+r/2+i,u=Math.min(n,r)*.22+3;for(let[e,t,n,r]of[[o,s,1,1],[c,s,-1,1],[c,l,-1,-1],[o,l,1,-1]])this.line([[e+n*u,t],[e,t],[e,t+r*u]]);a.fillStyle=`rgb(255,0,0)`;let[d,f]=this.P(o-3,s-3);a.beginPath(),a.arc(d,f,1.5*this.k,0,Math.PI*2),a.fill()}pad(e,t,n,r){let i=this.g,[a,o]=this.P(e-n/2,t-r/2);i.fillStyle=`rgb(0,255,0)`,i.fillRect(a,o,n*this.k,r*this.k)}ring(e,t,n,r){let i=this.g,[a,o]=this.P(e,t);i.fillStyle=`rgb(0,255,0)`,i.beginPath(),i.arc(a,o,r*this.k,0,Math.PI*2),i.arc(a,o,n*this.k,0,Math.PI*2,!0),i.fill()}ao(e,t,n,r,i=6,a=.8){let o=this.ag,s=this.ak,c=(e-n/2+U.w/2)*s,l=(t-r/2+U.h/2)*s;o.fillStyle=`rgb(0,0,${Math.round(150*a)})`,o.fillRect(c-i*s*.5,l-i*s*.5,(n+i)*s,(r+i)*s),o.fillStyle=`rgb(0,0,${Math.round(105*a)})`,o.fillRect(c,l,n*s,r*s)}aoDisc(e,t,n,r=6,i=.8){let a=this.ag,o=this.ak,s=(e+U.w/2)*o,c=(t+U.h/2)*o;a.fillStyle=`rgb(0,0,${Math.round(150*i)})`,a.beginPath(),a.arc(s,c,(n+r*.5)*o,0,Math.PI*2),a.fill(),a.fillStyle=`rgb(0,0,${Math.round(105*i)})`,a.beginPath(),a.arc(s,c,n*o,0,Math.PI*2),a.fill()}text(e,t,n,r,{weight:i=`600`,family:a=`"JetBrains Mono Variable", monospace`,align:o=`left`,rot:s=0,base:c=`middle`,track:l=0,stretch:u=1}={}){let d=this.g,[f,p]=this.P(t,n);d.save(),d.translate(f,p),d.rotate(s),d.scale(1,u),d.fillStyle=`rgb(255,0,0)`,d.font=`${i} ${r*this.k}px ${a}`,d.textAlign=o,d.textBaseline=c,l&&(d.letterSpacing=`${l*this.k}px`),d.fillText(e,0,0),d.restore()}line(e,t=1.1){let n=this.g;n.strokeStyle=`rgb(255,0,0)`,n.lineWidth=t*this.k,n.lineJoin=`miter`,n.beginPath(),e.forEach(([e,t],r)=>{let[i,a]=this.P(e,t);r?n.lineTo(i,a):n.moveTo(i,a)}),n.stroke()}hazard(e,t,n,r,i=10,a=9){let o=this.g,[s,c]=this.P(e-n/2,t-r/2),l=n*this.k,u=r*this.k,d=i*this.k,f=a*this.k;o.save(),o.beginPath(),o.rect(s,c,l,u),o.rect(s+d,c+d,l-2*d,u-2*d),o.clip(`evenodd`),o.fillStyle=`rgb(255,0,0)`;for(let e=-u;e<l+u;e+=f*2)o.beginPath(),o.moveTo(s+e,c),o.lineTo(s+e+f,c),o.lineTo(s+e+f-u,c+u),o.lineTo(s+e-u,c+u),o.fill();o.restore()}path(e,t,n,r,{fill:i=!0,rot:a=0}={}){let o=this.g,[s,c]=this.P(t,n),l=r*this.k/120;o.save(),o.translate(s,c),o.rotate(a),o.scale(l,l),o.translate(-60,-60);let u=new Path2D(e);i?(o.fillStyle=`rgb(255,0,0)`,o.fill(u)):(o.strokeStyle=`rgb(255,0,0)`,o.lineWidth=1.2/l*this.k,o.stroke(u)),o.restore()}};function G(e,t){let n=[];for(let r=0;r<e.length;r++){let i=e[r],a=e[Math.max(0,r-1)],o=e[Math.min(e.length-1,r+1)],s=r>0?new k(-(i.y-a.y),i.x-a.x).normalize():null,c=r<e.length-1?new k(-(o.y-i.y),o.x-i.x).normalize():null;s||=c,c||=s;let l=s.clone().add(c).normalize(),u=1/Math.max(.35,l.dot(s));n.push(i.clone().addScaledVector(l,t*u))}return n}function ie(e,t,n=!1){let r=t[0]-e[0],i=t[1]-e[1],a=Math.abs(r),o=Math.abs(i),s=Math.sign(r),c=Math.sign(i),l=Math.min(a,o),u;return u=n?[e[0]+s*l,e[1]+c*l]:a>o?[t[0]-s*l,e[1]]:[e[0],t[1]-c*l],[e,u,t]}function ae(e){let t=[e[0]];for(let n=1;n<e.length;n++){let r=ie(e[n-1],e[n],n%2==0);t.push(r[1],r[2])}return t.filter((e,t,n)=>t===0||Math.hypot(e[0]-n[t-1][0],e[1]-n[t-1][1])>.5)}var K={uBoost:{value:0},uSpeed:{value:70}},oe=class{constructor(){this.pos=[],this.uv=[],this.ph=[],this.buses=[]}bus(e,t=8,n=4,r=1.6,{y:i=.3,power:a=!1}={}){let o=e.map(([e,t])=>new k(e,t));for(let e=0;e<t;e++){let s=(e-(t-1)/2)*n;this.ribbon(G(o,s),r,i,a?-1:V())}this.buses.push({base:o,n:t,pitch:n,width:r})}ribbon(e,t,n,r){let i=G(e,t/2),a=G(e,-t/2),o=0,s=[0];for(let t=1;t<e.length;t++)o+=e[t].distanceTo(e[t-1]),s.push(o);for(let t=0;t<e.length-1;t++){let e=i[t],c=i[t+1],l=a[t+1],u=a[t],d=s[t],f=s[t+1];for(let[t,i]of[[e,d],[c,f],[l,f],[e,d],[l,f],[u,d]])this.pos.push(t.x,n,t.y),this.uv.push(i,o),this.ph.push(r)}}mesh(t){let n=new I;n.setAttribute(`position`,new w(this.pos,3)),n.setAttribute(`uv`,new w(this.uv,2)),n.setAttribute(`phase`,new w(this.ph,1)),this.mat=new g({glslVersion:e,vertexShader:`in vec3 position; in vec2 uv; in float phase; uniform mat4 modelMatrix, viewMatrix, projectionMatrix;
        out vec2 vUv; out float vPh; out vec3 vW; out vec3 vN;
        void main(){ vUv = uv; vPh = phase; vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; vN = normalize(mat3(viewMatrix) * vec3(0.0, 1.0, 0.0)); gl_Position = projectionMatrix * viewMatrix * w; }`,fragmentShader:`precision highp float;
        ${P}
        uniform vec3 uCopper, uHot, uSignal; uniform float uStep, uSpeed, uBoost, uLitR; uniform vec2 uLitC;
        in vec2 vUv; in float vPh; in vec3 vW; in vec3 vN;
        layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
        void main(){
          vec3 c = uCopper * (0.8 + 0.2 * sin(vUv.x * 0.05 + vPh * 6.0));
          if (vPh >= 0.0) c = mix(c, uSignal * 0.5, 0.16);
          float dist = length(vW.xz - uLitC);
          float on = step(dist, uLitR);
          float front = smoothstep(26.0, 0.0, uLitR - dist) * on;
          float id = 199.0;
          if (vPh >= 0.0 && on > 0.5) {
            // packets leave the processor and run out to the districts, stepped on twos
            float cell = 90.0 + vPh * 70.0;
            float s = vUv.x - uStep * uSpeed * (0.75 + vPh * 0.7) * (1.0 + uBoost * 0.8);
            float lane = floor(s / cell), f = fract(s / cell);
            float live = step(0.45 - uBoost * 0.2, hash11(lane * 1.7 + vPh * 31.0));
            float len = 20.0 / cell;
            float pk = live * step(1.0 - len, f);
            if (pk > 0.5) { c = mix(uSignal, uHot, step(1.0 - len * 0.28, f)); id = 255.0; }
          }
          if (vPh < 0.0) c *= 1.25;
          if (front > 0.01) { c = mix(c, uHot, front); id = 255.0; }
          if (on < 0.5) c *= 0.55;
          gColor = vec4(c, 1.0);
          gNormal = vec4(normalize(vN) * 0.5 + 0.5, id / 255.0);
        }`,uniforms:{uCopper:{value:new F(t.trace)},uHot:W.uHot,uSignal:W.uSignal,uStep:x.uStep,uSpeed:K.uSpeed,uBoost:K.uBoost,uLitR:W.uLitR,uLitC:W.uLitC},side:2});let r=new o(n,this.mat);return r.frustumCulled=!1,r.renderOrder=-5,r}},se=class{constructor(e,t){this.pal=e,this.silk=t,this.group=new C,this.box=[],this.cyl=[],this.pins=[],this.tops=[]}chip(e,t,n,r,i=4,{color:a=this.pal.ic,pins:o=!0,pitch:s=3.2,label:c=``,ao:l=!0}={}){if(this.box.push({p:z(e,i/2,t),s:z(n,i,r),c:a}),this.silk&&(this.silk.footprint(e,t,n+(o?5:0),r+(o?5:0),3),l&&this.silk.ao(e,t,n+4,r+4,4,.75),c&&this.silk.text(c,e-n/2-4,t+r/2+10,6)),o)for(let i of[0,1,2,3]){let a=i%2?r:n,o=Math.max(2,Math.floor((a-6)/s));for(let s=0;s<o;s++){let c=-a/2+3+(s+.5)*((a-6)/o),l=(i%2?n:r)/2+1.3,u=i%2?i===1?l:-l:c,d=i%2?c:i===0?-l:l;this.pins.push({p:z(e+u,.55,t+d),s:i%2?z(2.8,1.1,1.1):z(1.1,1.1,2.8)}),this.silk&&this.silk.pad(e+u+(i%2?i===1?.8:-.8:0),t+d+(i%2?0:i===0?-.8:.8),i%2?3.6:1.5,i%2?1.5:3.6)}}}passive(e,t,n=4,r=2,i=1.6,a){this.box.push({p:z(e,i/2,t),s:z(n,i,r),c:a??(V()<.62?this.pal.mlcc:this.pal.res)}),this.silk&&(n>=r?(this.silk.pad(e-n/2-.4,t,1.4,r+.4),this.silk.pad(e+n/2+.4,t,1.4,r+.4)):(this.silk.pad(e,t-r/2-.4,n+.4,1.4),this.silk.pad(e,t+r/2+.4,n+.4,1.4)))}can(e,t,n=8,r=22,i=this.pal.can,a=this.pal.canTop){this.cyl.push({p:z(e,r/2,t),s:z(n,r,n),c:i}),this.tops.push({p:z(e,r+.35,t),s:z(n*.88,.7,n*.88),c:a}),this.silk&&(this.silk.aoDisc(e,t,n+2,4,.8),this.silk.ring(e,t,n+1.2,n+2.6))}box3(e,t,n,r,i,a,o){this.box.push({p:z(e,t+i/2,n),s:z(r,i,a),c:o})}sprinkle(e,t,n,r,i,a=10,o=26){for(let s=0;s<i;s++){let i=Math.floor(V()*4),s=V()-.5,c=a+V()*o,l=i%2?e+(i===1?1:-1)*(n/2+c):e+s*(n+o),u=i%2?t+s*(r+o):t+(i===0?-1:1)*(r/2+c),d=V()<.5,f=V()<.8?1:1.6;this.passive(l,u,(d?2.2:4.2)*f,(d?4.2:2.2)*f,1.6*f)}}row(e,t,n,r,i,a=`cap`,o={}){for(let s=0;s<i;s++){let c=i===1?.5:s/(i-1),l=e+(n-e)*c,u=t+(r-t)*c;a===`can`?this.can(l,u,o.r??6+V()*2,o.h??18+V()*8,o.color,o.top):this.passive(l,u,o.w??4.4,o.d??2.2,o.h??1.8)}}build(){let e=new m,t=new _,n=new F,r=(r,i,a)=>{if(!r.length)return null;let o=new l(i,a,r.length);return r.forEach((r,i)=>{e.compose(r.p,t.identity(),r.s),o.setMatrixAt(i,e),r.c&&o.setColorAt(i,n.set(r.c))}),o.instanceColor&&(o.instanceColor.needsUpdate=!0),o.frustumCulled=!1,this.group.add(o),o},a=this.pal;return r(this.box,new L(1,1,1),R({base:a.ic,brush:.12,spec:.55,rim:.9,instanced:!0,instanceColor:!0,dotCell:4.5})),r(this.cyl,new i(1,1,1,22),R({base:a.can,brush:.12,spec:.9,rim:1,instanced:!0,instanceColor:!0,dotCell:4.5})),r(this.tops,new i(1,1,1,22),R({base:a.canTop,brush:.1,spec:1,rim:.6,instanced:!0,instanceColor:!0})),r(this.pins,new L(1,1,1),R({base:a.pin,brush:.1,spec:1,rim:.5,instanced:!0})),this.group}};function q(e){let n=[],i=[],a=[],o=new L(1,1,1).toNonIndexed(),s=o.attributes.position.array,c=o.attributes.normal.array,l=o.attributes.uv.array,u=new m,d=new _,f=new M,p=new M,h=new t;for(let t of e){d.setFromEuler(new r(...t.r??[0,0,0])),u.compose(z(...t.p),d,z(...t.s)),h.getNormalMatrix(u);for(let e=0;e<s.length;e+=3)f.set(s[e],s[e+1],s[e+2]).applyMatrix4(u),n.push(f.x,f.y,f.z),p.set(c[e],c[e+1],c[e+2]).applyMatrix3(h).normalize(),i.push(p.x,p.y,p.z);for(let e=0;e<l.length;e++)a.push(l[e])}let g=new I;return g.setAttribute(`position`,new w(n,3)),g.setAttribute(`normal`,new w(i,3)),g.setAttribute(`uv`,new w(a,2)),g}function J(e,t,n){let r=document.createElement(`canvas`);r.width=e,r.height=t;let i=r.getContext(`2d`);n(i,e,t);let a=new p(r);return a.colorSpace=``,a.anisotropy=8,a.userData={redraw:()=>{i.clearRect(0,0,e,t),n(i,e,t),a.needsUpdate=!0}},a}function ce(e,t,n,{emissive:r=!1,res:i=512,bloom:a=!0,id:s}={}){let c=J(i,Math.max(8,Math.round(t/e*i)),n),l=R({base:`#ffffff`,map:c,mapAmt:1,emissive:r,bloom:a,spec:0,rim:0,brush:.05,id:s}),u=new o(new j(e,t),l);return u.userData.redraw=c.userData.redraw,u}function le({color:t=`#ffffff`,vertex:n,fragment:r,uniforms:i={},side:a=2}={}){return new g({glslVersion:e,vertexShader:n,fragmentShader:r,uniforms:{uColor:{value:new F(t)},...i},transparent:!0,depthWrite:!1,side:a,blending:5,blendEquation:100,blendSrc:204,blendDst:201,blendSrcAlpha:200,blendDstAlpha:201})}var Y=e=>E({brushScale:.07,dotCell:4.5,...e}),X={cx:-80,cz:-120,finY0:200,finY1:770,depth:150,width:432,fanR:200};function Z(e,t=!1){let n=[];for(let r of e.split(`M`).filter(e=>e.trim())){let e=r.replace(/Z/g,``).trim().split(/\s*L\s*|\s+/).map(e=>e.split(`,`).map(Number)).filter(e=>e.length===2&&!isNaN(e[0]));e.length<3||n.push(new d(e.map(([e,n])=>new k(e-60,t?60-n:n-60))))}return n}function Q(e,t,n,r=3){let i=new C,a=e/104;return[[N,n,r*.7],[D,t,r]].forEach(([e,t,n])=>{Z(e,!0).forEach(e=>i.add(new o(new u(e,{depth:n,bevelEnabled:!1}),t)))}),i.scale.setScalar(a),i}function ue(t){return new g({glslVersion:e,vertexShader:`in vec3 position; in vec3 normal; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; out vec3 vW; out vec3 vN; out vec3 vV;
      void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; vec4 mv = viewMatrix * w; vV = mv.xyz; vN = normalize(mat3(viewMatrix) * mat3(modelMatrix) * normal); gl_Position = projectionMatrix * mv; }`,fragmentShader:`precision highp float;
      uniform vec3 uBase, uShade, uHeat, uHot, uKeyDir, uRim, uGlint; uniform float uStep, uOn, uId, uTop;
      in vec3 vW; in vec3 vN; in vec3 vV;
      layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){
        vec3 N = normalize(vN); if (!gl_FrontFacing) N = -N;
        vec3 V = normalize(-vV), L = normalize(uKeyDir);
        float ndl = dot(N, L);
        vec3 c = ndl > 0.3 ? uBase : (ndl > -0.06 ? mix(uBase, uShade, 0.4) : mix(uBase, uShade, 0.74));
        c = mix(c, uGlint, step(0.55, pow(max(dot(reflect(-L, N), V), 0.0), 28.0)));
        c = mix(c, uRim, step(0.45, pow(1.0 - max(dot(N, V), 0.0), 2.4)) * step(ndl, 0.15));
        float heat = smoothstep(uTop, 26.0, vW.y) * uOn;
        float pulse = step(0.8, fract(vW.y / 64.0 - uStep * 0.9));
        c = mix(c, mix(uHeat, uHot, pulse * 0.7), clamp(heat * (0.8 + 0.2 * pulse), 0.0, 1.0));
        float id = heat > 0.55 ? 255.0 : uId;
        gColor = vec4(c, 1.0);
        gNormal = vec4(N * 0.5 + 0.5, id / 255.0);
      }`,uniforms:{uBase:{value:new F(t.copperPipe)},uShade:x.uShadeTint,uHeat:{value:new F(t.heat)},uHot:{value:new F(t.heatHot)},uKeyDir:x.uKeyDir,uRim:x.uRimCol,uGlint:x.uGlint,uStep:x.uStep,uOn:{value:1},uId:{value:177},uTop:{value:230}}})}function de(t){return new g({glslVersion:e,vertexShader:`in vec3 position; in vec3 normal; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; out vec3 vW; out vec3 vN;
      void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; vN = normalize(mat3(viewMatrix) * mat3(modelMatrix) * normal); gl_Position = projectionMatrix * viewMatrix * w; }`,fragmentShader:`precision highp float;
      uniform vec3 uBase, uHot; uniform float uLitY, uStep;
      in vec3 vW; in vec3 vN;
      layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){
        float on = step(vW.y, uLitY);
        float fl = 0.7 + 0.3 * step(0.5, fract(vW.y * 0.13 + vW.z * 0.004 + uStep * 0.15));
        vec3 c = mix(uBase * 0.06, uBase * fl, on);
        c = mix(c, uHot, on * step(uLitY - 16.0, vW.y));
        gColor = vec4(c, 1.0);
        gNormal = vec4(normalize(vN) * 0.5 + 0.5, 255.0 / 255.0);
      }`,uniforms:{uBase:{value:new F(t.signal)},uHot:{value:new F(t.hot)},uLitY:{value:1e5},uStep:x.uStep}})}function fe(t,n){return new g({glslVersion:e,vertexShader:`in vec3 position; in vec3 normal; in vec2 uv; uniform mat4 modelMatrix, viewMatrix, projectionMatrix;
      out vec2 vUv; out vec3 vN;
      void main(){ vUv = uv; vN = normalize(mat3(viewMatrix) * mat3(modelMatrix) * normal); gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); }`,fragmentShader:`precision highp float;
      uniform vec3 uBase, uHot; uniform float uStep, uOn, uId;
      in vec2 vUv; in vec3 vN;
      layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){
        float a = fract(vUv.x * 2.0 - uStep * 0.35);
        float seg = smoothstep(0.0, 0.08, a) * (1.0 - smoothstep(0.08, 0.42, a));
        vec3 c = mix(uBase * 0.75, uHot, seg) * uOn + uBase * 0.06 * (1.0 - uOn);
        gColor = vec4(c, 1.0);
        gNormal = vec4(normalize(vN) * 0.5 + 0.5, uId / 255.0);
      }`,uniforms:{uBase:{value:new F(t)},uHot:{value:new F(n)},uStep:x.uStep,uOn:{value:1},uId:{value:A()}}})}function pe(e,t){let r=X,{cx:a,cz:s}=r,c=new C,l=Y({base:e.steel,brush:.15,spec:.9,rim:1}),f=Y({base:e.nickel,brush:.12,spec:1,rim:1,dotCell:4.5}),p=ue(e),m=Y({base:e.anod,brush:.15,spec:.7,rim:1}),g=(e,t,n,r,i,a,s)=>{let l=new o(new L(e,t,n),s);return l.position.set(r,i+t/2,a),c.add(l),l};g(300,9,32,a,0,s-134,l),g(300,9,32,a,0,s+134,l),g(32,9,236,a-134,0,s,l),g(32,9,236,a+134,0,s,l),g(5,5,270,a+162,6,s,l),g(5,5,26,a+162,6,s+146,l),g(14,12,14,a+162,0,s-138,l),g(232,3,232,a,0,s,Y({base:e.substrate,brush:.15,spec:.4,rim:.6})),g(172,10,172,a,3,s,f),g(150,26,150,a,13,s,p),g(176,12,176,a,39,s,f),g(34,8,380,a,51,s,l);for(let e of[-1,1]){let t=new o(new i(9,9,59,16),l);t.position.set(a,29.5,s+e*180),c.add(t);let n=new o(new i(12,12,6,16),f);n.position.set(a,62,s+e*180),c.add(n)}for(let[e,t]of[[-38,150],[0,196],[38,98]]){let r=[],i=s-t,l=s+t,u=(t,n,i,o)=>{for(let s=0;s<=8;s++){let c=i+(o-i)*(s/8);r.push(z(a+e,n+Math.sin(c)*34,t+Math.cos(c)*34))}};for(let t=794;t>64;t-=40)r.push(z(a+e,t,i));u(i+34,64,Math.PI,Math.PI*1.5);for(let t=i+34+30;t<l-34-10;t+=30)r.push(z(a+e,30,t));u(l-34,64,Math.PI*1.5,Math.PI*2);for(let t=104;t<=794;t+=40)r.push(z(a+e,t,l));let d=new n(r,!1,`centripetal`,.1),m=new o(new S(d,220,6,12,!1),p);c.add(m);for(let t of[i,l]){let n=new o(new ee(6,12,6,0,Math.PI*2,0,Math.PI/2),f);n.position.set(a+e,794,t),c.add(n)}}let _=[];for(let e=r.finY0;e<=r.finY1-7;e+=7.5)_.push({p:[a,e,s],s:[r.depth,1.6,r.width]});let v=new o(q(_),Y({base:e.fin,brush:.1,spec:1,rim:1,mid:.36,dark:.7,dotCell:4.5}));c.add(v);for(let e of[-1,1])for(let t of[-1,1])g(5,r.finY1-r.finY0+6,5,a+e*(r.depth/2+1),r.finY0-4,s+t*(r.width/2+1),m);let y=[];for(let e=0,t=r.finY0;t<=r.finY1-7;t+=7.5,e++){if(e%5!=2||t>620)continue;let n=r.depth*(.35+e*37%10/16),i=a-r.depth/2+e*53%7*6;y.push({p:[Math.min(i+n/2,a+r.depth/2-n/2),t+.2,s+r.width/2+.6],s:[n,1.4,1.4]}),e%2&&y.push({p:[a-r.depth/2+.6,t+.2,s+r.width/2-40-e%7*30],s:[1.4,1.4,60+e%3*40]})}let b=new o(q(y),de(e));c.add(b),g(164,12,446,a,772,s,m),g(150,4,432,a,784,s,Y({base:e.anod2,brush:.12,spec:.8,rim:1}));let x=Y({base:e.signal,emissive:!0}),w=Y({base:e.markBack,emissive:!0}),T=Q(120,x,w,2.5);T.rotation.x=-Math.PI/2,T.position.set(a,788,s),c.add(T),g(156,152,8,a,634,s+r.width/2+4+4,m);let E=Q(104,x,w,3.5);E.position.set(a,712,s+r.width/2+12.2),c.add(E);let D=Y({base:e.signal,emissive:!0});for(let[e,t,n,i]of[[140,2.4,0,644],[140,2.4,0,778],[2.4,136,-69,643],[2.4,136,69,643]])g(e,t,2,a+n,i,s+r.width/2+12.6,D);let k=a+r.depth/2+1,A=(r.finY0+r.finY1)/2,j=new d;j.moveTo(-186,-216),j.lineTo(186,-216),j.quadraticCurveTo(216,-216,216,-186),j.lineTo(216,186),j.quadraticCurveTo(216,216,186,216),j.lineTo(-186,216),j.quadraticCurveTo(-216,216,-216,186),j.lineTo(-216,-186),j.quadraticCurveTo(-216,-216,-186,-216);let M=new h;M.absarc(0,0,r.fanR,0,Math.PI*2,!0),j.holes.push(M);let N=new u(j,{depth:26,bevelEnabled:!1,curveSegments:48}),P=new C;P.position.set(k,A,s),P.rotation.y=Math.PI/2,c.add(P),P.add(new o(N,Y({base:e.fanFrame,brush:.15,spec:.6,rim:1})));let F=new C;F.position.z=14,P.add(F);let I=new o(new i(60,64,22,32),Y({base:e.fanFrame,brush:.12,spec:.8,rim:1}));I.rotation.x=Math.PI/2,F.add(I);let R=new o(new i(40,40,2,32),Y({base:e.anod2,spec:1,rim:1}));R.rotation.x=Math.PI/2,R.position.z=12,F.add(R);let B=Y({base:e.blade,brush:.15,spec:.9,rim:1,side:2});for(let e=0;e<7;e++){let t=new d,n=-.28,r=.34;t.moveTo(Math.cos(n)*58,Math.sin(n)*58),t.quadraticCurveTo(Math.cos(-.15200000000000002)*252*.5,Math.sin(-.15200000000000002)*252*.5,Math.cos(.03999999999999998)*194,Math.sin(.03999999999999998)*194),t.quadraticCurveTo(Math.cos(.382)*200,Math.sin(.382)*200,Math.cos(.66)*194,Math.sin(.66)*194),t.quadraticCurveTo(Math.cos(.468)*252*.5,Math.sin(.468)*252*.5,Math.cos(r)*58,Math.sin(r)*58),t.lineTo(Math.cos(n)*58,Math.sin(n)*58);let i=new u(t,{depth:2.5,bevelEnabled:!1,curveSegments:10}),a=new o(i,B),s=new C;s.rotation.z=e/7*Math.PI*2,s.add(a),a.rotation.x=.42,F.add(s)}for(let t=0;t<4;t++){let n=new o(new L(8,150,6),Y({base:e.fanFrame,brush:.15,spec:.5}));n.position.set(Math.cos(t*Math.PI/2+.6)*128,Math.sin(t*Math.PI/2+.6)*128,3),n.rotation.z=t*Math.PI/2+.6+Math.PI/2,P.add(n)}let V=fe(e.signal,e.hot),H=new o(new O(r.fanR+1,3.2,8,96),V);H.position.z=27,P.add(H);let U=new o(new O(r.fanR+1,2.2,6,96),V);if(U.position.z=-1,P.add(U),t){t.ao(a,s,310,310,10,.9);for(let e of[-1,1])t.aoDisc(a,s+e*180,16,6,.9);for(let[e,n]of[[-170,-170],[170,-170],[170,170],[-170,170]])t.ring(a+e,s+n,7,12),t.text(`○`,a+e,s+n,4);t.rect(a,s,316,316,1.4),t.text(`CPU1`,a-158,s-168,12,{weight:`700`}),t.text(`演算`,a-150,s+228,52,{weight:`700`,family:`"Zen Kaku Gothic New", sans-serif`,base:`alphabetic`}),t.text(`COMPUTE`,a-28,s+222,24,{weight:`700`,family:`"Chakra Petch", sans-serif`,base:`alphabetic`,track:2}),t.text(`SOCKET XN-01 · 4 HEAT PIPES · 76 FINS`,a-28,s+236,6.5),t.text(`注意 高温  CAUTION HOT SURFACE`,a+30,s-160,6),t.line([[a-160,s+250],[a+160,s+250]],1.4)}return{group:c,update:e=>{let t=Math.floor(e*12)/12;F.rotation.z=-t*2.6},ringMat:V,heatMat:p,floorMat:b.material,fan:P,crownPos:z(a,712,s+r.width/2+12),topPos:z(a,790,s),front:x,back:w,lineMat:D}}var $=(e,t,n)=>new M(e,t,n),me=class{constructor(e=.5,t=0){this.rt=new T(1,1,{type:y,minFilter:c,magFilter:c,depthBuffer:!0}),this.cam=new a,this.scale=e,this.plane=new s,this.clip=new b,this.q=new b,this.texMat=new m,this.n=$(0,1,0),this.o=$(0,t,0),this.clipY=t+.8,this.rot=new m,this.cp=$(0,0,0),this.la=$(0,0,0),this.tg=$(0,0,0)}setSize(e,t){this.rt.setSize(Math.max(1,Math.round(e*this.scale)),Math.max(1,Math.round(t*this.scale)))}render(e,t,n,r,i){let{n:a,o,cp:s,la:c,tg:l}=this,u=this.cam;s.setFromMatrixPosition(n.matrixWorld);let d=o.clone().sub(s);if(d.dot(a)>0)return!1;d.reflect(a).negate().add(o),this.rot.extractRotation(n.matrixWorld),c.set(0,0,-1).applyMatrix4(this.rot).add(s),l.copy(o).sub(c).reflect(a).negate().add(o),u.position.copy(d),u.up.set(0,1,0).applyMatrix4(this.rot).reflect(a),u.lookAt(l),u.far=n.far,u.near=n.near,u.updateMatrixWorld(),u.projectionMatrix.copy(n.projectionMatrix),this.texMat.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),this.texMat.multiply(u.projectionMatrix).multiply(u.matrixWorldInverse),this.plane.setFromNormalAndCoplanarPoint(a,$(0,this.clipY,0)).applyMatrix4(u.matrixWorldInverse);let f=this.clip.set(this.plane.normal.x,this.plane.normal.y,this.plane.normal.z,this.plane.constant),p=u.projectionMatrix.elements,m=this.q;return m.x=(Math.sign(f.x)+p[8])/p[0],m.y=(Math.sign(f.y)+p[9])/p[5],m.z=-1,m.w=(1+p[10])/p[14],f.multiplyScalar(2/f.dot(m)),p[2]=f.x,p[6]=f.y,p[10]=f.z+1,p[14]=f.w,r.forEach(e=>{e.visible=!1}),e.setRenderTarget(this.rt),e.setClearColor(i,1),e.clear(!0,!0,!0),e.render(t,u),r.forEach(e=>{e.visible=!0}),e.setRenderTarget(null),!0}};export{H as _,Z as a,K as b,re as c,ne as d,W as f,q as g,le as h,Q as i,oe as l,ce as m,X as n,U as o,J as p,pe as r,se as s,me as t,z as u,V as v,ae as y};