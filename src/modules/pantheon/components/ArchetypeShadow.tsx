'use client';

import React from 'react';
import { EditorialPanel, EmptyState } from '../../design-system';
import styles from '../ArchetypeLanding.module.css';
import type { PantheonArchetypeLanding } from '../pantheon.types';

export function ArchetypeShadow({ archetype }: Readonly<{ archetype: PantheonArchetypeLanding }>) {
  const shadow = archetype.narrative.shadow.trim();
  const transformation = archetype.narrative.transformationArc.trim();

  return (
    <section className={styles.chapter}>
      <div className={styles.chapterHeader}>
        <p className={styles.chapterKicker}>Capitulo 3</p>
        <h2 className={styles.chapterTitle}>Tension y transformacion</h2>
        <p className={styles.chapterDescription}>La madurez de esta fuerza importa tanto como su atraccion inicial. El contraste debe sentirse claro, no clinico.</p>
      </div>
      <div className={styles.tensionGrid}>
        <EditorialPanel className={styles.quietPanel}>
          <p className={styles.panelEyebrow}>Cuando pierde balance</p>
          {shadow ? (
            <>
              <h3 className={styles.panelTitle}>{shadow}</h3>
              <p className={styles.tensionBody}>{archetype.psychology.fears[0] ?? archetype.psychology.behavioralSignals[0] ?? archetype.narrative.modernInterpretation}</p>
            </>
          ) : (
            <EmptyState variant="default" title="Lectura no disponible" description="Todavia no hay una lectura publica del desbalance para esta fuerza." />
          )}
        </EditorialPanel>
        <EditorialPanel className={styles.quietPanel}>
          <p className={styles.panelEyebrow}>Como madura</p>
          {transformation ? (
            <>
              <h3 className={styles.panelTitle}>{transformation}</h3>
              <p className={styles.tensionBody}>{archetype.psychology.aspirations[0] ?? archetype.identity.emotionalPromise}</p>
            </>
          ) : (
            <EmptyState variant="default" title="Arco no disponible" description="Todavia no hay un arco publico de maduracion para esta fuerza." />
          )}
        </EditorialPanel>
      </div>
    </section>
  );
}
