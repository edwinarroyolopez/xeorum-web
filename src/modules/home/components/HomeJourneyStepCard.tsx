import React from 'react';
import type { HomeJourneyStep } from '../services/home.types';
import { HomeJourneyCard } from './HomeJourneyCard';

export function HomeJourneyStepCard({ step }: Readonly<{ step: HomeJourneyStep }>) {
  return <HomeJourneyCard step={step.step} title={step.title} body={step.body} />;
}
