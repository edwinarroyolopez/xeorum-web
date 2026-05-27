import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCartStore } from '../../stores/cart.store';
import { cartApi } from './cart.api';

export const cartQueryKeys = {
  current: ['cart', 'current'] as const,
};

export function useCart() {
  const setItemCount = useCartStore((state) => state.setItemCount);
  return useQuery({
    queryKey: cartQueryKeys.current,
    queryFn: async () => {
      const cart = await cartApi.getCart();
      setItemCount(cart.itemCount);
      return cart;
    },
    staleTime: 5_000,
  });
}

export function useAddCartItem() {
  const queryClient = useQueryClient();
  const setItemCount = useCartStore((state) => state.setItemCount);
  return useMutation({
    mutationFn: cartApi.addItem,
    onSuccess: (cart) => {
      setItemCount(cart.itemCount);
      queryClient.setQueryData(cartQueryKeys.current, cart);
    },
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();
  const setItemCount = useCartStore((state) => state.setItemCount);
  return useMutation({
    mutationFn: cartApi.removeItem,
    onSuccess: (cart) => {
      setItemCount(cart.itemCount);
      queryClient.setQueryData(cartQueryKeys.current, cart);
    },
  });
}
