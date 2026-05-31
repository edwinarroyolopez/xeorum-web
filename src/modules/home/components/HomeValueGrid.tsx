import React from 'react';
import { homeDetailTiles } from '../services/home.content';
import { HomeValueCard } from './HomeValueCard';

export function HomeValueGrid() {
  return (
    <div className="home-details-grid">
      {homeDetailTiles.map((pillar) => <HomeValueCard key={pillar.title} pillar={pillar} />)}
    </div>
  );
}
