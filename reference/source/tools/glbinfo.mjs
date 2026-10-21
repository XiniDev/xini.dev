import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { MeshoptDecoder } from 'meshoptimizer';
await MeshoptDecoder.ready;
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ 'meshopt.decoder': MeshoptDecoder });
const doc = await io.read(process.argv[2]);
const root = doc.getRoot();
for (const node of root.listNodes()) {
  const m = node.getMesh(); if (!m) continue;
  const prims = m.listPrimitives();
  console.log(node.getName().padEnd(28), prims.map((p) => (p.getMaterial()?.getName() || '-') + ':' + p.getAttribute('POSITION').getCount() + (p.getAttribute('_INKID') ? '+id' : '') + (p.getAttribute('COLOR_0') ? '+ao' : '')).join(' '));
}
