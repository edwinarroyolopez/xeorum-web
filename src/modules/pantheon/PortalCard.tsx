import Link from 'next/link';
import type { PantheonArchetype } from './pantheon.types';

export function PortalCard({ archetype }: Readonly<{ archetype: PantheonArchetype }>) {
  return (
    <article className="portal-card">
      <p className="portal-card-kicker">{archetype.energy}</p>
      <h2>{archetype.name}</h2>
      <p>{archetype.manifesto}</p>
      <div className="portal-card-palette">
        {archetype.palette?.slice(0, 4).map((color) => (
          <span key={color} style={{ background: color }} />
        ))}
      </div>
      <Link href={`/pantheon/${archetype.slug}`}>{archetype.ctaLabel ?? 'Enter Portal'}</Link>
    </article>
  );
}
