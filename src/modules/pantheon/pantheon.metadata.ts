import type { Metadata } from 'next';
import { cache } from 'react';
import { apiClient } from '../../lib/api';
import { parsePantheonArchetypeLanding, type PantheonArchetypeLanding } from './pantheon.types';

export const getPantheonArchetypeLandingServer = cache(async (slug: string) => {
  return parsePantheonArchetypeLanding(await apiClient.get<unknown>(`/pantheon/archetypes/${slug}/landing`));
});

export function buildArchetypeMetadata(
  archetype: PantheonArchetypeLanding,
  input: { path: string; canonicalPath: string },
): Metadata {
  const image = archetype.seo.openGraphImage;

  return {
    title: archetype.seo.title,
    description: archetype.seo.description,
    keywords: archetype.seo.keywords,
    alternates: {
      canonical: input.canonicalPath,
    },
    openGraph: {
      title: archetype.seo.openGraphTitle,
      description: archetype.seo.openGraphDescription,
      url: input.path,
      type: 'website',
      ...(image ? { images: [{ url: image, alt: archetype.name }] } : {}),
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: archetype.seo.openGraphTitle,
      description: archetype.seo.openGraphDescription,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export function fallbackArchetypeMetadata(slug: string, canonicalPath: string): Metadata {
  const title = `${slug} Archetype | XEORUM`;
  const description = 'Explore this XEORUM archetype through identity, narrative, visual mood and related pieces.';

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
