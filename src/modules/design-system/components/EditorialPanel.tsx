import React from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type EditorialPanelProps = {
  children: ReactNode;
  tone?: 'default' | 'soft';
} & ComponentPropsWithoutRef<'section'>;

export function EditorialPanel({ children, tone = 'default', className, ...props }: EditorialPanelProps) {
  return (
    <section {...props} className={className ? `ds-editorial-panel ds-editorial-panel-${tone} ${className}` : `ds-editorial-panel ds-editorial-panel-${tone}`}>
      {children}
    </section>
  );
}
