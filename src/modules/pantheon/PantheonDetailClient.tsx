'use client';

import React from 'react';
import { ErrorState, LoadingState } from '../design-system';
import { ArchetypeLanding } from './ArchetypeLanding';
import { usePantheonArchetypeLanding } from './pantheon.queries';
import type { PantheonArchetypeLanding } from './pantheon.types';

export function PantheonDetailClient({ slug, initialData }: Readonly<{ slug: string; initialData?: PantheonArchetypeLanding }>) {
  const query = usePantheonArchetypeLanding(slug, initialData);

  if (query.isLoading) {
    return <LoadingState>Loading archetype landing.</LoadingState>;
  }

  if (query.isError || !query.data) {
    return <ErrorState>Archetype landing unavailable.</ErrorState>;
  }

  return <ArchetypeLanding archetype={query.data} />;
}
