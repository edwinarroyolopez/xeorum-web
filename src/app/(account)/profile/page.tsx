import React from 'react';
import Link from 'next/link';

export default function ProfilePlaceholderPage() {
  return (
    <main className="section-shell">
      <h1>Profile</h1>
      <p>Identity profile shell.</p>
      <Link href="/admin">Internal Tools</Link>
    </main>
  );
}
