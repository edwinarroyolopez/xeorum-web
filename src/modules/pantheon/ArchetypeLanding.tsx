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
            <LinkButton href={`/identity/${item.slug}`} variant="ghost">Entrar a {item.name}</LinkButton>
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
          {archetype.slug === 'zeus' ? <Badge tone="accent">Piloto visual activo</Badge> : null}
          <ArchetypeHeroStage archetype={archetype} />
          <div className="portal-actions xeorum-archetype-actions">
            <LinkButton href={archetype.cta.primaryHref}>Ver piezas de esta fuerza</LinkButton>
            <LinkButton href={archetype.cta.secondaryHref} variant="ghost">Descubrir mi fuerza</LinkButton>
            <LinkButton href="/pantheon" variant="ghost">Volver al pantheon</LinkButton>
          </div>
        </Card>

        <div className="section-stack xeorum-archetype-section">
          <SectionHeader kicker="Esencia" title={archetype.identity.title} description="La definicion central, el deseo humano y el manifiesto corto de esta fuerza." />
          <Card className="section-stack xeorum-archetype-panel">
            <p>{archetype.identity.oneLineDefinition}</p>
            <p>{archetype.identity.humanDesire}</p>
            <p>{archetype.identity.emotionalPromise}</p>
            <p className="portal-manifesto">{archetype.narrative.shortManifesto}</p>
            <p>{archetype.narrative.longManifesto}</p>
            <TagList items={archetype.identity.secondaryEnergies} emptyLabel="Todavia no hay energias secundarias publicadas." />
          </Card>
        </div>

        <div className="section-stack xeorum-archetype-section">
          <SectionHeader kicker="Expresion" title="Como se reconoce esta fuerza." description="Rasgos, motivaciones y tension interna traducidos a una lectura util y sobria." />
          <div className="grid-cards">
            <Card className="section-stack xeorum-archetype-panel"><h3>Rasgos dominantes</h3><TagList items={archetype.psychology.dominantTraits} emptyLabel="Todavia no hay rasgos dominantes publicados." /></Card>
            <Card className="section-stack xeorum-archetype-panel"><h3>Senales de comportamiento</h3><TagList items={archetype.psychology.behavioralSignals} emptyLabel="Todavia no hay senales publicadas." /></Card>
            <Card className="section-stack xeorum-archetype-panel"><h3>Motivaciones</h3><TagList items={archetype.psychology.motivations} emptyLabel="Todavia no hay motivaciones publicadas." /></Card>
            <Card className="section-stack xeorum-archetype-panel"><h3>Aspiraciones</h3><TagList items={archetype.psychology.aspirations} emptyLabel="Todavia no hay aspiraciones publicadas." /></Card>
          </div>
        </div>

        <div className="section-stack xeorum-archetype-section">
          <SectionHeader kicker="Maduracion" title="Lo que esta fuerza sostiene bajo presion." />
          <Card className="section-stack xeorum-archetype-panel">
            <p>{archetype.narrative.shadow}</p>
            <p>{archetype.narrative.transformationArc}</p>
            <p>{archetype.narrative.modernInterpretation}</p>
            <p>{archetype.identity.symbolicRole}</p>
            <TagList items={archetype.psychology.fears} emptyLabel="Todavia no hay tensiones publicadas." />
          </Card>
        </div>

        <div className="section-stack xeorum-archetype-section">
          <SectionHeader kicker="Piezas curadas" title={archetype.commerce.productHeading} description={archetype.commerce.productSubheading} />
          <Card className="section-stack xeorum-archetype-panel">
            <p>{archetype.commerce.openMarketAngle}</p>
            <TagList items={archetype.commerce.productCategories} emptyLabel="Todavia no hay categorias publicadas para esta fuerza." />
          </Card>
          {archetype.products.length === 0 ? <EmptyState>Todavia no hay piezas publicadas para esta fuerza.</EmptyState> : <section className="product-grid">{archetype.products.map((product) => <ProductCard key={product.slug} product={product} />)}</section>}
        </div>

        <div className="section-stack xeorum-archetype-section">
          <SectionHeader kicker="Sistema visual" title={archetype.visualSystem.artDirection} description="Paleta, simbolos, texturas y atmósfera aprobada para sostener una identidad coherente." />
          <div className="grid-cards">
            <Card className="section-stack xeorum-archetype-panel">
              <h3>Paleta</h3>
              <div className="portal-card-palette">
                {archetype.visualSystem.palette.map((color) => (
                  <span key={`${color.name}-${color.hex}`} style={{ '--swatch-background': color.hex } as CSSProperties} title={`${color.name} ${color.hex}`} />
                ))}
              </div>
            </Card>
            <Card className="section-stack xeorum-archetype-panel"><h3>Simbolos</h3><TagList items={archetype.visualSystem.symbols} emptyLabel="Todavia no hay simbolos publicados." /></Card>
            <Card className="section-stack xeorum-archetype-panel"><h3>Texturas</h3><TagList items={archetype.visualSystem.textures} emptyLabel="Todavia no hay texturas publicadas." /></Card>
            <Card className="section-stack xeorum-archetype-panel"><h3>Entornos</h3><TagList items={archetype.visualSystem.environments} emptyLabel="Todavia no hay entornos publicados." /></Card>
          </div>
        </div>

        <div className="section-stack xeorum-archetype-section">
          <SectionHeader kicker="Galeria" title="Atmosfera visual aprobada." />
          {archetype.galleryPreview.length === 0 ? (
            <EmptyState>Todavia no hay galeria aprobada para esta fuerza.</EmptyState>
          ) : (
            <section className="portal-gallery-grid">
              {archetype.galleryPreview.map((item) => (
                <Card key={item.id} className="portal-gallery-card xeorum-archetype-panel">
                  {item.imageUrl ? <img src={item.imageUrl} alt={item.altText} className="portal-gallery-image" /> : null}
                  <div className="section-stack">
                    <h2>{item.title}</h2>
                    {!item.imageUrl ? <p className="section-state">La vista editorial sigue disponible mientras se curan imagenes aprobadas.</p> : null}
                    <TagList items={item.tags} emptyLabel="Todavia no hay tags publicos para esta galeria." />
                  </div>
                </Card>
              ))}
            </section>
          )}
        </div>

        <div className="section-stack xeorum-archetype-section">
          <SectionHeader kicker="Drops" title={archetype.commerce.dropHeading} description={archetype.commerce.dropSubheading} />
          <Card className="section-stack xeorum-archetype-panel"><p>{archetype.commerce.dropSubheading}</p></Card>
          {archetype.drops.length === 0 ? <EmptyState>No hay drops publicados alineados a esta fuerza ahora mismo.</EmptyState> : <section className="drop-grid">{archetype.drops.map((drop) => <DropCard key={drop.slug} drop={drop} />)}</section>}
        </div>

        <div className="section-stack xeorum-archetype-section">
          <SectionHeader kicker="Relaciones" title="Explora el pantheon ampliado." />
          {relatedCount === 0 ? (
            <EmptyState>Todavia no hay relaciones publicadas para esta fuerza.</EmptyState>
          ) : (
            <div className="grid-cards">
              <RelationGroup title="Aliados" items={archetype.relationships.allies} />
              <RelationGroup title="Contrastes" items={archetype.relationships.contrasts} />
              <RelationGroup title="Tensiones" items={archetype.relationships.tensions} />
            </div>
          )}
        </div>

        <div className="section-stack xeorum-archetype-section">
          <SectionHeader kicker="Profundizar" title="Descubre tu fuerza." />
          <Card className="section-stack portal-commerce-card xeorum-archetype-panel">
            <p>Haz el test si quieres descubrir que fuerza de XEORUM se siente mas natural para ti antes de seguir refinando producto.</p>
            <div className="portal-actions">
              <LinkButton href="/identity">Descubrir mi fuerza</LinkButton>
              <LinkButton href={archetype.cta.primaryHref} variant="ghost">Ver piezas de esta fuerza</LinkButton>
            </div>
          </Card>
        </div>
      </section>
    </ThemeCssVariables>
  );
}
