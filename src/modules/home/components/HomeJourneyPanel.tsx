import React from 'react';
import type { HomeJourneyStep } from '../services/home.types';
import { HomeJourneyStepCard } from './HomeJourneyStepCard';

export function HomeJourneyPanel({ steps }: Readonly<{ steps: readonly HomeJourneyStep[] }>) {
  return (
    <div className="home-journey-panel">
      <div className="home-journey-copy">
        <p className="home-kicker">Customer identity engine</p>
        <h2 className="home-section-title">La identidad se construye mientras compra.</h2>
        <p className="home-panel-copy">El cliente no debe sentir que llena un formulario. Debe sentir que el sistema lo observa con elegancia: que mira, que guarda, que responde y que simbolo elige.</p>
      </div>
      <div className="home-journey-grid">
        {steps.map((step) => <HomeJourneyStepCard key={step.step} step={step} />)}
      </div>
    </div>
  );
}
