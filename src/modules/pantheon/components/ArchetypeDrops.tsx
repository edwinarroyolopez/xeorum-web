'use client';

import React from 'react';
import { DropCard, EditorialCollectionIntro, EditorialPanel, EmptyState, SectionHeader } from '../../design-system';
import type { PantheonArchetypeLanding } from '../pantheon.types';

export function ArchetypeDrops({ archetype }: Readonly<{ archetype: PantheonArchetypeLanding }>) {
  return (
    <div className="section-stack xeorum-archetype-section">
      <SectionHeader kicker="Drops relacionados" title={archetype.commerce.dropHeading} description={archetype.commerce.dropSubheading} />
      <EditorialPanel className="section-stack xeorum-archetype-panel">
        <EditorialCollectionIntro eyebrow="Campanas concentradas" title="Cada drop funciona como una condensacion narrativa de la fuerza." description={archetype.commerce.dropSubheading} />
      </EditorialPanel>
      {archetype.drops.length === 0 ? <EmptyState>No hay drops publicados alineados a esta fuerza ahora mismo.</EmptyState> : <section className="drop-grid">{archetype.drops.map((drop) => <DropCard key={drop.slug} drop={drop} />)}</section>}
    </div>
  );
}
