import React from 'react';
import type { HomeFeaturedProduct } from '../services/home.types';
import { HomeProductVisual } from './HomeProductVisual';

export function HomeHeroProductSpotlight({ product }: Readonly<{ product: HomeFeaturedProduct }>) {
  return (
    <div className="home-hero-stage">
      <div className="home-stage-aura" />
      <HomeProductVisual product={product} />
      <div className="home-selected-piece">
        <div>
          <p className="home-kicker">Selected piece</p>
          <h2>{product.name}</h2>
        </div>
        <div className="home-selected-piece-price">
          <strong>{product.homePriceLabel}</strong>
          <span>{product.homeStockLabel}</span>
        </div>
      </div>
    </div>
  );
}
