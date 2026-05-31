import React from 'react';
import type { ReactNode } from 'react';
import { EditorialPanel } from '../components/EditorialPanel';
import { EditorialBody } from '../primitives/EditorialBody';
import { Eyebrow } from '../primitives/Eyebrow';

export function ProductSummaryPanel({
  label,
  value,
  description,
  children,
  className,
}: Readonly<{
  label: ReactNode;
  value?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
}>) {
  return (
    <EditorialPanel className={className ? `ds-product-summary-panel ${className}` : 'ds-product-summary-panel'}>
      <Eyebrow tone="muted">{label}</Eyebrow>
      {value ? <strong className="ds-product-summary-value">{value}</strong> : null}
      {children}
      {description ? <EditorialBody size="sm">{description}</EditorialBody> : null}
    </EditorialPanel>
  );
}
