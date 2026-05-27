'use client';

import { useQuery } from '@tanstack/react-query';
import { identityApi } from '../identity.api';

export function IdentityResultView({ sessionId }: Readonly<{ sessionId: string }>) {
  const resultQuery = useQuery({
    queryKey: ['identity', 'result', sessionId],
    queryFn: () => identityApi.getSession(sessionId),
    enabled: Boolean(sessionId),
    staleTime: 60_000,
  });

  if (resultQuery.isLoading) {
    return <p className="identity-state">Loading result.</p>;
  }

  if (resultQuery.isError || !resultQuery.data) {
    return <p className="identity-state">Result unavailable.</p>;
  }

  const { result } = resultQuery.data;

  return (
    <section className="identity-result">
      <p className="identity-kicker">Your Identity</p>
      <h1>{result.dominantArchetype.toUpperCase()}</h1>
      <p>Confidence {result.confidence}%</p>
      <div className="identity-result-grid">
        {Object.entries(result.scores).map(([slug, score]) => (
          <div key={slug} className="identity-score">
            <span>{slug.toUpperCase()}</span>
            <strong>{score}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
