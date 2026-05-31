import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { PantheonGrid } from './PantheonGrid';
import { usePantheonArchetypes } from './pantheon.queries';

function mockPantheonArchetypesQuery(value: unknown) {
  vi.mocked(usePantheonArchetypes).mockReturnValue(value as ReturnType<typeof usePantheonArchetypes>);
}

vi.mock('./pantheon.queries', () => ({
  usePantheonArchetypes: vi.fn(),
}));

describe('PantheonGrid', () => {
  it('renders loading state', () => {
    mockPantheonArchetypesQuery({ isLoading: true });

    const html = renderToStaticMarkup(<PantheonGrid />);

    expect(html).toContain('Cargando portales.');
  });

  it('renders error state', () => {
    mockPantheonArchetypesQuery({ isLoading: false, isError: true });

    const html = renderToStaticMarkup(<PantheonGrid />);

    expect(html).toContain('Los portales no estan disponibles.');
  });

  it('renders empty state when no public archetypes exist', () => {
    mockPantheonArchetypesQuery({
      isLoading: false,
      isError: false,
      data: [],
    });

    const html = renderToStaticMarkup(<PantheonGrid />);

    expect(html).toContain('Todavia no hay fuerzas publicadas.');
  });

  it('renders published portals and puts Zeus first when present', () => {
    mockPantheonArchetypesQuery({
      isLoading: false,
      isError: false,
      data: [
        {
          slug: 'ares',
          name: 'Ares',
          coreEnergy: 'Violence refined into intent.',
          corePhrase: 'Advance without apology.',
          shortManifesto: 'Pressure becomes motion.',
          visualMood: 'Red steel motion.',
          palette: ['#220909'],
          symbols: ['spear'],
          ctaLabel: 'Enter Ares Portal',
          galleryPreview: [],
          commerce: { openMarketAngle: 'Sharp pieces.', productCategories: [], marketTags: [] },
        },
        {
          slug: 'zeus',
          name: 'Zeus',
          coreEnergy: 'Leadership with visible order and force.',
          corePhrase: 'Built To Lead.',
          shortManifesto: 'Presence is established before it is explained.',
          visualMood: 'Storm-lit authority over marble order.',
          palette: ['#0B0B0D'],
          symbols: ['lightning'],
          ctaLabel: 'Enter Zeus Portal',
          galleryPreview: [],
          commerce: { openMarketAngle: 'Premium strong-presence pieces.', productCategories: [], marketTags: [] },
        },
      ],
    });

    const html = renderToStaticMarkup(<PantheonGrid />);

    expect(html).toContain('Built To Lead.');
    expect(html.indexOf('Zeus')).toBeLessThan(html.indexOf('Ares'));
  });
});
