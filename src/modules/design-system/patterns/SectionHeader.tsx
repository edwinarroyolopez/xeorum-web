import React from 'react';
import type { ReactNode } from 'react';
import { Text } from '../primitives/Text';

export function SectionHeader({ kicker, title }: Readonly<{ kicker: ReactNode; title: ReactNode }>) {
  return (
    <div className="section-heading">
      <Text tone="muted" className="portal-card-kicker">{kicker}</Text>
      <h2>{title}</h2>
    </div>
  );
}
