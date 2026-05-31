import React from 'react';
import type { ReactNode } from 'react';

export function ProductDecisionCard({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="xeorum-product-decision-card">
      <div className="xeorum-product-decision-card-main">{children}</div>
    </div>
  );
}
