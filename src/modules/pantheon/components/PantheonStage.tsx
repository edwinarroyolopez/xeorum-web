import React from 'react';
import { cn } from '../../../lib/ui/cn';
import type { PantheonArchetype } from '../pantheon.types';
import styles from '../PantheonExperience.module.css';
import { getPantheonStageStyle } from '../services';
import { PantheonAmbientLayer } from './PantheonAmbientLayer';
import { PantheonGodPreview } from './PantheonGodPreview';
import { PantheonHeroCopy } from './PantheonHeroCopy';
import { PantheonMobileSelector } from './PantheonMobileSelector';
import { PantheonSelector } from './PantheonSelector';

type PantheonStageProps = {
  archetypes: PantheonArchetype[];
  activeArchetype: PantheonArchetype;
  reducedMotion: boolean;
  onActiveChange: (slug: string) => void;
};

export function PantheonStage({ archetypes, activeArchetype, reducedMotion, onActiveChange }: Readonly<PantheonStageProps>) {
  return (
    <section className={cn(styles.stage, reducedMotion && styles.reducedMotion)} style={getPantheonStageStyle(activeArchetype)}>
      <PantheonAmbientLayer archetype={activeArchetype} />
      <PantheonHeroCopy archetype={activeArchetype} />
      <PantheonSelector archetypes={archetypes} activeSlug={activeArchetype.slug} onActiveChange={onActiveChange} />
      <PantheonGodPreview archetype={activeArchetype} reducedMotion={reducedMotion} />
      <PantheonMobileSelector archetypes={archetypes} activeSlug={activeArchetype.slug} onActiveChange={onActiveChange} />
    </section>
  );
}
