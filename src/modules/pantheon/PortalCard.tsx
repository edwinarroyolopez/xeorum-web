import React from 'react';
import type { PantheonArchetype } from './pantheon.types';
import { PortalCard as DSPortalCard } from '../design-system';

export function PortalCard({ archetype }: Readonly<{ archetype: PantheonArchetype }>) {
  return <DSPortalCard archetype={archetype} />;
}
