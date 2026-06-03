'use client';

import React from 'react';
import { EditorialPanel, EmptyState, LinkButton, SectionHeader } from '../../design-system';
import { getPantheonPath } from '../pantheon.routes';
import type { PantheonArchetypeLanding } from '../pantheon.types';
import type { ArchetypeLandingViewModel } from '../services';

function RelationGroup({ title, items }: Readonly<{ title: string; items: PantheonArchetypeLanding['relationships']['allies'] }>) {
  if (items.length === 0) {
    return null;
  }

  return (
    <EditorialPanel className="section-stack xeorum-archetype-panel">
      <h3>{title}</h3>
      {items.map((item) => (
        <div key={`${title}-${item.slug}`} className="section-stack xeorum-archetype-relation">
          <strong>{item.name}</strong>
          <p>{item.reason}</p>
          <LinkButton href={getPantheonPath(item.slug)} variant="ghost">Entrar a {item.name}</LinkButton>
        </div>
      ))}
    </EditorialPanel>
  );
}

export function ArchetypeRelations({ archetype, viewModel }: Readonly<{ archetype: PantheonArchetypeLanding; viewModel: ArchetypeLandingViewModel }>) {
  return (
    <div className="section-stack xeorum-archetype-section">
      <SectionHeader kicker="Relaciones" title="Mapa editorial de fuerzas." description="Aliados, contrastes y tensiones deben sentirse como cosmologia editorial, no como recomendaciones." />
      {viewModel.relatedCount === 0 ? (
        <EmptyState>Todavia no hay relaciones publicadas para esta fuerza.</EmptyState>
      ) : (
        <div className="xeorum-archetype-relation-grid">
          <RelationGroup title="Aliados" items={archetype.relationships.allies} />
          <RelationGroup title="Contrastes" items={archetype.relationships.contrasts} />
          <RelationGroup title="Tensiones" items={archetype.relationships.tensions} />
        </div>
      )}
    </div>
  );
}
