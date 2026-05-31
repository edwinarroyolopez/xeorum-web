import type { HomeEntryPoint, HomeJourneyStep, HomePortalFallback, HomeQuestion, HomeValuePillar } from './home.types';

export const homeIdentitySignals = [
  'Preferencia por silueta estructurada',
  'Atraccion por simbolos de autoridad',
  'Compra guiada por presencia visual',
  'Afinidad con piezas oscuras y pesadas',
] as const;

export const heroSignals: readonly string[] = ['Streetwear premium', 'Compra directa sin friccion', 'Ritual opcional'] as const;

export const homeEntryPoints: readonly HomeEntryPoint[] = [
  { label: 'Compra directa' },
  { label: 'Ritual opcional' },
  { label: 'Portal personal' },
] as const;

export const homeJourneySteps: readonly HomeJourneyStep[] = [
  {
    step: '01',
    title: 'Producto',
    body: 'El cliente ve prendas reales, precio, fit, stock y textura antes de entrar al mito.',
  },
  {
    step: '02',
    title: 'Senal',
    body: 'Cada clic, color y arquetipo empieza a construir una lectura silenciosa.',
  },
  {
    step: '03',
    title: 'Ritual',
    body: 'El test afina la identidad sin bloquear la compra ni frenar el deseo.',
  },
  {
    step: '04',
    title: 'Portal',
    body: 'La marca devuelve un universo curado: historia, productos, simbolos y recomendaciones.',
  },
] as const;

export const homeQuestions: readonly HomeQuestion[] = [
  {
    id: '01',
    title: 'Que fuerza moldea tu presencia?',
    options: ['Dominio', 'Belleza', 'Profundidad', 'Estrategia'],
  },
  {
    id: '02',
    title: 'Como quieres ser recordado?',
    options: ['Dominio', 'Belleza', 'Profundidad', 'Estrategia'],
  },
  {
    id: '03',
    title: 'Que prenda usarias como armadura diaria?',
    options: ['Dominio', 'Belleza', 'Profundidad', 'Estrategia'],
  },
] as const;

export const homeDetailTiles: readonly HomeValuePillar[] = [
  {
    icon: 'ruler',
    title: 'Materialidad',
    body: 'Peso, fit, textura y acabado se comunican como prueba de valor. La narrativa no sustituye el producto.',
  },
  {
    icon: 'shield',
    title: 'Confianza',
    body: 'Stock, talla, reserva, pago y orden deben verse sobrios, rapidos y sin teatralidad excesiva.',
  },
  {
    icon: 'sparkles',
    title: 'Deseo',
    body: 'El portal anade historia, simbolo y pertenencia para elevar el ticket y la recordacion de marca.',
  },
] as const;

export const homeCheckoutSignals = [
  'Carrito con talla y stock reales',
  'Reserva temporal de inventario',
  'Pago sin ruido visual',
  'Confirmacion + ruta de seguimiento',
] as const;

export const homePortalFallbacks: readonly HomePortalFallback[] = [
  {
    slug: 'zeus',
    name: 'ZEUS',
    title: 'Poder',
    body: 'La presencia que ordena sin pedir permiso.',
    note: 'Dominio visual, autoridad y peso simbolico.',
  },
  {
    slug: 'athena',
    name: 'ATHENA',
    title: 'Estrategia',
    body: 'Precision, juicio y disciplina visual.',
    note: 'Cortes sobrios, detalles limpios, inteligencia estetica.',
  },
  {
    slug: 'hades',
    name: 'HADES',
    title: 'Profundidad',
    body: 'Soberania interior, silencio y control.',
    note: 'Negro, textura, misterio y fuerza contenida.',
  },
  {
    slug: 'aphrodite',
    name: 'APHRODITE',
    title: 'Atraccion',
    body: 'Belleza que conecta sin explicar demasiado.',
    note: 'Suavidad, magnetismo, armonia y presencia sensorial.',
  },
] as const;
