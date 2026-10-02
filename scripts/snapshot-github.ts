import { writeFileSync } from 'node:fs';
import { projects } from '../src/data/projects.ts';
import { site } from '../src/data/site.ts';
import { fetchAll, readSnapshot } from '../src/lib/github.ts';
import { SNAPSHOT_PATH } from '../src/lib/listing.ts';

const username = process.env.GITHUB_USERNAME?.trim() || site.contact.githubUser;
const token = process.env.GITHUB_TOKEN?.trim() || undefined;
const previous = (await readSnapshot(SNAPSHOT_PATH))?.repos;
const { repos, warnings } = await fetchAll(username, projects, { token, previous });
for (const warning of warnings) console.warn(`[github] ${warning}`);
const snapshot = { fetchedAt: new Date().toISOString(), username, repos };
writeFileSync(SNAPSHOT_PATH, `${JSON.stringify(snapshot, null, 2)}\n`);
console.log(`Snapshot written: ${repos.length} repos for ${username}${token ? '' : ' (anonymous request)'}`);
