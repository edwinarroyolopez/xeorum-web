import React from 'react';
import type { ComponentPropsWithoutRef } from 'react';

export function Textarea({
  label,
  className,
  id,
  ...props
}: Readonly<{ label: string } & ComponentPropsWithoutRef<'textarea'>>) {
  const textareaId = id ?? label.toLowerCase().replace(/\s+/g, '-');

  return (
    <label className="ds-field" htmlFor={textareaId}>
      <span>{label}</span>
      <textarea {...props} id={textareaId} className={className ? `ds-textarea ${className}` : 'ds-textarea'} />
    </label>
  );
}
