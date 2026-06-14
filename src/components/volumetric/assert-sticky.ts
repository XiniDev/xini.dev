export function assertSticky(el: HTMLElement | null): void {
  if (process.env.NODE_ENV === "production" || !el) return;

  const offenders: string[] = [];
  let node = el.parentElement;

  while (node && node !== document.body) {
    const s = getComputedStyle(node);
    const tag = `<${node.tagName.toLowerCase()}${node.id ? `#${node.id}` : ""}>`;
    const overflow = `${s.overflow} ${s.overflowX} ${s.overflowY}`;

    if (/(hidden|auto|clip|scroll)/.test(overflow)) {
      offenders.push(`${tag} overflow:${overflow.trim()}`);
    }
    if (s.transform !== "none") offenders.push(`${tag} transform`);
    if (s.filter !== "none") offenders.push(`${tag} filter`);
    if (s.perspective !== "none") offenders.push(`${tag} perspective`);
    if (s.contain && s.contain !== "none" && s.contain !== "normal") {
      offenders.push(`${tag} contain:${s.contain}`);
    }
    node = node.parentElement;
  }

  if (offenders.length) {
    console.warn(
      "[assertSticky] position:sticky may be broken by ancestor(s):\n  " +
        offenders.join("\n  ")
    );
  }
}
