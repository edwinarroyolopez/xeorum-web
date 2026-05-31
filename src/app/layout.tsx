import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { BrandMark } from '../components/ui/BrandMark';
import '../styles/reset.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'XEØRUM',
  description: 'Streetwear premium con identidad profunda, portales arquetipicos y compra curada.',
  metadataBase: new URL('https://xeorum.com'),
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <Providers>
            <div className="site-shell">
              <header className="site-header">
                <Link href="/" className="site-brand" aria-label="Ir al inicio de XEORUM">
                  <BrandMark as="span" />
                </Link>
                <nav className="site-nav" aria-label="Navegacion principal">
                  <Link href="/products">Ver productos</Link>
                  <Link href="/identity">Descubrir mi fuerza</Link>
                  <Link href="/pantheon">Pantheon</Link>
                  <Link href="/cart">Carrito</Link>
                </nav>
              </header>
              {children}
              <footer className="site-footer">
                <p>Streetwear premium. Producto primero. Identidad cuando aporta profundidad real.</p>
              </footer>
            </div>
        </Providers>
      </body>
    </html>
  );
}
