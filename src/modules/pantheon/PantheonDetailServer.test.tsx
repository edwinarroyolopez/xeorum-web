import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { PantheonDetailServer } from './PantheonDetailServer';
import { getPantheonArchetypeLandingServer } from './pantheon.metadata';

vi.mock('./pantheon.metadata', () => ({
  getPantheonArchetypeLandingServer: vi.fn(),
}));

vi.mock('./PantheonDetailClient', () => ({
  PantheonDetailClient: ({ slug, initialData }: { slug: string; initialData?: { name?: string } }) => (
    <div>
      client {slug} {initialData?.name ?? 'no-data'}
    </div>
  ),
}));

describe('PantheonDetailServer', () => {
  it('reuses provided initialData without refetching', async () => {
    const html = renderToStaticMarkup(await PantheonDetailServer({ slug: 'zeus', initialData: { name: 'Zeus' } as never }));

    expect(html).toContain('client zeus Zeus');
    expect(getPantheonArchetypeLandingServer).not.toHaveBeenCalled();
  });

  it('fetches landing data server-side when initialData is absent', async () => {
    vi.mocked(getPantheonArchetypeLandingServer).mockResolvedValueOnce({ name: 'Athena' } as never);

    const html = renderToStaticMarkup(await PantheonDetailServer({ slug: 'athena' }));

    expect(html).toContain('client athena Athena');
    expect(getPantheonArchetypeLandingServer).toHaveBeenCalledWith('athena');
  });
});
