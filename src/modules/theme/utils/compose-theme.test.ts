import { describe, expect, it } from 'vitest';
import { zeusOverlay } from '../overlays/archetype-overlays';
import { setPublicThemeContract } from '../public-theme-registry';
import {
  composeTheme,
  getThemeContext,
  isOverlayAllowedForContext,
  resolveArchetypeOverlay,
  resolveComposedTheme,
  resolvePageTheme,
} from './compose-theme';
import { xeorumDarkTheme } from './resolve-theme';

setPublicThemeContract({
  schemaVersion: 'public-theme-contract-v1',
  contractVersion: 1,
  baseTheme: xeorumDarkTheme,
  overlays: [zeusOverlay],
  fallbackThemeName: 'xeorum-dark',
});

describe('composeTheme', () => {
  it('composes base theme with a safe archetype overlay in order', () => {
    const theme = composeTheme({
      baseTheme: xeorumDarkTheme,
      overlay: zeusOverlay,
      context: 'pantheon',
      intensity: 'subtle',
    });

    expect(theme.semantic.accent).toBe(zeusOverlay.colors.accent);
    expect(theme.semantic.focusRing).toBe(zeusOverlay.accessibility.focusRing);
    expect(theme.overlay.archetype?.backgroundWash).toBe(zeusOverlay.surfaces.backgroundWash);
    expect(theme.elevation.overlay).toBe('0 35px 120px rgba(0, 0, 0, 0.65)');
  });

  it('skips overlay in restricted contexts and keeps the safe base', () => {
    const theme = composeTheme({
      baseTheme: xeorumDarkTheme,
      overlay: zeusOverlay,
      context: 'checkout-payment-critical',
      intensity: 'medium',
    });

    expect(theme.semantic.accent).toBe(xeorumDarkTheme.semantic.accent);
    expect(theme.overlay.archetype).toBeUndefined();
    expect(theme.semantic.surfaceGlass).toBe('rgba(7, 7, 7, 0.9)');
  });

  it('does not apply overlay in legal context', () => {
    const theme = composeTheme({
      baseTheme: xeorumDarkTheme,
      overlay: zeusOverlay,
      context: 'legal',
      intensity: 'medium',
    });

    expect(theme.semantic.accent).toBe(xeorumDarkTheme.semantic.accent);
    expect(theme.overlay.archetype).toBeUndefined();
  });

  it('applies accessibility overrides after context and overlay', () => {
    const theme = composeTheme({
      baseTheme: xeorumDarkTheme,
      overlay: zeusOverlay,
      context: 'profile',
      accessibility: {
        reduceMotion: true,
        forceHighContrast: true,
      },
      intensity: 'medium',
    });

    expect(theme.motion.durationBase).toBe('0ms');
    expect(theme.semantic.focusRing).toBe(theme.semantic.textPrimary);
    expect(theme.overlay.archetype?.motionFeel).toBe('still');
  });
});

describe('theme context helpers', () => {
  it('maps paths into stable theme contexts', () => {
    expect(getThemeContext('/checkout')).toBe('checkout-payment-critical');
    expect(getThemeContext('/legal')).toBe('legal');
    expect(getThemeContext('/products/[slug]')).toBe('product-detail');
  });

  it('enforces overlay context rules explicitly', () => {
    expect(isOverlayAllowedForContext(zeusOverlay, 'profile', 'medium')).toBe(true);
    expect(isOverlayAllowedForContext(zeusOverlay, 'checkout-payment-critical', 'medium')).toBe(false);
  });
});

describe('resolveArchetypeOverlay', () => {
  it('returns only safe published overlays', () => {
    expect(resolveArchetypeOverlay('zeus')?.archetypeSlug).toBe('zeus');
    expect(resolveArchetypeOverlay('unknown')).toBeNull();
  });
});

describe('resolveComposedTheme', () => {
  it('resolves the xeorum dark theme when no options are provided', () => {
    expect(resolveComposedTheme()).toEqual(xeorumDarkTheme);
  });
});

describe('resolvePageTheme', () => {
  it('uses the published registry overlay in allowed contexts', () => {
    const profileTheme = resolvePageTheme({
      archetypeSlug: 'zeus',
      context: 'profile',
      intensity: 'medium',
    });

    const productTheme = resolvePageTheme({
      archetypeSlug: 'zeus',
      context: 'product-detail',
      intensity: 'subtle',
    });

    expect(profileTheme.overlay.archetype?.profilePanel).toBe(zeusOverlay.surfaces.profilePanel);
    expect(productTheme.overlay.archetype?.profilePanel).toBe(zeusOverlay.surfaces.profilePanel);
  });

  it('falls back to the base dark theme contract when no safe overlay resolves', () => {
    const theme = resolvePageTheme({
      archetypeSlug: 'unknown',
      context: 'profile',
      intensity: 'medium',
    });

    expect(theme.name).toBe('xeorum-dark');
    expect(theme.semantic.accent).toBe(xeorumDarkTheme.semantic.accent);
    expect(theme.overlay.archetype).toBeUndefined();
  });

  it('respects reduced motion by disabling ambient motion', () => {
    const theme = resolvePageTheme({
      archetypeSlug: 'zeus',
      context: 'profile',
      intensity: 'medium',
      accessibility: { reduceMotion: true },
    });

    expect(theme.motion.durationSlow).toBe('0ms');
    expect(theme.overlay.archetype?.motionFeel).toBe('still');
  });
});
