import React from 'react';
import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import { ActionRow } from '../components/ActionRow';
import { Kicker } from '../primitives/Kicker';

type CheckoutTrustPanelProps = {
  reservedUntil?: string;
  paymentStatus?: string;
  orderStatus?: string;
};

 function normalizeStatusTone(status: string | undefined): 'default' | 'accent' | 'success' | 'danger' {
  if (!status) {
    return 'default';
  }

  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus.includes('succeeded') || normalizedStatus.includes('paid')) {
    return 'success';
  }

  if (normalizedStatus.includes('pending') || normalizedStatus.includes('reserved')) {
    return 'accent';
  }

  if (normalizedStatus.includes('failed') || normalizedStatus.includes('cancelled')) {
    return 'danger';
  }

  return 'default';
}

export function CheckoutTrustPanel({ reservedUntil, paymentStatus, orderStatus }: Readonly<CheckoutTrustPanelProps>) {
  return (
    <Card className="checkout-trust-panel">
      <Kicker>Confianza de checkout</Kicker>
      <h2>Reserva, pago y estado visibles en todo momento.</h2>
      <ActionRow className="checkout-trust-badges" aria-label="Resumen de estado del checkout">
        <Badge tone={normalizeStatusTone(paymentStatus)}>Pago {paymentStatus ?? 'pending'}</Badge>
        <Badge tone={normalizeStatusTone(orderStatus)}>Orden {orderStatus ?? 'pending_payment'}</Badge>
        <Badge tone={reservedUntil ? 'accent' : 'default'}>
          {reservedUntil ? `Reservada hasta ${new Date(reservedUntil).toLocaleTimeString()}` : 'La reserva abre al crear la sesion'}
        </Badge>
      </ActionRow>
      <ul className="checkout-trust-list">
        <li>La sesion segura se crea de forma explicita antes del pago.</li>
        <li>Pago y orden permanecen visibles como texto, no solo como color.</li>
        <li>El checkout reduce atmosfera para priorizar confianza y lectura inmediata.</li>
      </ul>
    </Card>
  );
}
