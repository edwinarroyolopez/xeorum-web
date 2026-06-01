'use client';

import React from 'react';
import { ActionRow, Badge, EmptyState } from '../../design-system';

export function ArchetypeTagList({ items, emptyLabel }: Readonly<{ items: string[]; emptyLabel: string }>) {
  if (items.length === 0) {
    return <EmptyState variant="default" title="Sin elementos publicados" description={emptyLabel} />;
  }

  return (
    <ActionRow className="portal-tag-list" aria-label={emptyLabel}>
      {items.map((item) => (
        <Badge key={item} className="portal-tag" size="sm">{item}</Badge>
      ))}
    </ActionRow>
  );
}
