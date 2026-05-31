'use client';

import React from 'react';
import type { ProductContract } from '@xeorum/contracts';
import { ProductHeroGallery } from './ProductHeroGallery';

export function ProductGallery({ media }: Readonly<{ media: ProductContract['media']['gallery'] }>) {
  return <ProductHeroGallery media={media} />;
}
