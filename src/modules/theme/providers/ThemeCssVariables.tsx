'use client';

import React from 'react';
import type { CSSProperties, ReactNode } from 'react';
import type { Theme } from '../contracts/theme.types';
import { themeToCssVariables } from '../utils/theme-css-vars';

export function ThemeCssVariables({ theme, children }: Readonly<{ theme: Theme; children: ReactNode }>) {
  return (
    <div data-theme={theme.name} style={themeToCssVariables(theme) as CSSProperties}>
      {children}
    </div>
  );
}
