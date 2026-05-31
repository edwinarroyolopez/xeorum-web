import React from 'react';
import type { Product } from '../../products';
import { formatProductLabel } from '../../products/services/product.helpers';
import { HomeIcon } from './HomeIcon';
import { HomeMiniProductCard } from './HomeMiniProductCard';

export function HomeResultPreview({
  product,
  relatedProducts,
}: Readonly<{
  product: Product;
  relatedProducts: Product[];
}>) {
  return (
    <div className="home-live-result-panel">
      <p className="home-kicker home-kicker-with-icon"><HomeIcon name="sparkles" color="#d8b76b" />Resultado vivo</p>
      <h2 className="home-live-result-title">{formatProductLabel(product.archetypes.primary?.slug ?? 'xeorum').toUpperCase()}</h2>
      <p className="home-panel-copy">Tu ruta recomienda piezas con estructura visual fuerte, simbolos sobrios y materialidad pesada. La narrativa amplifica el valor percibido, pero la compra sigue siendo clara.</p>
      <div className="home-mini-product-grid">
        {relatedProducts.map((item) => <HomeMiniProductCard key={item.id} product={item} />)}
      </div>
    </div>
  );
}
