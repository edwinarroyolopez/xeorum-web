import { describe, expect, it } from 'vitest';
import { resolveTheme, xeorumDarkTheme } from './resolve-theme';

describe('resolveTheme', () => {
  it('returns the XEØRUM dark theme by default', () => {
    expect(resolveTheme()).toEqual(xeorumDarkTheme);
  });

  it('returns the semantic token contract expected by the web theme foundation', () => {
    expect(xeorumDarkTheme.mode).toBe('dark');
    expect(xeorumDarkTheme.semantic.background).toBeTruthy();
    expect(xeorumDarkTheme.typography.fontFamily).toBeTruthy();
    expect(xeorumDarkTheme.spacing['4']).toBeTruthy();
    expect(xeorumDarkTheme.radius.md).toBeTruthy();
    expect(xeorumDarkTheme.elevation.soft).toBeTruthy();
    expect(xeorumDarkTheme.motion.durationBase).toBeTruthy();
  });
});
