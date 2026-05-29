import { PantheonGrid } from '../../../modules/pantheon/PantheonGrid';
import { LinkButton } from '../../../modules/design-system';

export default function PantheonPage() {
  return (
    <main className="page-shell xeorum-pantheon-page">
      <section className="hero-shell xeorum-pantheon-hero">
        <div className="xeorum-home-frame xeorum-pantheon-frame">
          <p className="portal-card-kicker">Pantheon</p>
          <h1>Choose the force that mirrors your identity.</h1>
          <p className="xeorum-home-copy">Each portal is a territory of energy, myth and visual language, not a category list.</p>
          <div className="portal-actions xeorum-home-actions">
            <LinkButton href="/identity">Run Identity Test</LinkButton>
            <LinkButton href="/" variant="ghost">Return Home</LinkButton>
          </div>
        </div>
      </section>
      <section className="section-stack xeorum-pantheon-grid-shell">
        <PantheonGrid />
      </section>
    </main>
  );
}
