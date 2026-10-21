(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=1e3,t=1001,n=1002,r=1003,i=1004,a=1005,o=1006,s=1007,c=1008,l=1009,u=1010,d=1011,f=1012,p=1013,m=1014,h=1015,g=1016,_=1017,v=1018,y=1020,b=35902,x=35899,S=1021,C=1022,w=1023,T=1026,E=1027,D=1028,O=1029,k=1030,A=1031,j=1033,M=33776,N=33777,P=33778,F=33779,I=35840,ee=35841,L=35842,te=35843,ne=36196,re=37492,ie=37496,ae=37488,R=37489,oe=37490,se=37491,ce=37808,le=37809,ue=37810,de=37811,fe=37812,pe=37813,me=37814,he=37815,ge=37816,_e=37817,ve=37818,ye=37819,be=37820,xe=37821,Se=36492,Ce=36494,we=36495,Te=36283,Ee=36284,De=36285,Oe=36286,ke=2300,z=2301,Ae=2302,je=2303,Me=2400,B=2401,Ne=2402,V=3200,Pe=`srgb`,Fe=`srgb-linear`,Ie=`linear`,Le=`srgb`,Re=7680,ze=35044,Be=`300 es`,Ve=2e3;function He(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Ue(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function We(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function Ge(){let e=We(`canvas`);return e.style.display=`block`,e}var Ke={};function qe(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function Je(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function H(...e){e=Je(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function U(...e){e=Je(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Ye(...e){let t=e.join(` `);t in Ke||(Ke[t]=!0,H(...e))}function Xe(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var Ze={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},Qe=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},$e=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),et=1234567,tt=Math.PI/180,nt=180/Math.PI;function rt(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return($e[e&255]+$e[e>>8&255]+$e[e>>16&255]+$e[e>>24&255]+`-`+$e[t&255]+$e[t>>8&255]+`-`+$e[t>>16&15|64]+$e[t>>24&255]+`-`+$e[n&63|128]+$e[n>>8&255]+`-`+$e[n>>16&255]+$e[n>>24&255]+$e[r&255]+$e[r>>8&255]+$e[r>>16&255]+$e[r>>24&255]).toLowerCase()}function W(e,t,n){return Math.max(t,Math.min(n,e))}function it(e,t){return(e%t+t)%t}function at(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function ot(e,t,n){return e===t?0:(n-e)/(t-e)}function st(e,t,n){return(1-n)*e+n*t}function ct(e,t,n,r){return st(e,t,1-Math.exp(-n*r))}function lt(e,t=1){return t-Math.abs(it(e,t*2)-t)}function ut(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function dt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function ft(e,t){return e+Math.floor(Math.random()*(t-e+1))}function pt(e,t){return e+Math.random()*(t-e)}function mt(e){return e*(.5-Math.random())}function ht(e){e!==void 0&&(et=e);let t=et+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function gt(e){return e*tt}function _t(e){return e*nt}function vt(e){return e>0&&Number.isInteger(e)&&2**Math.round(Math.log2(e))===e}function yt(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function bt(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function xt(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:H(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function St(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function Ct(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var wt={DEG2RAD:tt,RAD2DEG:nt,generateUUID:rt,clamp:W,euclideanModulo:it,mapLinear:at,inverseLerp:ot,lerp:st,damp:ct,pingpong:lt,smoothstep:ut,smootherstep:dt,randInt:ft,randFloat:pt,randFloatSpread:mt,seededRandom:ht,degToRad:gt,radToDeg:_t,isPowerOfTwo:vt,ceilPowerOfTwo:yt,floorPowerOfTwo:bt,setQuaternionFromProperEuler:xt,normalize:Ct,denormalize:St},G=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=W(this.x,e.x,t.x),this.y=W(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=W(this.x,e,t),this.y=W(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(W(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(W(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Tt=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:H(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(W(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},K=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Dt.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Dt.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=W(this.x,e.x,t.x),this.y=W(this.y,e.y,t.y),this.z=W(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=W(this.x,e,t),this.y=W(this.y,e,t),this.z=W(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(W(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Et.copy(this).projectOnVector(e),this.sub(Et)}reflect(e){return this.sub(Et.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(W(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Et=new K,Dt=new Tt,Ot=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return Ye(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(kt.makeScale(e,t)),this}rotate(e){return Ye(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(kt.makeRotation(-e)),this}translate(e,t){return Ye(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(kt.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},kt=new Ot,At=new Ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),jt=new Ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Mt(){let e={enabled:!0,workingColorSpace:Fe,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=Pt(e.r),e.g=Pt(e.g),e.b=Pt(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Ft(e.r),e.g=Ft(e.g),e.b=Ft(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Ie:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return Ye(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return Ye(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[Fe]:{primaries:t,whitePoint:r,transfer:Ie,toXYZ:At,fromXYZ:jt,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Pe},outputColorSpaceConfig:{drawingBufferColorSpace:Pe}},[Pe]:{primaries:t,whitePoint:r,transfer:Le,toXYZ:At,fromXYZ:jt,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Pe}}}),e}var Nt=Mt();function Pt(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Ft(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var It,Lt=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{It===void 0&&(It=We(`canvas`)),It.width=e.width,It.height=e.height;let t=It.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=It}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=We(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Pt(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Pt(t[e]/255)*255):t[e]=Pt(t[e]);return{data:t,width:e.width,height:e.height}}return H(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Rt=0,zt=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Rt++}),this.uuid=rt(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Bt(r[t].image)):e.push(Bt(r[t]))}else e=Bt(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Bt(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Lt.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(H(`Texture: Unable to serialize Texture.`),{})}var Vt=0,Ht=new K,Ut=class r extends Qe{constructor(e=r.DEFAULT_IMAGE,n=r.DEFAULT_MAPPING,i=t,a=t,s=o,u=c,d=w,f=l,p=r.DEFAULT_ANISOTROPY,m=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Vt++}),this.uuid=rt(),this.name=``,this.source=new zt(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=s,this.minFilter=u,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=f,this.offset=new G(0,0),this.repeat=new G(1,1),this.center=new G(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=m,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ht).x}get height(){return this.source.getSize(Ht).y}get depth(){return this.source.getSize(Ht).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){H(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?H(`Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(r){if(this.mapping!==300)return r;if(r.applyMatrix3(this.matrix),r.x<0||r.x>1)switch(this.wrapS){case e:r.x-=Math.floor(r.x);break;case t:r.x=r.x<0?0:1;break;case n:Math.abs(Math.floor(r.x)%2)===1?r.x=Math.ceil(r.x)-r.x:r.x-=Math.floor(r.x)}if(r.y<0||r.y>1)switch(this.wrapT){case e:r.y-=Math.floor(r.y);break;case t:r.y=r.y<0?0:1;break;case n:Math.abs(Math.floor(r.y)%2)===1?r.y=Math.ceil(r.y)-r.y:r.y-=Math.floor(r.y)}return this.flipY&&(r.y=1-r.y),r}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Ut.DEFAULT_IMAGE=null,Ut.DEFAULT_MAPPING=300,Ut.DEFAULT_ANISOTROPY=1;var Wt=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=W(this.x,e.x,t.x),this.y=W(this.y,e.y,t.y),this.z=W(this.z,e.z,t.z),this.w=W(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=W(this.x,e,t),this.y=W(this.y,e,t),this.z=W(this.z,e,t),this.w=W(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(W(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Gt=class extends Qe{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:o,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Wt(0,0,e,t),this.scissorTest=!1,this.viewport=new Wt(0,0,e,t),this.textures=[];let r=new Ut({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:o,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new zt(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},Kt=class extends Gt{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},qt=class extends Ut{constructor(e=null,n=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=r,this.minFilter=r,this.wrapR=t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Jt=class extends Ut{constructor(e=null,n=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=r,this.minFilter=r,this.wrapR=t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},q=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/Yt.setFromMatrixColumn(e,0).length(),i=1/Yt.setFromMatrixColumn(e,1).length(),a=1/Yt.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Zt,e,Qt)}lookAt(e,t,n){let r=this.elements;return tn.subVectors(e,t),tn.lengthSq()===0&&(tn.z=1),tn.normalize(),$t.crossVectors(n,tn),$t.lengthSq()===0&&(Math.abs(n.z)===1?tn.x+=1e-4:tn.z+=1e-4,tn.normalize(),$t.crossVectors(n,tn)),$t.normalize(),en.crossVectors(tn,$t),r[0]=$t.x,r[4]=en.x,r[8]=tn.x,r[1]=$t.y,r[5]=en.y,r[9]=tn.y,r[2]=$t.z,r[6]=en.z,r[10]=tn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],N=r[3],P=r[7],F=r[11],I=r[15];return i[0]=a*x+o*T+s*k+c*N,i[4]=a*S+o*E+s*A+c*P,i[8]=a*C+o*D+s*j+c*F,i[12]=a*w+o*O+s*M+c*I,i[1]=l*x+u*T+d*k+f*N,i[5]=l*S+u*E+d*A+f*P,i[9]=l*C+u*D+d*j+f*F,i[13]=l*w+u*O+d*M+f*I,i[2]=p*x+m*T+h*k+g*N,i[6]=p*S+m*E+h*A+g*P,i[10]=p*C+m*D+h*j+g*F,i[14]=p*w+m*O+h*M+g*I,i[3]=_*x+v*T+y*k+b*N,i[7]=_*S+v*E+y*A+b*P,i[11]=_*C+v*D+y*j+b*F,i[15]=_*w+v*O+y*M+b*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=Yt.set(r[0],r[1],r[2]).length(),o=Yt.set(r[4],r[5],r[6]).length(),s=Yt.set(r[8],r[9],r[10]).length();i<0&&(a=-a),Xt.copy(this);let c=1/a,l=1/o,u=1/s;return Xt.elements[0]*=c,Xt.elements[1]*=c,Xt.elements[2]*=c,Xt.elements[4]*=l,Xt.elements[5]*=l,Xt.elements[6]*=l,Xt.elements[8]*=u,Xt.elements[9]*=u,Xt.elements[10]*=u,t.setFromRotationMatrix(Xt),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=Ve,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Ve,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Yt=new K,Xt=new q,Zt=new K(0,0,0),Qt=new K(1,1,1),$t=new K,en=new K,tn=new K,nn=new q,rn=new Tt,an=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(W(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-W(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(W(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-W(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(W(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-W(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:H(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return nn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(nn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return rn.setFromEuler(this),this.setFromQuaternion(rn,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};an.DEFAULT_ORDER=`XYZ`;var on=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},sn=0,cn=new K,ln=new Tt,un=new q,dn=new K,fn=new K,pn=new K,mn=new Tt,hn=new K(1,0,0),gn=new K(0,1,0),_n=new K(0,0,1),vn={type:`added`},yn={type:`removed`},bn={type:`childadded`,child:null},xn={type:`childremoved`,child:null},Sn=class e extends Qe{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:sn++}),this.uuid=rt(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new K,n=new an,r=new Tt,i=new K(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new q},normalMatrix:{value:new Ot}}),this.matrix=new q,this.matrixWorld=new q,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new on,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ln.setFromAxisAngle(e,t),this.quaternion.multiply(ln),this}rotateOnWorldAxis(e,t){return ln.setFromAxisAngle(e,t),this.quaternion.premultiply(ln),this}rotateX(e){return this.rotateOnAxis(hn,e)}rotateY(e){return this.rotateOnAxis(gn,e)}rotateZ(e){return this.rotateOnAxis(_n,e)}translateOnAxis(e,t){return cn.copy(e).applyQuaternion(this.quaternion),this.position.add(cn.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(hn,e)}translateY(e){return this.translateOnAxis(gn,e)}translateZ(e){return this.translateOnAxis(_n,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(un.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?dn.copy(e):dn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),fn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?un.lookAt(fn,dn,this.up):un.lookAt(dn,fn,this.up),this.quaternion.setFromRotationMatrix(un),r&&(un.extractRotation(r.matrixWorld),ln.setFromRotationMatrix(un),this.quaternion.premultiply(ln.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(U(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(vn),bn.child=e,this.dispatchEvent(bn),bn.child=null):U(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(yn),xn.child=e,this.dispatchEvent(xn),xn.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),un.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),un.multiply(e.parent.matrixWorld)),e.applyMatrix4(un),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(vn),bn.child=e,this.dispatchEvent(bn),bn.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fn,e,pn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fn,mn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};Sn.DEFAULT_UP=new K(0,1,0),Sn.DEFAULT_MATRIX_AUTO_UPDATE=!0,Sn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Cn=class extends Sn{constructor(){super(),this.isGroup=!0,this.type=`Group`}},wn={type:`move`},Tn=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Cn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Cn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new K,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new K),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Cn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new K,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new K,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(wn)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Cn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},En={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Dn={h:0,s:0,l:0},On={h:0,s:0,l:0};function kn(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var J=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Pe){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Nt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Nt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Nt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Nt.workingColorSpace){if(e=it(e,1),t=W(t,0,1),n=W(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=kn(i,r,e+1/3),this.g=kn(i,r,e),this.b=kn(i,r,e-1/3)}return Nt.colorSpaceToWorking(this,r),this}setStyle(e,t=Pe){function n(t){t!==void 0&&parseFloat(t)<1&&H(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:H(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);H(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Pe){let n=En[e.toLowerCase()];return n===void 0?H(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Pt(e.r),this.g=Pt(e.g),this.b=Pt(e.b),this}copyLinearToSRGB(e){return this.r=Ft(e.r),this.g=Ft(e.g),this.b=Ft(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Pe){return Nt.workingToColorSpace(An.copy(this),e),Math.round(W(An.r*255,0,255))*65536+Math.round(W(An.g*255,0,255))*256+Math.round(W(An.b*255,0,255))}getHexString(e=Pe){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Nt.workingColorSpace){Nt.workingToColorSpace(An.copy(this),t);let n=An.r,r=An.g,i=An.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Nt.workingColorSpace){return Nt.workingToColorSpace(An.copy(this),t),e.r=An.r,e.g=An.g,e.b=An.b,e}getStyle(e=Pe){Nt.workingToColorSpace(An.copy(this),e);let t=An.r,n=An.g,r=An.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Dn),this.setHSL(Dn.h+e,Dn.s+t,Dn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Dn),e.getHSL(On);let n=st(Dn.h,On.h,t),r=st(Dn.s,On.s,t),i=st(Dn.l,On.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},An=new J;J.NAMES=En;var jn=class extends Sn{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new an,this.environmentIntensity=1,this.environmentRotation=new an,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Mn=new K,Nn=new K,Pn=new K,Fn=new K,In=new K,Ln=new K,Rn=new K,zn=new K,Bn=new K,Vn=new K,Hn=new Wt,Un=new Wt,Wn=new Wt,Gn=class e{constructor(e=new K,t=new K,n=new K){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Mn.subVectors(e,t),r.cross(Mn);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Mn.subVectors(r,t),Nn.subVectors(n,t),Pn.subVectors(e,t);let a=Mn.dot(Mn),o=Mn.dot(Nn),s=Mn.dot(Pn),c=Nn.dot(Nn),l=Nn.dot(Pn),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Fn)!==null&&Fn.x>=0&&Fn.y>=0&&Fn.x+Fn.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Fn)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Fn.x),s.addScaledVector(a,Fn.y),s.addScaledVector(o,Fn.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Hn.setScalar(0),Un.setScalar(0),Wn.setScalar(0),Hn.fromBufferAttribute(e,t),Un.fromBufferAttribute(e,n),Wn.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Hn,i.x),a.addScaledVector(Un,i.y),a.addScaledVector(Wn,i.z),a}static isFrontFacing(e,t,n,r){return Mn.subVectors(n,t),Nn.subVectors(e,t),Mn.cross(Nn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Mn.subVectors(this.c,this.b),Nn.subVectors(this.a,this.b),Mn.cross(Nn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;In.subVectors(r,n),Ln.subVectors(i,n),zn.subVectors(e,n);let s=In.dot(zn),c=Ln.dot(zn);if(s<=0&&c<=0)return t.copy(n);Bn.subVectors(e,r);let l=In.dot(Bn),u=Ln.dot(Bn);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(In,a);Vn.subVectors(e,i);let f=In.dot(Vn),p=Ln.dot(Vn);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Ln,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Rn.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Rn,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(In,a).addScaledVector(Ln,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Kn=class{constructor(e=new K(1/0,1/0,1/0),t=new K(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Jn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Jn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Jn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Jn):Jn.fromBufferAttribute(r,t),Jn.applyMatrix4(e.matrixWorld),this.expandByPoint(Jn);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),Yn.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),Yn.copy(e.boundingBox)),Yn.applyMatrix4(e.matrixWorld),this.union(Yn)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Jn),Jn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(nr),rr.subVectors(this.max,nr),Xn.subVectors(e.a,nr),Zn.subVectors(e.b,nr),Qn.subVectors(e.c,nr),$n.subVectors(Zn,Xn),er.subVectors(Qn,Zn),tr.subVectors(Xn,Qn);let t=[0,-$n.z,$n.y,0,-er.z,er.y,0,-tr.z,tr.y,$n.z,0,-$n.x,er.z,0,-er.x,tr.z,0,-tr.x,-$n.y,$n.x,0,-er.y,er.x,0,-tr.y,tr.x,0];return!or(t,Xn,Zn,Qn,rr)||(t=[1,0,0,0,1,0,0,0,1],!or(t,Xn,Zn,Qn,rr))?!1:(ir.crossVectors($n,er),t=[ir.x,ir.y,ir.z],or(t,Xn,Zn,Qn,rr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Jn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Jn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(qn)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},qn=[new K,new K,new K,new K,new K,new K,new K,new K],Jn=new K,Yn=new Kn,Xn=new K,Zn=new K,Qn=new K,$n=new K,er=new K,tr=new K,nr=new K,rr=new K,ir=new K,ar=new K;function or(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){ar.fromArray(e,a);let o=i.x*Math.abs(ar.x)+i.y*Math.abs(ar.y)+i.z*Math.abs(ar.z),s=t.dot(ar),c=n.dot(ar),l=r.dot(ar);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var sr=new K,cr=new G,lr=0,ur=class extends Qe{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:lr++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=ze,this.updateRanges=[],this.gpuType=h,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)cr.fromBufferAttribute(this,t),cr.applyMatrix3(e),this.setXY(t,cr.x,cr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)sr.fromBufferAttribute(this,t),sr.applyMatrix3(e),this.setXYZ(t,sr.x,sr.y,sr.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)sr.fromBufferAttribute(this,t),sr.applyMatrix4(e),this.setXYZ(t,sr.x,sr.y,sr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)sr.fromBufferAttribute(this,t),sr.applyNormalMatrix(e),this.setXYZ(t,sr.x,sr.y,sr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)sr.fromBufferAttribute(this,t),sr.transformDirection(e),this.setXYZ(t,sr.x,sr.y,sr.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=St(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ct(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=St(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=St(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=St(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=St(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array),r=Ct(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array),r=Ct(r,this.array),i=Ct(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},dr=class extends ur{constructor(e,t,n){super(new Uint16Array(e),t,n)}},fr=class extends ur{constructor(e,t,n){super(new Uint32Array(e),t,n)}},pr=class extends ur{constructor(e,t,n){super(new Float32Array(e),t,n)}},mr=new Kn,hr=new K,gr=new K,_r=class{constructor(e=new K,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?mr.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;hr.subVectors(e,this.center);let t=hr.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(hr,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(gr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(hr.copy(e.center).add(gr)),this.expandByPoint(hr.copy(e.center).sub(gr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},vr=0,yr=new q,br=new Sn,xr=new K,Sr=new Kn,Cr=new Kn,wr=new K,Tr=class e extends Qe{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:vr++}),this.uuid=rt(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(He(e)?fr:dr)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new Ot().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return yr.makeRotationFromQuaternion(e),this.applyMatrix4(yr),this}rotateX(e){return yr.makeRotationX(e),this.applyMatrix4(yr),this}rotateY(e){return yr.makeRotationY(e),this.applyMatrix4(yr),this}rotateZ(e){return yr.makeRotationZ(e),this.applyMatrix4(yr),this}translate(e,t,n){return yr.makeTranslation(e,t,n),this.applyMatrix4(yr),this}scale(e,t,n){return yr.makeScale(e,t,n),this.applyMatrix4(yr),this}lookAt(e){return br.lookAt(e),br.updateMatrix(),this.applyMatrix4(br.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(xr).negate(),this.translate(xr.x,xr.y,xr.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new pr(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&H(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Kn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)U(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new K(-1/0,-1/0,-1/0),new K(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Sr.setFromBufferAttribute(n),this.morphTargetsRelative?(wr.addVectors(this.boundingBox.min,Sr.min),this.boundingBox.expandByPoint(wr),wr.addVectors(this.boundingBox.max,Sr.max),this.boundingBox.expandByPoint(wr)):(this.boundingBox.expandByPoint(Sr.min),this.boundingBox.expandByPoint(Sr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&U(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new _r);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)U(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new K,1/0);else if(e){let n=this.boundingSphere.center;if(Sr.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Cr.setFromBufferAttribute(n),this.morphTargetsRelative?(wr.addVectors(Sr.min,Cr.min),Sr.expandByPoint(wr),wr.addVectors(Sr.max,Cr.max),Sr.expandByPoint(wr)):(Sr.expandByPoint(Cr.min),Sr.expandByPoint(Cr.max))}Sr.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)wr.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(wr));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)wr.fromBufferAttribute(a,t),o&&(xr.fromBufferAttribute(e,t),wr.add(xr)),r=Math.max(r,n.distanceToSquared(wr))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&U(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){U(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new ur(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new K,s[e]=new K;let c=new K,l=new K,u=new K,d=new G,f=new G,p=new G,m=new K,h=new K;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new K,y=new K,b=new K,x=new K;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new ur(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new K,i=new K,a=new K,o=new K,s=new K,c=new K,l=new K,u=new K;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)wr.fromBufferAttribute(e,t),wr.normalize(),e.setXYZ(t,wr.x,wr.y,wr.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new ur(a,r,i)}if(this.index===null)return H(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},Er=new K,Dr=new K,Or=new Ot,kr=class{constructor(e=new K(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Er.subVectors(n,t).cross(Dr.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Er),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Or.getNormalMatrix(e),r=this.coplanarPoint(Er).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Ar=0,jr=class extends Qe{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ar++}),this.uuid=rt(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new J(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Re,this.stencilZFail=Re,this.stencilZPass=Re,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){H(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?H(`Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new J().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new kr().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new G().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new G().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Mr=new K,Nr=new K,Pr=new K,Fr=new K,Ir=class{constructor(e=new K,t=new K(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Mr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Mr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Mr.copy(this.origin).addScaledVector(this.direction,t),Mr.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Nr.copy(e).add(t).multiplyScalar(.5),Pr.copy(t).sub(e).normalize(),Fr.copy(this.origin).sub(Nr);let i=e.distanceTo(t)*.5,a=-this.direction.dot(Pr),o=Fr.dot(this.direction),s=-Fr.dot(Pr),c=Fr.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Nr).addScaledVector(Pr,d),f}intersectSphere(e,t){if(e.radius<0)return null;Mr.subVectors(e.center,this.origin);let n=Mr.dot(this.direction),r=Mr.dot(Mr)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Mr)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,M,N;if(y>=b&&y>=x?(w=s,D=u,A=p,N=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,M=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,M=_)):b>=x?(w=c,D=d,A=m,N=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,M=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,M=v)):(w=l,D=f,A=h,N=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,M=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,M=g)),w===0)return null;let P=S/w,F=C/w,I=1/w,ee=T-P*D,L=E-F*D,te=O-P*A,ne=k-F*A,re=j-P*N,ie=M-F*N,ae=re*ne-ie*te,R=ee*ie-L*re,oe=te*L-ne*ee;if(r){if(ae<0||R<0||oe<0)return null}else if((ae<0||R<0||oe<0)&&(ae>0||R>0||oe>0))return null;let se=ae+R+oe;if(se===0)return null;let ce=I*(ae*D+R*A+oe*N);return(se>0?ce<0:ce>0)?null:this.at(ce/se,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Lr=class extends jr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new J(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new an,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Rr=new q,zr=new Ir,Br=new _r,Vr=new K,Hr=new K,Ur=new K,Wr=new K,Gr=new K,Kr=new K,qr=new K,Jr=new K,Y=class extends Sn{constructor(e=new Tr,t=new Lr){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Kr.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Gr.fromBufferAttribute(s,e),a?Kr.addScaledVector(Gr,r):Kr.addScaledVector(Gr.sub(t),r))}t.add(Kr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Br.copy(n.boundingSphere),Br.applyMatrix4(i),zr.copy(e.ray).recast(e.near),!(Br.containsPoint(zr.origin)===!1&&(zr.intersectSphere(Br,Vr)===null||zr.origin.distanceToSquared(Vr)>(e.far-e.near)**2))&&(Rr.copy(i).invert(),zr.copy(e.ray).applyMatrix4(Rr),(n.boundingBox===null||zr.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,zr)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=Xr(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=Xr(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=Xr(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=Xr(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function Yr(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;Jr.copy(s),Jr.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(Jr);return l<n.near||l>n.far?null:{distance:l,point:Jr.clone(),object:e}}function Xr(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,Hr),e.getVertexPosition(c,Ur),e.getVertexPosition(l,Wr);let u=Yr(e,t,n,r,Hr,Ur,Wr,qr);if(u){let e=new K;Gn.getBarycoord(qr,Hr,Ur,Wr,e),i&&(u.uv=Gn.getInterpolatedAttribute(i,s,c,l,e,new G)),a&&(u.uv1=Gn.getInterpolatedAttribute(a,s,c,l,e,new G)),o&&(u.normal=Gn.getInterpolatedAttribute(o,s,c,l,e,new K),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new K,materialIndex:0};Gn.getNormal(Hr,Ur,Wr,t.normal),u.face=t,u.barycoord=e}return u}var Zr=class extends Ut{constructor(e=null,t=1,n=1,i,a,o,s,c,l=r,u=r,d,f){super(null,o,s,c,l,u,i,a,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Qr=class extends ur{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},$r=new q,ei=new q,ti=[],ni=new Kn,ri=new q,ii=new Y,ai=new _r,oi=class extends Y{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Qr(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,ri)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Kn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,$r),ni.copy(e.boundingBox).applyMatrix4($r),this.boundingBox.union(ni)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new _r),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,$r),ai.copy(e.boundingSphere).applyMatrix4($r),this.boundingSphere.union(ai)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(ii.geometry=this.geometry,ii.material=this.material,ii.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ai.copy(this.boundingSphere),ai.applyMatrix4(n),e.ray.intersectsSphere(ai)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,$r),ei.multiplyMatrices(n,$r),ii.matrixWorld=ei,ii.raycast(e,ti);for(let e=0,n=ti.length;e<n;e++){let n=ti[e];n.instanceId=i,n.object=this,t.push(n)}ti.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Qr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Zr(new Float32Array(r*this.count),r,this.count,D,h));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},si=new _r,ci=new G(.5,.5),li=new K,ui=class{constructor(e=new kr,t=new kr,n=new kr,r=new kr,i=new kr,a=new kr){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Ve,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),si.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),si.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(si)}intersectsSprite(e){return si.center.set(0,0,0),si.radius=.7071067811865476+ci.distanceTo(e.center),si.applyMatrix4(e.matrixWorld),this.intersectsSphere(si)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(li.x=r.normal.x>0?e.max.x:e.min.x,li.y=r.normal.y>0?e.max.y:e.min.y,li.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(li)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},di=class extends jr{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new J(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},fi=new q,pi=new Ir,mi=new _r,hi=new K,gi=class extends Sn{constructor(e=new Tr,t=new di){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),mi.copy(n.boundingSphere),mi.applyMatrix4(r),mi.radius+=i,e.ray.intersectsSphere(mi)===!1)return;fi.copy(r).invert(),pi.copy(e.ray).applyMatrix4(fi);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);hi.fromBufferAttribute(l,n),_i(hi,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)hi.fromBufferAttribute(l,a),_i(hi,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function _i(e,t,n,r,i,a,o){let s=pi.distanceSqToPoint(e);if(s<n){let n=new K;pi.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var vi=class extends Ut{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},yi=class extends Ut{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},bi=class extends Ut{constructor(e,t,n=m,i,a,o,s=r,c=r,l,u=T,d=1){if(u!==1026&&u!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:d},i,a,o,s,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new zt(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},xi=class extends bi{constructor(e,t=m,n=301,i,a,o=r,s=r,c,l=T){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,i,a,o,s,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Si=class extends Ut{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Ci=class e extends Tr{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new pr(c,3)),this.setAttribute(`normal`,new pr(l,3)),this.setAttribute(`uv`,new pr(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new K;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},wi=class e extends Tr{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new K,l=new G;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new pr(a,3)),this.setAttribute(`normal`,new pr(o,3)),this.setAttribute(`uv`,new pr(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Ti=class e extends Tr{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new pr(u,3)),this.setAttribute(`normal`,new pr(d,3)),this.setAttribute(`uv`,new pr(f,2));function _(){let a=new K,_=new K,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new G,m=new K,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ei=class e extends Tr{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new pr(i,3)),this.setAttribute(`normal`,new pr(i.slice(),3)),this.setAttribute(`uv`,new pr(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new K,r=new K,i=new K;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new K;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new K;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new K,t=new K,n=new K,r=new K,o=new G,s=new G,c=new G;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},Di=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){H(`Curve: .getPoint() not implemented.`)}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new G:new K);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new K,r=[],i=[],a=[],o=new K,s=new q;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new K)}i[0]=new K,a[0]=new K;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(W(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(W(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Oi=class extends Di{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t=new G){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},ki=class extends Oi{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}};function Ai(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}var ji=new K,Mi=new K,Ni=new Ai,Pi=new Ai,Fi=new Ai,Ii=class extends Di{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new K){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(Mi.subVectors(r[0],r[1]).add(r[0]),c=Mi);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(ji.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=ji),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),Ni.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),Pi.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),Fi.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(Ni.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),Pi.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),Fi.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(Ni.calc(s),Pi.calc(s),Fi.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new K().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Li(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function Ri(e,t){let n=1-e;return n*n*t}function zi(e,t){return 2*(1-e)*e*t}function Bi(e,t){return e*e*t}function Vi(e,t,n,r){return Ri(e,t)+zi(e,n)+Bi(e,r)}function Hi(e,t){let n=1-e;return n*n*n*t}function Ui(e,t){let n=1-e;return 3*n*n*e*t}function Wi(e,t){return 3*(1-e)*e*e*t}function Gi(e,t){return e*e*e*t}function Ki(e,t,n,r,i){return Hi(e,t)+Ui(e,n)+Wi(e,r)+Gi(e,i)}var qi=class extends Di{constructor(e=new G,t=new G,n=new G,r=new G){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new G){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(Ki(e,r.x,i.x,a.x,o.x),Ki(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ji=class extends Di{constructor(e=new K,t=new K,n=new K,r=new K){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new K){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(Ki(e,r.x,i.x,a.x,o.x),Ki(e,r.y,i.y,a.y,o.y),Ki(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Yi=class extends Di{constructor(e=new G,t=new G){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new G){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new G){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Xi=class extends Di{constructor(e=new K,t=new K){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new K){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new K){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Zi=class extends Di{constructor(e=new G,t=new G,n=new G){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new G){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(Vi(e,r.x,i.x,a.x),Vi(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Qi=class extends Di{constructor(e=new K,t=new K,n=new K){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new K){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(Vi(e,r.x,i.x,a.x),Vi(e,r.y,i.y,a.y),Vi(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},$i=class extends Di{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new G){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(Li(o,s.x,c.x,l.x,u.x),Li(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new G().fromArray(n))}return this}},ea=Object.freeze({__proto__:null,ArcCurve:ki,CatmullRomCurve3:Ii,CubicBezierCurve:qi,CubicBezierCurve3:Ji,EllipseCurve:Oi,LineCurve:Yi,LineCurve3:Xi,QuadraticBezierCurve:Zi,QuadraticBezierCurve3:Qi,SplineCurve:$i}),ta=class extends Di{constructor(){super(),this.type=`CurvePath`,this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?`LineCurve`:`LineCurve3`;this.curves.push(new ea[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),i=0;for(;i<r.length;){if(r[i]>=n){let e=r[i]-n,a=this.curves[i],o=a.getLength(),s=o===0?0:1-e/o;return a.getPointAt(s,t)}i++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,i=this.curves;r<i.length;r++){let a=i[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,s=a.getPoints(o);for(let e=0;e<s.length;e++){let r=s[e];n&&n.equals(r)||(t.push(r),n=r)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(new ea[n.type]().fromJSON(n))}return this}},na=class extends ta{constructor(e){super(),this.type=`Path`,this.currentPoint=new G,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Yi(this.currentPoint.clone(),new G(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let i=new Zi(this.currentPoint.clone(),new G(e,t),new G(n,r));return this.curves.push(i),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,i,a){let o=new qi(this.currentPoint.clone(),new G(e,t),new G(n,r),new G(i,a));return this.curves.push(o),this.currentPoint.set(i,a),this}splineThru(e){let t=new $i([this.currentPoint.clone()].concat(e));return this.curves.push(t),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,i,a){let o=this.currentPoint.x,s=this.currentPoint.y;return this.absarc(e+o,t+s,n,r,i,a),this}absarc(e,t,n,r,i,a){return this.absellipse(e,t,n,n,r,i,a),this}ellipse(e,t,n,r,i,a,o,s){let c=this.currentPoint.x,l=this.currentPoint.y;return this.absellipse(e+c,t+l,n,r,i,a,o,s),this}absellipse(e,t,n,r,i,a,o,s){let c=new Oi(e,t,n,r,i,a,o,s);if(this.curves.length>0){let e=c.getPoint(0);e.equals(this.currentPoint)||this.lineTo(e.x,e.y)}this.curves.push(c);let l=c.getPoint(1);return this.currentPoint.copy(l),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},ra=class extends na{constructor(e){super(e),this.uuid=rt(),this.type=`Shape`,this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let n=this.holes[t];e.holes.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(new na().fromJSON(n))}return this}};function ia(e,t,n=2){let r=t&&t.length,i=r?t[0]*n:e.length,a=aa(e,0,i,n,!0),o=[];if(!a||a.next===a.prev)return o;let s,c,l;if(r&&(a=fa(e,t,a,n)),e.length>80*n){s=e[0],c=e[1];let t=s,r=c;for(let a=n;a<i;a+=n){let n=e[a],i=e[a+1];n<s&&(s=n),i<c&&(c=i),n>t&&(t=n),i>r&&(r=i)}l=Math.max(t-s,r-c),l=l===0?0:32767/l}return sa(a,o,n,s,c,l,0),o}function aa(e,t,n,r,i){let a;if(i===Ia(e,t,n,r)>0)for(let i=t;i<n;i+=r)a=Na(i/r|0,e[i],e[i+1],a);else for(let i=n-r;i>=t;i-=r)a=Na(i/r|0,e[i],e[i+1],a);return a&&Ta(a,a.next)&&(Pa(a),a=a.next),a}function oa(e,t){if(!e)return e;t||=e;let n=e,r;do if(r=!1,!n.steiner&&(Ta(n,n.next)||wa(n.prev,n,n.next)===0)){if(Pa(n),n=t=n.prev,n===n.next)break;r=!0}else n=n.next;while(r||n!==t);return t}function sa(e,t,n,r,i,a,o){if(!e)return;!o&&a&&_a(e,r,i,a);let s=e;for(;e.prev!==e.next;){let c=e.prev,l=e.next;if(a?la(e,r,i,a):ca(e))t.push(c.i,e.i,l.i),Pa(e),e=l.next,s=l.next;else if(e=l,e===s){o?o===1?(e=ua(oa(e),t),sa(e,t,n,r,i,a,2)):o===2&&da(e,t,n,r,i,a):sa(oa(e),t,n,r,i,a,1);break}}}function ca(e){let t=e.prev,n=e,r=e.next;if(wa(t,n,r)>=0)return!1;let i=t.x,a=n.x,o=r.x,s=t.y,c=n.y,l=r.y,u=Math.min(i,a,o),d=Math.min(s,c,l),f=Math.max(i,a,o),p=Math.max(s,c,l),m=r.next;for(;m!==t;){if(m.x>=u&&m.x<=f&&m.y>=d&&m.y<=p&&Sa(i,s,a,c,o,l,m.x,m.y)&&wa(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function la(e,t,n,r){let i=e.prev,a=e,o=e.next;if(wa(i,a,o)>=0)return!1;let s=i.x,c=a.x,l=o.x,u=i.y,d=a.y,f=o.y,p=Math.min(s,c,l),m=Math.min(u,d,f),h=Math.max(s,c,l),g=Math.max(u,d,f),_=ya(p,m,t,n,r),v=ya(h,g,t,n,r),y=e.prevZ,b=e.nextZ;for(;y&&y.z>=_&&b&&b.z<=v;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&Sa(s,u,c,d,l,f,y.x,y.y)&&wa(y.prev,y,y.next)>=0||(y=y.prevZ,b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&Sa(s,u,c,d,l,f,b.x,b.y)&&wa(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;y&&y.z>=_;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&Sa(s,u,c,d,l,f,y.x,y.y)&&wa(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;b&&b.z<=v;){if(b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&Sa(s,u,c,d,l,f,b.x,b.y)&&wa(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function ua(e,t){let n=e;do{let r=n.prev,i=n.next.next;!Ta(r,i)&&Ea(r,n,n.next,i)&&Aa(r,i)&&Aa(i,r)&&(t.push(r.i,n.i,i.i),Pa(n),Pa(n.next),n=e=i),n=n.next}while(n!==e);return oa(n)}function da(e,t,n,r,i,a){let o=e;do{let e=o.next.next;for(;e!==o.prev;){if(o.i!==e.i&&Ca(o,e)){let s=Ma(o,e);o=oa(o,o.next),s=oa(s,s.next),sa(o,t,n,r,i,a,0),sa(s,t,n,r,i,a,0);return}e=e.next}o=o.next}while(o!==e)}function fa(e,t,n,r){let i=[];for(let n=0,a=t.length;n<a;n++){let o=aa(e,t[n]*r,n<a-1?t[n+1]*r:e.length,r,!1);o===o.next&&(o.steiner=!0),i.push(ba(o))}i.sort(pa);for(let e=0;e<i.length;e++)n=ma(i[e],n);return n}function pa(e,t){let n=e.x-t.x;return n===0&&(n=e.y-t.y,n===0&&(n=(e.next.y-e.y)/(e.next.x-e.x)-(t.next.y-t.y)/(t.next.x-t.x))),n}function ma(e,t){let n=ha(e,t);if(!n)return t;let r=Ma(n,e);return oa(r,r.next),oa(n,n.next)}function ha(e,t){let n=t,r=e.x,i=e.y,a=-1/0,o;if(Ta(e,n))return n;do{if(Ta(e,n.next))return n.next;if(i<=n.y&&i>=n.next.y&&n.next.y!==n.y){let e=n.x+(i-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(e<=r&&e>a&&(a=e,o=n.x<n.next.x?n:n.next,e===r))return o}n=n.next}while(n!==t);if(!o)return null;let s=o,c=o.x,l=o.y,u=1/0;n=o;do{if(r>=n.x&&n.x>=c&&r!==n.x&&xa(i<l?r:a,i,c,l,i<l?a:r,i,n.x,n.y)){let t=Math.abs(i-n.y)/(r-n.x);Aa(n,e)&&(t<u||t===u&&(n.x>o.x||n.x===o.x&&ga(o,n)))&&(o=n,u=t)}n=n.next}while(n!==s);return o}function ga(e,t){return wa(e.prev,e,t.prev)<0&&wa(t.next,e,e.next)<0}function _a(e,t,n,r){let i=e;do i.z===0&&(i.z=ya(i.x,i.y,t,n,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==e);i.prevZ.nextZ=null,i.prevZ=null,va(i)}function va(e){let t,n=1;do{let r=e,i;e=null;let a=null;for(t=0;r;){t++;let o=r,s=0;for(let e=0;e<n&&(s++,o=o.nextZ,o);e++);let c=n;for(;s>0||c>0&&o;)s!==0&&(c===0||!o||r.z<=o.z)?(i=r,r=r.nextZ,s--):(i=o,o=o.nextZ,c--),a?a.nextZ=i:e=i,i.prevZ=a,a=i;r=o}a.nextZ=null,n*=2}while(t>1);return e}function ya(e,t,n,r,i){return e=(e-n)*i|0,t=(t-r)*i|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function ba(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function xa(e,t,n,r,i,a,o,s){return(i-o)*(t-s)>=(e-o)*(a-s)&&(e-o)*(r-s)>=(n-o)*(t-s)&&(n-o)*(a-s)>=(i-o)*(r-s)}function Sa(e,t,n,r,i,a,o,s){return(e!==o||t!==s)&&xa(e,t,n,r,i,a,o,s)}function Ca(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!ka(e,t)&&(Aa(e,t)&&Aa(t,e)&&ja(e,t)&&(wa(e.prev,e,t.prev)||wa(e,t.prev,t))||Ta(e,t)&&wa(e.prev,e,e.next)>0&&wa(t.prev,t,t.next)>0)}function wa(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function Ta(e,t){return e.x===t.x&&e.y===t.y}function Ea(e,t,n,r){let i=Oa(wa(e,t,n)),a=Oa(wa(e,t,r)),o=Oa(wa(n,r,e)),s=Oa(wa(n,r,t));return!!(i!==a&&o!==s||i===0&&Da(e,n,t)||a===0&&Da(e,r,t)||o===0&&Da(n,e,r)||s===0&&Da(n,t,r))}function Da(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function Oa(e){return e>0?1:e<0?-1:0}function ka(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&Ea(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function Aa(e,t){return wa(e.prev,e,e.next)<0?wa(e,t,e.next)>=0&&wa(e,e.prev,t)>=0:wa(e,t,e.prev)<0||wa(e,e.next,t)<0}function ja(e,t){let n=e,r=!1,i=(e.x+t.x)/2,a=(e.y+t.y)/2;do n.y>a!=n.next.y>a&&n.next.y!==n.y&&i<(n.next.x-n.x)*(a-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next;while(n!==e);return r}function Ma(e,t){let n=Fa(e.i,e.x,e.y),r=Fa(t.i,t.x,t.y),i=e.next,a=t.prev;return e.next=t,t.prev=e,n.next=i,i.prev=n,r.next=n,n.prev=r,a.next=r,r.prev=a,r}function Na(e,t,n,r){let i=Fa(e,t,n);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function Pa(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function Fa(e,t,n){return{i:e,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Ia(e,t,n,r){let i=0;for(let a=t,o=n-r;a<n;a+=r)i+=(e[o]-e[a])*(e[a+1]+e[o+1]),o=a;return i}var La=class{static triangulate(e,t,n=2){return ia(e,t,n)}},Ra=class e{static area(e){let t=e.length,n=0;for(let r=t-1,i=0;i<t;r=i++)n+=e[r].x*e[i].y-e[i].x*e[r].y;return n*.5}static isClockWise(t){return e.area(t)<0}static triangulateShape(e,t){let n=[],r=[],i=[];za(e),Ba(n,e);let a=e.length;t.forEach(za);for(let e=0;e<t.length;e++)r.push(a),a+=t[e].length,Ba(n,t[e]);let o=La.triangulate(n,r);for(let e=0;e<o.length;e+=3)i.push(o.slice(e,e+3));return i}};function za(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function Ba(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}var Va=class e extends Tr{constructor(e=new ra([new G(.5,.5),new G(-.5,.5),new G(-.5,-.5),new G(.5,-.5)]),t={}){super(),this.type=`ExtrudeGeometry`,this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],i=[];for(let t=0,n=e.length;t<n;t++){let n=e[t];a(n)}this.setAttribute(`position`,new pr(r,3)),this.setAttribute(`uv`,new pr(i,2)),this.computeVertexNormals();function a(e){let a=[],o=t.curveSegments===void 0?12:t.curveSegments,s=t.steps===void 0?1:t.steps,c=t.depth===void 0?1:t.depth,l=t.bevelEnabled===void 0||t.bevelEnabled,u=t.bevelThickness===void 0?.2:t.bevelThickness,d=t.bevelSize===void 0?u-.1:t.bevelSize,f=t.bevelOffset===void 0?0:t.bevelOffset,p=t.bevelSegments===void 0?3:t.bevelSegments,m=t.extrudePath,h=t.UVGenerator===void 0?Ha:t.UVGenerator,g,_=!1,v,y,b,x;if(m){g=m.getSpacedPoints(s),_=!0,l=!1;let e=m.isCatmullRomCurve3?m.closed:!1;v=m.computeFrenetFrames(s,e),y=new K,b=new K,x=new K}l||(p=0,u=0,d=0,f=0);let S=e.extractPoints(o),C=S.shape,w=S.holes;if(!Ra.isClockWise(C)){C=C.reverse();for(let e=0,t=w.length;e<t;e++){let t=w[e];Ra.isClockWise(t)&&(w[e]=t.reverse())}}function T(e){let t=e[0];for(let n=1;n<=e.length;n++){let r=n%e.length,i=e[r],a=i.x-t.x,o=i.y-t.y,s=a*a+o*o,c=Math.max(Math.abs(i.x),Math.abs(i.y),Math.abs(t.x),Math.abs(t.y));s<=10000000000000001e-36*c*c?(e.splice(r,1),n--):t=i}}T(C),w.forEach(T);let E=w.length,D=C;for(let e=0;e<E;e++){let t=w[e];C=C.concat(t)}function O(e,t,n){return t||U(`ExtrudeGeometry: vec does not exist`),e.clone().addScaledVector(t,n)}let k=C.length;function A(e,t,n){let r,i,a,o=e.x-t.x,s=e.y-t.y,c=n.x-e.x,l=n.y-e.y,u=o*o+s*s,d=o*l-s*c;if(Math.abs(d)>2**-52){let d=Math.sqrt(u),f=Math.sqrt(c*c+l*l),p=t.x-s/d,m=t.y+o/d,h=n.x-l/f,g=n.y+c/f,_=((h-p)*l-(g-m)*c)/(o*l-s*c);r=p+o*_-e.x,i=m+s*_-e.y;let v=r*r+i*i;if(v<=2)return new G(r,i);a=Math.sqrt(v/2)}else{let e=!1;o>2**-52?c>2**-52&&(e=!0):o<-(2**-52)?c<-(2**-52)&&(e=!0):Math.sign(s)===Math.sign(l)&&(e=!0),e?(r=-s,i=o,a=Math.sqrt(u)):(r=o,i=s,a=Math.sqrt(u/2))}return new G(r/a,i/a)}let j=[];for(let e=0,t=D.length,n=t-1,r=e+1;e<t;e++,n++,r++)n===t&&(n=0),r===t&&(r=0),j[e]=A(D[e],D[n],D[r]);let M=[],N,P=j.concat();for(let e=0,t=E;e<t;e++){let t=w[e];N=[];for(let e=0,n=t.length,r=n-1,i=e+1;e<n;e++,r++,i++)r===n&&(r=0),i===n&&(i=0),N[e]=A(t[e],t[r],t[i]);M.push(N),P=P.concat(N)}let F;if(p===0)F=Ra.triangulateShape(D,w);else{let e=[],t=[];for(let n=0;n<p;n++){let r=n/p,i=u*Math.cos(r*Math.PI/2),a=d*Math.sin(r*Math.PI/2)+f;for(let t=0,n=D.length;t<n;t++){let n=O(D[t],j[t],a);re(n.x,n.y,-i),r===0&&e.push(n)}for(let e=0,n=E;e<n;e++){let n=w[e];N=M[e];let o=[];for(let e=0,t=n.length;e<t;e++){let t=O(n[e],N[e],a);re(t.x,t.y,-i),r===0&&o.push(t)}r===0&&t.push(o)}}F=Ra.triangulateShape(e,t)}let I=F.length,ee=d+f;for(let e=0;e<k;e++){let t=l?O(C[e],P[e],ee):C[e];_?(b.copy(v.normals[0]).multiplyScalar(t.x),y.copy(v.binormals[0]).multiplyScalar(t.y),x.copy(g[0]).add(b).add(y),re(x.x,x.y,x.z)):re(t.x,t.y,0)}for(let e=1;e<=s;e++)for(let t=0;t<k;t++){let n=l?O(C[t],P[t],ee):C[t];_?(b.copy(v.normals[e]).multiplyScalar(n.x),y.copy(v.binormals[e]).multiplyScalar(n.y),x.copy(g[e]).add(b).add(y),re(x.x,x.y,x.z)):re(n.x,n.y,c/s*e)}for(let e=p-1;e>=0;e--){let t=e/p,n=u*Math.cos(t*Math.PI/2),r=d*Math.sin(t*Math.PI/2)+f;for(let e=0,t=D.length;e<t;e++){let t=O(D[e],j[e],r);re(t.x,t.y,c+n)}for(let e=0,t=w.length;e<t;e++){let t=w[e];N=M[e];for(let e=0,i=t.length;e<i;e++){let i=O(t[e],N[e],r);_?re(i.x,i.y+g[s-1].y,g[s-1].x+n):re(i.x,i.y,c+n)}}}L(),te();function L(){let e=r.length/3;if(l){let e=0,t=k*e;for(let e=0;e<I;e++){let n=F[e];ie(n[2]+t,n[1]+t,n[0]+t)}e=s+p*2,t=k*e;for(let e=0;e<I;e++){let n=F[e];ie(n[0]+t,n[1]+t,n[2]+t)}}else{for(let e=0;e<I;e++){let t=F[e];ie(t[2],t[1],t[0])}for(let e=0;e<I;e++){let t=F[e];ie(t[0]+k*s,t[1]+k*s,t[2]+k*s)}}n.addGroup(e,r.length/3-e,0)}function te(){let e=r.length/3,t=0;ne(D,t),t+=D.length;for(let e=0,n=w.length;e<n;e++){let n=w[e];ne(n,t),t+=n.length}n.addGroup(e,r.length/3-e,1)}function ne(e,t){let n=e.length;for(;--n>=0;){let r=n,i=n-1;i<0&&(i=e.length-1);for(let e=0,n=s+p*2;e<n;e++){let n=k*e,a=k*(e+1);ae(t+r+n,t+i+n,t+i+a,t+r+a)}}}function re(e,t,n){a.push(e),a.push(t),a.push(n)}function ie(e,t,i){R(e),R(t),R(i);let a=r.length/3,o=h.generateTopUV(n,r,a-3,a-2,a-1);oe(o[0]),oe(o[1]),oe(o[2])}function ae(e,t,i,a){R(e),R(t),R(a),R(t),R(i),R(a);let o=r.length/3,s=h.generateSideWallUV(n,r,o-6,o-3,o-2,o-1);oe(s[0]),oe(s[1]),oe(s[3]),oe(s[1]),oe(s[2]),oe(s[3])}function R(e){r.push(a[e*3+0]),r.push(a[e*3+1]),r.push(a[e*3+2])}function oe(e){i.push(e.x),i.push(e.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Ua(t,n,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new ea[i.type]().fromJSON(i)),new e(r,t.options)}},Ha={generateTopUV:function(e,t,n,r,i){let a=t[n*3],o=t[n*3+1],s=t[r*3],c=t[r*3+1],l=t[i*3],u=t[i*3+1];return[new G(a,o),new G(s,c),new G(l,u)]},generateSideWallUV:function(e,t,n,r,i,a){let o=t[n*3],s=t[n*3+1],c=t[n*3+2],l=t[r*3],u=t[r*3+1],d=t[r*3+2],f=t[i*3],p=t[i*3+1],m=t[i*3+2],h=t[a*3],g=t[a*3+1],_=t[a*3+2];return Math.abs(s-u)<Math.abs(o-l)?[new G(o,1-c),new G(l,1-d),new G(f,1-m),new G(h,1-_)]:[new G(s,1-c),new G(u,1-d),new G(p,1-m),new G(g,1-_)]}};function Ua(e,t,n){if(n.shapes=[],Array.isArray(e))for(let t=0,r=e.length;t<r;t++){let r=e[t];n.shapes.push(r.uuid)}else n.shapes.push(e.uuid);return n.options=Object.assign({},t),t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}var Wa=class e extends Ei{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},Ga=class e extends Ei{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type=`OctahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},Ka=class e extends Tr{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new pr(p,3)),this.setAttribute(`normal`,new pr(m,3)),this.setAttribute(`uv`,new pr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},qa=class e extends Tr{constructor(e=new ra([new G(0,.5),new G(-.5,-.5),new G(.5,-.5)]),t=12){super(),this.type=`ShapeGeometry`,this.parameters={shapes:e,curveSegments:t};let n=[],r=[],i=[],a=[],o=0,s=0;if(Array.isArray(e)===!1)c(e);else for(let t=0;t<e.length;t++)c(e[t]),this.addGroup(o,s,t),o+=s,s=0;this.setIndex(n),this.setAttribute(`position`,new pr(r,3)),this.setAttribute(`normal`,new pr(i,3)),this.setAttribute(`uv`,new pr(a,2));function c(e){let o=r.length/3,c=e.extractPoints(t),l=c.shape,u=c.holes;Ra.isClockWise(l)===!1&&(l=l.reverse());for(let e=0,t=u.length;e<t;e++){let t=u[e];Ra.isClockWise(t)===!0&&(u[e]=t.reverse())}let d=Ra.triangulateShape(l,u);for(let e=0,t=u.length;e<t;e++){let t=u[e];l=l.concat(t)}for(let e=0,t=l.length;e<t;e++){let t=l[e];r.push(t.x,t.y,0),i.push(0,0,1),a.push(t.x,t.y)}for(let e=0,t=d.length;e<t;e++){let t=d[e],r=t[0]+o,i=t[1]+o,a=t[2]+o;n.push(r,i,a),s+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return Ja(t,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}return new e(r,t.curveSegments)}};function Ja(e,t){if(t.shapes=[],Array.isArray(e))for(let n=0,r=e.length;n<r;n++){let r=e[n];t.shapes.push(r.uuid)}else t.shapes.push(e.uuid);return t}var Ya=class e extends Tr{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new K,d=new K,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new pr(p,3)),this.setAttribute(`normal`,new pr(m,3)),this.setAttribute(`uv`,new pr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},Xa=class e extends Tr{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let s=[],c=[],l=[],u=[],d=new K,f=new K,p=new K;for(let s=0;s<=n;s++){let m=a+s/n*o;for(let a=0;a<=r;a++){let o=a/r*i;f.x=(e+t*Math.cos(m))*Math.cos(o),f.y=(e+t*Math.cos(m))*Math.sin(o),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(o),d.y=e*Math.sin(o),p.subVectors(f,d).normalize(),l.push(p.x,p.y,p.z),u.push(a/r),u.push(s/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;s.push(n,i,o),s.push(i,a,o)}this.setIndex(s),this.setAttribute(`position`,new pr(c,3)),this.setAttribute(`normal`,new pr(l,3)),this.setAttribute(`uv`,new pr(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}},Za=class e extends Tr{constructor(e=new Qi(new K(-1,-1,0),new K(-1,1,0),new K(1,1,0)),t=64,n=1,r=8,i=!1){super(),this.type=`TubeGeometry`,this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:i};let a=e.computeFrenetFrames(t,i);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new K,s=new K,c=new G,l=new K,u=[],d=[],f=[],p=[];m(),this.setIndex(p),this.setAttribute(`position`,new pr(u,3)),this.setAttribute(`normal`,new pr(d,3)),this.setAttribute(`uv`,new pr(f,2));function m(){for(let e=0;e<t;e++)h(e);h(i===!1?t:0),_(),g()}function h(i){l=e.getPointAt(i/t,l);let c=a.normals[i],f=a.binormals[i];for(let e=0;e<=r;e++){let t=e/r*Math.PI*2,i=Math.sin(t),a=-Math.cos(t);s.x=a*c.x+i*f.x,s.y=a*c.y+i*f.y,s.z=a*c.z+i*f.z,s.normalize(),d.push(s.x,s.y,s.z),o.x=l.x+n*s.x,o.y=l.y+n*s.y,o.z=l.z+n*s.z,u.push(o.x,o.y,o.z)}}function g(){for(let e=1;e<=t;e++)for(let t=1;t<=r;t++){let n=(r+1)*(e-1)+(t-1),i=(r+1)*e+(t-1),a=(r+1)*e+t,o=(r+1)*(e-1)+t;p.push(n,i,o),p.push(i,a,o)}}function _(){for(let e=0;e<=t;e++)for(let n=0;n<=r;n++)c.x=e/t,c.y=n/r,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(t){return new e(new ea[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};function Qa(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(eo(i))i.isRenderTargetTexture?(H(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(eo(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function $a(e){let t={};for(let n=0;n<e.length;n++){let r=Qa(e[n]);for(let e in r)t[e]=r[e]}return t}function eo(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function to(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function no(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Nt.workingColorSpace}var ro={clone:Qa,merge:$a},io=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ao=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,oo=class extends jr{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=io,this.fragmentShader=ao,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Qa(e.uniforms),this.uniformsGroups=to(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new J().setHex(r.value);break;case`v2`:this.uniforms[n].value=new G().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new K().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new Wt().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new Ot().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new q().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},so=class extends oo{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},co=class extends jr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=V,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},lo=class extends jr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function uo(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function fo(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var po=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},mo=class extends po{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Me,endingEnd:Me}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case B:i=e,o=2*t-n;break;case Ne:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case B:a=e,s=2*n-t;break;case Ne:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},ho=class extends po{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},go=class extends po{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},_o=class extends po{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=bo(n,t,g,y,r);i[p]=vo(x,o,_,b,m)}return i}};function vo(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function yo(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function bo(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=vo(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=yo(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var xo=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=uo(t,this.TimeBufferType),this.values=uo(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:uo(e.times,Array),values:uo(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),fo(e.settings)&&(n.settings={inTangents:uo(e.settings.inTangents,Array),outTangents:uo(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new go(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ho(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new mo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new _o(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case ke:t=this.InterpolantFactoryMethodDiscrete;break;case z:t=this.InterpolantFactoryMethodLinear;break;case Ae:t=this.InterpolantFactoryMethodSmooth;break;case je:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return H(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ke;case this.InterpolantFactoryMethodLinear:return z;case this.InterpolantFactoryMethodSmooth:return Ae;case this.InterpolantFactoryMethodBezier:return je}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;fo(this.settings)&&(So(this.settings.inTangents,e),So(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(U(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(U(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){U(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){U(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Ue(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){U(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Ae,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,fo(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function So(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}xo.prototype.ValueTypeName=``,xo.prototype.TimeBufferType=Float32Array,xo.prototype.ValueBufferType=Float32Array,xo.prototype.DefaultInterpolation=z;var Co=class extends xo{constructor(e,t,n){super(e,t,n)}};Co.prototype.ValueTypeName=`bool`,Co.prototype.ValueBufferType=Array,Co.prototype.DefaultInterpolation=ke,Co.prototype.InterpolantFactoryMethodLinear=void 0,Co.prototype.InterpolantFactoryMethodSmooth=void 0;var wo=class extends xo{constructor(e,t,n,r){super(e,t,n,r)}};wo.prototype.ValueTypeName=`color`;var To=class extends xo{constructor(e,t,n,r){super(e,t,n,r)}};To.prototype.ValueTypeName=`number`;var Eo=class extends po{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)Tt.slerpFlat(i,0,a,c-o,a,c,s);return i}},Do=class extends xo{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Eo(this.times,this.values,this.getValueSize(),e)}};Do.prototype.ValueTypeName=`quaternion`,Do.prototype.InterpolantFactoryMethodSmooth=void 0;var Oo=class extends xo{constructor(e,t,n){super(e,t,n)}};Oo.prototype.ValueTypeName=`string`,Oo.prototype.ValueBufferType=Array,Oo.prototype.DefaultInterpolation=ke,Oo.prototype.InterpolantFactoryMethodLinear=void 0,Oo.prototype.InterpolantFactoryMethodSmooth=void 0;var ko=class extends xo{constructor(e,t,n,r){super(e,t,n,r)}};ko.prototype.ValueTypeName=`vector`;var Ao=new K,jo=new Tt,Mo=new K,No=class extends Sn{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new q,this.projectionMatrix=new q,this.projectionMatrixInverse=new q,this.coordinateSystem=Ve,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ao,jo,Mo),Mo.x===1&&Mo.y===1&&Mo.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ao,jo,Mo.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Ao,jo,Mo),Mo.x===1&&Mo.y===1&&Mo.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ao,jo,Mo.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Po=new K,Fo=new G,Io=new G,Lo=class extends No{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=nt*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(tt*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return nt*2*Math.atan(Math.tan(tt*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Po.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Po.x,Po.y).multiplyScalar(-e/Po.z),Po.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Po.x,Po.y).multiplyScalar(-e/Po.z)}getViewSize(e,t){return this.getViewBounds(e,Fo,Io),t.subVectors(Io,Fo)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(tt*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Ro=class extends No{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},zo=-90,Bo=1,Vo=class extends Sn{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Lo(zo,Bo,e,t);r.layers=this.layers,this.add(r);let i=new Lo(zo,Bo,e,t);i.layers=this.layers,this.add(i);let a=new Lo(zo,Bo,e,t);a.layers=this.layers,this.add(a);let o=new Lo(zo,Bo,e,t);o.layers=this.layers,this.add(o);let s=new Lo(zo,Bo,e,t);s.layers=this.layers,this.add(s);let c=new Lo(zo,Bo,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Ho=class extends Lo{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Uo=`\\[\\]\\.:\\/`,Wo=RegExp(`[\\[\\]\\.:\\/]`,`g`),Go=`[^\\[\\]\\.:\\/]`,Ko=`[^`+Uo.replace(`\\.`,``)+`]`,qo=`((?:WC+[\\/:])*)`.replace(`WC`,Go),Jo=`(WCOD+)?`.replace(`WCOD`,Ko),Yo=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,Go),Xo=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,Go),Zo=RegExp(`^`+qo+Jo+Yo+Xo+`$`),Qo=[`material`,`materials`,`bones`,`map`],$o=class{constructor(e,t,n){let r=n||es.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},es=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(Wo,``)}static parseTrackName(e){let t=Zo.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);Qo.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){H(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){U(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){U(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){U(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){U(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){U(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){U(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){U(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;U(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){U(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){U(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};es.Composite=$o,es.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},es.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},es.prototype.GetterByBindingType=[es.prototype._getValue_direct,es.prototype._getValue_array,es.prototype._getValue_arrayElement,es.prototype._getValue_toArray],es.prototype.SetterByBindingTypeAndVersioning=[[es.prototype._setValue_direct,es.prototype._setValue_direct_setNeedsUpdate,es.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[es.prototype._setValue_array,es.prototype._setValue_array_setNeedsUpdate,es.prototype._setValue_array_setMatrixWorldNeedsUpdate],[es.prototype._setValue_arrayElement,es.prototype._setValue_arrayElement_setNeedsUpdate,es.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[es.prototype._setValue_fromArray,es.prototype._setValue_fromArray_setNeedsUpdate,es.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var ts=new q,ns=class{constructor(e,t,n=0,r=1/0){this.ray=new Ir(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new on,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):U(`Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return ts.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ts),this}intersectObject(e,t=!0,n=[]){return is(e,this,n,t),n.sort(rs),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)is(e[r],this,n,t);return n.sort(rs),n}};function rs(e,t){return e.distance-t.distance}function is(e,t,n,r){let i=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(i=!1),i===!0&&r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)is(r[e],t,n,!0)}}(class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});function as(e,t,n,r){let i=os(r);switch(n){case S:return e*t;case D:return e*t/i.components*i.byteLength;case O:return e*t/i.components*i.byteLength;case k:return e*t*2/i.components*i.byteLength;case A:return e*t*2/i.components*i.byteLength;case C:return e*t*3/i.components*i.byteLength;case w:return e*t*4/i.components*i.byteLength;case j:return e*t*4/i.components*i.byteLength;case M:case N:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case P:case F:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ee:case te:return Math.max(e,16)*Math.max(t,8)/4;case I:case L:return Math.max(e,8)*Math.max(t,8)/2;case ne:case re:case ae:case R:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case ie:case oe:case se:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ce:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case le:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case ue:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case de:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case fe:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case pe:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case me:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case he:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case ge:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case _e:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case ve:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case ye:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case be:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case xe:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Se:case Ce:case we:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Te:case Ee:return Math.ceil(e/4)*Math.ceil(t/4)*8;case De:case Oe:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function os(e){switch(e){case l:case u:return{byteLength:1,components:1};case f:case d:case g:return{byteLength:2,components:1};case _:case v:return{byteLength:2,components:4};case m:case p:case h:return{byteLength:4,components:1};case b:case x:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?H(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`);function ss(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function cs(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var ls={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},X={common:{diffuse:{value:new J(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ot}},envmap:{envMap:{value:null},envMapRotation:{value:new Ot},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ot},normalScale:{value:new G(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new J(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new K},probesMax:{value:new K},probesResolution:{value:new K}},points:{diffuse:{value:new J(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0},uvTransform:{value:new Ot}},sprite:{diffuse:{value:new J(16777215)},opacity:{value:1},center:{value:new G(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}}},us={basic:{uniforms:$a([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.fog]),vertexShader:ls.meshbasic_vert,fragmentShader:ls.meshbasic_frag},lambert:{uniforms:$a([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.fog,X.lights,{emissive:{value:new J(0)},envMapIntensity:{value:1}}]),vertexShader:ls.meshlambert_vert,fragmentShader:ls.meshlambert_frag},phong:{uniforms:$a([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.fog,X.lights,{emissive:{value:new J(0)},specular:{value:new J(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ls.meshphong_vert,fragmentShader:ls.meshphong_frag},standard:{uniforms:$a([X.common,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.roughnessmap,X.metalnessmap,X.fog,X.lights,{emissive:{value:new J(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ls.meshphysical_vert,fragmentShader:ls.meshphysical_frag},toon:{uniforms:$a([X.common,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.gradientmap,X.fog,X.lights,{emissive:{value:new J(0)}}]),vertexShader:ls.meshtoon_vert,fragmentShader:ls.meshtoon_frag},matcap:{uniforms:$a([X.common,X.bumpmap,X.normalmap,X.displacementmap,X.fog,{matcap:{value:null}}]),vertexShader:ls.meshmatcap_vert,fragmentShader:ls.meshmatcap_frag},points:{uniforms:$a([X.points,X.fog]),vertexShader:ls.points_vert,fragmentShader:ls.points_frag},dashed:{uniforms:$a([X.common,X.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ls.linedashed_vert,fragmentShader:ls.linedashed_frag},depth:{uniforms:$a([X.common,X.displacementmap]),vertexShader:ls.depth_vert,fragmentShader:ls.depth_frag},normal:{uniforms:$a([X.common,X.bumpmap,X.normalmap,X.displacementmap,{opacity:{value:1}}]),vertexShader:ls.meshnormal_vert,fragmentShader:ls.meshnormal_frag},sprite:{uniforms:$a([X.sprite,X.fog]),vertexShader:ls.sprite_vert,fragmentShader:ls.sprite_frag},background:{uniforms:{uvTransform:{value:new Ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ls.background_vert,fragmentShader:ls.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ot}},vertexShader:ls.backgroundCube_vert,fragmentShader:ls.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ls.cube_vert,fragmentShader:ls.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ls.equirect_vert,fragmentShader:ls.equirect_frag},distance:{uniforms:$a([X.common,X.displacementmap,{referencePosition:{value:new K},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ls.distance_vert,fragmentShader:ls.distance_frag},shadow:{uniforms:$a([X.lights,X.fog,{color:{value:new J(0)},opacity:{value:1}}]),vertexShader:ls.shadow_vert,fragmentShader:ls.shadow_frag}};us.physical={uniforms:$a([us.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ot},clearcoatNormalScale:{value:new G(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ot},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ot},sheen:{value:0},sheenColor:{value:new J(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ot},transmissionSamplerSize:{value:new G},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ot},attenuationDistance:{value:0},attenuationColor:{value:new J(0)},specularColor:{value:new J(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ot},anisotropyVector:{value:new G},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ot}}]),vertexShader:ls.meshphysical_vert,fragmentShader:ls.meshphysical_frag};var ds={r:0,b:0,g:0},fs=new q,ps=new Ot;ps.set(-1,0,0,0,1,0,0,0,1);function ms(e,t,n,r,i,a){let o=new J(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new Y(new Ci(1,1,1),new oo({name:`BackgroundCubeMaterial`,uniforms:Qa(us.backgroundCube.uniforms),vertexShader:us.backgroundCube.vertexShader,fragmentShader:us.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(fs.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(ps),l.material.toneMapped=Nt.getTransfer(i.colorSpace)!==Le,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new Y(new Ka(2,2),new oo({name:`BackgroundMaterial`,uniforms:Qa(us.background.uniforms),vertexShader:us.background.vertexShader,fragmentShader:us.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Nt.getTransfer(i.colorSpace)!==Le,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(ds,no(e)),n.buffers.color.setClear(ds.r,ds.g,ds.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function hs(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function gs(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function _s(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(H(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&H(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function vs(e){let t=this,n=null,r=0,i=!1,a=!1,o=new kr,s=new Ot,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var ys=4,bs=6,xs=20,Ss=256,Cs=new Ro,ws=new J,Ts=null,Es=0,Ds=0,Os=!1,ks=new K,As=new K,js=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=ks}=i;Ts=this._renderer.getRenderTarget(),Es=this._renderer.getActiveCubeFace(),Ds=this._renderer.getActiveMipmapLevel(),Os=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Rs(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ls(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ts,Es,Ds),this._renderer.xr.enabled=Os,e.scissorTest=!1,Ps(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ts=this._renderer.getRenderTarget(),Es=this._renderer.getActiveCubeFace(),Ds=this._renderer.getActiveMipmapLevel(),Os=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:o,minFilter:o,generateMipmaps:!1,type:g,format:w,colorSpace:Fe,depthBuffer:!1},r=Ns(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ns(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Ms(r)),this._blurMaterial=Is(r,e,t),this._ggxMaterial=Fs(r,e,t)}return r}_compileMaterial(e){let t=new Y(new Tr,e);this._renderer.compile(t,Cs)}_sceneToCubeUV(e,t,n,r,i){let a=new Lo(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(ws),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Y(new Ci,new Lr({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(ws),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;Ps(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Rs()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ls());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Ps(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Cs)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-ys?n-d+ys:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,Ps(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,Cs),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,Ps(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,Cs)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];Ps(t,3*l*(r>this._lodMax-ys?r-this._lodMax+ys:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,Cs)}};function Ms(e){let t=[],n=[],r=e,i=e-ys+1+bs;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?As.set(1,r,n):e===1?As.set(-n,1,-r):e===2?As.set(-n,r,1):e===3?As.set(-1,r,-n):e===4?As.set(-n,-1,r):As.set(n,r,-1),As.toArray(l,(e*6+t)*3)}}let u=new Tr;u.setAttribute(`position`,new ur(c,3)),u.setAttribute(`outputDirection`,new ur(l,3)),n.push(new Y(u,null)),r>ys&&r--}return{lodMeshes:n,sizeLods:t}}function Ns(e,t,n){let r=new Kt(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Ps(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function Fs(e,t,n){return new oo({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:Ss,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:zs(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Is(e,t,n){return new oo({name:`SphericalGaussianBlur`,defines:{SAMPLES:xs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:zs(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ls(){return new oo({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:zs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Rs(){return new oo({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:zs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function zs(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Bs=class extends Kt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new vi(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ci(5,5,5),i=new oo({name:`CubemapFromEquirect`,uniforms:Qa(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new Y(r,i),s=t.minFilter;return t.minFilter===1008&&(t.minFilter=o),new Vo(1,10,this).update(e,a),t.minFilter=s,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function Vs(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new Bs(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new js(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new js(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Hs(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Ye(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Us(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0||(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++),t}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?fr:dr)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function Ws(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Gs(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:U(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Ks(e,t,n){let r=new WeakMap,i=new Wt;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let g=new Float32Array(p*m*4*u),_=new qt(g,p,m,u);_.type=h,_.needsUpdate=!0;let v=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*v;e===!0&&(i.fromBufferAttribute(r,t),g[d+s+0]=i.x,g[d+s+1]=i.y,g[d+s+2]=i.z,g[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),g[d+s+4]=i.x,g[d+s+5]=i.y,g[d+s+6]=i.z,g[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),g[d+s+8]=i.x,g[d+s+9]=i.y,g[d+s+10]=i.z,g[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:_,size:new G(p,m)},r.set(o,d);function y(){_.dispose(),r.delete(o),o.removeEventListener(`dispose`,y)}o.addEventListener(`dispose`,y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function qs(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var Js={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function Ys(e,t,n,r,i,a){let o=new Kt(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new Tr;l.setAttribute(`position`,new pr([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new pr([0,2,0,0,2,0],2));let u=new so({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Y(l,u),f=new Ro(-1,1,1,-1,0,1),p=null,m=null,h=!1,_,v=null,y=[],b=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<y.length;n++){let r=y[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){y=e,b=y.length>0&&y[0].isRenderPass===!0;let t=o.width,n=o.height;y.length>0&&s===null&&(s=new Kt(t,n,{type:g,depthBuffer:!1,stencilBuffer:!1}),c=new Kt(t,n,{type:g,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<y.length;e++){let r=y[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&y.length===0)return!1;if(v=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return b===!1&&e.setRenderTarget(o),_=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return b},this.end=function(e,t){e.toneMapping=_,h=!0;let n=o,r=s;for(let i=0;i<y.length;i++){let a=y[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},Nt.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=Js[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(v),e.render(d,f),v=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var Xs=new Ut,Zs=new bi(1,1),Qs=new qt,$s=new Jt,ec=new vi,tc=[],nc=[],rc=new Float32Array(16),ic=new Float32Array(9),ac=new Float32Array(4);function oc(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=tc[i];if(a===void 0&&(a=new Float32Array(i),tc[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function sc(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function cc(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function lc(e,t){let n=nc[t];n===void 0&&(n=new Int32Array(t),nc[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function uc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function dc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(sc(n,t))return;e.uniform2fv(this.addr,t),cc(n,t)}}function fc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(sc(n,t))return;e.uniform3fv(this.addr,t),cc(n,t)}}function pc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(sc(n,t))return;e.uniform4fv(this.addr,t),cc(n,t)}}function mc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(sc(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),cc(n,t)}else{if(sc(n,r))return;ac.set(r),e.uniformMatrix2fv(this.addr,!1,ac),cc(n,r)}}function hc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(sc(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),cc(n,t)}else{if(sc(n,r))return;ic.set(r),e.uniformMatrix3fv(this.addr,!1,ic),cc(n,r)}}function gc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(sc(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),cc(n,t)}else{if(sc(n,r))return;rc.set(r),e.uniformMatrix4fv(this.addr,!1,rc),cc(n,r)}}function _c(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function vc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(sc(n,t))return;e.uniform2iv(this.addr,t),cc(n,t)}}function yc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(sc(n,t))return;e.uniform3iv(this.addr,t),cc(n,t)}}function bc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(sc(n,t))return;e.uniform4iv(this.addr,t),cc(n,t)}}function xc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Sc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(sc(n,t))return;e.uniform2uiv(this.addr,t),cc(n,t)}}function Cc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(sc(n,t))return;e.uniform3uiv(this.addr,t),cc(n,t)}}function wc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(sc(n,t))return;e.uniform4uiv(this.addr,t),cc(n,t)}}function Tc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(Zs.compareFunction=n.isReversedDepthBuffer()?518:515,a=Zs):a=Xs,n.setTexture2D(t||a,i)}function Ec(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||$s,i)}function Dc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||ec,i)}function Oc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Qs,i)}function kc(e){switch(e){case 5126:return uc;case 35664:return dc;case 35665:return fc;case 35666:return pc;case 35674:return mc;case 35675:return hc;case 35676:return gc;case 5124:case 35670:return _c;case 35667:case 35671:return vc;case 35668:case 35672:return yc;case 35669:case 35673:return bc;case 5125:return xc;case 36294:return Sc;case 36295:return Cc;case 36296:return wc;case 35678:case 36198:case 36298:case 36306:case 35682:return Tc;case 35679:case 36299:case 36307:return Ec;case 35680:case 36300:case 36308:case 36293:return Dc;case 36289:case 36303:case 36311:case 36292:return Oc}}function Ac(e,t){e.uniform1fv(this.addr,t)}function jc(e,t){let n=oc(t,this.size,2);e.uniform2fv(this.addr,n)}function Mc(e,t){let n=oc(t,this.size,3);e.uniform3fv(this.addr,n)}function Nc(e,t){let n=oc(t,this.size,4);e.uniform4fv(this.addr,n)}function Pc(e,t){let n=oc(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Fc(e,t){let n=oc(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Ic(e,t){let n=oc(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Lc(e,t){e.uniform1iv(this.addr,t)}function Rc(e,t){e.uniform2iv(this.addr,t)}function zc(e,t){e.uniform3iv(this.addr,t)}function Bc(e,t){e.uniform4iv(this.addr,t)}function Vc(e,t){e.uniform1uiv(this.addr,t)}function Hc(e,t){e.uniform2uiv(this.addr,t)}function Uc(e,t){e.uniform3uiv(this.addr,t)}function Wc(e,t){e.uniform4uiv(this.addr,t)}function Gc(e,t,n){let r=this.cache,i=t.length,a=lc(n,i);sc(r,a)||(e.uniform1iv(this.addr,a),cc(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?Zs:Xs;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Kc(e,t,n){let r=this.cache,i=t.length,a=lc(n,i);sc(r,a)||(e.uniform1iv(this.addr,a),cc(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||$s,a[e])}function qc(e,t,n){let r=this.cache,i=t.length,a=lc(n,i);sc(r,a)||(e.uniform1iv(this.addr,a),cc(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||ec,a[e])}function Jc(e,t,n){let r=this.cache,i=t.length,a=lc(n,i);sc(r,a)||(e.uniform1iv(this.addr,a),cc(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Qs,a[e])}function Yc(e){switch(e){case 5126:return Ac;case 35664:return jc;case 35665:return Mc;case 35666:return Nc;case 35674:return Pc;case 35675:return Fc;case 35676:return Ic;case 5124:case 35670:return Lc;case 35667:case 35671:return Rc;case 35668:case 35672:return zc;case 35669:case 35673:return Bc;case 5125:return Vc;case 36294:return Hc;case 36295:return Uc;case 36296:return Wc;case 35678:case 36198:case 36298:case 36306:case 35682:return Gc;case 35679:case 36299:case 36307:return Kc;case 35680:case 36300:case 36308:case 36293:return qc;case 36289:case 36303:case 36311:case 36292:return Jc}}var Xc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=kc(t.type)}},Zc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Yc(t.type)}},Qc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},$c=/(\w+)(\])?(\[|\.)?/g;function el(e,t){e.seq.push(t),e.map[t.id]=t}function tl(e,t,n){let r=e.name,i=r.length;for($c.lastIndex=0;;){let a=$c.exec(r),o=$c.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){el(n,l===void 0?new Xc(s,e,t):new Zc(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new Qc(s),el(n,e)),n=e}}}var nl=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);tl(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function rl(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var il=37297,al=0;function ol(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var sl=new Ot;function cl(e){Nt._getMatrix(sl,Nt.workingColorSpace,e);let t=`mat3( ${sl.elements.map(e=>e.toFixed(4))} )`;switch(Nt.getTransfer(e)){case Ie:return[t,`LinearTransferOETF`];case Le:return[t,`sRGBTransferOETF`];default:return H(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function ll(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+ol(e.getShaderSource(t),r)}return i}function ul(e,t){let n=cl(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var dl={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function fl(e,t){let n=dl[t];return n===void 0?(H(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var pl=new K;function ml(){return Nt.getLuminanceCoefficients(pl),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${pl.x.toFixed(4)}, ${pl.y.toFixed(4)}, ${pl.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function hl(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(vl).join(`
`)}function gl(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function _l(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function vl(e){return e!==``}function yl(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function bl(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var xl=/^[ \t]*#include +<([\w\d./]+)>/gm;function Sl(e){return e.replace(xl,wl)}var Cl=new Map;function wl(e,t){let n=ls[t];if(n===void 0){let e=Cl.get(t);if(e!==void 0)n=ls[e],H(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return Sl(n)}var Tl=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function El(e){return e.replace(Tl,Dl)}function Dl(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Ol(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var kl={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Al(e){return kl[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var jl={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function Ml(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:jl[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var Nl={302:`ENVMAP_MODE_REFRACTION`};function Pl(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Nl[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Fl={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Il(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Fl[e.combine]||`ENVMAP_BLENDING_NONE`}function Ll(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function Rl(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Al(n),l=Ml(n),u=Pl(n),d=Il(n),f=Ll(n),p=hl(n),m=gl(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(vl).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(vl).join(`
`),_.length>0&&(_+=`
`)):(g=[Ol(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(vl).join(`
`),_=[Ol(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:ls.tonemapping_pars_fragment,n.toneMapping===0?``:fl(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,ls.colorspace_pars_fragment,ul(`linearToOutputTexel`,n.outputColorSpace),ml(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(vl).join(`
`)),o=Sl(o),o=yl(o,n),o=bl(o,n),s=Sl(s),s=yl(s,n),s=bl(s,n),o=El(o),s=El(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=rl(i,i.VERTEX_SHADER,y),S=rl(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=ll(i,x,`vertex`),n=ll(i,S,`fragment`);U(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):H(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new nl(i,h),T=_l(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,il)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=al++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var zl=0,Bl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Vl(e),t.set(e,n)),n}},Vl=class{constructor(e){this.id=zl++,this.code=e,this.usedTimes=0}};function Hl(e){return e===1030||e===37490||e===36285}function Ul(e,t,n,r,i,a){let o=new on,s=new Bl,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&H(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=us[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let j=e.getRenderTarget(),M=e.state.buffers.depth.getReversed(),N=h.isInstancedMesh===!0,P=h.isBatchedMesh===!0,F=!!i.map,I=!!i.matcap,ee=!!x,L=!!i.aoMap,te=!!i.lightMap,ne=!!i.bumpMap&&i.wireframe===!1,re=!!i.normalMap,ie=!!i.displacementMap,ae=!!i.emissiveMap,R=!!i.metalnessMap,oe=!!i.roughnessMap,se=i.anisotropy>0,ce=i.clearcoat>0,le=i.dispersion>0,ue=i.retroreflectivity>0,de=i.iridescence>0,fe=i.sheen>0,pe=i.transmission>0,me=se&&!!i.anisotropyMap,he=ce&&!!i.clearcoatMap,ge=ce&&!!i.clearcoatNormalMap,_e=ce&&!!i.clearcoatRoughnessMap,ve=de&&!!i.iridescenceMap,ye=de&&!!i.iridescenceThicknessMap,be=fe&&!!i.sheenColorMap,xe=fe&&!!i.sheenRoughnessMap,Se=!!i.specularMap,Ce=!!i.specularColorMap,we=!!i.specularIntensityMap,Te=pe&&!!i.transmissionMap,Ee=pe&&!!i.thicknessMap,De=!!i.gradientMap,Oe=!!i.alphaMap,ke=i.alphaTest>0,z=!!i.alphaHash,Ae=!!i.extensions,je=0;i.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(je=e.toneMapping);let Me={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:P,batchingColor:P&&h._colorsTexture!==null,instancing:N,instancingColor:N&&h.instanceColor!==null,instancingMorph:N&&h.morphTexture!==null,outputColorSpace:j===null?e.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Nt.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:F,matcap:I,envMap:ee,envMapMode:ee&&x.mapping,envMapCubeUVHeight:S,aoMap:L,lightMap:te,bumpMap:ne,normalMap:re,displacementMap:ie,emissiveMap:ae,normalMapObjectSpace:re&&i.normalMapType===1,normalMapTangentSpace:re&&i.normalMapType===0,packedNormalMap:re&&i.normalMapType===0&&Hl(i.normalMap.format),metalnessMap:R,roughnessMap:oe,anisotropy:se,anisotropyMap:me,clearcoat:ce,clearcoatMap:he,clearcoatNormalMap:ge,clearcoatRoughnessMap:_e,dispersion:le,retroreflection:ue,iridescence:de,iridescenceMap:ve,iridescenceThicknessMap:ye,sheen:fe,sheenColorMap:be,sheenRoughnessMap:xe,specularMap:Se,specularColorMap:Ce,specularIntensityMap:we,transmission:pe,transmissionMap:Te,thicknessMap:Ee,gradientMap:De,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Oe,alphaTest:ke,alphaHash:z,combine:i.combine,mapUv:F&&m(i.map.channel),aoMapUv:L&&m(i.aoMap.channel),lightMapUv:te&&m(i.lightMap.channel),bumpMapUv:ne&&m(i.bumpMap.channel),normalMapUv:re&&m(i.normalMap.channel),displacementMapUv:ie&&m(i.displacementMap.channel),emissiveMapUv:ae&&m(i.emissiveMap.channel),metalnessMapUv:R&&m(i.metalnessMap.channel),roughnessMapUv:oe&&m(i.roughnessMap.channel),anisotropyMapUv:me&&m(i.anisotropyMap.channel),clearcoatMapUv:he&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:ge&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_e&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:ve&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:ye&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:be&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:xe&&m(i.sheenRoughnessMap.channel),specularMapUv:Se&&m(i.specularMap.channel),specularColorMapUv:Ce&&m(i.specularColorMap.channel),specularIntensityMapUv:we&&m(i.specularIntensityMap.channel),transmissionMapUv:Te&&m(i.transmissionMap.channel),thicknessMapUv:Ee&&m(i.thicknessMap.channel),alphaMapUv:Oe&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(re||se),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(F||Oe),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&re===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:M,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:je,decodeVideoTexture:F&&i.map.isVideoTexture===!0&&Nt.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:ae&&i.emissiveMap.isVideoTexture===!0&&Nt.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Ae&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Ae&&i.extensions.multiDraw===!0||P)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Me.vertexUv1s=c.has(1),Me.vertexUv2s=c.has(2),Me.vertexUv3s=c.has(3),c.clear(),Me}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=us[t];n=ro.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new Rl(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function Wl(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Gl(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Kl(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function ql(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||Gl),r.length>1&&r.sort(t||Kl),i.length>1&&i.sort(t||Kl)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Jl(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new ql,e.set(t,[i])):n>=r.length?(i=new ql,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Yl(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new K,color:new J};break;case`SpotLight`:n={position:new K,direction:new K,color:new J,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new K,color:new J,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new K,skyColor:new J,groundColor:new J};break;case`RectAreaLight`:n={color:new J,position:new K,halfWidth:new K,halfHeight:new K}}return e[t.id]=n,n}}}function Xl(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new G};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new G};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new G,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var Zl=0;function Ql(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function $l(e){let t=new Yl,n=Xl(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new K);let i=new K,a=new q,o=new q;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(Ql);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=X.LTC_FLOAT_1,r.rectAreaLTC2=X.LTC_FLOAT_2):(r.rectAreaLTC1=X.LTC_HALF_1,r.rectAreaLTC2=X.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=Zl++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function eu(e){let t=new $l(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function tu(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new eu(e),t.set(n,[a])):r>=i.length?(a=new eu(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var nu=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ru=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,iu=[new K(1,0,0),new K(-1,0,0),new K(0,1,0),new K(0,-1,0),new K(0,0,1),new K(0,0,-1)],au=[new K(0,-1,0),new K(0,-1,0),new K(0,0,1),new K(0,0,-1),new K(0,-1,0),new K(0,-1,0)],ou=new q,su=new K,cu=new K;function lu(e,t,n){let i=new ui,a=new G,s=new G,c=new Wt,l=new co,u=new lo,d={},f=n.maxTextureSize,p={0:1,1:0,2:2},_=new oo({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new G},radius:{value:4}},vertexShader:nu,fragmentShader:ru}),v=_.clone();v.defines.HORIZONTAL_PASS=1;let y=new Tr;y.setAttribute(`position`,new ur(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new Y(y,_),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let S=this.type;this.render=function(t,n,l){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||t.length===0)return;this.type===2&&(H(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.state;_.setBlending(0),_.buffers.depth.getReversed()===!0?_.buffers.color.setClear(0,0,0,0):_.buffers.color.setClear(1,1,1,1),_.buffers.depth.setTest(!0),_.setScissorTest(!1);let v=S!==this.type;v&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let u=0,d=t.length;u<d;u++){let d=t[u],p=d.shadow;if(p===void 0){H(`WebGLShadowMap:`,d,`has no shadow.`);continue}if(p.autoUpdate===!1&&p.needsUpdate===!1)continue;a.copy(p.mapSize);let y=p.getFrameExtents();a.multiply(y),s.copy(p.mapSize),(a.x>f||a.y>f)&&(a.x>f&&(s.x=Math.floor(f/y.x),a.x=s.x*y.x,p.mapSize.x=s.x),a.y>f&&(s.y=Math.floor(f/y.y),a.y=s.y*y.y,p.mapSize.y=s.y));let b=e.state.buffers.depth.getReversed();if(p.camera._reversedDepth=b,p.map===null||v===!0){if(p.map!==null&&(p.map.depthTexture!==null&&(p.map.depthTexture.dispose(),p.map.depthTexture=null),p.map.dispose()),this.type===3){if(d.isPointLight){H(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}p.map=new Kt(a.x,a.y,{format:k,type:g,minFilter:o,magFilter:o,generateMipmaps:!1}),p.map.texture.name=d.name+`.shadowMap`,p.map.depthTexture=new bi(a.x,a.y,h),p.map.depthTexture.name=d.name+`.shadowMapDepth`,p.map.depthTexture.format=T,p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=r,p.map.depthTexture.magFilter=r}else d.isPointLight?(p.map=new Bs(a.x),p.map.depthTexture=new xi(a.x,m)):(p.map=new Kt(a.x,a.y),p.map.depthTexture=new bi(a.x,a.y,m)),p.map.depthTexture.name=d.name+`.shadowMap`,p.map.depthTexture.format=T,this.type===1?(p.map.depthTexture.compareFunction=b?518:515,p.map.depthTexture.minFilter=o,p.map.depthTexture.magFilter=o):(p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=r,p.map.depthTexture.magFilter=r);p.camera.updateProjectionMatrix()}p.map.isWebGLCubeRenderTarget!==!0&&(p.map.width!==a.x||p.map.height!==a.y)&&p.map.setSize(a.x,a.y);let x=p.map.isWebGLCubeRenderTarget?6:p.getViewportCount();d.isPointLight!==!0&&p.updateMatrices(d,l);for(let t=0;t<x;t++){let r=p.getCamera(t);if(d.isPointLight){let e=p.camera,n=p.matrix,r=d.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),su.setFromMatrixPosition(d.matrixWorld),e.position.copy(su),cu.copy(e.position),cu.add(iu[t]),e.up.copy(au[t]),e.lookAt(cu),e.updateMatrixWorld(),n.makeTranslation(-su.x,-su.y,-su.z),ou.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),p._frustum.setFromProjectionMatrix(ou,e.coordinateSystem,e.reversedDepth)}if(p.map.isWebGLCubeRenderTarget)e.setRenderTarget(p.map,t),e.clear();else{t===0&&(e.setRenderTarget(p.map),e.clear());let n=p.getViewport(t);c.set(s.x*n.x,s.y*n.y,s.x*n.z,s.y*n.w),_.viewport(c)}i=p.getFrustum(t),E(n,l,r,d,this.type)}p.isPointLightShadow!==!0&&this.type===3&&C(p,l),p.needsUpdate=!1}S=this.type,x.needsUpdate=!1,e.setRenderTarget(u,d,p)};function C(n,r){let i=t.update(b);_.defines.VSM_SAMPLES!==n.blurSamples&&(_.defines.VSM_SAMPLES=n.blurSamples,v.defines.VSM_SAMPLES=n.blurSamples,_.needsUpdate=!0,v.needsUpdate=!0),n.mapPass===null?n.mapPass=new Kt(a.x,a.y,{format:k,type:g}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),_.uniforms.shadow_pass.value=n.map.depthTexture,_.uniforms.resolution.value.set(n.map.width,n.map.height),_.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,i,_,b,null),v.uniforms.shadow_pass.value=n.mapPass.texture,v.uniforms.resolution.value.set(n.map.width,n.map.height),v.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,i,v,b,null)}function w(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?u:l,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=d[e];r===void 0&&(r={},d[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,D)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?p[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function E(n,r,a,o,s){if(n.visible===!1)return;if(n.layers.test(r.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(i))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let i=t.update(n),c=n.material;if(Array.isArray(c)){let t=i.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=w(n,d,o,s);n.onBeforeShadow(e,n,r,a,i,t,u),e.renderBufferDirect(a,null,i,t,n,u),n.onAfterShadow(e,n,r,a,i,t,u)}}}else if(c.visible){let t=w(n,c,o,s);n.onBeforeShadow(e,n,r,a,i,t,null),e.renderBufferDirect(a,null,i,t,n,null),n.onAfterShadow(e,n,r,a,i,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)E(c[e],r,a,o,s)}function D(e){e.target.removeEventListener(`dispose`,D);for(let t in d){let n=d[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function uu(e,t){function n(){let t=!1,n=new Wt,r=null,i=new Wt(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?R(e.DEPTH_TEST):oe(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=Ze[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?R(e.STENCIL_TEST):oe(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new J(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,M=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,P=0,F=e.getParameter(e.VERSION);F.indexOf(`WebGL`)===-1?F.indexOf(`OpenGL ES`)!==-1&&(P=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),N=P>=2):(P=parseFloat(/^WebGL (\d)/.exec(F)[1]),N=P>=1);let I=null,ee={},L=e.getParameter(e.SCISSOR_BOX),te=e.getParameter(e.VIEWPORT),ne=new Wt().fromArray(L),re=new Wt().fromArray(te);function ie(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let ae={};ae[e.TEXTURE_2D]=ie(e.TEXTURE_2D,e.TEXTURE_2D,1),ae[e.TEXTURE_CUBE_MAP]=ie(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),ae[e.TEXTURE_2D_ARRAY]=ie(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ae[e.TEXTURE_3D]=ie(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),R(e.DEPTH_TEST),o.setFunc(3),me(!1),he(1),R(e.CULL_FACE),fe(0);function R(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function oe(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function se(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function ce(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function le(t){return h!==t&&(e.useProgram(t),h=t,!0)}let ue={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};ue[103]=e.MIN,ue[104]=e.MAX;let de={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function fe(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(oe(e.BLEND),g=!1);else if(g===!1&&(R(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:U(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:U(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:U(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:U(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(ue[n],ue[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(de[r],de[i],de[o],de[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function pe(t,n){t.side===2?oe(e.CULL_FACE):R(e.CULL_FACE);let r=t.side===1;n&&(r=!r),me(r),t.blending===1&&t.transparent===!1?fe(0):fe(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),_e(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?R(e.SAMPLE_ALPHA_TO_COVERAGE):oe(e.SAMPLE_ALPHA_TO_COVERAGE)}function me(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function he(t){t===0?oe(e.CULL_FACE):(R(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function ge(t){t!==k&&(N&&e.lineWidth(t),k=t)}function _e(t,n,r){t?(R(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):oe(e.POLYGON_OFFSET_FILL)}function ve(t){t?R(e.SCISSOR_TEST):oe(e.SCISSOR_TEST)}function ye(t){t===void 0&&(t=e.TEXTURE0+M-1),I!==t&&(e.activeTexture(t),I=t)}function be(t,n,r){r===void 0&&(r=I===null?e.TEXTURE0+M-1:I);let i=ee[r];i===void 0&&(i={type:void 0,texture:void 0},ee[r]=i),(i.type!==t||i.texture!==n)&&(I!==r&&(e.activeTexture(r),I=r),e.bindTexture(t,n||ae[t]),i.type=t,i.texture=n)}function xe(){let t=ee[I];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Se(){try{e.compressedTexImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Ce(){try{e.compressedTexImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function we(){try{e.texSubImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Te(){try{e.texSubImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Ee(){try{e.compressedTexSubImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function De(){try{e.compressedTexSubImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Oe(){try{e.texStorage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function ke(){try{e.texStorage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function z(){try{e.texImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Ae(){try{e.texImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function je(t){return d[t]===void 0?e.getParameter(t):d[t]}function Me(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function B(t){ne.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ne.copy(t))}function Ne(t){re.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),re.copy(t))}function V(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Pe(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Fe(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},I=null,ee={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new J(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,ne.set(0,0,e.canvas.width,e.canvas.height),re.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:R,disable:oe,bindFramebuffer:se,drawBuffers:ce,useProgram:le,setBlending:fe,setMaterial:pe,setFlipSided:me,setCullFace:he,setLineWidth:ge,setPolygonOffset:_e,setScissorTest:ve,activeTexture:ye,bindTexture:be,unbindTexture:xe,compressedTexImage2D:Se,compressedTexImage3D:Ce,texImage2D:z,texImage3D:Ae,pixelStorei:Me,getParameter:je,updateUBOMapping:V,uniformBlockBinding:Pe,texStorage2D:Oe,texStorage3D:ke,texSubImage2D:we,texSubImage3D:Te,compressedTexSubImage2D:Ee,compressedTexSubImage3D:De,scissor:B,viewport:Ne,reset:Fe}}function du(l,u,d,f,p,m,h){let g=u.has(`WEBGL_multisampled_render_to_texture`)?u.get(`WEBGL_multisampled_render_to_texture`):null,_=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),v=new G,y=new WeakMap,b=new Set,x,S=new WeakMap,C=!1;try{C=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function w(e,t){return C?new OffscreenCanvas(e,t):We(`canvas`)}function T(e,t,n){let r=1,i=je(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);x===void 0&&(x=w(n,a));let o=t?w(n,a):x;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),H(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&H(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function D(e){return e.generateMipmaps}function O(e){l.generateMipmap(e)}function k(e){return e.isWebGLCubeRenderTarget?l.TEXTURE_CUBE_MAP:e.isWebGL3DRenderTarget?l.TEXTURE_3D:e.isWebGLArrayRenderTarget||e.isCompressedArrayTexture?l.TEXTURE_2D_ARRAY:l.TEXTURE_2D}function A(e,t,n,r,i,a=!1){if(e!==null){if(l[e]!==void 0)return l[e];H(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+e+`'`)}let o;r&&(o=u.get(`EXT_texture_norm16`),o||H(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let s=t;if(t===l.RED&&(n===l.FLOAT&&(s=l.R32F),n===l.HALF_FLOAT&&(s=l.R16F),n===l.UNSIGNED_BYTE&&(s=l.R8),n===l.UNSIGNED_SHORT&&o&&(s=o.R16_EXT),n===l.SHORT&&o&&(s=o.R16_SNORM_EXT)),t===l.RED_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.R8UI),n===l.UNSIGNED_SHORT&&(s=l.R16UI),n===l.UNSIGNED_INT&&(s=l.R32UI),n===l.BYTE&&(s=l.R8I),n===l.SHORT&&(s=l.R16I),n===l.INT&&(s=l.R32I)),t===l.RG&&(n===l.FLOAT&&(s=l.RG32F),n===l.HALF_FLOAT&&(s=l.RG16F),n===l.UNSIGNED_BYTE&&(s=l.RG8),n===l.UNSIGNED_SHORT&&o&&(s=o.RG16_EXT),n===l.SHORT&&o&&(s=o.RG16_SNORM_EXT)),t===l.RG_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.RG8UI),n===l.UNSIGNED_SHORT&&(s=l.RG16UI),n===l.UNSIGNED_INT&&(s=l.RG32UI),n===l.BYTE&&(s=l.RG8I),n===l.SHORT&&(s=l.RG16I),n===l.INT&&(s=l.RG32I)),t===l.RGB_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.RGB8UI),n===l.UNSIGNED_SHORT&&(s=l.RGB16UI),n===l.UNSIGNED_INT&&(s=l.RGB32UI),n===l.BYTE&&(s=l.RGB8I),n===l.SHORT&&(s=l.RGB16I),n===l.INT&&(s=l.RGB32I)),t===l.RGBA_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.RGBA8UI),n===l.UNSIGNED_SHORT&&(s=l.RGBA16UI),n===l.UNSIGNED_INT&&(s=l.RGBA32UI),n===l.BYTE&&(s=l.RGBA8I),n===l.SHORT&&(s=l.RGBA16I),n===l.INT&&(s=l.RGBA32I)),t===l.RGB&&(n===l.UNSIGNED_SHORT&&o&&(s=o.RGB16_EXT),n===l.SHORT&&o&&(s=o.RGB16_SNORM_EXT),n===l.UNSIGNED_INT_5_9_9_9_REV&&(s=l.RGB9_E5),n===l.UNSIGNED_INT_10F_11F_11F_REV&&(s=l.R11F_G11F_B10F)),t===l.RGBA){let e=a?Ie:Nt.getTransfer(i);n===l.FLOAT&&(s=l.RGBA32F),n===l.HALF_FLOAT&&(s=l.RGBA16F),n===l.UNSIGNED_BYTE&&(s=e===`srgb`?l.SRGB8_ALPHA8:l.RGBA8),n===l.UNSIGNED_SHORT&&o&&(s=o.RGBA16_EXT),n===l.SHORT&&o&&(s=o.RGBA16_SNORM_EXT),n===l.UNSIGNED_SHORT_4_4_4_4&&(s=l.RGBA4),n===l.UNSIGNED_SHORT_5_5_5_1&&(s=l.RGB5_A1)}return(s===l.R16F||s===l.R32F||s===l.RG16F||s===l.RG32F||s===l.RGBA16F||s===l.RGBA32F)&&u.get(`EXT_color_buffer_float`),s}function j(e,t){let n;return e?t===null||t===1014||t===1020?n=l.DEPTH24_STENCIL8:t===1015?n=l.DEPTH32F_STENCIL8:t===1012&&(n=l.DEPTH24_STENCIL8,H(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):t===null||t===1014||t===1020?n=l.DEPTH_COMPONENT24:t===1015?n=l.DEPTH_COMPONENT32F:t===1012&&(n=l.DEPTH_COMPONENT16),n}function M(e,t){return D(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function N(e){let t=e.target;t.removeEventListener(`dispose`,N),F(t),t.isVideoTexture&&y.delete(t),t.isHTMLTexture&&b.delete(t)}function P(e){let t=e.target;t.removeEventListener(`dispose`,P),ee(t)}function F(e){let t=f.get(e);if(t.__webglInit===void 0)return;let n=e.source,r=S.get(n);if(r){let i=r[t.__cacheKey];i.usedTimes--,i.usedTimes===0&&I(e),Object.keys(r).length===0&&S.delete(n)}f.remove(e)}function I(e){let t=f.get(e);l.deleteTexture(t.__webglTexture);let n=e.source,r=S.get(n);delete r[t.__cacheKey],h.memory.textures--}function ee(e){let t=f.get(e);if(e.depthTexture&&(e.depthTexture.dispose(),f.remove(e.depthTexture)),e.isWebGLCubeRenderTarget)for(let e=0;e<6;e++){if(Array.isArray(t.__webglFramebuffer[e]))for(let n=0;n<t.__webglFramebuffer[e].length;n++)l.deleteFramebuffer(t.__webglFramebuffer[e][n]);else l.deleteFramebuffer(t.__webglFramebuffer[e]);t.__webglDepthbuffer&&l.deleteRenderbuffer(t.__webglDepthbuffer[e])}else{if(Array.isArray(t.__webglFramebuffer))for(let e=0;e<t.__webglFramebuffer.length;e++)l.deleteFramebuffer(t.__webglFramebuffer[e]);else l.deleteFramebuffer(t.__webglFramebuffer);if(t.__webglDepthbuffer&&l.deleteRenderbuffer(t.__webglDepthbuffer),t.__webglMultisampledFramebuffer&&l.deleteFramebuffer(t.__webglMultisampledFramebuffer),t.__webglColorRenderbuffer)for(let e=0;e<t.__webglColorRenderbuffer.length;e++)t.__webglColorRenderbuffer[e]&&l.deleteRenderbuffer(t.__webglColorRenderbuffer[e]);t.__webglDepthRenderbuffer&&l.deleteRenderbuffer(t.__webglDepthRenderbuffer)}let n=e.textures;for(let e=0,t=n.length;e<t;e++){let t=f.get(n[e]);t.__webglTexture&&(l.deleteTexture(t.__webglTexture),h.memory.textures--),f.remove(n[e])}f.remove(e)}let L=0;function te(){L=0}function ne(){return L}function re(e){L=e}function ie(){let e=L;return e>=p.maxTextures&&H(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+p.maxTextures),L+=1,e}function ae(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function R(e,t){let n=f.get(e);if(e.isVideoTexture&&z(e),e.isRenderTargetTexture===!1&&e.isExternalTexture!==!0&&e.version>0&&n.__version!==e.version){let r=e.image;if(r===null)H(`WebGLRenderer: Texture marked for update but no image data found.`);else if(r.complete===!1)H(`WebGLRenderer: Texture marked for update but image is incomplete`);else{ge(n,e,t);return}}else e.isExternalTexture&&(n.__webglTexture=e.sourceTexture?e.sourceTexture:null);d.bindTexture(l.TEXTURE_2D,n.__webglTexture,l.TEXTURE0+t)}function oe(e,t){let n=f.get(e);e.isRenderTargetTexture===!1&&e.version>0&&n.__version!==e.version?ge(n,e,t):(e.isExternalTexture&&(n.__webglTexture=e.sourceTexture?e.sourceTexture:null),d.bindTexture(l.TEXTURE_2D_ARRAY,n.__webglTexture,l.TEXTURE0+t))}function se(e,t){let n=f.get(e);e.isRenderTargetTexture===!1&&e.version>0&&n.__version!==e.version?ge(n,e,t):d.bindTexture(l.TEXTURE_3D,n.__webglTexture,l.TEXTURE0+t)}function ce(e,t){let n=f.get(e);e.isCubeDepthTexture!==!0&&e.version>0&&n.__version!==e.version?_e(n,e,t):d.bindTexture(l.TEXTURE_CUBE_MAP,n.__webglTexture,l.TEXTURE0+t)}let le={[e]:l.REPEAT,[t]:l.CLAMP_TO_EDGE,[n]:l.MIRRORED_REPEAT},ue={[r]:l.NEAREST,[i]:l.NEAREST_MIPMAP_NEAREST,[a]:l.NEAREST_MIPMAP_LINEAR,[o]:l.LINEAR,[s]:l.LINEAR_MIPMAP_NEAREST,[c]:l.LINEAR_MIPMAP_LINEAR},de={512:l.NEVER,519:l.ALWAYS,513:l.LESS,515:l.LEQUAL,514:l.EQUAL,518:l.GEQUAL,516:l.GREATER,517:l.NOTEQUAL};function fe(e,t){if(t.type===1015&&u.has(`OES_texture_float_linear`)===!1&&(t.magFilter===1006||t.magFilter===1007||t.magFilter===1005||t.magFilter===1008||t.minFilter===1006||t.minFilter===1007||t.minFilter===1005||t.minFilter===1008)&&H(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),l.texParameteri(e,l.TEXTURE_WRAP_S,le[t.wrapS]),l.texParameteri(e,l.TEXTURE_WRAP_T,le[t.wrapT]),(e===l.TEXTURE_3D||e===l.TEXTURE_2D_ARRAY)&&l.texParameteri(e,l.TEXTURE_WRAP_R,le[t.wrapR]),l.texParameteri(e,l.TEXTURE_MAG_FILTER,ue[t.magFilter]),l.texParameteri(e,l.TEXTURE_MIN_FILTER,ue[t.minFilter]),t.compareFunction&&(l.texParameteri(e,l.TEXTURE_COMPARE_MODE,l.COMPARE_REF_TO_TEXTURE),l.texParameteri(e,l.TEXTURE_COMPARE_FUNC,de[t.compareFunction])),u.has(`EXT_texture_filter_anisotropic`)===!0){if(t.magFilter===1003||t.minFilter!==1005&&t.minFilter!==1008||t.type===1015&&u.has(`OES_texture_float_linear`)===!1)return;if(t.anisotropy>1||f.get(t).__currentAnisotropy){let n=u.get(`EXT_texture_filter_anisotropic`);l.texParameterf(e,n.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(t.anisotropy,p.getMaxAnisotropy())),f.get(t).__currentAnisotropy=t.anisotropy}}}function pe(e,t){let n=!1;e.__webglInit===void 0&&(e.__webglInit=!0,t.addEventListener(`dispose`,N));let r=t.source,i=S.get(r);i===void 0&&(i={},S.set(r,i));let a=ae(t);if(a!==e.__cacheKey){i[a]===void 0&&(i[a]={texture:l.createTexture(),usedTimes:0},h.memory.textures++,n=!0),i[a].usedTimes++;let r=i[e.__cacheKey];r!==void 0&&(i[e.__cacheKey].usedTimes--,r.usedTimes===0&&I(t)),e.__cacheKey=a,e.__webglTexture=i[a].texture}return n}function me(e,t,n){return Math.floor(Math.floor(e/n)/t)}function he(e,t,n,r){let i=e.updateRanges;if(i.length===0)d.texSubImage2D(l.TEXTURE_2D,0,0,0,t.width,t.height,n,r,t.data);else{i.sort((e,t)=>e.start-t.start);let a=0;for(let e=1;e<i.length;e++){let n=i[a],r=i[e],o=n.start+n.count,s=me(r.start,t.width,4),c=me(n.start,t.width,4);r.start<=o+1&&s===c&&me(r.start+r.count-1,t.width,4)===s?n.count=Math.max(n.count,r.start+r.count-n.start):(++a,i[a]=r)}i.length=a+1;let o=d.getParameter(l.UNPACK_ROW_LENGTH),s=d.getParameter(l.UNPACK_SKIP_PIXELS),c=d.getParameter(l.UNPACK_SKIP_ROWS);d.pixelStorei(l.UNPACK_ROW_LENGTH,t.width);for(let e=0,a=i.length;e<a;e++){let a=i[e],o=Math.floor(a.start/4),s=Math.ceil(a.count/4),c=o%t.width,u=Math.floor(o/t.width),f=s;d.pixelStorei(l.UNPACK_SKIP_PIXELS,c),d.pixelStorei(l.UNPACK_SKIP_ROWS,u),d.texSubImage2D(l.TEXTURE_2D,0,c,u,f,1,n,r,t.data)}e.clearUpdateRanges(),d.pixelStorei(l.UNPACK_ROW_LENGTH,o),d.pixelStorei(l.UNPACK_SKIP_PIXELS,s),d.pixelStorei(l.UNPACK_SKIP_ROWS,c)}}function ge(e,t,n){let r=l.TEXTURE_2D;(t.isDataArrayTexture||t.isCompressedArrayTexture)&&(r=l.TEXTURE_2D_ARRAY),t.isData3DTexture&&(r=l.TEXTURE_3D);let i=pe(e,t),a=t.source;d.bindTexture(r,e.__webglTexture,l.TEXTURE0+n);let o=f.get(a);if(a.version!==o.__version||i===!0){if(d.activeTexture(l.TEXTURE0+n),!(typeof ImageBitmap<`u`&&t.image instanceof ImageBitmap)){let e=Nt.getPrimaries(Nt.workingColorSpace),n=t.colorSpace===``?null:Nt.getPrimaries(t.colorSpace),r=t.colorSpace===``||e===n?l.NONE:l.BROWSER_DEFAULT_WEBGL;d.pixelStorei(l.UNPACK_FLIP_Y_WEBGL,t.flipY),d.pixelStorei(l.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),d.pixelStorei(l.UNPACK_COLORSPACE_CONVERSION_WEBGL,r)}d.pixelStorei(l.UNPACK_ALIGNMENT,t.unpackAlignment);let e=T(t.image,!1,p.maxTextureSize);e=Ae(t,e);let s=m.convert(t.format,t.colorSpace),c=m.convert(t.type),u=A(t.internalFormat,s,c,t.normalized,t.colorSpace,t.isVideoTexture);fe(r,t);let f,h=t.mipmaps,g=t.isVideoTexture!==!0,_=o.__version===void 0||i===!0,v=a.dataReady,y=M(t,e);if(t.isDepthTexture)u=j(t.format===E,t.type),_&&(g?d.texStorage2D(l.TEXTURE_2D,1,u,e.width,e.height):d.texImage2D(l.TEXTURE_2D,0,u,e.width,e.height,0,s,c,null));else if(t.isDataTexture){if(h.length>0){g&&_&&d.texStorage2D(l.TEXTURE_2D,y,u,h[0].width,h[0].height);for(let e=0,t=h.length;e<t;e++)f=h[e],g?v&&d.texSubImage2D(l.TEXTURE_2D,e,0,0,f.width,f.height,s,c,f.data):d.texImage2D(l.TEXTURE_2D,e,u,f.width,f.height,0,s,c,f.data);t.generateMipmaps=!1}else g?(_&&d.texStorage2D(l.TEXTURE_2D,y,u,e.width,e.height),v&&he(t,e,s,c)):d.texImage2D(l.TEXTURE_2D,0,u,e.width,e.height,0,s,c,e.data)}else if(t.isCompressedTexture){if(t.isCompressedArrayTexture){g&&_&&d.texStorage3D(l.TEXTURE_2D_ARRAY,y,u,h[0].width,h[0].height,e.depth);for(let n=0,r=h.length;n<r;n++)if(f=h[n],t.format!==1023){if(s!==null){if(g){if(v){if(t.layerUpdates.size>0){let e=as(f.width,f.height,t.format,t.type);for(let r of t.layerUpdates){let t=f.data.subarray(r*e/f.data.BYTES_PER_ELEMENT,(r+1)*e/f.data.BYTES_PER_ELEMENT);d.compressedTexSubImage3D(l.TEXTURE_2D_ARRAY,n,0,0,r,f.width,f.height,1,s,t)}}else d.compressedTexSubImage3D(l.TEXTURE_2D_ARRAY,n,0,0,0,f.width,f.height,e.depth,s,f.data)}}else d.compressedTexImage3D(l.TEXTURE_2D_ARRAY,n,u,f.width,f.height,e.depth,0,f.data,0,0)}else H(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else g?v&&d.texSubImage3D(l.TEXTURE_2D_ARRAY,n,0,0,0,f.width,f.height,e.depth,s,c,f.data):d.texImage3D(l.TEXTURE_2D_ARRAY,n,u,f.width,f.height,e.depth,0,s,c,f.data);t.layerUpdates.size>0&&t.clearLayerUpdates()}else{g&&_&&d.texStorage2D(l.TEXTURE_2D,y,u,h[0].width,h[0].height);for(let e=0,n=h.length;e<n;e++)f=h[e],t.format===1023?g?v&&d.texSubImage2D(l.TEXTURE_2D,e,0,0,f.width,f.height,s,c,f.data):d.texImage2D(l.TEXTURE_2D,e,u,f.width,f.height,0,s,c,f.data):s===null?H(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):g?v&&d.compressedTexSubImage2D(l.TEXTURE_2D,e,0,0,f.width,f.height,s,f.data):d.compressedTexImage2D(l.TEXTURE_2D,e,u,f.width,f.height,0,f.data)}}else if(t.isDataArrayTexture){if(g){if(_&&d.texStorage3D(l.TEXTURE_2D_ARRAY,y,u,e.width,e.height,e.depth),v){if(t.layerUpdates.size>0){let n=as(e.width,e.height,t.format,t.type);for(let r of t.layerUpdates){let t=e.data.subarray(r*n/e.data.BYTES_PER_ELEMENT,(r+1)*n/e.data.BYTES_PER_ELEMENT);d.texSubImage3D(l.TEXTURE_2D_ARRAY,0,0,0,r,e.width,e.height,1,s,c,t)}t.clearLayerUpdates()}else d.texSubImage3D(l.TEXTURE_2D_ARRAY,0,0,0,0,e.width,e.height,e.depth,s,c,e.data)}}else d.texImage3D(l.TEXTURE_2D_ARRAY,0,u,e.width,e.height,e.depth,0,s,c,e.data)}else if(t.isData3DTexture)g?(_&&d.texStorage3D(l.TEXTURE_3D,y,u,e.width,e.height,e.depth),v&&d.texSubImage3D(l.TEXTURE_3D,0,0,0,0,e.width,e.height,e.depth,s,c,e.data)):d.texImage3D(l.TEXTURE_3D,0,u,e.width,e.height,e.depth,0,s,c,e.data);else if(t.isFramebufferTexture){if(_){if(g)d.texStorage2D(l.TEXTURE_2D,y,u,e.width,e.height);else{let t=e.width,n=e.height;for(let e=0;e<y;e++)d.texImage2D(l.TEXTURE_2D,e,u,t,n,0,s,c,null),t>>=1,n>>=1}}}else if(t.isHTMLTexture){if(`texElementImage2D`in l){let n=l.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),e.parentNode!==n){n.appendChild(e),b.add(t),n.onpaint=e=>{let t=e.changedElements;for(let e of b)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(l.texElementImage2D.length===3)l.texElementImage2D(l.TEXTURE_2D,l.RGBA8,e);else{let t=l.RGBA,n=l.RGBA,r=l.UNSIGNED_BYTE;l.texElementImage2D(l.TEXTURE_2D,0,t,n,r,e)}l.texParameteri(l.TEXTURE_2D,l.TEXTURE_MIN_FILTER,l.LINEAR),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_WRAP_S,l.CLAMP_TO_EDGE),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_WRAP_T,l.CLAMP_TO_EDGE)}}else if(h.length>0){if(g&&_){let e=je(h[0]);d.texStorage2D(l.TEXTURE_2D,y,u,e.width,e.height)}for(let e=0,t=h.length;e<t;e++)f=h[e],g?v&&d.texSubImage2D(l.TEXTURE_2D,e,0,0,s,c,f):d.texImage2D(l.TEXTURE_2D,e,u,s,c,f);t.generateMipmaps=!1}else if(g){if(_){let t=je(e);d.texStorage2D(l.TEXTURE_2D,y,u,t.width,t.height)}v&&d.texSubImage2D(l.TEXTURE_2D,0,0,0,s,c,e)}else d.texImage2D(l.TEXTURE_2D,0,u,s,c,e);D(t)&&O(r),o.__version=a.version,t.onUpdate&&t.onUpdate(t)}e.__version=t.version}function _e(e,t,n){if(t.image.length!==6)return;let r=pe(e,t),i=t.source;d.bindTexture(l.TEXTURE_CUBE_MAP,e.__webglTexture,l.TEXTURE0+n);let a=f.get(i);if(i.version!==a.__version||r===!0){d.activeTexture(l.TEXTURE0+n);let e=Nt.getPrimaries(Nt.workingColorSpace),o=t.colorSpace===``?null:Nt.getPrimaries(t.colorSpace),s=t.colorSpace===``||e===o?l.NONE:l.BROWSER_DEFAULT_WEBGL;d.pixelStorei(l.UNPACK_FLIP_Y_WEBGL,t.flipY),d.pixelStorei(l.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),d.pixelStorei(l.UNPACK_ALIGNMENT,t.unpackAlignment),d.pixelStorei(l.UNPACK_COLORSPACE_CONVERSION_WEBGL,s);let c=t.isCompressedTexture||t.image[0].isCompressedTexture,u=t.image[0]&&t.image[0].isDataTexture,f=[];for(let e=0;e<6;e++)!c&&!u?f[e]=T(t.image[e],!0,p.maxCubemapSize):f[e]=u?t.image[e].image:t.image[e],f[e]=Ae(t,f[e]);let h=f[0],g=m.convert(t.format,t.colorSpace),_=m.convert(t.type),v=A(t.internalFormat,g,_,t.normalized,t.colorSpace),y=t.isVideoTexture!==!0,b=a.__version===void 0||r===!0,x=i.dataReady,S=M(t,h);fe(l.TEXTURE_CUBE_MAP,t);let C;if(c){y&&b&&d.texStorage2D(l.TEXTURE_CUBE_MAP,S,v,h.width,h.height);for(let e=0;e<6;e++){C=f[e].mipmaps;for(let n=0;n<C.length;n++){let r=C[n];t.format===1023?y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,0,0,r.width,r.height,g,_,r.data):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,v,r.width,r.height,0,g,_,r.data):g===null?H(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):y?x&&d.compressedTexSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,0,0,r.width,r.height,g,r.data):d.compressedTexImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,v,r.width,r.height,0,r.data)}}}else{if(C=t.mipmaps,y&&b){C.length>0&&S++;let e=je(f[0]);d.texStorage2D(l.TEXTURE_CUBE_MAP,S,v,e.width,e.height)}for(let e=0;e<6;e++)if(u){y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,0,0,f[e].width,f[e].height,g,_,f[e].data):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,v,f[e].width,f[e].height,0,g,_,f[e].data);for(let t=0;t<C.length;t++){let n=C[t].image[e].image;y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,0,0,n.width,n.height,g,_,n.data):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,v,n.width,n.height,0,g,_,n.data)}}else{y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,0,0,g,_,f[e]):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,v,g,_,f[e]);for(let t=0;t<C.length;t++){let n=C[t];y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,0,0,g,_,n.image[e]):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,v,g,_,n.image[e])}}}D(t)&&O(l.TEXTURE_CUBE_MAP),a.__version=i.version,t.onUpdate&&t.onUpdate(t)}e.__version=t.version}function ve(e,t,n,r,i,a){let o=m.convert(n.format,n.colorSpace),s=m.convert(n.type),c=A(n.internalFormat,o,s,n.normalized,n.colorSpace),u=f.get(t),p=f.get(n);if(p.__renderTarget=t,!u.__hasExternalTextures){let e=Math.max(1,t.width>>a),n=Math.max(1,t.height>>a);i===l.TEXTURE_3D||i===l.TEXTURE_2D_ARRAY?d.texImage3D(i,a,c,e,n,t.depth,0,o,s,null):d.texImage2D(i,a,c,e,n,0,o,s,null)}d.bindFramebuffer(l.FRAMEBUFFER,e),ke(t)?g.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,r,i,p.__webglTexture,0,Oe(t)):(i===l.TEXTURE_2D||i>=l.TEXTURE_CUBE_MAP_POSITIVE_X&&i<=l.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&l.framebufferTexture2D(l.FRAMEBUFFER,r,i,p.__webglTexture,a),d.bindFramebuffer(l.FRAMEBUFFER,null)}function ye(e,t,n){if(l.bindRenderbuffer(l.RENDERBUFFER,e),t.depthBuffer){let r=t.depthTexture,i=r&&r.isDepthTexture?r.type:null,a=j(t.stencilBuffer,i),o=t.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT;ke(t)?g.renderbufferStorageMultisampleEXT(l.RENDERBUFFER,Oe(t),a,t.width,t.height):n?l.renderbufferStorageMultisample(l.RENDERBUFFER,Oe(t),a,t.width,t.height):l.renderbufferStorage(l.RENDERBUFFER,a,t.width,t.height),l.framebufferRenderbuffer(l.FRAMEBUFFER,o,l.RENDERBUFFER,e)}else{let e=t.textures;for(let r=0;r<e.length;r++){let i=e[r],a=m.convert(i.format,i.colorSpace),o=m.convert(i.type),s=A(i.internalFormat,a,o,i.normalized,i.colorSpace);ke(t)?g.renderbufferStorageMultisampleEXT(l.RENDERBUFFER,Oe(t),s,t.width,t.height):n?l.renderbufferStorageMultisample(l.RENDERBUFFER,Oe(t),s,t.width,t.height):l.renderbufferStorage(l.RENDERBUFFER,s,t.width,t.height)}}l.bindRenderbuffer(l.RENDERBUFFER,null)}function be(e,t,n){let r=t.isWebGLCubeRenderTarget===!0;if(d.bindFramebuffer(l.FRAMEBUFFER,e),!(t.depthTexture&&t.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let i=f.get(t.depthTexture);if(i.__renderTarget=t,(!i.__webglTexture||t.depthTexture.image.width!==t.width||t.depthTexture.image.height!==t.height)&&(t.depthTexture.image.width=t.width,t.depthTexture.image.height=t.height,t.depthTexture.needsUpdate=!0),r){if(i.__webglInit===void 0&&(i.__webglInit=!0,t.depthTexture.addEventListener(`dispose`,N)),i.__webglTexture===void 0){i.__webglTexture=l.createTexture(),d.bindTexture(l.TEXTURE_CUBE_MAP,i.__webglTexture),fe(l.TEXTURE_CUBE_MAP,t.depthTexture);let e=m.convert(t.depthTexture.format),n=m.convert(t.depthTexture.type),r;t.depthTexture.format===1026?r=l.DEPTH_COMPONENT24:t.depthTexture.format===1027&&(r=l.DEPTH24_STENCIL8);for(let i=0;i<6;i++)l.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+i,0,r,t.width,t.height,0,e,n,null)}}else R(t.depthTexture,0);let a=i.__webglTexture,o=Oe(t),s=r?l.TEXTURE_CUBE_MAP_POSITIVE_X+n:l.TEXTURE_2D,c=t.depthTexture.format===1027?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT;if(t.depthTexture.format===1026)ke(t)?g.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,c,s,a,0,o):l.framebufferTexture2D(l.FRAMEBUFFER,c,s,a,0);else if(t.depthTexture.format===1027)ke(t)?g.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,c,s,a,0,o):l.framebufferTexture2D(l.FRAMEBUFFER,c,s,a,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function xe(e){let t=f.get(e),n=e.isWebGLCubeRenderTarget===!0;if(t.__boundDepthTexture!==e.depthTexture){let n=e.depthTexture;if(t.__depthDisposeCallback&&t.__depthDisposeCallback(),n){let e=()=>{delete t.__boundDepthTexture,delete t.__depthDisposeCallback,n.removeEventListener(`dispose`,e)};n.addEventListener(`dispose`,e),t.__depthDisposeCallback=e}t.__boundDepthTexture=n}if(e.depthTexture&&!t.__autoAllocateDepthBuffer){if(n)for(let n=0;n<6;n++)be(t.__webglFramebuffer[n],e,n);else{let n=e.texture.mipmaps;n&&n.length>0?be(t.__webglFramebuffer[0],e,0):be(t.__webglFramebuffer,e,0)}}else if(n){t.__webglDepthbuffer=[];for(let n=0;n<6;n++)if(d.bindFramebuffer(l.FRAMEBUFFER,t.__webglFramebuffer[n]),t.__webglDepthbuffer[n]===void 0)t.__webglDepthbuffer[n]=l.createRenderbuffer(),ye(t.__webglDepthbuffer[n],e,!1);else{let r=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,i=t.__webglDepthbuffer[n];l.bindRenderbuffer(l.RENDERBUFFER,i),l.framebufferRenderbuffer(l.FRAMEBUFFER,r,l.RENDERBUFFER,i)}}else{let n=e.texture.mipmaps;if(n&&n.length>0?d.bindFramebuffer(l.FRAMEBUFFER,t.__webglFramebuffer[0]):d.bindFramebuffer(l.FRAMEBUFFER,t.__webglFramebuffer),t.__webglDepthbuffer===void 0)t.__webglDepthbuffer=l.createRenderbuffer(),ye(t.__webglDepthbuffer,e,!1);else{let n=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,r=t.__webglDepthbuffer;l.bindRenderbuffer(l.RENDERBUFFER,r),l.framebufferRenderbuffer(l.FRAMEBUFFER,n,l.RENDERBUFFER,r)}}d.bindFramebuffer(l.FRAMEBUFFER,null)}function Se(e,t,n){let r=f.get(e);t!==void 0&&ve(r.__webglFramebuffer,e,e.texture,l.COLOR_ATTACHMENT0,l.TEXTURE_2D,0),n!==void 0&&xe(e)}function Ce(e){let t=e.texture,n=f.get(e),r=f.get(t);e.addEventListener(`dispose`,P);let i=e.textures,a=e.isWebGLCubeRenderTarget===!0,o=i.length>1;if(o||(r.__webglTexture===void 0&&(r.__webglTexture=l.createTexture()),r.__version=t.version,h.memory.textures++),a){n.__webglFramebuffer=[];for(let e=0;e<6;e++)if(t.mipmaps&&t.mipmaps.length>0){n.__webglFramebuffer[e]=[];for(let r=0;r<t.mipmaps.length;r++)n.__webglFramebuffer[e][r]=l.createFramebuffer()}else n.__webglFramebuffer[e]=l.createFramebuffer()}else{if(t.mipmaps&&t.mipmaps.length>0){n.__webglFramebuffer=[];for(let e=0;e<t.mipmaps.length;e++)n.__webglFramebuffer[e]=l.createFramebuffer()}else n.__webglFramebuffer=l.createFramebuffer();if(o)for(let e=0,t=i.length;e<t;e++){let t=f.get(i[e]);t.__webglTexture===void 0&&(t.__webglTexture=l.createTexture(),h.memory.textures++)}if(e.samples>0&&ke(e)===!1){n.__webglMultisampledFramebuffer=l.createFramebuffer(),n.__webglColorRenderbuffer=[],d.bindFramebuffer(l.FRAMEBUFFER,n.__webglMultisampledFramebuffer);for(let t=0;t<i.length;t++){let r=i[t];n.__webglColorRenderbuffer[t]=l.createRenderbuffer(),l.bindRenderbuffer(l.RENDERBUFFER,n.__webglColorRenderbuffer[t]);let a=m.convert(r.format,r.colorSpace),o=m.convert(r.type),s=A(r.internalFormat,a,o,r.normalized,r.colorSpace,e.isXRRenderTarget===!0),c=Oe(e);l.renderbufferStorageMultisample(l.RENDERBUFFER,c,s,e.width,e.height),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+t,l.RENDERBUFFER,n.__webglColorRenderbuffer[t])}l.bindRenderbuffer(l.RENDERBUFFER,null),e.depthBuffer&&(n.__webglDepthRenderbuffer=l.createRenderbuffer(),ye(n.__webglDepthRenderbuffer,e,!0)),d.bindFramebuffer(l.FRAMEBUFFER,null)}}if(a){d.bindTexture(l.TEXTURE_CUBE_MAP,r.__webglTexture),fe(l.TEXTURE_CUBE_MAP,t);for(let r=0;r<6;r++)if(t.mipmaps&&t.mipmaps.length>0)for(let i=0;i<t.mipmaps.length;i++)ve(n.__webglFramebuffer[r][i],e,t,l.COLOR_ATTACHMENT0,l.TEXTURE_CUBE_MAP_POSITIVE_X+r,i);else ve(n.__webglFramebuffer[r],e,t,l.COLOR_ATTACHMENT0,l.TEXTURE_CUBE_MAP_POSITIVE_X+r,0);D(t)&&O(l.TEXTURE_CUBE_MAP),d.unbindTexture()}else if(o){for(let t=0,r=i.length;t<r;t++){let r=i[t],a=f.get(r),o=l.TEXTURE_2D;(e.isWebGL3DRenderTarget||e.isWebGLArrayRenderTarget)&&(o=e.isWebGL3DRenderTarget?l.TEXTURE_3D:l.TEXTURE_2D_ARRAY),d.bindTexture(o,a.__webglTexture),fe(o,r),ve(n.__webglFramebuffer,e,r,l.COLOR_ATTACHMENT0+t,o,0),D(r)&&O(o)}d.unbindTexture()}else{let i=l.TEXTURE_2D;if((e.isWebGL3DRenderTarget||e.isWebGLArrayRenderTarget)&&(i=e.isWebGL3DRenderTarget?l.TEXTURE_3D:l.TEXTURE_2D_ARRAY),d.bindTexture(i,r.__webglTexture),fe(i,t),t.mipmaps&&t.mipmaps.length>0)for(let r=0;r<t.mipmaps.length;r++)ve(n.__webglFramebuffer[r],e,t,l.COLOR_ATTACHMENT0,i,r);else ve(n.__webglFramebuffer,e,t,l.COLOR_ATTACHMENT0,i,0);D(t)&&O(i),d.unbindTexture()}e.depthBuffer&&xe(e)}function we(e){let t=e.textures;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(D(r)){let t=k(e),n=f.get(r).__webglTexture;d.bindTexture(t,n),O(t),d.unbindTexture()}}}let Te=[],Ee=[];function De(e){if(e.samples>0){if(ke(e)===!1){let t=e.textures,n=e.width,r=e.height,i=l.COLOR_BUFFER_BIT,a=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,o=f.get(e),s=t.length>1;if(s)for(let e=0;e<t.length;e++)d.bindFramebuffer(l.FRAMEBUFFER,o.__webglMultisampledFramebuffer),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.RENDERBUFFER,null),d.bindFramebuffer(l.FRAMEBUFFER,o.__webglFramebuffer),l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.TEXTURE_2D,null,0);d.bindFramebuffer(l.READ_FRAMEBUFFER,o.__webglMultisampledFramebuffer);let c=e.texture.mipmaps;c&&c.length>0?d.bindFramebuffer(l.DRAW_FRAMEBUFFER,o.__webglFramebuffer[0]):d.bindFramebuffer(l.DRAW_FRAMEBUFFER,o.__webglFramebuffer);for(let c=0;c<t.length;c++){if(e.resolveDepthBuffer&&(e.depthBuffer&&(i|=l.DEPTH_BUFFER_BIT),e.stencilBuffer&&e.resolveStencilBuffer&&(i|=l.STENCIL_BUFFER_BIT)),s){l.framebufferRenderbuffer(l.READ_FRAMEBUFFER,l.COLOR_ATTACHMENT0,l.RENDERBUFFER,o.__webglColorRenderbuffer[c]);let e=f.get(t[c]).__webglTexture;l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0,l.TEXTURE_2D,e,0)}l.blitFramebuffer(0,0,n,r,0,0,n,r,i,l.NEAREST),_===!0&&(Te.length=0,Ee.length=0,Te.push(l.COLOR_ATTACHMENT0+c),e.depthBuffer&&e.storeMultisampledDepthBuffer===!1&&(Te.push(a),Ee.push(a),l.invalidateFramebuffer(l.DRAW_FRAMEBUFFER,Ee)),l.invalidateFramebuffer(l.READ_FRAMEBUFFER,Te))}if(d.bindFramebuffer(l.READ_FRAMEBUFFER,null),d.bindFramebuffer(l.DRAW_FRAMEBUFFER,null),s)for(let e=0;e<t.length;e++){d.bindFramebuffer(l.FRAMEBUFFER,o.__webglMultisampledFramebuffer),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.RENDERBUFFER,o.__webglColorRenderbuffer[e]);let n=f.get(t[e]).__webglTexture;d.bindFramebuffer(l.FRAMEBUFFER,o.__webglFramebuffer),l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.TEXTURE_2D,n,0)}d.bindFramebuffer(l.DRAW_FRAMEBUFFER,o.__webglMultisampledFramebuffer)}else if(e.depthBuffer&&e.storeMultisampledDepthBuffer===!1&&_){let t=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT;l.invalidateFramebuffer(l.DRAW_FRAMEBUFFER,[t])}}}function Oe(e){return Math.min(p.maxSamples,e.samples)}function ke(e){let t=f.get(e);return e.samples>0&&u.has(`WEBGL_multisampled_render_to_texture`)===!0&&t.__useRenderToTexture!==!1}function z(e){let t=h.render.frame;y.get(e)!==t&&(y.set(e,t),e.update())}function Ae(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Nt.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&H(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):U(`WebGLTextures: Unsupported texture color space:`,n)),t}function je(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(v.width=e.naturalWidth||e.width,v.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(v.width=e.displayWidth,v.height=e.displayHeight):(v.width=e.width,v.height=e.height),v}this.allocateTextureUnit=ie,this.resetTextureUnits=te,this.getTextureUnits=ne,this.setTextureUnits=re,this.setTexture2D=R,this.setTexture2DArray=oe,this.setTexture3D=se,this.setTextureCube=ce,this.rebindTextures=Se,this.setupRenderTarget=Ce,this.updateRenderTargetMipmap=we,this.updateMultisampleRenderTarget=De,this.setupDepthRenderbuffer=xe,this.setupFrameBufferTexture=ve,this.useMultisampledRTT=ke,this.isReversedDepthBuffer=function(){return d.buffers.depth.getReversed()}}function fu(e,t){function n(n,r=``){let i,a=Nt.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var pu=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,mu=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,hu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Si(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new oo({vertexShader:pu,fragmentShader:mu,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Y(new Ka(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},gu=class extends Qe{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,u=null,d=null,f=null,p=null,h=null,g=typeof XRWebGLBinding<`u`,_=new hu,v={},b=t.getContextAttributes(),x=null,S=null,C=[],D=[],O=new G,k=null,A=null,j=new Lo;j.viewport=new Wt;let M=new Lo;M.viewport=new Wt;let N=[j,M],P=new Ho,F=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=C[e];return t===void 0&&(t=new Tn,C[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=C[e];return t===void 0&&(t=new Tn,C[e]=t),t.getGripSpace()},this.getHand=function(e){let t=C[e];return t===void 0&&(t=new Tn,C[e]=t),t.getHandSpace()};function ee(e){let t=D.indexOf(e.inputSource);if(t===-1)return;let n=C[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function L(){r.removeEventListener(`select`,ee),r.removeEventListener(`selectstart`,ee),r.removeEventListener(`selectend`,ee),r.removeEventListener(`squeeze`,ee),r.removeEventListener(`squeezestart`,ee),r.removeEventListener(`squeezeend`,ee),r.removeEventListener(`end`,L),r.removeEventListener(`inputsourceschange`,te);for(let e=0;e<C.length;e++){let t=D[e];t!==null&&(D[e]=null,C[e].disconnect(t))}F=null,I=null,_.reset();for(let e in v)delete v[e];if(e.setRenderTarget(x),p=null,f=null,d=null,r=null,S=null,ce.stop(),n.isPresenting=!1,e.setPixelRatio(k),e.setSize(O.width,O.height,!1),A!==null){let e=A.camera;e.fov=A.fov,e.zoom=A.zoom,e.updateProjectionMatrix(),A=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&H(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&H(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return f===null?p:f},this.getBinding=function(){return d===null&&g&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return h},this.getSession=function(){return r},this.setSession=async function(u){if(r=u,r!==null){if(x=e.getRenderTarget(),r.addEventListener(`select`,ee),r.addEventListener(`selectstart`,ee),r.addEventListener(`selectend`,ee),r.addEventListener(`squeeze`,ee),r.addEventListener(`squeezestart`,ee),r.addEventListener(`squeezeend`,ee),r.addEventListener(`end`,L),r.addEventListener(`inputsourceschange`,te),b.xrCompatible!==!0&&await t.makeXRCompatible(),k=e.getPixelRatio(),e.getSize(O),g&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;b.depth&&(o=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=b.stencil?E:T,a=b.stencil?y:m);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};d=this.getBinding(),f=d.createProjectionLayer(s),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),S=new Kt(f.textureWidth,f.textureHeight,{format:w,type:l,depthTexture:new bi(f.textureWidth,f.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let n={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:i};p=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new Kt(p.framebufferWidth,p.framebufferHeight,{format:w,type:l,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),ce.setContext(r),ce.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function te(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=D.indexOf(n);r>=0&&(D[r]=null,C[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=D.indexOf(n);if(r===-1){for(let e=0;e<C.length;e++)if(e>=D.length){D.push(n),r=e;break}else if(D[e]===null){D[e]=n,r=e;break}if(r===-1)break}let i=C[r];i&&i.connect(n)}}let ne=new K,re=new K;function ie(e,t,n){ne.setFromMatrixPosition(t.matrixWorld),re.setFromMatrixPosition(n.matrixWorld);let r=ne.distanceTo(re),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function ae(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;_.texture!==null&&(_.depthNear>0&&(t=_.depthNear),_.depthFar>0&&(n=_.depthFar)),P.near=M.near=j.near=t,P.far=M.far=j.far=n,(F!==P.near||I!==P.far)&&(r.updateRenderState({depthNear:P.near,depthFar:P.far}),F=P.near,I=P.far),P.layers.mask=e.layers.mask|6,j.layers.mask=P.layers.mask&-5,M.layers.mask=P.layers.mask&-3;let i=e.parent,a=P.cameras;ae(P,i);for(let e=0;e<a.length;e++)ae(a[e],i);a.length===2?ie(P,j,M):P.projectionMatrix.copy(j.projectionMatrix),A===null&&e.isPerspectiveCamera&&(A={camera:e,fov:e.fov,zoom:e.zoom}),R(e,P,i)};function R(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=nt*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return P},this.getFoveation=function(){if(f!==null||p!==null)return s},this.setFoveation=function(e){s=e,f!==null&&(f.fixedFoveation=e),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=e)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(P)},this.getCameraTexture=function(e){return v[e]};let oe=null;function se(t,i){if(u=i.getViewerPose(c||a),h=i,u!==null){let t=u.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let i=!1;t.length!==P.cameras.length&&(P.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(p!==null)a=p.getViewport(r);else{let t=d.getViewSubImage(f,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(S,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(S))}let o=N[n];o===void 0&&(o=new Lo,o.layers.enable(n),o.viewport=new Wt,N[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(P.matrix.copy(o.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale)),i===!0&&P.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&g){d=n.getBinding();let e=d.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&_.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&g){e.state.unbindTexture(),d=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=v[n];e||(e=new Si,v[n]=e);let t=d.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<C.length;e++){let t=D[e],n=C[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}oe&&oe(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),h=null}let ce=new ss;ce.setAnimationLoop(se),this.setAnimationLoop=function(e){oe=e},this.dispose=function(){}}},_u=new q,vu=new Ot;vu.set(-1,0,0,0,1,0,0,0,1);function yu(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,no(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(_u.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(vu),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function bu(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return U(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?H(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):H(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var xu=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Su=null;function Cu(){return Su===null&&(Su=new Zr(xu,16,16,k,g),Su.name=`DFG_LUT`,Su.minFilter=o,Su.magFilter=o,Su.wrapS=t,Su.wrapT=t,Su.generateMipmaps=!1,Su.needsUpdate=!0),Su}var wu=class{constructor(e={}){let{canvas:t=Ge(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:u=!1,powerPreference:d=`default`,failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:h=!1,outputBufferType:b=l}=e;this.isWebGLRenderer=!0;let x;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);x=n.getContextAttributes().alpha}else x=a;let S=b,C=new Set([j,A,O]),w=new Set([l,m,f,y,_,v]),T=new Uint32Array(4),E=new Int32Array(4),D=new K,k=null,M=null,N=[],P=[],F=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,ee=!1,L=null,te=null,ne=null,re=null;this._outputColorSpace=Pe;let ie=0,ae=0,R=null,oe=-1,se=null,ce=new Wt,le=new Wt,ue=null,de=new J(0),fe=0,pe=t.width,me=t.height,he=1,ge=null,_e=null,ve=new Wt(0,0,pe,me),ye=new Wt(0,0,pe,me),be=!1,xe=new ui,Se=!1,Ce=!1,we=new q,Te=new K,Ee=new Wt,De={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Oe=!1;function ke(){return R===null?he:1}let z=n;function Ae(e,n){return t.getContext(e,n)}let je,Me,B,Ne,V,Fe,Ie,Le,Re,ze,Be,He,Ue,We,Ke,Je,Ye,Ze,Qe,$e,et,tt,nt;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:u,powerPreference:d,failIfMajorPerformanceCaveat:p};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,it,!1),t.addEventListener(`webglcontextrestored`,at,!1),t.addEventListener(`webglcontextcreationerror`,ot,!1),z===null){let t=`webgl2`;if(z=Ae(t,e),z===null)throw Ae(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}rt()}catch(e){throw t.removeEventListener(`webglcontextlost`,it,!1),t.removeEventListener(`webglcontextrestored`,at,!1),t.removeEventListener(`webglcontextcreationerror`,ot,!1),U(`WebGLRenderer: `+e.message),e}function rt(){je=new Hs(z),je.init(),et=new fu(z,je),Me=new _s(z,je,e,et),B=new uu(z,je),Me.reversedDepthBuffer&&h&&B.buffers.depth.setReversed(!0),te=z.createFramebuffer(),ne=z.createFramebuffer(),re=z.createFramebuffer(),Ne=new Gs(z),V=new Wl,Fe=new du(z,je,B,V,Me,et,Ne),Ie=new Vs(I),Le=new cs(z),tt=new hs(z,Le),Re=new Us(z,Le,Ne,tt),ze=new qs(z,Re,Le,tt,Ne),Ze=new Ks(z,Me,Fe),Ke=new vs(V),Be=new Ul(I,Ie,je,Me,tt,Ke),He=new yu(I,V),Ue=new Jl,We=new tu(je),Ye=new ms(I,Ie,B,ze,x,s),Je=new lu(I,ze,Me),nt=new bu(z,Ne,Me,B),Qe=new gs(z,je,Ne),$e=new Ws(z,je,Ne),Ne.programs=Be.programs,I.capabilities=Me,I.extensions=je,I.properties=V,I.renderLists=Ue,I.shadowMap=Je,I.state=B,I.info=Ne}S!==1009&&(F=new Ys(S,t.width,t.height,o,r,i));let W=new gu(I,z);this.xr=W,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){let e=je.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=je.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return he},this.setPixelRatio=function(e){e!==void 0&&(he=e,this.setSize(pe,me,!1))},this.getSize=function(e){return e.set(pe,me)},this.setSize=function(e,n,r=!0){W.isPresenting?H(`WebGLRenderer: Can't change size while VR device is presenting.`):(pe=e,me=n,t.width=Math.floor(e*he),t.height=Math.floor(n*he),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),F!==null&&F.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(pe*he,me*he).floor()},this.setDrawingBufferSize=function(e,n,r){pe=e,me=n,he=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(S===1009)U(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){H(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}F.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(ce)},this.getViewport=function(e){return e.copy(ve)},this.setViewport=function(e,t,n,r){e.isVector4?ve.set(e.x,e.y,e.z,e.w):ve.set(e,t,n,r),B.viewport(ce.copy(ve).multiplyScalar(he).round())},this.getScissor=function(e){return e.copy(ye)},this.setScissor=function(e,t,n,r){e.isVector4?ye.set(e.x,e.y,e.z,e.w):ye.set(e,t,n,r),B.scissor(le.copy(ye).multiplyScalar(he).round())},this.getScissorTest=function(){return be},this.setScissorTest=function(e){B.setScissorTest(be=e)},this.setOpaqueSort=function(e){ge=e},this.setTransparentSort=function(e){_e=e},this.getClearColor=function(e){return e.copy(Ye.getClearColor())},this.setClearColor=function(){Ye.setClearColor(...arguments)},this.getClearAlpha=function(){return Ye.getClearAlpha()},this.setClearAlpha=function(){Ye.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(R!==null){let t=R.texture.format;e=C.has(t)}if(e){let e=R.texture.type,t=w.has(e),n=Ye.getClearColor(),r=Ye.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(T[0]=i,T[1]=a,T[2]=o,T[3]=r,z.clearBufferuiv(z.COLOR,0,T)):(E[0]=i,E[1]=a,E[2]=o,E[3]=r,z.clearBufferiv(z.COLOR,0,E))}else r|=z.COLOR_BUFFER_BIT}t&&(r|=z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&z.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),L=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,it,!1),t.removeEventListener(`webglcontextrestored`,at,!1),t.removeEventListener(`webglcontextcreationerror`,ot,!1),Ye.dispose(),Ue.dispose(),We.dispose(),V.dispose(),Ie.dispose(),ze.dispose(),tt.dispose(),nt.dispose(),Be.dispose(),W.dispose(),W.removeEventListener(`sessionstart`,pt),W.removeEventListener(`sessionend`,mt),ht.stop()};function it(e){e.preventDefault(),qe(`WebGLRenderer: Context Lost.`),ee=!0}function at(){qe(`WebGLRenderer: Context Restored.`),ee=!1;let e=Ne.autoReset,t=Je.enabled,n=Je.autoUpdate,r=Je.needsUpdate,i=Je.type;rt(),Ne.autoReset=e,Je.enabled=t,Je.autoUpdate=n,Je.needsUpdate=r,Je.type=i}function ot(e){U(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function st(e){let t=e.target;t.removeEventListener(`dispose`,st),ct(t)}function ct(e){lt(e),V.remove(e)}function lt(e){let t=V.get(e).programs;t!==void 0&&(t.forEach(function(e){Be.releaseProgram(e)}),e.isShaderMaterial&&Be.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=De);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=G(e,t,n,r,i);B.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Re.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;tt.setup(i,r,s,n,c);let h,g=Qe;if(c!==null&&(h=Le.get(c),g=$e,g.setIndex(h)),i.isMesh)r.wireframe===!0?(B.setLineWidth(r.wireframeLinewidth*ke()),g.setMode(z.LINES)):g.setMode(z.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),B.setLineWidth(e*ke()),i.isLineSegments?g.setMode(z.LINES):i.isLineLoop?g.setMode(z.LINE_LOOP):g.setMode(z.LINE_STRIP)}else i.isPoints?g.setMode(z.POINTS):i.isSprite&&g.setMode(z.TRIANGLES);if(i.isBatchedMesh){if(je.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Le.get(c).bytesPerElement:1,o=V.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(z,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function ut(e,t,n,r){L!==null&&e.isNodeMaterial&&L.setObject(r,e),Se===!0&&Ke.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,xt(e,t,r),e.side=0,e.needsUpdate=!0,xt(e,t,r),e.side=2):xt(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),L!==null&&L.renderStart(e,t,n),M=We.get(n),M.init(t),P.push(M),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(M.pushLight(e),e.castShadow&&M.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(M.pushLight(e),e.castShadow&&M.pushShadow(e))}),M.setupLights(),L!==null&&L.updateLights(M.state.lightsArray),Ce=this.localClippingEnabled,Se=Ke.init(this.clippingPlanes,Ce),Se===!0&&Ke.setGlobalState(this.clippingPlanes,t),L!==null&&Je.render(M.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];ut(o,n,t,e),r.add(o)}else ut(i,n,t,e),r.add(i)}}),M=P.pop(),L!==null&&L.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=V.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}je.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let dt=null;function ft(e){dt&&dt(e)}function pt(){ht.stop()}function mt(){ht.start()}let ht=new ss;ht.setAnimationLoop(ft),typeof self<`u`&&ht.setContext(self),this.setAnimationLoop=function(e){dt=e,W.setAnimationLoop(e),e===null?ht.stop():ht.start()},W.addEventListener(`sessionstart`,pt),W.addEventListener(`sessionend`,mt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){U(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(ee===!0)return;L!==null&&L.renderStart(e,t);let n=W.enabled===!0&&W.isPresenting===!0,r=F!==null&&(R===null||n)&&F.begin(I,R);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(F===null||F.isCompositing()===!1)&&(W.cameraAutoUpdate===!0&&W.updateCamera(t),t=W.getCamera()),e.isScene===!0&&e.onBeforeRender(I,e,t,R),M=We.get(e,P.length),M.init(t),M.state.textureUnits=Fe.getTextureUnits(),P.push(M),we.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),xe.setFromProjectionMatrix(we,Ve,t.reversedDepth),Ce=this.localClippingEnabled,Se=Ke.init(this.clippingPlanes,Ce),k=Ue.get(e,N.length),k.init(),N.push(k),W.enabled===!0&&W.isPresenting===!0){let e=I.xr.getDepthSensingMesh();e!==null&&gt(e,t,-1/0,I.sortObjects)}gt(e,t,0,I.sortObjects),k.finish(),L!==null&&L.updateLights(M.state.lightsArray),I.sortObjects===!0&&k.sort(ge,_e),Oe=W.enabled===!1||W.isPresenting===!1||W.hasDepthSensing()===!1,Oe&&Ye.addToRenderList(k,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Se===!0&&Ke.beginShadows();let i=M.state.shadowsArray;if(Je.render(i,e,t),Se===!0&&Ke.endShadows(),(r&&F.hasRenderPass())===!1){let n=k.opaque,r=k.transmissive;if(M.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];vt(n,r,e,a)}Oe&&Ye.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];_t(k,e,n,n.viewport)}}else r.length>0&&vt(n,r,e,t),Oe&&Ye.render(e),_t(k,e,t)}R!==null&&ae===0&&(Fe.updateMultisampleRenderTarget(R),Fe.updateRenderTargetMipmap(R)),r&&F.end(I),e.isScene===!0&&e.onAfterRender(I,e,t),tt.resetDefaultState(),oe=-1,se=null,P.pop(),P.length>0?(M=P[P.length-1],Fe.setTextureUnits(M.state.textureUnits),Se===!0&&Ke.setGlobalState(I.clippingPlanes,M.state.camera)):M=null,N.pop(),k=N.length>0?N[N.length-1]:null,L!==null&&L.renderEnd()};function gt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)M.pushLightProbeGrid(e);else if(e.isLight)M.pushLight(e),e.castShadow&&M.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(xe)){r&&Ee.setFromMatrixPosition(e.matrixWorld).applyMatrix4(we);let i=ze.update(e),a=e.material;a.visible&&k.push(e,i,a,n,Ee.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(xe))){let i=ze.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),Ee.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),Ee.copy(e.boundingSphere.center)),Ee.applyMatrix4(e.matrixWorld).applyMatrix4(we)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&k.push(e,i,c,n,Ee.z,s,t)}}else a.visible&&k.push(e,i,a,n,Ee.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)gt(i[e],t,n,r)}function _t(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;M.setupLightsView(n),Se===!0&&Ke.setGlobalState(I.clippingPlanes,n),r&&B.viewport(ce.copy(r)),i.length>0&&yt(i,t,n),a.length>0&&yt(a,t,n),o.length>0&&yt(o,t,n),B.buffers.depth.setTest(!0),B.buffers.depth.setMask(!0),B.buffers.color.setMask(!0),B.setPolygonOffset(!1)}function vt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[r.id]===void 0){let e=je.has(`EXT_color_buffer_half_float`)||je.has(`EXT_color_buffer_float`);M.state.transmissionRenderTarget[r.id]=new Kt(1,1,{generateMipmaps:!0,type:e?g:l,minFilter:c,samples:Math.max(4,Me.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Nt.workingColorSpace})}let a=M.state.transmissionRenderTarget[r.id],o=r.viewport||ce;a.setSize(o.z*I.transmissionResolutionScale,o.w*I.transmissionResolutionScale);let s=I.getRenderTarget(),u=I.getActiveCubeFace(),d=I.getActiveMipmapLevel();I.setRenderTarget(a),I.getClearColor(de),fe=I.getClearAlpha(),fe<1&&I.setClearColor(16777215,.5),I.clear(),Oe&&Ye.render(n);let f=I.toneMapping;I.toneMapping=0;let p=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),M.setupLightsView(r),Se===!0&&Ke.setGlobalState(I.clippingPlanes,r),yt(e,n,r),Fe.updateMultisampleRenderTarget(a),Fe.updateRenderTargetMipmap(a),je.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,bt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(Fe.updateMultisampleRenderTarget(a),Fe.updateRenderTargetMipmap(a))}I.setRenderTarget(s,u,d),I.setClearColor(de,fe),p!==void 0&&(r.viewport=p),I.toneMapping=f}function yt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&bt(o,t,n,s,l,c)}}function bt(e,t,n,r,i,a){L!==null&&i.isNodeMaterial&&L.setObject(e,i),e.onBeforeRender(I,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(I,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,I.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,I.renderBufferDirect(n,t,r,i,e,a),i.side=2):I.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(I,t,n,r,i,a)}function xt(e,t,n){t.isScene!==!0&&(t=De);let r=V.get(e),i=M.state.lights,a=M.state.shadowsArray,o=i.state.version,s=Be.getParameters(e,i.state,a,t,n,M.state.lightProbeGridArray),c=Be.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Ie.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,st),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return Ct(e,s),d}else s.uniforms=Be.getUniforms(e),L!==null&&e.isNodeMaterial&&L.build(e,n,s),e.onBeforeCompile(s,I),d=Be.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Ke.uniform),Ct(e,s),r.needsLights=Et(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=M.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function St(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=nl.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function Ct(e,t){let n=V.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function wt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];D.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(D))return n}return null}function G(e,t,n,r,i){t.isScene!==!0&&(t=De),Fe.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=R===null?I.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Nt.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Ie.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(h=I.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=V.get(r),y=M.state.lights;if(Se===!0&&(Ce===!0||e!==se)){let t=e===se&&r.id===oe;Ke.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Ke.numPlanes||v.numIntersection!==Ke.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=M.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let x=v.currentProgram;b===!0&&(x=xt(r,t,i),L&&r.isNodeMaterial&&L.onUpdateProgram(r,x,v));let S=!1,C=!1,w=!1,T=x.getUniforms(),E=v.uniforms;if(B.useProgram(x.program)&&(S=!0,C=!0,w=!0),r.id!==oe&&(oe=r.id,C=!0),v.needsLights){let e=wt(M.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,C=!0)}if(S||se!==e){B.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),T.setValue(z,`projectionMatrix`,e.projectionMatrix),T.setValue(z,`viewMatrix`,e.matrixWorldInverse);let t=T.map.cameraPosition;t!==void 0&&t.setValue(z,Te.setFromMatrixPosition(e.matrixWorld)),Me.logarithmicDepthBuffer&&T.setValue(z,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&T.setValue(z,`isOrthographic`,e.isOrthographicCamera===!0),se!==e&&(se=e,C=!0,w=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&T.setValue(z,`sunShadowMap`,y.state.sunShadowMap,Fe),y.state.directionalShadowMap.length>0&&T.setValue(z,`directionalShadowMap`,y.state.directionalShadowMap,Fe),y.state.spotShadowMap.length>0&&T.setValue(z,`spotShadowMap`,y.state.spotShadowMap,Fe),y.state.pointShadowMap.length>0&&T.setValue(z,`pointShadowMap`,y.state.pointShadowMap,Fe)),i.isSkinnedMesh){T.setOptional(z,i,`bindMatrix`),T.setOptional(z,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),T.setValue(z,`boneTexture`,e.boneTexture,Fe))}i.isBatchedMesh&&(T.setOptional(z,i,`batchingTexture`),T.setValue(z,`batchingTexture`,i._matricesTexture,Fe),T.setOptional(z,i,`batchingIdTexture`),T.setValue(z,`batchingIdTexture`,i._indirectTexture,Fe),T.setOptional(z,i,`batchingColorTexture`),i._colorsTexture!==null&&T.setValue(z,`batchingColorTexture`,i._colorsTexture,Fe));let D=n.morphAttributes;if((D.position!==void 0||D.normal!==void 0||D.color!==void 0)&&Ze.update(i,n,x),(C||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,T.setValue(z,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(E.envMapIntensity.value=t.environmentIntensity),E.dfgLUT!==void 0&&(E.dfgLUT.value=Cu()),C){if(T.setValue(z,`toneMappingExposure`,I.toneMappingExposure),v.needsLights&&Tt(E,w),a&&r.fog===!0&&He.refreshFogUniforms(E,a),He.refreshMaterialUniforms(E,r,he,me,M.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;E.probesSH.value=e.texture,E.probesMin.value.copy(e.boundingBox.min),E.probesMax.value.copy(e.boundingBox.max),E.probesResolution.value.copy(e.resolution)}nl.upload(z,St(v),E,Fe)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(nl.upload(z,St(v),E,Fe),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&T.setValue(z,`center`,i.center),T.setValue(z,`modelViewMatrix`,i.modelViewMatrix),T.setValue(z,`normalMatrix`,i.normalMatrix),T.setValue(z,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];nt.update(n,x),nt.bind(n,x)}}return x}function Tt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function Et(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return ie},this.getActiveMipmapLevel=function(){return ae},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(e,t,n){let r=V.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),V.get(e.texture).__webglTexture=t,V.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=V.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){R=e,ie=t,ae=n;let r=null,i=!1,a=!1;if(e){let o=V.get(e);if(o.__useDefaultFramebuffer!==void 0){B.bindFramebuffer(z.FRAMEBUFFER,o.__webglFramebuffer),ce.copy(e.viewport),le.copy(e.scissor),ue=e.scissorTest,B.viewport(ce),B.scissor(le),B.setScissorTest(ue),oe=-1;return}if(o.__webglFramebuffer===void 0)Fe.setupRenderTarget(e);else if(o.__hasExternalTextures)Fe.rebindTextures(e,V.get(e.texture).__webglTexture,V.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&V.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);Fe.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=V.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&Fe.useMultisampledRTT(e)===!1?V.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,ce.copy(e.viewport),le.copy(e.scissor),ue=e.scissorTest}else ce.copy(ve).multiplyScalar(he).floor(),le.copy(ye).multiplyScalar(he).floor(),ue=be;if(n!==0&&(r=te),B.bindFramebuffer(z.FRAMEBUFFER,r)&&B.drawBuffers(e,r),B.viewport(ce),B.scissor(le),B.setScissorTest(ue),i){let r=V.get(e.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=V.get(e.textures[t]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=V.get(e.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,t.__webglTexture,n)}oe=-1};function Dt(e){let t=V.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Me.textureFormatReadable(e.format),t.__typeReadable=Me.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){U(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=V.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){B.bindFramebuffer(z.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+s);let u=Dt(o);if(u.__formatReadable===!1){U(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){U(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&z.readPixels(t,n,r,i,et.convert(c),et.convert(l),a)}finally{let e=R===null?null:V.get(R).__webglFramebuffer;B.bindFramebuffer(z.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=V.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){B.bindFramebuffer(z.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+s);let d=Dt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,f),z.bufferData(z.PIXEL_PACK_BUFFER,a.byteLength,z.STREAM_READ),z.readPixels(t,n,r,i,et.convert(l),et.convert(u),0),z.bindBuffer(z.PIXEL_PACK_BUFFER,null);let p=R===null?null:V.get(R).__webglFramebuffer;B.bindFramebuffer(z.FRAMEBUFFER,p);let m=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await Xe(z,m,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,f),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,a),z.bindBuffer(z.PIXEL_PACK_BUFFER,null),z.deleteBuffer(f),z.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;Fe.setTexture2D(e,0),z.copyTexSubImage2D(z.TEXTURE_2D,n,0,0,o,s,i,a),B.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=et.convert(t.format),_=et.convert(t.type),v;t.isData3DTexture?(Fe.setTexture3D(t,0),v=z.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(Fe.setTexture2DArray(t,0),v=z.TEXTURE_2D_ARRAY):(Fe.setTexture2D(t,0),v=z.TEXTURE_2D),B.activeTexture(z.TEXTURE0),B.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,t.flipY),B.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),B.pixelStorei(z.UNPACK_ALIGNMENT,t.unpackAlignment);let y=B.getParameter(z.UNPACK_ROW_LENGTH),b=B.getParameter(z.UNPACK_IMAGE_HEIGHT),x=B.getParameter(z.UNPACK_SKIP_PIXELS),S=B.getParameter(z.UNPACK_SKIP_ROWS),C=B.getParameter(z.UNPACK_SKIP_IMAGES);B.pixelStorei(z.UNPACK_ROW_LENGTH,h.width),B.pixelStorei(z.UNPACK_IMAGE_HEIGHT,h.height),B.pixelStorei(z.UNPACK_SKIP_PIXELS,l),B.pixelStorei(z.UNPACK_SKIP_ROWS,u),B.pixelStorei(z.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=V.get(e),r=V.get(t),h=V.get(n.__renderTarget),g=V.get(r.__renderTarget);B.bindFramebuffer(z.READ_FRAMEBUFFER,h.__webglFramebuffer),B.bindFramebuffer(z.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,V.get(e).__webglTexture,i,d+n),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,V.get(t).__webglTexture,a,m+n)),z.blitFramebuffer(l,u,o,s,f,p,o,s,z.DEPTH_BUFFER_BIT,z.NEAREST);B.bindFramebuffer(z.READ_FRAMEBUFFER,null),B.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||V.has(e)){let n=V.get(e),r=V.get(t);B.bindFramebuffer(z.READ_FRAMEBUFFER,ne),B.bindFramebuffer(z.DRAW_FRAMEBUFFER,re);for(let e=0;e<c;e++)w?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,n.__webglTexture,i),T?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,r.__webglTexture,a),i===0?T?z.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):z.copyTexSubImage2D(v,a,f,p,l,u,o,s):z.blitFramebuffer(l,u,o,s,f,p,o,s,z.COLOR_BUFFER_BIT,z.NEAREST);B.bindFramebuffer(z.READ_FRAMEBUFFER,null),B.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?z.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?z.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):z.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):z.texSubImage2D(z.TEXTURE_2D,a,f,p,o,s,g,_,h);B.pixelStorei(z.UNPACK_ROW_LENGTH,y),B.pixelStorei(z.UNPACK_IMAGE_HEIGHT,b),B.pixelStorei(z.UNPACK_SKIP_PIXELS,x),B.pixelStorei(z.UNPACK_SKIP_ROWS,S),B.pixelStorei(z.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&z.generateMipmap(v),B.unbindTexture()},this.initRenderTarget=function(e){V.get(e).__webglFramebuffer===void 0&&Fe.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?Fe.setTextureCube(e,0):e.isData3DTexture?Fe.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?Fe.setTexture2DArray(e,0):Fe.setTexture2D(e,0),B.unbindTexture()},this.resetState=function(){ie=0,ae=0,R=null,B.reset(),tt.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Ve}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Nt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Nt._getUnpackColorSpace()}},Tu=`
float hash11(float p){ p = fract(p * 0.1031); p *= p + 33.33; p *= p + p; return fract(p); }
float hash12(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
vec2 hash22(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973)); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.xx + p3.yz) * p3.zy); }
vec3 hash33(vec3 p3){ p3 = fract(p3 * vec3(0.1031, 0.1030, 0.0973)); p3 += dot(p3, p3.yxz + 33.33); return fract((p3.xxy + p3.yxx) * p3.zyx); }
float vnoise(vec3 p){
  vec3 i = floor(p), f = fract(p); vec3 u = f * f * (3.0 - 2.0 * f);
  float n000 = hash12(i.xy + i.z * 17.17), n100 = hash12(i.xy + vec2(1,0) + i.z * 17.17);
  float n010 = hash12(i.xy + vec2(0,1) + i.z * 17.17), n110 = hash12(i.xy + vec2(1,1) + i.z * 17.17);
  float n001 = hash12(i.xy + (i.z + 1.0) * 17.17), n101 = hash12(i.xy + vec2(1,0) + (i.z + 1.0) * 17.17);
  float n011 = hash12(i.xy + vec2(0,1) + (i.z + 1.0) * 17.17), n111 = hash12(i.xy + vec2(1,1) + (i.z + 1.0) * 17.17);
  return mix(mix(mix(n000, n100, u.x), mix(n010, n110, u.x), u.y), mix(mix(n001, n101, u.x), mix(n011, n111, u.x), u.y), u.z);
}
float vnoise2(vec2 p){
  vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash12(i), hash12(i + vec2(1,0)), u.x), mix(hash12(i + vec2(0,1)), hash12(i + vec2(1,1)), u.x), u.y);
}
float fbm3(vec3 p){ float a = 0.5, s = 0.0; for (int i = 0; i < 4; i++){ s += a * vnoise(p); p = p * 2.03 + 11.7; a *= 0.5; } return s / 0.9375; }
float fbm2(vec2 p){ float a = 0.5, s = 0.0; for (int i = 0; i < 4; i++){ s += a * vnoise2(p); p = p * 2.03 + 11.7; a *= 0.5; } return s / 0.9375; }
`,Eu=`
float luma(vec3 c){ return dot(c, vec3(0.299, 0.587, 0.114)); }
mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
// Screen-space halftone dot coverage for a darkness value in [0,1].
float halftone(vec2 frag, float cell, float angle, float darkness){
  vec2 p = rot2(angle) * frag / cell;
  vec2 c = fract(p) - 0.5;
  float r = sqrt(clamp(darkness, 0.0, 1.0)) * 0.62;
  float d = length(c);
  float aa = fwidth(d) * 0.9 + 0.02;
  return 1.0 - smoothstep(r - aa, r + aa, d);
}
// Parallel hatching lines (for deep shadow), coverage in [0,1].
float hatch(vec2 frag, float cell, float angle, float darkness){
  vec2 p = rot2(angle) * frag / cell;
  float d = abs(fract(p.y) - 0.5);
  float w = clamp(darkness, 0.0, 1.0) * 0.42;
  float aa = fwidth(p.y) * 0.8 + 0.02;
  return 1.0 - smoothstep(w - aa, w + aa, d);
}
`;function Du(e,n=33){let r=new Uint8Array(n*n*n*4),i=0;for(let t=0;t<n;t++)for(let a=0;a<n;a++)for(let o=0;o<n;o++){let[s,c,l]=e(o/(n-1),a/(n-1),t/(n-1));r[i++]=Math.round(Ou(s)*255),r[i++]=Math.round(Ou(c)*255),r[i++]=Math.round(Ou(l)*255),r[i++]=255}let a=new Jt(r,n,n,n);return a.format=w,a.type=l,a.minFilter=a.magFilter=o,a.wrapS=a.wrapT=a.wrapR=t,a.unpackAlignment=1,a.colorSpace=``,a.needsUpdate=!0,a.userData.size=n,a}var Ou=e=>Math.min(1,Math.max(0,e)),ku=(e,t,n)=>{let r=Ou((n-e)/(t-e));return r*r*(3-2*r)},Au=(e,t,n)=>.2126*e+.7152*t+.0722*n;function ju(e,t,n){let r=Math.max(e,t,n),i=r-Math.min(e,t,n),a=0;return i>1e-6&&(a=r===e?(t-n)/i%6:r===t?(n-e)/i+2:(e-t)/i+4,a*=60,a<0&&(a+=360)),[a,r>0?i/r:0,r]}function Mu(e,t,n){let r=n*t,i=r*(1-Math.abs(e/60%2-1)),a=n-r,o=0,s=0,c=0;return e<60?[o,s,c]=[r,i,0]:e<120?[o,s,c]=[i,r,0]:e<180?[o,s,c]=[0,r,i]:e<240?[o,s,c]=[0,i,r]:e<300?[o,s,c]=[i,0,r]:[o,s,c]=[r,0,i],[o+a,s+a,c+a]}function Nu(e,t,n){let r=Math.abs((e-t+540)%360-180);return 1-ku(n*.6,n,r)}var Pu=`
precision highp float;
precision highp sampler3D;
${Tu}
${Eu}
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
in vec2 vUv;
out highp vec4 fragColor;

float linDepth(vec2 uv){
  float d = texture(tDepth, uv).r;
  if (uOrtho > 0.5) return uNear + d * (uFar - uNear);
  float z = d * 2.0 - 1.0;
  return (2.0 * uNear * uFar) / (uFar + uNear - z * (uFar - uNear));
}

float edgeAt(vec2 uv, float r){
  vec4 nC = texture(tNormal, uv);
  float dC = linDepth(uv);
  vec3 nc = nC.rgb * 2.0 - 1.0;
  float idC = floor(nC.a * 255.0 + 0.5);
  if (idC > 254.5) return 0.0;                     // id 255: light printed on a surface, glows but is never inked
  if (abs(idC - 249.0) < 0.5) return 0.0;          // id 249: a hologram's own pixels sit over everything behind them
  float e = 0.0;
  for (int i = 0; i < 8; i++){
    float a = float(i) * 0.7853982 + 0.39;
    vec2 o = vec2(cos(a), sin(a)) * r / uRes;
    vec4 n = texture(tNormal, uv + o);
    float id = floor(n.a * 255.0 + 0.5);
    if (id > 254.5 || abs(id - 249.0) < 0.5) continue;
    if (idC < 0.5 && id < 0.5) continue;           // background against background: no line
    float d = linDepth(uv + o);
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
  // aerial perspective: haze pools low over the ground and lightens toward the horizon
  vec3 fogC = uFogCol;
  if (d0 < 0.9999 && (uHFogAmt > 0.0 || uFogDirAmt > 0.0)) {
    vec4 vp = uInvProj * vec4(uv * 2.0 - 1.0, d0 * 2.0 - 1.0, 1.0); vp /= vp.w;
    vec3 wp = (uCamWorld * vec4(vp.xyz, 1.0)).xyz;
    vec3 vd = normalize(mat3(uCamWorld) * vp.xyz);
    float hf = uHFogAmt * exp(-max(wp.y - uHFogY, 0.0) * uHFogK) * smoothstep(uFogNear * 0.25, uFogFar * 0.8, lin);
    fog = clamp(fog + hf * (1.0 - fog), 0.0, 1.0);
    fogC = mix(uFogCol, uFogHorizon, uFogDirAmt * exp(-abs(vd.y) * 5.0));
  }
  // lights punch through the haze: emissive surfaces (ids 250-254) take less of it
  if (uFogGlow > 0.0) { float gid = floor(texture(tNormal, uv).a * 255.0 + 0.5); fog *= mix(1.0, 1.0 - uFogGlow, step(249.5, gid) * step(gid, 254.5)); }
  // a hologram floats in front: the depth under its pixels is whatever stands behind it, so most of that haze is not its own
  { float hid = floor(texture(tNormal, uv).a * 255.0 + 0.5); if (abs(hid - 249.0) < 0.5) fog *= 0.3; }
  float r = uLine * (0.7 + 0.6 * vnoise2(frag / 140.0 + uStep * 3.7)) * mix(1.0, 0.5, smoothstep(uFogNear * 0.4, uFogFar, lin) * step(0.001, uFogAmt));
  float line = edgeAt(luv, r) * uLineAlpha * (1.0 - fog * uFogLine);

  // colour plate sits slightly off the key line; it slips further when the camera moves fast
  vec2 mo = uMisregDir * uMisregPx * (1.0 + uSpeed * 5.0) / uRes;
  vec3 col = texture(tColor, uv + mo).rgb;
  col = mix(col, fogC, fog);

  // glow (neon) added under the ink, never onto the paper page (id 200/201)
  vec3 glow = texture(tGlow, uv + mo).rgb;
  float pageId = floor(texture(tNormal, uv).a * 255.0 + 0.5);
  col += glow * uGlowAmt * (pageId > 199.5 ? 0.0 : 1.0);

  // grade: tint the shadows, warm or cool the highlights
  float l = luma(col);
  col = mix(col, uGradeShadow, (1.0 - smoothstep(0.0, 0.55, l)) * uGradeAmt);
  col = mix(col, col * uGradeHigh, smoothstep(0.45, 1.0, l) * uGradeAmt);

  // ink lines
  col = mix(col, uInk, clamp(line, 0.0, 1.0));

  // neon bloom, printed as dots at its edges
  if (uBloomAmt > 0.0) {
    vec3 bl = texture(tBloom, uv).rgb;
    float bm = luma(bl);
    float dots = halftone(frag, 4.0 * (uRes.x / max(uRes.x, 1.0)) * max(1.0, uRes.y / 900.0), 0.5, clamp(bm * 1.6, 0.0, 1.0));
    col += bl * uBloomAmt * mix(1.0, 0.45 + dots * 0.9, uBloomDots);
  }

  // the grade: a generated 3D lookup table
  if (uLutAmt > 0.0) { float ls = uLutSize; vec3 lc = texture(tLut, clamp(col, 0.0, 1.0) * ((ls - 1.0) / ls) + 0.5 / ls).rgb; col = mix(col, lc, uLutAmt); }

  // paper: static grain + fibre mottling
  float g = hash12(floor(frag)) - 0.5;
  float fib = fbm2(frag / 260.0) - 0.5;
  col += g * uGrain * (0.35 + 0.65 * (1.0 - l));
  col *= 1.0 + fib * uFibre;

  // painted vignette
  vec2 vp = (uv - 0.5) * vec2(uRes.x / uRes.y, 1.0);
  float vig = smoothstep(0.35, 1.05, length(vp) + (fbm2(frag / 300.0) - 0.5) * 0.25);
  col = mix(col, uGradeShadow * 0.6, vig * uVignette);

  // speed streaks while flying (drawn on twos, thin, never wallpaper)
  if (uSpeed > 0.02) {
    vec2 sp = (uv - uSpeedCenter) * vec2(uRes.x / uRes.y, 1.0);
    float sang = atan(sp.y, sp.x), srr = length(sp);
    float sn = vnoise2(vec2(sang * 140.0, floor(uStep * 12.0) * 3.1));
    float st = smoothstep(0.93 - uSpeed * 0.04, 0.95 - uSpeed * 0.04, sn) * smoothstep(0.42, 0.85, srr);
    col = mix(col, uSpeedCol, st * clamp(uSpeed, 0.0, 1.0) * 0.32);
  }

  // comic impact frame
  if (uImpact > 0.001){
    float L = luma(col);
    vec3 a;
    if (uImpactMode < 1.5) a = mix(uImpInk, uImpPaper, step(0.3, L));                 // 1: two-ink silhouette
    else if (uImpactMode < 2.5) a = mix(uImpPaper, uImpInk, step(0.3, L));            // 2: inverted
    else a = mix(uImpAccent, uImpInk, step(0.42, L));                                 // 3: accent field
    a = mix(a, (uImpactMode < 1.5) ? uImpInk : uImpPaper, line);
    vec2 p = (uv - uImpactCenter) * vec2(uRes.x / uRes.y, 1.0);
    float ang = atan(p.y, p.x);
    float rr = length(p);
    float n = vnoise2(vec2(ang * 38.0, uImpactSeed * 13.0)) * 0.7 + vnoise2(vec2(ang * 97.0, uImpactSeed * 7.0)) * 0.3;
    float thr = mix(0.70, 0.52, smoothstep(0.1, 0.9, rr));
    float sl = smoothstep(thr, thr + 0.02, n) * smoothstep(0.16, 0.42, rr);
    vec3 slc = (uImpactMode < 1.5) ? uImpPaper : ((uImpactMode < 2.5) ? uImpInk : uImpPaper);
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
      float dist = length(hp.xz - uPlaneC);
      float on = smoothstep(uPlaneR, uPlaneR - 120.0, dist);
      float front = smoothstep(90.0, 0.0, abs(dist - uPlaneR)) * step(4.0, uPlaneR) * step(uPlaneR, 3200.0);
      float fill = pm.r * on, edge = pm.g * on;
      float dots = halftone(frag, 4.6 * max(1.0, uRes.y / 900.0), 0.55, clamp(fill * 0.85, 0.0, 1.0));
      vec3 pc = uPlaneCol * (fill * (0.3 + 0.55 * dots) + edge * 0.85) + uPlaneHot * front * (pm.r + pm.g) * 1.1;
      col += pc * mix(1.0, 0.5, occl) * uPlaneAmt;
      col += uPlaneHot * (smoothstep(26.0, 7.0, dist) + 0.3 * smoothstep(140.0, 0.0, dist)) * uPlaneLed;
    }
  }
  fragColor = vec4(col, 1.0);
}`,Z={uRes:{value:new G(1,1)},uNear:{value:.1},uFar:{value:100},uOrtho:{value:0},uLine:{value:1.6},uBoil:{value:.6},uDepthK:{value:.035},uNormalK:{value:.35},uLineAlpha:{value:1},uInk:{value:new J(`#0a0912`)},uPaperCol:{value:new J(`#efe9dc`)},uGrain:{value:.045},uFibre:{value:.06},uMisregPx:{value:1.2},uMisregDir:{value:new G(.8,-.6)},uGradeShadow:{value:new J(`#14112a`)},uGradeHigh:{value:new J(`#ffffff`)},uGradeAmt:{value:.25},uVignette:{value:.35},uGlowAmt:{value:1},uTime:{value:0},uStep:{value:0},uImpact:{value:0},uImpactMode:{value:1},uImpactSeed:{value:0},uImpactCenter:{value:new G(.5,.5)},uImpInk:{value:new J(`#0a0912`)},uImpPaper:{value:new J(`#f3eee2`)},uImpAccent:{value:new J(`#3dff8f`)},uFade:{value:0},uFadeCol:{value:new J(`#000000`)},uBloomAmt:{value:0},uBloomDots:{value:.6},uFogCol:{value:new J(`#10142a`)},uFogNear:{value:20},uFogFar:{value:200},uFogAmt:{value:0},uFogLine:{value:.85},uSpeed:{value:0},uSpeedCenter:{value:new G(.5,.5)},uSpeedCol:{value:new J(`#ffffff`)},uBloomThresh:{value:1.2},tLut:{value:Du((e,t,n)=>[e,t,n],2)},uLutAmt:{value:0},uLutSize:{value:2},uInvProj:{value:new q},uCamWorld:{value:new q},uHFogAmt:{value:0},uHFogY:{value:0},uHFogK:{value:.01},uFogDirAmt:{value:0},uFogGlow:{value:0},uFogHorizon:{value:new J(`#304040`)},tPlane:{value:null},uPlaneAmt:{value:0},uPlaneR:{value:0},uPlaneLed:{value:0},uPlaneC:{value:new G},uPlaneRect:{value:new Wt(-1e3,-750,2e3,1500)},uPlaneCol:{value:new J(`#4fe3b2`)},uPlaneHot:{value:new J(`#eafff6`)}};function Fu(e,t=1){Z.tLut.value=e,Z.uLutSize.value=e.userData.size??e.image.width,Z.uLutAmt.value=t}var Iu=`
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
}`,Lu=`in vec3 position; in vec2 uv; out vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,Ru=`
precision highp float;
uniform sampler2D tColor, tNormal; uniform float uThresh;
in vec2 vUv; out highp vec4 fragColor;
void main(){
  vec3 c = texture(tColor, vUv).rgb;
  float id = floor(texture(tNormal, vUv).a * 255.0 + 0.5);
  float l = dot(c, vec3(0.299, 0.587, 0.114));
  float m = max(step(249.5, id), smoothstep(uThresh, uThresh + 0.25, l));
  fragColor = vec4(c * m, 1.0);
}`,zu=`
precision highp float;
uniform sampler2D tSrc; uniform vec2 uDir;
in vec2 vUv; out highp vec4 fragColor;
void main(){
  vec3 s = texture(tSrc, vUv).rgb * 0.2270;
  s += (texture(tSrc, vUv + uDir * 1.3846).rgb + texture(tSrc, vUv - uDir * 1.3846).rgb) * 0.3162;
  s += (texture(tSrc, vUv + uDir * 3.2308).rgb + texture(tSrc, vUv - uDir * 3.2308).rgb) * 0.0703;
  fragColor = vec4(s, 1.0);
}`,Bu=`
precision highp float;
uniform sampler2D tA, tB; uniform float uB;
in vec2 vUv; out highp vec4 fragColor;
void main(){ fragColor = vec4(texture(tA, vUv).rgb + texture(tB, vUv).rgb * uB, 1.0); }`,Vu=class{constructor(e,{glow:t=!0,kuwahara:n=0,bloom:i=!1}={}){if(this.renderer=e,this.useBloom=i,this.useGlow=t,this.kuwahara=n,this.depth=new bi(1,1),this.depth.type=m,this.rt=new Kt(1,1,{count:2,depthBuffer:!0,depthTexture:this.depth,minFilter:r,magFilter:r,type:l}),this.rt.textures[0].minFilter=o,this.rt.textures[0].magFilter=o,this.glowRT=new Kt(1,1,{depthBuffer:!0,depthTexture:this.depth,type:g}),this.blank=new Zr(new Uint8Array([0,0,0,255]),1,1),this.blank.needsUpdate=!0,this.mat=new so({glslVersion:Be,vertexShader:`in vec3 position; in vec2 uv; out vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,fragmentShader:Pu,uniforms:{...Z,tColor:{value:this.rt.textures[0]},tNormal:{value:this.rt.textures[1]},tDepth:{value:this.depth},tGlow:{value:t?this.glowRT.texture:this.blank},tBloom:{value:this.blank}},depthTest:!1,depthWrite:!1}),n>0&&(this.paintRT=new Kt(1,1,{depthBuffer:!1,type:l}),this.kMat=new so({glslVersion:Be,vertexShader:`in vec3 position; in vec2 uv; out vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,fragmentShader:Iu,uniforms:{tSrc:{value:this.rt.textures[0]},uRes:Z.uRes,uRadius:{value:n}},depthTest:!1,depthWrite:!1}),this.kQuad=new Y(new Ka(2,2),this.kMat),this.kQuad.frustumCulled=!1,this.kScene=new jn,this.kScene.add(this.kQuad),this.mat.uniforms.tColor.value=this.paintRT.texture),i){let e=()=>new Kt(1,1,{depthBuffer:!1,type:g,minFilter:o,magFilter:o});this.bA=e(),this.bB=e(),this.bC=e(),this.bD=e(),this.bOut=e();let t=(e,t)=>new so({glslVersion:Be,vertexShader:Lu,fragmentShader:e,uniforms:t,depthTest:!1,depthWrite:!1});this.brightMat=t(Ru,{tColor:{value:this.rt.textures[0]},tNormal:{value:this.rt.textures[1]},uThresh:Z.uBloomThresh}),this.blurMat=t(zu,{tSrc:{value:null},uDir:{value:new G}}),this.addMat=t(Bu,{tA:{value:null},tB:{value:null},uB:{value:.9}}),this.fsQuad=new Y(new Ka(2,2),this.brightMat),this.fsQuad.frustumCulled=!1,this.fsScene=new jn,this.fsScene.add(this.fsQuad),this.mat.uniforms.tBloom.value=this.bOut.texture}this.quad=new Y(new Ka(2,2),this.mat),this.quad.frustumCulled=!1,this.postScene=new jn,this.postScene.add(this.quad),this.postCam=new Ro(-1,1,1,-1,0,1)}setSize(e,t,n){let r=Math.max(1,Math.round(e*n)),i=Math.max(1,Math.round(t*n));if(this.rt.setSize(r,i),this.glowRT.setSize(r,i),this.paintRT&&this.paintRT.setSize(r,i),this.useBloom){let e=Math.max(1,r>>2),t=Math.max(1,i>>2),n=Math.max(1,r>>3),a=Math.max(1,i>>3);this.bA.setSize(e,t),this.bB.setSize(e,t),this.bC.setSize(n,a),this.bD.setSize(n,a),this.bOut.setSize(e,t)}Z.uRes.value.set(r,i)}fs(e,t){this.fsQuad.material=e,this.renderer.setRenderTarget(t),this.renderer.render(this.fsScene,this.postCam)}bloomPass(){if(!this.useBloom||Z.uBloomAmt.value<=0)return;let e=this.blurMat.uniforms;this.fs(this.brightMat,this.bA),e.tSrc.value=this.bA.texture,e.uDir.value.set(1/this.bA.width,0),this.fs(this.blurMat,this.bB),e.tSrc.value=this.bB.texture,e.uDir.value.set(0,1/this.bA.height),this.fs(this.blurMat,this.bA),e.tSrc.value=this.bA.texture,e.uDir.value.set(1/this.bC.width,0),this.fs(this.blurMat,this.bC),e.tSrc.value=this.bC.texture,e.uDir.value.set(0,1/this.bC.height),this.fs(this.blurMat,this.bD),e.tSrc.value=this.bD.texture,e.uDir.value.set(2/this.bC.width,0),this.fs(this.blurMat,this.bC),e.tSrc.value=this.bC.texture,e.uDir.value.set(0,2/this.bC.height),this.fs(this.blurMat,this.bD);let t=this.addMat.uniforms;t.tA.value=this.bA.texture,t.tB.value=this.bD.texture,this.fs(this.addMat,this.bOut)}renderPasses(e,t=null,n=1,r=1){let i=this.renderer,a=e[0].camera;Z.uNear.value=a.near,Z.uFar.value=a.far,Z.uOrtho.value=0,Z.uInvProj.value.copy(a.projectionMatrixInverse),Z.uCamWorld.value.copy(a.matrixWorld),i.setRenderTarget(this.rt),i.setClearColor(0,0),i.setScissorTest(!1),i.clear(!0,!0,!0);let o=this.rt.width,s=this.rt.height,c=o/n,l=s/r;for(let t of e){if(t.rect){let[e,n,r,a]=t.rect,o=Math.round(e*c),u=Math.round(s-(n+a)*l),d=Math.round(r*c),f=Math.round(a*l);this.rt.viewport.set(o,u,d,f),this.rt.scissor.set(o,u,d,f),this.rt.scissorTest=!0,i.setRenderTarget(this.rt),t.clearDepth&&i.clear(!1,!0,!1)}else this.rt.viewport.set(0,0,o,s),this.rt.scissor.set(0,0,o,s),this.rt.scissorTest=!1,i.setRenderTarget(this.rt),t.clearDepth&&i.clear(!1,!0,!1);i.render(t.scene,t.camera)}if(this.rt.viewport.set(0,0,o,s),this.rt.scissor.set(0,0,o,s),this.rt.scissorTest=!1,this.useGlow){let n=this.glowRT;if(n.viewport.set(0,0,o,s),n.scissor.set(0,0,o,s),n.scissorTest=!1,i.setRenderTarget(n),i.setClearColor(0,1),i.clear(!0,!1,!1),t){for(let r of e)if(r.glow!==!1){if(r.rect){let[e,t,a,o]=r.rect,u=Math.round(e*c),d=Math.round(s-(t+o)*l),f=Math.round(a*c),p=Math.round(o*l);n.viewport.set(u,d,f,p),n.scissor.set(u,d,f,p),n.scissorTest=!0,i.setRenderTarget(n),i.clear(!0,!1,!1)}else n.viewport.set(0,0,o,s),n.scissorTest=!1,i.setRenderTarget(n);i.render(t,r.camera)}}n.viewport.set(0,0,o,s),n.scissor.set(0,0,o,s),n.scissorTest=!1}this.bloomPass(),i.setRenderTarget(null),i.render(this.postScene,this.postCam)}render(e,t,n=null){let r=this.renderer;Z.uNear.value=t.near,Z.uFar.value=t.far,Z.uOrtho.value=+!!t.isOrthographicCamera,Z.uInvProj.value.copy(t.projectionMatrixInverse),Z.uCamWorld.value.copy(t.matrixWorld),r.setRenderTarget(this.rt),r.setClearColor(0,0),r.clear(!0,!0,!0),r.render(e,t),this.useGlow&&(r.setRenderTarget(this.glowRT),r.setClearColor(0,1),r.clear(!0,!1,!1),n&&r.render(n,t)),this.paintRT&&(r.setRenderTarget(this.paintRT),r.render(this.kScene,this.postCam)),this.bloomPass(),r.setRenderTarget(null),r.render(this.postScene,this.postCam)}},Q={uKeyDir:{value:new K(.45,.75,.5).normalize()},uTime:{value:0},uStep:{value:0},uPx:{value:1},uShadeTint:{value:new J(`#1b1640`)},uDotInk:{value:new J(`#0b0a12`)},uRimCol:{value:new J(`#9fffd0`)},uGlint:{value:new J(`#ffffff`)},uFillDir:{value:new K(-.8,.1,-.4).normalize()},uFillCol:{value:new J(`#ff3550`)},uFillAmt:{value:0}},Hu=`
in vec3 position; in vec3 normal; in vec2 uv;
#ifdef USE_INSTANCING
in mat4 instanceMatrix;
out float vInst;
#endif
#ifdef USE_INSTANCE_COLOR
in vec3 instanceColor; out vec3 vIColor;
#endif
#ifdef USE_VCOLOR
in vec3 color; out vec3 vColor;
#endif
#ifdef USE_AOV
in vec3 color; out float vAO;
#endif
#ifdef USE_VID
in float _inkid; out float vId;
#endif
uniform mat4 modelMatrix, modelViewMatrix, projectionMatrix, viewMatrix; uniform mat3 normalMatrix;
out vec3 vN; out vec3 vViewPos; out vec3 vObjPos; out vec3 vWorldPos; out vec2 vUv;
void main(){
  vec4 p = vec4(position, 1.0);
  vec3 n = normal;
#ifdef USE_VCOLOR
  vColor = color;
#endif
#ifdef USE_AOV
  vAO = color.r;
#endif
#ifdef USE_VID
  vId = _inkid;
#endif
#ifdef USE_INSTANCING
  p = instanceMatrix * p; n = mat3(instanceMatrix) * n;
  vInst = float(gl_InstanceID);
#endif
#ifdef USE_INSTANCE_COLOR
  vIColor = instanceColor;
#endif
  vObjPos = position; vUv = uv;
  vec4 wp = modelMatrix * p; vWorldPos = wp.xyz;
  vec4 mv = viewMatrix * wp; vViewPos = mv.xyz;
  vN = normalize(mat3(viewMatrix) * mat3(modelMatrix) * n);
  gl_Position = projectionMatrix * mv;
}`,Uu=`
precision highp float;
${Tu}
${Eu}
uniform vec3 uKeyDir; uniform float uTime, uStep, uPx;
uniform vec3 uShadeTint, uDotInk, uRimCol, uGlint, uFillDir, uFillCol; uniform float uFillAmt;
uniform vec3 uBase, uBack;
uniform float uMidMix, uDarkMix, uRimAmt, uSpecAmt, uBrushAmt, uBrushScale, uStrokeAmt;
uniform float uDotCell, uDotAngle, uDotAmt, uHatchAmt, uId, uEmissive, uLift, uAlpha, uAOAmt, uGain;
uniform vec3 uStrokeDir;
#ifdef USE_GRID
uniform vec2 uGrid; uniform float uGridW; uniform vec3 uPulseCol; uniform float uPulse;
#endif
#ifdef USE_MAP
uniform sampler2D uMap; uniform float uMapAmt;
#endif
#ifdef USE_BAKE
uniform sampler2D uBake; // r: ambient occlusion, g: convexity/edge wear, b: cavity
#endif
#ifdef USE_PAINT
uniform sampler2D uPaint; uniform vec3 uPaintA, uPaintB;
#endif
in vec3 vN; in vec3 vViewPos; in vec3 vObjPos; in vec3 vWorldPos; in vec2 vUv;
#ifdef USE_VCOLOR
in vec3 vColor;
#endif
#ifdef USE_INSTANCING
in float vInst;
#endif
#ifdef USE_INSTANCE_COLOR
in vec3 vIColor;
#endif
#ifdef USE_AOV
in float vAO;
#endif
#ifdef USE_VID
in float vId;
#endif
layout(location = 0) out highp vec4 gColor;
layout(location = 1) out highp vec4 gNormal;

vec3 tone(vec3 base, float t, float edge){
  vec3 mid = mix(base, uShadeTint, uMidMix);
  vec3 dark = mix(base, uShadeTint, uDarkMix);
  float a1 = smoothstep(0.30 - edge, 0.30 + edge, t);
  float a0 = smoothstep(-0.06 - edge, -0.06 + edge, t);
  return mix(dark, mix(mid, base, a1), a0);
}

void main(){
#ifdef FLAT
  vec3 N = normalize(cross(dFdx(vViewPos), dFdy(vViewPos)));
#else
  vec3 N = normalize(vN);
  if (!gl_FrontFacing) N = -N;
#endif
  vec3 V = normalize(-vViewPos);
  vec3 L = normalize(uKeyDir);
  vec3 base = gl_FrontFacing ? uBase : uBack;
#ifdef USE_VCOLOR
  base = vColor;
#endif
#ifdef USE_INSTANCE_COLOR
  base = vIColor;
#endif
  float idOut = uId;
#ifdef USE_INSTANCING
  if (uId < 249.5) idOut = 1.0 + mod(uId + vInst * 7.0, 198.0);
#endif
#ifdef USE_MAP
  vec4 mp = texture(uMap, vUv);
  base = mix(base, mp.rgb, mp.a * uMapAmt);
#endif
  if (uEmissive > 0.5) {
    gColor = vec4(base * uGain, uAlpha);
#ifdef USE_VID
    gNormal = vec4(N * 0.5 + 0.5, mod(vId + uId, 250.0) / 255.0);
#else
    gNormal = vec4(N * 0.5 + 0.5, idOut / 255.0);
#endif
    return;
  }
  float ndl = dot(N, L);
  // brush noise in object space, stretched along the stroke direction: breaks the terminator like paint
  vec3 sp = vObjPos * uBrushScale;
  vec3 sd = normalize(uStrokeDir);
  float along = dot(sp, sd);
  vec3 across = sp - sd * along;
  float b = fbm3(vec3(across * 3.0 + along * 0.35) + uStep * 0.0) - 0.5;
  float t = ndl + b * uBrushAmt + uLift;
  float ao = 1.0;
#ifdef USE_AOV
  ao = clamp(vAO * 1.15, 0.0, 1.0);
  t -= (1.0 - ao) * uAOAmt;
#endif
#ifdef USE_BAKE
  vec3 bk = texture(uBake, vUv).rgb;
  ao = bk.r;
  t -= (1.0 - ao) * 0.9;
#endif
  float edge = fwidth(t) * 0.75 + 0.002;
  vec3 col = tone(base, t, edge);
  // painted stroke texture: tiny value variation inside each band
  float stroke = fbm3(vec3(across * 9.0 + along * 1.2)) - 0.5;
  col *= 1.0 + stroke * uStrokeAmt;
  // halftone lives in the transitions (a printed gradient), flat colour inside the bands
  float zoneA = smoothstep(0.42, 0.30, t) * smoothstep(0.10, 0.22, t);      // light -> mid
  float zoneB = smoothstep(0.02, -0.06, t) * smoothstep(-0.55, -0.25, t);   // mid -> dark
  float dA = halftone(gl_FragCoord.xy, uDotCell * uPx, uDotAngle, (0.30 - t) * 2.2);
  float dB = halftone(gl_FragCoord.xy, uDotCell * uPx, uDotAngle, 0.25 + (-t) * 1.4);
  float dots = max(dA * zoneA * 0.75, dB * zoneB);
  col = mix(col, uDotInk, dots * uDotAmt);
  float h = hatch(gl_FragCoord.xy, uDotCell * 0.7 * uPx, uDotAngle + 1.2, clamp(-t - 0.25, 0.0, 1.0) * 1.6);
  col = mix(col, uDotInk, h * uHatchAmt);
  // coloured fill (neon bounce): a hard band of light from a second direction
  if (uFillAmt > 0.0) {
    float fd = dot(N, normalize(uFillDir)) + b * 0.3;
    float fb = smoothstep(0.18, 0.24, fd);
    col = mix(col, col * 0.4 + uFillCol * 0.85, fb * uFillAmt * (1.0 - smoothstep(0.2, 0.6, t)));
  }
  // rim light on the side away from the key (comic night lighting)
  float fr = pow(1.0 - max(dot(N, V), 0.0), 2.4);
  float rim = smoothstep(0.42, 0.47, fr + b * 0.25) * smoothstep(0.35, -0.25, ndl);
  col = mix(col, uRimCol, rim * uRimAmt);
  // hard painted glint
  vec3 R = reflect(-L, N);
  float s = pow(max(dot(R, V), 0.0), 28.0);
  float glint = smoothstep(0.55, 0.6, s + b * 0.35);
  col = mix(col, uGlint, glint * uSpecAmt);
#ifdef USE_BAKE
  // painted edge wear on convex edges
  col = mix(col, mix(base, uGlint, 0.35), smoothstep(0.55, 0.75, bk.g) * 0.55 * step(-0.1, t));
#endif
#ifdef USE_GRID
  // printed crease lines on every facet edge, with signal pulses running along them
  vec2 gq = vUv * uGrid;
  vec2 gf = abs(fract(gq) - 0.5);
  vec2 gw = fwidth(gq);
  float gl = max(smoothstep(0.5 - gw.x * uGridW, 0.5 - gw.x * max(uGridW - 1.0, 0.2), gf.x), smoothstep(0.5 - gw.y * uGridW, 0.5 - gw.y * max(uGridW - 1.0, 0.2), gf.y));
  col = mix(col, uDotInk, gl * 0.85);
  if (uPulse > 0.0) {
    float lane = floor(gq.y + 0.5) + floor(gq.x + 0.5) * 7.0;
    float ph = fract(gq.x * 0.11 - uStep * 0.6 + hash11(lane) * 7.0);
    float ph2 = fract(gq.y * 0.13 - uStep * 0.45 + hash11(lane + 3.0) * 5.0);
    float onx = smoothstep(0.5 - gw.y * 3.2, 0.5 - gw.y * 1.2, gf.y) * step(0.84, ph);
    float ony = smoothstep(0.5 - gw.x * 3.2, 0.5 - gw.x * 1.2, gf.x) * step(0.86, ph2);
    col = mix(col, uPulseCol, clamp(onx + ony, 0.0, 1.0) * uPulse);
  }
#endif
#ifdef USE_PAINT
  vec4 pnt = texture(uPaint, vUv);
  float pa = smoothstep(0.35, 0.55, pnt.a);
  vec3 pc = mix(uPaintA, uPaintB, pnt.r);
  vec3 ptone = tone(pc, t + 0.15, edge);
  ptone = mix(ptone, uDotInk, dots * uDotAmt * 0.6);
  col = mix(col, ptone, pa);
#endif
  gColor = vec4(col, uAlpha);
#ifdef USE_VID
  gNormal = vec4(N * 0.5 + 0.5, mod(vId + uId, 250.0) / 255.0);
#else
  gNormal = vec4(N * 0.5 + 0.5, idOut / 255.0);
#endif
}`,Wu=1,Gu=0;function Ku(){return Wu=Wu%198+1,Wu}function qu(){return Gu=(Gu+1)%5,250+Gu}function Ju(e={}){let t={},n={uKeyDir:Q.uKeyDir,uTime:Q.uTime,uStep:Q.uStep,uPx:Q.uPx,uShadeTint:Q.uShadeTint,uDotInk:Q.uDotInk,uRimCol:Q.uRimCol,uGlint:Q.uGlint,uFillDir:Q.uFillDir,uFillCol:Q.uFillCol,uFillAmt:Q.uFillAmt,uBase:{value:new J(e.base??`#cccccc`)},uBack:{value:new J(e.back??e.base??`#cccccc`)},uMidMix:{value:e.mid??.42},uDarkMix:{value:e.dark??.78},uRimAmt:{value:e.rim??1},uSpecAmt:{value:e.spec??.8},uBrushAmt:{value:e.brush??.32},uBrushScale:{value:e.brushScale??1.6},uStrokeAmt:{value:e.stroke??.1},uStrokeDir:{value:new K(...e.strokeDir??[.3,1,.2])},uDotCell:{value:e.dotCell??5.5},uDotAngle:{value:e.dotAngle??.785},uDotAmt:{value:e.dot??.85},uHatchAmt:{value:e.hatch??0},uId:{value:e.id??(e.emissive&&e.bloom!==!1?qu():Ku())},uEmissive:{value:+!!e.emissive},uLift:{value:e.lift??0},uAlpha:{value:e.alpha??1},uAOAmt:{value:e.ao??.9},uGain:{value:e.gain??1}};e.flat&&(t.FLAT=``),e.map&&(t.USE_MAP=``,n.uMap={value:e.map},n.uMapAmt={value:e.mapAmt??1}),e.bake&&(t.USE_BAKE=``,n.uBake={value:e.bake}),e.paint&&(t.USE_PAINT=``,n.uPaint={value:e.paint},n.uPaintA={value:new J(e.paintA??`#ffd400`)},n.uPaintB={value:new J(e.paintB??`#ff3b30`)}),e.instanced&&(t.USE_INSTANCING=``),e.vertexColors&&(t.USE_VCOLOR=``),e.instanceColor&&(t.USE_INSTANCE_COLOR=``),e.aoVertex&&(t.USE_AOV=``),e.vertexIds&&(t.USE_VID=``),e.grid&&(t.USE_GRID=``,n.uGrid={value:new G(...e.grid)},n.uGridW={value:e.gridW??1.6},n.uPulseCol={value:new J(e.pulseCol??`#ffffff`)},n.uPulse={value:e.pulse??0});let r=new so({glslVersion:Be,vertexShader:Hu,fragmentShader:Uu,uniforms:n,defines:t,side:e.side??0,transparent:!!e.transparent,depthWrite:e.depthWrite??!0});return r.userData.ink=!0,r}var Yu={uTop:{value:new J(`#0d0b1c`)},uBottom:{value:new J(`#1d1640`)},uDot:{value:new J(`#06050c`)},uGlowCol:{value:new J(`#2b6b52`)},uGlowPos:{value:new G(.7,.55)},uGlowAmt:{value:.35},uCloud:{value:.18},uDotAmt:{value:.55},uDotCell:{value:7},uShift:{value:new G(0,0)},uGridCol:{value:new J(`#eee6d3`)},uGridAmt:{value:0},uGridCell:{value:56},uShaftAmt:{value:0},uShaftCol:{value:new J(`#e9c98a`)},uShaftSrc:{value:new G(.15,1.15)},uShaftDir:{value:0}};function Xu(e){let t=new so({glslVersion:Be,vertexShader:`in vec3 position; in vec2 uv; out vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.9999, 1.0); }`,fragmentShader:`
      precision highp float;
      ${Tu}
      ${Eu}
      uniform vec3 uTop, uBottom, uDot, uGlowCol, uGridCol, uShaftCol; uniform vec2 uGlowPos, uShift, uShaftSrc; uniform float uGlowAmt, uCloud, uDotAmt, uDotCell, uPx, uStep, uGridAmt, uGridCell, uShaftAmt, uShaftDir;
      uniform vec2 uRes;
      in vec2 vUv;
      layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){
        vec2 uv = vUv + uShift;
        vec2 asp = vec2(uRes.x / uRes.y, 1.0);
        float t = smoothstep(0.0, 1.0, uv.y);
        vec3 c = mix(uBottom, uTop, t);
        // painted cloud masses (low frequency, brushy)
        float cl = fbm2(uv * asp * vec2(1.6, 3.2) + vec2(0.0, uv.x * 0.6));
        c = mix(c, mix(uBottom, uTop, 0.5) * 1.18, smoothstep(0.52, 0.72, cl) * uCloud);
        // soft glow pool behind the subject
        float gd = length((uv - uGlowPos) * asp);
        float gl = exp(-gd * gd * 5.0);
        c = mix(c, uGlowCol, gl * uGlowAmt);
        // painted light shaft: a soft wedge from a high window, broken by brush noise
        if (uShaftAmt > 0.0) {
          vec2 d = (uv - uShaftSrc) * asp;
          float ang = atan(d.x, -d.y);
          float w = smoothstep(0.16, 0.02, abs(ang - uShaftDir) + (fbm2(vec2(ang * 9.0, length(d) * 2.0)) - 0.5) * 0.12);
          float fall = smoothstep(1.7, 0.2, length(d));
          float strokes = 0.75 + 0.5 * fbm2(vec2(ang * 40.0, length(d) * 1.5));
          c = mix(c, uShaftCol, w * fall * strokes * uShaftAmt);
        }
        // halftone falloff toward the bottom
        float dark = (1.0 - t) * 0.55 + (1.0 - gl) * 0.15;
        float d = halftone(gl_FragCoord.xy, uDotCell * uPx, 0.785, dark * dark);
        c = mix(c, uDot, d * uDotAmt);
        // manuscript-paper grid, fading away from the glow
        if (uGridAmt > 0.0) {
          vec2 gp = gl_FragCoord.xy / (uGridCell * uPx);
          vec2 gf = abs(fract(gp) - 0.5);
          float w = 0.5 - 0.6 / (uGridCell * uPx);
          float line = max(step(w, gf.x), step(w, gf.y));
          float major = max(step(w, abs(fract(gp.x / 4.0) - 0.5) * 4.0 - 1.5 + 0.0), 0.0);
          float dash = step(0.5, fract((gp.x + gp.y) * 2.0));
          c = mix(c, uGridCol, line * uGridAmt * (0.55 + 0.45 * gl) * (0.6 + 0.4 * dash));
        }
        gColor = vec4(c, 1.0);
        gNormal = vec4(0.5, 0.5, 1.0, 0.0);
      }`,uniforms:{...Yu,uPx:e,uStep:{value:0},uRes:{value:new G(1,1)}},depthTest:!1,depthWrite:!1}),n=new Y(new Ka(2,2),t);return n.frustumCulled=!1,n.renderOrder=-1e3,n}var Zu=class{constructor({ids:e,onChange:t,onSide:n,start:r=0,root:i=window,wrap:a=!1}){this.ids=e,this.wrap=a,this.onChange=t,this.onSide=n||(()=>!1),this.index=r,this.lockUntil=0,this.wheelAcc=0,this.lastWheel=0,this.gestureUsed=!1,this.touch=null,this.enabled=!0,this.listeners=new Set,i.addEventListener(`wheel`,e=>this.wheel(e),{passive:!1}),i.addEventListener(`keydown`,e=>this.key(e)),i.addEventListener(`touchstart`,e=>this.touchStart(e),{passive:!0}),i.addEventListener(`touchmove`,e=>this.touchMove(e),{passive:!1}),i.addEventListener(`touchend`,e=>this.touchEnd(e),{passive:!0}),window.addEventListener(`hashchange`,()=>this.fromHash(`hash`)),document.addEventListener(`click`,e=>{let t=e.target.closest&&e.target.closest(`a[href^="#"]`);if(!t)return;let n=t.getAttribute(`href`).slice(1),r=this.indexOf(n);r<0||(e.preventDefault(),this.go(r,`link`),history.replaceState(null,``,`#`+n))}),document.addEventListener(`focusin`,e=>{let t=e.target.closest&&e.target.closest(`[data-sec]`);if(!t)return;let n=this.indexOf(t.dataset.sec);n>=0&&n!==this.index&&this.go(n,`focus`,!0)})}on(e){return this.listeners.add(e),()=>this.listeners.delete(e)}indexOf(e){let t=this.ids.indexOf(e);if(t>=0)return t;let n=document.getElementById(e),r=n&&n.closest(`[data-sec]`);return r?this.ids.indexOf(r.dataset.sec):-1}fromHash(e=`hash`){let t=location.hash.slice(1);if(!t)return!1;let n=this.indexOf(t);return n>=0&&n!==this.index&&(this.go(n,e,e===`initial`),!0)}busy(){return performance.now()<this.lockUntil}go(e,t=`api`,n=!1){if(e=Math.max(0,Math.min(this.ids.length-1,e)),e===this.index||!this.enabled||this.busy()&&!n)return!1;let r=this.index;this.index=e;let i=this.onChange(e,r,t)??900;this.lockUntil=performance.now()+i;for(let n of this.listeners)n(e,r,t);return!0}step(e,t){let n=this.ids.length,r=this.index+e;return this.go(this.wrap&&r>=n?0:r,t)}scrollableTarget(e){let t=e.target;for(;t&&t!==document.body;){if(t.dataset&&t.dataset.scroll!==void 0&&t.scrollHeight>t.clientHeight+2)return t;t=t.parentElement}return null}wheel(e){if(!this.enabled)return;let t=this.scrollableTarget(e);if(t){let n=t.scrollTop<=0,r=t.scrollTop+t.clientHeight>=t.scrollHeight-1;if(e.deltaY<0&&!n||e.deltaY>0&&!r)return}e.preventDefault();let n=performance.now(),r=e.deltaX,i=e.deltaY;n-this.lastWheel>180&&(this.gestureUsed=!1,this.wheelAcc=0,this.sideAcc=0),this.lastWheel=n,!this.gestureUsed&&(Math.abs(r)>Math.abs(i)?(this.sideAcc=(this.sideAcc||0)+r,Math.abs(this.sideAcc)>60&&(this.onSide(Math.sign(this.sideAcc))&&(this.gestureUsed=!0),this.sideAcc=0)):(this.wheelAcc+=i*(e.deltaMode===1?30:1),Math.abs(this.wheelAcc)>36&&!this.busy()&&(this.step(Math.sign(this.wheelAcc),`wheel`)&&(this.gestureUsed=!0),this.wheelAcc=0)))}key(e){if(!this.enabled||e.defaultPrevented||e.altKey||e.ctrlKey||e.metaKey)return;let t=e.target;if(t&&(t.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)))return;let n=0;if(e.key===`ArrowDown`||e.key===`PageDown`||e.key===` `&&!e.shiftKey)n=1;else if(e.key===`ArrowUp`||e.key===`PageUp`||e.key===` `&&e.shiftKey)n=-1;else if(e.key===`Home`){e.preventDefault(),this.go(0,`key`);return}else if(e.key===`End`){e.preventDefault(),this.go(this.ids.length-1,`key`);return}else if(e.key===`ArrowRight`||e.key===`ArrowLeft`){this.onSide(e.key===`ArrowRight`?1:-1)&&e.preventDefault();return}if(n){if(t&&t.closest&&t.closest(`[data-scroll]`))return;e.preventDefault(),this.step(n,`key`)}}touchStart(e){if(e.touches.length!==1){this.touch=null;return}let t=e.touches[0];this.touch={x:t.clientX,y:t.clientY,t:performance.now(),inner:this.scrollableTarget(e),done:!1}}touchMove(e){if(!this.touch||this.touch.done)return;let t=e.touches[0],n=t.clientX-this.touch.x,r=t.clientY-this.touch.y;this.touch.inner||(Math.abs(r)>8||Math.abs(n)>8)&&e.preventDefault()}touchEnd(e){let t=this.touch;if(this.touch=null,!t||t.inner)return;let n=e.changedTouches[0],r=n.clientX-t.x,i=n.clientY-t.y;Math.max(Math.abs(r),Math.abs(i))<44||(Math.abs(r)>Math.abs(i)*1.2?this.onSide(r<0?1:-1):this.step(i<0?1:-1,`swipe`))}},Qu={hit:[{m:1,a:1},{m:2,a:1}],big:[{m:3,a:1},{m:1,a:1},{m:2,a:1}],soft:[{m:1,a:.55}],accent:[{m:3,a:1},{m:3,a:.6}]},$u=class{constructor({reduced:e=!1,frame:t=1/16}={}){this.reduced=e,this.frame=t,this.queue=[],this.t=0,this.last=-10,this.shake={x:0,y:0,amt:0},this.root=document.documentElement}hit({seq:e=`hit`,center:t=[.5,.5],shake:n=1,at:r=0}={}){if(this.reduced)return;let i=performance.now()/1e3;if(i-this.last<.7)return;this.last=i;let a=Qu[e]||Qu.hit;this.queue=a.map((e,t)=>({...e,t:r+t*this.frame})),this.queue.push({m:0,a:0,t:r+a.length*this.frame}),this.t=0,Z.uImpactCenter.value.set(t[0],t[1]),Z.uImpactSeed.value=Math.random()*100,this.shake.amt=Math.max(this.shake.amt,n)}update(e){if(this.queue.length)for(this.t+=e;this.queue.length&&this.queue[0].t<=this.t;){let e=this.queue.shift();Z.uImpact.value=e.a,Z.uImpactMode.value=e.m||Z.uImpactMode.value,e.a>0?(this.root.dataset.impact=String(e.m),Z.uImpactSeed.value+=1.7):delete this.root.dataset.impact}this.shake.amt=Math.max(0,this.shake.amt-e*3.2);let t=this.shake.amt*this.shake.amt,n=Math.floor(performance.now()/62);return n!==this._step&&(this._step=n,this.shake.x=(Math.random()*2-1)*t,this.shake.y=(Math.random()*2-1)*t),this.shake}},ed=`xini-sound`,td=new class{constructor(){this.on=!1,this.ctx=null,this.listeners=new Set,this.lastPlay={}}ensure(){if(this.ctx)return this.ctx;let e=window.AudioContext||window.webkitAudioContext;if(!e)return null;let t=new e;this.ctx=t,this.master=t.createGain(),this.master.gain.value=.55;let n=t.createDynamicsCompressor();n.threshold.value=-16,n.ratio.value=4,this.master.connect(n),n.connect(t.destination);let r=t.sampleRate*1.5;this.noise=t.createBuffer(1,r,t.sampleRate);let i=this.noise.getChannelData(0);for(let e=0;e<r;e++)i[e]=Math.random()*2-1;return t}set(e){this.on=e;try{localStorage.setItem(ed,e?`1`:`0`)}catch{}if(e){let e=this.ensure();e&&e.state===`suspended`&&e.resume(),this.ambient(!0)}else this.ambient(!1);for(let t of this.listeners)t(e)}toggle(){this.set(!this.on)}onChange(e){this.listeners.add(e)}remembered(){try{return localStorage.getItem(ed)===`1`}catch{return!1}}src(e){let t=this.ctx.createBufferSource();return t.buffer=this.noise,t.start(this.ctx.currentTime,Math.random()*.5,e+.05),t}env(e,t,n,r,i){let a=this.ctx.createGain();return a.gain.setValueAtTime(1e-4,t),a.gain.exponentialRampToValueAtTime(r,t+n),a.gain.exponentialRampToValueAtTime(1e-4,t+n+i),e.connect(a),a.connect(this.master),a}filt(e,t,n=1){let r=this.ctx.createBiquadFilter();return r.type=e,r.frequency.value=t,r.Q.value=n,r}tone(e,t,n,r,i,a,o){let s=this.ctx.createOscillator();s.type=e,s.frequency.setValueAtTime(t,r),s.frequency.exponentialRampToValueAtTime(Math.max(20,n),r+i+o),this.env(s,r,i,a,o),s.start(r),s.stop(r+i+o+.05)}play(e,t={}){if(!this.on||!this.ctx)return;let n=performance.now();if(n-(this.lastPlay[e]||0)<45)return;this.lastPlay[e]=n;let r=this.ctx,i=r.currentTime+.005,a=t.gain??1;switch(e){case`tick`:this.tone(`sine`,2400,1800,i,.002,.05*a,.03);break;case`snap`:{let e=this.src(.06),t=this.filt(`highpass`,2500),n=this.filt(`bandpass`,4200,1.4);e.connect(t),t.connect(n),this.env(n,i,.001,.5*a,.05),this.tone(`triangle`,1700,500,i,.001,.12*a,.03);break}case`fold`:{let e=this.src(.3),t=this.filt(`bandpass`,900,.9);t.frequency.setValueAtTime(700,i),t.frequency.exponentialRampToValueAtTime(2800,i+.22),e.connect(t),this.env(t,i,.03,.22*a,.2);break}case`slam`:{this.tone(`sine`,140,42,i,.002,.9*a,.24);let e=this.src(.2),t=this.filt(`lowpass`,600);e.connect(t),this.env(t,i,.001,.5*a,.12);let n=this.src(.08),r=this.filt(`highpass`,3e3);n.connect(r),this.env(r,i,.001,.25*a,.05);break}case`stamp`:{this.tone(`sine`,95,50,i,.002,.7*a,.16);let e=this.src(.12),t=this.filt(`bandpass`,1400,.7);e.connect(t),this.env(t,i,.001,.35*a,.08);break}case`whoosh`:{let e=this.src(.5),t=this.filt(`bandpass`,3e3,.8);t.frequency.setValueAtTime(3200,i),t.frequency.exponentialRampToValueAtTime(400,i+.38),e.connect(t),this.env(t,i,.08,.28*a,.3);break}case`hiss`:{let e=t.dur??.35,n=this.src(e+.2),o=this.filt(`bandpass`,7e3,.7),s=this.filt(`highpass`,3500);n.connect(s),s.connect(o);let c=r.createGain();c.gain.setValueAtTime(1e-4,i),c.gain.exponentialRampToValueAtTime(.32*a,i+.03),c.gain.setValueAtTime(.32*a,i+e),c.gain.exponentialRampToValueAtTime(1e-4,i+e+.1),o.connect(c),c.connect(this.master);break}case`rattle`:for(let e=0;e<5;e++){let t=i+e*.075+Math.random()*.01,n=this.src(.03),r=this.filt(`bandpass`,3e3+Math.random()*1500,4);n.connect(r),this.env(r,t,.001,.3*a,.025)}break;case`splat`:{let e=this.src(.25),t=this.filt(`lowpass`,1800);e.connect(t),this.env(t,i,.002,.5*a,.16),this.tone(`sine`,220,70,i,.002,.35*a,.12);break}case`dial`:{let e=this.src(.03),t=this.filt(`bandpass`,5200,6);e.connect(t),this.env(t,i,5e-4,.45*a,.02),this.tone(`square`,1300,900,i,5e-4,.05*a,.018),this.tone(`sine`,180,120,i,.001,.2*a,.05);break}case`unlock`:{this.tone(`sine`,90,48,i,.002,.8*a,.22);let e=this.src(.12),t=this.filt(`bandpass`,900,1.2);e.connect(t),this.env(t,i,.001,.4*a,.08),this.tone(`triangle`,2200,2150,i+.01,.002,.06*a,.5),this.tone(`triangle`,3310,3290,i+.01,.002,.035*a,.4);let n=this.src(.4),r=this.filt(`highpass`,4e3);n.connect(r),this.env(r,i+.05,.02,.12*a,.3);break}case`seat`:{let e=this.src(.04),t=this.filt(`bandpass`,2600,3);e.connect(t),this.env(t,i,5e-4,.6*a,.03);let n=this.src(.04),r=this.filt(`bandpass`,1500,4);n.connect(r),this.env(r,i+.018,5e-4,.4*a,.03),this.tone(`sine`,140,70,i,.002,.45*a,.09);break}case`zap`:{let e=this.src(.05),t=this.filt(`bandpass`,3400,2.2);t.frequency.setValueAtTime(4200,i),t.frequency.exponentialRampToValueAtTime(1600,i+.045),e.connect(t),this.env(t,i,5e-4,.32*a,.04),this.tone(`square`,700,240,i,5e-4,.03*a,.035);break}case`derez`:{this.tone(`square`,1900,520,i,.001,.05*a,.07);let e=this.src(.06),t=this.filt(`highpass`,5e3);e.connect(t),this.env(t,i,.001,.12*a,.05);break}case`relay`:{let e=this.src(.02),t=this.filt(`highpass`,2e3);e.connect(t),this.env(t,i,3e-4,.35*a,.012),this.tone(`square`,260,200,i,5e-4,.04*a,.015);break}case`power`:{let e=r.createOscillator();e.type=`sawtooth`,e.frequency.setValueAtTime(90,i),e.frequency.exponentialRampToValueAtTime(1400,i+.9);let t=this.filt(`lowpass`,2400,2);e.connect(t),this.env(t,i,.25,.09*a,.7),e.start(i),e.stop(i+1.1),this.tone(`sine`,45,60,i,.4,.4*a,.6);break}}}fan(e){if(!this.amb)return;let t=this.ctx.currentTime;this.amb.ng.gain.setTargetAtTime(.25+.45*e,t,.25),this.amb.nb.frequency.setTargetAtTime(400+700*e,t,.25)}ambient(e){if(this.ctx){if(e&&!this.amb){let e=this.ctx,t=e.createGain();t.gain.value=1e-4;let n=this.filt(`lowpass`,260,.6),r=e.createOscillator(),i=e.createOscillator();r.type=`sawtooth`,i.type=`sawtooth`,r.frequency.value=55,i.frequency.value=55.4;let a=e.createBufferSource();a.buffer=this.noise,a.loop=!0;let o=this.filt(`bandpass`,400,.5),s=e.createGain();s.gain.value=.25,a.connect(o),o.connect(s),s.connect(t),r.connect(n),i.connect(n),n.connect(t),t.connect(this.master),r.start(),i.start(),a.start(),t.gain.exponentialRampToValueAtTime(.06,e.currentTime+2.5),this.amb={g:t,ng:s,nb:o,nodes:[r,i,a]}}else if(!e&&this.amb){let{g:e,nodes:t}=this.amb;this.amb=null,e.gain.exponentialRampToValueAtTime(1e-4,this.ctx.currentTime+.4),setTimeout(()=>t.forEach(e=>{try{e.stop()}catch{}}),500)}}}},nd=e=>e<.5?4*e*e*e:1-(-2*e+2)**3/2,rd=e=>e*e*e*(10+e*(-15+6*e));function id(e){let t=e.length,n=e.map(e=>e[0]),r=e.map(e=>e[1]),i=[],a=Array(t).fill(0);for(let e=0;e<t-1;e++)i.push((r[e+1]-r[e])/(n[e+1]-n[e]));for(let e=1;e<t-1;e++)a[e]=i[e-1]*i[e]<=0?0:3*(n[e+1]-n[e-1])/((2*n[e+1]-n[e]-n[e-1])/i[e-1]+(n[e+1]+n[e]-2*n[e-1])/i[e]);return e=>{if(e<=n[0])return r[0];if(e>=n[t-1])return r[t-1];let i=0;for(;e>n[i+1];)i++;let o=n[i+1]-n[i],s=(e-n[i])/o,c=s*s,l=c*s;return(2*l-3*c+1)*r[i]+(l-2*c+s)*o*a[i]+(-2*l+3*c)*r[i+1]+(l-c)*o*a[i+1]}}var ad=class{constructor(e,t,n=[],{closed:r=!1,speed:i=34,minT:a=1.5,maxT:o=3.2,bank:s=.9,profile:c=`cubic`,lookAhead:l=0,damp:u=0,settle:d=0}={}){this.camera=e,this.stops=t,this.legs=n,this.closed=r,this.speed=i,this.minT=a,this.maxT=o,this.bank=s,this.profile=c,this.lookAheadAmt=l,this.damp=u,this.settleAmt=d,this.index=0,this.pose=this.copyPose(t[0]),this.flight=null,this.offset={p:new K,t:new K},this.offsetTarget={p:new K,t:new K},this.speedNow=0,this.lastPos=this.pose.p.clone(),this.q=null,this.dt=1/60,this.settle=null}copyPose(e){return{p:new K(...[].concat(e.p.toArray?e.p.toArray():e.p)),t:new K(...[].concat(e.t.toArray?e.t.toArray():e.t)),fov:e.fov??45,roll:e.roll??0}}V(e){return e.isVector3?e.clone():new K(...e)}legPts(e){let t=this.legs[e];return t?Array.isArray(t)?t:t.pts||[]:[]}chain(e,t){let n=this.stops.length,r=[],i=t>e?1:-1,a=Math.abs(t-e);if(this.closed){let r=(t-e+n)%n,o=(e-t+n)%n;r<=o?(i=1,a=r):(i=-1,a=o)}let o=e;r.push(this.stops[o]);for(let e=0;e<a;e++){let e=(o+i+n)%n,t=i>0?this.legPts(o):this.legPts(e).slice().reverse();for(let e of t)r.push(e);r.push(this.stops[e]),o=e}return this.lastHop=a===1?i>0?e:(e-1+n)%n:-1,this.lastDir=i,r}go(e,{duration:t}={}){if(e===this.index&&!this.flight)return 0;let n=this.index,r=this.chain(n,e),i={p:this.pose.p.clone(),t:this.pose.t.clone(),fov:this.pose.fov,roll:this.pose.roll},a=[i.p,...r.slice(1).map(e=>this.V(e.p))],o=[i.t,...r.slice(1).map(e=>this.V(e.t))],s=[i.fov,...r.slice(1).map(e=>e.fov??45)],c=[i.roll,...r.slice(1).map(e=>e.roll??0)],l=new Ii(a,!1,`centripetal`,.5),u=new Ii(o,!1,`centripetal`,.5);l.arcLengthDivisions=400,u.arcLengthDivisions=400;let d=l.getLength(),f=r.filter(e=>e.id).length-1,p=this.lastHop>=0?this.legs[this.lastHop]:null,m=p&&!Array.isArray(p)&&!this.flight?p:{},h=m.dur??null,g=null;if(m.warp){let e=id(m.warp);g=this.lastDir>0?e:t=>1-e(1-t)}let _=t??h??wt.clamp(d/this.speed,this.minT,this.maxT+Math.max(0,f-1)*.5),v=[0];for(let e=1;e<a.length;e++)v.push(v[e-1]+a[e].distanceTo(a[e-1]));let y=v.map(e=>e/(v[v.length-1]||1));return this.flight={pc:l,tc:u,F:s,R:c,keys:y,t:0,dur:_,from:n,to:e,warp:g,look:m.look??this.lookAheadAmt},this.index=e,this.settle=null,this.offsetTarget.p.set(0,0,0),this.offsetTarget.t.set(0,0,0),_}nudge(e,t){this.offsetTarget.p.copy(this.V(e)),this.offsetTarget.t.copy(this.V(t))}sampleKeyed(e,t,n){let r=1;for(;r<t.length-1&&t[r]<n;)r++;let i=(n-t[r-1])/Math.max(1e-6,t[r]-t[r-1]);return e[r-1]+(e[r]-e[r-1])*wt.clamp(i,0,1)}sampleT(e,t){let n=t*(e.length-1),r=Math.min(e.length-2,Math.floor(n)),i=n-r;return e[r]+(e[r+1]-e[r])*i}get flying(){return!!this.flight}get progress(){return this.flight?this.flight.t/this.flight.dur:1}update(e){if(this.dt=e,this.flight){let t=this.flight;t.t=Math.min(t.dur,t.t+e);let n=t.t/t.dur,r=wt.clamp(t.warp?t.warp(n):this.profile===`minjerk`?rd(n):nd(n),0,1),i=wt.clamp(t.pc.getUtoTmapping(r),0,1);if(this.pose.p.copy(t.pc.getPoint(i)),this.pose.t.copy(t.tc.getPoint(i)),t.look>0){let e=Math.sin(Math.PI*r),n=t.look*e*e,i=this.pose.t.distanceTo(this.pose.p),a=t.pc.getPointAt(Math.min(1,r+.06)).sub(this.pose.p);a.lengthSq()>1e-6&&this.pose.t.lerp(a.normalize().multiplyScalar(i).add(this.pose.p),n)}this.pose.fov=this.sampleT(t.F,i);let a=this.sampleT(t.R,i),o=this.pose.t.clone().sub(this.pose.p).normalize(),s=new K().crossVectors(o,new K(0,1,0)).normalize(),c=t.pc.getTangentAt(Math.max(0,r-.04)),l=t.pc.getTangentAt(Math.min(1,r+.04)).sub(c).dot(s);if(a+=wt.clamp(-l*this.bank,-.35,.35)*Math.sin(Math.PI*r),this.pose.roll=a,t.t>=t.dur){let e=this.stops[t.to],n=t.pc.getTangentAt(1);this.pose=this.copyPose(e),this.flight=null,this.settleAmt>0&&(this.settle={t:0,dir:n})}}let t=1-Math.exp(-e*3.2);this.offset.p.lerp(this.offsetTarget.p,t),this.offset.t.lerp(this.offsetTarget.t,t);let n=this.camera;if(n.position.copy(this.pose.p).add(this.offset.p),this.settle){let t=this.settle;t.t+=e;let r=this.settleAmt*Math.sin(t.t*2*Math.PI/.7)*Math.exp(-t.t/.22);n.position.addScaledVector(t.dir,r),t.t>1.2&&(this.settle=null)}this.lookAt=this.pose.t.clone().add(this.offset.t),n.fov=this.pose.fov;let r=n.position.distanceTo(this.lastPos)/Math.max(e,1e-4);this.lastPos.copy(n.position),this.speedNow+=(r-this.speedNow)*(1-Math.exp(-e*6))}apply(e={x:0,y:0},t={x:0,y:0}){let n=this.camera;n.position.x+=e.x+t.x,n.position.y+=e.y+t.y,n.updateProjectionMatrix(),n.lookAt(this.lookAt),n.rotateZ(this.pose.roll),this.damp>0&&(!this.q||this.snapNext?(this.q=n.quaternion.clone(),this.snapNext=!1):(this.q.slerp(n.quaternion,1-Math.exp(-this.dt*this.damp)),n.quaternion.copy(this.q))),n.updateMatrixWorld()}snap(){this.snapNext=!0}},od={fetchedAt:`2026-10-02T23:51:41.539Z`,username:`XiniDev`,repos:[{name:`xini.dev`,full_name:`XiniDev/xini.dev`,description:`Personal site of Xini, systems engineer: featured projects, background and contact details.`,html_url:`https://github.com/XiniDev/xini.dev`,homepage:`https://xini.dev`,language:`TypeScript`,topics:[],pushed_at:`2026-10-02T23:50:19Z`,archived:!1,fork:!1},{name:`Gloam`,full_name:`XiniDev/Gloam`,description:`Self-hosted 3D virtual tabletop for fifth-edition RPGs in the browser, with automated spells from the open rules, line of sight and physics dice.`,html_url:`https://github.com/XiniDev/Gloam`,homepage:null,language:`TypeScript`,topics:[],pushed_at:`2026-10-01T10:09:05Z`,archived:!1,fork:!1},{name:`saltancy-web`,full_name:`XiniDev/saltancy-web`,description:`Website for Saltancy, a technical consultancy for web, backend and mobile systems, built with Next.js, Tailwind CSS and Motion.`,html_url:`https://github.com/XiniDev/saltancy-web`,homepage:`https://saltancy-web.vercel.app`,language:`TypeScript`,topics:[],pushed_at:`2026-06-15T00:34:40Z`,archived:!1,fork:!1},{name:`getajobman`,full_name:`XiniDev/getajobman`,description:`Job tracker in Next.js and Supabase that reads a posting from its URL and drafts a tailored CV and cover letter with a language model.`,html_url:`https://github.com/XiniDev/getajobman`,homepage:`https://getajobman.vercel.app`,language:`TypeScript`,topics:[],pushed_at:`2026-04-02T18:45:37Z`,archived:!1,fork:!1},{name:`dbridger`,full_name:`XiniDev/dbridger`,description:`PyQt6 desktop app that queries a local SQLite database in plain English through Gemini, masking emails and card numbers before the model sees them.`,html_url:`https://github.com/XiniDev/dbridger`,homepage:null,language:`Python`,topics:[],pushed_at:`2026-03-08T15:03:43Z`,archived:!1,fork:!1},{name:`limit-order-book`,full_name:`XiniDev/limit-order-book`,description:`Limit order book matching engine in C++ and Python with price-time priority, limit and market orders, and O(1) cancellation.`,html_url:`https://github.com/XiniDev/limit-order-book`,homepage:null,language:`C++`,topics:[],pushed_at:`2025-12-22T00:28:05Z`,archived:!1,fork:!1},{name:`AI-Search-Algorithms`,full_name:`XiniDev/AI-Search-Algorithms`,description:`Coursework: breadth-first, depth-first, uniform-cost, best-first, A* and SMA* search in Java, with bidirectional modes, routing flights on a polar grid.`,html_url:`https://github.com/XiniDev/AI-Search-Algorithms`,homepage:null,language:`Java`,topics:[],pushed_at:`2025-11-28T16:30:22Z`,archived:!1,fork:!1},{name:`LeadingOnesDAC`,full_name:`XiniDev/LeadingOnesDAC`,description:`MSc dissertation: dynamic algorithm configuration on the LeadingOnes benchmark with DDQN and model-based Dyna-DDQN agents.`,html_url:`https://github.com/XiniDev/LeadingOnesDAC`,homepage:null,language:`Jupyter Notebook`,topics:[],pushed_at:`2025-11-28T14:22:00Z`,archived:!1,fork:!1},{name:`wincrazyyy.github.io`,full_name:`XiniDev/wincrazyyy.github.io`,description:`Earlier React version of the WS Math tutoring website, with IBDP, A-Level and IGCSE course pages, pricing, reviews and an enquiry form.`,html_url:`https://github.com/XiniDev/wincrazyyy.github.io`,homepage:null,language:`TypeScript`,topics:[],pushed_at:`2025-10-30T01:44:22Z`,archived:!1,fork:!1},{name:`Jungle-Board-Game-Java`,full_name:`XiniDev/Jungle-Board-Game-Java`,description:`The Jungle board game in Java with a Swing GUI for two local players, legal-move highlighting and hand-drawn piece art.`,html_url:`https://github.com/XiniDev/Jungle-Board-Game-Java`,homepage:null,language:`Java`,topics:[],pushed_at:`2025-08-28T12:47:17Z`,archived:!1,fork:!1},{name:`NullVector-Processing`,full_name:`XiniDev/NullVector-Processing`,description:`2D platformer in Processing (Java) with its own physics and contact resolution, pathfinding enemies and a two-phase boss fight.`,html_url:`https://github.com/XiniDev/NullVector-Processing`,homepage:null,language:`Processing`,topics:[],pushed_at:`2025-08-28T12:38:22Z`,archived:!1,fork:!1},{name:`notes-api`,full_name:`XiniDev/notes-api`,description:`REST API for per-user notes on Express and MongoDB, with JWT authentication, hashed passwords, an admin role and tag search, run with Docker Compose.`,html_url:`https://github.com/XiniDev/notes-api`,homepage:null,language:`JavaScript`,topics:[],pushed_at:`2025-06-17T16:28:58Z`,archived:!1,fork:!1},{name:`aws-streaming-demo`,full_name:`XiniDev/aws-streaming-demo`,description:`React and Vite demo that streams video through Amazon CloudFront.`,html_url:`https://github.com/XiniDev/aws-streaming-demo`,homepage:null,language:`TypeScript`,topics:[],pushed_at:`2024-06-26T14:15:56Z`,archived:!1,fork:!1},{name:`firebase-auth-demo`,full_name:`XiniDev/firebase-auth-demo`,description:`React demo of Firebase Authentication: email and Google sign-in, a protected dashboard route, and deploys to Firebase Hosting from GitHub Actions.`,html_url:`https://github.com/XiniDev/firebase-auth-demo`,homepage:null,language:`TypeScript`,topics:[],pushed_at:`2024-06-05T00:09:21Z`,archived:!1,fork:!1},{name:`AutoScroller`,full_name:`XiniDev/AutoScroller`,description:`Godot 4 prototype of a 3D auto-runner: the player moves forward on its own, steers left and right, and jumps to avoid falling off.`,html_url:`https://github.com/XiniDev/AutoScroller`,homepage:null,language:`GDScript`,topics:[],pushed_at:`2024-06-01T21:13:39Z`,archived:!1,fork:!1},{name:`ecs-platformer-demo`,full_name:`XiniDev/ecs-platformer-demo`,description:`2D platformer demo in C++ and SDL2 built on an entity component system (after Austin Morlan's design), with physics, collision and weapons.`,html_url:`https://github.com/XiniDev/ecs-platformer-demo`,homepage:null,language:`C`,topics:[],pushed_at:`2024-05-21T19:42:34Z`,archived:!1,fork:!1},{name:`EnGarde`,full_name:`XiniDev/EnGarde`,description:`Turn-based fencing game in Python and pygame, played against scripted bots or reinforcement-learning agents (DQN and self-play DRQN) trained with PyTorch.`,html_url:`https://github.com/XiniDev/EnGarde`,homepage:null,language:`Python`,topics:[],pushed_at:`2023-05-03T13:12:13Z`,archived:!1,fork:!1},{name:`graphics-shooter-game`,full_name:`XiniDev/graphics-shooter-game`,description:`Totem Hunter: a first-person shooter in three.js where you light totems to stop enemies spawning, with two guns, aim-down-sights and loot crates.`,html_url:`https://github.com/XiniDev/graphics-shooter-game`,homepage:null,language:`JavaScript`,topics:[],pushed_at:`2023-01-30T14:46:08Z`,archived:!1,fork:!1},{name:`bitventory`,full_name:`XiniDev/bitventory`,description:`Inventory system for pygame with item stacking, stack splitting, sorting and drag-and-drop between windows (fork of codethulu/bitventory).`,html_url:`https://github.com/XiniDev/bitventory`,homepage:null,language:`Python`,topics:[],pushed_at:`2022-07-18T18:48:22Z`,archived:!1,fork:!0},{name:`deutsche-bank-mentorship`,full_name:`XiniDev/deutsche-bank-mentorship`,description:`University group project: a mentoring platform with mentor suggestions, milestones, sessions, ratings and chat, built in React and Django.`,html_url:`https://github.com/XiniDev/deutsche-bank-mentorship`,homepage:null,language:`TypeScript`,topics:[],pushed_at:`2022-03-14T05:34:15Z`,archived:!1,fork:!1},{name:`En-Garde--old-`,full_name:`XiniDev/En-Garde--old-`,description:`Earlier terminal version of EnGarde in C: a turn-based fencing game where you plan up to six actions a turn against a bot or a friend.`,html_url:`https://github.com/XiniDev/En-Garde--old-`,homepage:null,language:`C`,topics:[],pushed_at:`2021-11-04T22:07:50Z`,archived:!1,fork:!1},{name:`JumpAndShoot`,full_name:`XiniDev/JumpAndShoot`,description:`Simple first-person shooter made in Unity 2019.3, shared as a Windows build.`,html_url:`https://github.com/XiniDev/JumpAndShoot`,homepage:null,language:null,topics:[],pushed_at:`2021-10-21T15:11:05Z`,archived:!1,fork:!1},{name:`AngryBallGame`,full_name:`XiniDev/AngryBallGame`,description:`Early Unity 2018.4 game, shared as a Windows build.`,html_url:`https://github.com/XiniDev/AngryBallGame`,homepage:null,language:null,topics:[],pushed_at:`2021-10-21T15:04:03Z`,archived:!1,fork:!1}]},sd=new URL(`voetutor-D0CnBXJm.webp`,import.meta.url).href,cd=new URL(`gloam-DLcjgkGw.webp`,import.meta.url).href,ld=new URL(`saltancy-website--oXGscN2.webp`,import.meta.url).href,ud=new URL(`dbridger-F0p74JUc.webp`,import.meta.url).href,dd={name:`Xini`,role:`Systems engineer`,statement:`I build complete, self-hosted products with modern AI woven in.`,credentials:[`MSc Artificial Intelligence, St Andrews`,`BSc Computer Science, Warwick`],email:`xini@saltancy.com`,github:`https://github.com/XiniDev`,linkedin:`https://www.linkedin.com/in/xinidev`,saltancy:`https://saltancy.com`,contactLine:`I take on client projects through my consultancy, Saltancy.`},fd=[{id:`systems`,label:`Systems`,jp:`システム`,heading:`Whole systems, built solo.`,body:`I take ambitious ideas all the way to production on my own: real-time 3D, multiplayer backends, data, infrastructure and the interface people actually use.`,support:[`Full stack`,`Real-time 3D`,`Multiplayer`]},{id:`ai`,label:`AI`,jp:`人工知能`,heading:`AI that does real work.`,body:`I build AI into products where it earns its place: agents that act on real systems, MCP servers that give models real tools, and local models when the data should stay put.`,support:[`Agents`,`MCP servers`,`Local models`]},{id:`security`,label:`Security`,jp:`防御`,heading:`Secure by default.`,body:`I self-host what I build and design for Zero Trust, with OWASP practice and PII redaction there from the first commit.`,support:[`Self-hosting`,`OWASP`,`Zero Trust`]}],pd=[{slug:`voetutor`,name:`VOETutor`,kicker:`Client work`,summary:`Curated marketplace of vetted IB tutors, with on-demand video lessons and progress tracking.`,tags:[`Next.js`,`Supabase`],url:`https://voetutor.com`,linkLabel:`voetutor.com`,credit:`Built through Saltancy`,image:sd,accent:`#16a085`,year:`2026`,alt:`The VOETutor home page: a search box and cards for vetted IB tutors with their subjects and hourly rates.`},{slug:`gloam`,name:`Gloam`,kicker:`Own product`,summary:`Self-hosted 3D virtual tabletop for D&D 5e, with shadow-casting light, per-creature line of sight and all 339 spells from D&D’s open rules, automated.`,tags:[`TypeScript`,`React Three Fiber`,`Colyseus`,`SQLite`,`MCP`],url:`https://github.com/XiniDev/Gloam`,linkLabel:`Source on GitHub`,image:cd,accent:`#e0a33a`,year:`2026`,alt:`Gloam’s 3D tabletop: a stone dungeon map seen at an angle, with goblin and Crypt Warden tokens and health bars.`},{slug:`saltancy`,name:`Saltancy`,kicker:`Consultancy`,summary:`My consultancy for end-to-end technical work and custom software. Client projects run through it.`,tags:[`Next.js`,`Tailwind CSS`,`Motion`],url:`https://saltancy.com`,linkLabel:`saltancy.com`,image:ld,accent:`#f26b1d`,year:`2026`,alt:`Saltancy’s landing page: a serif headline beside a wireframe cube on a dark background.`}],md={"XiniDev/dbridger":{name:`DBridger`,summary:`Autonomous agent that queries legacy databases in plain English, with PII redaction built in.`,image:ud},"XiniDev/getajobman":{name:`getajobman`,summary:`Job tracker in Next.js and Supabase that reads a posting from its URL and drafts a tailored CV and cover letter with a language model.`},"XiniDev/notes-api":{name:`Notes API`,summary:`Secure REST API where each user creates, reads, updates and deletes their own notes, with filtering, built on Node.js, Express and MongoDB following OWASP guidance.`},"XiniDev/LeadingOnesDAC":{name:`LeadingOnes DAC`,summary:`MSc dissertation: a model-based deep reinforcement learning agent that learns to tune an optimisation algorithm while it runs.`},"XiniDev/AI-Search-Algorithms":{name:`AI Search Algorithms`,summary:`Classic AI search algorithms, from breadth-first and depth-first to A* and SMA*, planning flight routes on a polar grid.`},"XiniDev/NullVector-Processing":{name:`NullVector`,summary:`Processing (Java) platformer with gravity-affected projectiles, boss phases, bounce damage and a full GUI.`},"XiniDev/Jungle-Board-Game-Java":{name:`Jungle Game & JunGUI`,summary:`Java implementation of the Jungle board game with a Swing GUI, multiplayer support and legal-move highlighting.`},"XiniDev/ecs-platformer-demo":{name:`ECS Platformer Demo`,summary:`Platformer demo that tests an Entity-Component-System architecture, written in C++ with SDL2.`}},hd=new Set([`xini.dev`,`Gloam`,`saltancy-web`]),gd=[{key:`overthrow`,name:`Overthrow Synthetica`,description:`Two-week, two-person game jam demo for the Warwick Game Dev Society, made with Three.js and WebGL.`,url:`https://github.com/BlueTentProductions/overthrow-synthetica`,language:`JavaScript`,date:`2023-10-01T00:00:00Z`}],_d=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`],vd=e=>{let t=new Date(e);return`${_d[t.getUTCMonth()]} ${t.getUTCFullYear()}`};function yd(e=new Date(`2026-10-18T00:00:00Z`),t=24,n=12){let r=[];for(let e of od.repos){if(e.fork||hd.has(e.name))continue;let t=md[e.full_name];r.push({key:e.full_name,name:t?.name??e.name,description:t?.summary??e.description??``,url:e.homepage||e.html_url,language:e.language,date:e.pushed_at,archived:e.archived,image:t?.image})}r.push(...gd);let i=Date.UTC(e.getUTCFullYear(),e.getUTCMonth()-t,e.getUTCDate()),a=(e,t)=>Date.parse(t.date)-Date.parse(e.date)||e.name.localeCompare(t.name),o=r.filter(e=>!e.archived&&Date.parse(e.date)>=i).sort(a),s=r.filter(e=>e.archived||Date.parse(e.date)<i).sort(a);return{recent:o.slice(0,n),older:[...o.slice(n),...s]}}var bd=e=>String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`),xd=(e,t,n=``)=>`<a class="${n}" href="${e}" target="_blank" rel="noopener">${t}<span class="sr"> (opens in a new tab)</span></a>`,Sd=[`top`,`systems`,`ai`,`security`,`work`,`contact`],Cd=`<svg viewBox="0 0 32 32" aria-hidden="true"><path class="spk" d="M5 12h5l7-6v20l-7-6H5z"/><path class="w1" d="M21 11c2 2.6 2 7.4 0 10"/><path class="w2" d="M24.5 7.5c4.2 4.6 4.2 12.4 0 17"/><path class="x" d="M21 12l7 8M28 12l-7 8"/></svg>`;function wd({places:e,mark:t,route:n,deco:r={}}){let i=yd(),a=e=>xd(e.url,`<span class="ix__name">${bd(e.name)}</span><span class="ix__desc">${bd(e.description)}</span><span class="ix__meta">${bd(e.language||``)}${e.language?` · `:``}Updated ${vd(e.date)}</span>`,`ix`),[o,s,c,l]=n.viewBox.split(` `).map(Number);return`
<a class="skip" href="#work">Skip to work</a>
<header class="bar">
  <a class="bar__mark" href="#top" aria-label="Xini, back to the start">${t}<span class="bar__name" aria-hidden="true">Xini</span></a>
  <nav class="bar__nav" aria-label="Primary">
    <a href="#work">Work</a><a href="#systems">About</a>${xd(dd.saltancy,`Consultancy<span class="arr" aria-hidden="true">↗</span>`)}<a href="#contact">Contact</a>
  </nav>
  <button class="bar__sound" type="button" aria-pressed="false" aria-label="Sound">${Cd}</button>
</header>
<main class="stops">
  <section class="stop stop--top" id="top" data-stop="top" aria-labelledby="h-top">
    <div class="card card--hero">${r.top||``}
      <p class="card__place" aria-hidden="true">${bd(e[0])}</p>
      <p class="card__kicker"><span>${bd(dd.name)}</span><span>${bd(dd.role)}</span></p>
      <h1 id="h-top" class="card__statement">${bd(dd.statement)}</h1>
      <p class="card__cred">${dd.credentials.map(e=>`<span>${bd(e)}</span>`).join(``)}</p>
    </div>
  </section>
  ${fd.map((t,n)=>`
  <section class="stop stop--${t.id}" id="${t.id}" data-stop="${t.id}" aria-labelledby="h-${t.id}">
    <div class="card">${r[t.id]||``}
      <p class="card__place">${bd(e[n+1])}</p>
      <h2 id="h-${t.id}" class="card__h">${bd(t.heading)}</h2>
      <p class="card__body">${bd(t.body)}</p>
      <ul class="tags" aria-label="Focus">${t.support.map(e=>`<li>${bd(e)}</li>`).join(``)}</ul>
    </div>
  </section>`).join(``)}
  <section class="stop stop--work" id="work" data-stop="work" aria-labelledby="h-work">
    <div class="card card--work">${r.work||``}
      <p class="card__place">${bd(e[4])}</p>
      <h2 id="h-work" class="sr">Work</h2>
      <ol class="work__list">
        ${pd.map((e,t)=>`
        <li class="proj${t===0?` is-current`:``}" data-i="${t}" style="--accent:${e.accent}">
          <p class="proj__kicker">${bd(e.kicker)}</p>
          <h3 class="proj__name">${bd(e.name)}</h3>
          <p class="proj__summary">${bd(e.summary)}</p>
          <ul class="tags">${e.tags.map(e=>`<li>${bd(e)}</li>`).join(``)}</ul>
          <p class="proj__links">${xd(e.url,bd(e.linkLabel)+`<span class="arr" aria-hidden="true">↗</span>`,`btn`)}${e.credit?`<span class="proj__credit">${bd(e.credit)}</span>`:``}</p>
        </li>`).join(``)}
      </ol>
      <div class="work__pager">
        <button class="pager__btn pager__prev" type="button" aria-label="Previous project"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 4l-8 8 8 8"/></svg></button>
        <span class="pager__dots" aria-hidden="true">${pd.map((e,t)=>`<i${t===0?` class="on"`:``}></i>`).join(``)}</span>
        <button class="pager__btn pager__next" type="button" aria-label="Next project"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4l8 8-8 8"/></svg></button>
        <button class="btn btn--ghost work__all" type="button" aria-controls="index" aria-expanded="false">All projects <span class="work__allcount">${i.recent.length+i.older.length}</span></button>
      </div>
    </div>
  </section>
  <section class="stop stop--contact" id="contact" data-stop="contact" aria-labelledby="h-contact">
    <div class="card card--contact">${r.contact||``}
      <p class="card__place">${bd(e[5])}</p>
      <h2 id="h-contact" class="card__h">Get in touch</h2>
      <p class="contact__mail"><a href="mailto:${dd.email}">${dd.email}</a></p>
      <p class="card__body">I take on client projects through my consultancy, ${xd(dd.saltancy,`Saltancy`)}.</p>
      <ul class="contact__links"><li>${xd(dd.github,`GitHub`)}</li><li>${xd(dd.linkedin,`LinkedIn`)}</li></ul>
      <p class="contact__copy">© 2026 Xini</p>
    </div>
  </section>
</main>
<nav class="route" aria-label="Places">
  <svg class="route__map" viewBox="${n.viewBox}" aria-hidden="true"><path class="route__path" d="${n.path}"/><path class="route__done" d="${n.path}"/></svg>
  <ol class="route__list">${Sd.map((t,r)=>{let[i,a]=n.nodes[r];return`<li style="--x:${(i-o)/c*100}%;--y:${(a-s)/l*100}%"><a href="#${t}" data-i="${r}"${r===0?` aria-current="true"`:``}><i aria-hidden="true"></i><span>${bd(e[r])}</span></a></li>`}).join(``)}</ol>
</nav>
<div class="title" aria-hidden="true"><span class="title__text"></span></div>
<aside class="index" id="index" aria-label="All projects" hidden>
  <div class="index__sheet" data-scroll>
    <header class="index__head"><h2>All projects</h2><button class="index__close" type="button" aria-label="Close"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg></button></header>
    <ol class="index__list">${i.recent.map(e=>`<li>${a(e)}</li>`).join(``)}</ol>
    <details class="index__older"><summary>Older projects (${i.older.length})</summary><ol class="index__list">${i.older.map(e=>`<li>${a(e)}</li>`).join(``)}</ol></details>
  </div>
</aside>`}function Td({nav:e,sfx:t,onProject:n,places:r}){let i=[...document.querySelectorAll(`.route__list a`)],a=document.querySelector(`.route__done`),o=a?a.getTotalLength():0,s=[...document.querySelectorAll(`.route__list li`)],c=document.querySelector(`.route__path`),l=s.map((e,t)=>{if(!c)return t/(s.length-1);let n=c.ownerSVGElement.viewBox.baseVal,r=n.x+parseFloat(e.style.getPropertyValue(`--x`))/100*n.width,i=n.y+parseFloat(e.style.getPropertyValue(`--y`))/100*n.height,a=0,l=1/0;for(let e=0;e<=200;e++){let t=c.getPointAtLength(e/200*o),n=(t.x-r)**2+(t.y-i)**2;n<l&&(l=n,a=e/200)}return a}),u=e=>{i.forEach((t,n)=>n===e?t.setAttribute(`aria-current`,`true`):t.removeAttribute(`aria-current`)),a&&(a.style.strokeDasharray=`${o}`,a.style.strokeDashoffset=`${o*(1-l[e])}`)};e.on(e=>u(e)),u(0);let d=[...document.querySelectorAll(`.proj`)],f=[...document.querySelectorAll(`.pager__dots i`)],p=0,m=(e,r=1)=>(e=(e+d.length)%d.length,e!==p&&(d[p].classList.remove(`is-current`),f[p]?.classList.remove(`on`),p=e,d[p].classList.add(`is-current`),d[p].dataset.dir=r>0?`r`:`l`,f[p]?.classList.add(`on`),n?.(p,r),t.play(`whoosh`,{gain:.6}),!0));document.querySelector(`.pager__prev`).addEventListener(`click`,()=>m(p-1,-1)),document.querySelector(`.pager__next`).addEventListener(`click`,()=>m(p+1,1));let h=document.getElementById(`index`),g=document.querySelector(`.work__all`),_=n=>{n?(h.hidden=!1,requestAnimationFrame(()=>h.classList.add(`is-open`)),t.play(`whoosh`),h.querySelector(`.index__close`).focus()):(h.classList.remove(`is-open`),setTimeout(()=>{h.hidden=!0},380),g.focus()),g.setAttribute(`aria-expanded`,String(n)),e.enabled=!n};g.addEventListener(`click`,()=>_(!0)),h.querySelector(`.index__close`).addEventListener(`click`,()=>_(!1)),h.addEventListener(`click`,e=>{e.target===h&&_(!1)}),addEventListener(`keydown`,e=>{e.key===`Escape`&&!h.hidden&&_(!1)});let v=document.querySelector(`.bar__sound`),y=e=>{v.setAttribute(`aria-pressed`,String(e)),document.documentElement.classList.toggle(`sound-on`,e)};v.addEventListener(`click`,()=>{t.toggle(),t.on&&t.play(`snap`)}),t.onChange(y),y(!1),document.addEventListener(`pointerover`,e=>{e.target.closest&&e.target.closest(`a, button`)&&t.play(`tick`)});let b=document.querySelector(`.title`),x=document.querySelector(`.title__text`);return{setProject:(e,t)=>m(e,t),get project(){return p},showTitle:e=>{x.textContent=r[e],b.classList.remove(`is-on`),b.offsetWidth,b.classList.add(`is-on`)},open:_}}var Ed=matchMedia(`(prefers-reduced-motion: reduce)`).matches,Dd=new URLSearchParams(location.search);function Od(e){let t=Object.assign(document.createElement(`a`),{href:e,target:`_blank`,rel:`noopener`});document.body.append(t),t.click(),t.remove()}var kd=class{constructor({canvas:e,director:t,places:n,palettes:r={},palette:i,pipeline:a={}}){this.canvas=e,this.director=t,this.places=n,this.palettes=r;let o=new wu({canvas:e,antialias:!1,powerPreference:`high-performance`,preserveDrawingBuffer:Dd.has(`capture`)});o.autoClear=!1,this.renderer=o,this.pipe=new Vu(o,{glow:a.glow??!1,bloom:a.bloom??!0,kuwahara:a.kuwahara??0}),this.scene=new jn,this.glowScene=new jn,this.camera=new Lo(45,1,.5,3e3),this.backdrop=Xu(Q.uPx),this.scene.add(this.backdrop),this.impact=new $u({reduced:Ed}),this.pointer={x:0,y:0,sx:0,sy:0},this.time=0,this.frozen=null,this.dprScale=1,this.perf={ema:1/60,slow:0,t:0,steps:0},this.view={w:1,h:1,dpr:1,portrait:!1,phone:!1,aspect:1},addEventListener(`resize`,()=>this.resize()),addEventListener(`pointermove`,e=>{this.pointer.x=e.clientX/innerWidth*2-1,this.pointer.y=-(e.clientY/innerHeight*2-1)},{passive:!0}),document.addEventListener(`visibilitychange`,()=>{this.paused=document.hidden,this.last=performance.now()}),this.palette=null,this.setPalette(i||Object.keys(r)[0]),this.cards=[...document.querySelectorAll(`.stop`)]}setPalette(e){let t=this.palettes[e];if(t){this.palette=t,this.paletteName=e;for(let[e,n]of Object.entries(t.css||{}))document.documentElement.style.setProperty(`--${e}`,n);document.documentElement.dataset.palette=e,this.director.palette?.(t,e)}}resize(){let e=innerWidth,t=innerHeight,n=Math.min(e,t)<600,r=Dd.has(`dpr`)?+Dd.get(`dpr`):n?1.5:1.75,i=Math.min(devicePixelRatio||1,r)*this.dprScale;Object.assign(this.view,{w:e,h:t,dpr:i,phone:n,portrait:t>e*1.05,aspect:e/t}),this.renderer.setPixelRatio(i),this.renderer.setSize(e,t,!1),this.pipe.setSize(e,t,i),Q.uPx.value=i,Z.uLine.value=(n?1.15:1.4)*i,Z.uBoil.value=.5*i,this.backdrop.material.uniforms.uRes.value.set(e*i,t*i),this.camera.aspect=e/t,this.director.layout?.(this.view)}async start(){let e=await this.director.build(this);this.route=e,this.resize(),this.rig=new ad(this.camera,e.stops,e.legs,{closed:e.closed,speed:e.speed??34,minT:e.minT??1.6,maxT:e.maxT??3,...e.rig||{}}),this.nav=new Zu({ids:Sd,wrap:!!e.wrap,onChange:(e,t,n)=>this.go(e,t,n),onSide:e=>this.side(e)}),this.ui=Td({nav:this.nav,sfx:td,places:this.places,onProject:(e,t)=>this.director.project?.(e,t,this)}),this.setCard(0,!0),this.director.ready?.(this),this.last=performance.now();let t=()=>{if(requestAnimationFrame(t),this.paused)return;let e=performance.now(),n=(e-this.last)/1e3,r=Math.min(.05,n);this.last=e,this.watchPerf(n),this.frozen!==null&&(r=0),this.tick(r);let i=this.renderer.info;this.statsOn&&(i.autoReset=!1,i.reset()),this.director.preRender?.(this),this.pipe.render(this.scene,this.camera,this.glowScene),this.statsOn&&(this.lastStats={calls:i.render.calls,triangles:i.render.triangles,geometries:i.memory.geometries,textures:i.memory.textures,programs:i.programs?.length??0})};return t(),this.bindClicks(),window.__xini=this.api(),this}watchPerf(e){let t=this.perf;Dd.has(`dpr`)||Dd.has(`capture`)||this.frozen!==null||e>.5||(t.t+=e,t.ema+=(e-t.ema)*.05,!(t.t<2.5||t.steps>=2)&&(t.slow=t.ema>1/38?t.slow+e:0,t.slow>1.2&&(t.steps++,t.slow=0,t.t=1.5,this.dprScale*=.78,this.resize())))}tick(e){this.time+=e;let t=this.time;Q.uTime.value=t,Q.uStep.value=Z.uStep.value=Math.floor(t*12)/12,Z.uTime.value=t;let n=this.pointer;n.sx+=(n.x-n.sx)*(1-Math.exp(-e*2.5)),n.sy+=(n.y-n.sy)*(1-Math.exp(-e*2.5));let r=this.impact.update(e);this.rig.update(e),this.director.update?.(e,t,this);let i=this.rig.flying?.25:1,a=this.director.parallax??1.2;this.view.portrait?(this.camera.position.lerp(this.rig.lookAt,-(this.route.phonePull??.55)),this.camera.fov=Math.min(84,this.camera.fov+(this.route.phoneFov??12)),this.camera.setViewOffset(this.view.w,this.view.h,0,this.view.h*(this.route.phoneLift??.2),this.view.w,this.view.h)):this.camera.view&&this.camera.view.enabled&&this.camera.clearViewOffset(),this.rig.apply({x:n.sx*a*i,y:n.sy*a*.6*i},{x:r.x*.4,y:r.y*.4});let o=wt.clamp((this.rig.speedNow-8)/(this.route.speedRef??60),0,1);if(Z.uSpeed.value+=(o-Z.uSpeed.value)*(1-Math.exp(-e*8)),this.pending){let e=this.rig.progress,t=this.pending;!t.titled&&e>=.16&&(t.titled=!0,this.ui.showTitle(t.to)),(e>=.93||!this.rig.flying)&&(this.pending=null,this.setCard(t.to,!0),this.impact.hit({seq:this.director.arriveSeq?.(t.to,t.from)??this.route.arriveImpact??`soft`,center:this.director.impactCenter?.(t.to,this)??[.5,.5],shake:.5}),td.play(`slam`,{gain:.5}))}this.placeCard()}toScreen(e){let t=e.clone().project(this.camera);return{x:(t.x*.5+.5)*this.view.w,y:(1-(t.y*.5+.5))*this.view.h,behind:t.z>1}}setCard(e,t=!1){this.cards.forEach((t,n)=>{n!==e&&t.classList.remove(`is-current`)}),clearTimeout(this._cardT);let n=()=>{this.cards[e].classList.add(`is-current`),this.director.arrive?.(e,this)};t?n():this._cardT=setTimeout(n,0)}placeCard(){if(this.view.portrait)return;let e=this.rig.index,t=this.route.stops[e],n=this.cards[e];if(!t.anchor||!n)return;let r=this.toScreen(new K(...t.anchor)),i=n.firstElementChild,a=i.offsetWidth,o=i.offsetHeight,s=wt.clamp(r.x,24+a/2,this.view.w-24-a/2),c=s-a/2<230?168:40,l=this._review?.isConnected?this._review:this._review=document.querySelector(`.review`);if(l){let e=l.getBoundingClientRect();e.width&&s+a/2>e.left-12&&s-a/2<e.right+12&&(c=Math.max(c,this.view.h-e.top+14))}let u=wt.clamp(r.y,84+o/2,Math.max(84+o/2,this.view.h-c-o/2));n.style.setProperty(`--ax`,`${s}px`),n.style.setProperty(`--ay`,`${u}px`)}go(e,t,n){document.documentElement.dataset.stop=Sd[e],this.cards[t].classList.remove(`is-current`),this.cards[t].classList.add(`is-leaving`),setTimeout(()=>this.cards[t].classList.remove(`is-leaving`),320),this.director.depart?.(t,e,this);let r=Ed?this.rig.go(e,{duration:.35}):this.rig.go(e);return td.play(`whoosh`),this.pending={to:e,titled:Ed,from:t},r*1e3}side(e){return Sd[this.rig.index]!==`work`||this.rig.flying?!1:(this.ui.setProject(this.ui.project+e,e),!0)}bindClicks(){let e=new ns;addEventListener(`click`,t=>{if(t.target.closest&&t.target.closest(`a,button,.index,.bar,.route,.card`))return;let n=new G(t.clientX/innerWidth*2-1,-(t.clientY/innerHeight)*2+1);e.setFromCamera(n,this.camera),this.director.click?.(t,e,this)})}api(){return{world:this,goto:e=>this.nav.go(typeof e==`string`?Sd.indexOf(e):e,`api`,!0),advance:(e,t=1/30)=>{for(let n=0;n<e;n+=t)this.tick(t)},advanceTo:e=>{let t=Math.max(0,e-this.time);for(let e=0;e<t;e+=1/30)this.tick(1/30)},project:e=>this.ui.setProject(e,1),palette:e=>this.setPalette(e),freeze:()=>{this.frozen=0},unfreeze:()=>{this.frozen=null},stats:()=>(this.statsOn=!0,this.lastStats||null),sfx:td}}};function Ad(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new Tr,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=jd(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=jd(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function jd(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new ur(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}function Md(e,{keep:t=[]}={}){e.updateMatrixWorld(!0);let n=e.matrixWorld.clone().invert(),r=new q,i=new Set(t),a=new Map,o=0,s=(t,n)=>{if(!(t!==e&&t.userData.dynamic||i.has(t))){if(n&&=t===e||t.visible,t.isMesh&&n&&o++,t.isMesh&&n&&!t.isInstancedMesh&&!t.isSkinnedMesh&&!Array.isArray(t.material)){let e=t.material,n=t.geometry;if(!e.transparent&&!n.morphAttributes?.position?.length){let r=`${e.uuid}|${Object.keys(n.attributes).sort().join(`,`)}|${t.renderOrder}|${t.frustumCulled}`;a.has(r)||a.set(r,{m:e,list:[],ro:t.renderOrder,fc:t.frustumCulled}),a.get(r).list.push(t)}}for(let e of[...t.children])s(e,n)}};s(e,!0);let c=0,l=0;return a.forEach(({m:t,list:i,ro:a,fc:o})=>{if(i.length<2)return;let s=Ad(i.map(e=>{let t=e.geometry.index?e.geometry.toNonIndexed():e.geometry.clone();if(t.clearGroups(),r.multiplyMatrices(n,e.matrixWorld),t.applyMatrix4(r),r.determinant()<0){let e=t.attributes.position;for(let n=0;n<e.count;n+=3)for(let e of Object.values(t.attributes)){let t=[];for(let r=0;r<e.itemSize;r++)t.push(e.getComponent(n+1,r));for(let r=0;r<e.itemSize;r++)e.setComponent(n+1,r,e.getComponent(n+2,r)),e.setComponent(n+2,r,t[r])}}return t}));if(!s)return;let u=new Y(s,t);u.renderOrder=a,u.frustumCulled=o,u.name=`batch`,e.add(u),i.forEach(e=>e.removeFromParent()),c+=i.length,l++}),{before:o,after:o-c+l}}function Nd(e,t,n){let r=Au(e,t,n),i=.22,a=r<i?i*(r/i)**1.16:1-.78*((1-r)/.78)**1.22,o=r>1e-4?a/r:1;e*=o,t*=o,n*=o;let s=1-ku(0,.3,a),c=ku(.5,1,a);e+=-.01*s+.028*c,t+=.009*s+.012*c,n+=.007*s-.024*c;let[l,u,d]=ju(Ou(e),Ou(t),Ou(n)),f=Nu(l,145,62)*(1-ku(.32,.68,d)),p=Nu(l,32,26);return u*=1-.24*f,u=Math.min(1,u*(1+.14*p)),Mu(l,u,d)}var Pd={uZenith:{value:new J(`#0a0b2a`)},uHorizon:{value:new J(`#4a2668`)},uGlow:{value:new J(`#c85a7c`)},uMoonDir:{value:new K(-.35,.32,-.88).normalize()},uMoon:{value:new J(`#f3ecd8`)},uMoonSize:{value:.035},uStreak:{value:new J(`#6a3a7e`)},uDot:{value:new J(`#07060d`)},uStars:{value:.6},uBand:{value:.18},uLampDir:{value:new K(0,.3,-1).normalize()},uLampCol:{value:new J(`#ffffff`)},uLampAmt:{value:0},uLampPow:{value:6}};function Fd({radius:e=4e3,px:t}){let n=new Y(new Ya(e,48,24),new so({glslVersion:Be,vertexShader:`in vec3 position; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; out vec3 vDir;
      void main(){ vDir = normalize(position); vec4 p = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); gl_Position = vec4(p.xy, p.w * 0.99999, p.w); }`,fragmentShader:`precision highp float;
      ${Tu}
      ${Eu}
      uniform vec3 uZenith, uHorizon, uGlow, uMoonDir, uMoon, uStreak, uDot, uLampDir, uLampCol; uniform float uMoonSize, uStars, uBand, uPx, uLampAmt, uLampPow;
      in vec3 vDir;
      layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){
        vec3 d = normalize(vDir);
        float el = d.y;
        vec3 c = mix(uHorizon, uZenith, smoothstep(-0.02, 0.55, el));
        // city glow hugging the horizon
        c = mix(c, uGlow, exp(-max(el, -0.2) * max(el, -0.2) / (uBand * uBand)) * 0.85);
        // lamp glow, printed as dots where it fades out
        if (uLampAmt > 0.0) {
          float lg = pow(max(dot(d, normalize(uLampDir)), 0.0), uLampPow) * uLampAmt;
          float ld = halftone(gl_FragCoord.xy, 4.0 * uPx, 0.4, clamp(lg * 1.4, 0.0, 1.0));
          c += uLampCol * mix(lg, max(lg, ld * 0.22), smoothstep(0.05, 0.3, lg) * (1.0 - smoothstep(0.3, 0.7, lg)));
        }
        // painted cloud streaks (long horizontal strokes)
        vec2 sp = vec2(atan(d.z, d.x) * 3.0, el * 18.0);
        float st = fbm2(sp * vec2(1.0, 1.0) + vec2(0.0, 3.0));
        c = mix(c, uStreak, smoothstep(0.58, 0.75, st) * smoothstep(0.05, 0.3, el) * (1.0 - smoothstep(0.45, 0.8, el)) * 0.55);
        // moon with a printed halo
        float m = dot(d, normalize(uMoonDir));
        float disc = smoothstep(1.0 - uMoonSize * 0.012, 1.0 - uMoonSize * 0.010, m);
        float halo = smoothstep(1.0 - uMoonSize * 0.25, 1.0, m);
        float hd = halftone(gl_FragCoord.xy, 4.0 * uPx, 0.3, halo * 0.8);
        c = mix(c, uMoon * 0.55 + c * 0.45, hd * 0.6);
        c = mix(c, uMoon, disc);
        // sparse stars
        vec2 g = floor(gl_FragCoord.xy / (3.0 * uPx));
        float s = step(0.9975, hash12(g + floor(d.xz * 10.0))) * smoothstep(0.15, 0.6, el) * uStars;
        c = mix(c, vec3(1.0), s);
        gColor = vec4(c, 1.0);
        gNormal = vec4(0.5, 0.5, 1.0, 0.0);
      }`,uniforms:{...Pd,uPx:t},side:1,depthWrite:!1}));return n.frustumCulled=!1,n.renderOrder=-900,n}var Id=`M43.98,58.66 L58.71,43.36 L31.08,14.67 L31.08,45.27 Z M8.00,98.70 L29.22,107.26 L112.00,21.30 L90.78,12.74 Z M88.92,74.73 L76.02,61.34 L61.29,76.64 L88.92,105.33 Z`,Ld=`M8.00,96.02 L29.22,73.98 L29.22,12.74 L8.00,21.30 Z M112.00,23.98 L90.78,46.02 L90.78,107.26 L112.00,98.70 Z`,Rd=(e=``,t=`currentColor`,n=`currentColor`,r=`Xini`)=>`<svg class="${e}" viewBox="0 0 120 120" role="img" aria-label="${r}"><path fill="${n}" d="${Ld}"/><path fill="${t}" d="${Id}"/></svg>`,zd=e=>Ju({brushScale:.07,dotCell:4.5,...e}),$=(e,t,n)=>new K(e,t,n),Bd=7,Vd=()=>(Bd=Bd*16807%2147483647)/2147483647,Hd=e=>{Bd=e},Ud={w:2e3,h:1500},Wd={uMask:{value:new J(`#070a0b`)},uMask2:{value:new J(`#0c1213`)},uSilk:{value:new J(`#dfe6df`)},uPad:{value:new J(`#c9a25a`)},uSheen:{value:new J(`#2a3a3a`)},uSignal:{value:new J(`#3dff8f`)},uHot:{value:new J(`#eafff4`)},uLitC:{value:new G(0,0)},uLitR:{value:1e5},uPing:{value:[0,1,2,3].map(()=>new Wt(0,0,-100,0))},uSilkTex:{value:null},uRefl:{value:null},uReflMat:{value:new q},uReflAmt:{value:0},uReflDebug:{value:0},uScreen:{value:new G(1,1)}},Gd=`in vec3 position; in vec2 uv; uniform mat4 modelMatrix, viewMatrix, projectionMatrix, uReflMat;
  out vec2 vUv; out vec3 vW; out vec3 vViewPos; out vec3 vN; out vec4 vRefl;
  void main(){ vUv = uv; vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; vec4 mv = viewMatrix * w; vViewPos = mv.xyz;
    vRefl = uReflMat * w;
    vN = normalize(mat3(viewMatrix) * vec3(0.0, 1.0, 0.0)); gl_Position = projectionMatrix * mv; }`;function Kd(){let e=new Ka(Ud.w,Ud.h,1,1);e.rotateX(-Math.PI/2);let t=new Y(e,new so({glslVersion:Be,vertexShader:Gd,fragmentShader:`precision highp float;
      ${Tu}
      ${Eu}
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
      }`,uniforms:{...Wd,uDot:Q.uDotInk,uKeyDir:Q.uKeyDir,uPx:Q.uPx,uStep:Q.uStep}}));t.renderOrder=-10;let n=new Y(new Ci(Ud.w,16,Ud.h),zd({base:`#1d2a24`,brush:.2,spec:.2,rim:.6,id:198}));n.position.y=-8.05;let r=new Cn;return r.add(t,n),r}var qd=class{constructor(e=4096){this.c=document.createElement(`canvas`),this.c.width=e,this.c.height=Math.round(e*(Ud.h/Ud.w)),this.g=this.c.getContext(`2d`),this.g.fillStyle=`#000`,this.g.fillRect(0,0,this.c.width,this.c.height),this.g.globalCompositeOperation=`lighter`,this.k=this.c.width/Ud.w,this.tex=new yi(this.c),this.tex.colorSpace=``,this.tex.anisotropy=8,this.tex.generateMipmaps=!0,this.tex.minFilter=c,this.a=document.createElement(`canvas`),this.a.width=this.c.width>>2,this.a.height=this.c.height>>2,this.ag=this.a.getContext(`2d`),this.ag.globalCompositeOperation=`lighter`,this.ak=this.k/4}finish(){let e=this.g;e.save(),e.filter=`blur(${3*this.k}px)`,e.drawImage(this.a,0,0,this.c.width,this.c.height),e.restore(),this.tex.needsUpdate=!0}P(e,t){return[(e+Ud.w/2)*this.k,(t+Ud.h/2)*this.k]}rect(e,t,n,r,i=1.1){let a=this.g,[o,s]=this.P(e-n/2,t-r/2);a.strokeStyle=`rgb(255,0,0)`,a.lineWidth=i*this.k,a.strokeRect(o,s,n*this.k,r*this.k)}footprint(e,t,n,r,i=4){let a=this.g;a.strokeStyle=`rgb(255,0,0)`,a.lineWidth=1.1*this.k;let o=e-n/2-i,s=t-r/2-i,c=e+n/2+i,l=t+r/2+i,u=Math.min(n,r)*.22+3;for(let[e,t,n,r]of[[o,s,1,1],[c,s,-1,1],[c,l,-1,-1],[o,l,1,-1]])this.line([[e+n*u,t],[e,t],[e,t+r*u]]);a.fillStyle=`rgb(255,0,0)`;let[d,f]=this.P(o-3,s-3);a.beginPath(),a.arc(d,f,1.5*this.k,0,Math.PI*2),a.fill()}pad(e,t,n,r){let i=this.g,[a,o]=this.P(e-n/2,t-r/2);i.fillStyle=`rgb(0,255,0)`,i.fillRect(a,o,n*this.k,r*this.k)}ring(e,t,n,r){let i=this.g,[a,o]=this.P(e,t);i.fillStyle=`rgb(0,255,0)`,i.beginPath(),i.arc(a,o,r*this.k,0,Math.PI*2),i.arc(a,o,n*this.k,0,Math.PI*2,!0),i.fill()}ao(e,t,n,r,i=6,a=.8){let o=this.ag,s=this.ak,c=(e-n/2+Ud.w/2)*s,l=(t-r/2+Ud.h/2)*s;o.fillStyle=`rgb(0,0,${Math.round(150*a)})`,o.fillRect(c-i*s*.5,l-i*s*.5,(n+i)*s,(r+i)*s),o.fillStyle=`rgb(0,0,${Math.round(105*a)})`,o.fillRect(c,l,n*s,r*s)}aoDisc(e,t,n,r=6,i=.8){let a=this.ag,o=this.ak,s=(e+Ud.w/2)*o,c=(t+Ud.h/2)*o;a.fillStyle=`rgb(0,0,${Math.round(150*i)})`,a.beginPath(),a.arc(s,c,(n+r*.5)*o,0,Math.PI*2),a.fill(),a.fillStyle=`rgb(0,0,${Math.round(105*i)})`,a.beginPath(),a.arc(s,c,n*o,0,Math.PI*2),a.fill()}text(e,t,n,r,{weight:i=`600`,family:a=`"JetBrains Mono Variable", monospace`,align:o=`left`,rot:s=0,base:c=`middle`,track:l=0,stretch:u=1}={}){let d=this.g,[f,p]=this.P(t,n);d.save(),d.translate(f,p),d.rotate(s),d.scale(1,u),d.fillStyle=`rgb(255,0,0)`,d.font=`${i} ${r*this.k}px ${a}`,d.textAlign=o,d.textBaseline=c,l&&(d.letterSpacing=`${l*this.k}px`),d.fillText(e,0,0),d.restore()}line(e,t=1.1){let n=this.g;n.strokeStyle=`rgb(255,0,0)`,n.lineWidth=t*this.k,n.lineJoin=`miter`,n.beginPath(),e.forEach(([e,t],r)=>{let[i,a]=this.P(e,t);r?n.lineTo(i,a):n.moveTo(i,a)}),n.stroke()}hazard(e,t,n,r,i=10,a=9){let o=this.g,[s,c]=this.P(e-n/2,t-r/2),l=n*this.k,u=r*this.k,d=i*this.k,f=a*this.k;o.save(),o.beginPath(),o.rect(s,c,l,u),o.rect(s+d,c+d,l-2*d,u-2*d),o.clip(`evenodd`),o.fillStyle=`rgb(255,0,0)`;for(let e=-u;e<l+u;e+=f*2)o.beginPath(),o.moveTo(s+e,c),o.lineTo(s+e+f,c),o.lineTo(s+e+f-u,c+u),o.lineTo(s+e-u,c+u),o.fill();o.restore()}path(e,t,n,r,{fill:i=!0,rot:a=0}={}){let o=this.g,[s,c]=this.P(t,n),l=r*this.k/120;o.save(),o.translate(s,c),o.rotate(a),o.scale(l,l),o.translate(-60,-60);let u=new Path2D(e);i?(o.fillStyle=`rgb(255,0,0)`,o.fill(u)):(o.strokeStyle=`rgb(255,0,0)`,o.lineWidth=1.2/l*this.k,o.stroke(u)),o.restore()}};function Jd(e,t){let n=[];for(let r=0;r<e.length;r++){let i=e[r],a=e[Math.max(0,r-1)],o=e[Math.min(e.length-1,r+1)],s=r>0?new G(-(i.y-a.y),i.x-a.x).normalize():null,c=r<e.length-1?new G(-(o.y-i.y),o.x-i.x).normalize():null;s||=c,c||=s;let l=s.clone().add(c).normalize(),u=1/Math.max(.35,l.dot(s));n.push(i.clone().addScaledVector(l,t*u))}return n}function Yd(e,t,n=!1){let r=t[0]-e[0],i=t[1]-e[1],a=Math.abs(r),o=Math.abs(i),s=Math.sign(r),c=Math.sign(i),l=Math.min(a,o),u;return u=n?[e[0]+s*l,e[1]+c*l]:a>o?[t[0]-s*l,e[1]]:[e[0],t[1]-c*l],[e,u,t]}function Xd(e){let t=[e[0]];for(let n=1;n<e.length;n++){let r=Yd(e[n-1],e[n],n%2==0);t.push(r[1],r[2])}return t.filter((e,t,n)=>t===0||Math.hypot(e[0]-n[t-1][0],e[1]-n[t-1][1])>.5)}var Zd={uBoost:{value:0},uSpeed:{value:70}},Qd=class{constructor(){this.pos=[],this.uv=[],this.ph=[],this.buses=[]}bus(e,t=8,n=4,r=1.6,{y:i=.3,power:a=!1}={}){let o=e.map(([e,t])=>new G(e,t));for(let e=0;e<t;e++){let s=(e-(t-1)/2)*n;this.ribbon(Jd(o,s),r,i,a?-1:Vd())}this.buses.push({base:o,n:t,pitch:n,width:r})}ribbon(e,t,n,r){let i=Jd(e,t/2),a=Jd(e,-t/2),o=0,s=[0];for(let t=1;t<e.length;t++)o+=e[t].distanceTo(e[t-1]),s.push(o);for(let t=0;t<e.length-1;t++){let e=i[t],c=i[t+1],l=a[t+1],u=a[t],d=s[t],f=s[t+1];for(let[t,i]of[[e,d],[c,f],[l,f],[e,d],[l,f],[u,d]])this.pos.push(t.x,n,t.y),this.uv.push(i,o),this.ph.push(r)}}mesh(e){let t=new Tr;t.setAttribute(`position`,new pr(this.pos,3)),t.setAttribute(`uv`,new pr(this.uv,2)),t.setAttribute(`phase`,new pr(this.ph,1)),this.mat=new so({glslVersion:Be,vertexShader:`in vec3 position; in vec2 uv; in float phase; uniform mat4 modelMatrix, viewMatrix, projectionMatrix;
        out vec2 vUv; out float vPh; out vec3 vW; out vec3 vN;
        void main(){ vUv = uv; vPh = phase; vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; vN = normalize(mat3(viewMatrix) * vec3(0.0, 1.0, 0.0)); gl_Position = projectionMatrix * viewMatrix * w; }`,fragmentShader:`precision highp float;
        ${Tu}
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
        }`,uniforms:{uCopper:{value:new J(e.trace)},uHot:Wd.uHot,uSignal:Wd.uSignal,uStep:Q.uStep,uSpeed:Zd.uSpeed,uBoost:Zd.uBoost,uLitR:Wd.uLitR,uLitC:Wd.uLitC},side:2});let n=new Y(t,this.mat);return n.frustumCulled=!1,n.renderOrder=-5,n}},$d=class{constructor(e,t){this.pal=e,this.silk=t,this.group=new Cn,this.box=[],this.cyl=[],this.pins=[],this.tops=[],this.zones=[]}keep(e,t,n,r){this.zones.push([e,t,n,r])}blocked(e,t,n,r){return this.zones.some(([i,a,o,s])=>e+n/2>i&&e-n/2<o&&t+r/2>a&&t-r/2<s)}chip(e,t,n,r,i=4,{color:a=this.pal.ic,pins:o=!0,pitch:s=3.2,label:c=``,ao:l=!0}={}){if(!this.blocked(e,t,n+6,r+6)&&(this.box.push({p:$(e,i/2,t),s:$(n,i,r),c:a}),this.silk&&(this.silk.footprint(e,t,n+(o?5:0),r+(o?5:0),3),l&&this.silk.ao(e,t,n+4,r+4,4,.75),c&&this.silk.text(c,e-n/2-4,t+r/2+10,6)),o))for(let i of[0,1,2,3]){let a=i%2?r:n,o=Math.max(2,Math.floor((a-6)/s));for(let s=0;s<o;s++){let c=-a/2+3+(s+.5)*((a-6)/o),l=(i%2?n:r)/2+1.3,u=i%2?i===1?l:-l:c,d=i%2?c:i===0?-l:l;this.pins.push({p:$(e+u,.55,t+d),s:i%2?$(2.8,1.1,1.1):$(1.1,1.1,2.8)}),this.silk&&this.silk.pad(e+u+(i%2?i===1?.8:-.8:0),t+d+(i%2?0:i===0?-.8:.8),i%2?3.6:1.5,i%2?1.5:3.6)}}}passive(e,t,n=4,r=2,i=1.6,a){let o=a??(Vd()<.62?this.pal.mlcc:this.pal.res);this.blocked(e,t,n+3,r+3)||(this.box.push({p:$(e,i/2,t),s:$(n,i,r),c:o}),this.silk&&(n>=r?(this.silk.pad(e-n/2-.4,t,1.4,r+.4),this.silk.pad(e+n/2+.4,t,1.4,r+.4)):(this.silk.pad(e,t-r/2-.4,n+.4,1.4),this.silk.pad(e,t+r/2+.4,n+.4,1.4))))}can(e,t,n=8,r=22,i=this.pal.can,a=this.pal.canTop){this.blocked(e,t,n*2+4,n*2+4)||(this.cyl.push({p:$(e,r/2,t),s:$(n,r,n),c:i}),this.tops.push({p:$(e,r+.35,t),s:$(n*.88,.7,n*.88),c:a}),this.silk&&(this.silk.aoDisc(e,t,n+2,4,.8),this.silk.ring(e,t,n+1.2,n+2.6)))}box3(e,t,n,r,i,a,o){this.box.push({p:$(e,t+i/2,n),s:$(r,i,a),c:o})}sprinkle(e,t,n,r,i,a=10,o=26){for(let s=0;s<i;s++){let i=Math.floor(Vd()*4),s=Vd()-.5,c=a+Vd()*o,l=i%2?e+(i===1?1:-1)*(n/2+c):e+s*(n+o),u=i%2?t+s*(r+o):t+(i===0?-1:1)*(r/2+c),d=Vd()<.5,f=Vd()<.8?1:1.6;this.passive(l,u,(d?2.2:4.2)*f,(d?4.2:2.2)*f,1.6*f)}}row(e,t,n,r,i,a=`cap`,o={}){for(let s=0;s<i;s++){let c=i===1?.5:s/(i-1),l=e+(n-e)*c,u=t+(r-t)*c;a===`can`?this.can(l,u,o.r??6+Vd()*2,o.h??18+Vd()*8,o.color,o.top):this.passive(l,u,o.w??4.4,o.d??2.2,o.h??1.8)}}build(){let e=new q,t=new Tt,n=new J,r=(r,i,a)=>{if(!r.length)return null;let o=new oi(i,a,r.length);return r.forEach((r,i)=>{e.compose(r.p,t.identity(),r.s),o.setMatrixAt(i,e),r.c&&o.setColorAt(i,n.set(r.c))}),o.instanceColor&&(o.instanceColor.needsUpdate=!0),o.frustumCulled=!1,this.group.add(o),o},i=this.pal;return r(this.box,new Ci(1,1,1),zd({base:i.ic,brush:.12,spec:.55,rim:.9,instanced:!0,instanceColor:!0,dotCell:4.5})),r(this.cyl,new Ti(1,1,1,22),zd({base:i.can,brush:.12,spec:.9,rim:1,instanced:!0,instanceColor:!0,dotCell:4.5})),r(this.tops,new Ti(1,1,1,22),zd({base:i.canTop,brush:.1,spec:1,rim:.6,instanced:!0,instanceColor:!0})),r(this.pins,new Ci(1,1,1),zd({base:i.pin,brush:.1,spec:1,rim:.5,instanced:!0})),this.group}};function ef(e){let t=[],n=[],r=[],i=new Ci(1,1,1).toNonIndexed(),a=i.attributes.position.array,o=i.attributes.normal.array,s=i.attributes.uv.array,c=new q,l=new Tt,u=new K,d=new K,f=new Ot;for(let i of e){l.setFromEuler(new an(...i.r??[0,0,0])),c.compose($(...i.p),l,$(...i.s)),f.getNormalMatrix(c);for(let e=0;e<a.length;e+=3)u.set(a[e],a[e+1],a[e+2]).applyMatrix4(c),t.push(u.x,u.y,u.z),d.set(o[e],o[e+1],o[e+2]).applyMatrix3(f).normalize(),n.push(d.x,d.y,d.z);for(let e=0;e<s.length;e++)r.push(s[e])}let p=new Tr;return p.setAttribute(`position`,new pr(t,3)),p.setAttribute(`normal`,new pr(n,3)),p.setAttribute(`uv`,new pr(r,2)),p}function tf(e,t,n){let r=document.createElement(`canvas`);r.width=e,r.height=t;let i=r.getContext(`2d`);n(i,e,t);let a=new yi(r);return a.colorSpace=``,a.anisotropy=8,a.userData={redraw:()=>{i.clearRect(0,0,e,t),n(i,e,t),a.needsUpdate=!0}},a}function nf(e,t,n,{emissive:r=!1,res:i=512,bloom:a=!0,id:o}={}){let s=tf(i,Math.max(8,Math.round(t/e*i)),n),c=zd({base:`#ffffff`,map:s,mapAmt:1,emissive:r,bloom:a,spec:0,rim:0,brush:.05,id:o}),l=new Y(new Ka(e,t),c);return l.userData.redraw=s.userData.redraw,l}function rf({color:e=`#ffffff`,vertex:t,fragment:n,uniforms:r={},side:i=2}={}){return new so({glslVersion:Be,vertexShader:t,fragmentShader:n,uniforms:{uColor:{value:new J(e)},...r},transparent:!0,depthWrite:!1,side:i,blending:5,blendEquation:100,blendSrc:204,blendDst:201,blendSrcAlpha:200,blendDstAlpha:201})}var af=e=>Ju({brushScale:.07,dotCell:4.5,...e}),of={cx:-80,cz:-120,finY0:200,finY1:770,depth:150,width:432,fanR:200};function sf(e,t=!1){let n=[];for(let r of e.split(`M`).filter(e=>e.trim())){let e=r.replace(/Z/g,``).trim().split(/\s*L\s*|\s+/).map(e=>e.split(`,`).map(Number)).filter(e=>e.length===2&&!isNaN(e[0]));e.length<3||n.push(new ra(e.map(([e,n])=>new G(e-60,t?60-n:n-60))))}return n}function cf(e,t,n,r=3){let i=new Cn,a=e/104;return[[Ld,n,r*.7],[Id,t,r]].forEach(([e,t,n])=>{sf(e,!0).forEach(e=>i.add(new Y(new Va(e,{depth:n,bevelEnabled:!1}),t)))}),i.scale.setScalar(a),i}function lf(e){return new so({glslVersion:Be,vertexShader:`in vec3 position; in vec3 normal; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; out vec3 vW; out vec3 vN; out vec3 vV;
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
      }`,uniforms:{uBase:{value:new J(e.copperPipe)},uShade:Q.uShadeTint,uHeat:{value:new J(e.heat)},uHot:{value:new J(e.heatHot)},uKeyDir:Q.uKeyDir,uRim:Q.uRimCol,uGlint:Q.uGlint,uStep:Q.uStep,uOn:{value:1},uId:{value:177},uTop:{value:230}}})}function uf(e){return new so({glslVersion:Be,vertexShader:`in vec3 position; in vec3 normal; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; out vec3 vW; out vec3 vN;
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
      }`,uniforms:{uBase:{value:new J(e.signal)},uHot:{value:new J(e.hot)},uLitY:{value:1e5},uStep:Q.uStep}})}function df(e,t){return new so({glslVersion:Be,vertexShader:`in vec3 position; in vec3 normal; in vec2 uv; uniform mat4 modelMatrix, viewMatrix, projectionMatrix;
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
      }`,uniforms:{uBase:{value:new J(e)},uHot:{value:new J(t)},uStep:Q.uStep,uOn:{value:1},uId:{value:qu()}}})}function ff(e,t){let n=of,{cx:r,cz:i}=n,a=new Cn,o=af({base:e.steel,brush:.15,spec:.9,rim:1}),s=af({base:e.nickel,brush:.12,spec:1,rim:1,dotCell:4.5}),c=lf(e),l=af({base:e.anod,brush:.15,spec:.7,rim:1}),u=(e,t,n,r,i,o,s)=>{let c=new Y(new Ci(e,t,n),s);return c.position.set(r,i+t/2,o),a.add(c),c};u(300,9,32,r,0,i-134,o),u(300,9,32,r,0,i+134,o),u(32,9,236,r-134,0,i,o),u(32,9,236,r+134,0,i,o),u(5,5,270,r+162,6,i,o),u(5,5,26,r+162,6,i+146,o),u(14,12,14,r+162,0,i-138,o),u(232,3,232,r,0,i,af({base:e.substrate,brush:.15,spec:.4,rim:.6})),u(172,10,172,r,3,i,s),u(150,26,150,r,13,i,c),u(176,12,176,r,39,i,s),u(34,8,380,r,51,i,o);for(let e of[-1,1]){let t=new Y(new Ti(9,9,59,16),o);t.position.set(r,29.5,i+e*180),a.add(t);let n=new Y(new Ti(12,12,6,16),s);n.position.set(r,62,i+e*180),a.add(n)}for(let[e,t]of[[-38,150],[0,196],[38,98]]){let n=[],o=i-t,l=i+t,u=(t,i,a,o)=>{for(let s=0;s<=8;s++){let c=a+(o-a)*(s/8);n.push($(r+e,i+Math.sin(c)*34,t+Math.cos(c)*34))}};for(let t=794;t>64;t-=40)n.push($(r+e,t,o));u(o+34,64,Math.PI,Math.PI*1.5);for(let t=o+34+30;t<l-34-10;t+=30)n.push($(r+e,30,t));u(l-34,64,Math.PI*1.5,Math.PI*2);for(let t=104;t<=794;t+=40)n.push($(r+e,t,l));let d=new Y(new Za(new Ii(n,!1,`centripetal`,.1),220,6,12,!1),c);a.add(d);for(let t of[o,l]){let n=new Y(new Ya(6,12,6,0,Math.PI*2,0,Math.PI/2),s);n.position.set(r+e,794,t),a.add(n)}}let d=[];for(let e=n.finY0;e<=n.finY1-7;e+=7.5)d.push({p:[r,e,i],s:[n.depth,2.6,n.width]});u(n.depth*.46,n.finY1-n.finY0,n.width*.84,r,n.finY0,i,af({base:e.brassDark??e.sinkDark,brush:.12,spec:.4,rim:.6}));let f=new Y(ef(d),af({base:e.fin,brush:.1,spec:1,rim:1,mid:.36,dark:.7,dotCell:4.5}));a.add(f);for(let e of[-1,1])for(let t of[-1,1])u(5,n.finY1-n.finY0+6,5,r+e*(n.depth/2+1),n.finY0-4,i+t*(n.width/2+1),l);let p=[];for(let e=0,t=n.finY0;t<=n.finY1-7;t+=7.5,e++){if(e%5!=2||t>620)continue;let a=n.depth*(.35+e*37%10/16),o=r-n.depth/2+e*53%7*6;p.push({p:[Math.min(o+a/2,r+n.depth/2-a/2),t+.2,i+n.width/2+.6],s:[a,1.4,1.4]}),e%2&&p.push({p:[r-n.depth/2+.6,t+.2,i+n.width/2-40-e%7*30],s:[1.4,1.4,60+e%3*40]})}let m=new Y(ef(p),uf(e));a.add(m),u(164,12,446,r,772,i,l),u(150,4,432,r,784,i,af({base:e.anod2,brush:.12,spec:.8,rim:1}));let h=af({base:e.signal,emissive:!0}),g=af({base:e.markBack,emissive:!0}),_=cf(120,h,g,2.5);_.rotation.x=-Math.PI/2,_.position.set(r,788,i),a.add(_),u(156,152,8,r,634,i+n.width/2+4+4,l);let v=cf(104,h,g,3.5);v.position.set(r,712,i+n.width/2+12.2),a.add(v);let y=af({base:e.signal,emissive:!0});for(let[e,t,a,o]of[[140,2.4,0,644],[140,2.4,0,778],[2.4,136,-69,643],[2.4,136,69,643]])u(e,t,2,r+a,o,i+n.width/2+12.6,y);let b=r+n.depth/2+1,x=(n.finY0+n.finY1)/2,S=new ra;S.moveTo(-186,-216),S.lineTo(186,-216),S.quadraticCurveTo(216,-216,216,-186),S.lineTo(216,186),S.quadraticCurveTo(216,216,186,216),S.lineTo(-186,216),S.quadraticCurveTo(-216,216,-216,186),S.lineTo(-216,-186),S.quadraticCurveTo(-216,-216,-186,-216);let C=new na;C.absarc(0,0,n.fanR,0,Math.PI*2,!0),S.holes.push(C);let w=new Va(S,{depth:26,bevelEnabled:!1,curveSegments:48}),T=new Cn;T.position.set(b,x,i),T.rotation.y=Math.PI/2,a.add(T),T.add(new Y(w,af({base:e.fanFrame,brush:.15,spec:.6,rim:1})));let E=new Cn;E.position.z=14,E.userData.dynamic=!0,T.add(E);let D=new Y(new Ti(60,64,22,32),af({base:e.fanFrame,brush:.12,spec:.8,rim:1}));D.rotation.x=Math.PI/2,E.add(D);let O=new Y(new Ti(40,40,2,32),af({base:e.anod2,spec:1,rim:1}));O.rotation.x=Math.PI/2,O.position.z=12,E.add(O);let k=af({base:e.blade,brush:.15,spec:.9,rim:1,side:2});for(let e=0;e<7;e++){let t=new ra,n=-.28,r=.34;t.moveTo(Math.cos(n)*58,Math.sin(n)*58),t.quadraticCurveTo(Math.cos(-.15200000000000002)*252*.5,Math.sin(-.15200000000000002)*252*.5,Math.cos(.03999999999999998)*194,Math.sin(.03999999999999998)*194),t.quadraticCurveTo(Math.cos(.382)*200,Math.sin(.382)*200,Math.cos(.66)*194,Math.sin(.66)*194),t.quadraticCurveTo(Math.cos(.468)*252*.5,Math.sin(.468)*252*.5,Math.cos(r)*58,Math.sin(r)*58),t.lineTo(Math.cos(n)*58,Math.sin(n)*58);let i=new Y(new Va(t,{depth:2.5,bevelEnabled:!1,curveSegments:10}),k),a=new Cn;a.rotation.z=e/7*Math.PI*2,a.add(i),i.rotation.x=.42,E.add(a)}for(let t=0;t<4;t++){let n=new Y(new Ci(8,150,6),af({base:e.fanFrame,brush:.15,spec:.5}));n.position.set(Math.cos(t*Math.PI/2+.6)*128,Math.sin(t*Math.PI/2+.6)*128,3),n.rotation.z=t*Math.PI/2+.6+Math.PI/2,T.add(n)}let A=df(e.signal,e.hot),j=new Y(new Xa(n.fanR+1,3.2,8,96),A);j.position.z=27,T.add(j);let M=new Y(new Xa(n.fanR+1,2.2,6,96),A);if(M.position.z=-1,T.add(M),t){t.ao(r,i,310,310,10,.9);for(let e of[-1,1])t.aoDisc(r,i+e*180,16,6,.9);for(let[e,n]of[[-170,-170],[170,-170],[170,170],[-170,170]])t.ring(r+e,i+n,7,12),t.text(`○`,r+e,i+n,4);t.rect(r,i,316,316,1.4),t.text(`CPU1`,r-158,i-168,12,{weight:`700`}),t.text(`演算`,r-150,i+228,52,{weight:`700`,family:`"Zen Kaku Gothic New", sans-serif`,base:`alphabetic`}),t.text(`COMPUTE`,r-28,i+222,24,{weight:`700`,family:`"Chakra Petch", sans-serif`,base:`alphabetic`,track:2}),t.text(`SOCKET XN-01 · 4 HEAT PIPES · 76 FINS`,r-28,i+236,6.5),t.text(`注意 高温  CAUTION HOT SURFACE`,r+30,i-160,6),t.line([[r-160,i+250],[r+160,i+250]],1.4)}return Md(E),{group:a,update:e=>{let t=Math.floor(e*12)/12;E.rotation.z=-t*2.6},ringMat:A,heatMat:c,floorMat:m.material,fan:T,crownPos:$(r,712,i+n.width/2+12),topPos:$(r,790,i),front:h,back:g,lineMat:y}}var pf=e=>Ju({brushScale:.07,dotCell:4.5,...e}),mf=`"Zen Kaku Gothic New", "Hiragino Sans", sans-serif`,hf=`"Chakra Petch", "Arial Narrow", sans-serif`,gf=`"JetBrains Mono Variable", ui-monospace, monospace`,_f={core:{x:of.cx,z:of.cz},npu:{x:-470,z:330},enclave:{x:700,z:140},dimm:{x0:250,pitch:56,z0:-480,z1:264},io:{x:-1e3,z0:-720,z1:-150}},vf=[-360,-120,120],yf=(e,t,n,r,i,a,o,s)=>{let c=new Y(new Ci(t,n,r),s);return c.position.set(i,a+n/2,o),e.add(c),c};function bf(e,t,n,r,i,a,o,{res:s=512,rot:c=0,emissive:l=!1}={}){let u=nf(e,t,a,{res:s,id:o,emissive:l,bloom:!1});return u.rotation.set(-Math.PI/2,0,c),u.position.set(n,r+.08,i),u}function xf(e,t,n){let r=new Cn,{cx:i,cz:a}=of,o=pf({base:e.sink,brush:.14,spec:.9,rim:1,dotCell:4.5}),s=pf({base:e.sinkDark,brush:.14,spec:.6,rim:1}),c=pf({base:e.signal,emissive:!0});for(let r=0;r<12;r++){let i=-300+r*40;t.box3(i,0,-292,30,28,30,e.choke),n?.ao(i,-292,34,34,4,.8),n?.text(`L${r+1}`,i-12,-273,4.5),t.chip(i,-340,22,16,3.5,{pins:!1,color:e.ic})}for(let r=0;r<10;r++){let i=-250+r*40;t.box3(-256,0,i,30,28,30,e.choke),n?.ao(-256,i,34,34,4,.8),n?.text(`L${r+13}`,-238,i+12,4.5),t.chip(-302,i,16,22,3.5,{pins:!1,color:e.ic})}let l=[],u=[];for(let e=-325;e<=165;e+=10)l.push({p:[e,48,-344],s:[3.2,36,52]});for(let e=-312;e<=136;e+=10)u.push({p:[-306,48,e],s:[52,36,3.2]});yf(r,500,24,54,-80,6,-344,s),yf(r,54,24,450,-306,6,-88,s),r.add(new Y(ef(l),o),new Y(ef(u),o)),yf(r,500,34,5,-80,6,-314,o),yf(r,5,34,450,-276,6,-88,o),yf(r,470,2.2,1.6,-80,30,-311.2,c),yf(r,1.6,2.2,420,-273.2,30,-88,c);let d=[$(-306,74,130),$(-306,74,-300),$(-306,74,-330),$(-290,74,-344),$(-260,74,-344),$(150,74,-344)];r.add(new Y(new Za(new Ii(d,!1,`centripetal`),80,5,10,!1),pf({base:e.copperPipe,spec:1,rim:1,brush:.15}))),yf(r,64,30,34,-360,0,-420,pf({base:e.connector,brush:.15,spec:.5,rim:1}));for(let t=0;t<4;t++)for(let n=0;n<2;n++)yf(r,9,2,9,-381+t*14,30,-428+n*16,pf({base:e.ink2,spec:0}));return n&&(n.ao(-80,-344,510,64,8,.9),n.ao(-306,-88,64,460,8,.9),n.ao(-360,-420,70,40,5,.9),n.text(`VRM  ·  22 PHASE`,-320,-384,7,{weight:`700`}),n.text(`EPS_12V`,-392,-444,6,{weight:`700`}),n.text(`電源`,-330,-470,26,{weight:`700`,family:mf,base:`alphabetic`}),n.text(`POWER`,-270,-472,14,{weight:`700`,family:hf,base:`alphabetic`,track:2})),r}var Sf=(e,t,n)=>new so({glslVersion:Be,vertexShader:`in vec3 position; in vec3 normal; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; out vec3 vW; out vec3 vN;
    void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; vN = normalize(mat3(viewMatrix) * mat3(modelMatrix) * normal); gl_Position = projectionMatrix * viewMatrix * w; }`,fragmentShader:`precision highp float;
    uniform vec3 uBase, uHot; uniform float uStep, uOn, uId, uPhase, uBoost;
    in vec3 vW; in vec3 vN;
    layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
    void main(){
      // a bright pulse runs the length of each module, offset per module
      float w = fract(vW.z / 420.0 - uStep * (0.32 + uBoost * 0.5) + uPhase);
      float pulse = smoothstep(0.0, 0.05, w) * (1.0 - smoothstep(0.05, 0.3, w));
      float seg = step(0.12, fract(vW.z / 18.0));
      vec3 c = mix(uBase * (0.55 + 0.25 * seg), uHot, pulse * 0.85);
      c *= uOn; c += uBase * 0.05 * (1.0 - uOn);
      gColor = vec4(c, 1.0);
      gNormal = vec4(normalize(vN) * 0.5 + 0.5, uId / 255.0);
    }`,uniforms:{uBase:{value:new J(e)},uHot:{value:new J(t)},uStep:Q.uStep,uOn:{value:1},uId:{value:qu()},uPhase:{value:n},uBoost:{value:0}}});function Cf(e,t,n,r,i){let a=new Cn,o=_f.dimm,s=pf({base:e.slot,brush:.14,spec:.5,rim:.4}),c=pf({base:e.latch,brush:.14,spec:.6,rim:1}),l=pf({base:e.dimm,brush:.14,spec:.9,rim:0,dotCell:4.5}),u=pf({base:e.dimmPcb,brush:.1,spec:.5,rim:.6}),d=[],f=(o.z0+o.z1)/2,p=o.z1-o.z0,m=pf({base:e.dimmTop,brush:.1,spec:1,rim:1}),h=pf({base:e.goldPart,brush:.1,spec:1,rim:.4}),g=o.x0-3.6,_=[];for(let t=0;t<4;t++){let r=o.x0+t*o.pitch;yf(a,16,20,p+28,r,0,f,s);for(let e of[-1,1])yf(a,18,34,16,r,0,f+e*(p/2+20),c);(t===0?[...vf.map(e=>[e,236]),[(vf[2]+118+o.z1)/2+1,o.z1-(vf[2]+118)-2]]:[[f,p]]).forEach(([n,i],o)=>{let s=new Cn;if(a.add(s),t===0&&o<3&&(s.userData.dynamic=!0),yf(s,7.6,12,i,r,18,n,u),t===0&&yf(s,7.8,5,i-6,r,18.5,n,h),yf(s,7,160,i-4,r,30,n,l),i>60){yf(s,9,6,i-20,r,188,n,m);let a=new Y(new Ci(8,11,i-30),Sf(e.signal,e.hot,t*.21+o*.07));a.position.set(r,199.5,n),a.userData.k=t,s.add(a),d.push(a)}t===0&&o<3&&_.push(s)}),n&&(n.ao(r,f,26,p+40,6,.85),n.text(`DIMM_${`AB`[t>>1]}${t%2+1}`,r-8,o.z1+44,6.5,{weight:`700`,rot:-Math.PI/2}))}let v=[];r.forEach((t,n)=>{let r=nf(212,119,(r,a,o)=>wf(r,a,o,t,i.imgs?.[n],e),{emissive:!0,res:1024});r.rotation.y=-Math.PI/2,r.position.set(g-1.8,108,vf[n]),r.userData.exhibit=n,_[n].add(r),v.push(r),yf(_[n],1.6,127,220,g-.8,44.5,vf[n],pf({base:e.bezel,brush:.1,spec:.6,rim:1}))}),_.forEach((t,n)=>{let r=nf(216,20,(t,r,i)=>{t.fillStyle=e.dimm,t.fillRect(0,0,r,i),t.fillStyle=e.silk,t.font=`700 ${i*.62}px ${gf}`,t.textBaseline=`middle`;let a=`XINI MEMORY  ·  0${n+1}  ·  DDR5  ·  ON-DIE ECC  ·  記憶  ·  `,o=r*.01;for(;o<r;)t.fillText(a,o,i*.55),o+=t.measureText(a).width},{res:1024,bloom:!1});r.rotation.y=-Math.PI/2,r.position.set(g-.4,178,vf[n]),t.add(r)});let y=-1,b=-1,x=!0,S=(e,t)=>{y=e,b=t,x=!1},C=(e,t,n)=>{let r=Math.floor(e*12)/12-b;_.forEach((e,t)=>{let n=0;if(t===y&&r>=0){if(r<.16)n=24*Math.sin(r/.16*Math.PI/2);else if(r<.26)n=24;else if(r<.36){let e=(r-.26)/.1;n=24*(1-e*e)}else r<.52&&(n=3.2*Math.sin((r-.36)/.16*Math.PI))}e.position.y=n;let i=v[t],a=t===y&&r>=.36?Math.min(1,(r-.36)/.16):1;i.scale.y=t===y&&r>=0&&r<.36?.03:Math.max(.03,a*a),i.userData.flash=t===y&&r>=.36?Math.max(0,1-(r-.36)/.3)*2:0}),!x&&r>=.36&&(x=!0,t?.play(`seat`),n?.(y))};if(n){n.text(`記憶`,150,-470,54,{weight:`700`,family:mf,rot:Math.PI/2,stretch:1.8}),n.text(`MEMORY`,88,-480,26,{weight:`700`,family:hf,rot:Math.PI/2,track:3,stretch:1.8}),n.line([[200,-500],[200,240]],1.4);for(let e=-470;e<240;e+=60)n.line([[186,e],[200,e+14],[186,e+28]],1.2)}return{group:a,screens:v,bars:d,segs:_,seat:S,updateSeat:C,redraw:()=>v.forEach(e=>e.userData.redraw())}}function wf(e,t,n,r,i,a){if(e.fillStyle=`#05080a`,e.fillRect(0,0,t,n),i){let r=Math.max(t/i.width,n*.8/i.height);e.drawImage(i,(t-i.width*r)/2,0,i.width*r,i.height*r)}e.fillStyle=`rgba(2,6,5,0.84)`,e.fillRect(0,n*.74,t,n*.26),e.fillStyle=a.signal,e.fillRect(0,n*.74,t,n*.012),e.fillStyle=`#ffffff`,e.font=`700 ${Math.round(n*.15)}px ${hf}`,e.textBaseline=`alphabetic`,e.fillText(r.name.toUpperCase(),t*.035,n*.94),e.fillStyle=a.signal,e.font=`600 ${Math.round(n*.042)}px ${gf}`,e.fillText((r.kicker+`  ·  `+r.tags.slice(0,3).join(` · `)).toUpperCase(),t*.037,n*.8),e.fillStyle=`rgba(0,0,0,0.16)`;for(let r=0;r<n;r+=4)e.fillRect(0,r,t,1.4)}function Tf(t,n,r){let i=new Cn,{x:a,z:o}=_f.npu,s=pf({base:t.substrate,brush:.14,spec:.5,rim:.8}),c=pf({base:t.steel,brush:.14,spec:.9,rim:1});yf(i,200,6,200,a,0,o,s);for(let[e,t,n,r]of[[200,10,0,-95],[200,10,0,95],[10,180,-95,0],[10,180,95,0]])yf(i,e,4,t,a+n,6,o+r,c);yf(i,96,5,96,a,6,o,pf({base:t.ic,brush:.1,spec:.6,rim:1,id:186}));let l=bf(92,92,a,11,o,(e,n,r)=>{e.fillStyle=`#020604`,e.fillRect(0,0,n,r),e.strokeStyle=t.signal,e.fillStyle=t.signal,e.lineWidth=2;for(let t=0;t<9;t++)for(let i=0;i<9;i++){let a=(t+.5)*n/9,o=(i+.5)*r/9;e.globalAlpha=.35,e.strokeRect(a-n/9*.42,o-r/9*.42,n/9*.84,r/9*.84),e.globalAlpha=.9,e.beginPath(),e.arc(a,o,3+(t*7+i*3)%4,0,Math.PI*2),e.fill()}e.globalAlpha=.6,e.lineWidth=1.5;for(let t=0;t<40;t++){let i=[t*37%9,t*11%9],a=[(t*23+3)%9,(t*5+1)%9];e.beginPath(),e.moveTo((i[0]+.5)*n/9,(i[1]+.5)*r/9),e.lineTo((a[0]+.5)*n/9,(a[1]+.5)*r/9),e.stroke()}e.globalAlpha=1},qu(),{res:512,emissive:!0});i.add(l);for(let e of[-1,1])for(let n of[-1,1])yf(i,30,11,44,a+e*70,6,o+n*26,pf({base:t.hbm,brush:.1,spec:.8,rim:1}));let u=$(a,176,o),d=new Cn;d.position.copy(u),d.userData.dynamic=!0,i.add(d);let f=new Wa(84,0),p=new Wa(40,0);p.rotateY(Math.PI/5),p.rotateX(.4);let m=Ef(f),h=Ef(p),g=[...m,...h,$(0,0,0)],_=[];Df(f,m).forEach(([e,t])=>_.push([e,t,1.25])),Df(p,h).forEach(([e,t])=>_.push([m.length+e,m.length+t,.9])),h.forEach((e,t)=>{m.map((t,n)=>[t.distanceTo(e),n]).sort((e,t)=>e[0]-t[0]).slice(0,2).forEach(([,e])=>_.push([m.length+t,e,.5])),_.push([m.length+t,g.length-1,.6])});let v=new Y(f.clone(),rf({color:t.signal,vertex:`in vec3 position; in vec3 normal; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; uniform vec3 cameraPosition; out float vF;
      void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vec3 n = normalize(mat3(modelMatrix) * normal); vF = 1.0 - abs(dot(n, normalize(cameraPosition - w.xyz))); gl_Position = projectionMatrix * viewMatrix * w; }`,fragment:`precision highp float; uniform vec3 uColor; uniform float uAmt; in float vF;
      layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){ gColor = vec4(uColor, (0.025 + vF * vF * 0.09) * uAmt); gNormal = vec4(0.0); }`,uniforms:{uAmt:{value:1}}}));d.add(v);let y=pf({base:`#ffffff`,emissive:!0,instanced:!0,instanceColor:!0}),b=new oi(new Ga(1,0),y,g.length),x=new q,S=new Tt,C=$(0,1,0),w=m.length;h.length;let T=g.length-1,E=e=>e===T?0:e>=w?1:2,D=e=>e===T?10:e>=w?3.6:5,O=pf({base:`#ffffff`,emissive:!0,instanced:!0,instanceColor:!0}),k=new oi(new Ci(1,1,1),O,_.length),A=h.map(e=>e.clone()),j=g.map(e=>e.clone()),M=new Tt,N=$(.3,1,-.2).normalize(),P=e=>{M.setFromAxisAngle(N,e),A.forEach((e,t)=>j[w+t].copy(e).applyQuaternion(M)),j.forEach((e,t)=>{let n=D(t);x.compose(e,S.identity(),$(n,n,n)),b.setMatrixAt(t,x)}),_.forEach(([e,t,n],r)=>{let i=j[e],a=j[t],o=a.clone().sub(i),s=o.length();S.setFromUnitVectors(C,o.normalize()),x.compose(i.clone().add(a).multiplyScalar(.5),S,$(.9*n,s,.9*n)),k.setMatrixAt(r,x)}),b.instanceMatrix.needsUpdate=!0,k.instanceMatrix.needsUpdate=!0};P(0);let F=new J(t.signal).multiplyScalar(.32),I=new J(t.signal),ee=new J(t.hot),L=new J;g.forEach((e,t)=>b.setColorAt(t,F)),_.forEach((e,t)=>k.setColorAt(t,I)),d.add(b,k);let te=new oi(new Ci(2.4,2.4,2.4),pf({base:`#ffffff`,emissive:!0,instanced:!0}),18);d.add(te);let ne=Array.from({length:18},(e,t)=>({e:Math.floor(Vd()*_.length),u:Vd(),v:.5+Vd()*1.2})),re=[`attn(q,k,v)`,`∑ wᵢxᵢ + b`,`softmax`,`0x3F7A`,`ReLU`,`∇L`,`tokens → logits`,`embed`,`top-p 0.9`,`MCP · tools/call`,`kv-cache`,`local · 8B`],ie=tf(4096,64,(e,t,n)=>{e.fillStyle=`#000`,e.fillRect(0,0,t,n),e.fillStyle=`#fff`,e.font=`600 ${n*.56}px ${gf}`,e.textBaseline=`middle`;let r=8,i=0;for(;r<t-40;){let t=re[i++%re.length]+`  ·  `;e.fillText(t,r,n*.54),r+=e.measureText(t).width}e.fillRect(0,2,t,2),e.fillRect(0,n-4,t,2)});ie.wrapS=e;let ae=[[112,.42,.2,.55],[126,-.62,1.4,-.4],[140,.18,2.6,.3]].map(([e,n,r,a],o)=>{let s=new Ti(e,e,7.5,160,1,!0),c=rf({color:o===1?t.hot:t.signal,vertex:`in vec3 position; in vec2 uv; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; uniform vec3 cameraPosition; out vec2 vUv; out float vFace;
        void main(){ vUv = uv; vec4 w = modelMatrix * vec4(position, 1.0); vec3 n = normalize(mat3(modelMatrix) * vec3(position.x, 0.0, position.z));
          vFace = dot(n, normalize(cameraPosition - w.xyz)); gl_Position = projectionMatrix * viewMatrix * w; }`,fragment:`precision highp float; uniform sampler2D uTex; uniform vec3 uColor, uBand; uniform float uAmt, uRep, uOff; in vec2 vUv; in float vFace;
        layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
        void main(){ float g = texture(uTex, vec2(vUv.x * uRep + uOff, vUv.y)).r; float f = smoothstep(-0.12, 0.12, vFace);
          float a = clamp(max(mix(0.1, 0.66, f), g * mix(0.36, 1.0, f)) * uAmt, 0.0, 1.0);
          gColor = vec4(mix(uBand, uColor, g), a); gNormal = vec4(0.0); }`,uniforms:{uTex:{value:ie},uAmt:{value:1},uRep:{value:Math.round(e/40)},uOff:{value:o*.31},uBand:{value:new J(`#03120e`)}}});c.blending=1;let l=new Y(s,c),d=new Y(s,new so({glslVersion:Be,vertexShader:c.vertexShader,fragmentShader:`precision highp float; uniform sampler2D uTex; uniform float uAmt, uRep, uOff; in vec2 vUv; in float vFace;
        layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
        void main(){ float g = texture(uTex, vec2(vUv.x * uRep + uOff, vUv.y)).r; float f = smoothstep(-0.12, 0.12, vFace);
          if (uAmt < 0.05 || (f < 0.5 && g < 0.6)) discard;
          gColor = vec4(0.0); gNormal = vec4(0.0, 0.0, 0.0, 249.0 / 255.0); }`,uniforms:{uTex:c.uniforms.uTex,uAmt:c.uniforms.uAmt,uRep:c.uniforms.uRep,uOff:c.uniforms.uOff},transparent:!0,depthWrite:!1,side:2,blending:5,blendEquation:100,blendSrc:200,blendDst:201,blendSrcAlpha:201,blendDstAlpha:200}));l.add(d);let f=new Cn;return f.rotation.set(n,r,0),f.add(l),f.position.copy(u),f.userData.dynamic=!0,i.add(f),{m:l,mat:c,spd:a}}),R=new Ti(84,46,160,40,1,!0);R.translate(0,80,0);let oe=new Y(R,rf({color:t.signal,vertex:`in vec3 position; in vec2 uv; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; out vec2 vUv; out float vY;
      void main(){ vUv = uv; vY = position.y / 160.0; gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); }`,fragment:`precision highp float; uniform vec3 uColor; uniform float uStep, uAmt; in vec2 vUv; in float vY;
      layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){ float scan = 0.65 + 0.35 * step(0.5, fract(vY * 18.0 - uStep * 1.5)); float a = (1.0 - vY) * 0.16 * scan * uAmt;
        gColor = vec4(uColor, a); gNormal = vec4(0.0); }`,uniforms:{uStep:Q.uStep,uAmt:{value:1}}}));oe.position.set(a,11,o),i.add(oe),n.row(a-90,o+128,a+90,o+128,8,`can`,{r:7,h:20}),n.row(a+128,o-80,a+128,o+80,6,`can`,{r:7,h:20}),n.sprinkle(a,o,200,200,70,6,16),r&&(r.ao(a,o,210,210,8,.9),r.footprint(a,o,206,206,4),r.text(`U7`,a-104,o-118,10,{weight:`700`}),r.text(`神経`,a-150,o+190,56,{weight:`700`,family:mf,rot:Math.PI/4,stretch:2.2}),r.text(`NEURAL CORE`,a-80,o+240,24,{weight:`700`,family:hf,rot:Math.PI/4,track:2,stretch:2}),r.text(`NPU-01  ·  LOCAL INFERENCE`,a-50,o+286,8,{rot:Math.PI/4,stretch:2}));let se=(e,t)=>{let n=Math.sin(e*127.1+t*311.7)*43758.5453;return n-Math.floor(n)},ce=0,le={group:i,update:(e,t=0,n=0)=>{let r=Math.floor(e*12)/12;ce+=(n-ce)*.05,d.rotation.set(.18+Math.sin(r*.3)*.05,r*.22,.08),P(-r*.5);let i=1.6-ce*.5,a=Math.floor(r/i),o=r%i/i,s=e=>{let t=E(e),n=[0,.16,.34][t],r=[.16,.22,.26][t],i=t===0||se(a,e)<.66+ce*.2,s=(o-n)/r;return i&&s>=0&&s<1?1-s*s:0},c=g.map((e,n)=>Math.min(1,s(n)+t*.6));g.forEach((e,t)=>b.setColorAt(t,L.copy(F).lerp(ee,c[t]))),_.forEach(([e,t],n)=>k.setColorAt(n,L.copy(I).multiplyScalar(.55).lerp(ee,Math.min(c[e],c[t])*.9+Math.max(c[e],c[t])*.25))),b.instanceColor.needsUpdate=!0,k.instanceColor.needsUpdate=!0,ne.forEach((e,n)=>{let[i,a]=_[e.e],o=e.u+r*e.v*(1+t*2+ce),s=Math.floor(o);o-=s,s%2&&(o=1-o),x.compose(j[i].clone().lerp(j[a],o),S.identity(),$(1,1,1)),te.setMatrixAt(n,x)}),te.instanceMatrix.needsUpdate=!0,ae.forEach(e=>{e.m.rotation.y=r*e.spd,e.mat.uniforms.uAmt.value=(.55+.45*ce+t*.5)*le.power})},lattice:d,nodeMesh:b,edgeMat:O,nodeMat:y,beam:oe,faceMat:v.material,center:u,power:1};return le}function Ef(e){let t=e.attributes.position,n=[];for(let e=0;e<t.count;e++){let r=$(t.getX(e),t.getY(e),t.getZ(e));n.some(e=>e.distanceToSquared(r)<.001)||n.push(r)}return n}function Df(e,t){let n=e.attributes.position,r=e=>t.findIndex(t=>t.distanceToSquared($(n.getX(e),n.getY(e),n.getZ(e)))<.001),i=new Set,a=[];for(let e=0;e<n.count;e+=3){let t=[r(e),r(e+1),r(e+2)];for(let[e,n]of[[t[0],t[1]],[t[1],t[2]],[t[2],t[0]]]){let t=e<n?`${e}_${n}`:`${n}_${e}`;i.has(t)||(i.add(t),a.push([e,n]))}}return a}function Of(e,t,n){let r=new Cn,i=pf({base:e.ioSteel,brush:.14,spec:.9,rim:1}),a=pf({base:e.connector,brush:.14,spec:.5,rim:1}),o=pf({base:e.goldPart,brush:.12,spec:1,rim:1}),s=-942,c=[{z:-600,w:110,h:128,d:64,label:`USB 10G`},{z:-520,w:120,h:168,d:78,label:`LAN 2.5G`},{z:-446,w:100,h:112,d:60,label:`HDMI · DP`},{z:-378,w:110,h:124,d:66,label:`USB-C 20G`},{z:-230,w:100,h:170,d:72,label:`AUDIO`}];c.forEach(e=>{yf(r,e.w,e.h,e.d,s-(110-e.w)/2,0,e.z,i),yf(r,e.w+6,7,e.d+6,s-(110-e.w)/2,0,e.z,a);for(let t=0;t<3;t++)yf(r,10,7,8,s-(110-e.w)/2-e.w/2+16+t*(e.w-32)/2,e.h,e.z-e.d/4+t%2*e.d/2,i);for(let t=0;t<3;t++)yf(r,2,e.h-30,3,s-(110-e.w)/2+e.w/2+1,14,e.z-e.d/2+12+t*(e.d-24)/2,i);yf(r,4,e.h-16,e.d-12,s-(110-e.w)/2+e.w/2+1,8,e.z,a);for(let t=0;t<4;t++)yf(r,2.4,6,2.4,s+e.w/2+6-(110-e.w)/2,0,e.z-e.d/2+8+t*(e.d-16)/3,o);n?.ao(s-(110-e.w)/2,e.z,e.w+8,e.d+8,6,.9),n?.text(e.label,-876,e.z,7,{weight:`700`,rot:-Math.PI/2,align:`center`})});for(let e of[-690,-655]){let t=new Y(new Ti(7,7,46,6),o);t.position.set(-960,23,e),r.add(t),n?.aoDisc(-960,e,10,4,.9)}let l=pf({base:e.signal,emissive:!0}),u=pf({base:e.laser,emissive:!0});[[-322,l],[-292,u]].forEach(([e,t])=>{yf(r,40,28,26,-950,0,e,a),yf(r,6,3,6,-934,28,e,t)});let d=new ra;d.moveTo(720,0),d.lineTo(150,0),d.lineTo(150,330),d.lineTo(720,330),d.lineTo(720,0);let f=[],p={u:435,v:250,s:120/104};sf(Id,!0).concat(sf(Ld,!0)).forEach(e=>{let t=e.getPoints().map(e=>new G(p.u+e.x*p.s,p.v+e.y*p.s));f.push(t)});for(let[e,t]of[[196,356],[514,690]])for(let n=0;n<2;n++)for(let r=e;r<t;r+=40)f.push([[r,226+n*36],[r+26,226+n*36],[r+26,236+n*36],[r,236+n*36]].map(([e,t])=>new G(e,t)));f.forEach(e=>d.holes.push(new na(e)));let m=new Y(new qa(d,4),pf({base:e.ioShield,brush:.12,spec:.8,rim:1,side:2}));m.rotation.y=Math.PI/2,m.position.set(-1004,0,0),r.add(m);let h=new Y(new Ka(560,150),pf({base:e.outside,emissive:!0}));h.rotation.y=Math.PI/2,h.position.set(-1016,252,-435),r.add(h);let g=$(1,-.95,.14).normalize(),_=[],v=[],y=e=>$(-1004,e.y,-e.x),b=[];f.forEach((e,t)=>{let n=e.map(y);for(let e=0;e<n.length;e++){let t=n[e],r=n[(e+1)%n.length],i=t.clone().addScaledVector(g,560),a=r.clone().addScaledVector(g,560);for(let[e,n]of[[t,0],[r,0],[a,1],[t,0],[a,1],[i,1]])_.push(e.x,e.y,e.z),v.push(n)}t<5&&b.push(n.map(e=>e.clone().addScaledVector(g,-e.y/g.y)))});let x=new Tr;x.setAttribute(`position`,new pr(_,3)),x.setAttribute(`fade`,new pr(v,1));let S=rf({color:e.outside,vertex:`in vec3 position; in float fade; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; out float vF; out vec3 vW;
      void main(){ vF = fade; vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,fragment:`precision highp float; uniform vec3 uColor, uLd, cameraPosition; uniform float uAmt, uStep; in float vF; in vec3 vW;
      layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){
        // light scatters forward: the shafts are brightest looking back toward the opening
        float fw = max(0.0, -dot(normalize(vW - cameraPosition), uLd));
        float a = pow(1.0 - vF, 1.4) * (0.018 + 0.15 * fw * fw * fw) * uAmt * step(0.0, vW.y);
        gColor = vec4(uColor, a); gNormal = vec4(0.0);
      }`,uniforms:{uAmt:{value:1},uStep:Q.uStep,uLd:{value:g.clone()}}}),C=new Y(x,S);C.frustumCulled=!1,r.add(C);let w=[];b.forEach(e=>{let t=new ra(e.map(e=>new G(e.x,e.z))),n=Ra.triangulateShape(t.getPoints(),[]),r=t.getPoints();n.forEach(e=>e.forEach(e=>w.push(r[e].x,.9,r[e].y)))});let T=new Tr;T.setAttribute(`position`,new pr(w,3));let E=rf({color:e.outside,vertex:`in vec3 position; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; void main(){ gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); }`,fragment:`precision highp float; uniform vec3 uColor; uniform float uAmt; layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){ gColor = vec4(uColor, 0.32 * uAmt); gNormal = vec4(0.0); }`,uniforms:{uAmt:{value:1}}});r.add(new Y(T,E)),t.chip(-820,-560,38,38,4,{label:`U21 LAN`}),t.chip(-822,-200,30,30,3.5,{label:`U24 CODEC`}),t.chip(-760,-420,34,34,4,{label:`U22 USB`}),t.sprinkle(-820,-560,38,38,26),t.sprinkle(-822,-200,30,30,22),t.sprinkle(-760,-420,34,34,22);for(let n=0;n<6;n++)t.can(-860+n%3*22,-150+Math.floor(n/3)*22,8,22,e.audioCap,e.audioCapTop);n&&(n.text(`接続`,-856,-380,62,{weight:`700`,family:mf,rot:-Math.PI/2,stretch:1.8}),n.text(`I/O`,-770,-380,36,{weight:`700`,family:hf,rot:-Math.PI/2,stretch:1.8}),n.text(`REAR PANEL  ·  OUT TO THE WORLD`,-730,-380,8,{rot:-Math.PI/2,stretch:1.8}),n.line([[-884,-720],[-884,-150]],1.2));let D=c.map(e=>e.z),O=new oi(new Ci(9,2.2,3.4),pf({base:e.hot,emissive:!0,instanced:!0}),D.length*4);O.frustumCulled=!1,r.add(O);let k=new q,A=new q().makeScale(0,0,0);return n&&D.forEach((e,t)=>n.line([[-630,e+(t%2?6:-6)],[-884,e+(t%2?6:-6)]],1.6)),{group:r,shaftMat:S,patchMat:E,outside:h,shafts:C,update:e=>{let t=Math.floor(e*12)/12;D.forEach((e,n)=>{for(let r=0;r<4;r++){let i=-640-((t*(.55+n*.07)+r/4+n*.13)%1+1)%1*250;i<-884?O.setMatrixAt(n*4+r,A):(k.makeTranslation(i,1.4,e+(n%2?6:-6)),O.setMatrixAt(n*4+r,k))}}),O.instanceMatrix.needsUpdate=!0}}}function kf(e,t,n){let r=new Cn,i=pf({base:e.slot,brush:.14,spec:.5,rim:1}),a=pf({base:e.ioSteel,brush:.14,spec:1,rim:1}),o=pf({base:e.connector,brush:.14,spec:.5,rim:1});yf(r,572,24,20,-436,0,560,a),yf(r,22,30,22,-138,0,560,pf({base:e.latch,spec:.6,rim:1})),yf(r,560,1,3,-436,24,560,pf({base:e.goldPart,spec:1,rim:.3})),yf(r,572,22,18,-436,0,680,i),yf(r,22,28,20,-138,0,680,pf({base:e.latch,spec:.6,rim:1})),yf(r,330,12,66,-460,0,620,pf({base:e.anod,brush:.12,spec:.8,rim:1,id:184})),r.add(bf(330,66,-460,12,620,(t,n,r)=>{t.fillStyle=e.anod,t.fillRect(0,0,n,r),t.fillStyle=`rgba(255,255,255,0.08)`;for(let e=0;e<n;e+=14)t.fillRect(e,0,6,r);t.globalAlpha=.24,t.fillStyle=e.silk,t.font=`700 ${r*.32}px ${hf}`,t.textBaseline=`middle`,t.fillText(`M.2_1  STORAGE`,n*.05,r*.52),t.globalAlpha=.7,t.fillStyle=e.signal,t.fillRect(n*.7,r*.44,n*.25,r*.12),t.globalAlpha=1},184,{res:1024})),yf(r,190,10,190,140,0,470,pf({base:e.sinkDark,brush:.14,spec:.7,rim:1})),yf(r,160,24,160,140,10,470,pf({base:e.sink,brush:.14,spec:.9,rim:1,id:182})),r.add(bf(160,160,140,34,470,(t,n,r)=>{t.fillStyle=e.sink,t.fillRect(0,0,n,r),t.strokeStyle=`rgba(0,0,0,0.35)`,t.lineWidth=n*.012;for(let e=-n;e<n*2;e+=n*.06)t.beginPath(),t.moveTo(e,0),t.lineTo(e-r,r),t.stroke();t.fillStyle=e.anod,t.fillRect(n*.12,r*.34,n*.76,r*.32),t.fillStyle=e.silk,t.font=`700 ${r*.16}px ${mf}`,t.textBaseline=`middle`,t.fillText(`制御`,n*.17,r*.5),t.font=`700 ${r*.11}px ${hf}`,t.fillText(`CONTROL`,n*.45,r*.52)},182,{res:1024})),yf(r,150,2,1.4,140,20,550.8,pf({base:e.signal,emissive:!0})),yf(r,44,50,238,940,0,-140,o);for(let t=0;t<12;t++)for(let n=0;n<2;n++)yf(r,9,2,9,931+n*18,50,-224+t*15,pf({base:e.ink2,spec:0}));for(let e=0;e<4;e++)yf(r,34,30,46,950,0,140+e*58,o);yf(r,52,20,22,720,0,700,o),yf(r,44,16,22,560,0,700,o);for(let[t,n]of[[-430,-620],[700,-650],[880,610],[-700,700]])yf(r,22,14,10,t,0,n,pf({base:e.latch,spec:.5,rim:1}));let s=new Y(new Ti(48,48,9,48),pf({base:e.nickel,spec:1,rim:1,brush:.1}));s.position.set(330,8,640),r.add(s);let c=new Y(new Ti(54,54,4,48),o);c.position.set(330,2,640),r.add(c);let l=nf(34,20,(t,n,r)=>{t.fillStyle=`#060908`,t.fillRect(0,0,n,r),t.fillStyle=e.laser,t.font=`700 ${r*.8}px ${gf}`,t.textAlign=`center`,t.textBaseline=`middle`,t.fillText(`A0`,n/2,r*.55)},{emissive:!0,res:128});l.rotation.x=-Math.PI/2,l.position.set(860,6.1,-330),r.add(l),yf(r,40,6,26,860,0,-330,o);let u=[];[`CPU`,`DRAM`,`VGA`,`BOOT`].forEach((t,i)=>{let a=pf({base:i===3?e.signal:e.ledOff,emissive:!0});yf(r,6,2.5,4,820,0,-300+i*14,a),u.push(a),n?.text(t,800,-300+i*14,4.5,{align:`right`})}),[[720,420,56,56,`U31 SIO`],[150,200,24,24,`U12 CLK`],[640,300,26,20,`U40 BIOS`],[-700,160,40,40,`U18`],[420,650,30,30,`U33`],[-240,640,26,26,`U27`],[800,160,34,34,`U35`],[-560,-620,40,30,`U20`],[520,-620,44,44,`U38`],[780,-500,30,30,`U39`],[-880,300,36,36,`U16`],[-860,560,30,30,`U15`]].forEach(([e,n,r,i,a])=>{t.chip(e,n,r,i,4,{label:a}),t.sprinkle(e,n,r,i,18)});let d=[[-80,-120,380,380],[-80,-340,560,110],[-306,-88,110,480],[334,-108,230,820],[-470,330,300,300],[700,140,380,340],[-205,245,270,240],[-940,-435,160,620],[-436,620,620,160],[140,470,210,210],[940,-140,80,260],[950,230,60,260],[330,640,120,120],[860,-320,80,120]],f=(e,t,n)=>Math.abs(e)<Ud.w/2-40&&Math.abs(t)<Ud.h/2-40&&!d.some(([r,i,a,o])=>Math.abs(e-r)<a/2+n&&Math.abs(t-i)<o/2+n),p=0;for(let e=0;e<600&&p<34;e++){let e=(Vd()-.5)*Ud.w,n=(Vd()-.5)*Ud.h,r=14+Vd()*30,i=14+Vd()*30;f(e,n,Math.max(r,i))&&(t.chip(e,n,r,i,3+Vd()*2,{label:`U${50+p}`,pins:Vd()<.7}),t.sprinkle(e,n,r,i,10),p++)}let m=0;for(let n=0;n<900&&m<70;n++){let n=(Vd()-.5)*Ud.w,r=(Vd()-.5)*Ud.h,i=5+Vd()*6;f(n,r,i+6)&&(t.can(n,r,i,14+Vd()*18,Vd()<.7?e.can:e.can2),m++)}for(let e=0,n=0;e<3e3&&n<900;e++){let e=(Vd()-.5)*Ud.w,r=(Vd()-.5)*Ud.h;if(!f(e,r,4))continue;let i=Vd()<.5;t.passive(e,r,i?2.2:4.2,i?4.2:2.2,1.6),n++}if(n){n.ao(-436,560,580,30,5,.9),n.ao(-436,680,580,28,5,.9),n.ao(-460,620,336,72,6,.85),n.ao(140,470,200,200,8,.9),n.ao(940,-140,52,246,6,.9),n.aoDisc(330,640,56,6,.9),n.text(`PCIE_1  ×16`,-720,536,9,{weight:`700`}),n.text(`PCIE_2  ×4`,-720,704,9,{weight:`700`}),n.text(`ATX_24P`,900,-270,7,{weight:`700`,rot:Math.PI/2}),n.text(`BAT1  +`,380,700,7,{weight:`700`});for(let[e,t]of[[-950,-700],[950,-700],[950,700],[-950,700],[-80,700],[330,-660],[-660,120]])n.ring(e,t,8,16),n.aoDisc(e,t,18,4,.5);n.path(Id,-880,620,60),n.path(Ld,-880,620,60),n.text(`XINI`,-842,606,30,{weight:`700`,family:hf,track:3}),n.text(`MB-01  REV 2.6  ·  2026`,-842,634,9),n.text(`DESIGNED AND BUILT BY XINI`,-842,650,7)}let h=[e.signal,e.amber,e.laser,e.blue,`#ffffff`],g=[];for(let e=0;e<2e3&&g.length<90;e++){let e=(Vd()-.5)*(Ud.w-80),t=(Vd()-.5)*(Ud.h-80);f(e,t,3)&&g.push({x:e,z:t,c:h[Math.floor(Vd()*h.length)],r:Vd(),rate:.6+Vd()*2.5})}let _=new oi(new Ci(2.4,1.3,3.4),pf({base:`#ffffff`,emissive:!0,instanced:!0,instanceColor:!0}),g.length),v=new q,y=new J,b=new J(e.ledOff);return g.forEach((e,t)=>{v.makeTranslation(e.x,.65,e.z),_.setMatrixAt(t,v),_.setColorAt(t,y.set(e.c)),n?.pad(e.x,e.z-2.6,3,1.2),n?.pad(e.x,e.z+2.6,3,1.2)}),_.frustumCulled=!1,r.add(_),{group:r,leds:u,updateLeds:e=>{let t=Math.floor(e*12)/12;g.forEach((e,n)=>{let r=e.r<.55||Math.sin(t*e.rate*3+e.r*40)>-.2;_.setColorAt(n,r?y.set(e.c):b)}),_.instanceColor.needsUpdate=!0}}}function Af(e){let{cx:t,cz:n}=of,r=_f.dimm;for(let i=0;i<4;i++){let a=n-90+i*46,o=r.x0+i*r.pitch,s=a+(i-1.5)*90;e.bus(Xd([[t+120,a],[r.x0-60,a],[o-14,s],[o-14,s+[-120,-220,220,150][i]]]),9,4.4,2.2)}e.bus([[t-60,n+120],[t-60,330],[-300,490],[-300,552]],16,4.4,2.2),e.bus([[t-120,n+80],[t-120,8],[-420,228]],12,4.4,2.1),e.bus([[t+120,n+120],[250,210],[440,400],[466,426]],10,4.4,2.1),e.bus([[464,540],[262,540]],6,4,1.4),e.bus([[656,470],[800,470],[930,340],[930,150]],8,3.6,1.4),e.bus([[464,600],[300,600],[220,680],[-125,680]],8,3.6,1.4),e.bus([[t-120,n-110],[-560,n-110],[-830,-500],[-884,-500]],10,4.4,2),e.bus([[t-120,n+20],[-600,n+20],[-850,-350],[-884,-350]],8,4.4,2),e.bus([[-806,-200],[-884,-230]],6,3.4,1.2),e.bus([[-700,160],[-560,300],[-560,380],[-574,394]],6,3.6,1.3),e.bus([[720,392],[720,250],[640,170],[400,170]],6,3.6,1.3),e.bus([[150,188],[150,120],[100,70]],5,3,1.1),e.bus([[860,-317],[880,-260],[918,-230]],4,3,1.1);for(let t=0;t<160;t++){let t=(Vd()-.5)*(Ud.w-120),n=(Vd()-.5)*(Ud.h-120),r=30+Vd()*110,i=20+Vd()*80,a=Math.floor(Vd()*4),o=Vd()<.5?1:-1,s=[t,n],c=a%2?[t+r*(a===1?1:-1),n]:[t,n+r*(a===0?1:-1)],l=a%2?[c[0]+i*Math.sign(c[0]-t)*.7,c[1]+i*o*.7]:[c[0]+i*o*.7,c[1]+i*Math.sign(c[1]-n)*.7];e.bus([s,c,l],1+Math.floor(Vd()*4),3,.9)}}function jf(e,t=1600){let n=new Float32Array(t*3),r=new Float32Array(t);for(let e=0;e<t;e++)n[e*3]=Vd()*700,n[e*3+1]=Vd()*700,n[e*3+2]=Vd()*700,r[e]=Vd();let i=new Tr;i.setAttribute(`position`,new ur(n,3)),i.setAttribute(`seed`,new ur(r,1));let a=new gi(i,rf({color:e.dust,vertex:`in vec3 position; in float seed; uniform mat4 viewMatrix, projectionMatrix; uniform vec3 uCam; uniform float uTime, uPx, uScale;
      out float vA;
      void main(){
        vec3 p = position + vec3(sin(uTime * 0.11 + seed * 30.0) * 30.0, uTime * (2.0 + seed * 4.0), cos(uTime * 0.09 + seed * 20.0) * 30.0);
        p = mod(p - uCam + 350.0, 700.0) - 350.0 + uCam;
        p.y = max(p.y, 2.0);
        vec4 mv = viewMatrix * vec4(p, 1.0);
        float d = -mv.z;
        vA = smoothstep(350.0, 120.0, length(p - uCam)) * (0.35 + 0.65 * fract(seed * 7.3)) * smoothstep(4.0, 24.0, d);
        gl_PointSize = clamp(uScale * uPx * (1.0 + seed * 1.5) * 300.0 / max(d, 1.0), 1.0, 7.0 * uPx);
        gl_Position = projectionMatrix * mv;
      }`,fragment:`precision highp float; uniform vec3 uColor; in float vA;
      layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){ vec2 q = gl_PointCoord - 0.5; float r = length(q); if (r > 0.5) discard; gColor = vec4(uColor, vA * 0.55 * step(r, 0.36)); gNormal = vec4(0.0); }`,uniforms:{uCam:{value:new K},uTime:Q.uTime,uPx:Q.uPx,uScale:{value:1.2}}}));return a.frustumCulled=!1,a.renderOrder=50,a}var Mf=new K;function Nf(e,t,n,r,i,a){let o=2*Math.PI*i/4,s=Math.max(a-2*i,0),c=Math.PI/4;Mf.copy(t),Mf[r]=0,Mf.normalize();let l=.5*o/(o+s),u=1-Mf.angleTo(e)/c;return Math.sign(Mf[n])===1?u*l:s/(o+s)+l+l*(1-u)}var Pf=class e extends Ci{constructor(e=1,t=1,n=1,r=2,i=.1){let a=r*2+1;if(i=Math.min(e/2,t/2,n/2,i),super(1,1,1,a,a,a),this.type=`RoundedBoxGeometry`,this.parameters={width:e,height:t,depth:n,segments:r,radius:i},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let s=new K,c=new K,l=new K(e,t,n).divideScalar(2).subScalar(i),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,p=u.length/6,m=new K,h=.5/a;for(let r=0,a=0;r<u.length;r+=3,a+=2)switch(s.fromArray(u,r),c.copy(s),c.x-=Math.sign(c.x)*h,c.y-=Math.sign(c.y)*h,c.z-=Math.sign(c.z)*h,c.normalize(),u[r+0]=l.x*Math.sign(s.x)+c.x*i,u[r+1]=l.y*Math.sign(s.y)+c.y*i,u[r+2]=l.z*Math.sign(s.z)+c.z*i,d[r+0]=c.x,d[r+1]=c.y,d[r+2]=c.z,Math.floor(r/p)){case 0:m.set(1,0,0),f[a+0]=Nf(m,c,`z`,`y`,i,n),f[a+1]=1-Nf(m,c,`y`,`z`,i,t);break;case 1:m.set(-1,0,0),f[a+0]=1-Nf(m,c,`z`,`y`,i,n),f[a+1]=1-Nf(m,c,`y`,`z`,i,t);break;case 2:m.set(0,1,0),f[a+0]=1-Nf(m,c,`x`,`z`,i,e),f[a+1]=Nf(m,c,`z`,`x`,i,n);break;case 3:m.set(0,-1,0),f[a+0]=1-Nf(m,c,`x`,`z`,i,e),f[a+1]=1-Nf(m,c,`z`,`x`,i,n);break;case 4:m.set(0,0,1),f[a+0]=1-Nf(m,c,`x`,`y`,i,e),f[a+1]=1-Nf(m,c,`y`,`x`,i,t);break;case 5:m.set(0,0,-1),f[a+0]=Nf(m,c,`x`,`y`,i,e),f[a+1]=1-Nf(m,c,`y`,`x`,i,t)}}static fromJSON(t){return new e(t.width,t.height,t.depth,t.segments,t.radius)}},Ff=e=>Ju({brushScale:.07,dotCell:4.5,...e}),If=`"JetBrains Mono Variable", ui-monospace, monospace`,Lf=e=>e<.5?4*e*e*e:1-(-2*e+2)**3/2,Rf=wt.clamp,zf=wt.lerp,Bf=(e,t,n)=>Rf((e-t)/(n-t),0,1),Vf=e=>Math.floor(e*12)/12,Hf=e=>{let t=Math.sin(e*127.1+311.7)*43758.5453;return t-Math.floor(t)},Uf=(e,t,n={})=>rf({color:e,vertex:`in vec3 position; in vec3 normal; in vec2 uv; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; uniform vec3 cameraPosition;
    out vec2 vUv; out vec3 vP; out float vF;
    void main(){ vUv = uv; vP = position; vec4 w = modelMatrix * vec4(position, 1.0); vec3 n = normalize(mat3(modelMatrix) * normal);
      vF = 1.0 - abs(dot(n, normalize(cameraPosition - w.xyz))); gl_Position = projectionMatrix * viewMatrix * w; }`,fragment:t,uniforms:{uAmt:{value:1},uStep:Q.uStep,...n}});function Wf(e,t,n,{face:r=$(-80,0,660)}={}){let i=new Cn,{x:a,z:o}=_f.enclave;i.position.set(a,0,o);let s=Math.atan2(r.x-a,r.z-o),c=Ff({base:e.brass,brush:.12,spec:1,rim:1}),l=Ff({base:e.brassDark,brush:.12,spec:.8,rim:1});Ff({base:e.steel,brush:.12,spec:1,rim:1});let u=Ff({base:e.anod,brush:.12,spec:.6,rim:1}),d=Ff({base:e.shieldDark,brush:.14,spec:.8,rim:1}),f=new Y(new Pf(250,22,210,2,4),d);f.position.y=11,i.add(f);let p=new Y(new Pf(262,6,222,2,2.5),l);p.position.y=3,i.add(p);let m=Ff({base:e.laser,emissive:!0}),h=new Cn;i.add(h);for(let[e,t]of[[-1,-1],[1,-1],[1,1],[-1,1]]){let n=new Y(new Pf(7,74,7,1,1.5),d);n.position.set(e*330/2,37,t*290/2),h.add(n);let r=new Y(new Ci(4,4,4),m);r.position.set(e*330/2,76,t*290/2),h.add(r)}for(let e of[16,34,52])for(let[t,n,r,i]of[[330,1,0,-145],[330,1,0,145],[1,290,-165,0],[1,290,165,0]]){let a=new Y(new Ci(t,1,n),m);a.position.set(r,e,i),h.add(a)}let g=new Cn;g.rotation.y=s,g.position.y=22,g.userData.dynamic=!0,i.add(g);let _={cage:y(),firewall:b(),cipher:x()};Object.values(_).forEach(e=>{g.add(e.group),Md(e.group),e.group.visible=!1});let v=`cage`;if(_[v].group.visible=!0,n){n.ao(a,o,270,230,8,.95),n.hazard(a,o,364,324,11,9),n.text(`U9`,a-165-16,o-145-26,10,{weight:`700`});let e=$(a-r.x,0,o-r.z).normalize(),t=$(-e.z,0,e.x),i=Math.atan2(t.z,t.x),s=(n,r)=>[a+t.x*n-e.x*r,o+t.z*n-e.z*r];n.text(`暗号`,...s(-100,300),46,{weight:`700`,family:`"Zen Kaku Gothic New", sans-serif`,rot:i,stretch:2.4}),n.text(`SECURE ENCLAVE`,...s(-40,330),18,{weight:`700`,family:`"Chakra Petch", sans-serif`,rot:i,track:2,stretch:2.2}),n.text(`NO UNSIGNED CODE PAST THIS LINE`,...s(-20,368),6.5,{rot:i,stretch:2})}t.chip(a-90,o+262,36,36,4.5,{label:`TPM`,pitch:3.4}),t.row(a-120,o+300,a-80,o+300,3,`cap`),t.sprinkle(a,o,360,320,50,4,20);function y(){let t=new Cn,n=new Y(new Pf(80,26,80,2,4),u);n.position.y=13,t.add(n);let r=new Y(new Ci(52,3,52),Ff({base:e.laser,emissive:!0}));r.position.y=27,t.add(r);let i=new Wa(120,2).attributes.position,a=new Set,o=[],s=e=>`${Math.round(e.x)}_${Math.round(e.y)}_${Math.round(e.z)}`;for(let e=0;e<i.count;e+=3){let t=[0,1,2].map(t=>$(i.getX(e+t),i.getY(e+t),i.getZ(e+t)));for(let[e,n]of[[t[0],t[1]],[t[1],t[2]],[t[2],t[0]]]){if(e.y<-2||n.y<-2)continue;let t=s(e)+`|`+s(n),r=s(n)+`|`+s(e);a.has(t)||a.has(r)||(a.add(t),o.push([e,n]))}}let c=Ff({base:e.brass,brush:.1,spec:1,rim:1,instanced:!0}),d=new oi(new Ci(1,1,1),c,o.length),f=new q,p=new Tt,m=$(0,1,0);o.forEach(([e,t],n)=>{let r=t.clone().sub(e),i=r.length();p.setFromUnitVectors(m,r.normalize()),f.compose(e.clone().add(t).multiplyScalar(.5),p,$(2.6,i,2.6)),d.setMatrixAt(n,f)}),t.add(d);let h=new oi(new Ga(3.4,0),Ff({base:e.steel,spec:1,rim:1,instanced:!0}),200),g=[];for(let e=0;e<i.count;e++){let t=$(i.getX(e),i.getY(e),i.getZ(e));t.y>=-2&&!g.some(e=>e.distanceToSquared(t)<1)&&g.push(t)}g.forEach((e,t)=>{f.makeTranslation(e.x,e.y,e.z),h.setMatrixAt(t,f)}),h.count=g.length,t.add(h);let _=new Y(new Ya(119,64,24,0,Math.PI*2,0,Math.PI/2),Uf(e.laser,`precision highp float; uniform vec3 uColor, uOk; uniform float uAmt, uScan, uSeal, uStep; in vec2 vUv; in vec3 vP; in float vF;
      layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      vec2 hexc(vec2 p){ vec2 r = vec2(1.0, 1.732); vec2 h = r * 0.5; vec2 a = mod(p, r) - h; vec2 b = mod(p - h, r) - h; return dot(a, a) < dot(b, b) ? a : b; }
      void main(){
        vec2 q = vec2(atan(vP.z, vP.x) * 6.0, vP.y * 0.11);
        vec2 c = hexc(q);
        float edge = smoothstep(0.36, 0.46, max(abs(c.x) * 0.866 + abs(c.y) * 0.5, abs(c.y)));
        float y = vP.y / ${120 .toFixed(1)};
        float scan = smoothstep(0.08, 0.0, abs(y - uScan));
        vec3 col = mix(uColor, uOk, uSeal);
        float a = (edge * (0.05 + 0.22 * vF) + scan * 0.5 * (0.3 + edge)) * uAmt;
        a += uSeal * edge * 0.25 * step(0.5, fract(vP.y * 0.05 - uStep * 1.5)) * (1.0 - smoothstep(0.0, 1.0, uSeal - 0.6));
        gColor = vec4(col, a); gNormal = vec4(0.0);
      }`,{uScan:{value:.5},uSeal:{value:0},uOk:{value:new J(e.signal)}}));t.add(_);let v=new Y(new Xa(120,1.8,6,96).rotateX(Math.PI/2),Ff({base:e.laser,emissive:!0}));v.userData.dynamic=!0,t.add(v);let y=new Y(new Xa(124,5,10,96).rotateX(Math.PI/2),l);y.position.y=2,t.add(y);let b=-1,x=0,S=!1;return{group:t,leds:[r,v],unlock(e){b=e,S=!1},lock(){b=-1},update(e,t,n){let r=Vf(e),i=_.material.uniforms;if(b<0){x=Math.max(0,x-t);let e=.5+.45*Math.sin(r*1.6);return i.uScan.value=e,i.uSeal.value=x,v.position.y=e*120,v.scale.setScalar(Math.sqrt(Math.max(.02,1-e*e))),0}let a=e-b,o=a<.9?1-Lf(Bf(a,0,.9)):.04;return i.uScan.value=o,v.position.y=o*120,v.scale.setScalar(Math.sqrt(Math.max(.02,1-o*o))),x=Bf(a,.8,1.3),i.uSeal.value=x,x>0&&!S&&(S=!0,n?.play(`unlock`)),x}}}function b(){let t=new Cn,n=1.08,r=.2,i=2.4,a=17.4,o=6*a-i,s=(e,t=102)=>$(Math.sin(e)*t,0,-42+Math.cos(e)*t),f=new Y(new Pf(70,44,50,2,4),u);f.position.set(0,22,-42),t.add(f);let p=new Y(new Ci(52,3,2),Ff({base:e.laser,emissive:!0}));p.position.set(0,40,-16.4),t.add(p);let m=Ff({base:e.signal,emissive:!0,gain:.12}),h=Ff({base:e.markBack,emissive:!0,gain:.12}),g=cf(30,m,h,1.6);g.position.set(0,20,-16.7),t.add(g);let _=[];for(let e=0;e<6;e++){let t=e*a+15/2;for(let r of[-1,1]){let a=.21176470588235297,o=!0;for(;a<1.07;){let s=Math.min(o&&e%2?13:26,(n-a)*102);if(s<5)break;_.push({a:r*(a+s/2/102),y:t,len:s}),a+=(s+i)/102,o=!1}}}let v=new q,y=new Tt,b=$(0,1,0),x=$(1,1,1);$(0,0,0);let S=()=>Ff({base:`#ffffff`,emissive:!0,instanced:!0,instanceColor:!0}),C=new oi(new Pf(26,15,12,1,1.4),S(),_.length);_.forEach((t,n)=>{y.setFromAxisAngle(b,t.a),v.compose(s(t.a).setY(t.y),y,$(t.len/26,1,1)),C.setMatrixAt(n,v),C.setColorAt(n,new J(e.laser))}),C.userData.dynamic=!0,t.add(C);let w=(e,n,r)=>{let i=new Y(new Ti(95,95,o,36,1,!0,e,n),r);return i.position.set(0,o/2,-42),t.add(i),i},T=Ff({base:`#050b0a`,brush:.1,spec:0,rim:0});w(-1.08,.8800000000000001,T),w(r,.8800000000000001,T);let E=Ff({base:e.laser,emissive:!0,gain:.7}),D=w(-.2,2*r,E);D.userData.dynamic=!0;let O=new J(e.laser),k=new J(e.signal),A=new J(e.hot),j=new J,M=new oi(new Pf(38.400000000000006,15,12,1,1.4),S(),6);M.userData.dynamic=!0,t.add(M);let N=(e,t)=>{let n=t<=0?1:t<.34?1.05:Math.max(1e-4,1-(t-.34)/.66);v.compose(s(0).setY(e*a+15/2),y.identity(),x.clone().multiplyScalar(n)),M.setMatrixAt(e,v),M.setColorAt(e,t<=0?j.copy(O).multiplyScalar(.8):j.copy(A).lerp(O,Bf(t,.34,1)))};for(let e=0;e<6;e++)N(e,0);for(let e of[-1,1]){let i=new Y(new Pf(6,113.99999999999999,18,1,1.5),c);i.position.copy(s(e*r)).setY(113.99999999999999/2),i.rotation.y=e*r,t.add(i);let a=new Y(new Pf(12,109.99999999999999,20,1,2),d);a.position.copy(s(e*1.12)).setY(109.99999999999999/2),a.rotation.y=e*n,t.add(a)}let P=new Y(new Pf(56.400000000000006,6,18,1,1.5),c);P.position.copy(s(0)).setY(110.99999999999999),t.add(P);let F=[];for(let e=0;e<=32;e++){let t=-1.08+2*n*e/32;Math.abs(t)>r&&F.push(s(t).setY(103.49999999999999))}for(let e of[-1,1]){let n=F.filter(t=>Math.sign(t.x)===e);t.add(new Y(new Za(new Ii(n),24,2.2,6),l))}let I=new oi(new Ci(6,6,20),Ff({base:e.amber,emissive:!0,instanced:!0,gain:1.3}),14),ee=new oi(new Ga(1,0),Ff({base:e.hot,emissive:!0,instanced:!0}),14);for(let e of[I,ee])e.frustumCulled=!1,e.userData.dynamic=!0,t.add(e);let L=new Y(new Ci(7,7,20),Ff({base:e.signal,emissive:!0}));L.visible=!1,L.userData.dynamic=!0,t.add(L);let te=Array.from({length:14},()=>({t0:-1,a:0,y:0,hit:-9,bi:-1})),ne=(e,t)=>{let n=-1,r=1e9;return _.forEach((i,a)=>{let o=Math.abs(i.a-e)*102+Math.abs(i.y-t)*3;o<r&&(r=o,n=a)}),n},re=new q().makeScale(0,0,0),ie=0,ae=-1,R=0,oe=!1;return{group:t,leds:[p],unlock(e){ae=e,R=0,oe=!1},lock(){ae=-1},update(e,t,n,r){let i=Vf(e);if((ae<0?-1:e-ae)<.15&&i>=ie){let e=te.find(e=>e.t0<0);if(e){let t=Hf(i*7.13)<.5?-1:1,n=Math.floor(Hf(i*5.27)*6);e.a=t*(.28+.7200000000000001*Hf(i*3.71)),e.y=n*a+15/2,e.t0=i,e.bi=ne(e.a,e.y)}ie=i+.18+.3*Hf(i*9.1)}te.forEach((e,t)=>{if(e.t0>=0){let a=200-(i-e.t0)*210;a<=112?(e.t0=-1,e.hit=i,r&&n?.play(`zap`,{gain:.32})):(y.setFromAxisAngle(b,e.a),v.compose(s(e.a,a).setY(e.y),y,x),I.setMatrixAt(t,v))}e.t0<0&&I.setMatrixAt(t,re);let a=(i-e.hit)/.25;a>=0&&a<1?(y.setFromAxisAngle(b,e.a),v.compose(s(e.a,111).setY(e.y),y,$(1,1,.22).multiplyScalar(16*(1-a)+3)),ee.setMatrixAt(t,v)):ee.setMatrixAt(t,re)}),I.instanceMatrix.needsUpdate=!0,ee.instanceMatrix.needsUpdate=!0;let o=ae<0?-1:i-Vf(ae),c=o<0?-1:Bf(o,1.4,1.95)*1.1800000000000002,l=new Map;te.forEach(e=>{e.bi>=0&&i-e.hit<.17&&l.set(e.bi,1)}),_.forEach((e,t)=>{let n=.46+.26*Hf(t*1.71+Math.floor(i*12)*.37);l.has(t)?j.copy(A):j.copy(Math.abs(e.a)<c?k:O).multiplyScalar(n),C.setColorAt(t,j)}),C.instanceColor.needsUpdate=!0;let u=ae<0?-1:i-Vf(ae);for(let e=0;e<6;e++){let t=.2+(5-e)*.09,i=u<0?0:Bf(u,t,t+.18);u>=t&&R<=5-e&&(R=6-e,r&&n?.play(`derez`,{gain:.5})),N(e,i)}M.instanceMatrix.needsUpdate=!0,M.instanceColor.needsUpdate=!0;let d=u<0?1:1-Bf(u,.86,1);E.uniforms.uGain.value=.7*d,D.visible=d>.01;let f=u<0?-1:Bf(u,.98,1.4);L.visible=f>0&&f<1,L.visible&&L.position.copy(s(0,zf(200,26,Lf(f)))).setY(20),f>=1&&!oe&&(oe=!0,n?.play(`unlock`));let p=u<0?0:Bf(u,1.4,1.7);return m.uniforms.uGain.value=h.uniforms.uGain.value=.12+.88*p,p}}}function x(){let t=new Cn,n=new Y(new Pf(72,16,72,2,4),d);n.position.y=8,t.add(n);let r=new Y(new Pf(52,4,52,1,1.5),l);r.position.y=18,t.add(r);let i=Ff({base:e.laser,emissive:!0}),a=new Y(new Xa(32,1.4,6,48).rotateX(Math.PI/2),i);a.position.y=16.5,t.add(a);let o=new Y(new Ti(30,22,30,32,1,!0).translate(0,35,0),Uf(e.laser,`precision highp float; uniform vec3 uColor; uniform float uAmt, uStep; in vec2 vUv; in vec3 vP; in float vF;
      layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){ float y = vUv.y; float scan = 0.6 + 0.4 * step(0.5, fract(y * 9.0 - uStep * 1.5));
        gColor = vec4(uColor, (0.04 + 0.16 * vF) * scan * (0.35 + 0.65 * (1.0 - y)) * uAmt); gNormal = vec4(0.0); }`));t.add(o);let s=new Cn;s.position.y=132,s.rotation.set(.3,-.42,0),s.userData.dynamic=!0,t.add(s);let c=[];for(let e=-1;e<=1;e++)for(let t=-1;t<=1;t++)for(let n=-1;n<=1;n++)(e||t||n)&&c.push($(e,t,n));let u=new oi(new Pf(40,40,40,2,4),Ff({base:e.anod,brush:.1,spec:.8,rim:1,instanced:!0}),c.length);u.frustumCulled=!1,s.add(u);let f=tf(1280,1280,(e,t)=>{e.fillStyle=`#000`,e.fillRect(0,0,t,t);let n=e=>e<10?[e%5,Math.floor(e/5)]:[(e-10)%2,2+Math.floor((e-10)/2)];`0123456789ABCDEF`.split(``).forEach((t,r)=>{let[i,a]=n(r),o=i*256,s=a*256;e.strokeStyle=`rgba(255,255,255,0.34)`,e.lineWidth=7,e.strokeRect(o+22,s+22,212,212),e.fillStyle=`#fff`,e.font=`700 150px ${If}`,e.textAlign=`center`,e.textBaseline=`middle`,e.fillText(t,o+128,s+128+8),e.fillRect(o+40,s+256-52,30,7)});let r=768/120;e.save(),e.translate(512,512),e.scale(r,r);for(let[t,n]of[[Ld,`#8c8c8c`],[Id,`#ffffff`]]){e.fillStyle=n;for(let n of t.split(`M`).filter(e=>e.trim())){let t=n.replace(/Z/g,``).trim().split(/\s*L\s*/).map(e=>e.split(`,`).map(Number));e.beginPath(),t.forEach(([t,n],r)=>r?e.lineTo(t,n):e.moveTo(t,n)),e.closePath(),e.fill()}}e.restore()}),p=e=>e<10?[e%5,Math.floor(e/5)]:[(e-10)%2,2+Math.floor((e-10)/2)],m=[[0,1],[0,-1],[1,1],[1,-1],[2,1],[2,-1]],h=m.map(([e,t])=>{let n=$(0,0,0).setComponent(e,t),r=new Tt().setFromUnitVectors($(0,0,1),n);return new q().compose(n.clone().multiplyScalar(20.45),r,$(1,1,1))}),g=[];c.forEach((e,t)=>m.forEach(([n,r],i)=>{e.getComponent(n)===r&&(n===2&&r===1?g.push({ci:t,fi:i,cell:[2+e.x+1,3-e.y],mark:1}):g.push({ci:t,fi:i,cell:p(Math.floor(Hf(t*6.1+i*2.3)*16)),mark:0}))}));let _=new Ka(35,35);_.setAttribute(`aCell`,new Qr(new Float32Array(g.flatMap(e=>e.cell)),2)),_.setAttribute(`aMark`,new Qr(new Float32Array(g.map(e=>e.mark)),1)),_.setAttribute(`aSeed`,new Qr(new Float32Array(g.map((e,t)=>Hf(t*3.3))),1));let v=new so({glslVersion:Be,vertexShader:`in vec3 position; in vec2 uv; in mat4 instanceMatrix; in vec2 aCell; in float aMark, aSeed;
        uniform mat4 modelMatrix, viewMatrix, projectionMatrix;
        out vec2 vUv; out vec3 vN; flat out vec2 vCell; flat out float vMark, vSeed;
        void main(){ vUv = uv; vCell = aCell; vMark = aMark; vSeed = aSeed;
          mat4 mv = viewMatrix * modelMatrix * instanceMatrix; vN = normalize(mat3(mv) * vec3(0.0, 0.0, 1.0));
          gl_Position = projectionMatrix * mv * vec4(position, 1.0); }`,fragmentShader:`precision highp float; uniform sampler2D uAtlas; uniform vec3 uLock, uOk, uHot; uniform float uSolve, uStep, uAmt;
        in vec2 vUv; in vec3 vN; flat in vec2 vCell; flat in float vMark, vSeed;
        layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
        void main(){
          vec2 q = (vec2(vCell.x, 4.0 - vCell.y) + 0.02 + vUv * 0.96) / 5.0;
          float g = texture(uAtlas, q).r;
          // scrambled, the glyphs flicker on twos; solved, they hold steady and the mark burns brightest
          float fl = mix(step(0.22, fract(sin(vSeed * 91.7 + floor(uStep * 12.0) * 3.1) * 43758.5)), 1.0, uSolve);
          vec3 lit = mix(uLock, mix(uOk * 0.62, mix(uOk, uHot, 0.5), vMark), uSolve);
          vec3 col = mix(vec3(0.012, 0.032, 0.027), lit * (0.3 + 0.7 * fl) * uAmt, g);
          gColor = vec4(col, 1.0); gNormal = vec4(normalize(vN) * 0.5 + 0.5, 255.0 / 255.0);
        }`,uniforms:{uAtlas:{value:f},uLock:{value:new J(e.laser)},uOk:{value:new J(e.signal)},uHot:{value:new J(e.hot)},uSolve:{value:0},uStep:Q.uStep,uAmt:{value:1}}}),y=new oi(_,v,g.length);y.frustumCulled=!1,s.add(y);let b=[$(1,0,0),$(0,1,0),$(0,0,1)],x=c.map(e=>({p:e.clone(),q:new Tt})),S=e=>{let t=new Tt().setFromAxisAngle(b[e.ax],e.dir*Math.PI/2);x.forEach(n=>{Math.round(n.p.getComponent(e.ax))===e.l&&(n.p.applyQuaternion(t).round(),n.q.premultiply(t))})},C=7,w=()=>(C=C*16807%2147483647)/2147483647,T=[],E=()=>{let e;do e={ax:Math.floor(w()*3),l:Math.floor(w()*3)-1,dir:w()<.5?-1:1};while(T.length&&T[T.length-1].ax===e.ax&&T[T.length-1].l===e.l);return e};for(let e=0;e<5;e++){let e=E();S(e),T.push(e)}let D=null,O=0,k=!1,A=-1,j=0,M=0,N=new q,P=new q,F=new Tt,I=new K,ee=e=>{D?F.setFromAxisAngle(b[D.ax],e):F.identity();let t=new q().makeRotationFromQuaternion(F);x.forEach((e,n)=>{N.compose(I.copy(e.p).multiplyScalar(44),e.q,$(1,1,1)),D&&Math.round(e.p.getComponent(D.ax))===D.l&&N.premultiply(t),u.setMatrixAt(n,N),x[n].m=N.clone()}),g.forEach((e,t)=>{P.multiplyMatrices(x[e.ci].m,h[e.fi]),y.setMatrixAt(t,P)}),u.instanceMatrix.needsUpdate=!0,y.instanceMatrix.needsUpdate=!0};return ee(0),{group:t,leds:[a],beam:o,unlock(e){k=!0,A=-1},lock(){k=!1,A=-1,M=1},update(e,t,n,r){let i=Vf(e);if(M&&=(O=i+M,0),!D){if(k){if(T.length){let e=T.pop();D={ax:e.ax,l:e.l,dir:-e.dir,t0:i,dur:1/6,push:!1}}else A<0&&(A=i,n?.play(`unlock`))}else if(i>=O){if(T.length>=6||T.length>=3&&w()<.4){let e=T.pop();D={ax:e.ax,l:e.l,dir:-e.dir,t0:i,dur:.25,push:!1}}else D={...E(),t0:i,dur:.25,push:!0}}}let a=0;if(D){let e=Rf((i-D.t0)/D.dur,0,1);a=D.dir*Math.PI/2*Lf(e),e>=1&&(S(D),D.push&&T.push({ax:D.ax,l:D.l,dir:D.dir}),r&&n?.play(`dial`,{gain:k?.7:.3}),D=null,a=0,O=i+.38)}return ee(a),s.position.y=132+Math.sin(i*1.4)*3,j=A>=0?Bf(i-A,0,.34):Math.max(0,j-t*2),v.uniforms.uSolve.value=j,j}}}let S=new J(e.laser),C=new J(e.signal),w=new J,T=0;return{group:i,laserMat:m,variants:_,get current(){return v},set(e){_[e]&&e!==v&&(_[v].group.visible=!1,_[v].lock(),v=e,_[v].group.visible=!0)},unlock(e){_[v].unlock(e)},lock(){_[v].lock()},update(e,t,n,r=!1){let i=Vf(e),a=_[v],o=a.update(e,t,n,r)||0;T+=(o-T)*(1-Math.exp(-t*10)),m.uniforms.uGain.value=zf(1,.06,T)*(T<.5?.8+.2*(Math.floor(i*6)%2):1),w.copy(S).lerp(C,Rf(T*1.4,0,1)),a.leds.forEach(e=>(e.material??e).uniforms.uBase.value.copy(w)),a.beam&&a.beam.material.uniforms.uColor.value.copy(w)}}}var Gf=e=>Ju({brushScale:.07,dotCell:4.5,...e}),Kf=`"JetBrains Mono Variable", ui-monospace, monospace`,qf=`"Chakra Petch", sans-serif`,Jf=`"Zen Kaku Gothic New", sans-serif`,Yf=e=>(e=Math.min(1,Math.max(0,e)),e*e*e*(10+e*(-15+6*e))),Xf=(e,t,n)=>Math.min(1,Math.max(0,(e-t)/(n-t))),Zf=e=>Math.floor(e*12)/12,Qf={xW:-305,xE:-95,zN:160,zS:330,H:122,feedZ:190,keep:[-322,124,-62,346]},$f=[`UI`,`3D`,`API`,`NET`,`DB`,`OPS`],ep={x:-200,z:262,w:158,d:96},tp=26,np=6,rp=8;function ip(){let e=new Map,t=new q,n=new an;return{add(r,i,a,o,s,c=0,l=0,u=0){let d=r.index?r.toNonIndexed():r.clone();for(let e of Object.keys(d.attributes))[`position`,`normal`,`uv`].includes(e)||d.deleteAttribute(e);d.clearGroups(),d.applyMatrix4(t.makeRotationFromEuler(n.set(c,l,u)).setPosition(a,o,s)),e.has(i)||e.set(i,[]),e.get(i).push(d)},build(t){e.forEach((e,n)=>t.add(new Y(Ad(e),n)))}}}var ap=(e,t,n,r=2,i=2)=>new Pf(e,t,n,i,Math.min(r,e/2-.01,t/2-.01,n/2-.01)),op=(e,t,n=24,r=e)=>new Ti(r,e,t,n);function sp(e,t,n,r){let i=r/104;for(let r of[Ld,Id])for(let a of r.split(`M`).filter(e=>e.trim())){let r=a.replace(/Z/g,``).trim().split(/\s*L\s*/).map(e=>e.split(`,`).map(Number));e.beginPath(),r.forEach(([r,a],o)=>(o?e.lineTo:e.moveTo).call(e,t+(r-8)*i,n+(a-8)*i)),e.closePath(),e.fill()}}function cp(e,t,n){let r=Qf,{xW:i,xE:a,zN:o,zS:s,H:c}=r,l=new Cn,u=Gf({base:e.brass,brush:.12,spec:1,rim:1}),d=Gf({base:e.brassDark,brush:.12,spec:.8,rim:1}),f=Gf({base:e.steel,brush:.12,spec:1,rim:1}),p=Gf({base:e.anod,brush:.12,spec:.7,rim:1}),m=Gf({base:e.anod2,brush:.12,spec:.8,rim:1}),h=Gf({base:e.shieldDark,brush:.14,spec:.6,rim:1}),g=Gf({base:`#c9962f`,brush:.1,spec:.6,rim:1}),_=ip(),v=s-o+28,y=(i+a)/2,b=(o+s)/2;for(let e of[i,a]){_.add(ap(16,14,v,3),f,e,c-7,b),_.add(ap(6,3,v-12,1),u,e,c+1.5,b);for(let t of[o,s]){_.add(ap(14,c-14,14,2.5),p,e,(c-14)/2,t),_.add(ap(30,6,30,2),h,e,3,t),_.add(ap(20,10,20,2.5),m,e,c-19,t);for(let n of[0,1,2,3])_.add(op(1.8,2,8),f,e+(n%2?10:-10),6.5,t+(n>1?10:-10))}}_.add(ap(a-i-14,10,10,2),p,y,c-30,o),_.add(ap(a-i-30,3,11,1),g,y,c-23.5,o);let x=a+21;_.add(ap(14,3,v-20,1),m,x,c-15,b),_.add(ap(2,8,v-20,.6),m,x+7,c-10,b);let S=$f.map((e,t)=>-275+t*30);_.add(ap(196,rp,40,3),p,-200,rp/2,r.feedZ),_.add(ap(202,2,46,1),d,-200,1,r.feedZ);let C=nf(192,36,(e,t,n)=>{e.fillStyle=`#0f1513`,e.fillRect(0,0,t,n);let r=t/192;S.forEach((t,n)=>{let i=(t+296)*r;e.fillStyle=`#050807`,e.fillRect(i-14.5*r,3*r,29*r,29*r),e.strokeStyle=`rgba(230,223,202,0.5)`,e.lineWidth=.5*r,e.strokeRect(i-14.5*r,3*r,29*r,29*r),e.fillStyle=`rgba(230,223,202,0.8)`,e.font=`700 ${2.6*r}px ${Kf}`,e.textAlign=`center`,e.fillText(String(n+1).padStart(2,`0`),i,35*r)})},{res:1024,bloom:!1});C.rotation.x=-Math.PI/2,C.position.set(-200,8.08,r.feedZ),l.add(C);let w=Gf({base:e.sheen,brush:.1,spec:1,rim:1}),T=Gf({base:`#0b0f0e`,brush:.1,spec:.5,rim:.6});for(let e of[-255,-200,-145]){for(let t of[-3.6,3.6])_.add(op(19,1.2,36).rotateZ(Math.PI/2),w,e+t,24,146);_.add(op(14,6,36).rotateZ(Math.PI/2),T,e,24,146),_.add(op(4.5,9,14).rotateZ(Math.PI/2),f,e,24,146),_.add(ap(14,6,14,2),p,e,3,146),_.add(ap(3,20,3,1),m,e-6,14,146),_.add(ap(8,.8,r.feedZ-146-20,.3),T,e,6.5,(146+r.feedZ-20)/2+2)}let E=tf(768,256,e=>{[[`UI · 3D`],[`API · NET`],[`DB · OPS`]].forEach(([t],n)=>{let r=n*256;e.fillStyle=`#efe9d9`,e.fillRect(r,0,256,256),e.fillStyle=`#121615`,e.font=`700 54px ${Kf}`,e.textAlign=`center`,e.textBaseline=`middle`,e.fillText(t,r+128,96),e.font=`600 34px ${Kf}`,e.fillText(`XN · REEL`,r+128,176),e.fillRect(r+24,214,208,6)})}),D=[-255,-200,-145].map((e,t)=>{let n=new Ka(16,8).toNonIndexed(),r=n.attributes.uv;for(let e=0;e<r.count;e++)r.setX(e,(t+r.getX(e))/3);return n.rotateY(Math.PI/2),n.translate(e+4.4,31,146),n});l.add(new Y(Ad(D),Gf({base:`#ffffff`,map:E,mapAmt:1,brush:.05,spec:.2,rim:0}))),_.add(ap(ep.w,5,ep.d,1.5),Gf({base:e.dimmPcb,brush:.1,spec:.5,rim:.7}),ep.x,6.5,ep.z);for(let e of[-1,1])for(let t of[-1,1])_.add(op(3.2,4,12),u,ep.x+e*(ep.w/2-8),2,ep.z+t*(ep.d/2-8));let O=e=>[ep.x-50+e%3*50,ep.z-22+44*Math.floor(e/3)],k=ep.w-3,A=ep.d-3,j=1024/k,M=(e,t)=>[(e-ep.x+k/2)*j,(t-ep.z+A/2)*j],N=[[0,1],[1,2],[0,3],[2,5],[3,4],[4,5],[1,4]],P=([e,t])=>{let[n,r]=O(e),[i,a]=O(t),o=tp/2;return r===a?[[n+o,r],[i-o,a]]:[[n,r+o],[i,a-o]]},F=nf(k,A,(t,n,r)=>{t.fillStyle=e.dimmPcb,t.fillRect(0,0,n,r),t.fillStyle=`rgba(80,160,120,0.08)`,t.fillRect(6*j,6*j,n-12*j,r-24*j),t.strokeStyle=`rgba(215,174,96,0.32)`,t.lineWidth=.9*j,t.lineCap=`round`,N.forEach(e=>{let[[n,r],[i,a]]=P(e),o=r===a;for(let e of[-3,0,3]){let[s,c]=M(n+(o?0:e),r+(o?e:0)),[l,u]=M(i+(o?0:e),a+(o?e:0));t.beginPath(),t.moveTo(s,c),t.lineTo(l,u),t.stroke()}}),$f.forEach((e,n)=>{let[r,i]=O(n),[a,o]=M(r,i),s=15.4*j,c=5*j;t.strokeStyle=`rgba(236,230,212,0.85)`,t.lineWidth=.55*j;for(let[e,n]of[[-1,-1],[1,-1],[1,1],[-1,1]])t.beginPath(),t.moveTo(a+e*s-e*c,o+n*s),t.lineTo(a+e*s,o+n*s),t.lineTo(a+e*s,o+n*s-n*c),t.stroke();t.fillStyle=`rgba(236,230,212,0.9)`,t.beginPath(),t.arc(a-s-1.6*j,o-s-1.6*j,.8*j,0,Math.PI*2),t.fill(),t.fillStyle=`rgba(215,174,96,0.85)`;for(let e=0;e<7;e++)for(let n of[-1,1])t.fillRect(a-10*j+e*3.3*j-.6*j,o+n*13.6*j-.9*j,1.2*j,1.8*j);t.fillStyle=`rgba(236,230,212,0.85)`,t.font=`700 ${2.6*j}px ${Kf}`,t.textAlign=`left`,t.textBaseline=`alphabetic`,t.fillText(`U${n+1}`,a+s-4*j,o-s-1.2*j)}),t.fillStyle=`rgba(215,174,96,0.95)`;for(let e=0;e<30;e++)t.fillRect((14+e*4.3)*j,r-6*j,2.6*j,5.2*j);for(let[e,n]of[[8,8],[k-8,8],[8,A-8],[k-8,A-8]])t.beginPath(),t.arc(e*j,n*j,3.4*j,0,Math.PI*2),t.arc(e*j,n*j,2*j,0,Math.PI*2,!0),t.fill();t.fillStyle=`rgba(236,230,212,0.9)`,t.font=`700 ${4*j}px ${qf}`,t.textAlign=`left`,t.fillText(`XN-SYS-01`,14*j,7.6*j),t.font=`600 ${2.2*j}px ${Kf}`,t.fillText(`ONE BOARD · SIX PARTS · REV A`,14*j,11.2*j),sp(t,k*j-20*j,2.6*j,9*j)},{res:1024,bloom:!1});F.rotation.x=-Math.PI/2,F.position.set(ep.x,9.06,ep.z),l.add(F);let I=tf(1024,Math.round(1024*A/k),e=>{e.fillStyle=`#000`,e.fillRect(0,0,1024,1024),e.lineWidth=1.1*j,e.lineCap=`round`,N.forEach((t,n)=>{let[[r,i],[a,o]]=P(t),s=i===o;for(let t of[-3,0,3]){let[n,c]=M(r+(s?0:t),i+(s?t:0)),[l,u]=M(a+(s?0:t),o+(s?t:0)),d=e.createLinearGradient(n,c,l,u);d.addColorStop(0,`rgb(255,0,0)`),d.addColorStop(1,`rgb(255,255,0)`),e.strokeStyle=d,e.beginPath(),e.moveTo(n,c),e.lineTo(l,u),e.stroke()}})}),ee=new Y(new Ka(k,A).rotateX(-Math.PI/2),rf({color:e.signal,vertex:`in vec3 position; in vec2 uv; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; out vec2 vUv;
      void main(){ vUv = uv; gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); }`,fragment:`precision highp float; uniform sampler2D uTex; uniform vec3 uColor, uHot; uniform float uAmt, uDraw, uStep; in vec2 vUv;
      layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){
        vec4 t = texture(uTex, vUv);
        float cov = smoothstep(0.15, 0.6, t.r), along = t.g / max(t.r, 0.02);
        float on = cov * step(along, uDraw);
        float pulse = step(0.82, fract(along * 2.5 - uStep * 1.4)) * step(0.999, uDraw);
        gColor = vec4(mix(uColor, uHot, pulse), on * uAmt * (0.6 + 0.4 * pulse)); gNormal = vec4(0.0);
      }`,uniforms:{uTex:{value:I},uHot:{value:new J(e.hot)},uAmt:{value:1},uDraw:{value:0},uStep:{value:0}}}));ee.position.set(ep.x,9.2,ep.z),l.add(ee);let L=Gf({base:`#ffffff`,emissive:!0,instanced:!0,instanceColor:!0}),te=new oi(new Ci(4.4,1.6,2.6),L,7),ne=new q,re=new Tt;new J,$f.forEach((e,t)=>{let[n,r]=O(t);ne.makeTranslation(n+tp/2+4.5,9.8,r+tp/2-1),te.setMatrixAt(t,ne)}),ne.makeTranslation(ep.x+ep.w/2-12,9.8,ep.z-ep.d/2+14),te.setMatrixAt(6,ne);let ie=new J(e.ledOff),ae=new J(e.signal),R=new J(e.amber);for(let e=0;e<7;e++)te.setColorAt(e,ie);l.add(te);let oe=tf(768,512,e=>{e.clearRect(0,0,768,512),$f.forEach((t,n)=>{let r=n%3*256,i=Math.floor(n/3)*256;e.fillStyle=`rgba(236,230,212,0.95)`,e.font=`700 ${t.length>2?78:96}px ${qf}`,e.textAlign=`center`,e.textBaseline=`middle`,e.fillText(t,r+128,i+118),e.font=`600 22px ${Kf}`,e.fillStyle=`rgba(236,230,212,0.7)`,e.fillText(`XN-${String(n+1).padStart(2,`0`)}`,r+128,i+186),e.beginPath(),e.arc(r+46,i+46,12,0,Math.PI*2),e.fill()})}),se=Gf({base:e.ic,map:oe,mapAmt:1,brush:.1,spec:.7,rim:1}),ce=$f.map((e,t)=>{let n=ap(tp,np,tp,1.1,2),r=n.attributes.position,i=n.attributes.normal,a=n.attributes.uv,o=t%3/3,s=1-(Math.floor(t/3)+1)/2;for(let e=0;e<r.count;e++)i.getY(e)>.9?a.setXY(e,o+(r.getX(e)/tp+.5)/3,s+(.5-r.getZ(e)/tp)/2):a.setXY(e,o+.01,s+.01);let c=new Y(n,se);return c.userData.dynamic=!0,l.add(c),c}),le=e=>$(S[e],11,r.feedZ),ue=e=>{let[t,n]=O(e);return $(t,12,n)},de=new Cn;de.userData.dynamic=!0,l.add(de);let fe=a-i+44,pe=ip();pe.add(ap(fe,24,28,4),u,y,c+14,0),pe.add(ap(fe-16,4,30,1.5),m,y,c+28,0);for(let e of[i,a]){pe.add(ap(32,28,46,4),p,e,c+10,0),pe.add(ap(34,4,48,1.5),d,e,c+25.5,0);for(let t of[-1,1])pe.add(op(5,5,16).rotateZ(Math.PI/2),f,e+(e===i?-16.5:16.5),c+1,t*14)}pe.add(ap(10,18,10,2),m,x-4,c+6,0),pe.build(de);let me=new Cn;de.add(me);let he=ip();he.add(ap(42,46,50,5),m,0,c+14,0),he.add(ap(46,7,38,2),u,0,c+40,0),he.add(ap(22,28,12,3),p,0,c-4,22),he.add(ap(12,18,12,2),p,17,c-12,24),he.add(op(4.5,6,16),f,17,c-24,24),he.build(me);let ge=Gf({base:e.hot,emissive:!0}),_e=new Y(new Xa(6,1.3,6,24).rotateX(Math.PI/2),ge);_e.position.set(17,c-27.5,24),me.add(_e);let ve=Gf({base:e.signal,emissive:!0}),ye=new Y(new Ci(14,3,1.2),ve);ye.position.set(0,c+26,21.6),me.add(ye);let be=new Cn;be.position.z=22,me.add(be);let xe=ip();xe.add(ap(11,112,11,2),f,0,68,0),xe.add(op(2.2,14,12,3.2),m,0,6,0),xe.add(op(7,4,18),p,0,14,0),xe.add(ap(16,3,16,1),d,0,125,0),xe.build(be);let Se=Gf({base:e.signal,emissive:!0}),Ce=new Y(new Xa(9.5,1.4,8,32).rotateX(Math.PI/2),Se);Ce.position.y=19,be.add(Ce);let we=o+10,Te=c-10.5,Ee=Te+24,De=(124+Math.PI*12)/22,Oe=new oi(ap(10,5,De*.92,1,1),Gf({base:`#1a201e`,brush:.1,spec:.7,rim:1,instanced:!0}),22);Oe.frustumCulled=!1,l.add(Oe);let ke=$(1,0,0),z=e=>{let t=(124+(e-we))/2,n=we+t;for(let e=0;e<22;e++){let r=(e+.5)*De,i,a,o;if(r<t)i=we+r,a=Te,o=0;else if(r<t+Math.PI*12){let e=(r-t)/12;i=n+Math.sin(e)*12,a=Te+12-Math.cos(e)*12,o=-e}else i=n-(r-t-Math.PI*12),a=Ee,o=-Math.PI;re.setFromAxisAngle(ke,o),ne.compose($(x,a,i),re,$(1,1,1)),Oe.setMatrixAt(e,ne)}Oe.instanceMatrix.needsUpdate=!0},Ae={x:a+26,z:o-4};_.add(ap(5,150,5,1.5),m,Ae.x,75,Ae.z),_.add(ap(16,5,16,1.5),h,Ae.x,2.5,Ae.z),_.add(op(6.6,4,20),p,Ae.x,152,Ae.z),_.add(op(6.6,3,20),p,Ae.x,186,Ae.z);let je=(e,t)=>{let n=new Y(op(6,9,20),Gf({base:e,emissive:!0}));return n.position.set(Ae.x,t,Ae.z),l.add(n),n.material.uniforms.uGain},Me=je(e.signal,158.5),B=je(e.amber,168),Ne=je(e.laser,177.5);if(_.build(l),n){n.ao(y,b,a-i+40,s-o+40,8,.5),n.ao(ep.x,ep.z,ep.w+6,ep.d+6,6,.9),n.ao(-200,r.feedZ,200,46,5,.85);for(let e of[i,a])for(let t of[o,s])n.ao(e,t,32,32,5,.9);n.footprint(y,b,a-i+40,s-o+40,0),n.text(`U1`,i-30,o-6,10,{weight:`700`}),n.text(`組立`,i+4,s+66,40,{weight:`700`,family:Jf,base:`alphabetic`}),n.text(`ASSEMBLY`,i+92,s+62,18,{weight:`700`,family:qf,base:`alphabetic`,track:2}),n.text(`PICK + PLACE  ·  6 PARTS  ·  ONE OPERATOR`,i+92,s+74,6)}t.sprinkle(y,b,a-i+70,s-o+70,26,6,18);let V={x:-200,z:236,y:74},Pe={...V},Fe=.82,Ie=-1,Le=0,Re={...V},ze=-1,Be=-1,Ve=()=>{de.position.z=Pe.z-22,me.position.x=Pe.x,be.position.y=Pe.y,z(Pe.z-22)},He=e=>{ce.forEach((t,n)=>{n===e?t.position.set(Pe.x,Pe.y-np/2-.4,Pe.z):n<Le?t.position.copy(ue(n)):t.position.copy(le(n))})},Ue=e=>{for(let e=0;e<6;e++)te.setColorAt(e,e<Le?ae:ie);te.setColorAt(6,ze>=0?ae:Ie>=0?Math.floor(e*4)%2?R:ie:R),te.instanceColor.needsUpdate=!0};Ve(),He(-1);let We={group:l,chips:ce,onComplete:null,start(e){Le>=6||(Ie=e-Le*Fe,Re={...Pe})},stop(){Le<6&&(Ie=-1,Re={...Pe})},reset(){Le=0,ze=-1,Ie=-1,ee.material.uniforms.uDraw.value=0,He(-1)},get done(){return Le},update(e,t,n){let i=Zf(e),a=-1;if(ee.material.uniforms.uStep.value=i,Ie>=0&&Le<6){let t=Math.max(0,i-Ie),o=Math.min(5,Math.floor(t/Fe)),s=(t-o*Fe)/Fe,c=S[o],l=r.feedZ,[u,d]=O(o),f=o===0?Re:(()=>{let[e,t]=O(o-1);return{x:e,z:t,y:74}})();if(s<.26){let e=Yf(s/.26);Pe.x=f.x+(c-f.x)*e,Pe.z=f.z+(l-f.z)*e,Pe.y=74+(f.y-74)*(1-e)}else if(s<.44)Pe.x=c,Pe.z=l,Pe.y=74-59.6*Math.sin(Math.PI*Xf(s,.26,.44));else if(s<.74){let e=Yf(Xf(s,.44,.74));Pe.x=c+(u-c)*e,Pe.z=l+(d-l)*e,Pe.y=74}else Pe.x=u,Pe.z=d,Pe.y=74-58.6*Math.sin(Math.PI*Math.min(1,Xf(s,.74,.96)));let p=s>=.35,m=s>=.85;p&&Be!==o&&(Be=o,n?.play(`tick`,{gain:.6})),p&&!m&&(a=o);let h=m?o+1:o;h>Le&&(Le=h,n?.play(`seat`,{gain:.55}),We.flashAt=e),Le>=6&&(Ie=-1,ze=e,Re={...Pe},We.onComplete?.(e))}else if(Le>=6){let t=i-ze,n=Yf(Xf(t,0,.5)),r=Math.floor(Math.max(0,t-.6)/.7)%6,a=Math.max(0,t-.6)%.7/.7,[o,s]=O((r+5)%6),[c,l]=O(r),u=Yf(Xf(a,0,.45)),d=t<.6?o:o+(c-o)*u,f=t<.6?s:s+(l-s)*u;Pe.x=Re.x+(d-Re.x)*n,Pe.z=Re.z+(f-Re.z)*n,Pe.y=Re.y+(52-Re.y)*n,t>.6&&a>.55&&a<.7&&(We.flashAt=e),ee.material.uniforms.uDraw.value=Yf(Xf(t,0,.7))*1.001}else Ie<0&&Le===0&&(Pe.x=V.x+Math.sin(i*.9)*46,Pe.z=r.feedZ+6+Math.sin(i*.5)*8,Pe.y=64+Math.abs(Math.sin(i*1.8))*10,Math.floor(i*12)%17==0&&(We.flashAt=e));He(a),Ue(i),Se.uniforms.uGain.value=a>=0?1.5:.45,ge.uniforms.uGain.value=We.flashAt!=null&&e-We.flashAt<.12?2.2:.18,ve.uniforms.uGain.value=Ie>=0?Math.floor(i*6)%2?1:.3:.5;let o=ze>=0&&e-ze<1.4?Math.floor(i*6)%2:1;B.value=Ie<0&&Le<6?1.1:.12,Me.value=Ie>=0||Le>=6?1.2*o+.1:.12,Ne.value=.1,Ve()}};return We}var lp={cx:0,cz:0,size:1300,source:[-360,-420]};function up(e=1024){let t=e,n=Math.round(e*(Ud.h/Ud.w)),r=t/Ud.w,i=document.createElement(`canvas`);i.width=t,i.height=n;let a=i.getContext(`2d`);a.fillStyle=`#000`,a.fillRect(0,0,t,n);let o=lp.size/104,s=e=>e.split(`M`).filter(e=>e.trim()).map(e=>e.replace(/Z/g,``).trim().split(/\s*L\s*/).map(e=>e.split(`,`).map(Number))),l=e=>{a.beginPath(),e.forEach(([e,t],n)=>{let i=(lp.cx+(e-60)*o+Ud.w/2)*r,s=(lp.cz+(t-60)*o+Ud.h/2)*r;n?a.lineTo(i,s):a.moveTo(i,s)}),a.closePath()};a.globalCompositeOperation=`lighter`;for(let[e,t]of[[Ld,150],[Id,255]])for(let n of s(e))l(n),a.fillStyle=`rgb(${t},0,0)`,a.fill();a.lineJoin=`miter`;for(let e of[Ld,Id])for(let t of s(e))l(t),a.strokeStyle=`rgb(0,255,0)`,a.lineWidth=3.2,a.stroke();let u=new yi(i);return u.colorSpace=``,u.flipY=!1,u.anisotropy=4,u.minFilter=c,u.generateMipmaps=!0,u}var dp=`http://www.w3.org/2000/svg`,fp={cage:`Cage`,firewall:`Firewall`,cipher:`Cipher`};function pp({parts:e,setLock:t,lock:n}){let r=document.documentElement;r.dataset.card=`pcb`;let i=[...document.querySelectorAll(`.stop .card`)];i.forEach((e,t)=>{let n=document.createElementNS(dp,`svg`);n.setAttribute(`class`,`card__silk`),n.setAttribute(`aria-hidden`,`true`),n.innerHTML=`<defs><pattern id="hatch${t}" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect class="silk__hatchline" width="1" height="9"/></pattern><pattern id="fing${t}" width="12" height="10" patternUnits="userSpaceOnUse"><rect class="silk__finger" width="8" height="10"/></pattern></defs><path class="silk__mask"/><path class="silk__hatch" fill="url(#hatch${t})"/><rect class="silk__fingers" fill="url(#fing${t})" height="10"/><path class="silk__edge"/><path class="silk__line"/><circle class="silk__fid"/><circle class="silk__fid"/>`,e.prepend(n)});let a=e=>{let t=e.querySelector(`.card__silk`),n=e.offsetWidth,r=e.offsetHeight;if(!n||!r)return;t.setAttribute(`viewBox`,`0 0 ${n} ${r}`),t.setAttribute(`width`,n),t.setAttribute(`height`,r);let i=(e,t)=>`M${e},${e} H${n-e-t} L${n-e},${e+t} V${r-e} H${e+t} L${e},${r-e-t} Z`;t.querySelector(`.silk__mask`).setAttribute(`d`,i(0,16)),t.querySelector(`.silk__hatch`).setAttribute(`d`,i(0,16));let a=t.querySelector(`.silk__fingers`);a.setAttribute(`x`,30),a.setAttribute(`y`,r-10),a.setAttribute(`width`,Math.max(0,n-60)),t.querySelector(`.silk__edge`).setAttribute(`d`,i(.75,16)),t.querySelector(`.silk__line`).setAttribute(`d`,i(8,12));let[o,s]=t.querySelectorAll(`.silk__fid`);o.setAttribute(`cx`,n-24),o.setAttribute(`cy`,24),s.setAttribute(`cx`,24),s.setAttribute(`cy`,r-24),o.setAttribute(`r`,4),s.setAttribute(`r`,4)},o=new ResizeObserver(e=>e.forEach(e=>a(e.target)));i.forEach(e=>{o.observe(e),a(e)});let s=document.createElementNS(dp,`svg`);s.setAttribute(`class`,`lead`),s.setAttribute(`aria-hidden`,`true`),s.innerHTML=`<path class="lead__trace" pathLength="100"/><path class="lead__packet" pathLength="100"/><circle class="lead__via" r="7"/><circle class="lead__hole" r="2.6"/><circle class="lead__pad" r="3.4"/>`,document.body.appendChild(s);let c=s.querySelector(`.lead__trace`),l=s.querySelector(`.lead__packet`),u=s.querySelector(`.lead__via`),d=s.querySelector(`.lead__hole`),f=s.querySelector(`.lead__pad`),p=-1,m=(e,t,n,r,i)=>{if(i===`v`){let i=Math.sign(r-t)||1,a=18*i,o=n-e,s=Math.abs(r-t-a),c=Math.min(Math.abs(o),s);return`M${e},${t} V${t+a} l${Math.sign(o)*c},${i*c} L${n},${r}`}let a=Math.sign(n-e)||1,o=22*a,s=r-t,c=Math.abs(n-e-o),l=Math.min(Math.abs(s),c);return`M${e},${t} H${e+o} l${a*l},${Math.sign(s)*l} L${n},${r}`},h={update(t){let n=t.rig.index,r=i[n],a=e(n);if(!(a&&r&&!t.rig.flying&&r.closest(`.stop`).classList.contains(`is-current`)&&!t.director.intro)){p!==-1&&(s.classList.remove(`is-on`),p=-1);return}let o=t.toScreen(a.clone());if(o.behind||o.x<-40||o.x>innerWidth+40||o.y<-40||o.y>innerHeight+40){s.classList.remove(`is-on`),p=-1;return}let h=r.getBoundingClientRect(),g;if(o.x>h.right+30)g=m(h.right,Math.min(h.bottom-34,Math.max(h.top+34,o.y)),o.x,o.y,`h`);else if(o.x<h.left-30)g=m(h.left,Math.min(h.bottom-34,Math.max(h.top+34,o.y)),o.x,o.y,`h`);else if(o.y<h.top)g=m(Math.min(h.right-34,Math.max(h.left+34,o.x)),h.top,o.x,o.y,`v`);else if(o.y>h.bottom)g=m(Math.min(h.right-34,Math.max(h.left+34,o.x)),h.bottom,o.x,o.y,`v`);else{s.classList.remove(`is-on`),p=-1;return}c.setAttribute(`d`,g),l.setAttribute(`d`,g);for(let e of[u,d,f])e.setAttribute(`cx`,o.x.toFixed(1)),e.setAttribute(`cy`,o.y.toFixed(1));p!==n&&(s.classList.remove(`is-on`),s.getBoundingClientRect(),s.classList.add(`is-on`),p=n)}},g=document.createElement(`aside`);g.className=`review`,g.setAttribute(`aria-label`,`Review options`),g.innerHTML=`<button class="review__toggle" type="button" aria-expanded="false">Options</button><div class="review__body" hidden>${((e,t,n)=>`<fieldset class="review__row"><legend>${e}</legend>${Object.entries(t).map(([e,t])=>`<button type="button" data-k="${e}" aria-pressed="${e===n}">${t}</button>`).join(``)}</fieldset>`)(`Lock`,fp,n)}</div>`,document.body.appendChild(g);let _=g.querySelector(`.review__body`),v=g.querySelector(`.review__toggle`),y=(e,t)=>{let n=new URL(location.href);n.searchParams.set(e,t),history.replaceState(null,``,n)};v.addEventListener(`click`,()=>{let e=_.hidden;_.hidden=!e,v.setAttribute(`aria-expanded`,String(e))});let[b]=g.querySelectorAll(`.review__row`),x=(e,t)=>e.querySelectorAll(`button`).forEach(e=>e.setAttribute(`aria-pressed`,String(e.dataset.k===t)));return b.addEventListener(`click`,e=>{let n=e.target.closest(`button`);n&&(t(n.dataset.k),x(b,n.dataset.k),y(`enclave`,n.dataset.k))}),matchMedia(`(max-width: 760px)`).matches||(_.hidden=!1,v.setAttribute(`aria-expanded`,`true`)),h}var mp={verdigris:{label:`Verdigris and brass`,css:(e=>e)({bg:`#061310`,text:`#ece6d4`,neon:`#52e3b2`,muted:`rgba(236,230,212,.74)`,line:`rgba(215,174,96,.5)`,panel:`rgba(8,30,26,.9)`,gold:`#d7ae60`,mask:`#0e2c26`,mask2:`#123630`,silk:`#ece6d4`,signal:`#52e3b2`,heat:`#ff7a24`,alarm:`#ff4848`,ink:`#020807`,paper:`#efe9d9`}),gl:{ink:`#020807`,ink2:`#040a09`,glint:`#fff8e8`,gradeHigh:`#fff6e6`,gradeShadow:`#03100d`,paperFlash:`#f2ead6`,shade:`#0a2420`,rim:`#e6c27c`,uplight:`#1c5546`,mask:`#0d2924`,mask2:`#11302a`,sheen:`#2f6457`,silk:`#e6dfca`,pad:`#d7ae60`,trace:`#7a5a2e`,signal:`#4fe3b2`,hot:`#eafff6`,markBack:`#c9a25a`,laser:`#ff4545`,heat:`#ff7a24`,heatHot:`#ffd6a0`,amber:`#ffb13d`,blue:`#5ab8ff`,ic:`#2b3734`,can:`#36443f`,can2:`#2f3e44`,canTop:`#b9b7a8`,pin:`#cbc6b5`,mlcc:`#a08454`,res:`#1b201f`,choke:`#46524d`,steel:`#a0a69c`,nickel:`#cfd1c6`,copperPipe:`#c9804c`,anod:`#1b2422`,anod2:`#2a3532`,substrate:`#16302a`,fin:`#cdb27f`,fanFrame:`#1c2724`,blade:`#2a3833`,sink:`#9c8a5c`,sinkDark:`#3c4440`,connector:`#202826`,slot:`#25302d`,latch:`#a7a493`,dimm:`#38443f`,dimmPcb:`#173a2c`,dimmTop:`#545e57`,bezel:`#0b100f`,hbm:`#3e4a45`,shield:`#7f847a`,shieldDark:`#4a524c`,ioSteel:`#adb1a5`,ioShield:`#cfd0c4`,goldPart:`#d9b062`,audioCap:`#c9962f`,audioCapTop:`#e8d29a`,ledOff:`#16201d`,outside:`#f6f2e2`,dust:`#f2ead6`,sleeve:`#141c1a`,brass:`#c9a25a`,brassDark:`#7a6236`,fog:`#21403a`,fogHorizon:`#4d6a5c`,zenith:`#03100f`,skyHorizon:`#1f4039`,skyGlow:`#6a6648`,skyStreak:`#1b3833`,streak:`#f2ead6`,lamp:`#4d8478`,cityWall:`#0c1a17`,cityWallLit:`#1d3a33`,cityRoof:`#10201c`,winA:`#ffcf86`,winB:`#7fe3c8`,winC:`#ff6a4f`}}},hp={uWinA:{value:new J(`#ffcf86`)},uWinB:{value:new J(`#7fe3ff`)},uWinC:{value:new J(`#ff4f86`)},uWall:{value:new J(`#1c1a2c`)},uWallLit:{value:new J(`#3a3654`)},uRoof:{value:new J(`#25223a`)},uLit:{value:.32},uCell:{value:new G(2.6,3.4)}},gp=`
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
}`,_p=`
precision highp float;
${Tu}
${Eu}
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
}`;function vp({instanceColor:e=!1}={}){return new so({glslVersion:Be,vertexShader:gp,fragmentShader:_p,uniforms:{...hp,uKeyDir:Q.uKeyDir,uShadeTint:Q.uShadeTint,uDotInk:Q.uDotInk,uRimCol:Q.uRimCol,uStep:Q.uStep,uPx:Q.uPx},defines:e?{USE_INSTANCE_COLOR:``}:{}})}function yp(){let e=new Ci(1,1,1);return e.translate(0,.5,0),e}function bp({count:e=600,rMin:t=40,rMax:n=400,hMin:r=10,hMax:i=90,wMin:a=6,wMax:o=18,y:s=0,seed:c=1,avoid:l=[],palette:u=[`#1c1a2c`]}={}){let d=c>>>0||1,f=()=>(d=d*1664525+1013904223>>>0)/4294967296,p=new oi(yp(),vp({instanceColor:!0}),e),m=new q,h=new Tt,g=new K,_=new K,v=new J,y=0,b=0;for(;y<e&&b++<e*20;){let e=f()*Math.PI*2,c=Math.sqrt(t*t+f()*(n*n-t*t)),d=Math.cos(e)*c,b=Math.sin(e)*c;if(l.some(([e,t,n])=>(d-e)**2+(b-t)**2<n*n))continue;let x=f()**2.2,S=r+(i-r)*x*(.6+.8*(1-c/n)),C=a+(o-a)*f();g.set(d,s,b),h.setFromAxisAngle(new K(0,1,0),Math.round(f()*4)*(Math.PI/2)+(f()<.2?f()*.5:0)),_.set(C,S,C*(.7+f()*.6)),m.compose(g,h,_),p.setMatrixAt(y,m),p.setColorAt(y,v.set(u[Math.floor(f()*u.length)])),y++}return p.count=y,p.instanceMatrix.needsUpdate=!0,p.instanceColor&&(p.instanceColor.needsUpdate=!0),p.frustumCulled=!1,p}var xp=e=>Ju({brushScale:.07,dotCell:4.5,...e}),Sp=`"Zen Kaku Gothic New", "Hiragino Sans", sans-serif`,Cp=`"Chakra Petch", "Arial Narrow", sans-serif`,wp=[[`電源`,`POWER`,`amber`],[`冷却`,`COOLING`,`signal`],[`演算`,`COMPUTE`,`cream`],[`記憶`,`MEMORY`,`signal`],[`暗号`,`CIPHER`,`heat`],[`神経網`,`NEURAL`,`signal`],[`接続`,`I/O`,`amber`],[`信号`,`SIGNAL`,`cream`],[`熱`,`HEAT`,`heat`],[`自作`,`BUILT SOLO`,`amber`],[`基板`,`BOARD 01`,`signal`],[`夜勤`,`NIGHT SHIFT`,`cream`]];function Tp(e,{phone:t=!1}={}){let n=new Cn,r={amber:e.amber,signal:e.signal,cream:e.silk,heat:e.heat},i=new Y(new wi(9e3,64).rotateX(-Math.PI/2),xp({base:e.cityRoof,brush:.05,spec:0,rim:0,dot:.2,id:0}));i.position.y=-60,i.renderOrder=-20,n.add(i),hp.uWinA.value.set(e.winA),hp.uWinB.value.set(e.winB),hp.uWinC.value.set(e.winC),hp.uWall.value.set(e.cityWall),hp.uWallLit.value.set(e.cityWallLit),hp.uRoof.value.set(e.cityRoof),hp.uLit.value=.32,hp.uCell.value.set(26,34);let a=bp({count:t?80:140,rMin:1700,rMax:4200,hMin:240,hMax:1500,wMin:120,wMax:380,seed:21,palette:[e.cityWall,`#0e1d19`,`#0a1714`,`#12221e`]}),o=new q,s=new K,c=new Tt,l=new K,u=[];for(let e=0;e<a.count;e++){a.getMatrixAt(e,o),o.decompose(s,c,l);let t=Math.hypot(s.x,s.z),n=Math.max(0,-s.z/t);l.y=Math.min(l.y*(.6+.7*n*n),120+t*(.13+.07*n)),o.compose(s,c,l),a.setMatrixAt(e,o),u.push({p:s.clone(),s:l.clone(),q:c.clone()})}a.instanceMatrix.needsUpdate=!0,n.add(a);let d=u.filter(e=>e.s.y>700),f=xp({base:e.amber,emissive:!0,instanced:!0}),p=new oi(new Ci(10,10,10),f,Math.max(1,d.length));d.forEach((e,t)=>{o.compose($(e.p.x,e.s.y+14,e.p.z),c.identity(),$(1,1,1)),p.setMatrixAt(t,o)}),p.count=d.length,p.frustumCulled=!1,n.add(p);let m=u.map((e,t)=>{let n=Math.hypot(e.p.x,e.p.z);return{...e,i:t,d:n,score:n*(1.6-Math.max(0,-e.p.z/n))}}).filter(e=>e.s.y>300).sort((e,t)=>e.score-t.score),h=[],g=[];for(let i of m){if(g.length>=(t?8:wp.length))break;let a=Math.atan2(i.p.z,i.p.x);if(h.some(e=>Math.abs((e-a+Math.PI*3)%(Math.PI*2)-Math.PI)<.22))continue;h.push(a);let[o,s,c]=wp[g.length],l=Math.min(i.s.y*.5,420),u=l*.22,d=xp({base:`#ffffff`,map:tf(128,Math.round(128*l/u),(t,n,i)=>Ep(t,n,i,o,s,r[c],e)),mapAmt:1,emissive:!0}),f=new Y(new Ka(u,l),d),p=$(-i.p.x,0,-i.p.z).normalize(),m=Math.max(i.s.x,i.s.z)*.5+6;f.position.copy(i.p).addScaledVector(p,m),f.position.y=i.s.y*(.38+.3*(g.length*37%10)/10)+l*.2,f.lookAt(0,f.position.y,0),n.add(f),g.push({mat:d,rate:.7+g.length*53%10/6,seed:g.length*1.7})}let _=[],v=xp({base:e.fanFrame,brush:.1,spec:.5,rim:1}),y=xp({base:e.blade,brush:.1,spec:.7,rim:1,side:2});for(let[t,r,i,a]of[[-1500,1250,-3900,640],[900,1500,-4300,720]]){let o=new Cn;o.position.set(t,r,i),o.lookAt(0,300,0),n.add(o);let s=new Y(new Xa(a,a*.06,8,80),v);o.add(s);let c=new Y(new Xa(a*1.02,a*.012,6,120),xp({base:e.signal,emissive:!0}));c.position.z=a*.05,o.add(c);let l=new Cn;l.userData.dynamic=!0,o.add(l),l.add(new Y(new Ti(a*.24,a*.26,a*.12,32).rotateX(Math.PI/2),v));for(let e=0;e<9;e++){let t=new ra,n=a*.24,r=a*.93;t.moveTo(n,-a*.05),t.quadraticCurveTo(a*.6,a*.12,r,a*.2),t.quadraticCurveTo(r+a*.04,a*.32,a*.86,a*.42),t.quadraticCurveTo(a*.55,a*.24,n,a*.1);let i=new Y(new qa(t,6),y);i.rotation.z=e/9*Math.PI*2,l.add(i)}for(let e=0;e<4;e++){let t=new Y(new Ci(a*.04,a*1.9,a*.03),v);t.rotation.z=e*Math.PI/4+.4,t.position.z=-a*.06,o.add(t)}Md(l),_.push({rotor:l,speed:.18+a*1e-4})}let b=[],x=e=>b.push(new Ii(e.map(e=>$(...e)),!1,`centripetal`));x([[-3600,520,-1800],[-1800,610,-2100],[0,660,-2300],[1800,600,-2e3],[3600,520,-1700]]),x([[-3400,860,-2600],[-1200,940,-2900],[1300,900,-3e3],[3400,800,-2500]]),x([[2300,420,-2600],[2100,480,-800],[2300,520,900],[2600,460,2400]]),x([[-2200,460,2200],[-2100,540,400],[-2300,600,-1200],[-2500,520,-2800]]),x([[-3e3,330,1400],[-1e3,360,2100],[1200,340,2100],[3e3,320,1300]]);let S={value:0},C=[new J(e.silk),new J(e.amber)];b.forEach((e,r)=>{let i=e.getSpacedPoints(420),a=e.getLength(),o=new Float32Array(2526),s=new Float32Array(1684),c=[];i.forEach((e,t)=>{if(o.set([e.x,e.y+12,e.z,e.x,e.y-12,e.z],t*6),s.set([t/420,1,t/420,0],t*4),t<420){let e=t*2;c.push(e,e+1,e+2,e+1,e+3,e+2)}});let l=new Tr;l.setAttribute(`position`,new ur(o,3)),l.setAttribute(`uv`,new ur(s,2)),l.setIndex(c);let u=new Y(l,new so({glslVersion:Be,vertexShader:`in vec3 position; in vec2 uv; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; uniform vec3 cameraPosition; out vec2 vUv; out float vDist;
        void main(){ vUv = uv; vec4 w = modelMatrix * vec4(position, 1.0); vDist = length(w.xyz - cameraPosition); gl_Position = projectionMatrix * viewMatrix * w; }`,fragmentShader:`precision highp float; uniform float uTime, uLen, uSeed, uCount, uGain; uniform vec3 uColA, uColB; in vec2 vUv; in float vDist;
        layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
        float hash(float n){ return fract(sin(n) * 43758.5453); }
        void main(){
          float band = step(0.5, vUv.y), vv = fract(vUv.y * 2.0);
          float prof = smoothstep(0.14, 0.44, vv) * smoothstep(0.86, 0.56, vv);
          float dir = band > 0.5 ? 1.0 : -1.0, I = 0.0;
          for (int k = 0; k < 16; k++) {
            float fk = float(k); if (fk >= uCount) break;
            float sp = 0.007 + 0.009 * hash(fk * 3.17 + uSeed + band * 7.1);
            float head = fract(hash(fk * 1.73 + uSeed + band * 11.3) + uTime * sp * dir);
            float d = (head - vUv.x) * dir; d += step(d, 0.0);
            float L = uLen * (0.7 + 0.6 * hash(fk * 5.3 + uSeed));
            I += exp(-d / L) * step(d, L * 5.0) * 0.34 + exp(-d / (L * 0.06)) * 1.35 + exp(-abs(d) / (L * 0.18)) * 0.3;
          }
          float haze = smoothstep(560.0, 4200.0, vDist) * 0.5;
          gColor = vec4(mix(uColB, uColA, band), clamp(I * prof * uGain * (1.0 - haze), 0.0, 1.0)); gNormal = vec4(0.0);
        }`,uniforms:{uTime:S,uLen:{value:80/a},uSeed:{value:r*17.31},uCount:{value:t?3:4},uGain:{value:1.5},uColA:{value:C[0]},uColB:{value:C[1]}},transparent:!0,depthWrite:!1,side:2,blending:5,blendEquation:100,blendSrc:204,blendDst:201,blendSrcAlpha:200,blendDstAlpha:201}));u.frustumCulled=!1,u.userData.dynamic=!0,n.add(u)});let w=e=>{let t=Math.floor(e*12)/12;_.forEach(e=>{e.rotor.rotation.z=-t*e.speed}),g.forEach(e=>{let n=Math.sin(t*e.rate*7+e.seed*13);e.mat.uniforms.uGain.value=n>.93?.35:Math.floor(t*12+e.seed*5)%47==0?.5:1}),f.uniforms.uGain.value=Math.floor(e*1.2)%2?1:.15,S.value=e};return w(0),{group:n,update:w,floor:i,blocks:a,signs:g,fans:_}}function Ep(e,t,n,r,i,a,o){e.fillStyle=`#05100d`,e.fillRect(0,0,t,n),e.strokeStyle=a,e.lineWidth=t*.05,e.strokeRect(t*.06,t*.06,t*.88,n-t*.12),e.fillStyle=a,e.textAlign=`center`,e.textBaseline=`middle`;let s=[...r],c=Math.min(t*.7,n*.66/s.length);e.font=`700 ${c*.92}px ${Sp}`,s.forEach((n,r)=>e.fillText(n,t/2,t*.2+c*(r+.55))),e.save(),e.translate(t/2,t*.2+c*s.length+(n-t*.3-c*s.length)/2),e.rotate(Math.PI/2),e.font=`700 ${t*.3}px ${Cp}`,e.fillText(i,0,0),e.restore()}var Dp=(e,t,n)=>new K(e,t,n),Op=class{constructor(e=.5,t=0){this.rt=new Kt(1,1,{type:l,minFilter:o,magFilter:o,depthBuffer:!0}),this.cam=new Lo,this.scale=e,this.plane=new kr,this.clip=new Wt,this.q=new Wt,this.texMat=new q,this.n=Dp(0,1,0),this.o=Dp(0,t,0),this.clipY=t+.8,this.rot=new q,this.cp=Dp(0,0,0),this.la=Dp(0,0,0),this.tg=Dp(0,0,0)}setSize(e,t){this.rt.setSize(Math.max(1,Math.round(e*this.scale)),Math.max(1,Math.round(t*this.scale)))}render(e,t,n,r,i){let{n:a,o,cp:s,la:c,tg:l}=this,u=this.cam;s.setFromMatrixPosition(n.matrixWorld);let d=o.clone().sub(s);if(d.dot(a)>0)return!1;d.reflect(a).negate().add(o),this.rot.extractRotation(n.matrixWorld),c.set(0,0,-1).applyMatrix4(this.rot).add(s),l.copy(o).sub(c).reflect(a).negate().add(o),u.position.copy(d),u.up.set(0,1,0).applyMatrix4(this.rot).reflect(a),u.lookAt(l),u.far=n.far,u.near=n.near,u.updateMatrixWorld(),u.projectionMatrix.copy(n.projectionMatrix),this.texMat.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),this.texMat.multiply(u.projectionMatrix).multiply(u.matrixWorldInverse),this.plane.setFromNormalAndCoplanarPoint(a,Dp(0,this.clipY,0)).applyMatrix4(u.matrixWorldInverse);let f=this.clip.set(this.plane.normal.x,this.plane.normal.y,this.plane.normal.z,this.plane.constant),p=u.projectionMatrix.elements,m=this.q;return m.x=(Math.sign(f.x)+p[8])/p[0],m.y=(Math.sign(f.y)+p[9])/p[5],m.z=-1,m.w=(1+p[10])/p[14],f.multiplyScalar(2/f.dot(m)),p[2]=f.x,p[6]=f.y,p[10]=f.z+1,p[14]=f.w,r.forEach(e=>{e.visible=!1}),e.setRenderTarget(this.rt),e.setClearColor(i,1),e.clear(!0,!0,!0),e.render(t,u),r.forEach(e=>{e.visible=!0}),e.setRenderTarget(null),!0}},kp=[`Power on`,`The core`,`Neural core`,`Enclave`,`Memory`,`I/O`],Ap={cage:100,firewall:80,cipher:132},jp=.25,Mp=[`PWR`,`U1`,`U7`,`U9`,`J4`,`J1`],Np=wt.lerp,Pp=wt.clamp,Fp=e=>e<.5?4*e*e*e:1-(-2*e+2)**3/2,Ip=(e,t,n)=>{let r=Pp((n-e)/(t-e),0,1);return r*r*(3-2*r)},Lp=Math.min(innerWidth,innerHeight)<600,Rp=innerHeight>innerWidth*1.05,zp=(e,t)=>Rp&&t?t:e,Bp=.09,Vp=[[of.cx,of.cz],[(Qf.xW+Qf.xE)/2,(Qf.zN+Qf.zS)/2],[_f.npu.x,_f.npu.z],[_f.enclave.x,_f.enclave.z],[250,-110],[-940,-440]].map(([e,t])=>[e*Bp,t*Bp]),Hp=`M`+Xd([...Vp,Vp[0]]).map(([e,t])=>`${e.toFixed(1)},${t.toFixed(1)}`).join(` L`);document.getElementById(`app`).innerHTML=wd({places:kp,mark:Rd(`logo`,`var(--text)`,`var(--neon)`),route:{viewBox:`-96 -72 192 144`,path:Hp,nodes:Vp},deco:Object.fromEntries([`top`,`systems`,`ai`,`security`,`work`,`contact`].map((e,t)=>[e,`<span class="card__ref" aria-hidden="true">${Mp[t]}</span>`]))});{let e=document.querySelector(`.route__map`),t=`http://www.w3.org/2000/svg`,n=document.createElementNS(t,`g`);n.setAttribute(`class`,`route__board`);let r=(e,r,i,a)=>{let o=document.createElementNS(t,`rect`);o.setAttribute(`x`,(e-i/2)*Bp),o.setAttribute(`y`,(r-a/2)*Bp),o.setAttribute(`width`,i*Bp),o.setAttribute(`height`,a*Bp),n.appendChild(o)};r(0,0,2e3,1500),r(of.cx,of.cz,150,432),r(-470,330,200,200),r(_f.enclave.x,_f.enclave.z,260,220),r(-436,560,572,20),r(-436,680,572,18),r(-942,-435,110,570),r((Qf.xW+Qf.xE)/2,(Qf.zN+Qf.zS)/2,Qf.xE-Qf.xW,Qf.zS-Qf.zN);for(let e=0;e<4;e++)r(250+e*56,-108,10,744);e.insertBefore(n,e.firstChild)}var Up=new class{constructor(){this.parallax=5,this.imgs=[],this.flash=0,this.spin=0,this.pingN=0}palette(e,t){if(this.built){let e=new URL(location.href);e.searchParams.set(`palette`,t),location.replace(e);return}let n=this.pal=e.gl;Pd.uZenith.value.set(n.zenith),Pd.uHorizon.value.set(n.skyHorizon),Pd.uGlow.value.set(n.skyGlow),Pd.uStreak.value.set(n.skyStreak),Pd.uMoon.value.set(n.skyHorizon),Pd.uMoonSize.value=1e-4,Pd.uStars.value=0,Pd.uDot.value.set(n.ink),Pd.uBand.value=.11,Pd.uLampDir.value.set(.1,.36,-.93).normalize(),Pd.uLampCol.value.set(n.lamp??n.skyGlow),Pd.uLampAmt.value=.55,Pd.uLampPow.value=5,Q.uShadeTint.value.set(n.shade),Q.uDotInk.value.set(n.ink),Q.uRimCol.value.set(n.rim),Q.uGlint.value.set(n.glint),Q.uFillCol.value.set(n.uplight),Q.uFillAmt.value=.2,Z.uInk.value.set(n.ink),Z.uGradeShadow.value.set(n.gradeShadow),Z.uGradeHigh.value.set(n.gradeHigh),Z.uImpInk.value.set(n.ink),Z.uImpPaper.value.set(n.paperFlash),Z.uImpAccent.value.set(n.signal),Z.uFogCol.value.set(n.fog),Z.uFogHorizon.value.set(n.fogHorizon??n.fog),Z.uSpeedCol.value.set(n.streak),Wd.uMask.value.set(n.mask),Wd.uMask2.value.set(n.mask2),Wd.uSilk.value.set(n.silk),Wd.uPad.value.set(n.pad),Wd.uSheen.value.set(n.sheen),Wd.uSignal.value.set(n.signal),Wd.uHot.value.set(n.hot)}async build(e){this.world=e;let{scene:t,camera:n}=e;n.near=1,n.far=7e3,await document.fonts.ready,await Promise.all([`700 40px "Chakra Petch"`,`600 40px "Chakra Petch"`,`700 40px "Zen Kaku Gothic New"`,`600 20px "JetBrains Mono Variable"`,`700 20px "JetBrains Mono Variable"`].map(e=>document.fonts.load(e,`演算神経認証記憶接続電源制御注意高温 AZ09`).catch(()=>{})));let r=this.pal,i=performance.now(),a=e=>{Dd.has(`debug`)&&console.warn(e,Math.round(performance.now()-i))};Hd(7);let o=this.silk=new qd(Lp?2048:4096),s=new $d(r,o);s.keep(...Qf.keep),s.keep(_f.enclave.x-190,_f.enclave.z-170,_f.enclave.x+190,_f.enclave.z+170),Wd.uSilkTex.value=o.tex,Wd.uLitC.value.set(of.cx,of.cz),this.board=Kd(),t.add(this.board),this.tower=ff(r,o),t.add(this.tower.group),a(`tower`);let c=xf(r,s,o);c.name=`vrm`,t.add(c),this.mem=Cf(r,s,o,pd,this),t.add(this.mem.group),this.npu=Tf(r,s,o),t.add(this.npu.group),this.enc=Wf(r,s,o,{face:$(490,0,640)}),t.add(this.enc.group),this.gantry=cp(r,s,o),t.add(this.gantry.group),this.gantry.onComplete=()=>{let e=this.world,t=e.toScreen($(-200,10,262));e.impact.hit({seq:`accent`,center:[t.x/e.view.w,1-t.y/e.view.h],shake:.25}),e.api().sfx.play(`snap`,{gain:.7})},this.enc.set(Dd.get(`enclave`)||`cage`),this.io=Of(r,s,o),t.add(this.io.group),this.rest=kf(r,s,o),t.add(this.rest.group),a(`districts`);let l=new Qd;Af(l),this.traces=l.mesh(r),t.add(this.traces);let u=s.build();if(u.name=`parts`,t.add(u),a(`parts`),o.finish(),a(`silk`),e.backdrop.visible=!1,this.sky=Fd({radius:5200,px:Q.uPx}),t.add(this.sky),this.dust=jf(r,Lp?900:1600),t.add(this.dust),this.city=Tp(r,{phone:Lp}),t.add(this.city.group),a(`city`),this.mirror=new Op(Lp?.35:.5),Wd.uRefl.value=this.mirror.rt.texture,Wd.uReflAmt.value=Dd.has(`norefl`)?0:Dd.has(`refl`)?+Dd.get(`refl`):.75,Wd.uReflDebug.value=Dd.has(`refldebug`)?+(Dd.get(`refldebug`)||1):0,this.mirrorHide=[this.board,this.sky,this.dust,this.traces,this.io.shafts].filter(Boolean),this.fogCol=new J(this.pal.fog),Z.tPlane.value=up(),Z.uPlaneC.value.set(...lp.source),Z.uPlaneCol.value.set(this.pal.signal),Z.uPlaneHot.value.set(this.pal.hot),pd.forEach((e,t)=>{let n=new Image;n.onload=()=>{this.imgs[t]=n,this.mem.screens[t].userData.redraw()},n.src=e.image}),Object.entries({gantry:this.gantry.group,tower:this.tower.group,memory:this.mem.group,neural:this.npu.group,enclave:this.enc.group,io:this.io.group,rest:this.rest.group,traces:this.traces,city:this.city.group,sky:this.sky,dust:this.dust,board:this.board}).forEach(([e,t])=>{t&&(t.name=e)}),!Dd.has(`nobatch`)){let e=Md(t,{keep:[this.board,this.sky,this.dust,this.traces,this.io.shafts,this.city.floor].filter(Boolean)});a(`batch ${e.before} -> ${e.after}`)}this.built=!0,a(`built`);let{cx:d,cz:f}=of,p=(e,t,n,r=220)=>{let i=new Lo(e.fov,1.6,1,10);return i.position.copy(e.p),i.lookAt(e.t),i.updateMatrixWorld(),new K(t,n,.5).unproject(i).sub(e.p).normalize().multiplyScalar(r).add(e.p).toArray()},m=[{id:`top`,p:$(-230,132,1080),t:$(-120,356,-120),fov:48},{id:`systems`,p:$(-200,240,560),t:zp($(-120,40,240),$(-190,40,250)),fov:46},{id:`ai`,p:zp($(-490,70,620),$(-480,112,610)),t:zp($(-410,172,330),$(-470,176,330)),fov:50},{id:`security`,p:$(490,130,640),t:zp($(585,Ap[this.enc.current]??100,92),$(700,Ap[this.enc.current]??100,140)),fov:50},{id:`work`,...this.exhibitPose(1)},{id:`contact`,p:$(-610,118,-282),t:$(-990,176,-446),fov:54}],h=[[-.58,.36],[.5,.02],[.5,-.3],[-.52,.06],[-.55,.04],[.5,.06]];m.forEach((e,t)=>{e.anchor=p(e,...h[t])}),this.stops=m;let g=(e,t,n)=>$(e,t,n);return{stops:m,legs:[{look:.1,dur:2.4,pts:[{p:g(-232,250,900),t:g(-125,300,-60),fov:48},{p:g(-212,300,700),t:g(-125,120,160),fov:47}]},{look:.15,dur:2.3,pts:[{p:g(-290,190,560),t:g(-420,140,330),fov:48},{p:g(-380,110,640),t:g(-470,160,330),fov:50}]},{look:.4,dur:3.4,pts:[{p:g(-440,44,700),t:g(-300,70,520),fov:54},{p:g(-250,30,724),t:g(100,40,640),fov:58},{p:g(100,32,724),t:g(450,60,660),fov:60},{p:g(340,64,704),t:g(620,160,300),fov:54}]},{look:.15,dur:3,pts:[{p:g(430,230,470),t:g(440,200,200),fov:50},{p:g(330,320,260),t:g(330,170,0),fov:52},{p:g(150,230,170),t:g(260,110,-100),fov:50}]},{look:.45,dur:3.6,warp:[[0,0],[.42,.38],[.62,.6],[1,1]],pts:[{p:g(80,110,-120),t:g(140,110,-400),fov:56},{p:g(115,125,-330),t:g(40,140,-640),fov:60},{p:g(60,145,-470),t:g(-200,150,-680),fov:60},{p:g(-120,155,-560),t:g(-450,155,-640),fov:60},{p:g(-330,160,-575),t:g(-700,150,-500),fov:58},{p:g(-520,140,-460),t:g(-900,170,-430),fov:56}]},{look:0,dur:5.6,warp:[[0,0],[.38,.47],[.62,.53],[1,1]],pts:[{p:g(-520,420,-160),t:g(-600,120,-300),fov:56},{p:g(-300,1e3,60),t:g(-260,100,-180),fov:52},{p:g(0,1650,290),t:g(0,0,0),fov:50},{p:g(-200,560,960),t:g(-120,360,-120),fov:50}]}],closed:!0,speed:420,minT:1.9,maxT:3.4,speedRef:320,arriveImpact:`hit`,phonePull:.32,phoneFov:12,phoneLift:.14,wrap:!0,rig:{profile:`minjerk`,lookAhead:.35,damp:9,settle:3}}}exhibitPose(e){let t=vf[e];return{p:$(30,122,t+196),t:$(246,100,t-34),fov:48,roll:0}}depart(e,t,n){t===4&&n.ui.setProject(1,1),e===3&&this.enc.lock(),e===1&&this.gantry.stop()}arrive(e,t){e===4&&this.focusExhibit(t.ui.project),e===3&&this.enc.unlock(t.time),e===1&&this.gantry.start(t.time)}project(e){this.focusExhibit(e)}focusExhibit(e){this.mem.seat(e,this.world.time);let t=this.stops[4],n=this.exhibitPose(e);this.world.rig.nudge(n.p.clone().sub(t.p),n.t.clone().sub(t.t))}arriveSeq(e,t){return e===0&&t===5?`big`:null}impactCenter(e,t){let n=e===0?this.tower.crownPos:t.route.stops[e].t,r=t.toScreen(n.clone?n.clone():$(...n));return[r.x/t.view.w,1-r.y/t.view.h]}partAt(e){switch(e){case 0:return this.tower.crownPos;case 1:return $(-200,10,262);case 2:return this.npu.center;case 3:{let[e,t,n]={cage:[56,0,0],firewall:[64,62,0],cipher:[136,57,-27]}[this.enc.current]||[56,0,0],r=$(this.stops[3].p.x-_f.enclave.x,0,this.stops[3].p.z-_f.enclave.z).normalize();return $(_f.enclave.x,e,_f.enclave.z).addScaledVector(r,t).addScaledVector($(r.z,0,-r.x),n)}case 4:return $(244,108,vf[this.world.ui.project]);case 5:return $(-1004,252,-435);default:return null}}ready(e){if(document.documentElement.classList.add(`ready`),this.cards=pp({parts:e=>this.partAt(e),lock:this.enc.current,setLock:t=>{let n=this.stops[3],r=n.t.y,i=Ap[t]??100;this.enc.set(t),n.t.y=i,e.rig.index===3&&!e.rig.flying&&(e.rig.pose.t.y=i,e.rig.offset.t.y+=r-i,this.enc.unlock(e.time))}}),Ed||Dd.has(`skipintro`)){Wd.uLitR.value=1e5,this.setOn(1e5),this.crown(1);return}let t=this.stops[0];this.intro={t:0,pc:new Ii([$(0,1650,290),$(-90,1080,730),$(-205,430,1010),t.p.clone()],!1,`centripetal`),tc:new Ii([$(0,0,0),$(-40,80,100),$(-110,300,-60),t.t.clone()],!1,`centripetal`),warp:id([[0,0],[.35,.2],[.8,.92],[1,1]])},Wd.uLitR.value=0,this.setOn(0),this.tower.floorMat.uniforms.uLitY.value=0,this.crown(0),document.documentElement.classList.add(`booting`),Z.uFadeCol.value.set(this.pal.ink),Z.uFade.value=1,Z.uPlaneR.value=0,Z.uPlaneAmt.value=0,Z.uPlaneLed.value=0,e.nav.lockUntil=performance.now()+2900+jp*1e3,document.querySelector(`.stop--top`).classList.remove(`is-current`);let n=e.rig;n.pose.p.copy(this.intro.pc.getPoint(0)),n.pose.t.copy(this.intro.tc.getPoint(0)),n.pose.fov=50,n.snap?.()}crown(e){let t=this.pal;this.tower.front.uniforms.uBase.value.set(t.signal).multiplyScalar(Np(.05,1,e)),this.tower.back.uniforms.uBase.value.set(t.markBack).multiplyScalar(Np(.05,1,e))}setOn(e){let t=t=>Pp((e-t)/90,0,1),n=this.pal;this.tower.ringMat.uniforms.uOn.value=t(120),this.heatOn=t(30),this.tower.heatMat.uniforms.uOn.value=this.heatOn*(this.heatK??1),this.tower.lineMat.uniforms.uBase.value.set(n.signal).multiplyScalar(Np(.06,1,t(240))),this.mem.bars.forEach((e,n)=>{e.material.uniforms.uOn.value=t(330+n*56)}),this.npu.edgeMat.uniforms.uGain.value=Np(.04,1,t(560)),this.npu.nodeMat.uniforms.uGain.value=Np(.04,1,t(560)),this.npu.power=t(600),this.npu.beam.material.uniforms.uAmt.value=t(560),this.npu.lattice.visible=t(520)>0,this.enc.laserMat.uniforms.uBase.value.set(n.laser).multiplyScalar(Np(.05,1,t(600)))}update(e,t,n){let r=n.camera;if(this.intro){let t=this.intro;t.t+=e;let r=t.t,i=Math.max(0,r-jp),a=n.rig;Z.uPlaneLed.value=Ip(.04,.1,r)*(1-Ip(.9,1.3,i))*1.5;let o=n.api().sfx;for(t.k=t.k??0;t.k<6&&r>[.05,.12,.2,.27,.33,.38][t.k];)o.play(t.k===5?`power`:`relay`,{gain:.8}),t.k++;Z.uPlaneAmt.value=Ip(.1,.16,i)*(1-Ip(1.2,1.65,i)),Z.uPlaneR.value=Fp(Pp((i-.14)/.8,0,1))*1900,Z.uFade.value=1-.5*Ip(.3,.9,i)-.5*Ip(1,1.45,i);let s=Fp(Pp((i-.85)/1,0,1))*1600;Wd.uLitR.value=s,this.setOn(s),this.tower.floorMat.uniforms.uLitY.value=Np(150,800,Fp(Pp((i-1.2)/.7,0,1))),this.crown(+(i>1.9));let c=t.warp(Pp((i-.95)/.95,0,1));if(a.pose.p.copy(t.pc.getPointAt(c)),a.pose.t.copy(t.tc.getPointAt(c)),a.pose.fov=Np(50,this.stops[0].fov,c),i>1.92&&!t.hit){t.hit=!0;let e=n.toScreen(this.tower.crownPos.clone());n.impact.hit({seq:`big`,center:[e.x/n.view.w,1-e.y/n.view.h],shake:1}),n.api().sfx.play(`slam`)}i>2.05&&!t.card&&(t.card=!0,n.setCard(0,!0),document.documentElement.classList.remove(`booting`)),i>=2.5&&(this.intro=null,document.documentElement.classList.remove(`booting`),Wd.uLitR.value=1e5,this.setOn(1e5),this.tower.floorMat.uniforms.uLitY.value=1e5,this.crown(1),Z.uFade.value=0,Z.uPlaneAmt.value=0,Z.uPlaneLed.value=0)}else{let t=n.rig.flight;if(t&&t.from===5&&t.to===0&&!Ed){let e=t.t/t.dur,r=Ip(.2,.34,e)*(1-Ip(.62,.76,e));Z.uPlaneAmt.value=r,Z.uPlaneR.value=1900*Ip(.22,.46,e),Z.uFade.value=.32*r,e>.3&&!this.revealed&&(this.revealed=!0,n.api().sfx.play(`power`))}else(Z.uPlaneAmt.value>0||Z.uFade.value>0)&&(Z.uPlaneAmt.value=Math.max(0,Z.uPlaneAmt.value-e*3),Z.uFade.value=Math.max(0,Z.uFade.value-e*3),this.revealed=!1)}Q.uKeyDir.value.copy($(-.5,.78,.42).normalize().transformDirection(r.matrixWorldInverse)),Q.uFillDir.value.copy($(.55,-.6,-.35).normalize().transformDirection(r.matrixWorldInverse)),this.sky.position.copy(r.position),this.dust.material.uniforms.uCam.value.copy(r.position);let i=+!!n.rig.flying;Zd.uBoost.value+=(i+this.flash-Zd.uBoost.value)*(1-Math.exp(-e*4)),this.mem.bars.forEach(e=>{e.material.uniforms.uBoost.value=Zd.uBoost.value}),this.flash=Math.max(0,this.flash-e*.8),this.spin=Math.max(0,this.spin-e*.6),this.fanT=(this.fanT||0)+e*(this.intro?Ip(1,1.9,this.intro.t-jp):1)+this.spin*e*3,this.tower.update(this.fanT),this.npu.update(t,this.flash,+(n.rig.index===2&&!n.rig.flying)),this.heatK=(this.heatK??1)+((n.rig.index===2&&!this.intro?.35:1)-(this.heatK??1))*(1-Math.exp(-e*2.2)),this.tower.heatMat.uniforms.uOn.value=(this.heatOn??1)*this.heatK,this.enc.update(t,e,n.api().sfx,n.rig.index===3),this.gantry.update(t,e,n.api().sfx),this.mem.updateSeat(t,n.api().sfx,e=>{let t=n.toScreen($(244,60,vf[e]));n.impact.hit({seq:`soft`,center:[t.x/n.view.w,1-t.y/n.view.h],shake:.35})}),this.rest.leds[3].uniforms.uBase.value.set(Math.floor(t*2)%2?this.pal.signal:this.pal.ledOff),this.rest.updateLeds(t),this.io.update(t),this.city.update(t),n.api().sfx.fan(Math.min(1,(n.rig.flying?.6:0)+this.spin*.5));let a=n.rig.index===4&&!n.rig.flying;this.mem.screens.forEach((t,r)=>{let i=t.material.uniforms.uGain,o=a?r===n.ui.project?1:.5:.2;i.value+=(o-i.value)*(1-Math.exp(-e*5)),t.userData.flash>0&&(i.value=Math.max(i.value,1+t.userData.flash))})}layout(e){this.mirror?.setSize(e.w*e.dpr,e.h*e.dpr),Wd.uScreen.value.set(e.w*e.dpr,e.h*e.dpr)}preRender(e){if(this.cards?.update(e),!this.mirror||Wd.uReflAmt.value<=0)return;e.camera.updateMatrixWorld();let t=e.camera,n=this.mirrorLast||={p:new K(1e9,0,0),q:new Tt,step:-1};n.p.distanceToSquared(t.position)<.04&&Math.abs(n.q.dot(t.quaternion))>.999999&&n.step===Q.uStep.value||(n.p.copy(t.position),n.q.copy(t.quaternion),n.step=Q.uStep.value,this.mirror.render(e.renderer,e.scene,e.camera,this.mirrorHide,this.fogCol)&&Wd.uReflMat.value.copy(this.mirror.texMat))}click(e,t,n){let r=t.intersectObjects(this.mem.screens,!1);if(r.length){let e=r[0].object.userData.exhibit;if(n.rig.index!==4){n.nav.go(4,`click`,!0),n.ui.setProject(e,1);return}e===n.ui.project?Od(pd[e].url):n.ui.setProject(e,e>n.ui.project?1:-1);return}let i=n.api().sfx,a=this.npu.center;if(t.ray.distanceToPoint(a)<95){this.flash=1.2,n.impact.hit({seq:`accent`,center:[e.clientX/innerWidth,1-e.clientY/innerHeight],shake:.35}),i.play(`snap`);return}let o=$(of.cx+of.depth/2+14,(of.finY0+of.finY1)/2,of.cz);if(t.ray.distanceToPoint(o)<of.fanR){this.spin=1.5,n.impact.hit({seq:`soft`,center:[e.clientX/innerWidth,1-e.clientY/innerHeight],shake:.3}),i.play(`whoosh`,{gain:.6});return}let s=new K;t.ray.intersectPlane(new kr($(0,1,0),0),s)&&Wd.uPing.value[this.pingN++%4].set(s.x,s.z,Q.uStep.value,1),n.impact.hit({seq:`soft`,center:[e.clientX/innerWidth,1-e.clientY/innerHeight],shake:.25}),i.play(`snap`,{gain:.6})}},Wp=new kd({canvas:document.querySelector(`canvas.gl`),director:Up,places:kp,palettes:mp,palette:Dd.get(`palette`)||`verdigris`,pipeline:{bloom:!0}});Z.uFogAmt.value=1,Z.uFogNear.value=560,Z.uFogFar.value=4200,Z.uFogLine.value=.85,Z.uBloomAmt.value=.55,Z.uBloomDots.value=.6,Z.uMisregPx.value=1,Z.uGrain.value=.035,Z.uVignette.value=.4,Z.uGradeAmt.value=.18,Z.uDepthK.value=.045,Z.uNormalK.value=.35,Z.uHFogAmt.value=.55,Z.uHFogY.value=0,Z.uHFogK.value=.012,Z.uFogDirAmt.value=.8,Z.uFogGlow.value=.6,Dd.has(`nolut`)||Fu(Du(Nd),Dd.has(`lut`)?+Dd.get(`lut`):1),await Wp.start(),window.__xini.ready=!0;