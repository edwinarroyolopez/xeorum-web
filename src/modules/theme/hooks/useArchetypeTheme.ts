import { useAppTheme } from '../providers/AppThemeProvider';

export function useArchetypeTheme() {
  const { archetypeSlug, theme } = useAppTheme();
  return {
    archetypeSlug,
    overlay: theme.overlay.archetype,
    theme,
  };
}
