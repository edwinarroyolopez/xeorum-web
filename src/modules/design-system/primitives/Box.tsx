import React from 'react';
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

type BoxProps<T extends ElementType> = {
  as?: T;
  children?: ReactNode;
} & ComponentPropsWithoutRef<T>;

export function Box<T extends ElementType = 'div'>({ as, children, ...props }: BoxProps<T>) {
  const Component = as ?? 'div';
  return <Component {...props}>{children}</Component>;
}
