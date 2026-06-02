import { describe, expect, it } from 'vitest';
import { buildArchetypeLandingViewModel } from './archetype-landing.viewmodel';
import type { PantheonArchetypeLanding } from '../pantheon.types';

function buildLanding(overrides: Partial<PantheonArchetypeLanding> = {}): PantheonArchetypeLanding {
  return {
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
    galleryPreview: [
      { id: 'gallery-2', title: 'Second', type: 'campaign_mood', altText: 'Second', tags: ['second'], sortOrder: 2 },
      { id: 'gallery-1', title: 'First', type: 'campaign_mood', altText: 'First', tags: ['first'], sortOrder: 1 },
    ],
    commerce: {
      productHeading: 'Pieces shaped by Zeus',
      productSubheading: 'Products follow identity.',
      dropHeading: 'Zeus drops',
      dropSubheading: 'Drops follow identity.',
      openMarketAngle: 'Premium presence.',
      productCategories: ['outerwear'],
      marketTags: ['premium'],
    },
    relationships: {
      allies: [{ slug: 'apollo', name: 'Apollo', reason: 'Aligned.' }],
      contrasts: [{ slug: 'hades', name: 'Hades', reason: 'Counterpoint.' }],
      tensions: [],
    },
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
    },
    theme: {
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
    ...overrides,
  };
}

describe('buildArchetypeLandingViewModel', () => {
  it('sorts gallery and derives hero signals and relation counts', () => {
    const viewModel = buildArchetypeLandingViewModel(buildLanding());

    expect(viewModel.gallery.map((item) => item.id)).toEqual(['gallery-1', 'gallery-2']);
    expect(viewModel.heroSignals).toEqual(['Leadership with visible order and force.', 'leadership', 'outerwear']);
    expect(viewModel.relatedCount).toBe(2);
  });

  it('uses contract ctas when present and enables zeus pilot only without overlaySlug', () => {
    const viewModel = buildArchetypeLandingViewModel(buildLanding());

    expect(viewModel.primaryCta).toEqual({ href: '/products?archetype=zeus', label: 'Explore Zeus' });
    expect(viewModel.secondaryCta).toEqual({ href: '/identity', label: 'Run Identity Test' });
    expect(viewModel.zeusPilotActive).toBe(true);
  });

  it('prioritizes avatar media over hero media and gallery previews', () => {
    const viewModel = buildArchetypeLandingViewModel(buildLanding({
      hero: {
        assetId: 'hero-asset',
        title: 'Hero fallback',
        type: 'campaign_mood',
        imageUrl: 'https://cdn.example.com/hero.jpg',
        altText: 'Hero fallback image',
        sortOrder: 0,
      },
      avatarVideo: {
        assetId: 'avatar-video-asset',
        title: 'Avatar motion',
        videoUrl: 'https://cdn.example.com/avatar.mp4',
        altText: 'Avatar motion video',
      },
      galleryPreview: [
        { id: 'gallery-avatar', title: 'Avatar gallery', type: 'campaign_mood', videoUrl: 'https://cdn.example.com/gallery-avatar.mp4', altText: 'Gallery avatar', tags: ['avatar'], role: 'avatar-video', sortOrder: 0 },
        { id: 'gallery-image', title: 'Gallery image', type: 'campaign_mood', imageUrl: 'https://cdn.example.com/gallery.jpg', altText: 'Gallery image', tags: ['gallery'], sortOrder: 1 },
      ],
    }));

    expect(viewModel.heroMedia).toEqual(expect.objectContaining({
      source: 'avatar-video',
      videoUrl: 'https://cdn.example.com/avatar.mp4',
      altText: 'Avatar motion video',
    }));
    expect(viewModel.gallery.map((item) => item.id)).toEqual(['gallery-image']);
  });

  it('falls back to hero or gallery media when avatar video is absent', () => {
    const viewModel = buildArchetypeLandingViewModel(buildLanding({
      hero: {
        assetId: 'hero-asset',
        title: 'Hero image',
        type: 'campaign_mood',
        imageUrl: 'https://cdn.example.com/hero.jpg',
        altText: 'Hero image',
        sortOrder: 0,
      },
      galleryPreview: [
        { id: 'gallery-video', title: 'Gallery video', type: 'campaign_mood', videoUrl: 'https://cdn.example.com/gallery.mp4', altText: 'Gallery motion', tags: ['gallery'], sortOrder: 0 },
      ],
    }));

    expect(viewModel.heroMedia).toEqual(expect.objectContaining({
      source: 'hero-image',
      imageUrl: 'https://cdn.example.com/hero.jpg',
      altText: 'Hero image',
    }));
  });

  it('falls back safely when cta labels or hrefs are empty and overlay is published', () => {
    const viewModel = buildArchetypeLandingViewModel(buildLanding({
      cta: {
        primaryLabel: '',
        primaryHref: '',
        secondaryLabel: '',
        secondaryHref: '',
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
    }));

    expect(viewModel.primaryCta).toEqual({ href: '/products?archetype=zeus', label: 'Ver piezas de esta fuerza' });
    expect(viewModel.secondaryCta).toEqual({ href: '/identity', label: 'Descubrir mi fuerza' });
    expect(viewModel.zeusPilotActive).toBe(false);
  });
});
