import type { ThemePartial, ThemeResolverContextName } from '../contracts/theme.types';

export const themeContextOverrides: Record<ThemeResolverContextName, ThemePartial> = {
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
