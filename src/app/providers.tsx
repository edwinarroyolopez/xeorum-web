'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { AppThemeProvider } from '../modules/theme/providers/AppThemeProvider';
import { createQueryClient } from '../lib/react-query/query-client';

export function Providers({ children }: Readonly<{ children: ReactNode }>) {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <AppThemeProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AppThemeProvider>
  );
}
