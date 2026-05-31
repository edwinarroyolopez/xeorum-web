import React from 'react';
import { ActionRow } from '../components/ActionRow';
import { Badge } from '../components/Badge';

export function ProductSignalStrip({
  signals,
  className,
}: Readonly<{
  signals: string[];
  className?: string;
}>) {
  if (signals.length === 0) {
    return null;
  }

  return (
    <ActionRow className={className ? `product-meta product-signal-strip ${className}` : 'product-meta product-signal-strip'}>
      {signals.map((signal) => <Badge key={signal} size="sm">{signal}</Badge>)}
    </ActionRow>
  );
}
