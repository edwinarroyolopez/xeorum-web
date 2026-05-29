import { beforeEach, describe, expect, it, vi } from 'vitest';
import { pantheonApi } from './pantheon.api';
import { apiClient } from '../../lib/api';

vi.mock('../../lib/api', () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

describe('pantheonApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls only public pantheon endpoints', async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce([]).mockResolvedValueOnce({
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
      commerce: {
        openMarketAngle: 'Premium strong-presence pieces for people drawn to visible authority.',
        productCategories: ['hoodies'],
        marketTags: ['premium'],
      },
    }).mockResolvedValueOnce({
      slug: 'zeus',
      name: 'Zeus',
      identity: {
        title: 'Zeus',
        oneLineDefinition: 'Dominio visible.',
        coreEnergy: 'Leadership with visible order and force.',
        secondaryEnergies: ['authority'],
        humanDesire: 'Presence.',
        emotionalPromise: 'Elevation.',
        symbolicRole: 'Sovereign.',
      },
      narrative: {
        corePhrase: 'Built To Lead.',
        shortManifesto: 'Presence is established before it is explained.',
        longManifesto: 'Long manifesto.',
        shadow: 'Arrogance.',
        transformationArc: 'From control to order.',
        modernInterpretation: 'Modern dominance.',
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
        environments: ['marble architecture'],
      },
      galleryPreview: [],
      commerce: {
        productHeading: 'Pieces shaped by Zeus',
        productSubheading: 'Published products that carry this identity.',
        dropHeading: 'Zeus drops',
        dropSubheading: 'Limited narratives aligned with this force.',
        openMarketAngle: 'Premium strong-presence pieces for people drawn to visible authority.',
        productCategories: ['hoodies'],
        marketTags: ['premium'],
      },
      relationships: { allies: [], contrasts: [], tensions: [] },
      cta: { primaryLabel: 'Enter Zeus Portal', primaryHref: '/products?archetype=zeus', secondaryLabel: 'Run Identity Test', secondaryHref: '/identity' },
      seo: {
        title: 'Zeus Archetype | XEORUM',
        description: 'Leadership.',
        keywords: ['zeus'],
        openGraphTitle: 'Zeus',
        openGraphDescription: 'Leadership.',
      },
      theme: { overlaySlug: 'zeus', intensityDefault: 'subtle', allowedContexts: ['pantheon'] },
      products: [],
      drops: [],
    });

    await pantheonApi.getArchetypes();
    await pantheonApi.getArchetype('zeus');
    await pantheonApi.getArchetypeLanding('zeus');

    expect(apiClient.get).toHaveBeenNthCalledWith(1, '/pantheon/archetypes');
    expect(apiClient.get).toHaveBeenNthCalledWith(2, '/pantheon/archetypes/zeus');
    expect(apiClient.get).toHaveBeenNthCalledWith(3, '/pantheon/archetypes/zeus/landing');
    expect(vi.mocked(apiClient.get).mock.calls.flat().join(' ')).not.toContain('/admin/');
  });

  it('parses the documented public contract', async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce([
      {
        slug: 'zeus',
        name: 'Zeus',
        coreEnergy: 'Leadership with visible order and force.',
        corePhrase: 'Built To Lead.',
        shortManifesto: 'Presence is established before it is explained.',
        visualMood: 'Storm-lit authority over marble order.',
        palette: ['#0B0B0D', '#F2F1ED'],
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
          productCategories: ['hoodies'],
          marketTags: ['premium'],
        },
      },
    ]);

    await expect(pantheonApi.getArchetypes()).resolves.toEqual([
      expect.objectContaining({
        slug: 'zeus',
        corePhrase: 'Built To Lead.',
        commerce: expect.objectContaining({ productCategories: ['hoodies'] }),
      }),
    ]);
  });

  it('rejects forbidden admin fields in public payloads', async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({
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
      commerce: {
        openMarketAngle: 'Premium strong-presence pieces for people drawn to visible authority.',
        productCategories: [],
        marketTags: [],
      },
      sourceNotes: ['internal only'],
    });

    await expect(pantheonApi.getArchetype('zeus')).rejects.toThrow('Forbidden pantheon contract field exposed');
  });
});
