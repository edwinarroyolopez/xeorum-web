import React from 'react';
import { getPantheonArchetypeLandingServer } from './pantheon.metadata';
import { PantheonDetailClient } from './PantheonDetailClient';
import type { PantheonArchetypeLanding } from './pantheon.types';

export async function PantheonDetailServer({ slug, initialData }: Readonly<{ slug: string; initialData?: PantheonArchetypeLanding }>) {
  const resolvedInitialData = initialData ?? (await getPantheonArchetypeLandingServer(slug).catch(() => undefined));

  return <PantheonDetailClient slug={slug} {...(resolvedInitialData ? { initialData: resolvedInitialData } : {})} />;
}
