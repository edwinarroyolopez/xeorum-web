import React from 'react';
import type { ReactNode } from 'react';

export function EditorialHeroShell({
  media,
  aside,
  supporting,
  className,
}: Readonly<{
  media: ReactNode;
  aside: ReactNode;
  supporting?: ReactNode;
  className?: string;
}>) {
  return (
    <div className={className ? `ds-editorial-hero-shell ${className}` : 'ds-editorial-hero-shell'}>
      <div className="ds-editorial-hero-media">{media}</div>
      <div className="ds-editorial-hero-aside">
        {supporting ? <div className="ds-editorial-hero-supporting">{supporting}</div> : null}
        {aside}
      </div>
    </div>
  );
}
