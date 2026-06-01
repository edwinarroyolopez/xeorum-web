'use client';

import React from 'react';
import { EditorialCollectionIntro, EditorialPanel, SectionHeader } from '../../design-system';
import type { PantheonArchetypeLanding } from '../pantheon.types';

export function ArchetypeManifesto({ archetype }: Readonly<{ archetype: PantheonArchetypeLanding }>) {
  return (
    <div className="section-stack xeorum-archetype-section">
      <SectionHeader kicker="Manifesto" title={archetype.narrative.corePhrase} description="La voz publica de la fuerza antes de traducirse a sistema, producto o campana." />
      <EditorialPanel className="section-stack xeorum-archetype-panel">
        <EditorialCollectionIntro eyebrow="Manifesto corto" title={archetype.narrative.shortManifesto} description={archetype.narrative.modernInterpretation} />
        <p>{archetype.narrative.longManifesto || archetype.narrative.shortManifesto}</p>
      </EditorialPanel>
    </div>
  );
}
