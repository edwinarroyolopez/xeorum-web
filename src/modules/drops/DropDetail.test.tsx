import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { DropDetail } from './DropDetail';

const useDrop = vi.fn();

vi.mock('./drops.queries', () => ({
  useDrop: (...args: unknown[]) => useDrop(...args),
}));

vi.mock('../products/components/ProductsGrid', () => ({
  ProductsGrid: ({ drop }: { drop: string }) => <div>ProductsGrid:{drop}</div>,
}));

describe('DropDetail', () => {
  it('renders editorial drop intro and products grid', () => {
    useDrop.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        slug: 'zeus-night',
        name: 'Zeus Night',
        status: 'SCHEDULED',
        archetypeSlug: 'zeus',
        manifesto: 'Command after dark.',
        visualMood: 'Storm-lit evening authority.',
      },
    });

    const html = renderToStaticMarkup(<DropDetail slug="zeus-night" />);

    expect(html).toContain('Zeus Night');
    expect(html).toContain('Producto visible');
    expect(html).toContain('El drop abre una lectura, pero la pieza sigue siendo la entrada principal.');
    expect(html).toContain('ProductsGrid:zeus-night');
  });
});
