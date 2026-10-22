// Prepare a Blender export for the ink renderer: tag every object with an ink id (so outlines survive
// merging), join primitives by material except named "live" parts, then quantise + meshopt-compress.
// node tools/optimize-glb.mjs in.glb out.glb [keepPrefix1,keepPrefix2]
import { NodeIO, Accessor } from '@gltf-transform/core';
import { ALL_EXTENSIONS, EXTMeshoptCompression } from '@gltf-transform/extensions';
import { flatten, join, dedup, prune, quantize, weld, meshopt } from '@gltf-transform/functions';
import { PropertyType } from '@gltf-transform/core';
import { MeshoptEncoder, MeshoptDecoder } from 'meshoptimizer';
const [, , inp, out, keepArg = '', mode = ''] = process.argv;
const useMeshopt = mode !== 'no-meshopt';
const keep = keepArg.split(',').filter(Boolean);
await MeshoptEncoder.ready; await MeshoptDecoder.ready;
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ 'meshopt.encoder': MeshoptEncoder, 'meshopt.decoder': MeshoptDecoder });
const doc = await io.read(inp);
const root = doc.getRoot();
await doc.transform(flatten());
let id = 1;
for (const node of root.listNodes()) {
  const mesh = node.getMesh(); if (!mesh) continue;
  const name = node.getName();
  const live = keep.some((k) => name.startsWith(k));
  for (const prim of mesh.listPrimitives()) {
    const n = prim.getAttribute('POSITION').getCount();
    const arr = new Float32Array(n).fill(id);
    prim.setAttribute('_INKID', doc.createAccessor().setType(Accessor.Type.SCALAR).setArray(arr));
    if (live) prim.setExtras({ live: name });
  }
  if (live) node.setExtras({ live: true });
  id = id % 240 + 1;
}
// keep live nodes out of the join by giving them a unique material clone
for (const node of root.listNodes()) {
  if (!node.getExtras().live) continue;
  for (const prim of node.getMesh().listPrimitives()) {
    const m = prim.getMaterial(); if (!m) continue;
    const c = doc.createMaterial(m.getName() + '|' + node.getName()).setExtras({ live: node.getName() });
    prim.setMaterial(c);
  }
}
await doc.transform(dedup({ propertyTypes: [PropertyType.ACCESSOR, PropertyType.MESH, PropertyType.TEXTURE] }), join({ keepNamed: false }), weld(), prune(), quantize(), ...(useMeshopt ? [meshopt({ encoder: MeshoptEncoder, level: 'medium' })] : []));
await io.write(out, doc);
console.log('meshes', root.listMeshes().length, 'materials', root.listMaterials().length);
