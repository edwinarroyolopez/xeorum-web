import React from 'react';
import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { ProductCommercialContext } from './ProductCommercialContext';
import { ProductEssentialsGrid } from './ProductEssentialsGrid';
import { ProductHeroGallery } from './ProductHeroGallery';
import { ProductIdentityLink } from './ProductIdentityLink';
import { ProductStoryCard } from './ProductStoryCard';
import { ProductTechnicalTabs } from './ProductTechnicalTabs';

describe('product PDP components', () => {
  it('renders gallery with thumbnails', () => {
    const html = renderToStaticMarkup(
      <ProductHeroGallery
        media={[
          { url: 'https://cdn.example.com/front.jpg', alt: 'Front', type: 'image', role: 'cover' },
          { url: 'https://cdn.example.com/detail.jpg', alt: 'Detail', type: 'image', role: 'detail' },
        ]}
      />,
    );

    expect(html).toContain('Galeria editorial');
    expect(html).toContain('Ver media 2');
  });

  it('renders essentials and technical tabs', () => {
    const html = renderToStaticMarkup(
      <>
        <ProductEssentialsGrid items={[{ label: 'Material', value: 'Cotton' }, { label: 'Fit', value: 'Oversized' }]} />
        <ProductTechnicalTabs
          tabs={[
            { id: 'details', label: 'Detalles', items: [{ label: 'Origen', value: 'Colombia' }] },
            { id: 'care', label: 'Cuidado', items: [{ label: 'Lavado', value: 'Frio' }] },
          ]}
          activeTabId="care"
        />
      </>,
    );

    expect(html).toContain('Esenciales tecnicos');
    expect(html).toContain('Cuidado');
    expect(html).toContain('Frio');
    expect(html).toContain('aria-selected="true"');
  });

  it('renders story and commercial context blocks', () => {
    const html = renderToStaticMarkup(
      <>
        <ProductStoryCard title="La pieza" description={<><p>Descripcion</p><p>Narrativa</p></>} />
        <ProductCommercialContext label="Contexto comercial" description="Lectura final" badges={[{ label: 'Drop Obsidian' }]} />
        <ProductIdentityLink href="/pantheon/hades">Ver por que pertenece a Hades</ProductIdentityLink>
      </>,
    );

    expect(html).toContain('Descripcion');
    expect(html).toContain('Narrativa');
    expect(html).toContain('Drop Obsidian');
    expect(html).toContain('Ver por que pertenece a Hades');
  });
});
