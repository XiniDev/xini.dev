// Step navigation between anchors ("panel turns"). One gesture = one step, so nobody scrolls past a section.
// Wheel / trackpad, touch swipes, keyboard, rail links and URL hashes all land on exact anchors.

export class Nav {
  /**
   * @param {object} o
   * @param {string[]} o.ids        section ids in order (used for hashes)
   * @param {(to:number, from:number, how:string) => number} o.onChange  returns the transition length in ms
   * @param {(dir:number) => boolean} [o.onSide]  horizontal step inside the current section (projects); return true if handled
   * @param {(dir:number) => boolean} [o.onStep]  a scroll step the current section takes before the page moves on; true if taken
   * @param {number} [o.start]
   */
  constructor({ ids, onChange, onSide, onStep, start = 0, root = window, wrap = false }) {
    this.ids = ids; this.wrap = wrap; // wrap: stepping on from the last section returns to the first
    this.onChange = onChange;
    this.onSide = onSide || (() => false);
    this.onStep = onStep || (() => false);
    this.index = start;
    this.lockUntil = 0;
    this.wheelAcc = 0;
    this.lastWheel = 0;
    this.gestureUsed = false;
    this.touch = null;
    this.enabled = true;
    this.listeners = new Set();
    root.addEventListener('wheel', (e) => this.wheel(e), { passive: false });
    root.addEventListener('keydown', (e) => this.key(e));
    root.addEventListener('touchstart', (e) => this.touchStart(e), { passive: true });
    root.addEventListener('touchmove', (e) => this.touchMove(e), { passive: false });
    root.addEventListener('touchend', (e) => this.touchEnd(e), { passive: true });
    window.addEventListener('hashchange', () => this.fromHash('hash'));
    document.addEventListener('click', (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href').slice(1);
      const i = this.indexOf(id);
      if (i < 0) return;
      e.preventDefault();
      this.go(i, 'link');
      history.replaceState(null, '', '#' + id);
    });
    // keyboard users tabbing into another section take the page with them
    document.addEventListener('focusin', (e) => {
      const sec = e.target.closest && e.target.closest('[data-sec]');
      if (!sec) return;
      const i = this.indexOf(sec.dataset.sec);
      if (i >= 0 && i !== this.index) this.go(i, 'focus', true);
    });
  }
  on(fn) { this.listeners.add(fn); return () => this.listeners.delete(fn); }
  indexOf(id) {
    const i = this.ids.indexOf(id);
    if (i >= 0) return i;
    const el = document.getElementById(id);
    const sec = el && el.closest('[data-sec]');
    return sec ? this.ids.indexOf(sec.dataset.sec) : -1;
  }
  fromHash(how = 'hash') {
    const id = location.hash.slice(1);
    if (!id) return false;
    const i = this.indexOf(id);
    if (i >= 0 && i !== this.index) { this.go(i, how, how === 'initial'); return true; }
    return false;
  }
  busy() { return performance.now() < this.lockUntil; }
  go(i, how = 'api', force = false) {
    i = Math.max(0, Math.min(this.ids.length - 1, i));
    if (i === this.index || !this.enabled) return false;
    if (this.busy() && !force) return false;
    const from = this.index;
    this.index = i;
    const ms = this.onChange(i, from, how) ?? 900;
    this.lockUntil = performance.now() + ms;
    for (const fn of this.listeners) fn(i, from, how);
    return true;
  }
  step(d, how) {
    if (!this.enabled || this.busy()) return false;
    if (this.onStep(d, how)) { this.lockUntil = performance.now() + 450; return true; }
    const n = this.ids.length; const i = this.index + d; return this.go(this.wrap && i >= n ? 0 : i, how);
  }
  scrollableTarget(e) {
    // let inner scrollers (the project index drawer) scroll natively
    let el = e.target;
    while (el && el !== document.body) {
      if (el.dataset && el.dataset.scroll !== undefined && el.scrollHeight > el.clientHeight + 2) return el;
      el = el.parentElement;
    }
    return null;
  }
  wheel(e) {
    if (!this.enabled) return;
    const inner = this.scrollableTarget(e);
    if (inner) {
      const atTop = inner.scrollTop <= 0, atEnd = inner.scrollTop + inner.clientHeight >= inner.scrollHeight - 1;
      if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atEnd)) return;
    }
    e.preventDefault();
    const now = performance.now();
    const dx = e.deltaX, dy = e.deltaY;
    if (now - this.lastWheel > 180) { this.gestureUsed = false; this.wheelAcc = 0; this.sideAcc = 0; }
    this.lastWheel = now;
    if (this.gestureUsed) return;
    if (Math.abs(dx) > Math.abs(dy)) {
      this.sideAcc = (this.sideAcc || 0) + dx;
      if (Math.abs(this.sideAcc) > 60) { if (this.onSide(Math.sign(this.sideAcc))) this.gestureUsed = true; this.sideAcc = 0; }
      return;
    }
    this.wheelAcc += dy * (e.deltaMode === 1 ? 30 : 1);
    if (Math.abs(this.wheelAcc) > 36 && !this.busy()) {
      if (this.step(Math.sign(this.wheelAcc), 'wheel')) this.gestureUsed = true;
      this.wheelAcc = 0;
    }
  }
  key(e) {
    if (!this.enabled || e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    const t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    let d = 0;
    if (e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) d = 1;
    else if (e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) d = -1;
    else if (e.key === 'Home') { e.preventDefault(); this.go(0, 'key'); return; }
    else if (e.key === 'End') { e.preventDefault(); this.go(this.ids.length - 1, 'key'); return; }
    else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      if (this.onSide(e.key === 'ArrowRight' ? 1 : -1)) e.preventDefault();
      return;
    }
    if (d) {
      if (t && t.closest && t.closest('[data-scroll]')) return;
      e.preventDefault(); this.step(d, 'key');
    }
  }
  touchStart(e) {
    if (e.touches.length !== 1) { this.touch = null; return; }
    const p = e.touches[0];
    this.touch = { x: p.clientX, y: p.clientY, t: performance.now(), inner: this.scrollableTarget(e), done: false };
  }
  touchMove(e) {
    if (!this.touch || this.touch.done) return;
    const p = e.touches[0];
    const dx = p.clientX - this.touch.x, dy = p.clientY - this.touch.y;
    if (this.touch.inner) return;
    if (Math.abs(dy) > 8 || Math.abs(dx) > 8) e.preventDefault();
  }
  touchEnd(e) {
    const s = this.touch; this.touch = null;
    if (!s || s.inner) return;
    const p = e.changedTouches[0];
    const dx = p.clientX - s.x, dy = p.clientY - s.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 44) return;
    if (Math.abs(dx) > Math.abs(dy) * 1.2) { this.onSide(dx < 0 ? 1 : -1); return; }
    this.step(dy < 0 ? 1 : -1, 'swipe');
  }
}
