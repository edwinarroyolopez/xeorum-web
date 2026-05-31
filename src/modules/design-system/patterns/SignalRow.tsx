import React from 'react';
import type { ReactNode } from 'react';
import { ActionRow } from '../components/ActionRow';
import { Badge } from '../components/Badge';

export function SignalRow({
  items,
  ariaLabel,
  className,
  tone = 'default',
}: Readonly<{
  items: Array<string | ReactNode>;
  ariaLabel: string;
  className?: string;
  tone?: 'default' | 'accent';
}>) {
  const visibleItems = items.filter((item) => (typeof item === 'string' ? item.trim().length > 0 : Boolean(item)));

  if (visibleItems.length === 0) {
    return null;
  }

  return (
    <ActionRow className={className ? `hero-signal-row ${className}` : 'hero-signal-row'} aria-label={ariaLabel}>
      {visibleItems.map((item, index) => (
        <Badge key={typeof item === 'string' ? item : `signal-${index}`} size="sm" tone={tone}>
          {item}
        </Badge>
      ))}
    </ActionRow>
  );
}
