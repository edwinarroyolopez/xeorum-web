'use client';

import React from 'react';
import { ErrorState, LoadingState } from '../design-system';
import { ArchetypeLanding } from './ArchetypeLanding';
import { usePantheonArchetypeLanding } from './pantheon.queries';
import type { PantheonArchetypeLanding } from './pantheon.types';

export function PantheonDetailClient({ slug, initialData }: Readonly<{ slug: string; initialData?: PantheonArchetypeLanding }>) {
  const query = usePantheonArchetypeLanding(slug, initialData);

  if (query.isLoading) {
    return <LoadingState title="Preparando el portal" description="Cargando narrativa, producto curado y sistema visual." />;
  }

  if (query.isError || !query.data) {
    return <ErrorState title="Portal no disponible" description="El portal no esta disponible ahora." />;
  }

  return <ArchetypeLanding archetype={query.data} />;
}
