import React from 'react';
import type { PantheonArchetype } from '../pantheon.types';
import styles from '../PantheonExperience.module.css';
import { getPantheonSymbol } from '../services';

export function PantheonAmbientLayer({ archetype }: Readonly<{ archetype: PantheonArchetype }>) {
  return (
    <div className={styles.ambient} aria-hidden="true">
      <div className={styles.ambientGrid} />
      <div className={styles.ambientSymbol}>{getPantheonSymbol(archetype)}</div>
      <div className={styles.ambientMood}>{archetype.visualMood}</div>
    </div>
  );
}
