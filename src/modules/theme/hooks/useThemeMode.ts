import { useAppTheme } from '../providers/AppThemeProvider';

export function useThemeMode() {
  return useAppTheme();
}
