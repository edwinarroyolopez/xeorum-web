import React from 'react';
import Link from 'next/link';
import { Badge, Kicker, LinkButton } from '../../design-system';
import type { PantheonArchetype } from '../pantheon.types';
import styles from '../PantheonExperience.module.css';
import { getPantheonMirrorHref, getPantheonPalette, getPantheonPreviewAsset, getPantheonPreviewLine, getPantheonSymbol, getPantheonTags, isPantheonAvatarVideoAsset } from '../services';

export function PantheonGodPreview({ archetype, reducedMotion }: Readonly<{ archetype: PantheonArchetype; reducedMotion: boolean }>) {
  const asset = getPantheonPreviewAsset(archetype);
  const palette = getPantheonPalette(archetype);
  const tags = getPantheonTags(archetype);
  const useAvatarVideo = isPantheonAvatarVideoAsset(asset);
  const portalHref = getPantheonMirrorHref(archetype);

  return (
    <section className={styles.preview} aria-labelledby={`pantheon-preview-${archetype.slug}`}>
      <div className={styles.previewVisual}>
        {useAvatarVideo && asset?.videoUrl ? (
          <div className={styles.previewVisualFrame}>
            <video aria-label={asset.altText} src={asset.videoUrl} autoPlay={!reducedMotion} muted loop={!reducedMotion} playsInline controls={reducedMotion} poster={asset.imageUrl} />
          </div>
        ) : asset?.imageUrl ? (
          <div className={styles.previewVisualFrame}>
            <img alt={asset.altText} src={asset.imageUrl} loading="eager" />
          </div>
        ) : asset?.videoUrl ? (
          <div className={styles.previewVisualFrame}>
            <video aria-label={asset.altText} src={asset.videoUrl} autoPlay={!reducedMotion} muted loop={!reducedMotion} playsInline controls={reducedMotion} />
          </div>
        ) : (
          <div className={styles.previewFallback}>
            <div className={styles.previewFallbackInner}>
              <span className={styles.previewSymbol} aria-hidden="true">{getPantheonSymbol(archetype)}</span>
              <strong>{archetype.name}</strong>
              <p className={styles.previewFallbackMood}>{archetype.visualMood}</p>
            </div>
          </div>
        )}
        <div className={styles.previewOverlay} />
      </div>
      <div className={styles.previewBody}>
        <div className={styles.previewMetaRow}>
          <Kicker>{archetype.coreEnergy}</Kicker>
          <div className={styles.previewPalette} aria-hidden="true">
            {palette.map((color) => <span key={color} style={{ background: color }} />)}
          </div>
        </div>
        <h2 className={styles.previewHeading} id={`pantheon-preview-${archetype.slug}`}>{archetype.name}</h2>
        <p className={styles.previewPhrase}>{getPantheonPreviewLine(archetype)}</p>
        <p className={styles.previewManifesto}>{archetype.shortManifesto}</p>
        {tags.length > 0 ? (
          <div className={styles.previewActions} aria-label="Etiquetas del portal activo">
            {tags.map((tag) => <Badge key={tag} size="sm">{tag}</Badge>)}
          </div>
        ) : null}
        <p className={styles.previewAngle}>{archetype.commerce.openMarketAngle}</p>
        <div className={styles.previewActions}>
          <LinkButton href={portalHref}>{archetype.ctaLabel}</LinkButton>
          <LinkButton href="/identity" variant="ghost">Necesito una lectura</LinkButton>
          <LinkButton href="/products" variant="ghost">Explorar piezas</LinkButton>
        </div>
        <p className={styles.previewMeta}>
          Entrada espejo: <Link className={styles.previewMirrorLink} href={portalHref}>{portalHref}</Link>
        </p>
      </div>
    </section>
  );
}
