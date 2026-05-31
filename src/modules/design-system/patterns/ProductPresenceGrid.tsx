import React from 'react';
import type { ReactNode } from 'react';
import { ProductSummaryPanel } from './ProductSummaryPanel';

type ProductPresenceItem = {
  label: ReactNode;
  value: ReactNode;
  description?: ReactNode;
};

export function ProductPresenceGrid({ items }: Readonly<{ items: ProductPresenceItem[] }>) {
  const visibleItems = items.filter((item) => item.value);

  if (visibleItems.length === 0) {
    return null;
  }

  return (
    <div className="ds-product-presence-grid">
      {visibleItems.map((item, index) => (
        <ProductSummaryPanel key={`${String(item.label)}-${index}`} label={item.label} value={item.value} description={item.description} className="ds-product-presence-panel" />
      ))}
    </div>
  );
}
