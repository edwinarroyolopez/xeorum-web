'use client';

import { useOrder } from './checkout.queries';
import { Card, ErrorState, LoadingState } from '../design-system';

export function OrderView({ orderId }: Readonly<{ orderId: string }>) {
  const order = useOrder(orderId);

  if (order.isLoading) return <LoadingState>Loading order.</LoadingState>;
  if (order.isError || !order.data) return <ErrorState>Order unavailable.</ErrorState>;

  return (
    <section className="checkout-shell">
      <Card className="cart-summary">
        <p className="portal-card-kicker">Order Confirmed</p>
        <h1>{order.data.status}</h1>
        <p>{order.data.items.length} items · {order.data.subtotal} {order.data.currency}</p>
      </Card>
    </section>
  );
}
