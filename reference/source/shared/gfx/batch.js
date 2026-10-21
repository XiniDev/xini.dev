import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

/**
 * Static batching: merge every mesh under `root` that never moves into one mesh per material (world
 * space), so a scene of hundreds of parts costs a few dozen draws. Left alone: anything flagged
 * userData.dynamic (and its children), objects in `keep`, instanced meshes, transparent materials,
 * hidden objects and multi-material meshes. Ink ids live on materials, so outlines are unchanged.
 * Works on any root: merged meshes are added to `root` in its own space (so a moving group can batch
 * its rigid parts). Returns { before, after }.
 */
export function batchStatic(root, { keep = [] } = {}) {
  root.updateMatrixWorld(true);
  const toRoot = root.matrixWorld.clone().invert(), rel = new THREE.Matrix4();
  const keepSet = new Set(keep);
  const groups = new Map();
  let before = 0;
  const visit = (o, vis) => {
    if ((o !== root && o.userData.dynamic) || keepSet.has(o)) return;
    vis = vis && (o === root || o.visible);
    if (o.isMesh && vis) before++;
    if (o.isMesh && vis && !o.isInstancedMesh && !o.isSkinnedMesh && !Array.isArray(o.material)) {
      const m = o.material, g = o.geometry;
      if (!m.transparent && !g.morphAttributes?.position?.length) {
        const key = `${m.uuid}|${Object.keys(g.attributes).sort().join(',')}|${o.renderOrder}|${o.frustumCulled}`;
        if (!groups.has(key)) groups.set(key, { m, list: [], ro: o.renderOrder, fc: o.frustumCulled });
        groups.get(key).list.push(o);
      }
    }
    for (const c of [...o.children]) visit(c, vis);
  };
  visit(root, true);
  let merged = 0, made = 0;
  groups.forEach(({ m, list, ro, fc }) => {
    if (list.length < 2) return;
    const geos = list.map((o) => {
      const g = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
      g.clearGroups();
      rel.multiplyMatrices(toRoot, o.matrixWorld);
      g.applyMatrix4(rel);
      if (rel.determinant() < 0) { // mirrored parts: restore the winding
        const p = g.attributes.position;
        for (let i = 0; i < p.count; i += 3) for (const a of Object.values(g.attributes)) { const t = []; for (let k = 0; k < a.itemSize; k++) t.push(a.getComponent(i + 1, k)); for (let k = 0; k < a.itemSize; k++) { a.setComponent(i + 1, k, a.getComponent(i + 2, k)); a.setComponent(i + 2, k, t[k]); } }
      }
      return g;
    });
    const geo = mergeGeometries(geos);
    if (!geo) return;
    const mesh = new THREE.Mesh(geo, m);
    mesh.renderOrder = ro; mesh.frustumCulled = fc; mesh.name = 'batch';
    root.add(mesh);
    list.forEach((o) => o.removeFromParent());
    merged += list.length; made++;
  });
  return { before, after: before - merged + made };
}
