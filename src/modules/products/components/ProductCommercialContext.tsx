import React from 'react';
import type { ProductBadgeItem } from '../services/product-detail.viewmodel';
import { ProductSummaryPanel } from '../../design-system';
import { ProductDetailBadgeGroup } from './ProductDetailBadgeGroup';

export function ProductCommercialContext({
  label,
  description,
  badges,
}: Readonly<{
  label: string;
  description: string;
  badges: ProductBadgeItem[];
}>) {
  if (badges.length === 0 && !description) return null;

  return (
    <ProductSummaryPanel label={label} description={description} className="xeorum-product-commercial-context">
      <ProductDetailBadgeGroup items={badges} />
    </ProductSummaryPanel>
  );
}
