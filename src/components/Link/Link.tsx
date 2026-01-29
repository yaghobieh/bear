import { forwardRef } from 'react';
import { cn } from '@utils';
import type { BearVariant } from '../../types';
import type { LinkProps } from './Link.types';

const VARIANT_CLASSES: Record<BearVariant | 'inherit', string> = {
  primary: 'bear-text-pink-500 hover:bear-text-pink-600',
  secondary: 'bear-text-gray-600 hover:bear-text-gray-700',
  success: 'bear-text-green-500 hover:bear-text-green-600',
  danger: 'bear-text-red-500 hover:bear-text-red-600',
  warning: 'bear-text-amber-500 hover:bear-text-amber-600',
  info: 'bear-text-blue-500 hover:bear-text-blue-600',
  ghost: 'bear-text-gray-500 hover:bear-text-gray-600',
  outline: 'bear-text-gray-700 hover:bear-text-gray-800',
  error: 'bear-text-red-500 hover:bear-text-red-600',
  inherit: 'bear-text-inherit',
};

const UNDERLINE_CLASSES = {
  none: 'bear-no-underline',
  hover: 'bear-no-underline hover:bear-underline',
  always: 'bear-underline',
};

const ExternalIcon = () => (
  <svg 
    width={12} 
    height={12} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={2}
    className="bear-inline-block bear-ml-1"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

/**
 * Link component for navigation
 * 
 * @example
 * ```tsx
 * <Link href="/about">About Us</Link>
 * <Link href="https://example.com" external>External Site</Link>
 * <Link variant="secondary" underline="hover">Hover link</Link>
 * ```
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(({
  variant = 'primary',
  underline = 'hover',
  color,
  external = false,
  showExternalIcon = true,
  children,
  className,
  style,
  testId,
  target,
  rel,
  ...props
}, ref) => {
  const externalProps = external ? {
    target: target || '_blank',
    rel: rel || 'noopener noreferrer',
  } : { target, rel };

  return (
    <a
      ref={ref}
      className={cn(
        'bear-cursor-pointer bear-transition-colors bear-duration-200',
        'focus:bear-outline-none focus:bear-ring-2 focus:bear-ring-pink-500 focus:bear-ring-offset-2 bear-rounded',
        !color && VARIANT_CLASSES[variant],
        UNDERLINE_CLASSES[underline],
        className
      )}
      style={{
        ...style,
        ...(color && { color }),
      }}
      data-testid={testId}
      {...externalProps}
      {...props}
    >
      {children}
      {external && showExternalIcon && <ExternalIcon />}
    </a>
  );
});

Link.displayName = 'Link';

export default Link;

