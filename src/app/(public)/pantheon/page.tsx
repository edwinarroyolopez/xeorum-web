import { PantheonGrid } from '../../../modules/pantheon/PantheonGrid';
import { EditorialHero, LinkButton, SectionHeader, SignalRow } from '../../../modules/design-system';

const pantheonSignals = ['Fuerzas, no categorias', 'Cada portal conduce a producto', 'La lectura afina sin bloquear'] as const;

export default function PantheonPage() {
  return (
    <main className="page-shell xeorum-pantheon-page xeorum-listing-page">
      <section className="hero-shell xeorum-pantheon-hero">
        <div className="xeorum-home-frame xeorum-pantheon-frame">
          <EditorialHero
            kicker="Portales XEORUM"
            title="Explora fuerzas. No categorias."
             description="Cada portal es un territorio editorial donde energia, simbolo y producto se alinean para ayudarte a entrar con mas criterio y menos ruido al universo XEORUM."
            align="center"
            actions={
              <>
                 <LinkButton href="/identity">Iniciar lectura</LinkButton>
                 <LinkButton href="/products" variant="ghost">Ver mercado</LinkButton>
              </>
            }
            supporting={
              <SignalRow ariaLabel="Claves de los portales XEORUM" items={[...pantheonSignals]} />
            }
          />
        </div>
      </section>
      <section className="section-stack xeorum-pantheon-grid-shell">
        <SectionHeader
          kicker="Biblioteca de fuerzas"
           title="Entra por la energia que ya reconoces o deja que la lectura abra el primer portal."
           description="El pantheon no reemplaza el mercado abierto. Lo ordena. Cada portal revela una forma de presencia y la conecta con piezas, drops y simbolos consistentes."
        />
        <PantheonGrid />
      </section>
    </main>
  );
}
