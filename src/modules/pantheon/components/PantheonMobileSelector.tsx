import React from 'react';
import Link from 'next/link';
import type { PantheonArchetype } from '../pantheon.types';
import styles from '../PantheonExperience.module.css';
import { getPantheonEntryHref, getPantheonPalette, getPantheonPreviewLine, getPantheonSymbol } from '../services';

type PantheonMobileSelectorProps = {
  archetypes: PantheonArchetype[];
  activeSlug: string;
  onActiveChange: (slug: string) => void;
};

export function PantheonMobileSelector({ archetypes, activeSlug, onActiveChange }: Readonly<PantheonMobileSelectorProps>) {
  return (
    <section className={styles.mobileSelector} aria-labelledby="pantheon-mobile-selector-heading">
      <p className={styles.selectorHint} id="pantheon-mobile-selector-heading">Toca un dios para actualizar el preview. Entra al portal cuando ya sepas cual es.</p>
      <div className={styles.mobileScroll}>
        {archetypes.map((archetype) => {
          const palette = getPantheonPalette(archetype);
          const active = archetype.slug === activeSlug;

          return (
            <article
              key={archetype.slug}
              className={styles.mobileCard}
              data-active={active}
              style={{ '--pantheon-tone-start': palette[0], '--pantheon-tone-mid': palette[1], '--pantheon-tone-end': palette[2] } as React.CSSProperties}
            >
              <button
                type="button"
                className={styles.mobileButton}
                aria-pressed={active}
                onFocus={() => onActiveChange(archetype.slug)}
                onClick={() => onActiveChange(archetype.slug)}
              >
                <div className={styles.mobileCardTop}>
                  <span className={styles.mobileSymbol} aria-hidden="true">{getPantheonSymbol(archetype)}</span>
                  <span className={styles.selectorStatus}>{active ? 'Activo' : 'Tocar'}</span>
                </div>
                <h3 className={styles.mobileName}>{archetype.name}</h3>
                <p className={styles.mobilePhrase}>{getPantheonPreviewLine(archetype)}</p>
              </button>
              <div className={styles.mobileActions}>
                <Link href={getPantheonEntryHref(archetype)} className={styles.selectorLink}>{archetype.ctaLabel}</Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
