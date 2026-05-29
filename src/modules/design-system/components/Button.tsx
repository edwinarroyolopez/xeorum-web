import React from 'react';
import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

function buttonClassName(variant: ButtonVariant, loading?: boolean, className?: string) {
  const base = `ds-button ds-button-${variant}`;
  const state = loading ? `${base} is-loading` : base;
  return className ? `${state} ${className}` : state;
}

type ButtonProps = {
  variant?: ButtonVariant;
  loading?: boolean;
  children: ReactNode;
} & ComponentPropsWithoutRef<'button'>;

export function Button({ variant = 'secondary', loading = false, children, className, disabled, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={buttonClassName(variant, loading, className)}
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
  children: ReactNode;
  className?: string;
};

export function LinkButton({ href, variant = 'secondary', children, className }: LinkButtonProps) {
  return (
    <Link href={href} className={buttonClassName(variant, false, className)}>
      {children}
    </Link>
  );
}
