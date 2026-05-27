import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminApi } from './admin.api';

const adminQueryKeys = {
  content: ['admin', 'content'] as const,
  theme: ['admin', 'theme'] as const,
  orders: ['admin', 'orders'] as const,
  audit: ['admin', 'audit'] as const,
  prompts: ['admin', 'prompts'] as const,
};

export function useAdminContentDrafts() {
  return useQuery({ queryKey: adminQueryKeys.content, queryFn: adminApi.getContentDrafts, staleTime: 5_000 });
}

export function useAdminThemeDrafts() {
  return useQuery({ queryKey: adminQueryKeys.theme, queryFn: adminApi.getThemeDrafts, staleTime: 5_000 });
}

export function useAdminOrders() {
  return useQuery({ queryKey: adminQueryKeys.orders, queryFn: adminApi.getOrders, staleTime: 5_000 });
}

export function useAdminAudit() {
  return useQuery({ queryKey: adminQueryKeys.audit, queryFn: adminApi.getAudit, staleTime: 5_000 });
}

export function useAdminPrompts() {
  return useQuery({ queryKey: adminQueryKeys.prompts, queryFn: adminApi.getPrompts, staleTime: 5_000 });
}

export function useUpdateContentDraft() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ slug, body }: { slug: string; body: { manifesto: string; visualMood: string; ctaLabel: string } }) =>
      adminApi.updateContentDraft(slug, body),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: adminQueryKeys.content }),
  });
}

export function usePublishContent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminApi.publishContent,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminQueryKeys.content });
      void queryClient.invalidateQueries({ queryKey: adminQueryKeys.audit });
    },
  });
}

export function useUpdateThemeDraft() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ slug, body }: { slug: string; body: { accent: string; accentSoft: string; panel: string } }) =>
      adminApi.updateThemeDraft(slug, body),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: adminQueryKeys.theme }),
  });
}

export function usePublishTheme() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminApi.publishTheme,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminQueryKeys.theme });
      void queryClient.invalidateQueries({ queryKey: adminQueryKeys.audit });
    },
  });
}
