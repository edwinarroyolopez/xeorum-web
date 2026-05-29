import type { Theme } from '../contracts/theme.types';
import { xeorumSemanticColorTokens } from '../tokens/color.tokens';
import { xeorumElevationTokens } from '../tokens/elevation.tokens';
import { xeorumMotionTokens } from '../tokens/motion.tokens';
import { xeorumPrimitiveTokens } from '../tokens/primitive.tokens';
import { xeorumRadiusTokens } from '../tokens/radius.tokens';
import { xeorumSpacingTokens } from '../tokens/spacing.tokens';
import { xeorumTypographyTokens } from '../tokens/typography.tokens';

export const xeorumDarkTheme: Theme = {
  name: 'xeorum-dark',
  mode: 'dark',
  primitive: xeorumPrimitiveTokens,
  semantic: xeorumSemanticColorTokens,
  typography: xeorumTypographyTokens,
  spacing: xeorumSpacingTokens,
  radius: xeorumRadiusTokens,
  elevation: xeorumElevationTokens,
  motion: xeorumMotionTokens,
  overlay: {},
};

export function resolveTheme(themeName: string = 'xeorum-dark'): Theme {
  return themeName === 'xeorum-dark' ? xeorumDarkTheme : xeorumDarkTheme;
}
