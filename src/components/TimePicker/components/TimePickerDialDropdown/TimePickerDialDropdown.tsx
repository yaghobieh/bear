import { FC, useState, useCallback } from 'react';
import { cn } from '@utils';
import type { TimePickerDialProps } from '../../TimePicker.types';
import {
  TIMEPICKER_DROPDOWN_CLASSES,
  TIMEPICKER_FOOTER_CLASSES,
  TIMEPICKER_CLEAR_BUTTON_CLASSES,
  TIMEPICKER_CONFIRM_BUTTON_CLASSES,
  TIMEPICKER_DEFAULT_TRANSLATIONS,
  CLOCK_HOURS_12,
} from '../../TimePicker.constants';
import { ClockFaceSvg } from '../../helpers';

const DIAL_MODE_ACTIVE = 'bear-text-pink-600 dark:bear-text-pink-400 bear-font-bold bear-bg-pink-50 dark:bear-bg-pink-900/30 bear-rounded bear-px-1';
const DIAL_MODE_INACTIVE = 'bear-text-gray-400 dark:bear-text-zinc-500 hover:bear-text-gray-600 dark:hover:bear-text-zinc-300 bear-cursor-pointer bear-px-1';

export const TimePickerDialDropdown: FC<TimePickerDialProps> = ({
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
  const [clockMode, setClockMode] = useState<'hour' | 'minute'>('hour');
  const t = { ...TIMEPICKER_DEFAULT_TRANSLATIONS, ...translations };

  const displayHour = format === '12h' ? (selectedHour === 12 ? 12 : selectedHour % 12) : selectedHour;
  const displayMin = selectedMinute;
  const hourStr = displayHour.toString().padStart(2, '0');
  const minStr = displayMin.toString().padStart(2, '0');

  const clockHours = format === '12h' ? [...CLOCK_HOURS_12] : hours;
  const isHourMode = clockMode === 'hour';
  const clockValues = isHourMode ? clockHours : minutes;

  const handleSelect = useCallback((v: number) => {
    if (isHourMode) {
      setSelectedHour(format === '12h' ? (v === 0 ? 12 : v) : v);
      setClockMode('minute');
    } else {
      setSelectedMinute(v);
    }
  }, [isHourMode, format, setSelectedHour, setSelectedMinute]);

  return (
    <div className={cn(TIMEPICKER_DROPDOWN_CLASSES, 'Bear-TimePicker__dial bear-w-72')}>
      <div className="Bear-TimePicker__dial-title bear-text-center bear-uppercase bear-text-xs bear-text-gray-500 dark:bear-text-zinc-400 bear-mb-2">
        {t.selectTime}
      </div>

      <div className="Bear-TimePicker__dial-display bear-flex bear-items-center bear-justify-center bear-gap-1 bear-mb-4">
        <button
          type="button"
          onClick={() => setClockMode('hour')}
          className={cn(
            'Bear-TimePicker__dial-hour-btn bear-text-2xl bear-font-bold bear-transition-colors bear-border-none bear-bg-transparent',
            isHourMode ? DIAL_MODE_ACTIVE : DIAL_MODE_INACTIVE
          )}
          aria-label={t.hour}
        >
          {hourStr}
        </button>
        <span className="bear-text-2xl bear-font-bold bear-text-gray-900 dark:bear-text-white">:</span>
        <button
          type="button"
          onClick={() => setClockMode('minute')}
          className={cn(
            'Bear-TimePicker__dial-minute-btn bear-text-2xl bear-font-bold bear-transition-colors bear-border-none bear-bg-transparent',
            !isHourMode ? DIAL_MODE_ACTIVE : DIAL_MODE_INACTIVE
          )}
          aria-label={t.minute}
        >
          {minStr}
        </button>

        {format === '12h' && (
          <div className="Bear-TimePicker__dial-period bear-flex bear-flex-col bear-gap-0.5 bear-ml-2">
            {(['AM', 'PM'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={cn(
                  'Bear-TimePicker__dial-period-btn bear-px-2 bear-py-0.5 bear-rounded bear-text-sm bear-transition-colors',
                  period === p
                    ? 'bear-text-pink-600 dark:bear-text-pink-400 bear-font-medium'
                    : 'bear-text-gray-400 dark:bear-text-zinc-500 hover:bear-text-gray-600 dark:hover:bear-text-zinc-400'
                )}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="Bear-TimePicker__dial-face bear-relative bear-w-48 bear-h-48 bear-mx-auto bear-mb-4">
        <ClockFaceSvg
          values={clockValues}
          isHourMode={isHourMode}
          format={format}
          selectedHour={selectedHour}
          selectedMinute={selectedMinute}
          onSelect={handleSelect}
        />
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
