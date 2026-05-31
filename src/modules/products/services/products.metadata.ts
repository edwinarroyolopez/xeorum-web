import type { Metadata } from 'next';
import { cache } from 'react';
import type { ProductContract } from '@xeorum/contracts';
import { apiClient } from '../../../lib/api';
import { getPrimaryProductMedia } from './product.helpers';

export const getPublicProductServer = cache(async (slug: string) => {
  return apiClient.get<ProductContract>(`/products/${slug}`);
});

export function buildProductMetadata(product: ProductContract, canonicalPath: string): Metadata {
  const image = product.seo.ogImage ?? getPrimaryProductMedia(product)?.url;
  const title = product.seo.ogTitle ?? product.seo.title ?? `${product.name} | XEORUM`;
  const description = product.seo.ogDescription ?? product.seo.description ?? product.shortDescription ?? product.description;

  return {
    title: product.seo.title || `${product.name} | XEORUM`,
    description,
    keywords: product.seo.keywords,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonicalPath,
      ...(image ? { images: [{ url: image, alt: product.name }] } : {}),
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export function fallbackProductMetadata(slug: string, canonicalPath: string): Metadata {
  const title = `${slug} | XEORUM`;
  const description = 'Discover published XEORUM products with clear pricing, real media, variants and availability.';

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}
