import React from 'react';
import { ProductTitleBlock } from '../../design-system';

export function ProductDetailHeader({
  kicker,
  title,
  subtitle,
  align = 'center',
}: Readonly<{
  kicker: string;
  title: string;
  subtitle?: string | null;
  align?: 'start' | 'center';
}>) {
  return <ProductTitleBlock eyebrow={kicker} title={title} subtitle={subtitle} align={align} />;
}
