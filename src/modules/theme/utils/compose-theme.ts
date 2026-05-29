import type {
  AccessibilitySettings,
  ArchetypeThemeOverlay,
  ComposeThemeOptions,
  OverlayResolutionStrategy,
  ResolvePageThemeOptions,
  Theme,
  ThemeContextName,
  ThemeIntensity,
  ThemePartial,
} from '../contracts/theme.types';
import { getPublishedArchetypeOverlay, getZeusPilotOverlay } from '../overlays/archetype-overlays';
import { isOverlaySafe } from '../validators/theme-accessibility';
import { resolveTheme, xeorumDarkTheme } from './resolve-theme';

const restrictedContexts = new Set<ThemeContextName>(['checkout-payment-critical', 'legal']);

const contextOverrides: Record<ThemeContextName, ThemePartial> = {
  default: {},
  home: {
    overlay: {
      archetype: {
        backgroundWash: 'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.03), transparent 42%)',
      },
    },
  },
  pantheon: {
    elevation: {
      overlay: '0 28px 80px rgba(0, 0, 0, 0.46)',
    },
  },
  'identity-result': {
    semantic: {
      surfaceGlass: 'rgba(20, 22, 26, 0.78)',
    },
  },
  profile: {
    semantic: {
      backgroundElevated: '#111622',
    },
  },
  'product-detail': {
    semantic: {
      accentMuted: 'rgba(216, 180, 106, 0.1)',
    },
  },
  recommendations: {
    semantic: {
      accentMuted: 'rgba(216, 180, 106, 0.14)',
    },
  },
  'checkout-payment-critical': {
    semantic: {
      surfaceGlass: 'rgba(20, 22, 26, 0.9)',
      accentMuted: 'rgba(216, 180, 106, 0.08)',
    },
  },
  legal: {
    semantic: {
      surfaceGlass: 'rgba(20, 22, 26, 0.92)',
    },
  },
};

function isCompleteArchetypeOverlay(
  value: Partial<NonNullable<Theme['overlay']['archetype']>>
): value is NonNullable<Theme['overlay']['archetype']> {
  return (
    typeof value.accent === 'string' &&
    typeof value.accentSoft === 'string' &&
    typeof value.accentMuted === 'string' &&
    typeof value.aura === 'string' &&
    typeof value.glow === 'string' &&
    typeof value.gradientStart === 'string' &&
    typeof value.gradientEnd === 'string' &&
    typeof value.shadowTint === 'string' &&
    typeof value.backgroundWash === 'string' &&
    typeof value.cardHighlight === 'string' &&
    typeof value.heroOverlay === 'string' &&
    typeof value.profilePanel === 'string' &&
    typeof value.patternOpacity === 'number' &&
    typeof value.borderStyle === 'string' &&
    typeof value.iconMood === 'string' &&
    typeof value.motionFeel === 'string' &&
    typeof value.textOnAccent === 'string'
  );
}

function mergeArchetypeOverlay(
  base: Theme['overlay']['archetype'],
  partial?: Partial<NonNullable<Theme['overlay']['archetype']>>
): Theme['overlay']['archetype'] {
  if (!partial) {
    return base;
  }

  if (base) {
    return {
      ...base,
      ...partial,
    };
  }

  return isCompleteArchetypeOverlay(partial) ? partial : base;
}

function mergeRecord<T extends Record<string, string | number>>(base: T, partial?: Partial<T>) {
  if (!partial) {
    return base;
  }

  return {
    ...base,
    ...partial,
  } as T;
}

function mergeTheme(baseTheme: Theme, partial: ThemePartial | null | undefined): Theme {
  if (!partial) {
    return baseTheme;
  }

  const overlayArchetype = mergeArchetypeOverlay(baseTheme.overlay.archetype, partial.overlay?.archetype);

  return {
    ...baseTheme,
    semantic: mergeRecord(baseTheme.semantic, partial.semantic),
    typography: {
      ...baseTheme.typography,
      ...partial.typography,
    },
    spacing: mergeRecord(baseTheme.spacing, partial.spacing),
    radius: mergeRecord(baseTheme.radius, partial.radius),
    elevation: mergeRecord(baseTheme.elevation, partial.elevation),
    motion: {
      ...baseTheme.motion,
      ...partial.motion,
    },
    overlay: overlayArchetype ? { archetype: overlayArchetype } : {},
  };
}

function applyOverlay(theme: Theme, overlay: ArchetypeThemeOverlay, intensity: ThemeIntensity): Theme {
  if (intensity === 'none') {
    return theme;
  }

  const semanticOverrides = {
    accent: overlay.colors.accent,
    accentSoft: overlay.colors.accentSoft,
    accentMuted: overlay.colors.accentMuted,
    focusRing: overlay.accessibility.focusRing,
  };

  const mediumSurfaceOverrides =
    intensity === 'medium'
      ? {
          backgroundElevated: overlay.surfaces.profilePanel,
          surfaceGlass: overlay.surfaces.profilePanel,
        }
      : {};

  return mergeTheme(theme, {
    semantic: {
      ...semanticOverrides,
      ...mediumSurfaceOverrides,
    },
    motion: {
      durationFast: multiplyDuration(theme.motion.durationFast, overlay.motion.durationMultiplier),
      durationBase: multiplyDuration(theme.motion.durationBase, overlay.motion.durationMultiplier),
      durationSlow: multiplyDuration(theme.motion.durationSlow, overlay.motion.durationMultiplier),
    },
    overlay: {
      archetype: {
        accent: overlay.colors.accent,
        accentSoft: overlay.colors.accentSoft,
        accentMuted: overlay.colors.accentMuted,
        aura: overlay.colors.aura,
        glow: overlay.colors.glow,
        gradientStart: overlay.colors.gradientStart,
        gradientEnd: overlay.colors.gradientEnd,
        shadowTint: overlay.colors.shadowTint,
        backgroundWash: overlay.surfaces.backgroundWash,
        cardHighlight: overlay.surfaces.cardHighlight,
        heroOverlay: overlay.surfaces.heroOverlay,
        profilePanel: overlay.surfaces.profilePanel,
        patternOpacity: overlay.symbolic.patternOpacity,
        borderStyle: overlay.symbolic.borderStyle,
        iconMood: overlay.symbolic.iconMood,
        motionFeel: overlay.motion.feel,
        textOnAccent: overlay.accessibility.textOnAccent,
        ...(overlay.symbolic.pattern ? { pattern: overlay.symbolic.pattern } : {}),
      },
    },
  });
}

function applyAccessibility(theme: Theme, accessibility: AccessibilitySettings | undefined): Theme {
  if (!accessibility) {
    return theme;
  }

  let nextTheme = theme;

  if (accessibility.forceHighContrast) {
    nextTheme = mergeTheme(nextTheme, {
      semantic: {
        borderStrong: nextTheme.semantic.textSecondary,
        focusRing: nextTheme.semantic.textPrimary,
      },
    });
  }

  if (accessibility.reduceMotion) {
    const overlay = nextTheme.overlay.archetype
      ? {
          archetype: {
            ...nextTheme.overlay.archetype,
            motionFeel: 'still' as const,
          },
        }
      : undefined;

    nextTheme = mergeTheme(nextTheme, {
      motion: {
        durationFast: '0ms',
        durationBase: '0ms',
        durationSlow: '0ms',
      },
      ...(overlay ? { overlay } : {}),
    });
  }

  return nextTheme;
}

function multiplyDuration(duration: string, multiplier: number) {
  const value = Number.parseFloat(duration);

  if (Number.isNaN(value)) {
    return duration;
  }

  return `${Math.round(value * multiplier)}ms`;
}

export function resolveArchetypeOverlay(slug: string | null | undefined) {
  if (!slug) {
    return null;
  }

  const overlay = getPublishedArchetypeOverlay(slug);
  return isOverlaySafe(overlay) ? overlay : null;
}

export function resolveZeusPilotOverlay(slug: string | null | undefined, context: Extract<ThemeContextName, 'profile' | 'pantheon'>) {
  const overlay = getZeusPilotOverlay(slug, context);
  return isOverlaySafe(overlay) ? overlay : null;
}

function resolveOverlayByStrategy(
  archetypeSlug: string | null | undefined,
  context: ThemeContextName,
  strategy: OverlayResolutionStrategy
) {
  if (strategy === 'zeus-pilot') {
    if (context === 'profile' || context === 'pantheon') {
      return resolveZeusPilotOverlay(archetypeSlug, context);
    }

    return null;
  }

  return resolveArchetypeOverlay(archetypeSlug);
}

export function composeTheme({
  baseTheme,
  brandTheme = null,
  overlay = null,
  context = 'default',
  accessibility,
  intensity,
}: ComposeThemeOptions): Theme {
  let resolvedTheme = mergeTheme(baseTheme, brandTheme);
  const requestedIntensity = intensity ?? overlay?.intensity.default ?? 'none';
  const overlayAllowed =
    overlay &&
    requestedIntensity !== 'none' &&
    !restrictedContexts.has(context) &&
    overlay.usage.allowedContexts.includes(context) &&
    !overlay.usage.forbiddenContexts.includes(context);

  if (overlayAllowed && isOverlaySafe(overlay)) {
    resolvedTheme = applyOverlay(resolvedTheme, overlay, requestedIntensity);
  }

  resolvedTheme = mergeTheme(resolvedTheme, contextOverrides[context]);
  resolvedTheme = applyAccessibility(resolvedTheme, accessibility);

  return resolvedTheme;
}

export function resolveComposedTheme(options?: Partial<Omit<ComposeThemeOptions, 'baseTheme'>>) {
  return composeTheme({
    baseTheme: xeorumDarkTheme,
    ...(options?.brandTheme !== undefined ? { brandTheme: options.brandTheme } : {}),
    ...(options?.overlay !== undefined ? { overlay: options.overlay } : {}),
    ...(options?.context !== undefined ? { context: options.context } : {}),
    ...(options?.accessibility !== undefined ? { accessibility: options.accessibility } : {}),
    ...(options?.intensity !== undefined ? { intensity: options.intensity } : {}),
  });
}

export function resolvePageTheme({
  themeName = 'xeorum-dark',
  brandTheme = null,
  archetypeSlug = null,
  context = 'default',
  accessibility,
  intensity,
  overlayStrategy = 'published',
}: ResolvePageThemeOptions = {}) {
  const baseTheme = resolveTheme(themeName);

  try {
    const overlay = resolveOverlayByStrategy(archetypeSlug, context, overlayStrategy);

    return composeTheme({
      baseTheme,
      ...(brandTheme ? { brandTheme } : {}),
      ...(overlay ? { overlay } : {}),
      context,
      ...(accessibility ? { accessibility } : {}),
      ...(intensity ? { intensity } : {}),
    });
  } catch {
    return composeTheme({
      baseTheme,
      ...(brandTheme ? { brandTheme } : {}),
      context,
      ...(accessibility ? { accessibility } : {}),
      intensity: 'none',
    });
  }
}
