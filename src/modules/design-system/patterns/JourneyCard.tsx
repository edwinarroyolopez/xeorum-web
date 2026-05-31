import React from 'react';
import type { ReactNode } from 'react';
import { EditorialCard } from '../components/EditorialCard';
import { DisplayTitle } from '../primitives/DisplayTitle';
import { EditorialBody } from '../primitives/EditorialBody';
import { Eyebrow } from '../primitives/Eyebrow';

export function JourneyCard({ step, title, body }: Readonly<{ step: ReactNode; title: ReactNode; body: ReactNode }>) {
  return (
    <EditorialCard className="ds-journey-card" tone="soft">
      <Eyebrow>{step}</Eyebrow>
      <DisplayTitle as="h3">{title}</DisplayTitle>
      <EditorialBody>{body}</EditorialBody>
    </EditorialCard>
  );
}
