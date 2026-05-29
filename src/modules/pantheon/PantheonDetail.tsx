import React from 'react';
import { PantheonDetailServer } from './PantheonDetailServer';
import type { PantheonArchetypeLanding } from './pantheon.types';

export async function PantheonDetail({ slug, initialData }: Readonly<{ slug: string; initialData?: PantheonArchetypeLanding }>) {
  return <PantheonDetailServer slug={slug} {...(initialData ? { initialData } : {})} />;
}
