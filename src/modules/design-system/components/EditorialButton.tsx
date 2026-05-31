import React from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Button } from './Button';

type EditorialButtonProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<'button'>;

export function EditorialButton({ children, className, ...props }: EditorialButtonProps) {
  return (
    <Button {...props} variant="primary" className={className ? `ds-editorial-button ${className}` : 'ds-editorial-button'}>
      {children}
    </Button>
  );
}

export function EditorialGhostButton({ children, className, ...props }: EditorialButtonProps) {
  return (
    <Button {...props} variant="ghost" className={className ? `ds-editorial-button ds-editorial-button-ghost ${className}` : 'ds-editorial-button ds-editorial-button-ghost'}>
      {children}
    </Button>
  );
}
