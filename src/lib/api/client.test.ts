import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { apiClient } from './client';

describe('apiClient', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ data: { ok: true } }),
      }),
    );
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('does not send x-admin-actor in public runtime requests', async () => {
    await apiClient.post('/products', { sku: 'xeorum-test' }, { requestId: 'req-public' });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.not.objectContaining({
          'x-admin-actor': expect.anything(),
        }),
      }),
    );
  });
});
