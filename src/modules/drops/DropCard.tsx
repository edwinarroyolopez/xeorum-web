import Link from 'next/link';
import type { Drop } from './drops.types';

export function DropCard({ drop }: Readonly<{ drop: Drop }>) {
  return (
    <article className="drop-card">
      <p className="portal-card-kicker">{drop.status}</p>
      <h3>{drop.name}</h3>
      <p>{drop.manifesto}</p>
      <Link href={`/drops/${drop.slug}`}>View Drop</Link>
    </article>
  );
}
