import React from 'react';
import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { IdentityResultPanel } from './IdentityResultPanel';

describe('IdentityResultPanel', () => {
  it('renders dominant archetype and score summary', () => {
    const html = renderToStaticMarkup(
      <IdentityResultPanel
        result={{
          dominantArchetype: 'zeus',
          secondaryArchetypes: ['athena'],
          confidence: 92,
          narrativeTitle: 'Sovereign Storm',
          narrative: 'A measured force with visible command.',
          scores: {
            zeus: 92,
            hades: 40,
            ares: 35,
            odin: 51,
            anubis: 28,
            athena: 64,
            apollo: 45,
            artemis: 39,
            hermes: 33,
            aphrodite: 22,
          },
          styleAffinity: 80,
          productAffinity: 84,
          promptVersion: 1,
          schemaVersion: 1,
        }}
      />
    );

    expect(html).toContain('ZEUS');
    expect(html).toContain('Afinidad 92%');
    expect(html).toContain('Sovereign Storm');
    expect(html).toContain('Entrar a mi portal');
  });
});
