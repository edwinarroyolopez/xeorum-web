import React from 'react';
import { Badge } from '../../design-system';

export function ProductAvailabilityBadge({
  label,
  tone,
}: Readonly<{ label: string; tone: 'in-stock' | 'low-stock' | 'sold-out' }>) {
  const badgeTone = tone === 'in-stock' ? 'success' : tone === 'low-stock' ? 'warning' : 'danger';

  return <Badge className={`product-availability-badge product-availability-${tone}`} tone={badgeTone}>{label}</Badge>;
}
