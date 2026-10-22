import * as THREE from 'three';

const V = (x, y, z) => new THREE.Vector3(x, y, z);

// The glossy board reflects the city: a mirrored camera renders into a half-size target (port of THREE.Reflector).
// Materials still write their normal/id output; with one draw buffer that output is discarded.
export class Mirror {
  constructor(scale = 0.5, height = 0) {
    this.rt = new THREE.WebGLRenderTarget(1, 1, { type: THREE.UnsignedByteType, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, depthBuffer: true });
    this.cam = new THREE.PerspectiveCamera(); this.scale = scale;
    this.plane = new THREE.Plane(); this.clip = new THREE.Vector4(); this.q = new THREE.Vector4(); this.texMat = new THREE.Matrix4();
    this.n = V(0, 1, 0); this.o = V(0, height, 0); this.clipY = height + 0.8; this.rot = new THREE.Matrix4(); this.cp = V(0, 0, 0); this.la = V(0, 0, 0); this.tg = V(0, 0, 0);
  }
  setSize(w, h) { this.rt.setSize(Math.max(1, Math.round(w * this.scale)), Math.max(1, Math.round(h * this.scale))); }
  render(renderer, scene, camera, hide, clear) {
    const { n, o, cp, la, tg } = this, vc = this.cam;
    cp.setFromMatrixPosition(camera.matrixWorld);
    const view = o.clone().sub(cp);
    if (view.dot(n) > 0) return false;
    view.reflect(n).negate().add(o);
    this.rot.extractRotation(camera.matrixWorld);
    la.set(0, 0, -1).applyMatrix4(this.rot).add(cp);
    tg.copy(o).sub(la).reflect(n).negate().add(o);
    vc.position.copy(view); vc.up.set(0, 1, 0).applyMatrix4(this.rot).reflect(n); vc.lookAt(tg);
    vc.far = camera.far; vc.near = camera.near; vc.updateMatrixWorld();
    vc.projectionMatrix.copy(camera.projectionMatrix);
    this.texMat.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1);
    this.texMat.multiply(vc.projectionMatrix).multiply(vc.matrixWorldInverse);
    this.plane.setFromNormalAndCoplanarPoint(n, V(0, this.clipY, 0)).applyMatrix4(vc.matrixWorldInverse);
    const c = this.clip.set(this.plane.normal.x, this.plane.normal.y, this.plane.normal.z, this.plane.constant), P = vc.projectionMatrix.elements, q = this.q;
    q.x = (Math.sign(c.x) + P[8]) / P[0]; q.y = (Math.sign(c.y) + P[9]) / P[5]; q.z = -1; q.w = (1 + P[10]) / P[14];
    c.multiplyScalar(2 / c.dot(q));
    P[2] = c.x; P[6] = c.y; P[10] = c.z + 1; P[14] = c.w;
    hide.forEach((x) => { x.visible = false; });
    renderer.setRenderTarget(this.rt); renderer.setClearColor(clear, 1); renderer.clear(true, true, true);
    renderer.render(scene, vc);
    hide.forEach((x) => { x.visible = true; });
    renderer.setRenderTarget(null);
    return true;
  }
}

