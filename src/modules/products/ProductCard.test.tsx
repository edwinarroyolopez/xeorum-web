import { describe, expect, it } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ProductCard } from './ProductCard';

const product = {
  id: 'product-1',
  slug: 'hades-heavy-tee',
  name: 'Hades Heavy Tee',
  description: 'Description',
  shortDescription: 'Short description',
  pricing: { price: 120, salePrice: 92, compareAtPrice: 120, currency: 'USD' },
  media: { coverImage: { url: 'cover-image', alt: 'Front', type: 'image' as const, role: 'cover' as const }, gallery: [{ url: 'cover-image', alt: 'Front', type: 'image' as const, role: 'cover' as const }] },
  taxonomy: { collectionIds: [], collectionSlugs: [], marketTags: [] },
  archetypes: { primary: { slug: 'hades', score: 100 }, affinities: [{ slug: 'hades', score: 100, role: 'primary' as const }] },
  productDetails: { material: 'Cotton', fit: 'Oversized' },
  variants: [{ id: 'variant-1', sku: 'SKU-M', size: 'M', stockOnHand: 3, stockReserved: 0, stockAvailable: 3, lowStockThreshold: 2, status: 'active' as const, available: true, lowStock: false }],
  seo: { title: 'SEO', description: 'SEO', keywords: [] },
  reviews: { ratingAverage: 0, ratingCount: 0, reviewCount: 0 },
  salesStats: { soldCountDisplayMode: 'hidden' as const },
  merchandising: { isFeatured: true, isBestSeller: false, isNewArrival: false, recommendationTags: [] },
};

describe('ProductCard', () => {
  it('renders price and cover information', () => {
    const html = renderToStaticMarkup(<ProductCard product={product} />);
    expect(html).toContain('Hades Heavy Tee');
    expect(html).toContain('92');
    expect(html).toContain('cover-image');
  });
});
