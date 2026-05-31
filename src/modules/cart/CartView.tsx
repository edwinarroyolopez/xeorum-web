'use client';

import Link from 'next/link';
import { useCart, useRemoveCartItem } from './cart.queries';
import { Button, Card, EmptyState, LinkButton, ErrorState, LoadingState } from '../design-system';

export function CartView() {
  const cart = useCart();
  const removeItem = useRemoveCartItem();

  if (cart.isLoading) return <LoadingState>Cargando carrito.</LoadingState>;
  if (cart.isError || !cart.data) return <ErrorState>Carrito no disponible.</ErrorState>;
  if (cart.data.items.length === 0) return <EmptyState>Tu carrito esta vacio. Puedes entrar directo a producto cuando quieras.</EmptyState>;

  return (
    <section className="cart-shell xeorum-cart-shell">
      <Card className="cart-summary xeorum-cart-summary">
        <p className="portal-card-kicker">Carrito</p>
        <h1>Piezas listas para pasar a checkout.</h1>
        <p>Revisa talla, cantidad y subtotal con calma. La experiencia de pago mantiene claridad, reserva y estado visible.</p>
        <div className="portal-actions">
          <LinkButton href="/checkout" variant="primary">Ir al checkout</LinkButton>
          <LinkButton href="/products" variant="ghost">Seguir explorando</LinkButton>
        </div>
      </Card>
      {cart.data.items.map((item) => (
        <Card key={`${item.productSlug}-${item.size}`} className="cart-item xeorum-cart-item">
          <div>
            <p className="portal-card-kicker">{item.archetypeSlug ? `Fuerza ${item.archetypeSlug.toUpperCase()}` : 'Seleccion abierta'}</p>
            <h3>{item.productName}</h3>
            <p>{item.size} · Cantidad {item.quantity}</p>
          </div>
          <div className="product-bottom">
            <strong>{item.unitPrice * item.quantity} {item.currency}</strong>
            <Button type="button" variant="ghost" onClick={() => removeItem.mutate({ productSlug: item.productSlug, size: item.size })}>
              Quitar
            </Button>
          </div>
        </Card>
      ))}
      <Card className="cart-summary xeorum-cart-summary xeorum-cart-summary-total">
        <strong>Subtotal {cart.data.subtotal} {cart.data.currency}</strong>
        <p>Sin ruido promocional. Solo claridad para decidir si sigues o ajustas.</p>
        <Link href="/checkout">Ir al checkout</Link>
      </Card>
    </section>
  );
}
