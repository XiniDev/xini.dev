import { readFile } from 'node:fs/promises';
import type { Project } from '../data/projects.ts';

export type Repo = {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  pushed_at: string;
  archived: boolean;
  fork: boolean;
};

export type Snapshot = { fetchedAt: string; username: string; repos: Repo[] };

export type Item = {
  key: string;
  name: string;
  description: string;
  url: string;
  language: string | null;
  date: string;
  archived: boolean;
};

export type Ordered = { recent: Item[]; older: Item[] };

type Response = {
  ok: boolean;
  status: number;
  statusText: string;
  headers: { get(name: string): string | null };
  json(): Promise<unknown>;
};

export type FetchLike = (url: string, init: { headers: Record<string, string> }) => Promise<Response>;

export type FetchOptions = { token?: string; fetchImpl?: FetchLike; api?: string };

export class GitHubError extends Error {
  readonly status: number;
  readonly rateLimited: boolean;

  constructor(message: string, status: number, rateLimited: boolean) {
    super(message);
    this.status = status;
    this.rateLimited = rateLimited;
  }
}

export const DEFAULT_API = 'https://api.github.com';
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const lower = (s: string) => s.toLowerCase();
const ownerOf = (fullName: string) => lower(fullName.split('/')[0] ?? '');

export function toRepo(raw: unknown): Repo {
  const r = raw as Record<string, unknown>;
  const text = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim() : null);
  return {
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
  };
}

export function nextLink(link: string | null): string | undefined {
  if (!link) return undefined;
  for (const part of link.split(',')) {
    const match = part.match(/<([^>]+)>\s*;\s*rel="next"/);
    if (match) return match[1];
  }
  return undefined;
}

function headers(token?: string): Record<string, string> {
  return {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'xini.dev-build',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function getJson(url: string, { token, fetchImpl = fetch as FetchLike }: FetchOptions) {
  const res = await fetchImpl(url, { headers: headers(token) });
  if (!res.ok) {
    const rateLimited = res.status === 429 || res.headers.get('x-ratelimit-remaining') === '0';
    throw new GitHubError(`GitHub responded ${res.status} ${res.statusText} for ${url}`, res.status, rateLimited);
  }
  return { body: await res.json(), next: nextLink(res.headers.get('link')) };
}

export async function fetchOwnerRepos(username: string, options: FetchOptions = {}): Promise<Repo[]> {
  const api = options.api ?? DEFAULT_API;
  let url: string | undefined = `${api}/users/${encodeURIComponent(username)}/repos?type=owner&sort=pushed&per_page=100`;
  const repos: Repo[] = [];
  while (url) {
    const { body, next } = await getJson(url, options);
    if (!Array.isArray(body)) throw new Error(`GitHub returned a non-list for ${url}`);
    repos.push(...body.map(toRepo));
    url = next;
  }
  return repos;
}

export async function fetchRepo(fullName: string, options: FetchOptions = {}): Promise<Repo> {
  const api = options.api ?? DEFAULT_API;
  const { body } = await getJson(`${api}/repos/${fullName}`, options);
  return toRepo(body);
}

const message = (error: unknown) => (error instanceof Error ? error.message : String(error));

async function fetchForeign(fullName: string, options: FetchOptions, previous: Repo[]): Promise<{ repo?: Repo; warning?: string }> {
  try {
    return { repo: await fetchRepo(fullName, options) };
  } catch (error) {
    const refused = error instanceof GitHubError && (error.status === 401 || error.status === 403) && !error.rateLimited;
    if (refused && options.token) {
      try {
        return { repo: await fetchRepo(fullName, { ...options, token: undefined }), warning: `${fullName}: ${message(error)}; read it without the token` };
      } catch {}
    }
    const kept = previous.find((r) => lower(r.full_name) === lower(fullName));
    return { repo: kept, warning: `${fullName}: ${message(error)}; ${kept ? 'kept its snapshot entry' : 'left it out'}` };
  }
}

export async function fetchAll(
  username: string,
  projects: Project[],
  { previous = [], ...options }: FetchOptions & { previous?: Repo[] } = {},
): Promise<{ repos: Repo[]; warnings: string[] }> {
  const owned = await fetchOwnerRepos(username, options);
  const known = new Set(owned.map((r) => lower(r.full_name)));
  const foreign = projects
    .map((p) => p.repo)
    .filter((repo): repo is string => !!repo && ownerOf(repo) !== lower(username) && !known.has(lower(repo)));
  const extra = await Promise.all([...new Set(foreign)].map((repo) => fetchForeign(repo, options, previous)));
  return {
    repos: [...owned, ...extra.flatMap((e) => (e.repo ? [e.repo] : []))],
    warnings: extra.flatMap((e) => (e.warning ? [e.warning] : [])),
  };
}

export function merge(
  repos: Repo[],
  projects: Project[],
  { hiddenRepos = [] }: { hiddenRepos?: string[] } = {},
): { items: Item[]; warnings: string[] } {
  const hidden = new Set(hiddenRepos.map(lower));
  const byRepo = new Map(projects.filter((p) => p.repo).map((p) => [lower(p.repo!), p]));
  const matched = new Set<Project>();
  const items: Item[] = [];
  const warnings: string[] = [];

  for (const repo of repos) {
    const project = byRepo.get(lower(repo.full_name));
    if (project) matched.add(project);
    if (repo.fork || hidden.has(lower(repo.name)) || hidden.has(lower(repo.full_name))) continue;
    if (project && (project.featured || project.hidden)) continue;
    items.push(
      project
        ? {
            key: repo.full_name,
            name: project.name,
            description: project.summary,
            url: project.url ?? repo.html_url,
            language: repo.language,
            date: repo.pushed_at,
            archived: repo.archived,
          }
        : {
            key: repo.full_name,
            name: repo.name,
            description: repo.description ?? '',
            url: repo.homepage ?? repo.html_url,
            language: repo.language,
            date: repo.pushed_at,
            archived: repo.archived,
          },
    );
  }

  for (const project of projects) {
    if (matched.has(project) || project.featured || project.hidden) continue;
    if (project.repo) warnings.push(`curated repo ${project.repo} (${project.name}) matched no GitHub repository`);
    if (!project.updated) continue;
    if (!project.url) {
      warnings.push(`${project.name} has a date but no url, so it is not listed`);
      continue;
    }
    items.push({
      key: project.slug,
      name: project.name,
      description: project.summary,
      url: project.url,
      language: null,
      date: `${project.updated}-01T00:00:00Z`,
      archived: false,
    });
  }

  return { items, warnings };
}

const byNewest = (a: Item, b: Item) =>
  Date.parse(b.date) - Date.parse(a.date) || a.name.localeCompare(b.name, 'en', { sensitivity: 'base' });

export function orderProjects(items: Item[], { now, legacyMonths = 24 }: { now: Date; legacyMonths?: number }): Ordered {
  const cutoff = Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - legacyMonths, now.getUTCDate());
  const recent = items.filter((i) => !i.archived && Date.parse(i.date) >= cutoff).sort(byNewest);
  const older = items.filter((i) => i.archived || Date.parse(i.date) < cutoff).sort(byNewest);
  return { recent, older };
}

export function forDisplay({ recent, older }: Ordered, max = 12): Ordered {
  return { recent: recent.slice(0, max), older: [...recent.slice(max), ...older] };
}

export function updatedLabel(iso: string): string {
  const d = new Date(iso);
  return `Updated ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export async function readSnapshot(path: string): Promise<Snapshot | undefined> {
  try {
    const data = JSON.parse(await readFile(path, 'utf8')) as Snapshot;
    return Array.isArray(data.repos) ? { ...data, repos: data.repos.map(toRepo) } : undefined;
  } catch {
    return undefined;
  }
}

export type Loaded = { repos: Repo[]; source: 'live' | 'snapshot' | 'none'; reason?: string; fetchedAt?: string; warnings: string[] };

export async function loadRepos({
  username,
  projects,
  snapshotPath,
  token,
  fetchImpl,
  api,
}: {
  username: string;
  projects: Project[];
  snapshotPath: string;
  token?: string;
  fetchImpl?: FetchLike;
  api?: string;
}): Promise<Loaded> {
  const read = await readSnapshot(snapshotPath);
  const snapshot = read && lower(read.username) === lower(username) ? read : undefined;
  const fallback = (reason: string): Loaded =>
    snapshot
      ? { repos: snapshot.repos, source: 'snapshot', reason, fetchedAt: snapshot.fetchedAt, warnings: [] }
      : { repos: [], source: 'none', reason: `${reason}; no usable snapshot for ${username}`, warnings: [] };
  if (!token) return fallback('GITHUB_TOKEN is not set');
  try {
    const { repos, warnings } = await fetchAll(username, projects, { token, fetchImpl, api, previous: snapshot?.repos });
    return { repos, source: 'live', warnings };
  } catch (error) {
    const cause = error instanceof Error && error.cause instanceof Error ? ` (${error.cause.message})` : '';
    return fallback(error instanceof Error ? `${error.message}${cause}` : String(error));
  }
}
