import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { PantheonDetailClient } from './PantheonDetailClient';
import { usePantheonArchetypeLanding } from './pantheon.queries';

function mockPantheonArchetypeQuery(value: unknown) {
  vi.mocked(usePantheonArchetypeLanding).mockReturnValue(value as ReturnType<typeof usePantheonArchetypeLanding>);
}

vi.mock('./pantheon.queries', () => ({
  usePantheonArchetypeLanding: vi.fn(),
}));

describe('PantheonDetailClient', () => {
  it('renders loading state', () => {
    mockPantheonArchetypeQuery({ isLoading: true });

    const html = renderToStaticMarkup(<PantheonDetailClient slug="zeus" />);

    expect(html).toContain('Loading archetype landing.');
  });

  it('renders error state', () => {
    mockPantheonArchetypeQuery({ isLoading: false, isError: true });

    const html = renderToStaticMarkup(<PantheonDetailClient slug="zeus" />);

    expect(html).toContain('Archetype landing unavailable.');
  });

  it('renders the mature archetype landing in the documented order', () => {
    mockPantheonArchetypeQuery({
      isLoading: false,
      isError: false,
      data: {
        slug: 'zeus',
        name: 'Zeus',
        identity: {
          title: 'Zeus',
          oneLineDefinition: 'Dominio visible.',
          coreEnergy: 'Leadership with visible order and force.',
          secondaryEnergies: ['authority', 'discipline'],
          humanDesire: 'Be recognized as strong.',
          emotionalPromise: 'Elevated presence.',
          symbolicRole: 'Sovereign force.',
        },
        narrative: {
          corePhrase: 'Built To Lead.',
          shortManifesto: 'Presence is established before it is explained.',
          longManifesto: 'A longer editorial manifesto for Zeus.',
          shadow: 'Arrogance and rigidity.',
          transformationArc: 'From control as force to leadership as order.',
          modernInterpretation: 'Dominance translated into restraint.',
        },
        psychology: {
          dominantTraits: ['leadership'],
          behavioralSignals: ['command'],
          motivations: ['recognition'],
          fears: ['chaos'],
          aspirations: ['legacy'],
        },
        visualSystem: {
          mood: 'Storm-lit authority over marble order.',
          artDirection: 'Low-angle imperial restraint.',
          palette: [
            { name: 'Obsidian', hex: '#0B0B0D', usage: 'background' },
            { name: 'Imperial Gold', hex: '#B8912E', usage: 'accent' },
          ],
          symbols: ['lightning', 'eagle'],
          textures: ['marble'],
          lighting: ['storm blue'],
          environments: ['vertical architecture'],
        },
        galleryPreview: [
          {
            id: 'gallery-1',
            title: 'Storm Marble Dominion',
            type: 'campaign_mood',
            imageUrl: 'https://cdn.example.com/zeus.jpg',
            altText: 'Editorial visual reference showing a dark premium outfit.',
            tags: ['zeus', 'storm'],
            sortOrder: 1,
          },
        ],
        commerce: {
          productHeading: 'Pieces shaped by Zeus',
          productSubheading: 'Published products that carry this identity.',
          dropHeading: 'Zeus drops',
          dropSubheading: 'Limited narratives aligned with this force.',
          openMarketAngle: 'Premium strong-presence pieces for people drawn to visible authority.',
          productCategories: ['hoodies', 'jackets'],
          marketTags: ['premium', 'leadership'],
        },
        relationships: {
          allies: [{ slug: 'apollo', name: 'Apollo', reason: 'Apollo extends this force.' }],
          contrasts: [],
          tensions: [],
        },
        cta: {
          primaryLabel: 'Enter Zeus Portal',
          primaryHref: '/products?archetype=zeus',
          secondaryLabel: 'Run Identity Test',
          secondaryHref: '/identity',
        },
        seo: {
          title: 'Zeus Archetype | XEORUM',
          description: 'Leadership with visible order and force.',
          keywords: ['zeus'],
          openGraphTitle: 'Zeus',
          openGraphDescription: 'Dominio visible.',
        },
        theme: { overlaySlug: 'zeus', intensityDefault: 'subtle', allowedContexts: ['pantheon'] },
        products: [
          {
            id: 'product-1',
            slug: 'zeus-coat',
            name: 'Zeus Coat',
            description: 'Built for presence.',
            shortDescription: 'Built for presence.',
            pricing: {
              currency: 'USD',
              price: 240,
              salePrice: 240,
            },
            media: {
              gallery: [{ id: 'media-1', url: 'https://cdn.example.com/zeus-coat.jpg' }],
            },
            archetypes: {
              primary: { slug: 'zeus', id: 'archetype-zeus', score: 1 },
              affinities: [],
            },
            productDetails: {
              fit: 'Structured',
              material: 'Wool',
            },
            variants: [{ id: 'variant-1', size: 'L', available: true }],
          },
        ],
        drops: [{ id: 'drop-1', slug: 'zeus-night', name: 'Zeus Night', status: 'SCHEDULED', manifesto: 'Command after dark.' }],
      },
    });

    const html = renderToStaticMarkup(<PantheonDetailClient slug="zeus" />);

    expect(html).toContain('Built To Lead.');
    expect(html).toContain('Core Identity Statement');
    expect(html).toContain('Manifesto');
    expect(html).toContain('Shadow');
    expect(html).toContain('Transformation');
    expect(html).toContain('Premium strong-presence pieces for people drawn to visible authority.');
    expect(html).toContain('Editorial visual reference showing a dark premium outfit.');
    expect(html).toContain('Zeus Coat');
    expect(html).toContain('Zeus Night');
    expect(html).toContain('Enter Zeus Portal');
    expect(html).toContain('Zeus pilot active');
    expect(html.indexOf('Manifesto')).toBeLessThan(html.indexOf('Pieces shaped by Zeus'));
  });

  it('degrades gracefully when gallery preview has no image and products or drops are empty', () => {
    mockPantheonArchetypeQuery({
      isLoading: false,
      isError: false,
      data: {
        slug: 'athena',
        name: 'Athena',
        identity: {
          title: 'Athena',
          oneLineDefinition: 'Lucid force.',
          coreEnergy: 'Precision under pressure.',
          secondaryEnergies: [],
          humanDesire: 'Clarity.',
          emotionalPromise: 'Control.',
          symbolicRole: 'Strategist.',
        },
        narrative: {
          corePhrase: 'Move with lucid force.',
          shortManifesto: 'Clarity becomes presence.',
          longManifesto: 'Long Athena manifesto.',
          shadow: 'Cold detachment.',
          transformationArc: 'From defense to wisdom.',
          modernInterpretation: 'Strategy under pressure.',
        },
        psychology: {
          dominantTraits: ['lucid'],
          behavioralSignals: ['measured'],
          motivations: ['clarity'],
          fears: ['confusion'],
          aspirations: ['mastery'],
        },
        visualSystem: {
          mood: 'Controlled marble light.',
          artDirection: 'Restrained strategy.',
          palette: [{ name: 'Black', hex: '#111111', usage: 'background' }],
          symbols: ['owl'],
          textures: [],
          lighting: [],
          environments: [],
        },
        galleryPreview: [
          {
            id: 'gallery-2',
            title: 'Strategic Silence',
            type: 'environment',
            altText: 'Editorial preview card for Athena atmosphere.',
            tags: ['athena'],
            sortOrder: 1,
          },
        ],
        commerce: {
          productHeading: 'Pieces shaped by Athena',
          productSubheading: 'Products follow identity.',
          dropHeading: 'Athena drops',
          dropSubheading: 'Drops follow identity.',
          openMarketAngle: 'Sharp pieces for lucid presence.',
          productCategories: [],
          marketTags: [],
        },
        relationships: { allies: [], contrasts: [], tensions: [] },
        cta: {
          primaryLabel: 'Enter Athena Portal',
          primaryHref: '/products?archetype=athena',
          secondaryLabel: 'Run Identity Test',
          secondaryHref: '/identity',
        },
        seo: {
          title: 'Athena Archetype | XEORUM',
          description: 'Athena.',
          keywords: ['athena'],
          openGraphTitle: 'Athena',
          openGraphDescription: 'Athena.',
        },
        theme: { intensityDefault: 'subtle', allowedContexts: ['pantheon'] },
        products: [],
        drops: [],
      },
    });

    const html = renderToStaticMarkup(<PantheonDetailClient slug="athena" />);

    expect(html).toContain('Editorial fallback remains available while approved imagery is curated.');
    expect(html).toContain('No published products express this force yet.');
    expect(html).toContain('No published drops are aligned to this force right now.');
    expect(html).not.toContain('<img');
  });
});
