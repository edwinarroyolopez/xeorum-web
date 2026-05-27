import Link from 'next/link';
import type { Product } from './products.types';

export function ProductCard({ product }: Readonly<{ product: Product }>) {
  return (
    <article className="product-card">
      <p className="portal-card-kicker">{product.energy}</p>
      <h3>{product.name}</h3>
      <p>{product.narrative}</p>
      <div className="product-meta">
        <span>{product.fit}</span>
        <span>{product.material}</span>
        <span>{product.gsm} GSM</span>
      </div>
      <div className="product-bottom">
        <strong>{product.price} {product.currency}</strong>
        <Link href={`/products/${product.slug}`}>View Product</Link>
      </div>
    </article>
  );
}
