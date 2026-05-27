import { apiClient } from '../../lib/api';
import type { RecommendationSet } from './recommendations.types';

export const recommendationsApi = {
  getForMe: () => apiClient.get<RecommendationSet>('/recommendations/me'),
  getForArchetype: (slug: string) => apiClient.get<RecommendationSet>(`/recommendations/archetype/${slug}`),
  getForProduct: (slug: string) => apiClient.get<RecommendationSet>(`/recommendations/products/${slug}`),
};
