import { publicEnv } from '../../lib/env';
import type { PublicThemeContract } from './contracts/theme.types';
import { buildFallbackPublicThemeContract } from './public-theme-registry';
import { xeorumDarkTheme } from './utils/resolve-theme';

export async function getPublicThemeContract(): Promise<PublicThemeContract> {
  try {
    const response = await fetch(`${publicEnv.apiBaseUrl}/theme`, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return buildFallbackPublicThemeContract(xeorumDarkTheme);
    }

    const payload = await response.json() as { data?: PublicThemeContract };
    return payload.data ?? buildFallbackPublicThemeContract(xeorumDarkTheme);
  } catch {
    return buildFallbackPublicThemeContract(xeorumDarkTheme);
  }
}
