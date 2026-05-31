import { useQuery } from '@tanstack/react-query';
import { productsApi, type ProductListFilters } from '../services/products.api';

export const productsQueryKeys = {
  list: (filters: ProductListFilters = {}) => ['products', 'list', filters] as const,
  detail: (slug: string) => ['products', 'detail', slug] as const,
};

export function useProducts(input: ProductListFilters = {}) {
  return useQuery({
    queryKey: productsQueryKeys.list(input),
    queryFn: () => productsApi.getProducts(input),
    staleTime: 60_000,
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: productsQueryKeys.detail(slug),
    queryFn: () => productsApi.getProduct(slug),
    enabled: Boolean(slug),
    staleTime: 60_000,
  });
}
