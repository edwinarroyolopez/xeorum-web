import React from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export function InputGroup({ className, ...props }: ComponentPropsWithoutRef<'label'>) {
  return <label {...props} className={className ? `ds-input-group ${className}` : 'ds-input-group'} />;
}

export function InputGroupAdornment({ className, children, ...props }: Readonly<{ children?: ReactNode } & ComponentPropsWithoutRef<'span'>>) {
  return (
    <span {...props} className={className ? `ds-input-group-adornment ${className}` : 'ds-input-group-adornment'}>
      {children}
    </span>
  );
}
