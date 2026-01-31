import { FC } from 'react';
import { cn } from '@utils';
import type { TimePickerColumnsProps } from '../../TimePicker.types';
import {
  TIMEPICKER_DROPDOWN_CLASSES,
  TIMEPICKER_COLUMN_HEADER_CLASSES,
  TIMEPICKER_COLUMN_CLASSES,
  TIMEPICKER_OPTION_CLASSES,
  TIMEPICKER_OPTION_ACTIVE_CLASSES,
  TIMEPICKER_OPTION_INACTIVE_CLASSES,
  TIMEPICKER_FOOTER_CLASSES,
  TIMEPICKER_CLEAR_BUTTON_CLASSES,
  TIMEPICKER_CONFIRM_BUTTON_CLASSES,
  TIMEPICKER_DEFAULT_TRANSLATIONS,
} from '../../TimePicker.constants';

export const TimePickerColumnsDropdown: FC<TimePickerColumnsProps> = ({
  selectedHour,
  setSelectedHour,
  selectedMinute,
  setSelectedMinute,
  period,
  setPeriod,
  format,
  hours,
  minutes,
  timeValue,
  clearable,
  onChange,
  onConfirm,
  onClose,
  translations,
}) => {
  const t = { ...TIMEPICKER_DEFAULT_TRANSLATIONS, ...translations };

  return (
    <div className={TIMEPICKER_DROPDOWN_CLASSES}>
      <div className="Bear-TimePicker__columns bear-flex bear-gap-2 bear-mb-3">
        <div className="Bear-TimePicker__column bear-flex-1">
          <div className={TIMEPICKER_COLUMN_HEADER_CLASSES}>{t.hour}</div>
          <div className={TIMEPICKER_COLUMN_CLASSES}>
            {hours.map((h) => (
              <button
                key={h}
                onClick={() => setSelectedHour(h)}
                className={cn(
                  TIMEPICKER_OPTION_CLASSES,
                  selectedHour === h ? TIMEPICKER_OPTION_ACTIVE_CLASSES : TIMEPICKER_OPTION_INACTIVE_CLASSES
                )}
              >
                {h.toString().padStart(2, '0')}
              </button>
            ))}
          </div>
        </div>
        <div className="Bear-TimePicker__column bear-flex-1">
          <div className={TIMEPICKER_COLUMN_HEADER_CLASSES}>{t.minute}</div>
          <div className={TIMEPICKER_COLUMN_CLASSES}>
            {minutes.map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMinute(m)}
                className={cn(
                  TIMEPICKER_OPTION_CLASSES,
                  selectedMinute === m ? TIMEPICKER_OPTION_ACTIVE_CLASSES : TIMEPICKER_OPTION_INACTIVE_CLASSES
                )}
              >
                {m.toString().padStart(2, '0')}
              </button>
            ))}
          </div>
        </div>
        {format === '12h' && (
          <div className="Bear-TimePicker__column bear-flex-1">
            <div className={TIMEPICKER_COLUMN_HEADER_CLASSES}>{t.period}</div>
            <div className="bear-space-y-1">
              {(['AM', 'PM'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={cn(
                    TIMEPICKER_OPTION_CLASSES,
                    'bear-py-2',
                    period === p ? TIMEPICKER_OPTION_ACTIVE_CLASSES : TIMEPICKER_OPTION_INACTIVE_CLASSES
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className={TIMEPICKER_FOOTER_CLASSES}>
        {clearable && timeValue && (
          <button onClick={() => { onChange?.(null); onClose(); }} className={TIMEPICKER_CLEAR_BUTTON_CLASSES}>
            {t.cancel}
          </button>
        )}
        <button onClick={onConfirm} className={TIMEPICKER_CONFIRM_BUTTON_CLASSES}>
          {t.ok}
        </button>
      </div>
    </div>
  );
};
