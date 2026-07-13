import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getPublicThemeContract } from './public-theme.api';

describe('getPublicThemeContract', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('returns the public contract from backend when the response is ok', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: {
          schemaVersion: 'public-theme-contract-v1',
          contractVersion: 1,
          baseTheme: { name: 'xeorum-dark' },
          overlays: [{ archetypeSlug: 'zeus', name: 'Zeus', status: 'published' }],
          fallbackThemeName: 'xeorum-dark',
        },
      }),
    }));

    const contract = await getPublicThemeContract();

    expect(contract.schemaVersion).toBe('public-theme-contract-v1');
    expect(contract.contractVersion).toBe(1);
    expect(contract.overlays[0]?.archetypeSlug).toBe('zeus');
  });

  it('falls back to xeorum-dark when fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network failed')));

    const contract = await getPublicThemeContract();

    expect(contract.baseTheme.name).toBe('xeorum-dark');
    expect(contract.overlays).toEqual([]);
    expect(contract.fallbackThemeName).toBe('xeorum-dark');
  });

  it('falls back to xeorum-dark when backend returns a non-ok response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));

    const contract = await getPublicThemeContract();

    expect(contract.baseTheme.name).toBe('xeorum-dark');
    expect(contract.overlays).toEqual([]);
  });
});
