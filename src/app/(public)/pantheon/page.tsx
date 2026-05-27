import Link from 'next/link';
import { PantheonGrid } from '../../../modules/pantheon/PantheonGrid';

export default function PantheonPage() {
  return (
    <main className="page-shell">
      <section className="hero-shell">
        <p className="portal-card-kicker">Pantheon</p>
        <h1>Choose the force that mirrors your identity.</h1>
        <p>Each portal is a territory of energy, not a category list.</p>
        <div className="portal-actions">
          <Link href="/identity">Run Identity Test</Link>
          <Link href="/">Return Home</Link>
        </div>
      </section>
      <PantheonGrid />
    </main>
  );
}
