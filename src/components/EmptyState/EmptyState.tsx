import { FC } from 'react';
import type { EmptyStateProps } from './EmptyState.types';
import {
  EMPTY_STATE_BASE_CLASSES,
  EMPTY_STATE_CARD_CLASSES,
  EMPTY_STATE_DESCRIPTION_CLASSES,
  EMPTY_STATE_ICON_CLASSES,
  EMPTY_STATE_ROOT_CLASS,
  EMPTY_STATE_SIZE_CLASSES,
  EMPTY_STATE_TITLE_CLASSES,
} from './EmptyState.const';
import { cn, resolveBearId, useBearId } from '@utils';

const DefaultIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
    />
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
  id,
  testId,
}) => {
  const generatedId = useBearId('EmptyState');
  const domId = resolveBearId(id, generatedId);
  const sizeClasses = EMPTY_STATE_SIZE_CLASSES[size];

  return (
    <div
      id={domId}
      data-testid={testId}
      className={cn(
        EMPTY_STATE_ROOT_CLASS,
        EMPTY_STATE_BASE_CLASSES,
        sizeClasses.padding,
        variant === 'card' && EMPTY_STATE_CARD_CLASSES,
        className
      )}
    >
      <div className={cn(EMPTY_STATE_ICON_CLASSES, sizeClasses.icon)}>
        {icon || <DefaultIcon className="bear-w-full bear-h-full" />}
      </div>
      <h3 className={cn(EMPTY_STATE_TITLE_CLASSES, sizeClasses.title)}>{title}</h3>
      {description && (
        <p className={cn(EMPTY_STATE_DESCRIPTION_CLASSES, sizeClasses.desc)}>{description}</p>
      )}
      {(action || secondaryAction) && (
        <div className={`${EMPTY_STATE_ROOT_CLASS}__actions bear-flex bear-items-center bear-gap-3`}>
          {action}
          {secondaryAction}
        </div>
      )}
    </div>
  );
};
