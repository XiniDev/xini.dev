import { writeFileSync } from 'node:fs';
import { projects } from '../src/data/projects.ts';
import { site } from '../src/data/site.ts';
import { fetchAll } from '../src/lib/github.ts';

const username = process.env.GITHUB_USERNAME?.trim() || site.contact.githubUser;
const token = process.env.GITHUB_TOKEN?.trim() || undefined;
const repos = await fetchAll(username, projects, { token });
const snapshot = { fetchedAt: new Date().toISOString(), username, repos };
writeFileSync('src/data/github-snapshot.json', `${JSON.stringify(snapshot, null, 2)}\n`);
console.log(`Snapshot written: ${repos.length} repos for ${username}${token ? '' : ' (anonymous request)'}`);
