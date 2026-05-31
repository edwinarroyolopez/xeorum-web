import React from 'react';
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { Text } from './Text';

type KickerProps<T extends ElementType> = {
  as?: T;
  tone?: 'accent' | 'muted';
  children?: ReactNode;
} & ComponentPropsWithoutRef<T>;

export function Kicker<T extends ElementType = 'p'>({ as, tone = 'accent', className, children, ...props }: KickerProps<T>) {
  return (
    <Text as={as ?? 'p'} tone={tone === 'accent' ? 'accent' : 'muted'} {...props} className={className ? `ds-kicker ds-kicker-${tone} ${className}` : `ds-kicker ds-kicker-${tone}`}>
      {children}
    </Text>
  );
}
