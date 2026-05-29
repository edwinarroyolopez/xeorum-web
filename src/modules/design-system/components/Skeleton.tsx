import React from 'react';
import type { ComponentPropsWithoutRef } from 'react';

export function Skeleton({ className, ...props }: ComponentPropsWithoutRef<'span'>) {
  return <span {...props} aria-hidden="true" className={className ? `ds-skeleton ${className}` : 'ds-skeleton'} />;
}
