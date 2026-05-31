import React from 'react';
import type { ReactNode } from 'react';
import { ActionRow } from '../components/ActionRow';
import { Kicker } from '../primitives/Kicker';

export function EditorialHero({
  kicker,
  title,
  description,
  actions,
  supporting,
  align = 'start',
  className,
}: Readonly<{
  kicker: ReactNode;
  title: ReactNode;
  description: ReactNode;
  actions?: ReactNode;
  supporting?: ReactNode;
  align?: 'start' | 'center';
  className?: string;
}>) {
  return (
    <section className={className ? `editorial-hero ${className}` : 'editorial-hero'}>
      <div className={`editorial-hero-frame editorial-hero-copy editorial-hero-copy-${align}`}>
        <Kicker>{kicker}</Kicker>
        <h1>{title}</h1>
        <div className="editorial-ornament" aria-hidden="true">
          <span />
          <i />
          <span />
        </div>
        <p className="editorial-hero-description">{description}</p>
        {actions ? <ActionRow className="portal-actions editorial-hero-actions">{actions}</ActionRow> : null}
      </div>
      {supporting ? <div className="editorial-hero-supporting">{supporting}</div> : null}
    </section>
  );
}
