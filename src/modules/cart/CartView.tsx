'use client';

import Link from 'next/link';
import { useCart, useRemoveCartItem } from './cart.queries';

export function CartView() {
  const cart = useCart();
  const removeItem = useRemoveCartItem();

  if (cart.isLoading) return <p className="section-state">Loading cart.</p>;
  if (cart.isError || !cart.data) return <p className="section-state">Cart unavailable.</p>;
  if (cart.data.items.length === 0) return <p className="section-state">Your cart is empty.</p>;

  return (
    <section className="cart-shell">
      {cart.data.items.map((item) => (
        <article key={`${item.productSlug}-${item.size}`} className="cart-item">
          <div>
            <p className="portal-card-kicker">{item.archetypeSlug}</p>
            <h3>{item.productName}</h3>
            <p>{item.size} · Qty {item.quantity}</p>
          </div>
          <div className="product-bottom">
            <strong>{item.unitPrice * item.quantity} {item.currency}</strong>
            <button type="button" onClick={() => removeItem.mutate({ productSlug: item.productSlug, size: item.size })}>
              Remove
            </button>
          </div>
        </article>
      ))}
      <article className="cart-summary">
        <strong>Subtotal {cart.data.subtotal} {cart.data.currency}</strong>
        <Link href="/checkout">Proceed to Checkout</Link>
      </article>
    </section>
  );
}
