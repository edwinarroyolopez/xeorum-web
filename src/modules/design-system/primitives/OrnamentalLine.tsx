import React from 'react';
import type { ComponentPropsWithoutRef } from 'react';

export function OrnamentalLine({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div {...props} className={className ? `ds-ornamental-line ${className}` : 'ds-ornamental-line'} aria-hidden="true">
      <span />
      <i />
      <span />
    </div>
  );
}
