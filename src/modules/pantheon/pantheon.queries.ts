import { useQuery } from '@tanstack/react-query';
import { pantheonApi } from './pantheon.api';

export const pantheonQueryKeys = {
  archetypes: ['pantheon', 'archetypes'] as const,
  archetype: (slug: string) => ['pantheon', 'archetype', slug] as const,
};

export function usePantheonArchetypes() {
  return useQuery({ queryKey: pantheonQueryKeys.archetypes, queryFn: pantheonApi.getArchetypes, staleTime: 60_000 });
}

export function usePantheonArchetype(slug: string) {
  return useQuery({
    queryKey: pantheonQueryKeys.archetype(slug),
    queryFn: () => pantheonApi.getArchetype(slug),
    enabled: Boolean(slug),
    staleTime: 60_000,
  });
}
