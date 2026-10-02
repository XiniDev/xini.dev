import { join } from 'node:path';
import { projects } from '../data/projects.ts';
import { listing } from '../data/listing.ts';
import { site } from '../data/site.ts';
import { DEFAULT_API, forDisplay, loadRepos, merge, orderProjects, type Ordered } from './github.ts';

export const SNAPSHOT_PATH = join(process.cwd(), 'src', 'data', 'github-snapshot.json');

export type Listing = Ordered & { empty: boolean; username: string };

let pending: Promise<Listing> | undefined;

export function githubListing(): Promise<Listing> {
  pending ??= (async () => {
    const username = process.env.GITHUB_USERNAME?.trim() || site.contact.githubUser;
    const token = process.env.GITHUB_TOKEN?.trim() || undefined;
    const api = process.env.GITHUB_API_URL?.trim() || DEFAULT_API;
    const loaded = await loadRepos({ username, projects, snapshotPath: SNAPSHOT_PATH, token, api });
    if (loaded.source !== 'live') {
      const used = loaded.source === 'snapshot' ? `the committed snapshot from ${loaded.fetchedAt}` : 'no data (empty state)';
      console.warn(`[github] using ${used}: ${loaded.reason}`);
    }
    for (const warning of loaded.warnings) console.warn(`[github] ${warning}`);
    const { items, warnings } = merge(loaded.repos, projects, { hiddenRepos: listing.hiddenRepos });
    for (const warning of warnings) console.warn(`[github] ${warning}`);
    const ordered = forDisplay(orderProjects(items, { now: new Date(), legacyMonths: listing.legacyMonths }), listing.recentMax);
    console.log(
      `[github] source=${loaded.source} user=${username} fetched=${loaded.repos.length} included=${items.length} recent=${ordered.recent.length} older=${ordered.older.length}`,
    );
    return { ...ordered, empty: items.length === 0, username };
  })();
  return pending;
}
