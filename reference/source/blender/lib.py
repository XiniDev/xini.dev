"""Small modelling kit for headless Blender (bpy): boxes, cylinders, tubes, arrays, and an AO bake into
vertex colours so the web shader can paint cavities like Arcane's hand-painted texture passes."""
import bpy, bmesh, math
from mathutils import Vector, Euler

def reset():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene
    sc.unit_settings.system = 'METRIC'
    return sc

_mats = {}
def mat(name, color=(0.8, 0.8, 0.8)):
    if name in _mats: return _mats[name]
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    bsdf = m.node_tree.nodes.get('Principled BSDF')
    if bsdf: bsdf.inputs['Base Color'].default_value = (*color, 1)
    _mats[name] = m
    return m

def _link(o, coll=None):
    (coll or bpy.context.scene.collection).objects.link(o)
    return o

def mesh_obj(name, bm, material=None, loc=(0, 0, 0), rot=(0, 0, 0)):
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new(name, me)
    _link(o)
    o.location = loc; o.rotation_euler = Euler(rot)
    if material: me.materials.append(material)
    return o

def box(name, size, loc=(0, 0, 0), rot=(0, 0, 0), material=None, bevel=0.0, seg=1, origin='center'):
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1.0)
    sx, sy, sz = size
    for v in bm.verts:
        v.co.x *= sx; v.co.y *= sy; v.co.z *= sz
        if origin == 'bottom': v.co.z += sz / 2
    o = mesh_obj(name, bm, material, loc, rot)
    if bevel > 0:
        m = o.modifiers.new('bevel', 'BEVEL'); m.width = bevel; m.segments = seg; m.limit_method = 'ANGLE'
    return o

def cyl(name, r, h, loc=(0, 0, 0), rot=(0, 0, 0), material=None, verts=24, bevel=0.0, cap=True, origin='bottom', r2=None):
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=cap, cap_tris=False, segments=verts, radius1=r, radius2=r if r2 is None else r2, depth=h)
    if origin == 'bottom':
        for v in bm.verts: v.co.z += h / 2
    o = mesh_obj(name, bm, material, loc, rot)
    if bevel > 0:
        m = o.modifiers.new('bevel', 'BEVEL'); m.width = bevel; m.segments = 1; m.limit_method = 'ANGLE'
    return o

def tube(name, pts, radius, material=None, res=6, closed=False, handles='AUTO'):
    cu = bpy.data.curves.new(name, 'CURVE'); cu.dimensions = '3D'
    sp = cu.splines.new('BEZIER'); sp.bezier_points.add(len(pts) - 1)
    for bp, p in zip(sp.bezier_points, pts):
        bp.co = Vector(p); bp.handle_left_type = handles; bp.handle_right_type = handles
    sp.use_cyclic_u = closed
    cu.bevel_depth = radius; cu.bevel_resolution = 2; cu.resolution_u = res
    o = bpy.data.objects.new(name, cu); _link(o)
    if material: cu.materials.append(material)
    return o

def poly_tube(name, pts, radius, material=None, closed=False):
    """Straight-segment tube (neon), corners kept sharp."""
    cu = bpy.data.curves.new(name, 'CURVE'); cu.dimensions = '3D'
    sp = cu.splines.new('POLY'); sp.points.add(len(pts) - 1)
    for p, c in zip(sp.points, pts): p.co = (*c, 1)
    sp.use_cyclic_u = closed
    cu.bevel_depth = radius; cu.bevel_resolution = 3
    o = bpy.data.objects.new(name, cu); _link(o)
    if material: cu.materials.append(material)
    return o

def catenary(p0, p1, sag, n=10):
    pts = []
    for i in range(n + 1):
        t = i / n
        x = p0[0] + (p1[0] - p0[0]) * t; y = p0[1] + (p1[1] - p0[1]) * t; z = p0[2] + (p1[2] - p0[2]) * t
        z -= sag * 4 * t * (1 - t)
        pts.append((x, y, z))
    return pts

def array(o, count, offset):
    m = o.modifiers.new('array', 'ARRAY'); m.count = count
    m.use_relative_offset = False; m.use_constant_offset = True; m.constant_offset_displace = offset
    return o

def apply_all():
    """Convert curves to meshes and apply modifiers so exports and bakes see final geometry."""
    bpy.ops.object.select_all(action='DESELECT')
    for o in list(bpy.context.scene.objects):
        if o.type == 'CURVE':
            bpy.context.view_layer.objects.active = o; o.select_set(True)
            bpy.ops.object.convert(target='MESH'); o.select_set(False)
    for o in list(bpy.context.scene.objects):
        if o.type != 'MESH': continue
        bpy.context.view_layer.objects.active = o
        for m in list(o.modifiers):
            try: bpy.ops.object.modifier_apply(modifier=m.name)
            except Exception as e: print('modifier', o.name, m.name, e)

def subdivide_long_faces(o, cuts=8):
    bm = bmesh.new(); bm.from_mesh(o.data)
    bmesh.ops.subdivide_edges(bm, edges=bm.edges[:], cuts=cuts, use_grid_fill=True)
    bm.to_mesh(o.data); bm.free()

def bake_ao(samples=48, distance=1.2, skip=()):
    sc = bpy.context.scene
    sc.render.engine = 'CYCLES'
    sc.cycles.device = 'CPU'
    sc.cycles.samples = samples
    sc.world = sc.world or bpy.data.worlds.new('w')
    sc.world.light_settings.distance = distance
    for o in sc.objects:
        if o.type != 'MESH' or o.name.startswith(skip): continue
        me = o.data
        if 'AO' not in me.color_attributes:
            me.color_attributes.new('AO', 'BYTE_COLOR', 'POINT')
        me.color_attributes.active_color = me.color_attributes['AO']
    bpy.ops.object.select_all(action='DESELECT')
    meshes = [o for o in sc.objects if o.type == 'MESH' and not o.name.startswith(skip)]
    for o in meshes: o.select_set(True)
    bpy.context.view_layer.objects.active = meshes[0]
    bpy.ops.object.bake(type='AO', target='VERTEX_COLORS')

def export(path):
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.export_scene.gltf(filepath=path, export_format='GLB', export_apply=True, export_vertex_color='ACTIVE',
                              export_normals=True, export_texcoords=True, export_materials='EXPORT', export_yup=True)
