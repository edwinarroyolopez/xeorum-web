'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';
import type { Theme } from '../contracts/theme.types';
import { ThemeCssVariables } from './ThemeCssVariables';
import { resolveTheme, xeorumDarkTheme } from '../utils/resolve-theme';

type ThemeContextValue = {
  theme: Theme;
  setThemeName: (themeName: string) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function AppThemeProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [themeName, setThemeName] = useState('xeorum-dark');
  const theme = useMemo(() => resolveTheme(themeName), [themeName]);

  return (
    <ThemeContext.Provider value={{ theme, setThemeName }}>
      <ThemeCssVariables theme={theme}>{children}</ThemeCssVariables>
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const value = useContext(ThemeContext);
  return value ?? { theme: xeorumDarkTheme, setThemeName: () => undefined };
}
