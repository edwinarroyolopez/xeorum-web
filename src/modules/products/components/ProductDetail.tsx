'use client';

import React, { useState } from 'react';
import { useProduct } from '../hooks/products.queries';
import { AddToCartButton } from '../../cart/AddToCartButton';
import { useRecommendationsForProduct } from '../../ai-recommendations/recommendations.queries';
import { RecommendationDrops } from '../../ai-recommendations/RecommendationDrops';
import { ActionRow, Card, ErrorState, LinkButton, LoadingState, ProductPresenceGrid, ProductPriceBlock, ProductSignalStrip, SectionHeader, SectionLabel, SupportingText } from '../../design-system';
import { ProductGallery } from './ProductGallery';
import { ProductPrice } from './ProductPrice';
import { VariantSelector } from './VariantSelector';
import { ProductDetailsBlock } from './ProductDetailsBlock';
import { ProductAvailabilityBadge } from './ProductAvailabilityBadge';
import { RelatedProductsRail } from './RelatedProductsRail';
import { ProductDetailBadgeGroup } from './ProductDetailBadgeGroup';
import { ProductDetailHeader } from './ProductDetailHeader';
import { ProductDetailInfoCard } from './ProductDetailInfoCard';
import {
  getAvailabilityCopy,
  getDefaultVariant,
  getDisplayPrice,
  formatProductLabel,
  getProductGallery,
} from '../services/product.helpers';
import { ThemeCssVariables } from '../../theme/providers/ThemeCssVariables';
import { resolvePageTheme } from '../../theme';

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
  const gallery = getProductGallery(product);
  const defaultVariant = getDefaultVariant(product);
  const selectedVariant = product.variants.find((variant) => variant.id === selectedVariantId) ?? defaultVariant;
  const availability = getAvailabilityCopy(selectedVariant);
  const price = getDisplayPrice(product, selectedVariant);
  const recommendationData = recommendations.data;
  const taxonomy = product.taxonomy;
  const sameForceProducts = recommendationData
    ? dedupeProducts([...recommendationData.identityMatch, ...recommendationData.sameArchetype], product.slug).slice(0, 4)
    : [];
  const completeTheLookProducts = recommendationData
    ? dedupeProducts(recommendationData.completeTheLook, product.slug).slice(0, 4)
    : [];
  const openSelectionProducts = recommendationData
    ? dedupeProducts([...recommendationData.similarProducts, ...recommendationData.openMarketPicks], product.slug).slice(0, 4)
    : [];
  const productSignals = [
    product.productDetails.fit ? `Fit ${product.productDetails.fit}` : null,
    product.productDetails.material,
    product.productDetails.color,
    taxonomy?.dropSlug ? `Drop ${formatProductLabel(taxonomy.dropSlug)}` : null,
    ...(taxonomy?.marketTags ?? []).map((tag) => formatProductLabel(tag)),
  ].filter(Boolean).slice(0, 3) as string[];
  const archetypeName = product.archetypes.primary?.slug ? formatProductLabel(product.archetypes.primary.slug) : null;
  const quickReadBadges = [
    archetypeName ? { label: archetypeName } : null,
    selectedVariant?.size ? { label: `Talla ${selectedVariant.size}`, tone: 'accent' as const } : null,
  ].filter(Boolean) as Array<{ label: string; tone?: 'default' | 'accent' }>;
  const contextBadges = [
    taxonomy?.dropSlug ? { label: formatProductLabel(taxonomy.dropSlug) } : null,
    ...(taxonomy?.marketTags ?? []).map((tag) => ({ label: formatProductLabel(tag) })),
  ].filter(Boolean).slice(0, 3) as Array<{ label: string; tone?: 'default' | 'accent' }>;
  const theme = resolvePageTheme({
    context: 'product-detail',
    archetypeSlug: product.archetypes.primary?.slug ?? null,
    overlayStrategy: 'published',
  });

  return (
    <ThemeCssVariables theme={theme}>
      <section className="section-stack xeorum-product-detail-shell">
        <Card className="product-detail xeorum-product-detail-card">
          <div className="xeorum-product-hero">
            <ProductGallery media={gallery} />
            <ProductDetailInfoCard
              label="Lectura rapida"
              description="Producto visible, precio claro, disponibilidad explicita. El relato se suma sin tapar la pieza."
              className="xeorum-product-summary-panel"
            >
              <ProductDetailBadgeGroup items={quickReadBadges} />
            </ProductDetailInfoCard>
          </div>
          <div className="xeorum-product-purchase-panel xeorum-product-purchase-panel-main">
            <ProductDetailHeader kicker={archetypeName ? `Fuerza ${archetypeName}` : 'Seleccion abierta'} title={product.name} {...(product.subtitle ? { subtitle: product.subtitle } : {})} />
            <ProductPresenceGrid
              items={[
                {
                  label: 'Presencia',
                  value: archetypeName ?? 'Open Market',
                  description: product.productDetails.fit ? `Fit ${product.productDetails.fit}` : 'Lectura abierta de silueta y materialidad.',
                },
                {
                  label: 'Disponibilidad',
                  value: availability.label,
                  description: availability.detail,
                },
              ]}
            />
            <ProductPriceBlock>
              <ProductPrice price={price} />
            </ProductPriceBlock>
            <ProductSignalStrip signals={productSignals} className="product-meta-detail" />
            <div className="xeorum-product-module-stack">
              <ProductDetailInfoCard
                className="product-purchase-intro"
                label="Eleccion activa"
                description={selectedVariant?.available ? `La talla ${selectedVariant.size} define precio, disponibilidad y entrada inmediata al carrito.` : 'Elige una talla disponible para abrir la compra con total claridad.'}
              />
              <VariantSelector variants={product.variants} {...(selectedVariant?.id ? { selectedVariantId: selectedVariant.id } : {})} onSelectVariant={setSelectedVariantId} />
              <div className="product-availability-row">
                <ProductAvailabilityBadge label={availability.label} tone={availability.tone} />
                <span>{availability.detail}</span>
              </div>
              <AddToCartButton productSlug={product.slug} disabled={!selectedVariant?.available} {...(selectedVariant?.available ? { size: selectedVariant.size } : {})} />
              <ProductDetailsBlock details={product.productDetails} />
              <div className="product-story-block xeorum-product-story-grid">
                <ProductDetailInfoCard className="xeorum-product-story-panel" label="La pieza" description={product.description} />
                {product.narrative ? (
                  <ProductDetailInfoCard className="product-compatibility xeorum-product-story-panel" label="Marco identitario" description={product.narrative} />
                ) : null}
              </div>
              <ActionRow className="xeorum-product-link-panel">
                {product.archetypes.primary?.slug ? <LinkButton href={`/identity/${product.archetypes.primary.slug}`}>Entrar al portal de {archetypeName}</LinkButton> : null}
                <LinkButton href="/products" variant="ghost">Volver a productos</LinkButton>
              </ActionRow>
            </div>
          </div>
          <div className="xeorum-product-copy xeorum-product-copy-secondary xeorum-product-meta-panel">
            <div className="xeorum-product-meta-panel-header">
              <div>
                <SectionLabel>Contexto comercial</SectionLabel>
                <SupportingText className="xeorum-product-meta-panel-copy">Senales editadas para entender la pieza en una lectura rapida y consistente.</SupportingText>
              </div>
            </div>
            <ProductDetailBadgeGroup items={contextBadges} />
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
