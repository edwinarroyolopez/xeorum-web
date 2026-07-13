'use client';

import React from 'react';
import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { AccessibilitySettings, PublicThemeContract, Theme, ThemeContextName, ThemeName } from '../contracts/theme.types';
import { ThemeCssVariables } from './ThemeCssVariables';
import { setPublicThemeContract } from '../public-theme-registry';
import { resolvePageTheme } from '../utils/compose-theme';
import { xeorumDarkTheme } from '../utils/resolve-theme';

type ThemeContextValue = {
  theme: Theme;
  accessibility: AccessibilitySettings;
  themeContext: ThemeContextName;
  archetypeSlug: string | null;
  setThemeName: (themeName: ThemeName) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

type AppThemeProviderProps = {
  children: ReactNode;
  context?: ThemeContextName;
  archetypeSlug?: string | null;
  accessibilityOverrides?: AccessibilitySettings;
  initialThemeContract?: PublicThemeContract;
};

export function AppThemeProvider({
  children,
  context = 'home',
  archetypeSlug = null,
  accessibilityOverrides,
  initialThemeContract,
}: Readonly<AppThemeProviderProps>) {
  const [themeName, setThemeName] = useState<ThemeName>('xeorum-dark');
  const [accessibility, setAccessibility] = useState<AccessibilitySettings>({});

  setPublicThemeContract(initialThemeContract ?? null);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateAccessibility = () => {
      setAccessibility((current) => ({
        ...current,
        reduceMotion: mediaQuery.matches,
      }));
    };

    updateAccessibility();
    mediaQuery.addEventListener('change', updateAccessibility);

    return () => mediaQuery.removeEventListener('change', updateAccessibility);
  }, []);

  useEffect(() => {
    setPublicThemeContract(initialThemeContract ?? null);
  }, [initialThemeContract]);

  const theme = useMemo(
    () =>
      resolvePageTheme({
        themeName,
        archetypeSlug,
        context,
        accessibility: { ...accessibility, ...accessibilityOverrides },
      }),
    [accessibility, accessibilityOverrides, archetypeSlug, context, themeName]
  );

  return (
    <ThemeContext.Provider
      value={{
        theme,
        accessibility: { ...accessibility, ...accessibilityOverrides },
        themeContext: context,
        archetypeSlug,
        setThemeName,
      }}
    >
      <ThemeCssVariables theme={theme}>{children}</ThemeCssVariables>
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const value = useContext(ThemeContext);
  return value ?? {
    theme: xeorumDarkTheme,
    accessibility: {},
    themeContext: 'home' as const,
    archetypeSlug: null,
    setThemeName: () => undefined,
  };
}
