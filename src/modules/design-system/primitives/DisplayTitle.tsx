import React from 'react';
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

type DisplayTitleProps<T extends ElementType> = {
  as?: T;
  size?: 'lg' | 'xl';
  children?: ReactNode;
} & ComponentPropsWithoutRef<T>;

export function DisplayTitle<T extends ElementType = 'h2'>({ as, size = 'lg', className, children, ...props }: DisplayTitleProps<T>) {
  const Component = as ?? 'h2';
  const titleClassName = `ds-display-title ds-display-title-${size}`;

  return (
    <Component {...props} className={className ? `${titleClassName} ${className}` : titleClassName}>
      {children}
    </Component>
  );
}
