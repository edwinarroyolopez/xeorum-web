import type { SemanticTokens } from '../contracts/theme.types';
import { xeorumPrimitiveTokens } from './primitive.tokens';

const { black, neutral, gold, red, green, amber } = xeorumPrimitiveTokens.color;

export const xeorumSemanticColorTokens: SemanticTokens = {
  background: black[950],
  backgroundElevated: neutral[900],
  surface: neutral[950],
  surfaceMuted: neutral[800],
  surfaceGlass: 'rgba(20, 22, 26, 0.72)',
  textPrimary: neutral[100],
  textSecondary: neutral[500],
  textMuted: neutral[700],
  borderSubtle: neutral[850],
  borderStrong: neutral[700],
  accent: gold[400],
  accentSoft: neutral[800],
  accentMuted: 'rgba(216, 180, 106, 0.12)',
  focusRing: gold[400],
  danger: red[800],
  warning: amber[700],
  success: green[500],
};

export const xeorumColorTokens = xeorumSemanticColorTokens;
