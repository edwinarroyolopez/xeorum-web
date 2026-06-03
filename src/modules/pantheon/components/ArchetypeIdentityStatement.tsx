'use client';

import React from 'react';
import { EditorialPanel } from '../../design-system';
import styles from '../ArchetypeLanding.module.css';
import type { PantheonArchetypeLanding } from '../pantheon.types';

export function ArchetypeIdentityStatement({ archetype }: Readonly<{ archetype: PantheonArchetypeLanding }>) {
  const traits = archetype.psychology.dominantTraits.slice(0, 3);

  return (
    <section className={styles.chapter}>
      <div className={styles.chapterHeader}>
        <p className={styles.chapterKicker}>Capitulo 2</p>
        <h2 className={styles.chapterTitle}>Entender la fuerza</h2>
        <p className={styles.chapterDescription}>La esencia aparece en capas breves: deseo, promesa, rol simbolico y una lectura que explique por que esta identidad puede resonar contigo.</p>
      </div>
      <div className={styles.summaryStrip}>
        <div className={styles.summaryCard}>
          <p className={styles.summaryLabel}>Deseo</p>
          <p className={styles.summaryValue}>{archetype.identity.humanDesire}</p>
        </div>
        <div className={styles.summaryCard}>
          <p className={styles.summaryLabel}>Promesa</p>
          <p className={styles.summaryValue}>{archetype.identity.emotionalPromise}</p>
        </div>
        <div className={styles.summaryCard}>
          <p className={styles.summaryLabel}>Rol simbolico</p>
          <p className={styles.summaryValue}>{archetype.identity.symbolicRole}</p>
        </div>
      </div>
      <EditorialPanel className={styles.quietPanel}>
        <p className={styles.panelEyebrow}>La esencia de {archetype.name}</p>
        <h3 className={styles.panelTitle}>{archetype.narrative.shortManifesto}</h3>
        <p className={styles.essenceBody}>{archetype.narrative.modernInterpretation}</p>
        <p className={styles.essenceBody}>{archetype.visualSystem.mood}</p>
        {traits.length ? (
          <div className={styles.traitRow} aria-label={`Rasgos dominantes de ${archetype.name}`}>
            {traits.map((trait) => <span key={trait} className={styles.trait}>{trait}</span>)}
          </div>
        ) : null}
      </EditorialPanel>
    </section>
  );
}
