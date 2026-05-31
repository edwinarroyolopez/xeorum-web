import React from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  variant?: 'default' | 'soft' | 'emphasis';
} & ComponentPropsWithoutRef<'article'>;

export function Card({ children, variant = 'default', className, ...props }: CardProps) {
  return (
    <article {...props} className={className ? `ds-card ds-card-${variant} ${className}` : `ds-card ds-card-${variant}`}>
      {children}
    </article>
  );
}
