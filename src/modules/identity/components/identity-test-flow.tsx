'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAnswerIdentitySession, useCompleteIdentitySession, useCreateIdentitySession, useIdentityQuestions } from '../identity.queries';
import type { IdentityAnswer } from '../identity.types';

export function IdentityTestFlow() {
  const router = useRouter();
  const questionsQuery = useIdentityQuestions();
  const createSession = useCreateIdentitySession();
  const answerSession = useAnswerIdentitySession();
  const completeSession = useCompleteIdentitySession();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = questionsQuery.data ?? [];
  const currentIndex = useMemo(() => questions.findIndex((question) => !answers[question.id]), [answers, questions]);
  const currentQuestion = currentIndex >= 0 ? questions[currentIndex] : questions[questions.length - 1] ?? null;
  const isComplete = questions.length > 0 && questions.every((question) => answers[question.id]);

  async function startIfNeeded() {
    if (sessionId) return sessionId;
    const anonymousId = window.localStorage.getItem('xeorum-anonymous-id');
    const session = await createSession.mutateAsync(
      anonymousId ? { anonymousId } : {}
    );
    window.localStorage.setItem('xeorum-anonymous-id', session.anonymousId ?? '');
    setSessionId(session.id);
    return session.id;
  }

  async function onChoose(questionId: string, optionId: string) {
    const nextAnswers = { ...answers, [questionId]: optionId };
    setAnswers(nextAnswers);
    const id = await startIfNeeded();
    await answerSession.mutateAsync({ sessionId: id, answer: { questionId, optionId } satisfies IdentityAnswer });

    const nextQuestion = questions.find((question) => !nextAnswers[question.id]);
    if (!nextQuestion) {
      const completed = await completeSession.mutateAsync(id);
      router.push(`/identity/result?sessionId=${completed.session.id}`);
    }
  }

  if (questionsQuery.isLoading) {
    return <p className="identity-state">Loading identity questions.</p>;
  }

  if (questionsQuery.isError) {
    return <p className="identity-state">Identity system unavailable.</p>;
  }

  return (
    <section className="identity-flow">
      <div className="identity-progress">
        <span>{questions.filter((question) => answers[question.id]).length}/{questions.length}</span>
        <span>Identity Test</span>
      </div>
      {currentQuestion ? (
        <article className="identity-card">
          <p className="identity-kicker">Version {currentQuestion.version}</p>
          <h1>{currentQuestion.prompt}</h1>
          <div className="identity-options">
            {currentQuestion.options.map((option) => (
              <button key={option.id} type="button" onClick={() => void onChoose(currentQuestion.id, option.id)}>
                {option.label}
              </button>
            ))}
          </div>
        </article>
      ) : (
        <p className="identity-state">{isComplete ? 'Preparing result.' : 'No questions available.'}</p>
      )}
    </section>
  );
}
