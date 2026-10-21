"""2D logo of the folded-strip mark (matches the 3D FOLD object): four strip segments clipped by
their creases, drawn in layer order, with a hairline gap so each fold reads in one colour."""
import math, json
from pathlib import Path
from shapely.geometry import Polygon
from shapely.ops import unary_union
from shapely import affinity

W, H, w = 1.56, 1.62, 0.4
P = [(-W/2, H/2), (W/2, -H/2), (W/2, H/2), (-W/2, -H/2)]
n = len(P)
def sub(a, b): return (a[0]-b[0], a[1]-b[1])
def add(a, b): return (a[0]+b[0], a[1]+b[1])
def mul(a, s): return (a[0]*s, a[1]*s)
def norm(a): l = math.hypot(*a); return (a[0]/l, a[1]/l)
d = [norm(sub(P[(i+1) % n], P[i])) for i in range(n)]
nr = [(-v[1], v[0]) for v in d]
cr = []
for i in range(n):
    c = add(d[(i-1) % n], d[i]); cr.append((P[i], norm(c)))
def isect(p, dd, q, e):
    den = dd[0]*e[1] - dd[1]*e[0]
    s = ((q[0]-p[0])*e[1] - (q[1]-p[1])*e[0]) / den
    return (p[0]+dd[0]*s, p[1]+dd[1]*s)
segs = []
for i in range(n):
    (p0, c0), (p1, c1) = cr[i], cr[(i+1) % n]
    ea, eb = add(P[i], mul(nr[i], w/2)), add(P[i], mul(nr[i], -w/2))
    q = [isect(ea, d[i], p0, c0), isect(ea, d[i], p1, c1), isect(eb, d[i], p1, c1), isect(eb, d[i], p0, c0)]
    segs.append(Polygon(q))
layers = [0, 1, 2, 1]
order = sorted(range(n), key=lambda i: (layers[i], i))
gap = 0.035
shapes = []  # (poly, side) side 0 = front (signal), 1 = back (ink) — segments alternate sides at each fold
for i in order:
    poly = segs[i]
    # cut a hairline from everything already drawn underneath
    shapes = [(s.difference(poly.buffer(gap, join_style='mitre')), k) for s, k in shapes]
    shapes.append((poly, i % 2))
allg = unary_union([s for s, _ in shapes])
minx, miny, maxx, maxy = allg.bounds
sc = 104 / max(maxx-minx, maxy-miny)
_ref = affinity.scale(allg, sc, -sc, origin=(0, 0)).bounds
def tf(g):
    g = affinity.scale(g, sc, -sc, origin=(0, 0))
    mx, my, Mx, My = _ref
    return affinity.translate(g, 60 - (mx+Mx)/2, 60 - (my+My)/2)
def d_of(g):
    out = []
    geoms = getattr(g, 'geoms', [g])
    for p in geoms:
        if p.is_empty: continue
        for ring in [p.exterior, *p.interiors]:
            c = list(ring.coords)[:-1]
            out.append('M' + ' L'.join(f'{x:.2f},{y:.2f}' for x, y in c) + ' Z')
    return ' '.join(out)
front = unary_union([tf(s) for s, k in shapes if k == 0])
back = unary_union([tf(s) for s, k in shapes if k == 1])
mono = unary_union([front, back])
out = Path('out')
out.joinpath('xni-fold.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><path fill-rule="evenodd" d="{d_of(mono)}"/></svg>')
out.joinpath('xni-fold-2tone.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><path fill="#2a2a33" d="{d_of(back)}"/><path fill="#3de08f" d="{d_of(front)}"/></svg>')
json.dump({'mono': d_of(mono), 'front': d_of(front), 'back': d_of(back)}, open(out / 'xni-fold.json', 'w'))
print('ok')
