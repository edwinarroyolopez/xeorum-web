export function getPantheonPath(slug: string) {
  return `/pantheon/${encodeURIComponent(slug)}`;
}

export function getPantheonProductsPath(slug: string) {
  const search = new URLSearchParams({ archetype: slug });
  return `/products?${search.toString()}`;
}
