import React from 'react';
import type { ProductDetails } from '@xeorum/contracts';

export function ProductDetailsBlock({ details }: Readonly<{ details: ProductDetails }>) {
  const items = [
    details.material ? ['Material', details.material] : null,
    details.fit ? ['Fit', details.fit] : null,
    details.color ? ['Color', details.color] : null,
    details.gsm ? ['Weight', `${details.gsm} GSM`] : null,
    details.origin ? ['Origen', details.origin] : null,
    details.printTechnique ? ['Tecnica', details.printTechnique] : null,
    details.careInstructions?.length ? ['Cuidado', details.careInstructions.join(' · ')] : null,
  ].filter(Boolean) as Array<[string, string]>;

  if (items.length === 0) return null;

  return (
    <section className="product-details-block">
      <p className="product-section-label">Construccion de la pieza</p>
      <dl className="product-details-grid">
        {items.map(([label, value]) => (
          <div key={label} className="product-details-item">
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
