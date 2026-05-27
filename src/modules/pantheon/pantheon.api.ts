import { apiClient } from '../../lib/api';
import type { PantheonArchetype } from './pantheon.types';

export const pantheonApi = {
  getArchetypes: () => apiClient.get<PantheonArchetype[]>('/pantheon/archetypes'),
  getArchetype: (slug: string) => apiClient.get<PantheonArchetype>(`/pantheon/archetypes/${slug}`),
};
