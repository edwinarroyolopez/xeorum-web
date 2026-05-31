import React from 'react';
import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import styles from './Button.module.css';
import { cn } from '../../../lib/ui/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonTone = 'default' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

function buttonClassName({
  variant,
  tone,
  size,
  loading,
  fullWidth,
  className,
}: Readonly<{
  variant: ButtonVariant;
  tone: ButtonTone;
  size: ButtonSize;
  loading: boolean;
  fullWidth: boolean;
  className: string | undefined;
}>) {
  return cn(
    styles.button,
    'ds-button',
    variantClass[variant],
    `ds-button-${variant}`,
    sizeClass[size],
    `ds-button-${size}`,
    toneClass[tone],
    `ds-button-tone-${tone}`,
    loading && styles.loading,
    loading && 'is-loading',
    fullWidth && styles.fullWidth,
    fullWidth && 'ds-button-full-width',
    className,
  );
}

const variantClass = {
  primary: styles.primary,
  secondary: styles.secondary,
  ghost: styles.ghost,
};

const sizeClass = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

const toneClass = {
  default: styles.toneDefault,
  danger: styles.toneDanger,
};

type ButtonProps = {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
} & ComponentPropsWithoutRef<'button'>;

export function Button({
  variant = 'secondary',
  tone = 'default',
  size = 'md',
  loading = false,
  fullWidth = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={buttonClassName({ variant, tone, size, loading, fullWidth, className })}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      {children}
    </button>
  );
}

type LinkButtonProps = {
  href: string;
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
};

export function LinkButton({ href, variant = 'secondary', tone = 'default', size = 'md', fullWidth = false, children, className }: LinkButtonProps) {
  return (
    <Link href={href} className={buttonClassName({ variant, tone, size, loading: false, fullWidth, className })}>
      {children}
    </Link>
  );
}
