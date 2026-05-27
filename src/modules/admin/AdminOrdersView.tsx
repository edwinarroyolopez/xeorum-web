'use client';

import { useAdminOrders } from './admin.queries';

export function AdminOrdersView() {
  const orders = useAdminOrders();

  if (orders.isLoading) return <p className="section-state">Loading orders.</p>;
  if (orders.isError || !orders.data) return <p className="section-state">Orders unavailable.</p>;

  return (
    <section className="admin-grid">
      {orders.data.map((order) => (
        <article key={order.orderId} className="admin-card">
          <h2>{order.orderId}</h2>
          <p>{order.status}</p>
          <p>{order.items.length} items</p>
          <strong>{order.subtotal} {order.currency}</strong>
        </article>
      ))}
    </section>
  );
}
