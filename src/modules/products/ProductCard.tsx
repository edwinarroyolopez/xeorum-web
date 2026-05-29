import type { Product } from './products.types';
import { ProductCard as DSProductCard } from '../design-system';

export function ProductCard({ product }: Readonly<{ product: Product }>) {
  return <DSProductCard product={product} />;
}
