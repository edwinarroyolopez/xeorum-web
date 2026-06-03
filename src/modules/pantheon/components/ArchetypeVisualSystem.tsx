'use client';

import type { CSSProperties } from 'react';
import React from 'react';
import { EmptyState } from '../../design-system';
import styles from '../ArchetypeLanding.module.css';
import type { PantheonArchetypeLanding } from '../pantheon.types';
import type { ArchetypeLandingViewModel } from '../services';

export function ArchetypeVisualSystem({ archetype, viewModel }: Readonly<{ archetype: PantheonArchetypeLanding; viewModel: ArchetypeLandingViewModel }>) {
  const gallery = viewModel.gallery.slice(0, 3);
  const lead = gallery[0];
  const supporting = gallery.slice(1, 3);
  const cues = [
    ...archetype.visualSystem.symbols,
    ...archetype.visualSystem.textures,
    ...archetype.visualSystem.lighting,
    ...archetype.visualSystem.environments,
  ].filter(Boolean).slice(0, 3);

  return (
    <section className={styles.chapter}>
      <div className={styles.chapterHeader}>
        <p className={styles.chapterKicker}>Capitulo 4</p>
        <h2 className={styles.chapterTitle}>El mundo de {archetype.name}</h2>
        <p className={styles.chapterDescription}>{archetype.visualSystem.mood}</p>
      </div>
      {lead ? (
        <div className={styles.worldLayout}>
          <div className={styles.worldLead}>
            {lead.videoUrl ? <video aria-label={lead.altText} className={styles.worldMedia} controls preload="metadata" src={lead.videoUrl} /> : lead.imageUrl ? <img src={lead.imageUrl} alt={lead.altText} className={styles.worldMedia} /> : null}
          </div>
          <div className={styles.worldSupporting}>
            {supporting.map((item) => (
              <div key={item.id} className={styles.worldSupport}>
                {item.videoUrl ? <video aria-label={item.altText} className={styles.worldMedia} controls preload="metadata" src={item.videoUrl} /> : item.imageUrl ? <img src={item.imageUrl} alt={item.altText} className={styles.worldMedia} /> : null}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <EmptyState title="Atmosfera en curaduria" description="Todavia no hay imagenes publicas para esta fuerza." />
      )}
      <div className={styles.chapter}>
        <p className={styles.summaryBody}>{archetype.visualSystem.artDirection}</p>
        {archetype.visualSystem.palette.length ? (
          <div className={styles.paletteRow} aria-label={`Paleta de ${archetype.name}`}>
            {archetype.visualSystem.palette.slice(0, 4).map((color) => (
              <span key={`${color.name}-${color.hex}`} className={styles.paletteSwatch} style={{ '--swatch-background': color.hex } as CSSProperties} title={`${color.name} ${color.hex}`} />
            ))}
          </div>
        ) : null}
        {cues.length ? (
          <div className={styles.cueRow} aria-label={`Claves visuales de ${archetype.name}`}>
            {cues.map((cue) => <span key={cue} className={styles.cue}>{cue}</span>)}
          </div>
        ) : null}
      </div>
    </section>
  );
}
