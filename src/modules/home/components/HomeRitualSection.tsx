import React from 'react';
import type { Product } from '../../products';
import { HomeResultPreview } from './HomeResultPreview';
import { HomeRitualPreview } from './HomeRitualPreview';

export function HomeRitualSection({ product, relatedProducts }: Readonly<{ product: Product; relatedProducts: Product[] }>) {
  return (
    <section className="home-shell home-ritual-shell">
      <div className="home-ritual-grid">
        <HomeRitualPreview />
        <HomeResultPreview product={product} relatedProducts={relatedProducts} />
      </div>
    </section>
  );
}
