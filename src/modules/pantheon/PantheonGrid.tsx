'use client';

import { PortalCard } from './PortalCard';
import { usePantheonArchetypes } from './pantheon.queries';

export function PantheonGrid() {
  const query = usePantheonArchetypes();

  if (query.isLoading) {
    return <p className="section-state">Loading portals.</p>;
  }

  if (query.isError || !query.data) {
    return <p className="section-state">Portals unavailable.</p>;
  }

  return (
    <section className="portal-grid">
      {query.data.map((archetype) => (
        <PortalCard key={archetype.slug} archetype={archetype} />
      ))}
    </section>
  );
}
