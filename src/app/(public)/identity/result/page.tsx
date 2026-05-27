import { IdentityResultView } from '../../../../modules/identity/components/identity-result-view';

export default async function IdentityResultPage({ searchParams }: { searchParams: Promise<{ sessionId?: string }> }) {
  const params = await searchParams;
  return (
    <main className="identity-shell">
      <IdentityResultView sessionId={params.sessionId ?? ''} />
    </main>
  );
}
