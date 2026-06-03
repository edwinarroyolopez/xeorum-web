import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import ProductsPage from './page';

vi.mock('../../../modules/products/components/ProductsGrid', () => ({
  ProductsGrid: ({ archetype, drop }: { archetype?: string; drop?: string }) => <div data-archetype={archetype ?? ''} data-drop={drop ?? ''}>Products grid</div>,
}));

describe('products page', () => {
  it('forwards archetype and drop filters from search params', async () => {
    const html = renderToStaticMarkup(await ProductsPage({ searchParams: Promise.resolve({ archetype: 'ares', drop: 'ember-night' }) }));

    expect(html).toContain('data-archetype="ares"');
    expect(html).toContain('data-drop="ember-night"');
  });
});
