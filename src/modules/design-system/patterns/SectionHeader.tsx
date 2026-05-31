import React from 'react';
import type { ReactNode } from 'react';
import { Text } from '../primitives/Text';

export function SectionHeader({
  kicker,
  title,
  description,
  actions,
  align = 'start',
}: Readonly<{
  kicker: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  align?: 'start' | 'center';
}>) {
  return (
    <div className={`section-heading section-heading-${align}`}>
      <Text tone="muted" className="portal-card-kicker">{kicker}</Text>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
      {actions ? <div className="section-heading-actions">{actions}</div> : null}
    </div>
  );
}
