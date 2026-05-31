import React from 'react';
import type { ProductContract } from '@xeorum/contracts';
import { formatProductLabel, formatProductPrice, getDisplayPrice, getPrimaryProductMedia } from '../../products/services/product.helpers';
import { HomeIcon } from './HomeIcon';

export function HomeProductVisual({ product, compact = false }: Readonly<{ product: ProductContract; compact?: boolean }>) {
  const coverImage = getPrimaryProductMedia(product);
  const price = getDisplayPrice(product);
  const archetype = formatProductLabel(product.archetypes.primary?.slug ?? product.name).toUpperCase();
  const color = product.productDetails.color ?? 'Seleccion XEORUM';

  return (
    <div className={`home-product-visual${compact ? ' is-compact' : ''}`}>
      <div className="home-product-visual-glow" />
      <div className="home-product-visual-line" />
      {coverImage ? <img src={coverImage.url} alt={coverImage.alt || product.name} className="home-product-visual-image" /> : null}
      <div className="home-product-visual-garment">
        <div className="home-product-visual-neck" />
        <div className="home-product-visual-copy">
          <p>XEORUM</p>
          <span>{archetype}</span>
          <div className="home-product-visual-badge">
            <HomeIcon name="crown" color="#d8b76b" />
          </div>
        </div>
      </div>
      <div className="home-product-visual-footer">
        <span>{color}</span>
        <strong>{formatProductPrice(price.basePrice, price.currency)}</strong>
      </div>
    </div>
  );
}
