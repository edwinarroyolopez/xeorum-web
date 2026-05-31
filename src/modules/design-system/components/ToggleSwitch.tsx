'use client';

import React from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

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
  const classes = ['ds-toggle-switch', `ds-toggle-switch-${size}`];

  if (active) {
    classes.push('is-active');
  }

  if (className) {
    classes.push(className);
  }

  return (
    <button {...props} type={type} className={classes.join(' ')} aria-pressed={active}>
      <span className="ds-toggle-switch-handle" aria-hidden="true" />
      <span className="ds-toggle-switch-label">{active ? activeLabel : inactiveLabel}</span>
    </button>
  );
}
