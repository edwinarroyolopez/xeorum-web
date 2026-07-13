'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { AppThemeProvider } from '../modules/theme/providers/AppThemeProvider';
import type { PublicThemeContract } from '../modules/theme/contracts/theme.types';
import { createQueryClient } from '../lib/react-query/query-client';

export function Providers({ children, initialThemeContract }: Readonly<{ children: ReactNode; initialThemeContract: PublicThemeContract }>) {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <AppThemeProvider initialThemeContract={initialThemeContract}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AppThemeProvider>
  );
}
