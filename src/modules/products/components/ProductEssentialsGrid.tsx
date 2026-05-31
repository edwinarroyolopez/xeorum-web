import React from 'react';
import type { ProductFactItem } from '../services/product-detail.viewmodel';
import { ProductConstructionPanel } from '../../design-system';

export function ProductEssentialsGrid({ items }: Readonly<{ items: ProductFactItem[] }>) {
  if (items.length === 0) return null;

  return (
    <ProductConstructionPanel
      label="Esenciales tecnicos"
      description="Materia, silueta y lectura inmediata antes del detalle completo."
      items={items}
    />
  );
}
