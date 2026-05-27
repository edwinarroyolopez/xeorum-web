import { describe, expect, it } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { BrandMark } from '../../components/ui/BrandMark';

describe('frontend smoke', () => {
  it('renders XEØRUM brand mark', () => {
    const html = renderToStaticMarkup(<BrandMark />);
    expect(html).toContain('XEØRUM');
  });
});
