import React from 'react';
import Link from 'next/link';
import type { PantheonArchetype } from '../pantheon.types';
import styles from '../PantheonExperience.module.css';
import { getPantheonEntryHref, getPantheonPalette, getPantheonPreviewLine, getPantheonSymbol } from '../services';

type PantheonGodCardProps = {
  archetype: PantheonArchetype;
  active: boolean;
  onActiveChange: (slug: string) => void;
};

export function PantheonGodCard({ archetype, active, onActiveChange }: Readonly<PantheonGodCardProps>) {
  const palette = getPantheonPalette(archetype);

  return (
    <article
      className={styles.selectorCard}
      data-active={active}
      aria-current={active ? 'true' : undefined}
      style={{ '--pantheon-tone-start': palette[0], '--pantheon-tone-mid': palette[1], '--pantheon-tone-end': palette[2] } as React.CSSProperties}
    >
      <button
        type="button"
        className={styles.selectorButton}
        aria-pressed={active}
        aria-describedby={`pantheon-card-copy-${archetype.slug}`}
        onMouseEnter={() => onActiveChange(archetype.slug)}
        onFocus={() => onActiveChange(archetype.slug)}
        onClick={() => onActiveChange(archetype.slug)}
      >
        <div className={styles.selectorCardTop}>
          <span className={styles.selectorSymbol} aria-hidden="true">{getPantheonSymbol(archetype)}</span>
          <span className={styles.selectorStatus}>{active ? 'Activo' : 'Seleccionar'}</span>
        </div>
        <h3 className={styles.selectorName}>{archetype.name}</h3>
        <p className={styles.selectorPhrase} id={`pantheon-card-copy-${archetype.slug}`}>{getPantheonPreviewLine(archetype)}</p>
      </button>
      <div className={styles.selectorCardTop}>
        <div className={styles.selectorPalette} aria-hidden="true">
          {palette.map((color) => <span key={color} style={{ background: color }} />)}
        </div>
        <Link href={getPantheonEntryHref(archetype)} className={styles.selectorLink}>{archetype.ctaLabel}</Link>
      </div>
    </article>
  );
}
