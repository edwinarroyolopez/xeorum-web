import React from 'react';
import type { HomePortalFallback } from '../services/home.types';
import { HomePortalCard } from './HomePortalCard';

export function HomePortalGrid({ portals }: Readonly<{ portals: readonly HomePortalFallback[] }>) {
  return (
    <div className="home-portals-grid">
      {portals.map((portal) => <HomePortalCard key={portal.slug} name={portal.name} title={portal.title} body={portal.body} note={portal.note} />)}
    </div>
  );
}
