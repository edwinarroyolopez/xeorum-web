import { DropsGrid } from '../../../modules/drops/DropsGrid';
import { LinkButton } from '../../../modules/design-system';

export default function DropsPage() {
  return (
    <main className="page-shell">
      <section className="hero-shell">
        <p className="portal-card-kicker">Drops</p>
        <h1>Limited releases, high symbolic concentration.</h1>
        <p>XEØRUM grows through few, deliberate drops with clear identity ownership.</p>
        <div className="portal-actions">
          <LinkButton href="/products">Browse Products</LinkButton>
          <LinkButton href="/identity" variant="ghost">Run Identity Test</LinkButton>
        </div>
      </section>
      <DropsGrid />
    </main>
  );
}
