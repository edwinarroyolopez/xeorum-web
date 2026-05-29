import React from 'react';
import type { PantheonArchetype } from '../../pantheon/pantheon.types';
import { Card } from './Card';
import { LinkButton } from './Button';
import { Text } from '../primitives/Text';

export function PortalCard({ archetype }: Readonly<{ archetype: PantheonArchetype }>) {
  return (
    <Card className="portal-card">
      <div className="portal-card-header">
        <Text tone="muted" className="portal-card-kicker">{archetype.coreEnergy}</Text>
        <div className="portal-card-palette" aria-hidden="true">
          {archetype.palette.slice(0, 4).map((color) => (
            <span key={color} style={{ '--swatch-background': color } as React.CSSProperties} />
          ))}
        </div>
      </div>
      <div className="portal-card-body">
        <h2>{archetype.name}</h2>
        <p className="portal-core-phrase">{archetype.corePhrase}</p>
        <p>{archetype.shortManifesto}</p>
      </div>
      <div className="portal-card-footer">
        <LinkButton href={`/pantheon/${archetype.slug}`}>{archetype.ctaLabel}</LinkButton>
      </div>
    </Card>
  );
}
