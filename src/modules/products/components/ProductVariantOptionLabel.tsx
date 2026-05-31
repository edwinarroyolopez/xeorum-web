import React from 'react';

export function ProductVariantOptionLabel({
  size,
  color,
  available,
}: Readonly<{
  size: string;
  color?: string | null;
  available: boolean;
}>) {
  return (
    <span className="product-variant-chip-copy">
      <strong>{size}</strong>
      {color ? <small>{color}</small> : null}
      <small className={available ? 'product-variant-state is-available' : 'product-variant-state is-unavailable'}>
        {available ? 'Disponible' : 'Agotado'}
      </small>
    </span>
  );
}
