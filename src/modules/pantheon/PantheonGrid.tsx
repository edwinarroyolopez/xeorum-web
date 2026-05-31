'use client';

import React from 'react';
import { EmptyState } from '../design-system';
import { PortalCard } from './PortalCard';
import { usePantheonArchetypes } from './pantheon.queries';
import { orderPantheonArchetypes } from './pantheon.types';

export function PantheonGrid() {
  const query = usePantheonArchetypes();

  if (query.isLoading) {
    return <p className="section-state">Cargando portales.</p>;
  }

  if (query.isError || !query.data) {
    return <p className="section-state">Los portales no estan disponibles.</p>;
  }

  if (query.data.length === 0) {
    return <EmptyState>Todavia no hay fuerzas publicadas.</EmptyState>;
  }

  const archetypes = orderPantheonArchetypes(query.data);

  return (
    <section className="portal-grid">
      {archetypes.map((archetype) => (
        <PortalCard key={archetype.slug} archetype={archetype} />
      ))}
    </section>
  );
}
