import React from 'react';
import type { ComponentPropsWithoutRef } from 'react';

type ActionRowProps = {
  align?: 'start' | 'center' | 'end';
  justify?: 'start' | 'center' | 'between' | 'end';
  wrap?: boolean;
} & ComponentPropsWithoutRef<'div'>;

export function ActionRow({ align = 'center', justify = 'start', wrap = true, className, ...props }: Readonly<ActionRowProps>) {
  const classes = ['ds-action-row', `ds-action-row-align-${align}`, `ds-action-row-justify-${justify}`];

  if (!wrap) {
    classes.push('ds-action-row-nowrap');
  }

  if (className) {
    classes.push(className);
  }

  return <div {...props} className={classes.join(' ')} />;
}
