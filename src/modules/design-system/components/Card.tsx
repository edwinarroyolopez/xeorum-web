import React from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import styles from './Card.module.css';
import { cn } from '../../../lib/ui/cn';

type CardProps = {
  children: ReactNode;
  variant?: 'default' | 'soft' | 'emphasis';
} & ComponentPropsWithoutRef<'article'>;

export function Card({ children, variant = 'default', className, ...props }: CardProps) {
  return (
    <article {...props} className={cn(styles.card, variantClass[variant], className)}>
      {children}
    </article>
  );
}

const variantClass = {
  default: styles.default,
  soft: styles.soft,
  emphasis: styles.emphasis,
};
