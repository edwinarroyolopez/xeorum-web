import { getPantheonPath, getPantheonProductsPath } from '../pantheon.routes';
import type { PantheonArchetypeLanding, PantheonLandingGalleryItem } from '../pantheon.types';

export type ArchetypeLandingCta = {
  href: string;
  label: string;
};

export type ArchetypeLandingViewModel = {
  gallery: PantheonLandingGalleryItem[];
  heroMedia?: {
    source: 'avatar-video' | 'gallery-avatar-video' | 'hero-video' | 'hero-image' | 'gallery-video' | 'gallery-image';
    title: string;
    altText: string;
    imageUrl?: string;
    videoUrl?: string;
  };
  heroSignals: string[];
  primaryCta: ArchetypeLandingCta;
  secondaryCta: ArchetypeLandingCta;
  relatedArchetypes: Array<{ slug: string; name: string; reason: string; href: string }>;
  themeOverlay: 'published' | 'fallback';
  relatedCount: number;
};

function buildPrimaryCta(archetype: PantheonArchetypeLanding): ArchetypeLandingCta {
  return {
    href: archetype.cta.primaryHref || getPantheonProductsPath(archetype.slug),
    label: archetype.cta.primaryLabel || 'Ver piezas de esta fuerza',
  };
}

function buildSecondaryCta(archetype: PantheonArchetypeLanding): ArchetypeLandingCta {
  return {
    href: archetype.cta.secondaryHref || '/identity',
    label: archetype.cta.secondaryLabel || 'Descubrir mi fuerza',
  };
}

function buildRelatedArchetypes(archetype: PantheonArchetypeLanding) {
  const unique = new Map<string, { slug: string; name: string; reason: string }>();

  for (const item of [...archetype.relationships.allies, ...archetype.relationships.contrasts, ...archetype.relationships.tensions]) {
    if (!unique.has(item.slug)) {
      unique.set(item.slug, item);
    }
  }

  return [...unique.values()].slice(0, 3).map((item) => ({
    ...item,
    href: getPantheonPath(item.slug),
  }));
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

function isRenderableMedia(media: { imageUrl?: string; videoUrl?: string } | undefined) {
  return Boolean(media?.videoUrl || media?.imageUrl);
}

function resolveHeroMedia(archetype: PantheonArchetypeLanding) {
  const gallery = sortLandingGallery(archetype.galleryPreview);
  const avatarVideo = archetype.avatarVideo && isRenderableMedia(archetype.avatarVideo)
    ? {
        source: 'avatar-video' as const,
        title: archetype.avatarVideo.title,
        altText: archetype.avatarVideo.altText,
        ...(archetype.avatarVideo.imageUrl ? { imageUrl: archetype.avatarVideo.imageUrl } : {}),
        ...(archetype.avatarVideo.videoUrl ? { videoUrl: archetype.avatarVideo.videoUrl } : {}),
      }
    : undefined;
  const avatarGalleryItem = gallery.find((item) => item.role === 'avatar-video' && isRenderableMedia(item));
  const heroMedia = archetype.hero && isRenderableMedia(archetype.hero)
    ? {
        source: archetype.hero.videoUrl ? 'hero-video' as const : 'hero-image' as const,
        title: archetype.hero.title,
        altText: archetype.hero.altText,
        ...(archetype.hero.imageUrl ? { imageUrl: archetype.hero.imageUrl } : {}),
        ...(archetype.hero.videoUrl ? { videoUrl: archetype.hero.videoUrl } : {}),
      }
    : undefined;
  const galleryMediaItem = gallery.find((item) => isRenderableMedia(item));

  if (avatarVideo) return avatarVideo;
  if (avatarGalleryItem) {
    return {
      source: 'gallery-avatar-video' as const,
      title: avatarGalleryItem.title,
      altText: avatarGalleryItem.altText,
      ...(avatarGalleryItem.imageUrl ? { imageUrl: avatarGalleryItem.imageUrl } : {}),
      ...(avatarGalleryItem.videoUrl ? { videoUrl: avatarGalleryItem.videoUrl } : {}),
    };
  }
  if (heroMedia) return heroMedia;
  if (galleryMediaItem) {
    return {
      source: galleryMediaItem.videoUrl ? 'gallery-video' as const : 'gallery-image' as const,
      title: galleryMediaItem.title,
      altText: galleryMediaItem.altText,
      ...(galleryMediaItem.imageUrl ? { imageUrl: galleryMediaItem.imageUrl } : {}),
      ...(galleryMediaItem.videoUrl ? { videoUrl: galleryMediaItem.videoUrl } : {}),
    };
  }

  return undefined;
}

export function buildArchetypeLandingViewModel(archetype: PantheonArchetypeLanding): ArchetypeLandingViewModel {
  const gallery = sortLandingGallery(archetype.galleryPreview).filter((item) => item.role !== 'avatar-video');
  const heroMedia = resolveHeroMedia(archetype);

  return {
    gallery,
    ...(heroMedia ? { heroMedia } : {}),
    heroSignals: buildHeroSignals(archetype),
    primaryCta: buildPrimaryCta(archetype),
    secondaryCta: buildSecondaryCta(archetype),
    relatedArchetypes: buildRelatedArchetypes(archetype),
    themeOverlay: archetype.theme.overlaySlug ? 'published' : 'fallback',
    relatedCount: archetype.relationships.allies.length + archetype.relationships.contrasts.length + archetype.relationships.tensions.length,
  };
}
