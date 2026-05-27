import { useQuery } from '@tanstack/react-query';
import { recommendationsApi } from './recommendations.api';

export function useRecommendationsForMe() {
  return useQuery({ queryKey: ['recommendations', 'me'], queryFn: recommendationsApi.getForMe, staleTime: 60_000 });
}

export function useRecommendationsForArchetype(slug: string) {
  return useQuery({
    queryKey: ['recommendations', 'archetype', slug],
    queryFn: () => recommendationsApi.getForArchetype(slug),
    enabled: Boolean(slug),
    staleTime: 60_000,
  });
}

export function useRecommendationsForProduct(slug: string) {
  return useQuery({
    queryKey: ['recommendations', 'product', slug],
    queryFn: () => recommendationsApi.getForProduct(slug),
    enabled: Boolean(slug),
    staleTime: 60_000,
  });
}
