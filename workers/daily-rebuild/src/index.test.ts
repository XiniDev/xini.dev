import { describe, expect, it, vi } from 'vitest';
import { triggerRebuild } from './index.ts';

describe('daily rebuild worker', () => {
  it('POSTs the deploy hook', async () => {
    const fetcher = vi.fn(async () => new Response('{}', { status: 200 }));
    await expect(triggerRebuild({ DEPLOY_HOOK_URL: 'https://hooks.example/abc' }, fetcher as unknown as typeof fetch)).resolves.toBe(200);
    expect(fetcher).toHaveBeenCalledWith('https://hooks.example/abc', { method: 'POST' });
  });

  it('fails loudly when the hook is missing or rejects the call', async () => {
    await expect(triggerRebuild({ DEPLOY_HOOK_URL: '' })).rejects.toThrow('DEPLOY_HOOK_URL is not set');
    const failing = vi.fn(async () => new Response('', { status: 404 }));
    await expect(triggerRebuild({ DEPLOY_HOOK_URL: 'https://hooks.example/x' }, failing as unknown as typeof fetch)).rejects.toThrow('responded 404');
  });
});
