'use client';

import { useAdminAudit, useAdminPrompts } from './admin.queries';

export function AdminAuditView() {
  const audit = useAdminAudit();
  const prompts = useAdminPrompts();

  if (audit.isLoading || prompts.isLoading) return <p className="section-state">Loading audit.</p>;
  if (audit.isError || prompts.isError || !audit.data || !prompts.data) return <p className="section-state">Audit unavailable.</p>;

  return (
    <section className="section-stack">
      <article className="admin-card">
        <h2>Prompt Registry</h2>
        {prompts.data.map((prompt) => (
          <p key={prompt.name}>{prompt.name} · v{prompt.version} · {prompt.status}</p>
        ))}
      </article>
      <section className="admin-grid">
        {audit.data.map((entry) => (
          <article key={entry.id} className="admin-card">
            <h3>{entry.action}</h3>
            <p>{entry.target} · {entry.targetId}</p>
            <p>{entry.actor}</p>
            <p>{new Date(entry.createdAt).toLocaleString()}</p>
          </article>
        ))}
      </section>
    </section>
  );
}
