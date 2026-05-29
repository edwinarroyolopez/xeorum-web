import { DropsGrid } from '../../../modules/drops/DropsGrid';
import { LinkButton } from '../../../modules/design-system';

export default function DropsPage() {
  return (
    <main className="page-shell xeorum-pantheon-page">
      <section className="hero-shell xeorum-pantheon-hero">
        <div className="xeorum-home-frame xeorum-pantheon-frame">
          <p className="portal-card-kicker">Drops</p>
          <h1>Lanzamientos limitados, alta concentracion simbolica.</h1>
          <p className="xeorum-home-copy">XEORUM crece a traves de pocos drops, deliberados y con una identidad claramente custodiada.</p>
          <div className="portal-actions xeorum-home-actions">
            <LinkButton href="/products">Ver productos</LinkButton>
            <LinkButton href="/identity" variant="ghost">Iniciar test de identidad</LinkButton>
          </div>
        </div>
      </section>
      <section className="section-stack xeorum-pantheon-grid-shell">
        <DropsGrid />
      </section>
    </main>
  );
}
