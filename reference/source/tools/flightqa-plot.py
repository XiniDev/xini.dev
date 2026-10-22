#!/usr/bin/env python3
"""Top-down map for flight QA: solid parts shaded by height, stops with their view lines, every leg's
camera path coloured by leg, samples closer than the clearance limit marked in red. A second panel
shows clearance and rotation speed over time for each leg."""
import json, sys, math
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle

src, out = sys.argv[1], sys.argv[2]
lim = float(sys.argv[3]) if len(sys.argv) > 3 else 14
D = json.load(open(src))
fig = plt.figure(figsize=(17, 11), dpi=110)
ax = fig.add_axes([0.03, 0.04, 0.6, 0.92])
ax.set_facecolor('#0b1715')
for b in D['boxes']:
    x0, y0, z0, x1, y1, z1, name = b
    if abs(x0) > 1500 or abs(z0) > 1500:
        continue
    h = max(0.0, min(1.0, y1 / 320))
    ax.add_patch(Rectangle((x0, z0), x1 - x0, z1 - z0, facecolor=(0.3 + 0.6 * h, 0.35 + 0.45 * h, 0.3 + 0.2 * h, 0.35 + 0.4 * h), edgecolor='none'))
cols = ['#ffd166', '#06d6a0', '#ef476f', '#4cc9f0', '#f78c6b', '#c77dff', '#90be6d', '#f9c74f']
for k, L in enumerate(D['out']):
    S = L['samples']
    c = cols[k % len(cols)]
    xs = [s[1] for s in S]; zs = [s[3] for s in S]
    ax.plot(xs, zs, '-', color=c, lw=1.6, label=f"{L['a']}->{L['b']}  {L['dur']:.2f}s")
    for s in S[::12]:
        ax.plot([s[1], s[1] + (s[4] - s[1]) * 0.18], [s[3], s[3] + (s[6] - s[3]) * 0.18], '-', color=c, lw=0.5, alpha=0.6)
    bad = [s for s in S if s[7] < lim]
    if bad:
        ax.plot([s[1] for s in bad], [s[3] for s in bad], 'o', color='#ff2020', ms=3)
for i, s in enumerate(D['stops']):
    p, t = s['p'], s['t']
    ax.plot([p[0]], [p[2]], 'o', color='white', ms=6)
    ax.plot([p[0], t[0]], [p[2], t[2]], '--', color='white', lw=0.8, alpha=0.7)
    ax.text(p[0] + 12, p[2] + 12, f"{i} {s['id']}  y{p[1]:.0f}", color='white', fontsize=9)
ax.set_xlim(-1250, 1050); ax.set_ylim(950, -950)
ax.set_aspect('equal'); ax.grid(color='#ffffff', alpha=0.06)
ax.legend(loc='lower left', fontsize=8, facecolor='#132622', labelcolor='white')
ax.set_title('top view (x right, z down) - red: clearance under %g' % lim, color='black')
# timelines
n = len(D['out'])
for k, L in enumerate(D['out']):
    a2 = fig.add_axes([0.67, 0.96 - (k + 1) * (0.92 / n) + 0.02, 0.31, 0.92 / n - 0.04])
    S = L['samples']
    t = [s[0] for s in S]
    a2.plot(t, [min(s[7], 200) for s in S], color='#2a9d8f', lw=1.2)
    a2.axhline(lim, color='red', lw=0.7, ls='--')
    a2.set_ylim(0, 200); a2.set_ylabel('clear', fontsize=7)
    a3 = a2.twinx()
    a3.plot(t, [math.degrees(math.hypot(s[9], s[10], s[11])) for s in S], color='#e76f51', lw=1.0)
    a3.set_ylim(0, 160); a3.set_ylabel('deg/s', fontsize=7)
    a2.set_title(f"{L['a']}->{L['b']}  dur {L['dur']:.2f}s", fontsize=8, loc='left')
    a2.tick_params(labelsize=6); a3.tick_params(labelsize=6)
fig.savefig(out)
