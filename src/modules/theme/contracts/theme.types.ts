export type ThemeName = 'xeorum-dark';

export type ThemeTokens = {
  background: string;
  surface: string;
  panel: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentSoft: string;
  accentContrast: string;
  gold: string;
  marble: string;
  obsidian: string;
  danger: string;
  success: string;
  warning: string;
  info: string;
};

export type Theme = {
  name: ThemeName;
  tokens: ThemeTokens;
};
