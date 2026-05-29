import type { ArchetypeThemeOverlay } from '../contracts/theme.types';

export function isOverlaySafe(overlay: ArchetypeThemeOverlay | null | undefined) {
  if (!overlay) {
    return false;
  }

  return overlay.status === 'published' && overlay.accessibility.contrastValidated;
}
