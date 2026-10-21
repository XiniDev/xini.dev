"""ROOFTOP: a floating night rooftop, modelled procedurally for the comic-panel concept.
Run: python3 rooftop.py  -> out/rooftop.glb
Blender coordinates: x right, y away from the viewer, z up. The front edge faces -y."""
import sys, math, random
sys.path.insert(0, '/home/claude/rework/blender')
from lib import *
from mathutils import Vector

random.seed(7)
reset()
M = {k: mat(k, c) for k, c in {
    'concrete': (0.62, 0.6, 0.58), 'concrete_dark': (0.38, 0.37, 0.38), 'building': (0.22, 0.2, 0.25),
    'metal': (0.45, 0.5, 0.58), 'metal_dark': (0.2, 0.22, 0.26), 'rust': (0.6, 0.32, 0.18), 'wood': (0.55, 0.38, 0.22),
    'rubber': (0.05, 0.05, 0.06), 'plate': (0.06, 0.06, 0.08), 'paper': (0.9, 0.88, 0.82), 'hazard': (0.95, 0.75, 0.1),
    'neon_main': (1, 0.2, 0.2), 'neon_alt': (0.3, 0.9, 1), 'led_green': (0.2, 1, 0.5), 'led_red': (1, 0.1, 0.1),
    'screen': (0.3, 0.9, 1), 'bulb': (1, 0.85, 0.5), 'glass': (0.3, 0.5, 0.6), 'puddle': (0.1, 0.12, 0.16),
    'poster_0': (1, 1, 1), 'poster_1': (1, 1, 1), 'poster_2': (1, 1, 1), 'poster_3': (1, 1, 1), 'poster_4': (1, 1, 1),
    'sign_a': (1, 1, 1), 'sign_b': (1, 1, 1), 'monitor_img': (1, 1, 1),
}.items()}

W, D = 8.4, 6.4
# ---- slab, building, parapet
slab = box('roof_slab', (W, D, 0.9), (0, 0, -0.45), material=M['concrete'], bevel=0.04)
top = box('roof_floor', (W - 0.44, D - 0.44, 0.02), (0, 0, 0.0), material=M['concrete'])
subdivide_long_faces(top, cuts=14)
box('building', (W - 0.3, D - 0.3, 16), (0, 0, -8.9), material=M['building'])
# window rows on the building face (dark recesses with a few lit)
for row in range(6):
    for col in range(7):
        x = -3.3 + col * 1.1; z = -2.2 - row * 1.9
        lit = random.random() < 0.18
        box(f'win_{row}_{col}', (0.62, 0.06, 1.0), (x, -D / 2 + 0.12, z), material=M['bulb' if lit else 'plate'])
pt = 0.22; ph = 0.62
for (sx, sy, x, y) in [(W, pt, 0, -D / 2 + pt / 2), (W, pt, 0, D / 2 - pt / 2), (pt, D, -W / 2 + pt / 2, 0), (pt, D, W / 2 - pt / 2, 0)]:
    box(f'parapet_{x:.1f}_{y:.1f}', (sx, sy, ph), (x, y, 0), material=M['concrete_dark'], bevel=0.03, origin='bottom')
# coping stones on the front parapet
for i in range(14):
    box(f'coping_{i}', (W / 14 - 0.04, pt + 0.08, 0.08), (-W / 2 + (i + 0.5) * W / 14, -D / 2 + pt / 2, ph), material=M['concrete'], bevel=0.015, origin='bottom')

# ---- the neon sign on a steel scaffold at the back
sx0, sy0 = -0.4, 2.55
for x in (-1.9, -0.7, 0.5, 1.7):
    box(f'scaffold_post_{x}', (0.09, 0.09, 4.2), (sx0 + x + 0.1, sy0 + 0.25, 0), material=M['metal_dark'], origin='bottom')
for z in (1.3, 2.6, 3.9):
    box(f'scaffold_bar_{z}', (3.9, 0.07, 0.07), (sx0 - 0.0, sy0 + 0.25, z), material=M['metal_dark'])
for i, x in enumerate((-1.9, -0.7, 0.5)):
    tube(f'scaffold_brace_{i}', [(sx0 + x + 0.1, sy0 + 0.25, 1.3), (sx0 + x + 1.3, sy0 + 0.25, 2.6)], 0.03, M['metal_dark'], handles='VECTOR')
plate = box('sign_plate', (3.6, 0.12, 2.3), (sx0 - 0.1, sy0, 2.75), material=M['plate'], bevel=0.04)
# XNI neon: the folded-loop path TL->BR->TR->BL, as tubes on the plate
cx, cz, hw, hh = sx0 - 0.95, 2.75, 0.62, 0.86
loop = [(cx - hw, sy0 - 0.1, cz + hh), (cx + hw, sy0 - 0.1, cz - hh), (cx + hw, sy0 - 0.1, cz + hh), (cx - hw, sy0 - 0.1, cz - hh)]
poly_tube('neon_mark', loop, 0.045, M['neon_main'], closed=True)
# the tube holders
for p in loop:
    box('neon_clip', (0.07, 0.08, 0.07), (p[0], sy0 - 0.06, p[2]), material=M['metal'])
# right side of the sign: a printed panel (texture filled in three.js with type)
s = box('sign_type', (1.75, 0.02, 1.9), (sx0 + 0.75, sy0 - 0.07, 2.75), material=M['sign_a'])
# cable from the sign to the hut
tube('cable_sign', catenary((sx0 + 1.6, sy0, 1.6), (2.0, 1.4, 2.25), 0.6), 0.025, M['rubber'])

# ---- water tank (left back)
tx, ty = -3.0, 1.8
for (dx, dy) in [(-0.55, -0.55), (0.55, -0.55), (-0.55, 0.55), (0.55, 0.55)]:
    box('tank_leg', (0.1, 0.1, 1.2), (tx + dx, ty + dy, 0), material=M['metal_dark'], origin='bottom')
box('tank_base', (1.5, 1.5, 0.12), (tx, ty, 1.2), material=M['metal_dark'], origin='bottom')
cyl('tank', 0.82, 1.55, (tx, ty, 1.32), material=M['rust'], verts=28, bevel=0.03)
for k in range(4):
    cyl(f'tank_band_{k}', 0.84, 0.05, (tx, ty, 1.5 + k * 0.38), material=M['metal_dark'], verts=28)
cyl('tank_roof', 0.9, 0.42, (tx, ty, 2.87), material=M['rust'], verts=28, r2=0.06)
for k in range(9):
    box(f'tank_ladder_rung_{k}', (0.42, 0.04, 0.04), (tx + 0.1, ty - 0.86, 0.2 + k * 0.28), material=M['metal'])
for dx in (-0.1, 0.3):
    box('tank_ladder_rail', (0.04, 0.04, 2.7), (tx + dx, ty - 0.86, 0), material=M['metal'], origin='bottom')

# ---- stair hut with the security door (right), poster wall on its left face
hx, hy, hw2, hd, hh2 = 2.75, 0.55, 1.7, 3.3, 2.35
hut = box('hut', (hw2, hd, hh2), (hx, hy, 0), material=M['concrete'], bevel=0.03, origin='bottom')
box('hut_roof', (hw2 + 0.2, hd + 0.2, 0.12), (hx, hy, hh2), material=M['concrete_dark'], bevel=0.02, origin='bottom')
door_y = hy - hd / 2 - 0.01
box('door_frame', (1.02, 0.08, 2.1), (hx, door_y, 0), material=M['metal_dark'], bevel=0.01, origin='bottom')
box('door', (0.88, 0.1, 1.98), (hx, door_y - 0.02, 0.02), material=M['metal'], bevel=0.02, origin='bottom')
for z in (0.5, 1.5):
    box('door_rib', (0.8, 0.12, 0.05), (hx, door_y - 0.03, z), material=M['metal_dark'])
# padlock + hasp + chain
box('hasp', (0.24, 0.05, 0.08), (hx + 0.3, door_y - 0.09, 1.0), material=M['metal_dark'])
lock_body = box('padlock_body', (0.2, 0.09, 0.22), (hx + 0.4, door_y - 0.16, 0.86), material=M['hazard'], bevel=0.025)
tube('padlock_shackle', [(hx + 0.33, door_y - 0.16, 0.96), (hx + 0.33, door_y - 0.16, 1.08), (hx + 0.4, door_y - 0.16, 1.15), (hx + 0.47, door_y - 0.16, 1.08), (hx + 0.47, door_y - 0.16, 0.96)], 0.022, M['metal'])
for i in range(9):
    ang = i * 0.5
    tube(f'chain_{i}', [(hx - 0.35 + i * 0.09, door_y - 0.13, 1.25 - math.sin(i / 8 * math.pi) * 0.25 + 0.03), (hx - 0.3 + i * 0.09, door_y - 0.13, 1.25 - math.sin((i + 0.5) / 8 * math.pi) * 0.25 - 0.03)], 0.016, M['metal'], handles='VECTOR')
box('keypad', (0.16, 0.05, 0.24), (hx - 0.62, door_y - 0.04, 1.2), material=M['plate'], bevel=0.01)
box('keypad_led', (0.04, 0.02, 0.02), (hx - 0.62, door_y - 0.08, 1.29), material=M['led_red'])
box('sign_warning', (0.5, 0.02, 0.36), (hx, door_y - 0.07, 2.06 - 0.25), material=M['sign_b'])
box('lamp_door', (0.24, 0.16, 0.12), (hx, door_y - 0.12, 2.18), material=M['metal_dark'], bevel=0.02)
box('lamp_door_glow', (0.18, 0.02, 0.06), (hx, door_y - 0.2, 2.15), material=M['bulb'])
# posters on the left face of the hut (x = hx - hw2/2), facing -x
px = hx - hw2 / 2 - 0.012
for i in range(5):
    y = hy - hd / 2 + 0.42 + i * 0.62
    o = box(f'poster_{i}', (0.012, 0.52, 0.74), (px, y, 0.85 + (i % 2) * 0.06), material=M[f'poster_{i}'])
    o.rotation_euler = (0, 0, 0)
    # slight tilt like hand-pasted paper
    o.rotation_euler.x = math.radians(random.uniform(-2.5, 2.5))
# TV antenna on the hut roof
box('hut_ant_pole', (0.05, 0.05, 1.3), (hx + 0.4, hy + 1.1, hh2 + 0.12), material=M['metal'], origin='bottom')
for k in range(5):
    box(f'hut_ant_el_{k}', (0.7 - k * 0.1, 0.03, 0.03), (hx + 0.4, hy + 1.1, hh2 + 0.7 + k * 0.14), material=M['metal'])

# ---- antenna mast + dishes + server cabinet (AI corner, back right)
mx, my = 3.25, 2.6
for (dx, dy) in [(-0.18, -0.18), (0.18, -0.18), (-0.18, 0.18), (0.18, 0.18)]:
    box('mast_leg', (0.05, 0.05, 5.6), (mx + dx, my + dy, 0), material=M['metal'], origin='bottom')
for k in range(11):
    z = 0.3 + k * 0.5
    tube(f'mast_x_{k}', [(mx - 0.18, my - 0.19, z), (mx + 0.18, my - 0.19, z + 0.5)], 0.012, M['metal'], handles='VECTOR')
    tube(f'mast_y_{k}', [(mx - 0.19, my - 0.18, z + 0.5), (mx - 0.19, my + 0.18, z)], 0.012, M['metal'], handles='VECTOR')
cyl('mast_beacon', 0.07, 0.12, (mx, my, 5.6), material=M['led_red'], verts=12)
# dishes: real parabolic bowls (lathe + solidify), facing the city at the front-left
import bmesh as _bm
def dish(name, r, depth, loc, rot, material):
    bm = _bm.new()
    prof = []
    n = 10
    for i in range(n + 1):
        rr = r * i / n
        prof.append(bm.verts.new((rr, 0.0, depth * (rr / r) ** 2)))
    for i in range(n):
        bm.edges.new((prof[i], prof[i + 1]))
    _bm.ops.spin(bm, geom=bm.verts[:] + bm.edges[:], cent=(0, 0, 0), axis=(0, 0, 1), steps=32, angle=math.tau, use_duplicate=False)
    _bm.ops.remove_doubles(bm, verts=bm.verts[:], dist=1e-5)
    o = mesh_obj(name, bm, material, loc, rot)
    m = o.modifiers.new('solid', 'SOLIDIFY'); m.thickness = 0.03; m.offset = -1
    return o
d_rot = (math.radians(62), 0, math.radians(-145))      # bowl faces front-left and up
dish('dish', 0.85, 0.32, (mx - 0.55, my - 0.45, 3.2), d_rot, M['metal'])
cyl('dish_rim', 0.87, 0.04, (0, 0, 0), material=M['metal_dark'], verts=32, cap=False)
r = bpy.context.scene.objects['dish_rim']; r.location = (mx - 0.55, my - 0.45, 3.2); r.rotation_euler = d_rot
# feed: three struts to a horn at the focus
from mathutils import Matrix
R = Euler(d_rot).to_matrix()
c = Vector((mx - 0.55, my - 0.45, 3.2))
focus = c + R @ Vector((0, 0, 0.62))
for k in range(3):
    a = k * math.tau / 3
    rim = c + R @ Vector((0.8 * math.cos(a), 0.8 * math.sin(a), 0.3))
    tube(f'dish_strut_{k}', [tuple(rim), tuple(focus)], 0.012, M['metal_dark'], handles='VECTOR')
cyl('dish_horn', 0.07, 0.16, tuple(focus), rot=d_rot, material=M['metal_dark'], verts=12, r2=0.03)
box('dish_mount', (0.1, 0.1, 0.6), (mx - 0.25, my - 0.25, 2.95), rot=(0, math.radians(40), math.radians(-45)), material=M['metal_dark'])
dish('dish_small', 0.36, 0.14, (mx + 0.32, my - 0.32, 4.45), (math.radians(70), 0, math.radians(-60)), M['metal'])
cx2, cy2 = 1.75, 2.75
box('server', (0.72, 0.6, 1.8), (cx2, cy2, 0), material=M['metal_dark'], bevel=0.02, origin='bottom')
box('server_door', (0.64, 0.04, 1.66), (cx2, cy2 - 0.31, 0.07), material=M['metal'], bevel=0.01, origin='bottom')
for k in range(10):
    box(f'server_vent_{k}', (0.46, 0.05, 0.03), (cx2, cy2 - 0.34, 0.25 + k * 0.08), material=M['metal_dark'])
for k in range(6):
    box(f'server_led_{k}', (0.04, 0.03, 0.03), (cx2 - 0.2 + k * 0.08, cy2 - 0.35, 1.55), material=M['led_green' if k % 3 else 'led_red'])
CABLES = []
for k, (a, b, s_) in enumerate([((cx2 + 0.2, cy2, 1.8), (mx - 0.1, my, 2.4), 0.35), ((cx2 - 0.1, cy2, 1.8), (mx - 0.3, my - 0.3, 3.0), 0.5), ((cx2, cy2 - 0.2, 0.3), (hx - 0.6, hy + 1.2, 0.05), 0.0), ((mx - 0.18, my - 0.19, 2.4), (mx - 0.18, my - 0.19, 5.5), 0.0)]):
    pts = catenary(a, b, s_, 14)
    tube(f'cable_ai_{k}', pts, 0.03, M['rubber'])
    CABLES.append(pts)

# ---- workbench (Systems, front left)
bx, by = -1.25, -1.15
box('bench_top', (1.9, 0.85, 0.07), (bx, by, 0.9), material=M['wood'], bevel=0.015)
for (dx, dy) in [(-0.85, -0.35), (0.85, -0.35), (-0.85, 0.35), (0.85, 0.35)]:
    box('bench_leg', (0.07, 0.07, 0.9), (bx + dx, by + dy, 0), material=M['metal_dark'], origin='bottom')
box('bench_shelf', (1.75, 0.75, 0.04), (bx, by, 0.25), material=M['wood'])
box('monitor_stand', (0.08, 0.08, 0.3), (bx + 0.35, by + 0.2, 0.93), material=M['metal_dark'], origin='bottom')
box('monitor', (0.78, 0.06, 0.5), (bx + 0.35, by + 0.2, 1.45), material=M['plate'], bevel=0.015)
box('monitor_screen', (0.7, 0.01, 0.42), (bx + 0.35, by + 0.165, 1.45), material=M['monitor_img'])
box('laptop_base', (0.42, 0.3, 0.025), (bx - 0.45, by - 0.12, 0.95), material=M['metal'])
box('laptop_lid', (0.42, 0.02, 0.3), (bx - 0.45, by + 0.04, 1.1), rot=(math.radians(-12), 0, 0), material=M['metal'])
box('laptop_screen', (0.38, 0.005, 0.26), (bx - 0.45, by + 0.025, 1.1), rot=(math.radians(-12), 0, 0), material=M['screen'])
box('toolbox', (0.5, 0.25, 0.22), (bx - 0.3, by + 0.05, 0.28), material=M['hazard'], bevel=0.02, origin='bottom')
# a half-built machine: a stack of boards and a small arm
box('build_base', (0.36, 0.3, 0.06), (bx - 0.05, by + 0.18, 0.94), material=M['metal_dark'])
box('build_board', (0.3, 0.24, 0.02), (bx - 0.05, by + 0.18, 1.02), material=M['led_green'])
cyl('build_arm_a', 0.025, 0.28, (bx - 0.12, by + 0.15, 1.02), rot=(0, math.radians(20), 0), material=M['metal'], verts=8)
cyl('build_arm_b', 0.02, 0.22, (bx - 0.02, by + 0.15, 1.28), rot=(0, math.radians(-60), 0), material=M['metal'], verts=8)
tube('bench_cable', catenary((bx + 0.35, by + 0.25, 1.2), (bx + 0.95, by + 0.5, 0.0), 0.0), 0.018, M['rubber'])
box('stool_seat', (0.42, 0.42, 0.05), (bx + 0.1, by - 0.85, 0.6), material=M['wood'], bevel=0.01)
for (dx, dy) in [(-0.15, -0.15), (0.15, -0.15), (-0.15, 0.15), (0.15, 0.15)]:
    box('stool_leg', (0.04, 0.04, 0.6), (bx + 0.1 + dx, by - 0.85 + dy, 0), material=M['metal_dark'], origin='bottom')

# ---- AC units (left front)
for i, (ax, ay) in enumerate([(-3.25, -1.75), (-3.25, -0.65)]):
    box(f'ac_{i}', (1.0, 0.8, 0.78), (ax, ay, 0), material=M['metal'], bevel=0.03, origin='bottom')
    cyl(f'ac_fan_{i}', 0.3, 0.04, (ax, ay, 0.78), material=M['metal_dark'], verts=24)
    for k in range(5):
        box(f'ac_grille_{i}_{k}', (0.62, 0.025, 0.02), (ax, ay - 0.24 + k * 0.12, 0.83), material=M['metal_dark'])
    for k in range(6):
        box(f'ac_fin_{i}_{k}', (0.02, 0.78, 0.55), (ax + 0.52, ay, 0.1), material=M['metal_dark'], origin='bottom')
        bpy.context.scene.objects[f'ac_fin_{i}_{k}'].location.x = ax + 0.51
        bpy.context.scene.objects[f'ac_fin_{i}_{k}'].location.y = ay - 0.3 + k * 0.12
tube('ac_pipe', catenary((-2.75, -1.75, 0.5), (-2.2, 0.6, 0.1), 0.0, 6), 0.05, M['metal'])

# ---- vents, pipes, puddles, string lights
for (vx, vy) in [(-0.2, 1.2), (0.9, -2.2), (-2.2, 2.6)]:
    cyl('vent_pipe', 0.12, 0.5, (vx, vy, 0), material=M['metal'], verts=16)
    cyl('vent_cap', 0.24, 0.12, (vx, vy, 0.5), material=M['metal'], verts=16, r2=0.05)
tube('pipe_run', [(-4.0, 2.95, 0.25), (1.2, 2.95, 0.25), (1.2, 2.3, 0.25)], 0.07, M['metal_dark'], handles='VECTOR')
for k, (px_, py_, r_) in enumerate([(-0.4, -0.3, 0.7), (1.3, -1.6, 0.45), (-2.0, 1.0, 0.5)]):
    p = cyl(f'puddle_{k}', r_, 0.01, (px_, py_, 0.012), material=M['puddle'], verts=24)
    p.scale = (1.0, 0.6, 1.0)
lights = catenary((mx - 0.2, my - 0.2, 4.6), (tx + 0.2, ty, 3.0), 0.9, 14)
tube('string_wire', lights, 0.008, M['rubber'], res=4)
for k, p in enumerate(lights[1:-1]):
    cyl(f'bulb_{k}', 0.05, 0.1, (p[0], p[1], p[2] - 0.1), material=M['bulb'], verts=10)
lights2 = catenary((tx + 0.6, ty - 0.6, 2.7), (bx - 0.6, by + 0.3, 2.3), 0.5, 10)
tube('string_wire_2', lights2, 0.008, M['rubber'], res=4)
for k, p in enumerate(lights2[1:-1]):
    cyl(f'bulb2_{k}', 0.045, 0.09, (p[0], p[1], p[2] - 0.1), material=M['bulb'], verts=10)

apply_all()
bake_ao(samples=int(sys.argv[1]) if len(sys.argv) > 1 else 40, distance=1.4,
        skip=('neon', 'bulb', 'led', 'screen', 'win_', 'mast_beacon', 'lamp_door_glow', 'keypad_led', 'build_board'))
export('/home/claude/rework/blender/out/rooftop.glb')
import json
# Blender z-up -> glTF y-up: (x, y, z) -> (x, z, -y)
conv = lambda p: [round(p[0], 4), round(p[2], 4), round(-p[1], 4)]
json.dump({'cables': [[conv(p) for p in c] for c in CABLES], 'focus': conv(tuple(focus))}, open('/home/claude/rework/blender/out/rooftop-paths.json', 'w'))
print('exported')
