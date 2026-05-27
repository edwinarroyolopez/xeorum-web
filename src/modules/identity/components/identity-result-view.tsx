'use client';

import { useQuery } from '@tanstack/react-query';
import { identityApi } from '../identity.api';
import { useRecommendationsForArchetype } from '../../ai-recommendations/recommendations.queries';
import { RecommendationDrops } from '../../ai-recommendations/RecommendationDrops';
import { RecommendationProducts } from '../../ai-recommendations/RecommendationProducts';

export function IdentityResultView({ sessionId }: Readonly<{ sessionId: string }>) {
  const resultQuery = useQuery({
    queryKey: ['identity', 'result', sessionId],
    queryFn: () => identityApi.getSession(sessionId),
    enabled: Boolean(sessionId),
    staleTime: 60_000,
  });
  const recommendations = useRecommendationsForArchetype(resultQuery.data?.result.dominantArchetype ?? '');

  if (resultQuery.isLoading) {
    return <p className="identity-state">Loading result.</p>;
  }

  if (resultQuery.isError || !resultQuery.data) {
    return <p className="identity-state">Result unavailable.</p>;
  }

  const { result } = resultQuery.data;

  return (
    <section className="section-stack">
      <section className="identity-result">
        <p className="identity-kicker">Your Identity</p>
        <h1>{result.dominantArchetype.toUpperCase()}</h1>
        <p>Confidence {result.confidence}%</p>
        {result.narrativeTitle ? <p className="identity-narrative-title">{result.narrativeTitle}</p> : null}
        {result.narrative ? <p className="identity-narrative-copy">{result.narrative}</p> : null}
        <div className="identity-result-grid">
          {Object.entries(result.scores).map(([slug, score]) => (
            <div key={slug} className="identity-score">
              <span>{slug.toUpperCase()}</span>
              <strong>{score}</strong>
            </div>
          ))}
        </div>
      </section>
      {recommendations.data ? (
        <>
          <article className="identity-ai-copy">
            <p className="portal-card-kicker">AI Explanation</p>
            <p>{recommendations.data.explanation}</p>
            <p>{recommendations.data.outfitExplanation}</p>
          </article>
          <RecommendationProducts title="Recommended path" products={recommendations.data.recommendedProducts} />
          <RecommendationDrops drops={recommendations.data.recommendedDrops} />
        </>
      ) : null}
    </section>
  );
}
