import React from 'react';
import type { ReactNode } from 'react';
import { ProductSummaryPanel } from '../design-system';

export function ProductDetailInfoCard({
  label,
  value,
  description,
  className,
  children,
}: Readonly<{
  label: string;
  value?: string | null;
  description?: string | null;
  className?: string;
  children?: ReactNode;
}>) {
  return (
    <ProductSummaryPanel className={className ? `xeorum-product-info-card ${className}` : 'xeorum-product-info-card'} label={label} value={value} description={description}>
      {children}
    </ProductSummaryPanel>
  );
}
