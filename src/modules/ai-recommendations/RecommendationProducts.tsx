import React from 'react';
import type { ProductContract } from '@xeorum/contracts';
import { EditorialCollectionIntro, ProductCard, SectionHeader } from '../design-system';

export function RecommendationProducts({
  kicker = 'Curaduria editorial',
  title,
  reason,
  products,
}: Readonly<{ kicker?: string; title: string; reason?: string; products: ProductContract[] }>) {
  if (products.length === 0) return null;

  return (
    <section className="section-stack">
      <div className="product-rail-header">
        <SectionHeader kicker={kicker} title={title} />
        {reason ? <EditorialCollectionIntro eyebrow="Criterio XEORUM" title="La seleccion sigue continuidad, no acumulacion." description={reason} /> : null}
      </div>
      <div className="product-grid">
        {products.map((product) => <ProductCard key={product.slug} product={product} />)}
      </div>
    </section>
  );
}
