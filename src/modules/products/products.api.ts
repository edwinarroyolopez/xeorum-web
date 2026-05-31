import { apiClient } from '../../lib/api';
import type { ListPublicProductsQueryContract } from '@xeorum/contracts';
import type { Product } from './products.types';

export type ProductListFilters = ListPublicProductsQueryContract;

export const productsApi = {
  getProducts: (input: ProductListFilters = {}) => {
    const search = new URLSearchParams();
    if (input.archetype) search.set('archetype', input.archetype);
    if (input.drop) search.set('drop', input.drop);
    if (input.category) search.set('category', input.category);
    if (input.collection) search.set('collection', input.collection);
    if (input.marketTag) search.set('marketTag', input.marketTag);
    if (input.minPrice !== undefined) search.set('minPrice', input.minPrice.toString());
    if (input.maxPrice !== undefined) search.set('maxPrice', input.maxPrice.toString());
    if (input.size) search.set('size', input.size);
    if (input.color) search.set('color', input.color);
    if (input.availability) search.set('availability', input.availability);
    if (input.sort) search.set('sort', input.sort);
    const suffix = search.toString() ? `?${search.toString()}` : '';
    return apiClient.get<Product[]>(`/products${suffix}`);
  },
  getProduct: (slug: string) => apiClient.get<Product>(`/products/${slug}`),
};
