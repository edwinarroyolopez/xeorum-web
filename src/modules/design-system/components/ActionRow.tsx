import React from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import styles from './ActionRow.module.css';
import { cn } from '../../../lib/ui/cn';

type ActionRowProps = {
  align?: 'start' | 'center' | 'end';
  justify?: 'start' | 'center' | 'between' | 'end';
  wrap?: boolean;
} & ComponentPropsWithoutRef<'div'>;

export function ActionRow({ align = 'center', justify = 'start', wrap = true, className, ...props }: Readonly<ActionRowProps>) {
  return <div {...props} className={cn(styles.row, 'ds-action-row', alignClass[align], `ds-action-row-align-${align}`, justifyClass[justify], `ds-action-row-justify-${justify}`, !wrap && styles.nowrap, !wrap && 'ds-action-row-nowrap', className)} />;
}

const alignClass = {
  start: styles.alignStart,
  center: styles.alignCenter,
  end: styles.alignEnd,
};

const justifyClass = {
  start: styles.justifyStart,
  center: styles.justifyCenter,
  between: styles.justifyBetween,
  end: styles.justifyEnd,
};
