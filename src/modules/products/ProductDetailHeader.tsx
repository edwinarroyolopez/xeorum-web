import React from 'react';
import { ProductTitleBlock } from '../design-system';

export function ProductDetailHeader({
  kicker,
  title,
  subtitle,
}: Readonly<{
  kicker: string;
  title: string;
  subtitle?: string | null;
}>) {
  return <ProductTitleBlock eyebrow={kicker} title={title} subtitle={subtitle} align="center" />;
}
