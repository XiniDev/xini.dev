// The project list's GitHub data: every repo the account owns, newest push first, in the shape of
// src/shared/data/github-snapshot.json. Used by the Vite plugin below at build time and by snapshot-github.mjs.
// GitHub is never a reason for a build to fail: on any error the committed snapshot is used.
import { readFileSync } from 'node:fs';
import path from 'node:path';

export const SNAPSHOT = 'src/shared/data/github-snapshot.json';
const API = process.env.GITHUB_API_URL || 'https://api.github.com';

const text = (v) => (typeof v === 'string' && v.trim() ? v.trim() : null);
export const toRepo = (r) => ({
  name: String(r.name),
  full_name: String(r.full_name),
  description: text(r.description),
  html_url: String(r.html_url),
  homepage: text(r.homepage),
  language: text(r.language),
  topics: Array.isArray(r.topics) ? r.topics.map(String) : [],
  pushed_at: String(r.pushed_at),
  archived: r.archived === true,
  fork: r.fork === true,
});

const nextLink = (link) => link?.split(',').map((p) => p.match(/<([^>]+)>\s*;\s*rel="next"/)).find(Boolean)?.[1];

export async function fetchSnapshot({ username, token } = {}) {
  username ||= process.env.GITHUB_USERNAME?.trim() || 'XiniDev';
  token ||= process.env.GITHUB_TOKEN?.trim() || undefined;
  const headers = { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'User-Agent': 'xini.dev-build', ...(token ? { Authorization: `Bearer ${token}` } : {}) };
  let url = `${API}/users/${encodeURIComponent(username)}/repos?type=owner&sort=pushed&per_page=100`;
  const repos = [];
  while (url) {
    const res = await fetch(url, { headers, signal: AbortSignal.timeout(15000) });
    if (!res.ok) throw new Error(`GitHub responded ${res.status} ${res.statusText}${res.headers.get('x-ratelimit-remaining') === '0' ? ' (rate limited)' : ''}`);
    const body = await res.json();
    if (!Array.isArray(body)) throw new Error('GitHub returned a non-list');
    repos.push(...body.map(toRepo));
    url = nextLink(res.headers.get('link'));
  }
  return { fetchedAt: new Date().toISOString(), username, repos };
}

// Vite plugin: on `vite build` with GITHUB_TOKEN set, the snapshot import is served from a live fetch instead of
// the committed file (which never changes during a build). Without a token, or if GitHub fails, the committed
// snapshot is used and the reason is logged. The dev server always uses the committed snapshot.
export function githubSnapshot() {
  let isBuild = false, root = process.cwd(), live = null;
  return {
    name: 'xini-github-snapshot',
    enforce: 'pre',
    configResolved(config) { isBuild = config.command === 'build'; root = config.root; },
    async buildStart() {
      if (!isBuild) return;
      const committed = JSON.parse(readFileSync(path.resolve(root, SNAPSHOT), 'utf8'));
      if (!process.env.GITHUB_TOKEN?.trim()) { console.log(`[github] source=snapshot (no GITHUB_TOKEN) repos=${committed.repos.length} fetchedAt=${committed.fetchedAt}`); return; }
      try {
        live = await fetchSnapshot();
        console.log(`[github] source=live repos=${live.repos.length}`);
      } catch (error) {
        live = null;
        console.warn(`[github] source=snapshot (${error.message}) repos=${committed.repos.length} fetchedAt=${committed.fetchedAt}`);
      }
    },
    load(id) {
      if (live && id.split('?')[0].replace(/\\/g, '/').endsWith(SNAPSHOT)) return JSON.stringify(live);
    },
  };
}
