import { FC, useState } from 'react';
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
  const displayTime = `${displayHour.toString().padStart(2, '0')}:${displayMin.toString().padStart(2, '0')}`;

  const clockHours = format === '12h' ? [...CLOCK_HOURS_12] : hours;
  const isHourMode = clockMode === 'hour';
  const clockValues = isHourMode ? clockHours : minutes;
  const setVal = isHourMode
    ? (v: number) => setSelectedHour(format === '12h' ? (v === 0 ? 12 : v) : v)
    : setSelectedMinute;

  return (
    <div className={cn(TIMEPICKER_DROPDOWN_CLASSES, 'Bear-TimePicker__dial bear-w-72')}>
      <div className="Bear-TimePicker__dial-title bear-text-center bear-uppercase bear-text-xs bear-text-gray-500 dark:bear-text-zinc-400 bear-mb-2">
        {t.selectTime}
      </div>
      <div className="Bear-TimePicker__dial-display bear-flex bear-items-center bear-justify-center bear-gap-3 bear-mb-4">
        <span className="Bear-TimePicker__dial-time bear-text-2xl bear-font-bold bear-text-gray-900 dark:bear-text-white">
          {displayTime}
        </span>
        {format === '12h' && (
          <div className="Bear-TimePicker__dial-period bear-flex bear-flex-col bear-gap-0.5">
            {(['AM', 'PM'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={cn(
                  'Bear-TimePicker__dial-period-btn bear-px-2 bear-py-0.5 bear-rounded bear-text-sm bear-transition-colors',
                  period === p
                    ? 'bear-text-blue-600 dark:bear-text-blue-400 bear-font-medium'
                    : 'bear-text-gray-400 dark:bear-text-zinc-500 hover:bear-text-gray-600 dark:hover:bear-text-zinc-400'
                )}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="Bear-TimePicker__dial-mode bear-flex bear-items-center bear-justify-center bear-gap-2 bear-mb-2">
        <button
          type="button"
          onClick={() => setClockMode('hour')}
          className="Bear-TimePicker__dial-mode-btn bear-p-1 bear-rounded bear-text-gray-500 hover:bear-bg-gray-100 dark:hover:bear-bg-zinc-700"
          aria-label="Hour mode"
        >
          <svg className="bear-w-4 bear-h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => setClockMode('minute')}
          className="Bear-TimePicker__dial-mode-btn bear-p-1 bear-rounded bear-text-gray-500 hover:bear-bg-gray-100 dark:hover:bear-bg-zinc-700"
          aria-label="Minute mode"
        >
          <svg className="bear-w-4 bear-h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="Bear-TimePicker__dial-face bear-relative bear-w-48 bear-h-48 bear-mx-auto bear-mb-4">
        <ClockFaceSvg
          values={clockValues}
          isHourMode={isHourMode}
          format={format}
          selectedHour={selectedHour}
          selectedMinute={selectedMinute}
          onSelect={setVal}
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
