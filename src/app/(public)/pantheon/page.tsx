import { PantheonGrid } from '../../../modules/pantheon/PantheonGrid';
import { LinkButton } from '../../../modules/design-system';

export default function PantheonPage() {
  return (
    <main className="page-shell">
      <section className="hero-shell">
        <p className="portal-card-kicker">Pantheon</p>
        <h1>Choose the force that mirrors your identity.</h1>
        <p>Each portal is a territory of energy, not a category list.</p>
        <div className="portal-actions">
          <LinkButton href="/identity">Run Identity Test</LinkButton>
          <LinkButton href="/" variant="ghost">Return Home</LinkButton>
        </div>
      </section>
      <PantheonGrid />
    </main>
  );
}
