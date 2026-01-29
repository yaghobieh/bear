import { FC } from 'react';
import { EmptyStateProps } from './EmptyState.types';
import { cn } from '@utils';

const DefaultIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
  </svg>
);

export const EmptyState: FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  secondaryAction,
  className,
  size = 'md',
  variant = 'default',
}) => {
  const sizeClasses = {
    sm: { icon: 'bear-w-12 bear-h-12', title: 'bear-text-lg', desc: 'bear-text-sm', padding: 'bear-py-6 bear-px-4' },
    md: { icon: 'bear-w-16 bear-h-16', title: 'bear-text-xl', desc: 'bear-text-base', padding: 'bear-py-10 bear-px-6' },
    lg: { icon: 'bear-w-20 bear-h-20', title: 'bear-text-2xl', desc: 'bear-text-lg', padding: 'bear-py-14 bear-px-8' },
  };

  return (
    <div className={cn(
      'bear-flex bear-flex-col bear-items-center bear-text-center',
      sizeClasses[size].padding,
      variant === 'card' && 'bear-bg-zinc-800/50 bear-rounded-xl bear-border bear-border-zinc-700',
      className
    )}>
      <div className={cn('bear-text-zinc-600 bear-mb-4', sizeClasses[size].icon)}>
        {icon || <DefaultIcon className="bear-w-full bear-h-full" />}
      </div>
      <h3 className={cn('bear-font-semibold bear-text-white bear-mb-2', sizeClasses[size].title)}>
        {title}
      </h3>
      {description && (
        <p className={cn('bear-text-zinc-400 bear-max-w-md bear-mb-6', sizeClasses[size].desc)}>
          {description}
        </p>
      )}
      {(action || secondaryAction) && (
        <div className="bear-flex bear-items-center bear-gap-3">
          {action}
          {secondaryAction}
        </div>
      )}
    </div>
  );
};

