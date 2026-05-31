'use client';

import React, { useState } from 'react';
import type { ProductContract } from '@xeorum/contracts';
import { ProductVisualFrame } from '../../design-system';
import { ProductMediaRail } from './ProductMediaRail';

export function ProductGallery({ media }: Readonly<{ media: ProductContract['media']['gallery'] }>) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMedia = media[activeIndex];

  if (!activeMedia) {
    return <div className="xeorum-product-media-fallback xeorum-product-hero-frame">Media pendiente de publicacion</div>;
  }

  return (
    <div className="xeorum-product-gallery">
      <ProductVisualFrame className="xeorum-product-gallery-stage xeorum-product-hero-frame" brand="XEORUM" label="Galeria editorial">
        <img src={activeMedia.url} alt={activeMedia.alt || ''} className="xeorum-product-gallery-image" />
      </ProductVisualFrame>
      <ProductMediaRail media={media} activeIndex={activeIndex} onSelect={setActiveIndex} />
    </div>
  );
}
