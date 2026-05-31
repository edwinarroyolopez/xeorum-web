import { DropsGrid } from '../../../modules/drops/DropsGrid';
import { EditorialHero, LinkButton, SectionHeader, SignalRow } from '../../../modules/design-system';

const dropSignals = ['Series limitadas', 'Narrativa cerrada', 'Alta concentracion simbolica'] as const;

export default function DropsPage() {
  return (
    <main className="page-shell xeorum-pantheon-page xeorum-listing-page">
      <section className="hero-shell xeorum-pantheon-hero">
        <div className="xeorum-home-frame xeorum-pantheon-frame">
          <EditorialHero
            kicker="Drops XEORUM"
            title="Lanzamientos limitados, alta concentracion simbolica."
            description="XEORUM crece a traves de pocos drops, deliberados y con una identidad custodiada. El volumen baja para que la carga narrativa y comercial suba."
            align="center"
            actions={
              <>
                <LinkButton href="/products">Ver productos</LinkButton>
                <LinkButton href="/identity" variant="ghost">Iniciar test de identidad</LinkButton>
              </>
            }
            supporting={
              <SignalRow ariaLabel="Claves de los drops XEORUM" items={[...dropSignals]} />
            }
          />
        </div>
      </section>
      <section className="section-stack xeorum-pantheon-grid-shell">
        <SectionHeader
          kicker="Ritmo de lanzamiento"
          title="Pocas salidas. Mucha intencion."
          description="Cada drop concentra tono, escasez y direccion de presencia. No reemplaza al mercado abierto: lo tensa y lo enfoca."
        />
        <DropsGrid />
      </section>
    </main>
  );
}
