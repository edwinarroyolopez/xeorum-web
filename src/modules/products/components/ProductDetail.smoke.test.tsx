import { describe, expect, it, vi } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ProductDetail } from './ProductDetail';

const useProduct = vi.fn();
const useRecommendationsForProduct = vi.fn();

vi.mock('../hooks/products.queries', () => ({
  useProduct: (...args: unknown[]) => useProduct(...args),
}));

vi.mock('../../ai-recommendations/recommendations.queries', () => ({
  useRecommendationsForProduct: (...args: unknown[]) => useRecommendationsForProduct(...args),
}));

vi.mock('../../cart/AddToCartButton', () => ({
  AddToCartButton: ({ size, disabled }: { size?: string; disabled?: boolean }) => <div>AddToCart:{size ?? 'none'}:{disabled ? 'disabled' : 'active'}</div>,
}));

vi.mock('../../ai-recommendations/RecommendationDrops', () => ({ RecommendationDrops: () => null }));

const product = {
  id: 'product-1',
  slug: 'hades-heavy-tee',
  name: 'Hades Heavy Tee',
  description: 'Description first',
  narrative: 'Narrative later',
  pricing: { price: 120, salePrice: 92, currency: 'USD' },
  media: { coverImage: { url: 'https://cdn.example.com/cover-image.jpg', alt: 'Front', type: 'image' as const, role: 'cover' as const }, gallery: [{ url: 'https://cdn.example.com/cover-image.jpg', alt: 'Front', type: 'image' as const, role: 'cover' as const }] },
  taxonomy: { collectionSlugs: [], marketTags: ['limited'], dropSlug: 'obsidian-throne' },
  archetypes: { primary: { slug: 'hades', score: 100 }, affinities: [{ slug: 'hades', score: 100, role: 'primary' as const }] },
  productDetails: { material: 'Cotton', fit: 'Oversized', color: 'Black', gsm: 280, careInstructions: ['Lavado frio'] },
  variants: [
    { id: 'variant-1', sku: 'SKU-M', size: 'M', stockOnHand: 3, stockReserved: 0, stockAvailable: 3, lowStockThreshold: 2, status: 'active' as const, available: true, lowStock: false },
  ],
  seo: { title: 'SEO', description: 'SEO', keywords: [] },
  reviews: { ratingAverage: 0, ratingCount: 0, reviewCount: 0 },
  salesStats: { soldCountDisplayMode: 'hidden' as const },
  merchandising: { isFeatured: false, isBestSeller: false, isNewArrival: false, recommendationTags: [] },
};

describe('frontend smoke', () => {
  it('renders the real product detail structure', () => {
    useProduct.mockReturnValue({ isLoading: false, isError: false, data: product });
    useRecommendationsForProduct.mockReturnValue({ data: null });

    const html = renderToStaticMarkup(<ProductDetail slug="hades-heavy-tee" />);
    expect(html).toContain('Hades Heavy Tee');
    expect(html).toContain('Esenciales tecnicos');
    expect(html).toContain('Contexto comercial');
  });
});
