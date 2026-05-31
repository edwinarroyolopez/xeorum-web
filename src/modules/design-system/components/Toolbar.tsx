import React from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import styles from './Toolbar.module.css';
import { cn } from '../../../lib/ui/cn';

export function Toolbar({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div {...props} className={cn(styles.toolbar, 'ds-toolbar', className)} />;
}

export function ToolbarGroup({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div {...props} className={cn(styles.group, 'ds-toolbar-group', className)} />;
}
