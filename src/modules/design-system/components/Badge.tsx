import React from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type BadgeTone = 'default' | 'accent' | 'success' | 'warning' | 'danger';
type BadgeSize = 'sm' | 'md';

export function Badge({
  tone = 'default',
  size = 'md',
  className,
  children,
  ...props
}: Readonly<{ tone?: BadgeTone; size?: BadgeSize; children: ReactNode } & ComponentPropsWithoutRef<'span'>>) {
  const toneClass = `ds-badge ds-badge-${tone} ds-badge-${size}`;
  return (
    <span {...props} className={className ? `${toneClass} ${className}` : toneClass}>
      {children}
    </span>
  );
}
