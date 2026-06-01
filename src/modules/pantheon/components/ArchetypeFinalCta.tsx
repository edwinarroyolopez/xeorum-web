'use client';

import React from 'react';
import { ActionRow, EditorialPanel, LinkButton, SectionHeader } from '../../design-system';
import type { PantheonArchetypeLanding } from '../pantheon.types';
import type { ArchetypeLandingViewModel } from '../services';

export function ArchetypeFinalCta({
  archetype,
  viewModel,
}: Readonly<{
  archetype: PantheonArchetypeLanding;
  viewModel: ArchetypeLandingViewModel;
}>) {
  return (
    <div className="section-stack xeorum-archetype-section">
      <SectionHeader kicker="CTA final" title="Entrar a la fuerza o confirmarla." description="La accion comercial llega al final, despues de identidad, sistema y relaciones." />
      <EditorialPanel className="section-stack portal-commerce-card xeorum-archetype-panel xeorum-archetype-final-cta">
        <p>{archetype.commerce.openMarketAngle}</p>
        <ActionRow className="portal-actions xeorum-archetype-actions">
          <LinkButton href={viewModel.primaryCta.href}>{viewModel.primaryCta.label}</LinkButton>
          <LinkButton href={viewModel.secondaryCta.href} variant="ghost">{viewModel.secondaryCta.label}</LinkButton>
          <LinkButton href="/pantheon" variant="ghost">Volver al pantheon</LinkButton>
        </ActionRow>
      </EditorialPanel>
    </div>
  );
}
