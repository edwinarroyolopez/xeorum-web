'use client';

import { useOrder } from './checkout.queries';
import { ActionRow, Badge, Card, ErrorState, Kicker, LinkButton, LoadingState } from '../design-system';

export function OrderView({ orderId }: Readonly<{ orderId: string }>) {
  const order = useOrder(orderId);

  if (order.isLoading) return <LoadingState title="Cargando orden" description="Preparando confirmacion, estado y resumen comercial." />;
  if (order.isError || !order.data) return <ErrorState title="Orden no disponible" description="No pudimos recuperar la confirmacion de tu orden." />;

  return (
    <section className="checkout-shell xeorum-checkout-shell">
      <Card className="cart-summary xeorum-checkout-card">
        <Kicker>Orden confirmada</Kicker>
        <h1>{order.data.status}</h1>
        <p>{order.data.items.length} piezas · {order.data.subtotal} {order.data.currency}</p>
        <ActionRow>
          <Badge tone="success">Pago confirmado</Badge>
          <Badge tone="default">Orden {order.data.orderId}</Badge>
        </ActionRow>
        <ActionRow>
          <LinkButton href="/products" variant="ghost">Seguir explorando</LinkButton>
        </ActionRow>
      </Card>
    </section>
  );
}
