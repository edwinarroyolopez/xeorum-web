import React from 'react';
import type { HomeValuePillar } from '../services/home.types';
import { HomeDetailTile } from './HomeDetailTile';

export function HomeValueCard({ pillar }: Readonly<{ pillar: HomeValuePillar }>) {
  return <HomeDetailTile icon={pillar.icon} title={pillar.title} body={pillar.body} />;
}
