'use client';

import React from 'react';
import { EditorialCollectionIntro, EditorialPanel, IdentityInsightPanel, SectionHeader } from '../../design-system';
import type { PantheonArchetypeLanding } from '../pantheon.types';
import { ArchetypeTagList } from './ArchetypeTagList';

export function ArchetypeIdentityStatement({ archetype }: Readonly<{ archetype: PantheonArchetypeLanding }>) {
  return (
    <div className="section-stack xeorum-archetype-section">
      <SectionHeader kicker="Identidad" title={archetype.identity.title} description="La energia central, el deseo humano y la promesa emocional con la que esta fuerza se vuelve legible." />
      <div className="xeorum-archetype-narrative-grid">
        <EditorialPanel className="section-stack xeorum-archetype-panel">
          <EditorialCollectionIntro eyebrow="Declaracion" title={archetype.identity.oneLineDefinition} description={archetype.identity.humanDesire} />
          <p>{archetype.identity.emotionalPromise}</p>
          <ArchetypeTagList items={archetype.identity.secondaryEnergies} emptyLabel="Todavia no hay energias secundarias publicadas." />
        </EditorialPanel>
        <div className="xeorum-archetype-overview-grid">
          <IdentityInsightPanel eyebrow="Energia central" title={archetype.identity.coreEnergy} description="La fuerza dominante que gobierna el tono y la presencia." signals={[archetype.identity.symbolicRole]} />
          <IdentityInsightPanel eyebrow="Promesa" title={archetype.identity.emotionalPromise} description="La respuesta emocional que esta lectura sostiene con precision." signals={[archetype.identity.humanDesire]} />
          <IdentityInsightPanel eyebrow="Rol simbolico" title={archetype.identity.symbolicRole} description="La forma publica en que esta energia se reconoce sin convertirse en categoria." signals={[archetype.identity.coreEnergy]} />
        </div>
      </div>
    </div>
  );
}
