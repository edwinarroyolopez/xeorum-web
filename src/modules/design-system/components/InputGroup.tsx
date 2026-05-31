import React from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import styles from './InputGroup.module.css';
import { cn } from '../../../lib/ui/cn';

export function InputGroup({ className, ...props }: ComponentPropsWithoutRef<'label'>) {
  return <label {...props} className={cn(styles.group, 'ds-input-group', className)} />;
}

export function InputGroupAdornment({ className, children, ...props }: Readonly<{ children?: ReactNode } & ComponentPropsWithoutRef<'span'>>) {
  return (
    <span {...props} className={cn(styles.adornment, 'ds-input-group-adornment', className)}>
      {children}
    </span>
  );
}
