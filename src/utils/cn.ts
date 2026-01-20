/**
 * Class name utility - conditionally join class names
 * Re-exported from @forgedevstack/anvil as styleForge
 */

type ClassValue = string | number | boolean | undefined | null | ClassValue[] | Record<string, boolean | undefined | null>;

/**
 * Conditionally join class names together
 * 
 * @example
 * ```tsx
 * cn('base', isActive && 'active', { 'disabled': isDisabled })
 * // => 'base active' (when isActive is true, isDisabled is false)
 * ```
 */
export const cn = (...inputs: ClassValue[]): string => {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === 'string' || typeof input === 'number') {
      classes.push(String(input));
    } else if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) classes.push(nested);
    } else if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key);
      }
    }
  }

  return classes.join(' ');
};

// Alias for forge branding
export const styleForge = cn;

