'use client';

import React from 'react';
import { ThemeCssVariables } from '../theme/providers/ThemeCssVariables';
import { resolvePageTheme } from '../theme';
import type { PantheonArchetypeLanding } from './pantheon.types';
import { ArchetypeHero, ArchetypeIdentityStatement, ArchetypeProducts, ArchetypeShadow, ArchetypeVisualSystem } from './components';
import { buildArchetypeLandingViewModel } from './services';
import styles from './ArchetypeLanding.module.css';

export function ArchetypeLanding({ archetype }: Readonly<{ archetype: PantheonArchetypeLanding }>) {
  const theme = resolvePageTheme({
    archetypeSlug: archetype.theme.overlaySlug ?? archetype.slug,
    context: 'pantheon',
    intensity: archetype.theme.intensityDefault,
    overlayStrategy: 'published',
  });
  const viewModel = buildArchetypeLandingViewModel(archetype);

  return (
    <ThemeCssVariables theme={theme}>
      <section className={styles.shell} data-theme-overlay={viewModel.themeOverlay}>
        <ArchetypeHero archetype={archetype} viewModel={viewModel} />
        <ArchetypeIdentityStatement archetype={archetype} />
        <ArchetypeShadow archetype={archetype} />
        <ArchetypeVisualSystem archetype={archetype} viewModel={viewModel} />
        <ArchetypeProducts archetype={archetype} viewModel={viewModel} />
      </section>
    </ThemeCssVariables>
  );
}
