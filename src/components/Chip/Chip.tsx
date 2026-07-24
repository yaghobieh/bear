import { FC } from 'react';
import type { ChipProps } from './Chip.types';
import {
  C_H_I_P_ROOT_CLASS,
  CHIP_COLOR_CLASSES,
  CHIP_SIZE_CLASSES,
  CHIP_DELETE_ICON_SIZES,
} from './Chip.const';
import { cn, resolveBearId, useBearId } from '@utils';

export const Chip: FC<ChipProps> = (props) => {
  const {
    children,
    variant = 'filled',
    color = 'default',
    size = 'md',
    icon,
    avatar,
    onDelete,
    onClick,
    disabled = false,
    className,
    id,
    testId,
  } = props;

  const generatedId = useBearId('Chip');
  const domId = resolveBearId(id, generatedId);
  const Component = onClick ? 'button' : 'span';

  return (
    <Component
      id={domId}
      data-testid={testId}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        C_H_I_P_ROOT_CLASS,
        'bear-inline-flex bear-items-center bear-rounded-full bear-font-medium bear-transition-all',
        CHIP_SIZE_CLASSES[size],
        CHIP_COLOR_CLASSES[variant][color],
        onClick && !disabled && 'bear-cursor-pointer hover:bear-opacity-80',
        disabled && 'bear-opacity-50 bear-cursor-not-allowed',
        className
      )}
    >
      {avatar && <span className={`${C_H_I_P_ROOT_CLASS}__avatar bear--ml-1`}>{avatar}</span>}
      {icon && <span className={`${C_H_I_P_ROOT_CLASS}__icon`}>{icon}</span>}
      <span className={`${C_H_I_P_ROOT_CLASS}__label`}>{children}</span>
      {onDelete && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          disabled={disabled}
          className={cn(
            `${C_H_I_P_ROOT_CLASS}__delete`,
            'bear-ml-1 bear-rounded-full bear-p-0.5 hover:bear-bg-black/10 dark:hover:bear-bg-black/20 bear-transition-colors',
            disabled && 'bear-cursor-not-allowed'
          )}
          aria-label="Remove"
        >
          <svg className={CHIP_DELETE_ICON_SIZES[size]} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </Component>
  );
};
