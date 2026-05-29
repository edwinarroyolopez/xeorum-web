import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { PantheonDetail } from './PantheonDetail';
import { usePantheonArchetype } from './pantheon.queries';

function mockPantheonArchetypeQuery(value: unknown) {
  vi.mocked(usePantheonArchetype).mockReturnValue(value as ReturnType<typeof usePantheonArchetype>);
}

vi.mock('./pantheon.queries', () => ({
  usePantheonArchetype: vi.fn(),
}));

vi.mock('../products/ProductsGrid', () => ({
  ProductsGrid: ({ archetype }: { archetype?: string }) => <div>Products grid {archetype}</div>,
}));

vi.mock('../drops/DropsGrid', () => ({
  DropsGrid: ({ archetype }: { archetype?: string }) => <div>Drops grid {archetype}</div>,
}));

describe('PantheonDetail', () => {
  it('renders loading state', () => {
    mockPantheonArchetypeQuery({ isLoading: true });

    const html = renderToStaticMarkup(<PantheonDetail slug="zeus" />);

    expect(html).toContain('Loading portal.');
  });

  it('renders error state', () => {
    mockPantheonArchetypeQuery({ isLoading: false, isError: true });

    const html = renderToStaticMarkup(<PantheonDetail slug="zeus" />);

    expect(html).toContain('Portal unavailable.');
  });

  it('renders public narrative, commerce framing and gallery preview', () => {
    mockPantheonArchetypeQuery({
      isLoading: false,
      isError: false,
      data: {
        slug: 'zeus',
        name: 'Zeus',
        coreEnergy: 'Leadership with visible order and force.',
        corePhrase: 'Built To Lead.',
        shortManifesto: 'Presence is established before it is explained.',
        visualMood: 'Storm-lit authority over marble order.',
        palette: ['#0B0B0D', '#B8912E'],
        symbols: ['lightning', 'eagle'],
        ctaLabel: 'Enter Zeus Portal',
        galleryPreview: [
          {
            title: 'Storm Marble Dominion',
            imageUrl: 'https://cdn.example.com/zeus.jpg',
            altText: 'Editorial visual reference showing a dark premium outfit.',
            tags: ['zeus', 'storm'],
          },
        ],
        commerce: {
          openMarketAngle: 'Premium strong-presence pieces for people drawn to visible authority.',
          productCategories: ['hoodies', 'jackets'],
          marketTags: ['premium', 'leadership'],
        },
      },
    });

    const html = renderToStaticMarkup(<PantheonDetail slug="zeus" />);

    expect(html).toContain('Built To Lead.');
    expect(html).toContain('Premium strong-presence pieces for people drawn to visible authority.');
    expect(html).toContain('Editorial visual reference showing a dark premium outfit.');
    expect(html).toContain('Products grid zeus');
    expect(html).toContain('Drops grid zeus');
    expect(html).toContain('Enter Zeus Portal');
    expect(html).toContain('Zeus pilot active');
  });

  it('degrades gracefully when gallery preview has no image', () => {
    mockPantheonArchetypeQuery({
      isLoading: false,
      isError: false,
      data: {
        slug: 'athena',
        name: 'Athena',
        coreEnergy: 'Precision under pressure.',
        corePhrase: 'Move with lucid force.',
        shortManifesto: 'Clarity becomes presence.',
        visualMood: 'Controlled marble light.',
        palette: ['#111111'],
        symbols: ['owl'],
        ctaLabel: 'Enter Athena Portal',
        galleryPreview: [
          {
            title: 'Strategic Silence',
            altText: 'Editorial preview card for Athena atmosphere.',
            tags: ['athena'],
          },
        ],
        commerce: {
          openMarketAngle: 'Sharp pieces for lucid presence.',
          productCategories: [],
          marketTags: [],
        },
      },
    });

    const html = renderToStaticMarkup(<PantheonDetail slug="athena" />);

    expect(html).toContain('Image pending. Editorial preview remains available.');
    expect(html).not.toContain('<img');
  });
});
