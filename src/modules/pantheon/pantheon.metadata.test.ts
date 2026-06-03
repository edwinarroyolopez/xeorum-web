import { describe, expect, it } from 'vitest';
import { buildArchetypeMetadata, fallbackArchetypeMetadata } from './pantheon.metadata';
import type { PantheonArchetypeLanding } from './pantheon.types';

const archetype: PantheonArchetypeLanding = {
  slug: 'zeus',
  name: 'Zeus',
  identity: {
    title: 'Zeus',
    oneLineDefinition: 'Dominio visible.',
    coreEnergy: 'Leadership with visible order and force.',
    secondaryEnergies: ['authority'],
    humanDesire: 'Recognition.',
    emotionalPromise: 'Elevation.',
    symbolicRole: 'Sovereign force.',
  },
  narrative: {
    corePhrase: 'Built To Lead.',
    shortManifesto: 'Presence first.',
    longManifesto: 'Long manifesto.',
    shadow: 'Arrogance.',
    transformationArc: 'From control to order.',
    modernInterpretation: 'Modern dominion.',
  },
  psychology: {
    dominantTraits: ['leadership'],
    behavioralSignals: ['command'],
    motivations: ['recognition'],
    fears: ['chaos'],
    aspirations: ['legacy'],
  },
  visualSystem: {
    mood: 'Storm-lit authority.',
    artDirection: 'Low-angle restraint.',
    palette: [{ name: 'Obsidian', hex: '#0B0B0D', usage: 'background' }],
    symbols: ['lightning'],
    textures: ['marble'],
    lighting: ['storm blue'],
    environments: ['vertical architecture'],
  },
  galleryPreview: [],
  commerce: {
    productHeading: 'Pieces shaped by Zeus',
    productSubheading: 'Products follow identity.',
    dropHeading: 'Zeus drops',
    dropSubheading: 'Drops follow identity.',
    openMarketAngle: 'Premium presence.',
    productCategories: ['outerwear'],
    marketTags: ['premium'],
  },
  relationships: { allies: [], contrasts: [], tensions: [] },
  cta: {
    primaryLabel: 'Explore Zeus',
    primaryHref: '/products?archetype=zeus',
    secondaryLabel: 'Run Identity Test',
    secondaryHref: '/identity',
  },
  seo: {
    title: 'Zeus Archetype | XEORUM',
    description: 'Leadership and dominion.',
    keywords: ['zeus'],
    openGraphTitle: 'Zeus',
    openGraphDescription: 'Dominio visible.',
    openGraphImage: 'https://cdn.example.com/zeus-og.jpg',
  },
  theme: {
    overlaySlug: 'zeus',
    intensityDefault: 'subtle',
    allowedContexts: ['pantheon'],
    heroEffectProfile: 'imperial-electric',
    heroEffect: {
      auraColor: 'rgba(76, 107, 255, 0.22)',
      floatDistance: 18,
      portraitTilt: 1.2,
      profileLift: 16,
      signalLift: 22,
    },
  },
  products: [],
  drops: [],
};

describe('pantheon metadata', () => {
  it('builds pantheon metadata as the canonical primary route', () => {
    const metadata = buildArchetypeMetadata(archetype, {
      path: '/pantheon/zeus',
      canonicalPath: '/pantheon/zeus',
    });

    expect(metadata.alternates?.canonical).toBe('/pantheon/zeus');
    expect(metadata.openGraph?.url).toBe('/pantheon/zeus');
    expect(metadata.openGraph?.images).toEqual([{ url: 'https://cdn.example.com/zeus-og.jpg', alt: 'Zeus' }]);
  });

  it('keeps pantheon alternates self-canonical', () => {
    const metadata = buildArchetypeMetadata(archetype, {
      path: '/pantheon/zeus',
      canonicalPath: '/pantheon/zeus',
    });

    expect(metadata.alternates?.canonical).toBe('/pantheon/zeus');
    expect(metadata.openGraph?.url).toBe('/pantheon/zeus');
  });

  it('returns safe fallback metadata', () => {
    const metadata = fallbackArchetypeMetadata('zeus', '/pantheon/zeus');

    expect(metadata.title).toBe('zeus Archetype | XEORUM');
    expect(metadata.alternates?.canonical).toBe('/pantheon/zeus');
  });
});
