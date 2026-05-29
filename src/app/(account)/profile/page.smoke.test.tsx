import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import ProfilePlaceholderPage from './page';

describe('profile smoke', () => {
  it('renders customer profile content without admin access', () => {
    const queryClient = new QueryClient();
    const html = renderToStaticMarkup(
      <QueryClientProvider client={queryClient}>
        <ProfilePlaceholderPage />
      </QueryClientProvider>
    );
    expect(html).toContain('Profile');
    expect(html).toContain('Customer identity and account controls.');
    expect(html).not.toContain('/admin');
    expect(html).not.toContain('Internal Tools');
  });
});
