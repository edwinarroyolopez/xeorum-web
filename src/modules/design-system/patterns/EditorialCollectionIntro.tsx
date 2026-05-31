import React from 'react';
import type { ReactNode } from 'react';
import { EditorialPanel } from '../components/EditorialPanel';
import { EditorialBody } from '../primitives/EditorialBody';
import { Eyebrow } from '../primitives/Eyebrow';

export function EditorialCollectionIntro({
  eyebrow,
  title,
  description,
}: Readonly<{
  eyebrow: ReactNode;
  title: ReactNode;
  description?: ReactNode;
}>) {
  return (
    <EditorialPanel className="ds-editorial-collection-intro" tone="soft">
      <Eyebrow tone="muted">{eyebrow}</Eyebrow>
      <strong className="ds-editorial-collection-intro-title">{title}</strong>
      {description ? <EditorialBody size="sm">{description}</EditorialBody> : null}
    </EditorialPanel>
  );
}
