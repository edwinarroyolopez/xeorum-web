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
  media: { coverImage: { url: 'https://cdn.example.com/cover-image.jpg', alt: 'Front', type: 'image' as const, role: 'cover' as const }, gallery: [{ url: 'https://cdn.example.com/cover-image.jpg', alt: 'Front', type: 'image' as const, role: 'cover' as const }] },
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
  it('renders cover and sale price information', () => {
    const html = renderToStaticMarkup(<ProductCard product={product} />);
    expect(html).toContain('Hades Heavy Tee');
    expect(html).toContain('92');
    expect(html).toContain('120');
    expect(html).toContain('cdn.example.com/cover-image.jpg');
  });

  it('does not render placeholder media urls as final imagery', () => {
    const html = renderToStaticMarkup(
      <ProductCard
        product={{
          ...product,
          media: {
            coverImage: { url: 'editorial-front', alt: 'Front', type: 'image', role: 'cover' },
            gallery: [{ url: 'editorial-front', alt: 'Front', type: 'image', role: 'cover' }],
          },
        }}
      />,
    );

    expect(html).toContain('Media pendiente de publicacion');
    expect(html).not.toContain('src="editorial-front"');
  });
});
