import { BrandMark } from '../components/ui/BrandMark';
import Link from 'next/link';
import { PantheonGrid } from '../modules/pantheon/PantheonGrid';

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero-shell">
        <BrandMark />
        <p className="home-copy">Identity-first commerce system.</p>
        <div className="portal-actions">
          <Link href="/identity" className="home-link">Enter Identity Test</Link>
          <Link href="/pantheon" className="home-link">Explore Pantheon</Link>
        </div>
      </section>
      <section className="section-stack">
        <div className="section-heading">
          <p className="portal-card-kicker">Pantheon Portals</p>
          <h2>Territories of identity.</h2>
        </div>
        <PantheonGrid />
      </section>
    </main>
  );
}
