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

    expect(html).toContain('Preparando el portal');
    expect(html).toContain('Cargando narrativa, producto curado y sistema visual.');
  });

  it('renders error state', () => {
    mockPantheonArchetypeQuery({ isLoading: false, isError: true });

    const html = renderToStaticMarkup(<PantheonDetailClient slug="zeus" />);

    expect(html).toContain('El portal no esta disponible ahora.');
  });

  it('keeps rendering initial data when client revalidation fails', () => {
    mockPantheonArchetypeQuery({ isLoading: false, isError: true, data: undefined });

    const html = renderToStaticMarkup(<PantheonDetailClient slug="afrodita" initialData={{
      slug: 'afrodita',
      name: 'Afrodita',
      identity: {
        title: 'Afrodita',
        oneLineDefinition: 'Dominio suave.',
        coreEnergy: 'Magnetismo estetico.',
        secondaryEnergies: [],
        humanDesire: 'Presencia.',
        emotionalPromise: 'Influencia.',
        symbolicRole: 'Muse.',
      },
      narrative: {
        corePhrase: 'Beauty becomes influence.',
        shortManifesto: 'Short manifesto.',
        longManifesto: 'Long manifesto.',
        shadow: 'Vanity.',
        transformationArc: 'From validation to agency.',
        modernInterpretation: 'Modern magnetism.',
      },
      psychology: {
        dominantTraits: ['magnetica'],
        behavioralSignals: ['elegancia'],
        motivations: ['deseo'],
        fears: ['vulgaridad'],
        aspirations: ['influencia'],
      },
      visualSystem: {
        mood: 'Pearl glow.',
        artDirection: 'Liquid luxury.',
        palette: [{ name: 'Pearl', hex: '#E8DED2', usage: 'accent' }],
        symbols: [],
        textures: [],
        lighting: [],
        environments: [],
      },
      galleryPreview: [],
      commerce: {
        productHeading: 'Pieces shaped by Afrodita',
        productSubheading: 'Published products aligned.',
        dropHeading: 'Afrodita drops',
        dropSubheading: 'Drops aligned.',
        openMarketAngle: 'Premium presence.',
        productCategories: [],
        marketTags: [],
      },
      relationships: { allies: [], contrasts: [], tensions: [] },
      cta: { primaryLabel: 'Explore archetype', primaryHref: '/products?archetype=afrodita', secondaryLabel: 'Run Identity Test', secondaryHref: '/identity' },
      seo: { title: 'Afrodita', description: 'Afrodita', keywords: ['afrodita'], openGraphTitle: 'Afrodita', openGraphDescription: 'Afrodita' },
      theme: {
        overlaySlug: 'afrodita',
        intensityDefault: 'subtle',
        allowedContexts: ['pantheon'],
        heroEffectProfile: 'editorial-float',
        heroEffect: { auraColor: 'rgba(120, 180, 255, 0.18)', floatDistance: 2, portraitTilt: 1, profileLift: 1, signalLift: 1 },
      },
      products: [],
      drops: [],
    }} />);

    expect(html).toContain('Afrodita');
    expect(html).not.toContain('El portal no esta disponible ahora.');
  });

  it('renders the mature archetype landing in the documented chapter order', () => {
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
        theme: {
          overlaySlug: 'zeus',
          intensityDefault: 'subtle',
          allowedContexts: ['pantheon'],
          heroEffectProfile: 'imperial-electric',
          heroEffect: { auraColor: 'rgba(76, 107, 255, 0.22)', floatDistance: 18, portraitTilt: 1.2, profileLift: 16, signalLift: 22 },
        },
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
    expect(html).toContain('Entender la fuerza');
    expect(html).toContain('Tension y transformacion');
    expect(html).toContain('El mundo de Zeus');
    expect(html).toContain('Piezas con esta fuerza');
    expect(html).toContain('Premium strong-presence pieces for people drawn to visible authority.');
    expect(html).toContain('Editorial visual reference showing a dark premium outfit.');
    expect(html).toContain('Zeus Coat');
    expect(html).toContain('Zeus Night');
    expect(html).toContain('Enter Zeus Portal');
    expect(html).toContain('Run Identity Test');
    expect(html).not.toContain('Piloto visual activo');
    expect(html).toContain('data-effect-profile="imperial-electric"');
    expect(html).toContain('class="theme-css-scope"');
    expect(html).toContain('data-theme-overlay="published"');
    expect(html.indexOf('Entender la fuerza')).toBeLessThan(html.indexOf('Piezas con esta fuerza'));
    expect(html.indexOf('El mundo de Zeus')).toBeLessThan(html.indexOf('Piezas con esta fuerza'));
  });

  it('renders avatar video as the hero media when it exists', () => {
    mockPantheonArchetypeQuery({
      isLoading: false,
      isError: false,
      data: {
        slug: 'hades',
        name: 'Hades',
        identity: {
          title: 'Hades',
          oneLineDefinition: 'Dark magnetism.',
          coreEnergy: 'Contained power.',
          secondaryEnergies: [],
          humanDesire: 'Depth.',
          emotionalPromise: 'Control.',
          symbolicRole: 'Keeper.',
        },
        narrative: {
          corePhrase: 'Enter the depth.',
          shortManifesto: 'Depth before display.',
          longManifesto: 'Long Hades manifesto.',
          shadow: 'Isolation.',
          transformationArc: 'From secrecy to mastery.',
          modernInterpretation: 'Luxury under restraint.',
        },
        psychology: {
          dominantTraits: ['magnetic'],
          behavioralSignals: ['silent'],
          motivations: ['control'],
          fears: ['exposure'],
          aspirations: ['mastery'],
        },
        visualSystem: {
          mood: 'Black velvet void.',
          artDirection: 'Shadow architecture.',
          palette: [{ name: 'Black', hex: '#111111', usage: 'background' }],
          symbols: [],
          textures: [],
          lighting: [],
          environments: [],
        },
        avatarVideo: {
          assetId: 'hades-avatar-video',
          title: 'Hades Avatar',
          videoUrl: 'https://cdn.example.com/hades-avatar.mp4',
          imageUrl: 'https://cdn.example.com/hades-avatar.jpg',
          altText: 'Dark editorial avatar motion.',
        },
        galleryPreview: [
          {
            id: 'gallery-video-1',
            title: 'Avatar duplicate',
            type: 'campaign_mood',
            videoUrl: 'https://cdn.example.com/hades-gallery.mp4',
            altText: 'Dark editorial motion sequence.',
            tags: ['hades'],
            role: 'avatar-video',
            sortOrder: 1,
          },
          {
            id: 'gallery-image-1',
            title: 'Underworld Still',
            type: 'campaign_mood',
            imageUrl: 'https://cdn.example.com/hades-still.jpg',
            altText: 'Dark editorial still.',
            tags: ['hades'],
            sortOrder: 2,
          },
        ],
        commerce: {
          productHeading: 'Pieces shaped by Hades',
          productSubheading: 'Products follow identity.',
          dropHeading: 'Hades drops',
          dropSubheading: 'Drops follow identity.',
          openMarketAngle: 'Depth-led product.',
          productCategories: [],
          marketTags: [],
        },
        relationships: { allies: [], contrasts: [], tensions: [] },
        cta: { primaryLabel: 'Enter', primaryHref: '/products?archetype=hades', secondaryLabel: 'Test', secondaryHref: '/identity' },
        seo: { title: 'Hades', description: 'Hades', keywords: ['hades'], openGraphTitle: 'Hades', openGraphDescription: 'Hades' },
        theme: {
          intensityDefault: 'subtle',
          allowedContexts: ['pantheon'],
          heroEffectProfile: 'underworld-drift',
          heroEffect: { auraColor: 'rgba(80, 80, 120, 0.2)', floatDistance: 10, portraitTilt: 0.5, profileLift: 10, signalLift: 12 },
        },
        products: [],
        drops: [],
      },
    });

    const html = renderToStaticMarkup(<PantheonDetailClient slug="hades" />);

    expect(html).toContain('<video');
    expect(html).toContain('data-hero-media-source="avatar-video"');
    expect(html).toContain('https://cdn.example.com/hades-avatar.mp4');
    expect(html).toContain('https://cdn.example.com/hades-still.jpg');
    expect(html).not.toContain('https://cdn.example.com/hades-gallery.mp4');
  });

  it('renders the textual fallback when no hero media is valid', () => {
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
        theme: {
          intensityDefault: 'subtle',
          allowedContexts: ['pantheon'],
          heroEffectProfile: 'lucid-orbit',
          heroEffect: { auraColor: 'rgba(125, 196, 255, 0.18)', floatDistance: 10, portraitTilt: 0.4, profileLift: 10, signalLift: 14 },
        },
        products: [],
        drops: [],
      },
    });

    const html = renderToStaticMarkup(<PantheonDetailClient slug="athena" />);

    expect(html).toContain('data-hero-media-source="fallback"');
    expect(html).toContain('Restrained strategy.');
    expect(html).not.toContain('<video');
  });
});
