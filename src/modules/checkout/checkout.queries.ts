import { useMutation, useQuery } from '@tanstack/react-query';
import { checkoutApi } from './checkout.api';

export function useCreateCheckoutSession() {
  return useMutation({ mutationFn: checkoutApi.createSession });
}

export function usePaymentStatus(paymentId: string) {
  return useQuery({
    queryKey: ['payments', paymentId],
    queryFn: () => checkoutApi.getPayment(paymentId),
    enabled: Boolean(paymentId),
    refetchInterval: (query) => (query.state.data?.status === 'pending' ? 1000 : false),
    staleTime: 0,
  });
}

export function useOrder(orderId: string) {
  return useQuery({
    queryKey: ['orders', orderId],
    queryFn: () => checkoutApi.getOrder(orderId),
    enabled: Boolean(orderId),
    staleTime: 5_000,
  });
}
