import React from 'react';
import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import ProfilePlaceholderPage from './page';

describe('profile smoke', () => {
  it('renders customer profile content without admin access', () => {
    const html = renderToStaticMarkup(<ProfilePlaceholderPage />);
    expect(html).toContain('Profile');
    expect(html).toContain('Customer identity and account controls live here.');
    expect(html).not.toContain('/admin');
    expect(html).not.toContain('Internal Tools');
  });
});
