import React from 'react';
import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { DisplayTitle, EditorialBody, EditorialCard, EditorialPill, Eyebrow, IdentityInsightPanel, JourneyCard, OrnamentalLine, ProductConstructionPanel, ProductPresenceGrid, ProductSummaryPanel, ProductTitleBlock, ProductVariantPanel, ProductVisualFrame } from '..';

describe('editorial design system', () => {
  it('renders editorial primitives', () => {
    const html = renderToStaticMarkup(
      <EditorialCard>
        <Eyebrow>Pieza curada</Eyebrow>
        <DisplayTitle as="h2">Silencio visible</DisplayTitle>
        <OrnamentalLine />
        <EditorialBody>Lectura sobria y clara.</EditorialBody>
        <EditorialPill>Curado</EditorialPill>
      </EditorialCard>,
    );

    expect(html).toContain('ds-eyebrow');
    expect(html).toContain('ds-display-title');
    expect(html).toContain('ds-ornamental-line');
    expect(html).toContain('ds-editorial-pill');
  });

  it('renders editorial product patterns', () => {
    const html = renderToStaticMarkup(
      <>
        <ProductTitleBlock eyebrow="Fuerza Hades" title="Hades Heavy Tee" subtitle="Producto primero, narrativa despues." />
        <ProductVisualFrame brand="XEORUM" label="Hades" badge="Best Seller" meta={<strong>$92</strong>}>
          <img src="https://cdn.example.com/product.jpg" alt="Producto" />
        </ProductVisualFrame>
        <ProductSummaryPanel label="Lectura rapida" value="Hades" description="Compra clara." />
        <ProductPresenceGrid items={[{ label: 'Presencia', value: 'Hades', description: 'Oversized' }]} />
        <ProductVariantPanel label="Talla y disponibilidad" description="Selecciona una talla." activeCopy="M seleccionada">
          <div>Tallas</div>
        </ProductVariantPanel>
        <ProductConstructionPanel label="Construccion" items={[{ label: 'Material', value: 'Cotton' }]} />
      </>,
    );

    expect(html).toContain('Hades Heavy Tee');
    expect(html).toContain('Best Seller');
    expect(html).toContain('M seleccionada');
    expect(html).toContain('Material');
  });

  it('renders supporting editorial patterns', () => {
    const html = renderToStaticMarkup(
      <>
        <IdentityInsightPanel eyebrow="Identidad viva" title="ZEUS" description="Autoridad serena." signals={['Fit estructurado', 'Peso simbolico']} />
        <JourneyCard step="01" title="Producto" body="La pieza abre la entrada." />
      </>,
    );

    expect(html).toContain('Identidad viva');
    expect(html).toContain('ZEUS');
    expect(html).toContain('01');
  });
});
