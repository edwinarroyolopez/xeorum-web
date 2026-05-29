import { apiClient } from '../../lib/api';
import type { Product } from './products.types';

export const productsApi = {
  getProducts: (input: { archetype?: string; drop?: string; category?: string; size?: string; sort?: string } = {}) => {
    const search = new URLSearchParams();
    if (input.archetype) search.set('archetype', input.archetype);
    if (input.drop) search.set('drop', input.drop);
    if (input.category) search.set('category', input.category);
    if (input.size) search.set('size', input.size);
    if (input.sort) search.set('sort', input.sort);
    const suffix = search.toString() ? `?${search.toString()}` : '';
    return apiClient.get<Product[]>(`/products${suffix}`);
  },
  getProduct: (slug: string) => apiClient.get<Product>(`/products/${slug}`),
};
