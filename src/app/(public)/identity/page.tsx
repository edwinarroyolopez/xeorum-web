import { EditorialHero, LinkButton, SectionHeader, SignalRow } from '../../../modules/design-system';
import { IdentityTestFlow } from '../../../modules/identity/components/identity-test-flow';

const identitySignals = ['12 preguntas o menos', 'Resultado inmediato', 'No bloquea la compra'] as const;

export default function IdentityPage() {
  return (
    <main className="page-shell xeorum-identity-page">
      <section className="hero-shell xeorum-identity-hero">
        <div className="xeorum-home-frame xeorum-identity-frame">
          <EditorialHero
            kicker="Test de identidad"
             title="Descubre que fuerza ordena tu presencia."
             description="Responde con rapidez, sin sobrepensar. Al final recibes una lectura util, acceso a tu portal y una primera seleccion de piezas alineadas a tu forma de entrar en escena."
            align="center"
            actions={
              <>
                 <LinkButton href="/products" variant="ghost">Ver mercado primero</LinkButton>
                 <LinkButton href="/pantheon">Explorar portales</LinkButton>
              </>
            }
            supporting={
              <SignalRow ariaLabel="Senales del test de identidad" items={[...identitySignals]} />
            }
          />
        </div>
      </section>

      <section className="section-stack xeorum-identity-flow-shell">
        <SectionHeader
          kicker="Lectura guiada"
          title="Empieza cuando quieras. Compra si ya lo tienes claro."
           description="XEORUM no usa el test como barrera. Sirve para traducir intuicion, deseo y simbolo en criterio de seleccion cuando quieres mas precision y menos ruido."
          align="center"
        />
        <IdentityTestFlow showIntro={false} />
      </section>
    </main>
  );
}
