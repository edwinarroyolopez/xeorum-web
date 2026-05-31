import type { Metadata } from 'next';
import { ProductDetail } from '../../../../modules/products/components/ProductDetail';
import {
  buildProductMetadata,
  fallbackProductMetadata,
  getPublicProductServer,
} from '../../../../modules/products/services/products.metadata';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolved = await params;
  const canonicalPath = `/products/${resolved.slug}`;

  try {
    const product = await getPublicProductServer(resolved.slug);
    return buildProductMetadata(product, canonicalPath);
  } catch {
    return fallbackProductMetadata(resolved.slug, canonicalPath);
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolved = await params;
  return (
    <main className="page-shell">
      <ProductDetail slug={resolved.slug} />
    </main>
  );
}
