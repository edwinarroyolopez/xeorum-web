import { apiClient } from '../../lib/api';
import type { AdminAuditEntry, AdminContentEntry, AdminOrderEntry, AdminThemeEntry } from './admin.types';

const actorHeaders = { requestId: 'admin-ui', adminActor: 'admin-ui' } as const;

export const adminApi = {
  getContentDrafts: () => apiClient.get<AdminContentEntry[]>('/admin/content/archetypes'),
  updateContentDraft: (slug: string, body: Pick<AdminContentEntry, 'manifesto' | 'visualMood' | 'ctaLabel'>) =>
    apiClient.patch<AdminContentEntry>(`/admin/content/archetypes/${slug}/draft`, body, actorHeaders),
  publishContent: (slug: string) => apiClient.post<AdminContentEntry>(`/admin/content/archetypes/${slug}/publish`, undefined, actorHeaders),
  getThemeDrafts: () => apiClient.get<AdminThemeEntry[]>('/admin/theme/archetypes'),
  updateThemeDraft: (slug: string, body: Pick<AdminThemeEntry, 'accent' | 'accentSoft' | 'panel'>) =>
    apiClient.patch<AdminThemeEntry>(`/admin/theme/archetypes/${slug}/draft`, body, actorHeaders),
  publishTheme: (slug: string) => apiClient.post<AdminThemeEntry>(`/admin/theme/archetypes/${slug}/publish`, undefined, actorHeaders),
  getOrders: () => apiClient.get<AdminOrderEntry[]>('/admin/orders'),
  getAudit: () => apiClient.get<AdminAuditEntry[]>('/admin/audit'),
  getPrompts: () => apiClient.get<Array<{ name: string; version: number; status: string }>>('/admin/prompts'),
};
