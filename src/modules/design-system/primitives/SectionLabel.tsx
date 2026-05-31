import React from 'react';
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { Text } from './Text';

type SectionLabelProps<T extends ElementType> = {
  as?: T;
  children?: ReactNode;
} & ComponentPropsWithoutRef<T>;

export function SectionLabel<T extends ElementType = 'p'>({ as, className, children, ...props }: SectionLabelProps<T>) {
  return (
    <Text as={as ?? 'p'} tone="secondary" {...props} className={className ? `ds-section-label ${className}` : 'ds-section-label'}>
      {children}
    </Text>
  );
}
