import { describe, expect, it } from 'vitest';
import { getPantheonPath, getPantheonProductsPath } from './pantheon.routes';

describe('pantheon routes', () => {
  it('builds the canonical public pantheon path', () => {
    expect(getPantheonPath('ares')).toBe('/pantheon/ares');
  });

  it('builds a filtered products path for an archetype', () => {
    expect(getPantheonProductsPath('ares')).toBe('/products?archetype=ares');
  });
});
