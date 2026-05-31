'use client';

import React, { useState } from 'react';
import type { ReactNode } from 'react';
import type { ProductContract } from '@xeorum/contracts';
import { ProductVisualFrame } from '../../design-system';
import { ProductMediaRail } from './ProductMediaRail';

export function ProductHeroGallery({
  media,
  brand = 'XEORUM',
  label = 'Galeria editorial',
  quickNote,
}: Readonly<{
  media: ProductContract['media']['gallery'];
  brand?: ReactNode;
  label?: ReactNode;
  quickNote?: ReactNode;
}>) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMedia = media[activeIndex];

  if (!activeMedia) {
    return <div className="xeorum-product-media-fallback xeorum-product-hero-frame">Media pendiente de publicacion</div>;
  }

  return (
    <div className="xeorum-product-hero-gallery">
      <div className="xeorum-product-gallery">
        <ProductVisualFrame className="xeorum-product-gallery-stage xeorum-product-hero-frame" brand={brand} label={label}>
          <img src={activeMedia.url} alt={activeMedia.alt || ''} className="xeorum-product-gallery-image" />
        </ProductVisualFrame>
        <ProductMediaRail media={media} activeIndex={activeIndex} onSelect={setActiveIndex} />
      </div>
      {quickNote ? <div className="xeorum-product-hero-gallery-note">{quickNote}</div> : null}
    </div>
  );
}
