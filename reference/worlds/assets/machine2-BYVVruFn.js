(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=1e3,t=1001,n=1002,r=1003,i=1004,a=1005,o=1006,s=1007,c=1008,l=1009,u=1010,d=1011,f=1012,p=1013,m=1014,h=1015,g=1016,_=1017,v=1018,y=1020,b=35902,x=35899,S=1021,C=1022,w=1023,T=1026,E=1027,D=1028,O=1029,k=1030,A=1031,j=1033,M=33776,N=33777,P=33778,F=33779,I=35840,ee=35841,te=35842,ne=35843,re=36196,ie=37492,ae=37496,oe=37488,L=37489,se=37490,ce=37491,le=37808,ue=37809,de=37810,fe=37811,pe=37812,me=37813,he=37814,ge=37815,_e=37816,ve=37817,ye=37818,be=37819,xe=37820,Se=37821,Ce=36492,we=36494,Te=36495,Ee=36283,De=36284,Oe=36285,ke=36286,Ae=2300,R=2301,je=2302,Me=2303,Ne=2400,z=2401,Pe=2402,B=3200,Fe=`srgb`,Ie=`srgb-linear`,Le=`linear`,Re=`srgb`,ze=7680,Be=35044,Ve=`300 es`,He=2e3;function Ue(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function We(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Ge(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function Ke(){let e=Ge(`canvas`);return e.style.display=`block`,e}var qe={};function Je(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function Ye(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function V(...e){e=Ye(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function H(...e){e=Ye(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Xe(...e){let t=e.join(` `);t in qe||(qe[t]=!0,V(...e))}function Ze(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var Qe={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},$e=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},et=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),tt=1234567,nt=Math.PI/180,rt=180/Math.PI;function it(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(et[e&255]+et[e>>8&255]+et[e>>16&255]+et[e>>24&255]+`-`+et[t&255]+et[t>>8&255]+`-`+et[t>>16&15|64]+et[t>>24&255]+`-`+et[n&63|128]+et[n>>8&255]+`-`+et[n>>16&255]+et[n>>24&255]+et[r&255]+et[r>>8&255]+et[r>>16&255]+et[r>>24&255]).toLowerCase()}function U(e,t,n){return Math.max(t,Math.min(n,e))}function at(e,t){return(e%t+t)%t}function ot(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function st(e,t,n){return e===t?0:(n-e)/(t-e)}function ct(e,t,n){return(1-n)*e+n*t}function lt(e,t,n,r){return ct(e,t,1-Math.exp(-n*r))}function ut(e,t=1){return t-Math.abs(at(e,t*2)-t)}function dt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function ft(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function pt(e,t){return e+Math.floor(Math.random()*(t-e+1))}function mt(e,t){return e+Math.random()*(t-e)}function ht(e){return e*(.5-Math.random())}function gt(e){e!==void 0&&(tt=e);let t=tt+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function _t(e){return e*nt}function vt(e){return e*rt}function yt(e){return e>0&&Number.isInteger(e)&&2**Math.round(Math.log2(e))===e}function bt(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function xt(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function St(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:V(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function Ct(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function wt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var Tt={DEG2RAD:nt,RAD2DEG:rt,generateUUID:it,clamp:U,euclideanModulo:at,mapLinear:ot,inverseLerp:st,lerp:ct,damp:lt,pingpong:ut,smoothstep:dt,smootherstep:ft,randInt:pt,randFloat:mt,randFloatSpread:ht,seededRandom:gt,degToRad:_t,radToDeg:vt,isPowerOfTwo:yt,ceilPowerOfTwo:bt,floorPowerOfTwo:xt,setQuaternionFromProperEuler:St,normalize:wt,denormalize:Ct},W=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=U(this.x,e.x,t.x),this.y=U(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=U(this.x,e,t),this.y=U(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(U(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(U(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Et=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:V(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(U(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},G=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ot.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ot.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=U(this.x,e.x,t.x),this.y=U(this.y,e.y,t.y),this.z=U(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=U(this.x,e,t),this.y=U(this.y,e,t),this.z=U(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(U(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Dt.copy(this).projectOnVector(e),this.sub(Dt)}reflect(e){return this.sub(Dt.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(U(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Dt=new G,Ot=new Et,kt=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return Xe(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(At.makeScale(e,t)),this}rotate(e){return Xe(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(At.makeRotation(-e)),this}translate(e,t){return Xe(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(At.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},At=new kt,jt=new kt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Mt=new kt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Nt(){let e={enabled:!0,workingColorSpace:Ie,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=Ft(e.r),e.g=Ft(e.g),e.b=Ft(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=It(e.r),e.g=It(e.g),e.b=It(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Le:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return Xe(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return Xe(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[Ie]:{primaries:t,whitePoint:r,transfer:Le,toXYZ:jt,fromXYZ:Mt,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Fe},outputColorSpaceConfig:{drawingBufferColorSpace:Fe}},[Fe]:{primaries:t,whitePoint:r,transfer:Re,toXYZ:jt,fromXYZ:Mt,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Fe}}}),e}var Pt=Nt();function Ft(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function It(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Lt,Rt=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Lt===void 0&&(Lt=Ge(`canvas`)),Lt.width=e.width,Lt.height=e.height;let t=Lt.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Lt}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Ge(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Ft(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Ft(t[e]/255)*255):t[e]=Ft(t[e]);return{data:t,width:e.width,height:e.height}}return V(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},zt=0,Bt=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:zt++}),this.uuid=it(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Vt(r[t].image)):e.push(Vt(r[t]))}else e=Vt(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Vt(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Rt.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(V(`Texture: Unable to serialize Texture.`),{})}var Ht=0,Ut=new G,Wt=class r extends $e{constructor(e=r.DEFAULT_IMAGE,n=r.DEFAULT_MAPPING,i=t,a=t,s=o,u=c,d=w,f=l,p=r.DEFAULT_ANISOTROPY,m=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ht++}),this.uuid=it(),this.name=``,this.source=new Bt(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=s,this.minFilter=u,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=f,this.offset=new W(0,0),this.repeat=new W(1,1),this.center=new W(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=m,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ut).x}get height(){return this.source.getSize(Ut).y}get depth(){return this.source.getSize(Ut).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){V(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?V(`Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(r){if(this.mapping!==300)return r;if(r.applyMatrix3(this.matrix),r.x<0||r.x>1)switch(this.wrapS){case e:r.x-=Math.floor(r.x);break;case t:r.x=r.x<0?0:1;break;case n:Math.abs(Math.floor(r.x)%2)===1?r.x=Math.ceil(r.x)-r.x:r.x-=Math.floor(r.x)}if(r.y<0||r.y>1)switch(this.wrapT){case e:r.y-=Math.floor(r.y);break;case t:r.y=r.y<0?0:1;break;case n:Math.abs(Math.floor(r.y)%2)===1?r.y=Math.ceil(r.y)-r.y:r.y-=Math.floor(r.y)}return this.flipY&&(r.y=1-r.y),r}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Wt.DEFAULT_IMAGE=null,Wt.DEFAULT_MAPPING=300,Wt.DEFAULT_ANISOTROPY=1;var Gt=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=U(this.x,e.x,t.x),this.y=U(this.y,e.y,t.y),this.z=U(this.z,e.z,t.z),this.w=U(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=U(this.x,e,t),this.y=U(this.y,e,t),this.z=U(this.z,e,t),this.w=U(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(U(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Kt=class extends $e{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:o,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Gt(0,0,e,t),this.scissorTest=!1,this.viewport=new Gt(0,0,e,t),this.textures=[];let r=new Wt({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:o,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Bt(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},qt=class extends Kt{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Jt=class extends Wt{constructor(e=null,n=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=r,this.minFilter=r,this.wrapR=t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Yt=class extends Wt{constructor(e=null,n=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=r,this.minFilter=r,this.wrapR=t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},K=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/Xt.setFromMatrixColumn(e,0).length(),i=1/Xt.setFromMatrixColumn(e,1).length(),a=1/Xt.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Qt,e,$t)}lookAt(e,t,n){let r=this.elements;return nn.subVectors(e,t),nn.lengthSq()===0&&(nn.z=1),nn.normalize(),en.crossVectors(n,nn),en.lengthSq()===0&&(Math.abs(n.z)===1?nn.x+=1e-4:nn.z+=1e-4,nn.normalize(),en.crossVectors(n,nn)),en.normalize(),tn.crossVectors(nn,en),r[0]=en.x,r[4]=tn.x,r[8]=nn.x,r[1]=en.y,r[5]=tn.y,r[9]=nn.y,r[2]=en.z,r[6]=tn.z,r[10]=nn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],N=r[3],P=r[7],F=r[11],I=r[15];return i[0]=a*x+o*T+s*k+c*N,i[4]=a*S+o*E+s*A+c*P,i[8]=a*C+o*D+s*j+c*F,i[12]=a*w+o*O+s*M+c*I,i[1]=l*x+u*T+d*k+f*N,i[5]=l*S+u*E+d*A+f*P,i[9]=l*C+u*D+d*j+f*F,i[13]=l*w+u*O+d*M+f*I,i[2]=p*x+m*T+h*k+g*N,i[6]=p*S+m*E+h*A+g*P,i[10]=p*C+m*D+h*j+g*F,i[14]=p*w+m*O+h*M+g*I,i[3]=_*x+v*T+y*k+b*N,i[7]=_*S+v*E+y*A+b*P,i[11]=_*C+v*D+y*j+b*F,i[15]=_*w+v*O+y*M+b*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=Xt.set(r[0],r[1],r[2]).length(),o=Xt.set(r[4],r[5],r[6]).length(),s=Xt.set(r[8],r[9],r[10]).length();i<0&&(a=-a),Zt.copy(this);let c=1/a,l=1/o,u=1/s;return Zt.elements[0]*=c,Zt.elements[1]*=c,Zt.elements[2]*=c,Zt.elements[4]*=l,Zt.elements[5]*=l,Zt.elements[6]*=l,Zt.elements[8]*=u,Zt.elements[9]*=u,Zt.elements[10]*=u,t.setFromRotationMatrix(Zt),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=He,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=He,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Xt=new G,Zt=new K,Qt=new G(0,0,0),$t=new G(1,1,1),en=new G,tn=new G,nn=new G,rn=new K,an=new Et,on=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(U(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-U(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(U(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-U(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(U(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-U(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:V(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return rn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(rn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return an.setFromEuler(this),this.setFromQuaternion(an,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};on.DEFAULT_ORDER=`XYZ`;var sn=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},cn=0,ln=new G,un=new Et,dn=new K,fn=new G,pn=new G,mn=new G,hn=new Et,gn=new G(1,0,0),_n=new G(0,1,0),vn=new G(0,0,1),yn={type:`added`},bn={type:`removed`},xn={type:`childadded`,child:null},Sn={type:`childremoved`,child:null},Cn=class e extends $e{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:cn++}),this.uuid=it(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new G,n=new on,r=new Et,i=new G(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new K},normalMatrix:{value:new kt}}),this.matrix=new K,this.matrixWorld=new K,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new sn,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return un.setFromAxisAngle(e,t),this.quaternion.multiply(un),this}rotateOnWorldAxis(e,t){return un.setFromAxisAngle(e,t),this.quaternion.premultiply(un),this}rotateX(e){return this.rotateOnAxis(gn,e)}rotateY(e){return this.rotateOnAxis(_n,e)}rotateZ(e){return this.rotateOnAxis(vn,e)}translateOnAxis(e,t){return ln.copy(e).applyQuaternion(this.quaternion),this.position.add(ln.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(gn,e)}translateY(e){return this.translateOnAxis(_n,e)}translateZ(e){return this.translateOnAxis(vn,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(dn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?fn.copy(e):fn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),pn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?dn.lookAt(pn,fn,this.up):dn.lookAt(fn,pn,this.up),this.quaternion.setFromRotationMatrix(dn),r&&(dn.extractRotation(r.matrixWorld),un.setFromRotationMatrix(dn),this.quaternion.premultiply(un.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(H(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(yn),xn.child=e,this.dispatchEvent(xn),xn.child=null):H(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(bn),Sn.child=e,this.dispatchEvent(Sn),Sn.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),dn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),dn.multiply(e.parent.matrixWorld)),e.applyMatrix4(dn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(yn),xn.child=e,this.dispatchEvent(xn),xn.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(pn,e,mn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(pn,hn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};Cn.DEFAULT_UP=new G(0,1,0),Cn.DEFAULT_MATRIX_AUTO_UPDATE=!0,Cn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var wn=class extends Cn{constructor(){super(),this.isGroup=!0,this.type=`Group`}},Tn={type:`move`},En=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new wn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new wn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new wn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Tn)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new wn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Dn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},On={h:0,s:0,l:0},kn={h:0,s:0,l:0};function An(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var q=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Fe){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Pt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Pt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Pt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Pt.workingColorSpace){if(e=at(e,1),t=U(t,0,1),n=U(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=An(i,r,e+1/3),this.g=An(i,r,e),this.b=An(i,r,e-1/3)}return Pt.colorSpaceToWorking(this,r),this}setStyle(e,t=Fe){function n(t){t!==void 0&&parseFloat(t)<1&&V(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:V(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);V(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Fe){let n=Dn[e.toLowerCase()];return n===void 0?V(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ft(e.r),this.g=Ft(e.g),this.b=Ft(e.b),this}copyLinearToSRGB(e){return this.r=It(e.r),this.g=It(e.g),this.b=It(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Fe){return Pt.workingToColorSpace(jn.copy(this),e),Math.round(U(jn.r*255,0,255))*65536+Math.round(U(jn.g*255,0,255))*256+Math.round(U(jn.b*255,0,255))}getHexString(e=Fe){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Pt.workingColorSpace){Pt.workingToColorSpace(jn.copy(this),t);let n=jn.r,r=jn.g,i=jn.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Pt.workingColorSpace){return Pt.workingToColorSpace(jn.copy(this),t),e.r=jn.r,e.g=jn.g,e.b=jn.b,e}getStyle(e=Fe){Pt.workingToColorSpace(jn.copy(this),e);let t=jn.r,n=jn.g,r=jn.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(On),this.setHSL(On.h+e,On.s+t,On.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(On),e.getHSL(kn);let n=ct(On.h,kn.h,t),r=ct(On.s,kn.s,t),i=ct(On.l,kn.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},jn=new q;q.NAMES=Dn;var Mn=class extends Cn{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new on,this.environmentIntensity=1,this.environmentRotation=new on,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Nn=new G,Pn=new G,Fn=new G,In=new G,Ln=new G,Rn=new G,zn=new G,Bn=new G,Vn=new G,Hn=new G,Un=new Gt,Wn=new Gt,Gn=new Gt,Kn=class e{constructor(e=new G,t=new G,n=new G){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Nn.subVectors(e,t),r.cross(Nn);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Nn.subVectors(r,t),Pn.subVectors(n,t),Fn.subVectors(e,t);let a=Nn.dot(Nn),o=Nn.dot(Pn),s=Nn.dot(Fn),c=Pn.dot(Pn),l=Pn.dot(Fn),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,In)!==null&&In.x>=0&&In.y>=0&&In.x+In.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,In)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,In.x),s.addScaledVector(a,In.y),s.addScaledVector(o,In.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Un.setScalar(0),Wn.setScalar(0),Gn.setScalar(0),Un.fromBufferAttribute(e,t),Wn.fromBufferAttribute(e,n),Gn.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Un,i.x),a.addScaledVector(Wn,i.y),a.addScaledVector(Gn,i.z),a}static isFrontFacing(e,t,n,r){return Nn.subVectors(n,t),Pn.subVectors(e,t),Nn.cross(Pn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Nn.subVectors(this.c,this.b),Pn.subVectors(this.a,this.b),Nn.cross(Pn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Ln.subVectors(r,n),Rn.subVectors(i,n),Bn.subVectors(e,n);let s=Ln.dot(Bn),c=Rn.dot(Bn);if(s<=0&&c<=0)return t.copy(n);Vn.subVectors(e,r);let l=Ln.dot(Vn),u=Rn.dot(Vn);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(Ln,a);Hn.subVectors(e,i);let f=Ln.dot(Hn),p=Rn.dot(Hn);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Rn,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return zn.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(zn,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Ln,a).addScaledVector(Rn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},qn=class{constructor(e=new G(1/0,1/0,1/0),t=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Yn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Yn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Yn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Yn):Yn.fromBufferAttribute(r,t),Yn.applyMatrix4(e.matrixWorld),this.expandByPoint(Yn);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),Xn.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),Xn.copy(e.boundingBox)),Xn.applyMatrix4(e.matrixWorld),this.union(Xn)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Yn),Yn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(rr),ir.subVectors(this.max,rr),Zn.subVectors(e.a,rr),Qn.subVectors(e.b,rr),$n.subVectors(e.c,rr),er.subVectors(Qn,Zn),tr.subVectors($n,Qn),nr.subVectors(Zn,$n);let t=[0,-er.z,er.y,0,-tr.z,tr.y,0,-nr.z,nr.y,er.z,0,-er.x,tr.z,0,-tr.x,nr.z,0,-nr.x,-er.y,er.x,0,-tr.y,tr.x,0,-nr.y,nr.x,0];return!sr(t,Zn,Qn,$n,ir)||(t=[1,0,0,0,1,0,0,0,1],!sr(t,Zn,Qn,$n,ir))?!1:(ar.crossVectors(er,tr),t=[ar.x,ar.y,ar.z],sr(t,Zn,Qn,$n,ir))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Yn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Yn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(Jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Jn)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Jn=[new G,new G,new G,new G,new G,new G,new G,new G],Yn=new G,Xn=new qn,Zn=new G,Qn=new G,$n=new G,er=new G,tr=new G,nr=new G,rr=new G,ir=new G,ar=new G,or=new G;function sr(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){or.fromArray(e,a);let o=i.x*Math.abs(or.x)+i.y*Math.abs(or.y)+i.z*Math.abs(or.z),s=t.dot(or),c=n.dot(or),l=r.dot(or);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var cr=new G,lr=new W,ur=0,dr=class extends $e{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ur++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Be,this.updateRanges=[],this.gpuType=h,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)lr.fromBufferAttribute(this,t),lr.applyMatrix3(e),this.setXY(t,lr.x,lr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)cr.fromBufferAttribute(this,t),cr.applyMatrix3(e),this.setXYZ(t,cr.x,cr.y,cr.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)cr.fromBufferAttribute(this,t),cr.applyMatrix4(e),this.setXYZ(t,cr.x,cr.y,cr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)cr.fromBufferAttribute(this,t),cr.applyNormalMatrix(e),this.setXYZ(t,cr.x,cr.y,cr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)cr.fromBufferAttribute(this,t),cr.transformDirection(e),this.setXYZ(t,cr.x,cr.y,cr.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ct(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=wt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ct(t,this.array)),t}setX(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ct(t,this.array)),t}setY(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ct(t,this.array)),t}setZ(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ct(t,this.array)),t}setW(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=wt(t,this.array),n=wt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=wt(t,this.array),n=wt(n,this.array),r=wt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=wt(t,this.array),n=wt(n,this.array),r=wt(r,this.array),i=wt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},fr=class extends dr{constructor(e,t,n){super(new Uint16Array(e),t,n)}},pr=class extends dr{constructor(e,t,n){super(new Uint32Array(e),t,n)}},mr=class extends dr{constructor(e,t,n){super(new Float32Array(e),t,n)}},hr=new qn,gr=new G,_r=new G,vr=class{constructor(e=new G,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?hr.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;gr.subVectors(e,this.center);let t=gr.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(gr,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(_r.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(gr.copy(e.center).add(_r)),this.expandByPoint(gr.copy(e.center).sub(_r))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},yr=0,br=new K,xr=new Cn,Sr=new G,Cr=new qn,wr=new qn,Tr=new G,Er=class e extends $e{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:yr++}),this.uuid=it(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Ue(e)?pr:fr)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new kt().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return br.makeRotationFromQuaternion(e),this.applyMatrix4(br),this}rotateX(e){return br.makeRotationX(e),this.applyMatrix4(br),this}rotateY(e){return br.makeRotationY(e),this.applyMatrix4(br),this}rotateZ(e){return br.makeRotationZ(e),this.applyMatrix4(br),this}translate(e,t,n){return br.makeTranslation(e,t,n),this.applyMatrix4(br),this}scale(e,t,n){return br.makeScale(e,t,n),this.applyMatrix4(br),this}lookAt(e){return xr.lookAt(e),xr.updateMatrix(),this.applyMatrix4(xr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Sr).negate(),this.translate(Sr.x,Sr.y,Sr.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new mr(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&V(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new qn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)H(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Cr.setFromBufferAttribute(n),this.morphTargetsRelative?(Tr.addVectors(this.boundingBox.min,Cr.min),this.boundingBox.expandByPoint(Tr),Tr.addVectors(this.boundingBox.max,Cr.max),this.boundingBox.expandByPoint(Tr)):(this.boundingBox.expandByPoint(Cr.min),this.boundingBox.expandByPoint(Cr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&H(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new vr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)H(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new G,1/0);else if(e){let n=this.boundingSphere.center;if(Cr.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];wr.setFromBufferAttribute(n),this.morphTargetsRelative?(Tr.addVectors(Cr.min,wr.min),Cr.expandByPoint(Tr),Tr.addVectors(Cr.max,wr.max),Cr.expandByPoint(Tr)):(Cr.expandByPoint(wr.min),Cr.expandByPoint(wr.max))}Cr.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Tr.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Tr));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Tr.fromBufferAttribute(a,t),o&&(Sr.fromBufferAttribute(e,t),Tr.add(Sr)),r=Math.max(r,n.distanceToSquared(Tr))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&H(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){H(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new dr(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new G,s[e]=new G;let c=new G,l=new G,u=new G,d=new W,f=new W,p=new W,m=new G,h=new G;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new G,y=new G,b=new G,x=new G;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new dr(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new G,i=new G,a=new G,o=new G,s=new G,c=new G,l=new G,u=new G;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Tr.fromBufferAttribute(e,t),Tr.normalize(),e.setXYZ(t,Tr.x,Tr.y,Tr.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new dr(a,r,i)}if(this.index===null)return V(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},Dr=new G,Or=new G,kr=new kt,Ar=class{constructor(e=new G(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Dr.subVectors(n,t).cross(Or.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Dr),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||kr.getNormalMatrix(e),r=this.coplanarPoint(Dr).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},jr=0,Mr=class extends $e{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:jr++}),this.uuid=it(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new q(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ze,this.stencilZFail=ze,this.stencilZPass=ze,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){V(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?V(`Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new q().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new Ar().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new W().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new W().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Nr=new G,Pr=new G,Fr=new G,Ir=new G,Lr=class{constructor(e=new G,t=new G(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Nr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Nr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Nr.copy(this.origin).addScaledVector(this.direction,t),Nr.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Pr.copy(e).add(t).multiplyScalar(.5),Fr.copy(t).sub(e).normalize(),Ir.copy(this.origin).sub(Pr);let i=e.distanceTo(t)*.5,a=-this.direction.dot(Fr),o=Ir.dot(this.direction),s=-Ir.dot(Fr),c=Ir.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Pr).addScaledVector(Fr,d),f}intersectSphere(e,t){if(e.radius<0)return null;Nr.subVectors(e.center,this.origin);let n=Nr.dot(this.direction),r=Nr.dot(Nr)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Nr)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,M,N;if(y>=b&&y>=x?(w=s,D=u,A=p,N=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,M=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,M=_)):b>=x?(w=c,D=d,A=m,N=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,M=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,M=v)):(w=l,D=f,A=h,N=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,M=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,M=g)),w===0)return null;let P=S/w,F=C/w,I=1/w,ee=T-P*D,te=E-F*D,ne=O-P*A,re=k-F*A,ie=j-P*N,ae=M-F*N,oe=ie*re-ae*ne,L=ee*ae-te*ie,se=ne*te-re*ee;if(r){if(oe<0||L<0||se<0)return null}else if((oe<0||L<0||se<0)&&(oe>0||L>0||se>0))return null;let ce=oe+L+se;if(ce===0)return null;let le=I*(oe*D+L*A+se*N);return(ce>0?le<0:le>0)?null:this.at(le/ce,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Rr=class extends Mr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new q(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},zr=new K,Br=new Lr,Vr=new vr,Hr=new G,Ur=new G,Wr=new G,Gr=new G,Kr=new G,qr=new G,Jr=new G,Yr=new G,J=class extends Cn{constructor(e=new Er,t=new Rr){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){qr.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Kr.fromBufferAttribute(s,e),a?qr.addScaledVector(Kr,r):qr.addScaledVector(Kr.sub(t),r))}t.add(qr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Vr.copy(n.boundingSphere),Vr.applyMatrix4(i),Br.copy(e.ray).recast(e.near),!(Vr.containsPoint(Br.origin)===!1&&(Br.intersectSphere(Vr,Hr)===null||Br.origin.distanceToSquared(Hr)>(e.far-e.near)**2))&&(zr.copy(i).invert(),Br.copy(e.ray).applyMatrix4(zr),(n.boundingBox===null||Br.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Br)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=Zr(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=Zr(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=Zr(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=Zr(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function Xr(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;Yr.copy(s),Yr.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(Yr);return l<n.near||l>n.far?null:{distance:l,point:Yr.clone(),object:e}}function Zr(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,Ur),e.getVertexPosition(c,Wr),e.getVertexPosition(l,Gr);let u=Xr(e,t,n,r,Ur,Wr,Gr,Jr);if(u){let e=new G;Kn.getBarycoord(Jr,Ur,Wr,Gr,e),i&&(u.uv=Kn.getInterpolatedAttribute(i,s,c,l,e,new W)),a&&(u.uv1=Kn.getInterpolatedAttribute(a,s,c,l,e,new W)),o&&(u.normal=Kn.getInterpolatedAttribute(o,s,c,l,e,new G),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new G,materialIndex:0};Kn.getNormal(Ur,Wr,Gr,t.normal),u.face=t,u.barycoord=e}return u}var Qr=class extends Wt{constructor(e=null,t=1,n=1,i,a,o,s,c,l=r,u=r,d,f){super(null,o,s,c,l,u,i,a,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},$r=class extends dr{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},ei=new K,ti=new K,ni=[],ri=new qn,ii=new K,ai=new J,oi=new vr,si=class extends J{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new $r(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,ii)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new qn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ei),ri.copy(e.boundingBox).applyMatrix4(ei),this.boundingBox.union(ri)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new vr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ei),oi.copy(e.boundingSphere).applyMatrix4(ei),this.boundingSphere.union(oi)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(ai.geometry=this.geometry,ai.material=this.material,ai.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),oi.copy(this.boundingSphere),oi.applyMatrix4(n),e.ray.intersectsSphere(oi)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,ei),ti.multiplyMatrices(n,ei),ai.matrixWorld=ti,ai.raycast(e,ni);for(let e=0,n=ni.length;e<n;e++){let n=ni[e];n.instanceId=i,n.object=this,t.push(n)}ni.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new $r(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Qr(new Float32Array(r*this.count),r,this.count,D,h));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ci=new vr,li=new W(.5,.5),ui=new G,di=class{constructor(e=new Ar,t=new Ar,n=new Ar,r=new Ar,i=new Ar,a=new Ar){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=He,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ci.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ci.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ci)}intersectsSprite(e){return ci.center.set(0,0,0),ci.radius=.7071067811865476+li.distanceTo(e.center),ci.applyMatrix4(e.matrixWorld),this.intersectsSphere(ci)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(ui.x=r.normal.x>0?e.max.x:e.min.x,ui.y=r.normal.y>0?e.max.y:e.min.y,ui.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ui)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},fi=class extends Mr{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new q(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},pi=new K,mi=new Lr,hi=new vr,gi=new G,_i=class extends Cn{constructor(e=new Er,t=new fi){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),hi.copy(n.boundingSphere),hi.applyMatrix4(r),hi.radius+=i,e.ray.intersectsSphere(hi)===!1)return;pi.copy(r).invert(),mi.copy(e.ray).applyMatrix4(pi);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);gi.fromBufferAttribute(l,n),vi(gi,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)gi.fromBufferAttribute(l,a),vi(gi,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function vi(e,t,n,r,i,a,o){let s=mi.distanceSqToPoint(e);if(s<n){let n=new G;mi.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var yi=class extends Wt{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},bi=class extends Wt{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},xi=class extends Wt{constructor(e,t,n=m,i,a,o,s=r,c=r,l,u=T,d=1){if(u!==1026&&u!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:d},i,a,o,s,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Bt(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Si=class extends xi{constructor(e,t=m,n=301,i,a,o=r,s=r,c,l=T){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,i,a,o,s,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Ci=class extends Wt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},wi=class e extends Er{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new mr(c,3)),this.setAttribute(`normal`,new mr(l,3)),this.setAttribute(`uv`,new mr(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new G;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Ti=class e extends Er{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new G,l=new W;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new mr(a,3)),this.setAttribute(`normal`,new mr(o,3)),this.setAttribute(`uv`,new mr(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Ei=class e extends Er{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new mr(u,3)),this.setAttribute(`normal`,new mr(d,3)),this.setAttribute(`uv`,new mr(f,2));function _(){let a=new G,_=new G,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new W,m=new G,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Di=class e extends Er{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new mr(i,3)),this.setAttribute(`normal`,new mr(i.slice(),3)),this.setAttribute(`uv`,new mr(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new G,r=new G,i=new G;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new G;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new G;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new G,t=new G,n=new G,r=new G,o=new W,s=new W,c=new W;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},Oi=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){V(`Curve: .getPoint() not implemented.`)}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new W:new G);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new G,r=[],i=[],a=[],o=new G,s=new K;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new G)}i[0]=new G,a[0]=new G;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(U(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(U(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},ki=class extends Oi{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t=new W){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Ai=class extends ki{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}};function ji(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}var Mi=new G,Ni=new G,Pi=new ji,Fi=new ji,Ii=new ji,Li=class extends Oi{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new G){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(Ni.subVectors(r[0],r[1]).add(r[0]),c=Ni);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(Mi.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=Mi),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),Pi.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),Fi.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),Ii.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(Pi.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),Fi.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),Ii.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(Pi.calc(s),Fi.calc(s),Ii.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new G().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Ri(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function zi(e,t){let n=1-e;return n*n*t}function Bi(e,t){return 2*(1-e)*e*t}function Vi(e,t){return e*e*t}function Hi(e,t,n,r){return zi(e,t)+Bi(e,n)+Vi(e,r)}function Ui(e,t){let n=1-e;return n*n*n*t}function Wi(e,t){let n=1-e;return 3*n*n*e*t}function Gi(e,t){return 3*(1-e)*e*e*t}function Ki(e,t){return e*e*e*t}function qi(e,t,n,r,i){return Ui(e,t)+Wi(e,n)+Gi(e,r)+Ki(e,i)}var Ji=class extends Oi{constructor(e=new W,t=new W,n=new W,r=new W){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new W){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(qi(e,r.x,i.x,a.x,o.x),qi(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Yi=class extends Oi{constructor(e=new G,t=new G,n=new G,r=new G){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new G){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(qi(e,r.x,i.x,a.x,o.x),qi(e,r.y,i.y,a.y,o.y),qi(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Xi=class extends Oi{constructor(e=new W,t=new W){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new W){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new W){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Zi=class extends Oi{constructor(e=new G,t=new G){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new G){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new G){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Qi=class extends Oi{constructor(e=new W,t=new W,n=new W){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new W){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(Hi(e,r.x,i.x,a.x),Hi(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},$i=class extends Oi{constructor(e=new G,t=new G,n=new G){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new G){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(Hi(e,r.x,i.x,a.x),Hi(e,r.y,i.y,a.y),Hi(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ea=class extends Oi{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new W){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(Ri(o,s.x,c.x,l.x,u.x),Ri(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new W().fromArray(n))}return this}},ta=Object.freeze({__proto__:null,ArcCurve:Ai,CatmullRomCurve3:Li,CubicBezierCurve:Ji,CubicBezierCurve3:Yi,EllipseCurve:ki,LineCurve:Xi,LineCurve3:Zi,QuadraticBezierCurve:Qi,QuadraticBezierCurve3:$i,SplineCurve:ea}),na=class extends Oi{constructor(){super(),this.type=`CurvePath`,this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?`LineCurve`:`LineCurve3`;this.curves.push(new ta[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),i=0;for(;i<r.length;){if(r[i]>=n){let e=r[i]-n,a=this.curves[i],o=a.getLength(),s=o===0?0:1-e/o;return a.getPointAt(s,t)}i++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,i=this.curves;r<i.length;r++){let a=i[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,s=a.getPoints(o);for(let e=0;e<s.length;e++){let r=s[e];n&&n.equals(r)||(t.push(r),n=r)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(new ta[n.type]().fromJSON(n))}return this}},ra=class extends na{constructor(e){super(),this.type=`Path`,this.currentPoint=new W,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Xi(this.currentPoint.clone(),new W(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let i=new Qi(this.currentPoint.clone(),new W(e,t),new W(n,r));return this.curves.push(i),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,i,a){let o=new Ji(this.currentPoint.clone(),new W(e,t),new W(n,r),new W(i,a));return this.curves.push(o),this.currentPoint.set(i,a),this}splineThru(e){let t=new ea([this.currentPoint.clone()].concat(e));return this.curves.push(t),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,i,a){let o=this.currentPoint.x,s=this.currentPoint.y;return this.absarc(e+o,t+s,n,r,i,a),this}absarc(e,t,n,r,i,a){return this.absellipse(e,t,n,n,r,i,a),this}ellipse(e,t,n,r,i,a,o,s){let c=this.currentPoint.x,l=this.currentPoint.y;return this.absellipse(e+c,t+l,n,r,i,a,o,s),this}absellipse(e,t,n,r,i,a,o,s){let c=new ki(e,t,n,r,i,a,o,s);if(this.curves.length>0){let e=c.getPoint(0);e.equals(this.currentPoint)||this.lineTo(e.x,e.y)}this.curves.push(c);let l=c.getPoint(1);return this.currentPoint.copy(l),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},ia=class extends ra{constructor(e){super(e),this.uuid=it(),this.type=`Shape`,this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let n=this.holes[t];e.holes.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(new ra().fromJSON(n))}return this}};function aa(e,t,n=2){let r=t&&t.length,i=r?t[0]*n:e.length,a=oa(e,0,i,n,!0),o=[];if(!a||a.next===a.prev)return o;let s,c,l;if(r&&(a=pa(e,t,a,n)),e.length>80*n){s=e[0],c=e[1];let t=s,r=c;for(let a=n;a<i;a+=n){let n=e[a],i=e[a+1];n<s&&(s=n),i<c&&(c=i),n>t&&(t=n),i>r&&(r=i)}l=Math.max(t-s,r-c),l=l===0?0:32767/l}return ca(a,o,n,s,c,l,0),o}function oa(e,t,n,r,i){let a;if(i===La(e,t,n,r)>0)for(let i=t;i<n;i+=r)a=Pa(i/r|0,e[i],e[i+1],a);else for(let i=n-r;i>=t;i-=r)a=Pa(i/r|0,e[i],e[i+1],a);return a&&Ea(a,a.next)&&(Fa(a),a=a.next),a}function sa(e,t){if(!e)return e;t||=e;let n=e,r;do if(r=!1,!n.steiner&&(Ea(n,n.next)||Ta(n.prev,n,n.next)===0)){if(Fa(n),n=t=n.prev,n===n.next)break;r=!0}else n=n.next;while(r||n!==t);return t}function ca(e,t,n,r,i,a,o){if(!e)return;!o&&a&&va(e,r,i,a);let s=e;for(;e.prev!==e.next;){let c=e.prev,l=e.next;if(a?ua(e,r,i,a):la(e))t.push(c.i,e.i,l.i),Fa(e),e=l.next,s=l.next;else if(e=l,e===s){o?o===1?(e=da(sa(e),t),ca(e,t,n,r,i,a,2)):o===2&&fa(e,t,n,r,i,a):ca(sa(e),t,n,r,i,a,1);break}}}function la(e){let t=e.prev,n=e,r=e.next;if(Ta(t,n,r)>=0)return!1;let i=t.x,a=n.x,o=r.x,s=t.y,c=n.y,l=r.y,u=Math.min(i,a,o),d=Math.min(s,c,l),f=Math.max(i,a,o),p=Math.max(s,c,l),m=r.next;for(;m!==t;){if(m.x>=u&&m.x<=f&&m.y>=d&&m.y<=p&&Ca(i,s,a,c,o,l,m.x,m.y)&&Ta(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function ua(e,t,n,r){let i=e.prev,a=e,o=e.next;if(Ta(i,a,o)>=0)return!1;let s=i.x,c=a.x,l=o.x,u=i.y,d=a.y,f=o.y,p=Math.min(s,c,l),m=Math.min(u,d,f),h=Math.max(s,c,l),g=Math.max(u,d,f),_=ba(p,m,t,n,r),v=ba(h,g,t,n,r),y=e.prevZ,b=e.nextZ;for(;y&&y.z>=_&&b&&b.z<=v;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&Ca(s,u,c,d,l,f,y.x,y.y)&&Ta(y.prev,y,y.next)>=0||(y=y.prevZ,b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&Ca(s,u,c,d,l,f,b.x,b.y)&&Ta(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;y&&y.z>=_;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&Ca(s,u,c,d,l,f,y.x,y.y)&&Ta(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;b&&b.z<=v;){if(b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&Ca(s,u,c,d,l,f,b.x,b.y)&&Ta(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function da(e,t){let n=e;do{let r=n.prev,i=n.next.next;!Ea(r,i)&&Da(r,n,n.next,i)&&ja(r,i)&&ja(i,r)&&(t.push(r.i,n.i,i.i),Fa(n),Fa(n.next),n=e=i),n=n.next}while(n!==e);return sa(n)}function fa(e,t,n,r,i,a){let o=e;do{let e=o.next.next;for(;e!==o.prev;){if(o.i!==e.i&&wa(o,e)){let s=Na(o,e);o=sa(o,o.next),s=sa(s,s.next),ca(o,t,n,r,i,a,0),ca(s,t,n,r,i,a,0);return}e=e.next}o=o.next}while(o!==e)}function pa(e,t,n,r){let i=[];for(let n=0,a=t.length;n<a;n++){let o=oa(e,t[n]*r,n<a-1?t[n+1]*r:e.length,r,!1);o===o.next&&(o.steiner=!0),i.push(xa(o))}i.sort(ma);for(let e=0;e<i.length;e++)n=ha(i[e],n);return n}function ma(e,t){let n=e.x-t.x;return n===0&&(n=e.y-t.y,n===0&&(n=(e.next.y-e.y)/(e.next.x-e.x)-(t.next.y-t.y)/(t.next.x-t.x))),n}function ha(e,t){let n=ga(e,t);if(!n)return t;let r=Na(n,e);return sa(r,r.next),sa(n,n.next)}function ga(e,t){let n=t,r=e.x,i=e.y,a=-1/0,o;if(Ea(e,n))return n;do{if(Ea(e,n.next))return n.next;if(i<=n.y&&i>=n.next.y&&n.next.y!==n.y){let e=n.x+(i-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(e<=r&&e>a&&(a=e,o=n.x<n.next.x?n:n.next,e===r))return o}n=n.next}while(n!==t);if(!o)return null;let s=o,c=o.x,l=o.y,u=1/0;n=o;do{if(r>=n.x&&n.x>=c&&r!==n.x&&Sa(i<l?r:a,i,c,l,i<l?a:r,i,n.x,n.y)){let t=Math.abs(i-n.y)/(r-n.x);ja(n,e)&&(t<u||t===u&&(n.x>o.x||n.x===o.x&&_a(o,n)))&&(o=n,u=t)}n=n.next}while(n!==s);return o}function _a(e,t){return Ta(e.prev,e,t.prev)<0&&Ta(t.next,e,e.next)<0}function va(e,t,n,r){let i=e;do i.z===0&&(i.z=ba(i.x,i.y,t,n,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==e);i.prevZ.nextZ=null,i.prevZ=null,ya(i)}function ya(e){let t,n=1;do{let r=e,i;e=null;let a=null;for(t=0;r;){t++;let o=r,s=0;for(let e=0;e<n&&(s++,o=o.nextZ,o);e++);let c=n;for(;s>0||c>0&&o;)s!==0&&(c===0||!o||r.z<=o.z)?(i=r,r=r.nextZ,s--):(i=o,o=o.nextZ,c--),a?a.nextZ=i:e=i,i.prevZ=a,a=i;r=o}a.nextZ=null,n*=2}while(t>1);return e}function ba(e,t,n,r,i){return e=(e-n)*i|0,t=(t-r)*i|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function xa(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function Sa(e,t,n,r,i,a,o,s){return(i-o)*(t-s)>=(e-o)*(a-s)&&(e-o)*(r-s)>=(n-o)*(t-s)&&(n-o)*(a-s)>=(i-o)*(r-s)}function Ca(e,t,n,r,i,a,o,s){return(e!==o||t!==s)&&Sa(e,t,n,r,i,a,o,s)}function wa(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!Aa(e,t)&&(ja(e,t)&&ja(t,e)&&Ma(e,t)&&(Ta(e.prev,e,t.prev)||Ta(e,t.prev,t))||Ea(e,t)&&Ta(e.prev,e,e.next)>0&&Ta(t.prev,t,t.next)>0)}function Ta(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function Ea(e,t){return e.x===t.x&&e.y===t.y}function Da(e,t,n,r){let i=ka(Ta(e,t,n)),a=ka(Ta(e,t,r)),o=ka(Ta(n,r,e)),s=ka(Ta(n,r,t));return!!(i!==a&&o!==s||i===0&&Oa(e,n,t)||a===0&&Oa(e,r,t)||o===0&&Oa(n,e,r)||s===0&&Oa(n,t,r))}function Oa(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function ka(e){return e>0?1:e<0?-1:0}function Aa(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&Da(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function ja(e,t){return Ta(e.prev,e,e.next)<0?Ta(e,t,e.next)>=0&&Ta(e,e.prev,t)>=0:Ta(e,t,e.prev)<0||Ta(e,e.next,t)<0}function Ma(e,t){let n=e,r=!1,i=(e.x+t.x)/2,a=(e.y+t.y)/2;do n.y>a!=n.next.y>a&&n.next.y!==n.y&&i<(n.next.x-n.x)*(a-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next;while(n!==e);return r}function Na(e,t){let n=Ia(e.i,e.x,e.y),r=Ia(t.i,t.x,t.y),i=e.next,a=t.prev;return e.next=t,t.prev=e,n.next=i,i.prev=n,r.next=n,n.prev=r,a.next=r,r.prev=a,r}function Pa(e,t,n,r){let i=Ia(e,t,n);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function Fa(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function Ia(e,t,n){return{i:e,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function La(e,t,n,r){let i=0;for(let a=t,o=n-r;a<n;a+=r)i+=(e[o]-e[a])*(e[a+1]+e[o+1]),o=a;return i}var Ra=class{static triangulate(e,t,n=2){return aa(e,t,n)}},za=class e{static area(e){let t=e.length,n=0;for(let r=t-1,i=0;i<t;r=i++)n+=e[r].x*e[i].y-e[i].x*e[r].y;return n*.5}static isClockWise(t){return e.area(t)<0}static triangulateShape(e,t){let n=[],r=[],i=[];Ba(e),Va(n,e);let a=e.length;t.forEach(Ba);for(let e=0;e<t.length;e++)r.push(a),a+=t[e].length,Va(n,t[e]);let o=Ra.triangulate(n,r);for(let e=0;e<o.length;e+=3)i.push(o.slice(e,e+3));return i}};function Ba(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function Va(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}var Ha=class e extends Er{constructor(e=new ia([new W(.5,.5),new W(-.5,.5),new W(-.5,-.5),new W(.5,-.5)]),t={}){super(),this.type=`ExtrudeGeometry`,this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],i=[];for(let t=0,n=e.length;t<n;t++){let n=e[t];a(n)}this.setAttribute(`position`,new mr(r,3)),this.setAttribute(`uv`,new mr(i,2)),this.computeVertexNormals();function a(e){let a=[],o=t.curveSegments===void 0?12:t.curveSegments,s=t.steps===void 0?1:t.steps,c=t.depth===void 0?1:t.depth,l=t.bevelEnabled===void 0||t.bevelEnabled,u=t.bevelThickness===void 0?.2:t.bevelThickness,d=t.bevelSize===void 0?u-.1:t.bevelSize,f=t.bevelOffset===void 0?0:t.bevelOffset,p=t.bevelSegments===void 0?3:t.bevelSegments,m=t.extrudePath,h=t.UVGenerator===void 0?Ua:t.UVGenerator,g,_=!1,v,y,b,x;if(m){g=m.getSpacedPoints(s),_=!0,l=!1;let e=m.isCatmullRomCurve3?m.closed:!1;v=m.computeFrenetFrames(s,e),y=new G,b=new G,x=new G}l||(p=0,u=0,d=0,f=0);let S=e.extractPoints(o),C=S.shape,w=S.holes;if(!za.isClockWise(C)){C=C.reverse();for(let e=0,t=w.length;e<t;e++){let t=w[e];za.isClockWise(t)&&(w[e]=t.reverse())}}function T(e){let t=e[0];for(let n=1;n<=e.length;n++){let r=n%e.length,i=e[r],a=i.x-t.x,o=i.y-t.y,s=a*a+o*o,c=Math.max(Math.abs(i.x),Math.abs(i.y),Math.abs(t.x),Math.abs(t.y));s<=10000000000000001e-36*c*c?(e.splice(r,1),n--):t=i}}T(C),w.forEach(T);let E=w.length,D=C;for(let e=0;e<E;e++){let t=w[e];C=C.concat(t)}function O(e,t,n){return t||H(`ExtrudeGeometry: vec does not exist`),e.clone().addScaledVector(t,n)}let k=C.length;function A(e,t,n){let r,i,a,o=e.x-t.x,s=e.y-t.y,c=n.x-e.x,l=n.y-e.y,u=o*o+s*s,d=o*l-s*c;if(Math.abs(d)>2**-52){let d=Math.sqrt(u),f=Math.sqrt(c*c+l*l),p=t.x-s/d,m=t.y+o/d,h=n.x-l/f,g=n.y+c/f,_=((h-p)*l-(g-m)*c)/(o*l-s*c);r=p+o*_-e.x,i=m+s*_-e.y;let v=r*r+i*i;if(v<=2)return new W(r,i);a=Math.sqrt(v/2)}else{let e=!1;o>2**-52?c>2**-52&&(e=!0):o<-(2**-52)?c<-(2**-52)&&(e=!0):Math.sign(s)===Math.sign(l)&&(e=!0),e?(r=-s,i=o,a=Math.sqrt(u)):(r=o,i=s,a=Math.sqrt(u/2))}return new W(r/a,i/a)}let j=[];for(let e=0,t=D.length,n=t-1,r=e+1;e<t;e++,n++,r++)n===t&&(n=0),r===t&&(r=0),j[e]=A(D[e],D[n],D[r]);let M=[],N,P=j.concat();for(let e=0,t=E;e<t;e++){let t=w[e];N=[];for(let e=0,n=t.length,r=n-1,i=e+1;e<n;e++,r++,i++)r===n&&(r=0),i===n&&(i=0),N[e]=A(t[e],t[r],t[i]);M.push(N),P=P.concat(N)}let F;if(p===0)F=za.triangulateShape(D,w);else{let e=[],t=[];for(let n=0;n<p;n++){let r=n/p,i=u*Math.cos(r*Math.PI/2),a=d*Math.sin(r*Math.PI/2)+f;for(let t=0,n=D.length;t<n;t++){let n=O(D[t],j[t],a);ie(n.x,n.y,-i),r===0&&e.push(n)}for(let e=0,n=E;e<n;e++){let n=w[e];N=M[e];let o=[];for(let e=0,t=n.length;e<t;e++){let t=O(n[e],N[e],a);ie(t.x,t.y,-i),r===0&&o.push(t)}r===0&&t.push(o)}}F=za.triangulateShape(e,t)}let I=F.length,ee=d+f;for(let e=0;e<k;e++){let t=l?O(C[e],P[e],ee):C[e];_?(b.copy(v.normals[0]).multiplyScalar(t.x),y.copy(v.binormals[0]).multiplyScalar(t.y),x.copy(g[0]).add(b).add(y),ie(x.x,x.y,x.z)):ie(t.x,t.y,0)}for(let e=1;e<=s;e++)for(let t=0;t<k;t++){let n=l?O(C[t],P[t],ee):C[t];_?(b.copy(v.normals[e]).multiplyScalar(n.x),y.copy(v.binormals[e]).multiplyScalar(n.y),x.copy(g[e]).add(b).add(y),ie(x.x,x.y,x.z)):ie(n.x,n.y,c/s*e)}for(let e=p-1;e>=0;e--){let t=e/p,n=u*Math.cos(t*Math.PI/2),r=d*Math.sin(t*Math.PI/2)+f;for(let e=0,t=D.length;e<t;e++){let t=O(D[e],j[e],r);ie(t.x,t.y,c+n)}for(let e=0,t=w.length;e<t;e++){let t=w[e];N=M[e];for(let e=0,i=t.length;e<i;e++){let i=O(t[e],N[e],r);_?ie(i.x,i.y+g[s-1].y,g[s-1].x+n):ie(i.x,i.y,c+n)}}}te(),ne();function te(){let e=r.length/3;if(l){let e=0,t=k*e;for(let e=0;e<I;e++){let n=F[e];ae(n[2]+t,n[1]+t,n[0]+t)}e=s+p*2,t=k*e;for(let e=0;e<I;e++){let n=F[e];ae(n[0]+t,n[1]+t,n[2]+t)}}else{for(let e=0;e<I;e++){let t=F[e];ae(t[2],t[1],t[0])}for(let e=0;e<I;e++){let t=F[e];ae(t[0]+k*s,t[1]+k*s,t[2]+k*s)}}n.addGroup(e,r.length/3-e,0)}function ne(){let e=r.length/3,t=0;re(D,t),t+=D.length;for(let e=0,n=w.length;e<n;e++){let n=w[e];re(n,t),t+=n.length}n.addGroup(e,r.length/3-e,1)}function re(e,t){let n=e.length;for(;--n>=0;){let r=n,i=n-1;i<0&&(i=e.length-1);for(let e=0,n=s+p*2;e<n;e++){let n=k*e,a=k*(e+1);oe(t+r+n,t+i+n,t+i+a,t+r+a)}}}function ie(e,t,n){a.push(e),a.push(t),a.push(n)}function ae(e,t,i){L(e),L(t),L(i);let a=r.length/3,o=h.generateTopUV(n,r,a-3,a-2,a-1);se(o[0]),se(o[1]),se(o[2])}function oe(e,t,i,a){L(e),L(t),L(a),L(t),L(i),L(a);let o=r.length/3,s=h.generateSideWallUV(n,r,o-6,o-3,o-2,o-1);se(s[0]),se(s[1]),se(s[3]),se(s[1]),se(s[2]),se(s[3])}function L(e){r.push(a[e*3+0]),r.push(a[e*3+1]),r.push(a[e*3+2])}function se(e){i.push(e.x),i.push(e.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Wa(t,n,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new ta[i.type]().fromJSON(i)),new e(r,t.options)}},Ua={generateTopUV:function(e,t,n,r,i){let a=t[n*3],o=t[n*3+1],s=t[r*3],c=t[r*3+1],l=t[i*3],u=t[i*3+1];return[new W(a,o),new W(s,c),new W(l,u)]},generateSideWallUV:function(e,t,n,r,i,a){let o=t[n*3],s=t[n*3+1],c=t[n*3+2],l=t[r*3],u=t[r*3+1],d=t[r*3+2],f=t[i*3],p=t[i*3+1],m=t[i*3+2],h=t[a*3],g=t[a*3+1],_=t[a*3+2];return Math.abs(s-u)<Math.abs(o-l)?[new W(o,1-c),new W(l,1-d),new W(f,1-m),new W(h,1-_)]:[new W(s,1-c),new W(u,1-d),new W(p,1-m),new W(g,1-_)]}};function Wa(e,t,n){if(n.shapes=[],Array.isArray(e))for(let t=0,r=e.length;t<r;t++){let r=e[t];n.shapes.push(r.uuid)}else n.shapes.push(e.uuid);return n.options=Object.assign({},t),t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}var Ga=class e extends Di{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},Ka=class e extends Di{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type=`OctahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},qa=class e extends Er{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new mr(p,3)),this.setAttribute(`normal`,new mr(m,3)),this.setAttribute(`uv`,new mr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},Ja=class e extends Er{constructor(e=new ia([new W(0,.5),new W(-.5,-.5),new W(.5,-.5)]),t=12){super(),this.type=`ShapeGeometry`,this.parameters={shapes:e,curveSegments:t};let n=[],r=[],i=[],a=[],o=0,s=0;if(Array.isArray(e)===!1)c(e);else for(let t=0;t<e.length;t++)c(e[t]),this.addGroup(o,s,t),o+=s,s=0;this.setIndex(n),this.setAttribute(`position`,new mr(r,3)),this.setAttribute(`normal`,new mr(i,3)),this.setAttribute(`uv`,new mr(a,2));function c(e){let o=r.length/3,c=e.extractPoints(t),l=c.shape,u=c.holes;za.isClockWise(l)===!1&&(l=l.reverse());for(let e=0,t=u.length;e<t;e++){let t=u[e];za.isClockWise(t)===!0&&(u[e]=t.reverse())}let d=za.triangulateShape(l,u);for(let e=0,t=u.length;e<t;e++){let t=u[e];l=l.concat(t)}for(let e=0,t=l.length;e<t;e++){let t=l[e];r.push(t.x,t.y,0),i.push(0,0,1),a.push(t.x,t.y)}for(let e=0,t=d.length;e<t;e++){let t=d[e],r=t[0]+o,i=t[1]+o,a=t[2]+o;n.push(r,i,a),s+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return Ya(t,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}return new e(r,t.curveSegments)}};function Ya(e,t){if(t.shapes=[],Array.isArray(e))for(let n=0,r=e.length;n<r;n++){let r=e[n];t.shapes.push(r.uuid)}else t.shapes.push(e.uuid);return t}var Xa=class e extends Er{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new G,d=new G,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new mr(p,3)),this.setAttribute(`normal`,new mr(m,3)),this.setAttribute(`uv`,new mr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},Za=class e extends Er{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let s=[],c=[],l=[],u=[],d=new G,f=new G,p=new G;for(let s=0;s<=n;s++){let m=a+s/n*o;for(let a=0;a<=r;a++){let o=a/r*i;f.x=(e+t*Math.cos(m))*Math.cos(o),f.y=(e+t*Math.cos(m))*Math.sin(o),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(o),d.y=e*Math.sin(o),p.subVectors(f,d).normalize(),l.push(p.x,p.y,p.z),u.push(a/r),u.push(s/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;s.push(n,i,o),s.push(i,a,o)}this.setIndex(s),this.setAttribute(`position`,new mr(c,3)),this.setAttribute(`normal`,new mr(l,3)),this.setAttribute(`uv`,new mr(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}},Qa=class e extends Er{constructor(e=new $i(new G(-1,-1,0),new G(-1,1,0),new G(1,1,0)),t=64,n=1,r=8,i=!1){super(),this.type=`TubeGeometry`,this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:i};let a=e.computeFrenetFrames(t,i);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new G,s=new G,c=new W,l=new G,u=[],d=[],f=[],p=[];m(),this.setIndex(p),this.setAttribute(`position`,new mr(u,3)),this.setAttribute(`normal`,new mr(d,3)),this.setAttribute(`uv`,new mr(f,2));function m(){for(let e=0;e<t;e++)h(e);h(i===!1?t:0),_(),g()}function h(i){l=e.getPointAt(i/t,l);let c=a.normals[i],f=a.binormals[i];for(let e=0;e<=r;e++){let t=e/r*Math.PI*2,i=Math.sin(t),a=-Math.cos(t);s.x=a*c.x+i*f.x,s.y=a*c.y+i*f.y,s.z=a*c.z+i*f.z,s.normalize(),d.push(s.x,s.y,s.z),o.x=l.x+n*s.x,o.y=l.y+n*s.y,o.z=l.z+n*s.z,u.push(o.x,o.y,o.z)}}function g(){for(let e=1;e<=t;e++)for(let t=1;t<=r;t++){let n=(r+1)*(e-1)+(t-1),i=(r+1)*e+(t-1),a=(r+1)*e+t,o=(r+1)*(e-1)+t;p.push(n,i,o),p.push(i,a,o)}}function _(){for(let e=0;e<=t;e++)for(let n=0;n<=r;n++)c.x=e/t,c.y=n/r,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(t){return new e(new ta[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};function $a(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(to(i))i.isRenderTargetTexture?(V(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(to(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function eo(e){let t={};for(let n=0;n<e.length;n++){let r=$a(e[n]);for(let e in r)t[e]=r[e]}return t}function to(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function no(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function ro(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Pt.workingColorSpace}var io={clone:$a,merge:eo},ao=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,oo=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,so=class extends Mr{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ao,this.fragmentShader=oo,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=$a(e.uniforms),this.uniformsGroups=no(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new q().setHex(r.value);break;case`v2`:this.uniforms[n].value=new W().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new G().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new Gt().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new kt().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new K().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},co=class extends so{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},lo=class extends Mr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=B,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},uo=class extends Mr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function fo(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function po(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var mo=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},ho=class extends mo{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ne,endingEnd:Ne}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case z:i=e,o=2*t-n;break;case Pe:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case z:a=e,s=2*n-t;break;case Pe:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},go=class extends mo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},_o=class extends mo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},vo=class extends mo{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=xo(n,t,g,y,r);i[p]=yo(x,o,_,b,m)}return i}};function yo(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function bo(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function xo(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=yo(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=bo(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var So=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=fo(t,this.TimeBufferType),this.values=fo(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:fo(e.times,Array),values:fo(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),po(e.settings)&&(n.settings={inTangents:fo(e.settings.inTangents,Array),outTangents:fo(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new _o(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new go(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ho(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new vo(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Ae:t=this.InterpolantFactoryMethodDiscrete;break;case R:t=this.InterpolantFactoryMethodLinear;break;case je:t=this.InterpolantFactoryMethodSmooth;break;case Me:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return V(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ae;case this.InterpolantFactoryMethodLinear:return R;case this.InterpolantFactoryMethodSmooth:return je;case this.InterpolantFactoryMethodBezier:return Me}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;po(this.settings)&&(Co(this.settings.inTangents,e),Co(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(H(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(H(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){H(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){H(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&We(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){H(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===je,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,po(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Co(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}So.prototype.ValueTypeName=``,So.prototype.TimeBufferType=Float32Array,So.prototype.ValueBufferType=Float32Array,So.prototype.DefaultInterpolation=R;var wo=class extends So{constructor(e,t,n){super(e,t,n)}};wo.prototype.ValueTypeName=`bool`,wo.prototype.ValueBufferType=Array,wo.prototype.DefaultInterpolation=Ae,wo.prototype.InterpolantFactoryMethodLinear=void 0,wo.prototype.InterpolantFactoryMethodSmooth=void 0;var To=class extends So{constructor(e,t,n,r){super(e,t,n,r)}};To.prototype.ValueTypeName=`color`;var Eo=class extends So{constructor(e,t,n,r){super(e,t,n,r)}};Eo.prototype.ValueTypeName=`number`;var Do=class extends mo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)Et.slerpFlat(i,0,a,c-o,a,c,s);return i}},Oo=class extends So{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Do(this.times,this.values,this.getValueSize(),e)}};Oo.prototype.ValueTypeName=`quaternion`,Oo.prototype.InterpolantFactoryMethodSmooth=void 0;var ko=class extends So{constructor(e,t,n){super(e,t,n)}};ko.prototype.ValueTypeName=`string`,ko.prototype.ValueBufferType=Array,ko.prototype.DefaultInterpolation=Ae,ko.prototype.InterpolantFactoryMethodLinear=void 0,ko.prototype.InterpolantFactoryMethodSmooth=void 0;var Ao=class extends So{constructor(e,t,n,r){super(e,t,n,r)}};Ao.prototype.ValueTypeName=`vector`;var jo=new G,Mo=new Et,No=new G,Po=class extends Cn{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new K,this.projectionMatrix=new K,this.projectionMatrixInverse=new K,this.coordinateSystem=He,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(jo,Mo,No),No.x===1&&No.y===1&&No.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(jo,Mo,No.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(jo,Mo,No),No.x===1&&No.y===1&&No.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(jo,Mo,No.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Fo=new G,Io=new W,Lo=new W,Ro=class extends Po{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=rt*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(nt*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return rt*2*Math.atan(Math.tan(nt*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Fo.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Fo.x,Fo.y).multiplyScalar(-e/Fo.z),Fo.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Fo.x,Fo.y).multiplyScalar(-e/Fo.z)}getViewSize(e,t){return this.getViewBounds(e,Io,Lo),t.subVectors(Lo,Io)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(nt*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},zo=class extends Po{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Bo=-90,Vo=1,Ho=class extends Cn{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Ro(Bo,Vo,e,t);r.layers=this.layers,this.add(r);let i=new Ro(Bo,Vo,e,t);i.layers=this.layers,this.add(i);let a=new Ro(Bo,Vo,e,t);a.layers=this.layers,this.add(a);let o=new Ro(Bo,Vo,e,t);o.layers=this.layers,this.add(o);let s=new Ro(Bo,Vo,e,t);s.layers=this.layers,this.add(s);let c=new Ro(Bo,Vo,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Uo=class extends Ro{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Wo=`\\[\\]\\.:\\/`,Go=RegExp(`[\\[\\]\\.:\\/]`,`g`),Ko=`[^\\[\\]\\.:\\/]`,qo=`[^`+Wo.replace(`\\.`,``)+`]`,Jo=`((?:WC+[\\/:])*)`.replace(`WC`,Ko),Yo=`(WCOD+)?`.replace(`WCOD`,qo),Xo=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,Ko),Zo=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,Ko),Qo=RegExp(`^`+Jo+Yo+Xo+Zo+`$`),$o=[`material`,`materials`,`bones`,`map`],es=class{constructor(e,t,n){let r=n||ts.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},ts=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(Go,``)}static parseTrackName(e){let t=Qo.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);$o.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){V(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){H(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){H(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){H(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){H(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){H(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){H(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){H(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;H(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){H(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){H(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ts.Composite=es,ts.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},ts.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},ts.prototype.GetterByBindingType=[ts.prototype._getValue_direct,ts.prototype._getValue_array,ts.prototype._getValue_arrayElement,ts.prototype._getValue_toArray],ts.prototype.SetterByBindingTypeAndVersioning=[[ts.prototype._setValue_direct,ts.prototype._setValue_direct_setNeedsUpdate,ts.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ts.prototype._setValue_array,ts.prototype._setValue_array_setNeedsUpdate,ts.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ts.prototype._setValue_arrayElement,ts.prototype._setValue_arrayElement_setNeedsUpdate,ts.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ts.prototype._setValue_fromArray,ts.prototype._setValue_fromArray_setNeedsUpdate,ts.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var ns=new K,rs=class{constructor(e,t,n=0,r=1/0){this.ray=new Lr(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new sn,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):H(`Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return ns.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ns),this}intersectObject(e,t=!0,n=[]){return as(e,this,n,t),n.sort(is),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)as(e[r],this,n,t);return n.sort(is),n}};function is(e,t){return e.distance-t.distance}function as(e,t,n,r){let i=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(i=!1),i===!0&&r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)as(r[e],t,n,!0)}}(class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});function os(e,t,n,r){let i=ss(r);switch(n){case S:return e*t;case D:return e*t/i.components*i.byteLength;case O:return e*t/i.components*i.byteLength;case k:return e*t*2/i.components*i.byteLength;case A:return e*t*2/i.components*i.byteLength;case C:return e*t*3/i.components*i.byteLength;case w:return e*t*4/i.components*i.byteLength;case j:return e*t*4/i.components*i.byteLength;case M:case N:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case P:case F:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ee:case ne:return Math.max(e,16)*Math.max(t,8)/4;case I:case te:return Math.max(e,8)*Math.max(t,8)/2;case re:case ie:case oe:case L:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case ae:case se:case ce:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case le:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ue:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case de:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case fe:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case pe:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case me:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case he:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case ge:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case _e:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case ve:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case ye:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case be:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case xe:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Se:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Ce:case we:case Te:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Ee:case De:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Oe:case ke:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function ss(e){switch(e){case l:case u:return{byteLength:1,components:1};case f:case d:case g:return{byteLength:2,components:1};case _:case v:return{byteLength:2,components:4};case m:case p:case h:return{byteLength:4,components:1};case b:case x:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?V(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`);function cs(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function ls(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var us={alphahash_fragment:`#ifdef USE_ALPHAHASH
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
}`},Y={common:{diffuse:{value:new q(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new kt}},envmap:{envMap:{value:null},envMapRotation:{value:new kt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new kt},normalScale:{value:new W(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new q(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new G},probesMax:{value:new G},probesResolution:{value:new G}},points:{diffuse:{value:new q(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0},uvTransform:{value:new kt}},sprite:{diffuse:{value:new q(16777215)},opacity:{value:1},center:{value:new W(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}}},ds={basic:{uniforms:eo([Y.common,Y.specularmap,Y.envmap,Y.aomap,Y.lightmap,Y.fog]),vertexShader:us.meshbasic_vert,fragmentShader:us.meshbasic_frag},lambert:{uniforms:eo([Y.common,Y.specularmap,Y.envmap,Y.aomap,Y.lightmap,Y.emissivemap,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.fog,Y.lights,{emissive:{value:new q(0)},envMapIntensity:{value:1}}]),vertexShader:us.meshlambert_vert,fragmentShader:us.meshlambert_frag},phong:{uniforms:eo([Y.common,Y.specularmap,Y.envmap,Y.aomap,Y.lightmap,Y.emissivemap,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.fog,Y.lights,{emissive:{value:new q(0)},specular:{value:new q(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:us.meshphong_vert,fragmentShader:us.meshphong_frag},standard:{uniforms:eo([Y.common,Y.envmap,Y.aomap,Y.lightmap,Y.emissivemap,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.roughnessmap,Y.metalnessmap,Y.fog,Y.lights,{emissive:{value:new q(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:us.meshphysical_vert,fragmentShader:us.meshphysical_frag},toon:{uniforms:eo([Y.common,Y.aomap,Y.lightmap,Y.emissivemap,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.gradientmap,Y.fog,Y.lights,{emissive:{value:new q(0)}}]),vertexShader:us.meshtoon_vert,fragmentShader:us.meshtoon_frag},matcap:{uniforms:eo([Y.common,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.fog,{matcap:{value:null}}]),vertexShader:us.meshmatcap_vert,fragmentShader:us.meshmatcap_frag},points:{uniforms:eo([Y.points,Y.fog]),vertexShader:us.points_vert,fragmentShader:us.points_frag},dashed:{uniforms:eo([Y.common,Y.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:us.linedashed_vert,fragmentShader:us.linedashed_frag},depth:{uniforms:eo([Y.common,Y.displacementmap]),vertexShader:us.depth_vert,fragmentShader:us.depth_frag},normal:{uniforms:eo([Y.common,Y.bumpmap,Y.normalmap,Y.displacementmap,{opacity:{value:1}}]),vertexShader:us.meshnormal_vert,fragmentShader:us.meshnormal_frag},sprite:{uniforms:eo([Y.sprite,Y.fog]),vertexShader:us.sprite_vert,fragmentShader:us.sprite_frag},background:{uniforms:{uvTransform:{value:new kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:us.background_vert,fragmentShader:us.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new kt}},vertexShader:us.backgroundCube_vert,fragmentShader:us.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:us.cube_vert,fragmentShader:us.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:us.equirect_vert,fragmentShader:us.equirect_frag},distance:{uniforms:eo([Y.common,Y.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:us.distance_vert,fragmentShader:us.distance_frag},shadow:{uniforms:eo([Y.lights,Y.fog,{color:{value:new q(0)},opacity:{value:1}}]),vertexShader:us.shadow_vert,fragmentShader:us.shadow_frag}};ds.physical={uniforms:eo([ds.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new kt},clearcoatNormalScale:{value:new W(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new kt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new kt},sheen:{value:0},sheenColor:{value:new q(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new kt},transmissionSamplerSize:{value:new W},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new kt},attenuationDistance:{value:0},attenuationColor:{value:new q(0)},specularColor:{value:new q(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new kt},anisotropyVector:{value:new W},anisotropyMap:{value:null},anisotropyMapTransform:{value:new kt}}]),vertexShader:us.meshphysical_vert,fragmentShader:us.meshphysical_frag};var fs={r:0,b:0,g:0},ps=new K,ms=new kt;ms.set(-1,0,0,0,1,0,0,0,1);function hs(e,t,n,r,i,a){let o=new q(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new J(new wi(1,1,1),new so({name:`BackgroundCubeMaterial`,uniforms:$a(ds.backgroundCube.uniforms),vertexShader:ds.backgroundCube.vertexShader,fragmentShader:ds.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(ps.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(ms),l.material.toneMapped=Pt.getTransfer(i.colorSpace)!==Re,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new J(new qa(2,2),new so({name:`BackgroundMaterial`,uniforms:$a(ds.background.uniforms),vertexShader:ds.background.vertexShader,fragmentShader:ds.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Pt.getTransfer(i.colorSpace)!==Re,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(fs,ro(e)),n.buffers.color.setClear(fs.r,fs.g,fs.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function gs(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function _s(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function vs(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(V(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&V(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function ys(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Ar,s=new kt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var bs=4,xs=6,Ss=20,Cs=256,ws=new zo,Ts=new q,Es=null,Ds=0,Os=0,ks=!1,As=new G,js=new G,Ms=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=As}=i;Es=this._renderer.getRenderTarget(),Ds=this._renderer.getActiveCubeFace(),Os=this._renderer.getActiveMipmapLevel(),ks=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=zs(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Rs(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Es,Ds,Os),this._renderer.xr.enabled=ks,e.scissorTest=!1,Fs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Es=this._renderer.getRenderTarget(),Ds=this._renderer.getActiveCubeFace(),Os=this._renderer.getActiveMipmapLevel(),ks=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:o,minFilter:o,generateMipmaps:!1,type:g,format:w,colorSpace:Ie,depthBuffer:!1},r=Ps(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ps(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Ns(r)),this._blurMaterial=Ls(r,e,t),this._ggxMaterial=Is(r,e,t)}return r}_compileMaterial(e){let t=new J(new Er,e);this._renderer.compile(t,ws)}_sceneToCubeUV(e,t,n,r,i){let a=new Ro(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Ts),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new J(new wi,new Rr({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(Ts),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;Fs(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=zs()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Rs());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Fs(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,ws)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-bs?n-d+bs:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,Fs(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,ws),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,Fs(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,ws)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];Fs(t,3*l*(r>this._lodMax-bs?r-this._lodMax+bs:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,ws)}};function Ns(e){let t=[],n=[],r=e,i=e-bs+1+xs;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?js.set(1,r,n):e===1?js.set(-n,1,-r):e===2?js.set(-n,r,1):e===3?js.set(-1,r,-n):e===4?js.set(-n,-1,r):js.set(n,r,-1),js.toArray(l,(e*6+t)*3)}}let u=new Er;u.setAttribute(`position`,new dr(c,3)),u.setAttribute(`outputDirection`,new dr(l,3)),n.push(new J(u,null)),r>bs&&r--}return{lodMeshes:n,sizeLods:t}}function Ps(e,t,n){let r=new qt(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Fs(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function Is(e,t,n){return new so({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:Cs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Bs(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ls(e,t,n){return new so({name:`SphericalGaussianBlur`,defines:{SAMPLES:Ss,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Bs(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function Rs(){return new so({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:Bs(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function zs(){return new so({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Bs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Bs(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Vs=class extends qt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new yi(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new wi(5,5,5),i=new so({name:`CubemapFromEquirect`,uniforms:$a(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new J(r,i),s=t.minFilter;return t.minFilter===1008&&(t.minFilter=o),new Ho(1,10,this).update(e,a),t.minFilter=s,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function Hs(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new Vs(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Ms(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Ms(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Us(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Xe(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Ws(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0||(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++),t}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?pr:fr)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function Gs(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Ks(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:H(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function qs(e,t,n){let r=new WeakMap,i=new Gt;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let g=new Float32Array(p*m*4*u),_=new Jt(g,p,m,u);_.type=h,_.needsUpdate=!0;let v=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*v;e===!0&&(i.fromBufferAttribute(r,t),g[d+s+0]=i.x,g[d+s+1]=i.y,g[d+s+2]=i.z,g[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),g[d+s+4]=i.x,g[d+s+5]=i.y,g[d+s+6]=i.z,g[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),g[d+s+8]=i.x,g[d+s+9]=i.y,g[d+s+10]=i.z,g[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:_,size:new W(p,m)},r.set(o,d);function y(){_.dispose(),r.delete(o),o.removeEventListener(`dispose`,y)}o.addEventListener(`dispose`,y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function Js(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var Ys={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function Xs(e,t,n,r,i,a){let o=new qt(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new Er;l.setAttribute(`position`,new mr([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new mr([0,2,0,0,2,0],2));let u=new co({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new J(l,u),f=new zo(-1,1,1,-1,0,1),p=null,m=null,h=!1,_,v=null,y=[],b=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<y.length;n++){let r=y[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){y=e,b=y.length>0&&y[0].isRenderPass===!0;let t=o.width,n=o.height;y.length>0&&s===null&&(s=new qt(t,n,{type:g,depthBuffer:!1,stencilBuffer:!1}),c=new qt(t,n,{type:g,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<y.length;e++){let r=y[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&y.length===0)return!1;if(v=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return b===!1&&e.setRenderTarget(o),_=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return b},this.end=function(e,t){e.toneMapping=_,h=!0;let n=o,r=s;for(let i=0;i<y.length;i++){let a=y[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},Pt.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=Ys[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(v),e.render(d,f),v=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var Zs=new Wt,Qs=new xi(1,1),$s=new Jt,ec=new Yt,tc=new yi,nc=[],rc=[],ic=new Float32Array(16),ac=new Float32Array(9),oc=new Float32Array(4);function sc(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=nc[i];if(a===void 0&&(a=new Float32Array(i),nc[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function cc(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function lc(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function uc(e,t){let n=rc[t];n===void 0&&(n=new Int32Array(t),rc[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function dc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function fc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(cc(n,t))return;e.uniform2fv(this.addr,t),lc(n,t)}}function pc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(cc(n,t))return;e.uniform3fv(this.addr,t),lc(n,t)}}function mc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(cc(n,t))return;e.uniform4fv(this.addr,t),lc(n,t)}}function hc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(cc(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),lc(n,t)}else{if(cc(n,r))return;oc.set(r),e.uniformMatrix2fv(this.addr,!1,oc),lc(n,r)}}function gc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(cc(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),lc(n,t)}else{if(cc(n,r))return;ac.set(r),e.uniformMatrix3fv(this.addr,!1,ac),lc(n,r)}}function _c(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(cc(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),lc(n,t)}else{if(cc(n,r))return;ic.set(r),e.uniformMatrix4fv(this.addr,!1,ic),lc(n,r)}}function vc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function yc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(cc(n,t))return;e.uniform2iv(this.addr,t),lc(n,t)}}function bc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(cc(n,t))return;e.uniform3iv(this.addr,t),lc(n,t)}}function xc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(cc(n,t))return;e.uniform4iv(this.addr,t),lc(n,t)}}function Sc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Cc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(cc(n,t))return;e.uniform2uiv(this.addr,t),lc(n,t)}}function wc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(cc(n,t))return;e.uniform3uiv(this.addr,t),lc(n,t)}}function Tc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(cc(n,t))return;e.uniform4uiv(this.addr,t),lc(n,t)}}function Ec(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(Qs.compareFunction=n.isReversedDepthBuffer()?518:515,a=Qs):a=Zs,n.setTexture2D(t||a,i)}function Dc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||ec,i)}function Oc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||tc,i)}function kc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||$s,i)}function Ac(e){switch(e){case 5126:return dc;case 35664:return fc;case 35665:return pc;case 35666:return mc;case 35674:return hc;case 35675:return gc;case 35676:return _c;case 5124:case 35670:return vc;case 35667:case 35671:return yc;case 35668:case 35672:return bc;case 35669:case 35673:return xc;case 5125:return Sc;case 36294:return Cc;case 36295:return wc;case 36296:return Tc;case 35678:case 36198:case 36298:case 36306:case 35682:return Ec;case 35679:case 36299:case 36307:return Dc;case 35680:case 36300:case 36308:case 36293:return Oc;case 36289:case 36303:case 36311:case 36292:return kc}}function jc(e,t){e.uniform1fv(this.addr,t)}function Mc(e,t){let n=sc(t,this.size,2);e.uniform2fv(this.addr,n)}function Nc(e,t){let n=sc(t,this.size,3);e.uniform3fv(this.addr,n)}function Pc(e,t){let n=sc(t,this.size,4);e.uniform4fv(this.addr,n)}function Fc(e,t){let n=sc(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Ic(e,t){let n=sc(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Lc(e,t){let n=sc(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Rc(e,t){e.uniform1iv(this.addr,t)}function zc(e,t){e.uniform2iv(this.addr,t)}function Bc(e,t){e.uniform3iv(this.addr,t)}function Vc(e,t){e.uniform4iv(this.addr,t)}function Hc(e,t){e.uniform1uiv(this.addr,t)}function Uc(e,t){e.uniform2uiv(this.addr,t)}function Wc(e,t){e.uniform3uiv(this.addr,t)}function Gc(e,t){e.uniform4uiv(this.addr,t)}function Kc(e,t,n){let r=this.cache,i=t.length,a=uc(n,i);cc(r,a)||(e.uniform1iv(this.addr,a),lc(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?Qs:Zs;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function qc(e,t,n){let r=this.cache,i=t.length,a=uc(n,i);cc(r,a)||(e.uniform1iv(this.addr,a),lc(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||ec,a[e])}function Jc(e,t,n){let r=this.cache,i=t.length,a=uc(n,i);cc(r,a)||(e.uniform1iv(this.addr,a),lc(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||tc,a[e])}function Yc(e,t,n){let r=this.cache,i=t.length,a=uc(n,i);cc(r,a)||(e.uniform1iv(this.addr,a),lc(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||$s,a[e])}function Xc(e){switch(e){case 5126:return jc;case 35664:return Mc;case 35665:return Nc;case 35666:return Pc;case 35674:return Fc;case 35675:return Ic;case 35676:return Lc;case 5124:case 35670:return Rc;case 35667:case 35671:return zc;case 35668:case 35672:return Bc;case 35669:case 35673:return Vc;case 5125:return Hc;case 36294:return Uc;case 36295:return Wc;case 36296:return Gc;case 35678:case 36198:case 36298:case 36306:case 35682:return Kc;case 35679:case 36299:case 36307:return qc;case 35680:case 36300:case 36308:case 36293:return Jc;case 36289:case 36303:case 36311:case 36292:return Yc}}var Zc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Ac(t.type)}},Qc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Xc(t.type)}},$c=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},el=/(\w+)(\])?(\[|\.)?/g;function tl(e,t){e.seq.push(t),e.map[t.id]=t}function nl(e,t,n){let r=e.name,i=r.length;for(el.lastIndex=0;;){let a=el.exec(r),o=el.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){tl(n,l===void 0?new Zc(s,e,t):new Qc(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new $c(s),tl(n,e)),n=e}}}var rl=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);nl(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function il(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var al=37297,ol=0;function sl(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var cl=new kt;function ll(e){Pt._getMatrix(cl,Pt.workingColorSpace,e);let t=`mat3( ${cl.elements.map(e=>e.toFixed(4))} )`;switch(Pt.getTransfer(e)){case Le:return[t,`LinearTransferOETF`];case Re:return[t,`sRGBTransferOETF`];default:return V(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function ul(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+sl(e.getShaderSource(t),r)}return i}function dl(e,t){let n=ll(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var fl={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function pl(e,t){let n=fl[t];return n===void 0?(V(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var ml=new G;function hl(){return Pt.getLuminanceCoefficients(ml),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${ml.x.toFixed(4)}, ${ml.y.toFixed(4)}, ${ml.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function gl(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(yl).join(`
`)}function _l(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function vl(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function yl(e){return e!==``}function bl(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function xl(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Sl=/^[ \t]*#include +<([\w\d./]+)>/gm;function Cl(e){return e.replace(Sl,Tl)}var wl=new Map;function Tl(e,t){let n=us[t];if(n===void 0){let e=wl.get(t);if(e!==void 0)n=us[e],V(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return Cl(n)}var El=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Dl(e){return e.replace(El,Ol)}function Ol(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function kl(e){let t=`precision ${e.precision} float;
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
#define LOW_PRECISION`),t}var Al={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function jl(e){return Al[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Ml={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function Nl(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:Ml[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var Pl={302:`ENVMAP_MODE_REFRACTION`};function Fl(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Pl[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Il={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Ll(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Il[e.combine]||`ENVMAP_BLENDING_NONE`}function Rl(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function zl(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=jl(n),l=Nl(n),u=Fl(n),d=Ll(n),f=Rl(n),p=gl(n),m=_l(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(yl).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(yl).join(`
`),_.length>0&&(_+=`
`)):(g=[kl(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(yl).join(`
`),_=[kl(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:us.tonemapping_pars_fragment,n.toneMapping===0?``:pl(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,us.colorspace_pars_fragment,dl(`linearToOutputTexel`,n.outputColorSpace),hl(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(yl).join(`
`)),o=Cl(o),o=bl(o,n),o=xl(o,n),s=Cl(s),s=bl(s,n),s=xl(s,n),o=Dl(o),s=Dl(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=il(i,i.VERTEX_SHADER,y),S=il(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=ul(i,x,`vertex`),n=ul(i,S,`fragment`);H(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):V(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new rl(i,h),T=vl(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,al)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=ol++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var Bl=0,Vl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Hl(e),t.set(e,n)),n}},Hl=class{constructor(e){this.id=Bl++,this.code=e,this.usedTimes=0}};function Ul(e){return e===1030||e===37490||e===36285}function Wl(e,t,n,r,i,a){let o=new sn,s=new Vl,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&V(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=ds[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let j=e.getRenderTarget(),M=e.state.buffers.depth.getReversed(),N=h.isInstancedMesh===!0,P=h.isBatchedMesh===!0,F=!!i.map,I=!!i.matcap,ee=!!x,te=!!i.aoMap,ne=!!i.lightMap,re=!!i.bumpMap&&i.wireframe===!1,ie=!!i.normalMap,ae=!!i.displacementMap,oe=!!i.emissiveMap,L=!!i.metalnessMap,se=!!i.roughnessMap,ce=i.anisotropy>0,le=i.clearcoat>0,ue=i.dispersion>0,de=i.retroreflectivity>0,fe=i.iridescence>0,pe=i.sheen>0,me=i.transmission>0,he=ce&&!!i.anisotropyMap,ge=le&&!!i.clearcoatMap,_e=le&&!!i.clearcoatNormalMap,ve=le&&!!i.clearcoatRoughnessMap,ye=fe&&!!i.iridescenceMap,be=fe&&!!i.iridescenceThicknessMap,xe=pe&&!!i.sheenColorMap,Se=pe&&!!i.sheenRoughnessMap,Ce=!!i.specularMap,we=!!i.specularColorMap,Te=!!i.specularIntensityMap,Ee=me&&!!i.transmissionMap,De=me&&!!i.thicknessMap,Oe=!!i.gradientMap,ke=!!i.alphaMap,Ae=i.alphaTest>0,R=!!i.alphaHash,je=!!i.extensions,Me=0;i.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Me=e.toneMapping);let Ne={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:P,batchingColor:P&&h._colorsTexture!==null,instancing:N,instancingColor:N&&h.instanceColor!==null,instancingMorph:N&&h.morphTexture!==null,outputColorSpace:j===null?e.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Pt.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:F,matcap:I,envMap:ee,envMapMode:ee&&x.mapping,envMapCubeUVHeight:S,aoMap:te,lightMap:ne,bumpMap:re,normalMap:ie,displacementMap:ae,emissiveMap:oe,normalMapObjectSpace:ie&&i.normalMapType===1,normalMapTangentSpace:ie&&i.normalMapType===0,packedNormalMap:ie&&i.normalMapType===0&&Ul(i.normalMap.format),metalnessMap:L,roughnessMap:se,anisotropy:ce,anisotropyMap:he,clearcoat:le,clearcoatMap:ge,clearcoatNormalMap:_e,clearcoatRoughnessMap:ve,dispersion:ue,retroreflection:de,iridescence:fe,iridescenceMap:ye,iridescenceThicknessMap:be,sheen:pe,sheenColorMap:xe,sheenRoughnessMap:Se,specularMap:Ce,specularColorMap:we,specularIntensityMap:Te,transmission:me,transmissionMap:Ee,thicknessMap:De,gradientMap:Oe,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:ke,alphaTest:Ae,alphaHash:R,combine:i.combine,mapUv:F&&m(i.map.channel),aoMapUv:te&&m(i.aoMap.channel),lightMapUv:ne&&m(i.lightMap.channel),bumpMapUv:re&&m(i.bumpMap.channel),normalMapUv:ie&&m(i.normalMap.channel),displacementMapUv:ae&&m(i.displacementMap.channel),emissiveMapUv:oe&&m(i.emissiveMap.channel),metalnessMapUv:L&&m(i.metalnessMap.channel),roughnessMapUv:se&&m(i.roughnessMap.channel),anisotropyMapUv:he&&m(i.anisotropyMap.channel),clearcoatMapUv:ge&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:_e&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ve&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:ye&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:be&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:xe&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:Se&&m(i.sheenRoughnessMap.channel),specularMapUv:Ce&&m(i.specularMap.channel),specularColorMapUv:we&&m(i.specularColorMap.channel),specularIntensityMapUv:Te&&m(i.specularIntensityMap.channel),transmissionMapUv:Ee&&m(i.transmissionMap.channel),thicknessMapUv:De&&m(i.thicknessMap.channel),alphaMapUv:ke&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(ie||ce),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(F||ke),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&ie===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:M,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Me,decodeVideoTexture:F&&i.map.isVideoTexture===!0&&Pt.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:oe&&i.emissiveMap.isVideoTexture===!0&&Pt.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:je&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(je&&i.extensions.multiDraw===!0||P)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Ne.vertexUv1s=c.has(1),Ne.vertexUv2s=c.has(2),Ne.vertexUv3s=c.has(3),c.clear(),Ne}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=ds[t];n=io.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new zl(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function Gl(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Kl(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function ql(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Jl(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||Kl),r.length>1&&r.sort(t||ql),i.length>1&&i.sort(t||ql)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Yl(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Jl,e.set(t,[i])):n>=r.length?(i=new Jl,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Xl(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new G,color:new q};break;case`SpotLight`:n={position:new G,direction:new G,color:new q,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new G,color:new q,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new G,skyColor:new q,groundColor:new q};break;case`RectAreaLight`:n={color:new q,position:new G,halfWidth:new G,halfHeight:new G}}return e[t.id]=n,n}}}function Zl(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new W};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new W};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new W,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var Ql=0;function $l(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function eu(e){let t=new Xl,n=Zl(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new G);let i=new G,a=new K,o=new K;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort($l);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=Y.LTC_FLOAT_1,r.rectAreaLTC2=Y.LTC_FLOAT_2):(r.rectAreaLTC1=Y.LTC_HALF_1,r.rectAreaLTC2=Y.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=Ql++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function tu(e){let t=new eu(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function nu(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new tu(e),t.set(n,[a])):r>=i.length?(a=new tu(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var ru=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,iu=`uniform sampler2D shadow_pass;
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
}`,au=[new G(1,0,0),new G(-1,0,0),new G(0,1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1)],ou=[new G(0,-1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1),new G(0,-1,0),new G(0,-1,0)],su=new K,cu=new G,lu=new G;function uu(e,t,n){let i=new di,a=new W,s=new W,c=new Gt,l=new lo,u=new uo,d={},f=n.maxTextureSize,p={0:1,1:0,2:2},_=new so({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new W},radius:{value:4}},vertexShader:ru,fragmentShader:iu}),v=_.clone();v.defines.HORIZONTAL_PASS=1;let y=new Er;y.setAttribute(`position`,new dr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new J(y,_),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let S=this.type;this.render=function(t,n,l){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||t.length===0)return;this.type===2&&(V(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.state;_.setBlending(0),_.buffers.depth.getReversed()===!0?_.buffers.color.setClear(0,0,0,0):_.buffers.color.setClear(1,1,1,1),_.buffers.depth.setTest(!0),_.setScissorTest(!1);let v=S!==this.type;v&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let u=0,d=t.length;u<d;u++){let d=t[u],p=d.shadow;if(p===void 0){V(`WebGLShadowMap:`,d,`has no shadow.`);continue}if(p.autoUpdate===!1&&p.needsUpdate===!1)continue;a.copy(p.mapSize);let y=p.getFrameExtents();a.multiply(y),s.copy(p.mapSize),(a.x>f||a.y>f)&&(a.x>f&&(s.x=Math.floor(f/y.x),a.x=s.x*y.x,p.mapSize.x=s.x),a.y>f&&(s.y=Math.floor(f/y.y),a.y=s.y*y.y,p.mapSize.y=s.y));let b=e.state.buffers.depth.getReversed();if(p.camera._reversedDepth=b,p.map===null||v===!0){if(p.map!==null&&(p.map.depthTexture!==null&&(p.map.depthTexture.dispose(),p.map.depthTexture=null),p.map.dispose()),this.type===3){if(d.isPointLight){V(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}p.map=new qt(a.x,a.y,{format:k,type:g,minFilter:o,magFilter:o,generateMipmaps:!1}),p.map.texture.name=d.name+`.shadowMap`,p.map.depthTexture=new xi(a.x,a.y,h),p.map.depthTexture.name=d.name+`.shadowMapDepth`,p.map.depthTexture.format=T,p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=r,p.map.depthTexture.magFilter=r}else d.isPointLight?(p.map=new Vs(a.x),p.map.depthTexture=new Si(a.x,m)):(p.map=new qt(a.x,a.y),p.map.depthTexture=new xi(a.x,a.y,m)),p.map.depthTexture.name=d.name+`.shadowMap`,p.map.depthTexture.format=T,this.type===1?(p.map.depthTexture.compareFunction=b?518:515,p.map.depthTexture.minFilter=o,p.map.depthTexture.magFilter=o):(p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=r,p.map.depthTexture.magFilter=r);p.camera.updateProjectionMatrix()}p.map.isWebGLCubeRenderTarget!==!0&&(p.map.width!==a.x||p.map.height!==a.y)&&p.map.setSize(a.x,a.y);let x=p.map.isWebGLCubeRenderTarget?6:p.getViewportCount();d.isPointLight!==!0&&p.updateMatrices(d,l);for(let t=0;t<x;t++){let r=p.getCamera(t);if(d.isPointLight){let e=p.camera,n=p.matrix,r=d.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),cu.setFromMatrixPosition(d.matrixWorld),e.position.copy(cu),lu.copy(e.position),lu.add(au[t]),e.up.copy(ou[t]),e.lookAt(lu),e.updateMatrixWorld(),n.makeTranslation(-cu.x,-cu.y,-cu.z),su.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),p._frustum.setFromProjectionMatrix(su,e.coordinateSystem,e.reversedDepth)}if(p.map.isWebGLCubeRenderTarget)e.setRenderTarget(p.map,t),e.clear();else{t===0&&(e.setRenderTarget(p.map),e.clear());let n=p.getViewport(t);c.set(s.x*n.x,s.y*n.y,s.x*n.z,s.y*n.w),_.viewport(c)}i=p.getFrustum(t),E(n,l,r,d,this.type)}p.isPointLightShadow!==!0&&this.type===3&&C(p,l),p.needsUpdate=!1}S=this.type,x.needsUpdate=!1,e.setRenderTarget(u,d,p)};function C(n,r){let i=t.update(b);_.defines.VSM_SAMPLES!==n.blurSamples&&(_.defines.VSM_SAMPLES=n.blurSamples,v.defines.VSM_SAMPLES=n.blurSamples,_.needsUpdate=!0,v.needsUpdate=!0),n.mapPass===null?n.mapPass=new qt(a.x,a.y,{format:k,type:g}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),_.uniforms.shadow_pass.value=n.map.depthTexture,_.uniforms.resolution.value.set(n.map.width,n.map.height),_.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,i,_,b,null),v.uniforms.shadow_pass.value=n.mapPass.texture,v.uniforms.resolution.value.set(n.map.width,n.map.height),v.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,i,v,b,null)}function w(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?u:l,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=d[e];r===void 0&&(r={},d[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,D)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?p[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function E(n,r,a,o,s){if(n.visible===!1)return;if(n.layers.test(r.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(i))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let i=t.update(n),c=n.material;if(Array.isArray(c)){let t=i.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=w(n,d,o,s);n.onBeforeShadow(e,n,r,a,i,t,u),e.renderBufferDirect(a,null,i,t,n,u),n.onAfterShadow(e,n,r,a,i,t,u)}}}else if(c.visible){let t=w(n,c,o,s);n.onBeforeShadow(e,n,r,a,i,t,null),e.renderBufferDirect(a,null,i,t,n,null),n.onAfterShadow(e,n,r,a,i,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)E(c[e],r,a,o,s)}function D(e){e.target.removeEventListener(`dispose`,D);for(let t in d){let n=d[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function du(e,t){function n(){let t=!1,n=new Gt,r=null,i=new Gt(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?L(e.DEPTH_TEST):se(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=Qe[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?L(e.STENCIL_TEST):se(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new q(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,M=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,P=0,F=e.getParameter(e.VERSION);F.indexOf(`WebGL`)===-1?F.indexOf(`OpenGL ES`)!==-1&&(P=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),N=P>=2):(P=parseFloat(/^WebGL (\d)/.exec(F)[1]),N=P>=1);let I=null,ee={},te=e.getParameter(e.SCISSOR_BOX),ne=e.getParameter(e.VIEWPORT),re=new Gt().fromArray(te),ie=new Gt().fromArray(ne);function ae(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let oe={};oe[e.TEXTURE_2D]=ae(e.TEXTURE_2D,e.TEXTURE_2D,1),oe[e.TEXTURE_CUBE_MAP]=ae(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),oe[e.TEXTURE_2D_ARRAY]=ae(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),oe[e.TEXTURE_3D]=ae(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),L(e.DEPTH_TEST),o.setFunc(3),he(!1),ge(1),L(e.CULL_FACE),pe(0);function L(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function se(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function ce(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function le(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function ue(t){return h!==t&&(e.useProgram(t),h=t,!0)}let de={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};de[103]=e.MIN,de[104]=e.MAX;let fe={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function pe(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(se(e.BLEND),g=!1);else if(g===!1&&(L(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:H(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:H(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:H(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:H(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(de[n],de[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(fe[r],fe[i],fe[o],fe[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function me(t,n){t.side===2?se(e.CULL_FACE):L(e.CULL_FACE);let r=t.side===1;n&&(r=!r),he(r),t.blending===1&&t.transparent===!1?pe(0):pe(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),ve(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?L(e.SAMPLE_ALPHA_TO_COVERAGE):se(e.SAMPLE_ALPHA_TO_COVERAGE)}function he(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function ge(t){t===0?se(e.CULL_FACE):(L(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function _e(t){t!==k&&(N&&e.lineWidth(t),k=t)}function ve(t,n,r){t?(L(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):se(e.POLYGON_OFFSET_FILL)}function ye(t){t?L(e.SCISSOR_TEST):se(e.SCISSOR_TEST)}function be(t){t===void 0&&(t=e.TEXTURE0+M-1),I!==t&&(e.activeTexture(t),I=t)}function xe(t,n,r){r===void 0&&(r=I===null?e.TEXTURE0+M-1:I);let i=ee[r];i===void 0&&(i={type:void 0,texture:void 0},ee[r]=i),(i.type!==t||i.texture!==n)&&(I!==r&&(e.activeTexture(r),I=r),e.bindTexture(t,n||oe[t]),i.type=t,i.texture=n)}function Se(){let t=ee[I];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Ce(){try{e.compressedTexImage2D(...arguments)}catch(e){H(`WebGLState:`,e)}}function we(){try{e.compressedTexImage3D(...arguments)}catch(e){H(`WebGLState:`,e)}}function Te(){try{e.texSubImage2D(...arguments)}catch(e){H(`WebGLState:`,e)}}function Ee(){try{e.texSubImage3D(...arguments)}catch(e){H(`WebGLState:`,e)}}function De(){try{e.compressedTexSubImage2D(...arguments)}catch(e){H(`WebGLState:`,e)}}function Oe(){try{e.compressedTexSubImage3D(...arguments)}catch(e){H(`WebGLState:`,e)}}function ke(){try{e.texStorage2D(...arguments)}catch(e){H(`WebGLState:`,e)}}function Ae(){try{e.texStorage3D(...arguments)}catch(e){H(`WebGLState:`,e)}}function R(){try{e.texImage2D(...arguments)}catch(e){H(`WebGLState:`,e)}}function je(){try{e.texImage3D(...arguments)}catch(e){H(`WebGLState:`,e)}}function Me(t){return d[t]===void 0?e.getParameter(t):d[t]}function Ne(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function z(t){re.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),re.copy(t))}function Pe(t){ie.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),ie.copy(t))}function B(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Fe(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Ie(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},I=null,ee={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new q(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,re.set(0,0,e.canvas.width,e.canvas.height),ie.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:L,disable:se,bindFramebuffer:ce,drawBuffers:le,useProgram:ue,setBlending:pe,setMaterial:me,setFlipSided:he,setCullFace:ge,setLineWidth:_e,setPolygonOffset:ve,setScissorTest:ye,activeTexture:be,bindTexture:xe,unbindTexture:Se,compressedTexImage2D:Ce,compressedTexImage3D:we,texImage2D:R,texImage3D:je,pixelStorei:Ne,getParameter:Me,updateUBOMapping:B,uniformBlockBinding:Fe,texStorage2D:ke,texStorage3D:Ae,texSubImage2D:Te,texSubImage3D:Ee,compressedTexSubImage2D:De,compressedTexSubImage3D:Oe,scissor:z,viewport:Pe,reset:Ie}}function fu(l,u,d,f,p,m,h){let g=u.has(`WEBGL_multisampled_render_to_texture`)?u.get(`WEBGL_multisampled_render_to_texture`):null,_=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),v=new W,y=new WeakMap,b=new Set,x,S=new WeakMap,C=!1;try{C=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function w(e,t){return C?new OffscreenCanvas(e,t):Ge(`canvas`)}function T(e,t,n){let r=1,i=Me(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);x===void 0&&(x=w(n,a));let o=t?w(n,a):x;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),V(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&V(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function D(e){return e.generateMipmaps}function O(e){l.generateMipmap(e)}function k(e){return e.isWebGLCubeRenderTarget?l.TEXTURE_CUBE_MAP:e.isWebGL3DRenderTarget?l.TEXTURE_3D:e.isWebGLArrayRenderTarget||e.isCompressedArrayTexture?l.TEXTURE_2D_ARRAY:l.TEXTURE_2D}function A(e,t,n,r,i,a=!1){if(e!==null){if(l[e]!==void 0)return l[e];V(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+e+`'`)}let o;r&&(o=u.get(`EXT_texture_norm16`),o||V(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let s=t;if(t===l.RED&&(n===l.FLOAT&&(s=l.R32F),n===l.HALF_FLOAT&&(s=l.R16F),n===l.UNSIGNED_BYTE&&(s=l.R8),n===l.UNSIGNED_SHORT&&o&&(s=o.R16_EXT),n===l.SHORT&&o&&(s=o.R16_SNORM_EXT)),t===l.RED_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.R8UI),n===l.UNSIGNED_SHORT&&(s=l.R16UI),n===l.UNSIGNED_INT&&(s=l.R32UI),n===l.BYTE&&(s=l.R8I),n===l.SHORT&&(s=l.R16I),n===l.INT&&(s=l.R32I)),t===l.RG&&(n===l.FLOAT&&(s=l.RG32F),n===l.HALF_FLOAT&&(s=l.RG16F),n===l.UNSIGNED_BYTE&&(s=l.RG8),n===l.UNSIGNED_SHORT&&o&&(s=o.RG16_EXT),n===l.SHORT&&o&&(s=o.RG16_SNORM_EXT)),t===l.RG_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.RG8UI),n===l.UNSIGNED_SHORT&&(s=l.RG16UI),n===l.UNSIGNED_INT&&(s=l.RG32UI),n===l.BYTE&&(s=l.RG8I),n===l.SHORT&&(s=l.RG16I),n===l.INT&&(s=l.RG32I)),t===l.RGB_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.RGB8UI),n===l.UNSIGNED_SHORT&&(s=l.RGB16UI),n===l.UNSIGNED_INT&&(s=l.RGB32UI),n===l.BYTE&&(s=l.RGB8I),n===l.SHORT&&(s=l.RGB16I),n===l.INT&&(s=l.RGB32I)),t===l.RGBA_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.RGBA8UI),n===l.UNSIGNED_SHORT&&(s=l.RGBA16UI),n===l.UNSIGNED_INT&&(s=l.RGBA32UI),n===l.BYTE&&(s=l.RGBA8I),n===l.SHORT&&(s=l.RGBA16I),n===l.INT&&(s=l.RGBA32I)),t===l.RGB&&(n===l.UNSIGNED_SHORT&&o&&(s=o.RGB16_EXT),n===l.SHORT&&o&&(s=o.RGB16_SNORM_EXT),n===l.UNSIGNED_INT_5_9_9_9_REV&&(s=l.RGB9_E5),n===l.UNSIGNED_INT_10F_11F_11F_REV&&(s=l.R11F_G11F_B10F)),t===l.RGBA){let e=a?Le:Pt.getTransfer(i);n===l.FLOAT&&(s=l.RGBA32F),n===l.HALF_FLOAT&&(s=l.RGBA16F),n===l.UNSIGNED_BYTE&&(s=e===`srgb`?l.SRGB8_ALPHA8:l.RGBA8),n===l.UNSIGNED_SHORT&&o&&(s=o.RGBA16_EXT),n===l.SHORT&&o&&(s=o.RGBA16_SNORM_EXT),n===l.UNSIGNED_SHORT_4_4_4_4&&(s=l.RGBA4),n===l.UNSIGNED_SHORT_5_5_5_1&&(s=l.RGB5_A1)}return(s===l.R16F||s===l.R32F||s===l.RG16F||s===l.RG32F||s===l.RGBA16F||s===l.RGBA32F)&&u.get(`EXT_color_buffer_float`),s}function j(e,t){let n;return e?t===null||t===1014||t===1020?n=l.DEPTH24_STENCIL8:t===1015?n=l.DEPTH32F_STENCIL8:t===1012&&(n=l.DEPTH24_STENCIL8,V(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):t===null||t===1014||t===1020?n=l.DEPTH_COMPONENT24:t===1015?n=l.DEPTH_COMPONENT32F:t===1012&&(n=l.DEPTH_COMPONENT16),n}function M(e,t){return D(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function N(e){let t=e.target;t.removeEventListener(`dispose`,N),F(t),t.isVideoTexture&&y.delete(t),t.isHTMLTexture&&b.delete(t)}function P(e){let t=e.target;t.removeEventListener(`dispose`,P),ee(t)}function F(e){let t=f.get(e);if(t.__webglInit===void 0)return;let n=e.source,r=S.get(n);if(r){let i=r[t.__cacheKey];i.usedTimes--,i.usedTimes===0&&I(e),Object.keys(r).length===0&&S.delete(n)}f.remove(e)}function I(e){let t=f.get(e);l.deleteTexture(t.__webglTexture);let n=e.source,r=S.get(n);delete r[t.__cacheKey],h.memory.textures--}function ee(e){let t=f.get(e);if(e.depthTexture&&(e.depthTexture.dispose(),f.remove(e.depthTexture)),e.isWebGLCubeRenderTarget)for(let e=0;e<6;e++){if(Array.isArray(t.__webglFramebuffer[e]))for(let n=0;n<t.__webglFramebuffer[e].length;n++)l.deleteFramebuffer(t.__webglFramebuffer[e][n]);else l.deleteFramebuffer(t.__webglFramebuffer[e]);t.__webglDepthbuffer&&l.deleteRenderbuffer(t.__webglDepthbuffer[e])}else{if(Array.isArray(t.__webglFramebuffer))for(let e=0;e<t.__webglFramebuffer.length;e++)l.deleteFramebuffer(t.__webglFramebuffer[e]);else l.deleteFramebuffer(t.__webglFramebuffer);if(t.__webglDepthbuffer&&l.deleteRenderbuffer(t.__webglDepthbuffer),t.__webglMultisampledFramebuffer&&l.deleteFramebuffer(t.__webglMultisampledFramebuffer),t.__webglColorRenderbuffer)for(let e=0;e<t.__webglColorRenderbuffer.length;e++)t.__webglColorRenderbuffer[e]&&l.deleteRenderbuffer(t.__webglColorRenderbuffer[e]);t.__webglDepthRenderbuffer&&l.deleteRenderbuffer(t.__webglDepthRenderbuffer)}let n=e.textures;for(let e=0,t=n.length;e<t;e++){let t=f.get(n[e]);t.__webglTexture&&(l.deleteTexture(t.__webglTexture),h.memory.textures--),f.remove(n[e])}f.remove(e)}let te=0;function ne(){te=0}function re(){return te}function ie(e){te=e}function ae(){let e=te;return e>=p.maxTextures&&V(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+p.maxTextures),te+=1,e}function oe(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function L(e,t){let n=f.get(e);if(e.isVideoTexture&&R(e),e.isRenderTargetTexture===!1&&e.isExternalTexture!==!0&&e.version>0&&n.__version!==e.version){let r=e.image;if(r===null)V(`WebGLRenderer: Texture marked for update but no image data found.`);else if(r.complete===!1)V(`WebGLRenderer: Texture marked for update but image is incomplete`);else{_e(n,e,t);return}}else e.isExternalTexture&&(n.__webglTexture=e.sourceTexture?e.sourceTexture:null);d.bindTexture(l.TEXTURE_2D,n.__webglTexture,l.TEXTURE0+t)}function se(e,t){let n=f.get(e);e.isRenderTargetTexture===!1&&e.version>0&&n.__version!==e.version?_e(n,e,t):(e.isExternalTexture&&(n.__webglTexture=e.sourceTexture?e.sourceTexture:null),d.bindTexture(l.TEXTURE_2D_ARRAY,n.__webglTexture,l.TEXTURE0+t))}function ce(e,t){let n=f.get(e);e.isRenderTargetTexture===!1&&e.version>0&&n.__version!==e.version?_e(n,e,t):d.bindTexture(l.TEXTURE_3D,n.__webglTexture,l.TEXTURE0+t)}function le(e,t){let n=f.get(e);e.isCubeDepthTexture!==!0&&e.version>0&&n.__version!==e.version?ve(n,e,t):d.bindTexture(l.TEXTURE_CUBE_MAP,n.__webglTexture,l.TEXTURE0+t)}let ue={[e]:l.REPEAT,[t]:l.CLAMP_TO_EDGE,[n]:l.MIRRORED_REPEAT},de={[r]:l.NEAREST,[i]:l.NEAREST_MIPMAP_NEAREST,[a]:l.NEAREST_MIPMAP_LINEAR,[o]:l.LINEAR,[s]:l.LINEAR_MIPMAP_NEAREST,[c]:l.LINEAR_MIPMAP_LINEAR},fe={512:l.NEVER,519:l.ALWAYS,513:l.LESS,515:l.LEQUAL,514:l.EQUAL,518:l.GEQUAL,516:l.GREATER,517:l.NOTEQUAL};function pe(e,t){if(t.type===1015&&u.has(`OES_texture_float_linear`)===!1&&(t.magFilter===1006||t.magFilter===1007||t.magFilter===1005||t.magFilter===1008||t.minFilter===1006||t.minFilter===1007||t.minFilter===1005||t.minFilter===1008)&&V(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),l.texParameteri(e,l.TEXTURE_WRAP_S,ue[t.wrapS]),l.texParameteri(e,l.TEXTURE_WRAP_T,ue[t.wrapT]),(e===l.TEXTURE_3D||e===l.TEXTURE_2D_ARRAY)&&l.texParameteri(e,l.TEXTURE_WRAP_R,ue[t.wrapR]),l.texParameteri(e,l.TEXTURE_MAG_FILTER,de[t.magFilter]),l.texParameteri(e,l.TEXTURE_MIN_FILTER,de[t.minFilter]),t.compareFunction&&(l.texParameteri(e,l.TEXTURE_COMPARE_MODE,l.COMPARE_REF_TO_TEXTURE),l.texParameteri(e,l.TEXTURE_COMPARE_FUNC,fe[t.compareFunction])),u.has(`EXT_texture_filter_anisotropic`)===!0){if(t.magFilter===1003||t.minFilter!==1005&&t.minFilter!==1008||t.type===1015&&u.has(`OES_texture_float_linear`)===!1)return;if(t.anisotropy>1||f.get(t).__currentAnisotropy){let n=u.get(`EXT_texture_filter_anisotropic`);l.texParameterf(e,n.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(t.anisotropy,p.getMaxAnisotropy())),f.get(t).__currentAnisotropy=t.anisotropy}}}function me(e,t){let n=!1;e.__webglInit===void 0&&(e.__webglInit=!0,t.addEventListener(`dispose`,N));let r=t.source,i=S.get(r);i===void 0&&(i={},S.set(r,i));let a=oe(t);if(a!==e.__cacheKey){i[a]===void 0&&(i[a]={texture:l.createTexture(),usedTimes:0},h.memory.textures++,n=!0),i[a].usedTimes++;let r=i[e.__cacheKey];r!==void 0&&(i[e.__cacheKey].usedTimes--,r.usedTimes===0&&I(t)),e.__cacheKey=a,e.__webglTexture=i[a].texture}return n}function he(e,t,n){return Math.floor(Math.floor(e/n)/t)}function ge(e,t,n,r){let i=e.updateRanges;if(i.length===0)d.texSubImage2D(l.TEXTURE_2D,0,0,0,t.width,t.height,n,r,t.data);else{i.sort((e,t)=>e.start-t.start);let a=0;for(let e=1;e<i.length;e++){let n=i[a],r=i[e],o=n.start+n.count,s=he(r.start,t.width,4),c=he(n.start,t.width,4);r.start<=o+1&&s===c&&he(r.start+r.count-1,t.width,4)===s?n.count=Math.max(n.count,r.start+r.count-n.start):(++a,i[a]=r)}i.length=a+1;let o=d.getParameter(l.UNPACK_ROW_LENGTH),s=d.getParameter(l.UNPACK_SKIP_PIXELS),c=d.getParameter(l.UNPACK_SKIP_ROWS);d.pixelStorei(l.UNPACK_ROW_LENGTH,t.width);for(let e=0,a=i.length;e<a;e++){let a=i[e],o=Math.floor(a.start/4),s=Math.ceil(a.count/4),c=o%t.width,u=Math.floor(o/t.width),f=s;d.pixelStorei(l.UNPACK_SKIP_PIXELS,c),d.pixelStorei(l.UNPACK_SKIP_ROWS,u),d.texSubImage2D(l.TEXTURE_2D,0,c,u,f,1,n,r,t.data)}e.clearUpdateRanges(),d.pixelStorei(l.UNPACK_ROW_LENGTH,o),d.pixelStorei(l.UNPACK_SKIP_PIXELS,s),d.pixelStorei(l.UNPACK_SKIP_ROWS,c)}}function _e(e,t,n){let r=l.TEXTURE_2D;(t.isDataArrayTexture||t.isCompressedArrayTexture)&&(r=l.TEXTURE_2D_ARRAY),t.isData3DTexture&&(r=l.TEXTURE_3D);let i=me(e,t),a=t.source;d.bindTexture(r,e.__webglTexture,l.TEXTURE0+n);let o=f.get(a);if(a.version!==o.__version||i===!0){if(d.activeTexture(l.TEXTURE0+n),!(typeof ImageBitmap<`u`&&t.image instanceof ImageBitmap)){let e=Pt.getPrimaries(Pt.workingColorSpace),n=t.colorSpace===``?null:Pt.getPrimaries(t.colorSpace),r=t.colorSpace===``||e===n?l.NONE:l.BROWSER_DEFAULT_WEBGL;d.pixelStorei(l.UNPACK_FLIP_Y_WEBGL,t.flipY),d.pixelStorei(l.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),d.pixelStorei(l.UNPACK_COLORSPACE_CONVERSION_WEBGL,r)}d.pixelStorei(l.UNPACK_ALIGNMENT,t.unpackAlignment);let e=T(t.image,!1,p.maxTextureSize);e=je(t,e);let s=m.convert(t.format,t.colorSpace),c=m.convert(t.type),u=A(t.internalFormat,s,c,t.normalized,t.colorSpace,t.isVideoTexture);pe(r,t);let f,h=t.mipmaps,g=t.isVideoTexture!==!0,_=o.__version===void 0||i===!0,v=a.dataReady,y=M(t,e);if(t.isDepthTexture)u=j(t.format===E,t.type),_&&(g?d.texStorage2D(l.TEXTURE_2D,1,u,e.width,e.height):d.texImage2D(l.TEXTURE_2D,0,u,e.width,e.height,0,s,c,null));else if(t.isDataTexture){if(h.length>0){g&&_&&d.texStorage2D(l.TEXTURE_2D,y,u,h[0].width,h[0].height);for(let e=0,t=h.length;e<t;e++)f=h[e],g?v&&d.texSubImage2D(l.TEXTURE_2D,e,0,0,f.width,f.height,s,c,f.data):d.texImage2D(l.TEXTURE_2D,e,u,f.width,f.height,0,s,c,f.data);t.generateMipmaps=!1}else g?(_&&d.texStorage2D(l.TEXTURE_2D,y,u,e.width,e.height),v&&ge(t,e,s,c)):d.texImage2D(l.TEXTURE_2D,0,u,e.width,e.height,0,s,c,e.data)}else if(t.isCompressedTexture){if(t.isCompressedArrayTexture){g&&_&&d.texStorage3D(l.TEXTURE_2D_ARRAY,y,u,h[0].width,h[0].height,e.depth);for(let n=0,r=h.length;n<r;n++)if(f=h[n],t.format!==1023){if(s!==null){if(g){if(v){if(t.layerUpdates.size>0){let e=os(f.width,f.height,t.format,t.type);for(let r of t.layerUpdates){let t=f.data.subarray(r*e/f.data.BYTES_PER_ELEMENT,(r+1)*e/f.data.BYTES_PER_ELEMENT);d.compressedTexSubImage3D(l.TEXTURE_2D_ARRAY,n,0,0,r,f.width,f.height,1,s,t)}}else d.compressedTexSubImage3D(l.TEXTURE_2D_ARRAY,n,0,0,0,f.width,f.height,e.depth,s,f.data)}}else d.compressedTexImage3D(l.TEXTURE_2D_ARRAY,n,u,f.width,f.height,e.depth,0,f.data,0,0)}else V(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else g?v&&d.texSubImage3D(l.TEXTURE_2D_ARRAY,n,0,0,0,f.width,f.height,e.depth,s,c,f.data):d.texImage3D(l.TEXTURE_2D_ARRAY,n,u,f.width,f.height,e.depth,0,s,c,f.data);t.layerUpdates.size>0&&t.clearLayerUpdates()}else{g&&_&&d.texStorage2D(l.TEXTURE_2D,y,u,h[0].width,h[0].height);for(let e=0,n=h.length;e<n;e++)f=h[e],t.format===1023?g?v&&d.texSubImage2D(l.TEXTURE_2D,e,0,0,f.width,f.height,s,c,f.data):d.texImage2D(l.TEXTURE_2D,e,u,f.width,f.height,0,s,c,f.data):s===null?V(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):g?v&&d.compressedTexSubImage2D(l.TEXTURE_2D,e,0,0,f.width,f.height,s,f.data):d.compressedTexImage2D(l.TEXTURE_2D,e,u,f.width,f.height,0,f.data)}}else if(t.isDataArrayTexture){if(g){if(_&&d.texStorage3D(l.TEXTURE_2D_ARRAY,y,u,e.width,e.height,e.depth),v){if(t.layerUpdates.size>0){let n=os(e.width,e.height,t.format,t.type);for(let r of t.layerUpdates){let t=e.data.subarray(r*n/e.data.BYTES_PER_ELEMENT,(r+1)*n/e.data.BYTES_PER_ELEMENT);d.texSubImage3D(l.TEXTURE_2D_ARRAY,0,0,0,r,e.width,e.height,1,s,c,t)}t.clearLayerUpdates()}else d.texSubImage3D(l.TEXTURE_2D_ARRAY,0,0,0,0,e.width,e.height,e.depth,s,c,e.data)}}else d.texImage3D(l.TEXTURE_2D_ARRAY,0,u,e.width,e.height,e.depth,0,s,c,e.data)}else if(t.isData3DTexture)g?(_&&d.texStorage3D(l.TEXTURE_3D,y,u,e.width,e.height,e.depth),v&&d.texSubImage3D(l.TEXTURE_3D,0,0,0,0,e.width,e.height,e.depth,s,c,e.data)):d.texImage3D(l.TEXTURE_3D,0,u,e.width,e.height,e.depth,0,s,c,e.data);else if(t.isFramebufferTexture){if(_){if(g)d.texStorage2D(l.TEXTURE_2D,y,u,e.width,e.height);else{let t=e.width,n=e.height;for(let e=0;e<y;e++)d.texImage2D(l.TEXTURE_2D,e,u,t,n,0,s,c,null),t>>=1,n>>=1}}}else if(t.isHTMLTexture){if(`texElementImage2D`in l){let n=l.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),e.parentNode!==n){n.appendChild(e),b.add(t),n.onpaint=e=>{let t=e.changedElements;for(let e of b)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(l.texElementImage2D.length===3)l.texElementImage2D(l.TEXTURE_2D,l.RGBA8,e);else{let t=l.RGBA,n=l.RGBA,r=l.UNSIGNED_BYTE;l.texElementImage2D(l.TEXTURE_2D,0,t,n,r,e)}l.texParameteri(l.TEXTURE_2D,l.TEXTURE_MIN_FILTER,l.LINEAR),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_WRAP_S,l.CLAMP_TO_EDGE),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_WRAP_T,l.CLAMP_TO_EDGE)}}else if(h.length>0){if(g&&_){let e=Me(h[0]);d.texStorage2D(l.TEXTURE_2D,y,u,e.width,e.height)}for(let e=0,t=h.length;e<t;e++)f=h[e],g?v&&d.texSubImage2D(l.TEXTURE_2D,e,0,0,s,c,f):d.texImage2D(l.TEXTURE_2D,e,u,s,c,f);t.generateMipmaps=!1}else if(g){if(_){let t=Me(e);d.texStorage2D(l.TEXTURE_2D,y,u,t.width,t.height)}v&&d.texSubImage2D(l.TEXTURE_2D,0,0,0,s,c,e)}else d.texImage2D(l.TEXTURE_2D,0,u,s,c,e);D(t)&&O(r),o.__version=a.version,t.onUpdate&&t.onUpdate(t)}e.__version=t.version}function ve(e,t,n){if(t.image.length!==6)return;let r=me(e,t),i=t.source;d.bindTexture(l.TEXTURE_CUBE_MAP,e.__webglTexture,l.TEXTURE0+n);let a=f.get(i);if(i.version!==a.__version||r===!0){d.activeTexture(l.TEXTURE0+n);let e=Pt.getPrimaries(Pt.workingColorSpace),o=t.colorSpace===``?null:Pt.getPrimaries(t.colorSpace),s=t.colorSpace===``||e===o?l.NONE:l.BROWSER_DEFAULT_WEBGL;d.pixelStorei(l.UNPACK_FLIP_Y_WEBGL,t.flipY),d.pixelStorei(l.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),d.pixelStorei(l.UNPACK_ALIGNMENT,t.unpackAlignment),d.pixelStorei(l.UNPACK_COLORSPACE_CONVERSION_WEBGL,s);let c=t.isCompressedTexture||t.image[0].isCompressedTexture,u=t.image[0]&&t.image[0].isDataTexture,f=[];for(let e=0;e<6;e++)!c&&!u?f[e]=T(t.image[e],!0,p.maxCubemapSize):f[e]=u?t.image[e].image:t.image[e],f[e]=je(t,f[e]);let h=f[0],g=m.convert(t.format,t.colorSpace),_=m.convert(t.type),v=A(t.internalFormat,g,_,t.normalized,t.colorSpace),y=t.isVideoTexture!==!0,b=a.__version===void 0||r===!0,x=i.dataReady,S=M(t,h);pe(l.TEXTURE_CUBE_MAP,t);let C;if(c){y&&b&&d.texStorage2D(l.TEXTURE_CUBE_MAP,S,v,h.width,h.height);for(let e=0;e<6;e++){C=f[e].mipmaps;for(let n=0;n<C.length;n++){let r=C[n];t.format===1023?y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,0,0,r.width,r.height,g,_,r.data):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,v,r.width,r.height,0,g,_,r.data):g===null?V(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):y?x&&d.compressedTexSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,0,0,r.width,r.height,g,r.data):d.compressedTexImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,v,r.width,r.height,0,r.data)}}}else{if(C=t.mipmaps,y&&b){C.length>0&&S++;let e=Me(f[0]);d.texStorage2D(l.TEXTURE_CUBE_MAP,S,v,e.width,e.height)}for(let e=0;e<6;e++)if(u){y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,0,0,f[e].width,f[e].height,g,_,f[e].data):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,v,f[e].width,f[e].height,0,g,_,f[e].data);for(let t=0;t<C.length;t++){let n=C[t].image[e].image;y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,0,0,n.width,n.height,g,_,n.data):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,v,n.width,n.height,0,g,_,n.data)}}else{y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,0,0,g,_,f[e]):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,v,g,_,f[e]);for(let t=0;t<C.length;t++){let n=C[t];y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,0,0,g,_,n.image[e]):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,v,g,_,n.image[e])}}}D(t)&&O(l.TEXTURE_CUBE_MAP),a.__version=i.version,t.onUpdate&&t.onUpdate(t)}e.__version=t.version}function ye(e,t,n,r,i,a){let o=m.convert(n.format,n.colorSpace),s=m.convert(n.type),c=A(n.internalFormat,o,s,n.normalized,n.colorSpace),u=f.get(t),p=f.get(n);if(p.__renderTarget=t,!u.__hasExternalTextures){let e=Math.max(1,t.width>>a),n=Math.max(1,t.height>>a);i===l.TEXTURE_3D||i===l.TEXTURE_2D_ARRAY?d.texImage3D(i,a,c,e,n,t.depth,0,o,s,null):d.texImage2D(i,a,c,e,n,0,o,s,null)}d.bindFramebuffer(l.FRAMEBUFFER,e),Ae(t)?g.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,r,i,p.__webglTexture,0,ke(t)):(i===l.TEXTURE_2D||i>=l.TEXTURE_CUBE_MAP_POSITIVE_X&&i<=l.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&l.framebufferTexture2D(l.FRAMEBUFFER,r,i,p.__webglTexture,a),d.bindFramebuffer(l.FRAMEBUFFER,null)}function be(e,t,n){if(l.bindRenderbuffer(l.RENDERBUFFER,e),t.depthBuffer){let r=t.depthTexture,i=r&&r.isDepthTexture?r.type:null,a=j(t.stencilBuffer,i),o=t.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT;Ae(t)?g.renderbufferStorageMultisampleEXT(l.RENDERBUFFER,ke(t),a,t.width,t.height):n?l.renderbufferStorageMultisample(l.RENDERBUFFER,ke(t),a,t.width,t.height):l.renderbufferStorage(l.RENDERBUFFER,a,t.width,t.height),l.framebufferRenderbuffer(l.FRAMEBUFFER,o,l.RENDERBUFFER,e)}else{let e=t.textures;for(let r=0;r<e.length;r++){let i=e[r],a=m.convert(i.format,i.colorSpace),o=m.convert(i.type),s=A(i.internalFormat,a,o,i.normalized,i.colorSpace);Ae(t)?g.renderbufferStorageMultisampleEXT(l.RENDERBUFFER,ke(t),s,t.width,t.height):n?l.renderbufferStorageMultisample(l.RENDERBUFFER,ke(t),s,t.width,t.height):l.renderbufferStorage(l.RENDERBUFFER,s,t.width,t.height)}}l.bindRenderbuffer(l.RENDERBUFFER,null)}function xe(e,t,n){let r=t.isWebGLCubeRenderTarget===!0;if(d.bindFramebuffer(l.FRAMEBUFFER,e),!(t.depthTexture&&t.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let i=f.get(t.depthTexture);if(i.__renderTarget=t,(!i.__webglTexture||t.depthTexture.image.width!==t.width||t.depthTexture.image.height!==t.height)&&(t.depthTexture.image.width=t.width,t.depthTexture.image.height=t.height,t.depthTexture.needsUpdate=!0),r){if(i.__webglInit===void 0&&(i.__webglInit=!0,t.depthTexture.addEventListener(`dispose`,N)),i.__webglTexture===void 0){i.__webglTexture=l.createTexture(),d.bindTexture(l.TEXTURE_CUBE_MAP,i.__webglTexture),pe(l.TEXTURE_CUBE_MAP,t.depthTexture);let e=m.convert(t.depthTexture.format),n=m.convert(t.depthTexture.type),r;t.depthTexture.format===1026?r=l.DEPTH_COMPONENT24:t.depthTexture.format===1027&&(r=l.DEPTH24_STENCIL8);for(let i=0;i<6;i++)l.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+i,0,r,t.width,t.height,0,e,n,null)}}else L(t.depthTexture,0);let a=i.__webglTexture,o=ke(t),s=r?l.TEXTURE_CUBE_MAP_POSITIVE_X+n:l.TEXTURE_2D,c=t.depthTexture.format===1027?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT;if(t.depthTexture.format===1026)Ae(t)?g.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,c,s,a,0,o):l.framebufferTexture2D(l.FRAMEBUFFER,c,s,a,0);else if(t.depthTexture.format===1027)Ae(t)?g.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,c,s,a,0,o):l.framebufferTexture2D(l.FRAMEBUFFER,c,s,a,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function Se(e){let t=f.get(e),n=e.isWebGLCubeRenderTarget===!0;if(t.__boundDepthTexture!==e.depthTexture){let n=e.depthTexture;if(t.__depthDisposeCallback&&t.__depthDisposeCallback(),n){let e=()=>{delete t.__boundDepthTexture,delete t.__depthDisposeCallback,n.removeEventListener(`dispose`,e)};n.addEventListener(`dispose`,e),t.__depthDisposeCallback=e}t.__boundDepthTexture=n}if(e.depthTexture&&!t.__autoAllocateDepthBuffer){if(n)for(let n=0;n<6;n++)xe(t.__webglFramebuffer[n],e,n);else{let n=e.texture.mipmaps;n&&n.length>0?xe(t.__webglFramebuffer[0],e,0):xe(t.__webglFramebuffer,e,0)}}else if(n){t.__webglDepthbuffer=[];for(let n=0;n<6;n++)if(d.bindFramebuffer(l.FRAMEBUFFER,t.__webglFramebuffer[n]),t.__webglDepthbuffer[n]===void 0)t.__webglDepthbuffer[n]=l.createRenderbuffer(),be(t.__webglDepthbuffer[n],e,!1);else{let r=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,i=t.__webglDepthbuffer[n];l.bindRenderbuffer(l.RENDERBUFFER,i),l.framebufferRenderbuffer(l.FRAMEBUFFER,r,l.RENDERBUFFER,i)}}else{let n=e.texture.mipmaps;if(n&&n.length>0?d.bindFramebuffer(l.FRAMEBUFFER,t.__webglFramebuffer[0]):d.bindFramebuffer(l.FRAMEBUFFER,t.__webglFramebuffer),t.__webglDepthbuffer===void 0)t.__webglDepthbuffer=l.createRenderbuffer(),be(t.__webglDepthbuffer,e,!1);else{let n=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,r=t.__webglDepthbuffer;l.bindRenderbuffer(l.RENDERBUFFER,r),l.framebufferRenderbuffer(l.FRAMEBUFFER,n,l.RENDERBUFFER,r)}}d.bindFramebuffer(l.FRAMEBUFFER,null)}function Ce(e,t,n){let r=f.get(e);t!==void 0&&ye(r.__webglFramebuffer,e,e.texture,l.COLOR_ATTACHMENT0,l.TEXTURE_2D,0),n!==void 0&&Se(e)}function we(e){let t=e.texture,n=f.get(e),r=f.get(t);e.addEventListener(`dispose`,P);let i=e.textures,a=e.isWebGLCubeRenderTarget===!0,o=i.length>1;if(o||(r.__webglTexture===void 0&&(r.__webglTexture=l.createTexture()),r.__version=t.version,h.memory.textures++),a){n.__webglFramebuffer=[];for(let e=0;e<6;e++)if(t.mipmaps&&t.mipmaps.length>0){n.__webglFramebuffer[e]=[];for(let r=0;r<t.mipmaps.length;r++)n.__webglFramebuffer[e][r]=l.createFramebuffer()}else n.__webglFramebuffer[e]=l.createFramebuffer()}else{if(t.mipmaps&&t.mipmaps.length>0){n.__webglFramebuffer=[];for(let e=0;e<t.mipmaps.length;e++)n.__webglFramebuffer[e]=l.createFramebuffer()}else n.__webglFramebuffer=l.createFramebuffer();if(o)for(let e=0,t=i.length;e<t;e++){let t=f.get(i[e]);t.__webglTexture===void 0&&(t.__webglTexture=l.createTexture(),h.memory.textures++)}if(e.samples>0&&Ae(e)===!1){n.__webglMultisampledFramebuffer=l.createFramebuffer(),n.__webglColorRenderbuffer=[],d.bindFramebuffer(l.FRAMEBUFFER,n.__webglMultisampledFramebuffer);for(let t=0;t<i.length;t++){let r=i[t];n.__webglColorRenderbuffer[t]=l.createRenderbuffer(),l.bindRenderbuffer(l.RENDERBUFFER,n.__webglColorRenderbuffer[t]);let a=m.convert(r.format,r.colorSpace),o=m.convert(r.type),s=A(r.internalFormat,a,o,r.normalized,r.colorSpace,e.isXRRenderTarget===!0),c=ke(e);l.renderbufferStorageMultisample(l.RENDERBUFFER,c,s,e.width,e.height),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+t,l.RENDERBUFFER,n.__webglColorRenderbuffer[t])}l.bindRenderbuffer(l.RENDERBUFFER,null),e.depthBuffer&&(n.__webglDepthRenderbuffer=l.createRenderbuffer(),be(n.__webglDepthRenderbuffer,e,!0)),d.bindFramebuffer(l.FRAMEBUFFER,null)}}if(a){d.bindTexture(l.TEXTURE_CUBE_MAP,r.__webglTexture),pe(l.TEXTURE_CUBE_MAP,t);for(let r=0;r<6;r++)if(t.mipmaps&&t.mipmaps.length>0)for(let i=0;i<t.mipmaps.length;i++)ye(n.__webglFramebuffer[r][i],e,t,l.COLOR_ATTACHMENT0,l.TEXTURE_CUBE_MAP_POSITIVE_X+r,i);else ye(n.__webglFramebuffer[r],e,t,l.COLOR_ATTACHMENT0,l.TEXTURE_CUBE_MAP_POSITIVE_X+r,0);D(t)&&O(l.TEXTURE_CUBE_MAP),d.unbindTexture()}else if(o){for(let t=0,r=i.length;t<r;t++){let r=i[t],a=f.get(r),o=l.TEXTURE_2D;(e.isWebGL3DRenderTarget||e.isWebGLArrayRenderTarget)&&(o=e.isWebGL3DRenderTarget?l.TEXTURE_3D:l.TEXTURE_2D_ARRAY),d.bindTexture(o,a.__webglTexture),pe(o,r),ye(n.__webglFramebuffer,e,r,l.COLOR_ATTACHMENT0+t,o,0),D(r)&&O(o)}d.unbindTexture()}else{let i=l.TEXTURE_2D;if((e.isWebGL3DRenderTarget||e.isWebGLArrayRenderTarget)&&(i=e.isWebGL3DRenderTarget?l.TEXTURE_3D:l.TEXTURE_2D_ARRAY),d.bindTexture(i,r.__webglTexture),pe(i,t),t.mipmaps&&t.mipmaps.length>0)for(let r=0;r<t.mipmaps.length;r++)ye(n.__webglFramebuffer[r],e,t,l.COLOR_ATTACHMENT0,i,r);else ye(n.__webglFramebuffer,e,t,l.COLOR_ATTACHMENT0,i,0);D(t)&&O(i),d.unbindTexture()}e.depthBuffer&&Se(e)}function Te(e){let t=e.textures;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(D(r)){let t=k(e),n=f.get(r).__webglTexture;d.bindTexture(t,n),O(t),d.unbindTexture()}}}let Ee=[],De=[];function Oe(e){if(e.samples>0){if(Ae(e)===!1){let t=e.textures,n=e.width,r=e.height,i=l.COLOR_BUFFER_BIT,a=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,o=f.get(e),s=t.length>1;if(s)for(let e=0;e<t.length;e++)d.bindFramebuffer(l.FRAMEBUFFER,o.__webglMultisampledFramebuffer),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.RENDERBUFFER,null),d.bindFramebuffer(l.FRAMEBUFFER,o.__webglFramebuffer),l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.TEXTURE_2D,null,0);d.bindFramebuffer(l.READ_FRAMEBUFFER,o.__webglMultisampledFramebuffer);let c=e.texture.mipmaps;c&&c.length>0?d.bindFramebuffer(l.DRAW_FRAMEBUFFER,o.__webglFramebuffer[0]):d.bindFramebuffer(l.DRAW_FRAMEBUFFER,o.__webglFramebuffer);for(let c=0;c<t.length;c++){if(e.resolveDepthBuffer&&(e.depthBuffer&&(i|=l.DEPTH_BUFFER_BIT),e.stencilBuffer&&e.resolveStencilBuffer&&(i|=l.STENCIL_BUFFER_BIT)),s){l.framebufferRenderbuffer(l.READ_FRAMEBUFFER,l.COLOR_ATTACHMENT0,l.RENDERBUFFER,o.__webglColorRenderbuffer[c]);let e=f.get(t[c]).__webglTexture;l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0,l.TEXTURE_2D,e,0)}l.blitFramebuffer(0,0,n,r,0,0,n,r,i,l.NEAREST),_===!0&&(Ee.length=0,De.length=0,Ee.push(l.COLOR_ATTACHMENT0+c),e.depthBuffer&&e.storeMultisampledDepthBuffer===!1&&(Ee.push(a),De.push(a),l.invalidateFramebuffer(l.DRAW_FRAMEBUFFER,De)),l.invalidateFramebuffer(l.READ_FRAMEBUFFER,Ee))}if(d.bindFramebuffer(l.READ_FRAMEBUFFER,null),d.bindFramebuffer(l.DRAW_FRAMEBUFFER,null),s)for(let e=0;e<t.length;e++){d.bindFramebuffer(l.FRAMEBUFFER,o.__webglMultisampledFramebuffer),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.RENDERBUFFER,o.__webglColorRenderbuffer[e]);let n=f.get(t[e]).__webglTexture;d.bindFramebuffer(l.FRAMEBUFFER,o.__webglFramebuffer),l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.TEXTURE_2D,n,0)}d.bindFramebuffer(l.DRAW_FRAMEBUFFER,o.__webglMultisampledFramebuffer)}else if(e.depthBuffer&&e.storeMultisampledDepthBuffer===!1&&_){let t=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT;l.invalidateFramebuffer(l.DRAW_FRAMEBUFFER,[t])}}}function ke(e){return Math.min(p.maxSamples,e.samples)}function Ae(e){let t=f.get(e);return e.samples>0&&u.has(`WEBGL_multisampled_render_to_texture`)===!0&&t.__useRenderToTexture!==!1}function R(e){let t=h.render.frame;y.get(e)!==t&&(y.set(e,t),e.update())}function je(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Pt.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&V(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):H(`WebGLTextures: Unsupported texture color space:`,n)),t}function Me(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(v.width=e.naturalWidth||e.width,v.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(v.width=e.displayWidth,v.height=e.displayHeight):(v.width=e.width,v.height=e.height),v}this.allocateTextureUnit=ae,this.resetTextureUnits=ne,this.getTextureUnits=re,this.setTextureUnits=ie,this.setTexture2D=L,this.setTexture2DArray=se,this.setTexture3D=ce,this.setTextureCube=le,this.rebindTextures=Ce,this.setupRenderTarget=we,this.updateRenderTargetMipmap=Te,this.updateMultisampleRenderTarget=Oe,this.setupDepthRenderbuffer=Se,this.setupFrameBufferTexture=ye,this.useMultisampledRTT=Ae,this.isReversedDepthBuffer=function(){return d.buffers.depth.getReversed()}}function pu(e,t){function n(n,r=``){let i,a=Pt.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var mu=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,hu=`
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

}`,gu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Ci(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new so({vertexShader:mu,fragmentShader:hu,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new J(new qa(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},_u=class extends $e{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,u=null,d=null,f=null,p=null,h=null,g=typeof XRWebGLBinding<`u`,_=new gu,v={},b=t.getContextAttributes(),x=null,S=null,C=[],D=[],O=new W,k=null,A=null,j=new Ro;j.viewport=new Gt;let M=new Ro;M.viewport=new Gt;let N=[j,M],P=new Uo,F=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=C[e];return t===void 0&&(t=new En,C[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=C[e];return t===void 0&&(t=new En,C[e]=t),t.getGripSpace()},this.getHand=function(e){let t=C[e];return t===void 0&&(t=new En,C[e]=t),t.getHandSpace()};function ee(e){let t=D.indexOf(e.inputSource);if(t===-1)return;let n=C[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function te(){r.removeEventListener(`select`,ee),r.removeEventListener(`selectstart`,ee),r.removeEventListener(`selectend`,ee),r.removeEventListener(`squeeze`,ee),r.removeEventListener(`squeezestart`,ee),r.removeEventListener(`squeezeend`,ee),r.removeEventListener(`end`,te),r.removeEventListener(`inputsourceschange`,ne);for(let e=0;e<C.length;e++){let t=D[e];t!==null&&(D[e]=null,C[e].disconnect(t))}F=null,I=null,_.reset();for(let e in v)delete v[e];if(e.setRenderTarget(x),p=null,f=null,d=null,r=null,S=null,le.stop(),n.isPresenting=!1,e.setPixelRatio(k),e.setSize(O.width,O.height,!1),A!==null){let e=A.camera;e.fov=A.fov,e.zoom=A.zoom,e.updateProjectionMatrix(),A=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&V(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&V(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return f===null?p:f},this.getBinding=function(){return d===null&&g&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return h},this.getSession=function(){return r},this.setSession=async function(u){if(r=u,r!==null){if(x=e.getRenderTarget(),r.addEventListener(`select`,ee),r.addEventListener(`selectstart`,ee),r.addEventListener(`selectend`,ee),r.addEventListener(`squeeze`,ee),r.addEventListener(`squeezestart`,ee),r.addEventListener(`squeezeend`,ee),r.addEventListener(`end`,te),r.addEventListener(`inputsourceschange`,ne),b.xrCompatible!==!0&&await t.makeXRCompatible(),k=e.getPixelRatio(),e.getSize(O),g&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;b.depth&&(o=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=b.stencil?E:T,a=b.stencil?y:m);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};d=this.getBinding(),f=d.createProjectionLayer(s),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),S=new qt(f.textureWidth,f.textureHeight,{format:w,type:l,depthTexture:new xi(f.textureWidth,f.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let n={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:i};p=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new qt(p.framebufferWidth,p.framebufferHeight,{format:w,type:l,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),le.setContext(r),le.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function ne(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=D.indexOf(n);r>=0&&(D[r]=null,C[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=D.indexOf(n);if(r===-1){for(let e=0;e<C.length;e++)if(e>=D.length){D.push(n),r=e;break}else if(D[e]===null){D[e]=n,r=e;break}if(r===-1)break}let i=C[r];i&&i.connect(n)}}let re=new G,ie=new G;function ae(e,t,n){re.setFromMatrixPosition(t.matrixWorld),ie.setFromMatrixPosition(n.matrixWorld);let r=re.distanceTo(ie),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function oe(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;_.texture!==null&&(_.depthNear>0&&(t=_.depthNear),_.depthFar>0&&(n=_.depthFar)),P.near=M.near=j.near=t,P.far=M.far=j.far=n,(F!==P.near||I!==P.far)&&(r.updateRenderState({depthNear:P.near,depthFar:P.far}),F=P.near,I=P.far),P.layers.mask=e.layers.mask|6,j.layers.mask=P.layers.mask&-5,M.layers.mask=P.layers.mask&-3;let i=e.parent,a=P.cameras;oe(P,i);for(let e=0;e<a.length;e++)oe(a[e],i);a.length===2?ae(P,j,M):P.projectionMatrix.copy(j.projectionMatrix),A===null&&e.isPerspectiveCamera&&(A={camera:e,fov:e.fov,zoom:e.zoom}),L(e,P,i)};function L(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=rt*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return P},this.getFoveation=function(){if(f!==null||p!==null)return s},this.setFoveation=function(e){s=e,f!==null&&(f.fixedFoveation=e),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=e)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(P)},this.getCameraTexture=function(e){return v[e]};let se=null;function ce(t,i){if(u=i.getViewerPose(c||a),h=i,u!==null){let t=u.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let i=!1;t.length!==P.cameras.length&&(P.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(p!==null)a=p.getViewport(r);else{let t=d.getViewSubImage(f,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(S,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(S))}let o=N[n];o===void 0&&(o=new Ro,o.layers.enable(n),o.viewport=new Gt,N[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(P.matrix.copy(o.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale)),i===!0&&P.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&g){d=n.getBinding();let e=d.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&_.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&g){e.state.unbindTexture(),d=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=v[n];e||(e=new Ci,v[n]=e);let t=d.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<C.length;e++){let t=D[e],n=C[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}se&&se(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),h=null}let le=new cs;le.setAnimationLoop(ce),this.setAnimationLoop=function(e){se=e},this.dispose=function(){}}},vu=new K,yu=new kt;yu.set(-1,0,0,0,1,0,0,0,1);function bu(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,ro(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(vu.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(yu),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function xu(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return H(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?V(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):V(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var Su=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Cu=null;function wu(){return Cu===null&&(Cu=new Qr(Su,16,16,k,g),Cu.name=`DFG_LUT`,Cu.minFilter=o,Cu.magFilter=o,Cu.wrapS=t,Cu.wrapT=t,Cu.generateMipmaps=!1,Cu.needsUpdate=!0),Cu}var Tu=class{constructor(e={}){let{canvas:t=Ke(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:u=!1,powerPreference:d=`default`,failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:h=!1,outputBufferType:b=l}=e;this.isWebGLRenderer=!0;let x;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);x=n.getContextAttributes().alpha}else x=a;let S=b,C=new Set([j,A,O]),w=new Set([l,m,f,y,_,v]),T=new Uint32Array(4),E=new Int32Array(4),D=new G,k=null,M=null,N=[],P=[],F=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,ee=!1,te=null,ne=null,re=null,ie=null;this._outputColorSpace=Fe;let ae=0,oe=0,L=null,se=-1,ce=null,le=new Gt,ue=new Gt,de=null,fe=new q(0),pe=0,me=t.width,he=t.height,ge=1,_e=null,ve=null,ye=new Gt(0,0,me,he),be=new Gt(0,0,me,he),xe=!1,Se=new di,Ce=!1,we=!1,Te=new K,Ee=new G,De=new Gt,Oe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ke=!1;function Ae(){return L===null?ge:1}let R=n;function je(e,n){return t.getContext(e,n)}let Me,Ne,z,Pe,B,Ie,Le,Re,ze,Be,Ve,Ue,We,Ge,qe,Ye,Xe,Qe,$e,et,tt,nt,rt;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:u,powerPreference:d,failIfMajorPerformanceCaveat:p};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,at,!1),t.addEventListener(`webglcontextrestored`,ot,!1),t.addEventListener(`webglcontextcreationerror`,st,!1),R===null){let t=`webgl2`;if(R=je(t,e),R===null)throw je(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}it()}catch(e){throw t.removeEventListener(`webglcontextlost`,at,!1),t.removeEventListener(`webglcontextrestored`,ot,!1),t.removeEventListener(`webglcontextcreationerror`,st,!1),H(`WebGLRenderer: `+e.message),e}function it(){Me=new Us(R),Me.init(),tt=new pu(R,Me),Ne=new vs(R,Me,e,tt),z=new du(R,Me),Ne.reversedDepthBuffer&&h&&z.buffers.depth.setReversed(!0),ne=R.createFramebuffer(),re=R.createFramebuffer(),ie=R.createFramebuffer(),Pe=new Ks(R),B=new Gl,Ie=new fu(R,Me,z,B,Ne,tt,Pe),Le=new Hs(I),Re=new ls(R),nt=new gs(R,Re),ze=new Ws(R,Re,Pe,nt),Be=new Js(R,ze,Re,nt,Pe),Qe=new qs(R,Ne,Ie),qe=new ys(B),Ve=new Wl(I,Le,Me,Ne,nt,qe),Ue=new bu(I,B),We=new Yl,Ge=new nu(Me),Xe=new hs(I,Le,z,Be,x,s),Ye=new uu(I,Be,Ne),rt=new xu(R,Pe,Ne,z),$e=new _s(R,Me,Pe),et=new Gs(R,Me,Pe),Pe.programs=Ve.programs,I.capabilities=Ne,I.extensions=Me,I.properties=B,I.renderLists=We,I.shadowMap=Ye,I.state=z,I.info=Pe}S!==1009&&(F=new Xs(S,t.width,t.height,o,r,i));let U=new _u(I,R);this.xr=U,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){let e=Me.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Me.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return ge},this.setPixelRatio=function(e){e!==void 0&&(ge=e,this.setSize(me,he,!1))},this.getSize=function(e){return e.set(me,he)},this.setSize=function(e,n,r=!0){U.isPresenting?V(`WebGLRenderer: Can't change size while VR device is presenting.`):(me=e,he=n,t.width=Math.floor(e*ge),t.height=Math.floor(n*ge),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),F!==null&&F.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(me*ge,he*ge).floor()},this.setDrawingBufferSize=function(e,n,r){me=e,he=n,ge=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(S===1009)H(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){V(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}F.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(le)},this.getViewport=function(e){return e.copy(ye)},this.setViewport=function(e,t,n,r){e.isVector4?ye.set(e.x,e.y,e.z,e.w):ye.set(e,t,n,r),z.viewport(le.copy(ye).multiplyScalar(ge).round())},this.getScissor=function(e){return e.copy(be)},this.setScissor=function(e,t,n,r){e.isVector4?be.set(e.x,e.y,e.z,e.w):be.set(e,t,n,r),z.scissor(ue.copy(be).multiplyScalar(ge).round())},this.getScissorTest=function(){return xe},this.setScissorTest=function(e){z.setScissorTest(xe=e)},this.setOpaqueSort=function(e){_e=e},this.setTransparentSort=function(e){ve=e},this.getClearColor=function(e){return e.copy(Xe.getClearColor())},this.setClearColor=function(){Xe.setClearColor(...arguments)},this.getClearAlpha=function(){return Xe.getClearAlpha()},this.setClearAlpha=function(){Xe.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(L!==null){let t=L.texture.format;e=C.has(t)}if(e){let e=L.texture.type,t=w.has(e),n=Xe.getClearColor(),r=Xe.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(T[0]=i,T[1]=a,T[2]=o,T[3]=r,R.clearBufferuiv(R.COLOR,0,T)):(E[0]=i,E[1]=a,E[2]=o,E[3]=r,R.clearBufferiv(R.COLOR,0,E))}else r|=R.COLOR_BUFFER_BIT}t&&(r|=R.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&R.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),te=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,at,!1),t.removeEventListener(`webglcontextrestored`,ot,!1),t.removeEventListener(`webglcontextcreationerror`,st,!1),Xe.dispose(),We.dispose(),Ge.dispose(),B.dispose(),Le.dispose(),Be.dispose(),nt.dispose(),rt.dispose(),Ve.dispose(),U.dispose(),U.removeEventListener(`sessionstart`,mt),U.removeEventListener(`sessionend`,ht),gt.stop()};function at(e){e.preventDefault(),Je(`WebGLRenderer: Context Lost.`),ee=!0}function ot(){Je(`WebGLRenderer: Context Restored.`),ee=!1;let e=Pe.autoReset,t=Ye.enabled,n=Ye.autoUpdate,r=Ye.needsUpdate,i=Ye.type;it(),Pe.autoReset=e,Ye.enabled=t,Ye.autoUpdate=n,Ye.needsUpdate=r,Ye.type=i}function st(e){H(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function ct(e){let t=e.target;t.removeEventListener(`dispose`,ct),lt(t)}function lt(e){ut(e),B.remove(e)}function ut(e){let t=B.get(e).programs;t!==void 0&&(t.forEach(function(e){Ve.releaseProgram(e)}),e.isShaderMaterial&&Ve.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=Oe);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=W(e,t,n,r,i);z.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=ze.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;nt.setup(i,r,s,n,c);let h,g=$e;if(c!==null&&(h=Re.get(c),g=et,g.setIndex(h)),i.isMesh)r.wireframe===!0?(z.setLineWidth(r.wireframeLinewidth*Ae()),g.setMode(R.LINES)):g.setMode(R.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),z.setLineWidth(e*Ae()),i.isLineSegments?g.setMode(R.LINES):i.isLineLoop?g.setMode(R.LINE_LOOP):g.setMode(R.LINE_STRIP)}else i.isPoints?g.setMode(R.POINTS):i.isSprite&&g.setMode(R.TRIANGLES);if(i.isBatchedMesh){if(Me.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Re.get(c).bytesPerElement:1,o=B.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(R,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function dt(e,t,n,r){te!==null&&e.isNodeMaterial&&te.setObject(r,e),Ce===!0&&qe.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,St(e,t,r),e.side=0,e.needsUpdate=!0,St(e,t,r),e.side=2):St(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),te!==null&&te.renderStart(e,t,n),M=Ge.get(n),M.init(t),P.push(M),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(M.pushLight(e),e.castShadow&&M.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(M.pushLight(e),e.castShadow&&M.pushShadow(e))}),M.setupLights(),te!==null&&te.updateLights(M.state.lightsArray),we=this.localClippingEnabled,Ce=qe.init(this.clippingPlanes,we),Ce===!0&&qe.setGlobalState(this.clippingPlanes,t),te!==null&&Ye.render(M.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];dt(o,n,t,e),r.add(o)}else dt(i,n,t,e),r.add(i)}}),M=P.pop(),te!==null&&te.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=B.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}Me.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let ft=null;function pt(e){ft&&ft(e)}function mt(){gt.stop()}function ht(){gt.start()}let gt=new cs;gt.setAnimationLoop(pt),typeof self<`u`&&gt.setContext(self),this.setAnimationLoop=function(e){ft=e,U.setAnimationLoop(e),e===null?gt.stop():gt.start()},U.addEventListener(`sessionstart`,mt),U.addEventListener(`sessionend`,ht),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){H(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(ee===!0)return;te!==null&&te.renderStart(e,t);let n=U.enabled===!0&&U.isPresenting===!0,r=F!==null&&(L===null||n)&&F.begin(I,L);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),U.enabled===!0&&U.isPresenting===!0&&(F===null||F.isCompositing()===!1)&&(U.cameraAutoUpdate===!0&&U.updateCamera(t),t=U.getCamera()),e.isScene===!0&&e.onBeforeRender(I,e,t,L),M=Ge.get(e,P.length),M.init(t),M.state.textureUnits=Ie.getTextureUnits(),P.push(M),Te.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),Se.setFromProjectionMatrix(Te,He,t.reversedDepth),we=this.localClippingEnabled,Ce=qe.init(this.clippingPlanes,we),k=We.get(e,N.length),k.init(),N.push(k),U.enabled===!0&&U.isPresenting===!0){let e=I.xr.getDepthSensingMesh();e!==null&&_t(e,t,-1/0,I.sortObjects)}_t(e,t,0,I.sortObjects),k.finish(),te!==null&&te.updateLights(M.state.lightsArray),I.sortObjects===!0&&k.sort(_e,ve),ke=U.enabled===!1||U.isPresenting===!1||U.hasDepthSensing()===!1,ke&&Xe.addToRenderList(k,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ce===!0&&qe.beginShadows();let i=M.state.shadowsArray;if(Ye.render(i,e,t),Ce===!0&&qe.endShadows(),(r&&F.hasRenderPass())===!1){let n=k.opaque,r=k.transmissive;if(M.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];yt(n,r,e,a)}ke&&Xe.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];vt(k,e,n,n.viewport)}}else r.length>0&&yt(n,r,e,t),ke&&Xe.render(e),vt(k,e,t)}L!==null&&oe===0&&(Ie.updateMultisampleRenderTarget(L),Ie.updateRenderTargetMipmap(L)),r&&F.end(I),e.isScene===!0&&e.onAfterRender(I,e,t),nt.resetDefaultState(),se=-1,ce=null,P.pop(),P.length>0?(M=P[P.length-1],Ie.setTextureUnits(M.state.textureUnits),Ce===!0&&qe.setGlobalState(I.clippingPlanes,M.state.camera)):M=null,N.pop(),k=N.length>0?N[N.length-1]:null,te!==null&&te.renderEnd()};function _t(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)M.pushLightProbeGrid(e);else if(e.isLight)M.pushLight(e),e.castShadow&&M.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(Se)){r&&De.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Te);let i=Be.update(e),a=e.material;a.visible&&k.push(e,i,a,n,De.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(Se))){let i=Be.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),De.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),De.copy(e.boundingSphere.center)),De.applyMatrix4(e.matrixWorld).applyMatrix4(Te)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&k.push(e,i,c,n,De.z,s,t)}}else a.visible&&k.push(e,i,a,n,De.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)_t(i[e],t,n,r)}function vt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;M.setupLightsView(n),Ce===!0&&qe.setGlobalState(I.clippingPlanes,n),r&&z.viewport(le.copy(r)),i.length>0&&bt(i,t,n),a.length>0&&bt(a,t,n),o.length>0&&bt(o,t,n),z.buffers.depth.setTest(!0),z.buffers.depth.setMask(!0),z.buffers.color.setMask(!0),z.setPolygonOffset(!1)}function yt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[r.id]===void 0){let e=Me.has(`EXT_color_buffer_half_float`)||Me.has(`EXT_color_buffer_float`);M.state.transmissionRenderTarget[r.id]=new qt(1,1,{generateMipmaps:!0,type:e?g:l,minFilter:c,samples:Math.max(4,Ne.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Pt.workingColorSpace})}let a=M.state.transmissionRenderTarget[r.id],o=r.viewport||le;a.setSize(o.z*I.transmissionResolutionScale,o.w*I.transmissionResolutionScale);let s=I.getRenderTarget(),u=I.getActiveCubeFace(),d=I.getActiveMipmapLevel();I.setRenderTarget(a),I.getClearColor(fe),pe=I.getClearAlpha(),pe<1&&I.setClearColor(16777215,.5),I.clear(),ke&&Xe.render(n);let f=I.toneMapping;I.toneMapping=0;let p=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),M.setupLightsView(r),Ce===!0&&qe.setGlobalState(I.clippingPlanes,r),bt(e,n,r),Ie.updateMultisampleRenderTarget(a),Ie.updateRenderTargetMipmap(a),Me.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,xt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(Ie.updateMultisampleRenderTarget(a),Ie.updateRenderTargetMipmap(a))}I.setRenderTarget(s,u,d),I.setClearColor(fe,pe),p!==void 0&&(r.viewport=p),I.toneMapping=f}function bt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&xt(o,t,n,s,l,c)}}function xt(e,t,n,r,i,a){te!==null&&i.isNodeMaterial&&te.setObject(e,i),e.onBeforeRender(I,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(I,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,I.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,I.renderBufferDirect(n,t,r,i,e,a),i.side=2):I.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(I,t,n,r,i,a)}function St(e,t,n){t.isScene!==!0&&(t=Oe);let r=B.get(e),i=M.state.lights,a=M.state.shadowsArray,o=i.state.version,s=Ve.getParameters(e,i.state,a,t,n,M.state.lightProbeGridArray),c=Ve.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Le.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,ct),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return wt(e,s),d}else s.uniforms=Ve.getUniforms(e),te!==null&&e.isNodeMaterial&&te.build(e,n,s),e.onBeforeCompile(s,I),d=Ve.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=qe.uniform),wt(e,s),r.needsLights=Dt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=M.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function Ct(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=rl.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function wt(e,t){let n=B.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function Tt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];D.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(D))return n}return null}function W(e,t,n,r,i){t.isScene!==!0&&(t=Oe),Ie.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=L===null?I.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:Pt.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Le.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(h=I.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=B.get(r),y=M.state.lights;if(Ce===!0&&(we===!0||e!==ce)){let t=e===ce&&r.id===se;qe.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==qe.numPlanes||v.numIntersection!==qe.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=M.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let x=v.currentProgram;b===!0&&(x=St(r,t,i),te&&r.isNodeMaterial&&te.onUpdateProgram(r,x,v));let S=!1,C=!1,w=!1,T=x.getUniforms(),E=v.uniforms;if(z.useProgram(x.program)&&(S=!0,C=!0,w=!0),r.id!==se&&(se=r.id,C=!0),v.needsLights){let e=Tt(M.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,C=!0)}if(S||ce!==e){z.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),T.setValue(R,`projectionMatrix`,e.projectionMatrix),T.setValue(R,`viewMatrix`,e.matrixWorldInverse);let t=T.map.cameraPosition;t!==void 0&&t.setValue(R,Ee.setFromMatrixPosition(e.matrixWorld)),Ne.logarithmicDepthBuffer&&T.setValue(R,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&T.setValue(R,`isOrthographic`,e.isOrthographicCamera===!0),ce!==e&&(ce=e,C=!0,w=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&T.setValue(R,`sunShadowMap`,y.state.sunShadowMap,Ie),y.state.directionalShadowMap.length>0&&T.setValue(R,`directionalShadowMap`,y.state.directionalShadowMap,Ie),y.state.spotShadowMap.length>0&&T.setValue(R,`spotShadowMap`,y.state.spotShadowMap,Ie),y.state.pointShadowMap.length>0&&T.setValue(R,`pointShadowMap`,y.state.pointShadowMap,Ie)),i.isSkinnedMesh){T.setOptional(R,i,`bindMatrix`),T.setOptional(R,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),T.setValue(R,`boneTexture`,e.boneTexture,Ie))}i.isBatchedMesh&&(T.setOptional(R,i,`batchingTexture`),T.setValue(R,`batchingTexture`,i._matricesTexture,Ie),T.setOptional(R,i,`batchingIdTexture`),T.setValue(R,`batchingIdTexture`,i._indirectTexture,Ie),T.setOptional(R,i,`batchingColorTexture`),i._colorsTexture!==null&&T.setValue(R,`batchingColorTexture`,i._colorsTexture,Ie));let D=n.morphAttributes;if((D.position!==void 0||D.normal!==void 0||D.color!==void 0)&&Qe.update(i,n,x),(C||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,T.setValue(R,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(E.envMapIntensity.value=t.environmentIntensity),E.dfgLUT!==void 0&&(E.dfgLUT.value=wu()),C){if(T.setValue(R,`toneMappingExposure`,I.toneMappingExposure),v.needsLights&&Et(E,w),a&&r.fog===!0&&Ue.refreshFogUniforms(E,a),Ue.refreshMaterialUniforms(E,r,ge,he,M.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;E.probesSH.value=e.texture,E.probesMin.value.copy(e.boundingBox.min),E.probesMax.value.copy(e.boundingBox.max),E.probesResolution.value.copy(e.resolution)}rl.upload(R,Ct(v),E,Ie)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(rl.upload(R,Ct(v),E,Ie),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&T.setValue(R,`center`,i.center),T.setValue(R,`modelViewMatrix`,i.modelViewMatrix),T.setValue(R,`normalMatrix`,i.normalMatrix),T.setValue(R,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];rt.update(n,x),rt.bind(n,x)}}return x}function Et(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function Dt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return ae},this.getActiveMipmapLevel=function(){return oe},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(e,t,n){let r=B.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),B.get(e.texture).__webglTexture=t,B.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=B.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){L=e,ae=t,oe=n;let r=null,i=!1,a=!1;if(e){let o=B.get(e);if(o.__useDefaultFramebuffer!==void 0){z.bindFramebuffer(R.FRAMEBUFFER,o.__webglFramebuffer),le.copy(e.viewport),ue.copy(e.scissor),de=e.scissorTest,z.viewport(le),z.scissor(ue),z.setScissorTest(de),se=-1;return}if(o.__webglFramebuffer===void 0)Ie.setupRenderTarget(e);else if(o.__hasExternalTextures)Ie.rebindTextures(e,B.get(e.texture).__webglTexture,B.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&B.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);Ie.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=B.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&Ie.useMultisampledRTT(e)===!1?B.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,le.copy(e.viewport),ue.copy(e.scissor),de=e.scissorTest}else le.copy(ye).multiplyScalar(ge).floor(),ue.copy(be).multiplyScalar(ge).floor(),de=xe;if(n!==0&&(r=ne),z.bindFramebuffer(R.FRAMEBUFFER,r)&&z.drawBuffers(e,r),z.viewport(le),z.scissor(ue),z.setScissorTest(de),i){let r=B.get(e.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=B.get(e.textures[t]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=B.get(e.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,t.__webglTexture,n)}se=-1};function Ot(e){let t=B.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Ne.textureFormatReadable(e.format),t.__typeReadable=Ne.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){H(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=B.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){z.bindFramebuffer(R.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+s);let u=Ot(o);if(u.__formatReadable===!1){H(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){H(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&R.readPixels(t,n,r,i,tt.convert(c),tt.convert(l),a)}finally{let e=L===null?null:B.get(L).__webglFramebuffer;z.bindFramebuffer(R.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=B.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){z.bindFramebuffer(R.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+s);let d=Ot(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,f),R.bufferData(R.PIXEL_PACK_BUFFER,a.byteLength,R.STREAM_READ),R.readPixels(t,n,r,i,tt.convert(l),tt.convert(u),0),R.bindBuffer(R.PIXEL_PACK_BUFFER,null);let p=L===null?null:B.get(L).__webglFramebuffer;z.bindFramebuffer(R.FRAMEBUFFER,p);let m=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await Ze(R,m,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,f),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,a),R.bindBuffer(R.PIXEL_PACK_BUFFER,null),R.deleteBuffer(f),R.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;Ie.setTexture2D(e,0),R.copyTexSubImage2D(R.TEXTURE_2D,n,0,0,o,s,i,a),z.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=tt.convert(t.format),_=tt.convert(t.type),v;t.isData3DTexture?(Ie.setTexture3D(t,0),v=R.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(Ie.setTexture2DArray(t,0),v=R.TEXTURE_2D_ARRAY):(Ie.setTexture2D(t,0),v=R.TEXTURE_2D),z.activeTexture(R.TEXTURE0),z.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,t.flipY),z.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),z.pixelStorei(R.UNPACK_ALIGNMENT,t.unpackAlignment);let y=z.getParameter(R.UNPACK_ROW_LENGTH),b=z.getParameter(R.UNPACK_IMAGE_HEIGHT),x=z.getParameter(R.UNPACK_SKIP_PIXELS),S=z.getParameter(R.UNPACK_SKIP_ROWS),C=z.getParameter(R.UNPACK_SKIP_IMAGES);z.pixelStorei(R.UNPACK_ROW_LENGTH,h.width),z.pixelStorei(R.UNPACK_IMAGE_HEIGHT,h.height),z.pixelStorei(R.UNPACK_SKIP_PIXELS,l),z.pixelStorei(R.UNPACK_SKIP_ROWS,u),z.pixelStorei(R.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=B.get(e),r=B.get(t),h=B.get(n.__renderTarget),g=B.get(r.__renderTarget);z.bindFramebuffer(R.READ_FRAMEBUFFER,h.__webglFramebuffer),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,B.get(e).__webglTexture,i,d+n),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,B.get(t).__webglTexture,a,m+n)),R.blitFramebuffer(l,u,o,s,f,p,o,s,R.DEPTH_BUFFER_BIT,R.NEAREST);z.bindFramebuffer(R.READ_FRAMEBUFFER,null),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||B.has(e)){let n=B.get(e),r=B.get(t);z.bindFramebuffer(R.READ_FRAMEBUFFER,re),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,ie);for(let e=0;e<c;e++)w?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,n.__webglTexture,i),T?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,r.__webglTexture,a),i===0?T?R.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):R.copyTexSubImage2D(v,a,f,p,l,u,o,s):R.blitFramebuffer(l,u,o,s,f,p,o,s,R.COLOR_BUFFER_BIT,R.NEAREST);z.bindFramebuffer(R.READ_FRAMEBUFFER,null),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?R.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?R.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):R.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):R.texSubImage2D(R.TEXTURE_2D,a,f,p,o,s,g,_,h);z.pixelStorei(R.UNPACK_ROW_LENGTH,y),z.pixelStorei(R.UNPACK_IMAGE_HEIGHT,b),z.pixelStorei(R.UNPACK_SKIP_PIXELS,x),z.pixelStorei(R.UNPACK_SKIP_ROWS,S),z.pixelStorei(R.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&R.generateMipmap(v),z.unbindTexture()},this.initRenderTarget=function(e){B.get(e).__webglFramebuffer===void 0&&Ie.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?Ie.setTextureCube(e,0):e.isData3DTexture?Ie.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?Ie.setTexture2DArray(e,0):Ie.setTexture2D(e,0),z.unbindTexture()},this.resetState=function(){ae=0,oe=0,L=null,z.reset(),nt.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return He}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Pt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Pt._getUnpackColorSpace()}};Pt.enabled=!1;var Eu=`
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
`,Du=`
float luma(vec3 c){ return dot(c, vec3(0.299, 0.587, 0.114)); }
mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
// Screen-space halftone dot coverage for a darkness value in [0,1].
float halftone(vec2 frag, float cell, float angle, float darkness){
  vec2 p = rot2(angle) * frag / cell;
  vec2 c = fract(p) - 0.5;
  float r = sqrt(clamp(darkness, 0.0, 1.0)) * 0.62;
  float d = length(c);
  float aa = fwidth(d) * 0.55 + 0.01; // about a device pixel of edge: a printed dot, not a soft blob
  // no ink at no tone (the antialiasing alone used to leave a faint speck at every cell centre)
  return (1.0 - smoothstep(r - aa, r + aa, d)) * smoothstep(0.0, 0.01, darkness);
}
// Parallel hatching lines (for deep shadow), coverage in [0,1].
float hatch(vec2 frag, float cell, float angle, float darkness){
  vec2 p = rot2(angle) * frag / cell;
  float d = abs(fract(p.y) - 0.5);
  float w = clamp(darkness, 0.0, 1.0) * 0.42;
  float aa = fwidth(p.y) * 0.8 + 0.02;
  return 1.0 - smoothstep(w - aa, w + aa, d);
}
`;function Ou(e,n=33){let r=new Uint8Array(n*n*n*4),i=0;for(let t=0;t<n;t++)for(let a=0;a<n;a++)for(let o=0;o<n;o++){let[s,c,l]=e(o/(n-1),a/(n-1),t/(n-1));r[i++]=Math.round(ku(s)*255),r[i++]=Math.round(ku(c)*255),r[i++]=Math.round(ku(l)*255),r[i++]=255}let a=new Yt(r,n,n,n);return a.format=w,a.type=l,a.minFilter=a.magFilter=o,a.wrapS=a.wrapT=a.wrapR=t,a.unpackAlignment=1,a.colorSpace=``,a.needsUpdate=!0,a.userData.size=n,a}var ku=e=>Math.min(1,Math.max(0,e)),Au=(e,t,n)=>{let r=ku((n-e)/(t-e));return r*r*(3-2*r)},ju=(e,t,n)=>.2126*e+.7152*t+.0722*n;function Mu(e,t,n){let r=Math.max(e,t,n),i=r-Math.min(e,t,n),a=0;return i>1e-6&&(a=r===e?(t-n)/i%6:r===t?(n-e)/i+2:(e-t)/i+4,a*=60,a<0&&(a+=360)),[a,r>0?i/r:0,r]}function Nu(e,t,n){let r=n*t,i=r*(1-Math.abs(e/60%2-1)),a=n-r,o=0,s=0,c=0;return e<60?[o,s,c]=[r,i,0]:e<120?[o,s,c]=[i,r,0]:e<180?[o,s,c]=[0,r,i]:e<240?[o,s,c]=[0,i,r]:e<300?[o,s,c]=[i,0,r]:[o,s,c]=[r,0,i],[o+a,s+a,c+a]}function Pu(e,t,n){let r=Math.abs((e-t+540)%360-180);return 1-Au(n*.6,n,r)}var Fu=`
precision highp float;
precision highp sampler3D;
${Eu}
${Du}
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

  // grade: tint the shadows, warm or cool the highlights
  float l = luma(col);
  col = mix(col, uGradeShadow, (1.0 - smoothstep(0.0, 0.55, l)) * uGradeAmt);
  col = mix(col, col * uGradeHigh, smoothstep(0.45, 1.0, l) * uGradeAmt);

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
  if (uLutAmt > 0.0) { float ls = uLutSize; vec3 cin = uCapHue > 0.5 ? col / max(1.0, max(col.r, max(col.g, col.b))) : clamp(col, 0.0, 1.0); vec3 lc = texture(tLut, clamp(cin, 0.0, 1.0) * ((ls - 1.0) / ls) + 0.5 / ls).rgb; col = mix(col, lc, uLutAmt); }

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
}`,X={uRes:{value:new W(1,1)},uNear:{value:.1},uFar:{value:100},uOrtho:{value:0},uLine:{value:1.6},uBoil:{value:.6},uDepthK:{value:.035},uNormalK:{value:.35},uLineAlpha:{value:1},uInk:{value:new q(`#0a0912`)},uPaperCol:{value:new q(`#efe9dc`)},uGrain:{value:.045},uFibre:{value:.06},uMisregPx:{value:1.2},uMisregDir:{value:new W(.8,-.6)},uGradeShadow:{value:new q(`#14112a`)},uGradeHigh:{value:new q(`#ffffff`)},uGradeAmt:{value:.25},uVignette:{value:.35},uGlowAmt:{value:1},uTime:{value:0},uStep:{value:0},uImpact:{value:0},uImpactMode:{value:1},uImpactSeed:{value:0},uImpactCenter:{value:new W(.5,.5)},uImpInk:{value:new q(`#0a0912`)},uImpPaper:{value:new q(`#f3eee2`)},uImpAccent:{value:new q(`#3dff8f`)},uFade:{value:0},uFadeCol:{value:new q(`#000000`)},uBloomAmt:{value:0},uBloomDots:{value:.6},uFogCol:{value:new q(`#10142a`)},uFogNear:{value:20},uFogFar:{value:200},uFogAmt:{value:0},uFogLine:{value:.85},uSpeed:{value:0},uSpeedCenter:{value:new W(.5,.5)},uSpeedCol:{value:new q(`#ffffff`)},uBloomThresh:{value:1.2},tLut:{value:Ou((e,t,n)=>[e,t,n],2)},uLutAmt:{value:0},uLutSize:{value:2},uInvProj:{value:new K},uCamWorld:{value:new K},uHFogAmt:{value:0},uHFogY:{value:0},uHFogK:{value:.01},uFogDirAmt:{value:0},uFogGlow:{value:0},uFogHorizon:{value:new q(`#304040`)},tPlane:{value:null},uPlaneAmt:{value:0},uPlaneR:{value:0},uPlaneLed:{value:0},uPlaneC:{value:new W},uPlaneRect:{value:new Gt(-1e3,-750,2e3,1500)},uPlaneCol:{value:new q(`#4fe3b2`)},uPlaneHot:{value:new q(`#eafff6`)},uFocusP:{value:new G},uFocusAmt:{value:0},uFocusR0:{value:200},uFocusR1:{value:600},uFocusLine:{value:.7},uFocusInk:{value:.6},uFocusDesat:{value:.5},uFocusHaze:{value:.3},uFocusSoft:{value:1.6},uFocusMisreg:{value:1.2},uFocusBloom:{value:.7},uVigC:{value:new W(.5,.5)},uCap:{value:new q(`#ffffff`)},uCapAmt:{value:0},uBloomHard:{value:0},uCapHue:{value:0},uFocusNear:{value:0},uFocusZ:{value:0},uSpeedPrint:{value:0},uVigR:{value:new W(.35,1.05)},uBloomOver:{value:0},uBloomFlat:{value:0},uImpTri:{value:0},uSpeedIn:{value:.46},uSpeedMask:{value:new G(0,0,0)},uPlaneOct:{value:0},uPlaneFoldAmt:{value:0},uPlaneFold:{value:new q(`#ece6d4`)},uSpeedInk:{value:0},uBloomCell:{value:4.5},uBloomCov:{value:.62},uPlanePrint:{value:0},uImpAccentInk:{value:0},uLineFar:{value:new W(1500,2600)},uLineFarAmt:{value:0}},Iu=new G;function Lu(e){X.uFocusZ.value=-Iu.copy(X.uFocusP.value).applyMatrix4(e.matrixWorldInverse).z}function Ru(e,t=1){X.tLut.value=e,X.uLutSize.value=e.userData.size??e.image.width,X.uLutAmt.value=t}var zu=`
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
}`,Bu=`in vec3 position; in vec2 uv; out vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,Vu=`
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
}`,Hu=`
precision highp float;
uniform sampler2D tSrc; uniform vec2 uDir;
in vec2 vUv; out highp vec4 fragColor;
void main(){
  vec3 s = texture(tSrc, vUv).rgb * 0.2270;
  s += (texture(tSrc, vUv + uDir * 1.3846).rgb + texture(tSrc, vUv - uDir * 1.3846).rgb) * 0.3162;
  s += (texture(tSrc, vUv + uDir * 3.2308).rgb + texture(tSrc, vUv - uDir * 3.2308).rgb) * 0.0703;
  fragColor = vec4(s, 1.0);
}`,Uu=`
precision highp float;
uniform sampler2D tA, tB; uniform float uB;
in vec2 vUv; out highp vec4 fragColor;
void main(){ fragColor = vec4(texture(tA, vUv).rgb + texture(tB, vUv).rgb * uB, 1.0); }`,Wu=class{constructor(e,{glow:t=!0,kuwahara:n=0,bloom:i=!1}={}){if(this.renderer=e,this.useBloom=i,this.useGlow=t,this.kuwahara=n,this.depth=new xi(1,1),this.depth.type=m,this.rt=new qt(1,1,{count:2,depthBuffer:!0,depthTexture:this.depth,minFilter:r,magFilter:r,type:l}),this.rt.textures[0].minFilter=o,this.rt.textures[0].magFilter=o,this.glowRT=new qt(1,1,{depthBuffer:!0,depthTexture:this.depth,type:g}),this.blank=new Qr(new Uint8Array([0,0,0,255]),1,1),this.blank.needsUpdate=!0,this.mat=new co({glslVersion:Ve,vertexShader:`in vec3 position; in vec2 uv; out vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,fragmentShader:Fu,uniforms:{...X,tColor:{value:this.rt.textures[0]},tNormal:{value:this.rt.textures[1]},tDepth:{value:this.depth},tGlow:{value:t?this.glowRT.texture:this.blank},tBloom:{value:this.blank}},depthTest:!1,depthWrite:!1}),n>0&&(this.paintRT=new qt(1,1,{depthBuffer:!1,type:l}),this.kMat=new co({glslVersion:Ve,vertexShader:`in vec3 position; in vec2 uv; out vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,fragmentShader:zu,uniforms:{tSrc:{value:this.rt.textures[0]},uRes:X.uRes,uRadius:{value:n}},depthTest:!1,depthWrite:!1}),this.kQuad=new J(new qa(2,2),this.kMat),this.kQuad.frustumCulled=!1,this.kScene=new Mn,this.kScene.add(this.kQuad),this.mat.uniforms.tColor.value=this.paintRT.texture),i){let e=()=>new qt(1,1,{depthBuffer:!1,type:g,minFilter:o,magFilter:o});this.bA=e(),this.bB=e(),this.bC=e(),this.bD=e(),this.bOut=e();let t=(e,t)=>new co({glslVersion:Ve,vertexShader:Bu,fragmentShader:e,uniforms:t,depthTest:!1,depthWrite:!1});this.brightMat=t(Vu,{tColor:{value:this.rt.textures[0]},tNormal:{value:this.rt.textures[1]},tDepth:{value:this.depth},uThresh:X.uBloomThresh,uInvProj:X.uInvProj,uCamWorld:X.uCamWorld,uFocusP:X.uFocusP,uFocusAmt:X.uFocusAmt,uFocusR0:X.uFocusR0,uFocusR1:X.uFocusR1,uFocusBloom:X.uFocusBloom}),this.blurMat=t(Hu,{tSrc:{value:null},uDir:{value:new W}}),this.addMat=t(Uu,{tA:{value:null},tB:{value:null},uB:{value:.9}}),this.fsQuad=new J(new qa(2,2),this.brightMat),this.fsQuad.frustumCulled=!1,this.fsScene=new Mn,this.fsScene.add(this.fsQuad),this.mat.uniforms.tBloom.value=this.bOut.texture}this.quad=new J(new qa(2,2),this.mat),this.quad.frustumCulled=!1,this.postScene=new Mn,this.postScene.add(this.quad),this.postCam=new zo(-1,1,1,-1,0,1)}setSize(e,t,n){let r=Math.max(1,Math.round(e*n)),i=Math.max(1,Math.round(t*n));if(this.rt.setSize(r,i),this.glowRT.setSize(r,i),this.paintRT&&this.paintRT.setSize(r,i),this.useBloom){let e=Math.max(1,r>>2),t=Math.max(1,i>>2),n=Math.max(1,r>>3),a=Math.max(1,i>>3);this.bA.setSize(e,t),this.bB.setSize(e,t),this.bC.setSize(n,a),this.bD.setSize(n,a),this.bOut.setSize(e,t)}X.uRes.value.set(r,i)}fs(e,t){this.fsQuad.material=e,this.renderer.setRenderTarget(t),this.renderer.render(this.fsScene,this.postCam)}bloomPass(){if(!this.useBloom||X.uBloomAmt.value<=0)return;let e=this.blurMat.uniforms;this.fs(this.brightMat,this.bA),e.tSrc.value=this.bA.texture,e.uDir.value.set(1/this.bA.width,0),this.fs(this.blurMat,this.bB),e.tSrc.value=this.bB.texture,e.uDir.value.set(0,1/this.bA.height),this.fs(this.blurMat,this.bA),e.tSrc.value=this.bA.texture,e.uDir.value.set(1/this.bC.width,0),this.fs(this.blurMat,this.bC),e.tSrc.value=this.bC.texture,e.uDir.value.set(0,1/this.bC.height),this.fs(this.blurMat,this.bD),e.tSrc.value=this.bD.texture,e.uDir.value.set(2/this.bC.width,0),this.fs(this.blurMat,this.bC),e.tSrc.value=this.bC.texture,e.uDir.value.set(0,2/this.bC.height),this.fs(this.blurMat,this.bD);let t=this.addMat.uniforms;t.tA.value=this.bA.texture,t.tB.value=this.bD.texture,this.fs(this.addMat,this.bOut)}renderPasses(e,t=null,n=1,r=1){let i=this.renderer,a=e[0].camera;X.uNear.value=a.near,X.uFar.value=a.far,X.uOrtho.value=0,X.uInvProj.value.copy(a.projectionMatrixInverse),X.uCamWorld.value.copy(a.matrixWorld),Lu(a),i.setRenderTarget(this.rt),i.setClearColor(0,0),i.setScissorTest(!1),i.clear(!0,!0,!0);let o=this.rt.width,s=this.rt.height,c=o/n,l=s/r;for(let t of e){if(t.rect){let[e,n,r,a]=t.rect,o=Math.round(e*c),u=Math.round(s-(n+a)*l),d=Math.round(r*c),f=Math.round(a*l);this.rt.viewport.set(o,u,d,f),this.rt.scissor.set(o,u,d,f),this.rt.scissorTest=!0,i.setRenderTarget(this.rt),t.clearDepth&&i.clear(!1,!0,!1)}else this.rt.viewport.set(0,0,o,s),this.rt.scissor.set(0,0,o,s),this.rt.scissorTest=!1,i.setRenderTarget(this.rt),t.clearDepth&&i.clear(!1,!0,!1);i.render(t.scene,t.camera)}if(this.rt.viewport.set(0,0,o,s),this.rt.scissor.set(0,0,o,s),this.rt.scissorTest=!1,this.useGlow){let n=this.glowRT;if(n.viewport.set(0,0,o,s),n.scissor.set(0,0,o,s),n.scissorTest=!1,i.setRenderTarget(n),i.setClearColor(0,1),i.clear(!0,!1,!1),t){for(let r of e)if(r.glow!==!1){if(r.rect){let[e,t,a,o]=r.rect,u=Math.round(e*c),d=Math.round(s-(t+o)*l),f=Math.round(a*c),p=Math.round(o*l);n.viewport.set(u,d,f,p),n.scissor.set(u,d,f,p),n.scissorTest=!0,i.setRenderTarget(n),i.clear(!0,!1,!1)}else n.viewport.set(0,0,o,s),n.scissorTest=!1,i.setRenderTarget(n);i.render(t,r.camera)}}n.viewport.set(0,0,o,s),n.scissor.set(0,0,o,s),n.scissorTest=!1}this.bloomPass(),i.setRenderTarget(null),i.render(this.postScene,this.postCam)}render(e,t,n=null){let r=this.renderer;X.uNear.value=t.near,X.uFar.value=t.far,X.uOrtho.value=+!!t.isOrthographicCamera,X.uInvProj.value.copy(t.projectionMatrixInverse),X.uCamWorld.value.copy(t.matrixWorld),Lu(t),r.setRenderTarget(this.rt),r.setClearColor(0,0),r.clear(!0,!0,!0),r.render(e,t),this.useGlow&&(r.setRenderTarget(this.glowRT),r.setClearColor(0,1),r.clear(!0,!1,!1),n&&r.render(n,t)),this.paintRT&&(r.setRenderTarget(this.paintRT),r.render(this.kScene,this.postCam)),this.bloomPass(),r.setRenderTarget(null),r.render(this.postScene,this.postCam)}},Z={uKeyDir:{value:new G(.45,.75,.5).normalize()},uTime:{value:0},uStep:{value:0},uPx:{value:1},uShadeTint:{value:new q(`#1b1640`)},uDotInk:{value:new q(`#0b0a12`)},uRimCol:{value:new q(`#9fffd0`)},uGlint:{value:new q(`#ffffff`)},uFillDir:{value:new G(-.8,.1,-.4).normalize()},uFillCol:{value:new q(`#ff3550`)},uFillAmt:{value:0}},Gu=`
in vec3 position; in vec3 normal; in vec2 uv;
#ifdef USE_INSTANCING
in mat4 instanceMatrix;
flat out float vInst; // flat: interpolated, the id wobbled across a face and printed ink speckle all over it
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
in float _inkid; flat out float vId;
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
}`,Ku=`
precision highp float;
${Eu}
${Du}
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
flat in float vInst;
#endif
#ifdef USE_INSTANCE_COLOR
in vec3 vIColor;
#endif
#ifdef USE_AOV
in float vAO;
#endif
#ifdef USE_VID
flat in float vId;
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
  if (uId < 249.5) idOut = 1.0 + mod(uId + floor(vInst + 0.5) * 7.0, 198.0);
#endif
#ifdef USE_MAP
  vec4 mp = texture(uMap, vUv);
  base = mix(base, mp.rgb, mp.a * uMapAmt);
#endif
  if (uEmissive > 0.5) {
    gColor = vec4(base * uGain, uAlpha);
#ifdef USE_VID
    gNormal = vec4(N * 0.5 + 0.5, mod(floor(vId + uId + 0.5), 250.0) / 255.0);
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
  gNormal = vec4(N * 0.5 + 0.5, mod(floor(vId + uId + 0.5), 250.0) / 255.0);
#else
  gNormal = vec4(N * 0.5 + 0.5, idOut / 255.0);
#endif
}`,qu=1,Ju=0;function Yu(){return qu=qu%198+1,qu}function Xu(){return Ju=(Ju+1)%5,250+Ju}function Zu(e={}){let t={},n={uKeyDir:Z.uKeyDir,uTime:Z.uTime,uStep:Z.uStep,uPx:Z.uPx,uShadeTint:Z.uShadeTint,uDotInk:Z.uDotInk,uRimCol:Z.uRimCol,uGlint:Z.uGlint,uFillDir:Z.uFillDir,uFillCol:Z.uFillCol,uFillAmt:Z.uFillAmt,uBase:{value:new q(e.base??`#cccccc`)},uBack:{value:new q(e.back??e.base??`#cccccc`)},uMidMix:{value:e.mid??.42},uDarkMix:{value:e.dark??.78},uRimAmt:{value:e.rim??1},uSpecAmt:{value:e.spec??.8},uBrushAmt:{value:e.brush??.32},uBrushScale:{value:e.brushScale??1.6},uStrokeAmt:{value:e.stroke??.1},uStrokeDir:{value:new G(...e.strokeDir??[.3,1,.2])},uDotCell:{value:e.dotCell??5.5},uDotAngle:{value:e.dotAngle??.785},uDotAmt:{value:e.dot??.85},uHatchAmt:{value:e.hatch??0},uId:{value:e.id??(e.emissive&&e.bloom!==!1?Xu():Yu())},uEmissive:{value:+!!e.emissive},uLift:{value:e.lift??0},uAlpha:{value:e.alpha??1},uAOAmt:{value:e.ao??.9},uGain:{value:e.gain??1}};e.flat&&(t.FLAT=``),e.map&&(t.USE_MAP=``,n.uMap={value:e.map},n.uMapAmt={value:e.mapAmt??1}),e.bake&&(t.USE_BAKE=``,n.uBake={value:e.bake}),e.paint&&(t.USE_PAINT=``,n.uPaint={value:e.paint},n.uPaintA={value:new q(e.paintA??`#ffd400`)},n.uPaintB={value:new q(e.paintB??`#ff3b30`)}),e.instanced&&(t.USE_INSTANCING=``),e.vertexColors&&(t.USE_VCOLOR=``),e.instanceColor&&(t.USE_INSTANCE_COLOR=``),e.aoVertex&&(t.USE_AOV=``),e.vertexIds&&(t.USE_VID=``),e.grid&&(t.USE_GRID=``,n.uGrid={value:new W(...e.grid)},n.uGridW={value:e.gridW??1.6},n.uPulseCol={value:new q(e.pulseCol??`#ffffff`)},n.uPulse={value:e.pulse??0});let r=new co({glslVersion:Ve,vertexShader:Gu,fragmentShader:Ku,uniforms:n,defines:t,side:e.side??0,transparent:!!e.transparent,depthWrite:e.depthWrite??!0});return r.userData.ink=!0,r}var Qu={uTop:{value:new q(`#0d0b1c`)},uBottom:{value:new q(`#1d1640`)},uDot:{value:new q(`#06050c`)},uGlowCol:{value:new q(`#2b6b52`)},uGlowPos:{value:new W(.7,.55)},uGlowAmt:{value:.35},uCloud:{value:.18},uDotAmt:{value:.55},uDotCell:{value:7},uShift:{value:new W(0,0)},uGridCol:{value:new q(`#eee6d3`)},uGridAmt:{value:0},uGridCell:{value:56},uShaftAmt:{value:0},uShaftCol:{value:new q(`#e9c98a`)},uShaftSrc:{value:new W(.15,1.15)},uShaftDir:{value:0}};function $u(e){let t=new co({glslVersion:Ve,vertexShader:`in vec3 position; in vec2 uv; out vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.9999, 1.0); }`,fragmentShader:`
      precision highp float;
      ${Eu}
      ${Du}
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
      }`,uniforms:{...Qu,uPx:e,uStep:{value:0},uRes:{value:new W(1,1)}},depthTest:!1,depthWrite:!1}),n=new J(new qa(2,2),t);return n.frustumCulled=!1,n.renderOrder=-1e3,n}var ed=class{constructor({ids:e,onChange:t,onSide:n,start:r=0,root:i=window,wrap:a=!1}){this.ids=e,this.wrap=a,this.onChange=t,this.onSide=n||(()=>!1),this.index=r,this.lockUntil=0,this.wheelAcc=0,this.lastWheel=0,this.gestureUsed=!1,this.touch=null,this.enabled=!0,this.listeners=new Set,i.addEventListener(`wheel`,e=>this.wheel(e),{passive:!1}),i.addEventListener(`keydown`,e=>this.key(e)),i.addEventListener(`touchstart`,e=>this.touchStart(e),{passive:!0}),i.addEventListener(`touchmove`,e=>this.touchMove(e),{passive:!1}),i.addEventListener(`touchend`,e=>this.touchEnd(e),{passive:!0}),window.addEventListener(`hashchange`,()=>this.fromHash(`hash`)),document.addEventListener(`click`,e=>{let t=e.target.closest&&e.target.closest(`a[href^="#"]`);if(!t)return;let n=t.getAttribute(`href`).slice(1),r=this.indexOf(n);r<0||(e.preventDefault(),this.go(r,`link`),history.replaceState(null,``,`#`+n))}),document.addEventListener(`focusin`,e=>{let t=e.target.closest&&e.target.closest(`[data-sec]`);if(!t)return;let n=this.indexOf(t.dataset.sec);n>=0&&n!==this.index&&this.go(n,`focus`,!0)})}on(e){return this.listeners.add(e),()=>this.listeners.delete(e)}indexOf(e){let t=this.ids.indexOf(e);if(t>=0)return t;let n=document.getElementById(e),r=n&&n.closest(`[data-sec]`);return r?this.ids.indexOf(r.dataset.sec):-1}fromHash(e=`hash`){let t=location.hash.slice(1);if(!t)return!1;let n=this.indexOf(t);return n>=0&&n!==this.index&&(this.go(n,e,e===`initial`),!0)}busy(){return performance.now()<this.lockUntil}go(e,t=`api`,n=!1){if(e=Math.max(0,Math.min(this.ids.length-1,e)),e===this.index||!this.enabled||this.busy()&&!n)return!1;let r=this.index;this.index=e;let i=this.onChange(e,r,t)??900;this.lockUntil=performance.now()+i;for(let n of this.listeners)n(e,r,t);return!0}step(e,t){let n=this.ids.length,r=this.index+e;return this.go(this.wrap&&r>=n?0:r,t)}scrollableTarget(e){let t=e.target;for(;t&&t!==document.body;){if(t.dataset&&t.dataset.scroll!==void 0&&t.scrollHeight>t.clientHeight+2)return t;t=t.parentElement}return null}wheel(e){if(!this.enabled)return;let t=this.scrollableTarget(e);if(t){let n=t.scrollTop<=0,r=t.scrollTop+t.clientHeight>=t.scrollHeight-1;if(e.deltaY<0&&!n||e.deltaY>0&&!r)return}e.preventDefault();let n=performance.now(),r=e.deltaX,i=e.deltaY;n-this.lastWheel>180&&(this.gestureUsed=!1,this.wheelAcc=0,this.sideAcc=0),this.lastWheel=n,!this.gestureUsed&&(Math.abs(r)>Math.abs(i)?(this.sideAcc=(this.sideAcc||0)+r,Math.abs(this.sideAcc)>60&&(this.onSide(Math.sign(this.sideAcc))&&(this.gestureUsed=!0),this.sideAcc=0)):(this.wheelAcc+=i*(e.deltaMode===1?30:1),Math.abs(this.wheelAcc)>36&&!this.busy()&&(this.step(Math.sign(this.wheelAcc),`wheel`)&&(this.gestureUsed=!0),this.wheelAcc=0)))}key(e){if(!this.enabled||e.defaultPrevented||e.altKey||e.ctrlKey||e.metaKey)return;let t=e.target;if(t&&(t.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)))return;let n=0;if(e.key===`ArrowDown`||e.key===`PageDown`||e.key===` `&&!e.shiftKey)n=1;else if(e.key===`ArrowUp`||e.key===`PageUp`||e.key===` `&&e.shiftKey)n=-1;else if(e.key===`Home`){e.preventDefault(),this.go(0,`key`);return}else if(e.key===`End`){e.preventDefault(),this.go(this.ids.length-1,`key`);return}else if(e.key===`ArrowRight`||e.key===`ArrowLeft`){this.onSide(e.key===`ArrowRight`?1:-1)&&e.preventDefault();return}if(n){if(t&&t.closest&&t.closest(`[data-scroll]`))return;e.preventDefault(),this.step(n,`key`)}}touchStart(e){if(e.touches.length!==1){this.touch=null;return}let t=e.touches[0];this.touch={x:t.clientX,y:t.clientY,t:performance.now(),inner:this.scrollableTarget(e),done:!1}}touchMove(e){if(!this.touch||this.touch.done)return;let t=e.touches[0],n=t.clientX-this.touch.x,r=t.clientY-this.touch.y;this.touch.inner||(Math.abs(r)>8||Math.abs(n)>8)&&e.preventDefault()}touchEnd(e){let t=this.touch;if(this.touch=null,!t||t.inner)return;let n=e.changedTouches[0],r=n.clientX-t.x,i=n.clientY-t.y;Math.max(Math.abs(r),Math.abs(i))<44||(Math.abs(r)>Math.abs(i)*1.2?this.onSide(r<0?1:-1):this.step(i<0?1:-1,`swipe`))}},td={hit:[{m:1,a:1},{m:2,a:1}],big:[{m:3,a:1},{m:1,a:1},{m:2,a:1}],soft:[{m:1,a:.55}],accent:[{m:3,a:1},{m:3,a:.6}],sig:[{m:3,a:1},{m:1,a:1}]},nd=class{constructor({reduced:e=!1,frame:t=1/16}={}){this.reduced=e,this.frame=t,this.queue=[],this.t=0,this.last=-10,this.shake={x:0,y:0,amt:0},this.root=document.documentElement}hit({seq:e=`hit`,center:t=[.5,.5],shake:n=1,at:r=0}={}){if(this.reduced)return;let i=performance.now()/1e3;if(i-this.last<.7)return;this.last=i;let a=td[e]||td.hit;this.queue=a.map((e,t)=>({...e,t:r+t*this.frame})),this.queue.push({m:0,a:0,t:r+a.length*this.frame}),this.t=0,X.uImpactCenter.value.set(t[0],t[1]),X.uImpactSeed.value=Math.random()*100,this.shake.amt=Math.max(this.shake.amt,n)}update(e){if(this.queue.length)for(this.t+=e;this.queue.length&&this.queue[0].t<=this.t;){let e=this.queue.shift();X.uImpact.value=e.a,X.uImpactMode.value=e.m||X.uImpactMode.value,e.a>0?(this.root.dataset.impact=String(e.m),X.uImpactSeed.value+=1.7):delete this.root.dataset.impact}this.shake.amt=Math.max(0,this.shake.amt-e*3.2);let t=this.shake.amt*this.shake.amt,n=Math.floor(performance.now()/62);return n!==this._step&&(this._step=n,this.shake.x=(Math.random()*2-1)*t,this.shake.y=(Math.random()*2-1)*t),this.shake}},rd=`xini-sound`,id=new class{constructor(){this.on=!1,this.ctx=null,this.listeners=new Set,this.lastPlay={}}ensure(){if(this.ctx)return this.ctx;let e=window.AudioContext||window.webkitAudioContext;if(!e)return null;let t=new e;this.ctx=t,this.master=t.createGain(),this.master.gain.value=.55;let n=t.createDynamicsCompressor();n.threshold.value=-16,n.ratio.value=4,this.master.connect(n),n.connect(t.destination);let r=t.sampleRate*1.5;this.noise=t.createBuffer(1,r,t.sampleRate);let i=this.noise.getChannelData(0);for(let e=0;e<r;e++)i[e]=Math.random()*2-1;return t}set(e){this.on=e;try{localStorage.setItem(rd,e?`1`:`0`)}catch{}if(e){let e=this.ensure();e&&e.state===`suspended`&&e.resume(),this.ambient(!0)}else this.ambient(!1);for(let t of this.listeners)t(e)}toggle(){this.set(!this.on)}onChange(e){this.listeners.add(e)}remembered(){try{return localStorage.getItem(rd)===`1`}catch{return!1}}src(e){let t=this.ctx.createBufferSource();return t.buffer=this.noise,t.start(this.ctx.currentTime,Math.random()*.5,e+.05),t}env(e,t,n,r,i){let a=this.ctx.createGain();return a.gain.setValueAtTime(1e-4,t),a.gain.exponentialRampToValueAtTime(r,t+n),a.gain.exponentialRampToValueAtTime(1e-4,t+n+i),e.connect(a),a.connect(this.master),a}filt(e,t,n=1){let r=this.ctx.createBiquadFilter();return r.type=e,r.frequency.value=t,r.Q.value=n,r}tone(e,t,n,r,i,a,o){let s=this.ctx.createOscillator();s.type=e,s.frequency.setValueAtTime(t,r),s.frequency.exponentialRampToValueAtTime(Math.max(20,n),r+i+o),this.env(s,r,i,a,o),s.start(r),s.stop(r+i+o+.05)}play(e,t={}){if(!this.on||!this.ctx)return;let n=performance.now();if(n-(this.lastPlay[e]||0)<45)return;this.lastPlay[e]=n;let r=this.ctx,i=r.currentTime+.005,a=t.gain??1;switch(e){case`tick`:this.tone(`sine`,2400,1800,i,.002,.05*a,.03);break;case`snap`:{let e=this.src(.06),t=this.filt(`highpass`,2500),n=this.filt(`bandpass`,4200,1.4);e.connect(t),t.connect(n),this.env(n,i,.001,.5*a,.05),this.tone(`triangle`,1700,500,i,.001,.12*a,.03);break}case`fold`:{let e=this.src(.3),t=this.filt(`bandpass`,900,.9);t.frequency.setValueAtTime(700,i),t.frequency.exponentialRampToValueAtTime(2800,i+.22),e.connect(t),this.env(t,i,.03,.22*a,.2);break}case`slam`:{this.tone(`sine`,140,42,i,.002,.9*a,.24);let e=this.src(.2),t=this.filt(`lowpass`,600);e.connect(t),this.env(t,i,.001,.5*a,.12);let n=this.src(.08),r=this.filt(`highpass`,3e3);n.connect(r),this.env(r,i,.001,.25*a,.05);break}case`stamp`:{this.tone(`sine`,95,50,i,.002,.7*a,.16);let e=this.src(.12),t=this.filt(`bandpass`,1400,.7);e.connect(t),this.env(t,i,.001,.35*a,.08);break}case`whoosh`:{let e=this.src(.5),t=this.filt(`bandpass`,3e3,.8);t.frequency.setValueAtTime(3200,i),t.frequency.exponentialRampToValueAtTime(400,i+.38),e.connect(t),this.env(t,i,.08,.28*a,.3);break}case`hiss`:{let e=t.dur??.35,n=this.src(e+.2),o=this.filt(`bandpass`,7e3,.7),s=this.filt(`highpass`,3500);n.connect(s),s.connect(o);let c=r.createGain();c.gain.setValueAtTime(1e-4,i),c.gain.exponentialRampToValueAtTime(.32*a,i+.03),c.gain.setValueAtTime(.32*a,i+e),c.gain.exponentialRampToValueAtTime(1e-4,i+e+.1),o.connect(c),c.connect(this.master);break}case`rattle`:for(let e=0;e<5;e++){let t=i+e*.075+Math.random()*.01,n=this.src(.03),r=this.filt(`bandpass`,3e3+Math.random()*1500,4);n.connect(r),this.env(r,t,.001,.3*a,.025)}break;case`splat`:{let e=this.src(.25),t=this.filt(`lowpass`,1800);e.connect(t),this.env(t,i,.002,.5*a,.16),this.tone(`sine`,220,70,i,.002,.35*a,.12);break}case`dial`:{let e=this.src(.03),t=this.filt(`bandpass`,5200,6);e.connect(t),this.env(t,i,5e-4,.45*a,.02),this.tone(`square`,1300,900,i,5e-4,.05*a,.018),this.tone(`sine`,180,120,i,.001,.2*a,.05);break}case`unlock`:{this.tone(`sine`,90,48,i,.002,.8*a,.22);let e=this.src(.12),t=this.filt(`bandpass`,900,1.2);e.connect(t),this.env(t,i,.001,.4*a,.08),this.tone(`triangle`,2200,2150,i+.01,.002,.06*a,.5),this.tone(`triangle`,3310,3290,i+.01,.002,.035*a,.4);let n=this.src(.4),r=this.filt(`highpass`,4e3);n.connect(r),this.env(r,i+.05,.02,.12*a,.3);break}case`seat`:{let e=this.src(.04),t=this.filt(`bandpass`,2600,3);e.connect(t),this.env(t,i,5e-4,.6*a,.03);let n=this.src(.04),r=this.filt(`bandpass`,1500,4);n.connect(r),this.env(r,i+.018,5e-4,.4*a,.03),this.tone(`sine`,140,70,i,.002,.45*a,.09);break}case`relay`:{let e=this.src(.02),t=this.filt(`highpass`,2e3);e.connect(t),this.env(t,i,3e-4,.35*a,.012),this.tone(`square`,260,200,i,5e-4,.04*a,.015);break}case`power`:{let e=r.createOscillator();e.type=`sawtooth`,e.frequency.setValueAtTime(90,i),e.frequency.exponentialRampToValueAtTime(1400,i+.9);let t=this.filt(`lowpass`,2400,2);e.connect(t),this.env(t,i,.25,.09*a,.7),e.start(i),e.stop(i+1.1),this.tone(`sine`,45,60,i,.4,.4*a,.6);break}}}fan(e){if(!this.amb)return;let t=this.ctx.currentTime;this.amb.ng.gain.setTargetAtTime(.25+.45*e,t,.25),this.amb.nb.frequency.setTargetAtTime(400+700*e,t,.25)}ambient(e){if(this.ctx){if(e&&!this.amb){let e=this.ctx,t=e.createGain();t.gain.value=1e-4;let n=this.filt(`lowpass`,260,.6),r=e.createOscillator(),i=e.createOscillator();r.type=`sawtooth`,i.type=`sawtooth`,r.frequency.value=55,i.frequency.value=55.4;let a=e.createBufferSource();a.buffer=this.noise,a.loop=!0;let o=this.filt(`bandpass`,400,.5),s=e.createGain();s.gain.value=.25,a.connect(o),o.connect(s),s.connect(t),r.connect(n),i.connect(n),n.connect(t),t.connect(this.master),r.start(),i.start(),a.start(),t.gain.exponentialRampToValueAtTime(.06,e.currentTime+2.5),this.amb={g:t,ng:s,nb:o,nodes:[r,i,a]}}else if(!e&&this.amb){let{g:e,nodes:t}=this.amb;this.amb=null,e.gain.exponentialRampToValueAtTime(1e-4,this.ctx.currentTime+.4),setTimeout(()=>t.forEach(e=>{try{e.stop()}catch{}}),500)}}}},ad=e=>e<.5?4*e*e*e:1-(-2*e+2)**3/2,od=e=>e*e*e*(10+e*(-15+6*e));function sd(e){let t=e.length,n=e.map(e=>e[0]),r=e.map(e=>e[1]),i=[],a=Array(t).fill(0);for(let e=0;e<t-1;e++)i.push((r[e+1]-r[e])/(n[e+1]-n[e]));for(let e=1;e<t-1;e++)a[e]=i[e-1]*i[e]<=0?0:3*(n[e+1]-n[e-1])/((2*n[e+1]-n[e]-n[e-1])/i[e-1]+(n[e+1]+n[e]-2*n[e-1])/i[e]);return e=>{if(e<=n[0])return r[0];if(e>=n[t-1])return r[t-1];let i=0;for(;e>n[i+1];)i++;let o=n[i+1]-n[i],s=(e-n[i])/o,c=s*s,l=c*s;return(2*l-3*c+1)*r[i]+(l-2*c+s)*o*a[i]+(-2*l+3*c)*r[i+1]+(l-c)*o*a[i+1]}}var cd=class{constructor(e,t,n=[],{closed:r=!1,speed:i=34,minT:a=1.5,maxT:o=3.2,bank:s=.9,maxBank:c=.35,profile:l=`cubic`,lookAhead:u=0,damp:d=0,settle:f=0}={}){this.camera=e,this.stops=t,this.legs=n,this.closed=r,this.speed=i,this.minT=a,this.maxT=o,this.bank=s,this.maxBank=c,this.profile=l,this.lookAheadAmt=u,this.damp=d,this.settleAmt=f,this.index=0,this.pose=this.copyPose(t[0]),this.flight=null,this.offset={p:new G,t:new G},this.offsetTarget={p:new G,t:new G},this.speedNow=0,this.lastPos=this.pose.p.clone(),this.q=null,this.dt=1/60,this.settle=null}copyPose(e){return{p:new G(...[].concat(e.p.toArray?e.p.toArray():e.p)),t:new G(...[].concat(e.t.toArray?e.t.toArray():e.t)),fov:e.fov??45,roll:e.roll??0}}V(e){return e.isVector3?e.clone():new G(...e)}legPts(e){let t=this.legs[e];return t?Array.isArray(t)?t:t.pts||[]:[]}chain(e,t){let n=this.stops.length,r=[],i=t>e?1:-1,a=Math.abs(t-e);if(this.closed){let r=(t-e+n)%n,o=(e-t+n)%n;r<=o?(i=1,a=r):(i=-1,a=o)}let o=e;r.push(this.stops[o]);for(let e=0;e<a;e++){let e=(o+i+n)%n,t=i>0?this.legPts(o):this.legPts(e).slice().reverse();for(let e of t)r.push(e);r.push(this.stops[e]),o=e}return this.lastHop=a===1?i>0?e:(e-1+n)%n:-1,this.lastDir=i,r}go(e,{duration:t}={}){if(e===this.index&&!this.flight)return 0;let n=this.index,r=this.chain(n,e),i={p:this.pose.p.clone(),t:this.pose.t.clone(),fov:this.pose.fov,roll:this.pose.roll},a=[i.p,...r.slice(1).map(e=>this.V(e.p))],o=[i.t,...r.slice(1).map(e=>this.V(e.t))],s=[i.fov,...r.slice(1).map(e=>e.fov??45)],c=[i.roll,...r.slice(1).map(e=>e.roll??0)],l=new Li(a,!1,`centripetal`,.5),u=new Li(o,!1,`centripetal`,.5);l.arcLengthDivisions=400,u.arcLengthDivisions=400;let d=l.getLength(),f=r.filter(e=>e.id).length-1,p=this.lastHop>=0?this.legs[this.lastHop]:null,m=p&&!Array.isArray(p)&&!this.flight?p:{},h=m.dur??null,g=null;if(m.warp){let e=sd(m.warp);g=this.lastDir>0?e:t=>1-e(1-t)}let _=t??h??Tt.clamp(d/this.speed,this.minT,this.maxT+Math.max(0,f-1)*.5),v=[0];for(let e=1;e<a.length;e++)v.push(v[e-1]+a[e].distanceTo(a[e-1]));let y=v.map(e=>e/(v[v.length-1]||1));return this.flight={pc:l,tc:u,F:s,R:c,keys:y,t:0,dur:_,from:n,to:e,warp:g,look:m.look??this.lookAheadAmt},this.index=e,this.settle=null,this.offsetTarget.p.set(0,0,0),this.offsetTarget.t.set(0,0,0),_}nudge(e,t){this.offsetTarget.p.copy(this.V(e)),this.offsetTarget.t.copy(this.V(t))}sampleKeyed(e,t,n){let r=1;for(;r<t.length-1&&t[r]<n;)r++;let i=(n-t[r-1])/Math.max(1e-6,t[r]-t[r-1]);return e[r-1]+(e[r]-e[r-1])*Tt.clamp(i,0,1)}sampleT(e,t){let n=t*(e.length-1),r=Math.min(e.length-2,Math.floor(n)),i=n-r;return e[r]+(e[r+1]-e[r])*i}get flying(){return!!this.flight}get progress(){return this.flight?this.flight.t/this.flight.dur:1}update(e){if(this.dt=e,this.flight){let t=this.flight;t.t=Math.min(t.dur,t.t+e);let n=t.t/t.dur,r=Tt.clamp(t.warp?t.warp(n):this.profile===`minjerk`?od(n):ad(n),0,1),i=Tt.clamp(t.pc.getUtoTmapping(r),0,1);if(this.pose.p.copy(t.pc.getPoint(i)),this.pose.t.copy(t.tc.getPoint(i)),t.look>0){let e=Math.sin(Math.PI*r),n=t.look*e*e,i=this.pose.t.distanceTo(this.pose.p),a=t.pc.getPointAt(Math.min(1,r+.06)).sub(this.pose.p);a.lengthSq()>1e-6&&this.pose.t.lerp(a.normalize().multiplyScalar(i).add(this.pose.p),n)}this.pose.fov=this.sampleT(t.F,i);let a=this.sampleT(t.R,i),o=this.pose.t.clone().sub(this.pose.p).normalize(),s=new G().crossVectors(o,new G(0,1,0)).normalize(),c=t.pc.getTangentAt(Math.max(0,r-.04)),l=t.pc.getTangentAt(Math.min(1,r+.04)).sub(c).dot(s);if(a+=Tt.clamp(-l*this.bank,-this.maxBank,this.maxBank)*Math.sin(Math.PI*r),this.pose.roll=a,t.t>=t.dur){let e=this.stops[t.to],n=t.pc.getTangentAt(1);this.pose=this.copyPose(e),this.flight=null,this.settleAmt>0&&(this.settle={t:0,dir:n})}}let t=1-Math.exp(-e*3.2);this.offset.p.lerp(this.offsetTarget.p,t),this.offset.t.lerp(this.offsetTarget.t,t);let n=this.camera;if(n.position.copy(this.pose.p).add(this.offset.p),this.settle){let t=this.settle;t.t+=e;let r=this.settleAmt*Math.sin(t.t*2*Math.PI/.7)*Math.exp(-t.t/.22);n.position.addScaledVector(t.dir,r),t.t>1.2&&(this.settle=null)}this.lookAt=this.pose.t.clone().add(this.offset.t),n.fov=this.pose.fov;let r=n.position.distanceTo(this.lastPos)/Math.max(e,1e-4);this.lastPos.copy(n.position),this.speedNow+=(r-this.speedNow)*(1-Math.exp(-e*6))}apply(e={x:0,y:0},t={x:0,y:0}){let n=this.camera;n.position.x+=e.x+t.x,n.position.y+=e.y+t.y,n.updateProjectionMatrix(),n.lookAt(this.lookAt),n.rotateZ(this.pose.roll),this.damp>0&&(!this.q||this.snapNext?(this.q=n.quaternion.clone(),this.snapNext=!1):(this.q.slerp(n.quaternion,1-Math.exp(-this.dt*this.damp)),n.quaternion.copy(this.q))),n.updateMatrixWorld()}snap(){this.snapNext=!0}},ld={fetchedAt:`2026-10-02T23:51:41.539Z`,username:`XiniDev`,repos:[{name:`xini.dev`,full_name:`XiniDev/xini.dev`,description:`Personal site of Xini, systems engineer: featured projects, background and contact details.`,html_url:`https://github.com/XiniDev/xini.dev`,homepage:`https://xini.dev`,language:`TypeScript`,topics:[],pushed_at:`2026-10-02T23:50:19Z`,archived:!1,fork:!1},{name:`Gloam`,full_name:`XiniDev/Gloam`,description:`Self-hosted 3D virtual tabletop for fifth-edition RPGs in the browser, with automated spells from the open rules, line of sight and physics dice.`,html_url:`https://github.com/XiniDev/Gloam`,homepage:null,language:`TypeScript`,topics:[],pushed_at:`2026-10-01T10:09:05Z`,archived:!1,fork:!1},{name:`saltancy-web`,full_name:`XiniDev/saltancy-web`,description:`Website for Saltancy, a technical consultancy for web, backend and mobile systems, built with Next.js, Tailwind CSS and Motion.`,html_url:`https://github.com/XiniDev/saltancy-web`,homepage:`https://saltancy-web.vercel.app`,language:`TypeScript`,topics:[],pushed_at:`2026-06-15T00:34:40Z`,archived:!1,fork:!1},{name:`getajobman`,full_name:`XiniDev/getajobman`,description:`Job tracker in Next.js and Supabase that reads a posting from its URL and drafts a tailored CV and cover letter with a language model.`,html_url:`https://github.com/XiniDev/getajobman`,homepage:`https://getajobman.vercel.app`,language:`TypeScript`,topics:[],pushed_at:`2026-04-02T18:45:37Z`,archived:!1,fork:!1},{name:`dbridger`,full_name:`XiniDev/dbridger`,description:`PyQt6 desktop app that queries a local SQLite database in plain English through Gemini, masking emails and card numbers before the model sees them.`,html_url:`https://github.com/XiniDev/dbridger`,homepage:null,language:`Python`,topics:[],pushed_at:`2026-03-08T15:03:43Z`,archived:!1,fork:!1},{name:`limit-order-book`,full_name:`XiniDev/limit-order-book`,description:`Limit order book matching engine in C++ and Python with price-time priority, limit and market orders, and O(1) cancellation.`,html_url:`https://github.com/XiniDev/limit-order-book`,homepage:null,language:`C++`,topics:[],pushed_at:`2025-12-22T00:28:05Z`,archived:!1,fork:!1},{name:`AI-Search-Algorithms`,full_name:`XiniDev/AI-Search-Algorithms`,description:`Coursework: breadth-first, depth-first, uniform-cost, best-first, A* and SMA* search in Java, with bidirectional modes, routing flights on a polar grid.`,html_url:`https://github.com/XiniDev/AI-Search-Algorithms`,homepage:null,language:`Java`,topics:[],pushed_at:`2025-11-28T16:30:22Z`,archived:!1,fork:!1},{name:`LeadingOnesDAC`,full_name:`XiniDev/LeadingOnesDAC`,description:`MSc dissertation: dynamic algorithm configuration on the LeadingOnes benchmark with DDQN and model-based Dyna-DDQN agents.`,html_url:`https://github.com/XiniDev/LeadingOnesDAC`,homepage:null,language:`Jupyter Notebook`,topics:[],pushed_at:`2025-11-28T14:22:00Z`,archived:!1,fork:!1},{name:`wincrazyyy.github.io`,full_name:`XiniDev/wincrazyyy.github.io`,description:`Earlier React version of the WS Math tutoring website, with IBDP, A-Level and IGCSE course pages, pricing, reviews and an enquiry form.`,html_url:`https://github.com/XiniDev/wincrazyyy.github.io`,homepage:null,language:`TypeScript`,topics:[],pushed_at:`2025-10-30T01:44:22Z`,archived:!1,fork:!1},{name:`Jungle-Board-Game-Java`,full_name:`XiniDev/Jungle-Board-Game-Java`,description:`The Jungle board game in Java with a Swing GUI for two local players, legal-move highlighting and hand-drawn piece art.`,html_url:`https://github.com/XiniDev/Jungle-Board-Game-Java`,homepage:null,language:`Java`,topics:[],pushed_at:`2025-08-28T12:47:17Z`,archived:!1,fork:!1},{name:`NullVector-Processing`,full_name:`XiniDev/NullVector-Processing`,description:`2D platformer in Processing (Java) with its own physics and contact resolution, pathfinding enemies and a two-phase boss fight.`,html_url:`https://github.com/XiniDev/NullVector-Processing`,homepage:null,language:`Processing`,topics:[],pushed_at:`2025-08-28T12:38:22Z`,archived:!1,fork:!1},{name:`notes-api`,full_name:`XiniDev/notes-api`,description:`REST API for per-user notes on Express and MongoDB, with JWT authentication, hashed passwords, an admin role and tag search, run with Docker Compose.`,html_url:`https://github.com/XiniDev/notes-api`,homepage:null,language:`JavaScript`,topics:[],pushed_at:`2025-06-17T16:28:58Z`,archived:!1,fork:!1},{name:`aws-streaming-demo`,full_name:`XiniDev/aws-streaming-demo`,description:`React and Vite demo that streams video through Amazon CloudFront.`,html_url:`https://github.com/XiniDev/aws-streaming-demo`,homepage:null,language:`TypeScript`,topics:[],pushed_at:`2024-06-26T14:15:56Z`,archived:!1,fork:!1},{name:`firebase-auth-demo`,full_name:`XiniDev/firebase-auth-demo`,description:`React demo of Firebase Authentication: email and Google sign-in, a protected dashboard route, and deploys to Firebase Hosting from GitHub Actions.`,html_url:`https://github.com/XiniDev/firebase-auth-demo`,homepage:null,language:`TypeScript`,topics:[],pushed_at:`2024-06-05T00:09:21Z`,archived:!1,fork:!1},{name:`AutoScroller`,full_name:`XiniDev/AutoScroller`,description:`Godot 4 prototype of a 3D auto-runner: the player moves forward on its own, steers left and right, and jumps to avoid falling off.`,html_url:`https://github.com/XiniDev/AutoScroller`,homepage:null,language:`GDScript`,topics:[],pushed_at:`2024-06-01T21:13:39Z`,archived:!1,fork:!1},{name:`ecs-platformer-demo`,full_name:`XiniDev/ecs-platformer-demo`,description:`2D platformer demo in C++ and SDL2 built on an entity component system (after Austin Morlan's design), with physics, collision and weapons.`,html_url:`https://github.com/XiniDev/ecs-platformer-demo`,homepage:null,language:`C`,topics:[],pushed_at:`2024-05-21T19:42:34Z`,archived:!1,fork:!1},{name:`EnGarde`,full_name:`XiniDev/EnGarde`,description:`Turn-based fencing game in Python and pygame, played against scripted bots or reinforcement-learning agents (DQN and self-play DRQN) trained with PyTorch.`,html_url:`https://github.com/XiniDev/EnGarde`,homepage:null,language:`Python`,topics:[],pushed_at:`2023-05-03T13:12:13Z`,archived:!1,fork:!1},{name:`graphics-shooter-game`,full_name:`XiniDev/graphics-shooter-game`,description:`Totem Hunter: a first-person shooter in three.js where you light totems to stop enemies spawning, with two guns, aim-down-sights and loot crates.`,html_url:`https://github.com/XiniDev/graphics-shooter-game`,homepage:null,language:`JavaScript`,topics:[],pushed_at:`2023-01-30T14:46:08Z`,archived:!1,fork:!1},{name:`bitventory`,full_name:`XiniDev/bitventory`,description:`Inventory system for pygame with item stacking, stack splitting, sorting and drag-and-drop between windows (fork of codethulu/bitventory).`,html_url:`https://github.com/XiniDev/bitventory`,homepage:null,language:`Python`,topics:[],pushed_at:`2022-07-18T18:48:22Z`,archived:!1,fork:!0},{name:`deutsche-bank-mentorship`,full_name:`XiniDev/deutsche-bank-mentorship`,description:`University group project: a mentoring platform with mentor suggestions, milestones, sessions, ratings and chat, built in React and Django.`,html_url:`https://github.com/XiniDev/deutsche-bank-mentorship`,homepage:null,language:`TypeScript`,topics:[],pushed_at:`2022-03-14T05:34:15Z`,archived:!1,fork:!1},{name:`En-Garde--old-`,full_name:`XiniDev/En-Garde--old-`,description:`Earlier terminal version of EnGarde in C: a turn-based fencing game where you plan up to six actions a turn against a bot or a friend.`,html_url:`https://github.com/XiniDev/En-Garde--old-`,homepage:null,language:`C`,topics:[],pushed_at:`2021-11-04T22:07:50Z`,archived:!1,fork:!1},{name:`JumpAndShoot`,full_name:`XiniDev/JumpAndShoot`,description:`Simple first-person shooter made in Unity 2019.3, shared as a Windows build.`,html_url:`https://github.com/XiniDev/JumpAndShoot`,homepage:null,language:null,topics:[],pushed_at:`2021-10-21T15:11:05Z`,archived:!1,fork:!1},{name:`AngryBallGame`,full_name:`XiniDev/AngryBallGame`,description:`Early Unity 2018.4 game, shared as a Windows build.`,html_url:`https://github.com/XiniDev/AngryBallGame`,homepage:null,language:null,topics:[],pushed_at:`2021-10-21T15:04:03Z`,archived:!1,fork:!1}]},ud=new URL(`voetutor-D0CnBXJm.webp`,import.meta.url).href,dd=new URL(`gloam-DLcjgkGw.webp`,import.meta.url).href,fd=new URL(`saltancy-website--oXGscN2.webp`,import.meta.url).href,pd=new URL(`dbridger-F0p74JUc.webp`,import.meta.url).href,md={name:`Xini`,role:`Systems engineer`,statement:`I build complete, self-hosted products with modern AI woven in.`,credentials:[`MSc Artificial Intelligence, St Andrews`,`BSc Computer Science, Warwick`],email:`xini@saltancy.com`,github:`https://github.com/XiniDev`,linkedin:`https://www.linkedin.com/in/xinidev`,saltancy:`https://saltancy.com`,contactLine:`I take on client projects through my consultancy, Saltancy.`},hd=[{id:`systems`,label:`Systems`,jp:`システム`,heading:`Whole systems, built solo.`,body:`I take ambitious ideas all the way to production on my own: real-time 3D, multiplayer backends, data, infrastructure and the interface people actually use.`,support:[`Full stack`,`Real-time 3D`,`Multiplayer`]},{id:`ai`,label:`AI`,jp:`人工知能`,heading:`AI that does real work.`,body:`I build AI into products where it earns its place: agents that act on real systems, MCP servers that give models real tools, and local models when the data should stay put.`,support:[`Agents`,`MCP servers`,`Local models`]},{id:`security`,label:`Security`,jp:`防御`,heading:`Secure by default.`,body:`I self-host what I build and design for Zero Trust, with OWASP practice and PII redaction there from the first commit.`,support:[`Self-hosting`,`OWASP`,`Zero Trust`]}],gd=[{slug:`voetutor`,name:`VOETutor`,kicker:`Client work`,summary:`Curated marketplace of vetted IB tutors, with on-demand video lessons and progress tracking.`,tags:[`Next.js`,`Supabase`],url:`https://voetutor.com`,linkLabel:`voetutor.com`,credit:`Built through Saltancy`,image:ud,accent:`#16a085`,year:`2026`,alt:`The VOETutor home page: a search box and cards for vetted IB tutors with their subjects and hourly rates.`},{slug:`gloam`,name:`Gloam`,kicker:`Own product`,summary:`Self-hosted 3D virtual tabletop for D&D 5e, with shadow-casting light, per-creature line of sight and all 339 spells from D&D’s open rules, automated.`,tags:[`TypeScript`,`React Three Fiber`,`Colyseus`,`SQLite`,`MCP`],url:`https://github.com/XiniDev/Gloam`,linkLabel:`Source on GitHub`,image:dd,accent:`#e0a33a`,year:`2026`,alt:`Gloam’s 3D tabletop: a stone dungeon map seen at an angle, with goblin and Crypt Warden tokens and health bars.`},{slug:`saltancy`,name:`Saltancy`,kicker:`Consultancy`,summary:`My consultancy for end-to-end technical work and custom software. Client projects run through it.`,tags:[`Next.js`,`Tailwind CSS`,`Motion`],url:`https://saltancy.com`,linkLabel:`saltancy.com`,image:fd,accent:`#f26b1d`,year:`2026`,alt:`Saltancy’s landing page: a serif headline beside a wireframe cube on a dark background.`}],_d={"XiniDev/dbridger":{name:`DBridger`,summary:`Autonomous agent that queries legacy databases in plain English, with PII redaction built in.`,image:pd},"XiniDev/getajobman":{name:`getajobman`,summary:`Job tracker in Next.js and Supabase that reads a posting from its URL and drafts a tailored CV and cover letter with a language model.`},"XiniDev/notes-api":{name:`Notes API`,summary:`Secure REST API where each user creates, reads, updates and deletes their own notes, with filtering, built on Node.js, Express and MongoDB following OWASP guidance.`},"XiniDev/LeadingOnesDAC":{name:`LeadingOnes DAC`,summary:`MSc dissertation: a model-based deep reinforcement learning agent that learns to tune an optimisation algorithm while it runs.`},"XiniDev/AI-Search-Algorithms":{name:`AI Search Algorithms`,summary:`Classic AI search algorithms, from breadth-first and depth-first to A* and SMA*, planning flight routes on a polar grid.`},"XiniDev/NullVector-Processing":{name:`NullVector`,summary:`Processing (Java) platformer with gravity-affected projectiles, boss phases, bounce damage and a full GUI.`},"XiniDev/Jungle-Board-Game-Java":{name:`Jungle Game & JunGUI`,summary:`Java implementation of the Jungle board game with a Swing GUI, multiplayer support and legal-move highlighting.`},"XiniDev/ecs-platformer-demo":{name:`ECS Platformer Demo`,summary:`Platformer demo that tests an Entity-Component-System architecture, written in C++ with SDL2.`}},vd=new Set([`xini.dev`,`Gloam`,`saltancy-web`]),yd=[{key:`overthrow`,name:`Overthrow Synthetica`,description:`Two-week, two-person game jam demo for the Warwick Game Dev Society, made with Three.js and WebGL.`,url:`https://github.com/BlueTentProductions/overthrow-synthetica`,language:`JavaScript`,date:`2023-10-01T00:00:00Z`}],bd=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`],xd=e=>{let t=new Date(e);return`${bd[t.getUTCMonth()]} ${t.getUTCFullYear()}`};function Sd(e=new Date(`2026-10-18T00:00:00Z`),t=24,n=12){let r=[];for(let e of ld.repos){if(e.fork||vd.has(e.name))continue;let t=_d[e.full_name];r.push({key:e.full_name,name:t?.name??e.name,description:t?.summary??e.description??``,url:e.homepage||e.html_url,language:e.language,date:e.pushed_at,archived:e.archived,image:t?.image})}r.push(...yd);let i=Date.UTC(e.getUTCFullYear(),e.getUTCMonth()-t,e.getUTCDate()),a=(e,t)=>Date.parse(t.date)-Date.parse(e.date)||e.name.localeCompare(t.name),o=r.filter(e=>!e.archived&&Date.parse(e.date)>=i).sort(a),s=r.filter(e=>e.archived||Date.parse(e.date)<i).sort(a);return{recent:o.slice(0,n),older:[...o.slice(n),...s]}}var Cd=e=>String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`),wd=(e,t,n=``)=>`<a class="${n}" href="${e}" target="_blank" rel="noopener">${t}<span class="sr"> (opens in a new tab)</span></a>`,Td=[`top`,`systems`,`ai`,`security`,`work`,`contact`],Ed=`<svg viewBox="0 0 32 32" aria-hidden="true"><path class="spk" d="M5 12h5l7-6v20l-7-6H5z"/><path class="w1" d="M21 11c2 2.6 2 7.4 0 10"/><path class="w2" d="M24.5 7.5c4.2 4.6 4.2 12.4 0 17"/><path class="x" d="M21 12l7 8M28 12l-7 8"/></svg>`;function Dd({places:e,mark:t,route:n,deco:r={}}){let i=Sd(),a=e=>wd(e.url,`<span class="ix__name">${Cd(e.name)}</span><span class="ix__desc">${Cd(e.description)}</span><span class="ix__meta">${Cd(e.language||``)}${e.language?` · `:``}Updated ${xd(e.date)}</span>`,`ix`),[o,s,c,l]=n.viewBox.split(` `).map(Number);return`
<a class="skip" href="#work">Skip to work</a>
<header class="bar">
  <a class="bar__mark" href="#top" aria-label="Xini, back to the start">${t}<span class="bar__name" aria-hidden="true">Xini</span></a>
  <nav class="bar__nav" aria-label="Primary">
    <a href="#work">Work</a><a href="#systems">About</a>${wd(md.saltancy,`Consultancy<span class="arr" aria-hidden="true">↗</span>`)}<a href="#contact">Contact</a>
  </nav>
  <button class="bar__sound" type="button" aria-pressed="false" aria-label="Sound">${Ed}</button>
</header>
<main class="stops">
  <section class="stop stop--top" id="top" data-stop="top" aria-labelledby="h-top">
    <div class="card card--hero">${r.top||``}
      <p class="card__place" aria-hidden="true">${Cd(e[0])}</p>
      <p class="card__kicker"><span>${Cd(md.name)}</span><span>${Cd(md.role)}</span></p>
      <h1 id="h-top" class="card__statement">${Cd(md.statement)}</h1>
      <p class="card__cred">${md.credentials.map(e=>`<span>${Cd(e)}</span>`).join(``)}</p>
    </div>
  </section>
  ${hd.map((t,n)=>`
  <section class="stop stop--${t.id}" id="${t.id}" data-stop="${t.id}" aria-labelledby="h-${t.id}">
    <div class="card">${r[t.id]||``}
      <p class="card__place">${Cd(e[n+1])}</p>
      <h2 id="h-${t.id}" class="card__h">${Cd(t.heading)}</h2>
      <p class="card__body">${Cd(t.body)}</p>
      <ul class="tags" aria-label="Focus">${t.support.map(e=>`<li>${Cd(e)}</li>`).join(``)}</ul>
    </div>
  </section>`).join(``)}
  <section class="stop stop--work" id="work" data-stop="work" aria-labelledby="h-work">
    <div class="card card--work">${r.work||``}
      <p class="card__place">${Cd(e[4])}</p>
      <h2 id="h-work" class="sr">Work</h2>
      <ol class="work__list">
        ${gd.map((e,t)=>`
        <li class="proj${t===0?` is-current`:``}" data-i="${t}" style="--accent:${e.accent}">
          <p class="proj__kicker">${Cd(e.kicker)}</p>
          <h3 class="proj__name">${Cd(e.name)}</h3>
          <p class="proj__summary">${Cd(e.summary)}</p>
          <ul class="tags">${e.tags.map(e=>`<li>${Cd(e)}</li>`).join(``)}</ul>
          <p class="proj__links">${wd(e.url,Cd(e.linkLabel)+`<span class="arr" aria-hidden="true">↗</span>`,`btn`)}${e.credit?`<span class="proj__credit">${Cd(e.credit)}</span>`:``}</p>
        </li>`).join(``)}
      </ol>
      <div class="work__pager">
        <button class="pager__btn pager__prev" type="button" aria-label="Previous project"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 4l-8 8 8 8"/></svg></button>
        <span class="pager__dots" aria-hidden="true">${gd.map((e,t)=>`<i${t===0?` class="on"`:``}></i>`).join(``)}</span>
        <button class="pager__btn pager__next" type="button" aria-label="Next project"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4l8 8-8 8"/></svg></button>
        <button class="btn btn--ghost work__all" type="button" aria-controls="index" aria-expanded="false">All projects <span class="work__allcount">${i.recent.length+i.older.length}</span></button>
      </div>
    </div>
  </section>
  <section class="stop stop--contact" id="contact" data-stop="contact" aria-labelledby="h-contact">
    <div class="card card--contact">${r.contact||``}
      <p class="card__place">${Cd(e[5])}</p>
      <h2 id="h-contact" class="card__h">Get in touch</h2>
      <p class="contact__mail"><a href="mailto:${md.email}">${md.email}</a></p>
      <p class="card__body">I take on client projects through my consultancy, ${wd(md.saltancy,`Saltancy`)}.</p>
      <ul class="contact__links"><li>${wd(md.github,`GitHub`)}</li><li>${wd(md.linkedin,`LinkedIn`)}</li></ul>
      <p class="contact__copy">© 2026 Xini</p>
    </div>
  </section>
</main>
<nav class="route" aria-label="Places">
  <svg class="route__map" viewBox="${n.viewBox}" aria-hidden="true"><path class="route__path" d="${n.path}"/><path class="route__done" d="${n.path}"/></svg>
  <ol class="route__list">${Td.map((t,r)=>{let[i,a]=n.nodes[r];return`<li style="--x:${(i-o)/c*100}%;--y:${(a-s)/l*100}%"><a href="#${t}" data-i="${r}"${r===0?` aria-current="true"`:``}><i aria-hidden="true"></i><span>${Cd(e[r])}</span></a></li>`}).join(``)}</ol>
</nav>
<div class="title" aria-hidden="true"><span class="title__text"></span></div>
<aside class="index" id="index" aria-label="All projects" hidden>
  <div class="index__sheet" data-scroll>
    <header class="index__head"><h2>All projects</h2><button class="index__close" type="button" aria-label="Close"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg></button></header>
    <ol class="index__list">${i.recent.map(e=>`<li>${a(e)}</li>`).join(``)}</ol>
    <details class="index__older"><summary>Older projects (${i.older.length})</summary><ol class="index__list">${i.older.map(e=>`<li>${a(e)}</li>`).join(``)}</ol></details>
  </div>
</aside>`}function Od({nav:e,sfx:t,onProject:n,places:r}){let i=[...document.querySelectorAll(`.route__list a`)],a=document.querySelector(`.route__done`),o=a?a.getTotalLength():0,s=[...document.querySelectorAll(`.route__list li`)],c=document.querySelector(`.route__path`),l=s.map((e,t)=>{if(!c)return t/(s.length-1);let n=c.ownerSVGElement.viewBox.baseVal,r=n.x+parseFloat(e.style.getPropertyValue(`--x`))/100*n.width,i=n.y+parseFloat(e.style.getPropertyValue(`--y`))/100*n.height,a=0,l=1/0;for(let e=0;e<=200;e++){let t=c.getPointAtLength(e/200*o),n=(t.x-r)**2+(t.y-i)**2;n<l&&(l=n,a=e/200)}return a}),u=e=>{i.forEach((t,n)=>n===e?t.setAttribute(`aria-current`,`true`):t.removeAttribute(`aria-current`)),a&&(a.style.strokeDasharray=`${o}`,a.style.strokeDashoffset=`${o*(1-l[e])}`)};e.on(e=>u(e)),u(0);let d=[...document.querySelectorAll(`.proj`)],f=[...document.querySelectorAll(`.pager__dots i`)],p=0,m=(e,r=1)=>(e=(e+d.length)%d.length,e!==p&&(d[p].classList.remove(`is-current`),f[p]?.classList.remove(`on`),p=e,d[p].classList.add(`is-current`),d[p].dataset.dir=r>0?`r`:`l`,f[p]?.classList.add(`on`),n?.(p,r),t.play(`whoosh`,{gain:.6}),!0));document.querySelector(`.pager__prev`).addEventListener(`click`,()=>m(p-1,-1)),document.querySelector(`.pager__next`).addEventListener(`click`,()=>m(p+1,1));let h=document.getElementById(`index`),g=document.querySelector(`.work__all`),_=n=>{n?(h.hidden=!1,requestAnimationFrame(()=>h.classList.add(`is-open`)),t.play(`whoosh`),h.querySelector(`.index__close`).focus()):(h.classList.remove(`is-open`),setTimeout(()=>{h.hidden=!0},380),g.focus()),g.setAttribute(`aria-expanded`,String(n)),e.enabled=!n};g.addEventListener(`click`,()=>_(!0)),h.querySelector(`.index__close`).addEventListener(`click`,()=>_(!1)),h.addEventListener(`click`,e=>{e.target===h&&_(!1)}),addEventListener(`keydown`,e=>{e.key===`Escape`&&!h.hidden&&_(!1)});let v=document.querySelector(`.bar__sound`),y=e=>{v.setAttribute(`aria-pressed`,String(e)),document.documentElement.classList.toggle(`sound-on`,e)};v.addEventListener(`click`,()=>{t.toggle(),t.on&&t.play(`snap`)}),t.onChange(y),y(!1),document.addEventListener(`pointerover`,e=>{e.target.closest&&e.target.closest(`a, button`)&&t.play(`tick`)});let b=document.querySelector(`.title`),x=document.querySelector(`.title__text`);return{setProject:(e,t)=>m(e,t),get project(){return p},showTitle:e=>{x.textContent=r[e],b.classList.remove(`is-on`),b.offsetWidth,b.classList.add(`is-on`)},open:_}}var kd=matchMedia(`(prefers-reduced-motion: reduce)`).matches,Ad=new URLSearchParams(location.search);function jd(e){let t=Object.assign(document.createElement(`a`),{href:e,target:`_blank`,rel:`noopener`});document.body.append(t),t.click(),t.remove()}var Md=class{constructor({canvas:e,director:t,places:n,palettes:r={},palette:i,pipeline:a={}}){this.canvas=e,this.director=t,this.places=n,this.palettes=r;let o=new Tu({canvas:e,antialias:!1,powerPreference:`high-performance`,preserveDrawingBuffer:Ad.has(`capture`)});o.autoClear=!1,this.renderer=o,this.pipe=new Wu(o,{glow:a.glow??!1,bloom:a.bloom??!0,kuwahara:a.kuwahara??0}),this.scene=new Mn,this.glowScene=new Mn,this.camera=new Ro(45,1,.5,3e3),this.backdrop=$u(Z.uPx),this.scene.add(this.backdrop),this.impact=new nd({reduced:kd}),this.pointer={x:0,y:0,sx:0,sy:0},this.time=0,this.frozen=null,this.dprScale=1,this.perf={ema:1/60,slow:0,t:0,steps:0},this.view={w:1,h:1,dpr:1,portrait:!1,phone:!1,aspect:1},addEventListener(`resize`,()=>this.resize()),addEventListener(`pointermove`,e=>{this.pointer.x=e.clientX/innerWidth*2-1,this.pointer.y=-(e.clientY/innerHeight*2-1)},{passive:!0}),document.addEventListener(`visibilitychange`,()=>{this.paused=document.hidden,this.last=performance.now()}),this.palette=null,this.setPalette(i||Object.keys(r)[0]),this.cards=[...document.querySelectorAll(`.stop`)]}setPalette(e){let t=this.palettes[e];if(t){this.palette=t,this.paletteName=e;for(let[e,n]of Object.entries(t.css||{}))document.documentElement.style.setProperty(`--${e}`,n);document.documentElement.dataset.palette=e,this.director.palette?.(t,e)}}resize(){let e=innerWidth,t=innerHeight,n=Math.min(e,t)<600,r=Ad.has(`dpr`)?+Ad.get(`dpr`):n?1.5:1.75,i=Math.min(devicePixelRatio||1,r)*this.dprScale;Object.assign(this.view,{w:e,h:t,dpr:i,phone:n,portrait:t>e*1.05,aspect:e/t}),this._grid=null,this.renderer.setPixelRatio(i),this.renderer.setSize(e,t,!1),this.pipe.setSize(e,t,i),Z.uPx.value=i,X.uLine.value=(n?1.15:1.4)*i,X.uBoil.value=.5*i,this.backdrop.material.uniforms.uRes.value.set(e*i,t*i),this.camera.aspect=e/t,this.director.layout?.(this.view)}async start(){let e=await this.director.build(this);this.route=e,this.resize(),this.rig=new cd(this.camera,e.stops,e.legs,{closed:e.closed,speed:e.speed??34,minT:e.minT??1.6,maxT:e.maxT??3,...e.rig||{}}),this.nav=new ed({ids:Td,wrap:!!e.wrap,onChange:(e,t,n)=>this.go(e,t,n),onSide:e=>this.side(e)}),this.ui=Od({nav:this.nav,sfx:id,places:this.places,onProject:(e,t)=>this.director.project?.(e,t,this)}),this.setCard(0,!0),this.director.ready?.(this),this.last=performance.now();let t=()=>{if(requestAnimationFrame(t),this.paused)return;let e=performance.now(),n=(e-this.last)/1e3,r=Math.min(.05,n);this.last=e,this.watchPerf(n),this.frozen!==null&&(r=0),this.tick(r);let i=this.renderer.info;this.statsOn&&(i.autoReset=!1,i.reset()),this.director.preRender?.(this),this.pipe.render(this.scene,this.camera,this.glowScene),this.statsOn&&(this.lastStats={calls:i.render.calls,triangles:i.render.triangles,geometries:i.memory.geometries,textures:i.memory.textures,programs:i.programs?.length??0})};return t(),this.bindClicks(),window.__xini=this.api(),this}watchPerf(e){let t=this.perf;Ad.has(`dpr`)||Ad.has(`capture`)||this.frozen!==null||e>.5||(t.t+=e,t.ema+=(e-t.ema)*.05,!(t.t<2.5||t.steps>=2)&&(t.slow=t.ema>1/38?t.slow+e:0,t.slow>1.2&&(t.steps++,t.slow=0,t.t=1.5,this.dprScale*=.78,this.resize())))}tick(e){this.time+=e;let t=this.time;Z.uTime.value=t,Z.uStep.value=X.uStep.value=Math.floor(t*12)/12,X.uTime.value=t;let n=this.pointer;n.sx+=(n.x-n.sx)*(1-Math.exp(-e*2.5)),n.sy+=(n.y-n.sy)*(1-Math.exp(-e*2.5));let r=this.impact.update(e);this.rig.update(e),this.director.update?.(e,t,this);let i=this.rig.flying?.25:1,a=this.director.parallax??1.2;if(this.view.portrait){let e=typeof this.route.phonePull==`function`?this.route.phonePull():this.route.phonePull??.55;this.camera.position.lerp(this.rig.lookAt,-e),this.camera.fov=Math.min(84,this.camera.fov+(this.route.phoneFov??12)),this.camera.setViewOffset(this.view.w,this.view.h,0,this.view.h*(this.route.phoneLift??.2),this.view.w,this.view.h)}else this.camera.view&&this.camera.view.enabled&&this.camera.clearViewOffset();this.rig.apply({x:n.sx*a*i,y:n.sy*a*.6*i},{x:r.x*.4,y:r.y*.4});let o=Tt.clamp((this.rig.speedNow-8)/(this.route.speedRef??60),0,1);if(X.uSpeed.value+=(o-X.uSpeed.value)*(1-Math.exp(-e*8)),this.pending){let e=this.rig.progress,t=this.pending;!t.titled&&e>=.16&&(t.titled=!0,this.ui.showTitle(t.to)),(e>=.93||!this.rig.flying)&&(this.pending=null,this.setCard(t.to,!0),this.impact.hit({seq:this.director.arriveSeq?.(t.to,t.from)??this.route.arriveImpact??`soft`,center:this.director.impactCenter?.(t.to,this)??[.5,.5],shake:.5}),id.play(`slam`,{gain:.5}))}this.placeCard()}toScreen(e){let t=e.clone().project(this.camera);return{x:(t.x*.5+.5)*this.view.w,y:(1-(t.y*.5+.5))*this.view.h,behind:t.z>1}}setCard(e,t=!1){this.cards.forEach((t,n)=>{n!==e&&t.classList.remove(`is-current`)}),clearTimeout(this._cardT);let n=()=>{this.cards[e].classList.add(`is-current`),this.director.arrive?.(e,this)};t?n():this._cardT=setTimeout(n,0)}placeCard(){if(this.view.portrait)return;let e=this.rig.index,t=this.route.stops[e],n=this.cards[e];if(!t.anchor||!n)return;let r=this.toScreen(new G(...t.anchor)),i=n.firstElementChild,a=i.offsetWidth,o=i.offsetHeight,s=Tt.clamp(r.x,24+a/2,this.view.w-24-a/2);if(this.route.cardGrid){let e=this._grid||=(()=>{let e=document.querySelector(`.bar__mark`)?.getBoundingClientRect(),t=document.querySelector(`.bar__sound`)?.getBoundingClientRect();return e?.width&&t?.width?{l:e.left,r:t.right}:null})();e&&(s=r.x<this.view.w/2?e.l+a/2:e.r-a/2+4)}let c=s-a/2<230?168:40,l=this._review?.isConnected?this._review:this._review=document.querySelector(`.review`);if(l){let e=l.getBoundingClientRect();e.width&&s+a/2>e.left-12&&s-a/2<e.right+12&&(c=Math.max(c,this.view.h-e.top+14))}let u=Tt.clamp(r.y,84+o/2,Math.max(84+o/2,this.view.h-c-o/2));n.style.setProperty(`--ax`,`${s}px`),n.style.setProperty(`--ay`,`${u}px`)}go(e,t,n){document.documentElement.dataset.stop=Td[e],this.cards[t].classList.remove(`is-current`),this.cards[t].classList.add(`is-leaving`),setTimeout(()=>this.cards[t].classList.remove(`is-leaving`),320),this.director.depart?.(t,e,this);let r=kd?this.rig.go(e,{duration:.35}):this.rig.go(e);return id.play(`whoosh`),this.pending={to:e,titled:kd,from:t},r*1e3}side(e){return Td[this.rig.index]!==`work`||this.rig.flying?!1:(this.ui.setProject(this.ui.project+e,e),!0)}bindClicks(){let e=new rs;addEventListener(`click`,t=>{if(t.target.closest&&t.target.closest(`a,button,.index,.bar,.route,.card`))return;let n=new W(t.clientX/innerWidth*2-1,-(t.clientY/innerHeight)*2+1);e.setFromCamera(n,this.camera),this.director.click?.(t,e,this)})}api(){return{world:this,goto:e=>this.nav.go(typeof e==`string`?Td.indexOf(e):e,`api`,!0),advance:(e,t=1/30)=>{for(let n=0;n<e;n+=t)this.tick(t)},advanceTo:e=>{let t=Math.max(0,e-this.time);for(let e=0;e<t;e+=1/30)this.tick(1/30)},project:e=>this.ui.setProject(e,1),palette:e=>this.setPalette(e),freeze:()=>{this.frozen=0},unfreeze:()=>{this.frozen=null},stats:()=>(this.statsOn=!0,this.lastStats||null),sfx:id}}};function Nd(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new Er,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=Pd(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=Pd(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function Pd(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new dr(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}function Fd(e,{keep:t=[]}={}){e.updateMatrixWorld(!0);let n=e.matrixWorld.clone().invert(),r=new K,i=new Set(t),a=new Map,o=0,s=(t,n)=>{if(!(t!==e&&t.userData.dynamic||i.has(t))){if(n&&=t===e||t.visible,t.isMesh&&n&&o++,t.isMesh&&n&&!t.isInstancedMesh&&!t.isSkinnedMesh&&!Array.isArray(t.material)){let e=t.material,n=t.geometry;if(!e.transparent&&!n.morphAttributes?.position?.length){let r=`${e.uuid}|${Object.keys(n.attributes).sort().join(`,`)}|${t.renderOrder}|${t.frustumCulled}`;a.has(r)||a.set(r,{m:e,list:[],ro:t.renderOrder,fc:t.frustumCulled}),a.get(r).list.push(t)}}for(let e of[...t.children])s(e,n)}};s(e,!0);let c=0,l=0;return a.forEach(({m:t,list:i,ro:a,fc:o})=>{if(i.length<2)return;let s=Nd(i.map(e=>{let t=e.geometry.index?e.geometry.toNonIndexed():e.geometry.clone();if(t.clearGroups(),r.multiplyMatrices(n,e.matrixWorld),t.applyMatrix4(r),r.determinant()<0){let e=t.attributes.position;for(let n=0;n<e.count;n+=3)for(let e of Object.values(t.attributes)){let t=[];for(let r=0;r<e.itemSize;r++)t.push(e.getComponent(n+1,r));for(let r=0;r<e.itemSize;r++)e.setComponent(n+1,r,e.getComponent(n+2,r)),e.setComponent(n+2,r,t[r])}}return t}));if(!s)return;let u=new J(s,t);u.renderOrder=a,u.frustumCulled=o,u.name=`batch`,e.add(u),i.forEach(e=>e.removeFromParent()),c+=i.length,l++}),{before:o,after:o-c+l}}function Id(e,t,n){let r=ju(e,t,n),i=.22,a=r<i?i*(r/i)**1.16:1-.78*((1-r)/.78)**1.22,o=r>1e-4?a/r:1;e*=o,t*=o,n*=o;let s=1-Au(0,.3,a),c=Au(.5,1,a);e+=-.01*s+.022*c,t+=.009*s+.012*c,n+=.007*s-.018*c;let[l,u,d]=Mu(ku(e),ku(t),ku(n)),f=Pu(l,145,62)*(1-Au(.32,.68,d));u*=1-.24*f;let p=Pu(l,62,26)*Au(.08,.2,u)*(1-Au(.7,.92,d));l-=(l-40)*.45*p;let m=Pu(l,38,22)*(1-Pu(l,10,14))*Au(.06,.16,u)*(1-Au(.3,.7,d));return u=Math.min(1,u*(1+.3*m)),Nu(l,u,d)}var Ld={uZenith:{value:new q(`#0a0b2a`)},uHorizon:{value:new q(`#4a2668`)},uGlow:{value:new q(`#c85a7c`)},uMoonDir:{value:new G(-.35,.32,-.88).normalize()},uMoon:{value:new q(`#f3ecd8`)},uMoonSize:{value:.035},uStreak:{value:new q(`#6a3a7e`)},uDot:{value:new q(`#07060d`)},uStars:{value:.6},uBand:{value:.18},uStreakAmt:{value:.55},uLampDir:{value:new G(0,.3,-1).normalize()},uLampCol:{value:new q(`#ffffff`)},uLampAmt:{value:0},uLampPow:{value:6},uLampPrint:{value:0},uLampCell:{value:6.5}};function Rd({radius:e=4e3,px:t}){let n=new J(new Xa(e,48,24),new co({glslVersion:Ve,vertexShader:`in vec3 position; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; out vec3 vDir;
      void main(){ vDir = normalize(position); vec4 p = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); gl_Position = vec4(p.xy, p.w * 0.99999, p.w); }`,fragmentShader:`precision highp float;
      ${Eu}
      ${Du}
      uniform vec3 uZenith, uHorizon, uGlow, uMoonDir, uMoon, uStreak, uDot, uLampDir, uLampCol; uniform float uMoonSize, uStars, uBand, uPx, uLampAmt, uLampPow, uStreakAmt, uLampPrint, uLampCell;
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
          if (uLampPrint > 0.5) {
            // a halo, not a wash: no dots where the glow is faint, so the sky away from it stays clean
            c += uLampCol * halftone(gl_FragCoord.xy, uLampCell * uPx, 0.785, clamp((lg - 0.05) * 1.15, 0.0, 0.48));
          } else {
            float ld = halftone(gl_FragCoord.xy, 4.0 * uPx, 0.4, clamp(lg * 1.4, 0.0, 1.0));
            c += uLampCol * mix(lg, max(lg, ld * 0.22), smoothstep(0.05, 0.3, lg) * (1.0 - smoothstep(0.3, 0.7, lg)));
          }
        }
        // painted cloud streaks (long horizontal strokes)
        vec2 sp = vec2(atan(d.z, d.x) * 3.0, el * 18.0);
        float st = fbm2(sp * vec2(1.0, 1.0) + vec2(0.0, 3.0));
        c = mix(c, uStreak, smoothstep(0.58, 0.75, st) * smoothstep(0.05, 0.3, el) * (1.0 - smoothstep(0.45, 0.8, el)) * uStreakAmt);
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
      }`,uniforms:{...Ld,uPx:t},side:1,depthWrite:!1}));return n.frustumCulled=!1,n.renderOrder=-900,n}var zd=`M43.98,58.66 L58.71,43.36 L31.08,14.67 L31.08,45.27 Z M8.00,98.70 L29.22,107.26 L112.00,21.30 L90.78,12.74 Z M88.92,74.73 L76.02,61.34 L61.29,76.64 L88.92,105.33 Z`,Bd=`M8.00,96.02 L29.22,73.98 L29.22,12.74 L8.00,21.30 Z M112.00,23.98 L90.78,46.02 L90.78,107.26 L112.00,98.70 Z`,Vd=(e=``,t=`currentColor`,n=`currentColor`,r=`Xini`)=>`<svg class="${e}" viewBox="0 0 120 120" role="img" aria-label="${r}"><path fill="${n}" d="${Bd}"/><path fill="${t}" d="${zd}"/></svg>`,Hd=e=>Zu({brushScale:.07,dotCell:4.5,...e}),Q=(e,t,n)=>new G(e,t,n),Ud=7,Wd=()=>(Ud=Ud*16807%2147483647)/2147483647,Gd=e=>{Ud=e},Kd={w:2e3,h:1500},qd={uMask:{value:new q(`#070a0b`)},uMask2:{value:new q(`#0c1213`)},uSilk:{value:new q(`#dfe6df`)},uSilkDim:{value:new q(`#22403b`)},uPad:{value:new q(`#c9a25a`)},uSheen:{value:new q(`#2a3a3a`)},uSignal:{value:new q(`#3dff8f`)},uHot:{value:new q(`#eafff4`)},uLitC:{value:new W(0,0)},uLitR:{value:1e5},uPing:{value:[0,1,2,3].map(()=>new Gt(0,0,-100,0))},uSilkTex:{value:null},uRefl:{value:null},uReflMat:{value:new K},uReflAmt:{value:0},uReflDebug:{value:0},uScreen:{value:new W(1,1)}},Jd=`in vec3 position; in vec2 uv; uniform mat4 modelMatrix, viewMatrix, projectionMatrix, uReflMat;
  out vec2 vUv; out vec3 vW; out vec3 vViewPos; out vec3 vN; out vec4 vRefl;
  void main(){ vUv = uv; vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; vec4 mv = viewMatrix * w; vViewPos = mv.xyz;
    vRefl = uReflMat * w;
    vN = normalize(mat3(viewMatrix) * vec3(0.0, 1.0, 0.0)); gl_Position = projectionMatrix * mv; }`;function Yd(){let e=new qa(Kd.w,Kd.h,1,1);e.rotateX(-Math.PI/2);let t=new J(e,new co({glslVersion:Ve,vertexShader:Jd,fragmentShader:`precision highp float;
      ${Eu}
      ${Du}
      uniform vec3 uMask, uMask2, uSilk, uSilkDim, uPad, uSheen, uSignal, uHot, uDot, uKeyDir;
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
        // the legend: small type in the silk ink; the big district names (drawn at half strength) print opaque in a dim
        // ink one step off the mask, so they read as the board's own lettering and never as a see-through headline
        float sr = clamp(sk.r, 0.0, 1.0);
        vec3 silk = mix(uSilkDim, uSilk, smoothstep(0.62, 0.9, sr)) * (0.9 + 0.1 * hash12(floor(vW.xz * 2.0)));
        c = mix(c, silk * (0.25 + 0.75 * on), smoothstep(0.08, 0.36, sr) * 0.95);
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
      }`,uniforms:{...qd,uDot:Z.uDotInk,uKeyDir:Z.uKeyDir,uPx:Z.uPx,uStep:Z.uStep}}));t.renderOrder=-10;let n=new J(new wi(Kd.w,16,Kd.h),Hd({base:`#1d2a24`,brush:.2,spec:.2,rim:.6,id:198}));n.position.y=-8.05;let r=new wn;return r.add(t,n),r}var Xd=class{constructor(e=4096){this.c=document.createElement(`canvas`),this.c.width=e,this.c.height=Math.round(e*(Kd.h/Kd.w)),this.g=this.c.getContext(`2d`),this.g.fillStyle=`#000`,this.g.fillRect(0,0,this.c.width,this.c.height),this.g.globalCompositeOperation=`lighter`,this.k=this.c.width/Kd.w,this.tex=new bi(this.c),this.tex.colorSpace=``,this.tex.anisotropy=8,this.tex.generateMipmaps=!0,this.tex.minFilter=c,this.a=document.createElement(`canvas`),this.a.width=this.c.width>>2,this.a.height=this.c.height>>2,this.ag=this.a.getContext(`2d`),this.ag.globalCompositeOperation=`lighter`,this.ak=this.k/4}finish(){let e=this.g;e.save(),e.filter=`blur(${3*this.k}px)`,e.drawImage(this.a,0,0,this.c.width,this.c.height),e.restore(),this.tex.needsUpdate=!0}P(e,t){return[(e+Kd.w/2)*this.k,(t+Kd.h/2)*this.k]}rect(e,t,n,r,i=1.1){let a=this.g,[o,s]=this.P(e-n/2,t-r/2);a.strokeStyle=`rgb(255,0,0)`,a.lineWidth=i*this.k,a.strokeRect(o,s,n*this.k,r*this.k)}footprint(e,t,n,r,i=4){let a=this.g;a.strokeStyle=`rgb(255,0,0)`,a.lineWidth=1.1*this.k;let o=e-n/2-i,s=t-r/2-i,c=e+n/2+i,l=t+r/2+i,u=Math.min(n,r)*.22+3;for(let[e,t,n,r]of[[o,s,1,1],[c,s,-1,1],[c,l,-1,-1],[o,l,1,-1]])this.line([[e+n*u,t],[e,t],[e,t+r*u]]);a.fillStyle=`rgb(255,0,0)`;let[d,f]=this.P(o-3,s-3);a.beginPath(),a.arc(d,f,1.5*this.k,0,Math.PI*2),a.fill()}pad(e,t,n,r){let i=this.g,[a,o]=this.P(e-n/2,t-r/2);i.fillStyle=`rgb(0,255,0)`,i.fillRect(a,o,n*this.k,r*this.k)}ring(e,t,n,r){let i=this.g,[a,o]=this.P(e,t);i.fillStyle=`rgb(0,255,0)`,i.beginPath(),i.arc(a,o,r*this.k,0,Math.PI*2),i.arc(a,o,n*this.k,0,Math.PI*2,!0),i.fill()}ao(e,t,n,r,i=6,a=.8){let o=this.ag,s=this.ak,c=(e-n/2+Kd.w/2)*s,l=(t-r/2+Kd.h/2)*s;o.fillStyle=`rgb(0,0,${Math.round(150*a)})`,o.fillRect(c-i*s*.5,l-i*s*.5,(n+i)*s,(r+i)*s),o.fillStyle=`rgb(0,0,${Math.round(105*a)})`,o.fillRect(c,l,n*s,r*s)}aoDisc(e,t,n,r=6,i=.8){let a=this.ag,o=this.ak,s=(e+Kd.w/2)*o,c=(t+Kd.h/2)*o;a.fillStyle=`rgb(0,0,${Math.round(150*i)})`,a.beginPath(),a.arc(s,c,(n+r*.5)*o,0,Math.PI*2),a.fill(),a.fillStyle=`rgb(0,0,${Math.round(105*i)})`,a.beginPath(),a.arc(s,c,n*o,0,Math.PI*2),a.fill()}text(e,t,n,r,{weight:i=`600`,family:a=`"JetBrains Mono Variable", monospace`,align:o=`left`,rot:s=0,base:c=`middle`,track:l=0,stretch:u=1,amt:d}={}){let f=this.g,[p,m]=this.P(t,n);f.save(),f.translate(p,m),f.rotate(s),f.scale(1,u),f.fillStyle=`rgb(${Math.round(255*(d??(r>=16?.5:1)))},0,0)`,f.font=`${i} ${r*this.k}px ${a}`,f.textAlign=o,f.textBaseline=c,l&&(f.letterSpacing=`${l*this.k}px`),f.fillText(e,0,0),f.restore()}line(e,t=1.1){let n=this.g;n.strokeStyle=`rgb(255,0,0)`,n.lineWidth=t*this.k,n.lineJoin=`miter`,n.beginPath(),e.forEach(([e,t],r)=>{let[i,a]=this.P(e,t);r?n.lineTo(i,a):n.moveTo(i,a)}),n.stroke()}hazard(e,t,n,r,i=10,a=9){let o=this.g,[s,c]=this.P(e-n/2,t-r/2),l=n*this.k,u=r*this.k,d=i*this.k,f=a*this.k;o.save(),o.beginPath(),o.rect(s,c,l,u),o.rect(s+d,c+d,l-2*d,u-2*d),o.clip(`evenodd`),o.fillStyle=`rgb(255,0,0)`;for(let e=-u;e<l+u;e+=f*2)o.beginPath(),o.moveTo(s+e,c),o.lineTo(s+e+f,c),o.lineTo(s+e+f-u,c+u),o.lineTo(s+e-u,c+u),o.fill();o.restore()}path(e,t,n,r,{fill:i=!0,rot:a=0}={}){let o=this.g,[s,c]=this.P(t,n),l=r*this.k/120;o.save(),o.translate(s,c),o.rotate(a),o.scale(l,l),o.translate(-60,-60);let u=new Path2D(e);i?(o.fillStyle=`rgb(255,0,0)`,o.fill(u)):(o.strokeStyle=`rgb(255,0,0)`,o.lineWidth=1.2/l*this.k,o.stroke(u)),o.restore()}};function Zd(e,t){let n=[];for(let r=0;r<e.length;r++){let i=e[r],a=e[Math.max(0,r-1)],o=e[Math.min(e.length-1,r+1)],s=r>0?new W(-(i.y-a.y),i.x-a.x).normalize():null,c=r<e.length-1?new W(-(o.y-i.y),o.x-i.x).normalize():null;s||=c,c||=s;let l=s.clone().add(c).normalize(),u=1/Math.max(.35,l.dot(s));n.push(i.clone().addScaledVector(l,t*u))}return n}function Qd(e,t,n=!1){let r=t[0]-e[0],i=t[1]-e[1],a=Math.abs(r),o=Math.abs(i),s=Math.sign(r),c=Math.sign(i),l=Math.min(a,o),u;return u=n?[e[0]+s*l,e[1]+c*l]:a>o?[t[0]-s*l,e[1]]:[e[0],t[1]-c*l],[e,u,t]}function $d(e){let t=[e[0]];for(let n=1;n<e.length;n++){let r=Qd(e[n-1],e[n],n%2==0);t.push(r[1],r[2])}return t.filter((e,t,n)=>t===0||Math.hypot(e[0]-n[t-1][0],e[1]-n[t-1][1])>.5)}var ef={uBoost:{value:0},uSpeed:{value:70},uPkGain:{value:.4},uLive:{value:.7}},tf=class{constructor(){this.pos=[],this.uv=[],this.ph=[],this.buses=[]}bus(e,t=8,n=4,r=1.6,{y:i=.3,power:a=!1}={}){let o=e.map(([e,t])=>new W(e,t));for(let e=0;e<t;e++){let s=(e-(t-1)/2)*n;this.ribbon(Zd(o,s),r,i,a?-1:Wd())}this.buses.push({base:o,n:t,pitch:n,width:r})}ribbon(e,t,n,r){let i=Zd(e,t/2),a=Zd(e,-t/2),o=0,s=[0];for(let t=1;t<e.length;t++)o+=e[t].distanceTo(e[t-1]),s.push(o);for(let t=0;t<e.length-1;t++){let e=i[t],c=i[t+1],l=a[t+1],u=a[t],d=s[t],f=s[t+1];for(let[t,i]of[[e,d],[c,f],[l,f],[e,d],[l,f],[u,d]])this.pos.push(t.x,n,t.y),this.uv.push(i,o),this.ph.push(r)}}mesh(e){let t=new Er;t.setAttribute(`position`,new mr(this.pos,3)),t.setAttribute(`uv`,new mr(this.uv,2)),t.setAttribute(`phase`,new mr(this.ph,1)),this.mat=new co({glslVersion:Ve,vertexShader:`in vec3 position; in vec2 uv; in float phase; uniform mat4 modelMatrix, viewMatrix, projectionMatrix;
        out vec2 vUv; out float vPh; out vec3 vW; out vec3 vN;
        void main(){ vUv = uv; vPh = phase; vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; vN = normalize(mat3(viewMatrix) * vec3(0.0, 1.0, 0.0)); gl_Position = projectionMatrix * viewMatrix * w; }`,fragmentShader:`precision highp float;
        ${Eu}
        uniform vec3 uCopper, uHot, uSignal; uniform float uStep, uSpeed, uBoost, uLitR, uPkGain, uLive; uniform vec2 uLitC;
        uniform vec3 uFocusP; uniform float uFocusAmt, uFocusR0, uFocusR1;
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
            float live = step(uLive - uBoost * 0.3, hash11(lane * 1.7 + vPh * 31.0));
            float len = 20.0 / cell;
            float pk = live * step(1.0 - len, f);
            // packets are dim dashes, brightest on the traces running into the stop you are at
            float near = 1.0 - smoothstep(uFocusR0, uFocusR1 * 1.2, length(vW - uFocusP)) * uFocusAmt;
            if (pk > 0.5) { c = mix(uSignal, uHot, step(1.0 - len * 0.28, f) * near) * uPkGain * mix(0.35, 1.0, near) * (1.0 + uBoost * 0.3); id = 255.0; }
          }
          if (vPh < 0.0) c *= 1.25;
          if (front > 0.01) { c = mix(c, uHot, front); id = 255.0; }
          if (on < 0.5) c *= 0.55;
          gColor = vec4(c, 1.0);
          gNormal = vec4(normalize(vN) * 0.5 + 0.5, id / 255.0);
        }`,uniforms:{uCopper:{value:new q(e.trace)},uHot:qd.uHot,uSignal:qd.uSignal,uStep:Z.uStep,uSpeed:ef.uSpeed,uBoost:ef.uBoost,uLitR:qd.uLitR,uLitC:qd.uLitC,uPkGain:ef.uPkGain,uLive:ef.uLive,uFocusP:X.uFocusP,uFocusAmt:X.uFocusAmt,uFocusR0:X.uFocusR0,uFocusR1:X.uFocusR1},side:2});let n=new J(t,this.mat);return n.frustumCulled=!1,n.renderOrder=-5,n}},nf=class{constructor(e,t){this.pal=e,this.silk=t,this.group=new wn,this.box=[],this.cyl=[],this.pins=[],this.tops=[],this.zones=[]}keep(e,t,n,r){this.zones.push([e,t,n,r])}blocked(e,t,n,r){return this.zones.some(([i,a,o,s])=>e+n/2>i&&e-n/2<o&&t+r/2>a&&t-r/2<s)}chip(e,t,n,r,i=4,{color:a=this.pal.ic,pins:o=!0,pitch:s=3.2,label:c=``,ao:l=!0}={}){if(!this.blocked(e,t,n+6,r+6)&&(this.box.push({p:Q(e,i/2,t),s:Q(n,i,r),c:a}),this.silk&&(this.silk.footprint(e,t,n+(o?5:0),r+(o?5:0),3),l&&this.silk.ao(e,t,n+4,r+4,4,.75),c&&this.silk.text(c,e-n/2-4,t+r/2+10,6)),o))for(let i of[0,1,2,3]){let a=i%2?r:n,o=Math.max(2,Math.floor((a-6)/s));for(let s=0;s<o;s++){let c=-a/2+3+(s+.5)*((a-6)/o),l=(i%2?n:r)/2+1.3,u=i%2?i===1?l:-l:c,d=i%2?c:i===0?-l:l;this.pins.push({p:Q(e+u,.55,t+d),s:i%2?Q(2.8,1.1,1.1):Q(1.1,1.1,2.8)}),this.silk&&this.silk.pad(e+u+(i%2?i===1?.8:-.8:0),t+d+(i%2?0:i===0?-.8:.8),i%2?3.6:1.5,i%2?1.5:3.6)}}}passive(e,t,n=4,r=2,i=1.6,a){let o=a??(Wd()<.62?this.pal.mlcc:this.pal.res);this.blocked(e,t,n+3,r+3)||(this.box.push({p:Q(e,i/2,t),s:Q(n,i,r),c:o}),this.silk&&(n>=r?(this.silk.pad(e-n/2-.4,t,1.4,r+.4),this.silk.pad(e+n/2+.4,t,1.4,r+.4)):(this.silk.pad(e,t-r/2-.4,n+.4,1.4),this.silk.pad(e,t+r/2+.4,n+.4,1.4))))}can(e,t,n=8,r=22,i=this.pal.can,a=this.pal.canTop){this.blocked(e,t,n*2+4,n*2+4)||(this.cyl.push({p:Q(e,r/2,t),s:Q(n,r,n),c:i}),this.tops.push({p:Q(e,r+.35,t),s:Q(n*.88,.7,n*.88),c:a}),this.silk&&(this.silk.aoDisc(e,t,n+2,4,.8),this.silk.ring(e,t,n+1.2,n+2.6)))}box3(e,t,n,r,i,a,o){this.box.push({p:Q(e,t+i/2,n),s:Q(r,i,a),c:o})}sprinkle(e,t,n,r,i,a=10,o=26){for(let s=0;s<i;s++){let i=Math.floor(Wd()*4),s=Wd()-.5,c=a+Wd()*o,l=i%2?e+(i===1?1:-1)*(n/2+c):e+s*(n+o),u=i%2?t+s*(r+o):t+(i===0?-1:1)*(r/2+c),d=Wd()<.5,f=Wd()<.8?1:1.6;this.passive(l,u,(d?2.2:4.2)*f,(d?4.2:2.2)*f,1.6*f)}}row(e,t,n,r,i,a=`cap`,o={}){for(let s=0;s<i;s++){let c=i===1?.5:s/(i-1),l=e+(n-e)*c,u=t+(r-t)*c;a===`can`?this.can(l,u,o.r??6+Wd()*2,o.h??18+Wd()*8,o.color,o.top):this.passive(l,u,o.w??4.4,o.d??2.2,o.h??1.8)}}build(){let e=new K,t=new Et,n=new q,r=(r,i,a)=>{if(!r.length)return null;let o=new si(i,a,r.length);return r.forEach((r,i)=>{e.compose(r.p,t.identity(),r.s),o.setMatrixAt(i,e),r.c&&o.setColorAt(i,n.set(r.c))}),o.instanceColor&&(o.instanceColor.needsUpdate=!0),o.frustumCulled=!1,this.group.add(o),o},i=this.pal;return r(this.box,new wi(1,1,1),Hd({base:i.ic,brush:.12,spec:.55,rim:.9,instanced:!0,instanceColor:!0,dotCell:4.5})),r(this.cyl,new Ei(1,1,1,22),Hd({base:i.can,brush:.12,spec:.9,rim:1,instanced:!0,instanceColor:!0,dotCell:4.5})),r(this.tops,new Ei(1,1,1,22),Hd({base:i.canTop,brush:.1,spec:1,rim:.6,instanced:!0,instanceColor:!0})),r(this.pins,new wi(1,1,1),Hd({base:i.pin,brush:.1,spec:1,rim:.5,instanced:!0})),this.group}};function rf(e){let t=[],n=[],r=[],i=new wi(1,1,1).toNonIndexed(),a=i.attributes.position.array,o=i.attributes.normal.array,s=i.attributes.uv.array,c=new K,l=new Et,u=new G,d=new G,f=new kt;for(let i of e){l.setFromEuler(new on(...i.r??[0,0,0])),c.compose(Q(...i.p),l,Q(...i.s)),f.getNormalMatrix(c);for(let e=0;e<a.length;e+=3)u.set(a[e],a[e+1],a[e+2]).applyMatrix4(c),t.push(u.x,u.y,u.z),d.set(o[e],o[e+1],o[e+2]).applyMatrix3(f).normalize(),n.push(d.x,d.y,d.z);for(let e=0;e<s.length;e++)r.push(s[e])}let p=new Er;return p.setAttribute(`position`,new mr(t,3)),p.setAttribute(`normal`,new mr(n,3)),p.setAttribute(`uv`,new mr(r,2)),p}function af(e,t,n){let r=document.createElement(`canvas`);r.width=e,r.height=t;let i=r.getContext(`2d`);n(i,e,t);let a=new bi(r);return a.colorSpace=``,a.anisotropy=8,a.userData={redraw:()=>{i.clearRect(0,0,e,t),n(i,e,t),a.needsUpdate=!0}},a}function of(e,t,n,{emissive:r=!1,res:i=512,bloom:a=!0,id:o}={}){let s=af(i,Math.max(8,Math.round(t/e*i)),n),c=Hd({base:`#ffffff`,map:s,mapAmt:1,emissive:r,bloom:a,spec:0,rim:0,brush:.05,id:o}),l=new J(new qa(e,t),c);return l.userData.redraw=s.userData.redraw,l}function sf({color:e=`#ffffff`,vertex:t,fragment:n,uniforms:r={},side:i=2,print:a=!1}={}){return new co({glslVersion:Ve,vertexShader:t,fragmentShader:n,uniforms:{uColor:{value:new q(e)},...r},transparent:!0,depthWrite:!1,side:i,blending:5,blendEquation:100,blendSrc:204,blendDst:a?205:201,blendSrcAlpha:200,blendDstAlpha:201})}var cf=e=>Zu({brushScale:.07,dotCell:4.5,...e}),lf={cx:-80,cz:-120,finY0:200,finY1:770,depth:150,width:432,fanR:200},uf=702;function df(e,t=!1){let n=[];for(let r of e.split(`M`).filter(e=>e.trim())){let e=r.replace(/Z/g,``).trim().split(/\s*L\s*|\s+/).map(e=>e.split(`,`).map(Number)).filter(e=>e.length===2&&!isNaN(e[0]));e.length<3||n.push(new ia(e.map(([e,n])=>new W(e-60,t?60-n:n-60))))}return n}function ff(e,t,n,r=3){let i=new wn,a=e/104;return[[Bd,n,r*.7],[zd,t,r]].forEach(([e,t,n])=>{df(e,!0).forEach(e=>i.add(new J(new Ha(e,{depth:n,bevelEnabled:!1}),t)))}),i.scale.setScalar(a),i}function pf(e){return new co({glslVersion:Ve,vertexShader:`in vec3 position; in vec3 normal; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; out vec3 vW; out vec3 vN; out vec3 vV;
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
        c = mix(c, mix(uHeat, uHot, pulse * 0.35), clamp(heat * (0.8 + 0.2 * pulse), 0.0, 1.0));
        float id = heat > 0.55 ? 255.0 : uId;
        gColor = vec4(c, 1.0);
        gNormal = vec4(N * 0.5 + 0.5, id / 255.0);
      }`,uniforms:{uBase:{value:new q(e.copperPipe)},uShade:Z.uShadeTint,uHeat:{value:new q(e.heat)},uHot:{value:new q(e.heatHot)},uKeyDir:Z.uKeyDir,uRim:Z.uRimCol,uGlint:Z.uGlint,uStep:Z.uStep,uOn:{value:1},uId:{value:177},uTop:{value:120}}})}function mf(e){return new co({glslVersion:Ve,vertexShader:`in vec3 position; in vec3 normal; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; out vec3 vW; out vec3 vN;
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
      }`,uniforms:{uBase:{value:new q(e.signal)},uHot:{value:new q(e.hot)},uLitY:{value:1e5},uStep:Z.uStep}})}function hf(e,t){return new co({glslVersion:Ve,vertexShader:`in vec3 position; in vec3 normal; in vec2 uv; uniform mat4 modelMatrix, viewMatrix, projectionMatrix;
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
      }`,uniforms:{uBase:{value:new q(e)},uHot:{value:new q(t)},uStep:Z.uStep,uOn:{value:1},uId:{value:Xu()}}})}function gf(e,t){let n=lf,{cx:r,cz:i}=n,a=new wn,o=cf({base:`#414c4a`,brush:.15,spec:.5,rim:.5}),s=cf({base:`#4f5957`,brush:.12,spec:.55,rim:.5,dotCell:4.5}),c=pf(e),l=cf({base:e.anod,brush:.15,spec:.7,rim:1}),u=(e,t,n,r,i,o,s)=>{let c=new J(new wi(e,t,n),s);return c.position.set(r,i+t/2,o),a.add(c),c};u(300,9,32,r,0,i-134,o),u(300,9,32,r,0,i+134,o),u(32,9,236,r-134,0,i,o),u(32,9,236,r+134,0,i,o),u(5,5,270,r+162,6,i,o),u(5,5,26,r+162,6,i+146,o),u(14,12,14,r+162,0,i-138,o),u(232,3,232,r,0,i,cf({base:e.substrate,brush:.15,spec:.4,rim:.6})),u(172,10,172,r,3,i,s),u(150,26,150,r,13,i,o),u(176,12,176,r,39,i,s),u(34,8,380,r,51,i,o);for(let e of[-1,1]){let t=new J(new Ei(9,9,59,16),o);t.position.set(r,29.5,i+e*180),a.add(t);let n=new J(new Ei(12,12,6,16),s);n.position.set(r,62,i+e*180),a.add(n)}for(let[e,t]of[[-38,150],[0,196],[38,98]]){let n=[],o=i-t,l=i+t,u=(t,i,a,o)=>{for(let s=0;s<=8;s++){let c=a+(o-a)*(s/8);n.push(Q(r+e,i+Math.sin(c)*34,t+Math.cos(c)*34))}};for(let t=794;t>64;t-=40)n.push(Q(r+e,t,o));u(o+34,64,Math.PI,Math.PI*1.5);for(let t=o+34+30;t<l-34-10;t+=30)n.push(Q(r+e,30,t));u(l-34,64,Math.PI*1.5,Math.PI*2);for(let t=104;t<=794;t+=40)n.push(Q(r+e,t,l));let d=new J(new Qa(new Li(n,!1,`centripetal`,.1),220,6,12,!1),c);a.add(d);for(let t of[o,l]){let n=new J(new Xa(6,12,6,0,Math.PI*2,0,Math.PI/2),s);n.position.set(r+e,794,t),a.add(n)}}let d=[[],[],[]],f=n.finY1-n.finY0;for(let e=n.finY0;e<=n.finY1-10;e+=19)d[e<n.finY0+f*.3?0:e<n.finY0+f*.62?1:2].push({p:[r,e,i],s:[n.depth,6,n.width]});u(n.depth*.46,f,n.width*.84,r,n.finY0,i,cf({base:`#1f2926`,brush:.08,spec:0,rim:0,dot:0})),[`#3a4642`,`#47544e`,e.fin].forEach((e,t)=>a.add(new J(rf(d[t]),cf({base:e,brush:.08,spec:.2,rim:0,mid:.36,dark:.7,dotCell:4.5}))));for(let e of[-1,1])for(let t of[-1,1])u(5,n.finY1-n.finY0+6,5,r+e*(n.depth/2+1),n.finY0-4,i+t*(n.width/2+1),l);let p=[];for(let e=0,t=n.finY0;t<=n.finY1-10;t+=19,e++){if(t<500||t>610)continue;let a=n.depth*(.35+e*37%10/16),o=r-n.depth/2+e*53%7*6;p.push({p:[Math.min(o+a/2,r+n.depth/2-a/2),t+.2,i+n.width/2+.6],s:[a,1.4,1.4]}),e%2&&p.push({p:[r-n.depth/2+.6,t+.2,i+n.width/2-40-e%7*30],s:[1.4,1.4,60+e%3*40]})}let m=new J(rf(p),mf(e));a.add(m),u(164,12,446,r,772,i,l),u(150,4,432,r,784,i,cf({base:e.anod2,brush:.12,spec:.8,rim:1}));let h=cf({base:e.signal,emissive:!0}),g=cf({base:e.markBack,emissive:!0});u(156,168,8,r,616,i+n.width/2+4+4,l);let _=ff(124,h,g,3.5);_.position.set(r,uf,i+n.width/2+12.2),_.userData.dynamic=!0,a.add(_);let v=cf({base:e.signal,emissive:!0});for(let[e,t,a,o]of[[140,2.4,0,628],[140,2.4,0,776],[2.4,148,-69,628],[2.4,148,69,628]])u(e,t,2,r+a,o,i+n.width/2+12.6,v);let y=r+n.depth/2+1,b=(n.finY0+n.finY1)/2,x=new ia;x.moveTo(-186,-216),x.lineTo(186,-216),x.quadraticCurveTo(216,-216,216,-186),x.lineTo(216,186),x.quadraticCurveTo(216,216,186,216),x.lineTo(-186,216),x.quadraticCurveTo(-216,216,-216,186),x.lineTo(-216,-186),x.quadraticCurveTo(-216,-216,-186,-216);let S=new ra;S.absarc(0,0,n.fanR,0,Math.PI*2,!0),x.holes.push(S);let C=new Ha(x,{depth:26,bevelEnabled:!1,curveSegments:48}),w=new wn;w.position.set(y,b,i),w.rotation.y=Math.PI/2,a.add(w),w.add(new J(C,cf({base:e.fanFrame,brush:.15,spec:.4,rim:.4})));let T=new wn;T.position.z=8,T.scale.z=.42,T.userData.dynamic=!0,w.add(T);let E=new J(new Ei(60,64,22,32),cf({base:e.fanFrame,brush:.12,spec:.5,rim:.4}));E.rotation.x=Math.PI/2,T.add(E);let D=new J(new Ei(40,40,2,32),cf({base:e.anod2,spec:.6,rim:.4}));D.rotation.x=Math.PI/2,D.position.z=12,T.add(D);let O=cf({base:e.blade,brush:.15,spec:0,rim:0,side:2});for(let e=0;e<7;e++){let t=new ia,n=-.28,r=.34;t.moveTo(Math.cos(n)*58,Math.sin(n)*58),t.quadraticCurveTo(Math.cos(-.15200000000000002)*252*.5,Math.sin(-.15200000000000002)*252*.5,Math.cos(.03999999999999998)*194,Math.sin(.03999999999999998)*194),t.quadraticCurveTo(Math.cos(.382)*200,Math.sin(.382)*200,Math.cos(.66)*194,Math.sin(.66)*194),t.quadraticCurveTo(Math.cos(.468)*252*.5,Math.sin(.468)*252*.5,Math.cos(r)*58,Math.sin(r)*58),t.lineTo(Math.cos(n)*58,Math.sin(n)*58);let i=new J(new Ha(t,{depth:2.5,bevelEnabled:!1,curveSegments:10}),O),a=new wn;a.rotation.z=e/7*Math.PI*2,a.add(i),i.rotation.x=.42,T.add(a)}for(let t=0;t<4;t++){let n=new J(new wi(8,150,6),cf({base:e.fanFrame,brush:.15,spec:.5}));n.position.set(Math.cos(t*Math.PI/2+.6)*128,Math.sin(t*Math.PI/2+.6)*128,3),n.rotation.z=t*Math.PI/2+.6+Math.PI/2,w.add(n)}let k=hf(e.signalDeep,e.signal),A=new J(new Za(n.fanR+1,3.2,8,96),k);A.position.z=27,w.add(A);let j=new J(new Za(n.fanR+1,2.2,6,96),k);j.position.z=-1,w.add(j);let M=cf({base:e.heat,emissive:!0});if(u(18,7,6,r+52,5,i+152,M),t){t.ao(r,i,310,310,10,.9);for(let e of[-1,1])t.aoDisc(r,i+e*180,16,6,.9);for(let[e,n]of[[-170,-170],[170,-170],[170,170],[-170,170]])t.ring(r+e,i+n,7,12),t.text(`○`,r+e,i+n,4);t.rect(r,i,316,316,1.4),t.text(`CPU1`,r-158,i-168,12,{weight:`700`}),t.text(`SOCKET XN-01  ·  4 HEAT PIPES`,r-150,i+186,6.5),t.text(`注意 高溫  CAUTION HOT SURFACE`,r+30,i-160,6),t.line([[r-160,i+250],[r+160,i+250]],1.4)}return Fd(T),{group:a,update:e=>{let t=Math.floor(e*12)/12;T.rotation.z=-t*2.6},ringMat:k,heatMat:c,emberMat:M,floorMat:m.material,fan:w,crown:_,crownPos:Q(r,uf,i+n.width/2+12),topPos:Q(r,790,i),front:h,back:g,lineMat:v}}var _f=e=>Zu({brushScale:.07,dotCell:4.5,...e}),vf=`"Zen Kaku Gothic New", "Hiragino Sans", sans-serif`,yf=`"Chakra Petch", "Arial Narrow", sans-serif`,bf=`"JetBrains Mono Variable", ui-monospace, monospace`,xf={core:{x:lf.cx,z:lf.cz},npu:{x:-470,z:330},enclave:{x:700,z:140},dimm:{x0:250,pitch:56,z0:-480,z1:264},io:{x:-1e3,z0:-720,z1:-150}},Sf=[-360,-120,120],$=(e,t,n,r,i,a,o,s)=>{let c=new J(new wi(t,n,r),s);return c.position.set(i,a+n/2,o),e.add(c),c};function Cf(e,t,n,r,i,a,o,{res:s=512,rot:c=0,emissive:l=!1}={}){let u=of(e,t,a,{res:s,id:o,emissive:l,bloom:!1});return u.rotation.set(-Math.PI/2,0,c),u.position.set(n,r+.08,i),u}function wf(e,t,n){let r=new wn,{cx:i,cz:a}=lf,o=_f({base:e.sink,brush:.14,spec:.9,rim:1,dotCell:4.5}),s=_f({base:e.sinkDark,brush:.14,spec:.6,rim:1}),c=_f({base:e.signalDeep,emissive:!0});for(let r=0;r<12;r++){let i=-300+r*40;t.box3(i,0,-292,30,28,30,e.choke),n?.ao(i,-292,34,34,4,.8),n?.text(`L${r+1}`,i-12,-273,4.5),t.chip(i,-340,22,16,3.5,{pins:!1,color:e.ic})}for(let r=0;r<10;r++){let i=-250+r*40;t.box3(-256,0,i,30,28,30,e.choke),n?.ao(-256,i,34,34,4,.8),n?.text(`L${r+13}`,-238,i+12,4.5),t.chip(-302,i,16,22,3.5,{pins:!1,color:e.ic})}let l=[],u=[];for(let e=-325;e<=165;e+=10)l.push({p:[e,48,-344],s:[3.2,36,52]});for(let e=-312;e<=136;e+=10)u.push({p:[-306,48,e],s:[52,36,3.2]});$(r,500,24,54,-80,6,-344,s),$(r,54,24,450,-306,6,-88,s),r.add(new J(rf(l),o),new J(rf(u),o)),$(r,500,34,5,-80,6,-314,o),$(r,5,34,450,-276,6,-88,o),$(r,470,2.2,1.6,-80,30,-311.2,c),$(r,1.6,2.2,420,-273.2,30,-88,c);let d=[Q(-306,74,130),Q(-306,74,-300),Q(-306,74,-330),Q(-290,74,-344),Q(-260,74,-344),Q(150,74,-344)];r.add(new J(new Qa(new Li(d,!1,`centripetal`),80,5,10,!1),_f({base:e.copperPipe,spec:1,rim:1,brush:.15}))),$(r,64,30,34,-360,0,-420,_f({base:e.connector,brush:.15,spec:.5,rim:1}));for(let t=0;t<4;t++)for(let n=0;n<2;n++)$(r,9,2,9,-381+t*14,30,-428+n*16,_f({base:e.ink2,spec:0}));return n&&(n.ao(-80,-344,510,64,8,.9),n.ao(-306,-88,64,460,8,.9),n.ao(-360,-420,70,40,5,.9),n.text(`VRM  ·  22 PHASE`,-320,-384,7,{weight:`700`}),n.text(`EPS_12V`,-392,-444,6,{weight:`700`}),n.text(`電源`,-330,-470,26,{weight:`700`,family:vf,base:`alphabetic`}),n.text(`POWER`,-270,-472,14,{weight:`700`,family:yf,base:`alphabetic`,track:2})),r.userData.seam=c,r}var Tf=(e,t,n)=>new co({glslVersion:Ve,vertexShader:`in vec3 position; in vec3 normal; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; out vec3 vW; out vec3 vN;
    void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; vN = normalize(mat3(viewMatrix) * mat3(modelMatrix) * normal); gl_Position = projectionMatrix * viewMatrix * w; }`,fragmentShader:`precision highp float;
    uniform vec3 uBase, uHot; uniform float uStep, uOn, uId, uPhase, uBoost;
    in vec3 vW; in vec3 vN;
    layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
    void main(){
      // a bright pulse runs the length of each module, offset per module
      float w = fract(vW.z / 420.0 - uStep * (0.32 + uBoost * 0.5) + uPhase);
      float pulse = smoothstep(0.0, 0.05, w) * (1.0 - smoothstep(0.05, 0.3, w));
      float seg = step(0.12, fract(vW.z / 18.0));
      vec3 c = mix(uBase * (0.24 + 0.1 * seg), uHot * 0.5, pulse * 0.6);
      c *= uOn; c += uBase * 0.04 * (1.0 - uOn);
      gColor = vec4(c, 1.0);
      gNormal = vec4(normalize(vN) * 0.5 + 0.5, uId / 255.0);
    }`,uniforms:{uBase:{value:new q(e)},uHot:{value:new q(t)},uStep:Z.uStep,uOn:{value:1},uId:{value:Xu()},uPhase:{value:n},uBoost:{value:0}}});function Ef(e,t,n,r,i){let a=new wn,o=xf.dimm,s=_f({base:e.slot,brush:.14,spec:.5,rim:.15}),c=_f({base:e.latch,brush:.14,spec:.6,rim:.35}),l=_f({base:e.dimm,brush:.14,spec:.9,rim:0,dotCell:4.5}),u=_f({base:e.dimmPcb,brush:.1,spec:.5,rim:.15}),d=[],f=(o.z0+o.z1)/2,p=o.z1-o.z0,m=_f({base:e.dimmTop,brush:.1,spec:.8,rim:.35}),h=_f({base:`#4e4029`,brush:.1,spec:.35,rim:.15}),g=o.x0-3.6,_=[];for(let t=0;t<4;t++){let r=o.x0+t*o.pitch;$(a,16,20,p+28,r,0,f,s);for(let e of[-1,1])$(a,18,34,16,r,0,f+e*(p/2+20),c);(t===0?[...Sf.map(e=>[e,236]),[(Sf[2]+118+o.z1)/2+1,o.z1-(Sf[2]+118)-2]]:[[f,p]]).forEach(([n,i],o)=>{let s=new wn;if(a.add(s),t===0&&o<3&&(s.userData.dynamic=!0),$(s,7.6,12,i,r,18,n,u),t===0&&$(s,7.8,5,i-6,r,18.5,n,h),$(s,7,160,i-4,r,30,n,l),i>60){$(s,9,6,i-20,r,188,n,m);let a=new J(new wi(8,11,i-30),Tf(e.signal,e.hot,t*.21+o*.07));a.position.set(r,199.5,n),a.userData.k=t,a.userData.j=t===0&&o<3?o:-1,s.add(a),d.push(a)}t===0&&o<3&&_.push(s)}),n&&(n.ao(r,f,26,p+40,6,.85),n.text(`DIMM_${`AB`[t>>1]}${t%2+1}`,r-8,o.z1+44,6.5,{weight:`700`,rot:-Math.PI/2}))}let v=[];r.forEach((t,n)=>{let r=of(212,119,(r,a,o)=>kf(r,a,o,t,i.imgs?.[n],e),{emissive:!0,res:1536,bloom:!1});r.rotation.y=-Math.PI/2,r.position.set(g-1.8,108,Sf[n]),r.userData.exhibit=n,_[n].add(r),v.push(r),$(_[n],1.6,127,220,g-.8,44.5,Sf[n],_f({base:e.bezel,brush:.1,spec:.6,rim:1}))}),_.forEach((t,n)=>{let r=of(216,20,(t,n,r)=>{t.fillStyle=e.dimm,t.fillRect(0,0,n,r),t.fillStyle=`#232d2c`,t.fillRect(0,r*.46,n,r*.08)},{res:1024,bloom:!1});r.rotation.y=-Math.PI/2,r.position.set(g-.4,178,Sf[n]),t.add(r)});let y=-1,b=-1,x=!0,S=(e,t)=>{y=e,b=t,x=!1},C=(e,t,n)=>{let r=Math.floor(e*12)/12-b;_.forEach((e,t)=>{let n=0;if(t===y&&r>=0){if(r<.16)n=24*Math.sin(r/.16*Math.PI/2);else if(r<.26)n=24;else if(r<.36){let e=(r-.26)/.1;n=24*(1-e*e)}else r<.52&&(n=3.2*Math.sin((r-.36)/.16*Math.PI))}e.position.y=n;let i=v[t],a=t===y&&r>=.36?Math.min(1,(r-.36)/.16):1;i.scale.y=t===y&&r>=0&&r<.36?.03:Math.max(.03,a*a),i.userData.flash=t===y&&r>=.36?Math.max(0,1-(r-.36)/.3)*2:0}),!x&&r>=.36&&(x=!0,t?.play(`seat`),n?.(y))};if(n){n.text(`記憶體`,150,-470,54,{weight:`700`,family:vf,rot:Math.PI/2,stretch:1.8}),n.text(`MEMORY`,88,-480,26,{weight:`700`,family:yf,rot:Math.PI/2,track:3,stretch:1.8}),n.line([[200,-500],[200,240]],1.4);for(let e=-470;e<240;e+=60)n.line([[186,e],[200,e+14],[186,e+28]],1.2)}return{group:a,screens:v,bars:d,segs:_,seat:S,updateSeat:C,redraw:()=>v.forEach(e=>e.userData.redraw())}}var Df={gloam:[.5,.48,1.18]},Of={gloam:[[.1725,.206],[.696,.206],[.696,.184],[.816,.184],[.9325,.774],[.066,.774]]};function kf(e,t,n,r,i,a){if(e.fillStyle=`#0b1817`,e.fillRect(0,0,t,n),!i)return;let[o,s,c]=Df[r.slug]||[.5,0,1],l=Math.max(t/i.width,n/i.height)*c,u=i.width*l,d=i.height*l,f=Math.min(0,Math.max(t-u,t/2-o*u)),p=s===0?0:Math.min(0,Math.max(n-d,n/2-s*d));e.imageSmoothingEnabled=!0,e.imageSmoothingQuality=`high`,e.filter=`blur(${t/1024*1.3}px)`,e.drawImage(i,f,p,u,d),e.filter=`none`;let m=Of[r.slug];m&&(e.beginPath(),e.rect(0,0,t,n),m.forEach(([t,n],r)=>(r?e.lineTo:e.moveTo).call(e,f+t*u,p+n*d)),e.closePath(),e.fillStyle=`#0b1817`,e.fill(`evenodd`));let h;try{h=e.getImageData(0,0,t,n)}catch{return}let g=h.data,_=t*n,v=e=>[1,3,5].map(t=>parseInt(e.slice(t,t+2),16)),y=new Float32Array(_),b=new Float32Array(_),x=new Uint32Array(256),S=new Uint8Array(_),C=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},w=0;for(let e=0;e<_;e++){if(m&&g[e*4]===11&&g[e*4+1]===24&&g[e*4+2]===23){S[e]=1;continue}let t=g[e*4]/255,n=g[e*4+1]/255,r=g[e*4+2]/255,i=Math.max(t,n,r),a=Math.min(t,n,r),o=t*.299+n*.587+r*.114;y[e]=o,x[Math.min(255,Math.floor(o*256))]++,w++,b[e]=C(.66,.8,i>0?(i-a)/i:0)*C(.35,.5,i)}w=Math.max(1,w);let T=e=>{let t=0;for(let n=0;n<256;n++)if(t+=x[n],t>=e*w)return n/255;return 1};if(T(.5)>.55){x.fill(0);for(let e=0;e<_;e++)S[e]||(y[e]=1-y[e],x[Math.min(255,Math.floor(y[e]*256))]++)}let E=T(.03),D=Math.max(E+.1,T(.99)),O=v(`#0b1817`),k=v(`#ece6d4`),A=v(a.signal);for(let e=0;e<_;e++){let t=Math.min(1,Math.max(0,(y[e]-E)/(D-E)))**1.35;t=t*.45+t*t*(3-2*t)*.55;let n=b[e]*.9,r=.45+.55*t;for(let i=0;i<3;i++){let a=O[i]+(k[i]-O[i])*t;g[e*4+i]=a+(A[i]*r-a)*n}}e.putImageData(h,0,0)}function Af(e,t,n){let r=new wn,{x:i,z:a}=xf.npu,o=_f({base:e.substrate,brush:.14,spec:.5,rim:.8}),s=_f({base:`#3d4846`,brush:.14,spec:.4,rim:.4});$(r,200,6,200,i,0,a,o);for(let[e,t,n,o]of[[200,10,0,-95],[200,10,0,95],[10,180,-95,0],[10,180,95,0]])$(r,e,4,t,i+n,6,a+o,s);$(r,96,5,96,i,6,a,_f({base:e.ic,brush:.1,spec:.6,rim:1,id:186}));let c=Cf(92,92,i,11,a,(t,n,r)=>{t.fillStyle=`#020604`,t.fillRect(0,0,n,r),t.strokeStyle=e.signal,t.fillStyle=e.signal,t.lineWidth=2;for(let e=0;e<9;e++)for(let i=0;i<9;i++){let a=(e+.5)*n/9,o=(i+.5)*r/9;t.globalAlpha=.35,t.strokeRect(a-n/9*.42,o-r/9*.42,n/9*.84,r/9*.84),t.globalAlpha=.9,t.beginPath(),t.arc(a,o,3+(e*7+i*3)%4,0,Math.PI*2),t.fill()}t.globalAlpha=.6,t.lineWidth=1.5;for(let e=0;e<40;e++){let i=[e*37%9,e*11%9],a=[(e*23+3)%9,(e*5+1)%9];t.beginPath(),t.moveTo((i[0]+.5)*n/9,(i[1]+.5)*r/9),t.lineTo((a[0]+.5)*n/9,(a[1]+.5)*r/9),t.stroke()}t.globalAlpha=1},Xu(),{res:512,emissive:!0});r.add(c);for(let t of[-1,1])for(let n of[-1,1])$(r,30,11,44,i+t*70,6,a+n*26,_f({base:e.hbm,brush:.1,spec:.8,rim:1}));let l=Q(i,176,a),u=new wn;u.position.copy(l),u.userData.dynamic=!0,r.add(u);let d=new Ga(84,0),f=new Ga(40,0);f.rotateY(Math.PI/5),f.rotateX(.4);let p=jf(d),m=jf(f),h=[...p,...m,Q(0,0,0)],g=[];Mf(d,p).forEach(([e,t])=>g.push([e,t,1.65])),Mf(f,m).forEach(([e,t])=>g.push([p.length+e,p.length+t,1.15])),m.forEach((e,t)=>{p.map((t,n)=>[t.distanceTo(e),n]).sort((e,t)=>e[0]-t[0]).slice(0,2).forEach(([,e])=>g.push([p.length+t,e,.7])),g.push([p.length+t,h.length-1,.8])});let _=new J(d.clone(),sf({color:e.signalDeep,vertex:`in vec3 position; in vec3 normal; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; uniform vec3 cameraPosition; out float vF;
      void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vec3 n = normalize(mat3(modelMatrix) * normal); vF = 1.0 - abs(dot(n, normalize(cameraPosition - w.xyz))); gl_Position = projectionMatrix * viewMatrix * w; }`,fragment:`precision highp float; ${Du} uniform vec3 uColor; uniform float uAmt, uPx; in float vF;
      layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){ float d = halftone(gl_FragCoord.xy, 4.5 * uPx, 0.785, 0.06 + vF * vF * 0.34);
        gColor = vec4(uColor, d * 0.42 * uAmt); gNormal = vec4(0.0); }`,uniforms:{uAmt:{value:1},uPx:Z.uPx}}));u.add(_);let v=_f({base:`#ffffff`,emissive:!0,instanced:!0,instanceColor:!0}),y=new si(new Ka(1,0),v,h.length),b=new K,x=new Et,S=Q(0,1,0),C=p.length;m.length;let w=h.length-1,T=e=>e===w?0:e>=C?1:2,E=e=>e===w?12:e>=C?4.4:6.2,D=_f({base:`#ffffff`,emissive:!0,instanced:!0,instanceColor:!0}),O=new si(new wi(1,1,1),D,g.length),k=m.map(e=>e.clone()),A=h.map(e=>e.clone()),j=new Et,M=Q(.3,1,-.2).normalize(),N=e=>{j.setFromAxisAngle(M,e),k.forEach((e,t)=>A[C+t].copy(e).applyQuaternion(j)),A.forEach((e,t)=>{let n=E(t);b.compose(e,x.identity(),Q(n,n,n)),y.setMatrixAt(t,b)}),g.forEach(([e,t,n],r)=>{let i=A[e],a=A[t],o=a.clone().sub(i),s=o.length();x.setFromUnitVectors(S,o.normalize()),b.compose(i.clone().add(a).multiplyScalar(.5),x,Q(.9*n,s,.9*n)),O.setMatrixAt(r,b)}),y.instanceMatrix.needsUpdate=!0,O.instanceMatrix.needsUpdate=!0};N(0);let P=new q(e.signal).multiplyScalar(.6),F=new q(e.signal),I=new q(e.hot),ee=new q;h.forEach((e,t)=>y.setColorAt(t,P)),g.forEach((e,t)=>O.setColorAt(t,F)),u.add(y,O);let te=new si(new wi(2.4,2.4,2.4),_f({base:e.hot,emissive:!0,instanced:!0}),18);u.add(te);let ne=Array.from({length:18},(e,t)=>({e:Math.floor(Wd()*g.length),u:Wd(),v:.5+Wd()*1.2}));t.row(i-90,a+128,i+90,a+128,8,`can`,{r:7,h:20}),t.row(i+128,a-80,i+128,a+80,6,`can`,{r:7,h:20}),t.sprinkle(i,a,200,200,70,6,16),n&&(n.ao(i,a,210,210,8,.9),n.footprint(i,a,206,206,4),n.text(`U7`,i-104,a-118,10,{weight:`700`}),n.text(`神經`,i-150,a+190,56,{weight:`700`,family:vf,rot:Math.PI/4,stretch:2.2}),n.text(`NEURAL CORE`,i-80,a+240,24,{weight:`700`,family:yf,rot:Math.PI/4,track:2,stretch:2}),n.text(`NPU-01  ·  LOCAL INFERENCE`,i-50,a+286,8,{rot:Math.PI/4,stretch:2}));let re=(e,t)=>{let n=Math.sin(e*127.1+t*311.7)*43758.5453;return n-Math.floor(n)},ie=0;return{group:r,update:(e,t=0,n=0,r=1)=>{if(r<.3&&t<=0)return;let i=Math.floor(e*12)/12;ie+=(n-ie)*.05,u.rotation.set(.18+Math.sin(i*.3)*.05,i*.22,.08),N(-i*.5);let a=1.6-ie*.5,o=Math.floor(i/a),s=i%a/a,c=e=>{let t=T(e),n=[0,.16,.34][t],r=[.16,.22,.26][t],i=t===0||re(o,e)<.66+ie*.2,a=(s-n)/r;return i&&a>=0&&a<1?1-a*a:0},l=h.map((e,n)=>Math.min(1,c(n)+t*.6));h.forEach((e,t)=>y.setColorAt(t,ee.copy(P).lerp(I,l[t]))),g.forEach(([e,t],n)=>O.setColorAt(n,ee.copy(F).multiplyScalar(.78).lerp(I,Math.min(l[e],l[t])*.9+Math.max(l[e],l[t])*.25))),y.instanceColor.needsUpdate=!0,O.instanceColor.needsUpdate=!0,ne.forEach((e,n)=>{let[r,a]=g[e.e],o=e.u+i*e.v*(1+t*2+ie),s=Math.floor(o);o-=s,s%2&&(o=1-o),b.compose(A[r].clone().lerp(A[a],o),x.identity(),Q(1,1,1)),te.setMatrixAt(n,b)}),te.instanceMatrix.needsUpdate=!0},lattice:u,nodeMesh:y,edgeMat:D,nodeMat:v,faceMat:_.material,dieMat:c.material,center:l,power:1}}function jf(e){let t=e.attributes.position,n=[];for(let e=0;e<t.count;e++){let r=Q(t.getX(e),t.getY(e),t.getZ(e));n.some(e=>e.distanceToSquared(r)<.001)||n.push(r)}return n}function Mf(e,t){let n=e.attributes.position,r=e=>t.findIndex(t=>t.distanceToSquared(Q(n.getX(e),n.getY(e),n.getZ(e)))<.001),i=new Set,a=[];for(let e=0;e<n.count;e+=3){let t=[r(e),r(e+1),r(e+2)];for(let[e,n]of[[t[0],t[1]],[t[1],t[2]],[t[2],t[0]]]){let t=e<n?`${e}_${n}`:`${n}_${e}`;i.has(t)||(i.add(t),a.push([e,n]))}}return a}function Nf(e,t,n){let r=new wn,i=_f({base:`#283130`,brush:.14,spec:.3,rim:.15}),a=_f({base:e.connector,brush:.14,spec:.4,rim:.6}),o=_f({base:e.goldPart,brush:.12,spec:.7,rim:.6}),s=-942,c=[{z:-600,w:110,h:128,d:64,label:`USB 10G`},{z:-520,w:120,h:168,d:78,label:`LAN 2.5G`},{z:-446,w:100,h:112,d:60,label:`HDMI · DP`},{z:-378,w:110,h:124,d:66,label:`USB-C 20G`},{z:-230,w:100,h:170,d:72,label:`AUDIO`}];c.forEach(e=>{$(r,e.w,e.h,e.d,s-(110-e.w)/2,0,e.z,i),$(r,e.w+6,7,e.d+6,s-(110-e.w)/2,0,e.z,a);for(let t=0;t<3;t++)$(r,10,7,8,s-(110-e.w)/2-e.w/2+16+t*(e.w-32)/2,e.h,e.z-e.d/4+t%2*e.d/2,i);for(let t=0;t<3;t++)$(r,2,e.h-30,3,s-(110-e.w)/2+e.w/2+1,14,e.z-e.d/2+12+t*(e.d-24)/2,i);$(r,4,e.h-16,e.d-12,s-(110-e.w)/2+e.w/2+1,8,e.z,a);for(let t=0;t<4;t++)$(r,2.4,6,2.4,s+e.w/2+6-(110-e.w)/2,0,e.z-e.d/2+8+t*(e.d-16)/3,o);n?.ao(s-(110-e.w)/2,e.z,e.w+8,e.d+8,6,.9),n?.text(e.label,-876,e.z,7,{weight:`700`,rot:-Math.PI/2,align:`center`})});for(let e of[-690,-655]){let t=new J(new Ei(7,7,46,6),o);t.position.set(-960,23,e),r.add(t),n?.aoDisc(-960,e,10,4,.9)}let l=_f({base:e.signalDeep,emissive:!0}),u=_f({base:e.ledOff,emissive:!0});[[-322,l],[-292,u]].forEach(([e,t])=>{$(r,40,28,26,-950,0,e,a),$(r,6,3,6,-934,28,e,t)});let d=new ia;d.moveTo(720,0),d.lineTo(150,0),d.lineTo(150,330),d.lineTo(720,330),d.lineTo(720,0);let f=[],p={u:435,v:250,s:120/104};df(zd,!0).concat(df(Bd,!0)).forEach(e=>{let t=e.getPoints().map(e=>new W(p.u+e.x*p.s,p.v+e.y*p.s));f.push(t)});let m=f.length;for(let[e,t]of[[196,356],[514,690]])for(let n=0;n<2;n++)for(let r=e;r<t;r+=40)f.push([[r,226+n*36],[r+26,226+n*36],[r+26,236+n*36],[r,236+n*36]].map(([e,t])=>new W(e,t)));f.forEach(e=>d.holes.push(new ra(e)));let h=new J(new Ja(d,4),_f({base:e.ioShield,brush:.12,spec:.8,rim:1,side:2}));h.rotation.y=Math.PI/2,h.position.set(-1004,0,0),r.add(h);let g=_f({base:`#0b1616`,brush:.05,spec:0,rim:0,dot:0});$(r,2,70,166,-1009,214,-269,g),$(r,2,70,194,-1009,214,-607,g);let _=of(560,150,(e,t,n)=>{e.fillStyle=`#2a2314`,e.fillRect(0,0,t,n);let r=([e,r])=>[((e-60)*p.s+280)/560*t,(77-(60-r)*p.s)/150*n],i=e=>{let t=new Path2D;for(let n of e.split(`M`).filter(e=>e.trim()))n.replace(/Z/g,``).trim().split(/\s*L\s*|\s+/).map(e=>e.split(`,`).map(Number)).filter(e=>e.length===2&&!isNaN(e[0])).map(r).forEach(([e,n],r)=>r?t.lineTo(e,n):t.moveTo(e,n)),t.closePath();return t},a=i(Bd),o=i(zd),s=t/560;e.fillStyle=`#6e5530`,e.strokeStyle=`#6e5530`,e.lineWidth=5*s,e.fill(a),e.stroke(a),e.fillStyle=`#f4ecd8`,e.strokeStyle=`#f4ecd8`,e.fill(o),e.stroke(o)},{emissive:!0,res:1024});_.rotation.y=Math.PI/2,_.position.set(-1016,252,-435),r.add(_);let v=Q(1,-.95,.14).normalize(),y=[],b=[],x=e=>Q(-1004,e.y,-e.x),S=[];f.forEach((e,t)=>{if(t>=m)return;let n=e.map(x);for(let e=0;e<n.length;e++){let t=n[e],r=n[(e+1)%n.length],i=t.clone().addScaledVector(v,560),a=r.clone().addScaledVector(v,560);for(let[e,n]of[[t,0],[r,0],[a,1],[t,0],[a,1],[i,1]])y.push(e.x,e.y,e.z),b.push(n)}t<5&&S.push(n.map(e=>e.clone().addScaledVector(v,-e.y/v.y)))});let C=new Er;C.setAttribute(`position`,new mr(y,3)),C.setAttribute(`fade`,new mr(b,1));let w=sf({color:e.cream,print:!0,vertex:`in vec3 position; in float fade; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; out float vF; out vec3 vW;
      void main(){ vF = fade; vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,fragment:`precision highp float; ${Du} uniform vec3 uColor, uWarm, uLd, cameraPosition; uniform float uAmt, uStep, uPx; in float vF; in vec3 vW;
      layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){
        // light scatters forward: the shafts are strongest looking back toward the opening. Printed as round dots
        // of warm ink in three steps that fall away fast, so the light belongs to the mark and dies before the floor
        // the beam reads from the side (flying in); seen square on, down its length, it would only print dots over the
        // mark itself, so it thins out the more directly you look into it. Out within the first quarter of its run
        float fw = max(0.0, -dot(normalize(vW - cameraPosition), uLd)), side = 1.0 - fw;
        float k = vF < 0.08 ? 1.0 : (vF < 0.16 ? 0.45 : (vF < 0.27 ? 0.15 : 0.0));
        float d = halftone(gl_FragCoord.xy, 7.0 * uPx, 0.785, k * (0.02 + 0.2 * side * side) * uAmt);
        gColor = vec4(uColor, d * step(0.01, uAmt) * step(0.0, vW.y)); gNormal = vec4(0.0);
      }`,uniforms:{uAmt:{value:1},uStep:Z.uStep,uLd:{value:v.clone()},uPx:Z.uPx,uWarm:{value:new q(`#15130f`)}}}),T=new J(C,w);T.frustumCulled=!1,r.add(T);let E=[];S.forEach(e=>{let t=new ia(e.map(e=>new W(e.x,e.z))),n=za.triangulateShape(t.getPoints(),[]),r=t.getPoints();n.forEach(e=>e.forEach(e=>E.push(r[e].x,.9,r[e].y)))}),new Er().setAttribute(`position`,new mr(E,3));let D=sf({color:e.light,print:!0,vertex:`in vec3 position; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; void main(){ gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); }`,fragment:`precision highp float; ${Du} uniform vec3 uColor, uWarm; uniform float uAmt, uPx; layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){ float d = halftone(gl_FragCoord.xy, 7.0 * uPx, 0.785, 0.12 * uAmt); gColor = vec4(d > 0.5 ? uColor : uWarm, max(d, 0.1 * uAmt) * step(0.01, uAmt)); gNormal = vec4(0.0); }`,uniforms:{uAmt:{value:1},uPx:Z.uPx,uWarm:{value:new q(e.brass)}}});t.chip(-820,-560,38,38,4,{label:`U21 LAN`}),t.chip(-822,-200,30,30,3.5,{label:`U24 CODEC`}),t.chip(-760,-420,34,34,4,{label:`U22 USB`}),t.sprinkle(-820,-560,38,38,26),t.sprinkle(-822,-200,30,30,22),t.sprinkle(-760,-420,34,34,22);for(let n=0;n<6;n++)t.can(-860+n%3*22,-150+Math.floor(n/3)*22,8,22,e.audioCap,e.audioCapTop);n&&(n.text(`接口`,-856,-380,62,{weight:`700`,family:vf,rot:-Math.PI/2,stretch:1.8}),n.text(`I/O`,-770,-380,36,{weight:`700`,family:yf,rot:-Math.PI/2,stretch:1.8}),n.text(`REAR PANEL  ·  OUT TO THE WORLD`,-730,-380,8,{rot:-Math.PI/2,stretch:1.8}),n.line([[-884,-720],[-884,-150]],1.2));let O=c.map(e=>e.z),k=_f({base:e.signal,emissive:!0,instanced:!0}),A=new si(new wi(9,2.2,3.4),k,O.length*4);A.frustumCulled=!1,r.add(A);let j=new K,M=new K().makeScale(0,0,0);return n&&O.forEach((e,t)=>n.line([[-630,e+(t%2?6:-6)],[-884,e+(t%2?6:-6)]],1.6)),{group:r,shaftMat:w,patchMat:D,outside:_,shafts:T,update:e=>{let t=Math.floor(e*12)/12;O.forEach((e,n)=>{for(let r=0;r<4;r++){let i=-640-((t*(.55+n*.07)+r/4+n*.13)%1+1)%1*250;i<-884?A.setMatrixAt(n*4+r,M):(j.makeTranslation(i,1.4,e+(n%2?6:-6)),A.setMatrixAt(n*4+r,j))}}),A.instanceMatrix.needsUpdate=!0},pkMat:k,leds:[l]}}function Pf(e,t,n){let r=new wn,i=_f({base:e.slot,brush:.14,spec:.5,rim:1}),a=_f({base:`#37423f`,brush:.14,spec:.35,rim:.35}),o=_f({base:e.connector,brush:.14,spec:.5,rim:1});$(r,572,24,20,-436,0,560,a),$(r,22,30,22,-138,0,560,_f({base:e.latch,spec:.6,rim:1})),$(r,560,1,3,-436,24,560,_f({base:e.goldPart,spec:1,rim:.3})),$(r,572,22,18,-436,0,680,i),$(r,22,28,20,-138,0,680,_f({base:e.latch,spec:.6,rim:1})),$(r,330,12,66,-460,0,620,_f({base:e.anod,brush:.12,spec:.8,rim:1,id:184})),r.add(Cf(330,66,-460,12,620,(t,n,r)=>{t.fillStyle=e.anod,t.fillRect(0,0,n,r),t.fillStyle=`rgba(255,255,255,0.08)`;for(let e=0;e<n;e+=14)t.fillRect(e,0,6,r);t.globalAlpha=.24,t.fillStyle=e.silk,t.font=`700 ${r*.32}px ${yf}`,t.textBaseline=`middle`,t.fillText(`M.2_1  STORAGE`,n*.05,r*.52),t.globalAlpha=.4,t.fillStyle=e.signalDeep,t.fillRect(n*.7,r*.44,n*.25,r*.12),t.globalAlpha=1},184,{res:1024})),$(r,190,10,190,140,0,470,_f({base:e.sinkDark,brush:.14,spec:.7,rim:1})),$(r,160,24,160,140,10,470,_f({base:e.sink,brush:.14,spec:.9,rim:1,id:182})),r.add(Cf(160,160,140,34,470,(t,n,r)=>{t.fillStyle=e.sinkDark,t.fillRect(0,0,n,r),t.fillStyle=e.anod,t.fillRect(n*.12,r*.34,n*.76,r*.32)},182,{res:1024})),$(r,150,2,1.4,140,20,550.8,_f({base:e.signalDeep,emissive:!0})),$(r,44,50,238,940,0,-140,o);for(let t=0;t<12;t++)for(let n=0;n<2;n++)$(r,9,2,9,931+n*18,50,-224+t*15,_f({base:e.ink2,spec:0}));for(let e=0;e<4;e++)$(r,34,30,46,950,0,140+e*58,o);$(r,52,20,22,720,0,700,o),$(r,44,16,22,560,0,700,o);for(let[t,n]of[[-430,-620],[700,-650],[880,610],[-700,700]])$(r,22,14,10,t,0,n,_f({base:e.latch,spec:.5,rim:1}));let s=new J(new Ei(48,48,9,48),_f({base:`#3a4543`,spec:.25,rim:.2,brush:.1}));s.position.set(330,8,640),r.add(s);let c=new J(new Ei(54,54,4,48),o);c.position.set(330,2,640),r.add(c);let l=of(34,20,(t,n,r)=>{t.fillStyle=`#060908`,t.fillRect(0,0,n,r),t.fillStyle=e.signalDeep,t.font=`700 ${r*.8}px ${bf}`,t.textAlign=`center`,t.textBaseline=`middle`,t.fillText(`A0`,n/2,r*.55)},{emissive:!0,res:128});l.rotation.x=-Math.PI/2,l.position.set(860,6.1,-330),r.add(l),$(r,40,6,26,860,0,-330,o);let u=[];[`CPU`,`DRAM`,`VGA`,`BOOT`].forEach((t,i)=>{let a=_f({base:i===3?e.signalDeep:e.ledOff,emissive:!0});$(r,6,2.5,4,820,0,-300+i*14,a),u.push(a),n?.text(t,800,-300+i*14,4.5,{align:`right`})}),[[720,420,56,56,`U31 SIO`],[150,200,24,24,`U12 CLK`],[640,300,26,20,`U40 BIOS`],[-700,160,40,40,`U18`],[420,650,30,30,`U33`],[-240,640,26,26,`U27`],[800,160,34,34,`U35`],[-560,-620,40,30,`U20`],[520,-620,44,44,`U38`],[780,-500,30,30,`U39`],[-880,300,36,36,`U16`],[-860,560,30,30,`U15`]].forEach(([e,n,r,i,a])=>{t.chip(e,n,r,i,4,{label:a}),t.sprinkle(e,n,r,i,18)});let d=[[-80,-120,380,380],[-80,-340,560,110],[-306,-88,110,480],[334,-108,230,820],[-470,330,300,300],[700,140,380,340],[-205,245,270,240],[-940,-435,160,620],[-436,620,620,160],[140,470,210,210],[940,-140,80,260],[950,230,60,260],[330,640,120,120],[860,-320,80,120]],f=(e,t,n)=>Math.abs(e)<Kd.w/2-40&&Math.abs(t)<Kd.h/2-40&&!d.some(([r,i,a,o])=>Math.abs(e-r)<a/2+n&&Math.abs(t-i)<o/2+n),p=0;for(let e=0;e<600&&p<34;e++){let e=(Wd()-.5)*Kd.w,n=(Wd()-.5)*Kd.h,r=14+Wd()*30,i=14+Wd()*30;f(e,n,Math.max(r,i))&&(t.chip(e,n,r,i,3+Wd()*2,{label:`U${50+p}`,pins:Wd()<.7}),t.sprinkle(e,n,r,i,10),p++)}let m=0;for(let n=0;n<900&&m<70;n++){let n=(Wd()-.5)*Kd.w,r=(Wd()-.5)*Kd.h,i=5+Wd()*6;f(n,r,i+6)&&(t.can(n,r,i,14+Wd()*18,Wd()<.7?e.can:e.can2),m++)}for(let e=0,n=0;e<3e3&&n<600;e++){let e=(Wd()-.5)*Kd.w,r=(Wd()-.5)*Kd.h;if(!f(e,r,4))continue;let i=Wd()<.5;t.passive(e,r,i?2.2:4.2,i?4.2:2.2,1.6),n++}if(n){n.ao(-436,560,580,30,5,.9),n.ao(-436,680,580,28,5,.9),n.ao(-460,620,336,72,6,.85),n.ao(140,470,200,200,8,.9),n.ao(940,-140,52,246,6,.9),n.aoDisc(330,640,56,6,.9),n.text(`PCIE_1  ×16`,-720,536,9,{weight:`700`}),n.text(`PCIE_2  ×4`,-720,704,9,{weight:`700`}),n.text(`ATX_24P`,900,-270,7,{weight:`700`,rot:Math.PI/2}),n.text(`BAT1  +`,380,700,7,{weight:`700`});for(let[e,t]of[[-950,-700],[950,-700],[950,700],[-950,700],[-80,700],[330,-660],[-660,120]])n.ring(e,t,8,16),n.aoDisc(e,t,18,4,.5);n.path(zd,-880,620,60),n.path(Bd,-880,620,60),n.text(`XINI`,-842,606,30,{weight:`700`,family:yf,track:3}),n.text(`MB-01  REV 2.6  ·  2026`,-842,634,9),n.text(`DESIGNED AND BUILT BY XINI`,-842,650,7)}let h=[e.signalDeep],g=[];for(let e=0;e<2e3&&g.length<90;e++){let e=(Wd()-.5)*(Kd.w-80),t=(Wd()-.5)*(Kd.h-80);f(e,t,3)&&g.push({x:e,z:t,c:h[Math.floor(Wd()*h.length)],r:Wd(),rate:.6+Wd()*2.5})}let _=new si(new wi(2.4,1.3,3.4),_f({base:`#ffffff`,emissive:!0,instanced:!0,instanceColor:!0}),g.length),v=new K,y=new q,b=new q(e.ledOff);return g.forEach((e,t)=>{v.makeTranslation(e.x,.65,e.z),_.setMatrixAt(t,v),_.setColorAt(t,y.set(e.c)),n?.pad(e.x,e.z-2.6,3,1.2),n?.pad(e.x,e.z+2.6,3,1.2)}),_.frustumCulled=!1,r.add(_),g.forEach((e,t)=>_.setColorAt(t,e.r<.45?y.set(e.c):b)),_.instanceColor.needsUpdate=!0,{group:r,leds:u,updateLeds:()=>{},ledMat:_.material}}function Ff(e){let{cx:t,cz:n}=lf,r=xf.dimm;for(let i=0;i<4;i++){let a=n-90+i*46,o=r.x0+i*r.pitch,s=a+(i-1.5)*90;e.bus($d([[t+120,a],[r.x0-60,a],[o-14,s],[o-14,s+[-120,-220,220,150][i]]]),9,4.4,2.2)}e.bus([[t-60,n+120],[t-60,96],[-348,96],[-348,552]],16,4.4,2.2),e.bus([[t-120,n+80],[t-120,8],[-420,228]],12,4.4,2.1),e.bus([[t+120,n+120],[250,210],[440,400],[466,426]],10,4.4,2.1),e.bus([[464,540],[262,540]],6,4,1.4),e.bus([[656,470],[800,470],[930,340],[930,150]],8,3.6,1.4),e.bus([[464,600],[300,600],[220,680],[-125,680]],8,3.6,1.4),e.bus([[t-120,n-110],[-560,n-110],[-830,-500],[-884,-500]],10,4.4,2),e.bus([[t-120,n+20],[-600,n+20],[-850,-350],[-884,-350]],8,4.4,2),e.bus([[-806,-200],[-884,-230]],6,3.4,1.2),e.bus([[-700,160],[-560,300],[-560,380],[-574,394]],6,3.6,1.3),e.bus([[720,392],[720,250],[640,170],[400,170]],6,3.6,1.3),e.bus([[150,188],[150,120],[100,70]],5,3,1.1),e.bus([[860,-317],[880,-260],[918,-230]],4,3,1.1);for(let t=0;t<160;t++){let t=(Wd()-.5)*(Kd.w-120),n=(Wd()-.5)*(Kd.h-120),r=30+Wd()*110,i=20+Wd()*80,a=Math.floor(Wd()*4),o=Wd()<.5?1:-1,s=[t,n],c=a%2?[t+r*(a===1?1:-1),n]:[t,n+r*(a===0?1:-1)],l=a%2?[c[0]+i*Math.sign(c[0]-t)*.7,c[1]+i*o*.7]:[c[0]+i*o*.7,c[1]+i*Math.sign(c[1]-n)*.7];e.bus([s,c,l],1+Math.floor(Wd()*4),3,.9)}}function If(e,t=1600){let n=new Float32Array(t*3),r=new Float32Array(t);for(let e=0;e<t;e++)n[e*3]=Wd()*700,n[e*3+1]=Wd()*700,n[e*3+2]=Wd()*700,r[e]=Wd();let i=new Er;i.setAttribute(`position`,new dr(n,3)),i.setAttribute(`seed`,new dr(r,1));let a=new _i(i,sf({color:e.dust,vertex:`in vec3 position; in float seed; uniform mat4 viewMatrix, projectionMatrix; uniform vec3 uCam; uniform float uTime, uPx, uScale;
      out float vA;
      void main(){
        vec3 p = position + vec3(sin(uTime * 0.11 + seed * 30.0) * 30.0, uTime * (2.0 + seed * 4.0), cos(uTime * 0.09 + seed * 20.0) * 30.0);
        p = mod(p - uCam + 350.0, 700.0) - 350.0 + uCam;
        p.y = max(p.y, 2.0);
        vec4 mv = viewMatrix * vec4(p, 1.0);
        float d = -mv.z;
        vA = smoothstep(350.0, 120.0, length(p - uCam)) * (0.35 + 0.65 * fract(seed * 7.3)) * smoothstep(4.0, 24.0, d);
        gl_PointSize = clamp(uScale * uPx * (1.0 + seed * 1.5) * 300.0 / max(d, 1.0), 1.0, 3.5 * uPx); // specks, never bokeh
        gl_Position = projectionMatrix * mv;
      }`,fragment:`precision highp float; uniform vec3 uColor; in float vA;
      layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){ vec2 q = gl_PointCoord - 0.5; float r = length(q); if (r > 0.5) discard; gColor = vec4(uColor, vA * 0.4 * step(r, 0.4)); gNormal = vec4(0.0); }`,uniforms:{uCam:{value:new G},uTime:Z.uTime,uPx:Z.uPx,uScale:{value:1.2}}}));return a.frustumCulled=!1,a.renderOrder=50,a}var Lf=new G;function Rf(e,t,n,r,i,a){let o=2*Math.PI*i/4,s=Math.max(a-2*i,0),c=Math.PI/4;Lf.copy(t),Lf[r]=0,Lf.normalize();let l=.5*o/(o+s),u=1-Lf.angleTo(e)/c;return Math.sign(Lf[n])===1?u*l:s/(o+s)+l+l*(1-u)}var zf=class e extends wi{constructor(e=1,t=1,n=1,r=2,i=.1){let a=r*2+1;if(i=Math.min(e/2,t/2,n/2,i),super(1,1,1,a,a,a),this.type=`RoundedBoxGeometry`,this.parameters={width:e,height:t,depth:n,segments:r,radius:i},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let s=new G,c=new G,l=new G(e,t,n).divideScalar(2).subScalar(i),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,p=u.length/6,m=new G,h=.5/a;for(let r=0,a=0;r<u.length;r+=3,a+=2)switch(s.fromArray(u,r),c.copy(s),c.x-=Math.sign(c.x)*h,c.y-=Math.sign(c.y)*h,c.z-=Math.sign(c.z)*h,c.normalize(),u[r+0]=l.x*Math.sign(s.x)+c.x*i,u[r+1]=l.y*Math.sign(s.y)+c.y*i,u[r+2]=l.z*Math.sign(s.z)+c.z*i,d[r+0]=c.x,d[r+1]=c.y,d[r+2]=c.z,Math.floor(r/p)){case 0:m.set(1,0,0),f[a+0]=Rf(m,c,`z`,`y`,i,n),f[a+1]=1-Rf(m,c,`y`,`z`,i,t);break;case 1:m.set(-1,0,0),f[a+0]=1-Rf(m,c,`z`,`y`,i,n),f[a+1]=1-Rf(m,c,`y`,`z`,i,t);break;case 2:m.set(0,1,0),f[a+0]=1-Rf(m,c,`x`,`z`,i,e),f[a+1]=Rf(m,c,`z`,`x`,i,n);break;case 3:m.set(0,-1,0),f[a+0]=1-Rf(m,c,`x`,`z`,i,e),f[a+1]=1-Rf(m,c,`z`,`x`,i,n);break;case 4:m.set(0,0,1),f[a+0]=1-Rf(m,c,`x`,`y`,i,e),f[a+1]=1-Rf(m,c,`y`,`x`,i,t);break;case 5:m.set(0,0,-1),f[a+0]=Rf(m,c,`x`,`y`,i,e),f[a+1]=1-Rf(m,c,`y`,`x`,i,t)}}static fromJSON(t){return new e(t.width,t.height,t.depth,t.segments,t.radius)}},Bf=e=>Zu({brushScale:.07,dotCell:4.5,...e}),Vf=`"JetBrains Mono Variable", ui-monospace, monospace`,Hf=e=>e<.5?4*e*e*e:1-(-2*e+2)**3/2,Uf=Tt.clamp,Wf=Tt.lerp,Gf=(e,t,n)=>Uf((e-t)/(n-t),0,1),Kf=e=>Math.floor(e*12)/12,qf=e=>{let t=Math.sin(e*127.1+311.7)*43758.5453;return t-Math.floor(t)};function Jf(e,t,n,{face:r=Q(-80,0,660)}={}){let i=new wn,{x:a,z:o}=xf.enclave;i.position.set(a,0,o);let s=Math.atan2(r.x-a,r.z-o),c=Bf({base:e.brassDark,brush:.12,spec:.8,rim:1}),l=Bf({base:e.shieldDark,brush:.14,spec:.8,rim:1}),u=new J(new zf(250,22,210,2,4),Bf({base:`#1d2726`,brush:.12,spec:.4,rim:.5}));u.position.y=11,i.add(u);let d=new J(new zf(258,3,218,1,1.2),c);d.position.y=1.5,i.add(d);let f=Bf({base:e.laser,emissive:!0}),p=new wn;p.userData.dynamic=!0,i.add(p);for(let[e,t]of[[-1,-1],[1,-1],[1,1],[-1,1]]){let n=new J(new zf(7,74,7,1,1.5),l);n.position.set(e*330/2,37,t*290/2),p.add(n);let r=new J(new wi(4,4,4),f);r.position.set(e*330/2,76,t*290/2),p.add(r)}let m=new wn;m.rotation.y=s,m.position.y=22,m.userData.dynamic=!0,i.add(m);let h={cipher:_()};Object.values(h).forEach(e=>{m.add(e.group),Fd(e.group),e.group.visible=!1});let g=`cipher`;if(h[g].group.visible=!0,n){n.ao(a,o,270,230,8,.95),n.hazard(a,o,364,324,11,9),n.text(`U9`,a-165-16,o-145-26,10,{weight:`700`});let e=Q(a-r.x,0,o-r.z).normalize(),t=Q(-e.z,0,e.x),i=Math.atan2(t.z,t.x),s=(n,r)=>[a+t.x*n-e.x*r,o+t.z*n-e.z*r];n.text(`加密`,...s(-100,300),46,{weight:`700`,family:`"Zen Kaku Gothic New", sans-serif`,rot:i,stretch:2.4}),n.text(`SECURE ENCLAVE`,...s(-40,330),18,{weight:`700`,family:`"Chakra Petch", sans-serif`,rot:i,track:2,stretch:2.2}),n.text(`NO UNSIGNED CODE PAST THIS LINE`,...s(-20,368),6.5,{rot:i,stretch:2})}t.chip(a-90,o+262,36,36,4.5,{label:`TPM`,pitch:3.4}),t.row(a-120,o+300,a-80,o+300,3,`cap`),t.sprinkle(a,o,360,320,50,4,20);function _(){let t=new wn,n=new J(new zf(72,16,72,2,4),l);n.position.y=8,t.add(n);let r=new J(new zf(52,4,52,1,1.5),c);r.position.y=18,t.add(r);let i=Bf({base:e.laser,emissive:!0}),a=new J(new Za(32,1.4,6,48).rotateX(Math.PI/2),i);a.position.y=16.5,t.add(a);let o=new J(new Ei(30,24,46,32,1,!0),sf({color:e.laser,print:!0,vertex:`in vec3 position; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; out float vY;
        void main(){ vY = position.y / ${46 .toFixed(1)} + 0.5; gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); }`,fragment:`precision highp float; ${Du} uniform vec3 uColor; uniform float uAmt, uPx; in float vY;
        layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
        void main(){ float k = vY < 0.34 ? 1.0 : (vY < 0.68 ? 0.5 : 0.18); float d = halftone(gl_FragCoord.xy, 6.5 * uPx, 0.785, 0.24 * k * uAmt);
          gColor = vec4(uColor, d * step(0.01, uAmt)); gNormal = vec4(0.0); }`,uniforms:{uAmt:{value:1},uPx:Z.uPx}}));o.position.y=43,o.frustumCulled=!1,o.userData.dynamic=!0,t.add(o);let s=new wn;s.position.y=132,s.rotation.set(.3,-.42,0),s.userData.dynamic=!0,t.add(s);let u=[];for(let e=-1;e<=1;e++)for(let t=-1;t<=1;t++)for(let n=-1;n<=1;n++)(e||t||n)&&u.push(Q(e,t,n));let d=new si(new zf(40,40,40,2,4),Bf({base:e.anod,brush:.1,spec:.4,rim:.15,instanced:!0}),u.length);d.frustumCulled=!1,s.add(d);let f=af(1280,1280,(e,t)=>{e.fillStyle=`#000`,e.fillRect(0,0,t,t);let n=e=>e<10?[e%5,Math.floor(e/5)]:[(e-10)%2,2+Math.floor((e-10)/2)];`0123456789ABCDEF`.split(``).forEach((t,r)=>{let[i,a]=n(r),o=i*256,s=a*256;e.strokeStyle=`rgba(255,255,255,0.34)`,e.lineWidth=7,e.strokeRect(o+22,s+22,212,212),e.fillStyle=`#fff`,e.font=`700 150px ${Vf}`,e.textAlign=`center`,e.textBaseline=`middle`,e.fillText(t,o+128,s+128+8),e.fillRect(o+40,s+256-52,30,7)});let r=768/120;e.save(),e.translate(512,512),e.scale(r,r);for(let[t,n]of[[Bd,`#8c8c8c`],[zd,`#ffffff`]]){e.fillStyle=n;for(let n of t.split(`M`).filter(e=>e.trim())){let t=n.replace(/Z/g,``).trim().split(/\s*L\s*/).map(e=>e.split(`,`).map(Number));e.beginPath(),t.forEach(([t,n],r)=>r?e.lineTo(t,n):e.moveTo(t,n)),e.closePath(),e.fill()}}e.restore()}),p=e=>e<10?[e%5,Math.floor(e/5)]:[(e-10)%2,2+Math.floor((e-10)/2)],m=[[0,1],[0,-1],[1,1],[1,-1],[2,1],[2,-1]],h=m.map(([e,t])=>{let n=Q(0,0,0).setComponent(e,t),r=new Et().setFromUnitVectors(Q(0,0,1),n);return new K().compose(n.clone().multiplyScalar(20.45),r,Q(1,1,1))}),g=[];u.forEach((e,t)=>m.forEach(([n,r],i)=>{if(e.getComponent(n)!==r)return;let a=p(Math.floor(qf(t*6.1+i*2.3)*16));n===2&&r===1?g.push({ci:t,fi:i,cell:[2+e.x+1,3-e.y],glyph:a,mark:1}):g.push({ci:t,fi:i,cell:a,glyph:a,mark:0})}));let _=new qa(35,35),v=e=>e.toFixed(3);_.setAttribute(`aCell`,new $r(new Float32Array(g.flatMap(e=>e.cell)),2)),_.setAttribute(`aMark`,new $r(new Float32Array(g.map(e=>e.mark)),1)),_.setAttribute(`aGlyph`,new $r(new Float32Array(g.flatMap(e=>e.glyph)),2)),_.setAttribute(`aSeed`,new $r(new Float32Array(g.map((e,t)=>qf(t*3.3))),1));let y=new co({glslVersion:Ve,vertexShader:`in vec3 position; in vec2 uv; in mat4 instanceMatrix; in vec2 aCell, aGlyph; in float aMark, aSeed;
        uniform mat4 modelMatrix, viewMatrix, projectionMatrix; uniform float uSolve;
        out vec2 vUv, vFace; out vec3 vN; flat out vec2 vCell, vGlyph; flat out float vMark, vSeed;
        void main(){ vUv = uv; vCell = aCell; vGlyph = aGlyph; vMark = aMark; vSeed = aSeed;
          vec3 p = position; vFace = vec2(0.0);
          if (aMark > 0.5) {
            float sv = smoothstep(aSeed * 0.62, aSeed * 0.62 + 0.38, uSolve);
            float ext = ${v(3.8999999999999986)} * smoothstep(0.5, 1.0, sv); // grows across the gaps once it has flipped to the mark
            float hx = aCell.x - 3.0, hy = 3.0 - aCell.y;
            if (p.x > 0.0 && hx < 0.5) p.x += ext;
            if (p.x < 0.0 && hx > -0.5) p.x -= ext;
            if (p.y > 0.0 && hy < 0.5) p.y += ext;
            if (p.y < 0.0 && hy > -0.5) p.y -= ext;
            vFace = vec2(hx, hy) * ${v(44)} + p.xy;
          }
          mat4 mv = viewMatrix * modelMatrix * instanceMatrix; vN = normalize(mat3(mv) * vec3(0.0, 0.0, 1.0));
          gl_Position = projectionMatrix * mv * vec4(p, 1.0); }`,fragmentShader:`precision highp float; uniform sampler2D uAtlas; uniform vec3 uLock, uOk, uHot; uniform float uSolve, uStep, uAmt, uWake;
        in vec2 vUv, vFace; in vec3 vN; flat in vec2 vCell, vGlyph; flat in float vMark, vSeed;
        layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
        void main(){
          // locked, every tile is an ink face with a glyph in vermilion; in the solve each front tile flips, click by
          // click, to its piece of the mark (cream fold, green legs) and the other glyphs turn a dim green
          float sv = smoothstep(vSeed * 0.62, vSeed * 0.62 + 0.38, uSolve);
          bool mk = vMark > 0.5 && sv > 0.5;
          vec2 q = mk ? (vec2(2.0, 0.0) + 3.0 * clamp(vFace / ${v(123)} + 0.5, 0.0, 1.0)) / 5.0
                      : (vec2(vGlyph.x, 4.0 - vGlyph.y) + 0.02 + vUv * 0.96) / 5.0;
          float g = texture(uAtlas, q).r;
          // scrambled, the glyphs flicker on twos; solved, they hold steady and the mark burns brightest
          float fl = mix(1.0, mix(step(0.22, fract(sin(vSeed * 91.7 + floor(uStep * 12.0) * 3.1) * 43758.5)), 1.0, sv), uWake);
          // (solved, the rest of the cipher stays a dim vermilion: the cube still reads as a cipher, not another mark;
          // on standby it all sinks low, so it never pulls the eye back once you have left)
          vec3 ok = mk ? (g > 0.8 ? uHot : uOk) : uLock * 0.42;
          float gg = mk ? step(0.3, g) : g;
          vec3 lit = (mk ? ok : mix(uLock, ok, vMark > 0.5 ? 0.0 : sv)) * mix(0.18, 1.0, uWake);
          vec3 col = mix(vec3(0.012, 0.032, 0.027), lit * (0.3 + 0.7 * fl) * uAmt, gg);
          gColor = vec4(col, 1.0); gNormal = vec4(normalize(vN) * 0.5 + 0.5, 255.0 / 255.0);
        }`,uniforms:{uAtlas:{value:f},uLock:{value:new q(e.laser)},uOk:{value:new q(e.signal)},uHot:{value:new q(e.cream)},uSolve:{value:0},uStep:Z.uStep,uAmt:{value:1},uWake:{value:1}}}),b=new si(_,y,g.length);b.frustumCulled=!1,s.add(b);let x=[Q(1,0,0),Q(0,1,0),Q(0,0,1)],S=u.map(e=>({p:e.clone(),q:new Et})),C=e=>{let t=new Et().setFromAxisAngle(x[e.ax],e.dir*Math.PI/2);S.forEach(n=>{Math.round(n.p.getComponent(e.ax))===e.l&&(n.p.applyQuaternion(t).round(),n.q.premultiply(t))})},w=7,T=()=>(w=w*16807%2147483647)/2147483647,E=[],D=()=>{let e;do e={ax:Math.floor(T()*3),l:Math.floor(T()*3)-1,dir:T()<.5?-1:1};while(E.length&&E[E.length-1].ax===e.ax&&E[E.length-1].l===e.l);return e};for(let e=0;e<5;e++){let e=D();C(e),E.push(e)}let O=null,k=0,A=!1,j=-1,M=0,N=0,P=new K,F=new K,I=new Et,ee=new G,te=e=>{O?I.setFromAxisAngle(x[O.ax],e):I.identity();let t=new K().makeRotationFromQuaternion(I);S.forEach((e,n)=>{P.compose(ee.copy(e.p).multiplyScalar(44),e.q,Q(1,1,1)),O&&Math.round(e.p.getComponent(O.ax))===O.l&&P.premultiply(t),d.setMatrixAt(n,P),S[n].m=P.clone()}),g.forEach((e,t)=>{F.multiplyMatrices(S[e.ci].m,h[e.fi]),b.setMatrixAt(t,F)}),d.instanceMatrix.needsUpdate=!0,b.instanceMatrix.needsUpdate=!0};return te(0),{group:t,leds:[a],column:o,stickers:b,unlock(e){A=!0,j=-1},lock(){A=!1,j=-1,N=1},update(e,t,n,r,i=1){let a=Kf(e);if(y.uniforms.uWake.value=i,N&&=(k=a+N,0),i<.3&&!O&&!A){if(E.length<5){for(;E.length<5;){let e=D();C(e),E.push(e)}te(0)}return k=Math.max(k,a+.2),M=Math.max(0,M-t*2),y.uniforms.uSolve.value=M,M}if(!O){if(A){if(E.length){let e=E.pop();O={ax:e.ax,l:e.l,dir:-e.dir,t0:a,dur:1/6,push:!1}}else j<0&&(j=a,n?.play(`unlock`))}else if(a>=k){if(E.length>=6||E.length>=3&&T()<.4){let e=E.pop();O={ax:e.ax,l:e.l,dir:-e.dir,t0:a,dur:.25,push:!1}}else O={...D(),t0:a,dur:.25,push:!0}}}let o=0;if(O){let e=Uf((a-O.t0)/O.dur,0,1);o=O.dir*Math.PI/2*Hf(e),e>=1&&(C(O),O.push&&E.push({ax:O.ax,l:O.l,dir:O.dir}),r&&n?.play(`dial`,{gain:A?.7:.3}),O=null,o=0,k=a+.38)}return te(o),s.position.y=132+Math.sin(a*1.4)*3,M=j>=0?Gf(a-j,0,.6):Math.max(0,M-t*2),y.uniforms.uSolve.value=M,M}}}let v=new q(e.laser),y=new q(e.signal),b=new q,x=0;return{group:i,laserMat:f,variants:h,get current(){return g},set(e){h[e]&&e!==g&&(h[g].group.visible=!1,h[g].lock(),g=e,h[g].group.visible=!0)},unlock(e){h[g].unlock(e)},lock(){h[g].lock()},update(e,t,n,r=!1,i=1){let a=Kf(e),o=h[g],s=o.update(e,t,n,r,i)||0;x+=(s-x)*(1-Math.exp(-t*10)),f.uniforms.uGain.value=Wf(1,.06,x)*(x<.5&&i>.5?.8+.2*(Math.floor(a*6)%2):1)*Wf(.3,1,i),p.position.y=-80*Math.round(Uf(x*1.15,0,1)*6)/6,b.copy(v).lerp(y,Uf(x*1.4,0,1)),o.leds.forEach(e=>(e.material??e).uniforms.uBase.value.copy(b)),o.column&&(o.column.material.uniforms.uColor.value.copy(b),o.column.material.uniforms.uAmt.value=Wf(.15,1,i))}}}var Yf=e=>Zu({brushScale:.07,dotCell:4.5,...e}),Xf=`"JetBrains Mono Variable", ui-monospace, monospace`,Zf=`"Chakra Petch", sans-serif`,Qf=`"Zen Kaku Gothic New", sans-serif`,$f=e=>(e=Math.min(1,Math.max(0,e)),e*e*e*(10+e*(-15+6*e))),ep=(e,t,n)=>Math.min(1,Math.max(0,(e-t)/(n-t))),tp=e=>Math.floor(e*12)/12,np={xW:-305,xE:-95,zN:160,zS:330,H:122,feedZ:190,keep:[-322,124,-62,346]},rp=[`UI`,`3D`,`API`,`NET`,`DB`,`OPS`],ip={x:-200,z:262,w:158,d:96},ap=26,op=6,sp=9,cp=8;function lp(){let e=new Map,t=new K,n=new on;return{add(r,i,a,o,s,c=0,l=0,u=0){let d=r.index?r.toNonIndexed():r.clone();for(let e of Object.keys(d.attributes))[`position`,`normal`,`uv`].includes(e)||d.deleteAttribute(e);d.clearGroups(),d.applyMatrix4(t.makeRotationFromEuler(n.set(c,l,u)).setPosition(a,o,s)),e.has(i)||e.set(i,[]),e.get(i).push(d)},build(t){e.forEach((e,n)=>t.add(new J(Nd(e),n)))}}}var up=(e,t,n,r=2,i=2)=>new zf(e,t,n,i,Math.min(r,e/2-.01,t/2-.01,n/2-.01)),dp=(e,t,n=24,r=e)=>new Ei(r,e,t,n);function fp(e,t,n,r){let i=r/104;for(let r of[Bd,zd])for(let a of r.split(`M`).filter(e=>e.trim())){let r=a.replace(/Z/g,``).trim().split(/\s*L\s*/).map(e=>e.split(`,`).map(Number));e.beginPath(),r.forEach(([r,a],o)=>(o?e.lineTo:e.moveTo).call(e,t+(r-8)*i,n+(a-8)*i)),e.closePath(),e.fill()}}function pp(e,t,n){let r=np,{xW:i,xE:a,zN:o,zS:s,H:c}=r,l=new wn,u=Yf({base:e.brassDark,brush:.12,spec:.5,rim:.6}),d=Yf({base:`#56411f`,brush:.12,spec:.45,rim:.6}),f=Yf({base:`#2e3a38`,brush:.12,spec:.45,rim:.4}),p=Yf({base:e.brass,brush:.1,spec:.8,rim:.7}),m=Yf({base:e.steel,brush:.12,spec:.6,rim:.3}),h=Yf({base:e.anod,brush:.12,spec:.7,rim:.4}),g=Yf({base:e.anod2,brush:.12,spec:.8,rim:.4}),_=Yf({base:e.shieldDark,brush:.14,spec:.6,rim:1}),v=Yf({base:e.brassDark,brush:.1,spec:.6,rim:1}),y=lp(),b=s-o+28,x=(i+a)/2,S=(o+s)/2;for(let e of[i,a]){y.add(up(16,14,b,3),m,e,c-7,S),y.add(up(2.4,2,b-12,.8),u,e+(e===i?5:-5),c+1,S);for(let t of[o,s]){y.add(up(14,c-14,14,2.5),h,e,(c-14)/2,t),y.add(up(30,6,30,2),_,e,3,t),y.add(up(20,10,20,2.5),g,e,c-19,t);for(let n of[0,1,2,3])y.add(dp(1.8,2,8),m,e+(n%2?10:-10),6.5,t+(n>1?10:-10))}}y.add(up(a-i-14,10,10,2),h,x,c-30,o),y.add(up(a-i-30,3,11,1),v,x,c-23.5,o);let C=a+21;y.add(up(14,3,b-20,1),g,C,c-15,S),y.add(up(2,8,b-20,.6),g,C+7,c-10,S);let w=rp.map((e,t)=>-275+t*30);y.add(up(196,cp,40,3),h,-200,cp/2,r.feedZ),y.add(up(202,2,46,1),d,-200,1,r.feedZ);let T=of(192,36,(e,t,n)=>{e.fillStyle=`#0f1513`,e.fillRect(0,0,t,n);let r=t/192;w.forEach((t,n)=>{let i=(t+296)*r;e.fillStyle=`#050807`,e.fillRect(i-14.5*r,3*r,29*r,29*r),e.strokeStyle=`rgba(230,223,202,0.5)`,e.lineWidth=.5*r,e.strokeRect(i-14.5*r,3*r,29*r,29*r),e.fillStyle=`rgba(230,223,202,0.8)`,e.font=`700 ${2.6*r}px ${Xf}`,e.textAlign=`center`,e.fillText(String(n+1).padStart(2,`0`),i,35*r)})},{res:1024,bloom:!1});T.rotation.x=-Math.PI/2,T.position.set(-200,8.08,r.feedZ),l.add(T);let E=Yf({base:e.sheen,brush:.1,spec:1,rim:1}),D=Yf({base:`#0b0f0e`,brush:.1,spec:.5,rim:.6});for(let e of[-255,-200,-145]){for(let t of[-3.6,3.6])y.add(dp(19,1.2,36).rotateZ(Math.PI/2),E,e+t,24,146);y.add(dp(14,6,36).rotateZ(Math.PI/2),D,e,24,146),y.add(dp(4.5,9,14).rotateZ(Math.PI/2),m,e,24,146),y.add(up(14,6,14,2),h,e,3,146),y.add(up(3,20,3,1),g,e-6,14,146),y.add(up(8,.8,r.feedZ-146-20,.3),D,e,6.5,(146+r.feedZ-20)/2+2)}let O=af(768,256,e=>{[[`UI · 3D`],[`API · NET`],[`DB · OPS`]].forEach(([t],n)=>{let r=n*256;e.fillStyle=`#efe9d9`,e.fillRect(r,0,256,256),e.fillStyle=`#121615`,e.font=`700 54px ${Xf}`,e.textAlign=`center`,e.textBaseline=`middle`,e.fillText(t,r+128,96),e.font=`600 34px ${Xf}`,e.fillText(`XN · REEL`,r+128,176),e.fillRect(r+24,214,208,6)})}),k=[-255,-200,-145].map((e,t)=>{let n=new qa(16,8).toNonIndexed(),r=n.attributes.uv;for(let e=0;e<r.count;e++)r.setX(e,(t+r.getX(e))/3);return n.rotateY(Math.PI/2),n.translate(e+4.4,31,146),n});l.add(new J(Nd(k),Yf({base:`#ffffff`,map:O,mapAmt:1,brush:.05,spec:.2,rim:0}))),y.add(up(ip.w,5,ip.d,1.5),Yf({base:e.heroPcb,brush:.1,spec:.5,rim:.7}),ip.x,6.5,ip.z);for(let e of[-1,1])for(let t of[-1,1])y.add(dp(3.2,4,12),u,ip.x+e*(ip.w/2-8),2,ip.z+t*(ip.d/2-8));let A=e=>[ip.x-50+e%3*50,ip.z-22+44*Math.floor(e/3)],j=ip.w-3,M=ip.d-3,N=1024/j,P=(e,t)=>[(e-ip.x+j/2)*N,(t-ip.z+M/2)*N],F=[[0,1],[1,2],[0,3],[2,5],[3,4],[4,5],[1,4]],I=([e,t])=>{let[n,r]=A(e),[i,a]=A(t),o=ap/2;return r===a?[[n+o,r],[i-o,a]]:[[n,r+o],[i,a-o]]},ee=of(j,M,(t,n,r)=>{t.fillStyle=e.heroPcb,t.fillRect(0,0,n,r),t.fillStyle=`rgba(80,160,120,0.08)`,t.fillRect(6*N,6*N,n-12*N,r-24*N),t.strokeStyle=`rgba(215,174,96,0.46)`,t.lineWidth=.9*N,t.lineCap=`round`,F.forEach(e=>{let[[n,r],[i,a]]=I(e),o=r===a;for(let e of[-3,0,3]){let[s,c]=P(n+(o?0:e),r+(o?e:0)),[l,u]=P(i+(o?0:e),a+(o?e:0));t.beginPath(),t.moveTo(s,c),t.lineTo(l,u),t.stroke()}}),rp.forEach((e,n)=>{let[r,i]=A(n),[a,o]=P(r,i),s=15.4*N,c=5*N;t.strokeStyle=`rgba(236,230,212,0.85)`,t.lineWidth=.55*N;for(let[e,n]of[[-1,-1],[1,-1],[1,1],[-1,1]])t.beginPath(),t.moveTo(a+e*s-e*c,o+n*s),t.lineTo(a+e*s,o+n*s),t.lineTo(a+e*s,o+n*s-n*c),t.stroke();t.fillStyle=`rgba(236,230,212,0.9)`,t.beginPath(),t.arc(a-s-1.6*N,o-s-1.6*N,.8*N,0,Math.PI*2),t.fill(),t.fillStyle=`rgba(215,174,96,0.85)`;for(let e=0;e<7;e++)for(let n of[-1,1])t.fillRect(a-10*N+e*3.3*N-.6*N,o+n*13.6*N-.9*N,1.2*N,1.8*N);t.fillStyle=`rgba(236,230,212,0.85)`,t.font=`700 ${2.6*N}px ${Xf}`,t.textAlign=`left`,t.textBaseline=`alphabetic`,t.fillText(`U${n+1}`,a+s-4*N,o-s-1.2*N)}),t.fillStyle=`rgba(215,174,96,0.95)`;for(let e=0;e<30;e++)t.fillRect((14+e*4.3)*N,r-6*N,2.6*N,5.2*N);for(let[e,n]of[[8,8],[j-8,8],[8,M-8],[j-8,M-8]])t.beginPath(),t.arc(e*N,n*N,3.4*N,0,Math.PI*2),t.arc(e*N,n*N,2*N,0,Math.PI*2,!0),t.fill();t.fillStyle=`rgba(236,230,212,0.9)`,t.font=`700 ${4*N}px ${Zf}`,t.textAlign=`left`,t.fillText(`XN-SYS-01`,14*N,7.6*N),t.font=`600 ${2.2*N}px ${Xf}`,t.fillText(`ONE BOARD · SIX PARTS · REV A`,14*N,11.2*N),fp(t,j*N-20*N,2.6*N,9*N)},{res:1024,bloom:!1});ee.rotation.x=-Math.PI/2,ee.position.set(ip.x,9.06,ip.z),l.add(ee);let te=af(1024,Math.round(1024*M/j),e=>{e.fillStyle=`#000`,e.fillRect(0,0,1024,1024),e.lineWidth=1.1*N,e.lineCap=`round`,F.forEach((t,n)=>{let[[r,i],[a,o]]=I(t),s=i===o;for(let t of[-3,0,3]){let[c,l]=P(r+(s?0:t),i+(s?t:0)),[u,d]=P(a+(s?0:t),o+(s?t:0)),f=e.createLinearGradient(c,l,u,d);f.addColorStop(0,`rgb(255,0,${n*32})`),f.addColorStop(1,`rgb(255,255,${n*32})`),e.strokeStyle=f,e.beginPath(),e.moveTo(c,l),e.lineTo(u,d),e.stroke()}})}),ne=new J(new qa(j,M).rotateX(-Math.PI/2),sf({color:e.signal,vertex:`in vec3 position; in vec2 uv; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; out vec2 vUv;
      void main(){ vUv = uv; gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); }`,fragment:`precision highp float; uniform sampler2D uTex; uniform vec3 uColor, uHot; uniform float uAmt, uDraw, uStep; uniform float uBus[7]; in vec2 vUv;
      layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){
        vec4 t = texture(uTex, vUv);
        float cov = smoothstep(0.15, 0.6, t.r), along = t.g / max(t.r, 0.02);
        int bi = int(floor(t.b / max(t.r, 0.02) * 255.0 / 32.0 + 0.5));
        float lit = 0.0;
        for (int k = 0; k < 7; k++) if (k == bi) lit = uBus[k];
        float on = cov * max(step(along, uDraw), lit * 0.8);
        float pulse = step(0.82, fract(along * 2.5 - uStep * 1.4)) * step(0.999, uDraw);
        gColor = vec4(mix(uColor, uHot, pulse), on * uAmt * (0.6 + 0.4 * pulse)); gNormal = vec4(0.0);
      }`,uniforms:{uTex:{value:te},uHot:{value:new q(e.hot)},uAmt:{value:1},uDraw:{value:0},uStep:{value:0},uBus:{value:Array(7).fill(0)}}}));ne.position.set(ip.x,9.2,ip.z),l.add(ne);let re=Yf({base:`#ffffff`,emissive:!0,instanced:!0,instanceColor:!0}),ie=new si(new wi(4.4,1.6,2.6),re,7),ae=new K,oe=new Et;new q,rp.forEach((e,t)=>{let[n,r]=A(t);ae.makeTranslation(n+ap/2+4.5,9.8,r+ap/2-1),ie.setMatrixAt(t,ae)}),ae.makeTranslation(ip.x+ip.w/2-12,9.8,ip.z-ip.d/2+14),ie.setMatrixAt(6,ae);let L=new q(e.ledOff),se=new q(e.signal),ce=new q(e.brassDark);for(let e=0;e<7;e++)ie.setColorAt(e,L);l.add(ie);let le=af(768,512,e=>{e.clearRect(0,0,768,512),rp.forEach((t,n)=>{let r=n%3*256,i=Math.floor(n/3)*256;e.fillStyle=`rgba(236,230,212,0.95)`,e.font=`700 ${t.length>2?78:96}px ${Zf}`,e.textAlign=`center`,e.textBaseline=`middle`,e.fillText(t,r+128,i+118),e.font=`600 22px ${Xf}`,e.fillStyle=`rgba(236,230,212,0.7)`,e.fillText(`XN-${String(n+1).padStart(2,`0`)}`,r+128,i+186),e.beginPath(),e.arc(r+46,i+46,12,0,Math.PI*2),e.fill()})}),ue=Yf({base:e.ic,map:le,mapAmt:1,brush:.1,spec:.7,rim:1}),de=rp.map((e,t)=>{let n=up(ap,op,ap,1.1,2),r=n.attributes.position,i=n.attributes.normal,a=n.attributes.uv,o=t%3/3,s=1-(Math.floor(t/3)+1)/2;for(let e=0;e<r.count;e++)i.getY(e)>.9?a.setXY(e,o+(r.getX(e)/ap+.5)/3,s+(.5-r.getZ(e)/ap)/2):a.setXY(e,o+.01,s+.01);let c=new J(n,ue);return c.userData.dynamic=!0,l.add(c),c}),fe=e=>Q(w[e],11,r.feedZ),pe=e=>{let[t,n]=A(e);return Q(t,12,n)},me=new wn;me.userData.dynamic=!0,l.add(me);let he=a-i+44,ge=lp();ge.add(up(he,24,28,4),f,x,c+14,0),ge.add(up(he-16,4,30,1.5),g,x,c+28,0),ge.add(up(he-20,2.4,3,.8),p,x,c+30.6,13.5);for(let e of[i,a]){ge.add(up(32,28,46,4),h,e,c+10,0),ge.add(up(34,4,48,1.5),g,e,c+25.5,0);for(let t of[-1,1])ge.add(dp(5,5,16).rotateZ(Math.PI/2),m,e+(e===i?-16.5:16.5),c+1,t*14)}ge.add(up(10,18,10,2),g,C-4,c+6,0),ge.build(me);let _e=new wn;me.add(_e);let ve=lp();ve.add(up(42,46,50,5),g,0,c+14,0),ve.add(up(46,7,38,2),g,0,c+40,0),ve.add(up(46,2,3,.8),p,0,c+43.6,19.5),ve.add(up(22,28,12,3),h,0,c-4,22),ve.add(up(12,18,12,2),h,17,c-12,24),ve.add(dp(4.5,6,16),m,17,c-24,24),ve.build(_e);let ye=Yf({base:e.hot,emissive:!0}),be=new J(new Za(6,1.3,6,24).rotateX(Math.PI/2),ye);be.position.set(17,c-27.5,24),_e.add(be);let xe=Yf({base:e.signal,emissive:!0}),Se=new J(new wi(14,3,1.2),xe);Se.position.set(0,c+26,21.6),_e.add(Se);let Ce=new wn;Ce.position.z=22,_e.add(Ce);let we=lp();we.add(up(11,112,11,2),m,0,68,0),we.add(dp(2.2,14,12,3.2),g,0,6,0),we.add(dp(7,4,18),h,0,14,0),we.add(up(16,3,16,1),d,0,125,0),we.build(Ce);let Te=Yf({base:e.signal,emissive:!0}),Ee=new J(new Za(9.5,1.4,8,32).rotateX(Math.PI/2),Te);Ee.position.y=19,Ce.add(Ee);let De=new q(e.cream),Oe=new q(e.signalDeep),ke=new J(new Ei(7,34,1,28,1,!0).translate(0,-.5,0),sf({color:e.light,print:!0,vertex:`in vec3 position; in vec2 uv; uniform mat4 modelMatrix, viewMatrix, projectionMatrix; out float vY;
      void main(){ vY = -position.y; gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); }`,fragment:`precision highp float; ${Du} uniform vec3 uColor; uniform float uAmt, uPx; in float vY;
      layout(location = 0) out highp vec4 gColor; layout(location = 1) out highp vec4 gNormal;
      void main(){ float k = vY < 0.34 ? 1.0 : (vY < 0.68 ? 0.5 : 0.16); float d = halftone(gl_FragCoord.xy, 6.5 * uPx, 0.785, 0.26 * k * uAmt);
        gColor = vec4(uColor, d * step(0.01, uAmt)); gNormal = vec4(0.0); }`,uniforms:{uAmt:{value:0},uPx:Z.uPx}}));ke.frustumCulled=!1,Ce.add(ke);let Ae=o+10,R=c-10.5,je=R+24,Me=(124+Math.PI*12)/22,Ne=new si(up(10,5,Me*.92,1,1),Yf({base:`#1a201e`,brush:.1,spec:.7,rim:1,instanced:!0}),22);Ne.frustumCulled=!1,l.add(Ne);let z=Q(1,0,0),Pe=e=>{let t=(124+(e-Ae))/2,n=Ae+t;for(let e=0;e<22;e++){let r=(e+.5)*Me,i,a,o;if(r<t)i=Ae+r,a=R,o=0;else if(r<t+Math.PI*12){let e=(r-t)/12;i=n+Math.sin(e)*12,a=R+12-Math.cos(e)*12,o=-e}else i=n-(r-t-Math.PI*12),a=je,o=-Math.PI;oe.setFromAxisAngle(z,o),ae.compose(Q(C,a,i),oe,Q(1,1,1)),Ne.setMatrixAt(e,ae)}Ne.instanceMatrix.needsUpdate=!0},B={x:a+26,z:o-4};y.add(up(5,150,5,1.5),g,B.x,75,B.z),y.add(up(16,5,16,1.5),_,B.x,2.5,B.z),y.add(dp(6.6,4,20),h,B.x,152,B.z),y.add(dp(6.6,3,20),h,B.x,186,B.z);let Fe=(e,t)=>{let n=new J(dp(6,9,20),Yf({base:e,emissive:!0}));return n.position.set(B.x,t,B.z),l.add(n),n.material.uniforms.uGain},Ie=Fe(e.signal,158.5),Le=Fe(e.brassDark,168),Re=Fe(e.heatDeep,177.5);if(y.build(l),n){n.ao(x,S,a-i+40,s-o+40,8,.5),n.ao(ip.x,ip.z,ip.w+6,ip.d+6,6,.9),n.ao(-200,r.feedZ,200,46,5,.85);for(let e of[i,a])for(let t of[o,s])n.ao(e,t,32,32,5,.9);n.footprint(x,S,a-i+40,s-o+40,0),n.text(`U1`,i-30,o-6,10,{weight:`700`}),n.text(`組裝`,i+4,s+64,24,{weight:`700`,family:Qf,base:`alphabetic`}),n.text(`ASSEMBLY`,i+60,s+62,10.5,{weight:`700`,family:Zf,base:`alphabetic`,track:2}),n.text(`PICK + PLACE  ·  6 PARTS  ·  ONE OPERATOR`,i+60,s+70,4.6)}t.keep(i-8,s+34,i+230,s+116),t.sprinkle(x,S,a-i+70,s-o+70,26,6,18);let ze={x:-200,z:236,y:74},Be={...ze},Ve=.82,He=-1,Ue=0,We={...ze},Ge=-1,Ke=-1,qe=()=>{me.position.z=Be.z-22,_e.position.x=Be.x,Ce.position.y=Be.y,Pe(Be.z-22)},Je=e=>{de.forEach((t,n)=>{n===e?t.position.set(Be.x,Be.y-op/2-.4,Be.z):n<Ue?t.position.copy(pe(n)):t.position.copy(fe(n))})},Ye=e=>{for(let e=0;e<6;e++)ie.setColorAt(e,e<Ue?se:L);ie.setColorAt(6,Ge>=0?se:He>=0?Math.floor(e*4)%2?ce:L:ce),ie.instanceColor.needsUpdate=!0};qe(),Je(-1);let V={group:l,chips:de,wake:1,onComplete:null,start(e){Ue>=6||(He=e-Ue*Ve,We={...Be})},stop(){Ue<6&&(He=-1,We={...Be})},reset(){Ue=0,Ge=-1,He=-1,ne.material.uniforms.uDraw.value=0,Je(-1)},get done(){return Ue},update(e,t,n){let i=tp(e),a=-1;if(ne.material.uniforms.uStep.value=i,He>=0&&Ue<6){let t=Math.max(0,i-He),o=Math.min(5,Math.floor(t/Ve)),s=(t-o*Ve)/Ve,c=w[o],l=r.feedZ,[u,d]=A(o),f=o===0?We:(()=>{let[e,t]=A(o-1);return{x:e,z:t,y:74}})();if(s<.26){let e=$f(s/.26);Be.x=f.x+(c-f.x)*e,Be.z=f.z+(l-f.z)*e,Be.y=74+(f.y-74)*(1-e)}else if(s<.44)Be.x=c,Be.z=l,Be.y=74-59.6*Math.sin(Math.PI*ep(s,.26,.44));else if(s<.74){let e=$f(ep(s,.44,.74));Be.x=c+(u-c)*e,Be.z=l+(d-l)*e,Be.y=74}else Be.x=u,Be.z=d,Be.y=74-58.6*Math.sin(Math.PI*Math.min(1,ep(s,.74,.96)));let p=s>=.35,m=s>=.85;p&&Ke!==o&&(Ke=o,n?.play(`tick`,{gain:.6})),p&&!m&&(a=o);let h=m?o+1:o;h>Ue&&(Ue=h,n?.play(`seat`,{gain:.55}),V.flashAt=e),Ue>=6&&(He=-1,Ge=e,We={...Be},V.onComplete?.(e))}else if(!(V.wake<.5)){if(Ue>=6){let t=i-Ge,n=$f(ep(t,0,.5)),r=Math.floor(Math.max(0,t-.6)/.7)%6,a=Math.max(0,t-.6)%.7/.7,[o,s]=A((r+5)%6),[c,l]=A(r),u=$f(ep(a,0,.45)),d=t<.6?o:o+(c-o)*u,f=t<.6?s:s+(l-s)*u;Be.x=We.x+(d-We.x)*n,Be.z=We.z+(f-We.z)*n,Be.y=We.y+(52-We.y)*n,t>.6&&a>.55&&a<.7&&(V.flashAt=e),ne.material.uniforms.uDraw.value=$f(ep(t,0,.7))*1.001}else He<0&&Ue===0&&(Be.x=ze.x+Math.sin(i*.9)*46,Be.z=r.feedZ+6+Math.sin(i*.5)*8,Be.y=64+Math.abs(Math.sin(i*1.8))*10,Math.floor(i*12)%17==0&&(V.flashAt=e))}Je(a),Ye(i);let o=V.wake;Te.uniforms.uGain.value=(a>=0?1.1:.4)*o,ye.uniforms.uGain.value=(V.flashAt!=null&&e-V.flashAt<.12?1:.16)*o,xe.uniforms.uGain.value=(He>=0?Math.floor(i*6)%2?.9:.3:.45)*o,ne.material.uniforms.uAmt.value=.25+.75*o,F.forEach(([e,t],n)=>{ne.material.uniforms.uBus.value[n]=+(Math.max(e,t)<Ue)}),Te.uniforms.uBase.value.copy(a>=0?De:Oe),ke.scale.y=Math.max(1,Be.y-sp),ke.material.uniforms.uAmt.value=o*(He>=0||a>=0?1:.5),re.uniforms.uGain.value=.3+.7*o;let s=Ge>=0&&e-Ge<1.4?Math.floor(i*6)%2:1;Le.value=.12,Ie.value=(He>=0||Ue>=6?.6*s+.04:.1)*o,Re.value=.12,qe()}};return V}var mp={cx:0,cz:0,size:1300,source:[-360,-420]};function hp(e=1024){let t=e,n=Math.round(e*(Kd.h/Kd.w)),r=t/Kd.w,i=document.createElement(`canvas`);i.width=t,i.height=n;let a=i.getContext(`2d`);a.fillStyle=`#000`,a.fillRect(0,0,t,n);let o=mp.size/104,s=e=>e.split(`M`).filter(e=>e.trim()).map(e=>e.replace(/Z/g,``).trim().split(/\s*L\s*/).map(e=>e.split(`,`).map(Number))),l=e=>{a.beginPath(),e.forEach(([e,t],n)=>{let i=(mp.cx+(e-60)*o+Kd.w/2)*r,s=(mp.cz+(t-60)*o+Kd.h/2)*r;n?a.lineTo(i,s):a.moveTo(i,s)}),a.closePath()};a.globalCompositeOperation=`lighter`;for(let[e,t]of[[Bd,150],[zd,255]])for(let n of s(e))l(n),a.fillStyle=`rgb(${t},0,0)`,a.fill();a.lineJoin=`miter`;for(let e of[Bd,zd])for(let t of s(e))l(t),a.strokeStyle=`rgb(0,255,0)`,a.lineWidth=3.2,a.stroke();let u=new bi(i);return u.colorSpace=``,u.flipY=!1,u.anisotropy=4,u.minFilter=c,u.generateMipmaps=!0,u}var gp=`http://www.w3.org/2000/svg`;function _p({parts:e}){let t=document.documentElement;t.dataset.card=`pcb`;let n=[...document.querySelectorAll(`.stop .card`)];n.forEach((e,t)=>{let n=document.createElementNS(gp,`svg`);n.setAttribute(`class`,`card__silk`),n.setAttribute(`aria-hidden`,`true`),n.innerHTML=`<defs><pattern id="hatch${t}" width="4.5" height="4.5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><circle class="silk__hatchline" cx="2.25" cy="2.25" r="0.85"/></pattern><pattern id="fing${t}" width="12" height="10" patternUnits="userSpaceOnUse"><rect class="silk__finger" width="8" height="10"/></pattern></defs><path class="silk__shadow"/><path class="silk__mask"/><path class="silk__hatch" fill="url(#hatch${t})"/><path class="silk__ink"/><path class="silk__edge"/><path class="silk__line"/><rect class="silk__fingers" fill="url(#fing${t})" height="10"/><circle class="silk__fid"/><circle class="silk__fid"/>`,e.prepend(n)});let r=e=>{let t=e.querySelector(`.card__silk`),n=e.offsetWidth,r=e.offsetHeight;if(!n||!r)return;let i=n-4,a=r-4;t.setAttribute(`viewBox`,`0 0 ${n} ${r}`),t.setAttribute(`width`,n),t.setAttribute(`height`,r);let o=(e,t,n=0)=>`M${n+e},${n+e} H${n+i-e-t} L${n+i-e},${n+e+t} V${n+a-e} H${n+e+t} L${n+e},${n+a-e-t} Z`;t.querySelector(`.silk__shadow`).setAttribute(`d`,o(0,16,4)),t.querySelector(`.silk__mask`).setAttribute(`d`,o(0,16)),t.querySelector(`.silk__hatch`).setAttribute(`d`,o(0,16));let s=t.querySelector(`.silk__fingers`);s.setAttribute(`x`,30),s.setAttribute(`y`,a-12),s.setAttribute(`width`,Math.max(0,i-60)),t.querySelector(`.silk__ink`).setAttribute(`d`,o(1,16)),t.querySelector(`.silk__edge`).setAttribute(`d`,o(4,15)),t.querySelector(`.silk__line`).setAttribute(`d`,o(9,12));let[c,l]=t.querySelectorAll(`.silk__fid`);c.setAttribute(`cx`,i-24),c.setAttribute(`cy`,24),l.setAttribute(`cx`,24),l.setAttribute(`cy`,a-24),c.setAttribute(`r`,4),l.setAttribute(`r`,4)},i=new ResizeObserver(e=>e.forEach(e=>r(e.target)));n.forEach(e=>{i.observe(e),r(e)});let a=document.createElementNS(gp,`svg`);a.setAttribute(`class`,`lead`),a.setAttribute(`aria-hidden`,`true`),a.innerHTML=`<path class="lead__trace" pathLength="100"/><path class="lead__packet" pathLength="100"/><rect class="lead__pad" width="8" height="8"/><circle class="lead__hole" r="7"/><circle class="lead__via" r="7"/>`,document.body.appendChild(a);let o=a.querySelector(`.lead__trace`),s=a.querySelector(`.lead__packet`),c=a.querySelector(`.lead__via`),l=a.querySelector(`.lead__hole`),u=a.querySelector(`.lead__pad`),d=-1,f=(e,t,n,r,i)=>{if(i===`h`&&Math.abs(n-e)<60||i===`v`&&Math.abs(r-t)<60)return`M${e},${t} L${n},${r}`;if(i===`v`){let i=Math.sign(r-t)||1,a=18*i,o=n-e,s=Math.abs(r-t-a),c=Math.min(Math.abs(o),s);return`M${e},${t} V${t+a} l${Math.sign(o)*c},${i*c} L${n},${r}`}let a=Math.sign(n-e)||1,o=22*a,s=r-t,c=Math.abs(n-e-o),l=Math.min(Math.abs(s),c);return`M${e},${t} H${e+o} l${a*l},${Math.sign(s)*l} L${n},${r}`},p=e=>a.classList.toggle(`is-hidden`,e);return{update(t){let r=t.rig.index,i=n[r],m=e(r);if(t.rig.flying||t.director.intro||!m||!i){d!==-1&&(a.classList.remove(`is-on`),d=-1);return}if(!i.closest(`.stop`).classList.contains(`is-current`)||innerHeight>innerWidth*1.05){p(!0);return}let h=i.getBoundingClientRect(),g={left:h.left,top:h.top,right:h.right-4,bottom:h.bottom-4},_=e=>!e.behind&&e.x>-40&&e.x<innerWidth+40&&e.y>-40&&e.y<innerHeight+40&&(e.x>g.right+12||e.x<g.left-12||e.y<g.top-12||e.y>g.bottom+12),v=e=>Math.max(e.x-g.right,g.left-e.x,g.top-e.y,e.y-g.bottom),y=null,b=null;for(let e of Array.isArray(m)?m:[m]){let n=t.toScreen(e.clone());if(_(n)&&(b||=n,v(n)>=60)){y=n;break}}if(y||=b,!y){p(!0);return}let x,S,C;if(y.x>g.right+12)S=g.right,C=Math.min(g.bottom-34,Math.max(g.top+34,y.y)),x=f(S,C,y.x,y.y,`h`);else if(y.x<g.left-12)S=g.left,C=Math.min(g.bottom-34,Math.max(g.top+34,y.y)),x=f(S,C,y.x,y.y,`h`);else if(y.y<g.top-12)S=Math.min(g.right-34,Math.max(g.left+34,y.x)),C=g.top,x=f(S,C,y.x,y.y,`v`);else if(y.y>g.bottom+12)S=Math.min(g.right-34,Math.max(g.left+34,y.x)),C=g.bottom,x=f(S,C,y.x,y.y,`v`);else{p(!0);return}p(!1),o.setAttribute(`d`,x),s.setAttribute(`d`,x),u.setAttribute(`x`,(S-4).toFixed(1)),u.setAttribute(`y`,(C-4).toFixed(1));for(let e of[c,l])e.setAttribute(`cx`,y.x.toFixed(1)),e.setAttribute(`cy`,y.y.toFixed(1));d!==r&&(a.classList.remove(`is-on`),a.getBoundingClientRect(),a.classList.add(`is-on`),d=r)}}}var vp={verdigris:{label:`Verdigris and brass`,css:(e=>e)({bg:`#061212`,text:`#ece6d4`,neon:`#52e3b2`,neonRest:`#3fa585`,muted:`rgba(236,230,212,.74)`,line:`#6e5a33`,panel:`rgba(8,29,29,.9)`,gold:`#d7ae60`,mask:`#0d2a28`,mask2:`#113432`,silk:`#ece6d4`,signal:`#52e3b2`,heat:`#ff5a36`,alarm:`#f04a24`,ink:`#020807`,paper:`#efe9d9`,steel:`#8fa19b`,brass:`#c29e58`,rule:`#3a4644`,head:`#d9d3c2`}),gl:{ink:`#040b0b`,ink2:`#060f0f`,glint:`#e4dcc4`,gradeHigh:`#fff6e6`,gradeShadow:`#030e0e`,paperFlash:`#ece6d4`,cream:`#ece6d4`,shade:`#050d0d`,rim:`#c39a55`,uplight:`#164443`,mask:`#0c2220`,mask2:`#0f2826`,sheen:`#183b39`,silk:`#4a4942`,pad:`#8a6a3a`,trace:`#143735`,signal:`#52e3b2`,signalDeep:`#1e8f6c`,hot:`#d6fff0`,markBack:`#ece6d4`,laser:`#f0462a`,heat:`#ff5a36`,heatHot:`#ffb27a`,heatDeep:`#a83a22`,amber:`#a37b3e`,blue:`#52e3b2`,work:`#e0a650`,light:`#f1d9a6`,ic:`#222c2b`,can:`#2b3736`,can2:`#273332`,canTop:`#404947`,pin:`#727977`,mlcc:`#5e4a2c`,res:`#1b201f`,choke:`#333f3d`,steel:`#55625f`,nickel:`#75807d`,copperPipe:`#5e4827`,finWarm:`#2a3836`,anod:`#192322`,anod2:`#242e2d`,substrate:`#122826`,fin:`#3b4a47`,fanFrame:`#1a2524`,blade:`#24302f`,sink:`#45524f`,sinkDark:`#232f2e`,connector:`#1b2423`,slot:`#202a29`,latch:`#4d5856`,dimm:`#2a3534`,dimmPcb:`#153230`,heroPcb:`#17544a`,dimmTop:`#3d4846`,bezel:`#0b100f`,hbm:`#333f3d`,shield:`#4d5856`,shieldDark:`#303b3a`,ioSteel:`#45524f`,ioShield:`#2d4240`,goldPart:`#9a7640`,audioCap:`#6a502e`,audioCapTop:`#9a7640`,ledOff:`#14201f`,outside:`#ffe0ad`,dust:`#8a8579`,sleeve:`#141c1b`,brass:`#a37b3e`,brassDark:`#6a502e`,brassLight:`#d7ae60`,fog:`#1a3238`,fogHorizon:`#24404a`,zenith:`#040b0b`,skyHorizon:`#16303a`,skyGlow:`#24393f`,skyStreak:`#0e201f`,streak:`#7d8786`,lamp:`#22464e`,cityWall:`#0c1c1c`,cityWallLit:`#142b2a`,cityRoof:`#0c1b1a`,winA:`#6a5030`,winB:`#7e6038`,winC:`#9a7442`}}},yp={uWinA:{value:new q(`#ffcf86`)},uWinB:{value:new q(`#7fe3ff`)},uWinC:{value:new q(`#ff4f86`)},uWall:{value:new q(`#1c1a2c`)},uWallLit:{value:new q(`#3a3654`)},uRoof:{value:new q(`#25223a`)},uLit:{value:.32},uCell:{value:new W(2.6,3.4)},uWinBloom:{value:1}},bp=`
in vec3 position; in vec3 normal; in mat4 instanceMatrix;
#ifdef USE_INSTANCE_COLOR
in vec3 instanceColor; out vec3 vIColor;
#endif
uniform mat4 modelMatrix, viewMatrix, projectionMatrix;
out vec3 vLocal; out vec3 vLN; out vec3 vN; out vec3 vViewPos; flat out float vInst; out vec3 vScale;
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
}`,xp=`
precision highp float;
${Eu}
${Du}
uniform vec3 uKeyDir, uShadeTint, uDotInk, uRimCol;
uniform vec3 uWinA, uWinB, uWinC, uWall, uWallLit, uRoof;
uniform float uLit, uStep, uPx, uWinBloom; uniform vec2 uCell;
in vec3 vLocal; in vec3 vLN; in vec3 vN; in vec3 vViewPos; flat in float vInst; in vec3 vScale;
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
    if (win * lit * (1.0 - far) > 0.5 && uWinBloom > 0.5) id = 250.0 + mod(vInst, 5.0);
    // vertical sign strips on some towers
    float sign = step(0.9, seed) * step(abs(u - (seed - 0.9) * 40.0 + 2.0), 0.9) * step(v, vScale.y * 0.8) * step(vScale.y * 0.35, v);
    if (sign > 0.5) { col = mix(uWinC, uWinB, step(0.95, seed)); id = 253.0; }
  }
  // rim from the city glow below
  float fr = pow(1.0 - max(dot(N, V), 0.0), 3.0);
  col = mix(col, uRimCol, smoothstep(0.55, 0.7, fr) * 0.35 * step(abs(vLN.y), 0.5));
  gColor = vec4(col, 1.0);
  gNormal = vec4(N * 0.5 + 0.5, id / 255.0);
}`;function Sp({instanceColor:e=!1}={}){return new co({glslVersion:Ve,vertexShader:bp,fragmentShader:xp,uniforms:{...yp,uKeyDir:Z.uKeyDir,uShadeTint:Z.uShadeTint,uDotInk:Z.uDotInk,uRimCol:Z.uRimCol,uStep:Z.uStep,uPx:Z.uPx},defines:e?{USE_INSTANCE_COLOR:``}:{}})}function Cp(){let e=new wi(1,1,1);return e.translate(0,.5,0),e}function wp({count:e=600,rMin:t=40,rMax:n=400,hMin:r=10,hMax:i=90,wMin:a=6,wMax:o=18,y:s=0,seed:c=1,avoid:l=[],palette:u=[`#1c1a2c`]}={}){let d=c>>>0||1,f=()=>(d=d*1664525+1013904223>>>0)/4294967296,p=new si(Cp(),Sp({instanceColor:!0}),e),m=new K,h=new Et,g=new G,_=new G,v=new q,y=0,b=0;for(;y<e&&b++<e*20;){let e=f()*Math.PI*2,c=Math.sqrt(t*t+f()*(n*n-t*t)),d=Math.cos(e)*c,b=Math.sin(e)*c;if(l.some(([e,t,n])=>(d-e)**2+(b-t)**2<n*n))continue;let x=f()**2.2,S=r+(i-r)*x*(.6+.8*(1-c/n)),C=a+(o-a)*f();g.set(d,s,b),h.setFromAxisAngle(new G(0,1,0),Math.round(f()*4)*(Math.PI/2)+(f()<.2?f()*.5:0)),_.set(C,S,C*(.7+f()*.6)),m.compose(g,h,_),p.setMatrixAt(y,m),p.setColorAt(y,v.set(u[Math.floor(f()*u.length)])),y++}return p.count=y,p.instanceMatrix.needsUpdate=!0,p.instanceColor&&(p.instanceColor.needsUpdate=!0),p.frustumCulled=!1,p}var Tp=e=>Zu({brushScale:.07,dotCell:4.5,...e}),Ep=`"Zen Kaku Gothic New", "Hiragino Sans", sans-serif`,Dp=`"Chakra Petch", "Arial Narrow", sans-serif`,Op=[[`電源`,`POWER`],[`冷卻`,`COOLING`],[`記憶體`,`MEMORY`],[`神經網絡`,`NEURAL`],[`接口`,`I/O`],[`自研`,`BUILT SOLO`]];function kp(e,{phone:t=!1}={}){let n=new wn,r=new J(new Ti(9e3,64).rotateX(-Math.PI/2),Tp({base:e.cityRoof,brush:.05,spec:0,rim:0,dot:.2,id:0}));r.position.y=-60,r.renderOrder=-20,n.add(r),yp.uWinA.value.set(e.winA),yp.uWinB.value.set(e.winB),yp.uWinC.value.set(e.winC),yp.uWall.value.set(e.cityWall),yp.uWallLit.value.set(e.cityWallLit),yp.uRoof.value.set(e.cityRoof),yp.uLit.value=.19,yp.uCell.value.set(26,34),yp.uWinBloom.value=0;let i=wp({count:t?80:140,rMin:1700,rMax:4200,hMin:240,hMax:1500,wMin:120,wMax:380,seed:21,palette:[e.cityWall,`#0e1d19`,`#0a1714`,`#12221e`]}),a=new K,o=new G,s=new Et,c=new G,l=[];for(let e=0;e<i.count;e++){i.getMatrixAt(e,a),a.decompose(o,s,c);let t=Math.hypot(o.x,o.z),n=Math.max(0,-o.z/t);c.y=Math.min(c.y*(.6+.7*n*n),120+t*(.13+.07*n)),a.compose(o,s,c),i.setMatrixAt(e,a),l.push({p:o.clone(),s:c.clone(),q:s.clone()})}i.instanceMatrix.needsUpdate=!0,n.add(i);let u=l.map((e,t)=>{let n=Math.hypot(e.p.x,e.p.z);return{...e,i:t,d:n,score:n*(1.6-Math.max(0,-e.p.z/n))}}).filter(e=>e.s.y>300).sort((e,t)=>e.score-t.score),d=[],f=[];for(let r of u){if(f.length>=(t?4:Op.length))break;let i=Math.atan2(r.p.z,r.p.x);if(d.some(e=>Math.abs((e-i+Math.PI*3)%(Math.PI*2)-Math.PI)<.22))continue;d.push(i);let[a,o]=Op[f.length],s=Math.min(r.s.y*.5,420),c=s*.22,l=Tp({base:`#ffffff`,map:af(128,Math.round(128*s/c),(t,n,r)=>Ap(t,n,r,a,o,e.dust,e)),mapAmt:1,emissive:!0,bloom:!1,gain:.75}),u=new J(new qa(c,s),l),p=Q(-r.p.x,0,-r.p.z).normalize(),m=Math.max(r.s.x,r.s.z)*.5+6;u.position.copy(r.p).addScaledVector(p,m),u.position.y=r.s.y*(.38+.3*(f.length*37%10)/10)+s*.2,u.lookAt(0,u.position.y,0),n.add(u),f.push({mat:l})}return{group:n,update:()=>{},floor:r,blocks:i,signs:f}}function Ap(e,t,n,r,i,a,o){e.fillStyle=`#05100d`,e.fillRect(0,0,t,n),e.strokeStyle=a,e.lineWidth=t*.05,e.strokeRect(t*.06,t*.06,t*.88,n-t*.12),e.fillStyle=a,e.textAlign=`center`,e.textBaseline=`middle`;let s=[...r],c=Math.min(t*.7,n*.66/s.length);e.font=`700 ${c*.92}px ${Ep}`,s.forEach((n,r)=>e.fillText(n,t/2,t*.2+c*(r+.55))),e.save(),e.translate(t/2,t*.2+c*s.length+(n-t*.3-c*s.length)/2),e.rotate(Math.PI/2),e.font=`700 ${t*.3}px ${Dp}`,e.fillText(i,0,0),e.restore()}var jp=(e,t,n)=>new G(e,t,n),Mp=class{constructor(e=.5,t=0){this.rt=new qt(1,1,{type:l,minFilter:o,magFilter:o,depthBuffer:!0}),this.cam=new Ro,this.scale=e,this.plane=new Ar,this.clip=new Gt,this.q=new Gt,this.texMat=new K,this.n=jp(0,1,0),this.o=jp(0,t,0),this.clipY=t+.8,this.rot=new K,this.cp=jp(0,0,0),this.la=jp(0,0,0),this.tg=jp(0,0,0)}setSize(e,t){this.rt.setSize(Math.max(1,Math.round(e*this.scale)),Math.max(1,Math.round(t*this.scale)))}render(e,t,n,r,i){let{n:a,o,cp:s,la:c,tg:l}=this,u=this.cam;s.setFromMatrixPosition(n.matrixWorld);let d=o.clone().sub(s);if(d.dot(a)>0)return!1;d.reflect(a).negate().add(o),this.rot.extractRotation(n.matrixWorld),c.set(0,0,-1).applyMatrix4(this.rot).add(s),l.copy(o).sub(c).reflect(a).negate().add(o),u.position.copy(d),u.up.set(0,1,0).applyMatrix4(this.rot).reflect(a),u.lookAt(l),u.far=n.far,u.near=n.near,u.updateMatrixWorld(),u.projectionMatrix.copy(n.projectionMatrix),this.texMat.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),this.texMat.multiply(u.projectionMatrix).multiply(u.matrixWorldInverse),this.plane.setFromNormalAndCoplanarPoint(a,jp(0,this.clipY,0)).applyMatrix4(u.matrixWorldInverse);let f=this.clip.set(this.plane.normal.x,this.plane.normal.y,this.plane.normal.z,this.plane.constant),p=u.projectionMatrix.elements,m=this.q;return m.x=(Math.sign(f.x)+p[8])/p[0],m.y=(Math.sign(f.y)+p[9])/p[5],m.z=-1,m.w=(1+p[10])/p[14],f.multiplyScalar(2/f.dot(m)),p[2]=f.x,p[6]=f.y,p[10]=f.z+1,p[14]=f.w,r.forEach(e=>{e.visible=!1}),e.setRenderTarget(this.rt),e.setClearColor(i,1),e.clear(!0,!0,!0),e.render(t,u),r.forEach(e=>{e.visible=!0}),e.setRenderTarget(null),!0}},Np=[`Power on`,`The core`,`Neural core`,`Enclave`,`Memory`,`I/O`],Pp=[``,`Systems`,`AI`,`Security`,`Projects`,`Contact`],Fp=132,Ip=.25,Lp=.18,Rp=[`PWR`,`U1`,`U7`,`U9`,`J4`,`J1`],zp=Tt.lerp,Bp=Tt.clamp,Vp=e=>e<.5?4*e*e*e:1-(-2*e+2)**3/2,Hp=(e,t,n)=>{let r=Bp((n-e)/(t-e),0,1);return r*r*(3-2*r)},Up=Math.min(innerWidth,innerHeight)<600,Wp=innerHeight>innerWidth*1.05,Gp=(e,t)=>Wp&&t?t:e,Kp=[0,1,2,3,4,5].map(e=>[-80+e*32,-6]),qp=`M${Kp.map(([e,t])=>`${e},${t}`).join(` L`)} L88,-6 L94,0 L94,4 L88,10 L-88,10 L-94,4 L-94,0 L-88,-6 L-80,-6`;document.getElementById(`app`).innerHTML=Dd({places:Np,mark:Vd(`logo`,`var(--text)`,`var(--neonRest)`),route:{viewBox:`-100 -22 200 44`,path:qp,nodes:Kp},deco:Object.fromEntries([`top`,`systems`,`ai`,`security`,`work`,`contact`].map((e,t)=>[e,`<span class="card__ref" aria-hidden="true">${Rp[t]}</span>`]))});{let e=document.querySelector(`.route__map`),t=`http://www.w3.org/2000/svg`,n=document.createElementNS(t,`g`);n.setAttribute(`class`,`route__board`);let r=document.createElementNS(t,`rect`);[[`x`,-99],[`y`,-21],[`width`,198],[`height`,42]].forEach(([e,t])=>r.setAttribute(e,t)),n.appendChild(r),Kp.forEach(([e],r)=>{let i=document.createElementNS(t,`text`);i.setAttribute(`x`,e),i.setAttribute(`y`,20),i.textContent=`0${r+1}`,n.appendChild(i)}),e.insertBefore(n,e.firstChild);let i=document.createElement(`p`);i.className=`route__label`,i.setAttribute(`aria-hidden`,`true`),document.querySelector(`.route`).appendChild(i),document.querySelectorAll(`.stop .card`).forEach((e,t)=>e.insertAdjacentHTML(`afterbegin`,`<span class="card__count" aria-hidden="true">0${t+1}/06</span>`))}var Jp=(e,t)=>{let n=document.querySelector(`.route__label`);n&&(n.innerHTML=`<b>${t===5&&e===0?`↺ `:``}0${e+1}/06</b>${Np[e]}${Pp[e]?`<span> · ${Pp[e]}</span>`:``}`)};Jp(0);var Yp=[`#top`,`#systems`,`#systems`,`#systems`,`#work`,`#contact`];{let e=document.querySelector(`.bar__nav`),t=t=>e?.querySelector(`a[href="${t}"]`),n=e?.querySelector(`a:not([href^="#"])`);[t(`#systems`),t(`#work`),t(`#contact`),n].forEach(t=>t&&e.appendChild(t))}var Xp=e=>document.querySelectorAll(`.bar__nav a`).forEach(t=>{t.getAttribute(`href`)===Yp[e]?t.setAttribute(`aria-current`,`location`):t.removeAttribute(`aria-current`)});Xp(0);{let e=document.querySelector(`.pager__dots`);e&&(e.outerHTML=`<span class="pager__count" aria-live="polite"><b>01</b> / ${String(gd.length).padStart(2,`0`)}</span>`),document.querySelector(`.contact__links`)?.insertAdjacentHTML(`beforeend`,`<li><a class="contact__restart" href="#top"><span aria-hidden="true">↺</span> Back to start</a></li>`);let t=document.querySelector(`.work__all`),n=t?.querySelector(`.work__allcount`)?.textContent;t&&n&&(t.innerHTML=`All ${n} projects`),document.querySelectorAll(`.route__list a span`).forEach((e,t)=>{e.textContent=`0${t+1} · ${Np[t]}${Pp[t]?` · ${Pp[t]}`:``}`}),document.body.insertAdjacentHTML(`beforeend`,`<p class="cue" aria-hidden="true">Scroll<i></i></p>`),document.querySelector(`.stop--top .card`)?.insertAdjacentHTML(`beforeend`,`<p class="card__cue" aria-hidden="true">Scroll<i></i></p>`)}var Zp=e=>{let t=document.querySelector(`.pager__count b`);t&&(t.textContent=String(e+1).padStart(2,`0`))},Qp=(()=>{let e=document.querySelector(`.route__done`),t=document.querySelector(`.route__path`);if(!e||!t)return null;let n=e.getTotalLength();return{done:e,total:n,fr:Kp.map(([e,r])=>{let i=0,a=1/0;for(let o=0;o<=400;o++){let s=t.getPointAtLength(o/400*n),c=(s.x-e)**2+(s.y-r)**2;c<a&&(a=c,i=o/400)}return i}),links:[...document.querySelectorAll(`.route__list a`)]}})(),$p=(e,t)=>{if(!Qp)return;let{done:n,total:r,links:i}=Qp;n.style.strokeDasharray=`${r}`,n.style.strokeDashoffset=`${r*(1-e)}`,i.forEach((e,n)=>n===t?e.setAttribute(`aria-current`,`true`):e.removeAttribute(`aria-current`))},em=new class{constructor(){this.parallax=5,this.imgs=[],this.flash=0,this.spin=0,this.pingN=0}palette(e,t){if(this.built){let e=new URL(location.href);e.searchParams.set(`palette`,t),location.replace(e);return}let n=this.pal=e.gl;Ld.uZenith.value.set(n.zenith),Ld.uHorizon.value.set(n.skyHorizon),Ld.uGlow.value.set(n.skyGlow),Ld.uStreak.value.set(n.skyStreak),Ld.uMoon.value.set(n.skyHorizon),Ld.uMoonSize.value=1e-4,Ld.uStars.value=0,Ld.uDot.value.set(n.ink),Ld.uBand.value=.11,Ld.uLampDir.value.set(.26,.56,-.79).normalize(),Ld.uLampCol.value.set(n.lamp??n.skyGlow),Ld.uLampAmt.value=0,Ld.uLampPow.value=120,Ld.uLampPrint.value=1,Ld.uLampCell.value=6.5,Ld.uStreakAmt.value=0,Z.uShadeTint.value.set(n.shade),Z.uDotInk.value.set(n.ink),Z.uRimCol.value.set(n.rim),Z.uGlint.value.set(n.glint),Z.uFillCol.value.set(n.uplight),Z.uFillAmt.value=.2,X.uInk.value.set(n.ink),X.uGradeShadow.value.set(n.gradeShadow),X.uGradeHigh.value.set(n.gradeHigh),X.uImpInk.value.set(n.ink),X.uImpPaper.value.set(n.paperFlash),X.uImpAccent.value.set(n.signal),X.uFogCol.value.set(n.fog),X.uFogHorizon.value.set(n.fogHorizon??n.fog),X.uSpeedCol.value.set(n.streak),qd.uMask.value.set(n.mask),qd.uMask2.value.set(n.mask2),qd.uSilk.value.set(n.silk),qd.uPad.value.set(n.pad),qd.uSheen.value.set(n.sheen),qd.uSignal.value.set(n.signal),qd.uHot.value.set(n.hot)}async build(e){this.world=e;let{scene:t,camera:n}=e;n.near=1,n.far=7e3,await document.fonts.ready,await Promise.all([`700 40px "Chakra Petch"`,`600 40px "Chakra Petch"`,`700 40px "Zen Kaku Gothic New"`,`600 20px "JetBrains Mono Variable"`,`700 20px "JetBrains Mono Variable"`].map(e=>document.fonts.load(e,`電源冷卻記憶體神經網絡接口自研組裝加密認證注意高溫 AZ09`).catch(()=>{})));let r=this.pal,i=performance.now(),a=e=>{Ad.has(`debug`)&&console.warn(e,Math.round(performance.now()-i))};Gd(7);let o=this.silk=new Xd(Up?2048:4096),s=new nf(r,o);s.keep(...np.keep),s.keep(xf.enclave.x-190,xf.enclave.z-170,xf.enclave.x+190,xf.enclave.z+170),qd.uSilkTex.value=o.tex,qd.uLitC.value.set(lf.cx,lf.cz),this.board=Yd(),t.add(this.board),this.tower=gf(r,o),t.add(this.tower.group),a(`tower`);let c=wf(r,s,o);c.name=`vrm`,t.add(c),this.vrmSeam=c.userData.seam,this.mem=Ef(r,s,o,gd,this),t.add(this.mem.group),this.npu=Af(r,s,o),t.add(this.npu.group),this.enc=Jf(r,s,o,{face:Q(490,0,640)}),t.add(this.enc.group),this.gantry=pp(r,s,o),t.add(this.gantry.group),this.gantry.onComplete=()=>{let e=this.world,t=e.toScreen(Q(-200,10,262));e.impact.hit({seq:`accent`,center:[t.x/e.view.w,1-t.y/e.view.h],shake:.25}),e.api().sfx.play(`snap`,{gain:.7})},this.io=Nf(r,s,o),t.add(this.io.group),this.rest=Pf(r,s,o),t.add(this.rest.group),a(`districts`);let l=new tf;Ff(l),this.traces=l.mesh(r),t.add(this.traces);let u=s.build();if(u.name=`parts`,t.add(u),a(`parts`),o.finish(),a(`silk`),e.backdrop.visible=!1,this.sky=Rd({radius:5200,px:Z.uPx}),t.add(this.sky),this.dust=If(r,Up?400:700),t.add(this.dust),this.city=kp(r,{phone:Up}),t.add(this.city.group),a(`city`),this.mirror=new Mp(Up?.35:.5),qd.uRefl.value=this.mirror.rt.texture,qd.uReflAmt.value=Ad.has(`norefl`)?0:Ad.has(`refl`)?+Ad.get(`refl`):.45,qd.uReflDebug.value=Ad.has(`refldebug`)?+(Ad.get(`refldebug`)||1):0,this.mirrorHide=[this.board,this.sky,this.dust,this.traces,this.io.shafts,this.enc.variants.cipher?.stickers].filter(Boolean),this.fogCol=new q(this.pal.fog),X.tPlane.value=hp(),X.uPlaneC.value.set(...mp.source),X.uPlaneCol.value.set(this.pal.signal),X.uPlaneHot.value.set(this.pal.hot),gd.forEach((e,t)=>{let n=new Image;n.onload=()=>{this.imgs[t]=n,this.mem.screens[t].userData.redraw()},n.src=e.image}),Object.entries({gantry:this.gantry.group,tower:this.tower.group,memory:this.mem.group,neural:this.npu.group,enclave:this.enc.group,io:this.io.group,rest:this.rest.group,traces:this.traces,city:this.city.group,sky:this.sky,dust:this.dust,board:this.board}).forEach(([e,t])=>{t&&(t.name=e)}),!Ad.has(`nobatch`)){let e=Fd(t,{keep:[this.board,this.sky,this.dust,this.traces,this.io.shafts,this.city.floor].filter(Boolean)});a(`batch ${e.before} -> ${e.after}`)}this.built=!0,a(`built`);let{cx:d,cz:f}=lf,p=(e,t,n,r=220)=>{let i=new Ro(e.fov,1.6,1,10);return i.position.copy(e.p),i.lookAt(e.t),i.updateMatrixWorld(),new G(t,n,.5).unproject(i).sub(e.p).normalize().multiplyScalar(r).add(e.p).toArray()},m=[{id:`top`,p:Gp(Q(-320,230,820),Q(-160,300,900)),t:Gp(Q(-300,610,-120),Q(-85,600,108)),fov:Gp(42,31)},{id:`systems`,p:Gp(Q(-150,380,620),Q(-150,445,680)),t:Gp(Q(-150,15,248),Q(-190,60,265)),fov:Gp(42,41)},{id:`ai`,p:Gp(Q(-450,85,650),Q(-480,112,610)),t:Gp(Q(-415,178,330),Q(-470,176,330)),fov:50},{id:`security`,p:Q(495,130,640),t:Gp(Q(615,130,98),Q(700,Fp,140)),fov:49},{id:`work`,...this.exhibitPose(1)},{id:`contact`,p:Q(-600,215,-410),t:Q(-1e3,228,-470),fov:54}],h=[[-.58,.36],[.56,.02],[.5,-.18],[-.52,.06],[-.62,.04],[.62,.06]];m.forEach((e,t)=>{e.anchor=p(e,...h[t])}),this.stops=m,this.focus=[{p:Q(lf.cx,610,0),r0:300,r1:820},{p:Q(-195,40,250),r0:170,r1:520},{p:this.npu.center.clone(),r0:160,r1:500},{p:Q(xf.enclave.x,110,xf.enclave.z),r0:190,r1:560},{p:Q(244,100,Sf[1]),r0:150,r1:440},{p:Q(-1e3,240,-435),r0:90,r1:300}],this.focusNow={p:this.focus[0].p.clone(),r0:this.focus[0].r0,r1:this.focus[0].r1,amt:0};let g=(e,t)=>[new q(e),new q(t)],_=g(r.fog,r.fogHorizon);this.fogs=[_,_,_,g(`#1a2f3c`,`#233c4c`),_,g(`#242b29`,`#323530`)];let v=(e,t,n)=>Q(e,t,n);return{stops:m,legs:[{look:.1,dur:2.4,pts:[{p:v(-270,320,850),t:v(-160,300,-40),fov:44},{p:v(-200,450,760),t:v(-125,80,190),fov:42}]},{look:.15,dur:2.3,pts:[{p:v(-290,190,560),t:v(-420,140,330),fov:48},{p:v(-400,105,655),t:v(-445,168,330),fov:50}]},{look:.08,dur:3.4,pts:[{p:v(-430,52,712),t:v(-290,85,500),fov:54},{p:v(-250,30,724),t:v(260,85,480),fov:58},{p:v(100,32,724),t:v(470,100,400),fov:60},{p:v(340,64,704),t:v(620,160,300),fov:54}]},{look:.1,dur:3,pts:[{p:v(430,230,470),t:v(440,200,200),fov:50},{p:v(330,290,260),t:v(300,185,0),fov:52},{p:v(150,230,170),t:v(260,110,-100),fov:50}]},{look:.1,dur:3.6,warp:[[0,0],[.42,.38],[.62,.6],[1,1]],pts:[{p:v(80,110,-120),t:v(140,110,-400),fov:56},{p:v(115,125,-330),t:v(-100,145,-630),fov:60},{p:v(60,145,-470),t:v(-380,155,-660),fov:60},{p:v(-120,155,-560),t:v(-700,170,-560),fov:60},{p:v(-330,160,-575),t:v(-860,190,-540),fov:58},{p:v(-530,175,-460),t:v(-940,205,-500),fov:56}]},{look:0,dur:5.6,warp:[[0,0],[.38,.47],[.62,.53],[1,1]],pts:[{p:v(-520,420,-160),t:v(-600,120,-300),fov:56},{p:v(-300,1e3,60),t:v(-260,100,-180),fov:52},{p:v(0,1650,290),t:v(0,0,0),fov:50},{p:v(-285,470,980),t:v(-285,630,-110),fov:46}]}],closed:!0,cardGrid:!0,speed:420,minT:1.9,maxT:3.4,speedRef:320,arriveImpact:`hit`,phonePull:()=>zp(.32,.04,this.wake?.[4]??0)-.14*(this.wake?.[3]??0),phoneFov:12,phoneLift:.14,wrap:!0,rig:{profile:`minjerk`,lookAhead:.22,damp:9,settle:3,maxBank:.09}}}exhibitPose(e){let t=Sf[e];return Wp?{p:Q(50,150,t+250),t:Q(246,90,t+20),fov:58,roll:0}:{p:Q(38,128,t+102),t:Q(246,98,t-52),fov:56,roll:0}}depart(e,t,n){this.labelled=!1,this.lastFrom=e,document.documentElement.classList.add(`moved`),t===4&&(n.ui.setProject(1,1),Zp(1)),e===3&&this.enc.lock(),e===1&&this.gantry.stop()}arrive(e,t){this.labelled||(this.labelled=!0,Jp(e,this.lastFrom),Xp(e)),e===4&&this.focusExhibit(t.ui.project),e===3&&this.enc.unlock(t.time),e===1&&this.gantry.start(t.time)}project(e){Zp(e),this.focusExhibit(e)}focusExhibit(e){this.mem.seat(e,this.world.time);let t=this.stops[4],n=this.exhibitPose(e);this.world.rig.nudge(n.p.clone().sub(t.p),n.t.clone().sub(t.t))}arriveSeq(e,t){return e===0&&t===5?`sig`:null}impactCenter(e,t){let n=e===0?this.tower.crownPos:t.route.stops[e].t,r=t.toScreen(n.clone?n.clone():Q(...n));return[r.x/t.view.w,1-r.y/t.view.h]}partAt(e){switch(e){case 0:return[-74,-69,-62].map(e=>this.tower.crownPos.clone().add(Q(e,0,0)));case 1:return[Q(-132,10,262),Q(-160,10,262),Q(-200,10,262)];case 2:{let e=this.stops[2],t=e.t.clone().sub(e.p).normalize(),n=Q(-t.z,0,t.x).normalize();return[80,70,60].map(e=>this.npu.center.clone().addScaledVector(n,e))}case 3:{let[e,t]=[150,57],n=Q(this.stops[3].p.x-xf.enclave.x,0,this.stops[3].p.z-xf.enclave.z).normalize();return[-80,-74,-66].map(r=>Q(xf.enclave.x,e,xf.enclave.z).addScaledVector(n,t).addScaledVector(Q(n.z,0,-n.x),r))}case 4:{let e=Sf[this.world.ui.project];return[Q(246,173,e-114),Q(246,160,e-114),Q(246,140,e-114)]}case 5:return[-497,-500,-503].map(e=>Q(-1004,252,e));default:return null}}ready(e){document.documentElement.classList.add(`ready`),this.cards=_p({parts:e=>this.partAt(e)});let t=!1;try{t=sessionStorage.getItem(`xini-boot`)===`1`&&!Ad.has(`boot`)}catch{}if(kd||Ad.has(`skipintro`)||t){qd.uLitR.value=1e5,this.setOn(1e5),this.crown(1);return}try{sessionStorage.setItem(`xini-boot`,`1`)}catch{}let n=this.stops[0];this.intro={t:0,pc:new Li([Q(0,1650,290),Q(-110,1100,700),Q(-260,600,930),n.p.clone()],!1,`centripetal`),tc:new Li([Q(0,0,0),Q(-40,80,100),Q(-250,700,-110),n.t.clone()],!1,`centripetal`),warp:sd([[0,0],[.35,.2],[.8,.92],[1,1]])},qd.uLitR.value=0,this.setOn(0),this.tower.floorMat.uniforms.uLitY.value=0,this.crown(0),document.documentElement.classList.add(`booting`);let r=()=>{let t=this.intro;t&&(t.hit=!0,t.k=6,t.t=2.75,this.tower.crown.visible=!0,t.card||(t.card=!0,e.setCard(0,!0)),e.nav.lockUntil=performance.now()+350,[`wheel`,`keydown`,`pointerdown`,`touchstart`].forEach(e=>removeEventListener(e,r)))};[`wheel`,`keydown`,`pointerdown`,`touchstart`].forEach(e=>addEventListener(e,r,{passive:!0})),X.uFadeCol.value.set(this.pal.ink),X.uFade.value=1,X.uPlaneR.value=0,X.uPlaneAmt.value=0,X.uPlaneLed.value=0,e.nav.lockUntil=performance.now()+2900+Ip*1e3,document.querySelector(`.stop--top`).classList.remove(`is-current`);let i=e.rig;i.pose.p.copy(this.intro.pc.getPoint(0)),i.pose.t.copy(this.intro.tc.getPoint(0)),i.pose.fov=50,i.snap?.()}crown(e){let t=this.pal;this.crownK=e,this.tower.front.uniforms.uBase.value.set(t.markBack).multiplyScalar(zp(.05,.94,e)),this.tower.back.uniforms.uBase.value.set(t.signal).multiplyScalar(zp(.05,1,e))}setOn(e){this.powerR=e,this.applyLights()}applyLights(){let e=this.powerR??1e5,t=t=>Bp((e-t)/90,0,1),n=this.pal,r=this.wake??[1,1,1,1,1,1],i=e=>zp(Lp,1,r[e]);this.tower.ringMat.uniforms.uOn.value=t(120)*r[0],Ld.uLampAmt.value=.5*r[0]*t(400),this.tower.heatMat.uniforms.uOn.value=0;let a=.86+.14*(Math.floor((this.world?.time??0)*12)*7%5)/4;this.tower.emberMat.uniforms.uGain.value=t(30)*zp(.55,1,r[0])*a,this.tower.lineMat.uniforms.uBase.value.set(n.signal).multiplyScalar(zp(.06,1,t(240))*i(0)),this.tower.floorMat.uniforms.uBase.value.set(n.signal).multiplyScalar(i(0)),this.vrmSeam.uniforms.uGain.value=zp(.3,1,r[0])*t(150);let o=this.world?.ui?.project??1;this.mem.bars.forEach((e,n)=>{let i=e.userData.j===o?r[4]:0;e.material.uniforms.uOn.value=t(330+e.userData.k*56)*zp(.16,1,i)}),this.npu.edgeMat.uniforms.uGain.value=zp(.04,1,t(560))*zp(.18,1,r[2]),this.npu.nodeMat.uniforms.uGain.value=zp(.04,1,t(560))*zp(.18,1,r[2]),this.npu.faceMat.uniforms.uAmt.value=r[2],this.npu.dieMat&&(this.npu.dieMat.uniforms.uGain.value=zp(.04,1,t(560))*zp(.25,1,r[2])),this.npu.power=t(600),this.npu.lattice.visible=t(520)>0,this.enc.laserMat.uniforms.uBase.value.set(n.laser).multiplyScalar(zp(.05,1,t(600))),this.gantry.wake=r[1];let s=1-(this.crownDim??0);this.io.outside.material.uniforms.uGain.value=zp(.08,1,r[5])*s,this.io.shaftMat.uniforms.uAmt.value=zp(.04,1,r[5])*s,this.io.patchMat.uniforms.uAmt.value=zp(.06,1,r[5])*s,this.io.pkMat.uniforms.uGain.value=zp(.3,.8,r[5]),this.crownK!==void 0&&this.crown(this.crownK);let c=i(0)*s;if(this.tower.front.uniforms.uBase.value.multiplyScalar(c),this.tower.back.uniforms.uBase.value.multiplyScalar(c),s<1){let e=this.plateCol||=new q(`#141c1b`);this.tower.front.uniforms.uBase.value.lerp(e,1-s),this.tower.back.uniforms.uBase.value.lerp(e,1-s)}this.tower.lineMat.uniforms.uBase.value.multiplyScalar(s)}updateWake(e,t){let n=t.rig.flight,r=n?Bp(n.t/n.dur,0,1):1,i=[0,1,2,3,4,5].map(e=>this.intro?+(e===0):n?e===n.to?Hp(.08,.42,r):e===n.from?1-Hp(.04,.4,r):0:+(e===t.rig.index));this.wake||=i.slice();let a=1-Math.exp(-e*7);this.wake.forEach((e,t)=>{this.wake[t]=e+(i[t]-e)*a})}update(e,t,n){let r=n.camera;if(this.intro){let t=this.intro;t.t+=e;let r=t.t,i=Math.max(0,r-Ip),a=n.rig;X.uPlaneLed.value=Hp(.04,.1,r)*(1-Hp(.9,1.3,i))*1.5;let o=n.api().sfx;for(t.k=t.k??0;t.k<6&&r>[.05,.12,.2,.27,.33,.38][t.k];)o.play(t.k===5?`power`:`relay`,{gain:.8}),t.k++;X.uPlaneAmt.value=Hp(.1,.16,i)*(1-Hp(1.3,1.68,i)),i>.55&&!t.brand&&(t.brand=!0,document.documentElement.classList.add(`boot-brand`)),X.uPlaneR.value=Vp(Bp((i-.14)/.8,0,1))*1900,X.uFade.value=1-.3*Hp(.3,.9,i)-.7*Hp(1.32,1.7,i);let s=Vp(Bp((i-.85)/1,0,1))*1600;qd.uLitR.value=s,this.setOn(s),this.tower.floorMat.uniforms.uLitY.value=zp(150,800,Vp(Bp((i-1.2)/.7,0,1))),this.crown(Hp(1.5,1.86,i)),this.tower.crown.visible=i>1.46;let c=t.warp(Bp((i-.95)/.95,0,1));if(a.pose.p.copy(t.pc.getPointAt(c)),a.pose.t.copy(t.tc.getPointAt(c)),a.pose.fov=zp(50,this.stops[0].fov,c),a.snap?.(),i>1.92&&!t.hit){t.hit=!0;let e=n.toScreen(this.tower.crownPos.clone());n.impact.hit({seq:`sig`,center:[e.x/n.view.w,1-e.y/n.view.h],shake:1}),n.api().sfx.play(`slam`)}i>2.14&&!t.card&&(t.card=!0,n.setCard(0,!0),document.documentElement.classList.remove(`booting`)),i>=2.5&&(this.intro=null,this.tower.crown.visible=!0,document.documentElement.classList.remove(`booting`),qd.uLitR.value=1e5,this.setOn(1e5),this.tower.floorMat.uniforms.uLitY.value=1e5,this.crown(1),X.uFade.value=0,X.uPlaneAmt.value=0,X.uPlaneLed.value=0)}else{let t=n.rig.flight;if(t&&t.from===5&&t.to===0&&!kd){let e=t.t/t.dur,r=Hp(.2,.34,e)*(1-Hp(.62,.76,e));X.uPlaneAmt.value=r,X.uPlaneR.value=1900*Hp(.22,.46,e),X.uFade.value=.32*r,this.crownDim=Hp(.12,.22,e)*(1-Hp(.68,.8,e)),e>.3&&!this.revealed&&(this.revealed=!0,n.api().sfx.play(`power`))}else(X.uPlaneAmt.value>0||X.uFade.value>0)&&(X.uPlaneAmt.value=Math.max(0,X.uPlaneAmt.value-e*3),X.uFade.value=Math.max(0,X.uFade.value-e*3),this.revealed=!1,this.crownDim=X.uPlaneAmt.value)}Z.uKeyDir.value.copy(Q(-.5,.78,.42).normalize().transformDirection(r.matrixWorldInverse)),Z.uFillDir.value.copy(Q(.55,-.6,-.35).normalize().transformDirection(r.matrixWorldInverse)),this.sky.position.copy(r.position),this.dust.material.uniforms.uCam.value.copy(r.position);let i=+!!n.rig.flying;ef.uBoost.value+=(i+this.flash-ef.uBoost.value)*(1-Math.exp(-e*4)),this.mem.bars.forEach(e=>{e.material.uniforms.uBoost.value=ef.uBoost.value}),this.flash=Math.max(0,this.flash-e*.8),this.spin=Math.max(0,this.spin-e*.6),this.updateWake(e,n),this.applyLights();{let e=n.rig.flight;e&&!this.labelled&&e.t/e.dur>=.35&&(this.labelled=!0,Jp(e.to,e.from),Xp(e.to));let t=!!e&&!this.intro;if(t!==this.flyingCls&&(this.flyingCls=t,document.documentElement.classList.toggle(`flying`,t)),Qp&&t){let t=Bp(e.t/e.dur,0,1),n=Qp.fr[e.from];$p(zp(n,e.from===5&&e.to===0?1:Qp.fr[e.to],Hp(.05,.95,t)),t<.35?e.from:e.to),this.routeFlying=!0}else this.routeFlying&&(this.routeFlying=!1,$p(Qp.fr[n.rig.index],n.rig.index))}let a=this.wake;this.fanT=(this.fanT||0)+e*(this.intro?Hp(1,1.9,this.intro.t-Ip):zp(.12,1,a[0]))+this.spin*e*3,this.tower.update(this.fanT),this.npu.update(t,this.flash,+(n.rig.index===2&&!n.rig.flying),a[2]),this.enc.update(t,e,n.api().sfx,n.rig.index===3,a[3]),this.gantry.update(t,e,n.api().sfx),this.mem.updateSeat(t,n.api().sfx,e=>{let t=n.toScreen(Q(244,60,Sf[e]));n.impact.hit({seq:`soft`,center:[t.x/n.view.w,1-t.y/n.view.h],shake:.35})}),this.rest.updateLeds(t),this.io.update(t),this.city.update(t),n.api().sfx.fan(Math.min(1,(n.rig.flying?.6:0)+this.spin*.5)),this.updateFocus(e,n),this.mem.screens.forEach((t,r)=>{let i=t.material.uniforms.uGain,o=zp(.12,r===n.ui.project?.92:.3,a[4]);i.value+=(o-i.value)*(1-Math.exp(-e*5)),t.userData.flash>0&&(i.value=Math.max(i.value,1+t.userData.flash))})}updateFocus(e,t){let n=t.rig.flight,r=this.focusNow,i=e=>{let n=this.focus[e];return e===4?{...n,p:Q(244,100,Sf[t.ui.project??1])}:n},a,o,s=1,c=1;if(n){a=i(n.from),o=i(n.to);let e=Bp(n.t/n.dur,0,1);s=Hp(.2,.8,e),c=n.from===5&&n.to===0?1-Hp(.12,.3,e)*(1-Hp(.7,.9,e)):1-.55*Math.sin(Math.PI*e)}else a=o=i(t.rig.index);this.intro&&(c=Hp(1.6,2.4,this.intro.t-Ip));let l=a.p.clone().lerp(o.p,s),u=zp(a.r0,o.r0,s),d=zp(a.r1,o.r1,s),f=1-Math.exp(-e*6);if(r.p.lerp(l,f),r.r0+=(u-r.r0)*f,r.r1+=(d-r.r1)*f,r.amt+=(c-r.amt)*(this.intro?1:f),Ad.has(`nofocus`)&&(r.amt=0),X.uFocusP.value.copy(r.p),X.uFocusR0.value=r.r0,X.uFocusR1.value=r.r1,X.uFocusAmt.value=r.amt,this.fogs){let e=n?n.from:t.rig.index,r=n?n.to:e,i=this.fogs[e],a=this.fogs[r],o=this._fogT||=[new q,new q];o[0].copy(i[0]).lerp(a[0],s),o[1].copy(i[1]).lerp(a[1],s),X.uFogCol.value.lerp(o[0],f),X.uFogHorizon.value.lerp(o[1],f)}let p=X.uSpeedCenter.value,m=.5,h=.5;if(n){let e=t.toScreen(i(n.to).p.clone());e.behind||(m=Bp(e.x/t.view.w,.15,.85),h=Bp(1-e.y/t.view.h,.15,.85))}p.x+=(m-p.x)*f,p.y+=(h-p.y)*f;let g=t.toScreen(r.p.clone()),_=X.uVigC.value,v=g.behind?.5:Bp(.5+(g.x/t.view.w-.5)*.4,.35,.65),y=g.behind?.5:Bp(.5+(.5-g.y/t.view.h)*.4,.35,.65);_.x+=(v-_.x)*f,_.y+=(y-_.y)*f}layout(e){this.mirror?.setSize(e.w*e.dpr,e.h*e.dpr),qd.uScreen.value.set(e.w*e.dpr,e.h*e.dpr);let t=Math.min(64,Math.max(18,e.w*.04));X.uSpeedMask.value.set(96*e.dpr,(t+236)*e.dpr,114*e.dpr)}preRender(e){if(this.cards?.update(e),!this.mirror||qd.uReflAmt.value<=0)return;e.camera.updateMatrixWorld();let t=e.camera,n=this.mirrorLast||={p:new G(1e9,0,0),q:new Et,step:-1};n.p.distanceToSquared(t.position)<.04&&Math.abs(n.q.dot(t.quaternion))>.999999&&n.step===Z.uStep.value||(n.p.copy(t.position),n.q.copy(t.quaternion),n.step=Z.uStep.value,this.mirror.render(e.renderer,e.scene,e.camera,this.mirrorHide,this.fogCol)&&qd.uReflMat.value.copy(this.mirror.texMat))}click(e,t,n){let r=t.intersectObjects(this.mem.screens,!1);if(r.length){let e=r[0].object.userData.exhibit;if(n.rig.index!==4){n.nav.go(4,`click`,!0),n.ui.setProject(e,1);return}e===n.ui.project?jd(gd[e].url):n.ui.setProject(e,e>n.ui.project?1:-1);return}let i=n.api().sfx,a=this.npu.center;if(t.ray.distanceToPoint(a)<95){this.flash=1.2,n.impact.hit({seq:`accent`,center:[e.clientX/innerWidth,1-e.clientY/innerHeight],shake:.35}),i.play(`snap`);return}let o=Q(lf.cx+lf.depth/2+14,(lf.finY0+lf.finY1)/2,lf.cz);if(t.ray.distanceToPoint(o)<lf.fanR){this.spin=1.5,n.impact.hit({seq:`soft`,center:[e.clientX/innerWidth,1-e.clientY/innerHeight],shake:.3}),i.play(`whoosh`,{gain:.6});return}let s=new G;t.ray.intersectPlane(new Ar(Q(0,1,0),0),s)&&qd.uPing.value[this.pingN++%4].set(s.x,s.z,Z.uStep.value,1),n.impact.hit({seq:`soft`,center:[e.clientX/innerWidth,1-e.clientY/innerHeight],shake:.25}),i.play(`snap`,{gain:.6})}},tm=new Md({canvas:document.querySelector(`canvas.gl`),director:em,places:Np,palettes:vp,palette:Ad.get(`palette`)||`verdigris`,pipeline:{bloom:!0}});X.uFogAmt.value=1,X.uFogNear.value=560,X.uFogFar.value=4200,X.uFogLine.value=.85,X.uBloomAmt.value=.55,X.uBloomDots.value=.6,X.uMisregPx.value=1,X.uGrain.value=.035,X.uGradeAmt.value=.18,X.uVignette.value=.5,X.uVigR.value.set(.3,.98),X.uDepthK.value=.045,X.uNormalK.value=.35,X.uHFogAmt.value=.55,X.uHFogY.value=0,X.uHFogK.value=.012,X.uFogDirAmt.value=.8,X.uFogGlow.value=.25,X.uCap.value.set(vp.verdigris.gl.cream),X.uCapAmt.value=1,X.uBloomHard.value=1,X.uCapHue.value=1,X.uBloomCell.value=6.5,X.uBloomCov.value=.5,X.uPlanePrint.value=1,X.uSpeedPrint.value=1,X.uImpAccentInk.value=1,X.uBloomOver.value=1,X.uSpeedInk.value=1,X.uBloomFlat.value=.6,X.uSpeedIn.value=.62,X.uImpTri.value=1,X.uPlaneFoldAmt.value=1,X.uPlaneFold.value.set(vp.verdigris.gl.cream),X.uPlaneOct.value=1,X.uLineFarAmt.value=.55,X.uLineFar.value.set(1400,2500),X.uFocusLine.value=.8,X.uFocusHaze.value=.5,X.uFocusNear.value=.8,X.uFocusDesat.value=.75,X.uFocusSoft.value=0,X.uFocusMisreg.value=2.2,Ad.has(`nolut`)||Ru(Ou(Id),Ad.has(`lut`)?+Ad.get(`lut`):1),await tm.start(),Object.assign(window.__xini,{post:X,boardU:qd,skyU:Ld,shared:Z}),window.__xini.ready=!0;