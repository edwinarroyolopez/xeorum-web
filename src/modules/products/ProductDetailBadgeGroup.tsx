import React from 'react';
import { ActionRow, Badge } from '../design-system';

type ProductDetailBadgeGroupItem = {
  label: string;
  tone?: 'default' | 'accent' | 'success' | 'warning' | 'danger';
};

export function ProductDetailBadgeGroup({
  items,
  className,
}: Readonly<{
  items: ProductDetailBadgeGroupItem[];
  className?: string;
}>) {
  const visibleItems = items.filter((item) => item.label.trim().length > 0);

  if (visibleItems.length === 0) {
    return null;
  }

  return (
    <ActionRow className={className ? `product-meta product-meta-detail ${className}` : 'product-meta product-meta-detail'}>
      {visibleItems.map((item) => <Badge key={`${item.tone ?? 'default'}-${item.label}`} size="sm" {...(item.tone ? { tone: item.tone } : {})}>{item.label}</Badge>)}
    </ActionRow>
  );
}
