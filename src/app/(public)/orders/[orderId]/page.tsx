import { OrderView } from '../../../../modules/checkout/OrderView';

export default async function OrderPage({ params }: { params: Promise<{ orderId: string }> }) {
  const resolved = await params;
  return (
    <main className="page-shell">
      <OrderView orderId={resolved.orderId} />
    </main>
  );
}
