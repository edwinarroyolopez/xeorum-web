import type { Metadata } from 'next';
import { PantheonDetail } from '../../../../modules/pantheon/PantheonDetail';
import { getPantheonPath } from '../../../../modules/pantheon/pantheon.routes';
import {
  buildArchetypeMetadata,
  fallbackArchetypeMetadata,
  getPantheonArchetypeLandingServer,
} from '../../../../modules/pantheon/services';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ god: string }> }): Promise<Metadata> {
  const resolved = await params;

  try {
    const archetype = await getPantheonArchetypeLandingServer(resolved.god);
    return buildArchetypeMetadata(archetype, {
      path: getPantheonPath(resolved.god),
      canonicalPath: getPantheonPath(resolved.god),
    });
  } catch {
    return fallbackArchetypeMetadata(resolved.god, getPantheonPath(resolved.god));
  }
}

export default async function PantheonDetailPage({ params }: { params: Promise<{ god: string }> }) {
  const resolved = await params;

  return (
    <main className="page-shell xeorum-archetype-page">
      <PantheonDetail slug={resolved.god} />
    </main>
  );
}
