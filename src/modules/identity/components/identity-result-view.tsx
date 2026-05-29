'use client';

import { useQuery } from '@tanstack/react-query';
import { identityApi } from '../identity.api';
import { useRecommendationsForArchetype } from '../../ai-recommendations/recommendations.queries';
import { RecommendationDrops } from '../../ai-recommendations/RecommendationDrops';
import { RecommendationProducts } from '../../ai-recommendations/RecommendationProducts';
import { Card, ErrorState, IdentityResultPanel, LoadingState } from '../../design-system';

export function IdentityResultView({ sessionId }: Readonly<{ sessionId: string }>) {
  const resultQuery = useQuery({
    queryKey: ['identity', 'result', sessionId],
    queryFn: () => identityApi.getSession(sessionId),
    enabled: Boolean(sessionId),
    staleTime: 60_000,
  });
  const recommendations = useRecommendationsForArchetype(resultQuery.data?.result.dominantArchetype ?? '');

  if (resultQuery.isLoading) {
    return <LoadingState>Loading result.</LoadingState>;
  }

  if (resultQuery.isError || !resultQuery.data) {
    return <ErrorState>Result unavailable.</ErrorState>;
  }

  const { result } = resultQuery.data;

  return (
    <section className="section-stack">
      <IdentityResultPanel result={result} />
      {recommendations.data ? (
        <>
          <Card className="identity-ai-copy">
            <p className="portal-card-kicker">AI Explanation</p>
            <p>{recommendations.data.explanation}</p>
            <p>{recommendations.data.outfitExplanation}</p>
          </Card>
          <RecommendationProducts title="Recommended path" products={recommendations.data.recommendedProducts} />
          <RecommendationDrops drops={recommendations.data.recommendedDrops} />
        </>
      ) : null}
    </section>
  );
}
