import { useAppTheme } from '../providers/AppThemeProvider';

export function useThemeTokens() {
  return useAppTheme().theme.semantic;
}
