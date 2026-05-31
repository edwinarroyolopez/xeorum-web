import React from 'react';
import type { ComponentPropsWithoutRef } from 'react';

export function Toolbar({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div {...props} className={className ? `ds-toolbar ${className}` : 'ds-toolbar'} />;
}

export function ToolbarGroup({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div {...props} className={className ? `ds-toolbar-group ${className}` : 'ds-toolbar-group'} />;
}
