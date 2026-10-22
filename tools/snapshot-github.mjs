// Refresh the committed GitHub snapshot (the dev server's and the fallback's data). Uses GITHUB_TOKEN if set,
// else an anonymous request. npm run snapshot:github
import { writeFileSync } from 'node:fs';
import { fetchSnapshot, SNAPSHOT } from './github.mjs';

try {
  const snapshot = await fetchSnapshot();
  writeFileSync(SNAPSHOT, `${JSON.stringify(snapshot, null, 2)}\n`);
  console.log(`Snapshot written: ${snapshot.repos.length} repos for ${snapshot.username}${process.env.GITHUB_TOKEN ? '' : ' (anonymous request)'}`);
} catch (error) {
  console.error(`Snapshot not written: ${error.message}`);
  process.exitCode = 1;
}
