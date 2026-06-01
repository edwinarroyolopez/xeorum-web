import type { PantheonArchetypeLanding, PantheonLandingGalleryItem } from '../pantheon.types';

export type ArchetypeLandingCta = {
  href: string;
  label: string;
};

export type ArchetypeLandingViewModel = {
  gallery: PantheonLandingGalleryItem[];
  heroSignals: string[];
  primaryCta: ArchetypeLandingCta;
  secondaryCta: ArchetypeLandingCta;
  zeusPilotActive: boolean;
  relatedCount: number;
};

function buildPrimaryCta(archetype: PantheonArchetypeLanding): ArchetypeLandingCta {
  return {
    href: archetype.cta.primaryHref || `/products?archetype=${archetype.slug}`,
    label: archetype.cta.primaryLabel || 'Ver piezas de esta fuerza',
  };
}

function buildSecondaryCta(archetype: PantheonArchetypeLanding): ArchetypeLandingCta {
  return {
    href: archetype.cta.secondaryHref || '/identity',
    label: archetype.cta.secondaryLabel || 'Descubrir mi fuerza',
  };
}

function buildHeroSignals(archetype: PantheonArchetypeLanding) {
  return [
    archetype.identity.coreEnergy,
    archetype.psychology.dominantTraits[0],
    archetype.commerce.productCategories[0],
  ].filter(Boolean) as string[];
}

function sortLandingGallery(gallery: PantheonLandingGalleryItem[]) {
  return [...gallery].sort((left, right) => left.sortOrder - right.sortOrder);
}

export function buildArchetypeLandingViewModel(archetype: PantheonArchetypeLanding): ArchetypeLandingViewModel {
  return {
    gallery: sortLandingGallery(archetype.galleryPreview),
    heroSignals: buildHeroSignals(archetype),
    primaryCta: buildPrimaryCta(archetype),
    secondaryCta: buildSecondaryCta(archetype),
    zeusPilotActive: archetype.slug === 'zeus' && !archetype.theme.overlaySlug,
    relatedCount: archetype.relationships.allies.length + archetype.relationships.contrasts.length + archetype.relationships.tensions.length,
  };
}
