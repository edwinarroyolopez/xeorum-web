'use client';

import type { CSSProperties } from 'react';
import React from 'react';
import { usePantheonArchetype } from './pantheon.queries';
import { ThemeCssVariables } from '../theme/providers/ThemeCssVariables';
import { ProductsGrid } from '../products/ProductsGrid';
import { DropsGrid } from '../drops/DropsGrid';
import { resolvePageTheme, resolveZeusPilotOverlay } from '../theme';
import { Badge, Card, EmptyState, ErrorState, LinkButton, LoadingState, SectionHeader } from '../design-system';

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

export function PantheonDetail({ slug }: Readonly<{ slug: string }>) {
  const query = usePantheonArchetype(slug);

  if (query.isLoading) {
    return <LoadingState>Loading portal.</LoadingState>;
  }

  if (query.isError || !query.data) {
    return <ErrorState>Portal unavailable.</ErrorState>;
  }

  const overlay = resolveZeusPilotOverlay(query.data.slug, 'pantheon');
  const zeusPilotActive = query.data.slug === 'zeus' && Boolean(overlay);
  const theme = resolvePageTheme({
    archetypeSlug: query.data.slug,
    context: 'pantheon',
    intensity: 'subtle',
    overlayStrategy: 'zeus-pilot',
  });

  return (
    <ThemeCssVariables theme={theme}>
      <section className="section-stack pantheon-pilot-shell" data-zeus-pilot={zeusPilotActive}>
        <Card className="portal-detail pantheon-pilot-detail">
          <p className="portal-card-kicker">{query.data.coreEnergy}</p>
          <h1>{query.data.name}</h1>
          <p className="portal-core-phrase">{query.data.corePhrase}</p>
          <p className="portal-manifesto">{query.data.shortManifesto}</p>
          <p>{query.data.visualMood}</p>
          {zeusPilotActive ? <Badge tone="accent">Zeus pilot active</Badge> : null}
          <div className="portal-card-palette">
            {query.data.palette.map((color) => (
              <span key={color} style={{ '--swatch-background': color } as CSSProperties} />
            ))}
          </div>
          <TagList items={query.data.symbols} emptyLabel="No public symbols were published yet." />
          <Card className="portal-commerce-card">
            <p className="portal-card-kicker">Open Market</p>
            <p>{query.data.commerce.openMarketAngle}</p>
            <TagList items={query.data.commerce.productCategories} emptyLabel="No public product categories were published yet." />
            <TagList items={query.data.commerce.marketTags} emptyLabel="No public market tags were published yet." />
          </Card>
          <div className="portal-actions">
            <LinkButton href={`/products?archetype=${query.data.slug}`}>{query.data.ctaLabel}</LinkButton>
            <LinkButton href="/products" variant="ghost">Shop Open Market</LinkButton>
            <LinkButton href="/identity" variant="ghost">Run Identity Test</LinkButton>
            <LinkButton href="/pantheon" variant="ghost">Back to Pantheon</LinkButton>
          </div>
        </Card>
        <div className="section-stack">
          <SectionHeader kicker="Gallery Preview" title="Approved visual atmosphere." />
          {query.data.galleryPreview.length === 0 ? (
            <EmptyState>No approved gallery preview is available for this portal yet.</EmptyState>
          ) : (
            <section className="portal-gallery-grid">
              {query.data.galleryPreview.map((item) => (
                <Card key={`${item.title}-${item.altText}`} className="portal-gallery-card">
                  {item.imageUrl ? <img src={item.imageUrl} alt={item.altText} className="portal-gallery-image" /> : null}
                  <div className="section-stack">
                    <h2>{item.title}</h2>
                    {!item.imageUrl ? <p className="section-state">Image pending. Editorial preview remains available.</p> : null}
                    <TagList items={item.tags} emptyLabel="No public gallery tags were published yet." />
                  </div>
                </Card>
              ))}
            </section>
          )}
        </div>
        <div className="section-stack">
          <SectionHeader kicker="Curated Products" title="Objects that express this force." />
          <ProductsGrid archetype={query.data.slug} />
        </div>
        <div className="section-stack">
          <SectionHeader kicker="Related Drops" title="Limited narratives aligned to this portal." />
          <DropsGrid archetype={query.data.slug} />
        </div>
      </section>
    </ThemeCssVariables>
  );
}
