import type { ProductContract } from '@xeorum/contracts';
import { ProductCard, SectionHeader } from '../design-system';

export function RecommendationProducts({
  title,
  products,
}: Readonly<{ title: string; products: ProductContract[] }>) {
  if (products.length === 0) return null;

  return (
    <section className="section-stack">
      <SectionHeader kicker="Recomendaciones" title={title} />
      <div className="product-grid">
        {products.map((product) => <ProductCard key={product.slug} product={product} />)}
      </div>
    </section>
  );
}
