import React from 'react';
import type { ReactNode } from 'react';
import { EditorialPanel } from '../components/EditorialPanel';
import { EditorialPill } from '../components/EditorialPill';
import { DisplayTitle } from '../primitives/DisplayTitle';
import { EditorialBody } from '../primitives/EditorialBody';
import { Eyebrow } from '../primitives/Eyebrow';

export function IdentityInsightPanel({
  eyebrow,
  title,
  description,
  signals,
}: Readonly<{
  eyebrow: ReactNode;
  title: ReactNode;
  description: ReactNode;
  signals: ReactNode[];
}>) {
  return (
    <EditorialPanel className="ds-identity-insight-panel">
      <Eyebrow>{eyebrow}</Eyebrow>
      <DisplayTitle as="h3">{title}</DisplayTitle>
      <EditorialBody>{description}</EditorialBody>
      <div className="ds-identity-signal-list">
        {signals.map((signal, index) => (
          <EditorialPill key={index}>{signal}</EditorialPill>
        ))}
      </div>
    </EditorialPanel>
  );
}
