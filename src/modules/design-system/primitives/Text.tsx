import React from 'react';
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

type TextProps<T extends ElementType> = {
  as?: T;
  tone?: 'default' | 'secondary' | 'muted' | 'accent';
  children?: ReactNode;
} & ComponentPropsWithoutRef<T>;

export function Text<T extends ElementType = 'p'>({ as, tone = 'default', className, children, ...props }: TextProps<T>) {
  const Component = as ?? 'p';
  const toneClass = `ds-text ds-text-${tone}`;

  return (
    <Component {...props} className={className ? `${toneClass} ${className}` : toneClass}>
      {children}
    </Component>
  );
}
