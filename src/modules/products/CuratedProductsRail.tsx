'use client';

import React from 'react';
import type { ProductSort } from '@xeorum/contracts';
import { LoadingState, SectionHeader } from '../design-system';
import { ProductCard } from './ProductCard';
import { useProducts } from './products.queries';

export function CuratedProductsRail({
  kicker,
  title,
  description,
  limit = 3,
  sort = 'featured',
  archetype,
}: Readonly<{
  kicker: string;
  title: string;
  description: string;
  limit?: number;
  sort?: ProductSort;
  archetype?: string;
}>) {
  const query = useProducts({ sort, ...(archetype ? { archetype } : {}) });

  if (query.isLoading) {
    return <LoadingState>Cargando seleccion.</LoadingState>;
  }

  if (query.isError || !query.data || query.data.length === 0) {
    return null;
  }

  return (
    <section className="section-stack">
      <SectionHeader kicker={kicker} title={title} description={description} />
      <div className="product-grid">
        {query.data.slice(0, limit).map((product) => <ProductCard key={product.slug} product={product} />)}
      </div>
    </section>
  );
}
