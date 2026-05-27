import { apiClient } from '../../lib/api';
import type { Product } from './products.types';

export const productsApi = {
  getProducts: (input: { archetype?: string; drop?: string } = {}) => {
    const search = new URLSearchParams();
    if (input.archetype) search.set('archetype', input.archetype);
    if (input.drop) search.set('drop', input.drop);
    const suffix = search.toString() ? `?${search.toString()}` : '';
    return apiClient.get<Product[]>(`/products${suffix}`);
  },
  getProduct: (slug: string) => apiClient.get<Product>(`/products/${slug}`),
};
