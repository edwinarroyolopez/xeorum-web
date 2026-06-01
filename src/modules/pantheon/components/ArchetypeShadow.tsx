'use client';

import React from 'react';
import { EditorialCollectionIntro, EditorialPanel, EmptyState, SectionHeader } from '../../design-system';
import type { PantheonArchetypeLanding } from '../pantheon.types';

export function ArchetypeShadow({ archetype }: Readonly<{ archetype: PantheonArchetypeLanding }>) {
  const shadow = archetype.narrative.shadow.trim();

  return (
    <div className="section-stack xeorum-archetype-section">
      <SectionHeader kicker="Sombra" title="Lo que se distorsiona cuando la fuerza pierde forma." description="La lectura de riesgo evita moralina y muestra el costo estetico, emocional o conductual del desbalance." />
      <EditorialPanel className="section-stack xeorum-archetype-panel">
        {shadow ? (
          <EditorialCollectionIntro eyebrow="Desbalance" title={shadow} description="La curaduria editorial mantiene esta capa visible para que la fuerza no se reduzca a pose." />
        ) : (
          <EmptyState variant="default" title="Lectura de sombra en curaduria editorial." description="Todavia no hay una capa de sombra publicada para esta fuerza." />
        )}
      </EditorialPanel>
    </div>
  );
}
