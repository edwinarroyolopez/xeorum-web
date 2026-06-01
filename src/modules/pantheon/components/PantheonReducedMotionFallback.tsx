'use client';

import React from 'react';
import type { ReactNode } from 'react';

export function PantheonReducedMotionFallback({ children }: Readonly<{ children: (reducedMotion: boolean) => ReactNode }>) {
  const [reducedMotion, setReducedMotion] = React.useState(true);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncReducedMotion = () => setReducedMotion(mediaQuery.matches);

    syncReducedMotion();
    mediaQuery.addEventListener('change', syncReducedMotion);

    return () => mediaQuery.removeEventListener('change', syncReducedMotion);
  }, []);

  return <>{children(reducedMotion)}</>;
}
