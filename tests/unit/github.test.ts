import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import type { Project } from '../../src/data/projects.ts';
import {
  fetchAll,
  fetchOwnerRepos,
  forDisplay,
  loadRepos,
  merge,
  nextLink,
  orderProjects,
  updatedLabel,
  type FetchLike,
  type Item,
  type Repo,
} from '../../src/lib/github.ts';

const repo = (name: string, pushed: string, extra: Partial<Repo> = {}): Repo => ({
  name,
  full_name: `XiniDev/${name}`,
  description: `${name} description`,
  html_url: `https://github.com/XiniDev/${name}`,
  homepage: null,
  language: 'TypeScript',
  topics: [],
  pushed_at: pushed,
  archived: false,
  fork: false,
  ...extra,
});

const item = (name: string, date: string, archived = false): Item => ({
  key: name,
  name,
  description: '',
  url: `https://example.com/${name}`,
  language: null,
  date,
  archived,
});

const NOW = new Date('2026-10-02T12:00:00Z');

function fakeFetch(pages: Record<string, { body: unknown; link?: string; status?: number }>): FetchLike & { calls: string[]; auth: (string | undefined)[] } {
  const calls: string[] = [];
  const auth: (string | undefined)[] = [];
  const impl = (async (url: string, init: { headers: Record<string, string> }) => {
    calls.push(url);
    auth.push(init.headers.Authorization);
    const page = pages[url];
    if (!page) throw new Error(`unexpected request ${url}`);
    const status = page.status ?? 200;
    return {
      ok: status < 400,
      status,
      statusText: status < 400 ? 'OK' : 'Forbidden',
      headers: { get: (h: string) => (h.toLowerCase() === 'link' ? (page.link ?? null) : null) },
      json: async () => page.body,
    };
  }) as FetchLike;
  return Object.assign(impl, { calls, auth });
}

describe('orderProjects', () => {
  it('puts the newest push first', () => {
    const { recent } = orderProjects([item('a', '2026-01-01T00:00:00Z'), item('b', '2026-09-01T00:00:00Z'), item('c', '2026-05-01T00:00:00Z')], { now: NOW });
    expect(recent.map((i) => i.name)).toEqual(['b', 'c', 'a']);
  });

  it('sends archived items and anything older than legacyMonths to older, newest first', () => {
    const { recent, older } = orderProjects(
      [
        item('fresh', '2026-09-01T00:00:00Z'),
        item('archived', '2026-08-01T00:00:00Z', true),
        item('stale', '2024-09-01T00:00:00Z'),
        item('edge', '2024-10-02T12:00:00Z'),
      ],
      { now: NOW, legacyMonths: 24 },
    );
    expect(recent.map((i) => i.name)).toEqual(['fresh', 'edge']);
    expect(older.map((i) => i.name)).toEqual(['archived', 'stale']);
  });

  it('breaks ties alphabetically by name', () => {
    const date = '2026-03-01T00:00:00Z';
    const { recent } = orderProjects([item('beta', date), item('Alpha', date), item('gamma', date)], { now: NOW });
    expect(recent.map((i) => i.name)).toEqual(['Alpha', 'beta', 'gamma']);
  });

  it('forDisplay keeps 12 in recent and moves the rest to the top of older', () => {
    const many = Array.from({ length: 14 }, (_, i) => item(`r${String(i).padStart(2, '0')}`, `2026-09-${String(28 - i).padStart(2, '0')}T00:00:00Z`));
    const shown = forDisplay(orderProjects([...many, item('old', '2020-01-01T00:00:00Z')], { now: NOW }));
    expect(shown.recent).toHaveLength(12);
    expect(shown.older.map((i) => i.name)).toEqual(['r12', 'r13', 'old']);
  });
});

describe('merge', () => {
  const curated: Project[] = [
    { slug: 'feat', name: 'Featured', summary: 'Featured summary', tags: [], repo: 'XiniDev/feat', featured: 1 },
    { slug: 'nice', name: 'Nice Name', summary: 'Curated summary.', tags: [], repo: 'XiniDev/nice', url: 'https://nice.example' },
    { slug: 'secret', name: 'Secret', summary: 'Hidden', tags: [], repo: 'XiniDev/secret', hidden: true },
    { slug: 'dated', name: 'Dated', summary: 'No repo, has a date.', tags: [], url: 'https://dated.example', updated: '2025-04' },
    { slug: 'undated', name: 'Undated', summary: 'No repo, no date.', tags: [], url: 'https://undated.example' },
  ];
  const repos = [
    repo('feat', '2026-09-30T00:00:00Z'),
    repo('nice', '2026-09-01T00:00:00Z', { language: 'Rust' }),
    repo('secret', '2026-09-02T00:00:00Z'),
    repo('forked', '2026-09-03T00:00:00Z', { fork: true }),
    repo('plain', '2026-08-01T00:00:00Z', { homepage: 'https://plain.example' }),
    repo('bare', '2026-07-01T00:00:00Z', { description: null }),
    repo('configured-away', '2026-06-01T00:00:00Z'),
  ];
  const { items, warnings } = merge(repos, curated, { hiddenRepos: ['configured-away'] });
  const byName = Object.fromEntries(items.map((i) => [i.name, i]));

  it('uses curated name, summary and link with GitHub push date and language for matched repos', () => {
    expect(byName['Nice Name']).toEqual({
      key: 'XiniDev/nice',
      name: 'Nice Name',
      description: 'Curated summary.',
      url: 'https://nice.example',
      language: 'Rust',
      date: '2026-09-01T00:00:00Z',
      archived: false,
    });
  });

  it("uses GitHub's name, description and homepage for unmatched repos", () => {
    expect(byName.plain).toMatchObject({ description: 'plain description', url: 'https://plain.example' });
    expect(byName.bare).toMatchObject({ description: '', url: 'https://github.com/XiniDev/bare' });
  });

  it('never repeats featured projects and excludes forks, hidden projects and hiddenRepos', () => {
    expect(Object.keys(byName)).not.toContain('Featured');
    expect(Object.keys(byName)).not.toContain('Secret');
    expect(Object.keys(byName)).not.toContain('forked');
    expect(Object.keys(byName)).not.toContain('configured-away');
  });

  it('includes a project without a repo only when it has updated', () => {
    expect(byName.Dated).toMatchObject({ date: '2025-04-01T00:00:00Z', url: 'https://dated.example' });
    expect(Object.keys(byName)).not.toContain('Undated');
  });

  it('warns when a curated repo matches nothing', () => {
    const { warnings: w } = merge([], [{ slug: 'x', name: 'X', summary: '', tags: [], repo: 'XiniDev/renamed' }]);
    expect(w).toEqual(['curated repo XiniDev/renamed (X) matched no GitHub repository']);
    expect(warnings).toEqual([]);
  });
});

describe('fetching', () => {
  const API = 'https://api.test';
  const first = `${API}/users/XiniDev/repos?type=owner&sort=pushed&per_page=100`;
  const second = `${API}/user/1/repos?type=owner&sort=pushed&per_page=100&page=2`;

  it('follows pagination and merges every page', async () => {
    const fetchImpl = fakeFetch({
      [first]: { body: [repo('a', '2026-09-01T00:00:00Z')], link: `<${second}>; rel="next", <${second}>; rel="last"` },
      [second]: { body: [repo('b', '2026-08-01T00:00:00Z')] },
    });
    const repos = await fetchOwnerRepos('XiniDev', { api: API, fetchImpl, token: 't0k' });
    expect(repos.map((r) => r.name)).toEqual(['a', 'b']);
    expect(fetchImpl.calls).toEqual([first, second]);
    expect(fetchImpl.auth).toEqual(['Bearer t0k', 'Bearer t0k']);
  });

  it('fetches curated repos owned by someone else individually', async () => {
    const fetchImpl = fakeFetch({
      [first]: { body: [repo('a', '2026-09-01T00:00:00Z')] },
      [`${API}/repos/Other/thing`]: { body: { ...repo('thing', '2025-01-01T00:00:00Z'), full_name: 'Other/thing' } },
    });
    const repos = await fetchAll('XiniDev', [{ slug: 't', name: 'T', summary: '', tags: [], repo: 'Other/thing' }], { api: API, fetchImpl });
    expect(repos.map((r) => r.full_name)).toEqual(['XiniDev/a', 'Other/thing']);
  });

  it('parses the Link header', () => {
    expect(nextLink('<https://x/2>; rel="next", <https://x/9>; rel="last"')).toBe('https://x/2');
    expect(nextLink('<https://x/1>; rel="prev"')).toBeUndefined();
    expect(nextLink(null)).toBeUndefined();
  });
});

describe('loadRepos and the snapshot', () => {
  const dir = mkdtempSync(join(tmpdir(), 'xini-snapshot-'));
  const snapshotPath = join(dir, 'snapshot.json');
  writeFileSync(snapshotPath, JSON.stringify({ fetchedAt: '2026-10-01T00:00:00Z', username: 'XiniDev', repos: [repo('snap', '2026-09-01T00:00:00Z')] }));
  const base = { username: 'XiniDev', projects: [] as Project[], snapshotPath, api: 'https://api.test' };

  it('uses the snapshot when the fetch throws', async () => {
    const fetchImpl = (async () => {
      throw new Error('getaddrinfo ENOTFOUND api.test');
    }) as FetchLike;
    const loaded = await loadRepos({ ...base, token: 't', fetchImpl });
    expect(loaded.source).toBe('snapshot');
    expect(loaded.reason).toContain('ENOTFOUND');
    expect(loaded.repos.map((r) => r.name)).toEqual(['snap']);
  });

  it('uses the snapshot when GitHub rate-limits', async () => {
    const fetchImpl = fakeFetch({ [`${base.api}/users/XiniDev/repos?type=owner&sort=pushed&per_page=100`]: { body: {}, status: 403 } });
    const loaded = await loadRepos({ ...base, token: 't', fetchImpl });
    expect(loaded.source).toBe('snapshot');
    expect(loaded.reason).toContain('403');
  });

  it('uses the snapshot without a token, and makes no request', async () => {
    const fetchImpl = fakeFetch({});
    const loaded = await loadRepos({ ...base, fetchImpl });
    expect(loaded).toMatchObject({ source: 'snapshot', reason: 'GITHUB_TOKEN is not set' });
    expect(fetchImpl.calls).toEqual([]);
  });

  it('reports none when the snapshot is missing or for another user', async () => {
    const fetchImpl = fakeFetch({});
    expect((await loadRepos({ ...base, snapshotPath: join(dir, 'missing.json'), fetchImpl })).source).toBe('none');
    expect((await loadRepos({ ...base, username: 'someone-else', fetchImpl })).source).toBe('none');
  });
});

describe('updatedLabel', () => {
  it('formats an absolute month and year', () => {
    expect(updatedLabel('2026-09-30T23:59:59Z')).toBe('Updated Sep 2026');
    expect(updatedLabel('2024-05-21T08:00:00Z')).toBe('Updated May 2024');
  });
});
