import { getPantheonPath } from '../pantheon.routes';
import type { CSSProperties } from 'react';
import type { PantheonArchetype, PantheonGalleryPreviewItem } from '../pantheon.types';

const symbolicMap: Record<string, string> = {
  lightning: 'ϟ',
  crown: '♛',
  sun: '☉',
  spear: '▲',
  rose: '✦',
  mirror: '◈',
  moon: '☽',
};

const defaultPalette = ['#120f11', '#2c2216', '#050505'] as const;

export function getPantheonPalette(archetype: PantheonArchetype) {
  return [
    archetype.palette[0] ?? defaultPalette[0],
    archetype.palette[1] ?? archetype.palette[0] ?? defaultPalette[1],
    archetype.palette[2] ?? archetype.palette[1] ?? archetype.palette[0] ?? defaultPalette[2],
  ] as const;
}

export function getPantheonSymbol(archetype: PantheonArchetype) {
  const rawSymbol = archetype.symbols[0]?.trim();
  const symbolKey = rawSymbol?.toLowerCase();

  if (!rawSymbol) return 'XE';

  return symbolKey ? symbolicMap[symbolKey] ?? rawSymbol.slice(0, 2).toUpperCase() : rawSymbol.slice(0, 2).toUpperCase();
}

export function isPantheonAvatarVideoAsset(asset: PantheonGalleryPreviewItem | undefined) {
  if (!asset?.videoUrl) return false;

  return asset.role === 'avatar-video'
    || asset.title.trim().toLowerCase() === 'avatar video'
    || asset.tags.some((tag) => tag.trim().toLowerCase() === 'avatar-video');
}

export function getPantheonPreviewAsset(archetype: PantheonArchetype): PantheonGalleryPreviewItem | undefined {
  return archetype.galleryPreview.find((item) => isPantheonAvatarVideoAsset(item))
    ?? archetype.galleryPreview.find((item) => item.imageUrl)
    ?? archetype.galleryPreview.find((item) => item.videoUrl)
    ?? archetype.galleryPreview[0];
}

export function getPantheonTags(archetype: PantheonArchetype) {
  const preview = getPantheonPreviewAsset(archetype);

  return [...new Set([...archetype.commerce.marketTags, ...(preview?.tags ?? []), ...archetype.commerce.productCategories])].slice(0, 4);
}

export function getPantheonStageStyle(archetype: PantheonArchetype): CSSProperties {
  const [start, mid, end] = getPantheonPalette(archetype);

  return {
    '--pantheon-tone-start': start,
    '--pantheon-tone-mid': mid,
    '--pantheon-tone-end': end,
    '--pantheon-accent-soft': start,
    '--pantheon-accent-strong': mid,
  } as CSSProperties;
}

export function getPantheonPreviewLine(archetype: PantheonArchetype) {
  return archetype.corePhrase || archetype.coreEnergy || archetype.shortManifesto;
}

export function getPantheonMirrorHref(archetype: PantheonArchetype) {
  return getPantheonPath(archetype.slug);
}

export function getPantheonEntryHref(archetype: PantheonArchetype) {
  return getPantheonPath(archetype.slug);
}
