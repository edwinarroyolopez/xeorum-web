'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useCart } from '../cart/cart.queries';
import { useCreateCheckoutSession, useOrder, usePaymentStatus } from './checkout.queries';
import { Button, Card, CheckoutTrustPanel, EmptyState, ErrorState, LoadingState } from '../design-system';
import { ThemeCssVariables } from '../theme/providers/ThemeCssVariables';
import { resolvePageTheme } from '../theme';

export function CheckoutView() {
  const cart = useCart();
  const createSession = useCreateCheckoutSession();
  const checkoutSession = createSession.data;
  const payment = usePaymentStatus(checkoutSession?.paymentId ?? '');
  const order = useOrder(checkoutSession?.orderId ?? '');
  const idempotencyKey = useMemo(() => `xeorum-${crypto.randomUUID()}`, []);
  const theme = resolvePageTheme({ context: 'checkout-payment-critical' });

  if (cart.isLoading) return <LoadingState>Cargando checkout.</LoadingState>;
  if (cart.isError || !cart.data) return <ErrorState>Checkout no disponible.</ErrorState>;
  if (cart.data.items.length === 0) return <EmptyState>Agrega productos antes de abrir checkout.</EmptyState>;

  return (
    <ThemeCssVariables theme={theme}>
      <section className="checkout-shell xeorum-checkout-shell">
        <Card className="cart-summary xeorum-checkout-card">
          <p className="portal-card-kicker">Checkout</p>
          <h1>Paga con total claridad.</h1>
          <p>Subtotal {cart.data.subtotal} {cart.data.currency}</p>
          <div className="checkout-line-items" aria-label="Resumen de piezas en checkout">
            {cart.data.items.map((item) => (
              <div key={`${item.productSlug}-${item.size}`} className="checkout-line-item">
                <span>{item.productName}</span>
                <span>{item.size} · {item.quantity}</span>
              </div>
            ))}
          </div>
          {!checkoutSession ? (
            <Button type="button" onClick={() => createSession.mutate({ idempotencyKey })} loading={createSession.isPending}>
              {createSession.isPending ? 'Creando sesion segura' : 'Crear checkout seguro'}
            </Button>
          ) : (
            <div className="checkout-status xeorum-checkout-status">
              <p>Sesion {checkoutSession.checkoutSessionId}</p>
              <p>Reservada hasta {new Date(checkoutSession.reservedUntil).toLocaleTimeString()}</p>
              <p>Estado del pago: {payment.data?.status ?? 'pending'}</p>
              <p>Estado de la orden: {order.data?.status ?? 'PENDING_PAYMENT'}</p>
              {payment.data?.status === 'succeeded' ? <Link href={`/orders/${checkoutSession.orderId}`}>Ver orden</Link> : null}
            </div>
          )}
        </Card>
        <CheckoutTrustPanel
          {...(checkoutSession?.reservedUntil ? { reservedUntil: checkoutSession.reservedUntil } : {})}
          {...(payment.data?.status ? { paymentStatus: payment.data.status } : {})}
          {...(order.data?.status ? { orderStatus: order.data.status } : {})}
        />
      </section>
    </ThemeCssVariables>
  );
}
