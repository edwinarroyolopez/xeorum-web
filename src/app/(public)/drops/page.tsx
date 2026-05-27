import Link from 'next/link';
import { DropsGrid } from '../../../modules/drops/DropsGrid';

export default function DropsPage() {
  return (
    <main className="page-shell">
      <section className="hero-shell">
        <p className="portal-card-kicker">Drops</p>
        <h1>Limited releases, high symbolic concentration.</h1>
        <p>XEØRUM grows through few, deliberate drops with clear identity ownership.</p>
        <div className="portal-actions">
          <Link href="/products">Browse Products</Link>
          <Link href="/identity">Run Identity Test</Link>
        </div>
      </section>
      <DropsGrid />
    </main>
  );
}
