import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { CuratedProductsRail } from './CuratedProductsRail';
import { RelatedProductsRail } from './RelatedProductsRail';
import { RecommendationProducts } from '../ai-recommendations/RecommendationProducts';
import { RecommendationDrops } from '../ai-recommendations/RecommendationDrops';

const useProducts = vi.fn();

vi.mock('./products.queries', () => ({
  useProducts: (...args: unknown[]) => useProducts(...args),
}));

const products = [
  {
    id: 'product-1',
    slug: 'hades-heavy-tee',
    name: 'Hades Heavy Tee',
    description: 'Description',
    shortDescription: 'Short description',
    pricing: { price: 120, salePrice: 92, compareAtPrice: 120, currency: 'USD' },
    media: {
      coverImage: { url: 'https://cdn.example.com/cover-image.jpg', alt: 'Front', type: 'image' as const, role: 'cover' as const },
      gallery: [{ url: 'https://cdn.example.com/cover-image.jpg', alt: 'Front', type: 'image' as const, role: 'cover' as const }],
    },
    taxonomy: { collectionIds: [], collectionSlugs: [], marketTags: [], dropSlug: 'obsidian-throne' },
    archetypes: { primary: { slug: 'hades', score: 100 }, affinities: [{ slug: 'hades', score: 100, role: 'primary' as const }] },
    productDetails: { material: 'Cotton', fit: 'Oversized', color: 'Void Black' },
    variants: [{ id: 'variant-1', sku: 'SKU-M', size: 'M', stockOnHand: 3, stockReserved: 0, stockAvailable: 3, lowStockThreshold: 2, status: 'active' as const, available: true, lowStock: false }],
    seo: { title: 'SEO', description: 'SEO', keywords: [] },
    reviews: { ratingAverage: 0, ratingCount: 0, reviewCount: 0 },
    salesStats: { soldCountDisplayMode: 'hidden' as const },
    merchandising: { isFeatured: true, isBestSeller: false, isNewArrival: false, recommendationTags: [] },
  },
];

const drops = [
  {
    id: 'drop-1',
    slug: 'zeus-night',
    name: 'Zeus Night',
    status: 'SCHEDULED' as const,
    archetypeSlug: 'zeus',
    manifesto: 'Command after dark.',
    visualMood: 'Storm-lit evening authority.',
  },
];

describe('Editorial rails', () => {
  it('renders related products with editorial reason panel', () => {
    const html = renderToStaticMarkup(
      <RelatedProductsRail
        kicker="Misma fuerza"
        title="Piezas que sostienen el mismo eje."
        reason="Comparten afinidad arquetipica y mantienen una lectura coherente."
        products={products}
      />,
    );

    expect(html).toContain('Piezas que sostienen el mismo eje.');
    expect(html).toContain('Por que esta seleccion sigue el mismo eje.');
    expect(html).toContain('Hades Heavy Tee');
  });

  it('renders curated rail with editorial intro', () => {
    useProducts.mockReturnValue({ isLoading: false, isError: false, data: products });

    const html = renderToStaticMarkup(
      <CuratedProductsRail kicker="Curaduria" title="Seleccion serena" description="Producto visible primero." />,
    );

    expect(html).toContain('Seleccion serena');
    expect(html).toContain('Entradas curadas para abrir la exploracion con menos ruido.');
    expect(html).toContain('Hades Heavy Tee');
  });

  it('renders recommendation rails for products and drops', () => {
    const html = renderToStaticMarkup(
      <>
        <RecommendationProducts title="Seleccion alineada" reason="Continuidad sin acumulacion." products={products} />
        <RecommendationDrops drops={drops} reason="Mantienen el mismo tono." />
      </>,
    );

    expect(html).toContain('Seleccion alineada');
    expect(html).toContain('La seleccion sigue continuidad, no acumulacion.');
    expect(html).toContain('Drops que prolongan la misma lectura de presencia.');
    expect(html).toContain('Zeus Night');
  });
});
