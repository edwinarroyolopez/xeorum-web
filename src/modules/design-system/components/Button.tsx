import React from 'react';
import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

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
  const classes = ['ds-button', `ds-button-${variant}`, `ds-button-${size}`, `ds-button-tone-${tone}`];

  if (loading) {
    classes.push('is-loading');
  }

  if (fullWidth) {
    classes.push('ds-button-full-width');
  }

  if (className) {
    classes.push(className);
  }

  return classes.join(' ');
}

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
