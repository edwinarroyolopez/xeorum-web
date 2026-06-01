import { describe, expect, it } from 'vitest';
import { buildPantheonSelectorViewModel } from './pantheon-selector.viewmodel';
import type { PantheonArchetype } from '../pantheon.types';

function buildArchetype(slug: string, name: string): PantheonArchetype {
  return {
    slug,
    name,
    coreEnergy: `${name} energy`,
    corePhrase: `${name} phrase`,
    shortManifesto: `${name} manifesto`,
    visualMood: `${name} mood`,
    palette: ['#111111'],
    symbols: [],
    ctaLabel: `Enter ${name}`,
    galleryPreview: [],
    commerce: {
      openMarketAngle: `${name} angle`,
      productCategories: [],
      marketTags: [],
    },
  };
}

describe('buildPantheonSelectorViewModel', () => {
  it('orders archetypes through canonical pantheon ordering and derives initial active slug', () => {
    const viewModel = buildPantheonSelectorViewModel([
      buildArchetype('ares', 'Ares'),
      buildArchetype('zeus', 'Zeus'),
      buildArchetype('athena', 'Athena'),
    ]);

    expect(viewModel.orderedArchetypes.map((item) => item.slug)).toEqual(['zeus', 'ares', 'athena']);
    expect(viewModel.initialActiveSlug).toBe('zeus');
  });

  it('returns null initial slug when there are no archetypes', () => {
    const viewModel = buildPantheonSelectorViewModel([]);

    expect(viewModel.orderedArchetypes).toEqual([]);
    expect(viewModel.initialActiveSlug).toBeNull();
  });
});
