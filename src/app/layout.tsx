import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { BrandMark } from '../components/ui/BrandMark';
import { HomeIcon } from '../modules/home/components/HomeIcon';
import { getPublicThemeContract } from '../modules/theme/public-theme.api';
import '../styles/reset.css';
import '../modules/home/styles/home.css';
import '../modules/products/styles/products.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'XEØRUM',
  description: 'Streetwear premium, presencia visible, portales arquetipicos y compra curada sin friccion.',
  metadataBase: new URL('https://xeorum.com'),
};

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const initialThemeContract = await getPublicThemeContract();

  return (
    <html lang="es">
      <body>
        <Providers initialThemeContract={initialThemeContract}>
            <div className="site-shell">
              <header className="site-header">
                <Link href="/" className="site-brand" aria-label="Ir al inicio de XEORUM">
                  <BrandMark as="span" />
                </Link>
                <nav className="site-nav" aria-label="Navegacion principal">
                  <Link href="/products">Productos</Link>
                  <Link href="/pantheon">Portales</Link>
                  <Link href="/drops">Drops</Link>
                  <Link href="/identity">Test de identidad</Link>
                </nav>
                <div className="site-header-actions">
                  <Link href="/products" className="site-header-icon-link" aria-label="Buscar productos">
                    <HomeIcon name="search" />
                  </Link>
                  <Link href="/identity" className="site-header-icon-link" aria-label="Ir a mi fuerza">
                    <HomeIcon name="user" />
                  </Link>
                  <Link href="/cart" className="site-header-icon-link site-header-cart-link" aria-label="Ir al carrito">
                    <HomeIcon name="bag" />
                    <span className="site-header-cart-badge">1</span>
                  </Link>
                </div>
              </header>
              {children}
              <footer className="site-footer">
                <p>Producto visible. Deseo inmediato. Identidad cuando afina la seleccion.</p>
              </footer>
            </div>
        </Providers>
      </body>
    </html>
  );
}
