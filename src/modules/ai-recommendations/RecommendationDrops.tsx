import type { DropContract } from '@xeorum/contracts';
import { DropCard, SectionHeader } from '../design-system';

export function RecommendationDrops({ drops }: Readonly<{ drops: DropContract[] }>) {
  if (drops.length === 0) return null;

  return (
    <section className="section-stack">
      <SectionHeader kicker="Drop Match" title="Live or upcoming drops aligned to your force." />
      <div className="drop-grid">
        {drops.map((drop) => <DropCard key={drop.slug} drop={drop} />)}
      </div>
    </section>
  );
}
