'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAnswerIdentitySession, useCompleteIdentitySession, useCreateIdentitySession, useIdentityQuestions } from '../identity.queries';
import type { IdentityAnswer } from '../identity.types';
import { ActionRow, Badge, Button, Card, ErrorState, Kicker, LinkButton, LoadingState, SectionLabel, SupportingText } from '../../design-system';

export function IdentityTestFlow({ showIntro = true }: Readonly<{ showIntro?: boolean }>) {
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
    return <LoadingState title="Cargando lectura de identidad" description="Preparando preguntas, progresion y acceso al resultado." />;
  }

  if (questionsQuery.isError) {
    return <ErrorState title="Sistema no disponible" description="El sistema de identidad no esta disponible." />;
  }

  if (showIntro && !hasStarted) {
    return (
      <section className="identity-flow">
        <Card className="identity-card identity-card-intro">
          <Kicker tone="muted" className="identity-kicker">Descubrir mi fuerza</Kicker>
          <h1>Un test breve para reconocer que energia gobierna tu presencia.</h1>
          <div className="editorial-ornament" aria-hidden="true">
            <span />
            <i />
            <span />
          </div>
          <SupportingText className="identity-intro-copy">Responde sin sobrepensar. Al final recibes tu fuerza dominante, acceso a tu portal y una primera seleccion de piezas alineadas.</SupportingText>
          <ActionRow className="identity-intro-signals" aria-label="Senales del test de identidad">
            <Badge tone="default">{questions.length} preguntas</Badge>
            <Badge tone="default">Sin bloquear la compra</Badge>
            <Badge tone="accent">Resultado inmediato</Badge>
          </ActionRow>
          <ActionRow className="portal-actions">
            <Button type="button" variant="primary" onClick={() => setHasStarted(true)}>Comenzar test</Button>
            <LinkButton href="/products" variant="ghost">Ver productos primero</LinkButton>
          </ActionRow>
        </Card>
      </section>
    );
  }

  return (
    <section className="identity-flow">
      <ActionRow className="identity-progress" justify="between">
        <Badge tone="accent">{questions.filter((question) => answers[question.id]).length}/{questions.length}</Badge>
        <Badge tone="default">Test de identidad</Badge>
      </ActionRow>
      {currentQuestion ? (
        <Card className="identity-card">
          <Kicker tone="muted" className="identity-kicker">Lectura {currentQuestion.version}</Kicker>
          <h1>{currentQuestion.prompt}</h1>
          <SectionLabel>Tipo {currentQuestion.type}</SectionLabel>
          <ActionRow className="identity-options" align="start">
            {currentQuestion.options.map((option) => (
              <Button key={option.id} type="button" variant="ghost" fullWidth onClick={() => void onChoose(currentQuestion.id, option.id)}>
                {option.label}
              </Button>
            ))}
          </ActionRow>
        </Card>
      ) : (
        <LoadingState description={isComplete ? 'Preparando resultado.' : 'No hay preguntas publicadas.'} />
      )}
    </section>
  );
}
