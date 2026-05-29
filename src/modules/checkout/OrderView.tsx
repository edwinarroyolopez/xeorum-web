'use client';

import { useOrder } from './checkout.queries';
import { Card, ErrorState, LoadingState } from '../design-system';

export function OrderView({ orderId }: Readonly<{ orderId: string }>) {
  const order = useOrder(orderId);

  if (order.isLoading) return <LoadingState>Cargando orden.</LoadingState>;
  if (order.isError || !order.data) return <ErrorState>Orden no disponible.</ErrorState>;

  return (
    <section className="checkout-shell xeorum-checkout-shell">
      <Card className="cart-summary xeorum-checkout-card">
        <p className="portal-card-kicker">Orden confirmada</p>
        <h1>{order.data.status}</h1>
        <p>{order.data.items.length} piezas · {order.data.subtotal} {order.data.currency}</p>
      </Card>
    </section>
  );
}
