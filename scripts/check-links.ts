import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const OUT = process.argv[2] ?? 'out';
const PAGES = ['index.html', '404.html'];
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36';

type Link = { page: string; url: string };

const decode = (s: string) => s.replace(/&amp;/g, '&').replace(/&#38;/g, '&');
const redirects = existsSync(join(OUT, '_redirects'))
  ? readFileSync(join(OUT, '_redirects'), 'utf8')
      .split('\n')
      .map((l) => l.trim().split(/\s+/)[0])
      .filter((s): s is string => !!s && !s.startsWith('#'))
  : [];

const links: Link[] = [];
const ids = new Map<string, Set<string>>();
for (const page of PAGES) {
  const html = readFileSync(join(OUT, page), 'utf8');
  ids.set(page, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]!)));
  for (const m of html.matchAll(/\s(?:href|src|data-src)="([^"]*)"/g)) links.push({ page, url: decode(m[1]!) });
  for (const m of html.matchAll(/\s(?:srcset|data-srcset)="([^"]*)"/g))
    for (const part of m[1]!.split(',')) links.push({ page, url: decode(part.trim().split(/\s+/)[0]!) });
}

const problems: string[] = [];
const external = new Map<string, string[]>();

for (const { page, url } of links) {
  if (url === '' || url === '#') problems.push(`${page}: placeholder link "${url}"`);
  else if (/^javascript:/i.test(url)) problems.push(`${page}: javascript link ${url}`);
  else if (url.startsWith('#')) {
    if (!ids.get(page)!.has(url.slice(1))) problems.push(`${page}: fragment ${url} has no target`);
  } else if (url.startsWith('mailto:')) {
    if (!/^mailto:[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(url)) problems.push(`${page}: bad mailto ${url}`);
  } else if (/^https?:\/\//.test(url)) {
    external.set(url, [...(external.get(url) ?? []), page]);
  } else if (url.startsWith('/')) {
    const path = url.split(/[?#]/)[0]!;
    const file = join(OUT, path);
    const ok = existsSync(file) || existsSync(join(file, 'index.html')) || path === '/' || redirects.includes(path);
    if (!ok) problems.push(`${page}: missing internal file ${url}`);
  } else problems.push(`${page}: relative link ${url} (use absolute paths)`);
}

async function check(url: string) {
  for (const method of ['HEAD', 'GET'] as const) {
    try {
      const res = await fetch(url, { method, redirect: 'follow', headers: { 'User-Agent': UA, Accept: 'text/html,*/*' } });
      if (res.status < 400) return `${res.status}${res.redirected ? ` via ${res.url}` : ''}`;
      if (method === 'GET') return `FAIL ${res.status}`;
    } catch (error) {
      if (method === 'GET') return `FAIL ${error instanceof Error ? error.message : String(error)}`;
    }
  }
  return 'FAIL';
}

const BOT_WALLED = new Set(['www.linkedin.com']);
const unverifiable: string[] = [];
const results = await Promise.all([...external.keys()].map(async (url) => [url, await check(url)] as const));
for (const [url, status] of results) {
  if (status === 'FAIL 999' && BOT_WALLED.has(new URL(url).hostname)) {
    unverifiable.push(url);
    console.log(`n/a   ${url}  999: LinkedIn answers every automated request with 999, real profile or not`);
    continue;
  }
  console.log(`${status.startsWith('FAIL') ? 'FAIL' : 'ok  '}  ${url}  ${status}`);
  if (status.startsWith('FAIL')) problems.push(`dead external link ${url} (${status})`);
}

console.log(`\n${links.length} links on ${PAGES.length} pages, ${external.size} external URLs checked.`);
if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`No placeholder, missing or dead links.${unverifiable.length ? ` Unverifiable by machine: ${unverifiable.join(', ')}` : ''}`);
