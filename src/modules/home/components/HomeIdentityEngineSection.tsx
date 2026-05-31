import React from 'react';
import { homeJourneySteps } from '../services/home.content';
import { HomeJourneyPanel } from './HomeJourneyPanel';

export function HomeIdentityEngineSection() {
  return (
    <section className="home-shell home-journey-shell">
      <HomeJourneyPanel steps={homeJourneySteps} />
    </section>
  );
}
