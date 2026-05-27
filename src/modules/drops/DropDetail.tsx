'use client';

import Link from 'next/link';
import { useDrop } from './drops.queries';
import { ProductsGrid } from '../products/ProductsGrid';

export function DropDetail({ slug }: Readonly<{ slug: string }>) {
  const query = useDrop(slug);

  if (query.isLoading) return <p className="section-state">Loading drop.</p>;
  if (query.isError || !query.data) return <p className="section-state">Drop unavailable.</p>;

  const drop = query.data;

  return (
    <section className="section-stack">
      <article className="drop-card">
        <p className="portal-card-kicker">{drop.status}</p>
        <h1>{drop.name}</h1>
        <p>{drop.manifesto}</p>
        <p>{drop.visualMood}</p>
        <div className="portal-actions">
          <Link href={`/pantheon/${drop.archetypeSlug}`}>Enter {drop.archetypeSlug} portal</Link>
          <Link href="/drops">Back to drops</Link>
        </div>
      </article>
      <ProductsGrid drop={drop.slug} />
    </section>
  );
}
