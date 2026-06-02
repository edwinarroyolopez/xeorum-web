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

    expect(html).toContain('Cargando portales');
    expect(html).toContain('Preparando las fuerzas publicadas del pantheon.');
  });

  it('renders error state', () => {
    mockPantheonArchetypesQuery({ isLoading: false, isError: true });

    const html = renderToStaticMarkup(<PantheonGrid />);

    expect(html).toContain('Portales no disponibles');
    expect(html).toContain('La capa editorial del pantheon no esta disponible ahora.');
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
          galleryPreview: [{ title: 'Ares portrait', imageUrl: 'https://cdn.example.com/ares.jpg', altText: 'Ares editorial portrait', tags: ['ares'] }],
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
          galleryPreview: [{ title: 'Zeus portrait', imageUrl: 'https://cdn.example.com/zeus.jpg', altText: 'Zeus editorial portrait', tags: ['zeus'] }],
          commerce: { openMarketAngle: 'Premium strong-presence pieces.', productCategories: [], marketTags: [] },
        },
      ],
    });

    const html = renderToStaticMarkup(<PantheonGrid />);

    expect(html).toContain('Elige la fuerza que ya te esta mirando.');
    expect(html).toContain('Built To Lead.');
    expect(html).toContain('https://cdn.example.com/zeus.jpg');
    expect(html).toContain('/identity/zeus');
    expect(html).toContain('/identity/ares');
    expect(html).toContain('aria-pressed="true"');
    expect(html.indexOf('Zeus')).toBeLessThan(html.indexOf('Ares'));
  });

  it('renders avatar video on pantheon cards when avatar-video exists', () => {
    mockPantheonArchetypesQuery({
      isLoading: false,
      isError: false,
      data: [
        {
          slug: 'afrodita',
          name: 'Afrodita',
          coreEnergy: 'Magnetismo estético.',
          corePhrase: 'Beauty becomes influence.',
          shortManifesto: 'Soft power.',
          visualMood: 'Luminosa.',
          palette: ['#220909'],
          symbols: ['rose'],
          ctaLabel: 'Explore archetype',
          galleryPreview: [
            { title: 'Afrodita cover', imageUrl: 'https://cdn.example.com/cover.jpg', altText: 'Cover image', tags: ['cover'] },
            { title: 'Avatar Video', imageUrl: 'https://cdn.example.com/avatar.jpg', videoUrl: 'https://cdn.example.com/avatar.mp4', altText: 'Avatar video', tags: ['avatar-video'] },
          ],
          commerce: { openMarketAngle: 'Open market.', productCategories: [], marketTags: [] },
        },
      ],
    });

    const html = renderToStaticMarkup(<PantheonGrid />);

    expect(html).toContain('https://cdn.example.com/avatar.mp4');
    expect(html).toContain('<video');
  });
});
