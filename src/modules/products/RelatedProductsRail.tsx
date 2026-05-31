import React from 'react';
import type { ProductContract } from '@xeorum/contracts';
import { EditorialCollectionIntro, SectionHeader } from '../design-system';
import { ProductCard } from './ProductCard';

export function RelatedProductsRail({
  kicker,
  title,
  reason,
  products,
}: Readonly<{
  kicker: string;
  title: string;
  reason?: string;
  products: ProductContract[];
}>) {
  if (products.length === 0) return null;

  return (
    <section className="section-stack">
      <div className="product-rail-header">
        <SectionHeader kicker={kicker} title={title} />
        {reason ? <EditorialCollectionIntro eyebrow="Lectura editorial" title="Por que esta seleccion sigue el mismo eje." description={reason} /> : null}
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
