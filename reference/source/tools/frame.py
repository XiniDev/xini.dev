#!/usr/bin/env python3
"""Framing helper: project named world points through a camera pose (three.js conventions) and print
where they land in a 1200x750 frame, so a stop can be framed before spending a capture on it.
usage: frame.py '{"p":[x,y,z],"t":[x,y,z],"fov":50,"aspect":1.6,"pts":{"name":[x,y,z],...}}'"""
import json, math, sys

def look(p, t):
    f = [t[i] - p[i] for i in range(3)]
    n = math.sqrt(sum(v * v for v in f)); f = [v / n for v in f]
    up = [0, 1, 0]
    r = [f[1] * up[2] - f[2] * up[1], f[2] * up[0] - f[0] * up[2], f[0] * up[1] - f[1] * up[0]]
    n = math.sqrt(sum(v * v for v in r)); r = [v / n for v in r]
    u = [r[1] * f[2] - r[2] * f[1], r[2] * f[0] - r[0] * f[2], r[0] * f[1] - r[1] * f[0]]
    return f, r, u

def project(p, t, fov, aspect, q, W=1200, H=750):
    f, r, u = look(p, t)
    d = [q[i] - p[i] for i in range(3)]
    z = sum(d[i] * f[i] for i in range(3))
    if z <= 0: return None
    x = sum(d[i] * r[i] for i in range(3)); y = sum(d[i] * u[i] for i in range(3))
    th = math.tan(math.radians(fov) / 2)
    nx, ny = x / (z * th * aspect), y / (z * th)
    return ((nx * 0.5 + 0.5) * W, (1 - (ny * 0.5 + 0.5)) * H, z)

if __name__ == '__main__':
    a = json.loads(sys.argv[1])
    p, t, fov, asp = a['p'], a['t'], a.get('fov', 50), a.get('aspect', 1.6)
    f, r, u = look(p, t)
    pitch = math.degrees(math.asin(f[1]))
    print(f"pitch {pitch:.1f} deg, heading {math.degrees(math.atan2(f[0], -f[2])):.1f} deg")
    for k, q in a.get('pts', {}).items():
        s = project(p, t, fov, asp, q)
        print(f"{k:>14}: " + ("behind" if s is None else f"x {s[0]:7.0f}  y {s[1]:7.0f}  dist {s[2]:6.0f}"))
