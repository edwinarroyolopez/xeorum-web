'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useCart } from '../cart/cart.queries';
import { useCreateCheckoutSession, useOrder, usePaymentStatus } from './checkout.queries';

export function CheckoutView() {
  const cart = useCart();
  const createSession = useCreateCheckoutSession();
  const checkoutSession = createSession.data;
  const payment = usePaymentStatus(checkoutSession?.paymentId ?? '');
  const order = useOrder(checkoutSession?.orderId ?? '');
  const idempotencyKey = useMemo(() => `xeorum-${crypto.randomUUID()}`, []);

  if (cart.isLoading) return <p className="section-state">Loading checkout.</p>;
  if (cart.isError || !cart.data) return <p className="section-state">Checkout unavailable.</p>;
  if (cart.data.items.length === 0) return <p className="section-state">Add products before checkout.</p>;

  return (
    <section className="checkout-shell">
      <article className="cart-summary">
        <p className="portal-card-kicker">Checkout</p>
        <h1>Confirm the pieces aligned to your identity.</h1>
        <p>Subtotal {cart.data.subtotal} {cart.data.currency}</p>
        {!checkoutSession ? (
          <button type="button" onClick={() => createSession.mutate({ idempotencyKey })} disabled={createSession.isPending}>
            {createSession.isPending ? 'Creating Session' : 'Create Secure Checkout'}
          </button>
        ) : (
          <div className="checkout-status">
            <p>Checkout Session {checkoutSession.checkoutSessionId}</p>
            <p>Reserved until {new Date(checkoutSession.reservedUntil).toLocaleTimeString()}</p>
            <p>Payment status: {payment.data?.status ?? 'pending'}</p>
            <p>Order status: {order.data?.status ?? 'PENDING_PAYMENT'}</p>
            {payment.data?.status === 'succeeded' ? <Link href={`/orders/${checkoutSession.orderId}`}>View Order</Link> : null}
          </div>
        )}
      </article>
    </section>
  );
}
