export type ThemeMode = 'dark';
export type ThemeName = 'xeorum-dark';
export type ThemePurpose = 'public-experience' | 'operational-command-center';
export type ThemeStatus = 'draft' | 'published' | 'archived';
export type ThemeIntensityLevel = 'none' | 'subtle' | 'medium' | 'extreme';
export type ThemeValidationStatus = 'valid' | 'warning' | 'blocked';

export type PrimitiveColorTokens = {
  black: {
    1000: string;
    950: string;
  };
  neutral: {
    100: string;
    300: string;
    500: string;
    700: string;
    800: string;
    850: string;
    900: string;
    950: string;
  };
  gold: {
    400: string;
    500: string;
    600: string;
  };
  storm: {
    400: string;
    500: string;
    700: string;
    900: string;
  };
  red: {
    500: string;
    700: string;
    800: string;
  };
  green: {
    500: string;
    700: string;
  };
  amber: {
    500: string;
    700: string;
  };
  marble: {
    200: string;
    300: string;
  };
  silver: {
    300: string;
    500: string;
    700: string;
  };
  rose: {
    400: string;
    500: string;
    800: string;
  };
};

export type PrimitiveTokens = {
  color: PrimitiveColorTokens;
};

export type SemanticTokens = {
  background: string;
  backgroundElevated: string;
  surface: string;
  surfaceMuted: string;
  surfaceGlass: string;
  surfaceEditorial: string;
  surfaceEditorialSoft: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  borderSubtle: string;
  borderStrong: string;
  borderEditorial: string;
  accent: string;
  accentSoft: string;
  accentMuted: string;
  accentGoldSoft: string;
  focusRing: string;
  danger: string;
  warning: string;
  success: string;
};

export type TypographyTokens = {
  fontFamily: string;
  displayFamily: string;
  readingFamily: string;
  letterSpacing: string;
  headingWeight: number;
  bodyWeight: number;
  kickerSize: string;
  titleXl: string;
  titleLg: string;
  bodyMd: string;
  bodySm: string;
  trackingKicker: string;
  trackingDisplay: string;
};

export type SpacingTokens = Record<string, string>;
export type RadiusTokens = Record<string, string>;
export type ElevationTokens = Record<string, string>;

export type MotionTokens = {
  durationFast: string;
  durationBase: string;
  durationSlow: string;
  easingStandard: string;
  easingEmphasized: string;
};

export type ThemeContextName =
  | 'home'
  | 'pantheon'
  | 'identity-result'
  | 'profile'
  | 'product-card'
  | 'product-detail'
  | 'recommendations'
  | 'checkout-payment-critical'
  | 'legal';

export type ThemeResolverContextName = ThemeContextName | 'default';
export type ThemeUsageContextName = ThemeContextName | 'admin';

export type ThemeIntensity = 'none' | 'subtle' | 'medium';

export type OverlayResolutionStrategy = 'published';

export type AccessibilitySettings = {
  reduceMotion?: boolean;
  forceHighContrast?: boolean;
};

export type ArchetypeThemeOverlay = {
  archetypeSlug: string;
  name: string;
  status: ThemeStatus;
  intensity: {
    default: 'subtle';
    allowed: Array<'subtle' | 'medium'>;
    forbidden: ['extreme'];
  };
  colors: {
    accent: string;
    accentSoft: string;
    accentMuted: string;
    aura: string;
    glow: string;
    gradientStart: string;
    gradientEnd: string;
    shadowTint: string;
  };
  surfaces: {
    backgroundWash: string;
    cardHighlight: string;
    heroOverlay: string;
    profilePanel: string;
  };
  symbolic: {
    pattern?: string;
    patternOpacity: number;
    borderStyle: 'solid' | 'soft-glow' | 'none';
    iconMood: string;
  };
  motion: {
    feel: 'still' | 'slow' | 'sharp' | 'fluid' | 'commanding';
    durationMultiplier: number;
    allowAmbientMotion: boolean;
  };
  usage: {
    allowedContexts: ThemeUsageContextName[];
    forbiddenContexts: ThemeUsageContextName[];
  };
  accessibility: {
    contrastValidated: boolean;
    reducedMotionSafe: boolean;
    textOnAccent: string;
    focusRing: string;
  };
};

export type ThemeOverlayTokens = {
  archetype?: {
    accent: string;
    accentSoft: string;
    accentMuted: string;
    aura: string;
    glow: string;
    gradientStart: string;
    gradientEnd: string;
    shadowTint: string;
    backgroundWash: string;
    cardHighlight: string;
    heroOverlay: string;
    profilePanel: string;
    pattern?: string;
    patternOpacity: number;
    borderStyle: 'solid' | 'soft-glow' | 'none';
    iconMood: string;
    motionFeel: ArchetypeThemeOverlay['motion']['feel'];
    textOnAccent: string;
  };
};

export type ThemeTokenContract = {
  name: ThemeName;
  purpose: ThemePurpose;
  mode: ThemeMode;
  primitive: PrimitiveTokens;
  semantic: SemanticTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  radius: RadiusTokens;
  elevation: ElevationTokens;
  motion: MotionTokens;
  overlay: ThemeOverlayTokens;
};

export type Theme = ThemeTokenContract;

export type ThemePartial = {
  semantic?: Partial<Theme['semantic']>;
  typography?: Partial<Theme['typography']>;
  spacing?: Partial<Theme['spacing']>;
  radius?: Partial<Theme['radius']>;
  elevation?: Partial<Theme['elevation']>;
  motion?: Partial<Theme['motion']>;
  overlay?: {
    archetype?: Partial<NonNullable<Theme['overlay']['archetype']>>;
  };
};

export type ComposeThemeOptions = {
  baseTheme: Theme;
  brandTheme?: ThemePartial | null;
  overlay?: ArchetypeThemeOverlay | null;
  context?: ThemeResolverContextName;
  accessibility?: AccessibilitySettings;
  intensity?: ThemeIntensity;
};

export type ResolvePageThemeOptions = {
  themeName?: string;
  brandTheme?: ThemePartial | null;
  archetypeSlug?: string | null;
  context?: ThemeResolverContextName;
  accessibility?: AccessibilitySettings;
  intensity?: ThemeIntensity;
  overlayStrategy?: OverlayResolutionStrategy;
};

export type ThemeValidationReportItem = {
  id: string;
  label: string;
  status: 'pass' | 'warning' | 'fail';
  message?: string;
};

export type ThemeValidationReport = {
  status: ThemeValidationStatus;
  publishReady: boolean;
  contrastStatus: 'valid' | 'invalid' | 'not_checked';
  checks: ThemeValidationReportItem[];
  warnings: string[];
  errors: string[];
};

export type PublicThemeContract = {
  schemaVersion?: 'public-theme-contract-v1';
  contractVersion?: 1;
  baseTheme: ThemeTokenContract;
  overlays: ArchetypeThemeOverlay[];
  fallbackThemeName: string;
};

export type AdminThemeContract = {
  baseTheme: ThemeTokenContract;
  overlays: ArchetypeThemeOverlay[];
  validationReports: Record<string, ThemeValidationReport>;
  draftsEnabled: boolean;
  publishGuardrailsEnabled: boolean;
};

export type CustomerProfileThemeContract = {
  dominantArchetype?: string;
  baseTheme: ThemeTokenContract;
  overlay?: ArchetypeThemeOverlay;
  fallbackThemeName: string;
};
