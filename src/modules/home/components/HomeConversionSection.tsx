import React from 'react';
import type { HomeFeaturedProduct } from '../services/home.types';
import { HomeConversionPanel } from './HomeConversionPanel';
import { HomeProductDetailPreview } from './HomeProductDetailPreview';

export function HomeConversionSection({ product }: Readonly<{ product: HomeFeaturedProduct }>) {
  return (
    <section className="home-shell home-commerce-shell">
      <div className="home-commerce-grid">
        <HomeProductDetailPreview product={product} />
        <HomeConversionPanel />
      </div>
    </section>
  );
}
