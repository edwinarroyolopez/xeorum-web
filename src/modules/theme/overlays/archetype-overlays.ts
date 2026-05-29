import type { ArchetypeThemeOverlay, ThemeResolverContextName } from '../contracts/theme.types';

const zeusOverlay: ArchetypeThemeOverlay = {
  archetypeSlug: 'zeus',
  name: 'Zeus Dominion Overlay',
  status: 'published',
  intensity: {
    default: 'subtle',
    allowed: ['subtle', 'medium'],
    forbidden: ['extreme'],
  },
  colors: {
    accent: '#C8A45D',
    accentSoft: 'rgba(46, 49, 64, 0.68)',
    accentMuted: 'rgba(200, 164, 93, 0.12)',
    aura: 'rgba(64, 93, 140, 0.18)',
    glow: 'rgba(200, 164, 93, 0.24)',
    gradientStart: 'rgba(10, 14, 24, 1)',
    gradientEnd: 'rgba(37, 52, 84, 0.65)',
    shadowTint: 'rgba(200, 164, 93, 0.18)',
  },
  surfaces: {
    backgroundWash: 'radial-gradient(circle at 70% 20%, rgba(64, 93, 140, 0.16), transparent 38%)',
    cardHighlight: 'linear-gradient(135deg, rgba(200, 164, 93, 0.10), rgba(255, 255, 255, 0.02))',
    heroOverlay: 'linear-gradient(180deg, rgba(5, 7, 12, 0.35), rgba(5, 7, 12, 0.92))',
    profilePanel: 'rgba(17, 22, 34, 0.86)',
  },
  symbolic: {
    pattern: 'abstract-lightning-linework',
    patternOpacity: 0.04,
    borderStyle: 'soft-glow',
    iconMood: 'imperial-electric-minimal',
  },
  motion: {
    feel: 'commanding',
    durationMultiplier: 0.92,
    allowAmbientMotion: true,
  },
  usage: {
    allowedContexts: ['home', 'pantheon', 'identity-result', 'profile', 'product-detail', 'recommendations'],
    forbiddenContexts: ['checkout-payment-critical', 'legal', 'admin'],
  },
  accessibility: {
    contrastValidated: true,
    reducedMotionSafe: true,
    textOnAccent: '#05070C',
    focusRing: '#D7B66A',
  },
};

const overlays: Record<string, ArchetypeThemeOverlay> = {
  zeus: zeusOverlay,
};

export function getPublishedArchetypeOverlay(slug: string) {
  return overlays[slug] ?? null;
}

const zeusPilotContexts = new Set<ThemeResolverContextName>(['profile', 'pantheon']);

export function getZeusPilotOverlay(slug: string | null | undefined, context: ThemeResolverContextName) {
  if (slug !== 'zeus') {
    return null;
  }

  if (!zeusPilotContexts.has(context)) {
    return null;
  }

  return getPublishedArchetypeOverlay(slug);
}

export { zeusOverlay };
