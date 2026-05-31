import React from 'react';
import type { ReactNode } from 'react';
import { EditorialPill } from '../components/EditorialPill';

export function ProductVisualFrame({
  brand,
  label,
  meta,
  badge,
  children,
  className,
}: Readonly<{
  brand?: ReactNode;
  label?: ReactNode;
  meta?: ReactNode;
  badge?: ReactNode;
  children: ReactNode;
  className?: string;
}>) {
  return (
    <div className={className ? `ds-product-visual-frame ${className}` : 'ds-product-visual-frame'}>
      {badge ? <div className="ds-product-visual-badge"><EditorialPill tone="accent">{badge}</EditorialPill></div> : null}
      {(brand || label) ? (
        <div className="ds-product-visual-brand">
          {brand ? <span>{brand}</span> : null}
          {label ? <small>{label}</small> : null}
        </div>
      ) : null}
      <div className="ds-product-visual-media">{children}</div>
      {meta ? <div className="ds-product-visual-meta">{meta}</div> : null}
    </div>
  );
}
