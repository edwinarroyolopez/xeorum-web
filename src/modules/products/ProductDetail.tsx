'use client';

import React from 'react';
import Link from 'next/link';
import { useProduct } from './products.queries';
import { AddToCartButton } from '../cart/AddToCartButton';
import { useRecommendationsForProduct } from '../ai-recommendations/recommendations.queries';
import { RecommendationProducts } from '../ai-recommendations/RecommendationProducts';
import { RecommendationDrops } from '../ai-recommendations/RecommendationDrops';
import { Card, ErrorState, LoadingState } from '../design-system';

export function ProductDetail({ slug }: Readonly<{ slug: string }>) {
  const query = useProduct(slug);
  const recommendations = useRecommendationsForProduct(query.data?.slug ?? '');

  if (query.isLoading) return <LoadingState>Cargando producto.</LoadingState>;
  if (query.isError || !query.data) return <ErrorState>Producto no disponible.</ErrorState>;

  const product = query.data;
  const availableSizes = product.variants.filter((variant) => variant.available).map((variant) => variant.size);
  const cover = product.media.coverImage?.url ?? product.media.gallery[0]?.url;
  const price = product.pricing.salePrice ?? product.pricing.price;
  const available = product.variants.some((variant) => variant.available);

  return (
    <section className="section-stack xeorum-product-detail-shell">
      <Card className="product-detail xeorum-product-detail-card">
        <div className="xeorum-product-hero" aria-hidden="true">
          <div className="xeorum-product-hero-frame">{cover ?? 'XEORUM artifact'}</div>
        </div>
        <div className="xeorum-product-copy">
          {cover ? <p className="portal-card-kicker">Editorial asset</p> : null}
          <h1>{product.name}</h1>
          <p className="portal-core-phrase">{product.archetypes.primary?.slug ?? 'shop all'}</p>
          <p>{product.description}</p>
        </div>
        <div className="xeorum-product-purchase-panel">
          <div className="product-pricing xeorum-product-pricing">
            <strong>{price} {product.pricing.currency}</strong>
            <span>{available ? 'Disponible' : 'Agotado'}</span>
          </div>
          <div className="product-meta product-meta-detail">
            <span>{product.variants.map((variant) => variant.size).join(' / ')}</span>
            <span>{product.productDetails.material}</span>
            <span>{product.productDetails.fit}</span>
            {product.productDetails.gsm ? <span>{product.productDetails.gsm} GSM</span> : null}
            {product.productDetails.color ? <span>{product.productDetails.color}</span> : null}
          </div>
          <AddToCartButton productSlug={product.slug} availableSizes={availableSizes} />
          {product.narrative ? <div className="product-compatibility"><p>{product.narrative}</p></div> : null}
          <div className="portal-actions xeorum-product-links">
            {product.archetypes.primary?.slug ? <Link href={`/pantheon/${product.archetypes.primary.slug}`}>Entrar al portal de {product.archetypes.primary.slug}</Link> : null}
            <Link href="/products">Volver a productos</Link>
          </div>
        </div>
      </Card>
      {recommendations.data ? (
        <>
          <Card className="identity-ai-copy">
            <p className="portal-card-kicker">Lectura IA</p>
            <p>{recommendations.data.explanation}</p>
            <p>{recommendations.data.outfitExplanation}</p>
          </Card>
          <RecommendationProducts title="Recomendado para ti" products={recommendations.data.identityMatch} />
          <RecommendationProducts title="Piezas afines" products={recommendations.data.similarProducts} />
          <RecommendationProducts title="Completa la expresion" products={recommendations.data.completeTheLook} />
          <RecommendationProducts title="Lo mas elegido ahora" products={recommendations.data.popularNow} />
          <RecommendationProducts title="Nuevo en este drop" products={recommendations.data.newInThisDrop} />
          <RecommendationProducts title="Mismo arquetipo" products={recommendations.data.sameArchetype} />
          <RecommendationProducts title="Arquetipo en contraste" products={recommendations.data.contrastingArchetype} />
          <RecommendationProducts title="Selecciones abiertas" products={recommendations.data.openMarketPicks} />
          <RecommendationDrops drops={recommendations.data.recommendedDrops} />
        </>
      ) : null}
    </section>
  );
}
