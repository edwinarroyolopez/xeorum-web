import { apiClient } from '../../lib/api';
import type { Drop } from './drops.types';

export const dropsApi = {
  getDrops: (input: { archetype?: string } = {}) => {
    const search = new URLSearchParams();
    if (input.archetype) search.set('archetype', input.archetype);
    const suffix = search.toString() ? `?${search.toString()}` : '';
    return apiClient.get<Drop[]>(`/drops${suffix}`);
  },
  getDrop: (slug: string) => apiClient.get<Drop>(`/drops/${slug}`),
};
