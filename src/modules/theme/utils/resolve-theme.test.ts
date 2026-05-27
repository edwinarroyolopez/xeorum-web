import { describe, expect, it } from 'vitest';
import { resolveTheme, xeorumDarkTheme } from './resolve-theme';

describe('resolveTheme', () => {
  it('returns the XEØRUM dark theme by default', () => {
    expect(resolveTheme()).toEqual(xeorumDarkTheme);
  });
});
