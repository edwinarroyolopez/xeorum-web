'use client';

import React, { useState } from 'react';
import { useProduct } from '../hooks/products.queries';
import { AddToCartButton } from '../../cart/AddToCartButton';
import { useRecommendationsForProduct } from '../../ai-recommendations/recommendations.queries';
import { RecommendationDrops } from '../../ai-recommendations/RecommendationDrops';
import { Card, EditorialHeroShell, ErrorState, LinkButton, LoadingState, SectionHeader, SectionLabel } from '../../design-system';
import { ProductPrice } from './ProductPrice';
import { VariantSelector } from './VariantSelector';
import { ProductDetailsBlock } from './ProductDetailsBlock';
import { ProductAvailabilityBadge } from './ProductAvailabilityBadge';
import { RelatedProductsRail } from './RelatedProductsRail';
import {
  getAvailabilityCopy,
  getDefaultVariant,
} from '../services/product.helpers';
import { buildProductDetailViewModel } from '../services/product-detail.viewmodel';
import { ThemeCssVariables } from '../../theme/providers/ThemeCssVariables';
import { resolvePageTheme } from '../../theme';
import { ProductHeroGallery } from './ProductHeroGallery';
import { ProductQuickReadCard } from './ProductQuickReadCard';
import { ProductDecisionCard } from './ProductDecisionCard';
import { ProductPurchaseHero } from './ProductPurchaseHero';
import { ProductStoryCard } from './ProductStoryCard';
import { ProductCommercialContext } from './ProductCommercialContext';
import { ProductIdentityLink } from './ProductIdentityLink';

function dedupeProducts<T extends { slug: string }>(products: T[], currentSlug: string) {
  return products.filter((item, index, list) => item.slug !== currentSlug && list.findIndex((entry) => entry.slug === item.slug) === index);
}

export function ProductDetail({ slug }: Readonly<{ slug: string }>) {
  const query = useProduct(slug);
  const recommendations = useRecommendationsForProduct(query.data?.slug ?? '');
  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(undefined);

  if (query.isLoading) return <LoadingState title="Cargando producto" description="Preparando media, variantes y continuidad editorial." />;
  if (query.isError || !query.data) return <ErrorState title="Producto no disponible" description="La pieza no esta disponible ahora." />;

  const product = query.data;
  const defaultVariant = getDefaultVariant(product);
  const selectedVariant = product.variants.find((variant) => variant.id === selectedVariantId) ?? defaultVariant;
  const availability = getAvailabilityCopy(selectedVariant);
  const viewModel = buildProductDetailViewModel(product, selectedVariant);
  const recommendationData = recommendations.data;
  const sameForceProducts = recommendationData
    ? dedupeProducts([...recommendationData.identityMatch, ...recommendationData.sameArchetype], product.slug).slice(0, 4)
    : [];
  const completeTheLookProducts = recommendationData
    ? dedupeProducts(recommendationData.completeTheLook, product.slug).slice(0, 4)
    : [];
  const openSelectionProducts = recommendationData
    ? dedupeProducts([...recommendationData.similarProducts, ...recommendationData.openMarketPicks], product.slug).slice(0, 4)
    : [];
  const theme = resolvePageTheme({
    context: 'product-detail',
    archetypeSlug: product.archetypes.primary?.slug ?? null,
    overlayStrategy: 'published',
  });

  return (
    <ThemeCssVariables theme={theme}>
      <section className="section-stack xeorum-product-detail-shell">
        <Card className="product-detail xeorum-product-detail-card">
          <EditorialHeroShell
            media={<ProductHeroGallery media={viewModel.gallery} quickNote={<ProductQuickReadCard label={viewModel.quickReadCard.label} description={viewModel.quickReadCard.description} badges={viewModel.quickReadCard.badges} />} />}
            aside={(
              <ProductDecisionCard>
                <ProductPurchaseHero
                  title={viewModel.purchaseHero.title}
                  kicker={viewModel.purchaseHero.kicker}
                  subtitle={viewModel.purchaseHero.subtitle}
                  price={<ProductPrice price={viewModel.price} />}
                  variantSelector={<VariantSelector variants={product.variants} {...(selectedVariant?.id ? { selectedVariantId: selectedVariant.id } : {})} onSelectVariant={setSelectedVariantId} />}
                  availability={(
                    <div className={`product-availability-row product-availability-row-${availability.tone}`}>
                      <ProductAvailabilityBadge label={availability.label} tone={availability.tone} />
                      <span>{availability.detail}</span>
                    </div>
                  )}
                  cta={<AddToCartButton productSlug={product.slug} disabled={!selectedVariant?.available} {...(selectedVariant?.available ? { size: selectedVariant.size } : {})} />}
                  footer={viewModel.storyCard.archetypeHref && viewModel.storyCard.archetypeLabel ? (
                    <ProductIdentityLink href={viewModel.storyCard.archetypeHref}>
                      Ver por que esta pieza pertenece a {viewModel.storyCard.archetypeLabel}
                    </ProductIdentityLink>
                  ) : null}
                />
              </ProductDecisionCard>
            )}
          />
          <div className="xeorum-product-detail-flow">
            <div className="xeorum-product-detail-panel">
              <div className="xeorum-product-detail-panel-copy">
                <h2>{viewModel.detailPanel.title}</h2>
                <p>{viewModel.detailPanel.description}</p>
              </div>
              <ProductDetailsBlock details={product.productDetails} />
            </div>
            {viewModel.storyCard.narrative ? (
              <ProductStoryCard
                title={viewModel.storyCard.title}
                {...(viewModel.storyCard.archetypeLabel ? { symbol: viewModel.storyCard.archetypeLabel.charAt(0) } : {})}
                description={<p>{viewModel.storyCard.narrative}</p>}
                actions={(
                  <>
                    {viewModel.storyCard.archetypeHref && viewModel.storyCard.archetypeLabel ? <LinkButton href={viewModel.storyCard.archetypeHref}>Entrar al portal de {viewModel.storyCard.archetypeLabel}</LinkButton> : null}
                    <LinkButton href="/products" variant="ghost">Volver a coleccion</LinkButton>
                  </>
                )}
              />
            ) : null}
          </div>
          <div className="xeorum-product-context-row">
            <ProductCommercialContext label={viewModel.commercialContext.label} description={viewModel.commercialContext.description} badges={viewModel.commercialContext.badges} />
          </div>
        </Card>
        {recommendations.data ? (
          <>
            <Card className="identity-ai-copy identity-ai-copy-product">
              <SectionHeader
                kicker="Compatibilidad editorial"
                title="Por que esta pieza sostiene tu presencia."
                description="Una lectura breve para conectar afinidad, uso y continuidad sin interrumpir la compra."
              />
              <div className="identity-ai-copy-grid">
                <div>
                  <SectionLabel>Afinidad central</SectionLabel>
                  <p>{recommendations.data.explanation}</p>
                </div>
                {recommendations.data.outfitExplanation ? (
                  <div>
                    <SectionLabel>Entrada en rotacion</SectionLabel>
                    <p>{recommendations.data.outfitExplanation}</p>
                  </div>
                ) : null}
              </div>
            </Card>
            <RelatedProductsRail kicker="Misma fuerza" title="Piezas que sostienen el mismo eje." reason="Comparten afinidad arquetipica y mantienen una lectura coherente alrededor de la pieza principal." products={sameForceProducts} />
            <RelatedProductsRail kicker="Rotacion curada" title="Completa la presencia sin romper el tono." reason="Seleccionadas para convivir con la pieza central con mas continuidad que volumen." products={completeTheLookProducts} />
            <RelatedProductsRail kicker="Seleccion abierta" title="Otras entradas con criterio XEORUM." reason="Una apertura mas amplia para seguir explorando sin perder autoridad editorial." products={openSelectionProducts} />
            <RecommendationDrops drops={recommendations.data.recommendedDrops} />
          </>
        ) : null}
      </section>
    </ThemeCssVariables>
  );
}
