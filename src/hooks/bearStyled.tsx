import type { ComponentType } from 'react';
import { cn } from '../utils/cn';

/**
 * Create a pre-styled Bear component with default props. Use to change all instances
 * of a component (e.g. Button) with minimal code.
 *
 * @example
 * ```tsx
 * const PrimaryButton = bearStyled(Button)({ variant: 'primary' });
 * <PrimaryButton>Click</PrimaryButton>
 *
 * const BoldButton = bearStyled(Button)({ bis: { fontWeight: 700 }, className: 'uppercase' });
 * ```
 */
export function bearStyled<P extends object>(Component: ComponentType<P>) {
  return function withDefaults(defaultProps: Partial<P>) {
    const Styled = (props: P) => {
      const merged = { ...defaultProps, ...props } as P;
      const d = defaultProps as Record<string, unknown>;
      const p = props as Record<string, unknown>;
      if (d?.className != null || p?.className != null) {
        (merged as Record<string, unknown>).className = cn(
          d?.className as string | undefined,
          p?.className as string | undefined
        );
      }
      return <Component {...merged} />;
    };
    Styled.displayName = `BearStyled(${Component.displayName ?? Component.name ?? 'Component'})`;
    return Styled;
  };
}
