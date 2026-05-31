import React from 'react';
import type { ProductContract } from '@xeorum/contracts';
import Link from 'next/link';
import { ActionRow } from './ActionRow';
import { EditorialCard } from './EditorialCard';
import { LinkButton } from './Button';
import { Eyebrow } from '../primitives/Eyebrow';
import { Text } from '../primitives/Text';
import { ProductVisualFrame } from '../patterns/ProductVisualFrame';
import {
  formatProductLabel,
  formatProductPrice,
  getDisplayPrice,
  getHoverProductMedia,
  getMerchandisingBadges,
  getPrimaryProductMedia,
} from '../../products/product.helpers';
import { ProductPrice } from '../../products/ProductPrice';

export function ProductCard({ product }: Readonly<{ product: ProductContract }>) {
  const coverImage = getPrimaryProductMedia(product);
  const hoverImage = getHoverProductMedia(product);
  const price = getDisplayPrice(product);
  const identityPrice = { ...price, currentPrice: price.basePrice, compareAtPrice: undefined, salePrice: undefined, discountPercent: undefined, discountLabel: undefined };
  const variants = product.variants ?? [];
  const defaultVariant = variants.find((variant) => variant.available) ?? variants[0];
  const archetypeLabel = product.archetypes.primary?.slug ? `Fuerza ${formatProductLabel(product.archetypes.primary.slug)}` : 'Seleccion abierta';
  const badges = getMerchandisingBadges(product);
  const primarySignals = [product.productDetails?.fit, product.productDetails?.material, product.productDetails?.color]
    .filter(Boolean)
    .map((value) => formatProductLabel(value as string))
    .join(' · ');
  const description = product.shortDescription ?? product.subtitle ?? product.narrative ?? product.description ?? '';
  const affinity = product.archetypes.primary?.score;
  const primaryBadge = badges[0] ?? null;
  const stockLabel = defaultVariant ? `${Math.max(defaultVariant.stockAvailable, 0)} piezas` : 'Sin stock';

  return (
    <EditorialCard className="product-card">
      <ProductVisualFrame
        className="product-card-visual-frame"
        badge={primaryBadge}
        meta={<div className="product-card-visual-meta-row">{product.productDetails?.color ? <span>{product.productDetails.color}</span> : <span>Seleccion XEORUM</span>}<strong>{formatProductPrice(identityPrice.currentPrice, identityPrice.currency)}</strong></div>}
        >
        {coverImage ? (
          <img src={coverImage.url} alt={coverImage.alt || ''} className="product-card-image-media" />
        ) : (
          <div className="product-card-image-fallback">
            <Text tone="muted">Media pendiente de publicacion</Text>
          </div>
        )}
        {hoverImage && hoverImage.url !== coverImage?.url ? <img src={hoverImage.url} alt={hoverImage.alt || ''} className="product-card-image-hover" /> : null}
      </ProductVisualFrame>
      <div className="product-card-body">
        <div className="product-card-header">
          <Eyebrow tone="muted">{archetypeLabel}</Eyebrow>
          <div className="product-card-title-row">
            <h3>{product.name}</h3>
          </div>
          {primarySignals ? <p className="product-card-material-note">{primarySignals}</p> : null}
          {description ? <p>{description}</p> : null}
        </div>
      </div>
      <div className="product-bottom product-card-footer">
        <div className="product-card-footer-copy">
          <div className="product-card-stats-row">
            <span>{stockLabel}</span>
            {affinity ? <span>{affinity}% afinidad</span> : null}
          </div>
        </div>
        <ActionRow className="product-card-actions" justify="end">
          {product.archetypes.primary?.slug ? <Link href={`/identity/${product.archetypes.primary.slug}`} className="product-inline-link">Portal</Link> : null}
          <LinkButton href={`/products/${product.slug}`}>Abrir pieza</LinkButton>
        </ActionRow>
      </div>
    </EditorialCard>
  );
}
