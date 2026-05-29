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
        Checkout Trust
      </Text>
      <h2>Clarity first through reservation, payment and order state.</h2>
      <div className="checkout-trust-badges" aria-label="Checkout status summary">
        <Badge tone={normalizeStatusTone(paymentStatus)}>Payment {paymentStatus ?? 'pending'}</Badge>
        <Badge tone={normalizeStatusTone(orderStatus)}>Order {orderStatus ?? 'pending_payment'}</Badge>
        <Badge tone={reservedUntil ? 'accent' : 'default'}>
          {reservedUntil ? `Reserved until ${new Date(reservedUntil).toLocaleTimeString()}` : 'Reservation opens at session creation'}
        </Badge>
      </div>
      <ul className="checkout-trust-list">
        <li>Secure session creation is explicit before payment starts.</li>
        <li>Payment and order states remain visible as text, not color alone.</li>
        <li>Critical checkout UI stays sober even if archetype theming exists elsewhere.</li>
      </ul>
    </Card>
  );
}
