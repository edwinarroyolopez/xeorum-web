import React from 'react';
import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { CheckoutTrustPanel } from './CheckoutTrustPanel';

describe('CheckoutTrustPanel', () => {
  it('renders explicit payment and order trust text', () => {
    const html = renderToStaticMarkup(
      <CheckoutTrustPanel reservedUntil="2026-05-28T21:45:00.000Z" paymentStatus="pending" orderStatus="PENDING_PAYMENT" />
    );

    expect(html).toContain('Confianza de checkout');
    expect(html).toContain('Pago pending');
    expect(html).toContain('Orden PENDING_PAYMENT');
    expect(html).toContain('Reservada hasta');
  });
});
