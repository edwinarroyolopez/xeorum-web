import React from 'react';
import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { Providers } from './providers';
import { getPublicThemeContractFromRegistry, setPublicThemeContract } from '../modules/theme/public-theme-registry';
import { xeorumDarkTheme } from '../modules/theme/utils/resolve-theme';

describe('Providers', () => {
  it('hydrates the public theme registry during render', () => {
    setPublicThemeContract(null);
    const contract = {
      schemaVersion: 'public-theme-contract-v1' as const,
      contractVersion: 1 as const,
      baseTheme: xeorumDarkTheme,
      overlays: [
        {
          archetypeSlug: 'zeus',
          name: 'Zeus',
          status: 'published' as const,
          intensity: { default: 'subtle' as const, allowed: ['subtle', 'medium'] as const, forbidden: ['extreme'] as const },
          colors: {
            accent: '#C8A45D', accentSoft: 'rgba(200, 164, 93, 0.18)', accentMuted: 'rgba(200, 164, 93, 0.08)', aura: 'rgba(64, 93, 140, 0.18)', glow: 'rgba(200, 164, 93, 0.24)', gradientStart: 'rgba(10, 14, 24, 1)', gradientEnd: 'rgba(37, 52, 84, 0.65)', shadowTint: 'rgba(200, 164, 93, 0.18)',
          },
          surfaces: {
            backgroundWash: 'radial-gradient(circle at 70% 20%, rgba(64, 93, 140, 0.16), transparent 38%)',
            cardHighlight: 'linear-gradient(135deg, rgba(200, 164, 93, 0.10), rgba(255, 255, 255, 0.02))',
            heroOverlay: 'linear-gradient(180deg, rgba(5, 7, 12, 0.35), rgba(5, 7, 12, 0.92))',
            profilePanel: 'rgba(17, 22, 34, 0.86)',
          },
          symbolic: { pattern: 'abstract-lightning-linework', patternOpacity: 0.04, borderStyle: 'soft-glow' as const, iconMood: 'imperial-electric-minimal' },
          motion: { feel: 'commanding' as const, durationMultiplier: 0.92, allowAmbientMotion: true },
          usage: {
            allowedContexts: ['home', 'pantheon', 'identity-result', 'profile', 'product-card', 'product-detail', 'recommendations'],
            forbiddenContexts: ['checkout-payment-critical', 'legal', 'admin'],
          },
          accessibility: { contrastValidated: true, reducedMotionSafe: true, textOnAccent: '#05070C', focusRing: '#D7B66A' },
        },
      ],
      fallbackThemeName: 'xeorum-dark',
    };

    renderToStaticMarkup(<Providers initialThemeContract={contract}><div>child</div></Providers>);

    expect(getPublicThemeContractFromRegistry()).toEqual(contract);
  });
});
