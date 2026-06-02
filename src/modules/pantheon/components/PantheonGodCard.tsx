import React from 'react';
import Link from 'next/link';
import type { PantheonArchetype } from '../pantheon.types';
import styles from '../PantheonExperience.module.css';
import { getPantheonEntryHref, getPantheonPalette, getPantheonPreviewAsset, getPantheonPreviewLine, getPantheonSymbol, isPantheonAvatarVideoAsset } from '../services';

type PantheonGodCardProps = {
  archetype: PantheonArchetype;
  active: boolean;
  onActiveChange: (slug: string) => void;
};

export function PantheonGodCard({ archetype, active, onActiveChange }: Readonly<PantheonGodCardProps>) {
  const palette = getPantheonPalette(archetype);
  const asset = getPantheonPreviewAsset(archetype);
  const useAvatarVideo = isPantheonAvatarVideoAsset(asset);

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
        <div className={styles.selectorCardVisual}>
          <div className={styles.selectorCardAura} aria-hidden="true" />
          {useAvatarVideo && asset?.videoUrl ? (
            <video className={styles.selectorCardImage} aria-label={asset.altText} src={asset.videoUrl} muted playsInline loop autoPlay preload="metadata" poster={asset.imageUrl} />
          ) : asset?.imageUrl ? (
            <img className={styles.selectorCardImage} alt={asset.altText} src={asset.imageUrl} loading="lazy" />
          ) : asset?.videoUrl ? (
            <video className={styles.selectorCardImage} aria-label={asset.altText} src={asset.videoUrl} muted playsInline loop autoPlay preload="metadata" />
          ) : (
            <div className={styles.selectorCardFallback}>
              <span className={styles.selectorSymbol} aria-hidden="true">{getPantheonSymbol(archetype)}</span>
              <strong>{archetype.name}</strong>
            </div>
          )}
          <div className={styles.selectorCardScrim} aria-hidden="true" />
        </div>
        <div className={styles.selectorCardBody}>
          <h3 className={styles.selectorName}>{archetype.name}</h3>
          <p className={styles.selectorPhrase} id={`pantheon-card-copy-${archetype.slug}`}>{getPantheonPreviewLine(archetype)}</p>
        </div>
      </button>
      <div className={styles.selectorCardFooter}>
        <div className={styles.selectorPalette} aria-hidden="true">
          {palette.map((color) => <span key={color} style={{ background: color }} />)}
        </div>
        <Link href={getPantheonEntryHref(archetype)} className={styles.selectorLink}>{archetype.ctaLabel}</Link>
      </div>
    </article>
  );
}
