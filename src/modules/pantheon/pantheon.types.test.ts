import { describe, expect, it } from 'vitest';
import { parsePantheonArchetypeLanding } from './pantheon.types';

describe('parsePantheonArchetypeLanding', () => {
  it('parses avatarVideo and avatar-video gallery roles', () => {
    const landing = parsePantheonArchetypeLanding({
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
      avatarVideo: {
        assetId: 'zeus-avatar-video',
        title: 'Zeus Avatar',
        videoUrl: 'https://cdn.example.com/zeus-avatar.mp4',
        imageUrl: 'https://cdn.example.com/zeus-avatar.jpg',
        altText: 'Vertical avatar video for Zeus.',
      },
      galleryPreview: [
        {
          id: 'gallery-avatar',
          title: 'Avatar gallery',
          type: 'campaign_mood',
          videoUrl: 'https://cdn.example.com/gallery-avatar.mp4',
          altText: 'Avatar role item.',
          tags: ['avatar'],
          role: 'avatar-video',
          sortOrder: 0,
        },
      ],
      commerce: {
        productHeading: 'Pieces shaped by Zeus',
        productSubheading: 'Published products aligned.',
        dropHeading: 'Zeus drops',
        dropSubheading: 'Drops aligned.',
        openMarketAngle: 'Premium presence.',
        productCategories: ['outerwear'],
        marketTags: ['premium'],
      },
      relationships: { allies: [], contrasts: [], tensions: [] },
      cta: { primaryLabel: 'Explore Zeus', primaryHref: '/products?archetype=zeus', secondaryLabel: 'Run Identity Test', secondaryHref: '/identity' },
      seo: { title: 'Zeus', description: 'Zeus', keywords: ['zeus'], openGraphTitle: 'Zeus', openGraphDescription: 'Zeus' },
      theme: {
        intensityDefault: 'subtle',
        allowedContexts: ['pantheon'],
        heroEffectProfile: 'imperial-electric',
        heroEffect: { auraColor: 'rgba(76, 107, 255, 0.22)', floatDistance: 18, portraitTilt: 1.2, profileLift: 16, signalLift: 22 },
      },
      products: [],
      drops: [],
    });

    expect(landing.avatarVideo).toEqual(expect.objectContaining({
      assetId: 'zeus-avatar-video',
      videoUrl: 'https://cdn.example.com/zeus-avatar.mp4',
      imageUrl: 'https://cdn.example.com/zeus-avatar.jpg',
    }));
    expect(landing.galleryPreview[0]).toEqual(expect.objectContaining({ role: 'avatar-video' }));
  });

  it('stays tolerant when avatarVideo is absent', () => {
    const landing = parsePantheonArchetypeLanding({
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
      galleryPreview: [],
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
      cta: { primaryLabel: 'Enter Athena Portal', primaryHref: '/products?archetype=athena', secondaryLabel: 'Run Identity Test', secondaryHref: '/identity' },
      seo: { title: 'Athena', description: 'Athena', keywords: ['athena'], openGraphTitle: 'Athena', openGraphDescription: 'Athena' },
      theme: {
        intensityDefault: 'subtle',
        allowedContexts: ['pantheon'],
        heroEffectProfile: 'lucid-orbit',
        heroEffect: { auraColor: 'rgba(125, 196, 255, 0.18)', floatDistance: 10, portraitTilt: 0.4, profileLift: 10, signalLift: 14 },
      },
      products: [],
      drops: [],
    });

    expect(landing.avatarVideo).toBeUndefined();
  });

  it('rejects unsupported enum values and external cta hrefs', () => {
    expect(() => parsePantheonArchetypeLanding({
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
      galleryPreview: [{ id: 'bad-gallery', title: 'Bad', type: 'invalid', altText: 'Bad', tags: ['bad'], sortOrder: 0 }],
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
      cta: { primaryLabel: 'Enter Athena Portal', primaryHref: 'https://example.com', secondaryLabel: 'Run Identity Test', secondaryHref: '/identity' },
      seo: { title: 'Athena', description: 'Athena', keywords: ['athena'], openGraphTitle: 'Athena', openGraphDescription: 'Athena' },
      theme: {
        intensityDefault: 'extreme',
        allowedContexts: ['pantheon'],
        heroEffectProfile: 'lucid-orbit',
        heroEffect: { auraColor: 'rgba(125, 196, 255, 0.18)', floatDistance: 10, portraitTilt: 0.4, profileLift: 10, signalLift: 14 },
      },
      products: [],
      drops: [],
    })).toThrow(/Invalid pantheon contract field/);
  });
});
