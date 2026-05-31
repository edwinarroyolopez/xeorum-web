import React from 'react';
import type { ProductDetails } from '@xeorum/contracts';
import { ProductConstructionPanel } from '../design-system';

export function ProductDetailsBlock({ details }: Readonly<{ details: ProductDetails }>) {
  const careInstructions = Array.isArray(details.careInstructions)
    ? details.careInstructions.join(' · ')
    : typeof details.careInstructions === 'string'
      ? details.careInstructions
      : null;

  const items = [
    details.material ? ['Material', details.material] : null,
    details.fit ? ['Fit', details.fit] : null,
    details.color ? ['Color', details.color] : null,
    details.gsm ? ['Weight', `${details.gsm} GSM`] : null,
    details.origin ? ['Origen', details.origin] : null,
    details.printTechnique ? ['Tecnica', details.printTechnique] : null,
    careInstructions ? ['Cuidado', careInstructions] : null,
  ].filter(Boolean) as Array<[string, string]>;

  if (items.length === 0) return null;

  return (
    <ProductConstructionPanel label="Construccion de la pieza" description="Materia, corte y decisiones tecnicas presentadas con claridad serena." items={items.map(([label, value]) => ({ label, value }))} />
  );
}
