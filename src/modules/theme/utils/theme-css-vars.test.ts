import { describe, expect, it } from 'vitest';
import { themeToCssVariables } from './theme-css-vars';
import { xeorumDarkTheme } from './resolve-theme';

describe('themeToCssVariables', () => {
  it('exposes semantic and system tokens with the xe prefix', () => {
    const cssVars = themeToCssVariables(xeorumDarkTheme);

    expect(cssVars['--xe-semantic-background']).toBe(xeorumDarkTheme.semantic.background);
    expect(cssVars['--xe-typography-font-family']).toBe(xeorumDarkTheme.typography.fontFamily);
    expect(cssVars['--xe-space-4']).toBe(xeorumDarkTheme.spacing['4']);
    expect(cssVars['--xe-radius-md']).toBe(xeorumDarkTheme.radius.md);
    expect(cssVars['--xe-motion-duration-fast']).toBe(xeorumDarkTheme.motion.durationFast);
    expect(cssVars['--xe-color-gold-400']).toBe(xeorumDarkTheme.primitive.color.gold[400]);
  });

  it('exposes overlay variables when an archetype overlay is present', () => {
    const cssVars = themeToCssVariables({
      ...xeorumDarkTheme,
      overlay: {
        archetype: {
          accent: '#111111',
          accentSoft: '#222222',
          accentMuted: '#333333',
          aura: '#444444',
          glow: '#555555',
          gradientStart: '#666666',
          gradientEnd: '#777777',
          shadowTint: '#888888',
          backgroundWash: 'wash',
          cardHighlight: 'highlight',
          heroOverlay: 'hero',
          profilePanel: 'panel',
          patternOpacity: 0.1,
          borderStyle: 'soft-glow',
          iconMood: 'calm',
          motionFeel: 'still',
          textOnAccent: '#ffffff',
        },
      },
    });

    expect(cssVars['--xe-overlay-archetype-background-wash']).toBe('wash');
    expect(cssVars['--xe-overlay-archetype-shadow-tint']).toBe('#888888');
  });
});
