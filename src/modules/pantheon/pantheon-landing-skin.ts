import type { CSSProperties } from 'react';
import type { PantheonArchetypeLanding } from './pantheon.types';

function hexToRgb(hex: string) {
  const normalized = hex.replace('#', '');
  const expanded = normalized.length === 3 ? normalized.split('').map((char) => `${char}${char}`).join('') : normalized.slice(0, 6);
  const number = Number.parseInt(expanded, 16);
  return {
    r: (number >> 16) & 255,
    g: (number >> 8) & 255,
    b: number & 255,
  };
}

function rgba(hex: string, alpha: number) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function luminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function pickRole(palette: PantheonArchetypeLanding['visualSystem']['palette'], roles: string[]) {
  for (const role of roles) {
    const match = palette.find((item) => item.usage === role);
    if (match?.hex) {
      return match.hex;
    }
  }

  return undefined;
}

export function buildPantheonLandingSkin(archetype: PantheonArchetypeLanding): CSSProperties {
  const palette = archetype.visualSystem.palette ?? [];
  if (palette.length === 0) {
    return {};
  }

  const colors = palette.map((item) => item.hex);
  const brightest = [...colors].sort((left, right) => luminance(right) - luminance(left))[0] ?? colors[0];
  const darkest = [...colors].sort((left, right) => luminance(left) - luminance(right))[0] ?? colors[0];
  const accent = pickRole(palette, ['accent-primary', 'accent', 'symbolic']) ?? colors[0] ?? brightest;
  const accentSoft = pickRole(palette, ['accent-secondary', 'base-light', 'surface']) ?? colors[1] ?? brightest;
  const accentMuted = pickRole(palette, ['accent-muted', 'surface-tint', 'text']) ?? colors[2] ?? accentSoft;
  const surfaceTint = pickRole(palette, ['surface-tint', 'accent-muted', 'base-light']) ?? accentMuted;
  const aura = pickRole(palette, ['aura', 'symbolic', 'accent-secondary']) ?? accentSoft;
  const glow = pickRole(palette, ['glow', 'accent-secondary', 'symbolic']) ?? accentSoft;
  const baseDark = pickRole(palette, ['base-dark', 'background', 'shadow']) ?? darkest;
  const baseLight = pickRole(palette, ['base-light', 'text-primary', 'surface']) ?? brightest;

  return {
    ['--pantheon-accent' as string]: accent,
    ['--pantheon-accent-soft' as string]: rgba(accentSoft, 0.34),
    ['--pantheon-accent-muted' as string]: rgba(accentMuted, 0.2),
    ['--pantheon-aura' as string]: rgba(aura, 0.28),
    ['--pantheon-glow' as string]: rgba(glow, 0.32),
    ['--pantheon-base-dark' as string]: baseDark,
    ['--pantheon-base-light' as string]: baseLight,
    ['--pantheon-surface-tint' as string]: rgba(surfaceTint, 0.14),
    ['--pantheon-background-wash' as string]: `radial-gradient(circle at 14% 12%, ${rgba(accent, 0.14)}, transparent 30%), radial-gradient(circle at 82% 18%, ${rgba(aura, 0.28)}, transparent 36%), radial-gradient(circle at 48% 88%, ${rgba(surfaceTint, 0.12)}, transparent 28%)`,
    ['--pantheon-hero-overlay' as string]: `linear-gradient(180deg, ${rgba(baseDark, 0.72)}, ${rgba(baseDark, 0.94)})`,
  };
}
