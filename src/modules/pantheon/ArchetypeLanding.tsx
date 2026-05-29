'use client';

import type { CSSProperties } from 'react';
import React from 'react';
import { Badge, Card, DropCard, EmptyState, LinkButton, ProductCard, SectionHeader } from '../design-system';
import { ThemeCssVariables } from '../theme/providers/ThemeCssVariables';
import { resolvePageTheme } from '../theme';
import { resolveArchetypeHeroEffect } from './archetype-hero-effects';
import type { PantheonArchetypeLanding } from './pantheon.types';

function TagList({ items, emptyLabel }: Readonly<{ items: string[]; emptyLabel: string }>) {
  if (items.length === 0) {
    return <p className="section-state">{emptyLabel}</p>;
  }

  return (
    <div className="portal-tag-list" aria-label={emptyLabel}>
      {items.map((item) => (
        <span key={item} className="portal-tag">{item}</span>
      ))}
    </div>
  );
}

function RelationGroup({ title, items }: Readonly<{ title: string; items: PantheonArchetypeLanding['relationships']['allies'] }>) {
  if (items.length === 0) {
    return null;
  }

  return (
    <Card className="section-stack xeorum-archetype-panel">
      <h3>{title}</h3>
      {items.map((item) => (
        <div key={`${title}-${item.slug}`} className="section-stack xeorum-archetype-relation">
          <strong>{item.name}</strong>
          <p>{item.reason}</p>
          <LinkButton href={`/identity/${item.slug}`} variant="ghost">Explore {item.name}</LinkButton>
        </div>
      ))}
    </Card>
  );
}

function ArchetypeHeroStage({ archetype }: Readonly<{ archetype: PantheonArchetypeLanding }>) {
  const portrait = archetype.galleryPreview.find((item) => item.imageUrl);
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
        {portrait?.imageUrl ? (
          <img alt={portrait.altText} className="archetype-hero-portrait" src={portrait.imageUrl} />
        ) : (
          <div className="archetype-hero-fallback">
            <p className="portal-card-kicker">{archetype.identity.coreEnergy}</p>
            <strong>{archetype.identity.oneLineDefinition}</strong>
            <p>{archetype.visualSystem.artDirection}</p>
          </div>
        )}
      </div>
      <div className="archetype-hero-floating archetype-hero-profile-chip">
        <strong>{archetype.name} is active</strong>
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

export function ArchetypeLanding({ archetype }: Readonly<{ archetype: PantheonArchetypeLanding }>) {
  const theme = resolvePageTheme({
    archetypeSlug: archetype.theme.overlaySlug ?? archetype.slug,
    context: 'pantheon',
    intensity: archetype.theme.intensityDefault,
    overlayStrategy: archetype.theme.overlaySlug ? 'published' : 'zeus-pilot',
  });
  const relatedCount = archetype.relationships.allies.length + archetype.relationships.contrasts.length + archetype.relationships.tensions.length;
  const zeusPilotActive = archetype.slug === 'zeus' && !archetype.theme.overlaySlug;

  return (
    <ThemeCssVariables theme={theme}>
      <section className="section-stack pantheon-pilot-shell xeorum-archetype-shell" data-zeus-pilot={zeusPilotActive}>
        <Card className="portal-detail pantheon-pilot-detail xeorum-archetype-intro">
          <div className="xeorum-archetype-copy">
            <p className="portal-card-kicker">{archetype.identity.coreEnergy}</p>
            <h1>{archetype.name}</h1>
            <p className="portal-core-phrase">{archetype.narrative.corePhrase}</p>
            <p>{archetype.identity.oneLineDefinition}</p>
            <p>{archetype.visualSystem.mood}</p>
          </div>
          {archetype.slug === 'zeus' ? <Badge tone="accent">Zeus pilot active</Badge> : null}
          <ArchetypeHeroStage archetype={archetype} />
          <div className="portal-actions xeorum-archetype-actions">
            <LinkButton href={archetype.cta.primaryHref}>{archetype.cta.primaryLabel}</LinkButton>
            <LinkButton href={archetype.cta.secondaryHref} variant="ghost">{archetype.cta.secondaryLabel}</LinkButton>
            <LinkButton href="/pantheon" variant="ghost">Back to Pantheon</LinkButton>
          </div>
        </Card>

        <div className="section-stack xeorum-archetype-section">
          <SectionHeader kicker="Core Identity Statement" title={archetype.identity.title} />
          <Card className="section-stack xeorum-archetype-panel">
            <p>{archetype.identity.oneLineDefinition}</p>
            <p>{archetype.identity.humanDesire}</p>
            <p>{archetype.identity.emotionalPromise}</p>
            <TagList items={archetype.identity.secondaryEnergies} emptyLabel="No secondary energies were published yet." />
          </Card>
        </div>

        <div className="section-stack xeorum-archetype-section">
          <SectionHeader kicker="Manifesto" title={archetype.narrative.shortManifesto} />
          <Card className="section-stack xeorum-archetype-panel">
            <p className="portal-manifesto">{archetype.narrative.shortManifesto}</p>
            <p>{archetype.narrative.longManifesto}</p>
          </Card>
        </div>

        <div className="section-stack xeorum-archetype-section">
          <SectionHeader kicker="Traits" title="Signals of this force." />
          <div className="grid-cards">
            <Card className="section-stack xeorum-archetype-panel"><h3>Dominant traits</h3><TagList items={archetype.psychology.dominantTraits} emptyLabel="No dominant traits were published yet." /></Card>
            <Card className="section-stack xeorum-archetype-panel"><h3>Behavioral signals</h3><TagList items={archetype.psychology.behavioralSignals} emptyLabel="No behavioral signals were published yet." /></Card>
            <Card className="section-stack xeorum-archetype-panel"><h3>Motivations</h3><TagList items={archetype.psychology.motivations} emptyLabel="No motivations were published yet." /></Card>
            <Card className="section-stack xeorum-archetype-panel"><h3>Aspirations</h3><TagList items={archetype.psychology.aspirations} emptyLabel="No aspirations were published yet." /></Card>
          </div>
        </div>

        <div className="section-stack xeorum-archetype-section">
          <SectionHeader kicker="Shadow" title="The force under pressure." />
          <Card className="section-stack xeorum-archetype-panel">
            <p>{archetype.narrative.shadow}</p>
            <TagList items={archetype.psychology.fears} emptyLabel="No public fears were published yet." />
          </Card>
        </div>

        <div className="section-stack xeorum-archetype-section">
          <SectionHeader kicker="Transformation" title="How the force matures." />
          <Card className="section-stack xeorum-archetype-panel">
            <p>{archetype.narrative.transformationArc}</p>
            <p>{archetype.narrative.modernInterpretation}</p>
            <p>{archetype.identity.symbolicRole}</p>
          </Card>
        </div>

        <div className="section-stack xeorum-archetype-section">
          <SectionHeader kicker="Visual Mood" title={archetype.visualSystem.artDirection} />
          <div className="grid-cards">
            <Card className="section-stack xeorum-archetype-panel">
              <h3>Palette</h3>
              <div className="portal-card-palette">
                {archetype.visualSystem.palette.map((color) => (
                  <span key={`${color.name}-${color.hex}`} style={{ '--swatch-background': color.hex } as CSSProperties} title={`${color.name} ${color.hex}`} />
                ))}
              </div>
            </Card>
            <Card className="section-stack xeorum-archetype-panel"><h3>Symbols</h3><TagList items={archetype.visualSystem.symbols} emptyLabel="No symbols were published yet." /></Card>
            <Card className="section-stack xeorum-archetype-panel"><h3>Textures</h3><TagList items={archetype.visualSystem.textures} emptyLabel="No textures were published yet." /></Card>
            <Card className="section-stack xeorum-archetype-panel"><h3>Environments</h3><TagList items={archetype.visualSystem.environments} emptyLabel="No environments were published yet." /></Card>
          </div>
        </div>

        <div className="section-stack xeorum-archetype-section">
          <SectionHeader kicker="Gallery" title="Approved visual atmosphere." />
          {archetype.galleryPreview.length === 0 ? (
            <EmptyState>No approved gallery preview is available for this archetype yet.</EmptyState>
          ) : (
            <section className="portal-gallery-grid">
              {archetype.galleryPreview.map((item) => (
                <Card key={item.id} className="portal-gallery-card xeorum-archetype-panel">
                  {item.imageUrl ? <img src={item.imageUrl} alt={item.altText} className="portal-gallery-image" /> : null}
                  <div className="section-stack">
                    <h2>{item.title}</h2>
                    {!item.imageUrl ? <p className="section-state">Editorial fallback remains available while approved imagery is curated.</p> : null}
                    <TagList items={item.tags} emptyLabel="No public gallery tags were published yet." />
                  </div>
                </Card>
              ))}
            </section>
          )}
        </div>

        <div className="section-stack xeorum-archetype-section">
          <SectionHeader kicker="Products" title={archetype.commerce.productHeading} />
          <Card className="section-stack xeorum-archetype-panel">
            <p>{archetype.commerce.productSubheading}</p>
            <p>{archetype.commerce.openMarketAngle}</p>
            <TagList items={archetype.commerce.productCategories} emptyLabel="No public product categories were published yet." />
          </Card>
          {archetype.products.length === 0 ? <EmptyState>No published products express this force yet.</EmptyState> : <section className="product-grid">{archetype.products.map((product) => <ProductCard key={product.slug} product={product} />)}</section>}
        </div>

        <div className="section-stack xeorum-archetype-section">
          <SectionHeader kicker="Drops" title={archetype.commerce.dropHeading} />
          <Card className="section-stack xeorum-archetype-panel"><p>{archetype.commerce.dropSubheading}</p></Card>
          {archetype.drops.length === 0 ? <EmptyState>No published drops are aligned to this force right now.</EmptyState> : <section className="drop-grid">{archetype.drops.map((drop) => <DropCard key={drop.slug} drop={drop} />)}</section>}
        </div>

        <div className="section-stack xeorum-archetype-section">
          <SectionHeader kicker="Related archetypes" title="Explore the wider pantheon." />
          {relatedCount === 0 ? (
            <EmptyState>No public related archetypes were published yet.</EmptyState>
          ) : (
            <div className="grid-cards">
              <RelationGroup title="Allies" items={archetype.relationships.allies} />
              <RelationGroup title="Contrasts" items={archetype.relationships.contrasts} />
              <RelationGroup title="Tensions" items={archetype.relationships.tensions} />
            </div>
          )}
        </div>

        <div className="section-stack xeorum-archetype-section">
          <SectionHeader kicker="Identity Test CTA" title="Discover your force." />
          <Card className="section-stack portal-commerce-card xeorum-archetype-panel">
            <p>Use the identity test to discover which XEORUM force feels most native to you.</p>
            <div className="portal-actions">
              <LinkButton href="/identity">Run Identity Test</LinkButton>
              <LinkButton href={archetype.cta.primaryHref} variant="ghost">Shop this force</LinkButton>
            </div>
          </Card>
        </div>
      </section>
    </ThemeCssVariables>
  );
}
