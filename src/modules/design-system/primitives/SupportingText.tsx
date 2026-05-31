import React from 'react';
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { Text } from './Text';

type SupportingTextProps<T extends ElementType> = {
  as?: T;
  children?: ReactNode;
} & ComponentPropsWithoutRef<T>;

export function SupportingText<T extends ElementType = 'p'>({ as, className, children, ...props }: SupportingTextProps<T>) {
  return (
    <Text as={as ?? 'p'} tone="secondary" {...props} className={className ? `ds-supporting-text ${className}` : 'ds-supporting-text'}>
      {children}
    </Text>
  );
}
