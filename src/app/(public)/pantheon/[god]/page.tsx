import type { Metadata } from 'next';
import { PantheonDetail } from '../../../../modules/pantheon/PantheonDetail';
import {
  buildArchetypeMetadata,
  fallbackArchetypeMetadata,
  getPantheonArchetypeLandingServer,
} from '../../../../modules/pantheon/pantheon.metadata';

export async function generateMetadata({ params }: { params: Promise<{ god: string }> }): Promise<Metadata> {
  const resolved = await params;

  try {
    const archetype = await getPantheonArchetypeLandingServer(resolved.god);
    return buildArchetypeMetadata(archetype, {
      path: `/pantheon/${resolved.god}`,
      canonicalPath: `/identity/${resolved.god}`,
    });
  } catch {
    return fallbackArchetypeMetadata(resolved.god, `/identity/${resolved.god}`);
  }
}

export default async function PantheonDetailPage({ params }: { params: Promise<{ god: string }> }) {
  const resolved = await params;

  return (
    <main className="page-shell">
      <PantheonDetail slug={resolved.god} />
    </main>
  );
}
