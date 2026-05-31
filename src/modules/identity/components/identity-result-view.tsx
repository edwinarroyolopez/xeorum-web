'use client';

import { useQuery } from '@tanstack/react-query';
import { identityApi } from '../identity.api';
import { useRecommendationsForArchetype } from '../../ai-recommendations/recommendations.queries';
import { RecommendationDrops } from '../../ai-recommendations/RecommendationDrops';
import { RecommendationProducts } from '../../ai-recommendations/RecommendationProducts';
import { Card, EditorialCollectionIntro, ErrorState, IdentityResultPanel, Kicker, LoadingState, SectionHeader, SectionLabel, SignalRow, SupportingText } from '../../design-system';
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
    return <LoadingState title="Preparando tu lectura final" description="Resolviendo resultado, afinidad y continuidad comercial." />;
  }

  if (resultQuery.isError || !resultQuery.data) {
    return <ErrorState title="Lectura no disponible" description="La lectura no esta disponible ahora." />;
  }

  const { result } = resultQuery.data;
  const theme = resolvePageTheme({
    context: 'identity-result',
    archetypeSlug: result.dominantArchetype,
    overlayStrategy: 'published',
  });

  return (
    <ThemeCssVariables theme={theme}>
      <section className="section-stack xeorum-identity-result-shell">
        <Card className="xeorum-identity-result-intro">
          <Kicker>Lectura completada</Kicker>
          <h2>Tu resultado no cierra la compra. La afina.</h2>
          <SupportingText className="product-rail-reason">XEORUM devuelve una fuerza dominante, una narrativa util y una primera continuidad comercial para pasar del simbolo a la seleccion.</SupportingText>
          <SignalRow
            ariaLabel="Resumen del resultado de identidad"
            tone="accent"
            items={[
              result.dominantArchetype.toUpperCase(),
              `${result.confidence}% afinidad`,
              `${result.secondaryArchetypes.length} fuerzas secundarias`,
            ]}
          />
        </Card>
        <IdentityResultPanel result={result} />
        {recommendations.data ? (
          <>
            <Card className="identity-ai-copy identity-ai-copy-product">
              <SectionHeader
                kicker="Lectura de afinidad"
                title="Como entra tu fuerza en seleccion, outfit y continuidad."
                description="Una explicacion sobria para traducir resultado identitario en criterio de compra y rotacion."
              />
              <EditorialCollectionIntro eyebrow="Narrativa subordinada" title="Primero criterio de seleccion, despues expansion del relato." description="La lectura conecta afinidad, outfit y continuidad comercial sin tapar la entrada a producto." />
              <div className="identity-ai-copy-grid">
                <div>
                  <SectionLabel>Afinidad central</SectionLabel>
                  <p>{recommendations.data.explanation}</p>
                </div>
                {recommendations.data.outfitExplanation ? (
                  <div>
                    <SectionLabel>Entrada en outfit</SectionLabel>
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
