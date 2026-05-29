import React from 'react';
import type { ComponentPropsWithoutRef } from 'react';

export function Input({ label, className, id, ...props }: Readonly<{ label: string } & ComponentPropsWithoutRef<'input'>>) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');

  return (
    <label className="ds-field" htmlFor={inputId}>
      <span>{label}</span>
      <input {...props} id={inputId} className={className ? `ds-input ${className}` : 'ds-input'} />
    </label>
  );
}
