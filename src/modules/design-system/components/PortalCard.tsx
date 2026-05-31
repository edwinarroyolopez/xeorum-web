import React from 'react';
import type { PantheonArchetype } from '../../pantheon/pantheon.types';
import { ActionRow } from './ActionRow';
import { Badge } from './Badge';
import { Card } from './Card';
import { LinkButton } from './Button';
import { Kicker } from '../primitives/Kicker';
import { Text } from '../primitives/Text';

const symbolicMap: Record<string, string> = {
  lightning: 'ϟ',
  crown: '♛',
  sun: '☉',
  spear: '▲',
  rose: '✦',
  mirror: '◈',
  moon: '☽',
};

export function PortalCard({ archetype }: Readonly<{ archetype: PantheonArchetype }>) {
  const symbolKey = archetype.symbols[0]?.toLowerCase();
  const rawSymbol = archetype.symbols[0];
  const symbol = symbolKey && rawSymbol ? symbolicMap[symbolKey] ?? rawSymbol.slice(0, 1).toUpperCase() : '✦';
  const palette = archetype.palette.slice(0, 3);

  return (
    <Card className="portal-card">
      <div
        className="portal-card-visual"
        style={{
          '--portal-tone-start': palette[0] ?? 'rgba(21, 21, 21, 0.96)',
          '--portal-tone-mid': palette[1] ?? palette[0] ?? 'rgba(42, 36, 22, 0.96)',
          '--portal-tone-end': palette[2] ?? '#030303',
        } as React.CSSProperties}
      >
        <div className="portal-card-visual-shine" />
        <span className="portal-card-symbol" aria-hidden="true">{symbol}</span>
        <p className="portal-card-visual-mark">XEORUM</p>
        <p className="portal-card-visual-mood">{archetype.visualMood}</p>
      </div>
      <div className="portal-card-header">
        <Kicker>{archetype.coreEnergy}</Kicker>
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
        {archetype.commerce.marketTags.length > 0 ? (
          <ActionRow className="portal-tag-list" aria-label="Etiquetas de mercado">
            {archetype.commerce.marketTags.slice(0, 2).map((tag) => <Badge key={tag} className="portal-tag" size="sm">{tag}</Badge>)}
          </ActionRow>
        ) : null}
      </div>
      <div className="portal-card-footer">
        <Text tone="secondary" className="portal-card-angle">{archetype.commerce.openMarketAngle}</Text>
        <LinkButton href={`/identity/${archetype.slug}`}>Entrar al portal</LinkButton>
      </div>
    </Card>
  );
}
