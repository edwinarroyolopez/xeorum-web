import React from 'react';
import Link from 'next/link';
import type { PantheonArchetype } from '../pantheon.types';
import styles from '../PantheonExperience.module.css';
import { getPantheonMirrorHref, getPantheonPalette, getPantheonPreviewAsset, getPantheonPreviewLine, getPantheonSymbol, isPantheonAvatarVideoAsset } from '../services';

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
          const asset = getPantheonPreviewAsset(archetype);
          const active = archetype.slug === activeSlug;
          const useAvatarVideo = isPantheonAvatarVideoAsset(asset);
          const portalHref = getPantheonMirrorHref(archetype);

          return (
            <article
              key={archetype.slug}
              className={styles.mobileCard}
              data-active={active}
              style={{ '--pantheon-tone-start': palette[0], '--pantheon-tone-mid': palette[1], '--pantheon-tone-end': palette[2] } as React.CSSProperties}
            >
              <Link
                href={portalHref}
                className={styles.mobileButton}
                onFocus={() => onActiveChange(archetype.slug)}
                onClick={() => onActiveChange(archetype.slug)}
              >
                <div className={styles.mobileCardVisual}>
                  <div className={styles.selectorCardAura} aria-hidden="true" />
                  {useAvatarVideo && asset?.videoUrl ? (
                    <video className={styles.selectorCardImage} aria-label={asset.altText} src={asset.videoUrl} muted playsInline loop autoPlay preload="metadata" poster={asset.imageUrl} />
                  ) : asset?.imageUrl ? (
                    <img className={styles.selectorCardImage} alt={asset.altText} src={asset.imageUrl} loading="lazy" />
                  ) : asset?.videoUrl ? (
                    <video className={styles.selectorCardImage} aria-label={asset.altText} src={asset.videoUrl} muted playsInline loop autoPlay preload="metadata" />
                  ) : (
                    <div className={styles.selectorCardFallback}>
                      <span className={styles.mobileSymbol} aria-hidden="true">{getPantheonSymbol(archetype)}</span>
                      <strong>{archetype.name}</strong>
                    </div>
                  )}
                  <div className={styles.selectorCardScrim} aria-hidden="true" />
                </div>
                <div className={styles.selectorCardBody}>
                  <h3 className={styles.mobileName}>{archetype.name}</h3>
                  <p className={styles.mobilePhrase}>{getPantheonPreviewLine(archetype)}</p>
                </div>
              </Link>
              <div className={styles.mobileActions}>
                <div className={styles.selectorPalette} aria-hidden="true">
                  {palette.map((color) => <span key={color} style={{ background: color }} />)}
                </div>
                <Link href={portalHref} className={styles.selectorLink}>{archetype.ctaLabel}</Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
