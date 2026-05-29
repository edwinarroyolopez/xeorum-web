import React from 'react';
import type { ProductContract } from '@xeorum/contracts';
import { Card } from './Card';
import { LinkButton } from './Button';
import { Text } from '../primitives/Text';

export function ProductCard({ product }: Readonly<{ product: ProductContract }>) {
  return (
    <Card className="product-card">
      <Text tone="muted" className="portal-card-kicker">{product.energy}</Text>
      <h3>{product.name}</h3>
      <p>{product.narrative}</p>
      <div className="product-meta">
        <span>{product.fit}</span>
        <span>{product.material}</span>
        <span>{product.gsm} GSM</span>
      </div>
      <div className="product-bottom">
        <strong>{product.price} {product.currency}</strong>
        <LinkButton href={`/products/${product.slug}`}>View Product</LinkButton>
      </div>
    </Card>
  );
}
