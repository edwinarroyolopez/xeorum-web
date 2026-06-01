import type { PantheonArchetype } from '../pantheon.types';
import { orderPantheonArchetypes } from '../pantheon.types';

export type PantheonSelectorViewModel = {
  orderedArchetypes: PantheonArchetype[];
  initialActiveSlug: string | null;
};

export function buildPantheonSelectorViewModel(archetypes: PantheonArchetype[]): PantheonSelectorViewModel {
  const orderedArchetypes = orderPantheonArchetypes(archetypes);

  return {
    orderedArchetypes,
    initialActiveSlug: orderedArchetypes[0]?.slug ?? null,
  };
}
