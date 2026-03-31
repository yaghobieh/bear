import type { ComponentType, CSSProperties } from 'react';
import { cn } from '../utils/cn';

type StyleOverrides = CSSProperties;

interface BearStyledOptions<P> {
  /** Default props merged with every instance */
  defaultProps?: Partial<P>;
  /** Inline style object applied to every instance (merges with consumer `style` prop) */
  style?: StyleOverrides;
  /** Additional className applied to every instance */
  className?: string;
  /** Display name for React DevTools */
  displayName?: string;
}

/**
 * bearStyled — create a pre-configured variant of any Bear component.
 *
 * Use it like styled-components but for Bear: take any component, lock in
 * default props and custom CSS, then re-export and reuse everywhere.
 * The component retains all original props and behaviour; consumers can
 * still override anything on a per-instance basis.
 *
 * @example
 * ```tsx
 * // Simple — default props only (original API still works)
 * const PrimaryButton = bearStyled(Button)({ variant: 'primary' });
 *
 * // With inline style overrides
 * const RoundedButton = bearStyled(Button, {
 *   defaultProps: { variant: 'primary', size: 'lg' },
 *   style: { borderRadius: 10, borderLeft: '3px solid red' },
 *   className: 'uppercase',
 * });
 *
 * // Override at use-site
 * <RoundedButton onClick={save}>Save</RoundedButton>
 * <RoundedButton style={{ borderRadius: 20 }}>More round</RoundedButton>
 * ```
 */
export function bearStyled<P extends object>(
  Component: ComponentType<P>,
  options?: BearStyledOptions<P>,
): (overrideProps?: Partial<P>) => ComponentType<P>;

export function bearStyled<P extends object>(
  Component: ComponentType<P>,
  options?: BearStyledOptions<P>,
) {
  return function withDefaults(overrideProps?: Partial<P>) {
    const defaults = options?.defaultProps ?? overrideProps ?? {};
    const baseStyle = options?.style;
    const baseClassName = options?.className;

    const Styled = (props: P) => {
      const merged = { ...defaults, ...props } as P;
      const d = defaults as Record<string, unknown>;
      const p = props as Record<string, unknown>;

      // Merge className
      const classes = cn(
        baseClassName,
        d?.className as string | undefined,
        p?.className as string | undefined,
      );
      if (classes) {
        (merged as Record<string, unknown>).className = classes;
      }

      // Merge style: base ← default ← consumer
      if (baseStyle || d?.style || p?.style) {
        (merged as Record<string, unknown>).style = {
          ...(baseStyle ?? {}),
          ...((d?.style as CSSProperties) ?? {}),
          ...((p?.style as CSSProperties) ?? {}),
        };
      }

      return <Component {...merged} />;
    };

    Styled.displayName =
      options?.displayName ??
      `BearStyled(${Component.displayName ?? Component.name ?? 'Component'})`;

    return Styled;
  };
}
