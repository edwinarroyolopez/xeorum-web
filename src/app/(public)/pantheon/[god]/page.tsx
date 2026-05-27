import { PantheonDetail } from '../../../../modules/pantheon/PantheonDetail';

export default async function PantheonDetailPage({ params }: { params: Promise<{ god: string }> }) {
  const resolved = await params;
  return (
    <main className="page-shell">
      <PantheonDetail slug={resolved.god} />
    </main>
  );
}
