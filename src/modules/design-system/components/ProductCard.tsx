import React from 'react';
import type { ProductContract } from '@xeorum/contracts';
import Link from 'next/link';
import { Card } from './Card';
import { LinkButton } from './Button';
import { Text } from '../primitives/Text';
import { ProductSignalStrip } from '../patterns/ProductSignalStrip';
import {
  formatProductLabel,
  getDisplayPrice,
  getHoverProductMedia,
  getMerchandisingBadges,
  getPrimaryProductMedia,
  getProductAvailability,
  getVisibleRating,
  getVisibleSoldCount,
} from '../../products/product.helpers';
import { ProductAvailabilityBadge } from '../../products/ProductAvailabilityBadge';
import { ProductPrice } from '../../products/ProductPrice';

export function ProductCard({ product }: Readonly<{ product: ProductContract }>) {
  const coverImage = getPrimaryProductMedia(product);
  const hoverImage = getHoverProductMedia(product);
  const price = getDisplayPrice(product);
  const variants = product.variants ?? [];
  const defaultVariant = variants.find((variant) => variant.available) ?? variants[0];
  const availability = getProductAvailability(product, defaultVariant);
  const archetypeLabel = product.archetypes.primary?.slug ? `Fuerza ${formatProductLabel(product.archetypes.primary.slug)}` : 'Seleccion abierta';
  const badges = getMerchandisingBadges(product);
  const rating = getVisibleRating(product);
  const soldCount = getVisibleSoldCount(product);
  const taxonomy = product.taxonomy;
  const primarySignals = [
    product.productDetails?.fit,
    product.productDetails?.material,
    product.productDetails?.color,
    taxonomy?.dropSlug ? `Drop ${formatProductLabel(taxonomy.dropSlug)}` : null,
    taxonomy?.marketTags?.[0] ? formatProductLabel(taxonomy.marketTags[0]) : null,
  ].filter(Boolean).slice(0, 3) as string[];
  const description = product.shortDescription ?? product.subtitle ?? product.description ?? '';

  return (
    <Card className="product-card">
      <div className="product-card-image-shell">
        <div className="product-card-image-badges">
          {badges.map((badge) => (
            <span key={badge} className="product-signal-badge">{badge}</span>
          ))}
        </div>
        <div className="product-card-image">
          {coverImage ? <img src={coverImage.url} alt={coverImage.alt || ''} className="product-card-image-media" /> : <Text tone="muted">Media pendiente de publicacion</Text>}
          {hoverImage && hoverImage.url !== coverImage?.url ? <img src={hoverImage.url} alt={hoverImage.alt || ''} className="product-card-image-hover" /> : null}
        </div>
      </div>
      <div className="product-card-header">
        <Text tone="muted" className="portal-card-kicker">{archetypeLabel}</Text>
        <h3>{product.name}</h3>
        {description ? <p>{description}</p> : null}
      </div>
      <ProductSignalStrip signals={primarySignals} className="product-meta-curated" />
      <div className="product-card-signals">
        <ProductAvailabilityBadge label={availability.label} tone={availability.tone} />
        {rating ? <span>{rating}</span> : null}
        {soldCount ? <span>{soldCount}</span> : null}
      </div>
      <div className="product-bottom">
        <ProductPrice price={price} />
        <div className="product-card-actions">
          {product.archetypes.primary?.slug ? <Link href={`/identity/${product.archetypes.primary.slug}`} className="product-inline-link">Portal</Link> : null}
          <LinkButton href={`/products/${product.slug}`}>Abrir pieza</LinkButton>
        </div>
      </div>
    </Card>
  );
}
