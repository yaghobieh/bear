export const SIZE_MAP: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number> = {
  xs: 28,
  sm: 32,
  md: 36,
  lg: 42,
  xl: 48,
};

export const SIZE_CLASSES: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', string> = {
  xs: 'bear-w-7 bear-h-7',
  sm: 'bear-w-8 bear-h-8',
  md: 'bear-w-9 bear-h-9',
  lg: 'bear-w-[42px] bear-h-[42px]',
  xl: 'bear-w-12 bear-h-12',
};

export const ICON_SIZE_MAP: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', string> = {
  xs: '[&_svg]:bear-w-3.5 [&_svg]:bear-h-3.5',
  sm: '[&_svg]:bear-w-4 [&_svg]:bear-h-4',
  md: '[&_svg]:bear-w-4.5 [&_svg]:bear-h-4.5',
  lg: '[&_svg]:bear-w-5 [&_svg]:bear-h-5',
  xl: '[&_svg]:bear-w-6 [&_svg]:bear-h-6',
};

export const RADIUS_MAP: Record<'sm' | 'md' | 'lg' | 'full', string> = {
  sm: 'bear-rounded-sm',
  md: 'bear-rounded-md',
  lg: 'bear-rounded-lg',
  full: 'bear-rounded-full',
};

export const VARIANT_CLASSES: Record<
  'default' | 'filled' | 'outline' | 'subtle' | 'transparent',
  Record<'default' | 'primary' | 'success' | 'warning' | 'error', string>
> = {
  default: {
    default:
      'bear-bg-gray-100 dark:bear-bg-gray-800 bear-text-gray-700 dark:bear-text-gray-300 hover:bear-bg-gray-200 dark:hover:bear-bg-gray-700 focus:bear-ring-2 focus:bear-ring-gray-400/50 dark:focus:bear-ring-gray-500/50',
    primary:
      'bear-bg-gray-100 dark:bear-bg-gray-800 bear-text-pink-600 dark:bear-text-pink-400 hover:bear-bg-pink-100 dark:hover:bear-bg-pink-900/30 focus:bear-ring-2 focus:bear-ring-pink-500/30 dark:focus:bear-ring-pink-400/30',
    success:
      'bear-bg-gray-100 dark:bear-bg-gray-800 bear-text-green-600 dark:bear-text-green-400 hover:bear-bg-green-100 dark:hover:bear-bg-green-900/30 focus:bear-ring-2 focus:bear-ring-green-500/30 dark:focus:bear-ring-green-400/30',
    warning:
      'bear-bg-gray-100 dark:bear-bg-gray-800 bear-text-amber-600 dark:bear-text-amber-400 hover:bear-bg-amber-100 dark:hover:bear-bg-amber-900/30 focus:bear-ring-2 focus:bear-ring-amber-500/30 dark:focus:bear-ring-amber-400/30',
    error:
      'bear-bg-gray-100 dark:bear-bg-gray-800 bear-text-red-600 dark:bear-text-red-400 hover:bear-bg-red-100 dark:hover:bear-bg-red-900/30 focus:bear-ring-2 focus:bear-ring-red-500/30 dark:focus:bear-ring-red-400/30',
  },
  filled: {
    default:
      'bear-bg-gray-200 dark:bear-bg-gray-700 bear-text-gray-800 dark:bear-text-gray-200 hover:bear-bg-gray-300 dark:hover:bear-bg-gray-600 focus:bear-ring-2 focus:bear-ring-gray-400/50 dark:focus:bear-ring-gray-500/50',
    primary:
      'bear-bg-pink-500 dark:bear-bg-pink-600 bear-text-white hover:bear-bg-pink-600 dark:hover:bear-bg-pink-500 focus:bear-ring-2 focus:bear-ring-pink-500/50 dark:focus:bear-ring-pink-400/50',
    success:
      'bear-bg-green-500 dark:bear-bg-green-600 bear-text-white hover:bear-bg-green-600 dark:hover:bear-bg-green-500 focus:bear-ring-2 focus:bear-ring-green-500/50 dark:focus:bear-ring-green-400/50',
    warning:
      'bear-bg-amber-500 dark:bear-bg-amber-600 bear-text-white hover:bear-bg-amber-600 dark:hover:bear-bg-amber-500 focus:bear-ring-2 focus:bear-ring-amber-500/50 dark:focus:bear-ring-amber-400/50',
    error:
      'bear-bg-red-500 dark:bear-bg-red-600 bear-text-white hover:bear-bg-red-600 dark:hover:bear-bg-red-500 focus:bear-ring-2 focus:bear-ring-red-500/50 dark:focus:bear-ring-red-400/50',
  },
  outline: {
    default:
      'bear-bg-transparent bear-border bear-border-gray-300 dark:bear-border-gray-600 bear-text-gray-700 dark:bear-text-gray-300 hover:bear-bg-gray-100 dark:hover:bear-bg-gray-800 focus:bear-ring-2 focus:bear-ring-gray-400/50 dark:focus:bear-ring-gray-500/50',
    primary:
      'bear-bg-transparent bear-border bear-border-pink-500 dark:bear-border-pink-400 bear-text-pink-600 dark:bear-text-pink-400 hover:bear-bg-pink-50 dark:hover:bear-bg-pink-950/30 focus:bear-ring-2 focus:bear-ring-pink-500/30 dark:focus:bear-ring-pink-400/30',
    success:
      'bear-bg-transparent bear-border bear-border-green-500 dark:bear-border-green-400 bear-text-green-600 dark:bear-text-green-400 hover:bear-bg-green-50 dark:hover:bear-bg-green-950/30 focus:bear-ring-2 focus:bear-ring-green-500/30 dark:focus:bear-ring-green-400/30',
    warning:
      'bear-bg-transparent bear-border bear-border-amber-500 dark:bear-border-amber-400 bear-text-amber-600 dark:bear-text-amber-400 hover:bear-bg-amber-50 dark:hover:bear-bg-amber-950/30 focus:bear-ring-2 focus:bear-ring-amber-500/30 dark:focus:bear-ring-amber-400/30',
    error:
      'bear-bg-transparent bear-border bear-border-red-500 dark:bear-border-red-400 bear-text-red-600 dark:bear-text-red-400 hover:bear-bg-red-50 dark:hover:bear-bg-red-950/30 focus:bear-ring-2 focus:bear-ring-red-500/30 dark:focus:bear-ring-red-400/30',
  },
  subtle: {
    default:
      'bear-bg-transparent bear-text-gray-600 dark:bear-text-gray-400 hover:bear-bg-gray-100 dark:hover:bear-bg-gray-800 focus:bear-ring-2 focus:bear-ring-gray-400/30 dark:focus:bear-ring-gray-500/30',
    primary:
      'bear-bg-transparent bear-text-pink-600 dark:bear-text-pink-400 hover:bear-bg-pink-50 dark:hover:bear-bg-pink-950/20 focus:bear-ring-2 focus:bear-ring-pink-500/30 dark:focus:bear-ring-pink-400/30',
    success:
      'bear-bg-transparent bear-text-green-600 dark:bear-text-green-400 hover:bear-bg-green-50 dark:hover:bear-bg-green-950/20 focus:bear-ring-2 focus:bear-ring-green-500/30 dark:focus:bear-ring-green-400/30',
    warning:
      'bear-bg-transparent bear-text-amber-600 dark:bear-text-amber-400 hover:bear-bg-amber-50 dark:hover:bear-bg-amber-950/20 focus:bear-ring-2 focus:bear-ring-amber-500/30 dark:focus:bear-ring-amber-400/30',
    error:
      'bear-bg-transparent bear-text-red-600 dark:bear-text-red-400 hover:bear-bg-red-50 dark:hover:bear-bg-red-950/20 focus:bear-ring-2 focus:bear-ring-red-500/30 dark:focus:bear-ring-red-400/30',
  },
  transparent: {
    default:
      'bear-bg-transparent bear-text-gray-600 dark:bear-text-gray-400 hover:bear-bg-gray-100/50 dark:hover:bear-bg-gray-800/50 focus:bear-ring-2 focus:bear-ring-gray-400/20 dark:focus:bear-ring-gray-500/20',
    primary:
      'bear-bg-transparent bear-text-pink-600 dark:bear-text-pink-400 hover:bear-bg-pink-500/10 dark:hover:bear-bg-pink-400/10 focus:bear-ring-2 focus:bear-ring-pink-500/20 dark:focus:bear-ring-pink-400/20',
    success:
      'bear-bg-transparent bear-text-green-600 dark:bear-text-green-400 hover:bear-bg-green-500/10 dark:hover:bear-bg-green-400/10 focus:bear-ring-2 focus:bear-ring-green-500/20 dark:focus:bear-ring-green-400/20',
    warning:
      'bear-bg-transparent bear-text-amber-600 dark:bear-text-amber-400 hover:bear-bg-amber-500/10 dark:hover:bear-bg-amber-400/10 focus:bear-ring-2 focus:bear-ring-amber-500/20 dark:focus:bear-ring-amber-400/20',
    error:
      'bear-bg-transparent bear-text-red-600 dark:bear-text-red-400 hover:bear-bg-red-500/10 dark:hover:bear-bg-red-400/10 focus:bear-ring-2 focus:bear-ring-red-500/20 dark:focus:bear-ring-red-400/20',
  },
};

export const SPINNER_SIZE_MAP: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', 'xs' | 'sm' | 'md'> = {
  xs: 'xs',
  sm: 'xs',
  md: 'sm',
  lg: 'sm',
  xl: 'md',
};

export const ROOT_CLASS = 'Bear-ActionIcon bear-inline-flex bear-items-center bear-justify-center bear-transition-all bear-duration-200 bear-outline-none disabled:bear-opacity-50 disabled:bear-cursor-not-allowed';
