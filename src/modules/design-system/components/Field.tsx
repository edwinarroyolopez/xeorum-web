import React from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import styles from './Field.module.css';
import { cn } from '../../../lib/ui/cn';

export type FieldProps = {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<'label'>, 'children'>;

export function Field({ label, hint, error, required, className, children, ...props }: Readonly<FieldProps>) {
  return (
    <label {...props} className={cn(styles.field, 'ds-field', Boolean(error) && styles.invalid, Boolean(error) && 'ds-field-invalid', className)}>
      {label ? (
        <span className={cn(styles.label, 'ds-field-label')}>
          {label}
          {required ? <strong className={cn(styles.required, 'ds-field-required')}> *</strong> : null}
        </span>
      ) : null}
      {children}
      {hint ? <span className={cn(styles.hint, 'ds-field-hint')}>{hint}</span> : null}
      {error ? <span className={cn(styles.error, 'ds-field-error')}>{error}</span> : null}
    </label>
  );
}
