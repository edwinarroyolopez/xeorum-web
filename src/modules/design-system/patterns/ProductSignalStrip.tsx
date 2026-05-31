import React from 'react';

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
    <div className={className ? `product-meta product-signal-strip ${className}` : 'product-meta product-signal-strip'}>
      {signals.map((signal) => <span key={signal}>{signal}</span>)}
    </div>
  );
}
