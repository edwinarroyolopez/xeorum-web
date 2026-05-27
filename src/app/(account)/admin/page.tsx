import Link from 'next/link';

export default function AdminPage() {
  return (
    <main className="page-shell">
      <section className="hero-shell">
        <p className="portal-card-kicker">Internal Tools</p>
        <h1>Content, theme, prompts and operational visibility.</h1>
        <div className="portal-actions">
          <Link href="/admin/content">Content</Link>
          <Link href="/admin/theme">Theme</Link>
          <Link href="/admin/orders">Orders</Link>
          <Link href="/admin/audit">Audit</Link>
        </div>
      </section>
    </main>
  );
}
