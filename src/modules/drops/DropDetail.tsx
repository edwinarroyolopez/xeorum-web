'use client';

import React from 'react';
import { useDrop } from './drops.queries';
import { ProductsGrid } from '../products/components/ProductsGrid';
import { Card, EditorialBody, EditorialCollectionIntro, ErrorState, LinkButton, LoadingState, ProductTitleBlock } from '../design-system';

export function DropDetail({ slug }: Readonly<{ slug: string }>) {
  const query = useDrop(slug);

  if (query.isLoading) return <LoadingState>Cargando drop.</LoadingState>;
  if (query.isError || !query.data) return <ErrorState>Drop no disponible.</ErrorState>;

  const drop = query.data;

  return (
    <section className="section-stack xeorum-drop-detail-shell">
      <Card className="drop-card xeorum-drop-detail-card">
        <div className="xeorum-drop-copy">
          <ProductTitleBlock eyebrow={drop.status} title={drop.name} subtitle={drop.archetypeSlug} align="start" />
          <p className="portal-core-phrase">{drop.archetypeSlug}</p>
          <EditorialBody>{drop.manifesto}</EditorialBody>
          <EditorialBody>{drop.visualMood}</EditorialBody>
        </div>
        <div className="xeorum-drop-actions">
          <LinkButton href={`/identity/${drop.archetypeSlug}`}>Entrar al portal de {drop.archetypeSlug}</LinkButton>
          <LinkButton href="/drops" variant="ghost">Volver a drops</LinkButton>
        </div>
      </Card>
      <EditorialCollectionIntro eyebrow="Producto visible" title="El drop abre una lectura, pero la pieza sigue siendo la entrada principal." description="La narrativa del drop acompana la seleccion sin competir con el producto curado debajo." />
      <ProductsGrid drop={drop.slug} />
    </section>
  );
}
