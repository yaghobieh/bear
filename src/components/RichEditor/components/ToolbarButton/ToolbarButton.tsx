import { FC } from 'react';
import { cn } from '@utils';
import type { ToolbarButtonProps } from '../../RichEditor.types';
import {
  RICH_EDITOR_BUTTON_BASE_CLASSES,
  RICH_EDITOR_BUTTON_ACTIVE_CLASSES,
  RICH_EDITOR_BUTTON_INACTIVE_CLASSES,
  RICH_EDITOR_BUTTON_DISABLED_CLASSES,
} from '../../RichEditor.const';

export const ToolbarButton: FC<ToolbarButtonProps> = (props) => {
  const { icon, title, active, onClick, disabled } = props;

  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'Bear-RichEditor__button',
        RICH_EDITOR_BUTTON_BASE_CLASSES,
        active 
          ? `Bear-RichEditor__button--active ${RICH_EDITOR_BUTTON_ACTIVE_CLASSES}`
          : RICH_EDITOR_BUTTON_INACTIVE_CLASSES,
        disabled && `Bear-RichEditor__button--disabled ${RICH_EDITOR_BUTTON_DISABLED_CLASSES}`
      )}
    >
      {icon}
    </button>
  );
};

export default ToolbarButton;

