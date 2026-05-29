import React from 'react';
import type { DropContract } from '@xeorum/contracts';
import { Card } from './Card';
import { LinkButton } from './Button';
import { Text } from '../primitives/Text';

export function DropCard({ drop }: Readonly<{ drop: DropContract }>) {
  return (
    <Card className="drop-card">
      <div className="portal-card-header">
        <Text tone="muted" className="portal-card-kicker">{drop.status}</Text>
      </div>
      <div className="portal-card-body">
        <h3>{drop.name}</h3>
        <p>{drop.manifesto}</p>
      </div>
      <div className="portal-card-footer">
        <LinkButton href={`/drops/${drop.slug}`}>Ver drop</LinkButton>
      </div>
    </Card>
  );
}
