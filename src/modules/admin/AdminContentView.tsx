'use client';

import { useState } from 'react';
import { useAdminContentDrafts, usePublishContent, useUpdateContentDraft } from './admin.queries';

export function AdminContentView() {
  const drafts = useAdminContentDrafts();
  const updateDraft = useUpdateContentDraft();
  const publish = usePublishContent();
  const [formState, setFormState] = useState<Record<string, { manifesto: string; visualMood: string; ctaLabel: string }>>({});

  if (drafts.isLoading) return <p className="section-state">Loading content drafts.</p>;
  if (drafts.isError || !drafts.data) return <p className="section-state">Content drafts unavailable.</p>;

  return (
    <section className="admin-grid">
      {drafts.data.map((entry) => {
        const state = formState[entry.archetypeSlug] ?? {
          manifesto: entry.manifesto,
          visualMood: entry.visualMood,
          ctaLabel: entry.ctaLabel,
        };

        return (
          <article key={entry.archetypeSlug} className="admin-card">
            <h2>{entry.archetypeSlug.toUpperCase()}</h2>
            <textarea value={state.manifesto} onChange={(event) => setFormState((current) => ({ ...current, [entry.archetypeSlug]: { ...state, manifesto: event.target.value } }))} />
            <input value={state.visualMood} onChange={(event) => setFormState((current) => ({ ...current, [entry.archetypeSlug]: { ...state, visualMood: event.target.value } }))} />
            <input value={state.ctaLabel} onChange={(event) => setFormState((current) => ({ ...current, [entry.archetypeSlug]: { ...state, ctaLabel: event.target.value } }))} />
            <div className="portal-actions">
              <button type="button" onClick={() => updateDraft.mutate({ slug: entry.archetypeSlug, body: state })}>Save Draft</button>
              <button type="button" onClick={() => publish.mutate(entry.archetypeSlug)}>Publish</button>
            </div>
          </article>
        );
      })}
    </section>
  );
}
