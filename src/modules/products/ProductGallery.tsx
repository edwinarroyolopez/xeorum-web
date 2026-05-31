'use client';

import React, { useState } from 'react';
import type { ProductContract } from '@xeorum/contracts';
import { ProductMediaRail } from './ProductMediaRail';

export function ProductGallery({ media }: Readonly<{ media: ProductContract['media']['gallery'] }>) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMedia = media[activeIndex];

  if (!activeMedia) {
    return <div className="xeorum-product-media-fallback">Media pendiente de publicacion</div>;
  }

  return (
    <div className="xeorum-product-gallery">
      <div className="xeorum-product-gallery-stage">
        <img src={activeMedia.url} alt={activeMedia.alt || ''} className="xeorum-product-gallery-image" />
      </div>
      <ProductMediaRail media={media} activeIndex={activeIndex} onSelect={setActiveIndex} />
    </div>
  );
}
