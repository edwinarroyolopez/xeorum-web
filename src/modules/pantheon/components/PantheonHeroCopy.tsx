import React from 'react';
import { Kicker } from '../../design-system';
import type { PantheonArchetype } from '../pantheon.types';
import styles from '../PantheonExperience.module.css';

export function PantheonHeroCopy({ archetype }: Readonly<{ archetype: PantheonArchetype }>) {
  return (
    <div className={styles.heroCopy}>
      <span className={styles.eyebrow}>Pantheon Selector</span>
      <h1 className={styles.heroTitle}>Elige la fuerza que ya te esta mirando.</h1>
      <p className={styles.heroBody}>XEORUM abre por presencia, deseo y simbolo. Los dioses aparecen al mismo nivel; tu seleccion decide cual toma el centro.</p>
      <Kicker tone="muted">{archetype.coreEnergy}</Kicker>
    </div>
  );
}
