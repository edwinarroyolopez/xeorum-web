'use client';

import type { CSSProperties, ReactNode } from 'react';
import type { Theme } from '../contracts/theme.types';

function toCssVars(theme: Theme): CSSProperties {
  return Object.fromEntries(
    Object.entries(theme.tokens).map(([key, value]) => [`--${key}`, value])
  ) as CSSProperties;
}

export function ThemeCssVariables({ theme, children }: Readonly<{ theme: Theme; children: ReactNode }>) {
  return (
    <div data-theme={theme.name} style={toCssVars(theme)}>
      {children}
    </div>
  );
}
