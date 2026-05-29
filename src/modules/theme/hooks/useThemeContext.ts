import { useAppTheme } from '../providers/AppThemeProvider';

export function useThemeContext() {
  return useAppTheme().themeContext;
}
