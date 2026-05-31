import type { Product } from '../../products';

export type HomeEntryPoint = {
  label: string;
};

export type HomeJourneyStep = {
  step: string;
  title: string;
  body: string;
};

export type HomeQuestion = {
  id: string;
  title: string;
  options: readonly string[];
};

export type HomeValuePillar = {
  icon: 'ruler' | 'shield' | 'sparkles';
  title: string;
  body: string;
};

export type HomePortalFallback = {
  slug: string;
  name: string;
  title: string;
  body: string;
  note: string;
};

export type HomeFeaturedProduct = Product & {
  homePriceLabel: string;
  homeStockLabel: string;
  homeArchetypeLabel: string;
};
