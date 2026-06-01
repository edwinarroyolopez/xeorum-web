import React from 'react';
import Link from 'next/link';
import type { PantheonArchetype } from '../../pantheon/pantheon.types';
import { ActionRow } from './ActionRow';
import { Badge } from './Badge';
import { Card } from './Card';
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
  const portrait = archetype.galleryPreview.find((item) => item.imageUrl)?.imageUrl;
  const portraitAlt = archetype.galleryPreview.find((item) => item.imageUrl)?.altText ?? `Imagen editorial de ${archetype.name}`;
  const href = `/identity/${archetype.slug}`;

  return (
    <Card className="portal-card">
      <Link href={href} className="portal-card-link" aria-label={`Entrar al portal de ${archetype.name}`}>
        <div
          className="portal-card-visual"
          style={{
            '--portal-tone-start': palette[0] ?? 'rgba(21, 21, 21, 0.96)',
            '--portal-tone-mid': palette[1] ?? palette[0] ?? 'rgba(42, 36, 22, 0.96)',
            '--portal-tone-end': palette[2] ?? '#030303',
          } as React.CSSProperties}
        >
          <div className="portal-card-visual-shine" />
          {portrait ? (
            <div className="portal-card-avatar-frame">
              <img alt={portraitAlt} className="portal-card-avatar-image" src={portrait} />
            </div>
          ) : (
            <>
              <span className="portal-card-symbol" aria-hidden="true">{symbol}</span>
              <p className="portal-card-visual-mark">XEORUM</p>
              <p className="portal-card-visual-mood">{archetype.visualMood}</p>
            </>
          )}
        </div>
      </Link>
      <div className="portal-card-header">
        <Kicker>{archetype.coreEnergy}</Kicker>
        <div className="portal-card-palette" aria-hidden="true">
          {archetype.palette.slice(0, 4).map((color) => (
            <span key={color} style={{ '--swatch-background': color } as React.CSSProperties} />
          ))}
        </div>
      </div>
      <div className="portal-card-body">
        <h2><Link href={href} className="portal-card-title-link">{archetype.name}</Link></h2>
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
        <Link href={href} className="portal-card-cta">Entrar al portal</Link>
      </div>
    </Card>
  );
}
