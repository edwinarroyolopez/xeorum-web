import React from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import { Field } from './Field';

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  label?: string;
  hint?: string;
  error?: string;
  options: SelectOption[];
  variant?: 'default' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
} & Omit<ComponentPropsWithoutRef<'select'>, 'children' | 'size'>;

export function Select({ label, hint, error, options, variant = 'default', size = 'md', loading = false, className, id, disabled, ...props }: SelectProps) {
  const selectId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const classes = ['ds-select', `ds-select-${variant}`, `ds-select-${size}`];

  if (loading) {
    classes.push('is-loading');
  }

  if (className) {
    classes.push(className);
  }

  return (
    <Field htmlFor={selectId} label={label} hint={hint} error={error} {...(props.required ? { required: true } : {})}>
      <select {...props} id={selectId} disabled={disabled || loading} aria-invalid={Boolean(error) || undefined} aria-busy={loading || undefined} className={classes.join(' ')}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Field>
  );
}
