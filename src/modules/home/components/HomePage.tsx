'use client';

import React, { useMemo, useState } from 'react';
import { EmptyState, ErrorState, LinkButton, LoadingState } from '../../design-system';
import { ProductCard } from '../../products/components/ProductCard';
import { useProducts } from '../../products/hooks/products.queries';
import { formatProductLabel, formatProductPrice, getDisplayPrice } from '../../products/services/product.helpers';
import { usePantheonArchetypes } from '../../pantheon/pantheon.queries';
import { orderPantheonArchetypes } from '../../pantheon/pantheon.types';
import {
  homeCheckoutSignals,
  homeDetailTiles,
  homeEntryPoints,
  homeJourneySteps,
  homePortalFallbacks,
  homeQuestions,
} from '../services/home.content';
import { HomeChecklistPanel } from './HomeChecklistPanel';
import { HomeDetailTile } from './HomeDetailTile';
import { HomeIcon } from './HomeIcon';
import { HomeIdentityPanel } from './HomeIdentityPanel';
import { HomeJourneyCard } from './HomeJourneyCard';
import { HomeMiniProductCard } from './HomeMiniProductCard';
import { HomePortalCard } from './HomePortalCard';
import { HomeProductVisual } from './HomeProductVisual';
import { HomeQuestionCard } from './HomeQuestionCard';
import { HomeSectionHeading } from './HomeSectionHeading';

export function HomePage() {
  const productsQuery = useProducts({ sort: 'featured' });
  const pantheonQuery = usePantheonArchetypes();
  const products = productsQuery.data ?? [];
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const selectedProduct = useMemo(() => {
    if (products.length === 0) return null;
    return products.find((product) => product.slug === selectedSlug) ?? products[0];
  }, [products, selectedSlug]);

  const relatedProducts = useMemo(() => {
    if (!selectedProduct) return [];
    return products.filter((product) => product.slug !== selectedProduct.slug).slice(0, 3);
  }, [products, selectedProduct]);

  const selectedPrice = selectedProduct ? getDisplayPrice(selectedProduct) : null;
  const selectedStock = selectedProduct?.variants.find((variant) => variant.available)?.stockAvailable ?? 0;
  const productAttributes = [
    selectedProduct?.productDetails.fit,
    selectedProduct?.productDetails.material,
    selectedProduct?.productDetails.color,
    `${selectedStock} piezas`,
  ].filter((item): item is string => Boolean(item));
  const portals = pantheonQuery.data ? orderPantheonArchetypes(pantheonQuery.data).slice(0, 4).map((portal) => ({
    name: portal.name.toUpperCase(),
    title: portal.coreEnergy,
    body: portal.shortManifesto,
    note: portal.corePhrase,
  })) : homePortalFallbacks;

  return (
    <main className="page-shell xeorum-home-page">
      <section className="home-shell home-hero-shell">
        <div className="home-hero-grid">
          <div className="home-hero-copy">
            <div className="home-premium-pill">
              <span />
              Premium identity commerce
            </div>
            <h1>No compras ropa. Reclamas presencia.</h1>
            <div className="home-ornamental-line" aria-hidden="true">
              <div />
              <span />
              <div />
            </div>
            <p>XEORUM debe sentirse como un templo comercial: producto visible, deseo inmediato, identidad profunda y una compra limpia. El mito no tapa la prenda; la convierte en simbolo.</p>
            <div className="home-hero-actions">
              <LinkButton href="/products" variant="primary" size="lg" className="home-primary-cta">Ver coleccion <HomeIcon name="arrow" color="black" /></LinkButton>
              <LinkButton href="/identity" variant="ghost" size="lg" className="home-secondary-cta">Iniciar test</LinkButton>
            </div>
            <div className="home-entry-grid">
              {homeEntryPoints.map((item) => <div key={item} className="home-entry-pill">{item}</div>)}
            </div>
          </div>

          <div className="home-hero-stage">
            {productsQuery.isLoading ? (
              <LoadingState title="Cargando seleccion" description="Preparando la pieza protagonista del home." variant="panel" />
            ) : null}
            {productsQuery.isError ? (
              <ErrorState title="Producto no disponible" description="No pudimos cargar la pieza protagonista del home." />
            ) : null}
            {selectedProduct ? (
              <>
                <div className="home-stage-aura" />
                <HomeProductVisual product={selectedProduct} />
                <div className="home-selected-piece">
                  <div>
                    <p className="home-kicker">Selected piece</p>
                    <h2>{selectedProduct.name}</h2>
                  </div>
                  {selectedPrice ? (
                    <div className="home-selected-piece-price">
                      <strong>{formatProductPrice(selectedPrice.basePrice, selectedPrice.currency)}</strong>
                      <span>{`${selectedStock} piezas`}</span>
                    </div>
                  ) : null}
                </div>
              </>
            ) : null}
          </div>

          <div className="home-hero-side">
            {selectedProduct ? <HomeIdentityPanel product={selectedProduct} /> : <EmptyState title="Sin identidad activa" description="Publica productos para activar la lectura viva del home." />}
          </div>
        </div>
      </section>

      <section className="home-shell home-shop-shell">
        <HomeSectionHeading
          kicker="Shop all"
          title="La tienda primero debe vender producto."
          description="Cards con prenda, precio, fit, stock y afinidad. La identidad suma valor, pero el cliente nunca queda atrapado en una experiencia abstracta."
        />
        {productsQuery.isLoading ? <LoadingState title="Cargando productos" description="Preparando la grilla principal del home." variant="panel" /> : null}
        {productsQuery.isError ? <ErrorState title="Productos no disponibles" description="No pudimos cargar la seleccion principal del home." /> : null}
        {products.length > 0 ? (
          <div className="home-products-grid">
            {products.slice(0, 4).map((product) => (
              <div
                key={product.id}
                role="button"
                tabIndex={0}
                className={`home-product-card-shell${selectedProduct?.slug === product.slug ? ' is-active' : ''}`}
                onClick={() => setSelectedSlug(product.slug)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setSelectedSlug(product.slug);
                  }
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : null}
      </section>

      <section className="home-shell home-journey-shell">
        <div className="home-journey-panel">
          <div className="home-journey-copy">
            <p className="home-kicker">Customer identity engine</p>
            <h2 className="home-section-title">La identidad se construye mientras compra.</h2>
            <p className="home-panel-copy">El cliente no debe sentir que llena un formulario. Debe sentir que el sistema lo observa con elegancia: que mira, que guarda, que responde y que simbolo elige.</p>
          </div>
          <div className="home-journey-grid">
            {homeJourneySteps.map((step) => <HomeJourneyCard key={step.step} step={step.step} title={step.title} body={step.body} />)}
          </div>
        </div>
      </section>

      <section className="home-shell home-ritual-shell">
        <div className="home-ritual-grid">
          <div className="home-ritual-panel">
            <p className="home-kicker">Ritual breve</p>
            <h2 className="home-section-title">El test no interrumpe la venta. Afina la lectura.</h2>
            <p className="home-panel-copy">La experiencia permite comprar ahora. Cuando el cliente busca profundidad, el test transforma deseo, estetica y conducta en una ruta util de producto.</p>
            <div className="home-questions-list">
              {homeQuestions.map((question) => <HomeQuestionCard key={question.id} id={question.id} title={question.title} options={question.options} />)}
            </div>
          </div>
          <div className="home-live-result-panel">
            <p className="home-kicker home-kicker-with-icon"><HomeIcon name="sparkles" color="#d8b76b" />Resultado vivo</p>
            <h2 className="home-live-result-title">{formatProductLabel(selectedProduct?.archetypes.primary?.slug ?? 'zeus').toUpperCase()}</h2>
            <p className="home-panel-copy">Tu ruta recomienda piezas con estructura visual fuerte, simbolos sobrios y materialidad pesada. La narrativa amplifica el valor percibido, pero la compra sigue siendo clara.</p>
            <div className="home-mini-product-grid">
              {relatedProducts.map((product) => <HomeMiniProductCard key={product.id} product={product} />)}
            </div>
          </div>
        </div>
      </section>

      <section className="home-shell home-portals-shell">
        <HomeSectionHeading
          kicker="Pantheon"
          title="Portales como territorios. No como categorias baratas."
          action={<LinkButton href="/pantheon" variant="ghost" size="lg" className="home-secondary-cta">Explorar portales</LinkButton>}
        />
        <div className="home-portals-grid">
          {portals.map((portal) => <HomePortalCard key={portal.name} name={portal.name} title={portal.title} body={portal.body} note={portal.note} />)}
        </div>
      </section>

      <section className="home-shell home-details-shell">
        <div className="home-details-grid">
          {homeDetailTiles.map((tile) => <HomeDetailTile key={tile.title} icon={tile.icon} title={tile.title} body={tile.body} />)}
        </div>
      </section>

      <section className="home-shell home-commerce-shell">
        <div className="home-commerce-grid">
          <div className="home-product-story-panel">
            {selectedProduct ? <HomeProductVisual product={selectedProduct} compact /> : null}
            <div className="home-product-story-copy">
              <p className="home-kicker">Product detail</p>
              <h2 className="home-section-title">{selectedProduct?.name ?? 'XEORUM Product'}</h2>
              <p className="home-panel-copy">PDP con galeria protagonista, tallas visibles, materialidad, disponibilidad y narrativa subordinada. El mito acompana; la compra no se vuelve confusa.</p>
              <div className="home-attribute-grid">
                {productAttributes.map((item) => <div key={item} className="home-attribute-chip">{item}</div>)}
              </div>
              <LinkButton href={selectedProduct ? `/products/${selectedProduct.slug}` : '/products'} variant="primary" size="lg" className="home-primary-cta">Ver producto <HomeIcon name="arrow" color="black" /></LinkButton>
            </div>
          </div>
          <HomeChecklistPanel
            kicker="Conversion premium"
            title="Checkout limpio. Orden confirmada. Identidad guardada."
            description="El cierre debe ser sobrio: reserva, pago, confirmacion y estado de orden. Los overlays simbolicos no contaminan pasos criticos."
            items={homeCheckoutSignals}
          />
        </div>
      </section>
    </main>
  );
}
