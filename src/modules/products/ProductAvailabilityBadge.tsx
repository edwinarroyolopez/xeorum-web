import React from 'react';

export function ProductAvailabilityBadge({
  label,
  tone,
}: Readonly<{ label: string; tone: 'in-stock' | 'low-stock' | 'sold-out' }>) {
  return <span className={`product-availability-badge product-availability-${tone}`}>{label}</span>;
}
