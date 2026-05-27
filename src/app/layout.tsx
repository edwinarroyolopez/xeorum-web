import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../styles/reset.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'XEØRUM',
  description: 'Identity-driven commerce system for XEØRUM.',
  metadataBase: new URL('https://xeorum.com'),
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
