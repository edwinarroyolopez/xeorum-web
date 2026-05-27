'use client';

import { DropCard } from './DropCard';
import { useDrops } from './drops.queries';

export function DropsGrid({ archetype }: Readonly<{ archetype?: string }>) {
  const query = useDrops(archetype ? { archetype } : {});

  if (query.isLoading) return <p className="section-state">Loading drops.</p>;
  if (query.isError || !query.data) return <p className="section-state">Drops unavailable.</p>;

  return (
    <section className="drop-grid">
      {query.data.map((drop) => (
        <DropCard key={drop.slug} drop={drop} />
      ))}
    </section>
  );
}
