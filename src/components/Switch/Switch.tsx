import { cn } from '@utils';
import type { SwitchProps } from './Switch.types';
import {
  SWITCH_THUMB_TRANSLATE_PX,
  SWITCH_THUMB_OFFSET_PX,
  SWITCH_ROOT_CLASSES,
  SWITCH_ROOT_HORIZONTAL,
  SWITCH_ROOT_VERTICAL,
  SWITCH_DISABLED_CLASSES,
  SWITCH_TRACK_BASE_CLASSES,
  SWITCH_TRACK_CHECKED_CLASSES,
  SWITCH_TRACK_UNCHECKED_CLASSES,
  SWITCH_THUMB_BASE_CLASSES,
  SWITCH_LABEL_CLASSES,
  SWITCH_ICON_CLASSES,
  SWITCH_ICON_LEFT_CLASSES,
  SWITCH_ICON_RIGHT_CLASSES,
  SWITCH_ICON_CHECKED_VISIBLE,
  SWITCH_ICON_CHECKED_HIDDEN,
  SWITCH_ICON_UNCHECKED_VISIBLE,
  SWITCH_ICON_THUMB_CHECKED,
  SWITCH_ICON_THUMB_UNCHECKED,
  SWITCH_SIZE_CLASSES,
} from './Switch.const';

export const Switch = (props: SwitchProps) => {
  const {
    label,
    checked = false,
    onCheckedChange,
    size = 'md',
    orientation = 'horizontal',
    disabled = false,
    uncheckedIcon,
    checkedIcon,
    showIconsInThumb = false,
    className,
    testId,
    onChange,
    ...rest
  } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onCheckedChange?.(event.target.checked);
    onChange?.(event);
  };

  const sizeConfig = SWITCH_SIZE_CLASSES[size];
  const hasIcons = uncheckedIcon || checkedIcon;
  const thumbTranslate = checked ? SWITCH_THUMB_TRANSLATE_PX[size] : 0;

  return (
    <label
      data-testid={testId}
      className={cn(
        SWITCH_ROOT_CLASSES,
        orientation === 'vertical' ? SWITCH_ROOT_VERTICAL : SWITCH_ROOT_HORIZONTAL,
        disabled && SWITCH_DISABLED_CLASSES,
        className
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className="bear-sr-only"
        {...rest}
      />

      <span
        className={cn(
          SWITCH_TRACK_BASE_CLASSES,
          checked ? SWITCH_TRACK_CHECKED_CLASSES : SWITCH_TRACK_UNCHECKED_CLASSES,
          sizeConfig.track
        )}
      >
        {hasIcons && !showIconsInThumb && (
          <>
            <span className={cn(SWITCH_ICON_CLASSES, SWITCH_ICON_LEFT_CLASSES, checked ? SWITCH_ICON_CHECKED_VISIBLE : SWITCH_ICON_CHECKED_HIDDEN)}>
              {checkedIcon}
            </span>
            <span className={cn(SWITCH_ICON_CLASSES, SWITCH_ICON_RIGHT_CLASSES, !checked ? SWITCH_ICON_UNCHECKED_VISIBLE : SWITCH_ICON_CHECKED_HIDDEN)}>
              {uncheckedIcon}
            </span>
          </>
        )}

        <span
          className={cn(SWITCH_THUMB_BASE_CLASSES, sizeConfig.thumb)}
          style={{
            top: `${SWITCH_THUMB_OFFSET_PX}px`,
            left: `${SWITCH_THUMB_OFFSET_PX}px`,
            transform: `translateX(${thumbTranslate}px)`,
          }}
        >
          {hasIcons && showIconsInThumb && (
            <span className={cn(SWITCH_ICON_CLASSES, checked ? SWITCH_ICON_THUMB_CHECKED : SWITCH_ICON_THUMB_UNCHECKED)}>
              {checked ? checkedIcon : uncheckedIcon}
            </span>
          )}
        </span>
      </span>

      {label && <span className={SWITCH_LABEL_CLASSES}>{label}</span>}
    </label>
  );
};
