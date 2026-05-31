import React from 'react';
import type { ReactNode } from 'react';
import { EditorialBody } from '../primitives/EditorialBody';
import { Eyebrow } from '../primitives/Eyebrow';

export function ProductPriceBlock({
  label = 'Precio',
  children,
  note,
}: Readonly<{
  label?: ReactNode;
  children: ReactNode;
  note?: ReactNode;
}>) {
  return (
    <div className="ds-product-price-block-shell">
      <Eyebrow tone="muted">{label}</Eyebrow>
      {children}
      {note ? <EditorialBody size="sm">{note}</EditorialBody> : null}
    </div>
  );
}
