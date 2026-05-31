import React from 'react';
import type { ReactNode } from 'react';
import { EditorialCard } from '../components/EditorialCard';
import { DisplayTitle } from '../primitives/DisplayTitle';

export function DetailFeatureTile({ icon, title, body }: Readonly<{ icon?: ReactNode; title: ReactNode; body: ReactNode }>) {
  return (
    <EditorialCard className="ds-detail-feature-tile" tone="soft">
      {icon ? <div className="ds-detail-feature-icon">{icon}</div> : null}
      <DisplayTitle as="h3">{title}</DisplayTitle>
      <div className="ds-detail-feature-body">{body}</div>
    </EditorialCard>
  );
}
