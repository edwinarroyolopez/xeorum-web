import React from 'react';
import type { ReactNode } from 'react';
import { ProductPresenceGrid, ProductPriceBlock, ProductSignalStrip, ProductSummaryPanel } from '../../design-system';
import { ProductDetailHeader } from './ProductDetailHeader';

type PresenceItem = {
  label: ReactNode;
  value: ReactNode;
  description?: ReactNode;
};

export function ProductPurchaseHero({
  title,
  kicker,
  subtitle,
  presenceItems,
  price,
  signals,
  selectionIntro,
  variantSelector,
  availability,
  cta,
}: Readonly<{
  title: string;
  kicker: string;
  subtitle?: string | null;
  presenceItems: PresenceItem[];
  price: ReactNode;
  signals: string[];
  selectionIntro: string;
  variantSelector: ReactNode;
  availability: ReactNode;
  cta: ReactNode;
}>) {
  return (
    <div className="xeorum-product-purchase-hero">
      <ProductDetailHeader kicker={kicker} title={title} align="start" {...(subtitle !== undefined ? { subtitle } : {})} />
      <ProductPresenceGrid items={presenceItems} />
      <ProductPriceBlock>{price}</ProductPriceBlock>
      <ProductSignalStrip signals={signals} className="product-meta-detail" />
      <ProductSummaryPanel className="product-purchase-intro" label="Eleccion activa" description={selectionIntro} />
      {variantSelector}
      {availability}
      {cta}
    </div>
  );
}
