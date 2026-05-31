import React from 'react';
import type { ReactNode } from 'react';
import { HomeSectionHeading } from './HomeSectionHeading';

export function HomeSectionShell({
  kicker,
  title,
  description,
  action,
  className,
  children,
}: Readonly<{
  kicker: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}>) {
  const headingProps = {
    kicker,
    title,
    ...(description ? { description } : {}),
    ...(action ? { action } : {}),
  };

  return (
    <section className={className ? `home-shell ${className}` : 'home-shell'}>
      <HomeSectionHeading {...headingProps} />
      {children}
    </section>
  );
}
