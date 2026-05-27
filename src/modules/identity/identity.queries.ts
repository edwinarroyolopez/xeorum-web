import { useMutation, useQuery } from '@tanstack/react-query';
import { identityApi } from './identity.api';

export const identityQueryKeys = {
  questions: ['identity', 'questions'] as const,
  profile: ['identity', 'profile'] as const,
};

export function useIdentityQuestions() {
  return useQuery({ queryKey: identityQueryKeys.questions, queryFn: identityApi.getQuestions, staleTime: 60_000 });
}

export function useIdentityProfile() {
  return useQuery({ queryKey: identityQueryKeys.profile, queryFn: identityApi.getProfile, staleTime: 60_000 });
}

export function useCreateIdentitySession() {
  return useMutation({ mutationFn: identityApi.createSession });
}

export function useAnswerIdentitySession() {
  return useMutation({ mutationFn: ({ sessionId, answer }: { sessionId: string; answer: { questionId: string; optionId: string } }) => identityApi.answerSession(sessionId, answer) });
}

export function useCompleteIdentitySession() {
  return useMutation({ mutationFn: identityApi.completeSession });
}
