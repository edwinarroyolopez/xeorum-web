import React from 'react';
import { LinkButton } from '../../design-system';
import { homeEntryPoints } from '../services/home.content';
import type { HomeFeaturedProduct } from '../services/home.types';
import { HomeHeroProductSpotlight } from './HomeHeroProductSpotlight';
import { HomeIcon } from './HomeIcon';
import { HomeIdentityPanel } from './HomeIdentityPanel';

export function HomeHero({ product }: Readonly<{ product: HomeFeaturedProduct }>) {
  return (
    <section className="home-shell home-hero-shell">
      <div className="home-hero-grid">
        <div className="home-hero-copy">
          <div className="home-premium-pill">
            <span />
            Premium identity commerce
          </div>
          <h1>
            <span>No compras ropa.</span>
            <span>Reclamas presencia.</span>
          </h1>
          <div className="home-ornamental-line" aria-hidden="true">
            <div />
            <span />
            <div />
          </div>
          <p>XEORUM debe sentirse como un templo comercial: producto visible, deseo inmediato, identidad profunda y una compra limpia. El mito no tapa la prenda; la convierte en simbolo.</p>
          <div className="home-hero-actions">
            <LinkButton href="/products" variant="primary" size="lg" className="home-primary-cta">Ver coleccion <HomeIcon name="arrow" color="black" /></LinkButton>
            <LinkButton href="/identity" variant="ghost" size="lg" className="home-secondary-cta">Iniciar test</LinkButton>
          </div>
          <div className="home-entry-grid">
            {homeEntryPoints.map((item) => <div key={item.label} className="home-entry-pill">{item.label}</div>)}
          </div>
          <div className="home-hero-showcase">
            <HomeHeroProductSpotlight product={product} />
            <div className="home-hero-side">
              <HomeIdentityPanel product={product} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
