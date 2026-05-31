import React from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import styles from './Badge.module.css';
import { cn } from '../../../lib/ui/cn';

export type BadgeTone = 'default' | 'accent' | 'success' | 'warning' | 'danger';
type BadgeSize = 'sm' | 'md';

export function Badge({
  tone = 'default',
  size = 'md',
  className,
  children,
  ...props
}: Readonly<{ tone?: BadgeTone; size?: BadgeSize; children: ReactNode } & ComponentPropsWithoutRef<'span'>>) {
  return (
    <span {...props} className={cn(styles.badge, toneClass[tone], sizeClass[size], className)}>
      {children}
    </span>
  );
}

const toneClass = {
  default: styles.default,
  accent: styles.accent,
  success: styles.success,
  warning: styles.warning,
  danger: styles.danger,
};

const sizeClass = {
  sm: styles.sm,
  md: styles.default,
};
