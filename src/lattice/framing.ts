export type Rect = { x0: number; y0: number; x1: number; y1: number };
export type Frame = { scale: number; x: number; y: number };
export type Grid = { from: number; step: number; count: number };
export type Support = { hi: number[]; lo: number[] };
export type OrbitTable = { orbit: number; x: Support; y: Support };
export type FramingTables = { grid: { x: Grid; y: Grid }; counts: Record<string, OrbitTable[][]> };
export type View = { width: number; height: number; focal: number; distance: number; lift: number };
type Vec = readonly [number, number, number];

const PLACE_STEPS = 12;
const SCALE_STEPS = 24;
const SETTLED_PX = 0.01;

const width = (r: Rect) => r.x1 - r.x0;
const height = (r: Rect) => r.y1 - r.y0;
const overlaps = (a: Rect, b: Rect) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;
const contains = (outer: Rect, inner: Rect) =>
  outer.x0 <= inner.x0 && outer.y0 <= inner.y0 && outer.x1 >= inner.x1 && outer.y1 >= inner.y1;
const dot = (a: Vec, b: Vec) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

export const expand = (r: Rect, by: number): Rect => ({ x0: r.x0 - by, y0: r.y0 - by, x1: r.x1 + by, y1: r.y1 + by });

export function cameraBasis(orbit: number, distance: number, lift: number) {
  const eye: Vec = [Math.sin(orbit) * distance, lift, Math.cos(orbit) * distance];
  const length = Math.hypot(...eye);
  const forward: Vec = [-eye[0] / length, -eye[1] / length, -eye[2] / length];
  const flat = Math.hypot(forward[0], forward[2]);
  const right: Vec = [-forward[2] / flat, 0, forward[0] / flat];
  const up: Vec = [
    right[1] * forward[2] - right[2] * forward[1],
    right[2] * forward[0] - right[0] * forward[2],
    right[0] * forward[1] - right[1] * forward[0],
  ];
  return { eye, right, up, forward };
}

export function projectPoint(p: Vec, view: View, orbit: number): [number, number] {
  const { eye, right, up, forward } = cameraBasis(orbit, view.distance, view.lift);
  const v: Vec = [p[0] - eye[0], p[1] - eye[1], p[2] - eye[2]];
  const depth = dot(v, forward);
  return [view.width / 2 + (view.focal * dot(v, right)) / depth, view.height / 2 - (view.focal * dot(v, up)) / depth];
}

function crossing(values: number[], grid: Grid, lateral: number, depth: number, scale: number) {
  const at = (i: number) => grid.from + i * grid.step;
  const gap = (i: number) => (at(i) * depth - lateral) / scale - values[i]!;
  let i = 1;
  let last = grid.count - 1;
  while (i < last) {
    const mid = (i + last) >> 1;
    if (gap(mid) < 0) i = mid + 1;
    else last = mid;
  }
  const slope = (values[i]! - values[i - 1]!) / grid.step;
  return (values[i - 1]! - at(i - 1) * slope + lateral / scale) / (depth / scale - slope);
}

export function screenBox(frame: Frame, table: OrbitTable[], grid: FramingTables['grid'], view: View): Rect {
  const box = { x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity };
  for (const { orbit, x, y } of table) {
    const { eye, right, up, forward } = cameraBasis(orbit, view.distance, view.lift);
    const centre: Vec = [frame.x - eye[0], frame.y - eye[1], -eye[2]];
    const depth = dot(centre, forward);
    const across = dot(centre, right);
    const along = dot(centre, up);
    box.x0 = Math.min(box.x0, view.width / 2 + view.focal * crossing(x.lo, grid.x, across, depth, frame.scale));
    box.x1 = Math.max(box.x1, view.width / 2 + view.focal * crossing(x.hi, grid.x, across, depth, frame.scale));
    box.y0 = Math.min(box.y0, view.height / 2 - view.focal * crossing(y.hi, grid.y, along, depth, frame.scale));
    box.y1 = Math.max(box.y1, view.height / 2 - view.focal * crossing(y.lo, grid.y, along, depth, frame.scale));
  }
  return box;
}

export function freeRects(bounds: Rect, obstacles: Rect[]): Rect[] {
  let free = [bounds];
  for (const o of obstacles) {
    const next: Rect[] = [];
    for (const f of free) {
      if (!overlaps(f, o)) {
        next.push(f);
        continue;
      }
      if (o.x0 > f.x0) next.push({ ...f, x1: o.x0 });
      if (o.x1 < f.x1) next.push({ ...f, x0: o.x1 });
      if (o.y0 > f.y0) next.push({ ...f, y1: o.y0 });
      if (o.y1 < f.y1) next.push({ ...f, y0: o.y1 });
    }
    free = next.filter(
      (r, i) => width(r) > 0 && height(r) > 0 && !next.some((q, j) => j !== i && contains(q, r) && (!contains(r, q) || j < i)),
    );
  }
  return free;
}

type BoxOf = (frame: Frame) => Rect;

function place(frame: Frame, boxOf: BoxOf, pxPerUnit: number, free: Rect): Frame | undefined {
  let { x, y } = frame;
  for (let i = 0; i < PLACE_STEPS; i++) {
    const box = boxOf({ scale: frame.scale, x, y });
    if (width(box) > width(free) || height(box) > height(free)) return undefined;
    if (contains(free, box)) return { scale: frame.scale, x, y };
    const dx = box.x0 < free.x0 ? free.x0 - box.x0 : box.x1 > free.x1 ? free.x1 - box.x1 : 0;
    const dy = box.y0 < free.y0 ? free.y0 - box.y0 : box.y1 > free.y1 ? free.y1 - box.y1 : 0;
    x += (dx + Math.sign(dx) * SETTLED_PX) / pxPerUnit;
    y -= (dy + Math.sign(dy) * SETTLED_PX) / pxPerUnit;
  }
  return contains(free, boxOf({ scale: frame.scale, x, y })) ? { scale: frame.scale, x, y } : undefined;
}

export function fitFrame(target: Frame, boxOf: BoxOf, pxPerUnit: number, bounds: Rect, obstacles: Rect[]): Frame {
  const wanted = boxOf(target);
  if (contains(bounds, wanted) && !obstacles.some((o) => overlaps(o, wanted))) return target;

  let best: { frame: Frame; moved: number } | undefined;
  for (const free of freeRects(bounds, obstacles)) {
    let lo = 0;
    let hi = target.scale;
    let fitted: Frame | undefined;
    for (let i = 0; i < SCALE_STEPS; i++) {
      const mid = (lo + hi) / 2;
      const placed = place({ ...target, scale: mid }, boxOf, pxPerUnit, free);
      if (placed) {
        lo = mid;
        fitted = placed;
      } else hi = mid;
    }
    if (!fitted) continue;
    const moved = Math.hypot(fitted.x - target.x, fitted.y - target.y) * pxPerUnit;
    const larger = !best || fitted.scale > best.frame.scale * (1 + 1e-6);
    const tied = best && Math.abs(fitted.scale - best.frame.scale) <= best.frame.scale * 1e-6;
    if (larger || (tied && moved < best!.moved)) best = { frame: fitted, moved };
  }
  return best?.frame ?? target;
}
