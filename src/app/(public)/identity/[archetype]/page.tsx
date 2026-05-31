import type { Metadata } from 'next';
import { PantheonDetail } from '../../../../modules/pantheon/PantheonDetail';
import {
  buildArchetypeMetadata,
  fallbackArchetypeMetadata,
  getPantheonArchetypeLandingServer,
} from '../../../../modules/pantheon/pantheon.metadata';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ archetype: string }> }): Promise<Metadata> {
  const resolved = await params;

  try {
    const archetype = await getPantheonArchetypeLandingServer(resolved.archetype);
    return buildArchetypeMetadata(archetype, {
      path: `/identity/${resolved.archetype}`,
      canonicalPath: `/identity/${resolved.archetype}`,
    });
  } catch {
    return fallbackArchetypeMetadata(resolved.archetype, `/identity/${resolved.archetype}`);
  }
}

export default async function IdentityArchetypePage({ params }: { params: Promise<{ archetype: string }> }) {
  const resolved = await params;

  return (
    <main className="page-shell">
      <PantheonDetail slug={resolved.archetype} />
    </main>
  );
}
