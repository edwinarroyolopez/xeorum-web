import React from 'react';
import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import ProfilePlaceholderPage from './page';

describe('profile smoke', () => {
  it('renders access to internal tools', () => {
    const html = renderToStaticMarkup(<ProfilePlaceholderPage />);
    expect(html).toContain('Internal Tools');
  });
});
