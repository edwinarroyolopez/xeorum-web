import { ProductsGrid } from '../../../modules/products/ProductsGrid';
import { EditorialHero, LinkButton } from '../../../modules/design-system';

export default function ProductsPage() {
  return (
    <main className="page-shell xeorum-pantheon-page xeorum-listing-page">
      <section className="section-shell xeorum-pantheon-hero xeorum-listing-hero">
        <div className="xeorum-home-frame xeorum-pantheon-frame">
          <EditorialHero
            kicker="Shop All"
            title="Mercado abierto. Curaduria intacta."
            description="Explora piezas listas para entrar en rotacion: media valida, precio claro, disponibilidad real y una lectura identitaria que sostiene el deseo sin volverlo ruido."
            align="center"
            actions={
              <>
                <LinkButton href="/pantheon">Explorar pantheon</LinkButton>
                <LinkButton href="/drops" variant="ghost">Ver drops</LinkButton>
              </>
            }
          />
        </div>
      </section>
      <section className="section-stack xeorum-pantheon-grid-shell xeorum-listing-grid-shell">
        <ProductsGrid />
      </section>
    </main>
  );
}
