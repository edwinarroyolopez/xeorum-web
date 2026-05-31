import React from 'react';
import type { ReactNode } from 'react';
import { ActionRow, EditorialBody, EditorialPanel, OrnamentalMark, SectionLabel } from '../../design-system';

export function ProductStoryCard({
  symbol,
  title,
  description,
  actions,
}: Readonly<{
  symbol?: string;
  title: string;
  description: ReactNode;
  actions?: ReactNode;
}>) {
  return (
    <EditorialPanel className="xeorum-product-story-card">
      <div className="xeorum-product-story-card-header">
        <SectionLabel>{title}</SectionLabel>
        <OrnamentalMark align="start" {...(symbol ? { symbol } : {})} />
      </div>
      <EditorialBody as="div" className="xeorum-product-story-card-copy">{description}</EditorialBody>
      {actions ? <ActionRow className="xeorum-product-story-card-actions">{actions}</ActionRow> : null}
    </EditorialPanel>
  );
}
