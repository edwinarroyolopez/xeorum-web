'use client';

import type { CSSProperties } from 'react';
import React from 'react';
import { ActionRow, Badge, Card, EditorialBody, IdentityInsightPanel, Kicker, LinkButton, ProductTitleBlock, SignalRow } from '../../design-system';
import { resolveArchetypeHeroEffect } from '../archetype-hero-effects';
import type { PantheonArchetypeLanding } from '../pantheon.types';
import type { ArchetypeLandingViewModel } from '../services';

function ArchetypeHeroStage({ archetype, portrait }: Readonly<{ archetype: PantheonArchetypeLanding; portrait: PantheonArchetypeLanding['galleryPreview'][number] | undefined }>) {
  const heroEffect = resolveArchetypeHeroEffect(archetype.theme);
  const signalValue = Math.min(96, 68 + archetype.psychology.dominantTraits.length * 6);
  const style = {
    '--archetype-hero-aura': heroEffect.auraColor,
    '--archetype-hero-float-distance': `${heroEffect.floatDistance}px`,
    '--archetype-hero-portrait-tilt': `${heroEffect.portraitTilt}deg`,
    '--archetype-hero-profile-lift': `${heroEffect.profileLift}px`,
    '--archetype-hero-signal-lift': `${heroEffect.signalLift}px`,
  } as CSSProperties;

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty('--archetype-hero-pointer-x', x.toFixed(4));
    event.currentTarget.style.setProperty('--archetype-hero-pointer-y', y.toFixed(4));
    event.currentTarget.style.setProperty('--archetype-hero-glow-x', `${((event.clientX - rect.left) / rect.width) * 100}%`);
    event.currentTarget.style.setProperty('--archetype-hero-glow-y', `${((event.clientY - rect.top) / rect.height) * 100}%`);
  };

  const handlePointerLeave = (event: React.PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty('--archetype-hero-pointer-x', '0');
    event.currentTarget.style.setProperty('--archetype-hero-pointer-y', '0');
    event.currentTarget.style.setProperty('--archetype-hero-glow-x', '50%');
    event.currentTarget.style.setProperty('--archetype-hero-glow-y', '50%');
  };

  return (
    <section
      className="archetype-hero-stage"
      data-effect-profile={heroEffect.key}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      style={style}
    >
      <div className="archetype-hero-orb" />
      <div className="archetype-hero-glow" />
      <div className="archetype-hero-portrait-card">
        {portrait?.videoUrl ? (
          <video aria-label={portrait.altText} className="archetype-hero-portrait" controls preload="metadata" src={portrait.videoUrl} />
        ) : portrait?.imageUrl ? (
          <img alt={portrait.altText} className="archetype-hero-portrait" src={portrait.imageUrl} />
        ) : (
          <div className="archetype-hero-fallback">
            <Kicker>{archetype.identity.coreEnergy}</Kicker>
            <strong>{archetype.identity.oneLineDefinition}</strong>
            <p>{archetype.visualSystem.artDirection}</p>
          </div>
        )}
      </div>
      <div className="archetype-hero-floating archetype-hero-profile-chip">
        <strong>{archetype.name} activa esta lectura</strong>
        <span>{archetype.narrative.modernInterpretation}</span>
        <span>{archetype.psychology.dominantTraits.slice(0, 2).join(' · ')}</span>
      </div>
      <div className="archetype-hero-floating archetype-hero-signal-card">
        <small>{heroEffect.label}</small>
        <b>{signalValue}%</b>
        <div className="archetype-hero-bars" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>
    </section>
  );
}

export function ArchetypeHero({
  archetype,
  viewModel,
}: Readonly<{
  archetype: PantheonArchetypeLanding;
  viewModel: ArchetypeLandingViewModel;
}>) {
  const portrait = viewModel.gallery.find((item) => item.videoUrl || item.imageUrl);

  return (
    <Card className="portal-detail pantheon-pilot-detail xeorum-archetype-intro">
      <div className="xeorum-archetype-copy">
        <ProductTitleBlock eyebrow={archetype.identity.coreEnergy} title={archetype.name} subtitle={archetype.identity.oneLineDefinition} />
        <p className="portal-core-phrase">{archetype.narrative.corePhrase}</p>
        <EditorialBody>{archetype.visualSystem.mood}</EditorialBody>
        {viewModel.heroSignals.length ? <SignalRow ariaLabel={`Senales del portal ${archetype.name}`} items={viewModel.heroSignals} /> : null}
      </div>
      {viewModel.zeusPilotActive ? <Badge tone="accent">Piloto visual activo</Badge> : null}
      <div className="xeorum-archetype-overview-grid">
        <IdentityInsightPanel eyebrow="Deseo humano" title={archetype.identity.humanDesire} description="La tension central que esta fuerza viene a ordenar." signals={[archetype.identity.symbolicRole]} />
        <IdentityInsightPanel eyebrow="Promesa emocional" title={archetype.identity.emotionalPromise} description="La presencia que esta lectura vuelve publica y legible." signals={[archetype.identity.coreEnergy]} />
        <IdentityInsightPanel eyebrow="Rol simbolico" title={archetype.identity.symbolicRole} description="La traduccion formal que sostiene el tono del portal." signals={[archetype.visualSystem.artDirection]} />
      </div>
      <ArchetypeHeroStage archetype={archetype} portrait={portrait} />
      <ActionRow className="portal-actions xeorum-archetype-actions">
        <LinkButton href={viewModel.primaryCta.href}>{viewModel.primaryCta.label}</LinkButton>
        <LinkButton href={viewModel.secondaryCta.href} variant="ghost">{viewModel.secondaryCta.label}</LinkButton>
        <LinkButton href="/pantheon" variant="ghost">Volver al pantheon</LinkButton>
      </ActionRow>
    </Card>
  );
}
