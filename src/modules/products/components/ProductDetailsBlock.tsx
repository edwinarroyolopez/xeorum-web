import React from 'react';
import type { ProductDetails } from '@xeorum/contracts';
import { buildTechnicalTabsFromDetails } from '../services/product-detail.viewmodel';
import { ProductTechnicalTabs } from './ProductTechnicalTabs';

export function ProductDetailsBlock({ details }: Readonly<{ details: ProductDetails }>) {
  const tabs = buildTechnicalTabsFromDetails(details);

  if (tabs.length === 0) return null;

  return <ProductTechnicalTabs tabs={tabs} />;
}
