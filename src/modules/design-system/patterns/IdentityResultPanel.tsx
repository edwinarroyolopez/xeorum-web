import React from 'react';
import type { IdentityResult } from '../../identity/identity.types';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Text } from '../primitives/Text';

export function IdentityResultPanel({ result }: Readonly<{ result: IdentityResult }>) {
  return (
    <Card className="identity-result">
      <Text tone="muted" className="identity-kicker">Your Identity</Text>
      <h1>{result.dominantArchetype.toUpperCase()}</h1>
      <Badge tone="accent">Confidence {result.confidence}%</Badge>
      {result.narrativeTitle ? <p className="identity-narrative-title">{result.narrativeTitle}</p> : null}
      {result.narrative ? <p className="identity-narrative-copy">{result.narrative}</p> : null}
      <div className="identity-result-grid">
        {Object.entries(result.scores).map(([slug, score]) => (
          <div key={slug} className="identity-score">
            <span>{slug.toUpperCase()}</span>
            <strong>{String(score)}</strong>
          </div>
        ))}
      </div>
    </Card>
  );
}
