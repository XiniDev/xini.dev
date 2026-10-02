import { spawnSync } from 'node:child_process';

const run = (command: string, env: NodeJS.ProcessEnv = process.env) => {
  const result = spawnSync(command, { shell: true, stdio: 'inherit', env });
  if (result.status !== 0) process.exit(result.status ?? 1);
};

run('npm run build:test');
run('npx playwright test --grep @qa --workers=1', { ...process.env, QA_OUT: 'docs/qa' });
