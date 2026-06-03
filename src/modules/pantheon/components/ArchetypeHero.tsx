'use client';

import React from 'react';
import { ActionRow, Card, Kicker, LinkButton, SignalRow } from '../../design-system';
import { useAppTheme } from '../../theme/providers/AppThemeProvider';
import { resolveArchetypeHeroEffect } from '../archetype-hero-effects';
import styles from '../ArchetypeLanding.module.css';
import type { PantheonArchetypeLanding } from '../pantheon.types';
import type { ArchetypeLandingViewModel } from '../services';

export function ArchetypeHero({
  archetype,
  viewModel,
}: Readonly<{
  archetype: PantheonArchetypeLanding;
  viewModel: ArchetypeLandingViewModel;
}>) {
  const { accessibility } = useAppTheme();
  const reducedMotion = Boolean(accessibility.reduceMotion);
  const heroEffect = resolveArchetypeHeroEffect(archetype.theme);

  return (
    <Card className={styles.hero}>
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <Kicker>{archetype.identity.coreEnergy}</Kicker>
          <h1 className={styles.heroName}>{archetype.name}</h1>
          <p className={styles.heroPhrase}>{archetype.narrative.corePhrase}</p>
          <p className={styles.heroDefinition}>{archetype.identity.oneLineDefinition}</p>
          {viewModel.heroSignals.length ? <SignalRow ariaLabel={`Senales de ${archetype.name}`} items={viewModel.heroSignals} /> : null}
          <ActionRow className={styles.heroActions}>
            <LinkButton href={viewModel.primaryCta.href}>{viewModel.primaryCta.label}</LinkButton>
            <LinkButton href={viewModel.secondaryCta.href} variant="ghost">{viewModel.secondaryCta.label}</LinkButton>
          </ActionRow>
        </div>
        <div className={styles.heroMediaWrap}>
          <section className={styles.heroMediaFrame} data-effect-profile={heroEffect.key} data-hero-media-source={viewModel.heroMedia?.source ?? 'fallback'}>
            {viewModel.heroMedia?.videoUrl ? (
              <video aria-label={viewModel.heroMedia.altText} className={styles.heroMedia} autoPlay={!reducedMotion} controls={reducedMotion} loop={!reducedMotion} muted playsInline preload={reducedMotion ? 'metadata' : 'none'} poster={viewModel.heroMedia.imageUrl} src={viewModel.heroMedia.videoUrl} />
            ) : viewModel.heroMedia?.imageUrl ? (
              <img alt={viewModel.heroMedia.altText} className={styles.heroMedia} src={viewModel.heroMedia.imageUrl} />
            ) : (
              <div className={styles.heroFallback}>
                <Kicker>{archetype.identity.symbolicRole}</Kicker>
                <strong>{archetype.visualSystem.artDirection}</strong>
                <p className={styles.summaryBody}>{archetype.visualSystem.mood}</p>
              </div>
            )}
          </section>
          {viewModel.heroMedia?.title && viewModel.heroMedia.title !== archetype.name ? <p className={styles.heroCaption}>{viewModel.heroMedia.title}</p> : null}
        </div>
      </div>
      <ActionRow className={styles.heroActions}>
        <LinkButton href={viewModel.primaryCta.href}>{viewModel.primaryCta.label}</LinkButton>
        <LinkButton href={viewModel.secondaryCta.href} variant="ghost">{viewModel.secondaryCta.label}</LinkButton>
        <LinkButton href="/pantheon" variant="ghost">Volver al pantheon</LinkButton>
      </ActionRow>
    </Card>
  );
}
