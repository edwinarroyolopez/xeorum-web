import { formatProductLabel, formatProductPrice, getDisplayPrice } from '../../products/services/product.helpers';
import type { Product } from '../../products';
import type { HomeFeaturedProduct } from './home.types';

export function mapProductToHomeFeaturedProduct(product: Product): HomeFeaturedProduct {
  const price = getDisplayPrice(product);
  const stock = product.variants.find((variant) => variant.available)?.stockAvailable ?? 0;

  return {
    ...product,
    homePriceLabel: formatProductPrice(price.basePrice, price.currency),
    homeStockLabel: `${stock} piezas`,
    homeArchetypeLabel: formatProductLabel(product.archetypes.primary?.slug ?? 'xeorum').toUpperCase(),
  };
}
