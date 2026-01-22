import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { BearVariant } from '../../types';
import type { LinkProps } from './Link.types';

const VARIANT_CLASSES: Record<BearVariant | 'inherit', string> = {
  primary: 'ember-text-pink-500 hover:ember-text-pink-600',
  secondary: 'ember-text-gray-600 hover:ember-text-gray-700',
  success: 'ember-text-green-500 hover:ember-text-green-600',
  danger: 'ember-text-red-500 hover:ember-text-red-600',
  warning: 'ember-text-amber-500 hover:ember-text-amber-600',
  info: 'ember-text-blue-500 hover:ember-text-blue-600',
  ghost: 'ember-text-gray-500 hover:ember-text-gray-600',
  outline: 'ember-text-gray-700 hover:ember-text-gray-800',
  error: 'ember-text-red-500 hover:ember-text-red-600',
  inherit: 'ember-text-inherit',
};

const UNDERLINE_CLASSES = {
  none: 'ember-no-underline',
  hover: 'ember-no-underline hover:ember-underline',
  always: 'ember-underline',
};

const ExternalIcon = () => (
  <svg 
    width={12} 
    height={12} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={2}
    className="ember-inline-block ember-ml-1"
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
        'ember-cursor-pointer ember-transition-colors ember-duration-200',
        'focus:ember-outline-none focus:ember-ring-2 focus:ember-ring-pink-500 focus:ember-ring-offset-2 ember-rounded',
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

