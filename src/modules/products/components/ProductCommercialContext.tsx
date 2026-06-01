import React from 'react';
import type { ProductBadgeItem } from '../services/product-detail.viewmodel';
import { EditorialBody, SectionLabel } from '../../design-system';
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
    <section className="xeorum-product-commercial-context">
      <div className="xeorum-product-commercial-context-copy">
        <SectionLabel>{label}</SectionLabel>
        <EditorialBody>{description}</EditorialBody>
      </div>
      <ProductDetailBadgeGroup items={badges} className="xeorum-product-commercial-context-badges" />
    </section>
  );
}
