import React from 'react';
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { Text } from './Text';

type EyebrowProps<T extends ElementType> = {
  as?: T;
  tone?: 'accent' | 'muted';
  children?: ReactNode;
} & ComponentPropsWithoutRef<T>;

export function Eyebrow<T extends ElementType = 'p'>({ as, tone = 'accent', className, children, ...props }: EyebrowProps<T>) {
  const eyebrowClassName = `ds-eyebrow ds-eyebrow-${tone}`;

  return (
    <Text as={as ?? 'p'} tone={tone === 'accent' ? 'accent' : 'muted'} {...props} className={className ? `${eyebrowClassName} ${className}` : eyebrowClassName}>
      {children}
    </Text>
  );
}
