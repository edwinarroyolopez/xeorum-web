import { PantheonDetail } from '../../../../modules/pantheon/PantheonDetail';

export default async function IdentityArchetypePage({ params }: { params: Promise<{ archetype: string }> }) {
  const resolved = await params;
  return (
    <main className="page-shell">
      <PantheonDetail slug={resolved.archetype} />
    </main>
  );
}
