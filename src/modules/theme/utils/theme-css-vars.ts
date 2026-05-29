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

  return variables;
}
