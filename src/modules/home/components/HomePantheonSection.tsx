import React from 'react';
import { LinkButton } from '../../design-system';
import type { HomePortalFallback } from '../services/home.types';
import { HomePortalGrid } from './HomePortalGrid';
import { HomeSectionShell } from './HomeSectionShell';

export function HomePantheonSection({ portals }: Readonly<{ portals: readonly HomePortalFallback[] }>) {
  return (
    <HomeSectionShell
      kicker="Pantheon"
      title="Portales como territorios. No como categorias baratas."
      action={<LinkButton href="/pantheon" variant="ghost" size="lg" className="home-secondary-cta">Explorar portales</LinkButton>}
      className="home-portals-shell"
    >
      <HomePortalGrid portals={portals} />
    </HomeSectionShell>
  );
}
