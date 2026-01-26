import { forwardRef } from 'react';
import { EmProps } from './Em.types';

const variantClasses: Record<string, string> = {
  default: 'italic text-inherit',
  strong: 'italic font-semibold text-gray-900 dark:text-white',
  subtle: 'italic text-gray-500 dark:text-gray-400',
};

export const Em = forwardRef<HTMLElement, EmProps>(({
  children,
  variant = 'default',
  className = '',
  ...props
}, ref) => {
  return (
    <em
      ref={ref}
      className={`bear-em ${variantClasses[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </em>
  );
});

Em.displayName = 'Em';

