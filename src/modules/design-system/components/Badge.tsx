import React from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type BadgeTone = 'default' | 'accent' | 'success' | 'warning';

export function Badge({
  tone = 'default',
  className,
  children,
  ...props
}: Readonly<{ tone?: BadgeTone; children: ReactNode } & ComponentPropsWithoutRef<'span'>>) {
  const toneClass = `ds-badge ds-badge-${tone}`;
  return (
    <span {...props} className={className ? `${toneClass} ${className}` : toneClass}>
      {children}
    </span>
  );
}
