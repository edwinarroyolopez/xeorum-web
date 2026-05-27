import { ProductDetail } from '../../../../modules/products/ProductDetail';

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolved = await params;
  return (
    <main className="page-shell">
      <ProductDetail slug={resolved.slug} />
    </main>
  );
}
