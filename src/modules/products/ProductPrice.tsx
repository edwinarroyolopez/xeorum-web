import React from 'react';
import { formatProductPrice } from './product.helpers';

export function ProductPrice({
  price,
}: Readonly<{
  price: {
    currentPrice: number;
    compareAtPrice?: number | undefined;
    salePrice?: number | undefined;
    currency: string;
    discountPercent?: number | undefined;
    discountLabel?: string | undefined;
  };
}>) {
  return (
    <div className="product-price-block">
      <div className="product-price-main-row">
        <strong>{formatProductPrice(price.currentPrice, price.currency)}</strong>
        {price.compareAtPrice ? <span className="product-price-compare">{formatProductPrice(price.compareAtPrice, price.currency)}</span> : null}
      </div>
      {price.salePrice || price.discountPercent || price.discountLabel ? (
        <div className="product-price-supporting">
          {price.discountLabel ? <span>{price.discountLabel}</span> : null}
          {!price.discountLabel && price.discountPercent ? <span>{price.discountPercent}% off</span> : null}
        </div>
      ) : null}
    </div>
  );
}
