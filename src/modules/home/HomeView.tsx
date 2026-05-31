'use client';

import React from 'react';
import { EmptyState, ErrorState, LoadingState } from '../design-system';
import { useProducts } from '../products/hooks/products.queries';
import { usePantheonArchetypes } from '../pantheon/pantheon.queries';
import { orderPantheonArchetypes } from '../pantheon/pantheon.types';
import { useHomeFeaturedProduct } from './hooks/useHomeFeaturedProduct';
import { homePortalFallbacks } from './services/home.content';
import { HomeConversionSection } from './components/HomeConversionSection';
import { HomeHero } from './components/HomeHero';
import { HomeIdentityEngineSection } from './components/HomeIdentityEngineSection';
import { HomePantheonSection } from './components/HomePantheonSection';
import { HomeRitualSection } from './components/HomeRitualSection';
import { HomeShopAllSection } from './components/HomeShopAllSection';
import { HomeValueSection } from './components/HomeValueSection';

export function HomeView() {
  const productsQuery = useProducts({ sort: 'featured' });
  const pantheonQuery = usePantheonArchetypes();
  const products = productsQuery.data ?? [];
  const { featuredProduct, relatedProducts, selectedSlug, setSelectedSlug } = useHomeFeaturedProduct(products);

  if (productsQuery.isLoading) {
    return (
      <main className="page-shell xeorum-home-page">
        <LoadingState title="Cargando home" description="Preparando producto, identidad y conversion visible." variant="panel" />
      </main>
    );
  }

  if (productsQuery.isError) {
    return (
      <main className="page-shell xeorum-home-page">
        <ErrorState title="Home no disponible" description="No pudimos cargar la seleccion principal del home." />
      </main>
    );
  }

  if (!featuredProduct) {
    return (
      <main className="page-shell xeorum-home-page">
        <EmptyState title="Sin producto protagonista" description="Publica productos para activar la experiencia completa del home." />
      </main>
    );
  }

  const portals = pantheonQuery.data
    ? orderPantheonArchetypes(pantheonQuery.data).slice(0, 4).map((portal) => ({
        slug: portal.slug,
        name: portal.name.toUpperCase(),
        title: portal.coreEnergy,
        body: portal.shortManifesto,
        note: portal.corePhrase,
      }))
    : homePortalFallbacks;

  return (
    <main className="page-shell xeorum-home-page">
      <HomeHero product={featuredProduct} />
      <HomeShopAllSection products={products.slice(0, 4)} selectedSlug={selectedSlug} onSelect={setSelectedSlug} />
      <HomeIdentityEngineSection />
      <HomeRitualSection product={featuredProduct} relatedProducts={relatedProducts} />
      <HomePantheonSection portals={portals} />
      <HomeValueSection />
      <HomeConversionSection product={featuredProduct} />
    </main>
  );
}
