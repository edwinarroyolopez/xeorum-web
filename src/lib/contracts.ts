export type ResponseEnvelope<T> = {
  data: T;
  meta?: Record<string, unknown>;
  requestId?: string;
};

export type ErrorEnvelope = {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  requestId?: string;
};

export type PaginationContract = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type ArchetypeContract = {
  id: string;
  slug: string;
  name: string;
  energy?: string;
  mantra?: string;
  palette?: string[];
  visualMood?: string;
  manifesto?: string;
  ctaLabel?: string;
};

export type IdentityResultContract = {
  dominantArchetype: ArchetypeContract;
  secondaryArchetypes: ArchetypeContract[];
  scores: Record<string, number>;
  confidence: number;
  narrative?: string;
  narrativeTitle?: string;
};

export type ProductContract = {
  id: string;
  slug: string;
  name: string;
  archetypeId: string;
  archetypeSlug?: string;
  energy?: string;
  fit?: string;
  material?: string;
  gsm?: number;
  printTechnique?: string;
  color?: string;
  gallery?: string[];
  price?: number;
  currency?: string;
  narrative?: string;
  story?: string;
  identityCompatibility?: number;
  availableSizes?: string[];
  inventoryBySize?: Record<string, number>;
  dropSlug?: string;
};

export type DropContract = {
  id: string;
  slug: string;
  name: string;
  archetypeSlug: string;
  status: 'DRAFT' | 'SCHEDULED' | 'LIVE' | 'SOLD_OUT' | 'ARCHIVED';
  manifesto: string;
  visualMood: string;
};

export type ArchetypeContentContract = {
  archetypeSlug: string;
  status: 'draft' | 'published';
  manifesto: string;
  visualMood: string;
  ctaLabel: string;
  version: number;
};

export type ArchetypeThemePresetContract = {
  archetypeSlug: string;
  status: 'draft' | 'published';
  accent: string;
  accentSoft: string;
  panel: string;
  version: number;
};

export type AuditLogContract = {
  id: string;
  actor: string;
  action: string;
  target: string;
  targetId: string;
  requestId?: string;
  createdAt: string;
};

export type RecommendationContract = {
  basedOnArchetype: string;
  explanation: string;
  outfitExplanation?: string;
  recommendedProducts: ProductContract[];
  recommendedDrops: DropContract[];
  sameArchetype: ProductContract[];
  contrastingArchetype: ProductContract[];
  completeTheLook: ProductContract[];
};

export type CartItemContract = {
  productId: string;
  productSlug: string;
  productName: string;
  size: string;
  quantity: number;
  unitPrice: number;
  currency: string;
  archetypeSlug: string;
};

export type CartContract = {
  cartId: string;
  anonymousId: string | null;
  userId: string | null;
  items: CartItemContract[];
  subtotal: number;
  currency: string;
  itemCount: number;
};

export type CheckoutContract = {
  checkoutSessionId: string;
  orderId: string;
  paymentId: string;
  status: 'draft' | 'pending_payment' | 'paid' | 'failed' | 'cancelled';
  subtotal: number;
  currency: string;
  reservedUntil: string;
};

export type PaymentStatusContract = {
  paymentId: string;
  status: 'pending' | 'succeeded' | 'failed' | 'refunded';
};

export type OrderContract = {
  orderId: string;
  checkoutSessionId: string;
  status: 'DRAFT' | 'PENDING_PAYMENT' | 'PAID' | 'FAILED' | 'CANCELLED' | 'FULFILLING' | 'FULFILLED' | 'REFUNDED';
  items: CartItemContract[];
  subtotal: number;
  currency: string;
};
