'use client';

import React from 'react';
import { EditorialCollectionIntro, EditorialPanel, EmptyState, ProductCard, SectionHeader, SignalRow } from '../../design-system';
import type { PantheonArchetypeLanding } from '../pantheon.types';
import { ArchetypeTagList } from './ArchetypeTagList';

export function ArchetypeProducts({ archetype }: Readonly<{ archetype: PantheonArchetypeLanding }>) {
  return (
    <div className="section-stack xeorum-archetype-section">
      <SectionHeader kicker="Productos alineados" title={archetype.commerce.productHeading} description={archetype.commerce.productSubheading} />
      <EditorialPanel className="section-stack xeorum-archetype-panel">
        <EditorialCollectionIntro eyebrow="Continuidad de presencia" title="Las piezas aparecen despues de fijar la fuerza." description={archetype.commerce.openMarketAngle} />
        <ArchetypeTagList items={archetype.commerce.productCategories} emptyLabel="Todavia no hay categorias publicadas para esta fuerza." />
        {archetype.commerce.marketTags.length ? <SignalRow ariaLabel={`Senales de mercado para ${archetype.name}`} items={archetype.commerce.marketTags} className="xeorum-archetype-market-signals" /> : null}
      </EditorialPanel>
      {archetype.products.length === 0 ? <EmptyState>Todavia no hay piezas publicadas para esta fuerza.</EmptyState> : <section className="product-grid">{archetype.products.map((product) => <ProductCard key={product.slug} product={product} />)}</section>}
    </div>
  );
}
