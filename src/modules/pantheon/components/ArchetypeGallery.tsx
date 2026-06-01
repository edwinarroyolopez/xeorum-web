'use client';

import React from 'react';
import { Badge, EditorialPanel, EmptyState, SectionHeader } from '../../design-system';
import type { ArchetypeLandingViewModel } from '../services';
import { ArchetypeTagList } from './ArchetypeTagList';

export function ArchetypeGallery({ viewModel }: Readonly<{ viewModel: ArchetypeLandingViewModel }>) {
  return (
    <div className="section-stack xeorum-archetype-section">
      <SectionHeader kicker="Galeria editorial" title="Atmosfera visual aprobada." description="Los assets publicados sostienen la narrativa sin convertirse en relleno aspiracional." />
      {viewModel.gallery.length === 0 ? (
        <EmptyState>Todavia no hay galeria aprobada para esta fuerza.</EmptyState>
      ) : (
        <section className="portal-gallery-grid">
          {viewModel.gallery.map((item) => (
            <EditorialPanel key={item.id} className="portal-gallery-card xeorum-archetype-panel">
              {item.videoUrl ? <video aria-label={item.altText} className="portal-gallery-image" controls preload="metadata" src={item.videoUrl} /> : item.imageUrl ? <img src={item.imageUrl} alt={item.altText} className="portal-gallery-image" /> : null}
              <div className="section-stack xeorum-archetype-gallery-meta">
                <Badge size="sm">{item.type.replace(/_/g, ' ')}</Badge>
                <h2>{item.title}</h2>
                {!item.imageUrl && !item.videoUrl ? <EmptyState variant="default" title="Vista editorial disponible" description="La vista editorial sigue disponible mientras se curan imagenes aprobadas." /> : null}
                <ArchetypeTagList items={item.tags} emptyLabel="Todavia no hay tags publicos para esta galeria." />
              </div>
            </EditorialPanel>
          ))}
        </section>
      )}
    </div>
  );
}
