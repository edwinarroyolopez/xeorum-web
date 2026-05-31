import React from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import { Field } from './Field';
import styles from './Textarea.module.css';
import { cn } from '../../../lib/ui/cn';

export function Textarea({
  label,
  hint,
  error,
  variant = 'default',
  size = 'md',
  loading = false,
  className,
  id,
  disabled,
  ...props
}: Readonly<{
  label?: string;
  hint?: string;
  error?: string;
  variant?: 'default' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
} & ComponentPropsWithoutRef<'textarea'>>) {
  const textareaId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <Field htmlFor={textareaId} label={label} hint={hint} error={error} {...(props.required ? { required: true } : {})}>
      <textarea {...props} id={textareaId} disabled={disabled || loading} aria-invalid={Boolean(error) || undefined} aria-busy={loading || undefined} className={cn(styles.textarea, 'ds-textarea', variantClass[variant], `ds-textarea-${variant}`, sizeClass[size], `ds-textarea-${size}`, loading && styles.loading, loading && 'is-loading', className)} />
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
