import React from 'react';
import type { ProductVariant } from '@xeorum/contracts';
import { ProductVariantPanel, SegmentedGroup } from '../../design-system';
import { ProductVariantOptionLabel } from './ProductVariantOptionLabel';

export function VariantSelector({
  variants,
  selectedVariantId,
  onSelectVariant,
}: Readonly<{
  variants: ProductVariant[];
  selectedVariantId?: string;
  onSelectVariant: (variantId: string) => void;
}>) {
  if (variants.length === 0) return null;

  const activeVariant = variants.find((variant) => variant.id === selectedVariantId) ?? variants[0] ?? null;

  return (
    <ProductVariantPanel
      className="product-variant-block"
      label="Talla y disponibilidad"
      description="Selecciona la variante que abre precio, stock y entrada al carrito."
      activeCopy={activeVariant ? `${activeVariant.size} seleccionada` : undefined}
    >
      <SegmentedGroup
        className="product-variant-grid"
        label="Tallas disponibles para esta pieza"
        value={selectedVariantId ?? variants[0]?.id ?? ''}
        onChange={onSelectVariant}
        options={variants.map((variant) => ({
          value: variant.id,
          disabled: !variant.available,
          label: (
            <ProductVariantOptionLabel size={variant.size} {...(variant.color ? { color: variant.color } : {})} available={variant.available} />
          ),
        }))}
      />
    </ProductVariantPanel>
  );
}
