import { ProductsGrid } from '../../../modules/products/components/ProductsGrid';
import { PageHeader } from '../../../modules/design-system';

export default function ProductsPage() {
  return (
    <main className="page-shell xeorum-pantheon-page xeorum-listing-page">
      <section className="hero-shell xeorum-pantheon-hero xeorum-listing-hero">
        <PageHeader
          kicker="Shop all · Xeorum"
          title="Producto primero."
          description="Identidad cuando afina la decisión."
        />
      </section>
      <section className="section-stack xeorum-pantheon-grid-shell xeorum-listing-grid-shell">
        <ProductsGrid />
      </section>
    </main>
  );
}
