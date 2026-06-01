'use client';

import React from 'react';
import { ThemeCssVariables } from '../theme/providers/ThemeCssVariables';
import { resolvePageTheme } from '../theme';
import type { PantheonArchetypeLanding } from './pantheon.types';
import { ArchetypeDrops, ArchetypeFinalCta, ArchetypeGallery, ArchetypeHero, ArchetypeIdentityStatement, ArchetypeManifesto, ArchetypeProducts, ArchetypePsychology, ArchetypeRelations, ArchetypeShadow, ArchetypeTransformation, ArchetypeVisualSystem } from './components';
import { buildArchetypeLandingViewModel } from './services';

export function ArchetypeLanding({ archetype }: Readonly<{ archetype: PantheonArchetypeLanding }>) {
  const theme = resolvePageTheme({
    archetypeSlug: archetype.theme.overlaySlug ?? archetype.slug,
    context: 'pantheon',
    intensity: archetype.theme.intensityDefault,
    overlayStrategy: archetype.theme.overlaySlug ? 'published' : 'zeus-pilot',
  });
  const viewModel = buildArchetypeLandingViewModel(archetype);

  return (
    <ThemeCssVariables theme={theme}>
      <section className="section-stack pantheon-pilot-shell xeorum-archetype-shell" data-zeus-pilot={viewModel.zeusPilotActive}>
        <ArchetypeHero archetype={archetype} viewModel={viewModel} />
        <ArchetypeIdentityStatement archetype={archetype} />
        <ArchetypeManifesto archetype={archetype} />
        <ArchetypePsychology archetype={archetype} />
        <ArchetypeShadow archetype={archetype} />
        <ArchetypeTransformation archetype={archetype} />
        <ArchetypeVisualSystem archetype={archetype} />
        <ArchetypeGallery viewModel={viewModel} />
        <ArchetypeProducts archetype={archetype} />
        <ArchetypeDrops archetype={archetype} />
        <ArchetypeRelations archetype={archetype} viewModel={viewModel} />
        <ArchetypeFinalCta archetype={archetype} viewModel={viewModel} />
      </section>
    </ThemeCssVariables>
  );
}
