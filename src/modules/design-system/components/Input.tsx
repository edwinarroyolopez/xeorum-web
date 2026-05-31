import React from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import { Field } from './Field';
import styles from './Input.module.css';
import { cn } from '../../../lib/ui/cn';

type InputProps = {
  label?: string;
  hint?: string;
  error?: string;
  variant?: 'default' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
} & Omit<ComponentPropsWithoutRef<'input'>, 'size'>;

export function Input({ label, hint, error, variant = 'default', size = 'md', loading = false, className, id, disabled, ...props }: Readonly<InputProps>) {
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <Field htmlFor={inputId} label={label} hint={hint} error={error} {...(props.required ? { required: true } : {})}>
      <input {...props} id={inputId} disabled={disabled || loading} aria-invalid={Boolean(error) || undefined} aria-busy={loading || undefined} className={cn(styles.input, 'ds-input', variantClass[variant], `ds-input-${variant}`, sizeClass[size], `ds-input-${size}`, loading && styles.loading, loading && 'is-loading', className)} />
    </Field>
  );
}

const variantClass = {
  default: styles.default,
  subtle: styles.subtle,
};

const sizeClass = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};
