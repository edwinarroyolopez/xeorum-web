'use client';

import { useDrop } from './drops.queries';
import { ProductsGrid } from '../products/ProductsGrid';
import { Card, ErrorState, LinkButton, LoadingState } from '../design-system';

export function DropDetail({ slug }: Readonly<{ slug: string }>) {
  const query = useDrop(slug);

  if (query.isLoading) return <LoadingState>Loading drop.</LoadingState>;
  if (query.isError || !query.data) return <ErrorState>Drop unavailable.</ErrorState>;

  const drop = query.data;

  return (
    <section className="section-stack">
      <Card className="drop-card">
        <p className="portal-card-kicker">{drop.status}</p>
        <h1>{drop.name}</h1>
        <p>{drop.manifesto}</p>
        <p>{drop.visualMood}</p>
        <div className="portal-actions">
          <LinkButton href={`/pantheon/${drop.archetypeSlug}`}>Enter {drop.archetypeSlug} portal</LinkButton>
          <LinkButton href="/drops" variant="ghost">Back to drops</LinkButton>
        </div>
      </Card>
      <ProductsGrid drop={drop.slug} />
    </section>
  );
}
