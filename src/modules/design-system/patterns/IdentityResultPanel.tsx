import React from 'react';
import type { IdentityResult } from '../../identity/identity.types';
import { getPantheonPath } from '../../pantheon/pantheon.routes';
import { ActionRow } from '../components/ActionRow';
import { EditorialCard } from '../components/EditorialCard';
import { EditorialPill } from '../components/EditorialPill';
import { LinkButton } from '../components/Button';
import { DisplayTitle } from '../primitives/DisplayTitle';
import { EditorialBody } from '../primitives/EditorialBody';
import { Eyebrow } from '../primitives/Eyebrow';
import { OrnamentalLine } from '../primitives/OrnamentalLine';

export function IdentityResultPanel({ result }: Readonly<{ result: IdentityResult }>) {
  return (
    <EditorialCard className="identity-result">
      <div className="identity-result-hero">
        <Eyebrow tone="muted" className="identity-kicker">Tu fuerza dominante</Eyebrow>
        <DisplayTitle as="h1" size="lg">{result.dominantArchetype.toUpperCase()}</DisplayTitle>
        <OrnamentalLine />
        <div className="identity-result-badges">
          <EditorialPill tone="accent">Afinidad {result.confidence}%</EditorialPill>
          <EditorialPill>Style {result.styleAffinity}%</EditorialPill>
          <EditorialPill>Product {result.productAffinity}%</EditorialPill>
        </div>
      </div>
      {result.narrativeTitle ? <DisplayTitle as="h2">{result.narrativeTitle}</DisplayTitle> : null}
      {result.narrative ? <EditorialBody className="identity-narrative-copy">{result.narrative}</EditorialBody> : null}
      <ActionRow className="portal-actions identity-result-actions">
        <LinkButton href={getPantheonPath(result.dominantArchetype)} variant="primary">Entrar a mi portal</LinkButton>
        <LinkButton href="/products" variant="ghost">Ver piezas alineadas</LinkButton>
      </ActionRow>
      <div className="identity-result-summary-grid">
        <div className="identity-score">
          <span>Secundarias</span>
          <strong>{result.secondaryArchetypes.length ? result.secondaryArchetypes.map((slug) => slug.toUpperCase()).join(' · ') : 'Ninguna'}</strong>
        </div>
        <div className="identity-score">
          <span>Prompt</span>
          <strong>V{result.promptVersion}</strong>
        </div>
        <div className="identity-score">
          <span>Schema</span>
          <strong>V{result.schemaVersion}</strong>
        </div>
      </div>
      <div className="identity-result-grid">
        {Object.entries(result.scores).map(([slug, score]) => (
          <div key={slug} className="identity-score">
            <span>{slug.toUpperCase()}</span>
            <strong>{String(score)}</strong>
          </div>
        ))}
      </div>
    </EditorialCard>
  );
}
