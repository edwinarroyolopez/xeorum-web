import React from 'react';
import { homeCheckoutSignals } from '../services/home.content';
import { HomeChecklistPanel } from './HomeChecklistPanel';

export function HomeConversionPanel() {
  return (
    <HomeChecklistPanel
      kicker="Conversion premium"
      title="Checkout limpio. Orden confirmada. Identidad guardada."
      description="El cierre debe ser sobrio: reserva, pago, confirmacion y estado de orden. Los overlays simbolicos no contaminan pasos criticos."
      items={homeCheckoutSignals}
    />
  );
}
