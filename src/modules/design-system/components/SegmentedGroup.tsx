import React from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type SegmentedOption<TValue extends string = string> = {
  label: ReactNode;
  value: TValue;
  disabled?: boolean;
};

type SegmentedGroupProps<TValue extends string = string> = {
  label: string;
  value: TValue;
  options: SegmentedOption<TValue>[];
  onChange: (value: TValue) => void;
  size?: 'sm' | 'md';
} & Omit<ComponentPropsWithoutRef<'div'>, 'onChange'>;

export function SegmentedGroup<TValue extends string = string>({
  label,
  value,
  options,
  onChange,
  size = 'md',
  className,
  ...props
}: Readonly<SegmentedGroupProps<TValue>>) {
  const classes = ['ds-segmented-group', `ds-segmented-group-${size}`];

  if (className) {
    classes.push(className);
  }

  return (
    <div {...props} className={classes.join(' ')} role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={option.value === value ? 'ds-segmented-option is-selected' : 'ds-segmented-option'}
          aria-pressed={option.value === value}
          disabled={option.disabled}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
