import { apiClient } from '../../lib/api';
import { parsePantheonArchetype, parsePantheonArchetypes } from './pantheon.types';

export const pantheonApi = {
  getArchetypes: async () => parsePantheonArchetypes(await apiClient.get<unknown>('/pantheon/archetypes')),
  getArchetype: async (slug: string) => parsePantheonArchetype(await apiClient.get<unknown>(`/pantheon/archetypes/${slug}`)),
};
