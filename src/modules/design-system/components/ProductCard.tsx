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
  const archetypeLabel = product.archetypes.primary?.slug ?? 'shop all';

  return (
    <Card className="product-card">
      <div className="product-card-image" aria-hidden="true">
        {coverImage ? <Text tone="muted">{coverImage}</Text> : <Text tone="muted">XEORUM artifact</Text>}
      </div>
      <div className="product-card-header">
        <Text tone="muted" className="portal-card-kicker">{archetypeLabel}</Text>
        <h3>{product.name}</h3>
        <p>{product.shortDescription ?? product.description}</p>
      </div>
      <div className="product-meta">
        <span>{product.productDetails.fit}</span>
        <span>{product.productDetails.material}</span>
        <span>{available ? 'Disponible' : 'Agotado'}</span>
      </div>
      <div className="product-bottom">
        <div className="product-pricing">
          <strong>{price} {product.pricing.currency}</strong>
          {compareAt && compareAt > price ? <span>{compareAt} {product.pricing.currency}</span> : null}
        </div>
        <LinkButton href={`/products/${product.slug}`}>Ver pieza</LinkButton>
      </div>
    </Card>
  );
}
