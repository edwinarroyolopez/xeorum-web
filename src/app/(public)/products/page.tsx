import Link from 'next/link';
import { ProductsGrid } from '../../../modules/products/ProductsGrid';

export default function ProductsPage() {
  return (
    <main className="page-shell">
      <section className="hero-shell">
        <p className="portal-card-kicker">Curated Products</p>
        <h1>Identity artifacts, not commodity inventory.</h1>
        <p>Each piece exists as an expression of force, fit, material and symbolic intent.</p>
        <div className="portal-actions">
          <Link href="/pantheon">Explore Pantheon</Link>
          <Link href="/drops">View Drops</Link>
        </div>
      </section>
      <ProductsGrid />
    </main>
  );
}
