import React from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import { Field } from './Field';

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
  const classes = ['ds-input', `ds-input-${variant}`, `ds-input-${size}`];

  if (loading) {
    classes.push('is-loading');
  }

  if (className) {
    classes.push(className);
  }

  return (
    <Field htmlFor={inputId} label={label} hint={hint} error={error} {...(props.required ? { required: true } : {})}>
      <input {...props} id={inputId} disabled={disabled || loading} aria-invalid={Boolean(error) || undefined} aria-busy={loading || undefined} className={classes.join(' ')} />
    </Field>
  );
}
