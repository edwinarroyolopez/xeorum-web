'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Product } from '../../products';
import { mapProductToHomeFeaturedProduct } from '../services/home.mappers';

export function useHomeFeaturedProduct(products: Product[]) {
  const [selectedSlug, setSelectedSlug] = useState(products[0]?.slug ?? '');

  useEffect(() => {
    if (!products.some((product) => product.slug === selectedSlug)) {
      setSelectedSlug(products[0]?.slug ?? '');
    }
  }, [products, selectedSlug]);

  const featuredProduct = useMemo(() => {
    const product = products.find((item) => item.slug === selectedSlug) ?? products[0];
    return product ? mapProductToHomeFeaturedProduct(product) : null;
  }, [products, selectedSlug]);

  const relatedProducts = useMemo(() => {
    if (!featuredProduct) return [];
    return products.filter((product) => product.slug !== featuredProduct.slug).slice(0, 3);
  }, [featuredProduct, products]);

  return {
    featuredProduct,
    relatedProducts,
    selectedSlug,
    setSelectedSlug,
  };
}
