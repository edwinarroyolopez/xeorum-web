import { BrandMark } from '../components/ui/BrandMark';
import { PantheonGrid } from '../modules/pantheon/PantheonGrid';
import { LinkButton, SectionHeader } from '../modules/design-system';

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero-shell">
        <BrandMark />
        <p className="home-copy">Identity-first commerce system.</p>
        <div className="portal-actions">
          <LinkButton href="/identity" className="home-link">Enter Identity Test</LinkButton>
          <LinkButton href="/pantheon" className="home-link">Explore Pantheon</LinkButton>
        </div>
      </section>
      <section className="section-stack">
        <SectionHeader kicker="Pantheon Portals" title="Territories of identity." />
        <PantheonGrid />
      </section>
    </main>
  );
}
