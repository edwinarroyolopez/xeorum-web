import React from 'react';
import type { ReactNode } from 'react';

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
      <div className={`editorial-hero-copy editorial-hero-copy-${align}`}>
        <p className="portal-card-kicker">{kicker}</p>
        <h1>{title}</h1>
        <p className="editorial-hero-description">{description}</p>
        {actions ? <div className="portal-actions editorial-hero-actions">{actions}</div> : null}
      </div>
      {supporting ? <div className="editorial-hero-supporting">{supporting}</div> : null}
    </section>
  );
}
