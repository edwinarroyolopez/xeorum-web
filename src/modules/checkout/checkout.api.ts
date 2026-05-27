import { apiClient } from '../../lib/api';
import type { CheckoutSession, Order, PaymentStatus } from './checkout.types';

export const checkoutApi = {
  createSession: (body: { idempotencyKey: string }) => apiClient.post<CheckoutSession>('/checkout/session', body),
  getPayment: (paymentId: string) => apiClient.get<PaymentStatus>(`/payments/${paymentId}`),
  getOrder: (orderId: string) => apiClient.get<Order>(`/orders/${orderId}`),
};
