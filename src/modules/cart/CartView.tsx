'use client';

import Link from 'next/link';
import { useCart, useRemoveCartItem } from './cart.queries';
import { Button, Card, EmptyState, ErrorState, LoadingState } from '../design-system';

export function CartView() {
  const cart = useCart();
  const removeItem = useRemoveCartItem();

  if (cart.isLoading) return <LoadingState>Loading cart.</LoadingState>;
  if (cart.isError || !cart.data) return <ErrorState>Cart unavailable.</ErrorState>;
  if (cart.data.items.length === 0) return <EmptyState>Your cart is empty.</EmptyState>;

  return (
    <section className="cart-shell">
      {cart.data.items.map((item) => (
        <Card key={`${item.productSlug}-${item.size}`} className="cart-item">
          <div>
            <p className="portal-card-kicker">{item.archetypeSlug}</p>
            <h3>{item.productName}</h3>
            <p>{item.size} · Qty {item.quantity}</p>
          </div>
          <div className="product-bottom">
            <strong>{item.unitPrice * item.quantity} {item.currency}</strong>
            <Button type="button" variant="ghost" onClick={() => removeItem.mutate({ productSlug: item.productSlug, size: item.size })}>
              Remove
            </Button>
          </div>
        </Card>
      ))}
      <Card className="cart-summary">
        <strong>Subtotal {cart.data.subtotal} {cart.data.currency}</strong>
        <Link href="/checkout">Proceed to Checkout</Link>
      </Card>
    </section>
  );
}
