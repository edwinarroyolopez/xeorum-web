import type { ProductContract, ProductDetails, ProductVariant } from '@xeorum/contracts';
import { getPantheonPath } from '../../pantheon/pantheon.routes';
import { formatProductLabel, getAvailabilityCopy, getDisplayPrice, getProductGallery } from './product.helpers';

export type ProductBadgeItem = {
  label: string;
  tone?: 'default' | 'accent' | 'success' | 'warning' | 'danger';
};

export type ProductFactItem = {
  label: string;
  value: string;
};

export type ProductTechnicalTab = {
  id: string;
  label: string;
  items: ProductFactItem[];
};

function buildFactItem(label: string, value?: string | number | null) {
  if (value === null || value === undefined) return null;
  const normalized = typeof value === 'number' ? String(value) : value.trim();
  return normalized ? { label, value: normalized } : null;
}

export function getProductCareCopy(details: ProductDetails) {
  if (Array.isArray(details.careInstructions)) {
    return details.careInstructions.filter(Boolean).join(' · ');
  }

  return null;
}

export function buildTechnicalTabsFromDetails(details: ProductDetails): ProductTechnicalTab[] {
  const detailsItems = [
    buildFactItem('Material', details.material),
    buildFactItem('Fit', details.fit),
    buildFactItem('Color', details.color),
    buildFactItem('Weight', details.gsm ? `${details.gsm} GSM` : null),
    buildFactItem('Origen', details.origin),
    buildFactItem('Tecnica', details.printTechnique),
  ].filter(Boolean) as ProductFactItem[];

  const careItems = [buildFactItem('Cuidado', getProductCareCopy(details))].filter(Boolean) as ProductFactItem[];

  return [
    detailsItems.length > 0 ? { id: 'details', label: 'Detalles', items: detailsItems } : null,
    careItems.length > 0 ? { id: 'care', label: 'Cuidado', items: careItems } : null,
  ].filter(Boolean) as ProductTechnicalTab[];
}

export function buildProductDetailViewModel(product: ProductContract, selectedVariant: ProductVariant | null) {
  const taxonomy = product.taxonomy;
  const availability = getAvailabilityCopy(selectedVariant);
  const archetypeName = product.archetypes.primary?.slug ? formatProductLabel(product.archetypes.primary.slug) : null;
  const gallery = getProductGallery(product);
  const price = getDisplayPrice(product, selectedVariant);
  const technicalTabs = buildTechnicalTabsFromDetails(product.productDetails);

  const quickReadBadges = [
    archetypeName ? { label: archetypeName } : null,
    selectedVariant?.size ? { label: `Talla ${selectedVariant.size}`, tone: 'accent' as const } : null,
    product.productDetails.color ? { label: product.productDetails.color } : null,
  ].filter(Boolean) as ProductBadgeItem[];

  const productSignals = [
    product.productDetails.fit ? `Fit ${product.productDetails.fit}` : null,
    product.productDetails.material,
    product.productDetails.color,
    taxonomy?.dropSlug ? `Drop ${formatProductLabel(taxonomy.dropSlug)}` : null,
    ...(taxonomy?.marketTags ?? []).map((tag) => formatProductLabel(tag)),
  ].filter(Boolean).slice(0, 3) as string[];

  const contextBadges = [
    taxonomy?.dropSlug ? { label: formatProductLabel(taxonomy.dropSlug) } : null,
    ...(taxonomy?.marketTags ?? []).map((tag) => ({ label: formatProductLabel(tag) })),
  ].filter(Boolean).slice(0, 4) as ProductBadgeItem[];

  return {
    gallery,
    price,
    availability,
    archetypeName,
    productSignals,
    presenceItems: [
      {
        label: 'Presencia',
        value: archetypeName ?? 'Open Market',
        description: product.productDetails.fit ? `Fit ${product.productDetails.fit}` : 'Lectura abierta de silueta y materialidad.',
      },
      {
        label: 'Disponibilidad',
        value: availability.label,
        description: availability.detail,
      },
    ],
    quickReadCard: {
      label: 'Lectura rapida',
      description: product.shortDescription ?? product.description,
      badges: quickReadBadges,
    },
    purchaseHero: {
      kicker: archetypeName ? `Fuerza ${archetypeName}` : 'Seleccion abierta',
      title: product.name,
      subtitle: product.subtitle ?? null,
    },
    technicalTabs,
    storyCard: {
      title: 'Marco identitario',
      description: product.description,
      narrative: product.narrative ?? null,
      archetypeHref: product.archetypes.primary?.slug ? getPantheonPath(product.archetypes.primary.slug) : null,
      archetypeLabel: archetypeName,
    },
    detailPanel: {
      title: 'Detalles sin ruido.',
      description: 'La informacion tecnica aparece despues de la decision de compra. No compite con el precio ni con el boton principal.',
    },
    commercialContext: {
      label: 'Contexto comercial',
      description: 'Senales editadas para entender la pieza en una lectura rapida y consistente.',
      badges: contextBadges,
    },
  };
}
