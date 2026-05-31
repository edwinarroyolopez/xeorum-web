import type { ThemePartial, ThemeResolverContextName } from '../contracts/theme.types';

export const themeContextOverrides: Record<ThemeResolverContextName, ThemePartial> = {
  default: {},
  home: {
    overlay: {
      archetype: {
        backgroundWash: 'radial-gradient(circle at 20% 10%, rgba(216, 183, 107, 0.13), transparent 30%), radial-gradient(circle at 82% 6%, rgba(36, 89, 112, 0.14), transparent 28%)',
      },
    },
  },
  pantheon: {
    elevation: {
      overlay: '0 35px 120px rgba(0, 0, 0, 0.65)',
    },
  },
  'identity-result': {
    semantic: {
      surfaceGlass: 'rgba(7, 7, 7, 0.82)',
    },
  },
  profile: {
    semantic: {
      backgroundElevated: '#0b0b0d',
    },
  },
  'product-detail': {
    semantic: {
      accentMuted: 'rgba(216, 183, 107, 0.1)',
    },
  },
  recommendations: {
    semantic: {
      accentMuted: 'rgba(216, 183, 107, 0.14)',
    },
  },
  'checkout-payment-critical': {
    semantic: {
      surfaceGlass: 'rgba(7, 7, 7, 0.9)',
      accentMuted: 'rgba(216, 183, 107, 0.08)',
    },
  },
  legal: {
    semantic: {
      surfaceGlass: 'rgba(7, 7, 7, 0.92)',
    },
  },
};
