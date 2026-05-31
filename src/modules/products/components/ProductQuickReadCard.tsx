import React from 'react';
import type { ProductBadgeItem } from '../services/product-detail.viewmodel';
import { ProductSummaryPanel } from '../../design-system';
import { ProductDetailBadgeGroup } from './ProductDetailBadgeGroup';

export function ProductQuickReadCard({
  label,
  description,
  badges = [],
}: Readonly<{
  label: string;
  description?: string | null;
  badges?: ProductBadgeItem[];
}>) {
  return (
    <ProductSummaryPanel label={label} description={description} className="xeorum-product-quick-read-card">
      <ProductDetailBadgeGroup items={badges} />
    </ProductSummaryPanel>
  );
}
