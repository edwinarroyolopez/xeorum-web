import React from 'react';
import type { ReactNode } from 'react';
import { LinkButton } from '../../design-system';

export function ProductIdentityLink({ href, children }: Readonly<{ href: string; children: ReactNode }>) {
  return <LinkButton href={href} variant="ghost" className="xeorum-product-identity-link">{children}</LinkButton>;
}
