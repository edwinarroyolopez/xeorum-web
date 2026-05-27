'use client';

import { useOrder } from './checkout.queries';

export function OrderView({ orderId }: Readonly<{ orderId: string }>) {
  const order = useOrder(orderId);

  if (order.isLoading) return <p className="section-state">Loading order.</p>;
  if (order.isError || !order.data) return <p className="section-state">Order unavailable.</p>;

  return (
    <section className="checkout-shell">
      <article className="cart-summary">
        <p className="portal-card-kicker">Order Confirmed</p>
        <h1>{order.data.status}</h1>
        <p>{order.data.items.length} items · {order.data.subtotal} {order.data.currency}</p>
      </article>
    </section>
  );
}
