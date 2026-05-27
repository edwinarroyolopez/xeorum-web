'use client';

import Link from 'next/link';
import { usePantheonArchetype } from './pantheon.queries';
import { resolveArchetypeTheme } from './archetype-theme';
import { ThemeCssVariables } from '../theme/providers/ThemeCssVariables';

export function PantheonDetail({ slug }: Readonly<{ slug: string }>) {
  const query = usePantheonArchetype(slug);

  if (query.isLoading) {
    return <p className="section-state">Loading portal.</p>;
  }

  if (query.isError || !query.data) {
    return <p className="section-state">Portal unavailable.</p>;
  }

  const theme = resolveArchetypeTheme(query.data.slug);

  return (
    <ThemeCssVariables theme={theme}>
      <article className="portal-detail">
        <p className="portal-card-kicker">{query.data.energy}</p>
        <h1>{query.data.name}</h1>
        <p className="portal-manifesto">{query.data.manifesto}</p>
        <p>{query.data.visualMood}</p>
        <p className="portal-mantra">{query.data.mantra}</p>
        <div className="portal-card-palette">
          {query.data.palette?.map((color) => (
            <span key={color} style={{ background: color }} />
          ))}
        </div>
        <div className="portal-actions">
          <Link href="/identity">Run Identity Test</Link>
          <Link href="/pantheon">Back to Pantheon</Link>
        </div>
      </article>
    </ThemeCssVariables>
  );
}
