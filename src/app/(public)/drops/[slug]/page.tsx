import { DropDetail } from '../../../../modules/drops/DropDetail';

export default async function DropDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolved = await params;
  return (
    <main className="page-shell">
      <DropDetail slug={resolved.slug} />
    </main>
  );
}
