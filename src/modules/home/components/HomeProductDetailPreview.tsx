import React from 'react';
import type { HomeFeaturedProduct } from '../services/home.types';
import { HomeIcon } from './HomeIcon';
import { HomeProductVisual } from './HomeProductVisual';
import { LinkButton } from '../../design-system';

export function HomeProductDetailPreview({ product }: Readonly<{ product: HomeFeaturedProduct }>) {
  const productAttributes = [
    product.productDetails.fit,
    product.productDetails.material,
    product.productDetails.color,
    product.homeStockLabel,
  ].filter((item): item is string => Boolean(item));

  return (
    <div className="home-product-story-panel">
      <HomeProductVisual product={product} compact />
      <div className="home-product-story-copy">
        <p className="home-kicker">Product detail</p>
        <h2 className="home-section-title">{product.name}</h2>
        <p className="home-panel-copy">PDP con galeria protagonista, tallas visibles, materialidad, disponibilidad y narrativa subordinada. El mito acompana; la compra no se vuelve confusa.</p>
        <div className="home-attribute-grid">
          {productAttributes.map((item) => <div key={item} className="home-attribute-chip">{item}</div>)}
        </div>
        <LinkButton href={`/products/${product.slug}`} variant="primary" size="lg" className="home-primary-cta">Ver producto <HomeIcon name="arrow" color="black" /></LinkButton>
      </div>
    </div>
  );
}
