'use client';

import React from 'react';
import { EmptyState, ErrorState, LoadingState } from '../design-system';
import { PortalCard } from './PortalCard';
import { usePantheonArchetypes } from './pantheon.queries';
import { orderPantheonArchetypes } from './pantheon.types';

export function PantheonGrid() {
  const query = usePantheonArchetypes();

  if (query.isLoading) {
    return <LoadingState title="Cargando portales" description="Preparando las fuerzas publicadas del pantheon." />;
  }

  if (query.isError || !query.data) {
    return <ErrorState title="Portales no disponibles" description="La capa editorial del pantheon no esta disponible ahora." />;
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
