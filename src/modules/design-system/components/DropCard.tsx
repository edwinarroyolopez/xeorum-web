import React from 'react';
import type { DropContract } from '@xeorum/contracts';
import { Badge } from './Badge';
import { Card } from './Card';
import { LinkButton } from './Button';
import { Text } from '../primitives/Text';

export function DropCard({ drop }: Readonly<{ drop: DropContract }>) {
  const dropStatus = String(drop.status).replace(/_/g, ' ');

  return (
    <Card className="drop-card">
      <div className="drop-card-visual">
        <div className="portal-card-visual-shine" />
        <p className="drop-card-visual-label">Limited Drop</p>
        <h3>{drop.name}</h3>
      </div>
      <div className="portal-card-header">
        <Badge tone="accent" size="sm">{dropStatus}</Badge>
      </div>
      <div className="portal-card-body">
        <p className="portal-core-phrase">Concentracion simbolica en edicion limitada.</p>
        <p>{drop.manifesto}</p>
      </div>
      <div className="portal-card-footer">
        <Text tone="secondary" className="portal-card-angle">Pocas piezas, lectura alta, narrativa cerrada.</Text>
        <LinkButton href={`/drops/${drop.slug}`}>Ver drop</LinkButton>
      </div>
    </Card>
  );
}
