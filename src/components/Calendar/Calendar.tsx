import { FC, useCallback, useMemo } from 'react';
import type { CalendarProps, CalendarDayProps, CalendarNavActions, HeaderLabelRFC } from './Calendar.types';
import { cn } from '@utils';
import { useBearStyles } from '@hooks';
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from '../Icon';
import { CALENDAR_DROPDOWN_Z_INDEX, DEFAULT_WEEKDAYS, MONTHS, NUMBER, WEEKEND_LABELS } from './Calendar.const';
import { buildCalendarGrid, isSameDay, isWeekendDay, reorderWeekdays } from './Calendar.utils';
import { DefaultHeaderLabel } from './Calendar.helpers';

export const Calendar: FC<CalendarProps> = (props) => {
  const {
    viewDate,
    value = null,
    onSelect,
    onViewChange,
    minDate,
    maxDate,
    disabledDates = [],
    highlightedDates = [],
    weekdayLabels = DEFAULT_WEEKDAYS,
    firstDayOfWeek = NUMBER.ZERO,
    showWeekNumbers: _showWeekNumbers = false,
    slots = {},
    clearable = true,
    onClear,
    showTodayButton = true,
    onToday,
    bis,
    style,
    inline = false,
    className,
  } = props;
  const year = viewDate.getFullYear();
  const mergedStyle = useBearStyles(bis, style);
  const month = viewDate.getMonth();
  const today = useMemo(() => new Date(), []);

  const handlePrevYear = useCallback(() => {
    onViewChange?.(new Date(year - NUMBER.ONE, month, NUMBER.ONE));
  }, [year, month, onViewChange]);

  const handlePrevMonth = useCallback(() => {
    onViewChange?.(new Date(year, month - NUMBER.ONE, NUMBER.ONE));
  }, [year, month, onViewChange]);

  const handleNextMonth = useCallback(() => {
    onViewChange?.(new Date(year, month + NUMBER.ONE, NUMBER.ONE));
  }, [year, month, onViewChange]);

  const handleNextYear = useCallback(() => {
    onViewChange?.(new Date(year + NUMBER.ONE, month, NUMBER.ONE));
  }, [year, month, onViewChange]);

  const handlePrev = handlePrevMonth;
  const handleNext = handleNextMonth;

  const nav: CalendarNavActions = {
    onPrevYear: handlePrevYear,
    onPrevMonth: handlePrevMonth,
    onNextMonth: handleNextMonth,
    onNextYear: handleNextYear,
  };

  const isDateDisabled = useCallback(
    (d: Date): boolean => {
      if (minDate && d < minDate) return true;
      if (maxDate && d > maxDate) return true;
      return disabledDates.some((x) => isSameDay(x, d));
    },
    [minDate, maxDate, disabledDates]
  );

  const isHighlighted = useCallback(
    (d: Date): boolean => highlightedDates.some((x) => isSameDay(x, d)),
    [highlightedDates]
  );

  const grid = useMemo(
    () => buildCalendarGrid(year, month, firstDayOfWeek),
    [year, month, firstDayOfWeek]
  );

  const weekdays = useMemo(
    () => reorderWeekdays(weekdayLabels, firstDayOfWeek),
    [weekdayLabels, firstDayOfWeek]
  );

  const monthLabel = MONTHS[month];
  const hasSelection = value != null;

  const rootClassName = inline
    ? 'Bear-Calendar Bear-Calendar--inline bear-block bear-w-full bear-bg-white dark:bear-bg-zinc-900 bear-rounded-xl bear-shadow-none bear-border bear-border-zinc-200 dark:bear-border-zinc-700 bear-p-4 bear-text-zinc-900 dark:bear-text-zinc-100'
    : `Bear-Calendar Bear-Calendar--dropdown bear-mt-2 bear-bg-white dark:bear-bg-zinc-900 bear-rounded-xl bear-shadow-xl bear-border bear-border-zinc-200 dark:bear-border-zinc-700 bear-p-4 bear-w-80 bear-text-zinc-900 dark:bear-text-zinc-100`;
  const dropdownStyle = !inline ? { zIndex: CALENDAR_DROPDOWN_Z_INDEX } : undefined;

  const renderHeader = () => {
    if (slots.header) {
      return slots.header({ month: monthLabel, year, onPrev: handlePrev, onNext: handleNext, nav });
    }

    const NavPrevY = slots.navPrevYear;
    const NavPrev = slots.navPrev;
    const NavNext = slots.navNext;
    const NavNextY = slots.navNextYear;
    
    // Use slot or default RFC for header label
    const renderLabel: HeaderLabelRFC = slots.headerLabel || DefaultHeaderLabel;

    return (
      <div className="Bear-Calendar__header bear-flex bear-items-center bear-justify-between bear-gap-1 bear-mb-4">
        <div className="Bear-Calendar__nav-left bear-flex bear-items-center bear-gap-0.5">
          {NavPrevY ? (
            NavPrevY({ onClick: handlePrevYear })
          ) : (
            <button
              type="button"
              onClick={handlePrevYear}
              className="Bear-Calendar__nav-btn bear-p-1.5 bear-rounded bear-text-zinc-500 dark:bear-text-zinc-400 hover:bear-bg-zinc-100 dark:hover:bear-bg-zinc-800 bear-transition-colors"
              aria-label="Previous year"
            >
              <ChevronsLeftIcon size={16} />
            </button>
          )}
          {NavPrev ? (
            NavPrev({ onClick: handlePrev })
          ) : (
            <button
              type="button"
              onClick={handlePrev}
              className="Bear-Calendar__nav-btn bear-p-1.5 bear-rounded bear-text-zinc-500 dark:bear-text-zinc-400 hover:bear-bg-zinc-100 dark:hover:bear-bg-zinc-800 bear-transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeftIcon size={16} />
            </button>
          )}
        </div>

        {renderLabel({ month: monthLabel, year })}

        <div className="Bear-Calendar__nav-right bear-flex bear-items-center bear-gap-0.5">
          {NavNext ? (
            NavNext({ onClick: handleNext })
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="Bear-Calendar__nav-btn bear-p-1.5 bear-rounded bear-text-zinc-500 dark:bear-text-zinc-400 hover:bear-bg-zinc-100 dark:hover:bear-bg-zinc-800 bear-transition-colors"
              aria-label="Next month"
            >
              <ChevronRightIcon size={16} />
            </button>
          )}
          {NavNextY ? (
            NavNextY({ onClick: handleNextYear })
          ) : (
            <button
              type="button"
              onClick={handleNextYear}
              className="Bear-Calendar__nav-btn bear-p-1.5 bear-rounded bear-text-zinc-500 dark:bear-text-zinc-400 hover:bear-bg-zinc-100 dark:hover:bear-bg-zinc-800 bear-transition-colors"
              aria-label="Next year"
            >
              <ChevronsRightIcon size={16} />
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderWeekdays = () => {
    if (slots.weekdays) return slots.weekdays({ days: weekdays });
    const Weekday = slots.weekday;
    return (
      <div className="Bear-Calendar__weekdays bear-grid bear-grid-cols-7 bear-gap-1 bear-mb-2">
        {weekdays.map((label) =>
          Weekday ? (
            <div key={label}>{Weekday({ label })}</div>
          ) : (
            <div
              key={label}
              className={cn(
                'Bear-Calendar__weekday bear-text-center bear-text-xs bear-font-medium bear-uppercase bear-text-zinc-500 dark:bear-text-zinc-400',
                WEEKEND_LABELS.includes(label as typeof WEEKEND_LABELS[number]) && 'bear-text-red-500'
              )}
            >
              {label}
            </div>
          )
        )}
      </div>
    );
  };

  const renderDay = (cell: { date: Date; isCurrentMonth: boolean }, index: number) => {
    const { date, isCurrentMonth } = cell;
    const day = date.getDate();
    const weekday = date.getDay();
    const isWeekend = isWeekendDay(weekday);
    const selected = isSameDay(value, date);
    const isToday = isSameDay(today, date);
    const disabled = isDateDisabled(date);
    const highlighted = isHighlighted(date);

    const handleClick = () => {
      if (disabled) return;
      onSelect?.(date);
    };

    const dayProps: CalendarDayProps & { onClick: () => void } = {
      date,
      day,
      isCurrentMonth,
      isSelected: selected,
      isToday,
      isDisabled: disabled,
      isHighlighted: highlighted,
      onClick: handleClick,
    };

    if (slots.day) return <span key={index}>{slots.day(dayProps)}</span>;

    return (
      <button
        key={index}
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          'Bear-Calendar__day bear-w-8 bear-h-8 bear-rounded-full bear-text-sm bear-font-medium bear-transition-colors bear-flex bear-items-center bear-justify-center',
          selected && 'Bear-Calendar__day--selected bear-bg-pink-500 bear-text-white hover:bear-bg-pink-600',
          !selected && isToday && 'Bear-Calendar__day--today bear-ring-2 bear-ring-pink-500/50 bear-bg-transparent',
          !selected &&
            !isToday &&
            (isCurrentMonth
              ? isWeekend
                ? 'Bear-Calendar__day--weekend bear-text-red-500 dark:bear-text-red-400 hover:bear-bg-zinc-100 dark:hover:bear-bg-zinc-800'
                : 'bear-text-zinc-700 dark:bear-text-zinc-300 hover:bear-bg-zinc-100 dark:hover:bear-bg-zinc-800'
              : 'Bear-Calendar__day--other bear-text-zinc-500 dark:bear-text-zinc-600 hover:bear-bg-zinc-50 dark:hover:bear-bg-zinc-800/50'),
          highlighted && !selected && 'Bear-Calendar__day--highlighted bear-bg-pink-500/15',
          disabled && 'Bear-Calendar__day--disabled bear-opacity-40 bear-cursor-not-allowed'
        )}
      >
        {day}
      </button>
    );
  };

  const renderDays = () => {
    const cells = grid.map((cell, i) => renderDay(cell, i));
    if (slots.daysGrid) return slots.daysGrid({ children: cells, className: 'Bear-Calendar__grid bear-grid bear-grid-cols-7 bear-gap-1' });
    return <div className="Bear-Calendar__grid bear-grid bear-grid-cols-7 bear-gap-1">{cells}</div>;
  };

  const renderFooter = () => {
    const showClear = clearable && hasSelection && onClear;
    const showToday = showTodayButton && onToday;
    if (!showClear && !showToday) return null;

    if (slots.footer) {
      const Clear = slots.clearButton;
      const Today = slots.todayButton;
      return slots.footer({
        children: (
          <div className="Bear-Calendar__footer bear-flex bear-justify-between bear-gap-2 bear-mt-4 bear-pt-3 bear-border-t bear-border-zinc-200 dark:bear-border-zinc-700">
            {showClear && Clear ? Clear({ onClick: onClear!, hasSelection }) : showClear ? (
              <button type="button" onClick={onClear} className="Bear-Calendar__clear-btn bear-text-sm bear-text-zinc-500 dark:bear-text-zinc-400 hover:bear-text-zinc-700 dark:hover:bear-text-zinc-200 bear-transition-colors">
                Clear
              </button>
            ) : <span />}
            {showToday && Today ? Today({ onClick: onToday }) : showToday ? (
              <button type="button" onClick={onToday} className="Bear-Calendar__today-btn bear-text-sm bear-text-pink-600 dark:bear-text-pink-400 hover:bear-text-pink-700 dark:hover:bear-text-pink-300 bear-font-medium">
                Today
              </button>
            ) : null}
          </div>
        ),
      });
    }

    if (slots.clearButton && slots.todayButton) {
      return (
        <div className="Bear-Calendar__footer bear-flex bear-justify-between bear-gap-2 bear-mt-4 bear-pt-3 bear-border-t bear-border-zinc-200 dark:bear-border-zinc-700">
          {showClear && slots.clearButton({ onClick: onClear!, hasSelection })}
          {showToday && slots.todayButton({ onClick: onToday! })}
        </div>
      );
    }

    return (
      <div className="Bear-Calendar__footer bear-flex bear-justify-between bear-gap-2 bear-mt-4 bear-pt-3 bear-border-t bear-border-zinc-200 dark:bear-border-zinc-700">
        {showClear ? (
          <button type="button" onClick={onClear} className="Bear-Calendar__clear-btn bear-text-sm bear-text-zinc-500 dark:bear-text-zinc-400 hover:bear-text-zinc-700 dark:hover:bear-text-zinc-200 bear-transition-colors">
            Clear
          </button>
        ) : (
          <span />
        )}
        {showToday ? (
          <button type="button" onClick={onToday} className="Bear-Calendar__today-btn bear-text-sm bear-text-pink-400 hover:bear-text-pink-300 bear-font-medium bear-transition-colors">
            Today
          </button>
        ) : null}
      </div>
    );
  };

  const content = (
    <>
      {renderHeader()}
      {renderWeekdays()}
      {renderDays()}
      {renderFooter()}
    </>
  );

  const rootCn = cn(rootClassName, className);
  const baseStyle = Object.keys(mergedStyle).length ? mergedStyle : undefined;
  const rootStyle = dropdownStyle ? { ...baseStyle, ...dropdownStyle } : baseStyle;
  const root = slots.root ? slots.root({ children: content, className: rootCn }) : <div className={rootCn} style={rootStyle}>{content}</div>;
  return root;
};
