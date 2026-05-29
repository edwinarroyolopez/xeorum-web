import React from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import { Box } from './Box';

export function Stack({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return <Box {...props} className={className ? `ds-stack ${className}` : 'ds-stack'} />;
}
