import React from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type FieldProps = {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<'label'>, 'children'>;

export function Field({ label, hint, error, required, className, children, ...props }: Readonly<FieldProps>) {
  const classes = ['ds-field'];

  if (error) {
    classes.push('ds-field-invalid');
  }

  if (className) {
    classes.push(className);
  }

  return (
    <label {...props} className={classes.join(' ')}>
      {label ? (
        <span className="ds-field-label">
          {label}
          {required ? <strong className="ds-field-required"> *</strong> : null}
        </span>
      ) : null}
      {children}
      {hint ? <span className="ds-field-hint">{hint}</span> : null}
      {error ? <span className="ds-field-error">{error}</span> : null}
    </label>
  );
}
