'use client';

import React from 'react';
import { DetailFeatureTile, EditorialCollectionIntro, EditorialPanel, SectionHeader } from '../../design-system';
import type { PantheonArchetypeLanding } from '../pantheon.types';
import { ArchetypeTagList } from './ArchetypeTagList';

export function ArchetypePsychology({ archetype }: Readonly<{ archetype: PantheonArchetypeLanding }>) {
  return (
    <div className="section-stack xeorum-archetype-section">
      <SectionHeader kicker="Psicologia editorial" title="Como se reconoce esta fuerza." description="Rasgos, senales y tensiones convertidos en lectura editorial util y sobria." />
      <EditorialPanel className="section-stack xeorum-archetype-panel">
        <EditorialCollectionIntro eyebrow="Lectura" title={archetype.narrative.modernInterpretation} description="La capa conductual aparece antes de la compra y explica por que esta fuerza se sostiene bajo presion." />
      </EditorialPanel>
      <div className="grid-cards">
        <DetailFeatureTile title="Rasgos dominantes" body={<ArchetypeTagList items={archetype.psychology.dominantTraits} emptyLabel="Todavia no hay rasgos dominantes publicados." />} />
        <DetailFeatureTile title="Reconoces esta fuerza cuando..." body={<ArchetypeTagList items={archetype.psychology.behavioralSignals} emptyLabel="Todavia no hay senales de comportamiento publicadas." />} />
        <DetailFeatureTile title="Busca..." body={<ArchetypeTagList items={archetype.psychology.motivations} emptyLabel="Todavia no hay motivaciones publicadas." />} />
        <DetailFeatureTile title="Evita..." body={<ArchetypeTagList items={archetype.psychology.fears} emptyLabel="Todavia no hay miedos o fricciones publicados." />} />
        <DetailFeatureTile title="Se fortalece cuando..." body={<ArchetypeTagList items={archetype.psychology.aspirations} emptyLabel="Todavia no hay aspiraciones publicadas." />} />
      </div>
    </div>
  );
}
