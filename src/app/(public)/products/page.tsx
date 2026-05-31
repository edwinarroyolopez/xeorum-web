import { ProductsGrid } from '../../../modules/products/ProductsGrid';
import { EditorialHero, LinkButton, SignalRow } from '../../../modules/design-system';

const productSignals = ['Compra directa', 'Lectura opcional', 'Curaduria por presencia'] as const;

export default function ProductsPage() {
  return (
    <main className="page-shell xeorum-pantheon-page xeorum-listing-page">
      <section className="section-shell xeorum-pantheon-hero xeorum-listing-hero">
        <div className="xeorum-home-frame xeorum-pantheon-frame">
          <EditorialHero
             kicker="Shop All"
             title="Mercado abierto. Curaduria intacta."
             description="Explora piezas listas para entrar en rotacion: media valida, precio claro, disponibilidad real y una lectura identitaria que sostiene el deseo sin volverlo ruido ceremonial."
            align="center"
             actions={
               <>
                  <LinkButton href="/pantheon">Explorar portales</LinkButton>
                  <LinkButton href="/drops" variant="ghost">Ver drops</LinkButton>
               </>
             }
              supporting={
                <SignalRow ariaLabel="Claves del mercado abierto XEORUM" items={[...productSignals]} />
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
