import React from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type EditorialCardProps = {
  children: ReactNode;
  tone?: 'default' | 'soft';
} & ComponentPropsWithoutRef<'article'>;

export function EditorialCard({ children, tone = 'default', className, ...props }: EditorialCardProps) {
  return (
    <article {...props} className={className ? `ds-editorial-card ds-editorial-card-${tone} ${className}` : `ds-editorial-card ds-editorial-card-${tone}`}>
      {children}
    </article>
  );
}
