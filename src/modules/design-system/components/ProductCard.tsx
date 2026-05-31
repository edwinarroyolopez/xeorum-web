import React from 'react';
import type { ProductContract } from '@xeorum/contracts';
import { EditorialCard } from './EditorialCard';
import { LinkButton } from './Button';
import styles from './ProductCard.module.css';
import { Eyebrow } from '../primitives/Eyebrow';
import { Text } from '../primitives/Text';
import { ProductVisualFrame } from '../patterns/ProductVisualFrame';
import {
  formatProductLabel,
  formatProductPrice,
  getDisplayPrice,
  getHoverProductMedia,
  getPrimaryProductMedia,
} from '../../products/services/product.helpers';

export function ProductCard({ product }: Readonly<{ product: ProductContract }>) {
  const coverImage = getPrimaryProductMedia(product);
  const hoverImage = getHoverProductMedia(product);
  const price = getDisplayPrice(product);
  const variants = product.variants ?? [];
  const defaultVariant = variants.find((variant) => variant.available) ?? variants[0];
  const archetypeLabel = product.archetypes.primary?.slug ? `Fuerza ${formatProductLabel(product.archetypes.primary.slug)}` : 'Seleccion abierta';
  const compactSignals = 'Poder · Dominio · Liderazgo';
  const description = product.shortDescription ?? product.subtitle ?? product.narrative ?? product.description ?? '';
  const affinity = product.archetypes.primary?.score;
  const stockLabel = defaultVariant ? `${Math.max(defaultVariant.stockAvailable, 0)} piezas` : 'Sin stock';

  return (
    <EditorialCard className={styles.card}>
      <ProductVisualFrame
        {...(styles.visualFrame ? { className: styles.visualFrame } : {})}
        meta={<div className={styles.visualMetaRow}>{product.productDetails?.color ? <span>{product.productDetails.color}</span> : <span>Seleccion XEORUM</span>}<strong>{formatProductPrice(price.basePrice, price.currency)}</strong><span hidden>{formatProductPrice(price.currentPrice, price.currency)}</span></div>}
        >
        {coverImage ? (
          <img src={coverImage.url} alt={coverImage.alt || ''} className={styles.imageMedia} />
        ) : (
          <div className={styles.visualFallback}>
            <Text tone="muted">Media pendiente de publicacion</Text>
          </div>
        )}
        {hoverImage && hoverImage.url !== coverImage?.url ? <img src={hoverImage.url} alt={hoverImage.alt || ''} className={styles.imageHover} /> : null}
      </ProductVisualFrame>
      <div className={styles.body}>
        <div className={styles.header}>
          <Eyebrow tone="muted">{archetypeLabel}</Eyebrow>
          <div className={styles.titleRow}>
            <h3 className={styles.title}>{product.name}</h3>
          </div>
          <p className={styles.materialNote}>{compactSignals}</p>
          {description ? <p className={styles.description}>{description}</p> : null}
        </div>
        <div className={styles.footer}>
          <div className={styles.footerCopy}>
            <div className={styles.statsRow}>
              <span>{stockLabel}</span>
              {affinity ? <span>afinidad {affinity}%</span> : null}
            </div>
          </div>
          <div className={styles.actions}>
            <LinkButton href={`/products/${product.slug}`} size="md" {...(styles.cta ? { className: styles.cta } : {})}>Ver pieza</LinkButton>
          </div>
        </div>
      </div>
    </EditorialCard>
  );
}
