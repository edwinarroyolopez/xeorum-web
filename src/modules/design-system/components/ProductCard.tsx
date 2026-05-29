import React from 'react';
import type { ProductContract } from '@xeorum/contracts';
import { Card } from './Card';
import { LinkButton } from './Button';
import { Text } from '../primitives/Text';

export function ProductCard({ product }: Readonly<{ product: ProductContract }>) {
  const coverImage = product.media.coverImage?.url ?? product.media.gallery[0]?.url;
  const price = product.pricing.salePrice ?? product.pricing.price;
  const compareAt = product.pricing.compareAtPrice;
  const available = product.variants.some((variant) => variant.available);

  return (
    <Card className="product-card">
      {coverImage ? <div className="product-card-image"><Text tone="muted">{coverImage}</Text></div> : null}
      <Text tone="muted" className="portal-card-kicker">{product.archetypes.primary?.slug ?? 'shop all'}</Text>
      <h3>{product.name}</h3>
      <p>{product.shortDescription ?? product.description}</p>
      <div className="product-meta">
        <span>{product.productDetails.fit}</span>
        <span>{product.productDetails.material}</span>
        <span>{available ? 'In stock' : 'Sold out'}</span>
      </div>
      <div className="product-bottom">
        <strong>{price} {product.pricing.currency}</strong>
        {compareAt && compareAt > price ? <span>{compareAt} {product.pricing.currency}</span> : null}
        <LinkButton href={`/products/${product.slug}`}>View Product</LinkButton>
      </div>
    </Card>
  );
}
