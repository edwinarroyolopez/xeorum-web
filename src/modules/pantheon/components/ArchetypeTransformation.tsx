'use client';

import React from 'react';
import { EditorialCollectionIntro, EditorialPanel, EmptyState, SectionHeader } from '../../design-system';
import type { PantheonArchetypeLanding } from '../pantheon.types';

export function ArchetypeTransformation({ archetype }: Readonly<{ archetype: PantheonArchetypeLanding }>) {
  const transformation = archetype.narrative.transformationArc.trim();

  return (
    <div className="section-stack xeorum-archetype-section">
      <SectionHeader kicker="Transformacion" title="De impulso a presencia legible." description="El arco de maduracion conecta identidad, comportamiento, forma y eventual producto." />
      <EditorialPanel className="section-stack xeorum-archetype-panel">
        {transformation ? (
          <>
            <EditorialCollectionIntro eyebrow="Arco" title={transformation} description={archetype.narrative.modernInterpretation} />
            <p>{archetype.identity.symbolicRole}</p>
          </>
        ) : (
          <EmptyState variant="default" title="Transformacion en curaduria editorial." description="Todavia no hay un arco de transformacion publicado para esta fuerza." />
        )}
      </EditorialPanel>
    </div>
  );
}
