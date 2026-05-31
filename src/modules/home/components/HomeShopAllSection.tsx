import React from 'react';
import type { Product } from '../../products';
import { ProductCard } from '../../products/components/ProductCard';
import { HomeSectionShell } from './HomeSectionShell';

export function HomeShopAllSection({
  products,
  selectedSlug,
  onSelect,
}: Readonly<{
  products: Product[];
  selectedSlug: string;
  onSelect: (slug: string) => void;
}>) {
  return (
    <HomeSectionShell
      kicker="Shop All"
      title="La tienda primero debe vender producto."
      description="Cards con prenda, precio, fit, stock y afinidad. La identidad suma valor, pero el cliente nunca queda atrapado en una experiencia abstracta."
      className="home-shop-shell"
    >
      <div className="home-products-grid">
        {products.map((product) => (
          <article key={product.id} className={`home-product-card-shell${selectedSlug === product.slug ? ' is-active' : ''}`}>
            <ProductCard product={product} />
            <button type="button" className="home-product-card-select" onClick={() => onSelect(product.slug)}>
              {selectedSlug === product.slug ? 'Vista activa del home' : 'Usar esta pieza en los previews'}
            </button>
          </article>
        ))}
      </div>
    </HomeSectionShell>
  );
}
