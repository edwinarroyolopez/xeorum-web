import { BrandMark } from '../components/ui/BrandMark';
import { CuratedProductsRail } from '../modules/products/CuratedProductsRail';
import { PantheonGrid } from '../modules/pantheon/PantheonGrid';
import { EditorialHero, LinkButton, SectionHeader } from '../modules/design-system';

const entryPoints = [
  {
    title: 'Ver productos',
    body: 'Entrada directa al mercado curado: piezas premium, disponibilidad real y compra sin prerrequisitos.',
    href: '/products',
    cta: 'Entrar al mercado',
  },
  {
    title: 'Explorar portales',
    body: 'Recorre fuerzas, simbolos y atmosferas sin perder salida comercial. Cada portal conduce a piezas reales.',
    href: '/pantheon',
    cta: 'Abrir portales',
  },
  {
    title: 'Descubrir mi fuerza',
    body: 'Un test breve para traducir deseo, presencia y simbolo en una lectura util para elegir mejor.',
    href: '/identity',
    cta: 'Hacer el test',
  },
] as const;

const homeSignals = ['Streetwear premium', 'Compra directa sin test', 'Identidad cuando aporta criterio'] as const;

export default function HomePage() {
  return (
    <main className="page-shell xeorum-home">
      <section className="hero-shell xeorum-home-hero">
        <div className="xeorum-home-frame">
          <BrandMark />
          <EditorialHero
            kicker="XEORUM"
            title="Piezas premium con identidad profunda."
            description="XEORUM une producto deseable, simbolo y lectura arquetipica sin bloquear la compra. Puedes entrar por mercado abierto, por portales o por tu propia fuerza."
            align="center"
            actions={
              <>
                <LinkButton href="/products" variant="primary">Ver productos</LinkButton>
                <LinkButton href="/identity" variant="ghost">Descubrir mi fuerza</LinkButton>
              </>
            }
            supporting={
              <div className="hero-signal-row" aria-label="Senales clave de la experiencia XEORUM">
                {homeSignals.map((signal) => <span key={signal}>{signal}</span>)}
              </div>
            }
          />
          <section className="xeorum-flow-grid" aria-label="Entradas principales de XEORUM">
            {entryPoints.map((item) => (
              <article key={item.title} className="xeorum-flow-card xeorum-entry-card">
                <p className="xeorum-flow-step">Entrada</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <LinkButton href={item.href} variant={item.href === '/products' ? 'primary' : 'ghost'}>{item.cta}</LinkButton>
              </article>
            ))}
          </section>
        </div>
      </section>

      <section className="section-stack xeorum-home-systems">
        <SectionHeader
          kicker="Entrada comercial"
          title="Producto visible desde el primer recorrido."
          description="El deseo no necesita una explicacion larga. Empieza viendo piezas reales y profundiza en identidad solo cuando te aporte contexto."
        />
        <CuratedProductsRail
          kicker="Seleccion abierta"
          title="Piezas para entrar ahora."
          description="Una primera lectura sobria del mercado XEORUM: presencia, materialidad y compra clara."
        />
      </section>

      <section className="section-stack xeorum-home-pantheon">
        <SectionHeader
          kicker="Profundidad editorial"
          title="El panteon organiza fuerzas, no decoracion."
          description="Cada portal traduce una energia en simbolo, tono y piezas curadas sin romper la arquitectura base de la experiencia."
        />
        <PantheonGrid />
      </section>

      <section className="section-stack xeorum-home-ritual">
        <SectionHeader
          kicker="Promesa XEORUM"
          title="Primero claridad. Despues deseo. Despues identidad."
          description="Si aun no sabes que fuerza te define, empieza por producto. Si quieres mas precision, el test y los portales convierten esa intuicion en criterio real de seleccion."
          align="center"
          actions={
              <>
              <LinkButton href="/identity" variant="primary">Descubrir mi fuerza</LinkButton>
              <LinkButton href="/pantheon" variant="ghost">Explorar el pantheon</LinkButton>
            </>
          }
        />
      </section>
    </main>
  );
}
