'use client';

import React from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './ToggleSwitch.module.css';
import { cn } from '../../../lib/ui/cn';

type ToggleSwitchProps = {
  active: boolean;
  activeLabel?: ReactNode;
  inactiveLabel?: ReactNode;
  size?: 'sm' | 'md';
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

export function ToggleSwitch({
  active,
  activeLabel = 'ON',
  inactiveLabel = 'OFF',
  size = 'md',
  type = 'button',
  className,
  ...props
}: Readonly<ToggleSwitchProps>) {
  return (
    <button {...props} type={type} className={cn(styles.toggle, 'ds-toggle-switch', sizeClass[size], `ds-toggle-switch-${size}`, active && styles.active, active && 'is-active', className)} aria-pressed={active}>
      <span className={cn(styles.handle, 'ds-toggle-switch-handle')} aria-hidden="true" />
      <span className={cn(styles.label, 'ds-toggle-switch-label')}>{active ? activeLabel : inactiveLabel}</span>
    </button>
  );
}

const sizeClass = {
  sm: styles.sm,
  md: styles.md,
};
