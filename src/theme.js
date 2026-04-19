export const colors = {
  // Primary (Forest)
  primary: '#3c6a35',
  primaryDim: '#305d2a',
  primaryFixed: '#b9eeab',
  primaryFixedDim: '#abdf9e',
  primaryContainer: '#b9eeab',
  onPrimary: '#ebffe0',
  onPrimaryFixed: '#1a4716',
  onPrimaryContainer: '#2d5a27',
  onPrimaryFixedVariant: '#376430',

  // Secondary (Earthy Trail)
  secondary: '#77584e',
  secondaryDim: '#6a4c43',
  secondaryFixed: '#ffdbd0',
  secondaryFixedDim: '#f5cbbf',
  secondaryContainer: '#ffdbd0',
  onSecondary: '#fff7f5',
  onSecondaryFixed: '#553930',
  onSecondaryFixedVariant: '#74544a',
  onSecondaryContainer: '#694b41',

  // Tertiary (Sunny Badge)
  tertiary: '#745c00',
  tertiaryDim: '#665100',
  tertiaryFixed: '#fdd34d',
  tertiaryFixedDim: '#eec540',
  tertiaryContainer: '#fdd34d',
  onTertiary: '#fff8ee',
  onTertiaryFixed: '#463600',
  onTertiaryFixedVariant: '#675200',
  onTertiaryContainer: '#5c4900',

  // Error
  error: '#aa371c',
  errorDim: '#821a01',
  errorContainer: '#fa7150',
  onError: '#fff7f6',
  onErrorContainer: '#671200',

  // Surfaces
  surface: '#fafaf5',
  surfaceDim: '#d7dbd3',
  surfaceBright: '#fafaf5',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f3f4ee',
  surfaceContainer: '#edeee8',
  surfaceContainerHigh: '#e7e9e2',
  surfaceContainerHighest: '#e0e4dc',
  onSurface: '#30332e',
  onSurfaceVariant: '#5c605a',
  surfaceVariant: '#e0e4dc',

  // Outline
  outline: '#787c75',
  outlineVariant: '#b0b3ac',

  // Background
  background: '#fafaf5',
  onBackground: '#30332e',

  // Inverse
  inverseSurface: '#0d0f0c',
  inverseOnSurface: '#9c9d99',
  inversePrimary: '#b9eeab',

  // Tint
  surfaceTint: '#3c6a35'
};

export const fonts = {
  display: 'PlusJakartaSans_800ExtraBold',
  displayAr: 'Cairo_700Bold',
  body: 'PlusJakartaSans_400Regular',
  bodyBold: 'PlusJakartaSans_600SemiBold',
  bodyAr: 'Cairo_400Regular',
  bodyArBold: 'Cairo_600SemiBold'
};

export const radii = {
  sm: 8,
  md: 14,
  lg: 32,
  xl: 56,
  pill: 999,
  button: 20,
  card: 40
};

export const spacing = (n) => n * 4;

export const shadows = {
  bubbly: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 0,
    elevation: 0
  },
  card: {
    shadowColor: '#e0e4dc',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8
  },
  lift: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6
  },
  bubblyButton: {
    shadowColor: '#254d20',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 6
  }
};

export const rarity = {
  common:    { color: '#9a9893', label: 'شائع',      emoji: '◆' },
  uncommon:  { color: '#7fa691', label: 'غير شائع',  emoji: '◆' },
  rare:      { color: '#8b9db8', label: 'نادر',      emoji: '◆' },
  epic:      { color: '#a89178', label: 'ملحمي',     emoji: '◆' },
  legendary: { color: '#c9a87f', label: 'أسطوري',    emoji: '◆' }
};

