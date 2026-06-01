import React from 'react';
import type { ReactNode } from 'react';
import { ProductPriceBlock } from '../../design-system';
import { ProductDetailHeader } from './ProductDetailHeader';

export function ProductPurchaseHero({
  title,
  kicker,
  subtitle,
  price,
  variantSelector,
  availability,
  cta,
  footer,
}: Readonly<{
  title: string;
  kicker: string;
  subtitle?: string | null;
  price: ReactNode;
  variantSelector: ReactNode;
  availability: ReactNode;
  cta: ReactNode;
  footer?: ReactNode;
}>) {
  return (
    <div className="xeorum-product-purchase-hero">
      <ProductDetailHeader kicker={kicker} title={title} align="center" {...(subtitle !== undefined ? { subtitle } : {})} />
      <div className="xeorum-product-purchase-box">
        <ProductPriceBlock>{price}</ProductPriceBlock>
        {availability}
        {variantSelector}
        {cta}
        {footer}
      </div>
    </div>
  );
}
