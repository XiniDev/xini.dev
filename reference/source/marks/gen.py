"""Mark explorations for the xini.dev rework.
Builds each candidate as clean polygon geometry (shapely), writes SVGs and a JSON of polygons
(reused later to extrude the marks in Blender)."""
import json, math, random
from pathlib import Path
from shapely.geometry import LineString, Polygon, Point, box, MultiPolygon
from shapely.ops import unary_union
from shapely import affinity

OUT = Path(__file__).parent / 'out'
OUT.mkdir(exist_ok=True)
S3 = math.sqrt(3)

def strand(pts, w, join='mitre', limit=4.0):
    return LineString(pts).buffer(w / 2, join_style=join, mitre_limit=limit, cap_style='flat')

def weave(loop_pts, over_pts, w, gap, centre, radius):
    """Closed ribbon along loop_pts; the strand over_pts passes over at centre with a knockout gap."""
    full = strand(loop_pts + [loop_pts[1]], w)          # repeat 2nd point so the closing corner mitres
    over = strand(over_pts, w)
    cut = strand(over_pts, w + 2 * gap).intersection(Point(centre).buffer(radius))
    return unary_union([full.difference(cut), over])

def fit(geom, size=120, pad=8):
    minx, miny, maxx, maxy = geom.bounds
    s = (size - 2 * pad) / max(maxx - minx, maxy - miny)
    g = affinity.scale(geom, s, s, origin=(minx, miny))
    minx, miny, maxx, maxy = g.bounds
    return affinity.translate(g, (size - (maxx - minx)) / 2 - minx, (size - (maxy - miny)) / 2 - miny)

def polys(geom):
    if geom.is_empty: return []
    return list(geom.geoms) if isinstance(geom, MultiPolygon) else [geom]

def path_d(geom):
    d = []
    for p in polys(geom):
        for ring in [p.exterior, *p.interiors]:
            c = list(ring.coords)[:-1]
            d.append('M' + ' L'.join(f'{x:.2f},{y:.2f}' for x, y in c) + ' Z')
    return ' '.join(d)

marks = {}

# 1. LOOP (the old angular infinity, rebuilt as one woven ribbon). b = flat run of each lobe.
def angular_infinity(h=22, b=14, w=10, gap=2.2, cx=60, cy=60):
    a = h / S3
    C = (cx, cy)
    R = [(cx + a, cy - h), (cx + a + b, cy - h), (cx + 2 * a + b, cy), (cx + a + b, cy + h), (cx + a, cy + h)]
    L = [(cx - a, cy - h), (cx - a - b, cy - h), (cx - 2 * a - b, cy), (cx - a - b, cy + h), (cx - a, cy + h)]
    loop = [C, *R, C, *L, C]
    over = [L[4], C, R[0]]
    return weave(loop, over, w, gap, C, w * 1.6)

marks['old-mark'] = angular_infinity(gap=0)                     # baseline: what the old mark reads like
marks['loop-hex'] = angular_infinity()
marks['loop-tri'] = angular_infinity(b=0, h=26, w=11)

# 2. XNI: one closed stroke that holds X, I, N (and Z when turned 90deg) — an infinity with straight sides.
def xni(wd=60, ht=64, w=12, gap=2.6, clip=True, cx=60, cy=60):
    TL, TR, BR, BL = (cx - wd/2, cy - ht/2), (cx + wd/2, cy - ht/2), (cx + wd/2, cy + ht/2), (cx - wd/2, cy + ht/2)
    loop = [TL, BR, TR, BL, TL]
    over = [BL, TR]
    g = weave(loop, over, w, gap, (cx, cy), w * 1.7)
    if clip:
        g = g.intersection(box(cx - wd/2 - w/2, cy - ht/2 - w*0.0, cx + wd/2 + w/2, cy + ht/2 + w*0.0))
    return g

marks['xni-boxed'] = xni()
marks['xni-spiked'] = xni(clip=False, w=11)
marks['xni-solid'] = xni(gap=0)

# 3. FOLD: the infinity as a strip folded at every corner (two tones: front/back). One-colour = hairline creases.
def folded(h=22, b=14, w=10, cx=60, cy=60, crease=1.1):
    a = h / S3
    C = (cx, cy)
    pts = [C, (cx + a, cy - h), (cx + a + b, cy - h), (cx + 2*a + b, cy), (cx + a + b, cy + h), (cx + a, cy + h), C,
           (cx - a, cy - h), (cx - a - b, cy - h), (cx - 2*a - b, cy), (cx - a - b, cy + h), (cx - a, cy + h), C]
    segs = []
    for i in range(len(pts) - 1):
        s = strand([pts[i], pts[i+1]], w, join='mitre')
        segs.append(s)
    front, back = [], []
    for i, s in enumerate(segs):
        (front if i % 2 == 0 else back).append(s)
    full = unary_union(segs)
    # creases: thin cuts across the ribbon at each corner, along the corner bisector
    cuts = []
    for i in range(1, len(pts) - 1):
        p0, p1, p2 = pts[i-1], pts[i], pts[i+1]
        if p1 == C: continue
        v1 = (p0[0]-p1[0], p0[1]-p1[1]); v2 = (p2[0]-p1[0], p2[1]-p1[1])
        n1 = math.hypot(*v1); n2 = math.hypot(*v2)
        bis = (v1[0]/n1 + v2[0]/n2, v1[1]/n1 + v2[1]/n2); nb = math.hypot(*bis) or 1
        bis = (bis[0]/nb, bis[1]/nb)
        cuts.append(strand([(p1[0]-bis[0]*w*1.5, p1[1]-bis[1]*w*1.5), (p1[0]+bis[0]*w*1.5, p1[1]+bis[1]*w*1.5)], crease))
    mono = full.difference(unary_union(cuts))
    return mono, unary_union(front), unary_union(back)

fold_mono, fold_front, fold_back = folded()
marks['fold'] = fold_mono

# 4. SEAL: hanko-style stamp, XI / NI in white on red, rough stamp edge.
def seal(size=96, cx=60, cy=60, seed=7):
    rnd = random.Random(seed)
    n = 160
    ring = []
    for i in range(n):
        t = i / n * 4
        side, f = int(t), t - int(t)
        s = size / 2
        corners = [(-s, -s), (s, -s), (s, s), (-s, s)]
        x0, y0 = corners[side]; x1, y1 = corners[(side + 1) % 4]
        x, y = x0 + (x1 - x0) * f, y0 + (y1 - y0) * f
        j = rnd.uniform(-0.9, 0.9)
        ring.append((cx + x + (j if side % 2 else 0), cy + y + (0 if side % 2 else j)))
    outer = Polygon(ring)
    stroke = 9.5
    g = size / 2 - 9          # glyph cell half-size area
    c0, c1 = cx - g, cx + g
    m = 3.5                   # gutter between cells
    cw = (2 * g - m) / 2
    def cell(ix, iy):
        x = c0 + ix * (cw + m); y = cy - g + iy * (cw + m)
        return x, y, cw, cw
    letters = []
    # X
    x, y, cw_, ch = cell(0, 0)
    letters.append(strand([(x, y), (x + cw_, y + ch)], stroke).union(strand([(x + cw_, y), (x, y + ch)], stroke)).intersection(box(x, y, x+cw_, y+ch)))
    # I
    x, y, cw_, ch = cell(1, 0)
    letters.append(box(x + cw_/2 - stroke/2, y, x + cw_/2 + stroke/2, y + ch))
    # N
    x, y, cw_, ch = cell(0, 1)
    nn = unary_union([box(x, y, x + stroke, y + ch), box(x + cw_ - stroke, y, x + cw_, y + ch),
                      strand([(x + stroke/2, y), (x + cw_ - stroke/2, y + ch)], stroke)]).intersection(box(x, y, x+cw_, y+ch))
    letters.append(nn)
    # I
    x, y, cw_, ch = cell(1, 1)
    letters.append(box(x + cw_/2 - stroke/2, y, x + cw_/2 + stroke/2, y + ch))
    inner_frame = box(cx - size/2 + 4.5, cy - size/2 + 4.5, cx + size/2 - 4.5, cy + size/2 - 4.5).exterior.buffer(1.4)
    return outer.difference(unary_union(letters)).difference(inner_frame)

marks['seal'] = seal()

# 5. FACET X: four long diamonds meeting at the centre (crystal / blade).
def facet_x(L=48, w=16, cx=60, cy=60):
    def blade(angle):
        p = Polygon([(0, 0), (L * 0.42, -w/2), (L, 0), (L * 0.42, w/2)])
        return affinity.translate(affinity.rotate(p, angle, origin=(0, 0)), cx, cy)
    return unary_union([blade(a) for a in (45, 135, 225, 315)])
marks['facet-x'] = facet_x()

# 6. BRUSH X: two dry-brush strokes (many bristles of uneven length).
def brush_x(seed=3, cx=60, cy=60):
    rnd = random.Random(seed)
    parts = []
    for (x0, y0, x1, y1, wmax) in [(26, 22, 96, 98, 17), (94, 26, 28, 96, 14)]:
        n = 26
        dx, dy = x1 - x0, y1 - y0; ln = math.hypot(dx, dy); ux, uy = dx/ln, dy/ln; px, py = -uy, ux
        for i in range(n):
            off = (i / (n - 1) - 0.5) * wmax
            start = rnd.uniform(0, 0.06) + (abs(off) / wmax) * 0.10
            end = 1 - rnd.uniform(0, 0.10) - (abs(off) / wmax) ** 2 * rnd.uniform(0.0, 0.45)
            bw = rnd.uniform(0.55, 1.25)
            # slight curve
            pts = []
            for k in range(9):
                t = start + (end - start) * k / 8
                bend = math.sin(t * math.pi) * 2.4
                pts.append((x0 + dx * t + px * (off + bend), y0 + dy * t + py * (off + bend)))
            parts.append(LineString(pts).buffer(bw, cap_style='round'))
    return unary_union(parts)
marks['brush-x'] = brush_x()

data = {}
for name, g in marks.items():
    g = fit(g)
    data[name] = [[list(map(list, p.exterior.coords))] + [list(map(list, r.coords)) for r in p.interiors] for p in polys(g)]
    (OUT / f'{name}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><path fill-rule="evenodd" d="{path_d(g)}"/></svg>')

# two-tone fold version (front/back faces of the folded strip)
ff, fb = fit(unary_union([fold_front, fold_back])), None
mono = marks['fold']
minx, miny, maxx, maxy = unary_union([fold_front, fold_back]).bounds
s = 104 / max(maxx - minx, maxy - miny)
def tf(g):
    g = affinity.scale(g, s, s, origin=(minx, miny))
    return affinity.translate(g, 8 + (104 - (maxx - minx) * s) / 2, 8 + (104 - (maxy - miny) * s) / 2)
(OUT / 'fold-2tone.svg').write_text(
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><path fill="#7a1" fill-rule="evenodd" d="{path_d(tf(fold_back))}"/>'
    f'<path fill="#bf3" fill-rule="evenodd" d="{path_d(tf(fold_front))}"/></svg>')
(OUT / 'marks.json').write_text(json.dumps(data))
print('wrote', len(marks), 'marks')
