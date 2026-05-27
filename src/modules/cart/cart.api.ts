import { apiClient } from '../../lib/api';
import type { Cart } from './cart.types';

export const cartApi = {
  getCart: () => apiClient.get<Cart>('/cart'),
  addItem: (body: { productSlug: string; size: string; quantity: number }) => apiClient.post<Cart>('/cart/items', body),
  removeItem: (body: { productSlug: string; size: string }) => apiClient.delete<Cart>('/cart/items', body),
};
