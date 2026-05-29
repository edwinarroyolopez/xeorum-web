import type { PantheonArchetypeLanding } from './pantheon.types';

type ArchetypeHeroEffectProfile = {
  key: string;
  label: string;
  auraColor: string;
  floatDistance: number;
  portraitTilt: number;
  profileLift: number;
  signalLift: number;
};

const profileLabels: Record<PantheonArchetypeLanding['theme']['heroEffectProfile'], string> = {
  'editorial-float': 'Editorial Float',
  'imperial-electric': 'Imperial Electric',
  'lucid-orbit': 'Lucid Orbit',
  'underworld-drift': 'Underworld Drift',
};

export function resolveArchetypeHeroEffect(theme: PantheonArchetypeLanding['theme']): ArchetypeHeroEffectProfile {
  return {
    key: theme.heroEffectProfile,
    label: profileLabels[theme.heroEffectProfile] ?? 'Editorial Float',
    ...theme.heroEffect,
  };
}
