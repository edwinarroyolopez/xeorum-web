import React from 'react';
import type { ReactNode } from 'react';
import { ActionRow } from '../components/ActionRow';
import { Kicker } from '../primitives/Kicker';

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
      <div className="section-heading-frame">
        <Kicker>{kicker}</Kicker>
        <h2>{title}</h2>
        <div className="editorial-ornament section-heading-ornament" aria-hidden="true">
          <span />
          <i />
          <span />
        </div>
        {description ? <p>{description}</p> : null}
        {actions ? <ActionRow className="section-heading-actions">{actions}</ActionRow> : null}
      </div>
    </div>
  );
}
