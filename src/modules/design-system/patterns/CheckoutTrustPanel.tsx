import React from 'react';
import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import { Text } from '../primitives/Text';

type CheckoutTrustPanelProps = {
  reservedUntil?: string;
  paymentStatus?: string;
  orderStatus?: string;
};

function normalizeStatusTone(status: string | undefined): 'default' | 'accent' | 'success' | 'warning' {
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
    return 'warning';
  }

  return 'default';
}

export function CheckoutTrustPanel({ reservedUntil, paymentStatus, orderStatus }: Readonly<CheckoutTrustPanelProps>) {
  return (
    <Card className="checkout-trust-panel">
      <Text tone="muted" className="portal-card-kicker">
        Confianza de checkout
      </Text>
      <h2>Claridad primero a traves de reserva, pago y estado de orden.</h2>
      <div className="checkout-trust-badges" aria-label="Resumen de estado del checkout">
        <Badge tone={normalizeStatusTone(paymentStatus)}>Pago {paymentStatus ?? 'pending'}</Badge>
        <Badge tone={normalizeStatusTone(orderStatus)}>Orden {orderStatus ?? 'pending_payment'}</Badge>
        <Badge tone={reservedUntil ? 'accent' : 'default'}>
          {reservedUntil ? `Reservada hasta ${new Date(reservedUntil).toLocaleTimeString()}` : 'La reserva abre al crear la sesion'}
        </Badge>
      </div>
      <ul className="checkout-trust-list">
        <li>La sesion segura se crea de forma explicita antes del pago.</li>
        <li>Pago y orden permanecen visibles como texto, no solo como color.</li>
        <li>El checkout se mantiene sobrio aunque exista tematizacion arquetipica en otras vistas.</li>
      </ul>
    </Card>
  );
}
