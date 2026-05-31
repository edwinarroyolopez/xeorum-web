import type { ProductContract, ProductVariant } from '@xeorum/contracts';

const RENDERABLE_MEDIA_URL = /^(https?:\/\/|\/)/i;

export function isRenderableMediaUrl(url?: string | null) {
  return Boolean(url && RENDERABLE_MEDIA_URL.test(url.trim()));
}

export function getRenderableProductMedia(product: ProductContract) {
  return (product.media?.gallery ?? []).filter((item) => isRenderableMediaUrl(item.url));
}

export function getPrimaryProductMedia(product: ProductContract) {
  const candidates = [product.media?.coverImage, ...(product.media?.gallery ?? [])].filter(Boolean) as Array<ProductContract['media']['gallery'][number]>;
  return candidates.find((item) => isRenderableMediaUrl(item.url));
}

export function getHoverProductMedia(product: ProductContract) {
  return getRenderableProductMedia(product).find((item) => item.role === 'hover');
}

export function getProductGallery(product: ProductContract) {
  const primary = getPrimaryProductMedia(product);
  const gallery = getRenderableProductMedia(product);
  if (!primary) return gallery;
  return [primary, ...gallery.filter((item) => item.url !== primary.url || item.alt !== primary.alt)];
}

export function getDisplayPrice(product: ProductContract, variant?: ProductVariant | null) {
  const basePrice = product.pricing.salePrice ?? product.pricing.price;
  const currentPrice = variant?.priceOverride ?? basePrice;
  const compareAtPrice = product.pricing.compareAtPrice;
  const salePrice = product.pricing.salePrice;

  return {
    currentPrice,
    compareAtPrice: compareAtPrice && compareAtPrice > currentPrice ? compareAtPrice : undefined,
    salePrice: salePrice && salePrice < product.pricing.price ? salePrice : undefined,
    basePrice: product.pricing.price,
    currency: product.pricing.currency,
    discountPercent: product.pricing.discountPercent,
    discountLabel: product.pricing.discountLabel,
  };
}

export function getDefaultVariant(product: ProductContract) {
  return (product.variants ?? []).find((variant) => variant.available) ?? product.variants?.[0] ?? null;
}

export function getAvailableSizes(product: ProductContract) {
  return (product.variants ?? []).filter((variant) => variant.available).map((variant) => variant.size);
}

export function getAvailabilityCopy(variant?: ProductVariant | null) {
  if (!variant) return { label: 'Sin stock', tone: 'sold-out' as const, detail: 'No hay variantes disponibles ahora.' };
  if (!variant.available) return { label: 'Agotado', tone: 'sold-out' as const, detail: 'Esta variante no esta disponible por ahora.' };
  if (variant.lowStock) return { label: 'Ultimas unidades', tone: 'low-stock' as const, detail: `${Math.max(variant.stockAvailable, 0)} disponibles en esta variante.` };
  return { label: 'Disponible', tone: 'in-stock' as const, detail: `${variant.stockAvailable} disponibles en esta variante.` };
}

export function getProductAvailability(product: ProductContract, variant?: ProductVariant | null) {
  if (variant) return getAvailabilityCopy(variant);
  const availableVariant = getDefaultVariant(product);
  return getAvailabilityCopy(availableVariant);
}

export function getMerchandisingBadges(product: ProductContract) {
  const badges: string[] = [];
  if (product.merchandising?.isNewArrival) badges.push('Nuevo ingreso');
  if (product.merchandising?.isBestSeller) badges.push('Mas elegido');
  if (product.merchandising?.isFeatured) badges.push('Curado por XEORUM');
  if ((product.taxonomy?.marketTags ?? []).includes('limited')) badges.push('Edicion limitada');
  return badges;
}

export function getVisibleSoldCount(product: ProductContract) {
  if (!product.salesStats?.soldCount || product.salesStats.soldCountDisplayMode === 'hidden') return null;
  if (product.salesStats.soldCountDisplayMode === 'rounded') {
    return `${Math.max(10, Math.floor(product.salesStats.soldCount / 10) * 10)}+ elegidas`;
  }
  return `${product.salesStats.soldCount} elegidas`;
}

export function getVisibleRating(product: ProductContract) {
  if (!product.reviews?.ratingCount || !product.reviews.reviewCount) return null;
  return `${product.reviews.ratingAverage.toFixed(1)} · ${product.reviews.reviewCount} resenas`;
}

export function formatProductLabel(value?: string | null) {
  if (!value) return '';
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
}

export function getVariantColorOptions(variants: ProductVariant[]) {
  return Array.from(new Set(variants.map((variant) => variant.color).filter(Boolean))) as string[];
}

export function formatProductPrice(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency,
      maximumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    }).format(amount);
  } catch {
    return `${amount} ${currency}`;
  }
}
