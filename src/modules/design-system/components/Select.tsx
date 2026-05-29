import React from 'react';
import type { ComponentPropsWithoutRef } from 'react';

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  label: string;
  options: SelectOption[];
} & Omit<ComponentPropsWithoutRef<'select'>, 'children'>;

export function Select({ label, options, className, id, ...props }: SelectProps) {
  const selectId = id ?? label.toLowerCase().replace(/\s+/g, '-');

  return (
    <label className="ds-field" htmlFor={selectId}>
      <span>{label}</span>
      <select {...props} id={selectId} className={className ? `ds-select ${className}` : 'ds-select'}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
