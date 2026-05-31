import React from 'react';
import type { ProductVariant } from '@xeorum/contracts';

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

  return (
    <div className="product-variant-block">
      <p className="product-section-label">Talla y disponibilidad</p>
      <div className="product-variant-grid" role="list" aria-label="Tallas disponibles para esta pieza">
        {variants.map((variant) => (
          <button
            key={variant.id}
            type="button"
            className={`product-variant-chip${variant.id === selectedVariantId ? ' is-selected' : ''}`}
            onClick={() => onSelectVariant(variant.id)}
            disabled={!variant.available}
            aria-pressed={variant.id === selectedVariantId}
          >
            <span>{variant.size}</span>
            {variant.color ? <small>{variant.color}</small> : null}
            <small>{variant.available ? 'Disponible' : 'Agotado'}</small>
          </button>
        ))}
      </div>
    </div>
  );
}
