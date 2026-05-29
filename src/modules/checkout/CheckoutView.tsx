'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useCart } from '../cart/cart.queries';
import { useCreateCheckoutSession, useOrder, usePaymentStatus } from './checkout.queries';
import { Button, Card, CheckoutTrustPanel, EmptyState, ErrorState, LoadingState } from '../design-system';

export function CheckoutView() {
  const cart = useCart();
  const createSession = useCreateCheckoutSession();
  const checkoutSession = createSession.data;
  const payment = usePaymentStatus(checkoutSession?.paymentId ?? '');
  const order = useOrder(checkoutSession?.orderId ?? '');
  const idempotencyKey = useMemo(() => `xeorum-${crypto.randomUUID()}`, []);

  if (cart.isLoading) return <LoadingState>Loading checkout.</LoadingState>;
  if (cart.isError || !cart.data) return <ErrorState>Checkout unavailable.</ErrorState>;
  if (cart.data.items.length === 0) return <EmptyState>Add products before checkout.</EmptyState>;

  return (
    <section className="checkout-shell">
      <Card className="cart-summary">
        <p className="portal-card-kicker">Checkout</p>
        <h1>Confirm the pieces aligned to your identity.</h1>
        <p>Subtotal {cart.data.subtotal} {cart.data.currency}</p>
        {!checkoutSession ? (
          <Button type="button" onClick={() => createSession.mutate({ idempotencyKey })} loading={createSession.isPending}>
            {createSession.isPending ? 'Creating Session' : 'Create Secure Checkout'}
          </Button>
        ) : (
          <div className="checkout-status">
            <p>Checkout Session {checkoutSession.checkoutSessionId}</p>
            <p>Reserved until {new Date(checkoutSession.reservedUntil).toLocaleTimeString()}</p>
            <p>Payment status: {payment.data?.status ?? 'pending'}</p>
            <p>Order status: {order.data?.status ?? 'PENDING_PAYMENT'}</p>
            {payment.data?.status === 'succeeded' ? <Link href={`/orders/${checkoutSession.orderId}`}>View Order</Link> : null}
          </div>
        )}
      </Card>
      <CheckoutTrustPanel
        {...(checkoutSession?.reservedUntil ? { reservedUntil: checkoutSession.reservedUntil } : {})}
        {...(payment.data?.status ? { paymentStatus: payment.data.status } : {})}
        {...(order.data?.status ? { orderStatus: order.data.status } : {})}
      />
    </section>
  );
}
