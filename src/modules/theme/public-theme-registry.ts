import type { PublicThemeContract } from './contracts/theme.types';

let currentContract: PublicThemeContract | null = null;

export function setPublicThemeContract(contract: PublicThemeContract | null) {
  currentContract = contract;
}

export function getPublicThemeContractFromRegistry() {
  return currentContract;
}

export function getPublishedArchetypeOverlayFromRegistry(slug: string) {
  return currentContract?.overlays.find((overlay) => overlay.archetypeSlug === slug && overlay.status === 'published') ?? null;
}

export function buildFallbackPublicThemeContract(baseTheme: PublicThemeContract['baseTheme']): PublicThemeContract {
  return {
    schemaVersion: 'public-theme-contract-v1',
    contractVersion: 1,
    baseTheme,
    overlays: [],
    fallbackThemeName: baseTheme.name,
  };
}
