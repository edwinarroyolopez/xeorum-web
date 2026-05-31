'use client';

import { DropCard } from './DropCard';
import { ErrorState, LoadingState } from '../design-system';
import { useDrops } from './drops.queries';

export function DropsGrid({ archetype }: Readonly<{ archetype?: string }>) {
  const query = useDrops(archetype ? { archetype } : {});

  if (query.isLoading) return <LoadingState title="Cargando drops" description="Preparando ediciones limitadas y continuidad editorial." />;
  if (query.isError || !query.data) return <ErrorState title="Drops no disponibles" description="La lectura de drops no esta disponible ahora." />;

  return (
    <section className="drop-grid">
      {query.data.map((drop) => (
        <DropCard key={drop.slug} drop={drop} />
      ))}
    </section>
  );
}
