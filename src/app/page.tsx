import { BrandMark } from '../components/ui/BrandMark';
import { PantheonGrid } from '../modules/pantheon/PantheonGrid';
import { LinkButton, SectionHeader } from '../modules/design-system';

const customerFlow = [
  {
    step: '01',
    title: 'Descubre',
    body: 'El cliente entra por una experiencia inmersiva, sobria y simbolica.',
  },
  {
    step: '02',
    title: 'Se conoce',
    body: 'Responde el test de identidad y activa una lectura guiada por IA.',
  },
  {
    step: '03',
    title: 'Descubre sus dioses',
    body: 'Recibe su composicion arquetipica, afinidades y energia dominante.',
  },
  {
    step: '04',
    title: 'Explora su territorio',
    body: 'Entra al universo visual de cada dios y reconoce su estetica.',
  },
  {
    step: '05',
    title: 'Elige su expresion',
    body: 'Ve piezas con significado y selecciona simbolos alineados a su perfil.',
  },
  {
    step: '06',
    title: 'Vive el ritual',
    body: 'Compra con una experiencia clara, elegante y ceremonial.',
  },
  {
    step: '07',
    title: 'Profundiza y evoluciona',
    body: 'Su perfil persiste, evoluciona y desbloquea nuevas capas de identidad.',
  },
] as const;

const systemCapabilities = [
  {
    title: 'AI & Identity Engine',
    body: 'Procesa respuestas, detecta patrones y convierte senales en lectura arquetipica.',
  },
  {
    title: 'Pantheon System',
    body: 'Organiza dioses, mitos, atributos, territorios y relaciones entre arquetipos.',
  },
  {
    title: 'Content & Theme Engine',
    body: 'Entrega contenido y atmosfera visual con un tono consistente por contexto.',
  },
  {
    title: 'Product & Drop System',
    body: 'Conecta identidad con piezas, colecciones y lanzamientos de edicion limitada.',
  },
  {
    title: 'Commerce & Fulfillment',
    body: 'Sostiene pagos, inventario, checkout, ordenes y trazabilidad operativa.',
  },
  {
    title: 'User Profile & Evolution',
    body: 'Guarda el historial del usuario y habilita recorridos de identidad mas profundos.',
  },
] as const;

export default function HomePage() {
  return (
    <main className="page-shell xeorum-home">
      <section className="hero-shell xeorum-home-hero">
        <div className="xeorum-home-frame">
          <div className="xeorum-home-heading">
            <p className="xeorum-home-eyebrow">El flujo del cliente</p>
            <BrandMark />
            <h2 className="xeorum-home-title">Del autoconocimiento a la expresion.</h2>
            <p className="xeorum-home-copy">
              XEORUM no es una tienda. Es un sistema de identidad estetica donde cada paso revela al cliente y cada
              pieza convierte esa lectura en presencia.
            </p>
          </div>
          <div className="portal-actions xeorum-home-actions">
            <LinkButton href="/identity" variant="primary">Iniciar test de identidad</LinkButton>
            <LinkButton href="/pantheon" variant="ghost">Explorar panteon</LinkButton>
          </div>
          <section className="xeorum-flow-grid" aria-label="Flujo de experiencia XEORUM">
            {customerFlow.map((item) => (
              <article key={item.step} className="xeorum-flow-card">
                <p className="xeorum-flow-step">{item.step}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </section>
          <p className="xeorum-home-mantra">Cada paso revela. Cada eleccion afirma. Cada pieza te recuerda quien eres.</p>
        </div>
      </section>

      <section className="section-stack xeorum-home-systems">
        <SectionHeader kicker="Lo que hace posible la experiencia" title="Backstage del sistema XEORUM" />
        <div className="xeorum-capability-grid">
          {systemCapabilities.map((item) => (
            <article key={item.title} className="xeorum-capability-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-stack xeorum-home-pantheon">
        <SectionHeader kicker="Territorios vivos" title="Explora los dioses y sus cambios sutiles." />
        <PantheonGrid />
      </section>
    </main>
  );
}
