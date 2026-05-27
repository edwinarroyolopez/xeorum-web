import { xeorumColorTokens } from '../tokens/color.tokens';
import type { Theme } from '../contracts/theme.types';

export const xeorumDarkTheme: Theme = {
  name: 'xeorum-dark',
  tokens: xeorumColorTokens,
};

export function resolveTheme(themeName: string = 'xeorum-dark'): Theme {
  return themeName === 'xeorum-dark' ? xeorumDarkTheme : xeorumDarkTheme;
}
