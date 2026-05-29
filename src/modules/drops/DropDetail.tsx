'use client';

import { useDrop } from './drops.queries';
import { ProductsGrid } from '../products/ProductsGrid';
import { Card, ErrorState, LinkButton, LoadingState } from '../design-system';

export function DropDetail({ slug }: Readonly<{ slug: string }>) {
  const query = useDrop(slug);

  if (query.isLoading) return <LoadingState>Cargando drop.</LoadingState>;
  if (query.isError || !query.data) return <ErrorState>Drop no disponible.</ErrorState>;

  const drop = query.data;

  return (
    <section className="section-stack xeorum-drop-detail-shell">
      <Card className="drop-card xeorum-drop-detail-card">
        <div className="xeorum-drop-copy">
          <p className="portal-card-kicker">{drop.status}</p>
          <h1>{drop.name}</h1>
          <p className="portal-core-phrase">{drop.archetypeSlug}</p>
          <p>{drop.manifesto}</p>
          <p>{drop.visualMood}</p>
        </div>
        <div className="xeorum-drop-actions">
          <LinkButton href={`/pantheon/${drop.archetypeSlug}`}>Entrar al portal de {drop.archetypeSlug}</LinkButton>
          <LinkButton href="/drops" variant="ghost">Volver a drops</LinkButton>
        </div>
      </Card>
      <ProductsGrid drop={drop.slug} />
    </section>
  );
}
