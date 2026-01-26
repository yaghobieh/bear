import { FC, useCallback, useMemo } from 'react';
import type { CalendarProps, CalendarDayProps, CalendarNavActions, HeaderLabelRFC } from './Calendar.types';
import { cn } from '../../utils/cn';
import { useBearStyles } from '../../hooks/useBearStyles';
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from '../Icon';
import { DEFAULT_WEEKDAYS, MONTHS, NUMBER, WEEKEND_LABELS } from './Calendar.const';
import { buildCalendarGrid, isSameDay, isWeekendDay, reorderWeekdays } from './Calendar.utils';

// Default render functions
const defaultRenderHeaderLabel: HeaderLabelRFC = ({ month, year }) => (
  <span className="font-semibold text-sm select-none">
    {month} {year}
  </span>
);

export const Calendar: FC<CalendarProps> = ({
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
}) => {
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
    ? 'block w-full bg-white dark:bg-gray-900 rounded-xl shadow-none border border-zinc-200 dark:border-zinc-700 p-4 text-zinc-900 dark:text-zinc-100'
    : 'absolute z-50 mt-2 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-700 p-4 w-80 text-zinc-900 dark:text-zinc-100';

  const renderHeader = () => {
    if (slots.header) {
      return slots.header({ month: monthLabel, year, onPrev: handlePrev, onNext: handleNext, nav });
    }

    const NavPrevY = slots.navPrevYear;
    const NavPrev = slots.navPrev;
    const NavNext = slots.navNext;
    const NavNextY = slots.navNextYear;
    
    // Use slot or default RFC for header label
    const renderLabel: HeaderLabelRFC = slots.headerLabel || defaultRenderHeaderLabel;

    return (
      <div className="flex items-center justify-between gap-1 mb-4">
        <div className="flex items-center gap-0.5">
          {NavPrevY ? (
            NavPrevY({ onClick: handlePrevYear })
          ) : (
            <button
              type="button"
              onClick={handlePrevYear}
              className="p-1.5 rounded text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
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
              className="p-1.5 rounded text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeftIcon size={16} />
            </button>
          )}
        </div>

        {renderLabel({ month: monthLabel, year })}

        <div className="flex items-center gap-0.5">
          {NavNext ? (
            NavNext({ onClick: handleNext })
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="p-1.5 rounded text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
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
              className="p-1.5 rounded text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
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
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekdays.map((label) =>
          Weekday ? (
            <div key={label}>{Weekday({ label })}</div>
          ) : (
            <div
              key={label}
              className={cn(
                'text-center text-xs font-medium uppercase',
                WEEKEND_LABELS.includes(label as typeof WEEKEND_LABELS[number]) && 'text-red-500'
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
          'w-8 h-8 rounded-full text-sm font-medium transition-colors flex items-center justify-center',
          selected && 'bg-pink-500 text-white hover:bg-pink-600',
          !selected && isToday && 'ring-2 ring-pink-500/50 bg-transparent',
          !selected &&
            !isToday &&
            (isCurrentMonth
              ? isWeekend
                ? 'text-red-500 dark:text-red-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              : 'text-zinc-400 dark:text-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'),
          highlighted && !selected && 'bg-pink-500/15',
          disabled && 'opacity-40 cursor-not-allowed'
        )}
      >
        {day}
      </button>
    );
  };

  const renderDays = () => {
    const cells = grid.map((cell, i) => renderDay(cell, i));
    if (slots.daysGrid) return slots.daysGrid({ children: cells, className: 'grid grid-cols-7 gap-1' });
    return <div className="grid grid-cols-7 gap-1">{cells}</div>;
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
          <div className="flex justify-between gap-2 mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-700">
            {showClear && Clear ? Clear({ onClick: onClear!, hasSelection }) : showClear ? (
              <button type="button" onClick={onClear} className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200">
                Clear
              </button>
            ) : <span />}
            {showToday && Today ? Today({ onClick: onToday }) : showToday ? (
              <button type="button" onClick={onToday} className="text-sm text-pink-600 hover:text-pink-700 font-medium">
                Today
              </button>
            ) : null}
          </div>
        ),
      });
    }

    if (slots.clearButton && slots.todayButton) {
      return (
        <div className="flex justify-between gap-2 mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-700">
          {showClear && slots.clearButton({ onClick: onClear!, hasSelection })}
          {showToday && slots.todayButton({ onClick: onToday! })}
        </div>
      );
    }

    return (
      <div className="flex justify-between gap-2 mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-700">
        {showClear ? (
          <button type="button" onClick={onClear} className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors">
            Clear
          </button>
        ) : (
          <span />
        )}
        {showToday ? (
          <button type="button" onClick={onToday} className="text-sm text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 font-medium transition-colors">
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
  const rootStyle = Object.keys(mergedStyle).length ? mergedStyle : undefined;
  const root = slots.root ? slots.root({ children: content, className: rootCn }) : <div className={rootCn} style={rootStyle}>{content}</div>;
  return root;
};
