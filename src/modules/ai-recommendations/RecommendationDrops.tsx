import Link from 'next/link';
import type { DropContract } from '@xeorum/contracts';

export function RecommendationDrops({ drops }: Readonly<{ drops: DropContract[] }>) {
  if (drops.length === 0) return null;

  return (
    <section className="section-stack">
      <div className="section-heading">
        <p className="portal-card-kicker">Drop Match</p>
        <h2>Live or upcoming drops aligned to your force.</h2>
      </div>
      <div className="drop-grid">
        {drops.map((drop) => (
          <article key={drop.slug} className="drop-card">
            <p className="portal-card-kicker">{drop.status}</p>
            <h3>{drop.name}</h3>
            <p>{drop.manifesto}</p>
            <Link href={`/drops/${drop.slug}`}>View Drop</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
