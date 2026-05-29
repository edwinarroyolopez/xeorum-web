import React from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<'article'>;

export function Card({ children, className, ...props }: CardProps) {
  return (
    <article {...props} className={className ? `ds-card ${className}` : 'ds-card'}>
      {children}
    </article>
  );
}
