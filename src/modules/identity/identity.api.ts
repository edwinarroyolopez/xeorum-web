import type { IdentityAnswer, IdentityProfile, IdentityQuestion, IdentityResult, IdentitySession } from './identity.types';
import { apiClient } from '../../lib/api';

export const identityApi = {
  getQuestions: () => apiClient.get<IdentityQuestion[]>('/identity/questions'),
  createSession: (body: { anonymousId?: string; userId?: string }) =>
    apiClient.post<IdentitySession>('/identity/sessions', body),
  answerSession: (sessionId: string, body: IdentityAnswer) =>
    apiClient.post<IdentitySession>(`/identity/sessions/${sessionId}/answer`, body),
  completeSession: (sessionId: string) =>
    apiClient.post<{ session: IdentitySession; result: IdentityResult; profile: IdentityProfile }>(
      `/identity/sessions/${sessionId}/complete`
    ),
  getSession: (sessionId: string) =>
    apiClient.get<{ session: IdentitySession; result: IdentityResult; profile: IdentityProfile | null }>(
      `/identity/sessions/${sessionId}`
    ),
  getProfile: () => apiClient.get<IdentityProfile | null>('/identity/profile/me'),
};
