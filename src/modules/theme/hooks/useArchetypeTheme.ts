import { useAppTheme } from '../providers/AppThemeProvider';

export function useArchetypeTheme() {
  return useAppTheme().theme;
}
