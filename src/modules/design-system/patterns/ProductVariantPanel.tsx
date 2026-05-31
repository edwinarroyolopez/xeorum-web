import React from 'react';
import type { ReactNode } from 'react';
import { EditorialPanel } from '../components/EditorialPanel';
import { EditorialBody } from '../primitives/EditorialBody';
import { Eyebrow } from '../primitives/Eyebrow';

export function ProductVariantPanel({
  label,
  description,
  activeCopy,
  children,
  className,
}: Readonly<{
  label: ReactNode;
  description?: ReactNode;
  activeCopy?: ReactNode;
  children: ReactNode;
  className?: string;
}>) {
  return (
    <EditorialPanel className={className ? `ds-product-variant-panel ${className}` : 'ds-product-variant-panel'}>
      <div className="ds-product-variant-panel-header">
        <div>
          <Eyebrow tone="muted">{label}</Eyebrow>
          {description ? <EditorialBody size="sm">{description}</EditorialBody> : null}
        </div>
        {activeCopy ? <span className="ds-product-variant-active-copy">{activeCopy}</span> : null}
      </div>
      {children}
    </EditorialPanel>
  );
}
