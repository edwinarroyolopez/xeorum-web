import React from 'react';
import type { DropContract } from '@xeorum/contracts';
import { Card } from './Card';
import { LinkButton } from './Button';
import { Text } from '../primitives/Text';

export function DropCard({ drop }: Readonly<{ drop: DropContract }>) {
  return (
    <Card className="drop-card">
      <Text tone="muted" className="portal-card-kicker">{drop.status}</Text>
      <h3>{drop.name}</h3>
      <p>{drop.manifesto}</p>
      <LinkButton href={`/drops/${drop.slug}`}>View Drop</LinkButton>
    </Card>
  );
}
