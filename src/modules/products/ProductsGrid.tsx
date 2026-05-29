'use client';

import { useState } from 'react';
import { ProductCard } from './ProductCard';
import { useProducts } from './products.queries';

export function ProductsGrid({ archetype, drop }: Readonly<{ archetype?: string; drop?: string }>) {
  const [category, setCategory] = useState('');
  const [size, setSize] = useState('');
  const [sort, setSort] = useState('featured');
  const query = useProducts({
    ...(archetype ? { archetype } : {}),
    ...(drop ? { drop } : {}),
    ...(category ? { category } : {}),
    ...(size ? { size } : {}),
    ...(sort ? { sort } : {}),
  });

  if (query.isLoading) return <p className="section-state">Loading products.</p>;
  if (query.isError || !query.data) return <p className="section-state">Products unavailable.</p>;

  return (
    <section className="section-stack">
      <div className="product-filters">
        <select aria-label="Product category" value={category} onChange={(event) => setCategory(event.target.value)}><option value="">All categories</option><option value="tees">Tees</option><option value="hoodies">Hoodies</option><option value="outerwear">Outerwear</option></select>
        <select aria-label="Product size" value={size} onChange={(event) => setSize(event.target.value)}><option value="">All sizes</option><option value="S">S</option><option value="M">M</option><option value="L">L</option><option value="XL">XL</option></select>
        <select aria-label="Product sort" value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="newest">Newest</option><option value="price_asc">Price asc</option><option value="price_desc">Price desc</option><option value="best_selling">Best selling</option><option value="identity_match">Identity match</option></select>
      </div>
      <section className="product-grid">
        {query.data.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </section>
    </section>
  );
}
