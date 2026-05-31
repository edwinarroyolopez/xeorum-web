import React from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import styles from './Skeleton.module.css';
import { cn } from '../../../lib/ui/cn';

export function Skeleton({ className, ...props }: ComponentPropsWithoutRef<'span'>) {
  return <span {...props} aria-hidden="true" className={cn(styles.skeleton, className)} />;
}
