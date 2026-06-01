'use client';

import React from 'react';
import { EmptyState, ErrorState, LoadingState } from '../../design-system';
import styles from '../PantheonExperience.module.css';
import { usePantheonArchetypes } from '../pantheon.queries';
import { buildPantheonSelectorViewModel } from '../services';
import { PantheonReducedMotionFallback } from './PantheonReducedMotionFallback';
import { PantheonStage } from './PantheonStage';

export function PantheonExperience() {
  const query = usePantheonArchetypes();
  const selectorViewModel = query.data ? buildPantheonSelectorViewModel(query.data) : null;
  const orderedArchetypes = selectorViewModel?.orderedArchetypes ?? [];
  const [activeSlug, setActiveSlug] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!selectorViewModel) {
      setActiveSlug(null);
      return;
    }

    if (!activeSlug || !orderedArchetypes.some((archetype) => archetype.slug === activeSlug)) {
      setActiveSlug(selectorViewModel.initialActiveSlug);
    }
  }, [activeSlug, orderedArchetypes, selectorViewModel]);

  if (query.isLoading) {
    return (
      <section className={styles.stateShell}>
        <LoadingState title="Cargando portales" description="Preparando las fuerzas publicadas del pantheon." />
      </section>
    );
  }

  if (query.isError || !query.data) {
    return (
      <section className={styles.stateShell}>
        <ErrorState title="Portales no disponibles" description="La capa editorial del pantheon no esta disponible ahora." />
      </section>
    );
  }

  if (orderedArchetypes.length === 0) {
    return (
      <section className={styles.stateShell}>
        <EmptyState>Todavia no hay fuerzas publicadas.</EmptyState>
      </section>
    );
  }

  const firstArchetype = orderedArchetypes[0]!;
  const activeArchetype = orderedArchetypes.find((archetype) => archetype.slug === activeSlug) ?? firstArchetype;

  return (
    <div className={styles.shell}>
      <PantheonReducedMotionFallback>
        {(reducedMotion) => (
          <PantheonStage archetypes={orderedArchetypes} activeArchetype={activeArchetype} reducedMotion={reducedMotion} onActiveChange={setActiveSlug} />
        )}
      </PantheonReducedMotionFallback>
    </div>
  );
}
