import { describe, expect, it, vi } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ProductsGrid } from './ProductsGrid';

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
    media: { coverImage: { url: 'https://cdn.example.com/cover-image.jpg', alt: 'Front', type: 'image' as const, role: 'cover' as const }, gallery: [{ url: 'https://cdn.example.com/cover-image.jpg', alt: 'Front', type: 'image' as const, role: 'cover' as const }] },
    taxonomy: { collectionIds: [], collectionSlugs: [], marketTags: [] },
    archetypes: { primary: { slug: 'hades', score: 100 }, affinities: [{ slug: 'hades', score: 100, role: 'primary' as const }] },
    productDetails: { material: 'Cotton', fit: 'Oversized' },
    variants: [{ id: 'variant-1', sku: 'SKU-M', size: 'M', stockOnHand: 3, stockReserved: 0, stockAvailable: 3, lowStockThreshold: 2, status: 'active' as const, available: true, lowStock: false }],
    seo: { title: 'SEO', description: 'SEO', keywords: [] },
    reviews: { ratingAverage: 0, ratingCount: 0, reviewCount: 0 },
    salesStats: { soldCountDisplayMode: 'hidden' as const },
    merchandising: { isFeatured: true, isBestSeller: false, isNewArrival: false, recommendationTags: [] },
  },
];

describe('ProductsGrid', () => {
  it('renders published products from the public query', () => {
    useProducts.mockReturnValue({ isLoading: false, isError: false, data: products });

    const html = renderToStaticMarkup(<ProductsGrid />);

    expect(html).toContain('Selección abierta');
    expect(html).toContain('Curaduria XEORUM');
    expect(html).toContain('Hades Heavy Tee');
    expect(html).toContain('92');
  });
});
