import { PantheonGrid } from '../../../modules/pantheon/PantheonGrid';
import { EditorialHero, LinkButton } from '../../../modules/design-system';

export default function PantheonPage() {
  return (
    <main className="page-shell xeorum-pantheon-page">
      <section className="hero-shell xeorum-pantheon-hero">
        <div className="xeorum-home-frame xeorum-pantheon-frame">
          <EditorialHero
            kicker="Pantheon"
            title="Explora fuerzas. No categorias."
            description="Cada portal es un territorio editorial donde simbolo, energia y producto se alinean sin romper la experiencia base de XEORUM."
            align="center"
            actions={
              <>
                <LinkButton href="/identity">Descubrir mi fuerza</LinkButton>
                <LinkButton href="/products" variant="ghost">Ver productos</LinkButton>
              </>
            }
          />
        </div>
      </section>
      <section className="section-stack xeorum-pantheon-grid-shell">
        <PantheonGrid />
      </section>
    </main>
  );
}
