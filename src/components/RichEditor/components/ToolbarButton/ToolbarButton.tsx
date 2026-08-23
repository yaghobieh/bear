import { cn } from '@utils';
import type { ToolbarButtonProps } from '../../RichEditor.types';

export const ToolbarButton = (props: ToolbarButtonProps) => {
  const { icon, title, active, onClick, disabled } = props;

  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'Bear-RichEditor__button p-1.5 rounded transition-colors',
        active
          ? 'Bear-RichEditor__button--active bg-primary-500 text-white'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700',
        disabled && 'Bear-RichEditor__button--disabled opacity-50 cursor-not-allowed'
      )}
    >
      {icon}
    </button>
  );
};
