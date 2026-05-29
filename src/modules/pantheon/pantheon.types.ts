export type PantheonGalleryPreviewItem = {
  title: string;
  imageUrl?: string;
  altText: string;
  tags: string[];
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

  return {
    title: readString(value.title, `galleryPreview[${index}].title`),
    ...(imageUrl ? { imageUrl } : {}),
    altText: readString(value.altText, `galleryPreview[${index}].altText`),
    tags: readStringArray(value.tags, `galleryPreview[${index}].tags`),
  };
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

export function orderPantheonArchetypes(archetypes: PantheonArchetype[]) {
  return [...archetypes].sort((left, right) => {
    if (left.slug === 'zeus' && right.slug !== 'zeus') return -1;
    if (left.slug !== 'zeus' && right.slug === 'zeus') return 1;
    return left.name.localeCompare(right.name);
  });
}
