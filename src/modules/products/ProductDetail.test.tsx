import { describe, expect, it, vi } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ProductDetail } from './ProductDetail';

const useProduct = vi.fn();
const useRecommendationsForProduct = vi.fn();

vi.mock('./products.queries', () => ({
  useProduct: (...args: unknown[]) => useProduct(...args),
}));

vi.mock('../ai-recommendations/recommendations.queries', () => ({
  useRecommendationsForProduct: (...args: unknown[]) => useRecommendationsForProduct(...args),
}));

vi.mock('../cart/AddToCartButton', () => ({
  AddToCartButton: ({ size, disabled }: { size?: string; disabled?: boolean }) => <div>AddToCart:{size ?? 'none'}:{disabled ? 'disabled' : 'active'}</div>,
}));

vi.mock('../ai-recommendations/RecommendationProducts', () => ({ RecommendationProducts: () => null }));
vi.mock('../ai-recommendations/RecommendationDrops', () => ({ RecommendationDrops: () => null }));

const product = {
  id: 'product-1',
  slug: 'hades-heavy-tee',
  name: 'Hades Heavy Tee',
  description: 'Description first',
  narrative: 'Narrative later',
  pricing: { price: 120, salePrice: 92, currency: 'USD' },
  media: { coverImage: { url: 'https://cdn.example.com/cover-image.jpg', alt: 'Front', type: 'image' as const, role: 'cover' as const }, gallery: [{ url: 'https://cdn.example.com/cover-image.jpg', alt: 'Front', type: 'image' as const, role: 'cover' as const }, { url: 'https://cdn.example.com/detail-image.jpg', alt: 'Detail', type: 'image' as const, role: 'detail' as const }] },
  taxonomy: { collectionSlugs: [], marketTags: [], dropSlug: 'obsidian-throne' },
  archetypes: { primary: { slug: 'hades', score: 100 }, affinities: [{ slug: 'hades', score: 100, role: 'primary' as const }] },
  productDetails: { material: 'Cotton', fit: 'Oversized', gsm: 280 },
  variants: [
    { id: 'variant-1', sku: 'SKU-M', size: 'M', stockOnHand: 3, stockReserved: 0, stockAvailable: 3, lowStockThreshold: 2, status: 'active' as const, available: true, lowStock: false },
    { id: 'variant-2', sku: 'SKU-L', size: 'L', stockOnHand: 0, stockReserved: 0, stockAvailable: 0, lowStockThreshold: 2, status: 'out_of_stock' as const, available: false, lowStock: true },
  ],
  seo: { title: 'SEO', description: 'SEO', keywords: [] },
  reviews: { ratingAverage: 0, ratingCount: 0, reviewCount: 0 },
  salesStats: { soldCountDisplayMode: 'hidden' as const },
  merchandising: { isFeatured: false, isBestSeller: false, isNewArrival: false, recommendationTags: [] },
};

describe('ProductDetail', () => {
  it('renders commercial info before narrative', () => {
    useProduct.mockReturnValue({ isLoading: false, isError: false, data: product });
    useRecommendationsForProduct.mockReturnValue({ data: null });

    const html = renderToStaticMarkup(<ProductDetail slug="hades-heavy-tee" />);
    expect(html.indexOf('92')).toBeLessThan(html.indexOf('Narrative later'));
    expect(html).toContain('AddToCart:M:active');
    expect(html).toContain('Talla y disponibilidad');
    expect(html).toContain('disabled=""');
    expect(html).toContain('Agotado');
    expect(html).not.toContain('ratingAverage');
  });
});
