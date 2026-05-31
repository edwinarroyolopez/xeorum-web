import React from 'react';
import type { ProductContract } from '@xeorum/contracts';

export function ProductMediaRail({
  media,
  activeIndex,
  onSelect,
}: Readonly<{
  media: ProductContract['media']['gallery'];
  activeIndex: number;
  onSelect: (index: number) => void;
}>) {
  if (media.length <= 1) return null;

  return (
    <div className="product-media-rail" role="list" aria-label="Galeria de producto">
      {media.map((item, index) => (
        <button
          key={`${item.url}-${index}`}
          type="button"
          className={`product-media-thumb${index === activeIndex ? ' is-active' : ''}`}
          onClick={() => onSelect(index)}
          aria-pressed={index === activeIndex}
          aria-label={`Ver media ${index + 1}`}
        >
          <img src={item.url} alt={item.alt || ''} className="product-media-thumb-image" />
        </button>
      ))}
    </div>
  );
}
