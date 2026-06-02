import type { Drop } from '../drops/drops.types';
import type { Product } from '../products/services/products.types';

export type PantheonLandingMediaRole = 'hero' | 'hero-loop' | 'open-graph' | 'mobile-hero' | 'avatar-video' | 'gallery';

export type PantheonGalleryPreviewItem = {
  title: string;
  imageUrl?: string;
  videoUrl?: string;
  altText: string;
  tags: string[];
  role?: PantheonLandingMediaRole;
};

export type PantheonLandingMediaItem = {
  title: string;
  imageUrl?: string;
  videoUrl?: string;
  altText: string;
  caption?: string;
  narrativeFunction?: string;
};

export type PantheonLandingHeroMedia = PantheonLandingMediaItem & {
  assetId: string;
  type: string;
  sortOrder: number;
  motionLoop?: PantheonLandingMediaItem & {
    assetId: string;
  };
};

export type PantheonLandingAvatarVideo = PantheonLandingMediaItem & {
  assetId: string;
};

export type PantheonArchetype = {
  slug: string;
  name: string;
  coreEnergy: string;
  corePhrase: string;
  shortManifesto: string;
  visualMood: string;
  palette: string[];
  symbols: string[];
  ctaLabel: string;
  galleryPreview: PantheonGalleryPreviewItem[];
  commerce: {
    openMarketAngle: string;
    productCategories: string[];
    marketTags: string[];
  };
};

export type PantheonLandingGalleryItem = PantheonGalleryPreviewItem & {
  id: string;
  type: 'reference' | 'ai_prompt' | 'product_mood' | 'campaign_mood' | 'symbol' | 'texture' | 'environment';
  sortOrder: number;
  role?: PantheonLandingMediaRole;
};

export type PantheonArchetypeLanding = {
  slug: string;
  name: string;
  identity: {
    title: string;
    oneLineDefinition: string;
    coreEnergy: string;
    secondaryEnergies: string[];
    humanDesire: string;
    emotionalPromise: string;
    symbolicRole: string;
  };
  narrative: {
    corePhrase: string;
    shortManifesto: string;
    longManifesto: string;
    shadow: string;
    transformationArc: string;
    modernInterpretation: string;
  };
  psychology: {
    dominantTraits: string[];
    behavioralSignals: string[];
    motivations: string[];
    fears: string[];
    aspirations: string[];
  };
  visualSystem: {
    mood: string;
    artDirection: string;
    palette: Array<{ name: string; hex: string; usage: string }>;
    symbols: string[];
    textures: string[];
    lighting: string[];
    environments: string[];
  };
  hero?: PantheonLandingHeroMedia;
  avatarVideo?: PantheonLandingAvatarVideo;
  galleryPreview: PantheonLandingGalleryItem[];
  commerce: {
    productHeading: string;
    productSubheading: string;
    dropHeading: string;
    dropSubheading: string;
    openMarketAngle: string;
    productCategories: string[];
    marketTags: string[];
  };
  relationships: {
    allies: Array<{ slug: string; name: string; reason: string }>;
    contrasts: Array<{ slug: string; name: string; reason: string }>;
    tensions: Array<{ slug: string; name: string; reason: string }>;
  };
  cta: {
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    openGraphTitle: string;
    openGraphDescription: string;
    openGraphImage?: string;
  };
  theme: {
    overlaySlug?: string;
    intensityDefault: 'subtle' | 'medium';
    allowedContexts: string[];
    heroEffectProfile: 'editorial-float' | 'imperial-electric' | 'lucid-orbit' | 'underworld-drift';
    heroEffect: {
      auraColor: string;
      floatDistance: number;
      portraitTilt: number;
      profileLift: number;
      signalLift: number;
    };
  };
  products: Product[];
  drops: Drop[];
};

const forbiddenPublicFields = [
  'sourceNotes',
  'reviewChecklist',
  'riskFlags',
  'validationReport',
  'auditLogs',
  'rawJson',
  'admin',
  'prompt',
  'prompts',
  'importMetadata',
] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readString(value: unknown, field: string) {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`Invalid pantheon contract field: ${field}`);
  }

  return value.trim();
}

function readStringArray(value: unknown, field: string) {
  if (!Array.isArray(value) || value.some((entry) => typeof entry !== 'string' || !entry.trim())) {
    throw new Error(`Invalid pantheon contract field: ${field}`);
  }

  return value.map((entry) => entry.trim());
}

function readOptionalString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function readOptionalMediaRole(value: unknown): PantheonLandingMediaRole | undefined {
  if (value === 'hero' || value === 'hero-loop' || value === 'open-graph' || value === 'mobile-hero' || value === 'avatar-video' || value === 'gallery') {
    return value;
  }

  return undefined;
}

function readStringWithFallback(value: unknown, fallback: string) {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function assertNoForbiddenFields(payload: Record<string, unknown>) {
  for (const field of forbiddenPublicFields) {
    if (field in payload) {
      throw new Error(`Forbidden pantheon contract field exposed: ${field}`);
    }
  }
}

function parseGalleryPreviewItem(value: unknown, index: number): PantheonGalleryPreviewItem {
  if (!isRecord(value)) {
    throw new Error(`Invalid pantheon contract field: galleryPreview[${index}]`);
  }

  const imageUrl = readOptionalString(value.imageUrl);
  const videoUrl = readOptionalString(value.videoUrl);
  const altText = readString(value.altText, `galleryPreview[${index}].altText`);
  const role = readOptionalMediaRole(value.role);

  return {
    title: readStringWithFallback(value.title, altText || `Pantheon preview ${index + 1}`),
    ...(imageUrl ? { imageUrl } : {}),
    ...(videoUrl ? { videoUrl } : {}),
    altText,
    tags: readStringArray(value.tags, `galleryPreview[${index}].tags`),
    ...(role ? { role } : {}),
  };
}

function parseLandingGalleryItem(value: unknown, index: number): PantheonLandingGalleryItem {
  if (!isRecord(value)) {
    throw new Error(`Invalid pantheon contract field: galleryPreview[${index}]`);
  }

  const imageUrl = readOptionalString(value.imageUrl);
  const videoUrl = readOptionalString(value.videoUrl);
  const altText = readString(value.altText, `galleryPreview[${index}].altText`);
  const role = readOptionalMediaRole(value.role);

  return {
    id: readString(value.id, `galleryPreview[${index}].id`),
    title: readStringWithFallback(value.title, altText || `Pantheon preview ${index + 1}`),
    type: readString(value.type, `galleryPreview[${index}].type`) as PantheonLandingGalleryItem['type'],
    ...(imageUrl ? { imageUrl } : {}),
    ...(videoUrl ? { videoUrl } : {}),
    altText,
    tags: readStringArray(value.tags, `galleryPreview[${index}].tags`),
    sortOrder: typeof value.sortOrder === 'number' ? value.sortOrder : index,
    ...(role ? { role } : {}),
  };
}

function parseLandingMediaItem(value: unknown, field: string) {
  if (!isRecord(value)) {
    throw new Error(`Invalid pantheon contract field: ${field}`);
  }

  const imageUrl = readOptionalString(value.imageUrl);
  const videoUrl = readOptionalString(value.videoUrl);
  const caption = readOptionalString(value.caption);
  const narrativeFunction = readOptionalString(value.narrativeFunction);

  return {
    title: readString(value.title, `${field}.title`),
    ...(imageUrl ? { imageUrl } : {}),
    ...(videoUrl ? { videoUrl } : {}),
    altText: readString(value.altText, `${field}.altText`),
    ...(caption ? { caption } : {}),
    ...(narrativeFunction ? { narrativeFunction } : {}),
  };
}

function parseLandingHeroMedia(value: unknown, field: string): PantheonLandingHeroMedia {
  if (!isRecord(value)) {
    throw new Error(`Invalid pantheon contract field: ${field}`);
  }

  const base = parseLandingMediaItem(value, field);
  const motionLoop = value.motionLoop;

  return {
    assetId: readString(value.assetId, `${field}.assetId`),
    title: base.title,
    ...(base.imageUrl ? { imageUrl: base.imageUrl } : {}),
    ...(base.videoUrl ? { videoUrl: base.videoUrl } : {}),
    altText: base.altText,
    ...(base.caption ? { caption: base.caption } : {}),
    ...(base.narrativeFunction ? { narrativeFunction: base.narrativeFunction } : {}),
    type: readString(value.type, `${field}.type`),
    sortOrder: typeof value.sortOrder === 'number' ? value.sortOrder : 0,
    ...(isRecord(motionLoop) ? { motionLoop: { assetId: readString(motionLoop.assetId, `${field}.motionLoop.assetId`), ...parseLandingMediaItem(motionLoop, `${field}.motionLoop`) } } : {}),
  };
}

function parseRelation(value: unknown, field: string) {
  if (!isRecord(value)) {
    throw new Error(`Invalid pantheon contract field: ${field}`);
  }

  return {
    slug: readString(value.slug, `${field}.slug`),
    name: readString(value.name, `${field}.name`),
    reason: readString(value.reason, `${field}.reason`),
  };
}

function parseRelations(value: unknown, field: string) {
  if (!Array.isArray(value)) {
    throw new Error(`Invalid pantheon contract field: ${field}`);
  }

  return value.map((item, index) => parseRelation(item, `${field}[${index}]`));
}

function readProducts(value: unknown): Product[] {
  if (!Array.isArray(value)) {
    throw new Error('Invalid pantheon contract field: products');
  }

  return value as Product[];
}

function readDrops(value: unknown): Drop[] {
  if (!Array.isArray(value)) {
    throw new Error('Invalid pantheon contract field: drops');
  }

  return value as Drop[];
}

export function parsePantheonArchetype(value: unknown): PantheonArchetype {
  if (!isRecord(value)) {
    throw new Error('Invalid pantheon contract payload');
  }

  assertNoForbiddenFields(value);

  const commerce = isRecord(value.commerce) ? value.commerce : {};

  return {
    slug: readString(value.slug, 'slug'),
    name: readString(value.name, 'name'),
    coreEnergy: readString(value.coreEnergy ?? value.energy, 'coreEnergy'),
    corePhrase: readString(value.corePhrase ?? value.mantra, 'corePhrase'),
    shortManifesto: readString(value.shortManifesto ?? value.manifesto, 'shortManifesto'),
    visualMood: readString(value.visualMood, 'visualMood'),
    palette: readStringArray(value.palette, 'palette'),
    symbols: readStringArray(value.symbols ?? [], 'symbols'),
    ctaLabel: readString(value.ctaLabel ?? 'Enter Portal', 'ctaLabel'),
    galleryPreview: Array.isArray(value.galleryPreview)
      ? value.galleryPreview.map((item, index) => parseGalleryPreviewItem(item, index))
      : [],
    commerce: {
      openMarketAngle: readString(commerce.openMarketAngle ?? 'Open market access remains available.', 'commerce.openMarketAngle'),
      productCategories: readStringArray(commerce.productCategories ?? [], 'commerce.productCategories'),
      marketTags: readStringArray(commerce.marketTags ?? [], 'commerce.marketTags'),
    },
  };
}

export function parsePantheonArchetypes(value: unknown): PantheonArchetype[] {
  if (!Array.isArray(value)) {
    throw new Error('Invalid pantheon archetype collection');
  }

  return value.map(parsePantheonArchetype);
}

export function parsePantheonArchetypeLanding(value: unknown): PantheonArchetypeLanding {
  if (!isRecord(value)) {
    throw new Error('Invalid pantheon landing contract payload');
  }

  assertNoForbiddenFields(value);

  const identity = isRecord(value.identity) ? value.identity : {};
  const narrative = isRecord(value.narrative) ? value.narrative : {};
  const psychology = isRecord(value.psychology) ? value.psychology : {};
  const visualSystem = isRecord(value.visualSystem) ? value.visualSystem : {};
  const commerce = isRecord(value.commerce) ? value.commerce : {};
  const relationships = isRecord(value.relationships) ? value.relationships : {};
  const cta = isRecord(value.cta) ? value.cta : {};
  const seo = isRecord(value.seo) ? value.seo : {};
  const theme = isRecord(value.theme) ? value.theme : {};
  const heroEffect = isRecord(theme.heroEffect) ? theme.heroEffect : {};
  const hero = isRecord(value.hero) ? value.hero : undefined;
  const avatarVideo = isRecord(value.avatarVideo) ? value.avatarVideo : undefined;
  const openGraphImage = readOptionalString(seo.openGraphImage);
  const overlaySlug = readOptionalString(theme.overlaySlug);
  const parsedAvatarVideo = avatarVideo
    ? { assetId: readString(avatarVideo.assetId, 'avatarVideo.assetId'), ...parseLandingMediaItem(avatarVideo, 'avatarVideo') }
    : undefined;

  return {
    slug: readString(value.slug, 'slug'),
    name: readString(value.name, 'name'),
    identity: {
      title: readString(identity.title, 'identity.title'),
      oneLineDefinition: readString(identity.oneLineDefinition, 'identity.oneLineDefinition'),
      coreEnergy: readString(identity.coreEnergy, 'identity.coreEnergy'),
      secondaryEnergies: readStringArray(identity.secondaryEnergies ?? [], 'identity.secondaryEnergies'),
      humanDesire: readString(identity.humanDesire, 'identity.humanDesire'),
      emotionalPromise: readString(identity.emotionalPromise, 'identity.emotionalPromise'),
      symbolicRole: readString(identity.symbolicRole, 'identity.symbolicRole'),
    },
    narrative: {
      corePhrase: readString(narrative.corePhrase, 'narrative.corePhrase'),
      shortManifesto: readString(narrative.shortManifesto, 'narrative.shortManifesto'),
      longManifesto: readString(narrative.longManifesto, 'narrative.longManifesto'),
      shadow: readString(narrative.shadow, 'narrative.shadow'),
      transformationArc: readString(narrative.transformationArc, 'narrative.transformationArc'),
      modernInterpretation: readString(narrative.modernInterpretation, 'narrative.modernInterpretation'),
    },
    psychology: {
      dominantTraits: readStringArray(psychology.dominantTraits ?? [], 'psychology.dominantTraits'),
      behavioralSignals: readStringArray(psychology.behavioralSignals ?? [], 'psychology.behavioralSignals'),
      motivations: readStringArray(psychology.motivations ?? [], 'psychology.motivations'),
      fears: readStringArray(psychology.fears ?? [], 'psychology.fears'),
      aspirations: readStringArray(psychology.aspirations ?? [], 'psychology.aspirations'),
    },
    visualSystem: {
      mood: readString(visualSystem.mood, 'visualSystem.mood'),
      artDirection: readString(visualSystem.artDirection, 'visualSystem.artDirection'),
      palette: Array.isArray(visualSystem.palette)
        ? visualSystem.palette.map((item, index) => {
            if (!isRecord(item)) {
              throw new Error(`Invalid pantheon contract field: visualSystem.palette[${index}]`);
            }

            return {
              name: readString(item.name, `visualSystem.palette[${index}].name`),
              hex: readString(item.hex, `visualSystem.palette[${index}].hex`),
              usage: readString(item.usage, `visualSystem.palette[${index}].usage`),
            };
          })
        : [],
      symbols: readStringArray(visualSystem.symbols ?? [], 'visualSystem.symbols'),
      textures: readStringArray(visualSystem.textures ?? [], 'visualSystem.textures'),
      lighting: readStringArray(visualSystem.lighting ?? [], 'visualSystem.lighting'),
      environments: readStringArray(visualSystem.environments ?? [], 'visualSystem.environments'),
    },
    ...(hero ? { hero: parseLandingHeroMedia(hero, 'hero') } : {}),
    ...(parsedAvatarVideo ? { avatarVideo: parsedAvatarVideo } : {}),
    galleryPreview: Array.isArray(value.galleryPreview) ? value.galleryPreview.map((item, index) => parseLandingGalleryItem(item, index)) : [],
    commerce: {
      productHeading: readString(commerce.productHeading, 'commerce.productHeading'),
      productSubheading: readString(commerce.productSubheading, 'commerce.productSubheading'),
      dropHeading: readString(commerce.dropHeading, 'commerce.dropHeading'),
      dropSubheading: readString(commerce.dropSubheading, 'commerce.dropSubheading'),
      openMarketAngle: readString(commerce.openMarketAngle, 'commerce.openMarketAngle'),
      productCategories: readStringArray(commerce.productCategories ?? [], 'commerce.productCategories'),
      marketTags: readStringArray(commerce.marketTags ?? [], 'commerce.marketTags'),
    },
    relationships: {
      allies: parseRelations(relationships.allies ?? [], 'relationships.allies'),
      contrasts: parseRelations(relationships.contrasts ?? [], 'relationships.contrasts'),
      tensions: parseRelations(relationships.tensions ?? [], 'relationships.tensions'),
    },
    cta: {
      primaryLabel: readString(cta.primaryLabel, 'cta.primaryLabel'),
      primaryHref: readString(cta.primaryHref, 'cta.primaryHref'),
      secondaryLabel: readString(cta.secondaryLabel, 'cta.secondaryLabel'),
      secondaryHref: readString(cta.secondaryHref, 'cta.secondaryHref'),
    },
    seo: {
      title: readString(seo.title, 'seo.title'),
      description: readString(seo.description, 'seo.description'),
      keywords: readStringArray(seo.keywords ?? [], 'seo.keywords'),
      openGraphTitle: readString(seo.openGraphTitle, 'seo.openGraphTitle'),
      openGraphDescription: readString(seo.openGraphDescription, 'seo.openGraphDescription'),
      ...(openGraphImage ? { openGraphImage } : {}),
    },
    theme: {
      ...(overlaySlug ? { overlaySlug } : {}),
      intensityDefault: (readString(theme.intensityDefault ?? 'subtle', 'theme.intensityDefault') as 'subtle' | 'medium'),
      allowedContexts: readStringArray(theme.allowedContexts ?? [], 'theme.allowedContexts'),
      heroEffectProfile: readString(theme.heroEffectProfile ?? 'editorial-float', 'theme.heroEffectProfile') as PantheonArchetypeLanding['theme']['heroEffectProfile'],
      heroEffect: {
        auraColor: readString(heroEffect.auraColor ?? 'rgba(120, 180, 255, 0.18)', 'theme.heroEffect.auraColor'),
        floatDistance: typeof heroEffect.floatDistance === 'number' ? heroEffect.floatDistance : 12,
        portraitTilt: typeof heroEffect.portraitTilt === 'number' ? heroEffect.portraitTilt : 0.8,
        profileLift: typeof heroEffect.profileLift === 'number' ? heroEffect.profileLift : 14,
        signalLift: typeof heroEffect.signalLift === 'number' ? heroEffect.signalLift : 18,
      },
    },
    products: readProducts(value.products),
    drops: readDrops(value.drops),
  };
}

export function orderPantheonArchetypes(archetypes: PantheonArchetype[]) {
  return [...archetypes].sort((left, right) => {
    if (left.slug === 'zeus' && right.slug !== 'zeus') return -1;
    if (left.slug !== 'zeus' && right.slug === 'zeus') return 1;
    return left.name.localeCompare(right.name);
  });
}
