'use client';

import { useState } from 'react';
import { useAdminThemeDrafts, usePublishTheme, useUpdateThemeDraft } from './admin.queries';

export function AdminThemeView() {
  const drafts = useAdminThemeDrafts();
  const updateDraft = useUpdateThemeDraft();
  const publish = usePublishTheme();
  const [formState, setFormState] = useState<Record<string, { accent: string; accentSoft: string; panel: string }>>({});

  if (drafts.isLoading) return <p className="section-state">Loading theme drafts.</p>;
  if (drafts.isError || !drafts.data) return <p className="section-state">Theme drafts unavailable.</p>;

  return (
    <section className="admin-grid">
      {drafts.data.map((entry) => {
        const state = formState[entry.archetypeSlug] ?? {
          accent: entry.accent,
          accentSoft: entry.accentSoft,
          panel: entry.panel,
        };

        return (
          <article key={entry.archetypeSlug} className="admin-card">
            <h2>{entry.archetypeSlug.toUpperCase()}</h2>
            <input value={state.accent} onChange={(event) => setFormState((current) => ({ ...current, [entry.archetypeSlug]: { ...state, accent: event.target.value } }))} />
            <input value={state.accentSoft} onChange={(event) => setFormState((current) => ({ ...current, [entry.archetypeSlug]: { ...state, accentSoft: event.target.value } }))} />
            <input value={state.panel} onChange={(event) => setFormState((current) => ({ ...current, [entry.archetypeSlug]: { ...state, panel: event.target.value } }))} />
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
