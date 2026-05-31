import React from 'react';
import type { ReactNode } from 'react';
import { EditorialPanel } from '../components/EditorialPanel';
import { EditorialBody } from '../primitives/EditorialBody';
import { Eyebrow } from '../primitives/Eyebrow';

type ProductConstructionItem = {
  label: ReactNode;
  value: ReactNode;
};

export function ProductConstructionPanel({
  label,
  description,
  items,
}: Readonly<{
  label: ReactNode;
  description?: ReactNode;
  items: ProductConstructionItem[];
}>) {
  if (items.length === 0) {
    return null;
  }

  return (
    <EditorialPanel className="ds-product-construction-panel">
      <div className="ds-product-construction-header">
        <Eyebrow tone="muted">{label}</Eyebrow>
        {description ? <EditorialBody size="sm">{description}</EditorialBody> : null}
      </div>
      <dl className="ds-product-construction-grid">
        {items.map((item, index) => (
          <div key={`${String(item.label)}-${index}`} className="ds-product-construction-item">
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    </EditorialPanel>
  );
}
