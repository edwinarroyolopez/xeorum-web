import { ProductsGrid } from '../../../modules/products/ProductsGrid';
import { LinkButton } from '../../../modules/design-system';

export default function ProductsPage() {
  return (
    <main className="page-shell">
      <section className="hero-shell">
        <p className="portal-card-kicker">Curated Products</p>
        <h1>Identity artifacts, not commodity inventory.</h1>
        <p>Each piece exists as an expression of force, fit, material and symbolic intent.</p>
        <div className="portal-actions">
          <LinkButton href="/pantheon">Explore Pantheon</LinkButton>
          <LinkButton href="/drops" variant="ghost">View Drops</LinkButton>
        </div>
      </section>
      <ProductsGrid />
    </main>
  );
}
