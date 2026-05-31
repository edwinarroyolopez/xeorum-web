import React from 'react';
import type { ReactNode } from 'react';
import { Kicker } from '../primitives/Kicker';

export function PageHeader({
  kicker,
  title,
  description,
  actions,
  align = 'center',
}: Readonly<{
  kicker: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  align?: 'start' | 'center';
}>) {
  return (
    <header className={`page-header page-header-copy page-header-copy-${align}`}>
      <Kicker>{kicker}</Kicker>
      <h1>{title}</h1>
      <div className="editorial-ornament page-header-ornament" aria-hidden="true">
        <span />
        <i />
        <span />
      </div>
      {description ? <p>{description}</p> : null}
      {actions ? <div className="page-header-actions">{actions}</div> : null}
    </header>
  );
}
