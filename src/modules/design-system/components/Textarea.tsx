import React from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import { Field } from './Field';

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
  const classes = ['ds-textarea', `ds-textarea-${variant}`, `ds-textarea-${size}`];

  if (loading) {
    classes.push('is-loading');
  }

  if (className) {
    classes.push(className);
  }

  return (
    <Field htmlFor={textareaId} label={label} hint={hint} error={error} {...(props.required ? { required: true } : {})}>
      <textarea {...props} id={textareaId} disabled={disabled || loading} aria-invalid={Boolean(error) || undefined} aria-busy={loading || undefined} className={classes.join(' ')} />
    </Field>
  );
}
