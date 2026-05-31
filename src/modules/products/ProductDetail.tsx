'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useProduct } from './products.queries';
import { AddToCartButton } from '../cart/AddToCartButton';
import { useRecommendationsForProduct } from '../ai-recommendations/recommendations.queries';
import { RecommendationDrops } from '../ai-recommendations/RecommendationDrops';
import { Card, ErrorState, LoadingState, ProductSignalStrip, SectionHeader } from '../design-system';
import { ProductGallery } from './ProductGallery';
import { ProductPrice } from './ProductPrice';
import { VariantSelector } from './VariantSelector';
import { ProductDetailsBlock } from './ProductDetailsBlock';
import { ProductAvailabilityBadge } from './ProductAvailabilityBadge';
import { RelatedProductsRail } from './RelatedProductsRail';
import {
  getAvailabilityCopy,
  getDefaultVariant,
  getDisplayPrice,
  formatProductLabel,
  getProductGallery,
} from './product.helpers';
import { ThemeCssVariables } from '../theme/providers/ThemeCssVariables';
import { resolvePageTheme } from '../theme';

function dedupeProducts<T extends { slug: string }>(products: T[], currentSlug: string) {
  return products.filter((item, index, list) => item.slug !== currentSlug && list.findIndex((entry) => entry.slug === item.slug) === index);
}

export function ProductDetail({ slug }: Readonly<{ slug: string }>) {
  const query = useProduct(slug);
  const recommendations = useRecommendationsForProduct(query.data?.slug ?? '');
  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(undefined);

  if (query.isLoading) return <LoadingState>Cargando producto.</LoadingState>;
  if (query.isError || !query.data) return <ErrorState>Producto no disponible.</ErrorState>;

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
  ].filter(Boolean) as string[];
  const archetypeName = product.archetypes.primary?.slug ? formatProductLabel(product.archetypes.primary.slug) : null;
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
          </div>
          <div className="xeorum-product-purchase-panel xeorum-product-purchase-panel-main">
            <p className="portal-card-kicker">{archetypeName ? `Fuerza ${archetypeName}` : 'Seleccion abierta'}</p>
            <h1>{product.name}</h1>
            {product.subtitle ? <p className="xeorum-product-subtitle">{product.subtitle}</p> : null}
            <ProductPrice price={price} />
            <ProductSignalStrip signals={productSignals} className="product-meta-detail" />
            <div className="product-purchase-intro">
              <p className="product-section-label">Eleccion activa</p>
              <p>{selectedVariant?.available ? `La talla ${selectedVariant.size} define precio, disponibilidad y entrada inmediata al carrito.` : 'Elige una talla disponible para abrir la compra con total claridad.'}</p>
            </div>
            <VariantSelector variants={product.variants} {...(selectedVariant?.id ? { selectedVariantId: selectedVariant.id } : {})} onSelectVariant={setSelectedVariantId} />
            <div className="product-availability-row">
              <ProductAvailabilityBadge label={availability.label} tone={availability.tone} />
              <span>{availability.detail}</span>
            </div>
            <AddToCartButton productSlug={product.slug} disabled={!selectedVariant?.available} {...(selectedVariant?.available ? { size: selectedVariant.size } : {})} />
            <ProductDetailsBlock details={product.productDetails} />
            <div className="product-story-block">
              <div className="xeorum-product-copy">
                <p className="product-section-label">La pieza</p>
                <p>{product.description}</p>
              </div>
              {product.narrative ? (
                <div className="product-compatibility">
                  <p className="product-section-label">Marco identitario</p>
                  <p>{product.narrative}</p>
                </div>
              ) : null}
            </div>
            <div className="portal-actions xeorum-product-links">
              {product.archetypes.primary?.slug ? <Link href={`/identity/${product.archetypes.primary.slug}`}>Entrar al portal de {archetypeName}</Link> : null}
              <Link href="/products">Volver a productos</Link>
            </div>
          </div>
          <div className="xeorum-product-copy xeorum-product-copy-secondary">
            <div className="product-meta product-meta-detail">
              {product.variants.length ? <span>{product.variants.map((variant) => variant.size).join(' / ')}</span> : null}
              {taxonomy?.dropSlug ? <span>{formatProductLabel(taxonomy.dropSlug)}</span> : null}
              {(taxonomy?.marketTags ?? []).map((tag) => <span key={tag}>{formatProductLabel(tag)}</span>)}
            </div>
          </div>
        </Card>
        {recommendations.data ? (
          <>
            <Card className="identity-ai-copy identity-ai-copy-product">
              <div className="product-rail-header">
                <SectionHeader
                  kicker="Compatibilidad editorial"
                  title="Por que esta pieza sostiene tu presencia."
                  description="Una lectura breve para conectar afinidad, uso y continuidad sin interrumpir la compra."
                />
              </div>
              <div className="identity-ai-copy-grid">
                <div>
                  <p className="product-section-label">Afinidad central</p>
                  <p>{recommendations.data.explanation}</p>
                </div>
                {recommendations.data.outfitExplanation ? (
                  <div>
                    <p className="product-section-label">Entrada en rotacion</p>
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
