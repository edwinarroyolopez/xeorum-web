import React from 'react';
import type { ProductContract } from '@xeorum/contracts';
import { formatProductLabel } from '../../products/services/product.helpers';
import { homeIdentitySignals } from '../services/home.content';
import { HomeIcon } from './HomeIcon';

export function HomeIdentityPanel({ product }: Readonly<{ product: ProductContract }>) {
  const archetype = formatProductLabel(product.archetypes.primary?.slug ?? 'xeorum').toUpperCase();

  return (
    <aside className="home-identity-panel">
      <div className="home-identity-topline">
        <p className="home-kicker">Identidad viva</p>
        <span className="home-identity-score">68%</span>
      </div>
      <div className="home-identity-card">
        <p>Arquetipo probable</p>
        <h3>{archetype}</h3>
        <span>{formatProductLabel(product.archetypes.primary?.slug ?? '') || 'Dominio visual'}</span>
        <p>El sistema lee intencion, estetica, color, fit y navegacion para curar el siguiente paso.</p>
      </div>
      <div className="home-identity-signals">
        {homeIdentitySignals.map((signal, index) => (
          <div key={signal} className="home-identity-signal">
            <span className="home-identity-check">
              <HomeIcon name="check" color="black" />
            </span>
            <span>{signal}</span>
            <small>{`0${index + 1}`}</small>
          </div>
        ))}
      </div>
      <div className="home-route-card">
        <p className="home-kicker">Ruta sugerida</p>
        <p>Completar 5 preguntas desbloquea portal, narrativa y productos curados para el arquetipo.</p>
      </div>
    </aside>
  );
}
