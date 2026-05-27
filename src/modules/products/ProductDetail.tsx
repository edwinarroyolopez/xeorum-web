'use client';

import Link from 'next/link';
import { useProduct } from './products.queries';
import { AddToCartButton } from '../cart/AddToCartButton';
import { useRecommendationsForProduct } from '../ai-recommendations/recommendations.queries';
import { RecommendationProducts } from '../ai-recommendations/RecommendationProducts';
import { RecommendationDrops } from '../ai-recommendations/RecommendationDrops';

export function ProductDetail({ slug }: Readonly<{ slug: string }>) {
  const query = useProduct(slug);
  const recommendations = useRecommendationsForProduct(query.data?.slug ?? '');

  if (query.isLoading) return <p className="section-state">Loading product.</p>;
  if (query.isError || !query.data) return <p className="section-state">Product unavailable.</p>;

  const product = query.data;

  return (
    <section className="section-stack">
      <article className="product-detail">
        <p className="portal-card-kicker">{product.energy}</p>
        <h1>{product.name}</h1>
        <p className="product-story">{product.story}</p>
        <div className="product-meta product-meta-detail">
          <span>{product.fit}</span>
          <span>{product.material}</span>
          <span>{product.gsm} GSM</span>
          <span>{product.printTechnique}</span>
          <span>{product.color}</span>
        </div>
        <div className="product-compatibility">
          <strong>{product.identityCompatibility}% Identity Match</strong>
          <p>{product.narrative}</p>
        </div>
        <div className="product-bottom">
          <strong>{product.price} {product.currency}</strong>
          <span>{product.availableSizes?.join(' / ')}</span>
        </div>
        <AddToCartButton productSlug={product.slug} availableSizes={product.availableSizes ?? []} />
        <div className="portal-actions">
          <Link href={`/pantheon/${product.archetypeSlug}`}>Enter {product.archetypeSlug} portal</Link>
          <Link href="/products">Back to products</Link>
        </div>
      </article>
      {recommendations.data ? (
        <>
          <article className="identity-ai-copy">
            <p className="portal-card-kicker">AI Explanation</p>
            <p>{recommendations.data.explanation}</p>
            <p>{recommendations.data.outfitExplanation}</p>
          </article>
          <RecommendationProducts title="Complete the look" products={recommendations.data.completeTheLook} />
          <RecommendationProducts title="Same archetype" products={recommendations.data.sameArchetype} />
          <RecommendationProducts title="Contrasting archetype" products={recommendations.data.contrastingArchetype} />
          <RecommendationDrops drops={recommendations.data.recommendedDrops} />
        </>
      ) : null}
    </section>
  );
}
