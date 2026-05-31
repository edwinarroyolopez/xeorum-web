'use client';

import Link from 'next/link';
import { useCart, useRemoveCartItem } from './cart.queries';
import { ActionRow, Badge, Button, Card, EmptyState, Kicker, LinkButton, ErrorState, LoadingState } from '../design-system';

export function CartView() {
  const cart = useCart();
  const removeItem = useRemoveCartItem();

  if (cart.isLoading) return <LoadingState title="Cargando carrito" description="Preparando piezas, subtotal y acceso a checkout." />;
  if (cart.isError || !cart.data) return <ErrorState title="Carrito no disponible" description="No pudimos recuperar tus piezas activas ahora mismo." />;
  if (cart.data.items.length === 0) return <EmptyState title="Carrito vacio" description="Tu carrito esta vacio. Puedes entrar directo a producto cuando quieras." action={<LinkButton href="/products" variant="ghost">Ver productos</LinkButton>} />;

  return (
    <section className="cart-shell xeorum-cart-shell">
      <Card className="cart-summary xeorum-cart-summary">
        <Kicker>Carrito</Kicker>
        <h1>Piezas listas para pasar a checkout.</h1>
        <p>Revisa talla, cantidad y subtotal con calma. La experiencia de pago mantiene claridad, reserva y estado visible.</p>
        <ActionRow className="portal-actions">
          <LinkButton href="/checkout" variant="primary">Ir al checkout</LinkButton>
          <LinkButton href="/products" variant="ghost">Seguir explorando</LinkButton>
        </ActionRow>
      </Card>
      {cart.data.items.map((item) => (
        <Card key={`${item.productSlug}-${item.size}`} className="cart-item xeorum-cart-item">
          <div>
            <Kicker>{item.archetypeSlug ? `Fuerza ${item.archetypeSlug.toUpperCase()}` : 'Seleccion abierta'}</Kicker>
            <h3>{item.productName}</h3>
            <p>{item.size} · Cantidad {item.quantity}</p>
          </div>
          <ActionRow className="product-bottom" justify="between" align="center">
            <Badge tone="default">{item.unitPrice * item.quantity} {item.currency}</Badge>
            <Button type="button" variant="ghost" onClick={() => removeItem.mutate({ productSlug: item.productSlug, size: item.size })}>
              Quitar
            </Button>
          </ActionRow>
        </Card>
      ))}
      <Card className="cart-summary xeorum-cart-summary xeorum-cart-summary-total">
        <strong>Subtotal {cart.data.subtotal} {cart.data.currency}</strong>
        <p>Sin ruido promocional. Solo claridad para decidir si sigues o ajustas.</p>
        <Link href="/checkout" className="product-inline-link">Ir al checkout</Link>
      </Card>
    </section>
  );
}
