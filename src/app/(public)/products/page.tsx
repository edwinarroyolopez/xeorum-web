import { ProductsGrid } from '../../../modules/products/ProductsGrid';
import { LinkButton } from '../../../modules/design-system';

export default function ProductsPage() {
  return (
    <main className="page-shell xeorum-pantheon-page">
      <section className="hero-shell xeorum-pantheon-hero">
        <div className="xeorum-home-frame xeorum-pantheon-frame">
          <p className="portal-card-kicker">Piezas curadas</p>
          <h1>Artefactos de identidad, no inventario sin alma.</h1>
          <p className="xeorum-home-copy">Cada pieza existe como una expresion de fuerza, fit, material y simbolo.</p>
          <div className="portal-actions xeorum-home-actions">
            <LinkButton href="/pantheon">Explorar panteon</LinkButton>
            <LinkButton href="/drops" variant="ghost">Ver drops</LinkButton>
          </div>
        </div>
      </section>
      <section className="section-stack xeorum-pantheon-grid-shell">
        <ProductsGrid />
      </section>
    </main>
  );
}
