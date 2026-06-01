'use client';

import type { CSSProperties } from 'react';
import React from 'react';
import { DetailFeatureTile, EditorialCollectionIntro, EditorialPanel, EmptyState, SectionHeader } from '../../design-system';
import type { PantheonArchetypeLanding } from '../pantheon.types';
import { ArchetypeTagList } from './ArchetypeTagList';

function PalettePanel({ archetype }: Readonly<{ archetype: PantheonArchetypeLanding }>) {
  if (archetype.visualSystem.palette.length === 0) {
    return <EmptyState variant="default" title="Paleta base XEORUM activa" description="Todavia no hay una paleta publica para esta fuerza; se mantiene el fallback seguro al tema base." />;
  }

  return (
    <div className="section-stack">
      <div className="portal-card-palette">
        {archetype.visualSystem.palette.map((color) => (
          <span key={`${color.name}-${color.hex}`} style={{ '--swatch-background': color.hex } as CSSProperties} title={`${color.name} ${color.hex}`} />
        ))}
      </div>
      <div className="section-stack xeorum-archetype-palette-notes">
        {archetype.visualSystem.palette.map((color) => (
          <p key={`${color.name}-${color.usage}`}>
            <strong>{color.name}</strong>
            {' '}
            {color.usage}
          </p>
        ))}
      </div>
    </div>
  );
}

export function ArchetypeVisualSystem({ archetype }: Readonly<{ archetype: PantheonArchetypeLanding }>) {
  return (
    <div className="section-stack xeorum-archetype-section">
      <SectionHeader kicker="Sistema visual" title={archetype.visualSystem.artDirection} description="Paleta, simbolos, texturas, luz y entorno aprobados para sostener una identidad coherente." />
      <EditorialPanel className="section-stack xeorum-archetype-panel">
        <EditorialCollectionIntro eyebrow="Mood" title={archetype.visualSystem.mood} description={archetype.visualSystem.artDirection} />
      </EditorialPanel>
      <div className="grid-cards">
        <EditorialPanel className="section-stack xeorum-archetype-panel">
          <h3>Paleta</h3>
          <PalettePanel archetype={archetype} />
        </EditorialPanel>
        <DetailFeatureTile title="Simbolos" body={<ArchetypeTagList items={archetype.visualSystem.symbols} emptyLabel="Todavia no hay simbolos publicados." />} />
        <DetailFeatureTile title="Texturas" body={<ArchetypeTagList items={archetype.visualSystem.textures} emptyLabel="Todavia no hay texturas publicadas." />} />
        <DetailFeatureTile title="Luz" body={<ArchetypeTagList items={archetype.visualSystem.lighting} emptyLabel="Todavia no hay direccion de luz publicada." />} />
        <DetailFeatureTile title="Entornos" body={<ArchetypeTagList items={archetype.visualSystem.environments} emptyLabel="Todavia no hay entornos publicados." />} />
      </div>
    </div>
  );
}
