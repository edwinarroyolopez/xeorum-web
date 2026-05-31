import React from 'react';
import type { DropContract } from '@xeorum/contracts';
import { DropCard, EditorialCollectionIntro, SectionHeader } from '../design-system';

export function RecommendationDrops({
  drops,
  kicker = 'Rotacion de drop',
  title = 'Drops activos o proximos que sostienen esta lectura.',
  reason,
}: Readonly<{ drops: DropContract[]; kicker?: string; title?: string; reason?: string }>) {
  if (drops.length === 0) return null;

  return (
    <section className="section-stack">
      <div className="product-rail-header">
        <SectionHeader kicker={kicker} title={title} />
        {reason ? <EditorialCollectionIntro eyebrow="Continuidad" title="Drops que prolongan la misma lectura de presencia." description={reason} /> : null}
      </div>
      <div className="drop-grid">
        {drops.map((drop) => <DropCard key={drop.slug} drop={drop} />)}
      </div>
    </section>
  );
}
