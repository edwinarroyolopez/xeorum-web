'use client';

import React from 'react';
import type { ProductSort } from '@xeorum/contracts';
import { EmptyState, EditorialCollectionIntro, LoadingState, SectionHeader } from '../../design-system';
import { ProductCard } from './ProductCard';
import { useProducts } from '../hooks/products.queries';

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
    return <LoadingState title="Cargando seleccion" description="Preparando una primera lectura de producto." />;
  }

  if (query.isError || !query.data || query.data.length === 0) {
    return <EmptyState title="Seleccion no disponible" description="Todavia no hay piezas publicadas para esta lectura." />;
  }

  return (
    <section className="section-stack">
      <SectionHeader kicker={kicker} title={title} description={description} />
      <EditorialCollectionIntro eyebrow="Producto primero" title="Entradas curadas para abrir la exploracion con menos ruido." description="La seleccion prioriza presencia, claridad comercial y continuidad editorial antes que volumen." />
      <div className="product-grid">
        {query.data.slice(0, limit).map((product) => <ProductCard key={product.slug} product={product} />)}
      </div>
    </section>
  );
}
