'use client';

import React, { useState } from 'react';
import type { ProductSort } from '@xeorum/contracts';
import { ActiveFilterChips, EmptyState, ErrorState, FilterBar, LoadingState, Select, SegmentedGroup, Toolbar, ToolbarGroup } from '../design-system';
import { ProductCard } from './ProductCard';
import { useProducts } from './products.queries';

const categoryOptions = [
  { label: 'Todas las lineas', value: '' },
  { label: 'Tees', value: 'tees' },
  { label: 'Hoodies', value: 'hoodies' },
  { label: 'Outerwear', value: 'outerwear' },
];

const sizeOptions = [
  { label: 'Todas las tallas', value: '' },
  { label: 'S', value: 'S' },
  { label: 'M', value: 'M' },
  { label: 'L', value: 'L' },
  { label: 'XL', value: 'XL' },
];

const availabilityOptions = [
  { label: 'Toda la disponibilidad', value: '' },
  { label: 'Disponible ahora', value: 'in_stock' },
  { label: 'Agotado', value: 'out_of_stock' },
];

const sortOptions = [
  { label: 'Curaduria XEORUM', value: 'featured' },
  { label: 'Ingreso mas reciente', value: 'newest' },
  { label: 'Precio ascendente', value: 'price_asc' },
  { label: 'Precio descendente', value: 'price_desc' },
  { label: 'Mas elegidas', value: 'best_selling' },
  { label: 'Afinidad de identidad', value: 'identity_match' },
] satisfies Array<{ label: string; value: ProductSort }>;

const categoryTabs = [
  { label: 'Todo', value: 'all' },
  { label: 'Tees', value: 'tees' },
  { label: 'Hoodies', value: 'hoodies' },
  { label: 'Outerwear', value: 'outerwear' },
] satisfies Array<{ label: string; value: string }>;

export function ProductsGrid({ archetype, drop }: Readonly<{ archetype?: string; drop?: string }>) {
  const [category, setCategory] = useState('');
  const [size, setSize] = useState('');
  const [availability, setAvailability] = useState<'in_stock' | 'out_of_stock' | ''>('');
  const [sort, setSort] = useState<ProductSort>('featured');
  const query = useProducts({
    ...(archetype ? { archetype } : {}),
    ...(drop ? { drop } : {}),
    ...(category ? { category } : {}),
    ...(size ? { size } : {}),
    ...(availability ? { availability } : {}),
    ...(sort ? { sort } : {}),
  });

  if (query.isLoading) return <LoadingState title="Cargando productos" description="Preparando piezas, disponibilidad y refinamiento." />;
  if (query.isError || !query.data) return <ErrorState title="Productos no disponibles" description="La seleccion publica no esta disponible ahora." />;

  const activeFilters = [
    archetype ? `Fuerza ${archetype.toUpperCase()}` : null,
    drop ? `Drop ${drop}` : null,
    categoryOptions.find((option) => option.value === category && option.value)?.label ?? null,
    size ? `Talla ${size}` : null,
    availabilityOptions.find((option) => option.value === availability && option.value)?.label ?? null,
    sort !== 'featured' ? sortOptions.find((option) => option.value === sort)?.label ?? null : null,
  ].filter(Boolean) as string[];

  const resetFilters = () => {
    setCategory('');
    setSize('');
    setAvailability('');
    setSort('featured');
  };

  return (
    <section className="section-stack">
      <FilterBar
        kicker="Selección abierta"
        title="Mercado abierto"
        description="Usa los filtros para recortar la selección, no para descifrar la página."
        controls={
          <SegmentedGroup
            label="Filtrar por linea"
            size="sm"
            value={category || 'all'}
            options={categoryTabs}
            onChange={(value) => setCategory(value === 'all' ? '' : value)}
          />
        }
        summary={
          <div className="product-filters-summary-shell">
            <Toolbar className="product-filters product-filters-advanced">
              <ToolbarGroup>
                <Select label="Linea" aria-label="Filtrar por linea" size="sm" value={category} onChange={(event) => setCategory(event.target.value)} options={categoryOptions} />
                <Select label="Talla" aria-label="Filtrar por talla" size="sm" value={size} onChange={(event) => setSize(event.target.value)} options={sizeOptions} />
                <Select label="Disponibilidad" aria-label="Filtrar por disponibilidad" size="sm" value={availability} onChange={(event) => setAvailability(event.target.value as 'in_stock' | 'out_of_stock' | '')} options={availabilityOptions} />
                <Select label="Leer por" aria-label="Ordenar productos" size="sm" value={sort} onChange={(event) => setSort(event.target.value as ProductSort)} options={sortOptions} />
              </ToolbarGroup>
            </Toolbar>
            <ActiveFilterChips items={activeFilters} onClear={resetFilters} />
          </div>
        }
      />
      {query.data.length === 0 ? <EmptyState>No hay piezas disponibles bajo ese criterio.</EmptyState> : (
        <section className="product-grid">
          {query.data.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </section>
      )}
    </section>
  );
}
