'use client';

import { ProductCard } from './ProductCard';
import { useProducts } from './products.queries';

export function ProductsGrid({ archetype, drop }: Readonly<{ archetype?: string; drop?: string }>) {
  const query = useProducts({
    ...(archetype ? { archetype } : {}),
    ...(drop ? { drop } : {}),
  });

  if (query.isLoading) return <p className="section-state">Loading products.</p>;
  if (query.isError || !query.data) return <p className="section-state">Products unavailable.</p>;

  return (
    <section className="product-grid">
      {query.data.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </section>
  );
}
