import Link from 'next/link';
import type { ProductContract } from '@xeorum/contracts';

export function RecommendationProducts({
  title,
  products,
}: Readonly<{ title: string; products: ProductContract[] }>) {
  if (products.length === 0) return null;

  return (
    <section className="section-stack">
      <div className="section-heading">
        <p className="portal-card-kicker">Recommendations</p>
        <h2>{title}</h2>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <article key={product.slug} className="product-card">
            <p className="portal-card-kicker">{product.energy}</p>
            <h3>{product.name}</h3>
            <p>{product.narrative}</p>
            <div className="product-bottom">
              <strong>{product.identityCompatibility}% match</strong>
              <Link href={`/products/${product.slug}`}>View Product</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
