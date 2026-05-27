import type { Theme } from '../theme/contracts/theme.types';
import { xeorumColorTokens } from '../theme/tokens/color.tokens';

const themeOverrides: Record<string, Partial<Theme['tokens']>> = {
  zeus: { accent: '#c7a45a', accentSoft: '#2e3140', info: '#6d86b1' },
  hades: { accent: '#d8b46a', accentSoft: '#121216', panel: '#101014' },
  ares: { accent: '#b35b5b', accentSoft: '#351313', danger: '#a74b4b' },
  odin: { accent: '#98adc9', accentSoft: '#161a22', info: '#7b8fb0' },
  anubis: { accent: '#b08f4a', accentSoft: '#2d2317', gold: '#b08f4a' },
  athena: { accent: '#bda96a', accentSoft: '#1e1c1b', marble: '#ece3cf' },
  apollo: { accent: '#d5b56d', accentSoft: '#2c2417', gold: '#d5b56d' },
  artemis: { accent: '#b7b0a6', accentSoft: '#1b1d27', info: '#8790a0' },
  hermes: { accent: '#bcc3d1', accentSoft: '#1a1c24', info: '#9aa6bb' },
  aphrodite: { accent: '#d8b7a1', accentSoft: '#25191d', warning: '#c28f7d' },
};

export function resolveArchetypeTheme(slug: string): Theme {
  const tokens = {
    ...xeorumColorTokens,
    ...(themeOverrides[slug] ?? {}),
  };

  return {
    name: 'xeorum-dark',
    tokens,
  };
}
