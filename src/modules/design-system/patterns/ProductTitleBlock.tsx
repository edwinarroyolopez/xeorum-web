import React from 'react';
import type { ReactNode } from 'react';
import { DisplayTitle } from '../primitives/DisplayTitle';
import { EditorialBody } from '../primitives/EditorialBody';
import { Eyebrow } from '../primitives/Eyebrow';
import { OrnamentalLine } from '../primitives/OrnamentalLine';

export function ProductTitleBlock({
  eyebrow,
  title,
  subtitle,
  align = 'start',
}: Readonly<{
  eyebrow: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'start' | 'center';
}>) {
  return (
    <div className={`ds-product-title-block ds-product-title-block-${align}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <DisplayTitle as="h1" size="lg">{title}</DisplayTitle>
      <OrnamentalLine />
      {subtitle ? <EditorialBody className="ds-product-title-subtitle">{subtitle}</EditorialBody> : null}
    </div>
  );
}
