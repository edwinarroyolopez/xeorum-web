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

  if (query.isLoading) return <LoadingState>Loading product.</LoadingState>;
  if (query.isError || !query.data) return <ErrorState>Product unavailable.</ErrorState>;

  const product = query.data;
  const availableSizes = product.variants.filter((variant) => variant.available).map((variant) => variant.size);
  const cover = product.media.coverImage?.url ?? product.media.gallery[0]?.url;
  const price = product.pricing.salePrice ?? product.pricing.price;

  return (
    <section className="section-stack">
      <Card className="product-detail">
        {cover ? <p className="portal-card-kicker">{cover}</p> : null}
        <h1>{product.name}</h1>
        <strong>{price} {product.pricing.currency}</strong>
        <div className="product-meta product-meta-detail">
          <span>{product.variants.map((variant) => variant.size).join(' / ')}</span>
          <span>{product.variants.some((variant) => variant.available) ? 'Available' : 'Sold out'}</span>
        </div>
        <AddToCartButton productSlug={product.slug} availableSizes={availableSizes} />
        <div className="product-meta product-meta-detail">
          <span>{product.productDetails.material}</span>
          <span>{product.productDetails.fit}</span>
          {product.productDetails.gsm ? <span>{product.productDetails.gsm} GSM</span> : null}
          {product.productDetails.color ? <span>{product.productDetails.color}</span> : null}
        </div>
        <p>{product.description}</p>
        {product.narrative ? <div className="product-compatibility"><p>{product.narrative}</p></div> : null}
        {product.archetypes.primary?.slug ? <p className="portal-card-kicker">Archetype: {product.archetypes.primary.slug}</p> : null}
        <div className="portal-actions">
          {product.archetypes.primary?.slug ? <Link href={`/pantheon/${product.archetypes.primary.slug}`}>Enter {product.archetypes.primary.slug} portal</Link> : null}
          <Link href="/products">Back to products</Link>
        </div>
      </Card>
      {recommendations.data ? (
        <>
          <Card className="identity-ai-copy">
            <p className="portal-card-kicker">AI Explanation</p>
            <p>{recommendations.data.explanation}</p>
            <p>{recommendations.data.outfitExplanation}</p>
          </Card>
          <RecommendationProducts title="Recommended for you" products={recommendations.data.identityMatch} />
          <RecommendationProducts title="Similar products" products={recommendations.data.similarProducts} />
          <RecommendationProducts title="Complete the look" products={recommendations.data.completeTheLook} />
          <RecommendationProducts title="Popular now" products={recommendations.data.popularNow} />
          <RecommendationProducts title="New in this drop" products={recommendations.data.newInThisDrop} />
          <RecommendationProducts title="Same archetype" products={recommendations.data.sameArchetype} />
          <RecommendationProducts title="Contrasting archetype" products={recommendations.data.contrastingArchetype} />
          <RecommendationProducts title="Open market picks" products={recommendations.data.openMarketPicks} />
          <RecommendationDrops drops={recommendations.data.recommendedDrops} />
        </>
      ) : null}
    </section>
  );
}
