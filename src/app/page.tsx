import { BrandMark } from '../components/ui/BrandMark';
import { CuratedProductsRail } from '../modules/products/CuratedProductsRail';
import { PantheonGrid } from '../modules/pantheon/PantheonGrid';
import { Card, EditorialHero, Kicker, LinkButton, SectionHeader, SignalRow } from '../modules/design-system';

const entryPoints = [
  {
    title: 'Entrar al mercado',
    body: 'Piezas premium, disponibilidad real y compra limpia antes de cualquier mito.',
    href: '/products',
    cta: 'Ver piezas',
  },
  {
    title: 'Abrir portales',
    body: 'Fuerzas, simbolos y atmosfera alineados a producto real, no a decoracion vacia.',
    href: '/pantheon',
    cta: 'Explorar fuerzas',
  },
  {
    title: 'Reclamar mi fuerza',
    body: 'Un test breve para traducir deseo, presencia y simbolo en criterio de seleccion.',
    href: '/identity',
    cta: 'Iniciar lectura',
  },
] as const;

const homeSignals = ['Streetwear premium', 'Compra directa sin friccion', 'Identidad cuando aporta criterio'] as const;

export default function HomePage() {
  return (
    <main className="page-shell xeorum-home">
      <section className="hero-shell xeorum-home-hero">
        <div className="xeorum-home-frame">
          <BrandMark />
          <EditorialHero
             kicker="XEORUM"
             title="No compras ropa. Reclamas presencia."
             description="XEORUM une producto visible, deseo inmediato y lectura arquetipica sin bloquear la compra. Puedes entrar por mercado abierto, por portales o por tu propia fuerza."
             align="center"
            actions={
              <>
                 <LinkButton href="/products" variant="primary">Ver coleccion</LinkButton>
                 <LinkButton href="/identity" variant="ghost">Iniciar lectura</LinkButton>
               </>
             }
              supporting={
              <SignalRow ariaLabel="Senales clave de la experiencia XEORUM" items={[...homeSignals]} />
             }
           />
          <section className="xeorum-flow-grid" aria-label="Entradas principales de XEORUM">
            {entryPoints.map((item) => (
              <Card key={item.title} className="xeorum-entry-card" variant="soft">
                 <Kicker className="xeorum-flow-step">Portal de entrada</Kicker>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <LinkButton href={item.href} variant={item.href === '/products' ? 'primary' : 'ghost'}>{item.cta}</LinkButton>
              </Card>
            ))}
          </section>
        </div>
      </section>

      <section className="section-stack xeorum-home-systems">
        <SectionHeader
          kicker="Entrada comercial"
          title="Producto visible desde el primer recorrido."
          description="El deseo no necesita una explicacion larga. Primero ves piezas reales. La identidad entra solo cuando mejora la decision."
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
          description="Cada portal traduce una energia en simbolo, tono y piezas curadas sin romper la claridad comercial de la experiencia."
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
