/**
 * BackTop component defaults
 * Uses Bear Button for consistent styling
 */
export const BACKTOP_DEFAULTS = {
  BOTTOM: 40,
  RIGHT: 40,
  VISIBLE_AT: 400,
  DURATION: 300,
  SIZE: 'md' as const,
  VARIANT: 'primary' as const,
  ANIMATED: true,
} as const;

/**
 * BackTop size configurations
 * Controls the button dimensions and icon size
 */
export const BACKTOP_SIZES = {
  sm: {
    width: 36,
    height: 36,
    iconSize: 16,
  },
  md: {
    width: 44,
    height: 44,
    iconSize: 20,
  },
  lg: {
    width: 52,
    height: 52,
    iconSize: 24,
  },
} as const;
