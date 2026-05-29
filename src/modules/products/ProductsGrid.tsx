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

  if (query.isLoading) return <p className="section-state">Cargando productos.</p>;
  if (query.isError || !query.data) return <p className="section-state">Productos no disponibles.</p>;

  return (
    <section className="section-stack">
      <div className="product-filters">
        <select aria-label="Categoria de producto" value={category} onChange={(event) => setCategory(event.target.value)}><option value="">Todas las categorias</option><option value="tees">Tees</option><option value="hoodies">Hoodies</option><option value="outerwear">Outerwear</option></select>
        <select aria-label="Talla de producto" value={size} onChange={(event) => setSize(event.target.value)}><option value="">Todas las tallas</option><option value="S">S</option><option value="M">M</option><option value="L">L</option><option value="XL">XL</option></select>
        <select aria-label="Orden de producto" value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Curados</option><option value="newest">Mas nuevos</option><option value="price_asc">Precio ascendente</option><option value="price_desc">Precio descendente</option><option value="best_selling">Mas elegidos</option><option value="identity_match">Match de identidad</option></select>
      </div>
      <section className="product-grid">
        {query.data.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </section>
    </section>
  );
}
