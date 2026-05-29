import { useAppTheme } from '../providers/AppThemeProvider';

export function useResolvedTheme() {
  return useAppTheme().theme;
}
