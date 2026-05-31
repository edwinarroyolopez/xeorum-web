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
  getProductAvailability,
  getVisibleRating,
  getVisibleSoldCount,
} from '../../products/product.helpers';
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
  ].filter(Boolean).slice(0, 1) as string[];
  const description = product.shortDescription ?? product.subtitle ?? product.narrative ?? product.description ?? '';
  const affinity = product.archetypes.primary?.score;
  const primaryBadge = badges[0] ?? null;
  const stockNote = affinity ? `${affinity}% afinidad` : null;

  return (
    <EditorialCard className="product-card">
      <ProductVisualFrame
        className="product-card-visual-frame"
        badge={primaryBadge}
        meta={
          <div className="product-card-visual-meta-row">
            {product.productDetails?.color ? <span>{product.productDetails.color}</span> : <span>Seleccion XEORUM</span>}
            <strong>{formatProductPrice(price.currentPrice, price.currency)}</strong>
          </div>
        }
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
          <Eyebrow>{archetypeLabel}</Eyebrow>
          <div className="product-card-title-row">
            <h3>{product.name}</h3>
          </div>
          {primarySignals.length ? <p className="product-card-material-note">{primarySignals.join(' · ')}</p> : null}
          {description ? <p>{description}</p> : null}
        </div>
        {rating || soldCount ? (
          <div className="product-card-signals product-card-signal-row">
            <div className="product-card-metrics">
              {rating ? <span>{rating}</span> : null}
              {soldCount ? <span>{soldCount}</span> : null}
            </div>
          </div>
        ) : null}
      </div>
      <div className="product-bottom product-card-footer">
        <div className="product-card-footer-copy">
          <div className="product-card-stock-note">{availability.label}{stockNote ? ` · ${stockNote}` : ''}</div>
          <ProductPrice price={price} />
        </div>
        <ActionRow className="product-card-actions" justify="end">
          {product.archetypes.primary?.slug ? <Link href={`/identity/${product.archetypes.primary.slug}`} className="product-inline-link">Portal</Link> : null}
          <LinkButton href={`/products/${product.slug}`}>Abrir pieza</LinkButton>
        </ActionRow>
      </div>
    </EditorialCard>
  );
}
