export interface Env {
  DEPLOY_HOOK_URL: string;
}

export async function triggerRebuild(env: Env, fetcher: typeof fetch = fetch): Promise<number> {
  if (!env.DEPLOY_HOOK_URL) throw new Error('DEPLOY_HOOK_URL is not set');
  const response = await fetcher(env.DEPLOY_HOOK_URL, { method: 'POST' });
  if (!response.ok) throw new Error(`The deploy hook responded ${response.status}`);
  return response.status;
}

export default {
  async scheduled(controller, env) {
    const status = await triggerRebuild(env);
    console.log(`xini-dev rebuild triggered for ${new Date(controller.scheduledTime).toISOString()} (hook ${status})`);
  },
} satisfies ExportedHandler<Env>;
