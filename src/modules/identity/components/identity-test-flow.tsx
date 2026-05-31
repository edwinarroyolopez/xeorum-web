'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAnswerIdentitySession, useCompleteIdentitySession, useCreateIdentitySession, useIdentityQuestions } from '../identity.queries';
import type { IdentityAnswer } from '../identity.types';
import { Button, Card, ErrorState, LoadingState } from '../../design-system';

export function IdentityTestFlow() {
  const router = useRouter();
  const questionsQuery = useIdentityQuestions();
  const createSession = useCreateIdentitySession();
  const answerSession = useAnswerIdentitySession();
  const completeSession = useCompleteIdentitySession();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [hasStarted, setHasStarted] = useState(false);

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
    return <LoadingState>Cargando lectura de identidad.</LoadingState>;
  }

  if (questionsQuery.isError) {
    return <ErrorState>El sistema de identidad no esta disponible.</ErrorState>;
  }

  if (!hasStarted) {
    return (
      <section className="identity-flow">
        <Card className="identity-card identity-card-intro">
          <p className="identity-kicker">Descubrir mi fuerza</p>
          <h1>Un test breve para reconocer que energia gobierna tu presencia.</h1>
          <p className="identity-intro-copy">Responde sin sobrepensar. Al final recibes tu fuerza dominante, acceso a tu portal y una primera seleccion de piezas alineadas.</p>
          <div className="identity-intro-signals" aria-label="Senales del test de identidad">
            <span>{questions.length} preguntas</span>
            <span>Sin bloquear la compra</span>
            <span>Resultado inmediato</span>
          </div>
          <div className="portal-actions">
            <Button type="button" variant="primary" onClick={() => setHasStarted(true)}>Comenzar test</Button>
            <Link href="/products" className="ds-button ds-button-ghost">Ver productos primero</Link>
          </div>
        </Card>
      </section>
    );
  }

  return (
    <section className="identity-flow">
      <div className="identity-progress">
        <span>{questions.filter((question) => answers[question.id]).length}/{questions.length}</span>
        <span>Test de identidad</span>
      </div>
      {currentQuestion ? (
        <Card className="identity-card">
          <p className="identity-kicker">Lectura {currentQuestion.version}</p>
          <h1>{currentQuestion.prompt}</h1>
          <div className="identity-options">
            {currentQuestion.options.map((option) => (
              <Button key={option.id} type="button" variant="ghost" onClick={() => void onChoose(currentQuestion.id, option.id)}>
                {option.label}
              </Button>
            ))}
          </div>
        </Card>
      ) : (
        <LoadingState>{isComplete ? 'Preparando resultado.' : 'No hay preguntas publicadas.'}</LoadingState>
      )}
    </section>
  );
}
