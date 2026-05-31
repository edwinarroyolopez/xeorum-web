import React from 'react';
import type { ElementType } from 'react';
import { XEORUM_BRAND_NAME } from '../../modules/brand';

export function BrandMark({ as: Tag = 'h1' }: Readonly<{ as?: ElementType }>) {
  return <Tag className="brand-mark">{XEORUM_BRAND_NAME}</Tag>;
}
