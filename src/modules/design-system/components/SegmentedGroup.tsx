import React from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import styles from './SegmentedGroup.module.css';
import { cn } from '../../../lib/ui/cn';

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
  return (
    <div {...props} className={cn(styles.group, 'ds-segmented-group', sizeClass[size], `ds-segmented-group-${size}`, className)} role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={cn(styles.option, 'ds-segmented-option', option.value === value && styles.selected, option.value === value && 'is-selected')}
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

const sizeClass = {
  sm: styles.sm,
  md: styles.md,
};
