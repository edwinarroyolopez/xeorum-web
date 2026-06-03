import { permanentRedirect } from 'next/navigation';
import { getPantheonPath } from '../../../../modules/pantheon/pantheon.routes';

export default async function IdentityArchetypePage({ params }: { params: Promise<{ archetype: string }> }) {
  const resolved = await params;
  permanentRedirect(getPantheonPath(resolved.archetype));
}
