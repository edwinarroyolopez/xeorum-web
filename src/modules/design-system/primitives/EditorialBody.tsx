import React from 'react';
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { Text } from './Text';

type EditorialBodyProps<T extends ElementType> = {
  as?: T;
  size?: 'md' | 'sm';
  tone?: 'default' | 'secondary';
  children?: ReactNode;
} & ComponentPropsWithoutRef<T>;

export function EditorialBody<T extends ElementType = 'p'>({ as, size = 'md', tone = 'secondary', className, children, ...props }: EditorialBodyProps<T>) {
  const bodyClassName = `ds-editorial-body ds-editorial-body-${size}`;

  return (
    <Text as={as ?? 'p'} tone={tone} {...props} className={className ? `${bodyClassName} ${className}` : bodyClassName}>
      {children}
    </Text>
  );
}
