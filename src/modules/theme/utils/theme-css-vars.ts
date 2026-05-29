import type { Theme } from '../contracts/theme.types';

type CssVarValue = string | number;
type CssVarRecord = Record<string, CssVarValue>;

function toCssSegment(value: string) {
  return value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function appendCssVariables(target: CssVarRecord, prefix: string[], value: unknown) {
  if (typeof value === 'string' || typeof value === 'number') {
    target[`--xe-${prefix.map(toCssSegment).join('-')}`] = value;
    return;
  }

  if (!value || typeof value !== 'object') {
    return;
  }

  for (const [key, nestedValue] of Object.entries(value)) {
    appendCssVariables(target, [...prefix, key], nestedValue);
  }
}

export function themeToCssVariables(theme: Theme): CssVarRecord {
  const variables: CssVarRecord = {};

  appendCssVariables(variables, ['semantic'], theme.semantic);
  appendCssVariables(variables, ['typography'], theme.typography);
  appendCssVariables(variables, ['space'], theme.spacing);
  appendCssVariables(variables, ['radius'], theme.radius);
  appendCssVariables(variables, ['elevation'], theme.elevation);
  appendCssVariables(variables, ['motion'], theme.motion);
  appendCssVariables(variables, ['overlay'], theme.overlay);
  appendCssVariables(variables, ['color'], theme.primitive.color);

  variables['--theme-background'] = theme.semantic.background;
  variables['--theme-background-elevated'] = theme.semantic.backgroundElevated;
  variables['--theme-surface'] = theme.semantic.surface;
  variables['--theme-surface-muted'] = theme.semantic.surfaceMuted;
  variables['--theme-surface-glass'] = theme.semantic.surfaceGlass;
  variables['--theme-text-primary'] = theme.semantic.textPrimary;
  variables['--theme-text-secondary'] = theme.semantic.textSecondary;
  variables['--theme-text-muted'] = theme.semantic.textMuted;
  variables['--theme-border-subtle'] = theme.semantic.borderSubtle;
  variables['--theme-border-strong'] = theme.semantic.borderStrong;
  variables['--theme-accent'] = theme.semantic.accent;
  variables['--theme-accent-soft'] = theme.semantic.accentSoft;
  variables['--theme-accent-muted'] = theme.semantic.accentMuted;
  variables['--theme-focus-ring'] = theme.semantic.focusRing;
  variables['--theme-danger'] = theme.semantic.danger;
  variables['--theme-warning'] = theme.semantic.warning;
  variables['--theme-success'] = theme.semantic.success;

  variables['--archetype-aura'] = theme.overlay.archetype?.aura ?? 'transparent';
  variables['--archetype-glow'] = theme.overlay.archetype?.glow ?? 'transparent';
  variables['--archetype-gradient-start'] = theme.overlay.archetype?.gradientStart ?? theme.semantic.background;
  variables['--archetype-gradient-end'] = theme.overlay.archetype?.gradientEnd ?? theme.semantic.backgroundElevated;
  variables['--archetype-shadow-tint'] = theme.overlay.archetype?.shadowTint ?? 'transparent';
  variables['--archetype-background-wash'] = theme.overlay.archetype?.backgroundWash ?? 'none';
  variables['--archetype-card-highlight'] = theme.overlay.archetype?.cardHighlight ?? 'none';
  variables['--archetype-hero-overlay'] = theme.overlay.archetype?.heroOverlay ?? 'none';
  variables['--archetype-profile-panel'] = theme.overlay.archetype?.profilePanel ?? theme.semantic.backgroundElevated;
  variables['--archetype-pattern-opacity'] = theme.overlay.archetype?.patternOpacity ?? 0;

  return variables;
}

export const applyThemeToCssVariables = themeToCssVariables;
