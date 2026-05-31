'use client';

import { useQuery } from '@tanstack/react-query';
import { identityApi } from '../identity.api';
import { useRecommendationsForArchetype } from '../../ai-recommendations/recommendations.queries';
import { RecommendationDrops } from '../../ai-recommendations/RecommendationDrops';
import { RecommendationProducts } from '../../ai-recommendations/RecommendationProducts';
import { Card, ErrorState, IdentityResultPanel, LoadingState } from '../../design-system';
import { ThemeCssVariables } from '../../theme/providers/ThemeCssVariables';
import { resolvePageTheme } from '../../theme';

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
  const theme = resolvePageTheme({
    context: 'identity-result',
    archetypeSlug: result.dominantArchetype,
    overlayStrategy: 'published',
  });

  return (
    <ThemeCssVariables theme={theme}>
      <section className="section-stack">
        <IdentityResultPanel result={result} />
        {recommendations.data ? (
          <>
            <Card className="identity-ai-copy identity-ai-copy-product">
              <div className="product-rail-header">
                <p className="portal-card-kicker">Lectura de afinidad</p>
                <h2>Como entra tu fuerza en seleccion, outfit y continuidad.</h2>
                <p className="product-rail-reason">Una explicacion sobria para traducir resultado identitario en criterio de compra y rotacion.</p>
              </div>
              <div className="identity-ai-copy-grid">
                <div>
                  <p className="product-section-label">Afinidad central</p>
                  <p>{recommendations.data.explanation}</p>
                </div>
                {recommendations.data.outfitExplanation ? (
                  <div>
                    <p className="product-section-label">Entrada en outfit</p>
                    <p>{recommendations.data.outfitExplanation}</p>
                  </div>
                ) : null}
              </div>
            </Card>
            <RecommendationProducts kicker="Piezas alineadas" title="Una primera seleccion para construir presencia." reason="No es volumen. Es una entrada util para convertir resultado en producto deseable." products={recommendations.data.recommendedProducts} />
            <RecommendationDrops kicker="Continuidad de drop" title="Drops que prolongan tu lectura activa." reason="Entradas vigentes o proximas que mantienen el mismo eje de identidad." drops={recommendations.data.recommendedDrops} />
          </>
        ) : null}
      </section>
    </ThemeCssVariables>
  );
}
