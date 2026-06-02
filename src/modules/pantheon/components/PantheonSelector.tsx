import React from 'react';
import type { PantheonArchetype } from '../pantheon.types';
import styles from '../PantheonExperience.module.css';
import { PantheonGodCard } from './PantheonGodCard';

type PantheonSelectorProps = {
  archetypes: PantheonArchetype[];
  activeSlug: string;
  onActiveChange: (slug: string) => void;
};

export function PantheonSelector({ archetypes, activeSlug, onActiveChange }: Readonly<PantheonSelectorProps>) {
  return (
    <section className={styles.selectorBlock} aria-labelledby="pantheon-selector-heading">
      <div className={styles.selectorIntro}>
        <div>
          <p className={styles.selectorEyebrow}>Portales activos</p>
          <h2 className={styles.selectorTitle} id="pantheon-selector-heading">Selecciona un umbral de entrada</h2>
        </div>
        <p className={styles.selectorHint} id="pantheon-selector-hint">Hover, foco o seleccion directa cambian el portal activo.</p>
      </div>
      <div className={styles.selectorRail}>
        {archetypes.map((archetype) => (
          <PantheonGodCard key={archetype.slug} archetype={archetype} active={archetype.slug === activeSlug} onActiveChange={onActiveChange} />
        ))}
      </div>
    </section>
  );
}
