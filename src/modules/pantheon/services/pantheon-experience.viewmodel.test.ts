import { describe, expect, it } from 'vitest';
import { getPantheonPreviewAsset, isPantheonAvatarVideoAsset } from './pantheon-experience.viewmodel';
import type { PantheonArchetype } from '../pantheon.types';

function buildArchetype(galleryPreview: PantheonArchetype['galleryPreview']): PantheonArchetype {
  return {
    slug: 'afrodita',
    name: 'Afrodita',
    coreEnergy: 'Magnetismo estetico',
    corePhrase: 'Beauty becomes influence.',
    shortManifesto: 'Soft power.',
    visualMood: 'Luminosa.',
    palette: ['#111111'],
    symbols: ['rose'],
    ctaLabel: 'Explore archetype',
    galleryPreview,
    commerce: {
      openMarketAngle: 'Open market.',
      productCategories: [],
      marketTags: [],
    },
  };
}

describe('pantheon experience preview asset', () => {
  it('prefers avatar video items over cover images', () => {
    const asset = getPantheonPreviewAsset(buildArchetype([
      {
        title: 'Cover',
        imageUrl: 'https://cdn.example.com/cover.jpg',
        altText: 'Cover image',
        tags: ['cover'],
      },
      {
        title: 'Avatar Video',
        imageUrl: 'https://cdn.example.com/avatar.jpg',
        videoUrl: 'https://cdn.example.com/avatar.mp4',
        altText: 'Avatar video',
        tags: ['avatar-video'],
      },
    ]));

    expect(asset).toEqual(expect.objectContaining({ title: 'Avatar Video', videoUrl: 'https://cdn.example.com/avatar.mp4' }));
    expect(isPantheonAvatarVideoAsset(asset)).toBe(true);
  });

  it('keeps the image fallback when no avatar video exists', () => {
    const asset = getPantheonPreviewAsset(buildArchetype([
      {
        title: 'Cover',
        imageUrl: 'https://cdn.example.com/cover.jpg',
        altText: 'Cover image',
        tags: ['cover'],
      },
      {
        title: 'Gallery motion',
        videoUrl: 'https://cdn.example.com/gallery.mp4',
        altText: 'Gallery video',
        tags: ['gallery'],
      },
    ]));

    expect(asset).toEqual(expect.objectContaining({ title: 'Cover', imageUrl: 'https://cdn.example.com/cover.jpg' }));
    expect(isPantheonAvatarVideoAsset(asset)).toBe(false);
  });
});
