import { useQuery } from '@tanstack/react-query';
import { dropsApi } from './drops.api';

export const dropsQueryKeys = {
  list: (archetype?: string) => ['drops', archetype ?? 'all'] as const,
  detail: (slug: string) => ['drops', 'detail', slug] as const,
};

export function useDrops(input: { archetype?: string } = {}) {
  return useQuery({
    queryKey: dropsQueryKeys.list(input.archetype),
    queryFn: () => dropsApi.getDrops(input),
    staleTime: 60_000,
  });
}

export function useDrop(slug: string) {
  return useQuery({
    queryKey: dropsQueryKeys.detail(slug),
    queryFn: () => dropsApi.getDrop(slug),
    enabled: Boolean(slug),
    staleTime: 60_000,
  });
}
