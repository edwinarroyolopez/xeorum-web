import React from 'react';
import type { ProductContract } from '@xeorum/contracts';
import { HomeProductVisual } from './HomeProductVisual';

export function HomeMiniProductCard({ product }: Readonly<{ product: ProductContract }>) {
  return (
    <article className="home-mini-product-card">
      <HomeProductVisual product={product} compact />
      <p>{product.name}</p>
      <span>Afinidad alta</span>
    </article>
  );
}
