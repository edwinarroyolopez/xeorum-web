'use client';

import React, { useState } from 'react';
import type { ProductSort } from '@xeorum/contracts';
import { ActiveFilterChips, FilterBar, SectionHeader, Select } from '../design-system';
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

  if (query.isLoading) return <p className="section-state">Cargando productos.</p>;
  if (query.isError || !query.data) return <p className="section-state">Productos no disponibles.</p>;

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
      <div className="product-grid-intro">
        <SectionHeader
          kicker="Shop All"
          title="Mercado abierto. Curaduria intacta."
          description="Producto primero, identidad despues. Cada pieza entra con materialidad, precio, disponibilidad y una lectura sobria de fuerza."
        />
        <p className="product-grid-editorial-copy">Usa los filtros para recortar la seleccion, no para descifrar la pagina.</p>
        <p className="product-grid-count">{query.data.length} piezas en circulacion.</p>
      </div>
      <FilterBar
        title="Refina por linea, talla, disponibilidad o criterio de lectura."
        description="La seleccion sigue abierta. Tu refinamiento solo la vuelve mas precisa."
        controls={
          <div className="product-filters">
            <Select label="Linea" aria-label="Filtrar por linea" value={category} onChange={(event) => setCategory(event.target.value)} options={categoryOptions} />
            <Select label="Talla" aria-label="Filtrar por talla" value={size} onChange={(event) => setSize(event.target.value)} options={sizeOptions} />
            <Select label="Disponibilidad" aria-label="Filtrar por disponibilidad" value={availability} onChange={(event) => setAvailability(event.target.value as 'in_stock' | 'out_of_stock' | '')} options={availabilityOptions} />
            <Select label="Leer por" aria-label="Ordenar productos" value={sort} onChange={(event) => setSort(event.target.value as ProductSort)} options={sortOptions} />
          </div>
        }
        summary={<ActiveFilterChips items={activeFilters} onClear={resetFilters} />}
      />
      {query.data.length === 0 ? <p className="section-state">No hay piezas disponibles bajo ese criterio.</p> : (
        <section className="product-grid">
          {query.data.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </section>
      )}
    </section>
  );
}
