import React from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type EditorialPillProps = {
  children: ReactNode;
  tone?: 'default' | 'accent';
} & ComponentPropsWithoutRef<'span'>;

export function EditorialPill({ children, tone = 'default', className, ...props }: EditorialPillProps) {
  return (
    <span {...props} className={className ? `ds-editorial-pill ds-editorial-pill-${tone} ${className}` : `ds-editorial-pill ds-editorial-pill-${tone}`}>
      {children}
    </span>
  );
}
